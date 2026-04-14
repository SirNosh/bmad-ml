import { describe, expect, it } from "vitest";
import path from "node:path";
import { enforceScopeGuardrail } from "./scope-guardrail";

describe("enforceScopeGuardrail", () => {
  it("allows in-scope and blocks out-of-scope paths", async () => {
    const scopeDir = path.resolve("docs/planning");
    const hook = enforceScopeGuardrail([scopeDir]);

    const allow = await hook({ toolCall: { toolName: "read" }, args: { path: path.join(scopeDir, "foo.md") } });
    expect(allow).toBeUndefined();

    const block = await hook({ toolCall: { toolName: "read" }, args: { path: path.resolve("src/model.py") } });
    expect(block?.block).toBe(true);
    expect(block?.reason).toContain("outside your declared scope");
  });
});
