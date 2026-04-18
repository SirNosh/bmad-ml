# Step 01 - Initialize

1. Load all system prompts from `{planning_artifacts}/prompt-spec.md` and the deployed system:
   - Catalog every system prompt (main chat prompt, tool-use prompts, RAG prompts, summarization prompts)
   - Note which prompts interact with user-controlled input directly vs indirectly
   - Identify which prompts have access to sensitive tools, data, or actions
2. Load `{planning_artifacts}/guardrails-spec.md` and extract:
   - Input filtering rules (what is blocked before reaching the LLM)
   - Output filtering rules (what is blocked before reaching the user)
   - System prompt protection mechanisms (instruction hierarchy, delimiter enforcement)
   - Known limitations or acknowledged risks in the guardrails design
3. Define test scope:
   - **Components to test**: Each LLM integration point where user input (direct or indirect) reaches a prompt
   - **Injection types to cover**: Direct injection, indirect injection, multi-turn injection, tool-use injection
   - **Severity framework**: What constitutes a successful injection (system prompt leaked, unauthorized action taken, content policy bypassed, output manipulated)
4. Prepare the attack library:
   - Compile injection payloads organized by type (instruction override, role manipulation, output format manipulation, delimiter escape, encoding tricks)
   - Include both well-known payloads (from public research) and custom payloads tailored to this system's prompts
   - For each payload, define what a successful exploit looks like and what a proper defense looks like
5. Define the test environment: use staging or a test instance (not production), confirm LLM API access, confirm test results will not affect production data or users.

Continue to ./step-02-build.md.
