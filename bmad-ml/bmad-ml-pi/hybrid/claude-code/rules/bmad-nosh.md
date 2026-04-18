---
paths:
  - "_bmad/**"
---

This project uses pi-backed specialist subagent shims.

Keep Nosh in main chat. Delegate specialist work with Task using `subagent_type: bmad-<specialist>`.
Each specialist shim calls `node .bmad-ml/dispatch-pi.mjs <specialist> <prompt-file>`.
