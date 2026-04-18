# Step 02 - Build

## Section-by-Section Construction

1. **Problem Statement**: Define the core problem, who experiences it, current alternatives, and why an AI solution is warranted over traditional approaches.
2. **Target Users and Jobs to Be Done**: Identify user personas with roles, needs, frequency of use, and pain levels. Map key user journeys.
3. **Product Goals and Success Metrics**: Define measurable goals with specific metrics, target values, and measurement methods. Distinguish launch metrics from long-term success metrics.
4. **AI Approach**: Select the AI technique (LLM, RAG, agents, fine-tuning, or combination). Document why this approach was chosen over alternatives. Identify candidate models with provider, cost, and capability comparison.
5. **Data Requirements and Dependencies**: Inventory all data sources with type, access method, volume, freshness requirements, and PII flags. Identify data gaps that could block development.
6. **Constraints**: Define latency SLO, cost ceiling per request, privacy requirements (GDPR, HIPAA, etc.), and compliance frameworks. These are hard constraints that shape architecture decisions.
7. **Risks and Mitigations**: Build risk matrix covering technical risk (model quality, hallucination), data risk (availability, quality), operational risk (cost overrun, scaling), and adoption risk (user acceptance). Assign probability, impact, and mitigation for each.
8. **Phased Delivery Plan**: Define delivery phases with scope, timeline, dependencies, and deliverables per phase. Phase 1 should be the minimum viable AI product.

## Quality Checks

- Every goal has a measurable metric with a target value.
- AI approach selection includes comparison with at least one alternative.
- Data sources are identified with access feasibility confirmed.
- Constraints are specific and quantified, not vague.
- Risk mitigations are actionable, not hand-waving.

## Soft Gate

**Review what we have so far. Are there stakeholders, constraints, or data sources we have not considered?**

Continue to ./step-03-finalize.md.
