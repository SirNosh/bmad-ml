# Step 03 - Finalize

1. Demo the prototype:
   - Walk through the defined demo scenario step by step
   - Show the "wow moments" identified in Step 01
   - Show 2-3 example interactions that highlight the value proposition
   - Note any rough edges encountered during the demo

2. Document what works vs what is faked:
   - **Works for real**: List components that use actual LLM calls and real logic
   - **Faked/stubbed**: List components that use hardcoded data, mock responses, or simplified logic
   - **Missing entirely**: List features that would be needed for production but were skipped
   - Provide an honest assessment of how representative the prototype is of the full product vision

3. List requirements for the production path:
   - Infrastructure requirements (hosting, database, vector store, authentication)
   - Components that need to be built from scratch (what the prototype faked)
   - Components that need to be hardened (error handling, security, monitoring)
   - Estimated effort to go from prototype to MVP (rough order of magnitude)
   - Recommended next workflows to execute (but do not chain to them)

4. Present results to the user:
   - Live prototype (running URL or launch instructions)
   - Demo scenario walkthrough summary
   - Honest assessment: what the prototype proves and what it does not
   - Production gap analysis
   - Prototype code location and structure

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
