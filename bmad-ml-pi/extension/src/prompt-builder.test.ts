import { describe, expect, it } from "vitest";
import { buildSubagentPrompt } from "./prompt-builder";

describe("buildSubagentPrompt", () => {
  it("renders the curated payload fields", () => {
    const prompt = buildSubagentPrompt(
      {
        subagent_type: "sova",
        directive: "Review LoRA literature",
        artifact_paths: ["_bmad/config.yaml", "docs/planning/brief.md"],
        output_path: "docs/planning/literature-review.md",
        constraints: "Use 2022+ sources",
        mode: "headless",
      },
      {
        skillName: "bmad-ml-sova",
        skillDir: "x",
        persona: "persona",
        manifest: { name: "bmad-ml-sova" },
      },
    );

    expect(prompt).toContain("Review LoRA literature");
    expect(prompt).toContain("_bmad/config.yaml");
    expect(prompt).toContain("docs/planning/literature-review.md");
    expect(prompt).toContain("Use 2022+ sources");
  });
});
