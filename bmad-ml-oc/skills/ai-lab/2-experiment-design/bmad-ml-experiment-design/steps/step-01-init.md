# Step 01 - Initialize

1. Load the problem-formulation.md and supporting research artifacts (literature-review.md, feasibility-study.md). Verify they are current and consistent.
2. Confirm the operating mode: **Create** (new experiment from scratch), **Iterate** (refine a previous experiment based on results), or **Compare** (design a comparison between approaches). This determines the design template.
3. If Iterate or Compare mode, load the previous experiment-design.md and results-report.md to understand what has been tried and learned.
4. Define experiment scope: what specific hypothesis or question does this experiment test? It must trace back to the problem formulation.
5. Identify constraints: compute budget (GPU hours), time budget (calendar days), data constraints (fixed dataset or flexible), and any infrastructure limitations.
6. List available resources: GPU types, distributed training capability, experiment tracking tools, data storage.
7. Scan for existing experiment-design artifacts to avoid duplicating a previously designed experiment.
8. Present the experiment scope, mode, and constraints to the user for confirmation.

9. If operating in autonomous mode (invoked by Nosh), derive scope from the directive and existing artifacts, and skip the confirmation gate.

> Soft gate: "Here is the experiment scope and constraints summary. Anything to adjust before I design the experiment?"

Continue to ./step-02-build.md.
