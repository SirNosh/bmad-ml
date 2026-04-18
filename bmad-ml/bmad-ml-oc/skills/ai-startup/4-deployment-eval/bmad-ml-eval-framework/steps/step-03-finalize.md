# Step 03 - Finalize

1. Validate framework covers all evaluation dimensions:
   - Cross-reference framework dimensions against architecture spec quality requirements -- confirm every requirement has at least one metric
   - Cross-reference against product brief success metrics -- confirm every business metric is captured
   - Identify gaps: any quality dimension without automated or human evaluation coverage
   - Confirm each dimension has both an automated method (for speed) and a human method (for ground truth)

2. Document the evaluation framework usage guide:
   - How to run an automated evaluation (command, configuration, expected runtime, cost)
   - How to request a human evaluation (sample size, expected turnaround, annotator requirements)
   - How to interpret evaluation reports (what each metric means, what thresholds indicate quality issues)
   - How to add new evaluation dimensions or test cases as the product evolves
   - How to update rubrics and scoring criteria when quality standards change
   - Troubleshooting: common evaluation issues (flaky LLM-as-judge scores, annotator disagreement, dataset staleness)

3. Present the evaluation framework for review:
   - Framework architecture overview (dimensions, metrics, collection pipeline, evaluation methods, reporting)
   - Sample evaluation report (run on current system to demonstrate report format and content)
   - Cost estimate per evaluation type (automated per-run, human per-batch, monthly total)
   - Comparison with alternatives considered and rationale for chosen approach
   - Implementation roadmap: what is ready now vs what needs further development

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
