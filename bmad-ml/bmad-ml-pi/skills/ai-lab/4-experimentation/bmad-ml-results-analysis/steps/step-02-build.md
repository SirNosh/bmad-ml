# Step 02 - Build and Analyze

1. Compute primary metric statistics across seeds for each arm: mean, standard deviation, and confidence interval (95% CI). Present in a comparison table.
2. Run the statistical test specified in the evaluation criteria: compute the test statistic and p-value for the primary metric comparison between each arm and the best baseline.
3. Apply multiple comparison correction if testing more than one arm against the baseline (e.g., Bonferroni, Holm-Bonferroni).
4. Compare all arms against all baselines on the primary metric. Determine whether the hypothesis is supported (primary metric exceeds threshold with statistical significance).
5. Analyze secondary metrics: compute summary statistics and report any notable patterns or unexpected results.
6. Run per-class or per-split breakdowns: identify whether performance is uniform or if certain subgroups underperform. Flag disparities.
7. Run ablation analysis if the experiment design included ablation arms: quantify the contribution of each component.
8. Identify failure cases and error patterns: sample and categorize incorrect predictions. Look for systematic biases or blind spots.
9. Produce visualizations: learning curves (loss and metric vs step), confusion matrices (for classification), metric comparison bar charts with error bars, and any task-specific plots.
10. Assess practical significance: even if results are statistically significant, is the effect size large enough to matter for the domain application?
11. Identify unexpected findings: results that contradict prior assumptions or literature. Document whether they warrant further investigation.
12. Present the full analysis with visualizations for user review.

> Soft gate: "The results analysis is complete. Review the statistical tests, breakdowns, and failure analysis. Anything to investigate further?"

Continue to ./step-03-finalize.md.
