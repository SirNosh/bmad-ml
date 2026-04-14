# Step 01 - Initialize

1. Read `{planning_artifacts}/agent-system-design.md` to extract the tool inventory (every tool referenced by any agent).
2. Read `{planning_artifacts}/ai-architecture.md` for integration points and external API contracts.
3. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
4. Check for an existing `{planning_artifacts}/tool-schemas.json`. If one exists, confirm whether this is a **Create** or **Iterate** run.
5. Build a complete tool inventory:
   - List every tool by name, owning agent(s), and one-sentence purpose.
   - Categorize tools: data retrieval, data mutation, external API call, internal computation, user communication.
6. Define safety boundaries for tool execution:
   - Which tools are **read-only** (safe to auto-execute) vs. **write/mutate** (require confirmation or guardrails).
   - Maximum execution time per tool call.
   - Rate limits per tool per minute/hour.
   - Whether any tools require human approval before execution.
7. Record assumptions and open questions.

Continue to ./step-02-build.md.
