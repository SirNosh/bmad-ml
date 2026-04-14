# Step 02 - Build

Produce `{planning_artifacts}/guardrails-spec.md` with the following sections.

## 2.1 Input Validation Layer
- **Content filtering:** define rules for detecting and blocking harmful, toxic, or off-topic inputs before they reach the LLM. Specify whether filtering is keyword-based, classifier-based, or LLM-based.
- **Prompt injection detection:** define the detection strategy (pattern matching, classifier, canary tokens, instruction hierarchy). Specify what happens when injection is detected (block, sanitize, alert).
- **PII masking:** define which PII types are detected (names, emails, phone numbers, SSNs, credit cards). Specify the masking strategy (redact, replace with tokens, anonymize). Define whether PII masking is applied on input, output, or both.
- **Input length and format validation:** maximum input length, allowed character sets, format checks.

## 2.2 Output Validation Layer
- **Hallucination detection:** define how outputs are checked for factual grounding (source citation verification, entailment checking against retrieved context, confidence thresholds).
- **Policy compliance:** define content policies the output must satisfy (no medical/legal advice without disclaimers, no competitor mentions, no pricing guarantees). Specify how compliance is checked (rule-based, classifier, LLM-as-judge).
- **Format validation:** verify output matches expected schema (valid JSON, required fields present, no truncation). Define fallback when format validation fails.
- **Toxicity screening:** apply output toxicity classifier as a final gate before delivery to the user.

## 2.3 Refusal Policy
- Define the **refusal trigger taxonomy:** categorize all conditions that trigger refusal (safety, scope, capability, policy).
- For each category, define:
  - **Detection method:** how the condition is identified.
  - **Refusal message:** exact wording or template the system uses.
  - **Logging:** what metadata is recorded for refusal events.
  - **User recourse:** whether the user can rephrase, appeal, or escalate.

## 2.4 Monitoring and Alerting
- Define safety metrics to track: refusal rate, injection attempt rate, PII detection rate, hallucination rate, toxicity rate.
- Define alerting thresholds: what rates trigger investigation vs. automated mitigation.
- Define the incident response workflow: who is notified, what is the SLA for triage, how are bypass incidents escalated.
- Define safety dashboards: what operators and safety reviewers need to see.

## 2.5 Guardrails Framework Selection
- Evaluate guardrails frameworks:
  - **NVIDIA NeMo Guardrails:** programmable rails with dialog management.
  - **Guardrails AI:** schema-based output validation with re-asking.
  - **LLM-based self-check:** using a secondary LLM call to validate outputs.
  - **Custom implementation:** rule engine with classifiers.
- Select and justify the approach. Define the integration point in the architecture (middleware, wrapper, sidecar).

## 2.6 Guardrails Testing Approach
- Define a red-team test suite with categories:
  - Prompt injection attempts (at least 5 patterns).
  - Jailbreak attempts (at least 3 techniques: role-play, encoding, multi-turn escalation).
  - PII extraction attempts.
  - Out-of-scope requests that should be refused.
  - Boundary-pushing but legitimate requests that should NOT be refused (false positive testing).
- Define the testing cadence: pre-deployment, post-deployment, ongoing.
- Define the false positive acceptance threshold.

Continue to ./step-03-finalize.md.
