# Step 02 - Build

1. Define sprint goals and acceptance criteria:
   - **Primary goal**: The single most important outcome for this sprint (with measurable acceptance criteria)
   - **Secondary goals**: 2-3 additional outcomes that should be achieved if capacity allows
   - **Stretch goals**: Nice-to-have items that can be deferred without impacting the sprint objective
   - Each goal must have concrete acceptance criteria (e.g., "RAG pipeline processes 1000 documents with >90% quality score" not "improve RAG pipeline")

2. Identify tasks and assign to workflows:
   - Break each goal into specific tasks, each mapped to a BMAD workflow:
     - Example: "Implement embedding pipeline" -> `bmad-ml-embedding-pipeline` workflow
     - Example: "Run safety audit on new features" -> `bmad-ml-ai-safety-audit` workflow
     - Example: "Set up monitoring dashboards" -> `bmad-ml-ai-monitoring` workflow
   - For tasks that do not map to an existing workflow, define them as standalone tasks with clear deliverables
   - Estimate effort per task: Small (< 1 hour agent work), Medium (1-4 hours), Large (4+ hours)

3. Set priorities and dependencies:
   - Assign priority to each task: P0 (must complete this sprint), P1 (should complete), P2 (stretch)
   - Map task dependencies: which tasks must complete before others can start
   - Identify the critical path: the sequence of dependent tasks that determines minimum sprint duration
   - Identify parallelizable tasks: tasks with no dependencies that can run concurrently
   - Order tasks for execution: dependency order within priority tiers

4. Identify risks and blockers:
   - **Technical risks**: Tasks with uncertain scope or complexity, new technology, unproven approaches
   - **Dependency risks**: Tasks blocked by external inputs, API access, data availability, other team deliverables
   - **Capacity risks**: Sprint plan exceeds available capacity, key skills not available
   - For each risk: define mitigation (what to do if the risk materializes) and contingency (how to adjust the sprint plan)
   - Identify known blockers and actions to resolve them before or during the sprint

5. Define sprint review criteria:
   - How sprint success will be measured (acceptance criteria from goal definitions)
   - What artifacts will be produced and reviewed at sprint end
   - What metrics will be reported (tasks completed vs planned, goals achieved, blockers encountered)
   - When the sprint review will happen and who will participate

Continue to ./step-03-finalize.md.
