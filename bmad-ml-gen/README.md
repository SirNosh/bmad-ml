# bmad-ml-gen

An **agent-first** BMad module for ML research and applied AI engineering. You talk to specialist agents; they run workflows on your behalf.

`bmad-ml-gen` is the source module for Cursor and Claude Code installs. End users install it via the npm package command `npx bmad-ml`.

For end-to-end usage, the full agent roster, capability codes, workflow tables, step-file architecture, and troubleshooting, see [GUIDE.md](./GUIDE.md).

## Overview

BMad ML is organized around 22 agent personas across two divisions, each with their own expertise, principles, and a small set of capabilities they know how to run. **Agents are the primary interface** -- you invoke `bmad-ml-sova` when you want literature surveyed, `bmad-ml-dumbledore` when you want an AI product architected, `bmad-ml-jett` when you want experiment code shipped. Workflows exist, but they are the tools agents use; you don't call them yourself unless you want to.

The two divisions:

- **AI Lab** (Valorant-themed, 13 agents) -- ML research, experimentation, and model development. Operates in **autonomous mode**: Nosh can chain agents without asking at every step. Useful for overnight experiments and hypothesis-driven research.
- **AI Startup** (Harry Potter-themed, 7 agents) -- Applied AI products, LLM apps, RAG, agent systems, deployment. Operates in **hands-on collaborative mode**: every phase transition requires explicit user approval. Useful for product work where human judgment is load-bearing.

Both divisions share a single orchestrator (**Nosh**) and a common configuration system.

## AI Startup and Base BMad

On the AI Startup side, BMad ML intentionally keeps the planning backbone that makes base BMAD effective, while adapting the artifacts for AI product work:

- `bmad-ml-ai-product-brief` is the AI Startup PRD-equivalent. It captures the problem, users, constraints, success metrics, risks, and recommended direction.
- `bmad-ml-ai-system-architecture` turns the approved brief into a buildable system design.
- `bmad-ml-ai-sprint` breaks the approved design into implementation-ready work, priorities, dependencies, and risks before build execution starts.
- Nosh keeps this flow explicit in AI Startup mode: brief -> architecture -> sprint plan -> implementation -> evaluation/safety -> deployment/review.

This BMAD mapping is intentional for AI Startup only. The AI Lab side keeps its research-first workflow model.

## How You Interact With It

There are three ways to engage -- pick whichever matches how you like to work:

1. **Talk to an agent directly.** Invoke a skill like `bmad-ml-sova`, `bmad-ml-chamber`, or `bmad-ml-dumbledore` and ask for the outcome you need. The agent picks the right workflow and runs it.
2. **Talk to Nosh** (`bmad-ml-nosh`). The orchestrator routes you to the right agent, chains agents autonomously in AI Lab mode, or facilitates phase gates in AI Startup mode. In AI Startup, Nosh keeps the BMAD planning spine explicit: product brief -> architecture -> sprint planning -> implementation. Good when you don't know which specialist to reach for.
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

- A skills-capable IDE: Claude Code or Cursor
- (Optional) [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) core -- `npx bmad-method install` -- provides the `bmad-help` skill for cross-module "what do I do next" guidance. Without it, use Nosh's `NX` command instead, which provides the same next-step guidance specifically for ML workflows

## Installation

```bash
# Cursor
npx bmad-ml --cursor

# Claude Code
npx bmad-ml --claude-code
```

Options: `--force` (overwrite existing), `--dry-run` (preview)

Then invoke `ml-setup` in your IDE to configure the module.

### Configure the module

In your IDE, invoke the `ml-setup` skill:

- **Cursor**: tell the assistant **"use ml-setup"**
- **Claude Code**: tell the assistant **"load ml-setup"**

Answer the prompts for project name, ML framework, experiment tracker, and artifact paths. The setup writes:

- `_bmad/config.yaml` -- shared config with an `ml:` section
- `_bmad/config.user.yaml` -- personal settings (gitignored)

### Optional: Create project instructions

`ml-setup` offers to create an IDE-specific project instructions file:

- **Claude Code**: `CLAUDE.md` -- loaded automatically on every conversation
- **Cursor**: `.cursorrules` -- loaded automatically as context

### Validation

After installation, verify the skills are discoverable:

```bash
# Check that skill directories exist in your IDE's skills folder
ls .claude/skills/bmad-ml-nosh/SKILL.md   # Claude Code
ls .cursor/skills/bmad-ml-nosh/SKILL.md   # Cursor
```

## IDE Setup


| IDE         | Skills Directory    |
| ----------- | ------------------- |
| Claude Code | `.claude/skills/`   |
| Cursor      | `.cursor/skills/`   |

### Marketplace Discovery

The `.claude-plugin/marketplace.json` manifest enables plugin discovery. Despite the directory name, this format is platform-agnostic and works with any skills-capable IDE.

## Quick Start

### In Cursor

1. Open your project in Cursor
2. Start a new chat
3. Tell the assistant to use a skill by name:
  - **"use bmad-ml-nosh"** -- starts the orchestrator, who presents a capability menu
  - **"use bmad-ml-sova and do a literature review on LoRA"** -- invokes the specialist directly
4. The assistant loads the skill from `.cursor/skills/` and follows its instructions
5. All agents run within the same conversation (sequential persona swapping)

### In Claude Code

1. Open your project in Claude Code
2. Reference a skill by name in your prompt:
  - **"load bmad-ml-nosh"** -- starts the orchestrator
  - **"load bmad-ml-dumbledore and draft an AI product brief (PRD-equivalent) for a legal assistant"** -- invokes the specialist directly
3. Claude Code discovers skills from `.claude/skills/` automatically
4. All agents run within the same conversation (sequential persona swapping)

### Usage patterns

**Talk to an agent directly (when you know whose expertise you need):**

- `bmad-ml-sova` -- "Do a literature review on retrieval-augmented generation."
- `bmad-ml-chamber` -- "Design a mixture-of-experts architecture for a 7B base model."
- `bmad-ml-jett` -- "Implement the experiment we designed last session and run a micro-batch test."
- `bmad-ml-dumbledore` -- "Draft an AI product brief (PRD-equivalent) for a legal document assistant."
- `bmad-ml-hermione` -- "Build the LLM application from the approved architecture."
- `bmad-ml-snape` -- "Red-team the deployed assistant for prompt injection."

**Talk to Nosh (when you want routing or autonomous execution):**

Nosh loads config, scans for existing artifacts, determines the right division, presents a capabilities menu, and waits for your selection.

**Convene a meeting (when you want multiple agents in one room):**

- `bmad-ml-research-party` -- research agents only
- `bmad-ml-lab-meeting` -- AI Lab division (research + build)
- `bmad-ml-startup-meeting` -- AI Startup division only
- `bmad-ml-all-hands` -- cross-division (rare; use only when the topic genuinely spans both)

For per-agent principles and the full workflow catalog, see [GUIDE.md](./GUIDE.md).

## Directory Structure

```
bmad-ml-gen/
  README.md                # This file
  GUIDE.md                 # Operational reference -- workflows, modes, examples
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
      1-product-discovery/ # AI product brief (PRD-equivalent)
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


