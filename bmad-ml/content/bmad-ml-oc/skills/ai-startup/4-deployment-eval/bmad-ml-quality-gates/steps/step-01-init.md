# Step 01 - Initialize

1. Load the evaluation framework from the eval-framework workflow output (or `{planning_artifacts}/ai-architecture.md` evaluation sections):
   - Available metrics and their measurement methods
   - Current baseline values for each metric
   - Scoring rubrics and thresholds
2. Load architecture requirements from `{planning_artifacts}/ai-architecture.md`:
   - Quality thresholds per component (accuracy, latency, safety)
   - Deployment environments and promotion path (dev -> staging -> production)
   - Compliance requirements (safety audit, security review, data privacy)
3. Define release stages and their purpose:
   - **Dev**: Developer testing, rapid iteration, no external users
   - **Staging**: Pre-production validation, mirrors production configuration, internal testers only
   - **Production**: Live user traffic, full monitoring, SLO enforcement
   - Additional stages if applicable: canary (subset of production traffic), shadow (receives production traffic but responses discarded)
4. Identify critical quality dimensions that gates must enforce:
   - **Functional quality**: Core task accuracy, output format compliance, feature completeness
   - **Safety**: Prompt injection resistance, content policy compliance, PII protection
   - **Performance**: Latency within SLO, throughput adequate, cost within budget
   - **Operational readiness**: Monitoring configured, alerts set up, runbook available, rollback tested
5. Define gate enforcement level: hard gate (blocks promotion, no override) vs soft gate (blocks promotion, override with approval) vs advisory (warns but does not block).

Continue to ./step-02-build.md.
