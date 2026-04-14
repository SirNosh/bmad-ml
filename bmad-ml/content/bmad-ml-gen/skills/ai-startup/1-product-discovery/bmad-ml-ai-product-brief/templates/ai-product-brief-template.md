---
artifact: ai-product-brief
iteration: 1
created: 2026-04-07
last_updated: 2026-04-07
---

# AI Product Brief

## Problem Statement

> **Purpose:** Define the core problem this product solves, who experiences it, and why AI is the right approach. This section anchors every downstream decision.
> **Guidance:** Answer each sub-question concretely. Avoid vague aspirational language. If you cannot articulate the problem without AI jargon, the problem is not yet clear enough.

### What problem are we solving?

{Describe the problem in one to two sentences from the user's perspective, not the builder's.}

### Who experiences this problem?

{Identify the affected population -- role, industry, segment. Be specific: "mid-market SaaS customer-support managers" not "businesses."}

### How is the problem solved today?

| Current Alternative | Strengths | Weaknesses | Cost |
|---|---|---|---|
| {e.g., Manual triage} | {Low upfront cost} | {Slow, inconsistent} | {$$} |
| | | | |

### Why is AI the right solution?

{Explain what property of AI (pattern recognition, language understanding, generation, scale) uniquely addresses the gap left by current alternatives. If a rule-based system would suffice, justify why AI is still preferred.}

---

## Target Users and Jobs to Be Done

> **Purpose:** Ground the product in real user needs so that AI capabilities map to measurable value rather than novelty.
> **Guidance:** Identify two to five distinct personas. For each, state the job they hire this product to do, how often they do it, and their current pain level. Use the Jobs-to-Be-Done framing: "When I am [situation], I want to [motivation], so I can [outcome]."

### User Personas

| Role | Primary Need (Job to Be Done) | Frequency | Pain Level (1-5) | Current Workaround |
|---|---|---|---|---|
| {e.g., Support Lead} | {Triage tickets to the right specialist within minutes} | {Daily, 50+ tickets} | {4} | {Manual reading + rules engine} |
| | | | | |

### Key User Journeys

{For the highest-pain persona, describe the end-to-end journey from trigger event to successful outcome. Note where AI intervenes.}

---

## Product Goals and Success Metrics

> **Purpose:** Translate the problem and user needs into measurable outcomes so the team knows what "done" and "successful" look like.
> **Guidance:** Each goal must have at least one metric with a concrete target and a defined measurement method. Prefer leading indicators (e.g., task-completion rate) over lagging ones (e.g., quarterly revenue). Include at least one AI-quality metric (accuracy, latency, hallucination rate).

| Goal | Metric | Target | Measurement Method |
|---|---|---|---|
| {e.g., Reduce resolution time} | {Median time-to-resolution} | {< 4 hours (from 12)} | {Support platform analytics} |
| {e.g., Maintain answer quality} | {Answer accuracy (human-eval)} | {> 90%} | {Weekly sample audit, n=50} |
| | | | |

---

## AI Approach

> **Purpose:** Justify the chosen AI technique and explain why alternatives were ruled out. Prevents over-engineering and keeps the team aligned on technical direction.
> **Guidance:** State the primary technique, then briefly note why each plausible alternative was considered and rejected. If the answer is "we are not sure yet," frame this section as an experiment plan with decision criteria.

### Primary Technique

{Choose one or a combination: LLM prompting, RAG, agentic workflow, fine-tuning, classical ML, embeddings + search.}

### Why This Approach?

| Alternative Considered | Reason Rejected |
|---|---|
| {e.g., Fine-tuning a custom model} | {Insufficient labeled data today; RAG achieves 85% of the value at 10% of the cost} |
| {e.g., Rule-based NLP pipeline} | {Cannot handle long-tail query variation} |
| | |

### Model / Provider Shortlist

{List candidate models or providers being evaluated: e.g., GPT-4o, Claude 3.5, Llama 3, Mistral. Note any licensing or deployment constraints.}

---

## Data Requirements and Dependencies

> **Purpose:** Inventory every data source the AI system needs so that access, quality, and freshness risks are identified early.
> **Guidance:** For each source, specify format, access method, estimated volume, and refresh cadence. Flag any source that requires legal review, PII handling, or third-party agreements.

### Source Inventory

| Source | Data Type | Access Method | Volume (est.) | Freshness Requirement | Owner | PII Present? |
|---|---|---|---|---|---|---|
| {e.g., Zendesk tickets} | {Text, structured} | {API export} | {500K records} | {Daily sync} | {Support Ops} | {Yes -- customer names, emails} |
| | | | | | | |

### Data Gaps and Acquisition Plan

{List any data you need but do not yet have access to. For each gap, describe the acquisition plan and timeline.}

---

## Constraints

> **Purpose:** Make non-negotiable boundaries explicit so that architecture and design respect them from day one.
> **Guidance:** For each constraint category, state the hard limit and the source of that limit (SLA, regulation, budget, etc.). If a constraint is aspirational rather than hard, mark it as a "target" vs. "hard limit."

### Latency SLO

- **Hard limit:** {e.g., P95 < 3 seconds end-to-end}
- **Source:** {e.g., UX research -- users abandon after 5s}

### Cost Ceiling

- **Per-request budget:** {e.g., < $0.02 per inference call}
- **Monthly budget cap:** {e.g., $5,000 for LLM API spend}

### Privacy Requirements

- {e.g., No customer PII sent to third-party LLM providers}
- {e.g., All data must remain in US-East region}

### Compliance Frameworks

- {e.g., SOC 2 Type II, GDPR Article 22 (automated decision-making), HIPAA if health data is involved}

---

## Risks and Mitigations

> **Purpose:** Surface the highest-probability and highest-impact risks early so the team can plan mitigations rather than react to surprises.
> **Guidance:** Include technical risks (model quality, data drift), business risks (adoption, competitive response), and operational risks (cost overruns, vendor lock-in). Rate probability and impact as High / Medium / Low.

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| {e.g., LLM hallucinations cause incorrect answers} | {High} | {High} | {RAG with citation, confidence thresholds, human review for low-confidence} |
| {e.g., API provider raises prices 3x} | {Medium} | {Medium} | {Abstract provider behind interface; maintain fallback to open-source model} |
| | | | |

---

## Phased Delivery Plan

> **Purpose:** Break delivery into incremental phases so that value is delivered early and learning informs later phases.
> **Guidance:** Each phase should be independently valuable. Include scope, timeline estimate, key dependencies, and the concrete deliverables expected at phase end. Phase 1 should be achievable in two to four weeks.

| Phase | Scope | Timeline | Dependencies | Deliverables |
|---|---|---|---|---|
| {1 -- Proof of Concept} | {Core retrieval + generation on 1 data source} | {2 weeks} | {Data access approved} | {Working prototype, initial accuracy metrics} |
| {2 -- MVP} | {Multi-source RAG, basic UI, guardrails} | {4 weeks} | {Phase 1 learnings, UI design} | {Deployed internal beta, evaluation report} |
| {3 -- Production} | {Monitoring, scaling, feedback loop} | {4 weeks} | {Phase 2 sign-off, infra provisioning} | {GA release, runbook, SLO dashboards} |
| | | | | |
