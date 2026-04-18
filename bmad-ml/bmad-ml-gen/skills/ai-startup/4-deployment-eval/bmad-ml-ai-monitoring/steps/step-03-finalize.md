# Step 03 - Finalize

1. Validate all metrics are flowing:
   - Confirm each metric category has data points appearing at expected intervals
   - Verify metric labels and dimensions are correct (service names, endpoint names, model names)
   - Confirm cost calculations are accurate by cross-referencing with LLM provider billing
   - Verify quality metrics are computing correctly against known test inputs

2. Test alert conditions:
   - Trigger each critical alert condition and verify notification delivery (correct channel, correct format, correct escalation)
   - Trigger each warning alert condition and verify notification delivery
   - Verify alert resolution notifications fire when conditions return to normal
   - Test escalation path: let a warning go unacknowledged and verify escalation fires
   - Confirm alert deduplication works (same condition does not produce duplicate alerts)

3. Document dashboard locations and usage:
   - Dashboard URLs and access instructions
   - Guide for each dashboard: what it shows, when to use it, how to interpret key graphs
   - Alert runbook: for each alert, what it means, likely causes, and recommended investigation steps
   - On-call guide: how to acknowledge alerts, escalation contacts, common triage procedures
   - Metric glossary: definition of each custom metric, how it is computed, and what normal looks like

4. Present for review:
   - Monitoring architecture summary (what is collected, where it is stored, how it is displayed)
   - Dashboard screenshots or links for each dashboard
   - Alert configuration summary (thresholds, escalation rules, notification channels)
   - Gap analysis: any metrics or alerts that should be added in the future
   - Operational cost of the monitoring stack itself

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
