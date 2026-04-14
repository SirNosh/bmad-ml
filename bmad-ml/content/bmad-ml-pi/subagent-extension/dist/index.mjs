export default function registerSubagentExtension(pi) {
  if (typeof pi?.registerHook !== "function") {
    return;
  }

  pi.registerHook("onSkillLoaded", ({ skillName }) => {
    if (!String(skillName || "").startsWith("bmad-ml-")) {
      return;
    }

    return {
      tools: [],
    };
  });
}
