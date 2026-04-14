import fs from "node:fs";

export function createLsTool() {
  return {
    name: "ls",
    label: "List directory",
    description: "List directory entries.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const dirPath = String(params.path ?? ".");
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      const lines = entries.map((entry) => `${entry.isDirectory() ? "d" : "f"} ${entry.name}`);
      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  };
}
