# Step 02 - Build and Analyze

1. For each experiment needing update, determine the correct new status: **planned** (designed but not started), **active** (currently running or in progress), **completed** (all runs finished and results available), or **abandoned** (will not be pursued further).
2. For completed experiments: record the primary metric result (mean +/- std across seeds), date of completion, and link to the results report if available.
3. For active experiments: record the current progress (e.g., "3 of 5 seeds completed"), any blockers, and estimated time to completion.
4. For abandoned experiments: record the reason for abandonment (e.g., "superseded by experiment X", "negative feasibility assessment", "resource constraints").
5. For planned experiments: verify that dependencies are met and estimate start date.
6. Update all timestamps: last_updated, start_date (if transitioning to active), end_date (if transitioning to completed/abandoned).
7. Cross-reference experiment IDs across all tracking and reporting artifacts to ensure consistency.
8. Identify any experiments that should be added to tracking but are not currently listed (e.g., quick experiments that were run ad hoc).
9. Flag any experiments where the tracking data is inconsistent with the actual run data in the tracking system.
10. Present the proposed updates for user confirmation.

> Soft gate: "Here are the proposed tracking updates. Confirm or adjust before I save."

Continue to ./step-03-finalize.md.
