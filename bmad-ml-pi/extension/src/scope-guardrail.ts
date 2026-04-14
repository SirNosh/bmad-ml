import path from "node:path";

function normalize(candidate: string): string {
  return path.resolve(candidate).replace(/\\/g, "/");
}

function isPathArg(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function enforceScopeGuardrail(scope: string[]) {
  const normalizedScope = scope.map((entry) => normalize(entry));

  return async ({ toolCall, args }: { toolCall?: { toolName?: string }; args?: Record<string, unknown> }) => {
    const toolName = toolCall?.toolName ?? "";
    const protectedTools = new Set(["read", "grep", "ls", "write", "edit"]);

    if (!protectedTools.has(toolName)) {
      return undefined;
    }

    const candidate = (args?.path ?? args?.pattern ?? args?.target) as unknown;
    if (!isPathArg(candidate)) {
      return undefined;
    }

    const normalizedCandidate = normalize(candidate);
    const allowed = normalizedScope.some((prefix) => normalizedCandidate.startsWith(prefix));

    if (allowed) {
      return undefined;
    }

    return {
      block: true,
      reason: `Path "${candidate}" is outside your declared scope: ${normalizedScope.join(", ")}.`,
    };
  };
}
