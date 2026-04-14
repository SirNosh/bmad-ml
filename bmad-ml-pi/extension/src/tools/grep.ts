import fs from "node:fs";
import path from "node:path";

function walkFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

export function createGrepTool() {
  return {
    name: "grep",
    label: "Search text",
    description: "Search for a pattern in files under a directory.",
    parameters: {
      type: "object",
      properties: {
        pattern: { type: "string" },
        path: { type: "string" },
      },
      required: ["pattern", "path"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const pattern = String(params.pattern ?? "");
      const root = String(params.path ?? "");
      const regex = new RegExp(pattern, "i");
      const hits: string[] = [];
      for (const file of walkFiles(root)) {
        const content = fs.readFileSync(file, "utf8");
        if (regex.test(content)) {
          hits.push(file);
        }
      }
      return {
        content: [{ type: "text", text: hits.join("\n") || "no matches" }],
      };
    },
  };
}
