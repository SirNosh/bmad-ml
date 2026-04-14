# Step 02 - Build

1. Review architecture implementation fidelity:
   - Compare implemented system against `ai-architecture.md`: are all specified components built?
   - Check integration contracts: do implemented APIs match specified schemas?
   - Identify deviations: list every place the implementation differs from the architecture and whether the deviation was documented and justified
   - Verdict: architecture implementation is faithful / has minor deviations / has significant gaps

2. Review test coverage and results:
   - Unit test coverage: percentage of critical modules covered, any untested critical paths
   - Integration test coverage: all component pairs tested, contract tests in place
   - End-to-end test coverage: primary user flows covered, top error scenarios covered
   - Regression test results: current pass rate, any known flaky tests, coverage gaps
   - Evaluation results: metrics vs thresholds, trend over recent evaluations
   - Verdict: test coverage is adequate / has gaps in [specific areas]

3. Review safety audit findings and remediation status:
   - List all safety audit findings with their current status (fixed, mitigated, accepted, open)
   - For fixed findings: verify the fix was tested and the finding no longer reproduces
   - For mitigated findings: verify the mitigation is in place and effective
   - For accepted findings: verify the risk acceptance was documented with appropriate authority
   - For open findings: assess whether they block release
   - Verdict: safety posture is acceptable / has open issues requiring attention

4. Review quality gate status:
   - List all gates and their current status (passed, blocked, overridden)
   - For passed gates: verify the pass was earned (not stale, based on current code/model)
   - For overridden gates: review override justification and confirm it is still valid
   - For blocked gates: assess whether the blocker can be resolved or must be accepted
   - Verdict: all gates passed / gates passed with acceptable overrides / gates have unresolved blocks

5. Review monitoring and observability readiness:
   - Confirm all specified metrics are being collected and displayed
   - Confirm alerting is configured with appropriate thresholds and escalation
   - Confirm dashboards are accessible to operations team
   - Confirm log aggregation captures all services
   - Verdict: monitoring is production-ready / needs [specific improvements]

6. Review documentation completeness:
   - API documentation: complete and current for all public APIs
   - Operational runbooks: deployment, rollback, incident response, scaling procedures documented
   - Architecture documentation: current and reflects the implemented system
   - User-facing documentation (if applicable): accurate and covers all features
   - Verdict: documentation is complete / missing [specific documents]

7. Produce overall verdict:
   - **Approved**: All review areas pass, all quality gates met, safety posture acceptable, ready for the target audience
   - **Changes requested**: Mostly ready, but specific items must be addressed before release (list each item with severity and owner)
   - **Blocked**: Critical issues prevent release (list blocking issues and required remediation)

Continue to ./step-03-finalize.md.
