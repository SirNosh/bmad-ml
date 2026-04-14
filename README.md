# localBMAD Monorepo

This repository contains the open-source BMad ML ecosystem as a single monorepo with four primary directories:

- `bmad-ml`: published npm package/CLI installer (`bmad-ml`) for Cursor, Claude Code, OpenCode, and pi/hybrid targets
- `bmad-ml-gen`: general BMad ML skill content and docs
- `bmad-ml-oc`: OpenCode-oriented skills and agent shims
- `bmad-ml-pi`: pi-native and hybrid (Claude Code/Cursor + pi runtime) distribution assets

## Repository Structure

```text
localBMAD/
  bmad-ml/
  bmad-ml-gen/
  bmad-ml-oc/
  bmad-ml-pi/
```

Each directory has its own README with detailed usage and maintenance instructions.

## What Each Directory Is For

### `bmad-ml`

- Publishes the npm package `bmad-ml`
- Provides CLI install targets:
  - `--cursor`
  - `--claude-code`
  - `--opencode`
  - `--pi`
  - `--cc-pi`
  - `--cursor-pi`
- Provides self-contained docs commands:
  - `--about`
  - `--agents`
  - `--workflows`
  - `--opencode-guide`
  - `--pi-guide`

### `bmad-ml-gen`

- Source content for the general BMad ML skill set
- Skills and workflows for AI Lab and AI Startup usage
- Base docs/content that can be consumed by compatible environments

### `bmad-ml-oc`

- OpenCode-specific distribution content
- OpenCode skill packaging and agent shim definitions
- Runtime behavior support for multi-agent OpenCode sessions

### `bmad-ml-pi`

- pi-native BMad ML distribution
- pi extension runtime scaffolding for isolated specialist delegation
- Hybrid runtime assets:
  - Claude Code orchestrator + pi subagents (`--cc-pi`)
  - Cursor rule orchestrator + pi subagents (`--cursor-pi`)

## Quick Start

Use the published npm package from your project root:

```bash
npx bmad-ml --help
# or
npx bmad-ml --cursor
# or
npx bmad-ml --claude-code
# or
npx bmad-ml --opencode
# or
npx bmad-ml --pi
# or
npx bmad-ml --cc-pi
# or
npx bmad-ml --cursor-pi
```

## Open Source Notes

- License: MIT
- Keep the package README and CLI docs aligned when behavior changes
