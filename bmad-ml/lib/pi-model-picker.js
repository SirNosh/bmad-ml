const fs = require("fs");
const path = require("path");
const readline = require("readline");
const childProcess = require("child_process");

// Agent keys must match dispatch-pi.mjs agentKey() output.
// If dispatcher normalization changes (e.g. KAY/O mapping), update this list.
const AGENT_KEYS = Object.freeze([
  "sova", "sage", "cypher", "viper", "breach", "fade", "astra", "killjoy",
  "chamber", "jett", "gekko", "omen", "kayo",
  "dumbledore", "hermione", "snape", "luna", "mcgonagall", "moody", "hagrid",
  "nosh",
]);

function parsePiListJson(text) {
  if (typeof text !== "string") return [];
  const trimmed = text.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((r) => r && typeof r === "object" && r.provider && r.id)
        .map((r) => ({ provider: String(r.provider), id: String(r.id), display: r.display }));
    }
  } catch {
    // fall through to NDJSON
  }

  const rows = [];
  for (const line of trimmed.split(/\r?\n/)) {
    const s = line.trim();
    if (!s) continue;
    try {
      const obj = JSON.parse(s);
      if (obj && typeof obj === "object" && obj.provider && obj.id) {
        rows.push({ provider: String(obj.provider), id: String(obj.id), display: obj.display });
      }
    } catch {
      // skip unparseable lines
    }
  }
  return rows;
}

function buildSettingsPatch(choice, agentKeys = AGENT_KEYS) {
  const { provider, id, reasoning } = choice;
  const models = {};
  for (const key of agentKeys) {
    models[key] = reasoning
      ? { provider, id, reasoning }
      : { provider, id };
  }
  return { bmad_ml: { models } };
}

function formatChoice({ provider, id, reasoning }) {
  return reasoning ? `${provider}/${id}:${reasoning}` : `${provider}/${id}`;
}

function listPiModels({ spawn = childProcess.spawn, env = process.env, timeoutMs = 5000 } = {}) {
  return new Promise((resolve) => {
    let child;
    try {
      child = spawn("pi", ["--list-models", "--mode", "json"], {
        env,
        stdio: ["ignore", "pipe", "pipe"],
        shell: process.platform === "win32",
      });
    } catch (error) {
      resolve({
        ok: false,
        models: [],
        stderr: error.message,
        exitCode: null,
        reason: error.code === "ENOENT" ? "pi-not-found" : "spawn-failed",
      });
      return;
    }

    let stdout = "";
    let stderr = "";
    let settled = false;
    const MAX_BYTES = 1024 * 1024;

    const finalize = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };

    const timer = setTimeout(() => {
      try { child.kill("SIGTERM"); } catch { /* noop */ }
      finalize({ ok: false, models: [], stderr: "timeout", exitCode: null, reason: "timeout" });
    }, timeoutMs);

    child.on("error", (error) => {
      finalize({
        ok: false,
        models: [],
        stderr: error.message,
        exitCode: null,
        reason: error.code === "ENOENT" ? "pi-not-found" : "spawn-failed",
      });
    });

    if (child.stdout) {
      child.stdout.on("data", (chunk) => {
        if (stdout.length < MAX_BYTES) stdout += chunk.toString("utf8");
      });
    }
    if (child.stderr) {
      child.stderr.on("data", (chunk) => {
        if (stderr.length < MAX_BYTES) stderr += chunk.toString("utf8");
      });
    }

    child.on("close", (code) => {
      if (code !== 0) {
        finalize({ ok: false, models: [], stderr, exitCode: code, reason: "nonzero-exit" });
        return;
      }
      finalize({ ok: true, models: parsePiListJson(stdout), stderr, exitCode: code });
    });
  });
}

function makeLineReader(rl) {
  const queue = [];
  const waiters = [];
  let closed = false;

  rl.on("line", (line) => {
    if (waiters.length > 0) {
      waiters.shift()(line);
    } else {
      queue.push(line);
    }
  });
  rl.on("close", () => {
    closed = true;
    while (waiters.length > 0) {
      waiters.shift()(null);
    }
  });

  return function readLine(prompt, stdout) {
    stdout.write(prompt);
    if (queue.length > 0) {
      return Promise.resolve(queue.shift());
    }
    if (closed) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => { waiters.push(resolve); });
  };
}

function writeSelection(settingsFile, patch) {
  // Pi-native top-level keys (defaultProvider, defaultModel, defaultThinkingLevel,
  // etc.) must be preserved — the `...existing` spread below keeps them intact.
  // `bmad_ml` is a bmad-ml-private namespace read only by dispatch-pi.mjs.
  let existing = {};
  if (fs.existsSync(settingsFile)) {
    try {
      const raw = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        existing = raw;
      }
    } catch {
      // malformed existing file — overwrite with fresh shape
    }
  }
  const existingBmadMl = (existing.bmad_ml && typeof existing.bmad_ml === "object" && !Array.isArray(existing.bmad_ml))
    ? existing.bmad_ml
    : {};
  const next = {
    ...existing,
    bmad_ml: {
      ...existingBmadMl,
      models: patch.bmad_ml.models,
    },
  };
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  fs.writeFileSync(settingsFile, `${JSON.stringify(next, null, 2)}\n`);
}

async function runModelPicker({
  settingsFile,
  dryRun = false,
  force = false,
  skipPicker = false,
  stdin = process.stdin,
  stdout = process.stdout,
  stderr = process.stderr,
  env = process.env,
  spawn = childProcess.spawn,
} = {}) {
  try {
    if (skipPicker) {
      stdout.write("Model picker: skipped (--no-model-picker)\n");
      return { status: "skipped", reason: "flag" };
    }

    if (dryRun) {
      stdout.write(`[dry-run] Model picker: would prompt and write ${settingsFile}\n`);
      return { status: "dry-run" };
    }

    let existingSettings = null;
    if (fs.existsSync(settingsFile)) {
      try {
        existingSettings = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
      } catch {
        existingSettings = null;
      }
    }
    const existingSova = existingSettings && existingSettings.bmad_ml
      && existingSettings.bmad_ml.models && existingSettings.bmad_ml.models.sova;
    if (existingSova && existingSova.provider && existingSova.id && !force) {
      const label = formatChoice(existingSova);
      stdout.write(`Model picker: kept existing selection (${label}). Re-run with --force to replace.\n`);
      return { status: "skipped", reason: "existing-selection", choice: existingSova };
    }

    if (!stdin.isTTY) {
      stdout.write("Model picker: skipped (non-interactive stdin). Configure via _bmad/config.user.yaml ml.pi_models.<agent> or BMAD_PI_MODEL_<AGENT>.\n");
      return { status: "skipped", reason: "non-tty" };
    }

    stdout.write("Configuring pi models for BMad ML...\n");
    stdout.write("Discovering models via `pi --list-models`...\n");
    const list = await listPiModels({ spawn, env });

    if (!list.ok) {
      if (list.reason === "pi-not-found") {
        stdout.write("Model picker: skipped (pi CLI not found on PATH; install pi-mono then re-run with --force to retry).\n");
      } else if (list.reason === "timeout") {
        stdout.write("Model picker: skipped (pi --list-models timed out).\n");
      } else {
        const firstLine = (list.stderr || "").split(/\r?\n/)[0].slice(0, 200);
        const suffix = firstLine ? `: ${firstLine}` : "";
        stdout.write(`Model picker: skipped (pi exited ${list.exitCode ?? "?"}${suffix}).\n`);
      }
      return { status: "skipped", reason: list.reason || "pi-failed" };
    }

    if (list.models.length === 0) {
      stdout.write("Model picker: skipped (pi reported 0 models — configure API keys in pi and re-run with --force).\n");
      return { status: "skipped", reason: "empty-list" };
    }

    stdout.write(`\nPick a default model for all ${AGENT_KEYS.length} BMad specialists:\n\n`);
    list.models.forEach((m, idx) => {
      const label = formatChoice({ provider: m.provider, id: m.id });
      const display = m.display ? `  — ${m.display}` : "";
      stdout.write(`  ${String(idx + 1).padStart(3)}) ${label}${display}\n`);
    });
    stdout.write("\n");

    const rl = readline.createInterface({ input: stdin, output: stdout });
    const readLine = makeLineReader(rl);
    let choice = null;
    try {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const answer = await readLine(`Choose model [1-${list.models.length}, q to skip]: `, stdout);
        if (answer === null) break;
        const trimmed = String(answer).trim().toLowerCase();
        if (trimmed === "q" || trimmed === "quit") break;
        const n = Number(trimmed);
        if (Number.isInteger(n) && n >= 1 && n <= list.models.length) {
          choice = list.models[n - 1];
          break;
        }
        stdout.write(`Invalid choice. Enter a number between 1 and ${list.models.length}, or 'q' to skip.\n`);
      }
    } finally {
      rl.close();
    }

    if (!choice) {
      stdout.write("Model picker: skipped (no selection).\n");
      return { status: "skipped", reason: "no-selection" };
    }

    const patch = buildSettingsPatch(choice, AGENT_KEYS);
    try {
      writeSelection(settingsFile, patch);
    } catch (error) {
      stderr.write(`Model picker: failed to write ${settingsFile} (${error.message}).\n`);
      return { status: "failed", reason: "write-failed", error: error.message };
    }

    const label = formatChoice(choice);
    stdout.write(`Model picker: wrote ${label} to ${settingsFile} (${AGENT_KEYS.length} agents)\n`);
    return { status: "written", choice, written: settingsFile };
  } catch (error) {
    try {
      stderr.write(`Model picker: unexpected error (${error.message}). Install continues.\n`);
    } catch { /* noop */ }
    return { status: "failed", reason: "unexpected", error: error.message };
  }
}

module.exports = {
  runModelPicker,
  listPiModels,
  parsePiListJson,
  buildSettingsPatch,
  writeSelection,
  formatChoice,
  AGENT_KEYS,
};
