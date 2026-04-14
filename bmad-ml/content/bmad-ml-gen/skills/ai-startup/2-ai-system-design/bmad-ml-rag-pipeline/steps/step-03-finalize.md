# Step 03 - Finalize

1. Validate end-to-end pipeline coherence:
   - Confirm the chunking strategy produces chunks compatible with the selected embedding model's token limit.
   - Confirm the embedding dimensionality matches the vector database index configuration.
   - Confirm the retrieval top-k and reranking pipeline fits within the LLM context window budget.
   - Confirm the generation prompt template correctly references the retrieval output format.
2. Check chunk-to-retrieval alignment:
   - Verify that metadata schema supports all planned filtering use cases.
   - Verify that the chunking method preserves enough context for the reranker to score effectively.
3. Verify evaluation plan is actionable:
   - At least one quantitative metric defined for retrieval quality.
   - At least one quantitative metric defined for answer quality.
   - Evaluation tooling or framework selected.
4. Save the completed artifact to `{planning_artifacts}/rag-design.md`.
5. Present the RAG design to the user for review. Summarize:
   - Key design choices (chunking, embedding, retrieval, reranking).
   - Cost and latency projections.
   - Open questions or areas needing experimentation.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
