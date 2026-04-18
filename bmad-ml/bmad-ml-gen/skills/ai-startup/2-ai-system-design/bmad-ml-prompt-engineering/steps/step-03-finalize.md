# Step 03 - Finalize

1. Validate prompts against behavior spec:
   - If `agent-behavior-spec.md` exists, confirm each agent's system prompt enforces the defined persona, boundaries, and refusal behavior.
   - Confirm output format directives in prompts match the expected downstream parsing logic.
2. Test with adversarial inputs (design-time review):
   - For each system prompt, consider at least 2 adversarial scenarios:
     - Prompt injection attempt (e.g., "Ignore previous instructions and...").
     - Out-of-scope request that should trigger refusal.
   - Document expected behavior for each scenario in the regression test suite.
3. Validate prompt inventory completeness:
   - Every agent or LLM component identified in the architecture has a corresponding prompt entry.
   - Every prompt has at least a basic regression test defined.
   - All variable slots in templates have documented data sources.
4. Save the completed artifact to `{planning_artifacts}/prompt-spec.md`.
5. Present the prompt inventory to the user for review. Summarize:
   - Total prompt count by category (system, user-facing, internal, evaluation).
   - Key design patterns used (CoT, few-shot, structured output).
   - Prompts flagged as high-risk or needing iteration.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
