import type { AgentToolLike } from "./types";
import { createReadTool } from "./tools/read";
import { createGrepTool } from "./tools/grep";
import { createLsTool } from "./tools/ls";
import { createWriteTool } from "./tools/write";
import { createEditTool } from "./tools/edit";
import { createBashTool } from "./tools/bash";
import { createWebSearchTool } from "./tools/web-search";

export function provisionTools(toolNames: string[]): AgentToolLike[] {
  const registry: Record<string, () => AgentToolLike> = {
    read: createReadTool,
    grep: createGrepTool,
    ls: createLsTool,
    write: createWriteTool,
    edit: createEditTool,
    bash: createBashTool,
    web_search: createWebSearchTool,
  };

  const uniqueNames = Array.from(new Set(toolNames));
  const tools: AgentToolLike[] = [];

  for (const name of uniqueNames) {
    if (name === "bmad_task") {
      continue;
    }

    const factory = registry[name];
    if (!factory) {
      continue;
    }

    tools.push(factory());
  }

  return tools;
}
