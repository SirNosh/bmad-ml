# Step 01 - Initialize

1. Load all Phase 2-4 artifacts and build a review manifest:
   - **Phase 2 (Design)**: `ai-architecture.md`, `prompt-spec.md`, `agent-behavior-spec.md`, `rag-design.md`, `guardrails-spec.md`, `tool-schemas.json`, `data-integration.md`
   - **Phase 3 (Implementation)**: Code repositories, test results, implementation decision logs
   - **Phase 4 (Deploy/Eval)**: Deployment runbooks, monitoring dashboards, evaluation reports, safety audit report, regression test results, red team report
   - For each artifact, note: exists (Y/N), last updated date, completeness status
2. Load quality gate status:
   - Which gates have been passed, which are pending, which have failed
   - Any gate overrides that were granted and their justification
   - Current gate blockers (if any)
3. Load safety audit and evaluation results:
   - Safety audit verdict (pass/conditional/fail) and open findings
   - Evaluation report: key metrics, comparison to baseline, identified risks
   - Red team report: findings, severity distribution, remediation status
   - Regression test results: pass rate, coverage, any regressions detected
4. Prepare the review checklist:
   - Architecture implementation fidelity
   - Test coverage and results
   - Safety and security posture
   - Quality gate compliance
   - Monitoring and observability readiness
   - Documentation completeness
   - Operational readiness (runbooks, on-call, escalation)
5. Identify review participants and their concerns: engineering (technical quality), product (user experience, feature completeness), security (safety posture), operations (deployment readiness).

Continue to ./step-02-build.md.
