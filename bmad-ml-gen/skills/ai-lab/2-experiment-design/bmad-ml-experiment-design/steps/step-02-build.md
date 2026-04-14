# Step 02 - Build and Analyze

1. Define experiment arms: list every condition to be compared. Each arm must differ from others in exactly one variable (or a clearly defined set of coupled variables).
2. Define baselines: include at minimum a random baseline, a simple heuristic baseline, and a SOTA reference if available. Baselines establish the performance floor and ceiling.
3. Define controls: explicitly list what is held constant across all arms (data splits, preprocessing, training duration, evaluation protocol, random seeds).
4. Define the primary metric with its exact computation formula, and specify the statistical test that will be used to compare arms (e.g., paired t-test, bootstrap CI, Wilcoxon signed-rank).
5. Define secondary metrics with reporting thresholds. Secondary metrics are monitored but do not determine the experiment outcome.
6. Define data splits: train/validation/test ratios, stratification strategy (if applicable), and cross-validation scheme (if applicable). Specify whether splits are pre-existing or newly created.
7. Define reproducibility controls: list of random seeds (recommend >=3 for statistical validity), deterministic operation settings, and environment versioning requirements.
8. Estimate compute budget per arm: training time x number of seeds x number of arms. Verify total fits within the stated compute constraint.
9. Define the experiment timeline: milestones for implementation, training, evaluation, and analysis. Include buffer for unexpected issues.
10. Define early stopping criteria: under what conditions should a run be terminated early (e.g., diverging loss, exceeding time budget, NaN gradients)?
11. Define the handoff to implementation: what artifacts must be produced by this design phase for the implement-experiment workflow?
12. Present the complete experiment design for user review.

> Soft gate: "The experiment design is complete. Review the arms, baselines, metrics, and compute estimate. Anything to revise?"

Continue to ./step-03-finalize.md.
