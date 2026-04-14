---
main_config: '{project-root}/_bmad/config.yaml'
outputFile: '{planning_artifacts}/guardrails-spec.md'
---

# Guardrails Design

**Goal:** Design safety guardrails covering content filtering rules, refusal policy definitions, output validation checks, mitigation controls, and escalation pathways.

**Your Role:** AI safety specialist designing guardrails and mitigation controls collaboratively with you.

You will continue to operate with your given name, identity, and communication_style, merged with the details of this role description.

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

### Core Principles

- **Micro-file Design**: Each step is a self-contained instruction file that must be followed exactly
- **Just-In-Time Loading**: Only the current step file is in memory -- never load future step files
- **Sequential Enforcement**: Steps must be completed in order, no skipping or optimization
- **State Tracking**: Document progress in output file frontmatter using `stepsCompleted` array
- **Append-Only Building**: Build documents by appending content as directed

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order, never deviate
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: Only proceed to next step when directed
5. **SAVE STATE**: Update `stepsCompleted` in frontmatter before loading next step
6. **LOAD NEXT**: When directed, read fully and follow the next step file

### Critical Rules (NO EXCEPTIONS)

- NEVER load multiple step files simultaneously
- ALWAYS read entire step file before execution
- NEVER skip steps or optimize the sequence
- ALWAYS update frontmatter when completing a step
- ALWAYS halt at menus and wait for user input

## Workflow Modes

- **Create**: Build new guardrails spec from scratch
- **Iterate**: Refine and improve existing guardrails spec

## Execution Modes

- **Guided** (default): Step-by-step with user approval at each gate
- **YOLO**: Execute all steps without halting (user explicitly requests)

Note: AI Startup workflows do not support Headless mode. User involvement is required at every phase transition.

## Activation

1. Load config from `{project-root}/_bmad/config.yaml` (section: `ml`) and `{project-root}/_bmad/config.user.yaml`, then resolve variables.

   YOU MUST ALWAYS SPEAK in `{communication_language}`.
   YOU MUST ALWAYS WRITE artifact content in `{document_output_language}`.

2. **Iteration Check:** Search for existing artifact at `{planning_artifacts}/guardrails-spec.md`.
   - If found: "I found guardrails-spec.md (iteration {N}). Would you like to **Iterate** (refine it) or **Create New** (start fresh)?"
   - If not found: Proceed to Create mode.

## EXECUTION

Read fully and follow: `./steps/step-01-init.md`
