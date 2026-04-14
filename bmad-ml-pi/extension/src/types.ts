export type ExecutionMode = "guided" | "yolo" | "headless";

export interface BmadTaskParams {
  subagent_type: string;
  directive: string;
  artifact_paths: string[];
  output_path?: string;
  constraints?: string;
  mode?: ExecutionMode;
  model?: {
    provider?: string;
    id?: string;
    reasoning?: string;
  };
}

export interface PiModelConfig {
  provider: string;
  id: string;
  reasoning?: string;
}

export interface PiSkillManifest {
  type?: string;
  name: string;
  pi_tools?: string[];
  artifact_scope?: string[];
  pi_thinking?: "off" | "minimal" | "low" | "medium" | "high" | "xhigh";
  pi_model?: PiModelConfig;
  pi_cost_ceiling?: number;
  [key: string]: unknown;
}

export interface LoadedSkill {
  skillName: string;
  skillDir: string;
  persona: string;
  manifest: PiSkillManifest;
}

export interface ResolvedModel {
  provider: string;
  id: string;
  reasoning?: string;
}

export type SubagentEvent =
  | { kind: "phase"; agent: string; phase: "loading" | "reading" | "thinking" | "writing" | "done"; note?: string }
  | { kind: "tool_call"; agent: string; tool: string; args_preview: string }
  | { kind: "tool_result"; agent: string; tool: string; ok: boolean; summary: string }
  | { kind: "text_chunk"; agent: string; delta: string }
  | { kind: "token_usage"; agent: string; input: number; output: number; cost_usd: number }
  | { kind: "warning"; agent: string; code: "tool_loop" | "high_cost" | "stalled"; detail: string }
  | { kind: "final"; agent: string; artifact: string | null; turns: number; cost_usd: number };

export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  details?: Record<string, unknown>;
}

export interface AgentToolLike {
  name: string;
  label: string;
  description: string;
  parameters?: unknown;
  execute: (
    toolCallId: string,
    params: Record<string, unknown>,
    signal?: AbortSignal,
    onUpdate?: (update: ToolResult) => void,
  ) => Promise<ToolResult>;
}
