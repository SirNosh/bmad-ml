# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` and extract the data-related sections (data flow, integration contracts, external systems).
2. Read `{planning_artifacts}/rag-design.md` if it exists to understand document ingestion requirements.
3. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
4. Check for an existing `{planning_artifacts}/data-integration.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
5. Build a complete inventory of external data sources with the user:
   - **APIs:** REST, GraphQL, or gRPC services the system consumes. Note authentication method and rate limits.
   - **Databases:** relational, document, or graph databases accessed directly. Note connection method and access permissions.
   - **File stores:** S3 buckets, blob storage, local file systems, SFTP. Note file formats and volumes.
   - **Streams:** Kafka topics, webhook endpoints, event buses, real-time feeds.
   - **Third-party SaaS:** CRM, analytics, or content platforms accessed via connectors.
6. Define freshness and latency requirements for each source:
   - **Real-time:** data must be current within seconds (streaming integration).
   - **Near-real-time:** data must be current within minutes (polling or webhook).
   - **Batch:** data can be hours or days old (scheduled ETL).
7. Record assumptions and open questions.

Continue to ./step-02-build.md.
