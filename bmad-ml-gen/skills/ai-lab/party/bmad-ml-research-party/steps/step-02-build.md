# Step 02 - Build and Analyze

1. Spawn all selected agents in parallel. Each agent receives the context summary, central question, and their role/perspective instruction.
2. Each agent responds from their specialist perspective. Responses should be substantive (not just agreeing) and grounded in their domain expertise.
3. Collect all agent responses unabridged. Do not summarize or filter at this stage.
4. Present responses with agent identifiers (icons and names) so the user can attribute perspectives.
5. Identify areas of agreement across agents: these represent higher-confidence findings.
6. Identify areas of disagreement or tension: these represent open questions requiring further investigation or user judgment.
7. If the format is Research Debate, ensure both sides have had equal opportunity to present their strongest arguments.
8. Ask the user if they want follow-up rounds: agents can respond to each other's points, address user questions, or dive deeper into specific sub-topics.
9. If follow-up rounds are requested, relay the user's questions and prior agent responses to the agents for continued discussion.
10. Track the discussion's convergence: are agents reaching consensus, or are disagreements deepening? Report this to the user.

> Soft gate: "All agents have responded. Would you like a follow-up round, or shall I synthesize the findings?"

Continue to ./step-03-finalize.md.
