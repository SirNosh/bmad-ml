# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract:
   - Repository structure (monorepo vs multi-repo, service boundaries)
   - Deployable artifacts (containers, serverless functions, model artifacts)
   - Test requirements (unit, integration, end-to-end, performance benchmarks)
   - Environment promotion path (dev -> staging -> production)
2. Inventory CI/CD requirements specific to AI/LLM applications:
   - **Code tests**: Standard unit/integration tests, type checking, linting
   - **Prompt regression**: Test suite that validates prompt changes do not degrade output quality
   - **Model evaluation**: Benchmark pipeline that runs on model updates (fine-tuned models, embedding model changes)
   - **Artifact management**: Container image builds, model artifact versioning, prompt version tracking
3. Confirm CI/CD platform and access:
   - Platform (GitHub Actions, GitLab CI, Jenkins, CircleCI, AWS CodePipeline)
   - Repository access and webhook configuration verified
   - Runner/worker availability (self-hosted GPU runners needed for model evaluation?)
   - Secrets available in CI/CD (API keys for LLM testing, cloud credentials for deployment)
4. Define pipeline triggers:
   - On push to feature branch: code quality pipeline
   - On pull request to main: code quality + prompt regression pipeline
   - On merge to main: full pipeline including deployment to staging
   - On model update (manual or scheduled): model evaluation pipeline
   - On release tag: production deployment pipeline

Continue to ./step-02-build.md.
