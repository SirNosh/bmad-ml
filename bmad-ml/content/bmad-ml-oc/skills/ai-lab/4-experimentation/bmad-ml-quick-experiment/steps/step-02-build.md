# Step 02 - Build and Analyze

1. Implement minimal experiment code: model instantiation, data loading, training loop, and metric computation. Prioritize speed over elegance.
2. Run training for the planned duration or until convergence, whichever comes first.
3. Collect results: primary metric value, training loss curve (if informative), and wall-clock time.
4. Skip formal statistical analysis -- report raw numbers with a brief qualitative assessment.
5. If the result is surprisingly good or bad, run a sanity check: verify data loading is correct, verify the metric computation is correct, and rule out trivial bugs.
6. Note any unexpected observations: training instability, surprising convergence speed, anomalous metric behavior.
7. Document the code minimally: enough to reproduce the run, not enough for a production codebase.
8. Present the raw results and observations to the user.

> Soft gate: "Quick experiment complete. Here are the raw results. Worth promoting to a full experiment?"

Continue to ./step-03-finalize.md.
