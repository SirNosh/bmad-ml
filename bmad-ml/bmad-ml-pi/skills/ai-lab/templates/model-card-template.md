# Model Card

## Model Details

> **Purpose:** Identify the model uniquely and provide enough technical detail for reproducibility and comparison.
> **Guidance:** Fill in all fields. The architecture description should be detailed enough that someone could reimplement the model. Reference the ADR for decision rationale.

| Field | Value |
|-------|-------|
| **Model Name** | {name} |
| **Version** | {version number or date} |
| **Model Type** | {e.g., transformer encoder, CNN, diffusion model} |
| **Architecture** | {e.g., DeBERTa-v3-base with linear classification head} |
| **Parameter Count** | {total parameters, e.g., 184M} |
| **Trainable Parameters** | {if using PEFT, e.g., 1.2M trainable / 184M total} |
| **Framework** | {e.g., PyTorch 2.3.0 + Transformers 4.41.0} |
| **License** | {e.g., MIT, Apache-2.0, proprietary} |
| **Architecture Decision Record** | {link to model-adr.md} |
| **Training Config** | {link to training-config.yaml} |

### Architecture Summary

{2-3 sentence description of the architecture. e.g., "Pretrained DeBERTa-v3-base encoder with disentangled attention. Classification head is a single linear layer mapping the [CLS] representation to the label space. LoRA adapters (rank 16) are applied to query and value projections."}

---

## Intended Use

> **Purpose:** Define the intended and out-of-scope uses so that downstream users deploy the model appropriately.
> **Guidance:** Be specific about the task, domain, and user population. Out-of-scope uses should call out known failure modes.

### Primary Use Cases

- {e.g., "Classification of customer support tickets into routing categories."}
- {e.g., "Research baseline for few-shot text classification experiments."}

### Intended Users

- {e.g., "ML engineers integrating the model into the ticket routing pipeline."}
- {e.g., "Researchers benchmarking classification methods."}

### Out-of-Scope Uses

- {e.g., "Not intended for safety-critical decisions (medical, legal, financial)."}
- {e.g., "Not validated for languages other than English."}
- {e.g., "Not suitable for open-ended text generation."}

---

## Training Data

> **Purpose:** Document the data the model was trained on so users can assess its domain coverage and potential biases.
> **Guidance:** Reference the dataset card for full details. Summarize the key characteristics here.

| Field | Value |
|-------|-------|
| **Dataset** | {name and version} |
| **Dataset Card** | {link to dataset-card.md} |
| **Training Samples** | {count} |
| **Preprocessing** | {brief summary, e.g., "Tokenized with DeBERTa tokenizer, max_length=512"} |
| **Augmentation** | {brief summary or "None"} |

### Data Considerations

{Note any important characteristics of the training data that affect model behavior: class imbalance, domain specificity, temporal scope, known biases.}

---

## Evaluation Data

> **Purpose:** Document what data was used to evaluate the model so results can be interpreted in context.
> **Guidance:** Specify the held-out set, whether it comes from the same distribution as training, and any domain coverage gaps.

| Field | Value |
|-------|-------|
| **Evaluation Split** | {e.g., "test split from dataset v1.2"} |
| **Evaluation Samples** | {count} |
| **Distribution Match** | {same distribution as train / shifted / different domain} |
| **Domain Coverage** | {what domains are covered vs. missing} |

### Evaluation Protocol

{Describe how evaluation was conducted: single run vs. multiple seeds, whether confidence intervals are reported, any evaluation-time preprocessing.}

---

## Metrics

> **Purpose:** Report model performance transparently so users can compare with alternatives and judge fitness.
> **Guidance:** Report the primary metric and all secondary metrics. Include per-split results if available. Bold the primary metric.

### Overall Performance

| Metric | Validation | Test | Notes |
|--------|-----------|------|-------|
| **{Primary Metric}** | **{value +/- std}** | **{value +/- std}** | **Primary** |
| {secondary metric 1} | {value} | {value} | {notes} |
| {secondary metric 2} | {value} | {value} | {notes} |
| Inference Latency (p50) | -- | {ms} | {hardware used} |
| Inference Latency (p99) | -- | {ms} | {hardware used} |

### Per-Class / Per-Subset Performance (if applicable)

| Class / Subset | {Primary Metric} | Support | Notes |
|---------------|-------------------|---------|-------|
| {class_1} | {value} | {count} | {notes} |
| {class_2} | {value} | {count} | {notes} |
| {class_3} | {value} | {count} | {notes} |

### Comparison to Baselines

| Model | {Primary Metric} | Parameters | Training Cost | Source |
|-------|-------------------|-----------|---------------|--------|
| This model | {value} | {params} | {GPU-hours} | This report |
| {baseline 1} | {value} | {params} | {GPU-hours} | {source} |
| {baseline 2} | {value} | {params} | {GPU-hours} | {source} |

---

## Ethical and Safety Considerations

> **Purpose:** Disclose ethical risks so users can make informed deployment decisions and implement appropriate safeguards.
> **Guidance:** Consider bias, fairness, privacy, environmental impact, and potential for misuse.

### Bias and Fairness

{Describe any known biases in the model's behavior. Did you evaluate performance across demographic groups? If disparities exist, document them.}

| Group / Dimension | Performance | Gap vs. Overall | Notes |
|------------------|------------|----------------|-------|
| {e.g., demographic group A} | {metric value} | {delta} | {analysis} |
| {e.g., demographic group B} | {metric value} | {delta} | {analysis} |

### Privacy

{Does the model memorize or leak training data? What PII protections were applied during training?}

### Environmental Impact

| Field | Value |
|-------|-------|
| **Training GPU-Hours** | {total} |
| **Hardware** | {GPU type} |
| **Estimated CO2** | {kg CO2, if computed} |
| **Cloud Provider / Region** | {if applicable} |

### Potential for Misuse

{Describe how this model could be misused and what guardrails are recommended.}

---

## Limitations

> **Purpose:** Document known failure modes so users can anticipate and mitigate issues in deployment.
> **Guidance:** Be specific and honest. Group limitations by category.

### Known Failure Modes

- {e.g., "Struggles with inputs longer than 512 tokens due to truncation."}
- {e.g., "Accuracy drops significantly on out-of-domain text (e.g., legal documents)."}
- {e.g., "Confuses classes A and B when input contains ambiguous keywords."}

### Distribution Shift Sensitivity

{How robust is the model to distribution shift? Has it been tested on data from different time periods, sources, or domains?}

### Uncertainty and Calibration

{Are the model's confidence scores well-calibrated? Should users apply temperature scaling or other calibration methods?}

---

## Deployment Notes

> **Purpose:** Provide practical guidance for serving the model in production so that inference is efficient and reliable.
> **Guidance:** Include hardware requirements, latency expectations, and recommended serving configurations.

### Hardware Requirements

| Field | Value |
|-------|-------|
| **Minimum GPU** | {e.g., "Any GPU with >= 8 GB VRAM" or "CPU-only feasible"} |
| **Recommended GPU** | {e.g., "T4 or better for batch inference"} |
| **Model Size on Disk** | {e.g., "~700 MB (fp32), ~350 MB (fp16)"} |
| **Peak Memory (Inference)** | {e.g., "~2 GB at batch_size=32"} |

### Inference Performance

| Configuration | Batch Size | Latency (p50) | Latency (p99) | Throughput |
|--------------|-----------|---------------|---------------|-----------|
| {e.g., A100 fp16} | {32} | {X ms} | {Y ms} | {Z samples/sec} |
| {e.g., T4 fp16} | {16} | {X ms} | {Y ms} | {Z samples/sec} |
| {e.g., CPU} | {1} | {X ms} | {Y ms} | {Z samples/sec} |

### Serving Recommendations

- {e.g., "Use dynamic batching with max_batch_size=32 and max_latency=100ms."}
- {e.g., "Export to ONNX for 1.5x speedup on CPU inference."}
- {e.g., "Apply fp16 quantization for deployment on T4 GPUs with minimal accuracy loss (<0.1%)."}
- {e.g., "Monitor input distribution drift in production; retrain if primary metric degrades by >2%."}

### Dependencies

{List runtime dependencies and versions required for inference.}

```
# Example
torch>=2.3.0
transformers>=4.41.0
```
