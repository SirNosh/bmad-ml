# bmad-ml-pi

Hybrid-only pi runtime assets for BMad ML specialist delegation.

This directory no longer supports standalone `--pi` installation.

## Supported Modes

- `--cc-pi` (alias: `--claude-code-pi`): Claude Code main chat runs Nosh, specialist subagent shims dispatch to pi.
- `--cur-pi` (alias: `--cursor-pi`): Cursor main chat runs Nosh, specialist subagent shims dispatch to pi.

## What Gets Installed

- `.pi/skills/` pi-runnable skills
- `.bmad-ml/dispatch-pi.mjs` dispatcher bridge
- IDE bootstrap/rule/shim assets from `hybrid/claude-code/` or `hybrid/cursor/`

## Layout

```text
bmad-ml-pi/
  hybrid/
    dispatch-pi.mjs
    dispatch-pi.sh
    dispatch-pi.test.mjs
    claude-code/
      agents/
      bootstrap/
      rules/
      skills/
        bmad-ml-nosh/
        ml-setup/
      hooks/
      settings-patch.json
    cursor/
      agents/
      bootstrap/
      rules/
      skills/
        bmad-ml-nosh/
        ml-setup/
      hooks/
      settings-patch.json
  skills/
```
