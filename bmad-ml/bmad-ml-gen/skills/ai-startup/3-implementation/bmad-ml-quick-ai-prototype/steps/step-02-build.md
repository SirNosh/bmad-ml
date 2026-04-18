# Step 02 - Build

1. Build minimal LLM integration:
   - Set up API client for the selected model (single provider, no abstraction layer needed)
   - Implement the core prompt: system prompt + user input template that demonstrates the value proposition
   - Add basic conversation context if the demo requires multi-turn interaction
   - Hardcode model parameters (temperature, max_tokens) tuned for the demo scenario

2. Create the UI with Gradio or Streamlit:
   - Build the main interaction interface (chat window, input form, or upload area as appropriate)
   - Add a clear title and brief description explaining what the prototype does
   - Display LLM responses with appropriate formatting (markdown rendering, code highlighting if relevant)
   - Add any demo-specific UI elements (file upload, parameter sliders, example buttons)
   - Include 2-3 pre-built example inputs that showcase the best behavior

3. Implement the core interaction flow:
   - Wire user input through prompt template to LLM and display response
   - If RAG-like: use hardcoded sample documents or a small in-memory collection to demonstrate retrieval
   - If agent-like: implement 1-2 tool calls with mock or simple real implementations
   - If generation-like: implement the generation pipeline with sample inputs
   - Ensure the "demo scenario" from Step 01 works smoothly end-to-end

4. Add basic error handling (prototype-grade only):
   - Catch API errors and display a user-friendly message ("Service temporarily unavailable, please try again")
   - Handle empty input gracefully (prompt user to enter something)
   - Add a loading indicator during LLM calls
   - Set a reasonable timeout (30-60 seconds) to prevent hung requests

5. Explicitly skip (do NOT implement):
   - Full test suite (manual testing of the demo scenario is sufficient)
   - Production error handling, retry logic, or fallback chains
   - Monitoring, logging, or analytics
   - Authentication or multi-user session management
   - Security hardening (input sanitization, rate limiting, prompt injection protection)

6. Document known limitations directly in the prototype code or a brief README:
   - What is real vs faked/hardcoded
   - What breaks if you go off the demo scenario
   - API cost per demo run (approximate)

Continue to ./step-03-finalize.md.
