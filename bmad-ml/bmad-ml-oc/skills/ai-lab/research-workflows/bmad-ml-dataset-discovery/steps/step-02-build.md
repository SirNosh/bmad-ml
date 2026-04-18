# Step 02 - Build and Analyze

1. For each candidate dataset, document: name, source, size (samples and features), available splits (train/val/test), feature descriptions, label distribution, known biases, and licensing terms.
2. Assess label quality: are labels human-annotated, programmatically generated, or self-supervised? What is the reported inter-annotator agreement if available?
3. Check for data leakage risks: overlap between candidate dataset splits, overlap with common benchmark test sets, and temporal leakage in time-series data.
4. Assess preprocessing requirements: what transformations are needed (normalization, tokenization, resizing, augmentation)? Estimate preprocessing compute cost.
5. Compare candidates on a standardized rubric: task fit (1-5), size adequacy (1-5), label quality (1-5), bias risk (1-5), licensing compatibility (pass/fail), preprocessing burden (1-5).
6. Check if established baselines exist for each candidate dataset -- datasets with published baselines enable faster experiment validation.
7. For the top 3 candidates, attempt a small download and spot-check: verify file integrity, load a sample batch, confirm feature types match documentation.
8. Note any datasets that could serve as auxiliary training data or transfer learning sources even if they are not the primary dataset.
9. Identify potential ethical concerns: personally identifiable information, demographic imbalances, content that could cause harm if misused.
10. Present the comparison matrix and preliminary recommendation to the user.

> Soft gate: "The dataset comparison is ready. Any additional candidates to evaluate or criteria to adjust?"

Continue to ./step-03-finalize.md.
