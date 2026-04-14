# Step 03 - Finalize

1. Validate agent boundaries:
   - Confirm no two agents have overlapping responsibilities. For each agent pair, verify their role statements are clearly distinct.
   - Confirm every agent's output contract is consumed by at least one downstream component (no orphaned outputs).
   - Confirm every required input has a producing agent or external source.
2. Check tool schema completeness:
   - Every tool referenced by an agent has a defined name, parameters, and return format.
   - Every tool has error handling behavior specified.
   - No agent references a tool that does not exist in the tool inventory.
3. Validate orchestration safety:
   - Recursion/loop limits are set for every cyclic path.
   - Timeout is defined for every agent execution step.
   - At least one fallback path exists for critical user-facing flows.
4. Save the completed artifact to `{planning_artifacts}/agent-system-design.md`.
5. Present the agent system design to the user for review. Summarize:
   - Agent roster with roles.
   - Orchestration pattern and key routing decisions.
   - Open risks (e.g., complex failure modes, untested coordination patterns).

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
