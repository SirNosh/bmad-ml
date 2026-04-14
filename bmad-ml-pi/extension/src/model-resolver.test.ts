import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveModel } from "./model-resolver";

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

describe("resolveModel", () => {
  it("respects precedence and falls back", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "bmad-model-"));

    write(path.join(cwd, ".pi", "settings.json"), JSON.stringify({ bmad_ml: { models: { sova: { provider: "google", id: "gemini" } } } }));
    write(path.join(cwd, "_bmad", "config.user.yaml"), "ml:\n  pi_models:\n    sova:\n      provider: openai\n      id: gpt-5\n");
    write(path.join(cwd, "_bmad", "config.yaml"), "ml:\n  pi_models:\n    sova:\n      provider: anthropic\n      id: claude-sonnet-4\n");

    const model = resolveModel("sova", {
      cwd,
      override: { provider: "anthropic", id: "claude-opus" },
      manifest: { name: "bmad-ml-sova", pi_model: { provider: "anthropic", id: "claude-haiku" } },
    });

    expect(model.provider).toBe("anthropic");
    expect(model.id).toBe("claude-opus");

    const noOverride = resolveModel("sova", {
      cwd,
      manifest: { name: "bmad-ml-sova", pi_model: { provider: "anthropic", id: "claude-haiku" } },
    });

    expect(noOverride.provider).toBe("google");
    expect(noOverride.id).toBe("gemini");
  });
});
