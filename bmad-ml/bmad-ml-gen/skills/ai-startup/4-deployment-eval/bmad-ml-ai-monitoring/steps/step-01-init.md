# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract:
   - Service inventory (all deployed components that need monitoring)
   - Infrastructure topology (compute, networking, storage, external services)
   - Performance requirements (latency SLOs, availability targets, throughput requirements)
   - LLM provider details (which APIs, expected usage patterns, cost constraints)
2. Define key metrics across four categories:
   - **Latency**: Request latency (p50, p95, p99), LLM response time, vector DB query time, end-to-end user flow time
   - **Error rates**: HTTP error rates (4xx, 5xx), LLM API errors, tool execution failures, timeout rates
   - **Token usage and cost**: Tokens per request (input/output), cost per request, daily/monthly cost trends, cost per user
   - **Quality scores**: Response quality metrics (if LLM-as-judge is configured), hallucination detection rate, user feedback scores
3. Confirm monitoring stack selection:
   - Metrics collection (Prometheus, CloudWatch, Datadog, New Relic)
   - Log aggregation (ELK, CloudWatch Logs, Loki)
   - Tracing (Jaeger, Zipkin, AWS X-Ray, Datadog APM)
   - Dashboarding (Grafana, Datadog Dashboards, CloudWatch Dashboards)
   - Alerting (PagerDuty, OpsGenie, Slack webhooks)
4. Define alerting philosophy: who gets alerted, at what thresholds, escalation timeline, on-call rotation if applicable.

Continue to ./step-02-build.md.
