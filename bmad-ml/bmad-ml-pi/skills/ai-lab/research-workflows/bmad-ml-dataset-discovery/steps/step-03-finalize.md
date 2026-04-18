# Step 03 - Finalize and Route

1. Produce the dataset comparison matrix as a table in the final artifact, with all candidates scored on the standardized rubric.
2. Recommend the top dataset with a clear rationale addressing: task fit, size, quality, licensing, and preprocessing requirements.
3. If no single dataset is sufficient, propose a combination strategy (e.g., primary + auxiliary, multi-source training) with rationale.
4. Document the download procedure and any preprocessing pipeline needed for the recommended dataset.
5. Update iteration history with the date, candidates evaluated, recommendation, and rationale.
6. Flag any outstanding risks (licensing ambiguity, potential bias, preprocessing complexity) that need resolution before data is used in experiments.
7. Cross-reference the recommendation against experiment-design.md (if it exists) to verify the dataset meets the designed data split requirements.
8. Present the final dataset-discovery.md artifact for user approval.

**Deliverables:** dataset-assessment.md (with candidate matrix, recommendation, download procedure, and preprocessing pipeline).

**Recommended next workflow:** `bmad-ml-experiment-design` (to design experiments using the recommended dataset) or `bmad-ml-feasibility-study` (if dataset limitations raise feasibility concerns).

> Quality check: Verify that (a) all candidates have complete metadata, (b) the recommendation addresses all stated requirements, (c) licensing is confirmed compatible, and (d) the preprocessing pipeline is reproducible.
