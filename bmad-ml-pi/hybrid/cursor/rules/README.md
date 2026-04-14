# Cursor Hybrid Rules

These rules support `--cursor-pi` mode.

- `bmad-ml-nosh.mdc` is always on.
- Specialist rules are agent-requested by description matching.
- Parallel specialist dispatch is intentionally sequential in Cursor mode.

If Cursor prompts for shell command approval, approve `node .bmad-ml/dispatch-pi.mjs` once.
