# Step 03 - Finalize

1. Rank vulnerabilities by exploitability and impact:
   - **Critical**: Exploitable with simple payloads, leads to unauthorized actions or data leakage, affects production users
   - **High**: Exploitable with moderate effort, leads to policy bypass or output manipulation, mitigations exist but are incomplete
   - **Medium**: Exploitable in specific conditions, limited impact, defense-in-depth recommendation
   - **Low**: Theoretical risk, requires significant effort, minimal impact
   - Produce a severity distribution summary: N critical, N high, N medium, N low

2. Prioritize remediations:
   - Rank fixes by: severity (critical first) -> ease of fix (quick wins next) -> coverage (fixes that address multiple findings)
   - For each remediation, provide: specific technical approach, estimated implementation effort, expected risk reduction
   - Group related findings that can be addressed by a single fix (e.g., strengthening the system prompt may address multiple direct injection findings)
   - Define verification criteria: how to confirm each remediation is effective (specific test cases to re-run)

3. Present findings for review:
   - Prompt injection test report: methodology, findings table, severity distribution
   - Top 5 most critical findings with full reproduction steps
   - Remediation priority list with effort estimates
   - Comparison against industry benchmarks (if available: how does this system compare to typical prompt injection resistance?)
   - Recommended re-test scope after remediations are applied

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
