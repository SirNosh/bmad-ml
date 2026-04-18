# Step 02 - Build

1. Set up project scaffold and dependency management:
   - Create directory structure: `src/llm/`, `src/prompts/`, `src/tools/`, `src/sessions/`, `tests/`
   - Install and pin dependencies per architecture spec (LLM SDK, orchestration framework, async libraries)
   - Configure environment variable loading for API keys and model endpoints

2. Implement the LLM integration layer:
   - Build the API client wrapper with provider abstraction (support switching between OpenAI, Anthropic, local models)
   - Implement model routing logic: select model based on task type, token budget, and latency requirements
   - Implement fallback chains: define primary and fallback models, automatic retry on failure with model downgrade
   - Add request/response logging with token usage tracking

3. Implement prompt management:
   - Build template loader that reads from `prompt-spec.md` definitions
   - Implement variable injection with type validation and missing-variable detection
   - Implement prompt versioning: store prompt versions, support A/B prompt selection
   - Add prompt rendering validation (check token count against model context window)

4. Implement conversation and session management:
   - Build session store (create, retrieve, update, delete sessions)
   - Implement conversation history management with configurable context window
   - Implement memory strategies per `agent-behavior-spec.md` (full history, sliding window, summary-based)
   - Add session expiration and cleanup logic

5. Implement tool calling and function execution:
   - Load tool schemas from `tool-schemas.json` and register with LLM provider
   - Implement tool dispatch: parse LLM tool call requests, validate arguments against schema, execute tool, return results
   - Add tool execution sandboxing and timeout enforcement
   - Implement parallel tool call handling if supported by the model

6. Add error handling for LLM-specific failure modes:
   - Rate limit detection and exponential backoff with jitter
   - Request timeout handling with configurable thresholds
   - Content filtering detection and graceful user messaging
   - Malformed response handling (invalid JSON, incomplete tool calls, truncated output)
   - Token budget exceeded handling (truncate context, summarize, or reject)

7. Write unit tests:
   - Prompt template rendering with all variable combinations
   - Tool schema validation (valid calls, missing params, wrong types)
   - Error handling paths (mock rate limits, timeouts, content filter triggers)
   - Session management (create, retrieve, expire, concurrent access)

8. Write integration tests:
   - End-to-end conversation flow with mocked LLM responses
   - Tool calling round-trip (LLM requests tool, tool executes, result fed back)
   - Fallback chain activation (primary model fails, fallback succeeds)
   - Multi-turn conversation with context management

Continue to ./step-03-finalize.md.
