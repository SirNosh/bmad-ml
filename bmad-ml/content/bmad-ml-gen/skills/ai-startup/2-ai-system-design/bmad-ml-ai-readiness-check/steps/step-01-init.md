# Step 01 - Initialize

1. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
2. Check for an existing `{planning_artifacts}/ai-readiness-check.md`. If one exists, confirm whether this is a **Fresh** assessment or a re-evaluation after addressing prior concerns.
3. Inventory all Phase 2 artifacts by checking `{planning_artifacts}/` for each of the following. Record which exist and which are missing:
   - `ai-architecture.md` (AI System Architecture)
   - `rag-design.md` (RAG Pipeline Design)
   - `agent-system-design.md` (Agent System Design)
   - `prompt-spec.md` (Prompt Engineering)
   - `agent-behavior-spec.md` (Agent Behavior Spec)
   - `tool-schemas.json` (Tool Calling Design)
   - `ai-ux-spec.md` (AI UX Design)
   - `data-integration.md` (Data Integration)
   - `guardrails-spec.md` (Guardrails Design)
4. For each missing artifact, note whether it is required for this product (some products may not need RAG or agents) or is a genuine gap.
5. Prepare the readiness checklist structure with six assessment areas: Architecture, Prompts, Safety, Data, Infrastructure, UX.

Continue to ./step-02-build.md.
