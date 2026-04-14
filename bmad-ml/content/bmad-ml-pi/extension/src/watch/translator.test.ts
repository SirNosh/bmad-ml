import { describe, expect, it } from "vitest";
import { translatePiEvent } from "./translator";

describe("translatePiEvent", () => {
  it("maps tool and usage events", () => {
    const toolEvents = translatePiEvent({ type: "tool_execution_start", toolName: "grep", args: { pattern: "x" } }, "sova");
    expect(toolEvents[0]).toMatchObject({ kind: "tool_call", tool: "grep", agent: "sova" });

    const usageEvents = translatePiEvent({ type: "message_end", usage: { inputTokens: 100, outputTokens: 20 } }, "sova");
    expect(usageEvents[0]).toMatchObject({ kind: "token_usage", agent: "sova", input: 100, output: 20 });
  });
});
