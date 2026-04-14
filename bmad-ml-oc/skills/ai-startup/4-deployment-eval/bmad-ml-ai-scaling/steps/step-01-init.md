# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract:
   - Current deployment topology (service instances, compute specs, geographic distribution)
   - Current and projected traffic patterns (QPS, peak hours, growth rate)
   - Performance requirements (latency SLOs, throughput targets, availability targets)
2. Load monitoring data if available:
   - Current latency metrics (p50, p95, p99) per service and endpoint
   - Current throughput (QPS) and utilization (CPU, GPU, memory) metrics
   - Current cost breakdown by service and by LLM provider
   - Historical trend data (last 30 days) to identify growth patterns
3. Define scaling objectives:
   - **Target QPS**: Current peak QPS, target peak QPS (e.g., 10x current for launch)
   - **Latency SLO**: p50 < X ms, p95 < Y ms, p99 < Z ms under target load
   - **Cost ceiling**: Maximum acceptable monthly infrastructure cost, maximum cost per request
   - **Availability target**: 99.9%, 99.95%, or 99.99% uptime
4. Identify current bottleneck candidates:
   - GPU compute (model inference time)
   - Memory (model loading, context window size, embedding cache)
   - Network (API call latency to LLM providers, inter-service communication)
   - Storage (vector DB size, log volume, model artifact storage)
   - External dependencies (LLM provider rate limits, database connection limits)

Continue to ./step-02-build.md.
