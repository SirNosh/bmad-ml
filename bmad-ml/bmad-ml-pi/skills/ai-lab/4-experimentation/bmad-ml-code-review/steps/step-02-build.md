# Step 02 - Build and Analyze

1. **Correctness review**: Verify tensor shapes throughout the forward pass -- trace shapes from input to output and confirm dimensions match at every operation. Flag any implicit broadcasting that could mask shape errors.
2. **Correctness review**: Verify loss computation -- ensure the loss function matches the experiment design, handles edge cases (empty batches, single-class batches), and applies any specified weighting or regularization terms.
3. **Correctness review**: Verify gradient flow -- check that no layers are accidentally frozen, that detach() is not applied incorrectly, and that the computation graph connects the loss to all trainable parameters.
4. **Correctness review**: Check for data leakage -- verify that test data is never seen during training, that preprocessing statistics are computed only on training data, and that no future information leaks into past samples.
5. **Reproducibility review**: Verify seed setting -- check that seeds are set for Python random, NumPy, PyTorch (CPU and CUDA), and any data loading randomness. Verify deterministic CUDA operations if required.
6. **Reproducibility review**: Verify config versioning -- check that all hyperparameters are loaded from config files (not hardcoded) and that configs are logged to experiment tracking.
7. **Code quality review**: Check naming conventions, documentation, type hints, and modularity. Flag any function longer than 50 lines or any module with unclear responsibilities.
8. **Code quality review**: Verify test coverage -- check that tests exist for data loading, model forward pass, metric computation, and checkpoint save/load. Identify untested critical paths.
9. **Efficiency review**: Flag unnecessary tensor copies (.clone(), .cpu()/.cuda() in loops), missing GPU utilization (operations that could be batched), and potential memory leaks (tensors accumulating in lists without detach).
10. **Efficiency review**: Check data loading efficiency -- verify num_workers, pin_memory, and prefetch settings. Flag any data processing that happens in the training loop but could be pre-computed.
11. Document each finding with: file path, line reference, severity (Critical / Major / Minor / Suggestion), and recommended fix.
12. Present the categorized findings for user review.

> Soft gate: "The code review is complete. Review the findings by category. Anything to discuss or clarify?"

Continue to ./step-03-finalize.md.
