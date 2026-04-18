const DOC_FLAGS = [
  "--about",
  "--agents",
  "--workflows",
  "--opencode-guide",
  "--pi-subagent-guide",
  "--matrix",
];

const docsData = {
  about: {
    title: "BMad ML Overview",
    lines: [
      "BMad ML is an agent-first module for ML research and AI product engineering.",
      "You interact with specialist agents (personas), and they run workflows to produce artifacts.",
      "",
      "Five install modes:",
      "- --oc: OpenCode primary mode",
      "- --cur: Cursor subagent mode (Nosh persona via AGENTS.md, specialists as fresh-context subagents)",
      "- --cc: Claude Code subagent mode (Nosh as main-thread agent via `\"agent\"` setting, specialists as fresh-context subagents)",
      "- --cur-pi: Cursor + pi hybrid (specialists dispatch to the pi CLI)",
      "- --cc-pi: Claude Code + pi hybrid (specialists dispatch to the pi CLI)",
      "",
      "Two divisions:",
      "- AI Lab: research and experiments, supports autonomous multi-step execution.",
      "- AI Startup: product implementation and deployment, uses hands-on phase gates.",
      "",
      "Orchestrator:",
      "- Nosh (`bmad-ml-nosh`) routes work, coordinates agents, and recommends next steps.",
      "",
      "Agent invocation:",
      "- All modes delegate specialist work via the Task/Agent tool with `subagent_type: \"bmad-<name>\"`.",
      "- Auto-delegation, slash commands (/bmad-<name>), and @-mentions (@agent-<name>) are parsed",
      "  from user input only -- they do nothing when emitted by Nosh in agent output.",
      "",
      "Persona binding:",
      "- --cc: hard binding. The installer writes `\"agent\": \"bmad-ml-nosh\"` into `.claude/settings.json`,",
      "  which replaces Claude Code's default system prompt with Nosh's persona per Claude Code docs.",
      "  To opt out, remove the `\"agent\"` key from settings.json after install.",
      "- --cur: soft binding. Cursor has no default-agent setting, so Nosh's persona loads via AGENTS.md",
      "  at user-message level. A `.cursor/agents/bmad-ml-nosh.md` file is also installed for @-mention access.",
      "",
      "Agent teams (Claude Code, experimental):",
      "- The four party/meeting skills (bmad-ml-lab-meeting, bmad-ml-startup-meeting,",
      "  bmad-ml-research-party, bmad-ml-all-hands) can optionally use agent teams for multi-specialist",
      "  discussion. Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in your shell environment.",
      "- The installer does not write this env var anywhere; opt in manually.",
      "- Without the env var, these workflows fall back to serial Task dispatch (no behavior change).",
    ],
  },
  agents: {
    title: "Agent Roster (20 Specialists + Nosh)",
    sections: [
      {
        heading: "Shared",
        items: [["Nosh", "Orchestrator for routing, planning, and cross-division coordination."]],
      },
      {
        heading: "AI Lab - Research (8)",
        items: [
          ["Sova", "Literature review and SOTA tracking."],
          ["Sage", "Theory, math, and formal reasoning."],
          ["Cypher", "Dataset quality and data-centric diagnostics."],
          ["Viper", "Robustness and adversarial risk analysis."],
          ["Breach", "Experimental design and statistical rigor."],
          ["Fade", "Frontier trend scouting and synthesis."],
          ["Astra", "Cross-domain transfer and interdisciplinary synthesis."],
          ["Killjoy", "Systems and hardware-aware optimization tradeoffs."],
        ],
      },
      {
        heading: "AI Lab - Build (5)",
        items: [
          ["Chamber", "Model/training architecture decisions."],
          ["Jett", "Experiment implementation and execution."],
          ["Gekko", "Data pipelines and feature/data flow tooling."],
          ["Omen", "Standard code review and quality findings."],
          ["KAY/O", "Adversarial claim review and stress testing."],
        ],
      },
      {
        heading: "AI Startup (7)",
        items: [
          ["Dumbledore", "AI product architecture and system direction."],
          ["Hermione", "AI/ML engineering implementation."],
          ["Snape", "AI security, guardrails, and safety testing."],
          ["Luna", "Prompt engineering, agent behavior, and AI UX."],
          ["McGonagall", "MLOps, deployment, and operations."],
          ["Moody", "QA, evaluations, and quality gates."],
          ["Hagrid", "Data integration and document/embedding pipelines."],
        ],
      },
    ],
  },
  workflows: {
    title: "Workflow Map (By Phase)",
    sections: [
      {
        heading: "AI Lab - Discovery",
        items: [
          ["bmad-ml-literature-review", "Produces literature-review.md"],
          ["bmad-ml-dataset-discovery", "Produces dataset-assessment.md"],
          ["bmad-ml-feasibility-study", "Produces feasibility-report.md"],
          ["bmad-ml-problem-formulation", "Produces problem-statement.md"],
          ["bmad-ml-research-party", "Produces research-party-brief.md"],
        ],
      },
      {
        heading: "AI Lab - Design + Architecture + Experimentation",
        items: [
          ["bmad-ml-experiment-design", "Produces experiment-design.md"],
          ["bmad-ml-model-architecture", "Produces model-architecture.md"],
          ["bmad-ml-training-pipeline", "Produces training-pipeline.md"],
          ["bmad-ml-implement-experiment", "Produces code and tests"],
          ["bmad-ml-results-analysis", "Produces results-report.md"],
          ["bmad-ml-model-optimization", "Produces optimization report + artifacts"],
        ],
      },
      {
        heading: "AI Startup - Product Discovery + System Design",
        items: [
          ["bmad-ml-ai-product-brief", "Produces ai-product-brief.md (PRD-equivalent)"],
          ["bmad-ml-ai-system-architecture", "Produces ai-architecture.md"],
          ["bmad-ml-rag-pipeline", "Produces rag-design.md"],
          ["bmad-ml-agent-system", "Produces agent-system-design.md"],
          ["bmad-ml-prompt-engineering", "Produces prompt-spec.md"],
          ["bmad-ml-guardrails-design", "Produces guardrails-spec.md"],
        ],
      },
      {
        heading: "AI Startup - Delivery Planning",
        items: [["bmad-ml-ai-sprint", "Produces ai-sprint-status.yaml (implementation plan)"]],
      },
      {
        heading: "AI Startup - Implementation + Deployment + Evaluation",
        items: [
          ["bmad-ml-build-llm-app", "Produces working LLM application code"],
          ["bmad-ml-fine-tuning", "Produces fine-tuned model + model card"],
          ["bmad-ml-ai-deploy", "Produces deployment setup + runbook"],
          ["bmad-ml-ai-monitoring", "Produces monitoring/alerting setup"],
          ["bmad-ml-ai-evaluation", "Produces evaluation-report.md"],
          ["bmad-ml-ai-safety-audit", "Produces safety audit report"],
          ["bmad-ml-ai-product-review", "Produces release verdict"],
        ],
      },
      {
        heading: "Cross-Division Meetings",
        items: [
          ["bmad-ml-lab-meeting", "AI Lab division sync"],
          ["bmad-ml-startup-meeting", "AI Startup division sync"],
          ["bmad-ml-all-hands", "Both divisions in one coordinated meeting"],
        ],
      },
    ],
  },
  opencode: {
    title: "OpenCode Install and Runtime Guide",
    lines: [
      "What --oc installs:",
      "- 75 skills into .opencode/skills/",
      "- 21 agent shims into .opencode/agents/",
      "",
      "How to start:",
      "1. Run: npx bmad-ml --oc",
      "2. Start OpenCode in your project root: opencode",
      "3. Run ml-setup to create/update _bmad/config.yaml and _bmad/config.user.yaml",
      "4. Press Tab to switch to Nosh, then request your task.",
      "",
      "How it works in OpenCode:",
      "- Agent shims make personas available as @invocable agents.",
      "- Nosh can delegate independent tasks in parallel using the Task tool.",
      "- Parallel windows are strongest in research, reviews, and meeting modes.",
    ],
  },
  piSubagent: {
    title: "pi Subagent Modes Guide",
    lines: [
      "Standalone --pi has been removed.",
      "Use one of the hybrid pi modes:",
      "- --cc-pi: Claude Code main chat is Nosh, specialists run as Claude subagent shims that dispatch to pi.",
      "- --cur-pi: Cursor main chat is Nosh, specialists run as Cursor subagent shims that dispatch to pi.",
      "",
      "Shared runtime behavior:",
      "- pi skills are installed in .pi/skills/",
      "- Dispatcher lives at .bmad-ml/dispatch-pi.mjs",
      "- Specialist shims run: node .bmad-ml/dispatch-pi.mjs <agent> <prompt-file>",
      "",
      "Install-time model picker (opt-in):",
      "- Pass --model-picker during --cc-pi / --cur-pi install to run `pi --list-models --mode json`",
      "  and pick a default model applied to all 21 specialists via .pi/settings.json.",
      "- Default (no flag): pi's own default model is used (set when the user first configured pi).",
      "- Skips on: --dry-run, non-TTY stdin, pi missing, empty list, or 'q' response.",
      "- Existing .pi/settings.json with bmad_ml.models.sova is preserved unless --force is passed.",
      "- `bmad_ml` is a bmad-ml-private namespace read only by dispatch-pi.mjs; pi itself reads its own",
      "  top-level keys (defaultProvider, defaultModel, defaultThinkingLevel, etc.) and ignores `bmad_ml`.",
      "",
      "Model string formats (accepted anywhere the dispatcher takes a model):",
      "- pi-native:  provider/id[:thinking]   e.g.  anthropic/claude-sonnet-4:high",
      "- legacy:     provider:id              e.g.  anthropic:claude-sonnet-4",
      "",
      "Model resolution order:",
      "- Invocation override: --model <string>",
      "- .pi/settings.json (bmad_ml.models.<agent>)",
      "- _bmad/config.user.yaml (ml.pi_models.<agent>)",
      "- _bmad/config.yaml (ml.pi_models.<agent>)",
      "- Per-agent env: BMAD_PI_MODEL_<AGENT>=<string> (+ optional BMAD_PI_REASONING_<AGENT>)",
      "  Agent name is uppercased with hyphens -> underscores (e.g. research-party -> RESEARCH_PARTY).",
      "- Skill manifest pi_model",
      "- Environment fallback (PI_PROVIDER/PI_MODEL or BMAD_PI_PROVIDER/BMAD_PI_MODEL, defaults opencode-go:glm-5.1)",
    ],
  },
  matrix: {
    title: "BMad ML Mode Matrix",
    lines: [
      "1) --oc      (alias: --opencode)         OpenCode primary mode",
      "2) --cur     (alias: --cursor)           Cursor subagent mode (Nosh via AGENTS.md, soft binding)",
      "3) --cc      (alias: --claude-code)      Claude Code subagent mode (Nosh as main-thread agent, hard binding)",
      "4) --cur-pi  (alias: --cursor-pi)        Cursor subagent shims dispatching to pi",
      "5) --cc-pi   (alias: --claude-code-pi)   Claude subagent shims dispatching to pi",
      "",
      "All modes delegate specialist work via the Task/Agent tool with `subagent_type: \"bmad-<name>\"`.",
      "Auto-delegation and @-mentions operate on user input, not on agent output -- Nosh never emits",
      "slash commands or @agent-<name> mentions.",
      "",
      "Persona binding:",
      "- --cc writes `\"agent\": \"bmad-ml-nosh\"` to `.claude/settings.json` (replaces default system prompt).",
      "- --cur uses AGENTS.md for persona (Cursor has no equivalent setting).",
      "",
      "Agent teams (Claude Code only, opt-in): enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.",
      "Used by the four party/meeting workflows. Installer does not set this env var.",
    ],
  },
};

function renderBlock(title, lines) {
  return [`${title}`, `${"=".repeat(title.length)}`, ...lines].join("\n");
}

function renderSectionedList(title, sections) {
  const lines = [`${title}`, `${"=".repeat(title.length)}`];
  for (const section of sections) {
    lines.push("");
    lines.push(section.heading);
    lines.push("-".repeat(section.heading.length));
    for (const [name, description] of section.items) {
      lines.push(`- ${name}: ${description}`);
    }
  }
  return lines.join("\n");
}

function renderAbout() {
  return renderBlock(docsData.about.title, docsData.about.lines);
}

function renderAgents() {
  return renderSectionedList(docsData.agents.title, docsData.agents.sections);
}

function renderWorkflows() {
  return renderSectionedList(docsData.workflows.title, docsData.workflows.sections);
}

function renderOpenCodeGuide() {
  return renderBlock(docsData.opencode.title, docsData.opencode.lines);
}

function renderPiSubagentGuide() {
  return renderBlock(docsData.piSubagent.title, docsData.piSubagent.lines);
}

function renderMatrix() {
  return renderBlock(docsData.matrix.title, docsData.matrix.lines);
}

function renderLearnMoreHint() {
  return "Learn more: bmad-ml --about | --agents | --workflows | --matrix | --opencode-guide | --pi-subagent-guide";
}

module.exports = {
  DOC_FLAGS,
  docsData,
  renderAbout,
  renderAgents,
  renderWorkflows,
  renderOpenCodeGuide,
  renderPiSubagentGuide,
  renderMatrix,
  renderLearnMoreHint,
};
