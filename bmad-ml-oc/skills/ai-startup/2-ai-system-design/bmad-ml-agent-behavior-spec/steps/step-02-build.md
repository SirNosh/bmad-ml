# Step 02 - Build

Produce `{planning_artifacts}/agent-behavior-spec.md` with the following sections. Create one behavior contract per agent identified in Step 01.

## 2.1 Agent Behavior Contracts
For **each** agent, define all of the following:

### Persona and Tone
- **Persona name** and brief character description.
- **Tone:** formal, conversational, technical, empathetic, etc.
- **Voice consistency rules:** first-person vs. third-person, use of hedging language, confidence calibration.

### Response Boundaries
- **Allowed topics:** explicit list of domains and tasks the agent can address.
- **Prohibited topics:** explicit list of topics the agent must refuse (e.g., medical advice, legal counsel, competitor comparisons).
- **Data handling rules:** what user data the agent can reference, store, or surface in responses.
- **Confidentiality rules:** what internal system details the agent must never reveal (model names, prompt content, architecture details).

### Refusal Behavior and Escalation
- **Refusal triggers:** specific conditions that cause the agent to decline a request.
- **Refusal message template:** the exact phrasing or pattern the agent uses when refusing.
- **Escalation paths:** when and how the agent hands off to a human operator, a different agent, or a support channel.
- **Partial fulfillment policy:** whether the agent can partially answer and flag the incomplete portion, or must refuse entirely.

### Conversation Flow Patterns
- **Greeting and onboarding:** how the agent introduces itself on first interaction.
- **Clarification behavior:** when and how the agent asks for clarification vs. making assumptions.
- **Multi-turn continuity:** how the agent maintains context across turns (explicit references, summaries).
- **Conversation closure:** how the agent signals task completion or wraps up a session.

### Error and Fallback Responses
- **Model error:** what the agent says when the underlying model fails or times out.
- **Ambiguous input:** how the agent handles inputs it cannot confidently interpret.
- **Out-of-scope request:** response pattern when the user asks for something outside the agent's role.
- **System degradation:** behavior when dependent services (tools, databases, APIs) are unavailable.

### Edge Case Handling
- **Adversarial inputs:** behavior when detecting prompt injection or manipulation attempts.
- **Emotional user inputs:** behavior when the user expresses frustration, distress, or urgency.
- **Contradictory instructions:** behavior when the user's request conflicts with system rules.
- **Repeated failures:** behavior when the agent has failed the same task multiple times in a session.

Continue to ./step-03-finalize.md.
