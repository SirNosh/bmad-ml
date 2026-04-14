import fs from "node:fs";
import path from "node:path";

export function createWriteTool() {
  return {
    name: "write",
    label: "Write file",
    description: "Write text content to a file.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
        content: { type: "string" },
      },
      required: ["path", "content"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const filePath = String(params.path ?? "");
      const content = String(params.content ?? "");
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
      return {
        content: [{ type: "text", text: `wrote ${filePath}` }],
      };
    },
  };
}
