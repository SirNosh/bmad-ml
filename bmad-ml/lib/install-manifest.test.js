const fs = require("fs");
const os = require("os");
const path = require("path");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
  MANIFEST_DIR,
  MANIFEST_FILE,
  LEGACY_MARKERS,
  manifestPath,
  readPackageVersion,
  readInstalledManifest,
  writeInstalledManifest,
  detectLegacyInstall,
  computeAutoUpgrade,
} = require("./install-manifest");

function tmpProject(prefix = "bmad-manifest-") {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

test("readPackageVersion returns version from package.json", () => {
  const dir = tmpProject();
  const pkg = path.join(dir, "package.json");
  fs.writeFileSync(pkg, JSON.stringify({ name: "x", version: "9.9.9" }));
  assert.equal(readPackageVersion(pkg), "9.9.9");
});

test("readPackageVersion returns 'unknown' for missing/malformed", () => {
  const dir = tmpProject();
  assert.equal(readPackageVersion(path.join(dir, "missing.json")), "unknown");
  const bad = path.join(dir, "bad.json");
  fs.writeFileSync(bad, "{ not json");
  assert.equal(readPackageVersion(bad), "unknown");
});

test("writeInstalledManifest + readInstalledManifest round-trip", () => {
  const dir = tmpProject();
  const written = writeInstalledManifest(dir, { version: "3.2.0", mode: "cc" });
  assert.equal(written.version, "3.2.0");
  assert.equal(written.mode, "cc");
  assert.ok(written.installed_at);
  const parsed = readInstalledManifest(dir);
  assert.equal(parsed.version, "3.2.0");
  assert.equal(parsed.mode, "cc");
  assert.equal(
    fs.existsSync(path.join(dir, MANIFEST_DIR, MANIFEST_FILE)),
    true,
  );
});

test("readInstalledManifest returns null when absent or malformed", () => {
  const dir = tmpProject();
  assert.equal(readInstalledManifest(dir), null);
  fs.mkdirSync(path.join(dir, MANIFEST_DIR), { recursive: true });
  fs.writeFileSync(manifestPath(dir), "{ not json");
  assert.equal(readInstalledManifest(dir), null);
  fs.writeFileSync(manifestPath(dir), JSON.stringify({ mode: "cc" }));
  assert.equal(readInstalledManifest(dir), null);
});

test("detectLegacyInstall finds mode-specific markers", () => {
  const dir = tmpProject();
  assert.equal(detectLegacyInstall("cc", dir), false);
  const marker = LEGACY_MARKERS.cc[0];
  fs.mkdirSync(path.join(dir, marker), { recursive: true });
  assert.equal(detectLegacyInstall("cc", dir), true);
  assert.equal(detectLegacyInstall("cur", dir), false);
});

test("computeAutoUpgrade: fresh install => no upgrade", () => {
  const dir = tmpProject();
  const r = computeAutoUpgrade({ ide: "cc", projectRoot: dir, noRefresh: false, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, false);
  assert.equal(r.reason, "fresh");
  assert.equal(r.installedVersion, null);
});

test("computeAutoUpgrade: same-version => no upgrade", () => {
  const dir = tmpProject();
  writeInstalledManifest(dir, { version: "3.2.0", mode: "cc" });
  const r = computeAutoUpgrade({ ide: "cc", projectRoot: dir, noRefresh: false, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, false);
  assert.equal(r.reason, "same-version");
  assert.equal(r.installedVersion, "3.2.0");
});

test("computeAutoUpgrade: version-mismatch => upgrade", () => {
  const dir = tmpProject();
  writeInstalledManifest(dir, { version: "3.0.0", mode: "cc" });
  const r = computeAutoUpgrade({ ide: "cc", projectRoot: dir, noRefresh: false, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, true);
  assert.equal(r.reason, "version-mismatch");
  assert.equal(r.installedVersion, "3.0.0");
});

test("computeAutoUpgrade: legacy install (no manifest, marker present) => upgrade", () => {
  const dir = tmpProject();
  fs.mkdirSync(path.join(dir, LEGACY_MARKERS.cc[0]), { recursive: true });
  const r = computeAutoUpgrade({ ide: "cc", projectRoot: dir, noRefresh: false, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, true);
  assert.equal(r.reason, "legacy");
  assert.equal(r.installedVersion, null);
});

test("computeAutoUpgrade: noRefresh disables everything", () => {
  const dir = tmpProject();
  writeInstalledManifest(dir, { version: "3.0.0", mode: "cc" });
  const r = computeAutoUpgrade({ ide: "cc", projectRoot: dir, noRefresh: true, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, false);
  assert.equal(r.reason, "disabled");
});

test("computeAutoUpgrade: pi modes check both .pi and IDE markers", () => {
  const dir = tmpProject();
  fs.mkdirSync(path.join(dir, LEGACY_MARKERS["cc-pi"][0]), { recursive: true });
  const r = computeAutoUpgrade({ ide: "cc-pi", projectRoot: dir, noRefresh: false, packageVersion: "3.2.0" });
  assert.equal(r.autoUpgrade, true);
  assert.equal(r.reason, "legacy");
});
