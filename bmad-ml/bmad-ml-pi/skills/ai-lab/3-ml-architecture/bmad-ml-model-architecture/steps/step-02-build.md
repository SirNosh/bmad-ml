# Step 02 - Build and Analyze

1. For each candidate architecture, define the layer structure: input embedding, encoder/decoder blocks, attention mechanisms, feed-forward layers, normalization, output head.
2. Specify dimensions for all layers: hidden size, intermediate size, number of heads, number of layers, vocabulary size (if applicable). Justify each choice with reference to the literature or compute constraints.
3. Estimate parameter count for each candidate. Break down by component (embedding, attention, FFN, output) to identify where parameters are concentrated.
4. Estimate FLOPs per forward pass and per training step. Compare against compute budget to determine maximum trainable epochs.
5. Document trade-offs between candidates: accuracy vs efficiency vs implementation complexity vs debugging difficulty. Use a comparison matrix.
6. Create Architecture Decision Records (ADRs) for each major design choice: state the decision, the alternatives considered, the rationale, and the consequences.
7. Define inference requirements: expected batch size, latency target per sample, memory footprint at inference time, and whether quantization is planned.
8. If using a pre-trained backbone, specify the exact checkpoint (model name, version, source) and the fine-tuning strategy (full, LoRA, adapter, head-only).
9. Define the model's input/output contract precisely: tensor shapes, dtypes, and any preprocessing/postprocessing the model expects.
10. Identify potential failure modes of the architecture: vanishing gradients, attention collapse, mode collapse, degenerate outputs.
11. Select the recommended architecture and present the full specification with ADRs for user review.

> Soft gate: "The architecture specification and ADRs are ready. Review the design, parameter estimates, and trade-offs. Anything to change?"

Continue to ./step-03-finalize.md.
