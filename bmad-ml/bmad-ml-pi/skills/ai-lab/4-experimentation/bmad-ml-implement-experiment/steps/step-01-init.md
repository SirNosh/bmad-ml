# Step 01 - Initialize

1. Load experiment-design.md, model-architecture.md, and training-pipeline.md. These are the implementation specifications.
2. Load readiness-check.md and verify the verdict is READY or READY WITH CONCERNS. If CONCERNS exist, note them as implementation-time watch items.
3. Create an implementation task list: model code, data pipeline, training loop, evaluation harness, experiment tracking integration, tests, and reproducibility verification.
4. Confirm the experiment tracking integration: what system (W&B, MLflow, TensorBoard)? What project/experiment name? What metadata to log at experiment start?
5. Define the code structure: where model code lives, where training scripts live, where configs are stored, and where results will be written.
6. Identify any reusable code from prior experiments that can be adapted rather than written from scratch.
7. Set up the development environment: verify dependencies, GPU access, and data availability.
8. Present the implementation task list and code structure plan to the user.

9. If operating in autonomous mode (invoked by Nosh), use the experiment design as-is and skip the confirmation gate.

> Soft gate: "Here is the implementation plan and code structure. Anything to adjust before I start coding?"

Continue to ./step-02-build.md.
