# NOTES — Second Chance Paws / UI UX Pro Max

## Skill and workflow

- **Skill used:** `.opencode/skills/ui-ux-pro-max/SKILL.md`
- **Absolute path:** `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/ui-ux-pro-max/.opencode/skills/ui-ux-pro-max/SKILL.md`
- **Tooling:** `.opencode/skills/ui-ux-pro-max/scripts/search.py`
- **Python:** 3.14.8
- **Other design skills:** none. This page was built only with UI UX Pro Max guidance.

Workflow followed: Step 1 product/audience/stack analysis, Step 2 design-system generation, Step 2b persistence, Step 3 focused UX searches, then implementation and the skill's pre-delivery checks. The skill lists no plain `html`/vanilla CSS stack; the closest available stack is `html-tailwind`, which would import Tailwind-specific assumptions. It was not applied because the brief explicitly forbids Tailwind and frameworks.

## Product analysis

- **Product:** foster-based puppy rescue, one-page adoption site.
- **Audience:** Portland / Pacific Northwest adopters, fosters, and small-dollar donors; mobile-heavy, emotionally motivated, often browsing photos.
- **Style keywords:** warm, playful, trustworthy, community-minded, slightly scrappy.
- **Platform:** responsive web.
- **Stack:** static HTML, CSS, vanilla JS; Google Fonts allowed; no build step.
- **Primary jobs:** scan puppies, filter by home fit, open a puppy profile, understand the process, take one next step (apply/foster/donate).
- **Constraints that shaped the UI:** fixed copy; six supplied portrait photos; local file and HTTP use; required filter, dialog, newsletter, and reduced-motion behaviors.

## Design system

### Exact command

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "animal rescue puppy adoption Portland warm playful trustworthy community" --design-system --persist -p "Second Chance Paws" --output-dir .
```

Persisted to `design-system/second-chance-paws/MASTER.md` (not edited).

### Selected tokens

| Role | Value |
|---|---|
| Primary | `#7C3AED` |
| On primary | `#FFFFFF` |
| Secondary | `#A78BFA` |
| On secondary | `#0F172A` |
| Accent / CTA | `#16A34A` |
| On accent | `#000000` (used as `#07130B` for a slightly warmer near-black) |
| Background | `#FAF5FF` |
| Foreground | `#4C1D95` |
| Card | `#FFFFFF` |
| Card foreground | `#4C1D95` |
| Muted | `#ECEEF9` |
| Muted foreground | `#475569` |
| Border | `#DDD6FE` |
| Destructive | `#DC2626` |
| Ring | `#7C3AED` |

- **Heading font:** Fredoka (400–700)
- **Body font:** Nunito (300–700)
- **Spacing:** 4 / 8 / 16 / 24 / 32 / 48 / 64 px, plus a 64–112 px section tier
- **Shadows:** `0 1px 2px`, `0 4px 6px`, `0 10px 15px`, `0 20px 25px` in plum-tinted black
- **Pattern:** Hero + Features + CTA (hero → value proposition → feature sections → deep CTA → footer)
- **Style:** Minimalism & Swiss Style
- **Effects:** subtle 150–300 ms hover/state transitions, clear hierarchy, fast loading
- **Anti-patterns applied:** no emoji icons, no invisible focus, no low-contrast text, no layout-shifting hover, visible cursor on controls.

Working extensions: `--ink: #2E1065`, `--lilac-wash: #F1E8FF`, `--focus: #16A34A`, `--focus-on-dark: #A7F3D0`, `--green-soft: #86EFAC`.

## UX / domain searches

Each query was run with `--domain ux` unless noted. Results were checked for product/stack fit; off-topic results were retried or rejected rather than applied.

| Query | Verified result used | What changed in the page |
|---|---|---|
| `filter chip selected state` | Chip Collection Reflow; Active State | Filters are a wrapping flex row, never clipped or horizontally hidden. Active filter uses `aria-pressed="true"` plus a filled purple state and border/shadow. |
| `chip toggle button aria pressed` | Retry returned back-button, ARIA-label, and chip-reflow guidance; only reflow was relevant | Confirmed wrapping chips and accessible names; did not apply mobile back-button advice. |
| `live region result count filter` | Contextual Live Badge Updates | One polite, atomic live region reports `Showing 6 puppies` / `Showing 3 puppies` / `Showing 0 puppies` instead of a bare number. |
| `modal focus trap escape` | Focus States; Focus Appearance; Focus Not Obscured | Added strong focus rings inside the dialog, verified focus remains unobscured. The result did not contain a focus-trap recipe itself. |
| `dialog aria modal focus` (retry) | Focus States; ARIA Labels | Dialog is labelled by the puppy name and described by the bio; close control has a visible name; background is inert. Focus trap implemented from standard dialog behavior. |
| `body scroll lock modal` | Off-topic (returned smooth scroll, horizontal overflow, contrast); no verified match | Did not apply the returned items to scroll locking. Used the standard `overflow: hidden` + `inert` approach, and tested it. |
| `inline validation email error` | Focusable Error Summary; Inline Validation; Error Placement | Single-field form validates on blur and submit, shows a specific inline error below the field, uses `aria-invalid` and `aria-describedby`, and focuses the field on failed submit. A separate summary was unnecessary for one field. |
| `email form autocomplete input type` | Mobile Keyboards; Input Types; Input Labels | `type="email"`, `inputmode="email"`, `autocomplete="email"`, visible label (not placeholder-only). |
| `responsive breakpoint mobile layout` | Breakpoint Testing; Mobile First; Viewport Meta | Viewport meta set. Tested 320, 375, 390, 768, 844 landscape, 1440. The implementation uses desktop-first max-width breakpoints; see tradeoffs. |
| `touch target size` | Touch Target Size; Target Size (Minimum); Touch Spacing | Primary controls are at least 44 px tall; 8 px gaps. No interactive target under 24 px. Chips wrap rather than compress. |
| `text contrast accessible` | Contrast Readability; Color Contrast; Alt Text | Measured every text/background pair; replaced white-on-green CTA text with near-black (white on `#16A34A` is 3.30:1). Added descriptive alt text to every content image. |
| `reduced motion animation` | Reduced Motion; Excessive Motion; Duration Timing | Removed the initial hero opacity/translate animation entirely so content is never hidden by motion. Reduced-motion disables smooth scroll, transitions, and hover transforms. Only hover feedback and the dialog transition remain as optional motion. |
| `reduced motion transition transform` | Reduced Motion; Transform Performance | Motion uses transform/opacity only, never width/height/top/left. Drawer uses a transform transition. |
| `focus not obscured` | Focus Not Obscured (Minimum); Focus Appearance | Added `scroll-padding-top` equal to the sticky header plus spacing; 3 px focus outlines with 3:1 contrast. |

### Search retry notes

- `modal focus trap escape` did not return a focus-trap implementation; I retried `dialog aria modal focus` and still received only focus-state/ARIA-label guidance. I used verified ARIA dialog semantics plus a hand-written trap, not unverified dataset output.
- `body scroll lock modal` returned unrelated results on both the semantic query and a narrower retry. Per the skill's rule, no verified match was used; the standard browser behavior is labeled as such above.
- `chip toggle button aria pressed` was partially off-topic. Only the chip-reflow result was used; the back-button result was not applicable.

## Key decisions

1. **"Warm Swiss rescue bulletin."** The generated direction was Minimalism & Swiss (grid, whitespace, high contrast), but its "best for" list is enterprise SaaS. The brief asks for warm, playful, scrappy. The page keeps the Swiss grid and flat color blocking, then warms it with Fredoka, a green marker highlight, an arch-cut photo, a location sticker, and violet offset shadows. It deliberately avoids the beige/orange rescue cliché and generic SaaS card look.
2. **Palette fidelity.** Purple is the primary, green is the CTA/accent, lilac is the page ground. The dark CTA panel uses the plum ink (`#2E1065`) rather than black, so the palette still reads as one system.
3. **Asymmetric hero.** Type is the first read, the photo is the second, and the three stats form a baseline. The photo has a large asymmetric lower-right radius (the "soft landing" shape) and a solid green offset rather than a blurred drop shadow.
4. **Cards are the control.** Each card is a single `<button>` containing the photo, name, age/sex, breed, tags, and affordance. This gives one large touch target and one semantic action. No nested interactive elements.
5. **Filters are pressed-state chips, not links.** Five `button[data-filter]` controls with `aria-pressed`; wrapping is intentional so labels are never clipped. The count is a separate polite live region. Selection changes are instant (color transition removed) so the selected state never passes through a low-contrast in-between frame.
6. **Detail is a right drawer on desktop, bottom sheet on mobile.** The same `[role="dialog"][aria-modal="true"]` element is used at all sizes. It has a visible `Close` control, Escape, backdrop click, focus trap, focus return, body scroll lock, and an inert page behind it. The scrollable detail region is focusable so keyboard users can PageDown through a long profile.
7. **Events are date tickets.** The big day/month block is decorative (`aria-hidden`), while the full supplied date remains in a `<time>` element for semantics. This preserves the fixed content and makes the list scannable.
8. **Foster/donate is a single plum panel.** The impact amounts are large green numerals, and `#donate` now targets the two action buttons so the header `Donate` CTA lands on an action rather than an informational card.
9. **Newsletter is a single-field inline-validation form.** It validates on blur and submit, links the error to the field, focuses the field on failure, and swaps in the exact success message without navigating. The success element is focused so it is announced.
10. **No image treatment.** Photos are used as supplied; no recoloring, filters, or generated replacements. Crops use `object-position` to keep faces visible.
11. **All fixed copy preserved.** Only short functional labels were added: `Filter by`, `Meet [name]`, `Adoptable`, `What your gift covers`, the empty-state text, and hidden dialog scaffolding. Headlines, bios, stats, dates, names, and CTAs remain the supplied text.
12. **CTA destinations.** Because the deliverable is static, adoption/foster/donate CTAs are `mailto:` links to `hello@secondchancepaws.org` with relevant subjects. Social links go to the platform roots. No fake payment flow or form endpoint.

## Tradeoffs and known gaps

- **Desktop-first breakpoints.** The skill recommends mobile-first CSS. The page starts with the two-column editorial layout and uses `max-width` overrides for tablet/mobile. The mobile result was designed and tested at 390/375/320, but the CSS order is not mobile-first. Refactoring to `min-width` queries would be the next step for stricter adherence.
- **No dark mode.** The generated style supports light/dark, but the brief does not ask for a theme switch. Shipping a half-tested dark theme would have added risk; the page is light-only and contrast-checked.
- **Detail content lives in JS.** This is allowed by the brief (detail enhancement may require JS). Without JS, the six cards, all photos, all section copy, events, and footer still render; only filtering and the detail drawer are unavailable.
- **Client-side validation only.** The email check is a practical regex, not server-side verification. There is no persistence or backend.
- **No payment/donation integration.** All conversion actions are mailto. The impact amounts are informational.
- **Eager images.** `loading="lazy"` was removed after full-page Chromium screenshots showed undecoded off-screen images. All six card images and the hero now load eagerly. Total local image weight is about 1.1 MB, acceptable for this page but not optimal for a production rescue site.
- **Photo licensing.** The page does not display a visible credits block because the brief fixes the footer content. `CREDITS.md` contains the required attribution; it must be surfaced or linked before publishing, especially for the CC BY and CC BY-SA images (`pepper.jpg` is a cropped CC BY-SA adaptation).
- **Fonts.** Google Fonts requires network access. The CSS declares system fallbacks (`Trebuchet MS` for display, `Segoe UI`/system UI for body), so the page remains usable offline but loses some character.
- **Custom dialog instead of native `<dialog>`.** Custom markup was chosen for full control over the backdrop click, drawer/bottom-sheet animation, focus trap, and scroll lock. It was tested, but native `<dialog>` would provide more browser-managed behavior with less code.
- **Empty state is code-tested, not reachable with supplied data.** All five filters have matches. The empty state was verified by clearing card tag data in the DOM at test time.
- **No URL state.** Filters and open profiles are not reflected in the URL. The search result mentioning deep linking was not applied because the brief does not require shareable filter/profile state.

## Testing

### Tooling and viewports

- Chromium via Playwright (headless).
- Viewports: **1440×900**, **768×1024**, **390×844**, plus **375×812**, **320×700**, and **844×390** landscape.
- Screenshots at full page and viewport for hero, filter area, cards, how-it-works, events, foster, newsletter, footer, dialog, error, success, and empty state.
- No console errors or page errors in any run.

### Checks run

- **Layout:** `document.documentElement.scrollWidth === innerWidth` at 1440, 768, 390, 375, 320, and 844×390. No overflow found. Page heights after image/aspect-ratio fix: 5559 px desktop, 6699 px tablet, 7984 px mobile.
- **Images:** all seven supplied images (hero + six puppies) loaded with `naturalWidth > 0`; no missing alt attributes; decorative SVGs `aria-hidden`.
- **Headings:** exactly one `<h1>`; order is h1 → section h2s → h3s. The dialog contains a hidden h2 that is populated on open.
- **Filters:** `cuddly` → visible Mochi, Otis, Maple; only `cuddly` has `aria-pressed="true"`; live region reads `Showing 3 puppies`. `all` restores six. Empty-state simulation (cleared tags) → `Showing 0 puppies`, grid hidden, empty state visible.
- **Dialog:** opened Mochi with keyboard Enter; focus moved to Close; Tab order close → scrollable profile region → Start adoption application → close; Shift+Tab reversed correctly; Escape closed; backdrop click closed; Close control closed; focus returned to the originating card each time. While open: document overflow hidden, `#page` inert, `aria-modal="true"`, name/meta/size/good-with/note/tags/CTA all correct. PageDown scrolled the profile region by 38 px at 1440×900.
- **Newsletter:** empty submit → `Enter your email address.`, `aria-invalid="true"`, `aria-describedby="newsletter-error"`, focus on email input. `not-an-email`, `a@b..com`, and `a@b.c` → invalid; `hello@example.com` → form hidden, success visible and focused, URL unchanged. No reload/navigation.
- **Reduced motion:** with `reducedMotion: "reduce"`, scroll behavior computed as `auto`; chip and dialog transitions computed as `1e-05s`; JS uses an immediate close path; hover transforms disabled.
- **No-JS:** at 390 px, h1 and all six cards render; page is not blank; no horizontal scroll.
- **Axe:** axe-core 4.10.2, WCAG 2.0/2.1/2.2 A/AA tags, run at desktop, mobile, dialog-open, newsletter-error, and newsletter-success states — **0 violations** in all five runs.
- **Contrast (measured):** body `#4C1D95` on `#FAF5FF` 10.21:1; muted `#475569` on `#FAF5FF` 7.06:1; white on primary 5.70:1; near-black on accent 5.76:1; destructive on white 6.47:1; footer copy 8.25:1; tag text 12.97:1; placeholder 5.06:1; focus green `#16A34A` on cream 3.07:1 (non-text, meets 3:1).
- **Touch targets:** no interactive element under 24×24 CSS px at 390; nav links, chips, buttons, close control, and footer links are 44 px or taller. Brand link has a 44 px minimum.
- **Anchors:** at 768, `Events` anchor lands with the section top at 116 px below the viewport top after smooth scroll settles (header 106 px), confirming `scroll-padding-top`. At 390, header `Donate` lands on `#donate` at 124 px with both foster/donate buttons visible.
- **Buttons and states:** keyboard focus ring measured as `solid 3px rgb(22, 163, 74)` with 3 px offset; selected chip uses filled purple plus `aria-pressed`; `:active` press feedback present.

### Commands actually used

```bash
python3 .opencode/skills/ui-ux-pro-max/scripts/search.py "animal rescue puppy adoption Portland warm playful trustworthy community" --design-system --persist -p "Second Chance Paws" --output-dir .
npx playwright screenshot --browser=chromium --viewport-size=1440,900 --full-page "file://$PWD/site/index.html" /tmp/opencode/scp-uux/desktop-full.png
# Additional Playwright scripts in /tmp/opencode/scp-uux/ for filters, dialog, validation, responsive sizes, reduced motion, no-JS, and axe.
```

## Files changed

- `site/index.html` — page structure, all content, dialog markup.
- `site/styles.css` — design tokens, layout, type, components, responsive rules, reduced-motion rules.
- `site/script.js` — filters, live count, detail dialog, focus management, newsletter validation.
- `design-system/second-chance-paws/MASTER.md` — generated by the skill, unedited.
- `NOTES.md` — this evidence file.

No changes were made to `BRIEF.md`, `CREDITS.md`, `assets/`, or the skill itself.
