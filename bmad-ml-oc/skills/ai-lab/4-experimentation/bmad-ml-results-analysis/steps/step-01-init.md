# Step 01 - Initialize

1. Load experiment-design.md to understand the hypothesis, metrics, baselines, and statistical plan.
2. Load evaluation criteria to understand metric formulas, thresholds, and statistical tests to apply.
3. Collect experiment results: gather logs, metrics, and checkpoints from all completed runs. Verify all planned runs (arms x seeds) have finished.
4. Identify any failed or incomplete runs. Document the failure reason and assess whether partial results are usable or if reruns are needed.
5. Load baseline results for comparison: random baseline, heuristic baseline, and SOTA reference.
6. Check iteration history -- if this is a re-analysis or follow-up, load the previous results-report.md and note what has changed.
7. Organize results into a structured format: one row per (arm, seed) with all metrics as columns.
8. Present the data completeness summary to the user: how many runs completed, any gaps, any anomalies.

9. If operating in autonomous mode (invoked by Nosh), verify data completeness programmatically and skip the confirmation gate.

> Soft gate: "Here is the results data status. All runs complete and data looks consistent? Anything to flag before analysis?"

Continue to ./step-02-build.md.
