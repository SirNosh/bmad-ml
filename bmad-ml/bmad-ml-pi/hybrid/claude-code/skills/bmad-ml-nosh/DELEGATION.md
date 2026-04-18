## pi subagent delegation

Use Task with `subagent_type: bmad-<specialist>` for specialist work.
Each shim calls `node .bmad-ml/dispatch-pi.mjs <specialist> <prompt-file>`.
Integrate structured specialist summaries into one Nosh response.

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
