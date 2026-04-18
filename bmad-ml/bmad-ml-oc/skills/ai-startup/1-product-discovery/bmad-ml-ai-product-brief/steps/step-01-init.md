# Step 01 - Initialize

1. Load config and resolve artifact paths (`{planning_artifacts}`, `{project_knowledge}`).
2. Scan for existing project-context.md -- if found, load as foundational reference for technology stack, coding conventions, and existing infrastructure.
3. If an existing ai-product-brief.md was detected during workflow activation (Iterate mode), load it and identify which sections need refinement based on user feedback.
4. Define the AI product scope:
   - Target users and their primary pain point
   - Core AI capability (what does the AI do that non-AI cannot?)
   - AI approach type: LLM application, RAG system, agent system, fine-tuned model, or hybrid
5. Assess data readiness: what data is currently available, what data needs to be collected or labeled, and any known data quality concerns.
6. Inventory constraints: budget, timeline, team AI/ML expertise level, infrastructure (GPU access, cloud provider), and compliance requirements (PII handling, model explainability).
7. Confirm the product scope, AI approach, data readiness, and constraints with the user.

> Soft gate: "Here is the product scope and approach summary. Anything to adjust before I draft the brief?"

Continue to ./step-02-build.md.
