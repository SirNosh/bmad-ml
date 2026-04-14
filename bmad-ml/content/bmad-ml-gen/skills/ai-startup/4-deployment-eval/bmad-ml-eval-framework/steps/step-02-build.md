# Step 02 - Build

1. Define evaluation dimensions with concrete metrics:
   - **Accuracy**: Task completion rate, factual correctness (grounded in source material), exact match or semantic similarity to expected output
   - **Safety**: Harmful content generation rate, PII leakage rate, prompt injection success rate, policy violation rate
   - **Latency**: Time-to-first-token, total response time, retrieval latency, end-to-end user-perceived latency
   - **Cost**: Cost per request (by model, by feature), daily/monthly cost trends, cost per successful interaction
   - **User satisfaction**: Thumbs up/down ratio, conversation completion rate, retry rate, explicit feedback scores

2. Design the metric collection pipeline:
   - Define metric sources: application logs, LLM API responses, vector DB query logs, user feedback events, monitoring system
   - Define metric computation: real-time (computed on each request) vs batch (computed periodically from stored data)
   - Define metric storage: time-series database for trending, data warehouse for detailed analysis
   - Define metric aggregation: per-request, per-session, per-user, per-feature, per-model, per-time-period
   - Implement metric versioning: when metric definitions change, track which version was used for each evaluation run

3. Design automated evaluation (LLM-as-judge and rubric-based):
   - Select judge model (should be more capable than the model being evaluated, or use consensus of multiple judges)
   - Define evaluation prompts for each dimension:
     - Relevance: "Rate how relevant the response is to the user's question on a scale of 1-5..."
     - Coherence: "Rate how coherent and well-structured the response is..."
     - Factual grounding: "Given the source documents, rate whether the response is factually supported..."
     - Safety: "Evaluate whether this response contains harmful, biased, or policy-violating content..."
   - Define rubrics with concrete examples for each score level (anchor examples for 1, 3, and 5)
   - Implement calibration: run judge on a labeled calibration set and verify agreement with human ratings
   - Implement cost controls: budget limits per evaluation run, caching for repeated evaluations

4. Design human evaluation workflow:
   - Define annotator qualifications and training requirements
   - Create annotation guidelines with: task description, scoring rubric, anchor examples, common pitfalls
   - Define sample selection strategy: random, stratified (by topic, difficulty, model), targeted (known failure areas)
   - Define inter-annotator agreement requirements (minimum 2 annotators per example, kappa > 0.6)
   - Design disagreement resolution process (third annotator, expert adjudication)
   - Define annotation pipeline: sample selection -> assignment -> annotation -> quality check -> aggregation

5. Define reporting format and cadence:
   - **Automated report** (per CI/CD run): Pass/fail summary, regression detection, metric comparison vs baseline
   - **Periodic report** (weekly/monthly): Trend analysis, quality drift detection, cost trends, top failure categories
   - **Release report** (pre-release): Comprehensive evaluation across all dimensions, go/no-go recommendation
   - Each report includes: executive summary, detailed metrics, failure analysis, comparison to previous period, recommendations
   - Define report distribution: who receives each report type, through which channel

6. Plan evaluation data management:
   - Test dataset versioning: each dataset version is immutable and tagged (v1, v2, etc.)
   - Evaluation results storage: store every evaluation result with metadata (dataset version, model version, timestamp, evaluator)
   - Data retention: how long to keep evaluation datasets and results (at least 12 months for trend analysis)
   - Privacy: ensure evaluation datasets do not contain real user PII (use synthetic or anonymized data)
   - Access control: who can view evaluation results, who can modify test datasets

Continue to ./step-03-finalize.md.
