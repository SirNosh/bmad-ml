# Step 03 - Finalize and Route

1. Document the optimization results in a structured comparison: original vs optimized on all measured dimensions (accuracy, latency, memory, throughput, model size).
2. Confirm that the optimized model meets the acceptable accuracy trade-off threshold defined in Step 01.
3. Update the model card with the optimized variant: add the optimization technique, resulting metrics, and deployment notes.
4. Produce the final model-optimization.md artifact with: profiling results, techniques applied, comparison table, edge case verification, and recommended deployment configuration.
5. Update iteration history with the date, optimization techniques applied, and key metric deltas.
6. If the optimized model meets deployment constraints, prepare handoff to deployment: export the model in the target format, document serving configuration, and specify hardware requirements.
7. If further optimization is needed, recommend next steps and whether a second optimization pass or architecture redesign is more promising.
8. Present the completed optimization report for user approval.

**Deliverables:** model-optimization.md (with profiling results, techniques applied, comparison table, and deployment configuration) plus optimized model artifact.

**Recommended next workflow:** `bmad-ml-code-review` (to review the optimized implementation) or `bmad-ml-adversarial-review` (to validate optimized model robustness).

> Quality check: Verify that (a) all optimization techniques are documented with results, (b) accuracy trade-off is within bounds, (c) edge case verification passed, and (d) deployment configuration is specified.
