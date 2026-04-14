import type { SubagentEvent } from "../types";

function truncate(value: unknown, max = 200): string {
  const text = typeof value === "string" ? value : JSON.stringify(value ?? "");
  if (text.length <= max) {
    return text;
  }
  return `${text.slice(0, max)}...`;
}

function estimateCost(input: number, output: number): number {
  const total = input + output;
  return Number((total * 0.000002).toFixed(6));
}

export function translatePiEvent(evt: any, agent: string): SubagentEvent[] {
  if (!evt || typeof evt !== "object") {
    return [];
  }

  if (evt.type === "turn_start") {
    return [{ kind: "phase", agent, phase: "thinking", note: "turn started" }];
  }

  if (evt.type === "turn_end") {
    return [{ kind: "phase", agent, phase: "done", note: "turn finished" }];
  }

  if (evt.type === "tool_execution_start") {
    return [{ kind: "tool_call", agent, tool: String(evt.toolName ?? "unknown"), args_preview: truncate(evt.args) }];
  }

  if (evt.type === "tool_execution_end") {
    return [
      {
        kind: "tool_result",
        agent,
        tool: String(evt.toolName ?? "unknown"),
        ok: !Boolean(evt.isError),
        summary: truncate(evt.result),
      },
    ];
  }

  if (evt.type === "message_update" && evt.assistantMessageEvent?.type === "text_delta") {
    return [{ kind: "text_chunk", agent, delta: String(evt.assistantMessageEvent.delta ?? "") }];
  }

  if (evt.type === "message_end" && evt.usage) {
    const input = Number(evt.usage.inputTokens ?? evt.usage.input ?? 0);
    const output = Number(evt.usage.outputTokens ?? evt.usage.output ?? 0);
    return [{ kind: "token_usage", agent, input, output, cost_usd: estimateCost(input, output) }];
  }

  return [];
}
