# Step 02 - Build

Produce `{planning_artifacts}/ai-readiness-check.md` by evaluating each area below. Score every area as **PASS**, **CONCERNS**, or **FAIL**.

## 2.1 Architecture Completeness
Read `ai-architecture.md` and check:
- [ ] All system components are defined with clear responsibilities.
- [ ] Integration points are documented with API contracts or schema references.
- [ ] Model serving strategy is selected with fallback chains defined.
- [ ] Data flow is mapped end-to-end from input to output.
- [ ] Scalability and cost controls are specified.
- [ ] Open risks are logged with owners and mitigation plans.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

## 2.2 Prompt Readiness
Read `prompt-spec.md` and check:
- [ ] Every LLM-powered component has a system prompt drafted.
- [ ] Prompts include output format specifications.
- [ ] Few-shot examples are provided where applicable.
- [ ] Regression test criteria are defined for each prompt (at least 3 test cases).
- [ ] Prompt versioning and storage strategy is defined.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

## 2.3 Safety Readiness
Read `guardrails-spec.md` and `agent-behavior-spec.md` and check:
- [ ] Threat model is defined covering injection, jailbreaking, PII, and harmful content.
- [ ] Input validation layer is designed (filtering, injection detection, PII masking).
- [ ] Output validation layer is designed (hallucination, policy compliance, format).
- [ ] Refusal policy is defined with specific triggers and messages.
- [ ] Red-team test suite is planned with at least 10 test cases.
- [ ] Monitoring and alerting for safety events is designed.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

## 2.4 Data Readiness
Read `data-integration.md` and `rag-design.md` (if applicable) and check:
- [ ] All data sources are identified with ingestion methods defined.
- [ ] Transformation and normalization pipelines are designed.
- [ ] Data quality validation checks are specified per source.
- [ ] Error handling and retry logic is defined for each pipeline.
- [ ] If RAG is used: chunking, embedding, and retrieval strategies are defined and coherent.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

## 2.5 Infrastructure Readiness
Read `ai-architecture.md` (infrastructure sections) and check:
- [ ] Model serving approach is selected (API, self-hosted, hybrid) with cost estimates.
- [ ] Scaling strategy is defined (auto-scaling triggers, queue-based load leveling).
- [ ] Caching layers are designed (prompt cache, embedding cache, response cache).
- [ ] Monitoring and observability stack is planned (logging, tracing, metrics, alerting).
- [ ] Disaster recovery and failover are addressed.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

## 2.6 UX Readiness
Read `ai-ux-spec.md` and check:
- [ ] Conversation flows cover all primary use cases from the product brief.
- [ ] Error states and recovery paths are defined.
- [ ] Loading and progress indicators are specified for long operations.
- [ ] Confidence communication strategy is defined.
- [ ] Accessibility requirements are addressed.
- **Score:** PASS / CONCERNS / FAIL. List specific gaps.

Continue to ./step-03-finalize.md.
