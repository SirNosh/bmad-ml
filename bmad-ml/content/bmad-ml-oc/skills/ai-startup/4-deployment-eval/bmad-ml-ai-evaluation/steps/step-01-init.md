# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract evaluation-relevant specifications:
   - System capabilities that need evaluation (chat quality, retrieval accuracy, tool use correctness, safety)
   - Performance baselines from architecture spec (expected accuracy, latency, quality thresholds)
   - Evaluation infrastructure requirements (GPU for inference, test datasets, evaluation tools)
2. Load `{templates}/evaluation-report-template.md` and prepare the report structure.
3. Define evaluation scope:
   - Which system components are being evaluated (full system, specific model, specific feature)
   - Evaluation type: pre-release assessment, periodic evaluation, post-incident evaluation, A/B comparison
   - Version or configuration being evaluated vs baseline version
4. Prepare test datasets:
   - **Automated test set**: Curated input/expected-output pairs with ground truth labels
   - **Edge case test set**: Inputs designed to test boundary conditions, unusual formats, adversarial inputs
   - **Domain-specific test set**: Inputs representative of real user queries in the target domain
   - Confirm dataset size is sufficient for statistical significance (minimum 100 examples per evaluation dimension)
5. Select evaluation metrics and methodology:
   - **Accuracy metrics**: Exact match, F1, BLEU, ROUGE, or domain-specific metrics
   - **Quality metrics**: Coherence, relevance, helpfulness, factual grounding (rated by LLM-as-judge or human annotators)
   - **Safety metrics**: Refusal rate on harmful inputs, PII leak rate, prompt injection success rate
   - **Performance metrics**: Latency p50/p95/p99, throughput, cost per request
   - Define scoring rubrics for subjective metrics (1-5 scale with concrete descriptions for each level)

Continue to ./step-02-build.md.
