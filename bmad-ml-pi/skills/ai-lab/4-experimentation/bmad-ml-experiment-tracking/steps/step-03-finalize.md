# Step 03 - Finalize and Route

1. Save the updated experiment-status.yaml with all status changes, metrics, timestamps, and notes.
2. Produce a tracking summary: number of experiments by status (planned, active, completed, abandoned), with a brief note on each active experiment's progress.
3. Highlight any at-risk experiments: active experiments behind schedule, completed experiments with below-threshold results, or planned experiments with unmet dependencies.
4. Update iteration history with the date and summary of tracking changes.
5. If any experiments are blocked, recommend the specific action needed to unblock them and which workflow to invoke.
6. If the tracking update reveals that the experiment pipeline is complete (all planned experiments done), recommend transitioning to results analysis or model optimization.
7. Present the tracking summary and any alerts for user review.

**Deliverables:** Updated experiment-status.yaml (with current statuses, metrics, and timestamps) and tracking summary.

**Recommended next workflow:** `bmad-ml-lab-meeting` (for experiment portfolio review) or `bmad-ml-results-analysis` (for completed experiments needing analysis).

> Quality check: Verify that (a) all experiment statuses are current, (b) timestamps are accurate, (c) completed experiments have metric summaries, and (d) no experiments are missing from tracking.
