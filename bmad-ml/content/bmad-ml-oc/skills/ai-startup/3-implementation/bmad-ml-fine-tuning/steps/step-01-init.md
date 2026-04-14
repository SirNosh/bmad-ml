# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract fine-tuning specifications: target base model, fine-tuning rationale, expected performance improvements, and deployment target.
2. Confirm the base model selection and access:
   - Model name and version (e.g., Llama-3-8B, Mistral-7B, GPT-4o-mini)
   - Model access method (HuggingFace Hub, local weights, API-based fine-tuning)
   - Hardware requirements (GPU VRAM, estimated training time)
3. Confirm the dataset path and validate dataset readiness:
   - Dataset location and format (JSONL, CSV, Parquet)
   - Dataset size (number of examples, total tokens)
   - Data split strategy (train/validation/test ratios)
4. Confirm fine-tuning method based on architecture spec:
   - **LoRA**: Rank, alpha, target modules, dropout
   - **QLoRA**: Quantization config (4-bit, 8-bit), compute dtype
   - **Full fine-tuning**: Frozen layers, learning rate differential
5. Define evaluation criteria:
   - Primary metric (e.g., accuracy, F1, BLEU, ROUGE, perplexity)
   - Comparison baseline (base model zero-shot, base model few-shot, previous fine-tuned version)
   - Minimum acceptable improvement threshold
   - Evaluation test set (held-out split, curated benchmark, domain-specific test cases)
6. Verify infrastructure readiness: GPU availability, CUDA version, sufficient disk space for checkpoints, and experiment tracking setup (W&B, TensorBoard).

Continue to ./step-02-build.md.
