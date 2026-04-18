# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` and extract the RAG-related sections (knowledge access layer, data sources, retrieval requirements).
2. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
3. Check for an existing `{planning_artifacts}/rag-design.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
4. Confirm data sources and access patterns with the user:
   - What document types will be ingested (PDFs, HTML, structured data, code, images)?
   - What is the total corpus size (document count, total tokens/pages)?
   - How frequently is the corpus updated (static, daily, real-time)?
   - Are there access control requirements (per-user, per-role document visibility)?
5. Define retrieval quality and latency targets:
   - Maximum acceptable retrieval latency (e.g., p95 < 200ms).
   - Target retrieval recall (e.g., relevant chunk in top-5 at least 90% of the time).
   - Answer quality bar (factual accuracy, citation requirements, hallucination tolerance).
6. Record assumptions and open questions.

Continue to ./step-02-build.md.
