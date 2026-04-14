# Step 01 - Initialize

1. Gather domain context: what is the real-world problem being addressed? Who are the stakeholders? What does success look like in domain terms (not ML terms)?
2. Identify candidate problem framings: could this be approached as classification, regression, ranking, generation, detection, clustering, or a combination? List at least 2 alternatives.
3. Collect unresolved questions from existing artifacts: load literature-review.md, any prior problem statements, and domain documentation.
4. Define scope boundaries explicitly: what is IN scope (must be addressed) and what is OUT of scope (explicitly excluded). Document the rationale for each boundary.
5. Identify stakeholder requirements and constraints that must be reflected in the problem statement (latency, fairness, interpretability, deployment environment).
6. Review comparable problem formulations from the literature review to understand how similar problems have been framed.
7. Check iteration history -- if this is a refinement pass, load the previous problem statement and identify what prompted the revision.
8. Present the candidate framings and scope boundaries to the user for initial alignment.

9. If operating in autonomous mode (invoked by Nosh), select the framing with strongest literature support and skip the confirmation gate.

> Soft gate: "Here are the candidate problem framings and scope boundaries. Which framing should I develop, or would you like to adjust the scope?"

Continue to ./step-02-build.md.
