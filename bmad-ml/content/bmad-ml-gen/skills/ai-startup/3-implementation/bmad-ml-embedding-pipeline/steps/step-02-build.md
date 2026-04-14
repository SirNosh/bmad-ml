# Step 02 - Build

1. Implement document loading and preprocessing:
   - Build document loaders per data source type (file system, API, database)
   - Implement text extraction from supported formats (delegate to doc-processing pipeline if available)
   - Implement content normalization: strip boilerplate, normalize whitespace, handle Unicode
   - Add document-level metadata extraction (source, title, date, section hierarchy)
   - Implement deduplication check (content hash to avoid re-embedding identical documents)

2. Implement chunking logic per `rag-design.md`:
   - Build the configured chunking method (fixed-size, recursive, semantic, section-aware)
   - Apply chunk size and overlap settings from the design spec
   - Preserve metadata inheritance: each chunk carries parent document metadata plus chunk-specific metadata (chunk index, section header)
   - Handle edge cases: documents smaller than chunk size, extremely long single sections, tables and lists
   - Add chunk validation: reject chunks that are too short (below minimum threshold) or empty

3. Implement embedding generation:
   - Build embedding client with provider abstraction (API-based or local model)
   - Implement batch processing with configurable batch size
   - Implement rate limiting: respect provider limits, add backoff and retry on 429 responses
   - Add request queuing for parallel processing with concurrency control
   - Implement checkpoint/resume: track which documents have been embedded, skip on restart
   - Log token usage and cost per batch for monitoring

4. Implement quality validation:
   - Verify embedding dimensionality matches expected model output
   - Detect null or zero vectors (indicates failed embedding)
   - Detect anomalous vectors (NaN values, extreme magnitudes)
   - Run spot-check similarity tests: verify semantically similar chunks have high cosine similarity
   - Log quality metrics per batch (success rate, anomaly count)

5. Implement incremental update logic:
   - Detect new, modified, and deleted source documents (using content hash or modification timestamp)
   - Process only changed documents (avoid re-embedding entire corpus)
   - Handle document updates: delete old chunk embeddings, generate and store new ones
   - Handle document deletions: remove corresponding embeddings from vector store
   - Maintain a processing manifest tracking document-to-chunk-to-embedding mapping

6. Add monitoring for embedding drift:
   - Track average embedding magnitude and variance over time
   - Track distribution of cosine similarities for known-similar pairs
   - Alert if embedding characteristics shift significantly (may indicate model update or data quality change)
   - Log pipeline throughput metrics (documents/hour, chunks/hour, cost/hour)

Continue to ./step-03-finalize.md.
