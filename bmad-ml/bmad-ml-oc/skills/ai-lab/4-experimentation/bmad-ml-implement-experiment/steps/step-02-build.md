# Step 02 - Build and Analyze

1. Implement the model architecture from the architecture spec: translate the layer specification into PyTorch nn.Module code. Verify parameter count matches the estimate.
2. Implement the data pipeline from the design: dataset class, transforms, data loader with the specified configuration (workers, batch size, shuffle, prefetch).
3. Implement the training loop from the pipeline spec: optimizer initialization, learning rate scheduler, gradient clipping, mixed precision context, checkpointing, and logging.
4. Implement the evaluation harness from the evaluation criteria: metric computation functions, per-split evaluation, statistical test utilities, and result reporting.
5. Integrate experiment tracking: log hyperparameters at start, log metrics at the specified frequency, log final results at completion, and save config for reproducibility.
6. Write tests for critical components: data loading (verify shapes, dtypes, batch sizes), model forward pass (verify output shapes, no NaN/Inf), metric computation (verify against known values), and checkpoint save/load (verify state roundtrips).
7. Verify reproducibility: run the same configuration with the same seed twice and confirm identical results (or document known sources of non-determinism).
8. Run a short smoke test (1-2 training steps) to verify the full pipeline executes without errors: data loads, model trains, metrics are logged, checkpoint saves.
9. Profile memory usage during the smoke test: verify the training fits within GPU VRAM with the specified batch size.
10. Document any deviations from the specifications and why they were necessary.
11. Present the implementation, test results, and smoke test output for user review.

> Soft gate: "Implementation is complete. Review the code, test results, and smoke test. Anything to fix before full training?"

Continue to ./step-03-finalize.md.
