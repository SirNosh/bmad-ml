import type { SubagentEvent } from "../types";

export interface AnomalyOptions {
  agent: string;
  costCeiling?: number;
  stallMs?: number;
  loopThreshold?: number;
  now?: () => number;
}

export function createAnomalyWatcher(options: AnomalyOptions) {
  const now = options.now ?? (() => Date.now());
  const costCeiling = options.costCeiling ?? 0.5;
  const stallMs = options.stallMs ?? 60000;
  const loopThreshold = options.loopThreshold ?? 5;

  let lastEventTs = now();
  let consecutiveTool = "";
  let consecutiveCount = 0;
  let cumulativeCost = 0;
  let loopWarningEmitted = false;
  let highCostWarningEmitted = false;

  function observe(event: SubagentEvent): SubagentEvent[] {
    lastEventTs = now();
    const warnings: SubagentEvent[] = [];

    if (event.kind === "tool_call") {
      if (event.tool === consecutiveTool) {
        consecutiveCount += 1;
      } else {
        consecutiveTool = event.tool;
        consecutiveCount = 1;
        loopWarningEmitted = false;
      }

      if (!loopWarningEmitted && consecutiveCount > loopThreshold) {
        loopWarningEmitted = true;
        warnings.push({
          kind: "warning",
          agent: options.agent,
          code: "tool_loop",
          detail: `${event.tool} called ${consecutiveCount} times consecutively`,
        });
      }
    }

    if (event.kind === "token_usage") {
      cumulativeCost += event.cost_usd;
      if (!highCostWarningEmitted && cumulativeCost >= costCeiling) {
        highCostWarningEmitted = true;
        warnings.push({
          kind: "warning",
          agent: options.agent,
          code: "high_cost",
          detail: `Cost ${cumulativeCost.toFixed(3)} exceeded ceiling ${costCeiling.toFixed(3)}`,
        });
      }
    }

    return warnings;
  }

  function checkStalled(): SubagentEvent | null {
    if (now() - lastEventTs < stallMs) {
      return null;
    }

    return {
      kind: "warning",
      agent: options.agent,
      code: "stalled",
      detail: `No subagent events received for ${Math.round(stallMs / 1000)}s`,
    };
  }

  return {
    observe,
    checkStalled,
  };
}
