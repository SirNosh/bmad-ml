# Step 01 - Initialize

1. Load experiment-design.md, specifically the metrics section. This is the foundation for detailed evaluation criteria.
2. Identify gaps in the current metrics definition: are formulas specified? Are thresholds defined? Is the statistical test chosen? Is the sample size justified?
3. Load problem-formulation.md to verify metrics align with the stated success criteria and domain objectives.
4. Check if evaluation criteria from prior iterations exist -- if so, load and identify what needs updating based on new experiment design.
5. Identify whether the task requires standard metrics (accuracy, F1, BLEU, FID) or custom metrics. For custom metrics, prepare to define computation formally.
6. Determine the evaluation infrastructure requirements: does evaluation need a held-out test server, human evaluation, or specialized compute?
7. Confirm which metrics are primary (determine experiment outcome) vs secondary (monitored for insight) vs diagnostic (tracked for debugging).
8. Present the current metrics status and identified gaps to the user.

9. If operating in autonomous mode (invoked by Nosh), use experiment-design.md metrics as the starting point and skip the confirmation gate.

> Soft gate: "Here are the gaps in the current evaluation criteria. Anything to add before I build the detailed criteria?"

Continue to ./step-02-build.md.
