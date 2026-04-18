# Step 03 - Finalize

1. Validate all sources are covered:
   - Every data source referenced in `ai-architecture.md` has an ingestion design.
   - Every data source referenced in `rag-design.md` (if applicable) has a corresponding pipeline.
   - No orphan pipelines exist (every defined pipeline feeds into at least one downstream consumer).
2. Check error handling completeness:
   - Every source has transient and permanent error handling defined.
   - Every pipeline has a dead-letter or quarantine mechanism for unprocessable records.
   - Alerting thresholds are defined for every pipeline.
3. Verify data flow consistency:
   - Transformation outputs match the expected input schemas of downstream components (RAG indexing, agent context, API responses).
   - Freshness requirements are achievable with the selected ingestion frequency.
4. Save the completed artifact to `{planning_artifacts}/data-integration.md`.
5. Present the data integration design to the user for review. Summarize:
   - Total source count by type and ingestion frequency.
   - Key transformation decisions.
   - Pipeline health monitoring approach.
   - Open risks (e.g., rate-limited sources, undocumented APIs, large-volume batch jobs).

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
