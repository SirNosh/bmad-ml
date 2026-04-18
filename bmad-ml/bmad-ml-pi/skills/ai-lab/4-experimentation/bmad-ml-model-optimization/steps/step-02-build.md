# Step 02 - Build and Analyze

1. Profile the current model: identify bottleneck layers (highest latency contribution), memory peaks (largest activations), and inference latency breakdown by component.
2. Establish the optimization baseline: record accuracy, latency, memory, throughput, and model size for the unoptimized model. All comparisons will be made against this baseline.
3. Apply pruning if selected: determine pruning ratio per layer, apply structured or unstructured pruning, fine-tune the pruned model, and measure accuracy recovery.
4. Apply quantization if selected: choose quantization scheme (post-training INT8, quantization-aware training INT8/INT4, mixed precision). Calibrate with representative data. Measure accuracy vs baseline.
5. Apply knowledge distillation if selected: define the teacher model (the full-size trained model), define the distillation loss (KL divergence, MSE on logits, feature matching), train the student model, and compare to baseline.
6. Apply operator fusion and graph optimization if applicable: export to ONNX or TorchScript, run optimization passes, measure latency improvement.
7. Benchmark optimized model vs original on all dimensions: accuracy, latency, memory, throughput, model size. Present as a comparison table.
8. Verify that the optimized model does not break edge cases: run the evaluation harness from the experiment on the optimized model. Check per-class/per-split breakdowns for degradation.
9. If multiple optimization techniques are applied, measure their interaction: does combining pruning + quantization yield better or worse results than either alone?
10. Document any optimizations that were attempted but abandoned, with the reason (e.g., "INT4 quantization caused >3% accuracy drop, exceeding acceptable trade-off").
11. Present the optimization results and comparison for user review.

> Soft gate: "The optimization experiments are complete. Review the accuracy/efficiency trade-offs. Anything to try or adjust?"

Continue to ./step-03-finalize.md.
