# Step 03 - Finalize

1. Red-team the design (design-time threat analysis):
   - For each guardrail layer (input validation, output validation, refusal policy), identify at least 2 plausible bypass scenarios.
   - Document whether each bypass is mitigated by another layer (defense in depth) or represents a residual risk.
   - Assess the severity of each residual risk (low, medium, high, critical).
2. Validate false positive rate is acceptable:
   - Review the refusal trigger taxonomy for overly broad rules that could block legitimate requests.
   - Confirm that PII masking rules do not over-mask non-PII content (e.g., product names that look like personal names).
   - Ensure content filtering does not block domain-appropriate content (e.g., medical terminology in a healthcare product).
3. Cross-check against behavior spec:
   - If `agent-behavior-spec.md` exists, confirm that every refusal behavior defined there is enforceable by the guardrails layer.
   - Confirm the guardrails do not contradict any agent's allowed behavior.
4. Save the completed artifact to `{planning_artifacts}/guardrails-spec.md`.
5. Present the guardrails design to the user for review. Summarize:
   - Threat model coverage (which threats are mitigated, which are residual risks).
   - Guardrails framework choice and integration approach.
   - Testing plan and false positive management.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
