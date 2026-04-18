# Step 01 - Initialize

1. Load `{planning_artifacts}/rag-design.md` and extract:
   - Embedding model selection (model name, dimensions, max input tokens)
   - Chunking strategy (method, chunk size, overlap, section-aware splitting rules)
   - Document types and preprocessing requirements
   - Quality requirements (similarity thresholds, retrieval benchmarks)
2. Load `{planning_artifacts}/data-integration.md` and extract:
   - Data source inventory (file systems, APIs, databases, web crawlers)
   - Update frequency requirements (real-time, batch, on-demand)
   - Data volume estimates (total documents, growth rate)
3. Confirm embedding model choice and access:
   - Model provider (OpenAI, Cohere, HuggingFace, local model)
   - API key or local model path verified and accessible
   - Rate limits and pricing understood (tokens/minute, cost/1K tokens)
   - Embedding dimensions confirmed (e.g., 1536 for text-embedding-3-small, 768 for sentence-transformers)
4. Define batch processing requirements:
   - Batch size for API calls (balance throughput vs rate limits)
   - Parallelism level (concurrent API requests or GPU batch size)
   - Checkpoint and resume strategy for large corpus processing
   - Estimated total processing time for initial load and incremental updates
5. Define the output contract: embedding format, metadata schema, storage destination (vector DB collection, file format).

Continue to ./step-02-build.md.
