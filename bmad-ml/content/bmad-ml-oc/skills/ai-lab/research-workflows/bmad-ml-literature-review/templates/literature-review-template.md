---
artifact: literature-review
iteration: 1
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
iteration_history:
  - iteration: 1
    date: YYYY-MM-DD
    trigger: "Initial creation"
    summary: "Initial taxonomy and paper set"
---

# Literature Review

## Research Question

> **Purpose:** Define the precise research question driving this review so that the search, taxonomy, and synthesis are focused.
> **Guidance:** Frame the question using PICO or similar structure: Population/Problem, Intervention/Approach, Comparison, Outcome. State what the review aims to answer, not what the project aims to build.

**Primary Question:** {e.g., "What methods achieve state-of-the-art performance on low-resource text classification, and under what conditions do they outperform fine-tuning?"}

**Sub-Questions:**

1. {e.g., "Which data augmentation strategies are most effective for datasets under 1K samples?"}
2. {e.g., "How do prompt-based methods compare to fine-tuning in few-shot regimes?"}
3. {e.g., "What are the computational trade-offs of the leading approaches?"}

---

## Methodology

> **Purpose:** Document the search and selection process so the review is reproducible and its scope is transparent.
> **Guidance:** Specify where you searched, what terms you used, how you filtered, and when the search was conducted. This section ensures the review is systematic rather than ad-hoc.

### Search Strategy

| Field | Value |
|-------|-------|
| **Databases / Sources** | {e.g., Semantic Scholar, arXiv, Google Scholar, ACL Anthology} |
| **Search Terms** | {e.g., "few-shot text classification", "data augmentation NLP", "prompt tuning"} |
| **Date Range** | {e.g., 2020 -- present} |
| **Search Date** | {date the search was conducted} |

### Inclusion Criteria

- {e.g., Peer-reviewed or high-impact preprint (>50 citations or top venue)}
- {e.g., Reports quantitative results on a standard benchmark}
- {e.g., Method is reproducible (code available or sufficient detail)}

### Exclusion Criteria

- {e.g., Non-English papers}
- {e.g., Survey/meta-analysis papers (used for references only)}
- {e.g., Domain-specific papers outside scope (e.g., biomedical-only)}

### Selection Summary

| Stage | Count |
|-------|-------|
| Initial search results | {n} |
| After title/abstract screening | {n} |
| After full-text review | {n} |
| Final included papers | {n} |

---

## Taxonomy

> **Purpose:** Organize the approaches found in the literature into a structured hierarchy so that patterns and gaps become visible.
> **Guidance:** Create nested categories that reflect the major methodological families. Each leaf should map to one or more papers from the summaries section.

### Category 1: {e.g., Fine-Tuning Approaches}

- **1a: {Sub-category}** -- {brief description, e.g., "Full fine-tuning of pretrained transformers"}
- **1b: {Sub-category}** -- {brief description, e.g., "Parameter-efficient fine-tuning (LoRA, adapters, prefix tuning)"}

### Category 2: {e.g., Data Augmentation Methods}

- **2a: {Sub-category}** -- {brief description}
- **2b: {Sub-category}** -- {brief description}

### Category 3: {e.g., Prompt-Based Methods}

- **3a: {Sub-category}** -- {brief description}
- **3b: {Sub-category}** -- {brief description}

### Taxonomy Diagram

{Optional: a text-based or linked diagram showing the relationship between categories.}

---

## Paper Summaries

> **Purpose:** Capture the essential information from each paper in a standardized format for efficient comparison.
> **Guidance:** One entry per paper. Focus on what is novel, what results were achieved, and how it relates to the research question. Assign each paper to one or more taxonomy categories.

### {Paper 1 Short Title}

| Field | Value |
|-------|-------|
| **Title** | {full title} |
| **Authors** | {author list} |
| **Year** | {year} |
| **Venue** | {conference/journal} |
| **URL / DOI** | {link} |
| **Taxonomy Category** | {e.g., 1b, 3a} |

- **Key Contribution:** {One sentence: what is new or important about this paper?}
- **Method:** {2-3 sentences: how does it work at a high level?}
- **Key Results:** {Benchmark, metric, and value. e.g., "SST-2 accuracy: 93.2% with 100 labeled examples."}
- **Limitations:** {What are the weaknesses or scope restrictions?}
- **Relevance to Our Work:** {How does this paper inform our experiment design?}

---

### {Paper 2 Short Title}

| Field | Value |
|-------|-------|
| **Title** | {full title} |
| **Authors** | {author list} |
| **Year** | {year} |
| **Venue** | {conference/journal} |
| **URL / DOI** | {link} |
| **Taxonomy Category** | {category IDs} |

- **Key Contribution:** {summary}
- **Method:** {summary}
- **Key Results:** {summary}
- **Limitations:** {summary}
- **Relevance to Our Work:** {summary}

{Repeat this block for each additional paper.}

---

## Benchmarks and Datasets

> **Purpose:** Catalog the evaluation benchmarks used across the reviewed papers so that experimental design can target comparable evaluations.
> **Guidance:** List commonly used datasets and note which papers use them. Highlight any dataset that is a candidate for the project's own evaluation.

| Dataset | Task | Size | Papers Using It | Notes |
|---------|------|------|----------------|-------|
| {name} | {task type} | {train/test counts} | {paper short titles} | {relevant notes} |
| {name} | {task type} | {train/test counts} | {paper short titles} | {relevant notes} |

---

## Research Landscape Map

> **Purpose:** Identify who is working on what and where the field is heading so the team can position its work effectively.
> **Guidance:** Summarize the major research groups, trending directions, and recent shifts in the field.

### Active Research Groups

| Group / Lab | Affiliation | Focus Area | Notable Contributions |
|------------|------------|-----------|----------------------|
| {name} | {university/company} | {area} | {key papers} |
| {name} | {university/company} | {area} | {key papers} |

### Trending Directions

1. {Trend 1: e.g., "Shift from full fine-tuning to parameter-efficient methods"}
2. {Trend 2: e.g., "Increasing use of synthetic data augmentation via LLMs"}
3. {Trend 3: e.g., "Focus on evaluation robustness and out-of-distribution generalization"}

---

## Open Gaps and Opportunities

> **Purpose:** Identify what the literature does NOT cover so that the project can target underexplored but promising directions.
> **Guidance:** Gaps can be methodological (no one has tried X), empirical (no one has evaluated on Y), or practical (no one has deployed Z). Each gap is a potential experiment direction.

| Gap | Category | Opportunity | Confidence |
|-----|----------|------------|-----------|
| {e.g., No comparison of PEFT methods on domain-specific data} | Empirical | {e.g., Run LoRA vs adapter vs prefix on our domain} | {high/medium/low} |
| {e.g., Augmentation + prompt tuning not combined} | Methodological | {e.g., Test combined approach as an experiment arm} | {high/medium/low} |
| {e.g., Latency not reported for PEFT methods} | Practical | {e.g., Profile inference latency as secondary metric} | {high/medium/low} |

---

## Key Takeaways

> **Purpose:** Distill the review into the top findings that directly inform experiment design and architecture decisions.
> **Guidance:** Limit to 3-5 findings. Each should be actionable -- it should suggest something to try, avoid, or measure.

1. **{Takeaway 1}:** {e.g., "LoRA achieves within 1% of full fine-tuning at 10x lower parameter cost -- strong candidate for our resource-constrained setting."}
2. **{Takeaway 2}:** {e.g., "Back-translation augmentation consistently improves low-resource classification by 2-5 points -- include as an experiment arm."}
3. **{Takeaway 3}:** {e.g., "Prompt-based methods are sensitive to verbalizer choice -- requires careful tuning if pursued."}
4. **{Takeaway 4}:** {actionable finding}
5. **{Takeaway 5}:** {actionable finding}

---

## Recommendations

> **Purpose:** Translate the review into specific recommendations for the experiment design phase.
> **Guidance:** Prioritize recommendations by expected impact and feasibility.

| Priority | Recommendation | Rationale | Maps to Takeaway |
|----------|---------------|-----------|-----------------|
| 1 | {recommendation} | {why} | {takeaway #} |
| 2 | {recommendation} | {why} | {takeaway #} |
| 3 | {recommendation} | {why} | {takeaway #} |
