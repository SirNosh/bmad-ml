---
artifact: deployment-runbook
created: 2026-04-07
---

# Deployment Runbook

## Preconditions and Quality Gates

> **Purpose:** Ensure that every prerequisite is satisfied before deployment begins. A failed precondition discovered mid-deployment causes aborted rollouts and unnecessary risk.
> **Guidance:** Work through this checklist sequentially. Every item must be checked before proceeding to the rollout. If any item fails, stop and resolve before continuing.

### Pre-Deployment Checklist

| # | Precondition | Status | Verified By | Date |
|---|---|---|---|---|
| 1 | {All automated tests passing on the release branch} | {Pass / Fail / N/A} | {} | {} |
| 2 | {AI evaluation report meets all quality gates (link to report)} | {Pass / Fail / N/A} | {} | {} |
| 3 | {Safety audit completed with no open Critical or High findings (link to audit)} | {Pass / Fail / N/A} | {} | {} |
| 4 | {Stakeholder approval obtained (product owner, engineering lead)} | {Pass / Fail / N/A} | {} | {} |
| 5 | {Rollback procedure tested in staging environment} | {Pass / Fail / N/A} | {} | {} |
| 6 | {Monitoring dashboards and alerts configured and verified} | {Pass / Fail / N/A} | {} | {} |
| 7 | {On-call rotation confirmed for deployment window} | {Pass / Fail / N/A} | {} | {} |

---

## Environment and Secrets Checklist

> **Purpose:** Verify that all environment variables, secrets, and configuration values are present and correctly set in the target environment. Missing secrets are the #1 cause of deployment failures.
> **Guidance:** List every secret and configuration value the system requires. For each, specify the source (vault, environment variable, config file), the rotation schedule, and whether it has been verified in the target environment.

### Secrets and Configuration

| Secret / Config | Source | Rotation Schedule | Verified in Target? |
|---|---|---|---|
| {LLM_API_KEY} | {Vault: secrets/ai/llm-api-key} | {90 days} | {Yes / No} |
| {VECTOR_DB_URL} | {Environment variable} | {N/A -- infrastructure URL} | {Yes / No} |
| {DATABASE_URL} | {Vault: secrets/ai/database-url} | {Annual} | {Yes / No} |
| {SENTRY_DSN} | {Environment variable} | {N/A} | {Yes / No} |
| | | | |

### Environment Variables

| Variable | Description | Required? | Default |
|---|---|---|---|
| {APP_ENV} | {Deployment environment: staging / production} | {Yes} | {None} |
| {LOG_LEVEL} | {Logging verbosity} | {No} | {INFO} |
| {MAX_CONCURRENT_REQUESTS} | {Concurrency limit for inference} | {No} | {50} |
| {CACHE_TTL_SECONDS} | {Response cache time-to-live} | {No} | {3600} |
| | | | |

---

## Rollout Plan

> **Purpose:** Define the exact sequence of steps to deploy the system, with checkpoints and decision points. A well-defined rollout plan reduces human error and makes the deployment auditable.
> **Guidance:** Follow the steps in order. Each step includes the command or action, the expected outcome, and the decision criteria for proceeding to the next step. Choose a rollout strategy appropriate for the risk level.

### Rollout Strategy

- **Strategy:** {Blue-green / Canary / Rolling / Direct cutover}
- **Justification:** {e.g., Canary -- allows us to validate with 5% of traffic before full rollout}
- **Rollout window:** {e.g., Tuesday 14:00-16:00 UTC (lowest traffic period)}

### Step-by-Step Rollout

| Step | Action | Expected Outcome | Decision Criteria to Proceed |
|---|---|---|---|
| 1 | {Build release artifact: `make build VERSION=v1.2.0`} | {Docker image built and pushed to registry} | {Build succeeds, image passes vulnerability scan} |
| 2 | {Deploy to staging: `make deploy ENV=staging`} | {Staging environment running v1.2.0} | {Health check returns 200} |
| 3 | {Run smoke tests against staging} | {All smoke tests pass (see Verification section)} | {100% pass rate} |
| 4 | {Deploy canary: route 5% of production traffic to v1.2.0} | {Canary instance serving traffic} | {Error rate < 0.5% for 15 minutes} |
| 5 | {Expand to 25% traffic} | {25% of traffic on v1.2.0} | {Error rate < 0.5%, latency P95 < 3s for 15 minutes} |
| 6 | {Expand to 100% traffic} | {Full production on v1.2.0} | {Error rate < 0.5%, latency P95 < 3s for 30 minutes} |
| 7 | {Decommission old version} | {Previous version instances terminated} | {No traffic routed to old version for 1 hour} |

---

## Verification and Smoke Tests

> **Purpose:** Verify that the deployed system is functioning correctly before and after traffic is routed to it.
> **Guidance:** Run these tests after each deployment stage (staging, canary, full). Record actual results next to expected results. If any test fails, halt the rollout and consult the rollback procedure.

### Smoke Test Table

| Test | Description | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| {Health check} | {GET /health returns 200} | {200 OK, body: {"status": "healthy"}} | {} | {} |
| {Basic query} | {POST /v1/chat with "What is the refund policy?"} | {Response with correct answer and citation} | {} | {} |
| {Guardrail test} | {POST /v1/chat with known injection prompt} | {Request blocked, 400 response} | {} | {} |
| {Latency check} | {10 sequential queries, measure P95} | {P95 < 3 seconds} | {} | {} |
| {Error handling} | {POST /v1/chat with empty message body} | {400 Bad Request with descriptive error} | {} | {} |
| | | | | |

### Post-Deployment Validation

- {Verify monitoring dashboards show expected traffic patterns}
- {Check error rate in the first 30 minutes vs. baseline}
- {Confirm log aggregation is receiving logs from new instances}

---

## Monitoring and Alert Thresholds

> **Purpose:** Define the metrics to watch during and after deployment, with specific thresholds that trigger warnings or pages.
> **Guidance:** For each metric, set a warning threshold (investigate) and a critical threshold (immediate action required). Include the action to take when each threshold is breached.

### Metric Table

| Metric | Warning Threshold | Critical Threshold | Action on Warning | Action on Critical |
|---|---|---|---|---|
| {Error rate (5xx)} | {> 1%} | {> 5%} | {Investigate logs, check model API status} | {Initiate rollback} |
| {Latency P95} | {> 3s} | {> 5s} | {Check model provider latency, review caching} | {Initiate rollback} |
| {LLM API error rate} | {> 2%} | {> 10%} | {Check provider status page, test fallback} | {Switch to fallback model} |
| {Cost per request} | {> $0.05} | {> $0.10} | {Review query patterns, check for retry loops} | {Enable rate limiting, investigate root cause} |
| {Memory usage} | {> 80%} | {> 95%} | {Review for memory leaks, scale horizontally} | {Restart instances, scale horizontally} |
| {Request queue depth} | {> 100} | {> 500} | {Scale up replicas} | {Scale up replicas, enable load shedding} |
| | | | | |

### Dashboard Links

- **Primary dashboard:** {URL to Grafana/Datadog/CloudWatch dashboard}
- **LLM cost dashboard:** {URL to cost monitoring dashboard}
- **Error tracking:** {URL to Sentry/Bugsnag project}

---

## Rollback Procedure

> **Purpose:** Define the exact steps to revert to the previous version if the deployment causes issues. A fast, well-rehearsed rollback is the most important safety net.
> **Guidance:** The rollback procedure should be executable in under 15 minutes. Include both the technical steps and the communication steps. Address data migration considerations -- can the rollback happen without data loss?

### Rollback Time Target

- **Target:** {e.g., < 10 minutes from decision to fully reverted}

### Rollback Decision Criteria

{When should rollback be triggered? e.g., "Rollback if any critical alert threshold is breached for > 5 minutes, or if smoke tests fail after canary deployment."}

### Step-by-Step Rollback

| Step | Action | Expected Outcome | Verification |
|---|---|---|---|
| 1 | {Announce rollback in #deployments channel} | {Team is aware} | {Message acknowledged} |
| 2 | {Route 100% traffic to previous version: `make rollback ENV=production`} | {All traffic on previous version} | {Health check on old version returns 200} |
| 3 | {Verify error rate returns to baseline} | {Error rate < 0.5%} | {Monitoring dashboard} |
| 4 | {Terminate new version instances} | {No instances of v1.2.0 running} | {Instance list shows only previous version} |
| 5 | {Post rollback summary in #deployments} | {Team has context for incident review} | {Summary posted} |

### Data Migration Considerations

- **Database schema changes:** {Were any schema migrations run? Are they backward-compatible? If not, describe the rollback migration.}
- **Vector index changes:** {Was the vector index rebuilt? Is the old index still available? What is the recovery path?}
- **Configuration changes:** {Were any config values changed that need reverting?}

---

## Incident Response Contacts

> **Purpose:** Ensure that the right people can be reached quickly during a deployment incident.
> **Guidance:** List every role needed during incident response, with name, contact channel, and escalation path. This table should be verified as current before every deployment.

### Contact Table

| Role | Name | Primary Channel | Backup Channel | Escalation |
|---|---|---|---|---|
| {Deployment Lead} | {Name} | {Slack: #deployments} | {Phone: +1-xxx-xxx-xxxx} | {Engineering Manager} |
| {AI/ML Engineer} | {Name} | {Slack: #ai-team} | {Phone: +1-xxx-xxx-xxxx} | {AI Lead} |
| {Infrastructure On-Call} | {Name} | {PagerDuty} | {Slack: #infra-oncall} | {Infra Manager} |
| {Product Owner} | {Name} | {Slack: DM} | {Email} | {VP Product} |
| | | | | |

### Escalation Timeline

| Elapsed Time | Action |
|---|---|
| {0-5 min} | {Deployment lead investigates, consults AI engineer} |
| {5-15 min} | {If not resolved, initiate rollback} |
| {15-30 min} | {If rollback fails, escalate to infrastructure on-call and engineering manager} |
| {30+ min} | {Declare incident, activate full incident response process} |
