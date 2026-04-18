# Step 03 - Finalize and Route

1. Synthesize findings into results-report.md: executive summary, detailed results by arm, statistical analysis, visualizations, failure analysis, and conclusions.
2. State clearly whether the hypothesis is **supported**, **rejected**, or **inconclusive**, with the statistical evidence cited.
3. Compare results against the problem formulation's success criteria: did the experiment achieve minimum viable, target, or stretch performance?
4. Recommend the next iteration direction: what should the next experiment change (architecture, data, hyperparameters, training procedure)?
5. List specific actionable findings: what worked, what did not, and what was surprising. Each finding should inform a concrete next step.
6. Update iteration history with the date, experiment ID, primary metric results, hypothesis verdict, and next-step recommendation.
7. If results warrant model optimization, flag for the model-optimization workflow. If results are negative, consider whether the problem formulation needs revision.
8. Present the completed results report for user approval.

**Deliverables:** results-report.md (with executive summary, detailed results, statistical analysis, hypothesis verdict, and next-step recommendations).

**Recommended next workflow:** `bmad-ml-model-optimization` (if results are promising), `bmad-ml-experiment-design` (if iteration is needed), or `bmad-ml-adversarial-review` (if results will be published).

> Quality check: Verify that (a) statistical tests match the evaluation criteria specification, (b) all arms and baselines are compared, (c) the hypothesis verdict is justified by the evidence, and (d) next-step recommendations are specific and actionable.
