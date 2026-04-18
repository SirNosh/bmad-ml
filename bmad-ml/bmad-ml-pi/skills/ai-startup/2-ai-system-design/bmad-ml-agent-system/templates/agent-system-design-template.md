---
artifact: agent-system-design
iteration: 1
created: 2026-04-07
last_updated: 2026-04-07
---

# Agent System Design

## System Overview

> **Purpose:** Provide a high-level summary of the agent system -- its purpose, the number of agents, and the guiding philosophy behind the orchestration approach.
> **Guidance:** Answer three questions: What does this agent system accomplish that a single prompt cannot? How many agents are involved and why? What orchestration philosophy governs their interaction (e.g., minimal autonomy, maximum autonomy, human-in-the-loop)?

### Purpose

{One to two sentences describing what the agent system does end-to-end.}

### Agent Count and Justification

- **Number of agents:** {e.g., 4}
- **Why multiple agents?** {e.g., Separation of concerns -- routing, retrieval, generation, and validation each require distinct model configurations, tool access, and failure handling.}

### Orchestration Philosophy

{e.g., "Least-privilege autonomy: each agent can only invoke its own tools and must pass control back to the orchestrator. No agent may call another agent directly."}

---

## Agent Definitions

> **Purpose:** Define every agent in the system with enough detail that a developer can implement it without ambiguity.
> **Guidance:** For each agent, specify its name, role, responsibilities, capabilities, available tools, and the model it uses. Include any behavioral constraints or system-prompt directives.

### Agent: {Agent Name}

| Field | Value |
|---|---|
| **Name** | {e.g., Router Agent} |
| **Role** | {e.g., Intent classifier and request dispatcher} |
| **Model** | {e.g., GPT-4o-mini} |
| **Autonomy Level** | {Fully autonomous / Supervised / Human-in-the-loop} |

**Responsibilities:**
- {e.g., Classify incoming user messages into one of N intent categories}
- {e.g., Route to the appropriate specialist agent based on classification}
- {e.g., Handle ambiguous intents by asking the user a clarifying question}

**Capabilities:**
- {e.g., Intent classification with confidence score}
- {e.g., Multi-turn disambiguation}

**Tools:**
| Tool | Access Level | Purpose |
|---|---|---|
| {e.g., None} | {N/A} | {Classification is prompt-only} |

**System Prompt Directives:**
{Key behavioral instructions included in this agent's system prompt. e.g., "You are a router. Never generate a final answer. Always output a JSON object with intent and confidence."}

{Repeat this block for each agent in the system.}

---

## Orchestration Pattern

> **Purpose:** Define how agents are coordinated -- the execution flow, routing logic, and handoff protocol. A poorly designed orchestration layer causes cascading failures and non-deterministic behavior.
> **Guidance:** Choose a pattern (sequential, parallel, hierarchical, event-driven, or hybrid) and justify it. Then define routing rules and how context is transferred between agents.

### Pattern

- **Type:** {Sequential / Parallel / Hierarchical / Event-driven / Hybrid}
- **Justification:** {Why this pattern fits the use case. e.g., "Sequential because each step depends on the prior step's output and we need deterministic traceability."}

### Execution Flow

```
User Input --> [Router Agent] --(intent: retrieval)--> [Research Agent] --> [Response Agent] --> Output
                              --(intent: action)-----> [Action Agent] ----> [Response Agent] --> Output
                              --(intent: unclear)----> [Clarification] --> User
```

### Routing Logic

| Condition | Target Agent | Fallback |
|---|---|---|
| {intent == "retrieval" AND confidence > 0.8} | {Research Agent} | {Clarification} |
| {intent == "action" AND confidence > 0.8} | {Action Agent} | {Clarification} |
| {confidence < 0.8 for all intents} | {Clarification} | {Human escalation} |
| | | |

### Handoff Protocol

- **Context passed:** {What data is included in the handoff: user message, conversation history, prior agent output, metadata}
- **Format:** {e.g., JSON with fields: user_message, context_window, agent_trace, tool_results}
- **Max context window per handoff:** {e.g., Last 5 turns + system prompt + tool results}

---

## Tool Definitions

> **Purpose:** Define every tool available to agents, including its function schema, safety constraints, and rate limits. Tools are the mechanism by which agents interact with the world beyond text generation.
> **Guidance:** For each tool, provide a name, description, input/output schema, which agents may use it, and any safety or rate constraints. Tools should follow the principle of least privilege.

### Tool: {Tool Name}

| Field | Value |
|---|---|
| **Name** | {e.g., vector_search} |
| **Description** | {e.g., Query the vector database for semantically similar document chunks} |
| **Available to** | {e.g., Research Agent only} |

**Input Schema:**
```json
{
  "query": "string (required) -- the search query",
  "top_k": "integer (optional, default 10) -- number of results to return",
  "filters": "object (optional) -- metadata filters"
}
```

**Output Schema:**
```json
{
  "results": [
    {
      "chunk_id": "string",
      "content": "string",
      "score": "float",
      "metadata": "object"
    }
  ]
}
```

**Safety Constraints:**
- {e.g., Read-only access -- cannot modify the vector index}
- {e.g., Query text must not contain PII (sanitized by caller)}

**Rate Limits:**
- {e.g., Max 50 calls per session, max 5 calls per agent turn}

{Repeat this block for each tool.}

---

## Memory and State Management

> **Purpose:** Define how agents remember context within a session, across sessions, and how shared state is managed. Without explicit memory design, agents either forget critical context or accumulate unbounded state.
> **Guidance:** Address three layers: conversation history (within a session), long-term memory (across sessions), and shared state (between agents within a single request). For each, specify the storage mechanism, retention policy, and size limits.

### Conversation History

- **Scope:** {e.g., Per-session, per-user}
- **Storage:** {e.g., In-memory buffer, Redis}
- **Max length:** {e.g., 20 turns or 8,000 tokens, whichever is reached first}
- **Truncation strategy:** {e.g., Sliding window, drop oldest turns first, summarize older turns}

### Long-Term Memory

- **Scope:** {e.g., Per-user, cross-session}
- **Storage:** {e.g., PostgreSQL user_preferences table}
- **What is stored:** {e.g., User preferences, past decisions, feedback signals}
- **Retention policy:** {e.g., 90 days, then archived}

### Shared State (Inter-Agent)

- **Scope:** {e.g., Per-request, available to all agents in the orchestration chain}
- **Storage:** {e.g., In-memory dict passed through orchestrator, or Redis with TTL}
- **What is stored:** {e.g., Agent scratchpad, intermediate tool results, accumulated citations}
- **Conflict resolution:** {e.g., Last-writer-wins; orchestrator is the sole writer}

### Persistence Strategy

- **Session persistence:** {e.g., Redis with 30-min TTL}
- **Durable persistence:** {e.g., PostgreSQL for user memory, S3 for conversation logs}
- **Backup and recovery:** {e.g., Daily PostgreSQL backups, Redis is ephemeral}

---

## Error Handling and Fallbacks

> **Purpose:** Define what happens when agents, tools, or models fail. Unhandled failures in agent systems cascade unpredictably and are difficult to debug.
> **Guidance:** For each agent and tool, define the expected failure modes, fallback behavior, and escalation paths. Include a graceful degradation strategy for when the entire system is impaired.

### Per-Agent Failure Modes

| Agent | Failure Mode | Fallback Behavior | Escalation |
|---|---|---|---|
| {Router Agent} | {Model timeout or 5xx} | {Retry once, then use rule-based classifier} | {Alert on-call if fallback also fails} |
| {Research Agent} | {Vector DB unavailable} | {Return cached results if available, else inform user} | {Page infrastructure team} |
| {Response Agent} | {Hallucination detected by validator} | {Regenerate with stricter prompt, max 2 retries} | {Return "I don't have enough information" with sources} |
| | | | |

### Tool Failure Handling

| Tool | Failure Mode | Fallback | Max Retries |
|---|---|---|---|
| {vector_search} | {Timeout > 5s} | {Return empty results, agent proceeds without context} | {1} |
| {web_search} | {Rate limited} | {Use cached results or skip} | {0} |
| | | | |

### Graceful Degradation

{Describe the behavior when multiple components fail simultaneously. e.g., "If both the primary LLM and fallback LLM are unavailable, the system returns a static message: 'Our AI assistant is temporarily unavailable. Please try again in a few minutes.' and logs a critical alert."}

---

## Coordination Protocol

> **Purpose:** Define the communication method agents use to exchange information, and how conflicts are resolved when agents produce contradictory outputs.
> **Guidance:** Choose a coordination mechanism (filesystem, message passing, shared context object, event bus) and define the protocol. Address what happens when two agents disagree or produce conflicting results.

### Communication Method

- **Mechanism:** {Filesystem / Message queue / Shared context object / Event bus}
- **Implementation:** {e.g., Orchestrator passes a context dict through the chain; each agent reads from and writes to designated keys}
- **Serialization:** {e.g., JSON}

### Protocol Rules

1. {e.g., Agents may only read keys designated for their role}
2. {e.g., Agents must write their output to their designated output key before returning}
3. {e.g., The orchestrator validates the context object schema after each agent step}

### Conflict Resolution

- **When agents disagree:** {e.g., The orchestrator runs a confidence-weighted vote; if no majority, escalate to human}
- **When tool results contradict:** {e.g., Present both results with provenance to the response agent; let it synthesize}
- **Deadlock prevention:** {e.g., Maximum 3 orchestration loops per request; after that, return best-effort response with disclaimer}
