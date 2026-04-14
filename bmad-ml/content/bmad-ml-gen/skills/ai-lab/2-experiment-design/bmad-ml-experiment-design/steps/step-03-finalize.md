# Step 03 - Finalize and Route

1. Validate design coherence: every arm must test the stated hypothesis, every metric must relate to the success criteria, and every baseline must be justified.
2. Verify the statistical plan is adequate: confirm the number of seeds provides sufficient statistical power for the chosen test.
3. Cross-check the design against the problem formulation: ensure the experiment can actually confirm or reject the hypothesis.
4. Cross-check the design against the feasibility study: ensure the compute and timeline estimates are within the assessed feasible range.
5. Produce the final experiment-design.md artifact with all sections: arms, baselines, controls, metrics, splits, reproducibility, compute estimate, and timeline.
6. Update iteration history with the date, design version, mode, and rationale.
7. Prepare handoff notes for the architecture and implementation workflows: list design decisions that constrain architecture choices.
8. If evaluation criteria need further refinement, flag for the evaluation-criteria workflow.
9. Present the completed experiment design for user approval.

**Deliverables:** experiment-design.md (with arms, baselines, controls, metrics, splits, reproducibility plan, compute estimate, and timeline).

**Recommended next workflow:** `bmad-ml-evaluation-criteria` (to define detailed metrics and statistical tests) or `bmad-ml-model-architecture` (if evaluation criteria are already established).

> Quality check: Verify that (a) each arm is justified, (b) statistical plan matches seed count, (c) compute estimate fits budget, and (d) handoff notes are actionable.
