# Step 02 - Build

1. Configure code quality pipeline:
   - **Linting**: Configure linter (ruff, flake8, eslint) with project-specific rules, fail on violations
   - **Type checking**: Configure type checker (mypy, pyright, tsc) with strict mode for critical modules
   - **Unit tests**: Run full unit test suite, report coverage, fail if coverage drops below threshold
   - **Integration tests**: Run integration tests with mocked external services (LLM APIs, databases)
   - Set timeout for this pipeline stage (target: under 10 minutes)

2. Configure prompt regression pipeline:
   - Load prompt test suite: input/expected-output pairs for each prompt template
   - Run each test case through the LLM with the updated prompts
   - Evaluate outputs using automated criteria (exact match, contains-keywords, LLM-as-judge scoring)
   - Compare results against baseline (previous passing test run)
   - Report: tests passed, tests failed, tests degraded (score dropped but above threshold)
   - Fail the pipeline if any critical prompt test fails or if overall score drops below threshold
   - Cache LLM responses to avoid unnecessary API costs on re-runs

3. Configure model evaluation pipeline:
   - Triggered on model artifact changes (new fine-tuned model, embedding model update)
   - Load evaluation benchmark dataset
   - Run inference with the new model and compute evaluation metrics
   - Compare against baseline metrics (previous model version)
   - Generate evaluation report (metrics table, improvement/regression by category)
   - Fail if metrics drop below minimum thresholds
   - Store evaluation results as pipeline artifacts for tracking over time

4. Configure deployment pipeline:
   - **Build**: Build container images, tag with commit SHA and semantic version
   - **Push**: Push images to container registry, run vulnerability scan on images
   - **Stage**: Deploy to staging environment, run smoke tests, run prompt regression against staging
   - **Deploy**: Deploy to production using configured rollout strategy (from deploy workflow), run production smoke tests
   - Each stage waits for the previous to succeed before proceeding

5. Add quality gates between stages:
   - Code quality gate: lint + type check + unit tests must pass before integration tests run
   - Integration gate: integration tests must pass before prompt regression runs
   - Prompt regression gate: prompt tests must pass before staging deployment
   - Staging gate: smoke tests and staging validation must pass before production deployment
   - Configure manual approval step before production deployment (optional based on team preference)

6. Document pipeline configuration:
   - Pipeline architecture diagram (stages, gates, triggers)
   - Configuration file locations and how to modify pipeline behavior
   - How to add new prompt test cases to the regression suite
   - How to update evaluation benchmarks when model evaluation criteria change
   - How to debug pipeline failures (logs, artifacts, re-run procedures)
   - Cost estimate for pipeline runs (LLM API costs for prompt regression and model evaluation)

Continue to ./step-03-finalize.md.
