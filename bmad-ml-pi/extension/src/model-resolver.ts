import fs from "node:fs";
import path from "node:path";
import { load as parseYaml } from "js-yaml";
import type { PiSkillManifest, ResolvedModel } from "./types";

function readJson(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

function readYaml(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const parsed = parseYaml(fs.readFileSync(filePath, "utf8"));
    return (parsed as Record<string, unknown>) ?? {};
  } catch {
    return {};
  }
}

function pickConfig(config: unknown): Partial<ResolvedModel> | null {
  if (!config || typeof config !== "object") {
    return null;
  }
  const candidate = config as Record<string, unknown>;
  const provider = candidate.provider;
  const id = candidate.id;
  if (typeof provider === "string" && typeof id === "string") {
    return {
      provider,
      id,
      reasoning: typeof candidate.reasoning === "string" ? candidate.reasoning : undefined,
    };
  }
  return null;
}

function normalizeAgent(agent: string): string {
  return agent.replace(/^bmad-ml-/, "").replace(/^bmad-/, "");
}

export function resolveModel(
  agent: string,
  options: {
    override?: Partial<ResolvedModel>;
    manifest?: PiSkillManifest;
    cwd?: string;
  } = {},
): ResolvedModel {
  const cwd = options.cwd ?? process.cwd();
  const key = normalizeAgent(agent);

  const piSettings = readJson(path.join(cwd, ".pi", "settings.json"));
  const piUserModel = pickConfig(
    (((piSettings.bmad_ml as Record<string, unknown>)?.models as Record<string, unknown>) ?? {})[key],
  );

  const userConfig = readYaml(path.join(cwd, "_bmad", "config.user.yaml"));
  const userModel = pickConfig(
    ((((userConfig.ml as Record<string, unknown>)?.pi_models as Record<string, unknown>) ?? {})[key]),
  );

  const sharedConfig = readYaml(path.join(cwd, "_bmad", "config.yaml"));
  const sharedModel = pickConfig(
    ((((sharedConfig.ml as Record<string, unknown>)?.pi_models as Record<string, unknown>) ?? {})[key]),
  );

  const manifestModel = pickConfig(options.manifest?.pi_model);
  const overrideModel = pickConfig(options.override);

  const chain = [overrideModel, piUserModel, userModel, sharedModel, manifestModel];
  const selected = chain.find((entry) => entry?.provider && entry?.id);

  if (selected && selected.provider && selected.id) {
    return {
      provider: selected.provider,
      id: selected.id,
      reasoning: selected.reasoning,
    };
  }

  return {
    provider: process.env.PI_PROVIDER ?? process.env.BMAD_PI_PROVIDER ?? "anthropic",
    id: process.env.PI_MODEL ?? process.env.BMAD_PI_MODEL ?? "claude-sonnet-4",
    reasoning: process.env.PI_REASONING ?? undefined,
  };
}
