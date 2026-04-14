# bmad-ml-oc

The **OpenCode-optimized** variant of BMad ML -- an agent-first module for ML research and applied AI engineering with **parallel subagent execution** via OpenCode's Task tool.

This variant is built specifically for [OpenCode](https://opencode.ai). For Cursor or Claude Code, use [bmad-ml-gen](../bmad-ml-gen/) instead.

For end-to-end usage, the full agent roster, capability codes, workflow tables, step-file architecture, and troubleshooting, see [GUIDE.md](./GUIDE.md).

## Overview

BMad ML is organized around 22 agent personas across two divisions, each with their own expertise, principles, and a small set of capabilities they know how to run. **Agents are the primary interface** -- you invoke `bmad-ml-sova` when you want literature surveyed, `bmad-ml-dumbledore` when you want an AI product architected, `bmad-ml-jett` when you want experiment code shipped. Workflows exist, but they are the tools agents use; you don't call them yourself unless you want to.

The two divisions:

- **AI Lab** (Valorant-themed, 13 agents) -- ML research, experimentation, and model development. Operates in **autonomous mode**: Nosh can chain agents without asking at every step. Useful for overnight experiments and hypothesis-driven research.
- **AI Startup** (Harry Potter-themed, 7 agents) -- Applied AI products, LLM apps, RAG, agent systems, deployment. Operates in **hands-on collaborative mode**: every phase transition requires explicit user approval. Useful for product work where human judgment is load-bearing.

Both divisions share a single orchestrator (**Nosh**) and a common configuration system.

## How You Interact With It

There are three ways to engage -- pick whichever matches how you like to work:

1. **Talk to an agent directly.** Invoke a skill like `bmad-ml-sova`, `bmad-ml-chamber`, or `bmad-ml-dumbledore` and ask for the outcome you need. The agent picks the right workflow and runs it.
2. **Talk to Nosh** (`bmad-ml-nosh`). The orchestrator routes you to the right agent, chains agents autonomously in AI Lab mode, or facilitates phase gates in AI Startup mode. Good when you don't know which specialist to reach for.
3. **Convene a meeting.** Invoke a party or meeting skill to get multiple agents in one room -- `bmad-ml-research-party` (research agents only), `bmad-ml-lab-meeting` (AI Lab division), `bmad-ml-startup-meeting` (AI Startup division), or `bmad-ml-all-hands` (both divisions).

## Agent Roster

Invoke any agent directly by its skill name. For per-agent principles, expertise, and capability codes, see the [Agent Roster](./GUIDE.md#agent-roster) section in GUIDE.md.

### Shared


| Agent | Skill          | Role                                                                  |
| ----- | -------------- | --------------------------------------------------------------------- |
| Nosh  | `bmad-ml-nosh` | Lab Director and Startup CEO -- routes to the right agent or division |


### AI Lab -- Research Group


| Agent   | Skill             | Focus                                          |
| ------- | ----------------- | ---------------------------------------------- |
| Sova    | `bmad-ml-sova`    | Literature and SOTA tracking                   |
| Sage    | `bmad-ml-sage`    | Theory and mathematical foundations            |
| Cypher  | `bmad-ml-cypher`  | Dataset quality and data-centric AI            |
| Viper   | `bmad-ml-viper`   | Adversarial robustness and ML safety research  |
| Breach  | `bmad-ml-breach`  | Experimental methodology and statistical rigor |
| Fade    | `bmad-ml-fade`    | Frontier and emerging research trends          |
| Astra   | `bmad-ml-astra`   | Cross-domain synthesis and transfer learning   |
| Killjoy | `bmad-ml-killjoy` | Systems ML and hardware-aware optimization     |


### AI Lab -- Build Group


| Agent   | Skill             | Focus                                        |
| ------- | ----------------- | -------------------------------------------- |
| Chamber | `bmad-ml-chamber` | Model and training architecture              |
| Jett    | `bmad-ml-jett`    | ML engineering and experiment implementation |
| Gekko   | `bmad-ml-gekko`   | Data pipelines for experiments               |
| Omen    | `bmad-ml-omen`    | Standard code review                         |
| KAY/O   | `bmad-ml-kayo`    | Adversarial claim review                     |


### AI Startup (7 agents)


| Agent      | Skill                | Focus                         |
| ---------- | -------------------- | ----------------------------- |
| Dumbledore | `bmad-ml-dumbledore` | AI Product Architecture       |
| Hermione   | `bmad-ml-hermione`   | AI/ML Engineering             |
| Snape      | `bmad-ml-snape`      | AI Security and Safety        |
| Luna       | `bmad-ml-luna`       | Prompt Engineering and AI UX  |
| McGonagall | `bmad-ml-mcgonagall` | MLOps and Deployment          |
| Moody      | `bmad-ml-moody`      | AI QA and Evaluation          |
| Hagrid     | `bmad-ml-hagrid`     | Data Pipeline and Integration |


## Prerequisites

- [OpenCode](https://opencode.ai) installed and working
- Python 3.9+ (for setup scripts)
- PyYAML (`pip install pyyaml`)
- (Optional) [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) core -- `npx bmad-method install` -- provides the `bmad-help` skill for cross-module "what do I do next" guidance. Without it, use Nosh's `NX` command instead, which provides the same next-step guidance specifically for ML workflows

## Installation

```bash
npx bmad-ml --opencode
```

Options: `--force` (overwrite existing), `--dry-run` (preview)

This installs 75 skills to `.opencode/skills/` and 21 agent shims to `.opencode/agents/`.
Then start OpenCode and invoke `ml-setup` or press Tab to switch to Nosh.

## Quick Start

After installation, start OpenCode in your project:

```bash
opencode
```

### Use Nosh (recommended entry point)

Press **Tab** to switch to the **nosh** primary agent. Nosh loads your config, scans for existing artifacts, determines the right division, and presents a capability menu.

Example:

```
[Tab to nosh]
You: "I want to test whether LoRA outperforms full fine-tuning on our domain dataset"
Nosh: Routes to AI Lab, dispatches research agents in parallel via Task tool,
      then chains through experiment design, architecture, and implementation.
```

### Invoke a specialist directly

Type `@` followed by the agent name to invoke a subagent in its own isolated session:

```
@sova Do a literature review on retrieval-augmented generation
@chamber Design a mixture-of-experts architecture for a 7B base model
@jett Implement the experiment we designed and run a micro-batch test
@dumbledore Draft an AI product brief for a legal document assistant
@hermione Build the LLM application from the approved architecture
@snape Red-team the deployed assistant for prompt injection
```

### Convene a meeting

Ask Nosh or invoke the meeting skill directly. Meetings dispatch all selected agents in parallel via the Task tool:

- `bmad-ml-research-party` -- research agents only (parallel)
- `bmad-ml-lab-meeting` -- AI Lab division (parallel)
- `bmad-ml-startup-meeting` -- AI Startup division (parallel)
- `bmad-ml-all-hands` -- cross-division (parallel, rare)

### Navigate subagent sessions

When Nosh delegates to subagents, OpenCode creates child sessions. Navigate them with:


| Key            | Action                                        |
| -------------- | --------------------------------------------- |
| **Shift+Down** | Enter the first child session from the parent |
| **Right**      | Cycle to the next child session               |
| **Left**       | Cycle to the previous child session           |
| **Up**         | Return to the parent session                  |


For per-agent principles and the full workflow catalog, see [GUIDE.md](./GUIDE.md).

## Directory Structure

```
bmad-ml-oc/
  README.md                # This file
  GUIDE.md                 # Operational reference -- workflows, modes, examples
  agents/
    opencode/              # 21 OpenCode agent shims (copy to .opencode/agents/)
  skills/
    bmad-ml-nosh/          # Shared orchestrator (entry point)
    ml-setup/              # Module configuration (first-time setup)
    bmad-ml-all-hands/     # Cross-division all-hands meeting
    ai-lab/                # AI Lab division
      research/            # 8 research agents (Sova, Sage, Cypher, Viper, Breach, Fade, Astra, Killjoy)
      party/               # Research Party + Lab Meeting
      onboarding/          # ML project onboarding
      research-workflows/  # Literature, datasets, feasibility, problem formulation
      2-experiment-design/ # Experiment design + evaluation criteria
      3-ml-architecture/   # Chamber + architecture + training pipeline + readiness
      4-experimentation/   # Jett, Gekko, Omen, KAY/O + implementation workflows
      templates/           # Shared AI Lab templates
    ai-startup/            # AI Startup division
      agents/              # 7 Harry Potter agents (Dumbledore, Hermione, Snape, Luna, McGonagall, Moody, Hagrid)
      party/               # Startup Meeting
      onboarding/          # AI product onboarding
      1-product-discovery/ # AI product brief
      2-ai-system-design/  # Architecture, RAG, agents, prompts, guardrails
      3-implementation/    # Build LLM app, fine-tuning, vector DB, etc.
      4-deployment-eval/   # Deploy, monitor, evaluate, safety audit, sprint
```

## Configuration

The module uses these config variables (set during `ml-setup`):


| Variable               | Description                       | Default                       |
| ---------------------- | --------------------------------- | ----------------------------- |
| `project_name`         | ML/AI project name                | Directory name                |
| `ml_framework`         | PyTorch / TensorFlow / JAX        | pytorch                       |
| `experiment_tracker`   | W&B / MLflow / TensorBoard / None | wandb                         |
| `planning_artifacts`   | Planning artifact output path     | `{output_folder}/ml-planning` |
| `experiment_artifacts` | Experiment artifact output path   | `{output_folder}/experiments` |
| `project_knowledge`    | Research and references path      | `docs/research`               |


Path values in config files use the literal token `{project-root}`, which is resolved at read time by the consuming skill. Do not substitute it manually in the config files themselves.

### Config File Layout


| File                     | Purpose                                                                      | Gitignore      |
| ------------------------ | ---------------------------------------------------------------------------- | -------------- |
| `_bmad/config.yaml`      | Shared project config: core + `ml:` section with module values               | No (shared)    |
| `_bmad/config.user.yaml` | Personal settings: `user_name`, `communication_language`, user-marked values | Yes (personal) |


## Troubleshooting


| Symptom                                               | Likely Cause                                                 | Fix                                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `ml-setup` can't find `_bmad/config.yaml`             | BMAD core module not installed                               | Install BMAD-METHOD core first, then re-run `ml-setup`                                                  |
| Nosh greets you without your name                     | `user_name` missing from `config.user.yaml`                  | Re-run `ml-setup` or add the key manually to `config.user.yaml`                                         |
| A workflow references a step file that does not exist | Step-file rename not propagated to `workflow.md`             | Open the skill's `workflow.md` and match its `./steps/...` reference to the actual filename in `steps/` |
| "Legacy per-module config detected" during setup      | Old `_bmad/ml/config.yaml` from a prior install              | Expected -- `ml-setup` migrates and cleans up the legacy file automatically                             |
| Nosh starts auto-chaining agents in AI Startup        | Division routing mistake                                     | AI Startup is always hands-on; ask Nosh to halt and explicitly choose the division again                |
| Workflow loads the wrong language                     | `communication_language` or `document_output_language` unset | Re-run `ml-setup`, or edit `config.user.yaml` / `config.yaml` directly                                  |


## License

MIT


