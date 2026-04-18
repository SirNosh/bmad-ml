# Step 03 - Finalize and Route

1. Document findings concisely: question asked, approach taken, result obtained, and wall-clock time spent.
2. State the decision: **Promote** (results are promising, design a full experiment), **Park** (results are inconclusive, revisit later), or **Drop** (results are negative, do not pursue).
3. If Promote: note what the full experiment should do differently (more seeds, stronger baselines, proper evaluation, hyperparameter search).
4. If Park: note what additional information or resources would be needed to revisit.
5. If Drop: note why the direction is not worth pursuing, to avoid repeating the exploration.
6. Save the quick experiment results in a lightweight format (e.g., a few paragraphs in a lab notebook, not a full report).
7. Update experiment-tracking status if applicable: log the quick experiment as completed with its verdict.
8. Present the findings and recommendation for user review.

**Deliverables:** Quick experiment results (lightweight lab notebook entry with question, approach, result, and verdict: Promote / Park / Drop).

**Recommended next workflow:** `bmad-ml-experiment-design` (if Promote) or `bmad-ml-experiment-tracking` (to log the result).

> Quality check: Verify that (a) the question was actually answered, (b) results are not artifacts of bugs, and (c) the promote/park/drop decision is justified.
