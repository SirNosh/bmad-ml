# Step 02 - Build

1. Execute abuse scenario testing:
   - **Content policy abuse**: Attempt to generate harmful, illegal, or policy-violating content through creative prompting (fictional framing, role-play, educational pretext, step-by-step elicitation)
   - **Feature misuse**: Use legitimate features in unintended ways (e.g., use summarization to extract key data from protected documents, use translation to bypass content filters in another language)
   - **Unintended capability discovery**: Probe for capabilities the system was not designed to have (code execution, internet access, file system access through prompt manipulation)
   - **Edge case exploitation**: Find inputs that cause unexpected behavior (extremely long inputs, empty inputs, special characters, concurrent requests, rapid-fire requests)
   - Document each scenario: setup, actions taken, system response, whether abuse succeeded

2. Test social engineering vectors:
   - **Authority impersonation**: Claim to be an administrator, developer, or the AI's creator to gain elevated access or bypass restrictions
   - **Emotional manipulation**: Use urgency, sympathy, or distress to pressure the system into bypassing safety guidelines
   - **Gradual normalization**: Start with benign requests and gradually escalate to policy-violating requests over multiple turns
   - **Misdirection**: Distract the system with a complex legitimate request while embedding a malicious sub-request
   - Document effectiveness of each technique and which defenses (if any) prevented exploitation

3. Test multi-modal attack surfaces:
   - **Combined injection + tool use**: Use prompt injection to manipulate tool calls (read unauthorized data, send data to external endpoints)
   - **RAG poisoning + extraction**: If RAG is used, inject malicious content into the retrieval corpus and verify whether it propagates to user responses
   - **Cross-feature attacks**: Exploit interactions between features (e.g., use conversation history from feature A to influence behavior in feature B)
   - **API abuse**: If the system exposes an API, test for: missing authentication, parameter manipulation, response data leakage, rate limit bypass

4. Test system under load and stress:
   - **Concurrent attack attempts**: Send multiple injection attempts simultaneously and check if any bypass defenses under load
   - **Resource exhaustion**: Submit requests designed to consume maximum resources (very long context, many tool calls, complex reasoning tasks) and verify graceful degradation
   - **Race conditions**: Test for timing-based vulnerabilities (simultaneous writes, session management under concurrent access)
   - **Recovery testing**: After triggering errors or edge cases, verify the system returns to a safe state (no persistent state corruption, no session contamination)

5. Document attack narratives with step-by-step reproduction:
   - Each finding documented as a narrative: attacker goal, attack sequence (step 1, step 2, ..., exploit), system behavior at each step, outcome
   - Include exact inputs and outputs (copy-pasteable reproduction steps)
   - Include screenshots or logs where relevant
   - Rate each finding on real-world exploitability: "A motivated but non-expert attacker could exploit this" vs "Requires significant expertise and specific conditions"

6. Assess real-world exploitability:
   - For each finding, evaluate: How likely is a real user to discover this? How much damage could it cause? Is it automatable?
   - Categorize findings: "Would be found within days of public launch" vs "Requires targeted expert attack"
   - Assess aggregate risk: considering all findings together, what is the overall risk posture for a public launch?

Continue to ./step-03-finalize.md.
