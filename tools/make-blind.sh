#!/usr/bin/env bash
set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
EVIDENCE="$BASE/evidence"
BLIND="$EVIDENCE/blind"
MAP="/tmp/opencode/blind-map.json"

rm -rf "$BLIND"/A "$BLIND"/B "$BLIND"/C "$BLIND"/D "$BLIND"/E
mkdir -p "$BLIND"

slugs=(frontend-design impeccable ui-ux-pro-max emil-kowalski taste)
letters=(A B C D E)

# Shuffle the letters so position does not imply skill order.
mapfile -t shuffled < <(printf '%s\n' "${letters[@]}" | shuf)

{
  echo "{"
  first=1
  for i in "${!slugs[@]}"; do
    slug="${slugs[$i]}"
    letter="${shuffled[$i]}"
    src="$EVIDENCE/$slug"
    dst="$BLIND/$letter"
    mkdir -p "$dst"
    for img in desktop-fold.png desktop-full.png mobile-full.png detail.png filter-high-energy.png newsletter-success.png; do
      [ -f "$src/$img" ] && cp "$src/$img" "$dst/$img"
    done
    [ -f "$src/report.json" ] && jq 'del(.label, .siteDir)' "$src/report.json" > "$dst/report.json"
    [ -f "$src/report.json" ] && node "$BASE/tools/checks-md.mjs" "$src/report.json" > "$dst/checks.md"
    [ -f "$EVIDENCE/motion/$slug.md" ] && cp "$EVIDENCE/motion/$slug.md" "$dst/motion.md"
    if [ $first -eq 0 ]; then echo ","; fi
    first=0
    printf '  "%s": "%s"' "$letter" "$slug"
  done
  echo
  echo "}"
} > "$MAP"

echo "Blind folders written to $BLIND"
echo "Mapping written to $MAP (do not show the reviewer)"
cat "$MAP"
