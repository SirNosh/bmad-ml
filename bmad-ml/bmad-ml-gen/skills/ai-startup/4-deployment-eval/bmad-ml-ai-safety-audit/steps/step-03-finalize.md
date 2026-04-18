# Step 03 - Finalize

1. Produce the safety audit report using the template:
   - Executive summary: overall security posture, number of findings by severity, top risks
   - Attack surface map with annotated risk levels
   - Detailed findings: each finding with description, reproduction steps, severity, remediation, effort estimate
   - Guardrail effectiveness assessment: which guardrails work, which have gaps, which are missing
   - Testing methodology: what was tested, what tools/techniques were used, what was out of scope

2. Provide release recommendation:
   - **Pass**: No critical or high findings, all medium findings have mitigations or accepted risk
   - **Conditional pass**: No critical findings, high findings have mitigations planned with timeline, acceptable residual risk
   - **Fail**: Critical findings present, or high findings without mitigation plan
   - Document the specific conditions that must be met before re-audit (if conditional pass or fail)
   - Define re-audit scope: full re-audit vs targeted re-audit of remediated findings

3. Present the audit report for review:
   - Full safety audit report document
   - Finding summary table (severity, category, status, remediation owner)
   - Release recommendation with rationale
   - Remediation priority list (ordered by severity and effort)
   - Timeline estimate for achieving "pass" status (if currently conditional or fail)

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
