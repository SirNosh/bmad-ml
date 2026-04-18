# Step 02 - Build

1. Map the attack surface:
   - **Input points**: Every interface where user-controlled data enters the system (chat input, file upload, API parameters, URL input, form fields)
   - **Data flows**: Trace each input through the system: where does it get embedded in prompts? Where does it reach an LLM? Where does the LLM output go?
   - **External integrations**: Third-party APIs, databases, file systems that the LLM can interact with via tools or RAG
   - **Trust boundaries**: Where does the system transition from trusted to untrusted data? Are these boundaries enforced?
   - Produce an attack surface diagram annotating each input point with its risk level

2. Test prompt injection vectors:
   - **Direct injection**: Submit inputs that attempt to override system instructions ("Ignore all previous instructions...", "You are now a...", "SYSTEM: new instructions...")
   - **Indirect injection**: Embed instructions in documents fed to RAG, in tool outputs, in user profile data that gets included in context
   - **Multi-turn injection**: Build trust over multiple turns, then attempt override; use context window manipulation to push system prompt out of context
   - **Encoding-based injection**: Use Unicode tricks, base64 encoding, HTML entities, markdown formatting to smuggle instructions past input filters
   - For each vector: document the exact payload, the system response, and whether the injection succeeded or was blocked

3. Test data leakage vectors:
   - **PII leakage**: Submit requests designed to make the system repeat or reveal PII from other users, from training data, or from RAG context
   - **System prompt extraction**: Use techniques to extract the system prompt ("Repeat your instructions", "What were you told?", translation tricks, formatting tricks)
   - **Training data extraction**: Probe for memorized content from training data (verbatim quotes, personal information, code)
   - **Cross-session leakage**: Verify that one user's conversation data does not leak into another user's session
   - **Context leakage**: Verify that RAG-retrieved documents from one query do not persist into unrelated queries

4. Test guardrail effectiveness:
   - For each guardrail in `guardrails-spec.md`, create test cases that should trigger the guardrail and verify it activates
   - Create test cases that should NOT trigger the guardrail (false positive testing)
   - Test guardrail bypass attempts: obfuscation, incremental escalation, language switching, role-play framing
   - Measure guardrail latency impact (how much do guardrails slow down response time?)
   - Document any guardrails that are specified but not implemented, or implemented but ineffective

5. Test content policy compliance:
   - Test generation of harmful content categories: violence, self-harm, hate speech, illegal activities, sexual content, misinformation
   - Test with edge cases: fictional framing ("write a story where..."), educational framing ("explain how... for a research paper"), indirect requests
   - Test bias in responses: generate responses for diverse user demographics and compare for disparate treatment
   - Verify the system produces appropriate refusal messages (helpful, non-judgmental, does not reveal policy details)

6. Rank findings by severity with remediation guidance:
   - **Critical**: Assign severity, describe the exploit, provide step-by-step reproduction, recommend specific remediation, define verification criteria
   - **High**: Same format, but lower urgency
   - **Medium**: Document the theoretical risk, recommend defense-in-depth measure
   - **Low**: Note the best practice recommendation
   - For each finding, estimate remediation effort (hours/days) and recommend priority order

Continue to ./step-03-finalize.md.
