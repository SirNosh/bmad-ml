# Step 03 - Finalize

1. Validate schemas against function calling specs:
   - Confirm all schemas are valid JSON Schema (draft-07 or later).
   - Confirm compatibility with the target LLM provider's function calling format (OpenAI, Anthropic, or both).
   - Verify all `description` fields are under the provider's character limit and are unambiguous.
2. Check for missing error handling:
   - Every tool has at least one defined error code beyond generic failure.
   - Every tool with external dependencies (APIs, databases) has a timeout and retry policy.
   - Every mutating tool has a confirmation or rollback mechanism defined.
3. Validate cross-references:
   - Every tool referenced in `agent-system-design.md` has a corresponding schema.
   - No orphan schemas exist (every defined tool is used by at least one agent).
   - Tool dependency chains have no circular dependencies.
4. Save the completed artifacts:
   - `{planning_artifacts}/tool-schemas.json` (machine-readable schemas).
   - `{planning_artifacts}/tool-schemas-docs.md` (human-readable documentation).
5. Present the tool schema inventory to the user for review. Summarize:
   - Total tool count by category.
   - Tools requiring user confirmation before execution.
   - Any tools with complex dependency chains.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
