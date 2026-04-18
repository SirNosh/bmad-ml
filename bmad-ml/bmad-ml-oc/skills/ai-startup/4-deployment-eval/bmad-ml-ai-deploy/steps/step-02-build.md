# Step 02 - Build

1. Define preconditions and environment checklist:
   - Infrastructure provisioned and healthy (compute, networking, storage)
   - External dependencies reachable (LLM APIs, databases, vector stores)
   - Secrets populated in secrets manager for target environment
   - DNS records configured (if new deployment) or verified (if update)
   - SSL certificates valid and not expiring within deployment window

2. Configure the deployment pipeline:
   - **Docker**: Write or update Dockerfiles for each service, configure multi-stage builds, optimize image size, set health check commands
   - **Kubernetes**: Write or update manifests (Deployments, Services, Ingress, ConfigMaps, Secrets references), configure resource requests/limits, set pod disruption budgets
   - **Serverless** (if applicable): Configure function definitions, memory/timeout settings, cold start mitigation, API Gateway routes
   - Pin all image tags to specific versions (no `latest` tags in production)

3. Set up secrets management:
   - Map each service's required secrets to secrets manager paths
   - Configure secret injection method (environment variables, mounted volumes, sidecar)
   - Verify secret rotation policy is in place for API keys and credentials
   - Ensure no secrets are hardcoded in configuration or container images

4. Define rollout strategy:
   - **Blue-green**: Provision parallel environment, switch traffic via load balancer, keep old environment for instant rollback
   - **Canary**: Define canary percentage (start at 5-10%), define promotion criteria (error rate, latency), define auto-rollback triggers
   - **Rolling**: Define max surge and max unavailable, configure readiness gates
   - Document the specific strategy chosen and its parameters

5. Implement smoke tests:
   - Define smoke test suite: health endpoints, critical API paths, LLM response verification, end-to-end user flow
   - Configure smoke tests to run automatically post-deployment
   - Define pass/fail criteria: all smoke tests must pass within 5 minutes of deployment
   - Include LLM-specific smoke tests: model responds, response format correct, token usage within expected range

6. Define rollback procedure:
   - Step-by-step rollback instructions (not just "revert" -- specific commands and verifications)
   - Rollback triggers: automatic (error rate > X%, latency > Y ms) and manual (operator decision)
   - Data rollback considerations: are database migrations reversible? Are vector store changes reversible?
   - Post-rollback verification: confirm previous version is serving, confirm data integrity

7. Set up monitoring hooks:
   - Deployment event markers in monitoring system (annotate dashboards with deploy timestamps)
   - Post-deploy metric comparison: automated check of key metrics vs pre-deploy baseline
   - Alert suppression during deployment window (if applicable) with auto-resume after
   - Deployment notification to team channels (Slack, email, PagerDuty)

Continue to ./step-03-finalize.md.
