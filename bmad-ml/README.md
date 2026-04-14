# bmad-ml

Agent-first installer and onboarding package for BMad ML.

This package is self-contained. It explains what BMad ML is, what agents and workflows exist, and how OpenCode behavior works without requiring external docs.

## What BMad ML Does

BMad ML gives you a team of AI specialist personas that collaborate on:

- ML research and experimentation (AI Lab)
- AI product design, planning, implementation, and deployment (AI Startup)

You talk to agents. Agents run workflows and produce artifacts.

Core model:

- **Nosh** is the orchestrator (`bmad-ml-nosh`)
- **21 specialist personas** execute research, planning, architecture, implementation, evaluation, and safety work
- **75 installable skills** are placed in your IDE skill directory
- **OpenCode mode** also installs **21 agent shims** for parallel subagent execution
- **pi mode** installs a pi-native extension/runtime layout plus optional hybrid orchestrator targets

## AI Startup BMAD Backbone

On the AI Startup side, BMad ML keeps the same planning spine that makes base BMAD useful:

- `bmad-ml-ai-product-brief` is the PRD-equivalent planning artifact
- `bmad-ml-ai-system-architecture` turns the approved brief into a buildable system design
- `bmad-ml-ai-sprint` turns the approved design into implementation-ready work before build execution begins
- Nosh keeps the order explicit: brief -> architecture -> sprint plan -> implementation -> evaluation/safety -> deployment/review

## Install

Run from your project root:

```bash
# Cursor
npx bmad-ml --cursor

# Claude Code
npx bmad-ml --claude-code

# OpenCode (skills + agent shims)
npx bmad-ml --opencode

# pi-native
npx bmad-ml --pi

# Claude Code orchestrator + pi subagents
npx bmad-ml --cc-pi

# Cursor orchestrator + pi subagents
npx bmad-ml --cursor-pi
```

Install options:

- `--force` overwrite existing installed skill/agent directories
- `--dry-run` preview actions without writing files
- `--help` show CLI usage

## First Session Flow

After installation:

1. Run `ml-setup` in your IDE.
2. Start with `bmad-ml-nosh` as your entry point.
3. Ask for an outcome (for example, literature review, architecture, implementation, safety audit). On the AI Startup side, the default BMAD sequence is product brief -> architecture -> sprint plan -> implementation.

IDE prompts:

- Cursor: `use ml-setup`, then `use bmad-ml-nosh`
- Claude Code: `load ml-setup`, then `load bmad-ml-nosh`
- OpenCode: run installer, start `opencode`, press Tab to switch to Nosh, then run setup and begin

## CLI Docs Commands

Use built-in docs for in-terminal guidance:

```bash
npx bmad-ml --about
npx bmad-ml --agents
npx bmad-ml --workflows
npx bmad-ml --opencode-guide
npx bmad-ml --pi-guide
```

These commands are read-only and do not modify files.

## Agents Overview

Shared:

- `Nosh`: orchestrator for routing, planning, and cross-division coordination

AI Lab Research (8):

- Sova, Sage, Cypher, Viper, Breach, Fade, Astra, Killjoy

AI Lab Build (5):

- Chamber, Jett, Gekko, Omen, KAY/O

AI Startup (7):

- Dumbledore, Hermione, Snape, Luna, McGonagall, Moody, Hagrid

Run `--agents` for one-line role summaries by division.

## Workflow Overview

AI Lab:

- Discovery: literature, dataset, feasibility, problem formulation
- Design/Architecture: experiment design, model architecture, training pipeline
- Experimentation: implementation, analysis, optimization, reviews

AI Startup:

- Product discovery via an AI product brief (PRD-equivalent)
- System design and architecture
- Delivery planning via AI sprint / work breakdown before implementation
- System implementation (LLM app, fine-tuning, data/embedding pipelines)
- Deployment, monitoring, evaluation, quality/safety gates

Cross-division:

- Lab meeting, startup meeting, all-hands

Run `--workflows` for phase-by-phase workflow map and artifact outcomes.

## OpenCode Behavior

`--opencode` installs:

- 75 skills to `.opencode/skills/`
- 21 agent shims to `.opencode/agents/`

OpenCode-specific behavior:

- Nosh can delegate independent tasks in parallel via Task tool
- Agent shims enable `@agent` invocation and isolated child sessions
- Strongest parallel benefit appears in research, review, and meeting phases

Run `--opencode-guide` for startup steps and session navigation hints.

## Install Targets

- `--cursor` -> `.cursor/skills/`
- `--claude-code` -> `.claude/skills/`
- `--opencode` -> `.opencode/skills/` and `.opencode/agents/`
- `--pi` -> `.pi/skills/`, `.pi/prompts/`, `.pi/extensions/bmad-ml/`, `.pi/AGENTS.md`
- `--cc-pi` -> `.pi/` runtime + `.claude/skills/`, `.claude/agents/`, `.bmad-ml/dispatch-pi.mjs`
- `--cursor-pi` -> `.pi/` runtime + `.cursor/rules/`, `.bmad-ml/dispatch-pi.mjs`

## Package Notes

This package keeps docs and CLI help self-contained. Use `npx bmad-ml --help` for the current command surface and the built-in docs commands for in-terminal guidance.
