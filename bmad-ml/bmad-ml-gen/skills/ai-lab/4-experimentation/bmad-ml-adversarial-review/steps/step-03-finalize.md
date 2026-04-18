# Step 03 - Finalize and Route

1. Rate each claim: **Survived** (claim withstands adversarial scrutiny), **Weakened** (claim has identified vulnerabilities but is not invalidated), or **Invalidated** (evidence does not support the claim).
2. For Weakened claims: specify what additional evidence would be needed to strengthen or resolve the claim.
3. For Invalidated claims: explain clearly why the evidence is insufficient and recommend whether to revise the claim, run additional experiments, or retract.
4. Produce the adversarial-review.md artifact with: claim list, challenge for each claim, evidence assessment, alternative explanations, and verdict.
5. Assess the overall report integrity: if multiple claims are Weakened or Invalidated, the overall conclusions may need to be revised.
6. Update iteration history with the date, claims reviewed, and verdict distribution.
7. Recommend specific follow-up actions: additional experiments, stronger baselines, more rigorous statistical analysis, or revised claims.
8. Present the completed adversarial review for user approval.

**Deliverables:** adversarial-review.md (with claim list, challenges, evidence assessment, alternative explanations, and verdicts: Survived / Weakened / Invalidated).

**Recommended next workflow:** Address weaknesses via `bmad-ml-experiment-design` (for additional experiments) or `bmad-ml-lab-meeting` (for strategic decisions on invalidated claims).

> Quality check: Verify that (a) every claim is rated, (b) alternative explanations are specific and testable, (c) Weakened claims have clear resolution paths, and (d) the review is thorough but fair -- not dismissive of valid evidence.
