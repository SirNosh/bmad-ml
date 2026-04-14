# Step 01 - Initialize

1. Load evaluation criteria from `{planning_artifacts}/ai-architecture.md`:
   - System quality requirements (accuracy, latency, safety thresholds)
   - User experience requirements (response quality, helpfulness, tone)
   - Business requirements (cost per interaction, throughput, availability)
2. Load `{planning_artifacts}/ai-product-brief.md` for:
   - Target user persona and their quality expectations
   - Core use cases that evaluation must cover
   - Success metrics defined at the product level
3. Survey available evaluation tools and methods:
   - **Automated evaluation**: LLM-as-judge frameworks (OpenAI Evals, RAGAS, DeepEval, custom), metric computation libraries
   - **Human evaluation**: Annotation platforms (Label Studio, Argilla, Scale AI, internal tooling), annotator sourcing
   - **Benchmark suites**: Domain-specific benchmarks, industry-standard benchmarks (MMLU, HumanEval, MT-Bench)
   - **Monitoring-integrated evaluation**: Online evaluation from production traffic (sampling, shadow evaluation)
4. Define framework requirements:
   - Must cover all quality dimensions defined in the architecture spec
   - Must support both automated (fast, cheap, repeatable) and human (nuanced, ground-truth) evaluation
   - Must produce comparable results across evaluation runs (versioned datasets, deterministic scoring where possible)
   - Must integrate with CI/CD for automated regression detection
   - Must produce actionable reports (not just scores, but failure analysis and improvement recommendations)
5. Define constraints: evaluation budget (API costs for LLM-as-judge, annotator costs for human eval), evaluation cadence (per-commit, per-release, weekly, monthly), and turnaround time requirements.

Continue to ./step-02-build.md.
