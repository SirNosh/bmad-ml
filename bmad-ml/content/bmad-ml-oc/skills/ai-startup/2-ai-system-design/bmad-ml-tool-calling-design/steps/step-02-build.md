# Step 02 - Build

Produce `{planning_artifacts}/tool-schemas.json` (with an accompanying `tool-schemas-docs.md` for human-readable documentation) with the following for **each** tool.

## 2.1 Tool Schema Definitions
For each tool, define the complete JSON schema:

```
{
  "name": "tool_name",
  "description": "Clear, specific description that helps the LLM decide when to use this tool.",
  "parameters": {
    "type": "object",
    "properties": {
      "param_name": {
        "type": "string | number | boolean | array | object",
        "description": "What this parameter controls and valid value ranges.",
        "enum": ["value1", "value2"]  // if applicable
      }
    },
    "required": ["list", "of", "required", "params"]
  }
}
```

## 2.2 Parameter Specifications
For each parameter of each tool:
- **Type:** JSON schema type with any constraints (minLength, maximum, pattern).
- **Required vs. optional:** justify why optional parameters are optional.
- **Default values:** specify defaults for optional parameters.
- **Validation rules:** regex patterns, value ranges, enum constraints.
- **Description quality:** descriptions must be specific enough for the LLM to use the tool correctly without additional context.

## 2.3 Return Format and Error Codes
For each tool, define:
- **Success response schema:** JSON structure returned on success.
- **Error response schema:** standardized error format with fields for `error_code`, `error_message`, and `retry_eligible`.
- **Error code catalog:** list all possible error codes with meaning and recommended agent behavior for each.
- **Timeout behavior:** what is returned if the tool exceeds its execution time limit.

## 2.4 Safety Constraints
For each tool, define:
- **Rate limits:** max calls per minute/hour, per user, per session.
- **Input validation:** sanitization rules applied before execution (SQL injection prevention, path traversal checks, etc.).
- **Confirmation requirements:** whether the agent must confirm with the user before executing (especially for data mutation, payments, deletions).
- **Audit logging:** what information is logged for each invocation (inputs, outputs, caller, timestamp).

## 2.5 Tool Dependencies and Ordering
- Define which tools must be called in sequence (e.g., `search` before `fetch_details`).
- Define which tools can be called in parallel.
- Define mutual exclusion rules (tools that must not run concurrently).
- Map tool dependency chains for common workflows.

Continue to ./step-03-finalize.md.
