# Step 01 - Initialize

1. Read `{planning_artifacts}/ai-architecture.md` to understand system components and user-facing surfaces.
2. Read `{planning_artifacts}/ai-product-brief.md` to understand target users, use cases, and success metrics.
3. Load the project config from `{project-root}/_bmad/config.yaml` (section: `ml`) and user settings from `{project-root}/_bmad/config.user.yaml`.
4. Check for an existing `{planning_artifacts}/ai-ux-spec.md`. If one exists, confirm whether this is a **Create** or **Iterate** run.
5. Define target user personas with the user:
   - For each persona: name, role, technical proficiency, primary goals, pain points.
   - Identify which personas are primary vs. secondary.
   - Note any accessibility requirements (screen readers, low bandwidth, mobile-first).
6. Identify key interaction patterns for this product:
   - **Chat / conversational:** free-form text input with AI responses.
   - **Form-based:** structured input fields with AI-powered suggestions or completions.
   - **Dashboard:** AI-generated insights, summaries, or alerts displayed passively.
   - **API-only:** no direct user interface (developer-facing).
   - **Hybrid:** combination of the above.
7. Record assumptions and open questions.

Continue to ./step-02-build.md.
