# Top design skills, one brief

A controlled comparison of five well-known “design taste” skills for coding agents. Every contestant gets its own git worktree, the same brief, the same copy, the same photos, and the same static HTML/CSS/JS constraint. Only the skill differs.

## The brief

[`BRIEF.md`](BRIEF.md) — **Second Chance Paws**, a fictional foster-based puppy rescue in Portland, Oregon. One page, six adoptable puppies, filtering, a detail dialog, adoption steps, events, foster/donate, and a newsletter form.

## Contestants

| Skill | Source | Worktree branch |
|---|---|---|
| Anthropic frontend-design | `anthropics/skills` → `skills/frontend-design` | `skill/frontend-design` |
| Impeccable | `impeccable.style` / `pbakaus/impeccable` | `skill/impeccable` |
| UI UX Pro Max | `ui-ux-pro-max-cli` | `skill/ui-ux-pro-max` |
| Emil Kowalski | `emilkowalski/skills` (`emil-design-eng`, `animate`, `review-animations`) | `skill/emil-kowalski` |
| Taste | `Leonxlnx/taste-skill` (`design-taste-frontend`, v2) | `skill/taste` |

Each worktree installs its skill in `.agents/skills/` (project scope) using the skill’s own installer where one exists.

## Why this project

The page deliberately exercises both halves of design skill:

- **Art direction:** editorial hero, photography, typography, palette, tone.
- **Interface craft:** filter state, card grid, modal/drawer, focus management, form validation, responsive layout, reduced motion.

A pure landing page would favor the art-direction skills; a pure app screen would favor the UX/craft skills. This brief gives each one something real to bite into.

## Result

Full write-up: [`COMPARISON.md`](COMPARISON.md).

| Rank | Skill | Total /100 |
|---|---|---:|
| 1 | Anthropic frontend-design | 89.5 |
| 2= | Emil Kowalski | 87.0 |
| 2= | Impeccable | 87.0 |
| 4 | UI UX Pro Max | 82.5 |
| 5 | Taste v2 | 79.5 |

The top three are one tier. Anthropic wins on restraint, accessibility, and low production risk; Impeccable has the biggest idea; Emil has the best interaction craft. Taste has the cleanest anti-slop record but the weakest conventional UX. UI UX Pro Max is the most systematic and the least distinctive.

## Viewing the results

Each worktree produces:

```
site/index.html
site/styles.css
site/script.js
NOTES.md
```

From a worktree root:

```bash
python3 -m http.server 4173 --directory site
# open http://localhost:4173
```

Or open `site/index.html` directly.

## Evaluation

See [`RUBRIC.md`](RUBRIC.md). The blind review is in [`evidence/blind-scores.md`](evidence/blind-scores.md); screenshots, automated checks, and detector output are under `evidence/`. The comparison and per-skill analysis are in [`COMPARISON.md`](COMPARISON.md).

## Fairness rules

- Same brief, copy, and photos in every worktree.
- Same stack and deliverable paths.
- Same technical test hooks (`data-filter`, `data-puppy`, `[role="dialog"]`, etc.).
- No skill is edited to make it easier to follow. Installed versions are recorded in `INSTALLS.md`.
- Reviews are scored blind: screenshots are anonymized before scoring, then mapped back to skills.
