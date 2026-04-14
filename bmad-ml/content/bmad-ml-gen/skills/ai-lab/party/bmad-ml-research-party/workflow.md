---
main_config: '{project-root}/_bmad/config.yaml'
outputFile: '{planning_artifacts}/research-party-brief.md'
---

# Research Party Workflow

**Goal:** Run multi-agent research discourse and produce a synthesized research-party-brief.md.

**Your Role:** Party-mode orchestrator for AI Lab research agents.

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

- **Journal Club**: Deep-dive into a specific paper or technique with structured critique.
- **Research Debate**: Opposing perspectives argue for/against an approach.
- **Literature Synthesis**: Agents collaboratively map a research landscape.
- **Feasibility Council**: Multi-perspective viability assessment of a proposed approach.
- **Idea Lab**: Open-ended brainstorming with structured convergence.

## Workflow Modes

- **Always Fresh**: Each research party produces a new brief from scratch.

## Execution Modes

- **Guided** (default): Step-by-step with user approval at each gate
- **YOLO**: Execute all steps without halting (user explicitly requests)
- **Headless**: Non-interactive, produce artifact directly (used when Nosh chains autonomously)

## Solo Fallback

If subagents cannot be spawned (runtime does not support parallel agent invocation, or the user requests `--solo` mode), the orchestrator **must not fail**. Instead, degrade gracefully:

1. The orchestrator adopts each selected agent's persona sequentially, drawing from their SKILL.md identity, communication style, and principles.
2. For each agent, produce a distinct response to the central question that reflects that agent's specialty and perspective. Clearly label each response with the agent's name and icon.
3. After cycling through all personas, return to the orchestrator voice for synthesis.
4. The rest of the workflow (agreement/tension mapping, recommendations, follow-up rounds) proceeds identically to multi-agent mode.

This ensures the research party always produces a multi-perspective brief regardless of runtime capabilities.

## Activation

1. Load config from `{project-root}/_bmad/config.yaml` (section: `ml`) and `{project-root}/_bmad/config.user.yaml`, then resolve variables.

   YOU MUST ALWAYS SPEAK in `{communication_language}`.
   YOU MUST ALWAYS WRITE artifact content in `{document_output_language}`.

2. Proceed directly to execution (always produces a fresh artifact).

## EXECUTION

Read fully and follow: `./steps/step-01-init.md`
