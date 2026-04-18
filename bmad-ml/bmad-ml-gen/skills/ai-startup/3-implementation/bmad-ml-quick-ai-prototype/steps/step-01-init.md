# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-product-brief.md` and extract:
   - Core value proposition: what is the AI product supposed to do for users?
   - Primary user interaction pattern (chat, search, generation, analysis, classification)
   - Target user persona and their key workflow
2. Define prototype scope by drawing a clear line between "build" and "fake":
   - **Build for real**: Core LLM interaction, primary UI flow, basic input/output handling
   - **Fake or stub**: Authentication, persistent storage, production error handling, analytics, multi-user support, advanced features
   - **Skip entirely**: Security hardening, monitoring, CI/CD, documentation, performance optimization
3. Set a time box for the prototype:
   - Target completion time (e.g., 2-4 hours of agent work)
   - Define the "demo scenario": the specific sequence of user actions that demonstrates the value proposition
   - Identify the 1-2 "wow moments" that should work convincingly in the demo
4. Select the prototype stack:
   - **UI**: Gradio (fastest for ML demos) or Streamlit (better for data-oriented UIs)
   - **LLM**: Single model, hardcoded API key, no fallback needed
   - **Data**: In-memory or hardcoded sample data, no database
5. List known constraints: API costs for the demo, model access limitations, data availability for demo content.

Continue to ./step-02-build.md.
