# Step 02 - Component Catalog

## LLM Integration Catalog
1. Catalog all LLM integrations:
   - Which models (GPT-4, Claude, Llama, Mistral, local models)
   - Which providers (OpenAI, Anthropic, Azure, self-hosted)
   - API client patterns (direct SDK, LangChain wrappers, custom clients)

## Prompt Catalog
2. Catalog all prompts and system prompts:
   - File locations (dedicated prompt files, inline in code, config-driven)
   - Versioning approach (git, explicit versioning, none)
   - Template format (f-strings, Jinja2, LangChain templates)

## Agent Catalog
3. Catalog agent definitions (if present):
   - Agent roles, tools, and orchestration pattern
   - Memory/state management approach

## RAG Catalog
4. Catalog RAG components (if present):
   - Vector DB (which DB, index configuration)
   - Embedding model (which model, dimensions)
   - Chunking strategy (method, sizes)
   - Retrieval method (similarity search, hybrid, reranking)

## Tool and API Catalog
5. Catalog tool/function calling schemas and API integration points.

## Data Source Catalog
6. Catalog data sources, ingestion pipelines, and processing code.

Continue to `./step-03-architecture-assessment.md`.
