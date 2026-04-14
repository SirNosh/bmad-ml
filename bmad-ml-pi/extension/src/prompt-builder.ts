import type { BmadTaskParams, LoadedSkill } from "./types";

export interface PromptBuilderContext {
  projectName?: string;
  framework?: string;
  tracker?: string;
  planningArtifactsDir?: string;
  experimentArtifactsDir?: string;
}

function renderArtifacts(paths: string[]): string {
  if (paths.length === 0) {
    return "- none provided";
  }

  return paths.map((p) => `- ${p}`).join("\n");
}

export function buildSubagentPrompt(
  params: BmadTaskParams,
  _skill: LoadedSkill,
  context: PromptBuilderContext = {},
): string {
  const projectName = context.projectName ?? "unknown-project";
  const framework = context.framework ?? "unknown-framework";
  const tracker = context.tracker ?? "unknown-tracker";
  const planning = context.planningArtifactsDir ?? "docs/planning";
  const experiments = context.experimentArtifactsDir ?? "docs/experiments";

  return [
    "## Task from Nosh",
    "",
    `**Directive:** ${params.directive}`,
    "",
    "**Project context**",
    "- Config: _bmad/config.yaml (section: ml), _bmad/config.user.yaml",
    `- Project: ${projectName} (${framework}, tracker: ${tracker})`,
    "",
    "**Primary artifacts (READ THESE FIRST):**",
    renderArtifacts(params.artifact_paths ?? []),
    "",
    "**Workspace discretion:**",
    `You may read adjacent files under ${planning}/ and ${experiments}/ if clearly relevant.`,
    "Do not read source code unless your skill explicitly allows it.",
    "",
    `**Expected output:** ${params.output_path ?? "return structured summary"}`,
    "",
    `**Constraints:** ${params.constraints ?? "none beyond skill defaults"}`,
    "",
    `**Execution mode:** ${params.mode ?? "headless"}`,
  ].join("\n");
}
