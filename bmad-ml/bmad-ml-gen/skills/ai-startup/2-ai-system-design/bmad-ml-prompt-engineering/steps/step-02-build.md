# Step 02 - Build

Produce `{planning_artifacts}/prompt-spec.md` with the following sections.

## 2.1 System Prompts
For **each** LLM-powered component or agent, define:
- **Component name:** which agent or module this prompt belongs to.
- **Role definition:** who the LLM is, what it does, and its expertise.
- **Boundary instructions:** what the LLM must NOT do (topic restrictions, refusal triggers, scope limits).
- **Output format specification:** expected response structure (JSON, markdown, plain text, structured fields).
- **Tone and style directives:** formality level, verbosity, persona consistency.

## 2.2 Few-Shot Examples
- For each prompt that benefits from examples, provide 2-3 input/output pairs covering:
  - A typical successful case.
  - An edge case or ambiguous input.
  - A case that should trigger refusal or clarification.
- Justify why few-shot examples are included (or explicitly omitted) for each prompt.

## 2.3 Chain-of-Thought Structures
- For reasoning-heavy tasks, define the CoT scaffold:
  - Step labels the model should follow (e.g., "Step 1: Identify the user's intent").
  - Whether CoT should be visible to the user or hidden (think tags, scratchpad).
  - Token budget allocated to reasoning vs. final answer.

## 2.4 Tool and Function Descriptions
- For each tool an agent can call, define:
  - **Function name** and **description** as it appears in the function calling schema.
  - **Parameter descriptions** written to guide the LLM on when and how to use each parameter.
  - **Usage guidance** embedded in the system prompt (when to prefer one tool over another).

## 2.5 Prompt Templates with Variable Slots
- Define reusable prompt templates with clearly marked variable slots (e.g., `{{user_query}}`, `{{retrieved_context}}`, `{{conversation_history}}`).
- Specify the assembly order: system prompt + context injection + user message + formatting instructions.
- Define maximum token allocation per slot to prevent context window overflow.

## 2.6 Prompt Regression Test Criteria
- For each prompt, define at least 3 test cases:
  - **Input:** the user message or trigger.
  - **Expected behavior:** what the response must contain or how it must be structured.
  - **Failure criteria:** what would constitute a regression (e.g., hallucinated citation, broken JSON, off-topic response).
- Define the evaluation method: exact match, LLM-as-judge, human review, or regex pattern.

Continue to ./step-03-finalize.md.
