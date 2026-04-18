# Step 03 - State Assessment

## Lifecycle Stage Classification
1. Determine where the project is in the ML lifecycle:
   - **Discovery**: Only research notes, papers, or planning docs -- no code yet
   - **Early Development**: Model code exists but no training results
   - **Active Training**: Training scripts with some completed runs and results
   - **Evaluation**: Multiple experiments completed, comparison results available
   - **Optimization**: Tuning, pruning, quantization, or distillation artifacts present
   - **Deployment**: Serving configs, API endpoints, monitoring dashboards present

## Gap Analysis
2. Identify gaps across these dimensions:
   - **Testing**: Are there tests for models, data transforms, training utilities?
   - **Documentation**: README, docstrings, architecture docs, paper drafts?
   - **Experiment tracking**: Is a tracking tool configured and in use?
   - **Reproducibility**: Are seeds set? Deterministic ops enabled? Configs versioned?
   - **Version control**: Are checkpoints, data versions, and configs tracked?

## Greenfield Detection
3. If no meaningful ML code exists (empty project or non-ML codebase):
   - Mark as greenfield
   - Skip remaining analysis
   - Prepare to ask about ML project goals in step-04

4. Save assessment summary for artifact generation.

Continue to `./step-04-generate-artifacts.md`.
