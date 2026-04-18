#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="_bmad/iteration-log.yaml"
PAYLOAD="$(cat -)"

extract() {
  printf '%s' "$PAYLOAD" | sed -n "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1
}

EVENT="$(extract hook_event_name)"
AGENT="$(extract agent_type)"
: "${EVENT:=event}"
: "${AGENT:=unknown}"

mkdir -p "$(dirname "$LOG_FILE")"
TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

{
  echo "- event: ${EVENT}"
  echo "  agent: ${AGENT}"
  echo "  at: ${TIMESTAMP}"
} >> "$LOG_FILE"
