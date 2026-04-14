# Step 01 - Initialize

1. Load the current experiment-status.yaml (or equivalent tracking file). Parse all tracked experiments with their current status.
2. Identify experiments needing status updates: recently completed runs, stalled experiments, newly planned experiments.
3. Scan experiment logs and tracking system (W&B, MLflow, TensorBoard) for runs that have completed since the last tracking update.
4. Identify any experiments that have been active for longer than their estimated timeline -- these may be stalled or blocked.
5. Check for experiments marked as "planned" that should have started -- identify blockers if they have not progressed.
6. Load the experiment-design.md for context on what experiments are in the pipeline.
7. Prepare the list of experiments to update and the proposed status changes.
8. Present the tracking update plan to the user.

9. If operating in autonomous mode (invoked by Nosh), apply all detected status changes automatically and skip the confirmation gate.

> Soft gate: "Here are the experiments needing status updates. Any corrections or additional experiments to track?"

Continue to ./step-02-build.md.
