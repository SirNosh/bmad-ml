# Step 01 - Discovery

## Repository and Dependency Scan
1. Scan directory structure, dependencies, and configuration files.
2. Detect AI/LLM framework(s) and versions:
   - **LLM APIs**: OpenAI, Anthropic, Google, Cohere, local model API clients
   - **Agent frameworks**: LangChain, LlamaIndex, CrewAI, AutoGen, LangGraph, custom orchestration
   - **RAG components**: Vector DB clients (Pinecone, Weaviate, Qdrant, ChromaDB, pgvector), embedding libraries
   - **Fine-tuning**: PEFT, LoRA configs, training scripts, dataset preparation code
   - **Serving**: vLLM, TGI, Triton configs, model routing code
3. Identify architecture pattern:
   - LLM application (single model, prompt-driven)
   - RAG system (retrieval-augmented)
   - Agent system (multi-agent or tool-using)
   - Fine-tuning pipeline
   - API service (model serving)
   - Hybrid (combination)
4. Detect deployment state: local dev only, staging environment, production deployment.

## Greenfield Detection
5. If no AI/LLM code found: mark as greenfield, skip to step-04 with minimal project-context generation.

**Anything to add or correct about this scan?**

Continue to `./step-02-component-catalog.md`.
