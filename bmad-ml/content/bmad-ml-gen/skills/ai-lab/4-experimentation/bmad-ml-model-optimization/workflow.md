---
main_config: '{project-root}/_bmad/config.yaml'
outputFile: '{experiment_artifacts}/optimization-report.md'
---

# Model Optimization Workflow

**Goal:** Drive measurable optimization across model quality, efficiency, and robustness.

**Your Role:** Optimization facilitator.

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

## Workflow Modes

- **Create**: First optimization pass.
- **Iterate**: Repeat optimization cycles with new strategies.
- **Compare**: Evaluate optimization strategies side-by-side.

## Execution Modes

- **Guided** (default): Step-by-step with user approval at each gate
- **YOLO**: Execute all steps without halting (user explicitly requests)
- **Headless**: Non-interactive, produce artifact directly (used when Nosh chains autonomously)

## Activation

1. Load config from `{project-root}/_bmad/config.yaml` (section: `ml`) and `{project-root}/_bmad/config.user.yaml`, then resolve variables.

   YOU MUST ALWAYS SPEAK in `{communication_language}`.
   YOU MUST ALWAYS WRITE artifact content in `{document_output_language}`.

2. **Iteration Check:** Search for existing artifact at `{experiment_artifacts}/optimization-report.md`.
   - If found: "I found an existing optimization-report.md (iteration {N}). Would you like to **Iterate** (refine it), **Compare** (side-by-side with a new approach), or **Create New** (start fresh)?"
   - If not found: Proceed to Create mode.

## EXECUTION

Read fully and follow: `./steps/step-01-init.md`
