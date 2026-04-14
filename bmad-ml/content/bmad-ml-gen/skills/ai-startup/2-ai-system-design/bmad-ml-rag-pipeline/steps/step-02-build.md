# Step 02 - Build

Produce `{planning_artifacts}/rag-design.md` with the following sections. Justify every design choice with rationale.

## 2.1 Source Document Inventory
- List all document sources with type, format, estimated volume, and update frequency.
- Identify any sources requiring special parsing (tables, images, code blocks, scanned PDFs).
- Note access control or sensitivity constraints per source.

## 2.2 Chunking Strategy
- **Chunking method:** fixed-size, sentence-based, semantic, recursive character, parent-child, or document-structure-aware.
- **Chunk size and overlap:** specify target token count and overlap ratio with justification.
- **Metadata schema:** define metadata attached to each chunk (source, page, section, timestamp, access control tags).
- **Special handling:** how tables, code blocks, and images are chunked or referenced.

## 2.3 Embedding Model Selection
- Compare at least 2-3 embedding models (e.g., OpenAI text-embedding-3-large, Cohere embed-v3, BGE-M3, or a domain-specific model).
- Selection criteria: dimensionality, multilingual support, cost per 1K tokens, benchmark performance on similar domains.
- Define whether fine-tuning the embedding model is planned.

## 2.4 Index Design
- **Vector database choice:** select and justify (Pinecone, Weaviate, Qdrant, Milvus, pgvector, ChromaDB, etc.).
- **Index type:** HNSW, IVF, flat, or hybrid.
- **Filtering strategy:** metadata filters applied before or after ANN search.
- **Scaling plan:** shard strategy, replication, and estimated index size.

## 2.5 Retrieval Strategy
- **Top-k selection:** define k value and retrieval method.
- **Hybrid search:** whether to combine dense retrieval with sparse/keyword search (BM25). Define fusion method (RRF, weighted).
- **Reranking model:** select reranker (Cohere Rerank, cross-encoder, ColBERT) and define reranking top-n.
- **Multi-query / query expansion:** whether to reformulate or expand queries before retrieval.

## 2.6 Generation Policy
- **Context window management:** how retrieved chunks are assembled within the LLM context window. Define max context tokens allocated to retrieval.
- **Citation format:** how the LLM should cite sources in its response (inline references, footnotes, source list).
- **Hallucination controls:** grounding instructions, confidence thresholds, "I don't know" policy when retrieval is insufficient.
- **Prompt template:** define the RAG prompt structure (system instruction, retrieved context block, user query).

## 2.7 Evaluation Metrics
- **Retrieval quality:** Recall@k, MRR, NDCG.
- **Answer quality:** faithfulness (grounded in retrieved context), relevance, completeness.
- **Latency:** end-to-end p50/p95/p99 targets.
- **Evaluation tooling:** plan for automated eval (RAGAS, custom eval harness) and human review cadence.

Continue to ./step-03-finalize.md.
