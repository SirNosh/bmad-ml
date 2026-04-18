---
artifact: research-party-brief
created: YYYY-MM-DD
format: "idea-lab"
topic: ""
participants: []
rounds_completed: 0
---

# Research Party Brief

## Topic and Format

> **Purpose:** Frame the discussion topic and the format rules so all participants share context and expectations.
> **Guidance:** State the topic as a question or problem. Specify the party format (idea-lab, devil's advocate, red-team, brainstorm) and the number of rounds.

### Topic

{State the research question, design decision, or problem to be debated. e.g., "Should we use LoRA or full fine-tuning for the low-resource classification task?"}

### Format

| Field | Value |
|-------|-------|
| **Party Type** | {idea-lab / devil's-advocate / red-team / brainstorm} |
| **Number of Rounds** | {e.g., 3} |
| **Time Budget** | {estimated duration or token budget per round} |
| **Moderation** | {agent or process moderating the discussion} |

### Ground Rules

1. {e.g., Each participant presents one position per round.}
2. {e.g., Positions must be supported by evidence (papers, data, prior results).}
3. {e.g., Participants may update their position between rounds based on new arguments.}

---

## Participants

> **Purpose:** Identify who is participating and what perspective each agent brings so the discussion covers diverse viewpoints.
> **Guidance:** Each participant should have a distinct perspective or expertise area. Assign roles deliberately to ensure productive tension.

| Agent | Role / Perspective | Expertise Area | Bias to Watch |
|-------|-------------------|---------------|--------------|
| {agent name} | {e.g., Advocate for efficiency} | {e.g., model compression, PEFT} | {e.g., may underweight accuracy} |
| {agent name} | {e.g., Advocate for accuracy} | {e.g., large-scale pretraining} | {e.g., may underweight cost} |
| {agent name} | {e.g., Pragmatist / implementer} | {e.g., MLOps, deployment} | {e.g., may overweight simplicity} |
| {agent name} | {e.g., Devil's advocate} | {e.g., statistical rigor} | {e.g., may be overly conservative} |

---

## Round Summaries

> **Purpose:** Capture the substance of each discussion round so the evolution of ideas is preserved.
> **Guidance:** For each round, record what each participant argued, what evidence they cited, and what key points emerged. Note any position changes.

### Round 1

**Prompt / Question:** {What was posed to participants in this round?}

| Agent | Position | Key Arguments | Evidence Cited |
|-------|---------|---------------|---------------|
| {agent} | {position} | {arguments} | {papers, data, results} |
| {agent} | {position} | {arguments} | {papers, data, results} |
| {agent} | {position} | {arguments} | {papers, data, results} |

**Key Points from Round 1:**

- {point 1}
- {point 2}

---

### Round 2

**Prompt / Question:** {Follow-up question or refinement based on Round 1}

| Agent | Position | Key Arguments | Evidence Cited | Changed from Round 1? |
|-------|---------|---------------|---------------|----------------------|
| {agent} | {position} | {arguments} | {evidence} | {yes/no -- what changed} |
| {agent} | {position} | {arguments} | {evidence} | {yes/no -- what changed} |

**Key Points from Round 2:**

- {point 1}
- {point 2}

---

### Round 3

{Repeat structure as needed for additional rounds.}

---

## Points of Agreement

> **Purpose:** Identify where participants converge so these can be treated as settled premises for decision-making.
> **Guidance:** List only items where genuine consensus was reached, not mere silence or non-objection.

1. {e.g., "All participants agreed that the dataset is too small for full fine-tuning without regularization."}
2. {e.g., "Consensus that inference latency is a hard constraint given the deployment target."}
3. {agreement}

---

## Points of Tension

> **Purpose:** Surface unresolved disagreements so they can be tested empirically or escalated to a lab meeting.
> **Guidance:** For each tension, note the opposing positions and what evidence would resolve the disagreement.

| Tension | Position A | Position B | Resolution Path |
|---------|-----------|-----------|----------------|
| {e.g., "LoRA rank selection"} | {Agent X: rank 8 is sufficient} | {Agent Y: rank 32 needed for this task} | {Ablation on LoRA rank as experiment arm} |
| {tension} | {position A} | {position B} | {how to resolve} |

---

## Synthesis

> **Purpose:** Merge the discussion into a coherent understanding that incorporates the strongest arguments from all sides.
> **Guidance:** This is not a vote -- it is a reasoned integration. Acknowledge trade-offs and conditional recommendations.

{Write a narrative synthesis that integrates the agreements, resolves or acknowledges the tensions, and forms a coherent recommendation. Reference specific arguments from the rounds.}

---

## Recommendations

> **Purpose:** Convert the discussion into prioritized, actionable items that feed into experiment design or architecture decisions.
> **Guidance:** Each recommendation should be traceable to the discussion. Include confidence level based on the degree of consensus.

| Priority | Recommendation | Supporting Arguments | Confidence | Owner |
|----------|---------------|---------------------|-----------|-------|
| 1 | {recommendation} | {from which round/agent} | {high/medium/low} | {who acts on this} |
| 2 | {recommendation} | {supporting arguments} | {confidence} | {owner} |
| 3 | {recommendation} | {supporting arguments} | {confidence} | {owner} |

---

## Follow-Up Questions

> **Purpose:** Capture questions that emerged during the discussion but were not resolved, feeding the next research cycle.
> **Guidance:** Each question should be answerable through literature review, experiment, or analysis -- not opinion.

1. {e.g., "Does LoRA rank sensitivity vary by task type? Check literature."}
2. {e.g., "What is the memory overhead of rank-32 LoRA on our target GPU? Profile."}
3. {question}
