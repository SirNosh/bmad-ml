#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

function usage() {
  console.error("Usage: node .bmad-ml/dispatch-pi.mjs <agent> <prompt-file> [--model <provider:id>] [--timeout <seconds>]");
}

function readIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function parseSimpleYamlForAgent(yamlText, agent) {
  const key = agent.replace(/^bmad-ml-/, "").replace(/^bmad-/, "");
  const lines = yamlText.split(/\r?\n/);
  let inMl = false;
  let inPiModels = false;
  let inAgent = false;
  const model = {};

  for (const line of lines) {
    if (/^ml:\s*$/.test(line)) {
      inMl = true;
      inPiModels = false;
      inAgent = false;
      continue;
    }

    if (inMl && /^\s{2}pi_models:\s*$/.test(line)) {
      inPiModels = true;
      inAgent = false;
      continue;
    }

    const agentMatch = line.match(/^\s{4}([a-zA-Z0-9_-]+):\s*$/);
    if (inPiModels && agentMatch) {
      inAgent = agentMatch[1] === key;
      continue;
    }

    if (inAgent) {
      const providerMatch = line.match(/^\s{6}provider:\s*(.+)\s*$/);
      if (providerMatch) {
        model.provider = providerMatch[1].trim();
      }
      const idMatch = line.match(/^\s{6}id:\s*(.+)\s*$/);
      if (idMatch) {
        model.id = idMatch[1].trim();
      }
      const reasoningMatch = line.match(/^\s{6}reasoning:\s*(.+)\s*$/);
      if (reasoningMatch) {
        model.reasoning = reasoningMatch[1].trim();
      }
    }
  }

  if (model.provider && model.id) {
    return model;
  }

  return null;
}

function parseSimpleManifest(manifestText) {
  const lines = manifestText.split(/\r?\n/);
  const result = {
    tools: [],
    thinking: undefined,
    provider: undefined,
    id: undefined,
    reasoning: undefined,
  };

  let inTools = false;
  let inModel = false;

  for (const line of lines) {
    if (/^pi_tools:\s*$/.test(line)) {
      inTools = true;
      inModel = false;
      continue;
    }
    if (/^artifact_scope:\s*$/.test(line) || /^pi_thinking:\s*/.test(line) || /^pi_model:\s*$/.test(line)) {
      if (/^pi_thinking:\s*/.test(line)) {
        result.thinking = line.split(":").slice(1).join(":").trim();
      }
      if (/^pi_model:\s*$/.test(line)) {
        inModel = true;
      }
      inTools = false;
    }

    if (inTools) {
      const toolMatch = line.match(/^\s*-\s*([a-z_]+)\s*$/);
      if (toolMatch) {
        result.tools.push(toolMatch[1]);
      }
    }

    if (inModel) {
      const providerMatch = line.match(/^\s{2}provider:\s*(.+)\s*$/);
      if (providerMatch) {
        result.provider = providerMatch[1].trim();
      }
      const idMatch = line.match(/^\s{2}id:\s*(.+)\s*$/);
      if (idMatch) {
        result.id = idMatch[1].trim();
      }
      const reasoningMatch = line.match(/^\s{2}reasoning:\s*(.+)\s*$/);
      if (reasoningMatch) {
        result.reasoning = reasoningMatch[1].trim();
      }
    }
  }

  return result;
}

function agentKey(agent) {
  return agent.replace(/^bmad-ml-/, "").replace(/^bmad-/, "");
}

function envSuffixFor(agent) {
  return agentKey(agent).toUpperCase().replace(/-/g, "_");
}

// Accepts pi's native `provider/id[:thinking]` shorthand (e.g. `anthropic/claude-sonnet-4:high`,
// `openai/gpt-4o`) as well as the legacy `provider:id` colon form. Returns null for name-only
// inputs like `sonnet:high` where we cannot infer a provider to pass to pi.
function parsePiModelString(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    return null;
  }
  const trimmed = raw.trim();

  const slashIndex = trimmed.indexOf("/");
  if (slashIndex > 0) {
    const provider = trimmed.slice(0, slashIndex);
    const rest = trimmed.slice(slashIndex + 1);
    if (!rest) return null;
    const [id, ...thinkingParts] = rest.split(":");
    if (!id) return null;
    const thinking = thinkingParts.join(":").trim();
    return {
      provider,
      id,
      reasoning: thinking || undefined,
    };
  }

  const colonIndex = trimmed.indexOf(":");
  if (colonIndex > 0) {
    const provider = trimmed.slice(0, colonIndex);
    const id = trimmed.slice(colonIndex + 1).trim();
    if (!provider || !id) return null;
    return { provider, id };
  }

  return null;
}

function perAgentEnvModel(agent, env = process.env) {
  const suffix = envSuffixFor(agent);
  const parsed = parsePiModelString(env[`BMAD_PI_MODEL_${suffix}`]);
  if (!parsed) {
    return null;
  }
  return {
    ...parsed,
    reasoning: parsed.reasoning ?? env[`BMAD_PI_REASONING_${suffix}`],
  };
}

function resolveModel({ cwd, agent, cliModel, manifestModel, env = process.env }) {
  const cli = parsePiModelString(cliModel);
  if (cli) {
    return { ...cli, source: "cli" };
  }

  // `bmad_ml.models.<agent>` is a bmad-ml-private namespace read by this
  // dispatcher only. The `pi` CLI itself does not consult this key — it reads
  // its own top-level settings (defaultProvider, defaultModel, etc.).
  const settingsPath = path.join(cwd, ".pi", "settings.json");
  if (fs.existsSync(settingsPath)) {
    try {
      const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
      const setting = settings?.bmad_ml?.models?.[agentKey(agent)];
      if (setting?.provider && setting?.id) {
        return { provider: setting.provider, id: setting.id, reasoning: setting.reasoning, source: "pi-settings" };
      }
    } catch {
      // ignore parse errors and continue fallback chain
    }
  }

  const userCfg = parseSimpleYamlForAgent(readIfExists(path.join(cwd, "_bmad", "config.user.yaml")), agent);
  if (userCfg?.provider && userCfg?.id) {
    return { ...userCfg, source: "config.user.yaml" };
  }

  const sharedCfg = parseSimpleYamlForAgent(readIfExists(path.join(cwd, "_bmad", "config.yaml")), agent);
  if (sharedCfg?.provider && sharedCfg?.id) {
    return { ...sharedCfg, source: "config.yaml" };
  }

  const perAgent = perAgentEnvModel(agent, env);
  if (perAgent) {
    return { ...perAgent, source: "env-per-agent" };
  }

  if (manifestModel?.provider && manifestModel?.id) {
    return { ...manifestModel, source: "manifest" };
  }

  return {
    provider: env.PI_PROVIDER || env.BMAD_PI_PROVIDER || "opencode-go",
    id: env.PI_MODEL || env.BMAD_PI_MODEL || "glm-5.1",
    reasoning: env.PI_REASONING,
    source: "env",
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    usage();
    process.exit(1);
  }

  const agent = args[0];
  const promptFile = args[1];
  let cliModel;
  let timeoutSec = 900;

  for (let i = 2; i < args.length; i += 1) {
    if (args[i] === "--model" && args[i + 1]) {
      cliModel = args[i + 1];
      i += 1;
      continue;
    }
    if (args[i] === "--timeout" && args[i + 1]) {
      timeoutSec = Number(args[i + 1]);
      i += 1;
      continue;
    }
  }

  const cwd = process.cwd();
  const skillName = `bmad-ml-${agent.replace(/^bmad-/, "")}`;
  const skillDir = path.join(cwd, ".pi", "skills", skillName);
  const manifestPath = path.join(skillDir, "bmad-skill-manifest.yaml");
  if (!fs.existsSync(manifestPath)) {
    console.error(`Missing skill manifest: ${manifestPath}`);
    process.exit(2);
  }

  const manifest = parseSimpleManifest(fs.readFileSync(manifestPath, "utf8"));
  const model = resolveModel({ cwd, agent, cliModel, manifestModel: { provider: manifest.provider, id: manifest.id, reasoning: manifest.reasoning } });
  const prompt = fs.readFileSync(promptFile, "utf8");

  const piArgs = [
    "-p",
    "--no-session",
    "--mode",
    "json",
    "--skill",
    skillName,
    "--provider",
    model.provider,
    "--model",
    model.id,
  ];

  if (manifest.tools.length > 0) {
    piArgs.push("--tools", manifest.tools.join(","));
  }

  if (manifest.thinking) {
    piArgs.push("--thinking", manifest.thinking);
  }

  const child = spawn("pi", piArgs, {
    cwd,
    stdio: ["pipe", "pipe", "pipe"],
  });

  const timer = setTimeout(() => {
    child.kill("SIGTERM");
  }, timeoutSec * 1000);

  child.stdin.write(prompt);
  child.stdin.end();

  child.stdout.on("data", (chunk) => {
    process.stdout.write(chunk.toString());
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(chunk.toString());
  });

  child.on("close", (code) => {
    clearTimeout(timer);
    if (code === 0) {
      process.exit(0);
    }
    process.exit(code ?? 1);
  });
}

export {
  parseSimpleYamlForAgent,
  parseSimpleManifest,
  resolveModel,
  perAgentEnvModel,
  envSuffixFor,
  parsePiModelString,
};

const invokedAsScript = import.meta.url === `file://${process.argv[1]}`;
if (invokedAsScript) {
  main().catch((error) => {
    console.error(error?.stack || String(error));
    process.exit(1);
  });
}
