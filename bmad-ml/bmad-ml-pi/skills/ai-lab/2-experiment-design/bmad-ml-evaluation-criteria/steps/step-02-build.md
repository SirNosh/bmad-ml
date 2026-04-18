# Step 02 - Build and Analyze

1. Define the primary metric with its exact mathematical formula. Include edge case handling (e.g., what happens when denominator is zero, how are missing predictions scored).
2. Define secondary metrics with exact formulas and reporting thresholds (e.g., "report F1 if it differs from baseline by more than 0.02").
3. Define the statistical test for the primary metric comparison: specify the test (e.g., paired bootstrap, permutation test, Wilcoxon), the significance level (alpha), and whether correction for multiple comparisons is needed.
4. Compute the minimum sample size for adequate statistical power: given the expected effect size, alpha, and desired power (typically 0.8), how many evaluation samples are needed?
5. Define early stopping criteria for evaluation: conditions under which intermediate results are sufficient to make a decision (e.g., futility stopping, superiority stopping).
6. Define the evaluation schedule: at which training checkpoints will evaluation be performed? After every epoch? Every N steps? Only at convergence?
7. Define per-split evaluation: which metrics are computed on validation vs test? Test metrics should only be computed once, at the end.
8. Define diagnostic metrics for debugging: loss curves, gradient norms, learning rate schedules, per-class breakdowns. These are not decision metrics but aid interpretation.
9. If human evaluation is needed, define the evaluation protocol: number of annotators, annotation guidelines, inter-annotator agreement metric, and minimum agreement threshold.
10. Define the reporting format: how will results be presented (tables, plots, statistical summaries)?
11. Present the complete evaluation criteria for user review.

> Soft gate: "The evaluation criteria are fully specified. Review the formulas, thresholds, and statistical plan. Anything to adjust?"

Continue to ./step-03-finalize.md.
