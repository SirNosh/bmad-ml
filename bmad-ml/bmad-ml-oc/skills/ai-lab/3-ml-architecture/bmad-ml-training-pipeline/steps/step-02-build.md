# Step 02 - Build and Analyze

1. Define the optimizer with full hyperparameters: learning rate, weight decay, betas (for Adam variants), momentum (for SGD), epsilon. Justify each value with reference to literature or architecture conventions.
2. Define the learning rate schedule: warmup steps/epochs, peak learning rate, decay strategy (cosine, linear, step), minimum learning rate. Include schedule formula or reference.
3. Define the batch size strategy: effective batch size, per-GPU batch size, and gradient accumulation steps. Verify that effective_batch = per_gpu_batch x num_gpus x accumulation_steps.
4. Define checkpointing: frequency (every N epochs or N steps), retention policy (keep last K, keep best K by validation metric), checkpoint format and storage location.
5. Define logging configuration: which metrics to log (loss, learning rate, gradient norm, validation metrics), log frequency (every N steps), and destination (tracking system).
6. Define the data loading pipeline: number of workers, prefetch factor, pin memory, shuffle strategy, and any dataset-specific requirements (e.g., dynamic batching, curriculum learning).
7. Define mixed precision settings: fp16 vs bf16 vs fp32, loss scaling strategy (dynamic or static), and any layers that must remain in fp32 (e.g., loss computation, layer norm).
8. Define distributed training strategy if needed: data parallelism (DDP), model parallelism (FSDP, tensor parallel), pipeline parallelism. Specify communication backend (NCCL, Gloo).
9. Define regularization: dropout rates, label smoothing, weight decay schedule, data augmentation strategy.
10. Define the training termination criteria: maximum epochs/steps, early stopping based on validation metric (patience, minimum delta), and wall-clock time limit.
11. Define gradient clipping: max norm value and whether it applies globally or per-parameter.
12. Present the complete training pipeline specification for user review.

> Soft gate: "The training pipeline is fully specified. Review the optimizer, scheduler, checkpointing, and distributed strategy. Anything to adjust?"

Continue to ./step-03-finalize.md.
