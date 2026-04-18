# Step 03 - Finalize

1. Run the full test suite (unit + integration) and produce a results summary:
   - Total tests, passed, failed, skipped
   - Coverage percentage for critical modules (LLM client, prompt manager, tool executor, session manager)
   - List any failing tests with root cause analysis

2. Validate implementation against `ai-architecture.md`:
   - Confirm all specified models are accessible and correctly configured
   - Confirm fallback chain behavior matches architecture spec
   - Confirm tool calling contracts match `tool-schemas.json`
   - Confirm session management meets specified persistence and TTL requirements

3. Document implementation decisions and deviations:
   - List any deviations from the architecture spec with justification
   - Document configuration parameters and their defaults
   - Document known limitations (e.g., unsupported model features, rate limit constraints)
   - Record open questions for the next iteration

4. Present deliverables to the user:
   - Code structure overview with module responsibilities
   - Test results summary
   - Implementation decision log
   - List of deferred items and recommended next steps

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
