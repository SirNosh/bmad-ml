import { describe, expect, it } from "vitest";
import { createAnomalyWatcher } from "./anomaly";

describe("createAnomalyWatcher", () => {
  it("emits loop, high-cost, and stalled warnings", () => {
    let now = 0;
    const watcher = createAnomalyWatcher({ agent: "sova", costCeiling: 0.01, now: () => now });

    let warnings = [] as any[];
    for (let i = 0; i < 6; i += 1) {
      warnings = warnings.concat(watcher.observe({ kind: "tool_call", agent: "sova", tool: "grep", args_preview: "x" } as any));
    }
    expect(warnings.some((warning) => warning.code === "tool_loop")).toBe(true);

    warnings = watcher.observe({ kind: "token_usage", agent: "sova", input: 10, output: 10, cost_usd: 0.02 } as any);
    expect(warnings.some((warning) => warning.code === "high_cost")).toBe(true);

    now = 120000;
    const stalled = watcher.checkStalled();
    expect(stalled?.code).toBe("stalled");
  });
});
