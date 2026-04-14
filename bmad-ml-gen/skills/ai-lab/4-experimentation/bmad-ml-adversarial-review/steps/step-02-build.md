# Step 02 - Build and Analyze

1. **Evidence sufficiency**: For each claim, assess whether the evidence is sufficient. Are there enough runs/seeds? Is the test set large enough? Is the effect size meaningful, not just statistically significant?
2. **Confounder control**: Are all confounding variables controlled? Could the result be explained by a difference in data, preprocessing, compute budget, or hyperparameter tuning effort rather than the claimed factor?
3. **Statistical rigor**: Does the statistical analysis account for multiple comparisons? Is the chosen test appropriate for the data distribution? Is the p-value threshold justified? Are confidence intervals reported?
4. **Baseline adequacy**: Are the baselines strong and fairly tuned? A weak baseline makes any approach look good. Compare baseline implementations against published reference implementations.
5. **Data artifacts**: Could the results be explained by data artifacts? Label noise, class imbalance, train/test overlap, domain-specific shortcuts (e.g., spurious correlations in the data)?
6. **Overclaiming detection**: Are results presented as stronger than the evidence supports? Look for: generalizing from a single dataset, claiming causation from correlation, extrapolating beyond the tested scope.
7. **Robustness testing**: Would the conclusions hold under perturbation? Different random seeds? Different data splits? Slightly different hyperparameters? If results are brittle, the conclusions are weakened.
8. **Reproducibility concerns**: Is there enough information to independently reproduce the results? Are all hyperparameters, data versions, and code versions specified?
9. **Alternative explanations**: For each positive result, propose at least one alternative explanation that does not require the claimed mechanism. Assess whether the experiment rules it out.
10. **Stress-test under different assumptions**: What if the data distribution shifts? What if the evaluation metric is changed? Do the conclusions survive?
11. Present all adversarial findings organized by claim, with severity and supporting evidence.

> Soft gate: "The adversarial review is complete. Review the challenges and alternative explanations. Any claims to probe further?"

Continue to ./step-03-finalize.md.
