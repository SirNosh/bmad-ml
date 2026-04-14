import { describe, expect, it } from "vitest";
import { provisionTools } from "./tool-provisioner";

describe("provisionTools", () => {
  it("returns only declared tools", () => {
    const tools = provisionTools(["read", "grep", "ls", "web_search"]);
    const names = tools.map((tool) => tool.name);

    expect(names).toEqual(["read", "grep", "ls", "web_search"]);
    expect(names).not.toContain("bash");
  });
});
