# Step 01 - Initialize

1. Load `{planning_artifacts}/rag-design.md` and extract vector database requirements:
   - Selected vector database (Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector)
   - Collection/index schema: embedding dimensions, distance metric (cosine, dot product, L2)
   - Metadata fields to index for filtering (source, date, category, document_id)
   - Expected data volume (total vectors, growth rate)
   - Query patterns (top-K retrieval, filtered search, hybrid search)
2. Confirm vector DB choice and access:
   - Managed service: account provisioned, API key available, region selected
   - Self-hosted: infrastructure provisioned (compute, memory, storage), deployment method confirmed (Docker, K8s)
   - Client SDK version pinned and compatible with embedding pipeline output
3. Define index requirements:
   - Embedding dimensions (must match embedding model output exactly)
   - Distance metric (cosine similarity for normalized embeddings, dot product for unnormalized)
   - Index type if configurable (HNSW, IVF, flat) with parameters (ef_construction, M, nprobe)
   - Filtering requirements: which metadata fields need filterable indexes
4. Define performance requirements:
   - Target query latency (p50, p95, p99)
   - Target throughput (queries per second)
   - Availability requirements (single node, replicated, multi-region)
5. Define data lifecycle: retention policy, archival strategy, and deletion requirements (GDPR, data expiry).

Continue to ./step-02-build.md.
