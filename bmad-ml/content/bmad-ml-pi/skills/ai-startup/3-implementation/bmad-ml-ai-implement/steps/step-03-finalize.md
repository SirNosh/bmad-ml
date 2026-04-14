# Step 03 - Finalize

1. Run the full test suite and report results:
   - Unit test results: total, passed, failed, coverage per module
   - Integration test results: all component-pair integrations verified
   - End-to-end test results: primary user flows validated
   - List any failing tests with root cause and remediation plan

2. Validate integration end-to-end:
   - Execute the primary user flow through all implemented components
   - Verify data flows correctly across component boundaries (correct formats, no data loss)
   - Verify error propagation: trigger errors at each layer and confirm proper handling upstream
   - Verify health checks report accurately for all components

3. Document deployment prerequisites:
   - Infrastructure requirements per component (compute, memory, GPU, storage)
   - External service dependencies and required credentials
   - Database migrations or schema changes needed
   - Configuration values that must be set per environment (dev, staging, production)
   - Startup order and dependency readiness requirements

4. Present results to the user:
   - Implementation summary: components built, integration points wired, test coverage
   - Test results with pass/fail breakdown
   - Architecture compliance report (deviations from spec, if any)
   - Deployment prerequisites checklist
   - Deferred items and recommended next iteration scope

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
