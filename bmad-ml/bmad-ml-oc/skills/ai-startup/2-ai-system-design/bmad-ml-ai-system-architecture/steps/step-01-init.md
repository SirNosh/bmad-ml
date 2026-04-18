# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-product-brief.md` and load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
2. Search `{planning_artifacts}/` for any existing architecture documents (e.g., a prior `ai-architecture.md`). If one exists, confirm whether this is a **Create** or **Iterate** run.
3. Confirm the system scope with the user:
   - **System type:** LLM application, RAG system, agent system, hybrid, or other.
   - **Deployment target:** cloud provider, edge, on-premise, or hybrid.
   - **GPU / compute budget:** available GPU types, inference budget per request, monthly cost ceiling.
   - **Latency requirements:** max acceptable end-to-end response time for primary use cases.
   - **Availability target:** uptime SLA, failover expectations.
4. Define system boundaries and integration points:
   - List external systems this AI system must integrate with (databases, APIs, user-facing frontends, third-party services).
   - Identify data sources and sinks.
   - Note authentication and authorization boundaries.
5. Document initial assumptions and constraints. Record any open questions that need resolution before architecture decisions can be finalized.

Continue to ./step-02-build.md.
