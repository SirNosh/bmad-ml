# localBMAD Monorepo

This repository contains the open-source BMad ML ecosystem as a single monorepo with three primary directories:

- `bmad-ml`: npm package/CLI installer (`bmad-ml`) for Cursor, Claude Code, and OpenCode
- `bmad-ml-gen`: general BMad ML skill content and docs
- `bmad-ml-oc`: OpenCode-oriented skills and agent shims

## Repository Structure

```text
localBMAD/
  bmad-ml/
  bmad-ml-gen/
  bmad-ml-oc/
```

Each directory has its own README with detailed usage and maintenance instructions.

## What Each Directory Is For

### `bmad-ml`

- Publishes the npm package `bmad-ml`
- Provides CLI install targets:
  - `--cursor`
  - `--claude-code`
  - `--opencode`
- Provides self-contained docs commands:
  - `--about`
  - `--agents`
  - `--workflows`
  - `--opencode-guide`

### `bmad-ml-gen`

- Source content for the general BMad ML skill set
- Skills and workflows for AI Lab and AI Startup usage
- Base docs/content that can be consumed by compatible environments

### `bmad-ml-oc`

- OpenCode-specific distribution content
- OpenCode skill packaging and agent shim definitions
- Runtime behavior support for multi-agent OpenCode sessions

## Quick Start

From the `bmad-ml` directory:

```bash
cd bmad-ml
npm install
npx bmad-ml --help
```

Install into your current project (run from a project root):

```bash
npx bmad-ml --cursor
# or
npx bmad-ml --claude-code
# or
npx bmad-ml --opencode
```

## npm Publish Flow (`bmad-ml`)

```bash
cd bmad-ml
npm pack --dry-run
npm publish --dry-run
npm publish --access public
```

## Open Source Notes

- License: MIT
- Keep all three directory READMEs up to date when behavior/content changes
- Bump `bmad-ml/package.json` version before each npm release
