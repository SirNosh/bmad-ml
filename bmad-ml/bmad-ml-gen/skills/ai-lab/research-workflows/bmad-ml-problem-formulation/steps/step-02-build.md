# Step 02 - Build and Analyze

1. Define the problem statement precisely: specify the input space (what the model receives), output space (what the model produces), and the objective function (what the model optimizes).
2. State the primary hypothesis in falsifiable form: "We hypothesize that [method/approach] applied to [data] will achieve [metric] >= [threshold] because [rationale]."
3. Define the null hypothesis: what result would indicate the approach does NOT work? Be specific about the threshold.
4. Identify confounding variables: factors that could influence results but are not the variable of interest. Plan how each will be controlled or measured.
5. Define success criteria at multiple levels: minimum viable (the approach works at all), target (competitive with baselines), stretch (state-of-the-art or beyond).
6. Map the problem formulation to evaluation metrics: which metrics directly measure the stated objective? Which are proxies? Document the mapping.
7. Identify assumptions embedded in the problem formulation and assess their validity. Flag any assumption that is unverified and critical.
8. Define the relationship between the ML problem and the domain problem: how does model performance translate to domain-level impact?
9. Ensure the problem formulation is compatible with the available data (from dataset-discovery) and compute resources (from feasibility-study).
10. Document any ethical considerations specific to this problem formulation: potential for harm, bias amplification, misuse scenarios.
11. Present the complete problem formulation for user review.

> Soft gate: "The problem statement, hypotheses, and success criteria are drafted. Anything to revise before I finalize?"

Continue to ./step-03-finalize.md.
