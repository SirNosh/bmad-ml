---
main_config: '{project-root}/_bmad/config.yaml'
outputFile: '{planning_artifacts}/all-hands-notes.md'
---

# All-Hands Meeting Workflow

**Goal:** Run a cross-division all-hands meeting with agents from BOTH the AI Lab and AI Startup divisions, and produce all-hands-notes.md with decisions and action items.

**Your Role:** Cross-division all-hands moderator.

This workflow is for questions that genuinely span both divisions -- research findings that affect product direction, product constraints that reshape research priorities, or strategic pivots that need input from every team. For Lab-only or Startup-only conversations, use `bmad-ml-lab-meeting` or `bmad-ml-startup-meeting` instead.

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

## Supported Formats

- **Sprint Retrospective**: Review recent experiment cycle outcomes and process improvements.
- **Direction Setting**: Align on research direction, priorities, and resource allocation.
- **Triage**: Rapid assessment of blockers, risks, and urgent decisions.
- **Full Debrief**: Comprehensive review of project state across all divisions.

## Workflow Modes

- **Always Fresh**: Each all-hands produces new notes from scratch.

## Execution Modes

- **Guided** (default): Step-by-step with user approval at each gate
- **YOLO**: Execute all steps without halting (user explicitly requests)
- **Headless**: Non-interactive, produce artifact directly (used when Nosh chains autonomously)

## OpenCode Execution

In OpenCode, spawn agents from both divisions as parallel Task tool calls. Each agent runs in an isolated session with its own skill loaded.

For each agenda item, dispatch relevant agents from both divisions simultaneously:

```
Task(subagent_type="{agent}", description="{agent} on {agenda_item}",
     prompt="All-Hands Meeting context:
     Format: {format}. Agenda item: {agenda_item}.
     Background: {context_summary}.
     Artifacts to read: {artifact_paths}.
     Your role: Present your perspective from your expertise area, considering both research and product implications.
     Return: position, cross-division considerations, concerns, and recommendations.")
```

Available agent `subagent_type` values:
- AI Lab Research: `sova`, `sage`, `cypher`, `viper`, `breach`, `fade`, `astra`, `killjoy`
- AI Lab Build: `chamber`, `jett`, `gekko`, `omen`, `kayo`
- AI Startup: `dumbledore`, `hermione`, `snape`, `luna`, `mcgonagall`, `moody`, `hagrid`

Only invite agents relevant to the agenda. All-Hands is rare -- most topics belong in Lab Meeting or Startup Meeting. Collect all responses, then synthesize cross-division decisions as moderator.

## Solo Fallback

If subagents cannot be spawned (runtime does not support parallel agent invocation, or the user requests `--solo` mode), the moderator **must not fail**. Instead, degrade gracefully:

1. The moderator adopts each selected agent's persona sequentially, drawing from their SKILL.md identity, communication style, and principles.
2. For each agenda item, cycle through the relevant agents' perspectives: present the update, raise concerns, and propose decisions — all clearly labelled with the agent's name and icon.
3. After cycling through all personas for an item, return to the moderator voice to summarize the outcome, record the decision, and assign the action item.
4. The rest of the workflow (decisions, action items, parking lot, meeting notes) proceeds identically to multi-agent mode.

This ensures the all-hands always produces actionable meeting notes regardless of runtime capabilities.

## Activation

1. Load config from `{project-root}/_bmad/config.yaml` (section: `ml`) and `{project-root}/_bmad/config.user.yaml`, then resolve variables.

   YOU MUST ALWAYS SPEAK in `{communication_language}`.
   YOU MUST ALWAYS WRITE artifact content in `{document_output_language}`.

2. Proceed directly to execution (always produces a fresh artifact).

## EXECUTION

Read fully and follow: `./steps/step-01-init.md`
