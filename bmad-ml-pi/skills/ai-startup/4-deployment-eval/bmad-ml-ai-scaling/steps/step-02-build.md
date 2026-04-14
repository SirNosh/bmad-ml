# Step 02 - Build

1. Analyze current bottlenecks with data:
   - Profile request lifecycle: measure time spent in each stage (input processing, LLM call, post-processing, retrieval, response formatting)
   - Identify the dominant bottleneck: which stage consumes the most time under load?
   - Identify resource saturation points: at what QPS does each resource (CPU, GPU, memory, connections) hit 80% utilization?
   - Map external dependency limits: LLM provider rate limits (tokens/min, requests/min), database connection pool limits, vector DB query throughput limits

2. Design horizontal scaling strategy:
   - **Application replicas**: Define minimum and maximum replica count, load balancing algorithm (round-robin, least-connections, weighted)
   - **LLM inference**: Multiple model server instances behind load balancer, or multi-provider routing to distribute across API providers
   - **Vector DB**: Read replicas for query-heavy workloads, sharding for large indexes
   - **Queue-based decoupling**: Introduce request queues between services to absorb traffic spikes and enable independent scaling
   - Define per-service scaling dimensions (CPU-based, memory-based, queue-depth-based, custom metric-based)

3. Design vertical scaling strategy:
   - **GPU upgrade path**: Current GPU -> next tier (e.g., T4 -> A10 -> A100 -> H100), expected throughput improvement per tier
   - **Batching optimization**: Implement dynamic batching for inference (group requests, process as batch, distribute results), configure batch window and max batch size
   - **Response caching**: Implement semantic caching (cache similar queries' responses), define cache TTL and invalidation strategy, estimate cache hit rate and cost savings
   - **Model optimization**: Quantization (INT8, INT4), distillation to smaller model, ONNX/TensorRT conversion for inference speedup

4. Implement request batching and queuing:
   - Design request queue with priority levels (real-time user requests > batch processing > background tasks)
   - Implement dynamic batching: accumulate requests for N ms or until batch size reached, then process as batch
   - Add queue depth monitoring and back-pressure: reject or queue requests when system is overloaded
   - Implement request timeout with graceful degradation (return cached response or simplified response if processing takes too long)

5. Configure auto-scaling rules:
   - Define scaling triggers per service:
     - Scale up: CPU > 70% for 2 minutes, OR queue depth > 100, OR latency p95 > SLO threshold
     - Scale down: CPU < 30% for 10 minutes, AND queue depth < 10, AND latency p95 < 50% of SLO
   - Set cooldown periods (scale-up: 2 min, scale-down: 10 min) to prevent thrashing
   - Configure maximum scale limit to enforce cost ceiling
   - Test scaling behavior: simulate load increase and verify scale-up triggers, then reduce load and verify scale-down

6. Plan cost optimization:
   - **Spot/preemptible instances**: Identify stateless services that can tolerate interruption, configure fallback to on-demand
   - **Model distillation**: For high-volume, lower-complexity requests, route to smaller/cheaper model
   - **Caching ROI**: Estimate cache hit rate and calculate cost savings (avoided LLM API calls)
   - **Reserved capacity**: For predictable baseline load, use reserved instances or committed use discounts
   - Produce cost model: cost per request at current scale, at target scale, with each optimization applied

Continue to ./step-03-finalize.md.
