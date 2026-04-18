const fs = require("fs");
const path = require("path");

const MANIFEST_DIR = "_bmad";
const MANIFEST_FILE = "install-manifest.json";

const LEGACY_MARKERS = {
  oc: [".opencode/skills/bmad-ml-nosh"],
  cur: [".cursor/skills/bmad-ml-nosh"],
  cc: [".claude/skills/bmad-ml-nosh"],
  "cur-pi": [".pi/skills/bmad-ml-nosh", ".cursor/skills/bmad-ml-nosh"],
  "cc-pi": [".pi/skills/bmad-ml-nosh", ".claude/skills/bmad-ml-nosh"],
};

function manifestPath(projectRoot) {
  return path.join(projectRoot, MANIFEST_DIR, MANIFEST_FILE);
}

function readPackageVersion(packageJsonPath) {
  try {
    const raw = fs.readFileSync(packageJsonPath, "utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed.version === "string" ? parsed.version : "unknown";
  } catch {
    return "unknown";
  }
}

function readInstalledManifest(projectRoot) {
  const p = manifestPath(projectRoot);
  if (!fs.existsSync(p)) {
    return null;
  }
  try {
    const raw = fs.readFileSync(p, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.version === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeInstalledManifest(projectRoot, { version, mode }) {
  const dir = path.join(projectRoot, MANIFEST_DIR);
  fs.mkdirSync(dir, { recursive: true });
  const data = {
    version,
    mode,
    installed_at: new Date().toISOString(),
  };
  fs.writeFileSync(manifestPath(projectRoot), JSON.stringify(data, null, 2) + "\n", "utf8");
  return data;
}

function detectLegacyInstall(ide, projectRoot) {
  const markers = LEGACY_MARKERS[ide] || [];
  return markers.some((rel) => fs.existsSync(path.join(projectRoot, rel)));
}

function computeAutoUpgrade({ ide, projectRoot, noRefresh, packageVersion }) {
  if (noRefresh) {
    return { autoUpgrade: false, reason: "disabled", installedVersion: null };
  }

  const manifest = readInstalledManifest(projectRoot);

  if (manifest) {
    if (manifest.version === packageVersion) {
      return { autoUpgrade: false, reason: "same-version", installedVersion: manifest.version };
    }
    return {
      autoUpgrade: true,
      reason: "version-mismatch",
      installedVersion: manifest.version,
    };
  }

  if (detectLegacyInstall(ide, projectRoot)) {
    return { autoUpgrade: true, reason: "legacy", installedVersion: null };
  }

  return { autoUpgrade: false, reason: "fresh", installedVersion: null };
}

module.exports = {
  MANIFEST_DIR,
  MANIFEST_FILE,
  LEGACY_MARKERS,
  manifestPath,
  readPackageVersion,
  readInstalledManifest,
  writeInstalledManifest,
  detectLegacyInstall,
  computeAutoUpgrade,
};
