# Step 01 - Initialize

1. Select the party format: **Journal Club** (deep dive into a specific paper), **Research Debate** (argue for/against an approach), **Literature Synthesis** (combine insights from multiple sources), **Feasibility Council** (assess whether a direction is viable), or **Idea Lab** (brainstorm new approaches).
2. Select participants from the research agent roster. Choose agents with complementary expertise relevant to the topic (e.g., data specialist + architecture specialist + optimization specialist).
3. Frame the central question or topic in one clear sentence. This focuses the discussion and prevents scope creep.
4. Build a concise context summary (<400 words) that all agents will receive: background, current state, key constraints, and what kind of insight is needed.
5. Identify any artifacts to share with participants: literature-review.md, results-report.md, or specific papers.
6. Define the expected output: what should the party produce? (Recommendations, ranked options, risk assessment, research directions.)
7. Set discussion parameters: number of rounds (recommend 2-3), time focus (keep responses focused), and whether cross-agent dialogue is expected.
8. Present the party setup to the user for approval before spawning agents.

9. If operating in autonomous mode (invoked by Nosh), use the directive as the central question, select all relevant agents, and skip the confirmation gate.

> Soft gate: "Here is the research party setup: format, participants, central question, and context. Ready to convene, or any adjustments?"

Continue to ./step-02-build.md.
