# Step 03 - Finalize

1. Validate pipeline runs end-to-end:
   - Trigger each pipeline variant (push, PR, merge, release) and verify all stages execute
   - Verify quality gates block progression when a stage fails (intentionally fail a test and confirm pipeline stops)
   - Verify artifacts are produced and stored (container images, test reports, evaluation reports)
   - Verify notifications fire on pipeline success and failure (team channel, PR comments)
   - Measure pipeline execution time for each variant and confirm it meets target

2. Present pipeline diagram and documentation:
   - Visual pipeline diagram showing: triggers -> stages -> gates -> deployment
   - Summary table: pipeline variant, trigger condition, stages included, estimated duration, estimated cost
   - Quality gate configuration: what each gate checks and failure thresholds
   - Pipeline metrics: current execution times, success rates from test runs
   - Known limitations and planned improvements (e.g., "GPU runner needed for model evaluation stage")

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
