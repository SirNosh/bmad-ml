# bmad-ml

Agent-first installer and onboarding package for BMad ML.

## Install Modes

Run from your project root:

```bash
# OpenCode
npx bmad-ml --oc

# Cursor / Claude Code subagent modes (Nosh orchestrator + 20 specialist subagents)
npx bmad-ml --cur
npx bmad-ml --cc

# Cursor / Claude Code + pi-backed specialists
npx bmad-ml --cur-pi
npx bmad-ml --cc-pi
```

Aliases are supported:

- `--opencode` -> `--oc`
- `--cursor` -> `--cur`
- `--claude-code` -> `--cc`
- `--cursor-pi` -> `--cur-pi`
- `--claude-code-pi` -> `--cc-pi`

Standalone `--pi` has been removed. The former `--cur-sub` / `--cc-sub` flags are gone -- `--cur` and `--cc` now install the subagent-based layout directly.

All modes delegate specialist work via the Task/Agent tool with `subagent_type: "bmad-<name>"`. Under `--cc`, the installer writes `"agent": "bmad-ml-nosh"` into `.claude/settings.json`, replacing Claude Code's default system prompt with Nosh's persona (hard binding). Under `--cur`, Nosh's persona loads via `AGENTS.md` (soft binding -- Cursor has no equivalent setting).

## Install Options

- `--force` overwrite existing installed files/directories
- `--dry-run` preview changes without writing files
- `--with-project-instructions` install bootstrap AGENTS/CLAUDE templates (default for `--cur`/`--cc`)
- `--no-project-instructions` skip bootstrap templates for `--cur`/`--cc`
- `--logging` install optional subagent hook scripts

## First Session

After installation:

1. Run `ml-setup`.
2. Start with `bmad-ml-nosh`.
3. Delegate specialist outcomes through Nosh.

## Built-in Docs Commands

```bash
npx bmad-ml --about
npx bmad-ml --agents
npx bmad-ml --workflows
npx bmad-ml --matrix
npx bmad-ml --opencode-guide
npx bmad-ml --pi-subagent-guide
```

## Target Summary

- `--oc` -> `.opencode/skills/`, `.opencode/agents/`
- `--cur` -> `.cursor/skills/`, `.cursor/agents/` (21 files: 20 specialists + Nosh), `AGENTS.md`, `.cursor/rules/`, optional `.cursor/hooks/` + `.cursor/hooks.json`
- `--cc` -> `.claude/skills/`, `.claude/agents/` (21 files: 20 specialists + Nosh), `CLAUDE.md`, `.claude/rules/`, `.claude/settings.json` (merged -- includes `"agent": "bmad-ml-nosh"`), `DELEGATION.md`, optional `.claude/hooks/`
- `--cur-pi` -> `.pi/skills/`, `.cursor/agents/`, `.cursor/rules/`, `.bmad-ml/dispatch-pi.mjs`
- `--cc-pi` -> `.pi/skills/`, `.claude/agents/`, `.claude/rules/`, `.bmad-ml/dispatch-pi.mjs`

### Agent Teams (Claude Code only, experimental)

The four party/meeting skills (`bmad-ml-lab-meeting`, `bmad-ml-startup-meeting`, `bmad-ml-research-party`, `bmad-ml-all-hands`) can optionally use agent teams for multi-specialist discussion. Enable by exporting `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` before starting Claude Code. The installer does not write this env var -- opt in manually. Without it, these workflows fall back to serial Task dispatch.
