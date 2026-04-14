# Step 02 - Build

Produce `{planning_artifacts}/agent-system-design.md` with the following sections.

## 2.1 Agent Definitions
For **each** agent, define:
- **Name and role:** clear, non-overlapping responsibility statement.
- **Input contract:** what data/context the agent receives.
- **Output contract:** what the agent produces (format, schema).
- **Model assignment:** which LLM backs this agent and why.
- **Boundaries:** what this agent must NOT do (explicit exclusions to prevent role drift).

## 2.2 Orchestration and Routing Logic
- Define the orchestration framework (LangGraph, CrewAI, Autogen, custom state machine, etc.).
- Map the execution flow: which agent runs when, what triggers transitions.
- Define routing conditions (how the system decides which agent handles a given request).
- Specify parallelism rules: which agents can run concurrently, which must be sequential.
- Define maximum iteration/recursion limits to prevent runaway loops.

## 2.3 Tool Interfaces and Function Calling Contracts
- List every tool each agent can invoke (reference `tool-schemas.json` if it exists, or define placeholders).
- For each tool: name, purpose, which agent(s) can call it, and whether it requires confirmation.
- Define tool invocation protocol (OpenAI function calling, Anthropic tool use, custom JSON-RPC).

## 2.4 Memory and State Management
- **Short-term memory:** how conversation context is passed between turns (message history, sliding window, summarization).
- **Long-term memory:** whether agents persist knowledge across sessions (vector store, database, file system).
- **Shared state:** how agents share state during a single orchestration run (shared context object, blackboard pattern, message bus).
- **State serialization:** format for checkpointing and resuming agent state.

## 2.5 Fallback and Error Handling
- Define behavior when an agent fails (timeout, malformed output, model error):
  - Retry policy (max retries, backoff strategy).
  - Fallback agent or simplified response path.
  - Escalation to human operator.
- Define behavior when tool calls fail (API down, rate limited, invalid response).
- Define graceful degradation: what the system can still do when a component is unavailable.

## 2.6 Coordination Protocol
- Select the inter-agent communication mechanism:
  - **Filesystem blackboard:** agents read/write shared files.
  - **Message passing:** structured messages through a queue or bus.
  - **Shared context object:** in-memory context passed through the orchestrator.
- Define message format and schema for inter-agent communication.
- Define conflict resolution when multiple agents produce contradictory outputs.

Continue to ./step-03-finalize.md.
