# Step 03 - Finalize

1. Generate the model card documenting:
   - Base model name, version, and source
   - Fine-tuning method and key hyperparameters
   - Training dataset description (size, domain, format) without exposing sensitive data
   - Intended use case and limitations
   - Ethical considerations and known biases

2. Produce the comparison report:
   - Metrics table: base model (zero-shot) vs base model (few-shot) vs fine-tuned model
   - Per-category breakdown if applicable (e.g., accuracy by task type)
   - Qualitative examples: 3-5 representative improvements and 1-2 regressions or failure cases
   - Statistical significance assessment if sample size supports it

3. Document training artifacts and reproducibility information:
   - Final checkpoint location and file sizes
   - Exact training configuration (all hyperparameters, random seeds, hardware spec)
   - Training duration, total steps, final loss values
   - Dataset version hash or identifier for reproducibility
   - Environment specification (Python version, library versions, CUDA version)

4. Present results to the user:
   - Executive summary: did fine-tuning meet the minimum improvement threshold?
   - Comparison report with metrics and examples
   - Model card
   - Recommended next steps (deploy, iterate with more data, try different hyperparameters)
   - List of artifacts produced and their locations

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
