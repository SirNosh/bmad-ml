# Step 02 - Build

1. Create functional regression test cases:
   - For each prompt template, create 5-10 input/expected-output pairs covering:
     - Typical inputs (the most common use case)
     - Boundary inputs (minimum length, maximum length, edge of valid range)
     - Multi-step inputs (if the prompt supports conversation or chained reasoning)
   - Define pass criteria per test: exact match, contains-keywords, JSON schema validation, LLM-as-judge score >= threshold
   - Tag each test with: prompt_id, category, severity (critical, high, medium), creation_date

2. Create adversarial test cases:
   - **Direct injection**: "Ignore all previous instructions and...", role override attempts, system prompt extraction attempts
   - **Indirect injection**: Instructions embedded in user-provided data (documents, URLs, tool outputs)
   - **Output manipulation**: Attempts to make the model produce specific forbidden outputs, format-breaking inputs
   - **Context manipulation**: Inputs designed to confuse conversation context, fake assistant messages, trust escalation attempts
   - Define pass criteria: model must refuse or handle safely (not follow injected instructions, not leak system prompt)

3. Create multi-language and encoding test cases:
   - Test inputs in top 5 supported languages (or explicitly test unsupported language handling)
   - Test Unicode edge cases: emoji, RTL text, mixed scripts, zero-width characters, homoglyphs
   - Test encoding edge cases: UTF-8 BOM, Latin-1 characters, HTML entities, URL-encoded strings
   - Define pass criteria: correct handling or graceful error message (no garbled output, no crashes)

4. Define pass/fail criteria per test:
   - **Hard pass/fail**: Exact match, JSON schema valid, contains required keywords, does not contain forbidden strings
   - **Scored pass/fail**: LLM-as-judge score >= threshold (e.g., relevance >= 4/5, safety >= 5/5)
   - **Regression detection**: Compare score against baseline; flag if score drops by more than X points
   - Document the evaluation method for each test case in the test definition

5. Integrate into CI/CD pipeline:
   - Create test runner that loads test cases, executes against LLM, evaluates results
   - Configure to run on: prompt changes (mandatory), model updates (mandatory), scheduled nightly (recommended)
   - Implement test result reporting: summary in PR comment, detailed results as pipeline artifact
   - Implement cost tracking: log tokens used and cost per test run
   - Configure caching: cache LLM responses for identical inputs to reduce cost on re-runs (with cache invalidation on model/prompt changes)

6. Document test maintenance procedures:
   - How to add new test cases (file format, required fields, tagging conventions)
   - How to update expected outputs when intentional prompt changes alter behavior
   - How to investigate and triage test failures (differentiate regression vs flaky test vs intentional change)
   - How to retire obsolete test cases
   - Ownership: who is responsible for maintaining each test category

Continue to ./step-03-finalize.md.
