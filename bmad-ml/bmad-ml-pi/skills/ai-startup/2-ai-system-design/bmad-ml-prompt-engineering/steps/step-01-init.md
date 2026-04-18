# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` to understand system components that require prompts.
2. Read `{planning_artifacts}/agent-behavior-spec.md` if it exists to align prompts with defined behavior contracts.
3. Read `{planning_artifacts}/agent-system-design.md` if it exists to identify all agents needing prompts.
4. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
5. Check for an existing `{planning_artifacts}/prompt-spec.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
6. Build a prompt inventory -- identify every prompt needed:
   - **System prompts:** one per agent or LLM-powered component.
   - **User-facing prompts:** templates shown to or generated for end users.
   - **Internal agent prompts:** chain-of-thought scaffolds, tool-selection prompts, routing prompts.
   - **Evaluation prompts:** LLM-as-judge prompts for automated quality checks.
7. Define the prompt versioning and testing approach:
   - How prompts will be stored (inline code, config files, prompt management platform).
   - How prompt changes will be tested before deployment (regression suite, A/B test, shadow mode).
8. Record assumptions and open questions.

Continue to ./step-02-build.md.
