# Step 03 - Finalize

1. Produce the overall readiness verdict:
   - **PASS:** all six areas scored PASS. The system design is ready to move into implementation.
   - **CONCERNS:** one or more areas scored CONCERNS but none scored FAIL. Implementation can proceed with documented risks and a plan to address concerns during development.
   - **FAIL:** one or more areas scored FAIL. Implementation should NOT proceed until blockers are resolved.
2. List all blockers (items causing FAIL scores):
   - For each blocker: describe the gap, which artifact needs revision, and the recommended remediation.
3. List all concerns (items causing CONCERNS scores):
   - For each concern: describe the risk, its potential impact on implementation, and the recommended mitigation.
4. Summarize recommendations:
   - Which Phase 2 workflows should be re-run to address gaps.
   - Any new information or decisions needed from stakeholders.
   - Suggested priority order for addressing blockers and concerns.
5. Save the completed artifact to `{planning_artifacts}/ai-readiness-check.md`.
6. Present the readiness assessment to the user. Include:
   - Scorecard table (area, score, key finding).
   - Blocker list with remediation steps.
   - Concern list with mitigations.
   - Overall verdict and recommendation.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
