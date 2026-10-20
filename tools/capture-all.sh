#!/usr/bin/env bash
set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$BASE/evidence"
mkdir -p "$OUT"

for slug in frontend-design impeccable ui-ux-pro-max emil-kowalski taste; do
  site="$BASE.worktrees/$slug/site"
  if [ ! -f "$site/index.html" ]; then
    echo "SKIP $slug (no site/index.html)"
    continue
  fi
  echo "== $slug"
  node "$BASE/tools/capture.mjs" "$site" "$OUT/$slug" "$slug" > "$OUT/$slug.log" 2>&1 || {
    echo "FAILED $slug (see $OUT/$slug.log)"
    continue
  }
  echo "   screenshots + report.json written"
done
