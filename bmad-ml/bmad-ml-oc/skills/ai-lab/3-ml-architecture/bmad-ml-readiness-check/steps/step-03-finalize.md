# Step 03 - Finalize and Route

1. Produce the readiness verdict: READY (all PASS), READY WITH CONCERNS (some CONCERNS, no FAIL), or NOT READY (any FAIL).
2. List all blockers (FAIL items) with specific remediation steps and estimated time to resolve.
3. List all concerns (CONCERNS items) with recommended mitigations and whether they block proceeding.
4. If NOT READY, identify the minimum set of actions needed to reach READY status and route to the appropriate workflows for remediation.
5. If READY or READY WITH CONCERNS, confirm the user agrees to proceed to implementation.
6. Produce the final readiness-check.md artifact with the scored checklist, verdict, blockers, and remediation plan.
7. Update iteration history with the date, verdict, and any conditions attached to proceeding.
8. If proceeding, route to the implement-experiment workflow with a summary of any CONCERNS that implementation should be aware of.

**Deliverables:** readiness-check.md (with scored checklist, verdict: READY / READY WITH CONCERNS / NOT READY, blockers, and remediation plan).

**Recommended next workflow:** `bmad-ml-implement-experiment` (if READY) or the workflow addressing the highest-priority blocker (if NOT READY).

> Quality check: Verify that (a) every dimension is scored, (b) every CONCERNS/FAIL has a remediation, (c) cross-artifact consistency is confirmed, and (d) the verdict is consistent with the scores.
