# Step 03 - Finalize and Route

1. Produce the review verdict: **Approved** (no Critical or Major findings), **Changes Requested** (Critical or Major findings that must be addressed), or **Approved with Suggestions** (only Minor/Suggestion findings).
2. List required changes (Critical and Major findings) in priority order with specific remediation instructions.
3. List recommended changes (Minor findings and Suggestions) separately, noting which are optional.
4. For Changes Requested: specify which findings are blocking and must be fixed before training begins.
5. If data leakage or incorrect loss computation is found, flag as a CRITICAL blocker -- these invalidate all results if not fixed.
6. Produce the final code-review.md artifact with: review scope, checklist results, categorized findings, verdict, and required changes.
7. Update iteration history with the date, review scope, verdict, and count of findings by severity.
8. If Approved, route to training or confirm implementation is ready. If Changes Requested, route back to implementation for fixes.

**Deliverables:** code-review.md (with review scope, checklist results, categorized findings, verdict, and required changes).

**Recommended next workflow:** `bmad-ml-experiment-tracking` (if Approved) or back to `bmad-ml-implement-experiment` (if Changes Requested).

> Quality check: Verify that (a) every finding has a file path and severity, (b) the verdict is consistent with findings, (c) all Critical findings have remediation instructions, and (d) no data leakage or loss computation issues are overlooked.
