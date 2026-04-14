import { describe, expect, it } from "vitest";
import { createBmadTaskTool } from "./task-tool";

describe("createBmadTaskTool", () => {
  it("exposes bmad_task metadata", () => {
    const tool = createBmadTaskTool();
    expect(tool.name).toBe("bmad_task");
    expect(typeof tool.execute).toBe("function");
  });
});
