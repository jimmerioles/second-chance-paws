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

See [`RUBRIC.md`](RUBRIC.md). Screenshots, automated checks, and the blind scoring sheet live in [`COMPARISON.md`](COMPARISON.md) once the runs finish.

## Fairness rules

- Same brief, copy, and photos in every worktree.
- Same stack and deliverable paths.
- Same technical test hooks (`data-filter`, `data-puppy`, `[role="dialog"]`, etc.).
- No skill is edited to make it easier to follow. Installed versions are recorded in `INSTALLS.md`.
- Reviews are scored blind: screenshots are anonymized before scoring, then mapped back to skills.
