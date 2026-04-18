---
artifact: results-report
iteration: 1
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
experiment_design_ref: ""
iteration_history:
  - iteration: 1
    date: YYYY-MM-DD
    trigger: "Initial results"
    summary: ""
---

# Results Report

## Executive Summary

> **Purpose:** Provide a concise, standalone summary so stakeholders can grasp the outcome without reading the full report.
> **Guidance:** State the hypothesis, whether it was supported or rejected, the headline metric result, and the recommended next action -- all in 3-5 sentences.

**Hypothesis:** {Restate the primary hypothesis from the experiment design.}

**Outcome:** {Supported / Rejected / Inconclusive}

**Headline Result:** {Primary metric: value +/- CI, compared to baseline: value.}

**Recommendation:** {Iterate / Pivot / Proceed to deployment / Needs further investigation.}

---

## Experiment Configuration

> **Purpose:** Link this report to the exact experiment setup for traceability and reproducibility.
> **Guidance:** Reference the experiment design document and provide enough detail to locate or reproduce the runs.

| Field | Value |
|-------|-------|
| **Experiment Design** | {link to experiment-design.md} |
| **Model ADR** | {link to model-adr.md} |
| **Training Config** | {link to training-config.yaml} |
| **Run IDs** | {list of tracker run IDs, e.g., wandb run URLs} |
| **Hardware Used** | {GPU type x count, total GPU-hours consumed} |
| **Date Range** | {start -- end of experiment runs} |
| **Code Version** | {git commit SHA or tag} |

---

## Primary Results

> **Purpose:** Present the main experimental results with statistical rigor so the hypothesis can be formally evaluated.
> **Guidance:** Report mean, standard deviation, and confidence intervals across seeds/runs. Bold the best result. Highlight whether the success threshold from the experiment design was met.

### Metric Table

| Condition | N Runs | {Primary Metric} Mean | Std | 95% CI | Threshold Met? |
|-----------|--------|----------------------|-----|--------|----------------|
| Baseline  | {n}    | {value} | {value} | [{lo}, {hi}] | {yes/no} |
| Arm-1     | {n}    | {value} | {value} | [{lo}, {hi}] | {yes/no} |
| Arm-2     | {n}    | {value} | {value} | [{lo}, {hi}] | {yes/no} |

### Training Curves

{Describe or link to training/validation loss and metric curves. Note convergence speed, stability, and any anomalies.}

---

## Statistical Analysis

> **Purpose:** Determine whether observed differences are statistically significant and practically meaningful.
> **Guidance:** Use the statistical test specified in the experiment design. Report p-values, effect sizes, and confidence intervals. State whether the null hypothesis is rejected.

### Pairwise Comparisons

| Comparison | Test Used | p-value | Effect Size | 95% CI of Difference | Significant? |
|-----------|-----------|---------|-------------|----------------------|-------------|
| Arm-1 vs Baseline | {e.g., paired t-test} | {value} | {Cohen's d or similar} | [{lo}, {hi}] | {yes/no at alpha=0.05} |
| Arm-2 vs Baseline | {test} | {value} | {effect size} | [{lo}, {hi}] | {yes/no} |
| Arm-1 vs Arm-2    | {test} | {value} | {effect size} | [{lo}, {hi}] | {yes/no} |

### Multiple Comparisons Correction

{If more than one comparison was made, state the correction method (e.g., Bonferroni, Holm-Bonferroni) and adjusted alpha.}

### Hypothesis Verdict

- **H0 (null):** {Rejected / Failed to reject}
- **H1 (alternative):** {Supported / Not supported}
- **Practical Significance:** {Is the effect size large enough to matter in practice?}

---

## Ablation Results

> **Purpose:** Isolate the contribution of individual components to understand which design choices drive performance.
> **Guidance:** Each row removes or modifies one component from the best-performing arm. Report the delta from the full model.

| Ablation | Component Removed/Changed | {Primary Metric} | Delta from Full | Interpretation |
|----------|--------------------------|-------------------|----------------|----------------|
| Full model | None | {value} | -- | Reference |
| {ablation-1} | {e.g., removed augmentation} | {value} | {-0.03} | {augmentation contributes +3 points} |
| {ablation-2} | {e.g., reduced hidden dim} | {value} | {-0.01} | {minimal impact from dimension reduction} |
| {ablation-3} | {e.g., no warmup} | {value} | {-0.05} | {warmup is critical for stability} |

---

## Failure Analysis

> **Purpose:** Understand where and why the model fails so that future iterations can target weaknesses.
> **Guidance:** Categorize errors by type. Provide concrete examples. Quantify the frequency of each category.

### Error Distribution

| Error Category | Count | Percentage | Description |
|---------------|-------|-----------|-------------|
| {e.g., label confusion A<->B} | {n} | {%} | {classes A and B are frequently confused} |
| {e.g., long-tail miss} | {n} | {%} | {rare classes underperformed} |
| {e.g., noisy input} | {n} | {%} | {failures correlated with input quality} |

### Representative Failure Examples

| Example ID | Input Summary | Predicted | Actual | Likely Cause |
|-----------|--------------|-----------|--------|-------------|
| {id} | {brief description} | {pred} | {true} | {analysis} |
| {id} | {brief description} | {pred} | {true} | {analysis} |

### Failure Patterns

{Describe systematic patterns: are failures concentrated in specific data subgroups, input lengths, domains, or conditions?}

---

## Cross-Iteration Comparison

> **Purpose:** Track progress across experiment iterations to show trajectory and inform go/no-go decisions.
> **Guidance:** Include results from all prior iterations. If this is the first iteration, note that and leave a single baseline row.

| Iteration | Date | Architecture | Key Change | {Primary Metric} | Notes |
|-----------|------|-------------|-----------|-------------------|-------|
| 1 | {date} | {arch} | Baseline | {value} | {notes} |
| {n} | {date} | {arch} | {change} | {value} | {notes} |

### Trend Analysis

{Is performance improving across iterations? Are there diminishing returns? Is the approach converging on a solution?}

---

## Conclusions

> **Purpose:** Synthesize findings into clear, actionable conclusions tied back to the hypothesis.
> **Guidance:** State whether the hypothesis was supported, what was learned, and what the limitations of this experiment are.

### Hypothesis Assessment

{Was the hypothesis supported, rejected, or inconclusive? Summarize the evidence.}

### Key Insights

1. {Insight 1: What was the most important finding?}
2. {Insight 2: What surprised you or contradicted expectations?}
3. {Insight 3: What did the ablations or failure analysis reveal?}

### Limitations

- {Limitation 1: e.g., small number of seeds limits statistical power}
- {Limitation 2: e.g., evaluation only on English data}
- {Limitation 3: e.g., hyperparameters not fully tuned}

---

## Next Steps

> **Purpose:** Translate conclusions into concrete actions for the next iteration or phase.
> **Guidance:** Recommend one of: iterate (run another experiment cycle), pivot (change approach fundamentally), or proceed (move to deployment/productionization).

### Recommendation

**Action:** {Iterate / Pivot / Proceed}

### Proposed Next Actions

| Priority | Action | Rationale | Estimated Effort |
|----------|--------|-----------|-----------------|
| 1 | {action} | {why} | {time/cost estimate} |
| 2 | {action} | {why} | {time/cost estimate} |
| 3 | {action} | {why} | {time/cost estimate} |

### Open Questions for Next Iteration

- {Question 1}
- {Question 2}
