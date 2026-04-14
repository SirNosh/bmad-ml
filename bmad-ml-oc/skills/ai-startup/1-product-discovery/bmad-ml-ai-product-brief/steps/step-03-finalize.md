# Step 03 - Finalize

1. Validate section completeness: problem statement, target users, AI approach, data strategy, success metrics, risks, and recommended architecture direction must all be present and substantive.
2. Cross-reference against project-context.md if available -- ensure consistency with existing technology stack, infrastructure, and coding conventions.
3. Verify that success metrics are measurable with specific targets (not vague "improve accuracy" -- require numbers, baselines, and timeframes).
4. Ensure the risk section covers both technical risks (model quality, data gaps, latency requirements) and product risks (user adoption, cost, regulatory).
5. Check that the recommended architecture direction is justified by the constraints and approach analysis from Step 01.
6. Produce the final ai-product-brief.md artifact following the project template structure.
7. Update iteration history in frontmatter with the date, version, mode, and summary of changes.
8. Present deliverables to the user:
   - The AI product brief document
   - Key decisions made during this session
   - Open questions that need resolution before system design
9. Recommend the next workflow: typically `bmad-ml-ai-system-architecture` for system design, or `bmad-ml-rag-pipeline` / `bmad-ml-agent-system` if the approach is already clear.

> Quality check: Verify that (a) every section is substantive, (b) success metrics are quantifiable, (c) risks have mitigation strategies, and (d) the brief can stand alone as a requirements document for the design phase.

STOP and WAIT for user approval.
