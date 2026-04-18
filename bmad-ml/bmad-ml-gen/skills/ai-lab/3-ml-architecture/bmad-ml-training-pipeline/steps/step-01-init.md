# Step 01 - Initialize

1. Load model-architecture.md. Understand the model structure, parameter count, and any architecture-specific training requirements from the handoff notes.
2. Define training infrastructure requirements: GPU type (A100, H100, etc.), GPU count, VRAM per GPU, and interconnect (for multi-GPU). Match to model size and batch requirements.
3. Confirm optimizer preference: AdamW (default for transformers), SGD with momentum (default for CNNs), or other. Note any architecture-specific optimizer recommendations from the literature.
4. Load experiment-design.md for training duration constraints, reproducibility requirements, and compute budget.
5. Identify the experiment tracking system: W&B, TensorBoard, MLflow, or custom. Confirm it is set up and accessible.
6. Check iteration history -- if this is a pipeline revision, load the previous training config and identify what prompted the change.
7. Identify any distributed training needs: is the model too large for a single GPU? Will data parallelism or model parallelism be needed?
8. Present the infrastructure requirements, optimizer choice, and training constraints to the user.

9. If operating in autonomous mode (invoked by Nosh), use architecture handoff notes for optimizer selection and skip the confirmation gate.

> Soft gate: "Here are the training infrastructure requirements and optimizer choice. Anything to adjust before I specify the full pipeline?"

Continue to ./step-02-build.md.
