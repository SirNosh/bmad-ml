# Step 02 - Build

1. Set up infrastructure metrics:
   - **Compute**: CPU utilization, GPU utilization and memory, system memory usage, disk I/O and usage
   - **Networking**: Request throughput, bandwidth usage, connection pool utilization, DNS resolution time
   - **Containers/Pods**: Container restart count, OOM kill events, pod scheduling latency, resource limit saturation
   - Configure collection interval (15-30 seconds for infrastructure metrics)

2. Set up application metrics:
   - **Request latency**: Histogram with buckets at p50, p90, p95, p99, segmented by endpoint and method
   - **Error rates**: Counter by error type (4xx, 5xx, timeout, circuit-breaker-open), segmented by service and endpoint
   - **Throughput**: Requests per second by endpoint, concurrent request gauge
   - **Session metrics**: Active sessions, session duration distribution, conversation length distribution
   - Instrument application code with metric emission at key points (request start/end, error catch, external call)

3. Set up LLM-specific metrics:
   - **Token throughput**: Input tokens/request, output tokens/request, tokens per second (generation speed)
   - **Cost tracking**: Cost per request (input tokens * input price + output tokens * output price), daily cumulative cost, cost by model and by feature
   - **Model routing**: Request distribution across models, fallback activation count, model-specific latency and error rates
   - **Rate limiting**: Requests approaching rate limit, rate limit hits, backoff duration distribution
   - **Content filtering**: Content filter trigger count by category, blocked request rate

4. Set up quality metrics:
   - **Response quality**: LLM-as-judge scores (if configured), response length distribution, format compliance rate
   - **Hallucination tracking**: Factual grounding score (if RAG), citation accuracy, contradicts-source-material rate
   - **Retrieval quality**: Retrieval relevance scores, empty retrieval rate, retrieval latency
   - **User feedback**: Thumbs up/down ratio, explicit feedback scores, conversation completion rate

5. Configure alerting thresholds and escalation:
   - **Critical** (page immediately): Service down, error rate > 10%, LLM API unreachable, cost spike > 3x daily average
   - **Warning** (notify channel): Latency p95 > SLO, error rate > 2%, cost trending above monthly budget, quality score degradation > 15%
   - **Info** (dashboard only): Latency increase > 20%, token usage increase > 50%, model fallback activated
   - Configure escalation: warning unacknowledged for 30 min -> critical, critical unacknowledged for 15 min -> escalate to secondary
   - Implement alert deduplication and grouping to prevent alert fatigue

6. Build dashboards:
   - **Operations dashboard**: Service health, error rates, latency, throughput -- the "at a glance" view
   - **LLM performance dashboard**: Model latency, token usage, cost tracking, rate limit status, model routing distribution
   - **Quality dashboard**: Response quality trends, hallucination rates, retrieval quality, user feedback
   - **Cost dashboard**: Real-time cost tracking, cost by model, cost projections, budget burn rate
   - Each dashboard should have a time range selector and auto-refresh enabled

Continue to ./step-03-finalize.md.
