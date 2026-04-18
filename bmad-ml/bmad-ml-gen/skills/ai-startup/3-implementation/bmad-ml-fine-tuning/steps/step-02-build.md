# Step 02 - Build

1. Prepare and validate the training dataset:
   - Load dataset and verify schema (instruction/input/output fields or conversation format)
   - Run quality checks: detect duplicates, empty fields, encoding errors, excessive length
   - Validate token distribution (min, max, mean, p95 token counts per example)
   - Apply formatting template matching the base model's expected chat format (ChatML, Llama-style, Alpaca)
   - Split into train/validation/test sets if not pre-split

2. Configure training parameters:
   - Learning rate (with warmup steps and schedule: cosine, linear decay)
   - Batch size (per-device and effective with gradient accumulation)
   - Number of epochs (with early stopping patience)
   - LoRA-specific: rank, alpha, target modules (q_proj, v_proj, k_proj, o_proj), dropout rate
   - QLoRA-specific: quantization config (bnb_4bit_compute_dtype, bnb_4bit_quant_type)
   - Weight decay, max gradient norm, warmup ratio
   - Save and evaluation intervals (steps or fraction of epoch)

3. Implement the training script:
   - Load base model with appropriate quantization config if using QLoRA
   - Apply PEFT adapter configuration (LoRA/QLoRA)
   - Configure the Trainer or custom training loop with:
     - Gradient checkpointing for memory efficiency
     - Mixed precision training (bf16/fp16) based on hardware
     - Checkpoint saving at defined intervals
     - Validation loss logging per evaluation step
   - Implement checkpoint management: keep top-K checkpoints by validation loss, auto-cleanup

4. Implement the evaluation pipeline:
   - Load evaluation test set (held-out split + curated test cases)
   - Run inference on test set with the fine-tuned model
   - Compute primary metrics (per evaluation criteria from Step 01)
   - Run qualitative evaluation: sample 10-20 outputs for manual review
   - Compare against baseline: run same test set through base model (zero-shot and few-shot)

5. Run training with monitoring:
   - Start training run with experiment tracking enabled
   - Monitor training loss curve for convergence and anomalies (loss spikes, NaN)
   - Monitor validation loss for overfitting detection
   - Log GPU utilization, memory usage, and throughput (samples/second)

6. Evaluate results against baseline:
   - Produce comparison table: base model (zero-shot) vs base model (few-shot) vs fine-tuned model
   - Identify categories where fine-tuning improved vs regressed performance
   - Analyze failure cases from the fine-tuned model

Continue to ./step-03-finalize.md.
