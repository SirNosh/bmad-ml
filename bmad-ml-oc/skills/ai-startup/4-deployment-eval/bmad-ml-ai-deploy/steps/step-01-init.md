# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract infrastructure specifications:
   - Target deployment environment (cloud provider, region, account/project)
   - Compute requirements per service (CPU, GPU type and count, memory, storage)
   - Networking requirements (VPC, subnets, load balancers, DNS)
   - Service dependencies (databases, vector stores, message queues, external APIs)
2. Load `{templates}/deployment-runbook-template.md` if creating a new runbook, or load an existing runbook if iterating on a previous deployment.
3. Confirm target environment and access:
   - Environment name and purpose (staging, production, canary)
   - Cloud account access verified (CLI authenticated, permissions confirmed)
   - Container registry accessible and writable
   - Secrets management system accessible (AWS Secrets Manager, Vault, GCP Secret Manager)
4. Verify quality gates passed before proceeding:
   - All unit and integration tests passing
   - Evaluation metrics meet minimum thresholds (from evaluation workflow)
   - Safety audit completed (if applicable for this release)
   - Code review approved
   - If any gate is not passed, document which gates are blocking and halt deployment preparation
5. Inventory all deployable artifacts:
   - Service containers (image names, tags, registries)
   - Configuration files (per-environment configs, feature flags)
   - Database migrations (if any)
   - Model artifacts (fine-tuned weights, embedding models, if self-hosted)
6. Confirm rollback capabilities: previous known-good deployment version, rollback procedure tested, data migration reversibility confirmed.

Continue to ./step-02-build.md.
