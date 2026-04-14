# Step 01 - Initialize

1. Define the feasibility question precisely: what capability or result are we trying to determine is achievable?
2. Document hard constraints: compute budget (GPU hours, cloud spend cap), timeline (weeks/months to deliver), data availability (existing vs needs collection), team expertise.
3. Identify the key risks that could make the project infeasible -- categorize as technical, data, compute, timeline, or organizational.
4. Scan existing artifacts: load problem-formulation.md, literature-review.md, and any prior feasibility assessments for context.
5. Define what "feasible" means quantitatively: what minimum performance threshold must be met? What maximum resource expenditure is acceptable?
6. Identify comparable prior work: have similar problems been solved before? At what cost and timeline?
7. Set the feasibility dimensions to assess: technical, data, compute, timeline, and any domain-specific dimensions.
8. Confirm the feasibility question, constraints, and assessment dimensions with the user.

9. If operating in autonomous mode (invoked by Nosh), derive scope from existing artifacts (experiment-design.md, model-architecture.md) and skip the confirmation gate.

> Soft gate: "Here is the feasibility assessment scope. Anything to add or adjust before I begin the analysis?"

Continue to ./step-02-build.md.
