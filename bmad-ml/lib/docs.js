const DOC_FLAGS = ["--about", "--agents", "--workflows", "--opencode-guide"];

const docsData = {
  about: {
    title: "BMad ML Overview",
    lines: [
      "BMad ML is an agent-first module for ML research and AI product engineering.",
      "You interact with specialist agents (personas), and they run workflows to produce artifacts.",
      "",
      "Who this is for:",
      "- Teams doing ML research, experimentation, and model architecture work.",
      "- Teams building production AI products (LLM apps, RAG, agent systems, deployment).",
      "",
      "Two divisions:",
      "- AI Lab: research and experiments, supports autonomous multi-step execution.",
      "- AI Startup: product implementation and deployment, uses hands-on phase gates.",
      "",
      "Orchestrator:",
      "- Nosh (`bmad-ml-nosh`) routes work, coordinates agents, and recommends next steps.",
      "",
      "AI Startup BMAD backbone:",
      "- AI Product Brief = PRD-equivalent planning artifact.",
      "- AI System Architecture = buildable solution design.",
      "- AI Sprint = implementation work breakdown before build execution.",
      "- Default order: brief -> architecture -> sprint plan -> implementation -> evaluation/safety -> deployment/review.",
    ],
  },
  agents: {
    title: "Agent Roster (21 Personas + Nosh)",
    sections: [
      {
        heading: "Shared",
        items: [
          ["Nosh", "Orchestrator for routing, planning, and cross-division coordination."],
        ],
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
        items: [
          ["bmad-ml-ai-sprint", "Produces ai-sprint-status.yaml (implementation plan)"],
        ],
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
      "What --opencode installs:",
      "- 75 skills into .opencode/skills/",
      "- 21 agent shims into .opencode/agents/",
      "",
      "How to start:",
      "1. Run: npx bmad-ml --opencode",
      "2. Start OpenCode in your project root: opencode",
      "3. Run ml-setup to create/update _bmad/config.yaml and _bmad/config.user.yaml",
      "4. Press Tab to switch to Nosh, then request your task.",
      "",
      "How it works in OpenCode:",
      "- Agent shims make personas available as @invocable agents.",
      "- Nosh can delegate independent tasks in parallel using the Task tool.",
      "- Parallel windows are strongest in research, reviews, and meeting modes.",
      "",
      "Session navigation (OpenCode child sessions):",
      "- Shift+Down: enter first child session",
      "- Right / Left: cycle sibling child sessions",
      "- Up: return to parent session",
      "",
      "If agent shims are missing, skills still run in sequential single-session mode.",
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

function renderLearnMoreHint() {
  return "Learn more: bmad-ml --about | --agents | --workflows | --opencode-guide";
}

module.exports = {
  DOC_FLAGS,
  docsData,
  renderAbout,
  renderAgents,
  renderWorkflows,
  renderOpenCodeGuide,
  renderLearnMoreHint,
};
