# Step 01 - Initialize

1. Confirm the all-hands is appropriate: the agenda must genuinely require input from BOTH the AI Lab and AI Startup divisions. If the topic is Lab-only (research, experimentation, model development), redirect to `bmad-ml-lab-meeting`. If it is Startup-only (product, LLM app, deployment), redirect to `bmad-ml-startup-meeting`.
2. Select the meeting format: **Sprint Retrospective** (review what worked and what didn't in the last cross-division cycle), **Direction Setting** (align on research-to-product priorities and resource allocation), **Triage** (assess and prioritize a backlog of issues spanning both divisions), or **Full Debrief** (comprehensive status review across all active work in both divisions).
3. Determine which agents from BOTH divisions to include -- AI Lab (research group: Sova, Sage, Cypher, Viper, Breach, Fade, Astra, Killjoy; build group: Chamber, Jett, Gekko, Omen, KAY/O) and AI Startup (Dumbledore, Hermione, Snape, Luna, McGonagall, Moody, Hagrid). Select only those whose expertise is relevant to the agenda.
4. Frame the agenda: list 3-5 specific topics or questions to address. Each topic should have a clear decision or outcome expected and should be labelled with whether it is primarily Lab, Startup, or genuinely cross-cutting.
5. Gather relevant status artifacts from both divisions: experiment-status.yaml and results-report.md from the Lab side, ai-product-brief.md and ai-sprint-status.yaml from the Startup side, plus any blockers or risks from either division.
6. Assign a moderator role (typically Nosh, the shared orchestrator) to keep the meeting focused and time-boxed across divisions.
7. Define the expected meeting output: decisions made, action items assigned with owning division, and next steps documented.
8. Set time expectations: each agenda item should have an estimated discussion length to prevent any single topic or division from dominating.
9. Present the agenda and participant list to the user for approval.

10. If operating in autonomous mode (invoked by Nosh), use the directive to set the agenda and skip the confirmation gate.

> Soft gate: "Here is the all-hands agenda, format, and cross-division participant list. Ready to convene, or any agenda changes?"

Continue to ./step-02-build.md.
