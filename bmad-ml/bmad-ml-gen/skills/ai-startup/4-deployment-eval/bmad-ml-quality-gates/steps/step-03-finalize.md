# Step 03 - Finalize

1. Validate gates cover all critical quality dimensions:
   - Cross-reference gate criteria against architecture spec quality requirements -- confirm every critical requirement has a corresponding gate check
   - Cross-reference against safety audit scope -- confirm safety-critical items are gated
   - Verify no dimension is only covered by advisory gates (critical dimensions need hard gates)
   - Identify any gaps and propose additional gate criteria

2. Present the quality gate specification for review:
   - Gate criteria matrix: stage x dimension x threshold x enforcement level (hard/soft/advisory)
   - Approval authority table: who approves each gate transition
   - Remediation workflow diagram: failure detected -> root cause analysis -> fix -> re-check
   - CI/CD integration summary: how gates are automated, where manual approval is required
   - Escalation and override procedures
   - Gate failure tracking plan (metrics on how often each gate blocks and why)

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
