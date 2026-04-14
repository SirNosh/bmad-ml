# Step 04 - Generate Artifacts

## project-context.md
1. Generate `{planning_artifacts}/project-context.md` with these ML-specific sections:
   - **Technology Stack**: Framework, versions, key libraries
   - **Model Architecture Conventions**: Naming patterns, base classes, config formats
   - **Training Pipeline Patterns**: Training loop style, checkpoint frequency, logging approach
   - **Data Pipeline Conventions**: Dataset class patterns, augmentation approach, data storage
   - **Testing Patterns**: What is tested, test framework, coverage expectations
   - **Reproducibility Requirements**: Seed handling, deterministic ops, config versioning
   - **Checkpoint and Model Naming**: File formats, naming conventions, storage locations
   - **Experiment Tracking**: Tool, project/entity names, metric logging conventions
   - **Code Style**: Linting, formatting, docstring conventions

## experiment-status.yaml
2. Generate initial `{experiment_artifacts}/experiment-status.yaml` from discovered experiments:
   - List each identified experiment with status (completed/active/planned)
   - Include model names, datasets, and key metrics where available

## iteration-log.yaml
3. Generate initial `{project_knowledge}/iteration-log.yaml` with current cycle context.

## Resume Support
4. Save scan metadata to `{planning_artifacts}/onboard-scan-state.yaml` to support resume on interruption.

Continue to `./step-05-recommend.md`.
