# Step 01 - Initialize

1. Load existing prompt inventory from `{planning_artifacts}/prompt-spec.md` and catalog:
   - Every system prompt and prompt template in use
   - Expected behavior for each prompt (what it should produce, what it should refuse)
   - Input variable schemas and valid ranges for each prompt
2. Load evaluation criteria from `{planning_artifacts}/ai-architecture.md`:
   - Quality thresholds that must be maintained across changes
   - Safety requirements that must not regress
   - Output format requirements that must remain stable
3. Identify critical behaviors to protect:
   - Core functionality: the primary task each prompt performs must continue working
   - Safety behaviors: refusal of harmful requests, PII handling, content policy compliance
   - Format compliance: output structure (JSON, markdown, specific templates) must remain valid
   - Edge case handling: previously fixed bugs or edge cases must not recur
4. Define test categories:
   - **Functional tests**: Does the prompt produce correct outputs for standard inputs?
   - **Safety tests**: Does the prompt refuse harmful inputs and avoid leaking protected information?
   - **Format tests**: Does the output match the required structure and schema?
   - **Adversarial tests**: Does the prompt resist injection, jailbreaking, and manipulation attempts?
   - **Multilingual tests**: Does the prompt handle non-English input and encoding correctly?
   - **Regression-specific tests**: Test cases derived from previously reported bugs or failures
5. Define test infrastructure requirements: LLM API access for test execution, estimated cost per full regression run, execution time target.

Continue to ./step-02-build.md.
