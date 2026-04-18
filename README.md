# localBMAD Monorepo

This repository contains the open-source BMad ML ecosystem as a single monorepo. The published npm package `bmad-ml` lives at the top of the tree; its four distribution dirs sit underneath:

- `bmad-ml/`: published npm package/CLI installer for Cursor, Claude Code, OpenCode, and pi/hybrid targets
- `bmad-ml/bmad-ml-gen/`: self-contained source for `--cur` and `--cc` (75 shared skills + Cursor and Claude Code IDE assets -- agents, bootstrap, rules, hooks, settings)
- `bmad-ml/bmad-ml-oc/`: OpenCode-oriented skills and agent shims
- `bmad-ml/bmad-ml-pi/`: pi-native and hybrid (Claude Code/Cursor + pi runtime) distribution assets

## Repository Structure

```text
bmadml/
  bmad-ml/
    bin/                 # CLI entry point
    lib/                 # Install orchestration + docs
    bmad-ml-gen/         # Shared skills + Cursor/Claude Code assets
    bmad-ml-oc/          # OpenCode distribution
    bmad-ml-pi/          # pi/hybrid distribution
```

Each distribution directory has its own README with detailed usage and maintenance instructions.

## What Each Directory Is For

### `bmad-ml`

- Publishes the npm package `bmad-ml`
- Provides CLI install targets:
  - `--oc` (alias: `--opencode`) -- OpenCode primary mode
  - `--cur` (alias: `--cursor`) -- Cursor subagent mode (Nosh via AGENTS.md, soft binding)
  - `--cc` (alias: `--claude-code`) -- Claude Code subagent mode (Nosh as main-thread agent, hard binding)
  - `--cur-pi` (alias: `--cursor-pi`) -- Cursor + pi-backed specialists
  - `--cc-pi` (alias: `--claude-code-pi`) -- Claude Code + pi-backed specialists
- Provides self-contained docs commands:
  - `--about`
  - `--agents`
  - `--workflows`
  - `--matrix`
  - `--opencode-guide`
  - `--pi-subagent-guide`

### `bmad-ml-gen`

- Self-contained source for the `--cur` and `--cc` flags: 75 shared skills plus IDE-specific agents, bootstrap (`AGENTS.md`/`CLAUDE.md`), rules, hooks, and the `.claude/settings.json` patch (which includes `"agent": "bmad-ml-nosh"` for Claude Code's hard persona binding)
- 21 agent files per IDE: 20 specialists + Nosh
- Base docs/content consumed by compatible environments

### `bmad-ml-oc`

- OpenCode-specific distribution content
- OpenCode skill packaging and agent shim definitions
- Runtime behavior support for multi-agent OpenCode sessions

### `bmad-ml-pi`

- pi-backed hybrid runtime assets only (standalone `--pi` removed)
- Hybrid runtime assets:
  - Claude Code orchestrator + pi subagents (`--cc-pi`)
  - Cursor orchestrator + pi subagents (`--cur-pi`)

## Quick Start

Use the published npm package from your project root:

```bash
npx bmad-ml --help
# or
npx bmad-ml --oc
# or
npx bmad-ml --cur
# or
npx bmad-ml --cc
# or
npx bmad-ml --cur-pi
# or
npx bmad-ml --cc-pi
```

## Open Source Notes

- License: MIT
- Keep the package README and CLI docs aligned when behavior changes
