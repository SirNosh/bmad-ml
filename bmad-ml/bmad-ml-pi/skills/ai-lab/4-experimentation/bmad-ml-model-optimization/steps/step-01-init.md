# Step 01 - Initialize

1. Load results-report.md to understand current model performance and the best-performing configuration.
2. Load model-architecture.md to understand the model structure, parameter count, and inference requirements.
3. Identify optimization targets: what needs to improve? Options include inference latency, memory footprint, throughput (samples/second), model size (for deployment), or energy efficiency.
4. Define the acceptable accuracy trade-off: what is the maximum performance degradation allowed in exchange for optimization gains? Express as a specific threshold (e.g., "no more than 1% accuracy drop").
5. Identify applicable optimization techniques based on the model architecture: pruning (structured/unstructured), quantization (INT8/INT4/mixed), knowledge distillation, operator fusion, architecture search.
6. Load any deployment constraints: target hardware (GPU, CPU, mobile, edge), serving framework (TorchServe, Triton, ONNX Runtime), and latency SLA.
7. Check iteration history -- if this is a re-optimization, load prior optimization results and focus on untried techniques.
8. Present the optimization targets, acceptable trade-offs, and candidate techniques to the user.

9. If operating in autonomous mode (invoked by Nosh), prioritize the optimization target specified in the directive and skip the confirmation gate.

> Soft gate: "Here are the optimization targets and candidate techniques. Any priorities or constraints to adjust?"

Continue to ./step-02-build.md.
