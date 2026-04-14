# Step 03 - Finalize and Route

1. Validate the selected architecture against experiment design constraints: parameter budget, inference latency, memory ceiling all satisfied.
2. Cross-check the architecture against the compute budget: confirm that the estimated FLOPs per training step x expected training steps fits within the GPU-hour allocation.
3. Verify that the model's input/output contract is compatible with the dataset format from dataset-discovery.md.
4. Commit the Architecture Decision Records: each ADR should be final and clearly state the decision and rationale.
5. Produce the final model-architecture.md artifact with all sections: architecture overview, layer specification, parameter estimates, ADRs, inference requirements.
6. Update iteration history with the date, selected architecture, parameter count, and key ADR summaries.
7. Prepare handoff notes for the training-pipeline workflow: specify any architecture-specific training requirements (e.g., warmup needed, gradient clipping sensitivity, specific optimizer compatibility).
8. Route to the training pipeline workflow.

**Deliverables:** model-architecture.md (with architecture overview, layer specification, parameter estimates, ADRs, and inference requirements).

**Recommended next workflow:** `bmad-ml-training-pipeline` (to specify the training configuration for this architecture).

> Quality check: Verify that (a) parameter count matches layer spec, (b) all ADRs have rationale, (c) inference requirements are specified, and (d) handoff notes cover architecture-specific training needs.
