# Step 03 - Finalize

1. Validate that every section in `ai-architecture.md` is complete:
   - System context and boundaries defined.
   - Model serving strategy selected with rationale.
   - RAG layer scoped (or explicitly marked as not needed).
   - Agent orchestration pattern defined (or explicitly marked as not needed).
   - Data flow mapped end-to-end.
   - Safety/guardrails layer placed in the architecture.
   - Reliability, scalability, and cost controls documented.
   - Open risks logged with owners and deadlines.
2. Cross-check the architecture against `ai-product-brief.md` constraints:
   - Confirm latency targets are achievable with the selected serving strategy.
   - Confirm cost projections fit within budget constraints.
   - Confirm all product use cases have a supporting data flow path.
3. List all integration dependencies (external APIs, databases, third-party models) with their current availability status.
4. Save the completed artifact to `{planning_artifacts}/ai-architecture.md`.
5. Present the architecture document to the user for review. Summarize:
   - Key architectural decisions and their trade-offs.
   - Open risks and items needing resolution.
   - Recommended next workflows (RAG Pipeline, Agent System, AI Readiness Check, AI Sprint Planning).

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
