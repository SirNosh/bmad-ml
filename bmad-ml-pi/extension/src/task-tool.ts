import { Type } from "@sinclair/typebox";
import { Agent } from "@mariozechner/pi-agent-core";
import { getModel } from "@mariozechner/pi-ai";
import type { BmadTaskParams, ToolResult, SubagentEvent } from "./types";
import { loadSkill, resolveArtifactScope } from "./skill-loader";
import { provisionTools } from "./tool-provisioner";
import { buildSubagentPrompt } from "./prompt-builder";
import { enforceScopeGuardrail } from "./scope-guardrail";
import { resolveModel } from "./model-resolver";
import { translatePiEvent } from "./watch/translator";
import { createAnomalyWatcher } from "./watch/anomaly";

function emitUpdate(onUpdate: ((update: ToolResult) => void) | undefined, event: SubagentEvent) {
  if (!onUpdate) {
    return;
  }

  onUpdate({
    content: [{ type: "text", text: JSON.stringify(event) }],
    details: event as unknown as Record<string, unknown>,
  });
}

function extractFinalAssistantText(state: any): string {
  const messages = Array.isArray(state?.messages) ? state.messages : [];
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role === "assistant" && typeof message?.content === "string") {
      return message.content;
    }
  }
  return "Subagent completed with no assistant text.";
}

function countAssistantTurns(state: any): number {
  const messages = Array.isArray(state?.messages) ? state.messages : [];
  return messages.filter((message: any) => message?.role === "assistant").length;
}

function aggregateCost(state: any): number {
  const messages = Array.isArray(state?.messages) ? state.messages : [];
  return Number(
    messages
      .map((message: any) => Number(message?.usage?.costUsd ?? 0))
      .reduce((sum: number, cost: number) => sum + cost, 0)
      .toFixed(6),
  );
}

export function createBmadTaskTool() {
  return {
    name: "bmad_task",
    label: "BMad Task",
    description: "Delegate work to a bmad-ml specialist in an isolated pi-agent-core session.",
    parameters: Type.Object({
      subagent_type: Type.String(),
      directive: Type.String(),
      artifact_paths: Type.Array(Type.String()),
      output_path: Type.Optional(Type.String()),
      constraints: Type.Optional(Type.String()),
      mode: Type.Optional(Type.Union([Type.Literal("guided"), Type.Literal("yolo"), Type.Literal("headless")])),
      model: Type.Optional(
        Type.Object({
          provider: Type.Optional(Type.String()),
          id: Type.Optional(Type.String()),
          reasoning: Type.Optional(Type.String()),
        }),
      ),
    }),
    execute: async (
      toolCallId: string,
      params: BmadTaskParams,
      _signal?: AbortSignal,
      onUpdate?: (update: ToolResult) => void,
    ): Promise<ToolResult> => {
      const skill = loadSkill(`bmad-ml-${params.subagent_type}`);
      const tools = provisionTools(skill.manifest.pi_tools ?? []);
      const scope = resolveArtifactScope(skill.manifest);
      const prompt = buildSubagentPrompt(params, skill);
      const modelConfig = resolveModel(params.subagent_type, {
        override: params.model,
        manifest: skill.manifest,
      });

      const watcher = createAnomalyWatcher({
        agent: params.subagent_type,
        costCeiling: skill.manifest.pi_cost_ceiling,
      });

      emitUpdate(onUpdate, { kind: "phase", agent: params.subagent_type, phase: "loading", note: "starting isolated agent" });

      const subagent = new Agent({
        initialState: {
          systemPrompt: skill.persona,
          model: getModel(modelConfig.provider, modelConfig.id),
          tools,
          messages: [],
          thinkingLevel: skill.manifest.pi_thinking ?? "medium",
        },
        convertToLlm: (message: any) => message,
        toolExecution: "parallel",
        sessionId: `bmad-${params.subagent_type}-${toolCallId}`,
        beforeToolCall: enforceScopeGuardrail(scope),
      } as any);

      const unsubscribe = subagent.subscribe((event: any) => {
        const translated = translatePiEvent(event, params.subagent_type);
        for (const translatedEvent of translated) {
          emitUpdate(onUpdate, translatedEvent);
          for (const warning of watcher.observe(translatedEvent)) {
            emitUpdate(onUpdate, warning);
          }
        }

        const stalled = watcher.checkStalled();
        if (stalled) {
          emitUpdate(onUpdate, stalled);
        }
      });

      try {
        await subagent.prompt(prompt);
        await subagent.waitForIdle();
      } finally {
        unsubscribe();
      }

      if (subagent.state?.errorMessage) {
        throw new Error(`${params.subagent_type}: ${subagent.state.errorMessage}`);
      }

      const turns = countAssistantTurns(subagent.state);
      const cost = aggregateCost(subagent.state);
      const finalEvent: SubagentEvent = {
        kind: "final",
        agent: params.subagent_type,
        artifact: params.output_path ?? null,
        turns,
        cost_usd: cost,
      };
      emitUpdate(onUpdate, finalEvent);

      return {
        content: [{ type: "text", text: extractFinalAssistantText(subagent.state) }],
        details: {
          agent: params.subagent_type,
          artifact: params.output_path ?? null,
          turns,
          cost,
          provider: modelConfig.provider,
          model: modelConfig.id,
        },
      };
    },
  };
}
