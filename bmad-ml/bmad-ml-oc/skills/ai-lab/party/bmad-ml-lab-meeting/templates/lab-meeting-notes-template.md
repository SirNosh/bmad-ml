---
artifact: lab-meeting-notes
division: ai-lab
created: YYYY-MM-DD
format: "direction-setting"
meeting_type: ""
participants: []
duration_minutes: null
---

# AI Lab Meeting Notes

## Agenda

> **Purpose:** Set the meeting structure so time is allocated to the highest-priority items and participants come prepared.
> **Guidance:** List agenda items in priority order. Assign a time box and presenter/owner to each. Mark items as discussion, decision, or informational.

| # | Topic | Type | Time Box | Presenter | Pre-Read |
|---|-------|------|----------|-----------|----------|
| 1 | {topic} | {decision / discussion / informational} | {minutes} | {agent} | {link to artifact, if any} |
| 2 | {topic} | {type} | {minutes} | {presenter} | {pre-read link} |
| 3 | {topic} | {type} | {minutes} | {presenter} | {pre-read link} |

---

## Attendees

> **Purpose:** Record who participated so that decisions have clear accountability.
> **Guidance:** Include only AI Lab agents. Note whether each attendee is from the research group or the build group.

| Agent | Group | Role in Meeting | Present? |
|-------|-------|----------------|----------|
| {name} | {Research / Build} | {e.g., presenter, reviewer, decision-maker} | {yes/no} |
| {name} | {group} | {role} | {yes/no} |
| {name} | {group} | {role} | {yes/no} |

---

## Format

> **Purpose:** Describe the meeting structure so notes can be interpreted in context.
> **Guidance:** Specify the meeting type and any special rules or procedures.

| Field | Value |
|-------|-------|
| **Meeting Type** | {sprint-retrospective / direction-setting / triage / full-debrief} |
| **Cadence** | {e.g., weekly, ad-hoc, experiment boundary} |
| **Decision Protocol** | {e.g., consensus, Lab Director decides, majority vote} |
| **Notes Taken By** | {agent} |

---

## Discussion Summary

> **Purpose:** Capture the substance of each agenda item's discussion so decisions are grounded and the reasoning is preserved.
> **Guidance:** For each agenda item, record the key perspectives, any debate, and the resolution. Reference supporting artifacts.

### Agenda Item 1: {Topic}

**Context:** {Brief background on why this is being discussed.}

**Perspectives:**

| Agent | Position | Key Points |
|-------|---------|-----------|
| {agent} | {stance} | {arguments, evidence cited} |
| {agent} | {stance} | {arguments, evidence cited} |

**Debate / Discussion:**

{Summarize the back-and-forth. What were the sticking points? What evidence swayed opinions?}

**Resolution:**

{What was decided or concluded? If unresolved, state that and where it goes next.}

---

### Agenda Item 2: {Topic}

**Context:** {background}

**Perspectives:**

| Agent | Position | Key Points |
|-------|---------|-----------|
| {agent} | {stance} | {points} |
| {agent} | {stance} | {points} |

**Debate / Discussion:**

{summary}

**Resolution:**

{decision or next step}

---

{Repeat for additional agenda items.}

---

## Decisions Made

> **Purpose:** Create a clear, auditable record of all decisions so they can be referenced and tracked.
> **Guidance:** Each decision should be specific and actionable. Record the rationale so future team members understand the "why."

| # | Decision | Rationale | Decided By | References |
|---|----------|-----------|-----------|-----------|
| 1 | {e.g., "Proceed with DeBERTa-v3 as baseline architecture"} | {e.g., "Best accuracy-cost trade-off per ADR-001 analysis"} | {agent/group} | {link to ADR, experiment design, etc.} |
| 2 | {decision} | {rationale} | {decided by} | {references} |

---

## Action Items

> **Purpose:** Assign concrete follow-up tasks with owners and deadlines so decisions translate into progress.
> **Guidance:** Each action should be specific enough that completion can be verified. Status is tracked across meetings.

| # | Action | Owner | Deadline | Status | Notes |
|---|--------|-------|----------|--------|-------|
| 1 | {e.g., "Draft experiment design for LoRA ablation"} | {agent} | {YYYY-MM-DD} | {open / in-progress / done} | {notes} |
| 2 | {action} | {owner} | {deadline} | {status} | {notes} |
| 3 | {action} | {owner} | {deadline} | {status} | {notes} |

---

## Risks and Blockers

> **Purpose:** Surface issues that could delay or derail planned work so they can be addressed proactively.
> **Guidance:** Distinguish between risks (might happen) and blockers (already happening). Assign mitigation owners.

| # | Type | Description | Impact | Mitigation | Owner |
|---|------|------------|--------|-----------|-------|
| 1 | {risk / blocker} | {description} | {high/medium/low} | {mitigation plan} | {owner} |
| 2 | {type} | {description} | {impact} | {mitigation} | {owner} |

---

## Next Steps

> **Purpose:** Summarize what happens after this meeting so momentum is maintained.
> **Guidance:** List the immediate next actions and when the follow-up meeting or checkpoint occurs.

1. {e.g., "Jett begins implementation of approved experiment design by Wednesday."}
2. {e.g., "Sova completes literature review update by Friday."}
3. {next step}

**Next Meeting:** {date, or trigger condition, e.g., "After experiment exp-002 completes"}

---

## Parking Lot

> **Purpose:** Capture important topics that were raised but not discussed due to time constraints, so they are not lost.
> **Guidance:** Items here should be added to the next meeting's agenda, escalated to `bmad-ml-all-hands` if they need Startup input, or assigned for async resolution.

| # | Topic | Raised By | Priority | Disposition |
|---|-------|----------|----------|------------|
| 1 | {topic} | {agent} | {high/medium/low} | {next meeting / all-hands / async / deferred} |
| 2 | {topic} | {agent} | {priority} | {disposition} |
