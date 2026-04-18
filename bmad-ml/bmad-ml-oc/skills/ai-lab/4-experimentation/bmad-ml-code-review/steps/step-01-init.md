# Step 01 - Initialize

1. Load experiment-design.md to understand the experiment's design constraints, metrics, and reproducibility requirements.
2. Identify the files under review: model code, training scripts, data pipeline, evaluation harness, and configuration files.
3. Load model-architecture.md and training-pipeline.md as reference specifications to verify the code matches the design.
4. Prepare the review checklist with four categories: Correctness, Reproducibility, Code Quality, and Efficiency.
5. Identify the review scope: full review (all code), incremental review (changes since last review), or targeted review (specific components).
6. Check if prior code review findings exist -- if so, verify that previously flagged issues have been addressed.
7. Note any ML-specific anti-patterns to watch for: data leakage, incorrect loss computation, gradient flow issues, non-deterministic operations.
8. Present the review scope and checklist to the user.

9. If operating in autonomous mode (invoked by Nosh), use the full review scope and skip the confirmation gate.

> Soft gate: "Here is the review scope and checklist. Any specific areas of concern to prioritize?"

Continue to ./step-02-build.md.
