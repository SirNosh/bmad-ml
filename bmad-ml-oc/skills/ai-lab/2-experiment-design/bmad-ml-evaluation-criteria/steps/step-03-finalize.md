# Step 03 - Finalize and Route

1. Cross-check evaluation criteria against experiment design: every arm must be evaluable with the defined metrics, and the statistical test must be appropriate for the comparison structure.
2. Validate statistical adequacy: confirm power analysis supports the chosen number of seeds and evaluation samples.
3. Verify that primary metric threshold aligns with the problem formulation's success criteria.
4. Ensure evaluation criteria distinguish between "statistically significant" and "practically significant" -- define the minimum effect size that matters.
5. Produce the final evaluation-criteria section in experiment-design.md (or as a standalone evaluation-criteria.md if the project uses separate artifacts).
6. Update iteration history with the date, metrics defined, and statistical plan summary.
7. Flag any evaluation infrastructure that needs to be set up before experimentation begins (e.g., test server, human eval pipeline).
8. Present the completed evaluation criteria for user approval.

**Deliverables:** evaluation-criteria.md (with metric formulas, thresholds, statistical tests, power analysis, and reporting format).

**Recommended next workflow:** `bmad-ml-model-architecture` (to design the architecture under these evaluation constraints).

> Quality check: Verify that (a) all metrics have formulas, (b) statistical test matches comparison structure, (c) power analysis is documented, and (d) reporting format is specified.
