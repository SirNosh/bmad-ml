# Step 02 - Build

1. Run automated evaluation:
   - Execute the automated test set through the system under evaluation
   - Compute all selected metrics against ground truth labels
   - Run benchmark suites (if applicable: MMLU, HumanEval, domain-specific benchmarks)
   - Record per-example results for detailed analysis (not just aggregates)
   - Log inference metadata: latency per request, tokens used, model version, timestamp

2. Run human evaluation (if applicable):
   - Prepare annotation guidelines with scoring rubric and examples for each score level
   - Select evaluation sample: random stratified sample from test set outputs (minimum 50 examples for meaningful results)
   - Assign to annotators: each example rated by at least 2 annotators for inter-annotator agreement
   - Collect ratings for each quality dimension (relevance, coherence, helpfulness, safety)
   - Compute inter-annotator agreement (Cohen's kappa or Krippendorff's alpha) and resolve disagreements

3. Compare against baselines and previous versions:
   - Run the same test set through the baseline system (previous version, base model, or competitor)
   - Produce side-by-side comparison table: metric by metric, current vs baseline
   - Calculate statistical significance of improvements/regressions (paired t-test, bootstrap confidence intervals)
   - Highlight metrics where current version is significantly better or worse than baseline
   - If A/B comparison: ensure same test conditions (same prompts, same temperature, same time of day if API-dependent)

4. Analyze failure cases and edge cases:
   - Filter automated results for lowest-scoring examples and categorize failure modes:
     - Factual errors (hallucination, outdated information)
     - Format violations (wrong output structure, missing required fields)
     - Safety failures (harmful content, PII leakage, prompt injection susceptibility)
     - Retrieval failures (wrong context retrieved, relevant context missed)
     - Instruction following failures (ignored constraints, missed requirements)
   - Quantify each failure category (count, percentage of total)
   - Identify patterns: do failures cluster around specific input types, topics, or complexity levels?
   - Document the top 10 most impactful failures with full input/output examples

5. Document evaluation methodology and limitations:
   - Dataset composition and potential biases (over-representation of certain topics, missing edge cases)
   - Metric limitations (automated metrics may not capture all quality dimensions)
   - Human evaluation limitations (annotator bias, small sample size, subjectivity)
   - Reproducibility notes: random seeds, model versions, API dates, temperature settings
   - Confidence intervals for all reported metrics

Continue to ./step-03-finalize.md.
