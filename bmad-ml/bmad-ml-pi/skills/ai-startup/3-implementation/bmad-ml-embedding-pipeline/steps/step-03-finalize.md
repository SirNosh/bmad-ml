# Step 03 - Finalize

1. Run the pipeline on test data:
   - Process a representative sample of documents from each source type
   - Report pipeline metrics: documents processed, chunks generated, embeddings created, errors encountered
   - Report processing time and throughput (documents/minute, tokens/minute)
   - Report cost for the test run and extrapolate full corpus cost

2. Validate embedding quality:
   - Run similarity sanity checks: query with known questions, verify relevant chunks rank highly
   - Verify chunking quality: sample 20 chunks and confirm they contain coherent, complete information
   - Verify metadata correctness: confirm chunk metadata traces back to correct source document
   - Compare embedding similarity distributions: similar documents should cluster, dissimilar should separate
   - Report quality metrics summary (retrieval precision on test queries, chunk coherence score)

3. Document operational procedures:
   - How to run the full pipeline (initial load)
   - How to run incremental updates (scheduled and on-demand)
   - How to monitor pipeline health and embedding quality
   - How to handle failures (resume from checkpoint, reprocess specific documents)
   - Configuration reference (all parameters with descriptions and defaults)

4. Present results to the user:
   - Pipeline architecture summary (data flow from source to vector store)
   - Test run results with quality metrics
   - Cost projection for full corpus initial load and ongoing updates
   - Operational runbook summary
   - Known limitations and recommended improvements

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
