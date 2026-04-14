# Step 03 - Finalize

1. Cross-check against guardrails spec:
   - If `{planning_artifacts}/guardrails-spec.md` exists, verify that every refusal trigger in the behavior spec is enforceable by the guardrails layer.
   - Verify that the behavior spec's prohibited topics align with the guardrails content filtering rules.
2. Validate consistency across agents:
   - Confirm that agents sharing the same product surface use consistent tone and persona conventions.
   - Confirm that escalation paths between agents are bidirectionally defined (agent A can escalate to B, and B knows how to receive that escalation).
   - Confirm no contradictions exist between different agents' boundary definitions.
3. Verify completeness:
   - Every agent in `agent-system-design.md` that was identified as needing a behavior spec has one.
   - Every behavior contract covers all six subsections (persona, boundaries, refusal, flow, errors, edge cases).
4. Save the completed artifact to `{planning_artifacts}/agent-behavior-spec.md`.
5. Present the behavior spec to the user for review. Summarize:
   - Agent count and persona overview.
   - Key boundary decisions (strict vs. permissive areas).
   - Escalation flow summary.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
