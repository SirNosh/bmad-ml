const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { EventEmitter } = require("node:events");
const { PassThrough } = require("node:stream");

const {
  runModelPicker,
  parsePiListJson,
  buildSettingsPatch,
  formatChoice,
  AGENT_KEYS,
} = require("./pi-model-picker");

function mkTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function makeStdin({ data = "", tty = true } = {}) {
  const stdin = new PassThrough();
  stdin.isTTY = tty;
  if (data) stdin.write(data);
  return stdin;
}

function makeStdout() {
  const stdout = new PassThrough();
  let captured = "";
  stdout.on("data", (chunk) => { captured += chunk.toString("utf8"); });
  stdout.getCaptured = () => captured;
  return stdout;
}

function fakeChildProcess({ stdout = "", stderr = "", exitCode = 0, error = null, delay = 0 }) {
  const child = new EventEmitter();
  child.stdout = new EventEmitter();
  child.stderr = new EventEmitter();
  child.kill = () => {};
  setTimeout(() => {
    if (error) {
      child.emit("error", error);
      return;
    }
    if (stdout) child.stdout.emit("data", Buffer.from(stdout));
    if (stderr) child.stderr.emit("data", Buffer.from(stderr));
    child.emit("close", exitCode);
  }, delay);
  return child;
}

function makeFakeSpawn(options) {
  return () => fakeChildProcess(options);
}

function makeSpawnThrowing(error) {
  return () => { throw error; };
}

test("parsePiListJson accepts JSON array", () => {
  const text = JSON.stringify([
    { provider: "anthropic", id: "claude-sonnet-4" },
    { provider: "openai", id: "gpt-4o" },
  ]);
  assert.deepEqual(parsePiListJson(text), [
    { provider: "anthropic", id: "claude-sonnet-4", display: undefined },
    { provider: "openai", id: "gpt-4o", display: undefined },
  ]);
});

test("parsePiListJson accepts NDJSON (JSON lines)", () => {
  const text = [
    JSON.stringify({ provider: "anthropic", id: "claude-sonnet-4" }),
    JSON.stringify({ provider: "openai", id: "gpt-4o", display: "GPT-4o" }),
  ].join("\n");
  assert.deepEqual(parsePiListJson(text), [
    { provider: "anthropic", id: "claude-sonnet-4", display: undefined },
    { provider: "openai", id: "gpt-4o", display: "GPT-4o" },
  ]);
});

test("parsePiListJson skips garbage lines", () => {
  const text = [
    "not json at all",
    JSON.stringify({ provider: "anthropic", id: "claude-sonnet-4" }),
    "{ partial",
    JSON.stringify({ no_provider: "x" }),
    JSON.stringify({ provider: "openai", id: "gpt-4o" }),
  ].join("\n");
  assert.deepEqual(parsePiListJson(text), [
    { provider: "anthropic", id: "claude-sonnet-4", display: undefined },
    { provider: "openai", id: "gpt-4o", display: undefined },
  ]);
});

test("parsePiListJson returns [] for empty or non-string input", () => {
  assert.deepEqual(parsePiListJson(""), []);
  assert.deepEqual(parsePiListJson("   "), []);
  assert.deepEqual(parsePiListJson(null), []);
  assert.deepEqual(parsePiListJson(42), []);
});

test("buildSettingsPatch writes reasoning when present", () => {
  const patch = buildSettingsPatch({ provider: "anthropic", id: "claude-sonnet-4", reasoning: "high" });
  assert.equal(Object.keys(patch.bmad_ml.models).length, AGENT_KEYS.length);
  assert.deepEqual(patch.bmad_ml.models.sova, { provider: "anthropic", id: "claude-sonnet-4", reasoning: "high" });
  assert.deepEqual(patch.bmad_ml.models.nosh, { provider: "anthropic", id: "claude-sonnet-4", reasoning: "high" });
});

test("buildSettingsPatch omits reasoning when absent", () => {
  const patch = buildSettingsPatch({ provider: "openai", id: "gpt-4o" });
  assert.deepEqual(patch.bmad_ml.models.sova, { provider: "openai", id: "gpt-4o" });
  assert.equal(Object.prototype.hasOwnProperty.call(patch.bmad_ml.models.sova, "reasoning"), false);
});

test("AGENT_KEYS is frozen, has 21 entries, lowercase slugs only", () => {
  assert.equal(AGENT_KEYS.length, 21);
  for (const key of AGENT_KEYS) {
    assert.match(key, /^[a-z][a-z0-9-]*$/);
  }
  assert.throws(() => { AGENT_KEYS.push("bogus"); });
});

test("formatChoice renders provider/id and reasoning suffix", () => {
  assert.equal(formatChoice({ provider: "anthropic", id: "claude-sonnet-4" }), "anthropic/claude-sonnet-4");
  assert.equal(formatChoice({ provider: "anthropic", id: "claude-sonnet-4", reasoning: "high" }), "anthropic/claude-sonnet-4:high");
});

test("runModelPicker skipPicker returns skipped and writes no file", async () => {
  const tmp = mkTempDir("picker-skip-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  let spawnCalled = false;
  const spawn = () => { spawnCalled = true; throw new Error("should not run"); };

  const result = await runModelPicker({
    settingsFile,
    skipPicker: true,
    stdin: makeStdin(),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "flag");
  assert.equal(spawnCalled, false);
  assert.equal(fs.existsSync(settingsFile), false);
});

test("runModelPicker dryRun returns dry-run and writes no file", async () => {
  const tmp = mkTempDir("picker-dry-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  let spawnCalled = false;

  const result = await runModelPicker({
    settingsFile,
    dryRun: true,
    stdin: makeStdin(),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn: () => { spawnCalled = true; throw new Error("nope"); },
  });

  assert.equal(result.status, "dry-run");
  assert.equal(spawnCalled, false);
  assert.equal(fs.existsSync(settingsFile), false);
});

test("runModelPicker with ENOENT reports pi-not-found and skips", async () => {
  const tmp = mkTempDir("picker-enoent-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  const enoent = Object.assign(new Error("spawn pi ENOENT"), { code: "ENOENT" });

  const stdout = makeStdout();
  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin(),
    stdout,
    stderr: makeStdout(),
    spawn: makeSpawnThrowing(enoent),
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "pi-not-found");
  assert.match(stdout.getCaptured(), /pi CLI not found/);
  assert.equal(fs.existsSync(settingsFile), false);
});

test("runModelPicker with non-zero pi exit reports skipped", async () => {
  const tmp = mkTempDir("picker-nonzero-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  const stdout = makeStdout();

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin(),
    stdout,
    stderr: makeStdout(),
    spawn: makeFakeSpawn({ exitCode: 2, stderr: "auth failed\n" }),
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "nonzero-exit");
  assert.match(stdout.getCaptured(), /pi exited 2/);
});

test("runModelPicker with non-TTY stdin skips before spawning pi", async () => {
  const tmp = mkTempDir("picker-nontty-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  let spawnCalled = false;

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ tty: false }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn: () => { spawnCalled = true; throw new Error("nope"); },
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "non-tty");
  assert.equal(spawnCalled, false);
});

test("runModelPicker happy path writes settings.json with fanned-out models", async () => {
  const tmp = mkTempDir("picker-happy-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  const spawn = makeFakeSpawn({
    stdout: [
      JSON.stringify({ provider: "anthropic", id: "claude-sonnet-4" }),
      JSON.stringify({ provider: "anthropic", id: "claude-sonnet-4", display: "Sonnet 4 high" }),
      JSON.stringify({ provider: "openai", id: "gpt-4o" }),
    ].join("\n"),
    exitCode: 0,
  });

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "2\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "written");
  assert.deepEqual(result.choice, { provider: "anthropic", id: "claude-sonnet-4", display: "Sonnet 4 high" });

  const written = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  assert.equal(Object.keys(written.bmad_ml.models).length, AGENT_KEYS.length);
  for (const key of AGENT_KEYS) {
    assert.deepEqual(written.bmad_ml.models[key], { provider: "anthropic", id: "claude-sonnet-4" });
  }
});

test("runModelPicker preserves unrelated keys in existing settings.json", async () => {
  const tmp = mkTempDir("picker-preserve-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  fs.writeFileSync(settingsFile, JSON.stringify({ theme: "dark", bmad_ml: { custom: "keep-me" } }));

  const spawn = makeFakeSpawn({
    stdout: JSON.stringify([{ provider: "openai", id: "gpt-4o" }]),
  });

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "1\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "written");
  const written = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  assert.equal(written.theme, "dark");
  assert.equal(written.bmad_ml.custom, "keep-me");
  assert.equal(written.bmad_ml.models.sova.provider, "openai");
});

test("runModelPicker skips when existing selection is present and no --force", async () => {
  const tmp = mkTempDir("picker-existing-noforce-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  const preset = { bmad_ml: { models: { sova: { provider: "anthropic", id: "claude-opus-4" } } } };
  fs.writeFileSync(settingsFile, JSON.stringify(preset));

  let spawnCalled = false;
  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "1\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn: () => { spawnCalled = true; throw new Error("nope"); },
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "existing-selection");
  assert.equal(spawnCalled, false);
  const written = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  assert.deepEqual(written, preset);
});

test("runModelPicker with --force replaces existing selection and strips stale reasoning", async () => {
  const tmp = mkTempDir("picker-existing-force-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  const preset = {
    bmad_ml: {
      models: Object.fromEntries(AGENT_KEYS.map((k) => [k, { provider: "anthropic", id: "claude-opus-4", reasoning: "high" }])),
    },
  };
  fs.writeFileSync(settingsFile, JSON.stringify(preset));

  const spawn = makeFakeSpawn({
    stdout: JSON.stringify([{ provider: "openai", id: "gpt-4o" }]),
  });

  const result = await runModelPicker({
    settingsFile,
    force: true,
    stdin: makeStdin({ data: "1\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "written");
  const written = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  assert.deepEqual(written.bmad_ml.models.sova, { provider: "openai", id: "gpt-4o" });
  assert.equal(Object.prototype.hasOwnProperty.call(written.bmad_ml.models.sova, "reasoning"), false);
});

test("runModelPicker user enters q to skip", async () => {
  const tmp = mkTempDir("picker-q-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");

  const spawn = makeFakeSpawn({
    stdout: JSON.stringify([{ provider: "openai", id: "gpt-4o" }]),
  });

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "q\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "no-selection");
  assert.equal(fs.existsSync(settingsFile), false);
});

test("runModelPicker empty model list reports skipped", async () => {
  const tmp = mkTempDir("picker-empty-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  const stdout = makeStdout();

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin(),
    stdout,
    stderr: makeStdout(),
    spawn: makeFakeSpawn({ stdout: "" }),
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "empty-list");
  assert.match(stdout.getCaptured(), /0 models/);
});

test("runModelPicker invalid input re-prompts once then skips", async () => {
  const tmp = mkTempDir("picker-invalid-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");
  const stdout = makeStdout();

  const spawn = makeFakeSpawn({
    stdout: JSON.stringify([{ provider: "openai", id: "gpt-4o" }]),
  });

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "99\nabc\n" }),
    stdout,
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "skipped");
  assert.equal(result.reason, "no-selection");
  assert.match(stdout.getCaptured(), /Invalid choice/);
});

test("runModelPicker invalid then valid succeeds", async () => {
  const tmp = mkTempDir("picker-retry-");
  const settingsFile = path.join(tmp, ".pi", "settings.json");

  const spawn = makeFakeSpawn({
    stdout: JSON.stringify([
      { provider: "anthropic", id: "claude-sonnet-4" },
      { provider: "openai", id: "gpt-4o" },
    ]),
  });

  const result = await runModelPicker({
    settingsFile,
    stdin: makeStdin({ data: "99\n1\n" }),
    stdout: makeStdout(),
    stderr: makeStdout(),
    spawn,
  });

  assert.equal(result.status, "written");
  assert.deepEqual(result.choice, { provider: "anthropic", id: "claude-sonnet-4", display: undefined });
});
