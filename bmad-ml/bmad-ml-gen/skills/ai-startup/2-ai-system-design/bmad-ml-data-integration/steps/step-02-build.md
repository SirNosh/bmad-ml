# Step 02 - Build

Produce `{planning_artifacts}/data-integration.md` with the following sections.

## 2.1 Ingestion Architecture
For **each** data source, define:
- **Source name and type** (API, database, file store, stream).
- **Ingestion method:** pull (polling, scheduled query) or push (webhook, stream consumer).
- **Ingestion frequency:** real-time, near-real-time (interval), batch (schedule).
- **Authentication:** how credentials are managed (secrets manager, OAuth, API keys).
- **Connection configuration:** endpoint URLs, connection strings, region, and retry settings.

## 2.2 Transformation and Normalization Pipeline
- Define the transformation stages for each source:
  - **Extraction:** raw data format and parsing logic.
  - **Cleaning:** handling of nulls, duplicates, malformed records.
  - **Normalization:** mapping to a common internal schema (field renaming, type casting, unit conversion).
  - **Enrichment:** any data augmentation steps (geocoding, entity resolution, metadata tagging).
- Define the transformation runtime (Apache Beam, dbt, Python scripts, cloud functions).

## 2.3 Data Quality Validation
For each data source, define validation checks:
- **Schema validation:** expected fields, types, and constraints.
- **Completeness checks:** minimum required fields, acceptable null rates.
- **Freshness checks:** maximum age of data before it is flagged as stale.
- **Volume anomaly detection:** expected record counts per ingestion cycle; alert on significant deviations.
- **Business rule validation:** domain-specific integrity checks (e.g., prices must be positive, dates must be in the future).

## 2.4 Error Handling and Retry Logic
- Define error categories: transient (network timeout, rate limit) vs. permanent (auth failure, schema mismatch).
- For transient errors: retry policy (max retries, backoff strategy, jitter).
- For permanent errors: alerting, dead-letter queue, and manual resolution workflow.
- Define partial failure handling: whether the pipeline continues processing remaining records or halts entirely.

## 2.5 Data Versioning and Lineage Tracking
- Define how data versions are tracked (timestamps, version IDs, checksums).
- Define lineage metadata: for each record in the system, track source, ingestion time, transformation steps applied.
- Plan for rollback: how to revert to a previous data version if a bad ingestion is detected.

## 2.6 Pipeline Monitoring and Health
- Define health metrics per pipeline: ingestion success rate, latency, record throughput, error rate.
- Define alerting thresholds and notification channels (email, Slack, PagerDuty).
- Define dashboards: what operators need to see to assess pipeline health at a glance.
- Plan for pipeline recovery: runbook for common failure scenarios.

Continue to ./step-03-finalize.md.
