# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and build a full component inventory:
   - List every component specified in the architecture (LLM services, data pipelines, APIs, background workers, UIs)
   - Map dependencies between components (which calls which, shared state, message flows)
   - Identify the implementation order based on dependency graph (leaf nodes first)
2. Load all relevant design artifacts and cross-reference:
   - `{planning_artifacts}/prompt-spec.md` for prompt-dependent components
   - `{planning_artifacts}/rag-design.md` for retrieval-dependent components
   - `{planning_artifacts}/agent-behavior-spec.md` for agent-dependent components
   - `{planning_artifacts}/tool-schemas.json` for tool-dependent components
   - `{planning_artifacts}/data-integration.md` for data pipeline components
   - `{planning_artifacts}/guardrails-spec.md` for safety-critical components
3. Identify which components to implement in this iteration:
   - Prioritize by dependency order and business value
   - Mark components as: implement now, stub/mock for now, defer to next iteration
4. Confirm integration contracts between components:
   - API contracts: endpoints, request/response schemas, authentication
   - Message contracts: event types, payload schemas, ordering guarantees
   - Shared state contracts: database schemas, cache keys, file formats
   - Validate that all producer-consumer pairs agree on contracts
5. Define success criteria for this implementation pass: which integration tests must pass, which end-to-end flows must work, what performance thresholds apply.

Continue to ./step-02-build.md.
