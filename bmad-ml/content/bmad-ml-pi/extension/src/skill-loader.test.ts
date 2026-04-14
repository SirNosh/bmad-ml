import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadSkill, resolveArtifactScope } from "./skill-loader";

function write(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

describe("loadSkill", () => {
  it("loads manifest and skill persona", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "bmad-skill-"));
    write(path.join(cwd, ".pi", "skills", "bmad-ml-sova", "SKILL.md"), "# Persona");
    write(
      path.join(cwd, ".pi", "skills", "bmad-ml-sova", "bmad-skill-manifest.yaml"),
      "name: bmad-ml-sova\npi_tools:\n  - read\n  - grep\n  - ls\n  - web_search\nartifact_scope:\n  - \"{planning_artifacts}\"\n",
    );

    const loaded = loadSkill("bmad-ml-sova", cwd);
    expect(loaded.manifest.pi_tools).toEqual(["read", "grep", "ls", "web_search"]);
    expect(loaded.persona).toContain("Persona");

    const scope = resolveArtifactScope(loaded.manifest, cwd);
    expect(scope.length).toBeGreaterThan(0);
  });
});
