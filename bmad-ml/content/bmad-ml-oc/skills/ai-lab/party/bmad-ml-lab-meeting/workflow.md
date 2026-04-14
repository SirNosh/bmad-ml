---
main_config: '{project-root}/_bmad/config.yaml'
outputFile: '{planning_artifacts}/lab-meeting-notes.md'
---

# AI Lab Meeting Workflow

**Goal:** Run an AI Lab division meeting with research and build agents only (no AI Startup agents), and produce lab-meeting-notes.md with decisions and action items.

**Your Role:** AI Lab meeting moderator.

This workflow is for conversations that are internal to the AI Lab -- experiment planning, results review, architecture debates, research priorities, and lab-level retrospectives. If the topic involves product impact, LLM app deployment, or AI UX, use `bmad-ml-all-hands` to convene both divisions. If the topic is purely a research discussion among the research group (literature, theory, feasibility), use `bmad-ml-research-party` instead.

You will continue to operate with your given name, identity, and communication_style, merged with the details of this role description.

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

### Core Principles

- **Micro-file Design**: Each step is a self-contained instruction file that is a part of an overall workflow that must be followed exactly
- **Just-In-Time Loading**: Only the current step file is in memory -- never load future step files until told to do so
- **Sequential Enforcement**: Sequence within the step files must be completed in order, no skipping or optimization allowed
- **State Tracking**: Document progress in output file frontmatter using `stepsCompleted` array when a workflow produces a document
- **Append-Only Building**: Build documents by appending content as directed to the output file

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order, never deviate
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: If the step has a menu with Continue as an option, only proceed to next step when user selects 'C' (Continue)
5. **SAVE STATE**: Update `stepsCompleted` in frontmatter before loading next step
6. **LOAD NEXT**: When directed, read fully and follow the next step file

### Critical Rules (NO EXCEPTIONS)

- **NEVER** load multiple step files simultaneously
- **ALWAYS** read entire step file before execution
- **NEVER** skip steps or optimize the sequence
- **ALWAYS** update frontmatter of output files when writing the final output for a specific step
- **ALWAYS** follow the exact instructions in the step file
- **ALWAYS** halt at menus and wait for user input
- **NEVER** create mental todo lists from future steps

## Eligible Participants

Only AI Lab agents may attend this meeting:

- **Research group:** Sova (literature), Sage (theory), Cypher (data), Viper (robustness), Breach (methodology), Fade (frontier), Astra (cross-domain), Killjoy (systems)
- **Build group:** Chamber (architecture), Jett (implementation), Gekko (data pipelines), Omen (code review), KAY/O (adversarial review)
- **Moderator:** Nosh (shared orchestrator, acts as Lab Director in this context)

Do not include any AI Startup agents. If the agenda requires Startup input, escalate to `bmad-ml-all-hands`.

## Supported Formats

- **Sprint Retrospective**: Review recent experiment cycle outcomes and lab process improvements.
- **Direction Setting**: Align on research direction, experiment priorities, and compute allocation.
- **Triage**: Rapid assessment of experiment blockers, NaN losses, OOM issues, or failed runs.
- **Full Debrief**: Comprehensive review of Lab project state across all active experiments and research threads.

## Workflow Modes

- **Always Fresh**: Each lab meeting produces new notes from scratch.

## Execution Modes

- **Guided** (default): Step-by-step with user approval at each gate
- **YOLO**: Execute all steps without halting (user explicitly requests)
- **Headless**: Non-interactive, produce artifact directly (used when Nosh chains autonomously)

## OpenCode Execution

In OpenCode, spawn each selected Lab agent as a parallel Task tool call for their agenda item contributions. Each agent runs in an isolated session with its own skill loaded.

For each agenda item, dispatch relevant agents simultaneously:

```
Task(subagent_type="{agent}", description="{agent} on {agenda_item}",
     prompt="Lab Meeting context:
     Format: {format}. Agenda item: {agenda_item}.
     Background: {context_summary}.
     Artifacts to read: {artifact_paths}.
     Your role: Present your update, findings, or concerns from your expertise area.
     Return: update summary, concerns raised, proposed decisions, and action items.")
```

Available Lab agent `subagent_type` values:
- Research: `sova`, `sage`, `cypher`, `viper`, `breach`, `fade`, `astra`, `killjoy`
- Build: `chamber`, `jett`, `gekko`, `omen`, `kayo`

Collect all responses per agenda item, then synthesize decisions and action items as moderator.

## Solo Fallback

If subagents cannot be spawned (runtime does not support parallel agent invocation, or the user requests `--solo` mode), the moderator **must not fail**. Instead, degrade gracefully:

1. The moderator adopts each selected Lab agent's persona sequentially, drawing from their SKILL.md identity, communication style, and principles.
2. For each agenda item, cycle through the relevant agents' perspectives: present the update, raise concerns, and propose decisions -- all clearly labelled with the agent's name.
3. After cycling through all personas for an item, return to the moderator voice to summarize the outcome, record the decision, and assign the action item.
4. The rest of the workflow (decisions, action items, parking lot, meeting notes) proceeds identically to multi-agent mode.

This ensures the lab meeting always produces actionable meeting notes regardless of runtime capabilities.

## Activation

1. Load config from `{project-root}/_bmad/config.yaml` (section: `ml`) and `{project-root}/_bmad/config.user.yaml`, then resolve variables.

   YOU MUST ALWAYS SPEAK in `{communication_language}`.
   YOU MUST ALWAYS WRITE artifact content in `{document_output_language}`.

2. Proceed directly to execution (always produces a fresh artifact).

## EXECUTION

Read fully and follow: `./steps/step-01-init.md`
