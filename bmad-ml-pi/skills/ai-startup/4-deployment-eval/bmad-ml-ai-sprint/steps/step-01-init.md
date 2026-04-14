# Step 01 - Initialize

1. Load `{planning_artifacts}/ai-sprint-status.yaml` if it exists:
   - Review previous sprint outcomes: goals achieved, goals missed, carryover items
   - Review velocity data: how many tasks were completed vs planned in previous sprints
   - Identify recurring blockers or risks from sprint history
2. Load `{planning_artifacts}/ai-product-brief.md` for product context:
   - Current product vision and roadmap priorities
   - Upcoming milestones or deadlines that constrain sprint scope
   - Stakeholder expectations for this sprint cycle
3. Load `{planning_artifacts}/ai-architecture.md` and any approved design-detail artifacts for technical context:
   - Current implementation status: what is built, what remains
   - Technical debt items that may affect sprint work
   - Dependencies on external teams or services
   - Design decisions that must be preserved during implementation handoff
4. Define sprint scope and goals:
   - Sprint duration (1 week, 2 weeks, or custom)
   - Sprint theme or objective (e.g., "Complete RAG pipeline MVP", "Address safety audit findings", "Performance optimization sprint")
   - What must be true at the end of this sprint for it to be considered successful (concrete, verifiable acceptance criteria)
5. Gather inputs for sprint planning:
   - Backlog of pending work items (from previous sprints, product requests, bug reports, tech debt)
   - Available team capacity (agent workflows available, external dependencies, blocked items)
   - Risks and blockers known at sprint start

Continue to ./step-02-build.md.
