# Step 02 - Build

1. Define gate criteria per stage:
   - **Dev -> Staging gate**:
     - All unit tests pass (hard gate)
     - Integration tests pass with >= 95% pass rate (hard gate)
     - Prompt regression tests pass (hard gate)
     - Code review approved (hard gate)
     - No critical or high-severity linter warnings (soft gate)
   - **Staging -> Production gate**:
     - All staging smoke tests pass (hard gate)
     - Evaluation metrics meet minimum thresholds: accuracy >= X%, safety score >= Y, latency p95 < Z ms (hard gate)
     - Safety audit completed and status is "pass" or "conditional pass with mitigations" (hard gate for first release, soft gate for updates)
     - Prompt regression suite shows no regressions (hard gate)
     - Monitoring and alerting confirmed operational (hard gate)
     - Load test demonstrates system handles projected peak traffic (soft gate)
   - **Production canary -> Full production gate** (if canary strategy):
     - Error rate < baseline + 1% (hard gate, auto-rollback if exceeded)
     - Latency p95 < SLO (hard gate, auto-rollback if exceeded)
     - No safety incidents in canary traffic (hard gate)
     - Canary running for minimum soak time (e.g., 1 hour) (hard gate)

2. Define gate approval authority:
   - Dev -> Staging: Engineering lead or automated (all criteria met = auto-promote)
   - Staging -> Production: Product owner + engineering lead sign-off required
   - Canary -> Full production: Automated based on metric thresholds, with manual override available
   - Emergency hotfix path: who can bypass gates (on-call lead) and what documentation is required after the fact
   - Document approval authority for each gate in the quality gate specification

3. Define remediation workflow for gate failures:
   - When a gate blocks: the system produces a failure report listing which criteria failed and by how much
   - For each failure type, define the remediation path:
     - Test failure: fix tests or fix code, re-run pipeline
     - Evaluation metric below threshold: investigate root cause, retrain/re-tune, re-evaluate
     - Safety audit failure: address findings, re-audit affected areas
     - Performance failure: profile and optimize, or adjust SLO with product owner approval
   - Define SLA for remediation: critical gate failures addressed within 1 business day, non-critical within 1 sprint
   - Track gate failure history for process improvement

4. Configure automated gate checks in CI/CD:
   - Implement gate check as a pipeline stage that runs after all evaluation stages complete
   - Gate check logic: load gate criteria for the target stage, compare evaluation results against thresholds, produce pass/fail/advisory verdict
   - On pass: auto-promote to next stage (or notify approver for manual stages)
   - On fail: block promotion, generate failure report, notify responsible parties
   - On advisory: allow promotion but add warning annotation to the deployment
   - Store gate results as artifacts: timestamp, criteria checked, values observed, verdict, approver (if manual)

5. Document escalation procedures:
   - Who to contact when a gate is blocking a critical release
   - Process for requesting a gate override (justification required, risk acceptance documented, time-limited override)
   - Process for adjusting gate thresholds (requires product and engineering alignment, documented rationale)
   - Post-mortem process: when a gate failure leads to a delayed release, review whether the gate was correctly calibrated

Continue to ./step-03-finalize.md.
