# NOTES — Second Chance Paws / Impeccable

## Skill and session path

- Skill: Impeccable 4.7.0
- Exact skill file: `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/impeccable/.opencode/skills/impeccable/SKILL.md`
- Skill base directory (used for every command): `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/impeccable/.opencode/skills/impeccable`
- Worktree: `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/impeccable`

## Workflows and references actually run

1. `.opencode/skills/impeccable/scripts/impeccable context` — run once from the worktree root. It returned `NO_PRODUCT_MD`, `PRODUCT_INIT_REQUIRED`, `MANUAL_DETECTOR_REQUIRED`, and the image-tool availability line.
2. `reference/init.md` — read in full. No live interview was run because the client explicitly said not to ask questions; `PRODUCT.md` was written from the explicit facts in `BRIEF.md` only. No visual-world or surface strategy was put into PRODUCT.md.
3. `reference/new-work.md`, `reference/mode-persuade.md`, and `reference/craft-floor.md` — read in that order; craft-floor was loaded immediately before UI edits.
4. `.opencode/skills/impeccable/scripts/impeccable concept-seed --scope direction --mode persuade` — run once. The roll assigned grounded candidate **5 of 7** and printed `SEED REFERENCE: seed:306c3956763cae09`. No image generation was available, so the build was code-led; the comp round was not run.
5. `surface-brief write site/index.html` / `surface-brief read site/index.html` — the direction contract and the raised lines from the dealt challengers are recorded in `.impeccable/surfaces/site-index-html.md`.
6. `concept-seed --check-seed seed:306c3956763cae09` — returned `SEED KNOWN`, confirming the recorded reference was rolled on this machine.
7. Built `site/index.html`, `site/styles.css`, `site/script.js`.
8. `reference/polish.md` — used for the finish pass (triage, path walk, state/contrast/focus checks, source cleanup).
9. `reference/audit.md` — used for the technical audit and score table below.
10. `reference/degraded/finish-reviewer.md` — used for an inline finish review because this harness has no shipped `impeccable-finish-reviewer` subagent. Substitution disclosed: the review was done in-thread after stepping out of the build, not by a fresh agent.
11. `reference/document.md` — used to write token-bearing `DESIGN.md` and `.impeccable/design.json` from the built system.
12. `.opencode/skills/impeccable/scripts/impeccable detect site/` and `detect --json site/` — final detector runs.
13. `npx html-validate site/index.html`; Playwright/Chromium screenshots and interaction scripts; axe-core 4.x injected into the rendered pages.

**Decision-round substitution:** the client said “Do not ask questions. The brief is complete; make the decisions,” so the init interview and the interactive decision page were collapsed. The seed assignment was still followed; the chosen direction is candidate 5, not a hand-picked alternative. The roll is recorded in the surface brief and the seed reference, never the raw key, is used in the brief.

## Visual world

**The Neighborhood Repertory House.** Second Chance Paws runs a revival cinema for puppies. The surface is the season program: the hero photograph is the screen, the butter marquee is the sign in front of it, puppies are the current bill on lobby cards, events are showtimes, the application is the box office, and donation tiers are the concession board.

Key decisions:

- **Palette:** projector green `#0e2f25`, forest deep `#09221a`, marquee butter `#f2c14e`, newsprint `#f4eddc`, cream `#fbf6e8`, ink `#17150f`, ticket red `#c8402e` / `#9e2f22`. Full-palette strategy, not an accent on a neutral template.
- **Type:** Alfa Slab One for the changeable-letter bill; Hanken Grotesk for program copy; Courier Prime for box-office labels, dates, counts, and tags. The mono is used for data and administration, not as a “technical” costume.
- **First viewport:** full-bleed hero photograph (about 55vh desktop, shorter on mobile) with a butter marquee overlapping its lower edge. The headline owns the left; the supplied eyebrow, body, and CTAs sit in the program-note column on the right. The eyebrow was deliberately kept out of the generic kicker position above the heading.
- **Surface grammar:** square corners, 1px and 2px rules, dashed perforations, ticket stubs, sprocket-dot filmstrip, registration crosses, bulb rail, circular box-office seal, paper-grain tile on newsprint sections.
- **Color discipline:** butter is the one warm light source and owns whole fields; photographs stay untinted and are the only full-colour material; red is reserved for action, selection, and error.
- **Depth:** offset soft shadows only when a surface is physically in front of another (marquee over screen, card under cursor, dialog over the house). No hard offset shadows, no glass, no gradient text.
- **Motion:** one ambient bulb breath; a short filter stagger when the bill changes; a projector-shutter clip-path reveal on the dialog. All disabled or made instant under `prefers-reduced-motion: reduce`.
- **Copy:** all supplied headlines, body copy, bios, stats, dates, CTA labels, and event details are used verbatim. Added text is limited to functional labels (Now showing, Filter by, Showtimes, Concession board, Program note, Close) and the newsletter error message.
- **Imagery:** only `assets/puppies/*.jpg`. Hero and cards use meaningful alt text; the repeated image inside the dialog uses `alt=""` because the puppy name and details are adjacent.

## What Impeccable caught that I would otherwise have missed

- **The kicker/eyebrow ban.** The default move would have been to place “Portland, Oregon · Foster-based rescue” and each section eyebrow directly above its heading. The craft floor bans that pattern. The supplied eyebrow now sits in the marquee's top rail context and, in the hero, at the head of the program-note column beside the headline; section eyebrows sit beside the body copy, not above the H2. The content is intact without the generic kicker.
- **The 11px functional-text floor.** The detector initially reported 103 anti-patterns, almost all undersized UI text at 9.6–10.9px. Raising every functional label to 11.2px (0.7rem) materially improved legibility and removed all undersized-text findings.
- **Touch targets.** The audit's 44px floor exposed the nav, filter chips, header Donate, dialog close, and footer links at 38–41px. They are now at least 44px high.
- **Focus trapping.** Native `<dialog>` trapping was not sufficient in automation: Tab could walk out to the browser chrome. A manual Tab/Shift+Tab loop around the dialog's focusable elements was added and verified over 14 Tab cycles.
- **200% text reflow.** At 390px with a 2× root font size the first build overflowed horizontally (512px scroll width). Display sizes were capped in px, the nav/brand were allowed to wrap, showtime columns became fixed px stubs, and the footer email got `overflow-wrap: anywhere`. The page now has no horizontal overflow at 200% text at 390px.
- **Design-system drift.** Once `DESIGN.md` existed, the detector found 29 undocumented type sizes and 4 undocumented colours. The CSS was consolidated to a deliberate type ramp, unused tokens were removed, and the ramp/colour exceptions were documented. The final detector has no type/colour drift findings.
- **First-viewport action on mobile.** The primary CTA initially fell just below the 390×844 fold after increasing touch targets. The mobile hero photo was shortened and the marquee rail simplified; “Meet the puppies” is now fully visible in the first viewport.

## Detector, audit, and validation results

**Impeccable detector — final `detect site/`:**

- 14 findings, all `cramped-padding`; 0 `undersized-ui-text`, 0 `design-system-font-size`, 0 `design-system-color`.
- The 14 are false positives from the heuristic not accounting for ancestor/child padding:
  - full-bleed sections have their text inside `.wrap` with `clamp(1.25rem, 4vw, 2.5rem)` gutters;
  - `.marquee-aside`, `.stat`, `.reel`, and `.showtime` rows carry their own padding next to the 1px rules;
  - `.filmstrip`, `.showtimes`, and `.concession` have padded children inside their borders.
  Visual inspection at 1440, 768, and 390 shows the text inset; no text sits flush against a border or field edge.
- The detector exits 2 when any finding is present; that is not a clean-scan result. The real findings from the first detector run (undersized text) were fixed; the remaining 14 are documented above rather than suppressed.

**axe-core (WCAG 2 A/AA + 2.1 AA + best practice):** 0 violations at 1440×900, 768×1024, 390×844, and with the program-note dialog open. No remaining axe issue.

**HTML validation:** `html-validate` reports one error: `no-redundant-role` on `<dialog role="dialog">`. This is intentional: the brief's technical contract requires `[role="dialog"][aria-modal="true"]`. The other earlier error (aria-label on the stats `<dl>`) was removed.

**Audit health score (technical):**

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | axe 0; keyboard, dialog trap/return, 11px labels, 44px targets, reduced motion, 200% reflow |
| 2 | Performance | 3 | 1.13 MB, 10 requests, ~529 ms load; 7 images eager to keep screenshot/first-render reliability, external Google Fonts |
| 3 | Theming | 3 | token system documented; some palette-derived rgba tints are inline; single theme by design |
| 4 | Responsive Design | 4 | no horizontal scroll at 1440/768/390 or 200% text; 3/2/1 card grid; fluid sections |
| 5 | Implementation Integrity | 4 | coherent product-specific world; detector clean apart from the documented false positives |
| **Total** | | **18/20** | **Excellent** |

**Finish review (inline, degraded reviewer):** `disposition: ship`. Persistence passes (PRODUCT.md, DESIGN.md, design.json, surface brief, known seed). Fidelity passes against the direction contract: the marquee first viewport, three grounds, lobby cards, filmstrip, showtimes, concession board, and program-note dialog are all present and carry the world's material. No invented claims. The only open mechanical notes are the 14 detector false positives and the contract-required redundant dialog role. The review found no material fixes.

## Tradeoffs and known gaps

- No image generation was available, so the build is code-led; there is no approved comp or comp-diff report. The ambition is carried by the direction contract and the first viewport.
- No adoption application endpoint, payment processor, or real event-management backend exists. Adoption/foster/donate CTAs use prefilled `mailto:hello@secondchancepaws.org` links; this is the honest static equivalent.
- No rescue social accounts were supplied. “Instagram” and “Facebook” point to the platform home pages, not to rescue profiles. This is a placeholder, not a claim.
- Photo credits are included in a footer `<details>` because CC BY and CC BY-SA attribution is required if the page is published. This is additional content, not rewritten brief copy.
- Card images are eager-loaded rather than lazy-loaded. The single page has seven images and about 1.13 MB total; eager loading avoids blank cards in full-page captures and during fast scroll. A production build with more images should use responsive `srcset` and lazy loading below the fold.
- Google Fonts is the only runtime dependency. If it fails, the page falls back to Rockwell/Courier New/Helvetica/Arial and remains readable.
- The dialog's `role="dialog"` is redundant on a native `<dialog>` by HTML validator rules but is required by the brief's selector contract.
- The 14 detector `cramped-padding` findings are left visible and documented rather than suppressed; they are false positives under the built CSS.
- No dark theme was designed; the brief did not ask for one and the world is a lit room, not an OS-adaptive surface.

## Testing

- **Viewports:** 1440×900, 768×1024, 390×844 via Playwright/Chromium; full-page and viewport captures. Additional 390px check at 200% root text size.
- **Screenshots:** `.impeccable/review/desktop.png`, `mobile.png`, `tablet.png`, `dialog-desktop.png`, `dialog-tablet.png`, `dialog-mobile.png`, `filter-apartment.png`, `newsletter-error.png`, `newsletter-success.png`, `mobile-reduced-motion.png`.
- **Filters:** All puppies 6; Apartment-friendly 2; High energy 3; Cuddly 3; Bonded pair 2. `aria-pressed` updates; live region updates; empty state simulated by clearing card tags, then reset via “Show all puppies”; focus moved back to the All puppies filter.
- **Dialog:** opened by mouse and keyboard Enter; focus moved to Close; 14 Tab cycles stayed inside; Escape closed; backdrop click closed; focus returned to the originating card; `html.dialog-open` locked background scroll and was removed on close; dialog content restored from the correct `<template>`.
- **Newsletter:** invalid address showed the inline error, set `aria-invalid="true"`, and focused the field; valid address showed “You're on the list. Watch your inbox for wet noses.” with no navigation.
- **Reduced motion:** `matchMedia` true; bulb, shutter, and transition durations computed at 0.01ms; stagger delay reset to 0ms; all state changes still visible.
- **Responsiveness:** `documentElement.scrollWidth <= clientWidth` at 1440, 768, 390, with the dialog open, and at 200% text on 390.
- **Console:** no errors at any tested viewport; no failed image/font requests.
- **Performance sample:** 10 requests, ~1.13 MB, load ~529 ms on the local server.
- **Detector:** final `detect site/` run as recorded above. **axe-core:** 0 violations. **html-validate:** one intentional redundant-role error.
