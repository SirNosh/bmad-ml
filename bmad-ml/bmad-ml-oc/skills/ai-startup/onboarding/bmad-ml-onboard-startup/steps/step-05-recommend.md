# Step 05 - Recommend Next Steps

## Context-Aware Recommendations
1. Based on the project state, recommend specific next workflows:
   - **No RAG reranking?** --> "Your RAG pipeline has no reranking step. Consider `bmad-ml-rag-pipeline` in Iterate mode to add reranking."
   - **System prompts without tests?** --> "I found 12 system prompts with no regression tests. Moody recommends `bmad-ml-ai-regression-tests`."
   - **No guardrails?** --> "No guardrails detected. Snape strongly recommends `bmad-ml-guardrails-design` before your next deployment."
   - **No behavior spec?** --> "Your agent system has no formal behavior spec. Luna recommends `bmad-ml-agent-behavior-spec`."
   - **Well-structured?** --> "Well-structured project with good coverage. You're ready for the next feature sprint via `bmad-ml-ai-sprint`."
   - **Greenfield?** --> "Start with `bmad-ml-ai-product-brief` to define your AI product vision."

2. Present recommendations with rationale.

3. Call out blockers, dependencies, and approval gates.

4. Present a clear suggested execution sequence.

**STOP and WAIT for user input.**
