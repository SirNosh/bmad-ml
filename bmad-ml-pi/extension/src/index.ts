import { createBmadTaskTool } from "./task-tool";

export default function registerBmadPiExtension(pi: { registerTool: (tool: unknown) => void }) {
  pi.registerTool(createBmadTaskTool());
}
