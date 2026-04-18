---
artifact: experiment-design
iteration: 1
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
iteration_history:
  - iteration: 1
    date: YYYY-MM-DD
    trigger: "Initial creation"
    summary: "Baseline design"
---

# Experiment Design

## Problem and Hypothesis

> **Purpose:** Precisely define the research question and a testable hypothesis so all downstream decisions (metrics, arms, data) are grounded in a falsifiable claim.
> **Guidance:** Write the hypothesis in "If X then Y" form. The null hypothesis should be the negation. Scope boundaries prevent scope creep -- state what this experiment will and will NOT investigate.

### Problem Statement

{Describe the specific problem this experiment addresses. Reference the literature review or prior iteration results that motivate this work.}

### Primary Hypothesis

- **Hypothesis (H1):** {If we [intervention], then [measurable outcome] will [direction of change] by [magnitude/threshold].}
- **Null Hypothesis (H0):** {The intervention produces no statistically significant change in [outcome].}

### Scope Boundaries

- **In scope:** {List what this experiment covers.}
- **Out of scope:** {List what this experiment explicitly excludes and why.}

### Motivation and Prior Evidence

{Cite prior iterations, literature review findings, or domain knowledge that justify this hypothesis.}

---

## Experiment Arms

> **Purpose:** Enumerate every experimental condition so that each arm maps cleanly to a variable being tested.
> **Guidance:** Each arm should differ from the control in exactly one independent variable when possible. If arms combine multiple changes, note the confound and justify it.

| Arm ID | Arm Name | Description | Key Variable(s) Changed | Expected Effect |
|--------|----------|-------------|------------------------|-----------------|
| arm-0  | Control  | {Baseline configuration} | None (reference) | Baseline performance |
| arm-1  | {name}   | {description} | {variable: value} | {expected direction and magnitude} |
| arm-2  | {name}   | {description} | {variable: value} | {expected direction and magnitude} |

### Variable Isolation Notes

{Describe any confounds between arms and how they will be managed.}

---

## Baselines

> **Purpose:** Establish reference points so that experimental results can be judged against naive, heuristic, and state-of-the-art benchmarks.
> **Guidance:** Include at least a random/trivial baseline and one credible reference. SOTA numbers should cite the source paper and note any differences in data or evaluation protocol.

| Baseline | Description | Expected Performance | Source |
|----------|-------------|---------------------|--------|
| Random   | {e.g., uniform random prediction} | {metric: value} | Analytical |
| Heuristic | {e.g., majority-class, frequency-based} | {metric: value} | Computed on train set |
| Prior Iteration | {Best result from previous cycle} | {metric: value} | {link to results report} |
| Published SOTA | {Method name from literature} | {metric: value} | {paper citation} |

### Baseline Reproduction Notes

{If reproducing a published baseline, note any deviations from the original protocol.}

---

## Metrics

> **Purpose:** Define exactly how success and failure will be measured, including statistical rigor, so results are unambiguous.
> **Guidance:** One primary metric drives the go/no-go decision. Secondary metrics guard against regression or capture additional dimensions. Define thresholds before running experiments to avoid post-hoc rationalization.

### Primary Metric

| Field | Value |
|-------|-------|
| **Name** | {e.g., F1-macro, BLEU, accuracy} |
| **Formula / Definition** | {precise definition or link to implementation} |
| **Success Threshold** | {minimum value to accept H1} |
| **Statistical Test** | {e.g., paired t-test, bootstrap CI, Wilcoxon signed-rank} |
| **Significance Level (alpha)** | {e.g., 0.05} |
| **Minimum Detectable Effect** | {smallest meaningful improvement} |
| **Statistical Power** | {target, e.g., 0.80} |

### Secondary Metrics

| Metric Name | Purpose | Acceptable Range | Notes |
|-------------|---------|-----------------|-------|
| {name} | {what it guards against or measures} | {range} | {notes} |
| {name} | {what it guards against or measures} | {range} | {notes} |

### Metric Computation Details

{Describe any averaging strategy (micro/macro), handling of edge cases (empty predictions, ties), and the evaluation library or script to use.}

---

## Data and Splits

> **Purpose:** Lock down the exact data, splits, and preprocessing so that results are reproducible and comparisons are fair across arms.
> **Guidance:** Reference the dataset card for detailed composition. Specify split ratios, stratification strategy, and any augmentation. All arms must use identical splits.

| Field | Value |
|-------|-------|
| **Dataset Name** | {name, version} |
| **Dataset Card** | {link to dataset-card.md} |
| **Total Samples** | {count} |
| **Train / Val / Test Split** | {ratio, e.g., 80/10/10} |
| **Stratification** | {e.g., stratified by label, grouped by patient ID} |
| **Split Seed** | {seed value for reproducible splitting} |

### Preprocessing Pipeline

1. {Step 1: e.g., tokenization with max_length=512}
2. {Step 2: e.g., normalization to zero-mean unit-variance}
3. {Step 3: e.g., removal of samples with missing labels}

### Augmentation (if applicable)

| Augmentation | Applied To | Probability | Parameters |
|-------------|-----------|------------|------------|
| {e.g., random crop} | {train only} | {0.5} | {size=224} |
| {e.g., synonym replacement} | {train only} | {0.1} | {max_swaps=2} |

---

## Methodology and Controls

> **Purpose:** Ensure experimental rigor so that observed differences are attributable to the intervention, not to noise or implementation artifacts.
> **Guidance:** Specify every source of randomness and how it is controlled. Define hardware configuration to guard against hardware-dependent variance.

### Reproducibility Controls

| Control | Value |
|---------|-------|
| **Random Seeds** | {list of seeds for multiple runs, e.g., [42, 123, 456]} |
| **Number of Runs per Arm** | {e.g., 3} |
| **Deterministic Operations** | {yes/no; note any non-deterministic ops} |
| **Framework Version** | {e.g., PyTorch 2.3.0, Transformers 4.41.0} |
| **CUDA / cuDNN Version** | {e.g., CUDA 12.1, cuDNN 8.9} |

### Training Protocol

| Parameter | Value |
|-----------|-------|
| **Checkpoint Frequency** | {e.g., every 500 steps} |
| **Early Stopping Criteria** | {metric, patience, min_delta} |
| **Evaluation Frequency** | {e.g., every epoch on val set} |
| **Gradient Clipping** | {max_norm value or "none"} |

### Hardware Configuration

| Field | Value |
|-------|-------|
| **GPU Type** | {e.g., A100-80GB} |
| **GPU Count** | {e.g., 4} |
| **Distributed Strategy** | {e.g., DDP, FSDP, DeepSpeed ZeRO-3} |
| **CPU / RAM** | {e.g., 32-core, 256 GB} |

---

## Resource Estimate

> **Purpose:** Budget compute, time, and storage before committing resources so the experiment is feasible within constraints.
> **Guidance:** Estimate per-arm and total. Include a buffer for failed runs. Reference cloud pricing if applicable.

| Resource | Per Arm | Total (all arms x runs) |
|----------|---------|------------------------|
| **GPU Type x Count** | {e.g., 4x A100} | {same or scaled} |
| **Estimated Training Time** | {e.g., 6 hours} | {e.g., 36 hours for 6 runs} |
| **Estimated Cost** | {e.g., $48} | {e.g., $288 + 20% buffer} |
| **Storage (checkpoints + logs)** | {e.g., 50 GB} | {e.g., 300 GB} |
| **Inference / Eval Time** | {e.g., 30 min} | {e.g., 3 hours} |

### Feasibility Check

- [ ] Total cost within budget: {budget}
- [ ] Total wall-clock time within deadline: {deadline}
- [ ] Storage within available capacity: {capacity}

---

## Expected Outcomes

> **Purpose:** Pre-register expected results so that post-experiment analysis can distinguish confirmation from surprise, guiding the next iteration.
> **Guidance:** State expected metric ranges per arm. Describe the expected training dynamics (loss curve shape, convergence speed). Identify risk factors that could invalidate results.

### Expected Primary Metric Range

| Arm | Expected Range | Confidence |
|-----|---------------|------------|
| Control | {min -- max} | {high/medium/low} |
| arm-1 | {min -- max} | {high/medium/low} |
| arm-2 | {min -- max} | {high/medium/low} |

### Expected Training Behavior

- **Convergence:** {e.g., expect convergence by epoch 8, val loss plateau by epoch 5}
- **Known Instabilities:** {e.g., learning rate sensitivity in first 500 steps}
- **Overfitting Risk:** {e.g., high if augmentation is insufficient}

### Risk Factors

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| {e.g., data leakage between splits} | {low/med/high} | {low/med/high} | {mitigation strategy} |
| {e.g., GPU OOM at batch_size=32} | {low/med/high} | {low/med/high} | {mitigation strategy} |
| {e.g., non-convergence of arm-2} | {low/med/high} | {low/med/high} | {mitigation strategy} |
