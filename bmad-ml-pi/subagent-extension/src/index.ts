import { loadSkill, resolveArtifactScope } from "../../extension/src/skill-loader";
import { provisionTools } from "../../extension/src/tool-provisioner";
import { enforceScopeGuardrail } from "../../extension/src/scope-guardrail";

export default function registerSubagentExtension(pi: { registerHook?: (name: string, hook: unknown) => void }) {
  if (!pi.registerHook) {
    return;
  }

  pi.registerHook("onSkillLoaded", ({ skillName }: { skillName: string }) => {
    if (!skillName.startsWith("bmad-ml-")) {
      return;
    }

    const loaded = loadSkill(skillName);
    const tools = provisionTools(loaded.manifest.pi_tools ?? []);
    const scope = resolveArtifactScope(loaded.manifest);

    return {
      tools,
      beforeToolCall: enforceScopeGuardrail(scope),
    };
  });
}
