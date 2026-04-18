# Step 03 - Finalize

1. Validate runbook completeness:
   - Every step has specific commands or actions (no vague instructions like "deploy the service")
   - Preconditions checklist is exhaustive (nothing assumed)
   - Rollback procedure is detailed and tested
   - Smoke test definitions are concrete and automated
   - Escalation contacts and communication plan are documented

2. Dry-run the deployment checklist:
   - Walk through every step of the runbook in sequence
   - Verify each command or action is executable (correct paths, permissions, credentials)
   - Verify smoke test suite runs against the current environment
   - Verify rollback procedure references correct versions and commands
   - Time the dry-run to estimate actual deployment duration

3. Present the deployment runbook for review:
   - Runbook document with all sections completed
   - Deployment architecture diagram (what gets deployed where, traffic flow)
   - Risk assessment: what could go wrong during deployment and mitigation for each risk
   - Estimated deployment duration and downtime (if any)
   - Required personnel and their roles during deployment

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
