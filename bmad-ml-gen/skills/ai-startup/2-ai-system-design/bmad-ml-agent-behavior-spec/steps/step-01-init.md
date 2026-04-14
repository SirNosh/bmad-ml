# Step 01 - Initialize

1. Read `{planning_artifacts}/agent-system-design.md` to get the full agent roster, roles, and boundaries.
2. Read `{planning_artifacts}/ai-architecture.md` for system-level safety requirements.
3. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
4. Check for an existing `{planning_artifacts}/agent-behavior-spec.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
5. Identify which agents need formal behavior contracts:
   - All user-facing agents require a behavior spec.
   - Internal agents that make consequential decisions (tool execution, data mutation) require a behavior spec.
   - Simple pass-through or formatting agents may be excluded -- confirm with user.
6. Define the guardrail philosophy with the user:
   - **Strict:** agents operate within tightly defined boundaries; anything not explicitly allowed is refused.
   - **Permissive:** agents are given broad latitude with explicit blocklists for prohibited behavior.
   - **Hybrid:** strict for safety-critical domains, permissive for creative or exploratory tasks.
7. Record assumptions and open questions.

Continue to ./step-02-build.md.
