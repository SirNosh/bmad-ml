# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and extract:
   - System architecture diagram (all components, data flows, external integrations)
   - LLM integration points (where user input reaches an LLM, where LLM output reaches users)
   - Data flows involving sensitive information (PII, credentials, proprietary data)
   - Existing safety mechanisms described in the architecture
2. Load `{planning_artifacts}/guardrails-spec.md` and extract:
   - Input guardrails (content filtering, input validation, rate limiting)
   - Output guardrails (response filtering, PII redaction, format enforcement)
   - System prompt protection mechanisms
   - Monitoring and alerting for safety events
3. Define audit scope:
   - **Components in scope**: List every component that processes user input or LLM output
   - **Attack vectors to test**: Prompt injection (direct, indirect), data leakage, content policy violations, abuse patterns
   - **Data flows to audit**: Input -> LLM, LLM -> output, LLM -> tool calls, tool results -> LLM, RAG context -> LLM
   - **Out of scope**: Infrastructure security (unless directly relevant to AI safety), network security, authentication/authorization (unless AI-specific)
4. Prepare the audit checklist using the safety audit template:
   - Prompt injection resistance (direct, indirect, multi-turn)
   - System prompt confidentiality
   - PII handling (detection, redaction, storage, access)
   - Content policy compliance (harmful content, bias, misinformation)
   - Tool use safety (unauthorized actions, data exfiltration via tools)
   - Data leakage (training data extraction, context leakage between users)
5. Define severity classification: Critical (exploitable in production, user harm), High (exploitable with effort, potential harm), Medium (theoretical risk, defense in depth), Low (minor issue, best practice recommendation).

Continue to ./step-02-build.md.
