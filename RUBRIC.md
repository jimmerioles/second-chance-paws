# Rubric

Score each worktree 1–5 per criterion, then multiply by the weight. Maximum 100.

| Criterion | Weight | What a 5 looks like |
|---|---:|---|
| Distinctiveness & art direction | 20 | A specific, memorable identity that could only belong to this rescue. Not a template with puppy photos dropped in. |
| Typography | 15 | Intentional type pairing and scale; comfortable measure; hierarchy does real work; details (numerals, labels, captions) are considered. |
| Layout & hierarchy | 15 | Clear reading order; confident use of space; grid responds meaningfully; nothing feels accidental or monotonous. |
| Color & contrast | 10 | Coherent palette with a clear role for each color; AA contrast; states are legible; no muddy overlaps. |
| Motion & micro-interactions | 10 | Motion clarifies state or adds character without delaying the user; easing and duration feel right; reduced motion is respected. |
| UX & interaction completeness | 10 | Filters, detail view, focus handling, newsletter validation, empty states, and edge cases all work. |
| Accessibility & responsiveness | 10 | Semantic structure, keyboard access, focus visibility, dialog semantics, alt text, no overflow at 390 px. |
| Code quality | 5 | Small, readable, organized HTML/CSS/JS; sensible naming; no dead code; no needless dependencies. |
| Skill fidelity | 5 | The output clearly reflects the skill’s own process and priorities, documented in `NOTES.md`. |

## Objective signals (not scored, reported alongside)

- **Impeccable detector** findings (`npx impeccable detect site/`) — same detector for every output.
- **axe-core** WCAG 2.1 A/AA violations on the initial page and with the detail dialog open.
- **Console / page errors** and failed network requests.
- **Horizontal overflow** at 390 px.
- **Interaction checks**: filter counts, dialog open/close, focus return, newsletter error/success.
- **Source size**: HTML/CSS/JS line counts and bytes.
- **Dependencies**: local vs CDN, fonts, scripts.

## Blind review

1. Capture desktop and mobile screenshots for each worktree.
2. Copy them into `evidence/blind/A`–`E` in random order.
3. Score the five sets without opening `NOTES.md` or the source.
4. Reveal the mapping and add notes on skill fidelity and code.
