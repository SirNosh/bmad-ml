# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**BMad ML** is an open-source monorepo providing an agent-first module for ML research and applied AI engineering. It publishes **20 specialist AI personas plus the Nosh orchestrator** (organized into AI Lab for research and AI Startup for product work) and 75 installable skills per distribution across multiple IDE targets.

Published npm package: `bmad-ml` (GitHub: `bmad-code-org/bmad-ml`).

## Monorepo Structure

Everything lives inside the single npm package dir `bmad-ml/`. There is no mirror — each distribution dir is the only copy of its content.

| Directory | Purpose |
|-----------|---------|
| `bmad-ml/` | NPM CLI package root — `bin/cli.js` installer + `lib/install.js` + `lib/docs.js` + three distribution dirs |
| `bmad-ml/bmad-ml-gen/` | Self-contained source for `--cur` and `--cc`: 75 shared skills + Cursor and Claude Code IDE assets (agents, bootstrap, rules, hooks, settings) |
| `bmad-ml/bmad-ml-oc/` | OpenCode distribution (75 skills + 21 agent shims under `agents/opencode/`) |
| `bmad-ml/bmad-ml-pi/` | pi-backed hybrid runtime (75 skills, dispatcher, per-IDE hybrid assets under `hybrid/`) |

`cli.js` sets `contentRoot = packageRoot` — `resolvePaths` reads every distribution dir directly from the package root. Editing any file under `bmad-ml/bmad-ml-*/` takes effect immediately.

The former `bmad-ml/bmad-ml-sub/` directory has been folded into `bmad-ml-gen/`: `--cur`/`--cc` now install the former sub-mode layout (agents, bootstrap, rules, hooks, settings patch) directly from `bmad-ml-gen/`. The `--cur-sub`/`--cc-sub` flags are removed.

## Build Commands

There is no build step. All packages are Node.js, Markdown, YAML, or JSON. No TypeScript, no bundler, no test runner configured at the root.

## CLI Installation (the primary deliverable)

```bash
npx bmad-ml --oc              # OpenCode mode
npx bmad-ml --cur             # Cursor subagent mode (Nosh via AGENTS.md, soft binding)
npx bmad-ml --cc              # Claude Code subagent mode (Nosh as main-thread agent, hard binding via "agent" setting)
npx bmad-ml --cur-pi          # Cursor + pi subagent mode
npx bmad-ml --cc-pi           # Claude Code + pi subagent mode
npx bmad-ml --dry-run         # Preview without writing
npx bmad-ml --force           # Overwrite existing installed files
npx bmad-ml --logging         # Install optional subagent logging hooks (cur/cc/cur-pi/cc-pi)
npx bmad-ml --no-model-picker # Skip pi model picker during --cc-pi/--cur-pi install
```

Aliases: `--opencode`, `--cursor`, `--claude-code`, `--cursor-pi`, `--claude-code-pi`. The former `--cur-sub` / `--cc-sub` flags (and their aliases) have been removed -- `--cur` / `--cc` now install the subagent-based layout directly.

Doc flags (print then exit): `--about`, `--agents`, `--workflows`, `--matrix`, `--opencode-guide`, `--pi-subagent-guide`.

Standalone `--pi` has been removed; `--cc-pi` and `--cur-pi` replace it.

## Architecture

### Skill System

Each skill is a directory containing:

- `SKILL.md` — persona, capabilities, workflow references (read by the IDE at load time; Claude Code reads YAML frontmatter from the top of this file)
- `bmad-skill-manifest.yaml` — bmad-only metadata used by the pi dispatcher and internal tooling (`pi_model`, `pi_tools`, `pi_thinking`, `artifact_scope`, capabilities). Neither Claude Code nor pi reads this file directly.
- Optional `steps/`, `workflow.md`, `assets/` depending on the skill

Plugin discovery metadata lives in each distribution's `.claude-plugin/marketplace.json` (75 skill entries per distribution in `bmad-ml-{gen,oc,pi}`).

### Division Model

- **AI Lab** (13 specialists): 8 Research agents (Sova, Sage, Cypher, Viper, Breach, Fade, Astra, Killjoy) + 5 Build agents (Chamber, Jett, Gekko, Omen, KAY/O). Autonomous chaining, no phase gates — suited for overnight research runs.
- **AI Startup** (7 specialists): Dumbledore, Hermione, Snape, Luna, McGonagall, Moody, Hagrid. Explicit user approval at each phase gate — suited for product development.
- **Nosh** (`bmad-ml-nosh`) is the shared orchestrator that routes work and coordinates cross-division delegation. Counted separately from the 20 specialists.

### Configuration System

`ml-setup` skill initializes config on first use. Writes two YAML files at the target project root:

- `_bmad/config.yaml` — shared, expected to be git-tracked
- `_bmad/config.user.yaml` — personal, expected to be gitignored

Key fields (under `ml:`): `project_name`, `ml_framework`, `experiment_tracker`, `planning_artifacts`, `experiment_artifacts`, `project_knowledge`, and (pi modes only) `pi_models.<agent>` with `provider`/`id`/`reasoning`. Path fields may use the `{project-root}` token, resolved at read time.

### Hybrid Dispatch (`--cc-pi` / `--cur-pi`)

`bmad-ml-pi/hybrid/dispatch-pi.mjs` is installed to the target project as `.bmad-ml/dispatch-pi.mjs`. Per-specialist subagent shims (in `.claude/agents/` or `.cursor/agents/`) shell out to it:

```
node .bmad-ml/dispatch-pi.mjs <agent> <prompt-file> [--model provider:id] [--timeout <s>]
```

The dispatcher shells out to the external `pi` CLI via `spawn("pi", [...])` with documented flags: `-p --no-session --mode json --skill <name> --provider <p> --model <id>` and optionally `--tools <csv>` and `--thinking <level>` from the skill manifest.

Model resolution precedence (first match wins):

Model string formats accepted everywhere the dispatcher takes a model (CLI flag, per-agent env var):

- pi-native: `provider/id[:thinking]` — e.g. `anthropic/claude-sonnet-4:high`, `openai/gpt-4o` (matches [pi's own `--model` syntax](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent))
- legacy: `provider:id` — e.g. `anthropic:claude-sonnet-4` (bare names without a provider prefix like `sonnet:high` are interpreted as the legacy form `provider=sonnet, id=high`, not pi's name-resolution shorthand)

Resolution order (first match wins):

1. `--model <string>` passed to the dispatcher
2. `.pi/settings.json` → `bmad_ml.models.<agent>`
3. `_bmad/config.user.yaml` → `ml.pi_models.<agent>`
4. `_bmad/config.yaml` → `ml.pi_models.<agent>`
5. Per-agent env: `BMAD_PI_MODEL_<AGENT>=<string>` (+ optional `BMAD_PI_REASONING_<AGENT>`). Agent name is uppercased with hyphens → underscores (e.g. `research-party` → `RESEARCH_PARTY`).
6. Skill manifest `pi_model`
7. Environment fallback (`PI_PROVIDER`/`PI_MODEL` or `BMAD_PI_*`, defaults `opencode-go:glm-5.1` — Z.ai GLM-5.1 served via OpenCode Go subscription)

The former in-process `bmad-ml-pi/subagent-extension/` (a pi-runtime TypeScript extension intended to provision per-skill tools and enforce artifact-scope guardrails) has been **removed**. Pi modes no longer install anything into `.pi/extensions/`, and the installer no longer writes `.pi/settings.json`. Runtime scope enforcement in pi modes now depends entirely on what the external `pi` binary itself provides.

### Install Target → Directory Mapping

| Target | Written to |
|--------|-----------|
| `--oc` | `.opencode/skills/`, `.opencode/agents/` |
| `--cur` | `.cursor/skills/`, `.cursor/agents/` (21 files: 20 specialists + Nosh), `AGENTS.md`, `.cursor/rules/`, `.cursor/hooks.json`, optional `.cursor/hooks/` |
| `--cc` | `.claude/skills/`, `.claude/agents/` (21 files: 20 specialists + Nosh), `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json` (merged — `"agent": "bmad-ml-nosh"` + `permissions` + `hooks.SubagentStart`/`SubagentStop`), `DELEGATION.md` overlay, optional `.claude/hooks/` |
| `--cur-pi` | `.pi/skills/`, `.bmad-ml/dispatch-pi.{mjs,sh}`, `.cursor/skills/`, `.cursor/agents/`, `AGENTS.md`, `.cursor/rules/`, optional `.cursor/hooks/` + `.cursor/hooks.json`, plus interactive pi model pick written to `.pi/settings.json` (unless `--no-model-picker`) |
| `--cc-pi` | `.pi/skills/`, `.bmad-ml/dispatch-pi.{mjs,sh}`, `.claude/skills/`, `.claude/agents/`, `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json` (merged — `permissions` + `hooks.SubagentStart`/`SubagentStop`), `DELEGATION.md` overlay, optional `.claude/hooks/`, plus interactive pi model pick written to `.pi/settings.json` (unless `--no-model-picker`) |

`AGENTS.md` / `CLAUDE.md` merges use `<!-- bmad-ml:start -->` / `<!-- bmad-ml:end -->` markers. Without markers in the existing file, the managed block is appended; with markers, the block is replaced only under `--force`. `.claude/settings.json` merges use deep-merge with array-union semantics (see `lib/install.js:mergeJsonPatch`) — top-level scalar keys like `"agent"` merge by replacement. Cursor does not have a project-scope `.cursor/settings.json` in its official spec — permissions/hooks are declared via `.cursor/hooks.json` and user-scope `~/.cursor/permissions.json`, so bmad-ml never writes `.cursor/settings.json`.

### Nosh Persona Binding

- **Claude Code (`--cc`)**: hard binding. The installer writes `"agent": "bmad-ml-nosh"` into `.claude/settings.json`, replacing Claude Code's default system prompt with Nosh's persona per [Claude Code docs](https://code.claude.com/docs/en/sub-agents). The startup header shows `@bmad-ml-nosh`. Opt out by removing the `"agent"` key from settings.json after install.
- **Cursor (`--cur`)**: soft binding. Cursor has no equivalent setting, so Nosh's persona loads via `AGENTS.md` (user-message level). A `.cursor/agents/bmad-ml-nosh.md` file is also installed for @-mention access.

### Agent Invocation Contract

All modes delegate specialist work via the Task/Agent tool with `subagent_type: "bmad-<specialist>"` (in Claude Code v2.1.63+, `Task` was renamed to `Agent`; `Task(...)` still works as alias). Auto-delegation, slash commands (`/bmad-<name>`), and `@agent-<name>` mentions operate on user input only — Nosh never emits those strings in agent output.

### Agent Teams (Claude Code only, experimental)

The four party/meeting skills (`bmad-ml-lab-meeting`, `bmad-ml-startup-meeting`, `bmad-ml-research-party`, `bmad-ml-all-hands`) can optionally use agent teams for multi-specialist discussion. Opt in by exporting `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in your shell before starting Claude Code. The installer does not write this env var anywhere — users export it manually. Without it, these workflows fall back to serial Task dispatch (no behavior change).

## Key Reference Files

- `bmad-ml/bin/cli.js` — flag parsing, path resolution, install orchestration
- `bmad-ml/lib/install.js` — `installSkills`, `installAgents`, `installDirectory`, `installFile`, `mergeAgentsMd`, `mergeJsonPatch`
- `bmad-ml/lib/docs.js` — source of truth for `--about`/`--agents`/`--workflows`/`--matrix`/`--opencode-guide`/`--pi-subagent-guide` output
- `bmad-ml/bmad-ml-pi/hybrid/dispatch-pi.mjs` — pi CLI bridge with hand-rolled YAML parser for model resolution
- `bmad-ml/lib/pi-model-picker.js` — install-time interactive picker: `pi --list-models --mode json` → prompt → fan-out to all 21 agents in `.pi/settings.json`
- `bmad-ml/bmad-ml-gen/GUIDE.md` — full agent roster, workflow tables, phase execution model for Cursor/Claude Code
- `bmad-ml/bmad-ml-oc/GUIDE.md` — OpenCode variant guide
- `bmad-ml/bmad-ml-{gen,oc,pi}/.claude-plugin/marketplace.json` — per-distribution skill list

## Version / CI Notes

`bmad-ml/package.json` is pinned at `3.0.0` (breaking change: `--cur-sub`/`--cc-sub` removed; `--cur`/`--cc` now install the former sub-mode layout with hard/soft Nosh binding) while `.claude-plugin/marketplace.json` still declares `1.0.0`. Dispatch-pi has a regression suite at `bmad-ml/bmad-ml-pi/hybrid/dispatch-pi.test.mjs` (`node --test`). No broader CI is configured.
