import fs from "node:fs";
import path from "node:path";
import { load as parseYaml } from "js-yaml";
import type { LoadedSkill, PiSkillManifest } from "./types";

const FALLBACK_SCOPE = ["{planning_artifacts}", "{experiment_artifacts}"];

function readYamlFile(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseYaml(content);
  return (parsed as Record<string, unknown>) ?? {};
}

function resolveToken(token: string, replacements: Record<string, string>): string {
  const match = token.match(/^\{(.+)\}$/);
  if (!match) {
    return token;
  }

  const key = match[1];
  return replacements[key] ?? token;
}

export function resolveArtifactScope(
  manifest: PiSkillManifest,
  cwd = process.cwd(),
): string[] {
  const projectConfig = readYamlFile(path.join(cwd, "_bmad", "config.yaml"));
  const mlConfig = (projectConfig.ml as Record<string, unknown>) ?? {};

  const replacements: Record<string, string> = {
    planning_artifacts: String(mlConfig.planning_artifacts ?? path.join(cwd, "docs", "planning")),
    experiment_artifacts: String(mlConfig.experiment_artifacts ?? path.join(cwd, "docs", "experiments")),
    project_knowledge: String(mlConfig.project_knowledge ?? path.join(cwd, "docs")),
    project_root: cwd,
  };

  const declared = manifest.artifact_scope && manifest.artifact_scope.length > 0
    ? manifest.artifact_scope
    : FALLBACK_SCOPE;

  return declared.map((entry) => path.resolve(cwd, resolveToken(entry, replacements)));
}

export function loadSkill(skillName: string, cwd = process.cwd()): LoadedSkill {
  const skillDir = path.join(cwd, ".pi", "skills", skillName);
  const skillFile = path.join(skillDir, "SKILL.md");
  const manifestFile = path.join(skillDir, "bmad-skill-manifest.yaml");

  if (!fs.existsSync(skillFile)) {
    throw new Error(`Skill file not found: ${skillFile}`);
  }

  if (!fs.existsSync(manifestFile)) {
    throw new Error(`Skill manifest not found: ${manifestFile}`);
  }

  const persona = fs.readFileSync(skillFile, "utf8");
  const parsed = parseYaml(fs.readFileSync(manifestFile, "utf8"));
  const manifest = (parsed as PiSkillManifest) ?? ({ name: skillName } as PiSkillManifest);

  if (!manifest.name) {
    manifest.name = skillName;
  }

  if (!manifest.pi_tools) {
    manifest.pi_tools = ["read", "ls"];
  }

  return {
    skillName,
    skillDir,
    persona,
    manifest,
  };
}
