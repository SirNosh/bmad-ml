# Step 03 - Finalize and Route

1. Validate the pipeline against the compute budget: estimated training time (steps x time_per_step x num_seeds) must fit within allocated GPU hours.
2. Cross-check pipeline against model architecture requirements: verify that batch size fits in GPU memory, optimizer is compatible, and mixed precision settings are appropriate for the architecture.
3. Verify reproducibility: confirm that seeds, deterministic flags, and environment versioning are specified and consistent with experiment-design.md requirements.
4. Confirm that the checkpointing strategy preserves enough checkpoints for post-hoc analysis while staying within storage limits.
5. Produce the final training-pipeline.md artifact with all sections: optimizer, scheduler, batch strategy, checkpointing, logging, data loading, mixed precision, distributed training, regularization, termination, gradient clipping.
6. Update iteration history with the date, key pipeline decisions, and estimated training duration.
7. Identify any infrastructure setup tasks that must be completed before training begins (e.g., GPU allocation, tracking system configuration, data transfer).
8. Route to the readiness-check workflow to verify all components are in place before implementation.

**Deliverables:** training-pipeline.md (with optimizer, scheduler, batch strategy, checkpointing, logging, data loading, mixed precision, distributed training, and regularization).

**Recommended next workflow:** `bmad-ml-readiness-check` (to verify all components are in place before implementation).

> Quality check: Verify that (a) effective batch size formula is correct, (b) learning rate schedule is fully specified, (c) checkpoint retention is defined, and (d) mixed precision settings are compatible with the model.
