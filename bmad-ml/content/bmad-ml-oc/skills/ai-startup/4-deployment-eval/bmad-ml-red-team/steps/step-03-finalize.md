# Step 03 - Finalize

1. Produce the red team report:
   - Executive summary: engagement scope, duration, number of findings by severity, overall risk assessment
   - Attack narrative summaries: each major finding as a brief story (attacker goal, method, outcome)
   - Detailed findings: full reproduction steps, severity, exploitability assessment, remediation recommendation
   - Aggregate risk assessment: is the system ready for the intended audience? What is the residual risk?

2. Prioritize findings by real-world risk:
   - Rank by: exploitability (easy to find and exploit) x impact (damage if exploited) x likelihood (how likely a real attacker will try this)
   - Top 5 findings get detailed remediation plans with specific technical approaches and effort estimates
   - Group findings by remediation theme (e.g., "strengthen system prompt" addresses findings 1, 3, 7; "add output filtering" addresses findings 2, 5)
   - Define which findings must be fixed before launch vs which can be accepted as known risks vs which should be monitored

3. Present the red team report for review:
   - Full red team report document
   - Finding severity distribution and trend (if this is not the first red team engagement)
   - Top 5 findings with reproduction steps and remediation plans
   - Launch readiness recommendation: ready / ready with conditions / not ready
   - Recommendations for the next red team engagement (scope, timing, additional attack vectors to explore)

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
