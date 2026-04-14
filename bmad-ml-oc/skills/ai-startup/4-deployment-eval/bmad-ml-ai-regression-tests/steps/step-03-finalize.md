# Step 03 - Finalize

1. Run the full regression suite:
   - Execute all test categories (functional, safety, adversarial, multilingual, format)
   - Report results per category: total tests, passed, failed, skipped
   - Report overall pass rate and per-category pass rates
   - Flag any critical or high-severity test failures for immediate attention
   - Report execution time and API cost for the full run

2. Report coverage and results:
   - Prompt coverage: percentage of prompt templates with at least 5 test cases
   - Behavior coverage: percentage of critical behaviors (from Step 01) covered by at least one test
   - Category distribution: number of tests per category (functional, safety, adversarial, multilingual)
   - Gap analysis: identify prompts or behaviors with insufficient test coverage
   - Provide the complete test results report (pass/fail per test with details on failures)

3. Present for review:
   - Regression test suite summary (total tests, coverage, category breakdown)
   - Test results from initial run (pass rates, failure analysis)
   - CI/CD integration status (which pipelines include regression tests, trigger conditions)
   - Test maintenance guide
   - Recommendations for expanding coverage (specific gaps to fill)

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
