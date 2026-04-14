# Step 02 - Build and Analyze

1. **Experiment Design completeness**: Are hypotheses stated? Are metrics defined with formulas? Are baselines specified? Are controls documented? Are data splits defined? Score: PASS / CONCERNS / FAIL.
2. **Architecture completeness**: Are all layers specified with dimensions? Are ADRs documented? Is the parameter count estimated? Are inference requirements defined? Score: PASS / CONCERNS / FAIL.
3. **Training Pipeline completeness**: Is the optimizer configured with hyperparameters? Is the learning rate schedule defined? Is checkpointing configured? Is logging configured? Is mixed precision specified? Score: PASS / CONCERNS / FAIL.
4. **Data readiness**: Is the dataset downloaded and accessible? Are splits created? Is preprocessing implemented and tested? Is data loading verified? Score: PASS / CONCERNS / FAIL.
5. **Infrastructure readiness**: Are GPUs allocated and accessible? Is the experiment tracking system configured? Is storage sufficient for checkpoints and logs? Are all dependencies installed? Score: PASS / CONCERNS / FAIL.
6. **Evaluation readiness**: Are evaluation metrics implemented? Is the evaluation harness tested? Are baseline results available for comparison? Score: PASS / CONCERNS / FAIL.
7. For each CONCERNS or FAIL item, document the specific gap and estimate the remediation effort (hours/days).
8. Check cross-artifact consistency: do architecture parameter counts match compute estimates? Do data splits match experiment design? Do metrics match evaluation criteria?
9. Identify any "silent assumptions" -- things everyone assumes are ready but no one has verified.
10. Present the scored checklist and gap analysis to the user.

> Soft gate: "The readiness assessment is complete. Review the scores and gaps. Any items to re-evaluate?"

Continue to ./step-03-finalize.md.
