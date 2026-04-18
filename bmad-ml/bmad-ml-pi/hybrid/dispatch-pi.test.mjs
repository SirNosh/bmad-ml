import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  parseSimpleYamlForAgent,
  parseSimpleManifest,
  resolveModel,
  perAgentEnvModel,
  envSuffixFor,
  parsePiModelString,
} from "./dispatch-pi.mjs";

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function writeFile(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

test("parseSimpleYamlForAgent resolves bmad-ml-<agent> prefix", () => {
  const yaml = `ml:
  project_name: demo
  pi_models:
    sova:
      provider: anthropic
      id: claude-opus-4
      reasoning: high
`;
  const result = parseSimpleYamlForAgent(yaml, "bmad-ml-sova");
  assert.deepEqual(result, { provider: "anthropic", id: "claude-opus-4", reasoning: "high" });
});

test("parseSimpleYamlForAgent resolves bmad-<agent> prefix", () => {
  const yaml = `ml:
  pi_models:
    jett:
      provider: openai
      id: gpt-4o
`;
  const result = parseSimpleYamlForAgent(yaml, "bmad-jett");
  assert.deepEqual(result, { provider: "openai", id: "gpt-4o" });
});

test("parseSimpleYamlForAgent returns null when agent missing", () => {
  const yaml = `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-opus-4
`;
  assert.equal(parseSimpleYamlForAgent(yaml, "bmad-ml-killjoy"), null);
});

test("parseSimpleYamlForAgent returns null when provider or id missing", () => {
  const yaml = `ml:
  pi_models:
    sova:
      provider: anthropic
`;
  assert.equal(parseSimpleYamlForAgent(yaml, "bmad-ml-sova"), null);
});

test("parseSimpleYamlForAgent ignores non-ml top-level keys", () => {
  const yaml = `other:
  pi_models:
    sova:
      provider: anthropic
      id: claude-opus-4
ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-sonnet-4
`;
  assert.deepEqual(parseSimpleYamlForAgent(yaml, "bmad-ml-sova"), {
    provider: "anthropic",
    id: "claude-sonnet-4",
  });
});

test("parseSimpleManifest extracts tools, thinking, and pi_model", () => {
  const manifest = `pi_tools:
  - read
  - bash
  - edit
pi_thinking: high
pi_model:
  provider: anthropic
  id: claude-opus-4
  reasoning: medium
artifact_scope:
  - src/
`;
  const result = parseSimpleManifest(manifest);
  assert.deepEqual(result.tools, ["read", "bash", "edit"]);
  assert.equal(result.thinking, "high");
  assert.equal(result.provider, "anthropic");
  assert.equal(result.id, "claude-opus-4");
  assert.equal(result.reasoning, "medium");
});

test("parseSimpleManifest returns empty tools list when section absent", () => {
  const manifest = `pi_thinking: minimal
`;
  const result = parseSimpleManifest(manifest);
  assert.deepEqual(result.tools, []);
  assert.equal(result.thinking, "minimal");
  assert.equal(result.provider, undefined);
});

test("resolveModel: CLI --model override wins", () => {
  const cwd = makeTempDir("dispatch-pi-cli-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: "anthropic:claude-opus-4",
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "cli");
  assert.equal(result.provider, "anthropic");
  assert.equal(result.id, "claude-opus-4");
});

test("resolveModel: .pi/settings.json beats yaml configs and manifest", () => {
  const cwd = makeTempDir("dispatch-pi-pisettings-");
  writeFile(
    path.join(cwd, ".pi", "settings.json"),
    JSON.stringify({
      bmad_ml: {
        models: {
          sova: { provider: "openai", id: "gpt-4o", reasoning: "low" },
        },
      },
    }),
  );
  writeFile(
    path.join(cwd, "_bmad", "config.user.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-sonnet-4
`,
  );
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "pi-settings");
  assert.equal(result.provider, "openai");
  assert.equal(result.id, "gpt-4o");
  assert.equal(result.reasoning, "low");
});

test("resolveModel: config.user.yaml beats config.yaml and manifest", () => {
  const cwd = makeTempDir("dispatch-pi-user-");
  writeFile(
    path.join(cwd, "_bmad", "config.user.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-sonnet-4
`,
  );
  writeFile(
    path.join(cwd, "_bmad", "config.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-haiku-4
`,
  );
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "config.user.yaml");
  assert.equal(result.id, "claude-sonnet-4");
});

test("resolveModel: config.yaml beats manifest", () => {
  const cwd = makeTempDir("dispatch-pi-shared-");
  writeFile(
    path.join(cwd, "_bmad", "config.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-haiku-4
`,
  );
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "config.yaml");
  assert.equal(result.id, "claude-haiku-4");
});

test("resolveModel: manifest wins when no config sources present", () => {
  const cwd = makeTempDir("dispatch-pi-manifest-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5", reasoning: "medium" },
  });
  assert.equal(result.source, "manifest");
  assert.equal(result.provider, "google");
  assert.equal(result.id, "gemini-1.5");
  assert.equal(result.reasoning, "medium");
});

test("resolveModel: falls back to env defaults when everything missing", () => {
  const cwd = makeTempDir("dispatch-pi-env-");
  const prevProvider = process.env.PI_PROVIDER;
  const prevModel = process.env.PI_MODEL;
  const prevBmadProvider = process.env.BMAD_PI_PROVIDER;
  const prevBmadModel = process.env.BMAD_PI_MODEL;
  delete process.env.PI_PROVIDER;
  delete process.env.PI_MODEL;
  delete process.env.BMAD_PI_PROVIDER;
  delete process.env.BMAD_PI_MODEL;
  try {
    const result = resolveModel({
      cwd,
      agent: "bmad-ml-sova",
      cliModel: undefined,
      manifestModel: { provider: undefined, id: undefined },
    });
    assert.equal(result.source, "env");
    assert.equal(result.provider, "opencode-go");
    assert.equal(result.id, "glm-5.1");
  } finally {
    if (prevProvider !== undefined) process.env.PI_PROVIDER = prevProvider;
    if (prevModel !== undefined) process.env.PI_MODEL = prevModel;
    if (prevBmadProvider !== undefined) process.env.BMAD_PI_PROVIDER = prevBmadProvider;
    if (prevBmadModel !== undefined) process.env.BMAD_PI_MODEL = prevBmadModel;
  }
});

test("resolveModel: env overrides win over defaults", () => {
  const cwd = makeTempDir("dispatch-pi-envvar-");
  const prev = process.env.PI_PROVIDER;
  const prevModel = process.env.PI_MODEL;
  process.env.PI_PROVIDER = "openai";
  process.env.PI_MODEL = "gpt-4o";
  try {
    const result = resolveModel({
      cwd,
      agent: "bmad-ml-sova",
      cliModel: undefined,
      manifestModel: { provider: undefined, id: undefined },
    });
    assert.equal(result.source, "env");
    assert.equal(result.provider, "openai");
    assert.equal(result.id, "gpt-4o");
  } finally {
    if (prev === undefined) delete process.env.PI_PROVIDER;
    else process.env.PI_PROVIDER = prev;
    if (prevModel === undefined) delete process.env.PI_MODEL;
    else process.env.PI_MODEL = prevModel;
  }
});

test("resolveModel: malformed cliModel (no colon) is ignored", () => {
  const cwd = makeTempDir("dispatch-pi-badcli-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: "just-a-name",
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "manifest");
  assert.equal(result.provider, "google");
});

test("parsePiModelString accepts pi-native provider/id", () => {
  assert.deepEqual(parsePiModelString("anthropic/claude-sonnet-4"), {
    provider: "anthropic",
    id: "claude-sonnet-4",
    reasoning: undefined,
  });
  assert.deepEqual(parsePiModelString("openai/gpt-4o"), {
    provider: "openai",
    id: "gpt-4o",
    reasoning: undefined,
  });
});

test("parsePiModelString accepts pi-native provider/id:thinking", () => {
  assert.deepEqual(parsePiModelString("anthropic/claude-sonnet-4:high"), {
    provider: "anthropic",
    id: "claude-sonnet-4",
    reasoning: "high",
  });
  assert.deepEqual(parsePiModelString("google/gemini-2.5-pro:xhigh"), {
    provider: "google",
    id: "gemini-2.5-pro",
    reasoning: "xhigh",
  });
});

test("parsePiModelString accepts legacy provider:id", () => {
  assert.deepEqual(parsePiModelString("anthropic:claude-sonnet-4"), {
    provider: "anthropic",
    id: "claude-sonnet-4",
  });
});

test("parsePiModelString rejects bare names and empty input", () => {
  assert.equal(parsePiModelString(""), null);
  assert.equal(parsePiModelString("sonnet"), null);
  assert.equal(parsePiModelString(undefined), null);
});

test("parsePiModelString treats single-colon input as legacy provider:id", () => {
  // `sonnet:high` in pi's own CLI means name=sonnet thinking=high, but our dispatcher
  // must pass a concrete provider to pi, so we treat ambiguous single-colon input as
  // the legacy provider:id form. Users wanting pi's name-resolution should use
  // `provider/id:thinking` instead.
  assert.deepEqual(parsePiModelString("sonnet:high"), {
    provider: "sonnet",
    id: "high",
  });
});

test("parsePiModelString rejects malformed slash forms", () => {
  assert.equal(parsePiModelString("/gpt-4o"), null);
  assert.equal(parsePiModelString("openai/"), null);
  assert.equal(parsePiModelString("openai/:high"), null);
});

test("resolveModel: CLI accepts pi-native provider/id:thinking", () => {
  const cwd = makeTempDir("dispatch-pi-pinative-cli-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: "anthropic/claude-opus-4:high",
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "cli");
  assert.equal(result.provider, "anthropic");
  assert.equal(result.id, "claude-opus-4");
  assert.equal(result.reasoning, "high");
});

test("resolveModel: per-agent env accepts pi-native shorthand with embedded thinking", () => {
  const cwd = makeTempDir("dispatch-pi-pinative-env-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
    env: { BMAD_PI_MODEL_SOVA: "anthropic/claude-opus-4:high" },
  });
  assert.equal(result.source, "env-per-agent");
  assert.equal(result.provider, "anthropic");
  assert.equal(result.id, "claude-opus-4");
  assert.equal(result.reasoning, "high");
});

test("resolveModel: BMAD_PI_REASONING_<AGENT> still sets reasoning when shorthand omits it", () => {
  const cwd = makeTempDir("dispatch-pi-pinative-reasoning-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: undefined, id: undefined },
    env: {
      BMAD_PI_MODEL_SOVA: "anthropic/claude-opus-4",
      BMAD_PI_REASONING_SOVA: "medium",
    },
  });
  assert.equal(result.source, "env-per-agent");
  assert.equal(result.reasoning, "medium");
});

test("envSuffixFor strips bmad-ml-/bmad- prefix and normalizes hyphens", () => {
  assert.equal(envSuffixFor("bmad-ml-sova"), "SOVA");
  assert.equal(envSuffixFor("bmad-jett"), "JETT");
  assert.equal(envSuffixFor("bmad-ml-research-party"), "RESEARCH_PARTY");
  assert.equal(envSuffixFor("kayo"), "KAYO");
});

test("perAgentEnvModel parses provider:id and optional reasoning", () => {
  const env = {
    BMAD_PI_MODEL_SOVA: "anthropic:claude-opus-4",
    BMAD_PI_REASONING_SOVA: "high",
  };
  assert.deepEqual(perAgentEnvModel("bmad-ml-sova", env), {
    provider: "anthropic",
    id: "claude-opus-4",
    reasoning: "high",
  });
});

test("perAgentEnvModel returns null when env var missing or malformed", () => {
  assert.equal(perAgentEnvModel("bmad-ml-sova", {}), null);
  assert.equal(perAgentEnvModel("bmad-ml-sova", { BMAD_PI_MODEL_SOVA: "no-colon" }), null);
  assert.equal(perAgentEnvModel("bmad-ml-sova", { BMAD_PI_MODEL_SOVA: ":id-only" }), null);
  assert.equal(perAgentEnvModel("bmad-ml-sova", { BMAD_PI_MODEL_SOVA: "provider:" }), null);
});

test("resolveModel: per-agent env beats manifest", () => {
  const cwd = makeTempDir("dispatch-pi-peragent-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
    env: { BMAD_PI_MODEL_SOVA: "anthropic:claude-opus-4", BMAD_PI_REASONING_SOVA: "high" },
  });
  assert.equal(result.source, "env-per-agent");
  assert.equal(result.provider, "anthropic");
  assert.equal(result.id, "claude-opus-4");
  assert.equal(result.reasoning, "high");
});

test("resolveModel: per-agent env loses to config.yaml", () => {
  const cwd = makeTempDir("dispatch-pi-peragent-cfg-");
  writeFile(
    path.join(cwd, "_bmad", "config.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-sonnet-4
`,
  );
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
    env: { BMAD_PI_MODEL_SOVA: "anthropic:claude-opus-4" },
  });
  assert.equal(result.source, "config.yaml");
  assert.equal(result.id, "claude-sonnet-4");
});

test("resolveModel: per-agent env handles hyphenated agent names", () => {
  const cwd = makeTempDir("dispatch-pi-peragent-hyphen-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-research-party",
    cliModel: undefined,
    manifestModel: { provider: undefined, id: undefined },
    env: { BMAD_PI_MODEL_RESEARCH_PARTY: "openai:gpt-4o" },
  });
  assert.equal(result.source, "env-per-agent");
  assert.equal(result.provider, "openai");
  assert.equal(result.id, "gpt-4o");
});

test("resolveModel: per-agent env ignored when manifest set and per-agent missing", () => {
  const cwd = makeTempDir("dispatch-pi-peragent-missing-");
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
    env: { BMAD_PI_MODEL_JETT: "openai:gpt-4o" },
  });
  assert.equal(result.source, "manifest");
  assert.equal(result.provider, "google");
});

test("resolveModel: malformed .pi/settings.json falls through", () => {
  const cwd = makeTempDir("dispatch-pi-badjson-");
  writeFile(path.join(cwd, ".pi", "settings.json"), "{not valid json");
  writeFile(
    path.join(cwd, "_bmad", "config.yaml"),
    `ml:
  pi_models:
    sova:
      provider: anthropic
      id: claude-haiku-4
`,
  );
  const result = resolveModel({
    cwd,
    agent: "bmad-ml-sova",
    cliModel: undefined,
    manifestModel: { provider: "google", id: "gemini-1.5" },
  });
  assert.equal(result.source, "config.yaml");
  assert.equal(result.id, "claude-haiku-4");
});
