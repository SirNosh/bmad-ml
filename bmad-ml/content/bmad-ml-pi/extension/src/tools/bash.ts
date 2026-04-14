import { spawn } from "node:child_process";

export function createBashTool() {
  return {
    name: "bash",
    label: "Run shell command",
    description: "Execute a shell command in the current workspace.",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string" },
      },
      required: ["command"],
    },
    execute: async (_toolCallId: string, params: Record<string, unknown>) => {
      const command = String(params.command ?? "");
      const shell = process.platform === "win32" ? "powershell" : "bash";
      const shellArgs = process.platform === "win32" ? ["-NoProfile", "-Command", command] : ["-lc", command];

      const output = await new Promise<string>((resolve, reject) => {
        const proc = spawn(shell, shellArgs, { stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";

        proc.stdout.on("data", (chunk) => {
          stdout += chunk.toString();
        });

        proc.stderr.on("data", (chunk) => {
          stderr += chunk.toString();
        });

        proc.on("close", (code) => {
          if (code === 0) {
            resolve(stdout.trim());
          } else {
            reject(new Error(stderr.trim() || `command failed with code ${code}`));
          }
        });
      });

      return {
        content: [{ type: "text", text: output || "ok" }],
      };
    },
  };
}
