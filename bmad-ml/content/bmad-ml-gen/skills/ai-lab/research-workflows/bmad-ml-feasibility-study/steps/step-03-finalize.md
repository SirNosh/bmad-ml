# Step 03 - Finalize and Route

1. Produce the risk matrix: a table of dimensions x risk levels with mitigation strategies for each non-Low item.
2. State the go/no-go recommendation clearly with conditions: "Proceed" / "Proceed with conditions" / "Do not proceed."
3. If "Proceed with conditions," list each condition explicitly and define the checkpoint at which it must be resolved.
4. Document kill criteria and the decision process for invoking them.
5. Update iteration history with the date, feasibility verdict, key risks, and recommended mitigations.
6. If the verdict is "Proceed," identify the next workflow to activate (typically experiment-design or dataset-discovery).
7. If the verdict is "Do not proceed," document the specific blockers and what would need to change for a future reassessment.
8. Present the final feasibility-study.md artifact for user approval.

**Deliverables:** feasibility-report.md (with dimension scores, risk/mitigation matrix, kill criteria, and GO/CONDITIONAL/NO-GO verdict).

**Recommended next workflow:** `bmad-ml-experiment-design` (if GO or CONDITIONAL) or `bmad-ml-problem-formulation` (if NO-GO suggests a pivot in approach).

> Quality check: Verify that (a) all dimensions are scored, (b) mitigations exist for all Medium/High risks, (c) kill criteria are falsifiable and measurable, and (d) the verdict is explicitly stated with supporting rationale.
