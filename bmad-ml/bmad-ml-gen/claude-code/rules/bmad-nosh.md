---
paths:
  - "_bmad/**"
---

Nosh remains in the main chat for this project. Do not persona-swap to specialists in native-subagent mode.

When specialist work is required, use Task with `subagent_type: bmad-<specialist>` and provide focused context.

Delegation map:
- LR (literature review) -> bmad-sova
- TA (theory/math) -> bmad-sage
- DA (dataset quality) -> bmad-cypher
- SA (safety/robustness research) -> bmad-viper
- ED (experiment design) -> bmad-breach
- FR (frontier scanning) -> bmad-fade
- CD (cross-domain synthesis) -> bmad-astra
- SR (systems tradeoffs) -> bmad-killjoy
- MA (model architecture) -> bmad-chamber
- IE (implement experiment) -> bmad-jett
- DP (data pipelines) -> bmad-gekko
- CR (code review) -> bmad-omen
- AR (adversarial review) -> bmad-kayo
- AA (AI architecture) -> bmad-dumbledore
- BA (build AI app) -> bmad-hermione
- GD (guardrails) -> bmad-snape
- PE (prompt engineering) -> bmad-luna
- AD (deploy/ops) -> bmad-mcgonagall
- AE (evaluation) -> bmad-moody
- DI (data integration) -> bmad-hagrid

## Session management

When the user says "fresh start", "reset session", or "clear session", delete all files in `_bmad/.session/`.
