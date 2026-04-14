# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract the LLM integration layer specification, selected models, API providers, and fallback strategy.
2. Load `{planning_artifacts}/prompt-spec.md` and catalog all prompt templates, their required variables, expected input/output formats, and versioning scheme.
3. Load `{planning_artifacts}/agent-behavior-spec.md` and identify agent roles, conversation flow patterns, memory/context requirements, and behavioral constraints.
4. Load `{planning_artifacts}/tool-schemas.json` and validate all tool definitions including parameter types, required fields, and return schemas.
5. Identify the implementation scope for this iteration: list which components are in-scope (e.g., single-model chat, multi-model routing, tool calling) and which are deferred.
6. Confirm framework choices from the architecture spec and justify selection:
   - **Orchestration**: LangChain, LlamaIndex, Semantic Kernel, or custom
   - **API client**: OpenAI SDK, Anthropic SDK, or unified client (LiteLLM)
   - **State management**: In-memory, Redis, database-backed
7. Define the test plan: list unit test targets (prompt rendering, tool schema validation, error handling), integration test targets (end-to-end LLM calls, tool execution), and mock strategy for API calls.
8. Identify environment requirements: API keys needed, model access confirmed, rate limit quotas verified, and local development setup documented.

Continue to ./step-02-build.md.
