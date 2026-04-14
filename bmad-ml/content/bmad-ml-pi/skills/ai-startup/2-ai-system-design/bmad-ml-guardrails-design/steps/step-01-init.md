# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` to understand where guardrails sit in the system architecture.
2. Read `{planning_artifacts}/agent-behavior-spec.md` if it exists to understand existing refusal policies and boundary definitions.
3. Read `{planning_artifacts}/ai-product-brief.md` for compliance requirements and risk tolerance.
4. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
5. Check for an existing `{planning_artifacts}/guardrails-spec.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
6. Define the threat model with the user. Assess exposure to:
   - **Prompt injection:** direct and indirect injection via user input or retrieved documents.
   - **Jailbreaking:** attempts to override system instructions or role boundaries.
   - **PII leakage:** risk of the model surfacing personal data from training or context.
   - **Harmful content generation:** violence, hate speech, self-harm, illegal activities.
   - **Hallucination:** factually incorrect claims presented as truth.
   - **Data exfiltration:** attempts to extract system prompts, training data, or internal tool schemas.
7. Assess current safety posture:
   - What guardrails (if any) are already in place from the model provider (OpenAI moderation, Anthropic constitutional AI)?
   - What gaps exist between provider-level safety and the product's specific requirements?
8. Record assumptions and open questions.

Continue to ./step-02-build.md.
