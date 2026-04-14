import fs from "node:fs";

export function createReadTool() {
  return {
    name: "read",
    label: "Read file",
    description: "Read a text file from disk.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const filePath = String(params.path ?? "");
      const text = fs.readFileSync(filePath, "utf8");
      return {
        content: [{ type: "text", text }],
      };
    },
  };
}
