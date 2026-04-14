---
artifact: rag-design
iteration: 1
created: 2026-04-07
last_updated: 2026-04-07
---

# RAG Pipeline Design

## Source Inventory and Access Rules

> **Purpose:** Catalog every data source the RAG pipeline will ingest. Missing or poorly characterized sources are the root cause of incomplete retrieval and stale answers.
> **Guidance:** For each source, specify the name, data type, access method, estimated volume, update frequency, and authentication requirements. Flag any source that contains PII or requires special legal/compliance handling.

### Source Table

| Source Name | Data Type | Access Method | Volume (est.) | Update Frequency | Auth Required | PII Present? |
|---|---|---|---|---|---|---|
| {e.g., Product documentation} | {Markdown files} | {Git clone} | {500 files, ~2MB} | {Weekly} | {SSH key} | {No} |
| {e.g., Customer support tickets} | {Structured JSON} | {REST API} | {100K records} | {Daily} | {OAuth 2.0} | {Yes -- names, emails} |
| | | | | | | |

### Access Rules and Restrictions

- **PII sources:** {How PII is handled during ingestion -- redaction, masking, or exclusion}
- **Access control:** {Who/what can trigger ingestion; IP allowlists, service accounts}
- **Legal review required:** {List any sources needing legal sign-off before ingestion}

---

## Chunking and Metadata Strategy

> **Purpose:** Define how raw documents are split into retrieval units and what metadata is attached. Chunking quality directly determines retrieval quality -- too large and relevance drops, too small and context is lost.
> **Guidance:** Choose a strategy type, define chunk size and overlap, specify separators, and define the metadata schema. Include format-specific rules for different document types (Markdown, PDF, HTML, code).

### Strategy Configuration

- **Strategy type:** {e.g., Recursive character splitting / Semantic splitting / Sentence-based / Custom}
- **Chunk size:** {e.g., 512 tokens}
- **Chunk overlap:** {e.g., 64 tokens}
- **Separators (in priority order):** {e.g., \n\n, \n, ". ", " "}

### Metadata Schema

| Metadata Field | Type | Source | Purpose |
|---|---|---|---|
| {source_id} | {string} | {Filename or record ID} | {Provenance tracking} |
| {title} | {string} | {Document title / H1 header} | {Display in citations} |
| {section_path} | {string} | {Header hierarchy: H1 > H2 > H3} | {Hierarchical filtering} |
| {created_at} | {datetime} | {File metadata / API response} | {Freshness filtering} |
| {content_type} | {enum} | {Derived from file extension} | {Format-specific retrieval rules} |
| | | | |

### Format-Specific Rules

| Format | Special Handling |
|---|---|
| {Markdown} | {Split on ## headers; preserve code blocks as atomic chunks} |
| {PDF} | {Use layout-aware parser; skip headers/footers; extract tables as separate chunks} |
| {HTML} | {Strip boilerplate (nav, footer); chunk on semantic tags (article, section)} |
| {Code files} | {Split on function/class boundaries; include docstrings as metadata} |
| | |

---

## Embedding Model and Index Plan

> **Purpose:** Select the embedding model and vector database configuration. This determines retrieval speed, accuracy, and cost.
> **Guidance:** Compare at least two embedding models on dimensions, cost, and latency. Choose a vector DB and configure the index type, distance metric, and filtering capabilities.

### Model Comparison

| Model | Provider | Dimensions | Cost / 1M tokens | Latency (est.) | Notes |
|---|---|---|---|---|---|
| {text-embedding-3-small} | {OpenAI} | {1536} | {$0.02} | {~50ms} | {Good quality-cost ratio} |
| {text-embedding-3-large} | {OpenAI} | {3072} | {$0.13} | {~80ms} | {Higher quality, 6x cost} |
| {BAAI/bge-large-en-v1.5} | {Self-hosted} | {1024} | {Compute only} | {~30ms} | {No vendor dependency} |
| | | | | | |

### Selected Model

- **Model:** {e.g., text-embedding-3-small}
- **Justification:** {e.g., Best quality-cost tradeoff for our document types; latency within budget}

### Index Configuration

| Parameter | Value | Rationale |
|---|---|---|
| **Vector database** | {e.g., Qdrant / Pinecone / pgvector} | {e.g., Managed, scales to our volume, supports metadata filtering} |
| **Distance metric** | {e.g., Cosine / Dot product / Euclidean} | {e.g., Cosine is standard for normalized embeddings} |
| **Index type** | {e.g., HNSW} | {e.g., Best recall-speed tradeoff for our volume} |
| **HNSW ef_construction** | {e.g., 128} | {e.g., Higher build cost, better recall} |
| **HNSW M** | {e.g., 16} | {e.g., Default; tunable if recall < target} |
| **Metadata filtering** | {e.g., source_id, content_type, created_at} | {e.g., Filter by source before vector search} |

---

## Retrieval and Reranking Strategy

> **Purpose:** Define how the system finds the most relevant chunks for a given query. Retrieval quality is the single largest lever for RAG answer quality.
> **Guidance:** Specify the retrieval method (dense, sparse, or hybrid), top-k configuration, reranking model, and score thresholds. Address how queries are preprocessed (expansion, reformulation).

### Query Preprocessing

- **Query expansion:** {e.g., HyDE -- generate hypothetical answer, embed that}
- **Query reformulation:** {e.g., LLM rewrites ambiguous queries before retrieval}
- **Multi-query:** {e.g., Generate 3 query variants, merge results}

### Retrieval Method

- **Type:** {Dense only / Sparse only / Hybrid (dense + sparse)}
- **Dense retrieval:** {e.g., Vector similarity search with cosine distance}
- **Sparse retrieval:** {e.g., BM25 on full-text index}
- **Hybrid fusion:** {e.g., Reciprocal Rank Fusion (RRF) with k=60}

### Top-K Configuration

- **Initial retrieval:** {e.g., top-k = 20}
- **After reranking:** {e.g., top-k = 5}
- **Minimum score threshold:** {e.g., Reranker score > 0.3 or exclude}

### Reranking

- **Model:** {e.g., Cohere rerank-v3 / cross-encoder/ms-marco-MiniLM-L-12-v2 / None}
- **Cost per rerank call:** {e.g., $0.002 per 1K chunks}
- **Latency budget:** {e.g., < 200ms for reranking step}

### Score Thresholds and Fallbacks

| Condition | Action |
|---|---|
| {All chunks below minimum score} | {Return "no relevant information found" instead of hallucinating} |
| {Only 1-2 chunks above threshold} | {Proceed but flag low-confidence in response metadata} |
| {Retrieval timeout > 3s} | {Return cached results if available, else degrade gracefully} |

---

## Generation and Citation Policy

> **Purpose:** Define how retrieved chunks are assembled into a prompt, how the model is instructed to generate, and how citations are surfaced. This section prevents hallucinations and builds user trust.
> **Guidance:** Specify context window management, citation format, hallucination controls, and confidence thresholds. Include the generation prompt template or reference it.

### Context Window Management

- **Max context tokens allocated to retrieved chunks:** {e.g., 4,000 of 8,000 total}
- **Chunk ordering in context:** {e.g., Most relevant first / Chronological / Grouped by source}
- **Truncation strategy:** {e.g., Drop lowest-scored chunks if total exceeds budget}

### Citation Format

- **Inline citations:** {e.g., [1], [2] after each claim}
- **Citation block:** {e.g., Numbered list of sources with title, URL, and relevant excerpt at end of response}
- **Unsupported claims:** {e.g., Model must prefix with "Based on my general knowledge..." if no source supports a claim}

### Hallucination Controls

- **Instruction in system prompt:** {e.g., "Only answer based on the provided context. If the context does not contain the answer, say 'I don't have information about that.'"}
- **Post-generation verification:** {e.g., Check that each cited source actually contains the claimed information}
- **Confidence signal:** {e.g., Model outputs a confidence: high/medium/low field; low-confidence triggers human review}

### Confidence Thresholds

| Confidence Level | Retrieval Score Range | Generation Behavior |
|---|---|---|
| {High} | {Reranker > 0.7} | {Answer with citations, no disclaimer} |
| {Medium} | {Reranker 0.3 - 0.7} | {Answer with citations + "This may not be complete" disclaimer} |
| {Low} | {Reranker < 0.3 or no results} | {Refuse to answer; suggest user rephrase or escalate} |

---

## Evaluation Metrics and Test Cases

> **Purpose:** Define how retrieval and generation quality are measured, and maintain a test case inventory for regression testing.
> **Guidance:** Cover both retrieval metrics (recall, precision at k) and generation metrics (answer quality, faithfulness). Build a test case inventory with known-good query-answer pairs.

### Retrieval Metrics

| Metric | Definition | Target | Measurement Tool |
|---|---|---|---|
| {Recall@5} | {Fraction of relevant chunks in top 5 results} | {> 0.85} | {RAGAS / custom eval script} |
| {Precision@5} | {Fraction of top 5 results that are relevant} | {> 0.70} | {RAGAS / custom eval script} |
| {MRR} | {Mean Reciprocal Rank of first relevant result} | {> 0.80} | {Custom eval script} |
| | | | |

### Generation Metrics

| Metric | Definition | Target | Measurement Tool |
|---|---|---|---|
| {Answer correctness} | {Human-judged accuracy on 1-5 scale} | {> 4.0 average} | {Human eval, n=100} |
| {Faithfulness} | {Fraction of claims supported by cited sources} | {> 0.95} | {RAGAS faithfulness metric} |
| {Answer relevance} | {Does the answer address the question asked?} | {> 0.90} | {RAGAS answer relevancy} |
| | | | |

### Test Case Inventory

| Test ID | Query | Expected Answer (summary) | Expected Sources | Pass Criteria |
|---|---|---|---|---|
| {TC-001} | {e.g., "What is the refund policy?"} | {e.g., "30-day full refund..."} | {refund-policy.md} | {Correct answer, cites refund-policy.md} |
| {TC-002} | {e.g., "How do I integrate with Slack?"} | {e.g., "Use the /connect slash command..."} | {integrations/slack.md} | {Step-by-step instructions present} |
| | | | | |

---

## Operational Refresh and Drift Handling

> **Purpose:** Define how the RAG pipeline stays current as source documents change, and how embedding drift is detected and corrected.
> **Guidance:** Specify the refresh schedule, whether updates are incremental or full rebuilds, and how you detect that embedding quality has degraded over time.

### Refresh Schedule

- **Frequency:** {e.g., Daily at 02:00 UTC / On document commit / Manual trigger}
- **Trigger:** {e.g., Cron job / Git webhook / API call}
- **SLA for freshness:** {e.g., New documents searchable within 4 hours of publication}

### Incremental vs. Full Rebuild

- **Default mode:** {e.g., Incremental -- only process new/modified documents}
- **Full rebuild trigger:** {e.g., Embedding model change, schema migration, or quarterly maintenance}
- **Incremental detection:** {e.g., Compare document hashes; re-embed if hash changed}

### Embedding Drift Detection

- **Method:** {e.g., Weekly evaluation of retrieval metrics against golden test set}
- **Drift threshold:** {e.g., If Recall@5 drops below 0.80, trigger investigation}
- **Response to drift:** {e.g., Re-embed all documents with current model; if metrics still degraded, evaluate new embedding model}

### Monitoring

| Metric | Alert Threshold | Action |
|---|---|---|
| {Ingestion pipeline failures} | {> 0 in 24h} | {Page data engineering on-call} |
| {Index size growth rate} | {> 20% month-over-month unexpected} | {Investigate duplicate ingestion} |
| {Retrieval latency P95} | {> 500ms} | {Scale vector DB or optimize index} |
| | | |
