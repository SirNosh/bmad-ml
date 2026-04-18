# Step 01 - Initialize

1. Define the ML task type: classification, regression, generation, detection, segmentation, ranking, or other. This constrains the dataset search.
2. Set minimum dataset requirements: size (number of samples), quality (label accuracy), feature set, and any domain constraints.
3. Identify candidate dataset sources: HuggingFace Datasets, Kaggle, Papers With Code, UCI ML Repository, domain-specific repositories (e.g., PhysioNet for medical, Common Crawl for NLP).
4. Define licensing constraints: commercial use required? Attribution-only acceptable? GPL-incompatible licenses excluded?
5. Scan existing project artifacts for previously identified datasets or data requirements from the problem formulation.
6. Check iteration history -- if this is a refinement pass, load the previous candidate list and focus on gaps or newly available datasets.
7. Set evaluation criteria weights: how important is size vs quality vs domain match vs licensing for this specific project?
8. Confirm task requirements, quality thresholds, sources, and licensing constraints with the user.

9. If operating in autonomous mode (invoked by Nosh), derive task type and requirements from the experiment-design.md or problem-formulation.md and skip the confirmation gate.

> Soft gate: "Here are the dataset search parameters. Anything to adjust before I scan for candidates?"

Continue to ./step-02-build.md.
