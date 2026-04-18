---
artifact: evaluation-report
iteration: 1
created: 2026-04-07
last_updated: 2026-04-07
---

# AI Evaluation Report

## Evaluation Summary

> **Purpose:** Provide a concise overview of what was evaluated, when, how, and the overall verdict so stakeholders can quickly assess the state of quality.
> **Guidance:** Include the system name, evaluation date, methodology used (automated, human, or both), and an overall verdict (Pass / Conditional Pass / Fail). This section should be readable in under 30 seconds.

| Field | Value |
|---|---|
| **System evaluated** | {e.g., Aria Support Agent v1.2.0} |
| **Evaluation date** | {YYYY-MM-DD} |
| **Evaluator(s)** | {Names / Team} |
| **Methodology** | {Automated benchmarks, human evaluation, or both} |
| **Dataset(s) used** | {e.g., Golden test set v3 (200 queries), production sample (500 queries)} |
| **Overall verdict** | {PASS / CONDITIONAL PASS / FAIL} |

### Executive Summary

{Two to four sentences: What was the main finding? Did quality improve, regress, or hold steady compared to the baseline? What is the single most important action item?}

---

## Automated Evaluation Results

> **Purpose:** Report the results of automated metrics that can be computed without human judgment. These are the first line of quality defense and the fastest feedback loop.
> **Guidance:** For each metric, report the score, the baseline (prior version or target), the delta, and whether it passes the quality gate. Include the evaluation framework used (e.g., RAGAS, custom scripts, LLM-as-judge).

### Metrics Table

| Metric | Score | Baseline | Delta | Pass/Fail | Notes |
|---|---|---|---|---|---|
| {Answer correctness} | {0.87} | {0.83} | {+0.04} | {PASS (threshold: 0.80)} | {Evaluated via LLM-as-judge} |
| {Faithfulness} | {0.94} | {0.91} | {+0.03} | {PASS (threshold: 0.90)} | {RAGAS faithfulness metric} |
| {Answer relevancy} | {0.89} | {0.88} | {+0.01} | {PASS (threshold: 0.85)} | {RAGAS answer relevancy} |
| {Retrieval recall@5} | {0.82} | {0.85} | {-0.03} | {FAIL (threshold: 0.85)} | {Regression -- investigate} |
| {Latency P95} | {2.1s} | {1.9s} | {+0.2s} | {PASS (threshold: 3.0s)} | {End-to-end latency} |
| | | | | | |

### Evaluation Configuration

- **Framework:** {e.g., RAGAS v0.2, custom eval harness}
- **LLM judge model:** {e.g., GPT-4o as judge for correctness and relevancy}
- **Number of test cases:** {e.g., 200}
- **Reproducibility:** {e.g., Seed=42, deterministic retrieval, temperature=0 for judge}

---

## Human Evaluation Results

> **Purpose:** Report the results of human evaluation, which captures quality dimensions that automated metrics cannot (nuance, helpfulness, tone, trust).
> **Guidance:** Specify the number of annotators, inter-annotator agreement, rubric used, and per-dimension results. Human evaluation is expensive; document the methodology so it can be replicated.

### Methodology

- **Annotator count:** {e.g., 3}
- **Annotator qualifications:** {e.g., Domain experts with 2+ years in customer support}
- **Sample size:** {e.g., 100 query-response pairs, stratified by topic}
- **Annotation tool:** {e.g., Label Studio, Google Sheets}

### Inter-Annotator Agreement

- **Metric:** {e.g., Cohen's kappa / Krippendorff's alpha}
- **Score:** {e.g., 0.78 (substantial agreement)}

### Rubric Results

| Dimension | Scale | Mean Score | Std Dev | Target | Pass/Fail |
|---|---|---|---|---|---|
| {Accuracy} | {1-5} | {4.2} | {0.6} | {>= 4.0} | {PASS} |
| {Helpfulness} | {1-5} | {4.0} | {0.8} | {>= 3.5} | {PASS} |
| {Tone appropriateness} | {1-5} | {4.5} | {0.4} | {>= 4.0} | {PASS} |
| {Citation quality} | {1-5} | {3.8} | {0.9} | {>= 4.0} | {FAIL} |
| | | | | | |

### Qualitative Findings

{Summarize recurring themes from annotator comments. e.g., "Annotators noted that citations were sometimes too vague -- pointing to an entire document rather than a specific section. Answers were generally accurate but occasionally verbose."}

---

## Baseline Comparison

> **Purpose:** Compare the current system against prior versions, alternative implementations, or external baselines so that progress (or regression) is quantified.
> **Guidance:** Include all systems being compared, with the same metrics measured under the same conditions. Highlight statistically significant differences.

### Comparison Table

| System | Answer Correctness | Faithfulness | Retrieval Recall@5 | Latency P95 | Cost / Query |
|---|---|---|---|---|---|
| {Current (v1.2.0)} | {0.87} | {0.94} | {0.82} | {2.1s} | {$0.025} |
| {Previous (v1.1.0)} | {0.83} | {0.91} | {0.85} | {1.9s} | {$0.022} |
| {Baseline (no RAG)} | {0.61} | {N/A} | {N/A} | {1.2s} | {$0.010} |
| | | | | | |

### Key Observations

- {e.g., "Generation quality improved due to reranker addition, but retrieval recall regressed slightly -- likely due to index configuration change."}
- {e.g., "Cost increase of $0.003/query is within budget and justified by quality improvement."}

---

## Failure Analysis

> **Purpose:** Categorize and analyze failures so that remediation efforts target the highest-impact issues.
> **Guidance:** Group failures by category, count occurrences, assess severity, and provide representative examples. This section drives the improvement roadmap.

### Failure Category Table

| Category | Count | % of Total | Severity | Representative Example |
|---|---|---|---|---|
| {Incomplete answer} | {12} | {6%} | {Medium} | {Q: "How do I set up SSO?" A: Described SAML but missed OIDC option} |
| {Hallucinated fact} | {4} | {2%} | {High} | {Q: "What's the rate limit?" A: Stated 1000/min (actual: 500/min)} |
| {Wrong source cited} | {8} | {4%} | {Medium} | {Q: "Refund policy?" A: Cited pricing page instead of refund policy page} |
| {Retrieval miss} | {6} | {3%} | {High} | {Q: "How to use webhooks?" A: No relevant chunks retrieved despite docs existing} |
| | | | | |

### Root Cause Analysis

{For the top 2-3 failure categories, provide root cause analysis. e.g., "Retrieval misses are concentrated in recently added documentation (last 7 days), suggesting the ingestion pipeline has a lag issue."}

---

## Quality Gate Status

> **Purpose:** Provide a clear pass/fail decision for each quality gate so that release decisions are evidence-based.
> **Guidance:** List every quality gate, its pass criteria, the actual result, and any notes. All gates must pass for an unconditional release. If any gate fails, the system cannot be released without an exception.

### Gate Table

| Gate | Criteria | Result | Status | Notes |
|---|---|---|---|---|
| {Automated accuracy} | {Answer correctness >= 0.80} | {0.87} | {PASS} | {} |
| {Faithfulness} | {Faithfulness >= 0.90} | {0.94} | {PASS} | {} |
| {Retrieval quality} | {Recall@5 >= 0.85} | {0.82} | {FAIL} | {Regression from v1.1.0} |
| {Human eval accuracy} | {Mean >= 4.0} | {4.2} | {PASS} | {} |
| {Latency SLO} | {P95 < 3.0s} | {2.1s} | {PASS} | {} |
| {Safety audit} | {No critical findings open} | {0 critical} | {PASS} | {} |
| | | | | |

### Overall Gate Status

- **Passing gates:** {5 of 6}
- **Failing gates:** {1 -- Retrieval quality}
- **Release decision:** {CONDITIONAL PASS -- acceptable if retrieval regression root cause is identified and tracked}

---

## Recommendations

> **Purpose:** Prioritize the improvements that will have the greatest impact on quality, based on the evaluation findings.
> **Guidance:** Order recommendations by expected impact (High / Medium / Low). For each, describe the improvement, the expected impact, the effort estimate, and the owner.

### Prioritized Improvements

| Priority | Recommendation | Expected Impact | Effort | Owner |
|---|---|---|---|---|
| {1 -- High} | {Investigate and fix retrieval recall regression (likely index config)} | {Recover Recall@5 from 0.82 to 0.85+} | {1-2 days} | {RAG Lead} |
| {2 -- High} | {Add section-level citation granularity to reduce vague citations} | {Improve citation quality score from 3.8 to 4.0+} | {3-5 days} | {Generation Lead} |
| {3 -- Medium} | {Add hallucination detection for numerical claims (rate limits, pricing)} | {Reduce hallucinated facts from 2% to < 0.5%} | {1 week} | {Safety Lead} |
| {4 -- Low} | {Reduce response verbosity for simple factual questions} | {Improve helpfulness score; reduce latency} | {2-3 days} | {Prompt Engineer} |
| | | | | |

### Next Evaluation Cycle

- **Planned date:** {YYYY-MM-DD}
- **Focus areas:** {Retrieval regression fix verification, citation quality re-evaluation}
- **Test set updates:** {Add 20 new test cases for recently added documentation}
