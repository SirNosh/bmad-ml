# Step 01 - Initialize

1. Load experiment-design.md and literature-review.md. Understand the problem constraints, chosen approach, and relevant prior architectures.
2. Confirm design constraints: parameter budget (max model size), inference latency requirement, memory ceiling (GPU VRAM), and any deployment constraints (mobile, edge, server).
3. Identify architectural candidates from the literature review: which model families are relevant (Transformer, CNN, RNN, hybrid, etc.)?
4. Load feasibility study compute estimates to verify architecture candidates are within budget.
5. Check if pre-trained models or checkpoints are available for the candidate architectures -- fine-tuning is typically more efficient than training from scratch.
6. Identify architectural decisions that need to be made: attention mechanism, normalization strategy, activation functions, embedding approach, output head design.
7. Check iteration history -- if this is an architecture revision, load the previous architecture and ADRs. Identify what prompted the revision.
8. Present the architectural candidates, constraints, and key decisions to the user.

9. If operating in autonomous mode (invoked by Nosh), select the candidate with best feasibility-to-capability ratio and skip the confirmation gate.

> Soft gate: "Here are the architectural candidates and design constraints. Any preferences or additional constraints before I design the architecture?"

Continue to ./step-02-build.md.
