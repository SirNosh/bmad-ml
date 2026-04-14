# Step 03 - Architecture Assessment

## Architecture Reconstruction
1. Reconstruct the AI system architecture from discovered code:
   - Identify patterns: monolithic vs microservice, sync vs async, single-model vs router
   - Map data flow from input to output (user request -> processing -> LLM call -> response)
   - Identify integration boundaries (API contracts, message formats, shared state)

## Safety Posture Assessment
2. Assess current safety posture:
   - **Guardrails**: Are input/output filters present? What framework (NeMo, Guardrails AI, custom)?
   - **PII handling**: Is PII detection/masking implemented?
   - **Input validation**: Is prompt injection protection present?
   - **Content filtering**: Are harmful content checks in place?

## Observability Assessment
3. Assess monitoring and observability:
   - **Metrics**: Are LLM-specific metrics tracked (latency, token usage, cost)?
   - **Logging**: Is structured logging in place for AI interactions?
   - **Alerting**: Are alerts configured for model failures or quality degradation?

## Technical Debt and Gaps
4. Identify technical debt:
   - Hardcoded values that should be configurable
   - Missing error handling for LLM API failures
   - Missing tests for AI-specific behavior
   - Outdated dependencies or deprecated API usage

Continue to `./step-04-generate-artifacts.md`.
