# Step 01 - Initialize

1. Define the experiment question in one sentence: what are you trying to find out? This should be narrow and answerable with a single run.
2. Set a time budget: quick experiments should complete in hours, not days. Define the maximum wall-clock time.
3. Create a lightweight spec: hypothesis (one sentence), single primary metric, dataset (existing and ready to use), model (simple or pre-existing).
4. Decide what to skip: formal evaluation criteria, multiple seeds, ablation analysis, and extensive documentation are all optional for quick experiments.
5. Identify the minimum viable implementation: what is the least amount of code needed to answer the question?
6. Verify that the dataset and model are immediately available -- no setup or download time should be required.
7. Confirm this is truly a quick experiment, not a full experiment that should go through the formal design workflow.
8. Present the quick experiment spec to the user.

9. If operating in autonomous mode (invoked by Nosh), verify the scope is genuinely quick and skip the confirmation gate.

> Soft gate: "Here is the quick experiment spec. Confirm this is the right scope, or should this be a full experiment?"

Continue to ./step-02-build.md.
