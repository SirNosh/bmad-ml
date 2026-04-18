# Step 03 - Finalize and Route

1. Run the full validation test suite and report results. All tests must pass before proceeding to training.
2. Verify experiment tracking captures all required metrics: confirm that a smoke test run shows the expected metrics in the tracking system.
3. Verify reproducibility: confirm that two identical-seed runs produce matching results within floating-point tolerance.
4. Update iteration metadata: record the implementation date, code commit hash (if version controlled), and any specification deviations.
5. Produce a pre-training checklist: data loaded, model instantiated, optimizer configured, tracking active, checkpointing verified, tests passing.
6. Archive the implementation artifacts: training script, model code, config files, and test results.
7. If all checks pass, the implementation is ready for full training runs. Present the pre-training checklist for final approval.
8. Route to experiment-tracking to log the experiment as "planned" or "active."

**Deliverables:** Working implementation (model code, training script, config, tests) and pre-training checklist.

**Recommended next workflow:** `bmad-ml-results-analysis` (after training completes) or `bmad-ml-code-review` (for implementation review before full training).

> Quality check: Verify that (a) all tests pass, (b) smoke test completes without errors, (c) experiment tracking is confirmed working, and (d) reproducibility is verified.
