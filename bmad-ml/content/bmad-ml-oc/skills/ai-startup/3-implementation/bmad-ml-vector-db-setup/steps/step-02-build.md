# Step 02 - Build

1. Provision and configure the vector database:
   - **Managed service**: Create project/environment, configure tier and capacity, set up API authentication
   - **Self-hosted**: Deploy database instance, configure resource limits (CPU, memory, disk), set up networking and access control
   - Configure persistence settings (WAL, snapshot intervals, replication factor)
   - Set up TLS/SSL for connections if not default

2. Create indexes with appropriate settings:
   - Create primary collection/index with: embedding dimension, distance metric, HNSW parameters (or selected index type)
   - Define and apply metadata schema: field names, types, and which fields are indexed for filtering
   - Create any secondary indexes needed for metadata-only queries
   - Verify index configuration by inspecting collection info after creation

3. Implement CRUD operations:
   - **Insert/Upsert**: Batch insert embeddings with metadata, handle duplicate detection via document_id, implement upsert semantics for updates
   - **Query**: Implement top-K similarity search with configurable K, implement filtered search (metadata predicates + vector similarity), implement hybrid search if supported (sparse + dense)
   - **Update**: Update metadata without re-embedding, re-embed and update vectors for content changes
   - **Delete**: Delete by document_id (remove all chunks for a document), delete by filter (bulk cleanup), implement soft-delete if required by data lifecycle policy

4. Configure filtering and metadata search:
   - Implement filter builders for common query patterns (by source, date range, category)
   - Test filter performance with representative metadata distributions
   - Implement combined vector + metadata queries (e.g., "similar to X where source = Y and date > Z")
   - Add query validation: reject malformed filters, enforce maximum K limits

5. Implement backup and recovery procedures:
   - Configure automated snapshots on schedule (daily for managed, cron-based for self-hosted)
   - Test snapshot creation and verify snapshot integrity
   - Document and test restore procedure: restore from snapshot to new instance
   - Implement point-in-time recovery if supported by the database
   - Define backup retention policy (keep N most recent snapshots)

6. Add monitoring and health checks:
   - Implement health check endpoint: database connectivity, index status, query responsiveness
   - Configure metrics collection: query latency, query throughput, index size, memory usage
   - Set up alerting: query latency exceeds SLO, error rate spikes, disk usage approaching capacity
   - Implement connection pool monitoring and dead connection cleanup

Continue to ./step-03-finalize.md.
