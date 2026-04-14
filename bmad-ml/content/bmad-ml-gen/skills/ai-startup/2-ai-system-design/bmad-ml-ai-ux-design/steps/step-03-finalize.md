# Step 03 - Finalize

1. Validate UX flows against product brief goals:
   - Every primary use case in `ai-product-brief.md` has a corresponding conversation flow defined.
   - The onboarding flow addresses the primary user persona's goals and pain points.
   - Response formatting aligns with the product's positioning (professional, casual, technical).
2. Check error states coverage:
   - Every flow has at least one error recovery path defined.
   - Long operations have progress indicators specified.
   - Cancellation behavior is defined for all async operations.
   - Low-confidence and "I don't know" scenarios are covered.
3. Verify accessibility requirements:
   - Screen reader guidance is defined for all dynamic AI content.
   - All visual indicators (spinners, progress bars, confidence badges) have text alternatives.
4. Save the completed artifact to `{planning_artifacts}/ai-ux-spec.md`.
5. Present the AI UX specification to the user for review. Summarize:
   - Key interaction patterns and flow diagrams.
   - Response formatting and streaming decisions.
   - Accessibility and i18n scope.

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent.**
