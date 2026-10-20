# Second Chance Paws — process notes

## Skill used

- Skill: `frontend-design`
- Exact path: `.opencode/skills/frontend-design/SKILL.md`
- Source: `anthropics/skills` → `skills/frontend-design`

The skill asks for a grounded subject, a compact plan, a review against generic defaults, then
build and self-critique. I followed that order.

## Subject read

The client is a foster-based puppy rescue in Portland, Oregon. The supplied photographs are not a
polished studio set: one is a scanned vintage snapshot, two look like phone photos, and the rest are
ordinary home and outdoor pictures. That is the actual material of foster care, and the design
should not sand it down into a generic charity campaign.

The page has one job: get a visitor to meet a specific puppy, understand the process, and take one
step. "A little bit scrappy" is in the brief and is as important as "trustworthy".

## Design plan v1 (before review)

**Concept:** A warm editorial rescue site, cream paper, high-contrast serif display, terracotta
accent, a full-bleed hero photo with the headline centered over it.

**Palette**

- Paper `#F4F1EA`
- Ink `#201C18`
- Clay `#D97757`
- Moss `#6E7B55`
- Butter `#EFD9A7`

**Type**

- Display: Fraunces (high-contrast, soft serif)
- Body: Inter

**Layout**

- Centered hero over a full-bleed photo.
- Rounded cards in a three-column grid with soft shadows.
- Filters as pill buttons.
- Large stat numbers as a three-up hero element.
- Numbered markers on every section.

**Principles**

- Warm, friendly, trustworthy.
- Lots of whitespace.
- Soft rounded shapes.

## Review against the brief (and the skill's default list)

This plan is the default. It is almost a direct match for the first cluster the skill names (cream,
high-contrast serif, terracotta) and the SaaS-card kit (identical rounded cards, one shadow, pill
filters). It would fit any rescue in any city, and the "scrappy" half of the brief has been
smoothed away. Changes:

1. **Palette replaced.** Cream + clay is out. The new palette comes from the actual photographs and
   Oregon: the green bench in `hero.jpg`, the moss in `pepper.jpg`, golden retriever fur, and
   marionberry (an Oregon berry) for the accent. The page base is a cool pale lichen, not cream, so
   it does not sit in the named default cluster.
2. **Type replaced.** Fraunces is the current default "tasteful serif". Young Serif is fatter,
   warmer, and more poster-like; Karla is a humanist sans with enough quirks to avoid looking like
   a UI kit. Two families, clear roles, no third mono for "data".
3. **Hero replaced.** No centered text on a photo, no arch crop. A two-panel field-guide spread:
   deep fir copy panel stitched to a full-height photograph of the puppy. The seam is the one
   signature device, drawn as a dashed stitch.
4. **Stats demoted.** They are a small ledger at the bottom of the hero, not a giant-number
   centerpiece. The puppy and headline are the opening, not the metrics.
5. **Cards replaced.** No card background, no shadow, no rounded container. Each puppy is a
   field-guide plate: a 4:5 photo with a thin keyline, then name and facts as a caption. The grid is
   still orderly, which is what makes the found photography feel intentional rather than messy.
6. **Filters replaced.** Printed rectangular tabs with visible counts, not pills.
7. **Numbering restricted.** Numbers appear only in "How it works", which is a real sequence. The
   rest of the page does not get 01/02/03 decoration.
8. **Eyebrows handled.** The brief supplies the eyebrow copy, so it stays, but it is set in
   sentence case with a stitched tick, not tracked-out all caps.
9. **No arrows on CTAs, no monospace labels, no middle-dot metadata in new copy.** The supplied
   "Portland, Oregon · Foster-based rescue" keeps its middle dot because it is fixed content.
10. **Scrapbook idea cut.** An early alternative used rotated snapshots and tape. It is a known
    rescue/zine cliché, it hurts scanning, and it would make the page about the styling rather than
    the dogs. The only "handmade" move that survived is the stitched seam and the dashed impact
    rules.

## Final plan

**Concept:** A foster-home field guide. The page is a printed guide to the puppies currently on
couches around Portland: real found photographs, exact facts, warm paper, one stitched edge. The
structure is trustworthy; the surface is warm and a little home-made.

**Palette (6 named values)**

- `--fir` `#1F3A2E` — primary text, dark panels, footer.
- `--lichen` `#E8EDE0` — page base; a cool pale green-grey, not cream.
- `--cream` `#F7F2E7` — type on dark panels, form fields, photo mats.
- `--biscuit` `#E6B45E` — golden retriever warmth; primary CTA on dark, newsletter band.
- `--marionberry` `#7A2C4E` — Oregon berry; links, selected filters, foster section, tags.
- `--bench` `#7C8659` — the green bench in the hero photo; used only as a quiet tint.

**Type**

- **Young Serif** (display, 400): h1, h2, puppy names, event names, stat numbers. Fat, warm,
  slightly retro; set tight with negative tracking at display sizes.
- **Karla** (body/UI, 400/500/600/700): paragraphs, navigation, labels, buttons, form. Humanist and
  legible; carries the interface without competing with the display face.
- No all-caps, no letterspaced labels, no italic word in the headline. The headline's last line is
  indented slightly, so "soft landing" literally settles lower than the lines above it.

**Layout**

Desktop (1440):

```
┌──────────────────────────────────────────────────────────────────────┐
│ Second Chance Paws        Puppies  How it works  Events  Foster [Donate] │
├────────────────────────────────────┬─────────────────────────────────┤
│ Portland, Oregon · Foster-based    │                                 │
│ Every puppy                        │                                 │
│ deserves a                         │        hero.jpg                 │
│    soft landing.                   │     (puppy on bench)            │
│ body copy                          │                                 │
│ [Meet the puppies] [Become a foster]│                                │
│ 412 placed / 38 foster / 96%       │                                 │
├────────────────────────────────────┴─────────────────────────────────┤
│ Waiting for you                                                      │
│ Small paws. Big personalities.            body copy                  │
│ Filter by [All 6] [Apartment 2] [High energy 3] [Cuddly 3] [Bonded 2]│
│ 6 puppies showing                                                    │
│ ┌────────┐  ┌────────┐  ┌────────┐                                  │
│ │ photo  │  │ photo  │  │ photo  │   field-guide plates              │
│ │ name   │  │ name   │  │ name   │                                  │
│ └────────┘  └────────┘  └────────┘                                  │
├──────────────────────────────────────────────────────────────────────┤
│ FIR: How it works                                                    │
│ 01 Apply ┈┈┈┈ 02 Meet ┈┈┈┈ 03 Bring them home                       │
├──────────────────────────────────────────────────────────────────────┤
│ Events: date | event + time | location (rows, not cards)             │
├──────────────────────────────────────────────────────────────────────┤
│ MARIONBERRY: Fostering is free...     $25 / $75 / $150               │
├──────────────────────────────────────────────────────────────────────┤
│ BISCUIT: newsletter copy               [email address] [Sign me up]  │
├──────────────────────────────────────────────────────────────────────┤
│ FIR footer                                                           │
└──────────────────────────────────────────────────────────────────────┘
```

Mobile (390): photo first, then the hero copy; one-column plates; filters wrap; process becomes a
vertical stitch; event rows stack; foster impact list stacks; form stacks.

Alignment: left-aligned throughout. No centered body copy. Section heads use an asymmetric 5/7
split so the page reads like a guide, not a series of centered landing-page blocks.

**Principles**

1. The puppy is the hero. Brand language stays quiet around the photographs.
2. Found photography is evidence, not a problem to retouch. Plate it consistently and let the
   vintage snapshot and the phone photos sit together.
3. One bold color block (marionberry foster section) and one bold type moment (hero). Everything
   else is restrained.
4. Structure is information: real sequence gets numbers; facts get a clean definition list; filters
   show counts; the result count is live.
5. Scrappy means one visible stitch, not a scrapbook of rotations and tape.
6. Motion answers an action. The only ambient motion is the hero photograph settling by a few
   pixels on load; reduced motion removes it.

## Key decisions and tradeoffs

- **Full-height split hero vs. full-bleed image.** The split gives the headline enough room at 1440
  and keeps text contrast deterministic. The photograph is cropped tightly to the puppy's face and
  paws, so it still leads. Tradeoff: on desktop the image is a tall crop of a landscape original,
  losing the bench's full width.
- **Photo plates, not cards.** No shadows or card containers keeps the page out of SaaS territory
  and makes the inconsistent source photos feel like a collection. Tradeoff: the grid is quieter
  than a conventional card grid and relies on typography for hierarchy.
- **Marionberry foster section.** A full-bleed berry panel is the page's single loud gesture and
  gives the donate/foster ask its own gravity. Tradeoff: it is a strong color, and the biscuit
  newsletter band directly after it makes the lower page warm and busy; the fir footer closes it.
- **Stitched seam.** A dashed line reads as a blanket seam and ties to "soft landing" without using
  a paw-print pattern or clip art. It appears in the hero, the process connector, and the impact
  list, nowhere else.
- **No mobile menu.** Four short links fit in a second header row at 390. A hamburger would add
  interaction for no benefit.
- **Details require JavaScript.** The brief allows this for the filter and detail enhancements. All
  static content, including the six puppy cards and their facts, is in the HTML so the page is not
  blank without JS.
- **Mailto next steps.** There is no backend. Adoption, foster, and donation CTAs open a prefilled
  email to the supplied address rather than pretending a payment or application system exists. The
  header Donate link scrolls to the foster/donate section; "Donate $25" is the actual email action.
- **No photo credits in the footer.** `CREDITS.md` holds the required attribution and license
  details for this comparison; duplicating a credits block would add content the brief did not ask
  for. This would need to be revisited before public publication.
- **Known gap:** the filter and dialog are progressive enhancements, so with JS disabled the filter
  buttons do nothing and profiles cannot open. The content remains readable. The newsletter also
  requires JS to validate inline.

## How the skill changed the work

Without the skill I would have stopped at the v1 plan: cream, a fashionable serif, terracotta, a
centered photo hero, pill filters, and soft-shadow cards. The skill's explicit list of generated
defaults made those choices visible, and its insistence on the subject's own materials is what led
to the field-guide structure, the bench/lichen/fur/berry palette, and the decision to treat the
inconsistent photos as the collection rather than as a problem. It also pushed the stats out of the
hero's center and restricted numbering to the one real sequence.

## Self-critique after screenshots

Screenshots were reviewed at 1440, 768, and 390, plus the open detail view at desktop and mobile.
The changes that came out of that review:

- **Headline composition.** The first build capped the h1 at `10ch`, which broke "soft landing."
  onto two lines and turned the intended three-line staircase into four ragged lines. Removed the
  cap. The intended indent now reads as the phrase settling onto the page.
- **Tablet hierarchy.** The section h2 clamp fell to 34 px at 768 because the viewport-based value
  was below the minimum. Raised the floor to 2.5rem (40 px) so tablet headings do not look like
  enlarged mobile text.
- **Mobile first fold.** The hero photo at 44svh pushed both hero CTAs just below a 390x844 fold.
  Reduced it to 34svh. The 390 fold now contains the headline, body, and both buttons.
- **Mobile detail CTA.** The adoption button was clipped at the bottom of the mobile dialog. Reduced
  the photo row from 34svh to 30svh and tightened the body spacing. The full CTA is visible at
  390x844; the body still scrolls if the content grows.
- **Focus treatment.** A focused card showed a ring around the name and another around the photo.
  Moved the ring to the whole card (whole-card outline, name outline suppressed when `:has` is
  supported, name-only ring as fallback). It now reads as one target.
- **Contrast.** The first axe pass found 11 contrast failures in muted filter/event text (4.02-4.46)
  and four 11.5 px `dt` labels in the dialog at 3.53. Darkened the muted text to 82% fir and the
  fact labels to 78%. Re-ran axe: zero violations in the initial page, open dialog, and newsletter
  success state.
- **Image loading in full-page captures.** Lazy-loaded card images were blank in the first mobile
  full-page capture. Removed `loading="lazy"` from the six card images; they are 79-211 KB each and
  the page now loads all seven photos (about 1.1 MB total) reliably. Kept `decoding="async"`.
- **Empty-state test.** The first empty-state check removed cards from the DOM, which left detached
  nodes counted as visible. Added an `isConnected` guard to the filter visibility calculation. The
  empty state and "0 puppies showing" now behave correctly in that test as well as in real use.
- **Footer lockup.** At 390 the built-in middle dot was left at the end of a wrapped line
  ("Second Chance Paws ·" / "Portland, OR"). The city now moves to its own line on small screens and
  the dot is hidden; the full supplied string remains on tablet and desktop.

The remaining restraint pass: no marquee, no sticker sheet, no paw-print pattern, no rotating
snapshots, no gradient. The page keeps one loud color block, one big type moment, and one stitch.

## Testing

### Commands and environments

- The repo's comparison capture tool, run against this worktree's `site/`:
  `node tools/capture.mjs /abs/path/to/site /tmp/scp-capture`
  (The worktree checkout does not contain `tools/`; I ran the tool from the main checkout.)
- Custom Playwright checks in `/tmp/shots.mjs` and `/tmp/contract-test.mjs`.
- Static checks: `python3` HTML parser for duplicate IDs, dangling `aria-labelledby` /
  `aria-describedby` references, images without `alt`, and contract attributes.
- Visual: Chromium via Playwright at 1440x900, 768x1024, and 390x844, full-page and fold, plus
  the detail dialog at 1440 and 390.
- Keyboard: tab order, Enter to open a card, Tab and Shift+Tab in the dialog, Escape, visible close,
  backdrop click, focus return.
- Reduced motion: Playwright `reducedMotion: "reduce"`, then computed styles.
- No-JS: Playwright context with `javaScriptEnabled: false`.
- HTTP: `python3 -m http.server 4174` from the worktree root, then
  `http://127.0.0.1:4174/site/`. The brief's photos live outside `site/`, so the document root must
  contain both `site/` and `assets/`; serving only `site/` cannot resolve `../assets/puppies/`.
- Axe: WCAG 2.0 A/AA and 2.1 A/AA against the initial page, the open dialog, and the newsletter
  success state.

### Verified results

- Filtering: All 6, Apartment-friendly 2 (Mochi, Maple), High energy 3 (Biscuit, Pepper, Juniper),
  Cuddly 3 (Mochi, Otis, Maple), Bonded pair 2 (Juniper, Maple). Exactly one filter has
  `aria-pressed="true"`; the live count updates; the empty state appears with a zero count.
- Detail: opens by click and by Enter; `role="dialog"`, `aria-modal="true"`; focus moves to the
  puppy heading inside; Tab/Shift+Tab stay in the dialog; body scroll is locked; Escape, the visible
  close control, and the backdrop all close; focus returns to the originating card. All required
  detail fields are present; the CTA is a prefilled adoption email.
- Newsletter: invalid input shows the inline error and `aria-invalid="true"`; valid input shows the
  exact success message; the URL does not change and no reload occurs.
- Reduced motion: the hero animation is absent, the photo transition is effectively zero, and
  smooth scrolling is disabled.
- Responsive: no horizontal overflow at 1440, 768, or 390; the no-JS page keeps the h1, all six
  cards, and all three events.
- Images: all seven supplied photos load with meaningful `alt` text (the dialog image receives its
  alt when populated).
- Console: no page errors and no console errors on direct file open or worktree-root HTTP.
- Axe: zero violations in all three audited states.

The only unverified item is a real screen-reader session; focus moves, names, roles, and live regions
were checked through the accessibility tree and axe rather than with NVDA or VoiceOver.
