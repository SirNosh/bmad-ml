import fs from "node:fs";

export function createEditTool() {
  return {
    name: "edit",
    label: "Edit file",
    description: "Replace text in a file.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
        find: { type: "string" },
        replace: { type: "string" },
      },
      required: ["path", "find", "replace"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const filePath = String(params.path ?? "");
      const find = String(params.find ?? "");
      const replace = String(params.replace ?? "");
      const content = fs.readFileSync(filePath, "utf8");
      const next = content.replace(find, replace);
      fs.writeFileSync(filePath, next);
      return {
        content: [{ type: "text", text: `edited ${filePath}` }],
      };
    },
  };
}
