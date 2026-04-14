import fs from "node:fs";
import path from "node:path";

function safeRead(filePath) {
  if (!fs.existsSync(filePath)) {
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

function loadSkill(skillName, cwd = process.cwd()) {
  const skillDir = path.join(cwd, ".pi", "skills", skillName);
  const persona = safeRead(path.join(skillDir, "SKILL.md"));
  const manifestRaw = safeRead(path.join(skillDir, "bmad-skill-manifest.yaml"));
  const piTools = [];
  let inTools = false;
  for (const line of manifestRaw.split(/\r?\n/)) {
    if (/^pi_tools:\s*$/.test(line)) {
      inTools = true;
      continue;
    }
    if (inTools && /^[a-z_]+:/.test(line.trim())) {
      inTools = false;
    }
    const toolMatch = line.match(/^\s*-\s*([a-z_]+)\s*$/);
    if (inTools && toolMatch) {
      piTools.push(toolMatch[1]);
    }
  }
  return {
    persona,
    piTools,
  };
}

function createBmadTaskTool() {
  return {
    name: "bmad_task",
    label: "BMad Task",
    description: "Delegate to a bmad specialist in isolated mode.",
    parameters: {
      type: "object",
      properties: {
        subagent_type: { type: "string" },
        directive: { type: "string" },
        artifact_paths: { type: "array", items: { type: "string" } },
        output_path: { type: "string" },
        constraints: { type: "string" },
        mode: { type: "string" },
      },
      required: ["subagent_type", "directive", "artifact_paths"],
    },
    execute: async (_toolCallId, params, _signal, onUpdate) => {
      const skillName = `bmad-ml-${params.subagent_type}`;
      const skill = loadSkill(skillName);

      if (onUpdate) {
        onUpdate({
          content: [{ type: "text", text: JSON.stringify({ kind: "phase", agent: params.subagent_type, phase: "loading" }) }],
          details: {},
        });
      }

      const summary = [
        `Delegated to ${params.subagent_type}`,
        `Directive: ${params.directive}`,
        `Artifacts: ${(params.artifact_paths || []).join(", ")}`,
        `Allowed tools: ${(skill.piTools || []).join(", ") || "none"}`,
      ].join("\n");

      return {
        content: [{ type: "text", text: summary }],
        details: {
          agent: params.subagent_type,
          artifact: params.output_path || null,
          turns: 1,
          cost: 0,
          persona_loaded: Boolean(skill.persona),
        },
      };
    },
  };
}

export default function register(pi) {
  pi.registerTool(createBmadTaskTool());
}
