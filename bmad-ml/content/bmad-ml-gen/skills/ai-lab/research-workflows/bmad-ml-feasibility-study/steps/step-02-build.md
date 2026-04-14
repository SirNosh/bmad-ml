# Step 02 - Build and Analyze

1. **Technical feasibility**: Is the problem solvable with current ML methods? What is the state-of-the-art performance? What is the gap between SOTA and the required threshold? Rate: High / Medium / Low risk.
2. **Data feasibility**: Do suitable datasets exist or can they be constructed? Is the data sufficient in size, quality, and diversity? Are there labeling requirements that could bottleneck progress? Rate: High / Medium / Low risk.
3. **Compute feasibility**: Estimate training compute (GPU hours) based on model size, dataset size, and expected number of experiments. Compare against budget. Include buffer for failed runs and hyperparameter search. Rate: High / Medium / Low risk.
4. **Timeline feasibility**: Estimate time for each phase (data prep, development, training, evaluation, iteration). Compare against deadline. Identify critical path and parallelizable tasks. Rate: High / Medium / Low risk.
5. **Organizational feasibility**: Does the team have the required expertise? Are dependencies on other teams or external resources manageable? Rate: High / Medium / Low risk.
6. For each Medium or High risk dimension, identify specific mitigation strategies: alternative approaches, fallback plans, resource acquisition paths.
7. Identify "kill criteria" -- conditions under which the project should be abandoned rather than continued (e.g., "if baseline performance is below X after Y GPU-hours, pivot").
8. Cross-reference feasibility findings against the literature review: does the literature support or contradict the feasibility assessment?
9. Compute an overall feasibility score and classify: Green (proceed), Yellow (proceed with caution and mitigations), Red (do not proceed without resolving blockers).
10. Present the dimension-by-dimension assessment and overall verdict to the user.

> Soft gate: "The feasibility assessment is complete. Any dimensions to re-evaluate or mitigations to discuss?"

Continue to ./step-03-finalize.md.
