# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-architecture.md` and build a threat model:
   - System capabilities that could be abused (data access, content generation, tool execution, external API calls)
   - User types and their privilege levels (anonymous, authenticated, admin, API consumers)
   - Sensitive data the system has access to (user data, business data, system configuration)
2. Load `{planning_artifacts}/safety-audit-report.md` if available:
   - Review previously identified vulnerabilities and their remediation status
   - Identify areas that were flagged as partially mitigated or accepted risk
   - Use prior findings to inform red team focus areas
3. Define red team scope and rules of engagement:
   - **In scope**: All user-facing interfaces, all LLM-powered features, all tool integrations, all data pipelines
   - **Out of scope**: Physical infrastructure, social engineering of real employees, denial-of-service attacks (unless specifically requested)
   - **Rules**: No modification of production data, no actions that could harm real users, all testing on staging/test environment
   - **Duration**: Time-boxed engagement (e.g., 1-2 days of focused testing)
4. Select abuse scenarios to test:
   - **Misuse by regular users**: Using the system for unintended purposes (generating harmful content, bypassing restrictions, data mining)
   - **Adversarial users**: Users deliberately trying to break the system (prompt injection, jailbreaking, data exfiltration)
   - **Multi-modal attacks**: Combining multiple attack vectors (social engineering + prompt injection, tool abuse + data leakage)
   - **Scale abuse**: Automated abuse (scripted attacks, API abuse, resource exhaustion)
   - **Reputational risk**: Generating outputs that could embarrass the organization if leaked
5. Define success criteria for the red team: a "successful" red team engagement finds vulnerabilities before real attackers do; the goal is to find as many exploitable issues as possible within the time box.

Continue to ./step-02-build.md.
