# Step 01 - Project Discovery

## Directory and Dependency Scan
1. Scan directory structure, file types, and repository topology.
2. Read `requirements.txt`, `pyproject.toml`, `setup.py`, `environment.yml`, or `Pipfile` for ML dependencies.
3. Detect primary ML framework from imports and dependency versions:
   - **PyTorch**: `torch`, `torchvision`, `torchaudio` imports; `torch.nn.Module` subclasses
   - **TensorFlow**: `tensorflow`, `keras` imports; `tf.keras.Model` subclasses
   - **JAX**: `jax`, `flax`, `optax` imports
4. Detect experiment tracking integration:
   - **W&B**: `wandb` imports, `wandb.init()` calls, `.wandb/` directories
   - **MLflow**: `mlflow` imports, `mlflow.log_*` calls, `mlruns/` directories
   - **TensorBoard**: `tensorboard` imports, `SummaryWriter` usage, `runs/` or `logs/` directories
   - **Manual**: CSV/JSON result logging without a tracking framework

## Project Classification
5. Classify project type based on discovered artifacts:
   - **Research experiment**: Model code + training scripts + results, no serving
   - **Model library**: Reusable model definitions, no training scripts
   - **Training pipeline**: Automated training with configs, checkpointing, evaluation
   - **Deployment stack**: Serving configs, API endpoints, Docker/K8s
   - **Mixed**: Combination of the above

**Anything to add or correct about this scan before I continue?**

Continue to `./step-02-analysis.md`.
