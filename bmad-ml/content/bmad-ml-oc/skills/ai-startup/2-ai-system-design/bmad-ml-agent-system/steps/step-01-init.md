# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` and extract the agent-related sections (orchestration pattern, tooling, agent execution runtime).
2. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
3. Check for an existing `{planning_artifacts}/agent-system-design.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
4. Define the agent topology with the user:
   - **Agent count:** how many distinct agents are needed and why.
   - **Agent roles:** name and one-sentence purpose for each agent.
   - **Communication topology:** which agents talk to which (point-to-point, broadcast, hub-and-spoke).
5. Confirm the orchestration pattern:
   - **Sequential:** agents execute in a fixed order (pipeline).
   - **Parallel:** agents execute concurrently with result aggregation.
   - **Hierarchical:** a supervisor agent delegates to worker agents.
   - **Event-driven:** agents react to events or state changes.
   - **Hybrid:** combination of the above (specify which parts use which pattern).
6. Identify constraints:
   - Maximum agent execution time per request.
   - Maximum total cost per orchestration run.
   - Whether human-in-the-loop checkpoints are required.
7. Record assumptions and open questions.

Continue to ./step-02-build.md.
