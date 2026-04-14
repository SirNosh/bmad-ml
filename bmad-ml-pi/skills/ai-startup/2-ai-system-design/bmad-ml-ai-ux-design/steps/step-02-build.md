# Step 02 - Build

Produce `{planning_artifacts}/ai-ux-spec.md` with the following sections.

## 2.1 Conversation Flow Patterns
- **Onboarding flow:** how the AI introduces itself, sets expectations, and guides first-time users. Define the greeting message and any initial questions.
- **Task completion flow:** step-by-step interaction for the primary use case(s). Map the happy path from user intent to task completion.
- **Error recovery flow:** how the user is informed of errors and guided to retry or adjust their input. Define escalation to human support if applicable.
- **Re-engagement flow:** how the AI handles returning users (context recall, session resumption).

## 2.2 AI Response Formatting
- **Markdown usage:** whether responses use headings, lists, bold, code blocks. Define consistency rules.
- **Structured output:** when responses include tables, cards, or structured data vs. free-form text.
- **Streaming behavior:** whether responses stream token-by-token or deliver as a complete block. Define chunking for streaming if applicable.
- **Response length policy:** target response length by interaction type (short for confirmations, medium for explanations, long for reports).

## 2.3 Loading and Progress Indicators
- **Immediate acknowledgment:** what the user sees while the AI is processing (typing indicator, spinner, progress bar).
- **Long operation handling:** for operations exceeding 5 seconds, define progress communication (percentage, stage updates, estimated time).
- **Cancellation:** whether the user can cancel an in-progress AI operation and what happens to partial results.

## 2.4 Confidence Communication
- **Uncertainty signals:** how the AI communicates when it is unsure (hedging language, confidence scores, source citations).
- **Low-confidence behavior:** whether the AI still answers with caveats or refuses and asks for clarification.
- **Source attribution:** how and when the AI cites its sources (inline, footnotes, expandable references).

## 2.5 Multi-Turn Interaction Patterns
- **Context carryover:** how much conversation history influences each response. Define the context window strategy visible to the user.
- **Topic switching:** how the AI handles mid-conversation topic changes (acknowledge the shift, ask for confirmation, or seamlessly adapt).
- **Conversation threading:** whether parallel conversation threads are supported and how they are visually distinguished.
- **Session persistence:** whether conversations are saved and retrievable, and how session boundaries are communicated.

## 2.6 Accessibility and Internationalization
- **Accessibility:** screen reader compatibility for AI-generated content, keyboard navigation for interactive elements, color contrast for AI status indicators.
- **Internationalization:** which languages are supported at launch, how language detection and switching work, whether the AI can respond in the user's detected language.
- **Responsive design:** how the AI interface adapts to mobile, tablet, and desktop viewports.

Continue to ./step-03-finalize.md.
