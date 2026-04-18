# Step 04 - Generate Artifacts

## project-context.md
1. Generate `{planning_artifacts}/project-context.md` with AI product-specific sections:
   - **LLM Stack and Versions**: Models, providers, frameworks, versions
   - **Prompt Engineering Conventions**: Template format, versioning, testing approach
   - **Agent Architecture Patterns**: Orchestration style, tool calling conventions, memory approach
   - **RAG Pipeline Conventions**: Chunking strategy, embedding model, retrieval method, reranking
   - **Safety and Guardrails Approach**: Framework, threat model, PII handling
   - **API Design Patterns**: Endpoint conventions, authentication, rate limiting
   - **Testing Approach**: What is tested (prompts, chains, integrations), framework, coverage
   - **Deployment and Serving Conventions**: Containerization, scaling, monitoring
   - **Cost Management Rules**: Token budgets, model routing for cost optimization

## ai-sprint-status.yaml
2. Generate initial `{planning_artifacts}/ai-sprint-status.yaml` from detected in-progress work.

## Component Catalog
3. Generate component catalog document summarizing all discovered components.

## Resume Support
4. Save scan metadata to support resume if interrupted.

Continue to `./step-05-recommend.md`.
