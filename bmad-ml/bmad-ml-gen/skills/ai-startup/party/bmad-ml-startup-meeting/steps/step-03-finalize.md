# Step 03 - Finalize and Route

1. Produce startup-meeting-notes.md with sections: date, format, AI Startup participants, agenda, decisions, action items, risks/blockers, and parking lot.
2. List all decisions made during the meeting with: the decision statement, the rationale, any dissenting views, and the responsible owner (a specific Startup agent). For Release Readiness meetings, include the explicit go/no-go vote from each gate-keeper (Moody, Snape, McGonagall, Dumbledore).
3. List all action items with: description, owner, deadline, and acceptance criteria. Mark priority (high/medium/low).
4. List deferred topics (parking lot) with: brief description, reason for deferral, and proposed follow-up date or trigger.
5. Summarize the overall Startup product status and trajectory: is the product on track, at risk, or blocked? Call out any open safety or deployment concerns.
6. Identify any workflow activations triggered by meeting decisions (e.g., "decided to harden prompts" -> trigger `bmad-ml-prompt-engineering`; "need to re-evaluate model" -> trigger `bmad-ml-ai-qa-eval`; "ship it" -> trigger `bmad-ml-deployment`; "escalate to cross-division" -> trigger `bmad-ml-all-hands`).
7. Update iteration history with the date, meeting format, key decisions, and action item count.
8. Present the completed meeting notes for user review and approval before marking the workflow complete.

**Deliverables:** startup-meeting-notes.md (with agenda outcomes, decisions with rationale, action items with owners and deadlines, risks/blockers, and parking lot).

**Recommended next workflow:** Depends on meeting decisions -- action items specify the workflows to activate next.

> Quality check: Verify that (a) every agenda item has an outcome documented, (b) all action items have owners and deadlines, (c) decisions include rationale, (d) parking lot items have follow-up plans, (e) Release Readiness meetings have explicit gate-keeper votes recorded, and (f) no AI Lab agents were included -- if they were needed, the meeting should have been `bmad-ml-all-hands`.
