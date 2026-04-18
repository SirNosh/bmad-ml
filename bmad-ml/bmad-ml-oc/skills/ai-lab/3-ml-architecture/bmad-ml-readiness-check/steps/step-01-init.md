# Step 01 - Initialize

1. Load all prerequisite artifacts: experiment-design.md, model-architecture.md, training-pipeline.md, dataset-discovery.md (or equivalent), and evaluation-criteria (if separate).
   - For each artifact, note whether it is in draft or approved state -- draft artifacts may need additional review before experimentation begins.
2. Prepare the readiness checklist with six dimensions: Experiment Design, Architecture, Training Pipeline, Data, Infrastructure, and Evaluation.
3. Identify any artifacts that are missing entirely -- these are automatic FAIL items.
4. Check the iteration history for each artifact: are they all from the same design iteration, or are some stale?
5. Identify external dependencies: compute allocation approval, data access permissions, API keys for tracking services.
6. Set the readiness threshold: all PASS is required to proceed, or is CONCERNS on non-critical dimensions acceptable?
7. Present the checklist dimensions and known missing artifacts to the user.

8. If operating in autonomous mode (invoked by Nosh), use the standard six dimensions and skip the confirmation gate.

> Soft gate: "Here is the readiness checklist scope. Any additional dimensions to assess?"

Continue to ./step-02-build.md.
