# Step 02 - Codebase Analysis

## Model Catalog
1. Find all model definitions:
   - `nn.Module` subclasses (PyTorch), `tf.keras.Model` subclasses (TensorFlow), `flax.linen.Module` subclasses (JAX)
   - Architecture config files (YAML/JSON with layer definitions, hidden sizes, attention heads)
   - Pretrained model references (HuggingFace model IDs, local checkpoint paths)
2. Estimate parameter counts where detectable from architecture configs.

## Data Pipeline Catalog
3. Find all data loading code:
   - `Dataset` and `DataLoader` subclasses
   - Data preprocessing scripts and augmentation pipelines
   - Feature engineering modules
   - Data download/preparation scripts

## Training and Experiment Catalog
4. Find all training configurations:
   - Training scripts with hyperparameter settings
   - Config files (YAML/JSON with learning rates, batch sizes, schedulers)
   - Checkpoint directories and naming conventions
5. Identify experiments by status:
   - **Completed**: Have result files, metrics, or logged runs
   - **In-progress**: Have partial checkpoints, running logs
   - **Planned**: Config files without corresponding results

## Dependency Map
6. List all ML-specific dependencies with their versions from dependency files.

Continue to `./step-03-state-assessment.md`.
