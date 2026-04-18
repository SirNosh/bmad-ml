---
artifact: startup-meeting-notes
division: ai-startup
created: YYYY-MM-DD
format: "sprint-review"
meeting_type: ""
participants: []
duration_minutes: null
---

# AI Startup Meeting Notes

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
> **Guidance:** Include only AI Startup agents. Note each attendee's functional role.

| Agent | Role | Role in Meeting | Present? |
|-------|------|----------------|----------|
| Dumbledore | AI Product Architect | {e.g., presenter, reviewer, decision-maker} | {yes/no} |
| Hermione | AI/ML Engineering | {role} | {yes/no} |
| Snape | AI Security & Safety | {role} | {yes/no} |
| Luna | Prompt Engineering & AI UX | {role} | {yes/no} |
| McGonagall | MLOps & Deployment | {role} | {yes/no} |
| Moody | AI QA & Evaluation | {role} | {yes/no} |
| Hagrid | Data Pipeline & Integration | {role} | {yes/no} |
| Nosh | Moderator (Startup CEO) | facilitator | yes |

---

## Format

> **Purpose:** Describe the meeting structure so notes can be interpreted in context.
> **Guidance:** Specify the meeting type and any special rules or procedures.

| Field | Value |
|-------|-------|
| **Meeting Type** | {sprint-review / sprint-retrospective / design-review / release-readiness / triage / direction-setting} |
| **Cadence** | {e.g., weekly, ad-hoc, release boundary} |
| **Decision Protocol** | {e.g., consensus, CEO decides, gate-keeper unanimity for release} |
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

## Release Readiness Gate (if applicable)

> **Purpose:** For Release Readiness meetings, record an explicit go/no-go vote from each gate-keeper so the release decision is auditable.
> **Guidance:** Omit this section for non-release meetings. A no-go from any single gate-keeper blocks the release; record the mitigation plan before re-voting.

| Gate-Keeper | Domain | Vote | Conditions / Blockers | Notes |
|-------------|--------|------|----------------------|-------|
| Moody | Quality & Evaluation | {go / no-go / conditional} | {conditions} | {notes} |
| Snape | Security & Safety | {go / no-go / conditional} | {conditions} | {notes} |
| McGonagall | Deployment & Ops | {go / no-go / conditional} | {conditions} | {notes} |
| Dumbledore | Product Fit | {go / no-go / conditional} | {conditions} | {notes} |

**Overall Release Decision:** {ship / hold / ship-with-conditions}

---

## Decisions Made

> **Purpose:** Create a clear, auditable record of all decisions so they can be referenced and tracked.
> **Guidance:** Each decision should be specific and actionable. Record the rationale so future team members understand the "why."

| # | Decision | Rationale | Decided By | References |
|---|----------|-----------|-----------|-----------|
| 1 | {e.g., "Adopt retrieval-augmented prompting for v0.3"} | {e.g., "Cuts hallucination rate by ~40% per Moody's eval"} | {agent/group} | {link to design doc, eval, etc.} |
| 2 | {decision} | {rationale} | {decided by} | {references} |

---

## Action Items

> **Purpose:** Assign concrete follow-up tasks with owners and deadlines so decisions translate into progress.
> **Guidance:** Each action should be specific enough that completion can be verified. Status is tracked across meetings.

| # | Action | Owner | Deadline | Priority | Status | Notes |
|---|--------|-------|----------|----------|--------|-------|
| 1 | {e.g., "Draft prompt regression suite for v0.3 eval"} | {agent} | {YYYY-MM-DD} | {high/medium/low} | {open / in-progress / done} | {notes} |
| 2 | {action} | {owner} | {deadline} | {priority} | {status} | {notes} |
| 3 | {action} | {owner} | {deadline} | {priority} | {status} | {notes} |

---

## Risks and Blockers

> **Purpose:** Surface issues that could delay or derail the product so they can be addressed proactively.
> **Guidance:** Distinguish between risks (might happen) and blockers (already happening). Assign mitigation owners.

| # | Type | Description | Impact | Mitigation | Owner |
|---|------|------------|--------|-----------|-------|
| 1 | {risk / blocker} | {description} | {high/medium/low} | {mitigation plan} | {owner} |
| 2 | {type} | {description} | {impact} | {mitigation} | {owner} |

---

## Next Steps

> **Purpose:** Summarize what happens after this meeting so momentum is maintained.
> **Guidance:** List the immediate next actions and when the follow-up meeting or checkpoint occurs.

1. {e.g., "Hermione begins integration of approved prompt strategy by Wednesday."}
2. {e.g., "Moody delivers regression eval report by Friday."}
3. {next step}

**Next Meeting:** {date, or trigger condition, e.g., "Before v0.3 release cut"}

---

## Parking Lot

> **Purpose:** Capture important topics that were raised but not discussed due to time constraints, so they are not lost.
> **Guidance:** Items here should be added to the next meeting's agenda, escalated to `bmad-ml-all-hands` if they need Lab input, or assigned for async resolution.

| # | Topic | Raised By | Priority | Disposition |
|---|-------|----------|----------|------------|
| 1 | {topic} | {agent} | {high/medium/low} | {next meeting / all-hands / async / deferred} |
| 2 | {topic} | {agent} | {priority} | {disposition} |
