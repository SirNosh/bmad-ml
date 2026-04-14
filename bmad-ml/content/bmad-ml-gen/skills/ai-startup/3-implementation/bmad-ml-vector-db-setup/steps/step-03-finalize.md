# Step 03 - Finalize

1. Load test embeddings and verify retrieval quality:
   - Insert a representative set of test embeddings (from the embedding pipeline or synthetic)
   - Run test queries with known relevant documents and verify they rank in top-K
   - Test filtered queries: confirm metadata filters correctly narrow results
   - Test edge cases: empty results, maximum K, filter with no matches
   - Report retrieval accuracy on test query set (precision@K, recall@K)

2. Benchmark query latency:
   - Run latency benchmarks with varying K values (1, 5, 10, 50)
   - Run latency benchmarks with and without metadata filters
   - Run latency benchmarks at varying index sizes (current, projected 3-month, projected 12-month)
   - Report p50, p95, p99 latency for each scenario
   - Compare against target latency requirements from Step 01

3. Document the operational runbook:
   - Connection configuration (endpoint, authentication, connection pooling settings)
   - Index management procedures (create, resize, rebuild, delete)
   - Backup and restore procedures (step-by-step with estimated duration)
   - Scaling procedures (add replicas, increase capacity, migrate to larger tier)
   - Troubleshooting guide (common errors, connection issues, slow queries, index corruption)
   - Monitoring dashboard locations and alert escalation contacts

4. Present results to the user:
   - Vector DB configuration summary (provider, index settings, metadata schema)
   - Retrieval quality metrics (precision@K, recall@K on test set)
   - Latency benchmark results vs. targets
   - Operational runbook summary
   - Cost projection (current and projected at scale)
   - Known limitations and scaling recommendations

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
