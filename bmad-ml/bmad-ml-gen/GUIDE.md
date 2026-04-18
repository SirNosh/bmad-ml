# BMad ML Guide

This guide is the operational reference for BMad ML. For a high-level overview and installation, see [README.md](./README.md).

## First-Time Setup

Before invoking any workflow:

1. Install the module skills into your IDE (`.claude/skills/`, `.cursor/skills/`, or `.opencode/skills/`)
2. Invoke the `ml-setup` skill and answer its prompts
3. `ml-setup` writes `_bmad/config.yaml` (shared) and `_bmad/config.user.yaml` (personal)
4. Optionally, accept the prompt to install BMad ML bootstrap instructions:
   - `CLAUDE.md` + `.claude/rules/bmad-ml.md` (Claude Code)
   - `AGENTS.md` + `.cursor/rules/bmad-ml.mdc` (Cursor)
   - `AGENTS.md` (OpenCode)
5. (OpenCode only) Optionally, copy agent shims from `agents/opencode/` to `.opencode/agents/` for Tab-switchable and `@`-invocable personas

After setup, you are ready to talk to the module.

## Agents Are the Interface

**In BMad ML, you talk to agents, not to workflows.** Each agent is a persona -- a senior specialist with their own identity, principles, expertise, and a small set of capabilities (workflows) they know how to run. When you want literature surveyed, you ask Sova. When you want a product architected, you ask Dumbledore. When you want experiment code implemented, you ask Jett. The agent then runs the relevant workflow as their tool.

Workflows are still useful to know about -- they are how agents produce consistent artifacts -- but they are not the thing you invoke first. The agent is the thing you invoke first. Think of workflows the way you think of library functions: the specialist calls them; you ask the specialist for the outcome.

There are three ways to engage:

1. **Talk to an agent directly** -- invoke a skill like `bmad-ml-sova`, `bmad-ml-dumbledore`, or `bmad-ml-jett`. Good when you already know whose expertise you need.
2. **Talk to Nosh** -- invoke `bmad-ml-nosh` as the orchestrator. Nosh routes you to the right agent or division, chains agents autonomously in AI Lab mode, or facilitates phase gates in AI Startup mode. Good when you don't know which specialist to reach for.
3. **Convene a meeting** -- invoke a party/meeting skill (see [Meetings and Parties](#meetings-and-parties-four-modes)) to get multiple agents in one room. Good for decisions that benefit from multiple perspectives.

See the [Agent Roster](#agent-roster) below for the full list and whose expertise matches your task.

## Nosh: The Orchestrator

`bmad-ml-nosh` is the shared entry point when you want to be routed rather than pick an agent yourself. Nosh is Lab Director and Startup CEO -- he reads only artifact frontmatter for routing decisions (never source code), then hands off to the right specialist or division:

- **Research, experiments, models** --> AI Lab (autonomous execution available)
- **Building AI products, LLM apps, deployment** --> AI Startup (hands-on collaborative)
- **Cross-cutting strategic decisions** --> All-Hands Meeting (rare, both divisions)

On activation, Nosh loads the config, searches for `project-context.md`, `iteration-log.yaml`, and `experiment-status.yaml`, then presents the appropriate division's capability menu and waits for your selection. Nosh never generates model code or reads implementation files directly -- he delegates to Jett (implementation) or Omen (review).

## AI Startup Base BMad Backbone

On the AI Startup side, BMad ML intentionally preserves the planning backbone that makes base BMAD useful:

1. `bmad-ml-ai-product-brief` is the PRD-equivalent artifact.
2. `bmad-ml-ai-system-architecture` translates the approved brief into a buildable system design.
3. Optional design-detail workflows refine specific parts of the architecture (`bmad-ml-rag-pipeline`, `bmad-ml-agent-system`, `bmad-ml-prompt-engineering`, `bmad-ml-data-integration`, and related design skills).
4. `bmad-ml-ai-readiness-check` confirms the design is ready for delivery planning.
5. `bmad-ml-ai-sprint` breaks the approved design into implementation-ready work, priorities, dependencies, and risks.
6. Build, evaluate, secure, and deploy from the approved plan.

This BMAD mapping applies to AI Startup only. AI Lab keeps its research-first flow.

## Agent Capability Reference

The next two sections list all workflows by phase. These are the tools agents use, not a separate menu you navigate. In practice you ask an agent ("Sova, do a literature review on retrieval-augmented generation" or "Chamber, design a MoE architecture for this problem"), and the agent invokes the appropriate workflow. The tables below let you look up which workflow produces which artifact and which modes it supports -- useful for debugging, audits, and understanding what to expect.

### AI Lab Workflows

#### Phase 1: Discovery (research-driven, iterative)

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-onboard-lab` | project-context.md, experiment-status.yaml | Create / Re-scan |
| `bmad-ml-literature-review` | literature-review.md | Create / Iterate |
| `bmad-ml-dataset-discovery` | dataset-assessment.md | Create / Iterate / Compare |
| `bmad-ml-feasibility-study` | feasibility-report.md | Create / Iterate |
| `bmad-ml-problem-formulation` | problem-statement.md | Create / Iterate |
| `bmad-ml-research-party` | research-party-brief.md | Always fresh |

#### Phase 2: Experiment Design

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-experiment-design` | experiment-design.md | Create / Iterate / Compare |
| `bmad-ml-evaluation-criteria` | evaluation-criteria.md | Create / Iterate |

#### Phase 3: ML Architecture

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-model-architecture` | model-architecture.md (with ADRs) | Create / Iterate / Compare |
| `bmad-ml-training-pipeline` | training-pipeline.md | Create / Iterate |
| `bmad-ml-readiness-check` | PASS / CONCERNS / FAIL | Always fresh |

#### Phase 4: Experimentation

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-implement-experiment` | Working code + tests | Create / Iterate |
| `bmad-ml-results-analysis` | results-report.md | Create / Compare |
| `bmad-ml-model-optimization` | Optimized model + report | Create / Iterate |
| `bmad-ml-code-review` | Review verdict | Always fresh |
| `bmad-ml-adversarial-review` | Adversarial findings | Always fresh |
| `bmad-ml-quick-experiment` | Quick spec + code | Create only |
| `bmad-ml-experiment-tracking` | experiment-status.yaml | Update |

#### Cross-Phase

| Workflow | Produces | Scope |
|----------|----------|-------|
| `bmad-ml-research-party` | research-party-brief.md | Research agents only |
| `bmad-ml-lab-meeting` | lab-meeting-notes.md | AI Lab division (research + build) |
| `bmad-ml-all-hands` | all-hands-notes.md | BOTH divisions (Lab + Startup) |

### AI Startup Workflows

#### Phase 1: Product Discovery (PRD-equivalent planning)

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-onboard-startup` | project-context.md, component catalog | Create / Re-scan |
| `bmad-ml-ai-product-brief` | ai-product-brief.md (PRD-equivalent) | Create / Iterate |

#### Phase 2: AI System Design

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-ai-system-architecture` | ai-architecture.md | Create / Iterate |
| `bmad-ml-rag-pipeline` | rag-design.md | Create / Iterate |
| `bmad-ml-agent-system` | agent-system-design.md | Create / Iterate |
| `bmad-ml-prompt-engineering` | prompt-spec.md | Create / Iterate |
| `bmad-ml-agent-behavior-spec` | agent-behavior-spec.md | Create / Iterate |
| `bmad-ml-tool-calling-design` | tool-schemas.json | Create / Iterate |
| `bmad-ml-ai-ux-design` | ai-ux-spec.md | Create / Iterate |
| `bmad-ml-data-integration` | data-integration.md | Create / Iterate |
| `bmad-ml-guardrails-design` | guardrails-spec.md | Create / Iterate |
| `bmad-ml-ai-readiness-check` | PASS / CONCERNS / FAIL | Always fresh |

#### Phase 2.5: Delivery Planning

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-ai-sprint` | ai-sprint-status.yaml (implementation plan) | Update |

#### Phase 3: Implementation (after sprint plan sign-off)

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-build-llm-app` | Working LLM application | Create / Iterate |
| `bmad-ml-fine-tuning` | Fine-tuned model + card | Create / Iterate |
| `bmad-ml-ai-implement` | Working AI system | Create / Iterate |
| `bmad-ml-embedding-pipeline` | Embedding pipeline | Create / Iterate |
| `bmad-ml-vector-db-setup` | Configured vector DB | Create / Iterate |
| `bmad-ml-doc-processing` | Processing pipeline | Create / Iterate |
| `bmad-ml-quick-ai-prototype` | Prototype + demo | Create only |

#### Phase 4: Deployment & Evaluation

| Workflow | Produces | Modes |
|----------|----------|-------|
| `bmad-ml-ai-deploy` | Deployed system + runbook | Create / Iterate |
| `bmad-ml-ai-monitoring` | Dashboards + alerts | Create / Iterate |
| `bmad-ml-ai-cicd` | CI/CD pipeline | Create / Iterate |
| `bmad-ml-ai-scaling` | Scaling plan | Create / Iterate |
| `bmad-ml-ai-evaluation` | evaluation-report.md | Create / Compare |
| `bmad-ml-ai-regression-tests` | Test suite | Create / Iterate |
| `bmad-ml-eval-framework` | Evaluation framework | Create / Iterate |
| `bmad-ml-quality-gates` | Quality gate config | Create / Iterate |
| `bmad-ml-ai-safety-audit` | safety-audit-report.md | Always fresh |
| `bmad-ml-prompt-injection-test` | Vulnerability report | Always fresh |
| `bmad-ml-red-team` | Red team report | Always fresh |
| `bmad-ml-ai-product-review` | Release verdict | Always fresh |

#### Cross-Phase

| Workflow | Produces | Scope |
|----------|----------|-------|
| `bmad-ml-startup-meeting` | startup-meeting-notes.md | AI Startup division only |
| `bmad-ml-all-hands` | all-hands-notes.md | BOTH divisions (Lab + Startup) |

## Agent Roster

BMad ML is an agent-first module: **agents are what you interact with**, and workflows are the tools they run on your behalf. There are 21 agents across two divisions, plus one shared orchestrator. AI Lab agents are Valorant-themed; AI Startup agents are Harry Potter-themed. Each agent is a persona with its own principles, expertise, and a small set of capabilities.

Invoke an agent directly by its skill name (e.g. `bmad-ml-sova`, `bmad-ml-dumbledore`, `bmad-ml-jett`) and speak to them as you would a specialist colleague -- tell them what outcome you need, share the relevant context, and they will pick the right workflow and drive it to completion. If you don't know whose expertise to reach for, invoke `bmad-ml-nosh` and let him route you.

Agents never read files outside their declared context scope -- this is a deliberate design choice to keep each persona sharp and prevent cross-contamination of responsibilities. Research agents never load implementation code; Nosh never reads source files; build agents never fabricate research claims.

### Shared Orchestrator

**Nosh** -- Lab Director and Startup CEO. The entry point for every session. Routes work to the right division, maintains the execution plan in autonomous mode (AI Lab), and acts as the phase-gate facilitator in hands-on mode (AI Startup). Reads only artifact frontmatter for routing decisions; never reads source code or generates model code directly -- delegates to specialists.
- **Invoke for:** starting any session, deciding what to do next (`NX`), running an overnight autonomous sweep, triaging a cross-cutting question.

### AI Lab -- Research Group

The research agents share a common stance: web search is their primary tool, and they never load implementation code. They survey, analyze, and synthesize -- then hand findings to the build group.

**Sova** -- Literature and SOTA tracker. Senior research scientist who surveys papers, maps citation graphs, and curates benchmark leaderboards. Methodical, citation-driven, never claims a finding without a specific paper and year.
- **Invoke for:** literature reviews (`LR`), SOTA scans (`ST`), paper method comparison (`PM`), topic framing (`TF`).
- **Expertise:** Semantic Scholar API, Connected Papers, bibliometric analysis, paper taxonomy design, meta-analysis methodology.

**Sage** -- Mathematical foundations and theory. PhD-level theorist who brings rigor to every claim. Will explicitly flag proof gaps rather than hand-wave past them.
- **Invoke for:** theoretical analysis (`TA`), convergence assumptions (`CA`), baseline theory notes (`BN`), math framing for architecture (`MF`).
- **Expertise:** convex and non-convex optimization theory, statistical learning theory (VC dimension, Rademacher complexity, PAC-Bayes), information geometry, Lyapunov-based convergence analysis.

**Cypher** -- Dataset quality and data-centric AI. Investigative researcher who characterizes data before anyone discusses models. Knows the quirks of every major ML dataset (ImageNet label errors, GLUE annotation artifacts).
- **Invoke for:** dataset assessment (`DA`), benchmark mapping (`BM`), bias and distribution shift checks (`BT`), data quality workflow (`DQ`).
- **Expertise:** pandas-profiling, Great Expectations, KL/KS distribution tests, cleanlab for label noise, DVC for data versioning.

**Viper** -- Adversarial robustness and ML safety. Security-minded researcher who treats every model as guilty until proven robust. Always presents worst-case alongside average-case.
- **Invoke for:** attack surface analysis (`AT`), failure mode inventory (`FM`), robustness benchmark planning (`RB`), safety synthesis (`SA`).
- **Expertise:** CleverHans, Adversarial Robustness Toolbox, AutoAttack, randomized smoothing, OOD detection (Mahalanobis, ODIN), red-teaming methodologies.

**Breach** -- Experimental methodology and statistical rigor. Holds ML experiments to clinical-trial standards: null hypotheses, power analysis, multiple-comparison correction, and proper ablations.
- **Invoke for:** experiment design critique (`ED`), ablation planning (`AB`), reproducibility protocols (`RP`), statistical sanity checks (`SS`).
- **Expertise:** scipy.stats, statsmodels, Bonferroni and FDR corrections, bootstrap confidence intervals, effect-size and sample-size determination.

**Fade** -- Frontier research tracking and trend scouting. Lives on arxiv and lab blogs, first to know about emerging methods, last to fall for hype. Distinguishes institutional momentum from genuine paradigm shifts.
- **Invoke for:** frontier scouting (`FR`), trend synthesis (`TS`), paradigm shift watchlist (`PS`), novel method fit (`NM`).
- **Expertise:** Arxiv API, Semantic Scholar, Elicit, ResearchRabbit, citation velocity analysis, pre-print reproducibility red flags.

**Astra** -- Interdisciplinary synthesis and cross-domain transfer. Connects insights across NLP, vision, neuroscience, optimization, and control theory. Sees structural similarities others miss.
- **Invoke for:** cross-domain synthesis (`CD`), transfer strategy input (`TL`), multi-modal direction (`MS`), research synthesis memo (`RS`).
- **Expertise:** domain adaptation (DANN, CORAL), multi-modal architectures (CLIP, Flamingo patterns), transfer task construction, structural analogy extraction.

**Killjoy** -- Systems ML and hardware-aware optimization. Grounds every architectural idea in FLOPs, memory bandwidth, and wall-clock time. The one who kills elegant-but-infeasible ideas before they waste compute.
- **Invoke for:** systems constraints study (`SR`), inference optimization (`IO`), distributed training strategy (`DT`), hardware-aware tradeoffs (`HW`).
- **Expertise:** DeepSpeed ZeRO, FSDP, Megatron-LM, Nsight Systems, XLA/Triton/torch.compile, GPTQ/AWQ/bitsandbytes quantization, vLLM and TGI serving.

### AI Lab -- Build Group

These agents turn research direction into running code, reviews, and optimized models. Unlike the research group, they do load and write implementation artifacts.

**Chamber** -- Model and training architecture. Precision architect who designs every layer with explicit trade-off analysis. Every component must justify its parameter and FLOP cost. Never writes training code -- hands off to Jett.
- **Invoke for:** model architecture design (`MA`), training pipeline architecture (`TP`), infrastructure decisions (`ID`), readiness support (`IR`).
- **Expertise:** Transformer variants (GPT, BERT, T5, Mamba), CNN and GNN families, scaling laws (Chinchilla, Kaplan), Mixture-of-Experts routing, attention variants (MHA, GQA, MLA), Architecture Decision Records.

**Jett** -- Fast-executing ML engineer. Ships runnable experiments with seed, config, and tests. Flags blockers immediately rather than silently working around them.
- **Invoke for:** implement experiment (`IE`), quick experiment (`QE`), results analysis support (`RA`), model optimization (`MO`), experiment planning support (`EP`).
- **Expertise:** PyTorch nn.Module design, DDP/FSDP, NaN gradient diagnosis, torch.profiler, deterministic training setup, pytest for ML (shape assertions, gradient flow checks).

**Gekko** -- Data pipeline builder for experiments. Creative and throughput-obsessed. Benchmarks every pipeline change with before/after numbers.
- **Invoke for:** dataset pipeline design (`DA`), feature engineering flow (`FE`), DataLoader tuning (`DL`), data quality checks (`DQ`).
- **Expertise:** DataLoader optimization (prefetch, pin_memory, persistent_workers), albumentations, Great Expectations, feature stores, DVC and Delta Lake.

**Omen** -- Standard code reviewer. Shadow reviewer who delivers findings, not opinions. Every finding references an exact file and line number with severity classification (blocking / warning / note). Never modifies code under review.
- **Invoke for:** code review (`CR`), experiment validation (`EV`), reproducibility review (`RR`), statistical rigor check (`SR`).
- **Expertise:** pylint, mypy, ruff, tensor shape verification, data leakage detection, gradient flow analysis, reproducibility auditing.

**KAY/O** -- Adversarial claim reviewer. Stress-tests conclusions before they leave the lab. "If it can't survive KAY/O, it can't survive peer review." Focuses on claims and statistics, not code quality.
- **Invoke for:** adversarial review (`AR`), claim validation (`CL`), statistical critique (`SC`), confounder analysis (`CF`), paper pre-review (`PP`).
- **Expertise:** hypothesis testing rigor, p-hacking detection, multiple comparison correction, confounder and baseline-strength assessment, Reviewer 2 adversarial framing.

### AI Startup Agents

These seven agents operate in hands-on collaborative mode only. Every phase transition requires explicit user approval -- they present options and wait.

**Dumbledore** -- Chief AI Product Architect. Sees the grand design where others see components. Has architected systems serving 100M+ users. Speaks in reversible decisions and graceful degradation.
- **Invoke for:** AI product brief / PRD-equivalent (`AB`), AI system architecture (`AA`), RAG pipeline design (`RG`), agent system design (`AS`), AI readiness check (`RC`), AI sprint planning / work breakdown (`SP`).
- **Expertise:** LLM stack selection, prompt routing, agent frameworks (LangChain, CrewAI, AutoGen), vector DBs (Pinecone, Weaviate, Qdrant, ChromaDB), RAG variants, serving infrastructure.

**Hermione** -- Senior AI/ML Engineer. Turns architecture documents into working systems. Clean, tested, production-grade code at speed. Will push back on the architecture if implementation reveals flaws.
- **Invoke for:** build LLM application (`BA`), AI system implementation from spec (`AI`), fine-tuning pipeline (`FT`), quick AI prototype (`QP`).
- **Expertise:** Transformers, vLLM, LangChain, LlamaIndex, Instructor, LoRA/QLoRA/PEFT fine-tuning, tool calling, RAG implementation, Diffusers, Gradio, Streamlit.

**Snape** -- AI Security and Safety. Does not trust any model until he has personally tried to break it. Builds guardrails that don't destroy UX. Red-teams LLM systems with the mindset of an attacker.
- **Invoke for:** guardrails design (`GD`), AI safety audit (`AU`), prompt injection testing (`PI`), red team exercise (`RE`).
- **Expertise:** prompt injection (direct, indirect, multi-turn), jailbreaking patterns, NeMo Guardrails, Guardrails AI, Presidio for PII, bias testing, structured red-team exercises.

**Luna** -- Prompt Engineer and AI UX Specialist. Sees prompts as poetry -- every word shapes behavior. Thinks about prompts from the model's perspective; tests with adversarial inputs.
- **Invoke for:** prompt engineering (`PE`), agent behavior spec (`BS`), tool-calling design (`TC`), AI UX design (`UX`).
- **Expertise:** system prompt design, few-shot engineering, chain-of-thought structuring, function schema design, agent personality definition, prompt regression testing.

**McGonagall** -- MLOps and Deployment. Strict and disciplined. Nothing ships without health checks, runbooks, rollback procedures, and monitoring dashboards. Speaks in latency percentiles, error budgets, and SLOs.
- **Invoke for:** AI deployment (`AD`), AI monitoring (`MN`), AI CI/CD setup (`CD`), AI scaling strategy (`SC`).
- **Expertise:** vLLM, TGI, Triton, BentoML, Docker/Kubernetes/Helm with GPU scheduling, GitHub Actions model pipelines, Prometheus/Grafana, auto-scaling and cost optimization.

**Moody** -- AI QA and Evaluation. Paranoid about quality. Tests what others assume works. CONSTANT VIGILANCE against quality degradation. Runs every LLM eval 100 times because one run proves nothing.
- **Invoke for:** AI evaluation (`AE`), AI regression tests (`RT`), evaluation framework (`EF`), quality gates (`QG`), AI product review (`PR`).
- **Expertise:** BLEU, ROUGE, BERTScore, LLM-as-judge, HumanEval, MMLU, prompt regression suites, boundary and multi-language edge-case testing, CI quality gates.

**Hagrid** -- Data Pipeline and Integration. Warm and enthusiastic, surprisingly gentle with messy real-world data others avoid. Connects the AI system to the outside world. Always has a fallback for when external APIs fail.
- **Invoke for:** data integration design (`DI`), embedding pipeline (`EP`), vector DB setup (`VS`), document processing pipeline (`DC`).
- **Expertise:** Unstructured, LangChain document loaders, Sentence Transformers and OpenAI embeddings, Pinecone/Weaviate/Qdrant/ChromaDB/pgvector, Playwright scraping, Airflow and Prefect ETL.

### Choosing Between Overlapping Agents

A few agents have overlapping-sounding responsibilities. The distinctions matter:

| If you need... | Use | Not |
|----------------|-----|-----|
| Literature review with citation maps | Sova | Fade (Fade scouts frontier, Sova surveys established) |
| Worst-case analysis on a trained model | Viper (Lab) | Snape (Startup) -- Viper attacks research models, Snape secures products |
| Statistical rigor on an experiment design | Breach | KAY/O (KAY/O attacks finished claims, Breach designs the experiment) |
| Data pipeline for a training experiment | Gekko (Lab) | Hagrid (Startup) -- Gekko optimizes training throughput, Hagrid ingests production data |
| Architecture design for a research model | Chamber (Lab) | Dumbledore (Startup) -- Chamber designs model architecture, Dumbledore designs product architecture |
| Code review on experiment code | Omen | KAY/O (Omen reviews code, KAY/O reviews claims) |
| Compute and serving tradeoffs | Killjoy | McGonagall (Killjoy is research-facing systems analysis, McGonagall is production MLOps) |

## Behavioral Modes

### AI Lab: Autonomous Execution

When working in the AI Lab, Nosh can chain agents autonomously. The user gives a directive (e.g., "test whether LoRA outperforms full fine-tuning") and Nosh runs the full cycle: research -> design -> architect -> implement -> analyze. Nosh reports back when done or stuck.

### AI Startup: Hands-On Collaborative

When working in the AI Startup, the user is a co-builder. Every phase transition requires explicit user approval. Agents present options with trade-offs and wait for decisions. No auto-chaining.

## Cross-Division Collaboration

AI Startup agents can invoke AI Lab research agents when they need research backing:

- Dumbledore asks Killjoy to research serving infrastructure
- Hermione asks Sova + Sage for fine-tuning technique research
- Snape asks Viper for adversarial attack pattern research
- McGonagall asks Killjoy for deployment pattern research

## Artifact Paths

These paths are configured during `ml-setup` and stored in `_bmad/config.yaml`:

| Variable | Description | Default |
|----------|-------------|---------|
| `{planning_artifacts}` | Planning and design documents | `{output_folder}/ml-planning` |
| `{experiment_artifacts}` | Code, models, and experiment outputs | `{output_folder}/experiments` |
| `{project_knowledge}` | Research notes and references | `docs/research` |

## Iteration Model

Most workflows support iteration. When you invoke a workflow for an artifact that already exists, you'll be asked:

- **Create New**: Start fresh, replacing the existing artifact
- **Iterate**: Refine the existing artifact based on new evidence or feedback
- **Compare** (some workflows): Side-by-side comparison of iterations or approaches

Iteration history is tracked in each artifact's frontmatter and in the global `iteration-log.yaml`.

## Meetings and Parties (Four Modes)

BMad ML offers four distinct multi-agent gathering formats. Pick the narrowest scope that answers the question -- convening more agents than needed wastes attention and dilutes decisions.

| Mode | Skill | Who Attends | When to Use |
|------|-------|-------------|-------------|
| Research Party | `bmad-ml-research-party` | AI Lab research agents only | Pure research synthesis, literature debate, brainstorming |
| Lab Meeting | `bmad-ml-lab-meeting` | AI Lab division (research + build) | Lab-internal retrospectives, experiment triage, direction setting |
| Startup Meeting | `bmad-ml-startup-meeting` | AI Startup agents only | Sprint reviews, design reviews, release readiness gates, product triage |
| All-Hands | `bmad-ml-all-hands` | BOTH divisions | Cross-division strategy, research findings that affect product, product needs driving research |

### Research Party

Research-only multi-agent discussion. Formats:

- **Journal Club**: One agent presents, others critique
- **Research Debate**: Camps argue with rounds of proposals and rebuttals
- **Literature Synthesis**: All contribute domain knowledge, merge into landscape
- **Feasibility Council**: Multi-perspective feasibility scoring
- **Idea Lab**: Brainstorm, cross-pollinate, stress-test ideas

### Lab Meeting

AI Lab division meeting (research agents + build agents, no Startup agents). Formats:

- **Sprint Retrospective**: Review what worked and what didn't in the last experiment cycle
- **Direction Setting**: Decide research/experiment priorities and compute allocation
- **Triage**: Prioritize experiment blockers, failed runs, resource contention
- **Full Debrief**: Comprehensive status review across all active Lab work

If the topic drifts into product or deployment territory, escalate to `bmad-ml-all-hands`. If it's a pure research discussion among researchers only, use `bmad-ml-research-party` instead.

### Startup Meeting

AI Startup division meeting (seven Startup agents, no Lab agents). Formats:

- **Sprint Review**: Walk through the current sprint's product deliverables and demos
- **Sprint Retrospective**: Review what worked and what didn't in the last startup sprint
- **Design Review**: Review architecture, RAG design, agent system, or prompt strategy
- **Release Readiness**: Gate a release -- Moody (quality), Snape (safety), McGonagall (deployment), Dumbledore (product) all vote
- **Triage**: Rapid assessment of production incidents, user bugs, or safety issues
- **Direction Setting**: Align on product direction, feature priorities, risk acceptance

Always hands-on collaborative -- every phase transition requires explicit user approval. If the topic requires AI Lab research or experimental evidence, escalate to `bmad-ml-all-hands`.

### All-Hands Meeting

Cross-division meeting with both AI Lab and AI Startup agents under Nosh's moderation. This is RARE -- only convene when the question genuinely spans both divisions. Formats:

- **Sprint Retrospective**: Cross-division iteration review
- **Direction Setting**: Strategic research + product alignment
- **Triage**: Multi-agent root cause analysis spanning research and product
- **Full Debrief**: End-of-project/milestone review

## IDE Integration

BMad ML skills use the standard SKILL.md format that works across all skills-capable IDEs. Both Claude Code (`.claude/skills/`) and Cursor (`.cursor/skills/`) are first-class supported platforms.

### Install Modes

Five install modes, one per IDE surface:

| Flag | Target | Persona binding |
|------|--------|-----------------|
| `--oc` | OpenCode | OpenCode `mode: primary` on `nosh.md` |
| `--cur` | Cursor | Soft (Nosh persona loads via `AGENTS.md`; Cursor has no default-agent setting) |
| `--cc` | Claude Code | Hard (installer writes `"agent": "bmad-ml-nosh"` to `.claude/settings.json`, replacing the default system prompt) |
| `--cur-pi` | Cursor + pi | Soft; specialist shims dispatch to the external `pi` CLI |
| `--cc-pi` | Claude Code + pi | Soft; specialist shims dispatch to the external `pi` CLI |

All modes install the same 75 skills and 21 agent files (20 specialists + Nosh). The difference is how Nosh is bound and how specialist shims are wired.

### Agent Invocation

All modes delegate specialist work via the **Task/Agent tool** with `subagent_type: "bmad-<name>"`. Auto-delegation, slash commands (`/bmad-<name>`), and `@agent-<name>` mentions are parsed from user input only -- they do nothing when emitted by Nosh in agent output. Nosh never writes those strings.

### Skill Loading
- Skills are loaded dynamically when invoked (not always-on)
- Each skill directory contains a SKILL.md with the full agent or workflow definition
- The same skill files work identically on both platforms

### Project Instructions
During setup, ml-setup offers to create IDE-specific project instruction files:
- **Claude Code**: `CLAUDE.md` at project root -- loaded automatically on every conversation. Under `--cc`, `.claude/settings.json` also contains the `"agent": "bmad-ml-nosh"` binding that replaces the default system prompt with Nosh's persona (opt out by removing the key after install).
- **Cursor**: `AGENTS.md` at project root + `.cursor/rules/` -- loaded automatically as context. Cursor has no default-agent setting, so `AGENTS.md` is the ceiling for persona binding.
- **OpenCode**: `AGENTS.md` at project root -- loaded automatically on every session (falls back to `CLAUDE.md` if absent)

These files tell the IDE about the ML module's presence, entry point, and conventions.

### Agent Teams (Claude Code, experimental)

The four party/meeting skills (`bmad-ml-lab-meeting`, `bmad-ml-startup-meeting`, `bmad-ml-research-party`, `bmad-ml-all-hands`) can optionally use agent teams for multi-specialist discussion. Enable by exporting `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in your shell before starting Claude Code. The installer does not write this env var anywhere. Without the env var, these workflows fall back to serial Task dispatch (no behavior change).

### OpenCode Agents (Optional)

OpenCode supports custom agents as markdown files in `.opencode/agents/`. BMad ML provides agent shims in `agents/opencode/` that wrap key personas:

- **Nosh** (`nosh.md`) -- primary agent (Tab-switchable), loads `bmad-ml-nosh` skill
- **Sova**, **Chamber**, **Jett** -- AI Lab subagents (`@`-invocable)
- **Dumbledore**, **Hermione**, **Snape**, **McGonagall**, **Luna** -- AI Startup subagents

Copy them to your project: `cp agents/opencode/*.md .opencode/agents/`

These are thin shims -- each loads the corresponding skill and defers to its full persona and capabilities.

## Step-File Architecture

Most BMad ML workflows use **step-file architecture**, which keeps the executing agent disciplined and prevents optimization drift. Understanding this is useful when writing new workflows or debugging broken ones.

### Structure

A step-file workflow lives in a directory like this:

```
bmad-ml-onboard-startup/
  SKILL.md           # Skill registration + description
  workflow.md        # Top-level workflow orchestration, loads the first step
  steps/
    step-01-discovery.md
    step-02-component-catalog.md
    step-03-architecture-assessment.md
    step-04-generate-artifacts.md
    step-05-recommend.md
```

### Execution Rules

1. **Micro-file Design**: Each step is a self-contained instruction file that must be followed exactly
2. **Just-In-Time Loading**: Only the current step file is loaded -- future step files are never read ahead
3. **Sequential Enforcement**: Steps must complete in order; no skipping or merging
4. **State Tracking**: Progress is recorded in the output file's frontmatter as `stepsCompleted`
5. **Append-Only Building**: Documents grow by appending content, never by rewriting earlier sections
6. **Halt at Menus**: If a step presents a menu, execution stops and waits for user input
7. **No Parallel Loading**: Never load multiple step files simultaneously

### Why It Matters

The step-file discipline is what makes BMad workflows reproducible across sessions and models. Optimization shortcuts (reading ahead, combining steps, skipping menus) break the contract and produce inconsistent artifacts. When debugging a workflow, check that `workflow.md`'s "Read fully and follow" line references an actual file in `steps/`, and that each `step-NN-*.md` file ends with a "Continue to `./step-NN+1-*.md`" pointer to the next step.

## Capability Codes

Nosh presents these two-letter codes as a menu on activation. Invoke a capability by typing its code.

### AI Lab Capability Codes

| Code | Capability | Skill |
|------|------------|-------|
| `OB` | Onboard existing ML project | `bmad-ml-onboard-lab` |
| `RP` | Research Party (research agents only) | `bmad-ml-research-party` |
| `LM` | Lab Meeting (AI Lab division only) | `bmad-ml-lab-meeting` |
| `AH` | All-Hands (BOTH divisions) | `bmad-ml-all-hands` |
| `LR` | Literature review | `bmad-ml-literature-review` |
| `DD` | Dataset discovery | `bmad-ml-dataset-discovery` |
| `FS` | Feasibility study | `bmad-ml-feasibility-study` |
| `PF` | Problem formulation & hypothesis | `bmad-ml-problem-formulation` |
| `ED` | Experiment design | `bmad-ml-experiment-design` |
| `MA` | Model architecture | `bmad-ml-model-architecture` |
| `TP` | Training pipeline | `bmad-ml-training-pipeline` |
| `IR` | Implementation readiness check | `bmad-ml-readiness-check` |
| `IE` | Implement experiment | `bmad-ml-implement-experiment` |
| `QE` | Quick experiment | `bmad-ml-quick-experiment` |
| `RA` | Results analysis | `bmad-ml-results-analysis` |
| `MO` | Model optimization | `bmad-ml-model-optimization` |
| `CR` | Code review (standard) | `bmad-ml-code-review` |
| `AR` | Adversarial review | `bmad-ml-adversarial-review` |
| `ET` | Experiment tracking | `bmad-ml-experiment-tracking` |
| `IL` | View/manage iteration log | Iteration log management |
| `NX` | What should we do next? | Context-aware next-step recommendation |

### AI Startup Capability Codes

| Code | Capability | Skill |
|------|------------|-------|
| `OB` | Onboard existing AI product | `bmad-ml-onboard-startup` |
| `AP` | AI Product Brief | `bmad-ml-ai-product-brief` |
| `AA` | AI System Architecture | `bmad-ml-ai-system-architecture` |
| `LA` | Build LLM Application | `bmad-ml-build-llm-app` |
| `RA` | RAG Pipeline design | `bmad-ml-rag-pipeline` |
| `AS` | Agent System design | `bmad-ml-agent-system` |
| `FT` | Fine-Tuning Pipeline | `bmad-ml-fine-tuning` |
| `PE` | Prompt Engineering | `bmad-ml-prompt-engineering` |
| `DP` | Deploy AI System | `bmad-ml-ai-deploy` |
| `AU` | AI Safety Audit | `bmad-ml-ai-safety-audit` |
| `QA` | AI QA & Evaluation | `bmad-ml-ai-evaluation` |
| `DI` | Data Integration Pipeline | `bmad-ml-data-integration` |
| `SP` | AI Sprint Planning / Work Breakdown | `bmad-ml-ai-sprint` |
| `PR` | AI Product Review | `bmad-ml-ai-product-review` |
| `SM` | Startup Meeting (Startup division only) | `bmad-ml-startup-meeting` |
| `AH` | All-Hands (BOTH divisions) | `bmad-ml-all-hands` |
| `NX` | What should we do next? | Context-aware recommendation |

Note: `OB` and `RA` appear in both menus with different meanings. Nosh uses the division context (set by his routing decision) to disambiguate. `AH` is identical in both menus -- an all-hands is cross-division by definition.

## Where State Lives

BMad ML maintains state across sessions through a small set of well-known files. Knowing where they live helps you debug workflows and understand what Nosh is tracking.

| File | Purpose | Who Writes |
|------|---------|------------|
| `_bmad/config.yaml` | Shared project + module config | `ml-setup` |
| `_bmad/config.user.yaml` | Personal settings (`user_name`, language) | `ml-setup` |
| `{planning_artifacts}/project-context.md` | Onboarding output: codebase structure, dependencies, components | `bmad-ml-onboard-*` |
| `{planning_artifacts}/iteration-log.yaml` | Global log of workflow invocations and iterations | Every workflow |
| `{experiment_artifacts}/experiment-status.yaml` | Current state of tracked experiments | `bmad-ml-experiment-tracking` |
| `{planning_artifacts}/*.md` | Planning artifacts (briefs, designs, architecture docs) | Individual workflows |
| `{experiment_artifacts}/*` | Code, models, results | Implementation workflows |

When Nosh is asked "what should we do next?" (`NX`), he reads these files to reason about what has been done and what the highest-impact next action is.

## Common Task Recipes

These recipes show two equivalent paths: **talking to agents directly** and **asking Nosh to orchestrate**. Both work -- pick whichever matches how you like to collaborate.

### "I want to start a new ML research project"

**Agent-first path:**
1. `ml-setup` -- configure the module
2. Ask Sova for a literature review, Cypher for dataset discovery, Viper for risk scan (these run in parallel conceptually)
3. Ask Breach to formalize your hypothesis and design the experiment
4. Ask Chamber to design the model architecture and training pipeline
5. Ask Jett to implement the experiment and run it
6. Ask Omen for a code review and KAY/O for an adversarial review of the claims

**Nosh path:**
1. `ml-setup`, then `bmad-ml-nosh` -> `OB` (onboard lab) if existing code, or give Nosh a directive like "run a feasibility study for [hypothesis]" and let him chain agents autonomously.

### "I want to build an LLM app"

**Agent-first path:**
1. `ml-setup` -- configure the module
2. Ask Dumbledore to write the PRD-equivalent product brief and design the AI system architecture
3. Ask Luna, Hagrid, or other Startup specialists to refine prompts, data integration, and other design details as needed
4. Ask Dumbledore to turn the approved design into an AI sprint plan / work breakdown
5. Ask Hermione to build the LLM application from the approved plan
6. Ask Moody for evaluation and Snape for a safety audit
7. Ask McGonagall to deploy it

**Nosh path:**
1. `ml-setup`, then `bmad-ml-nosh`. Nosh routes to AI Startup and facilitates phase gates -- you approve at each transition (hands-on collaborative mode).

### "I want to iterate on an existing artifact"
Ask the same agent who produced it ("Dumbledore, iterate on the architecture -- I want to add a reranker step"). The agent detects the existing artifact and offers **Create New / Iterate / Compare**. Iteration history is tracked in the artifact's frontmatter and in `iteration-log.yaml`.

### "I want Nosh to figure out what to do next"
Invoke `bmad-ml-nosh` and select `NX`. Nosh reads all artifacts and state files, then recommends the highest-impact next action and which agent should execute it.

### "I want to run a research sprint overnight"
This is the canonical AI Lab autonomous-mode use case. Invoke `bmad-ml-nosh`, confirm AI Lab routing, give a directive like "test whether LoRA outperforms full fine-tuning on our domain dataset", and Nosh will chain Sova -> Breach -> Chamber -> Jett -> KAY/O autonomously until the hypothesis is resolved or the iteration limit is hit. In AI Startup, autonomous mode is intentionally unavailable -- product work always runs with user-in-the-loop approval.

### "I want multiple agents in one room"
Convene a meeting. Ask for a **research party** (research agents only), a **lab meeting** (AI Lab division), a **startup meeting** (AI Startup division), or an **all-hands** (both divisions). See [Meetings and Parties](#meetings-and-parties-four-modes) for scope rules.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| "Step file not found" when starting a workflow | `workflow.md` references a renamed step file | Open `workflow.md` and match the `./steps/...` reference to the actual filename |
| Workflow starts but does not halt at a menu | Agent is auto-optimizing; step-file rules violated | Remind the agent of the "halt at menus" rule in the workflow's step processing section |
| Nosh does not greet by name | `user_name` missing from `config.user.yaml` | Re-run `ml-setup` or add the key manually |
| Wrong output language | `document_output_language` unset or mismatched | Edit `_bmad/config.yaml` (for document language) or `_bmad/config.user.yaml` (for communication language) |
| "Legacy per-module config detected" | Old `_bmad/ml/config.yaml` from prior install | Expected -- `ml-setup` migrates and cleans up automatically |
| Nosh reads source code directly | Violates Nosh defensive instructions | Nosh should delegate: Jett for implementation reads, Omen for reviews |
| AI Startup workflow auto-chains phases | Behavioral mode violation | AI Startup is hands-on only; ask Nosh to halt and re-present options at the phase gate |
| Iteration log not updating | Workflow not appending, or writing to wrong path | Check `{planning_artifacts}` resolves correctly in config |

## Further Reading

- [README.md](./README.md) -- Installation, agent roster, directory structure
- Individual `SKILL.md` files inside each workflow directory -- the canonical spec for that workflow's behavior
- `_bmad/config.yaml` and `_bmad/config.user.yaml` -- your project's resolved configuration
