# Step 03 - Finalize

1. Present the sprint plan:
   - Sprint objective and duration
   - Goals with acceptance criteria (P0, P1, P2)
   - Task list with: task name, assigned workflow, priority, effort estimate, dependencies
   - Critical path visualization (which tasks gate sprint completion)
   - Risk register with mitigations

2. Confirm task assignments and priorities:
   - Review each P0 task: is the scope clear? Are dependencies resolved? Is the assigned workflow correct?
   - Review capacity: does the total estimated effort fit within sprint duration?
   - Review dependencies: are all external dependencies confirmed and scheduled?
   - Review risks: are mitigations actionable and contingencies defined?
   - Finalize the sprint backlog and task execution order

3. Produce the sprint status artifact:
   - Update or create `ai-sprint-status.yaml` with: sprint number, start date, end date, goals, tasks, priorities, dependencies, risks
   - This artifact is the implementation-planning handoff between approved design and build execution, and it will also be used to track progress during the sprint and as input for the next sprint planning

**STOP and WAIT for user approval. Do not suggest the next workflow or chain to another agent. The user or Nosh will decide next steps.**
