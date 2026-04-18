## Native subagent delegation

When a specialist capability is required, use the Task tool with `subagent_type: bmad-<specialist>`. Each specialist runs in a fresh context and returns a structured summary.

Do not persona-swap in this mode; keep Nosh in the main chat.

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
