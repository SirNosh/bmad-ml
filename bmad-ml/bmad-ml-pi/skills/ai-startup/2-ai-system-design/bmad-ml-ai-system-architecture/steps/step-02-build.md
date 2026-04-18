# Step 02 - Build

Produce `{planning_artifacts}/ai-architecture.md` with the following sections. For every design decision, document the rationale and alternatives considered.

## 2.1 System Context and Boundaries
- Draw the system context (list all actors, external systems, and data flows).
- Define what is inside vs. outside the AI system boundary.
- Specify API contracts at each boundary.

## 2.2 Model Serving Strategy
- **API vs. self-hosted:** select and justify (e.g., OpenAI API, Anthropic API, vLLM self-hosted, or hybrid).
- **Model routing:** if multiple models are used, define the routing policy (task-based, cost-based, latency-based).
- **Fallback chains:** define what happens when the primary model is unavailable or returns errors.
- **Model versioning:** how model upgrades and A/B tests are handled.

## 2.3 RAG and Knowledge Access Layer
- Define whether RAG is needed and at what scope.
- Specify the vector store, embedding model, and retrieval strategy at a high level (details deferred to the RAG Pipeline workflow).
- Define how knowledge freshness is maintained.

## 2.4 Agent Orchestration and Tooling
- Define whether agents are needed and the orchestration pattern (single agent, multi-agent sequential, parallel, hierarchical).
- List tools the agent(s) will invoke (APIs, functions, databases).
- Define the agent execution runtime and framework (LangGraph, CrewAI, custom, etc.).

## 2.5 Data Flow and Integration Contracts
- Map end-to-end data flow from user input to final output.
- Define message formats, serialization, and transport (REST, gRPC, WebSocket, message queue).
- Specify schema contracts between components.

## 2.6 Safety and Guardrails Layer
- Define where input/output guardrails are placed in the architecture.
- Specify the guardrail execution model (synchronous gate vs. async audit).
- Identify PII handling, content filtering, and prompt injection defense points.

## 2.7 Reliability, Scalability, and Cost Controls
- Define scaling strategy (horizontal auto-scaling, queue-based load leveling).
- Specify caching layers (prompt cache, embedding cache, response cache).
- Define rate limiting and cost circuit breakers.
- Plan for monitoring, logging, and alerting (observability stack).

## 2.8 Open Risks and Decision Log
- List unresolved architectural decisions with their impact and deadline.
- Document known risks and proposed mitigations.

Continue to ./step-03-finalize.md.
