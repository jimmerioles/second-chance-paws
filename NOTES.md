# Notes — Second Chance Paws

## Skill and run

- Skill: tasteskill v2 (`design-taste-frontend`), the page run.
- Exact skill file: `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/taste/.opencode/skills/design-taste-frontend/SKILL.md`
- Skill folder: `/home/jimmerioles/Work/tries/2026-10-20-top-design-skill-comparison.worktrees/taste/.opencode/skills/design-taste-frontend`
- Read in full before building: `SKILL.md`, `references/copy.md`, `references/type.md`, `references/colour.md`, `references/layout.md`, `references/imagery.md`, `references/motion.md`, `references/critique.md`. `references/scenes.md` was not needed because no scroll scenes were dealt; `references/app-screens.md` did not apply because this is a page.
- Scripts used: `draw.mjs`, `lint.mjs`, `inspect.mjs`. `assets.mjs` was deliberately not used: the brief supplies the only permitted images and forbids fetching or replacing them.
- All commands were run from the worktree root.

## Reading the brief

- Subject: Second Chance Paws, a fictional foster-based puppy rescue in Portland, Oregon, serving the Pacific Northwest.
- Reader: someone considering adopting, fostering, or donating; they know little about the rescue and decide quickly whether to look at the puppies.
- One action: meet the puppies, with foster/donate as the second step. The primary button is "Meet the puppies"; detail cards lead to the application email; the foster section carries the two supplied actions.
- Stack: static HTML, CSS, vanilla JS; no build, no framework, no bundler, no runtime dependency beyond Google Fonts.
- Imagery that truly exists: seven supplied JPEGs in `assets/puppies/`: one landscape hero (1600×1067) and six 4:5 puppy portraits (800×1000). There is no photograph of a person, a building, or an event, and no video.
- The page must also work from `file://`; it does.

## Inventory (used for the idea, not the category)

- The name "Second Chance Paws" and the phrase "soft landing".
- Portland, Oregon; the Pacific Northwest; foster-based rather than kennel-based.
- 412 puppies placed, 38 foster homes, 96% placement rate.
- The six names and bios: sunbeam philosopher, the ear that has not decided, herding socks and leaf blowers, the 48-pound lap dog and the sturdy sofa, trail-ready, the quieter soul.
- The foster settings visible in the photographs: a bed, a blanket, grass, a wooden deck, a beach, a tiled floor.
- November dates: Laurelhurst Park on Nov 7, Rev Hall at 715 SE Lincoln St on Nov 15, online on Nov 21.
- "Free and family-friendly"; food, supplies and vet care covered; the sock sacrifice.
- $25 / $75 / $150 mapped to food, a vet visit, a spay or neuter.
- "Wet noses" in the newsletter success copy.
- The supplied seven-photograph set itself: six portraits and one landscape, all taken in domestic or outdoor settings.

## The argument

1. These puppies are living in foster homes, not kennels. Proof: the six portraits, the bios, the filter, the detail view.
2. The rescue has a track record. Proof: 412, 38, 96%.
3. The process is low-pressure and concrete. Proof: apply, meet, bring them home.
4. You can meet them in person this November. Proof: the three dated events.
5. Fostering is free and donations have a specific size. Proof: the covered costs and the $25/$75/$150 impact list.
6. You can stay close. Proof: the newsletter.

The brief's section order already follows this argument, so no section was added or removed. Every supplied section carries a claim.

## Direction

Dealt with:

```bash
node .opencode/skills/design-taste-frontend/scripts/draw.mjs \
  --sector nonprofit \
  --brief "Foster-based puppy rescue in Portland, Oregon placing shelter puppies with thoughtful homes" \
  --sections gallery,how-it-works,list,cta,contact,footer \
  --tone warm --have photography --options 3
```

The three directions dealt:

- `place-carries-it` — one full-bleed photograph of a place for the first screen, name at the edge. It needs a photograph of the place; the supplied set is puppies in homes, not Portland, and the brief forbids fetching a substitute.
- `uneven-photographs` — pictures placed like prints on a wall, different sizes and offsets, text small between them.
- `one-motif` — one shape taken from the subject and repeated as masks, buttons and bands. The only shape available from this material would be an invented paw, arch or bowl; that would not come from the client's own content.

Chosen: `uneven-photographs`. The supplied imagery is already a wall of six 4:5 foster-home portraits plus one landscape; the copy's claim is "living with a foster family, not in a kennel"; the filter is a natural way to re-hang that wall around the visitor's home. The other directions would have required a place photograph or an invented shape that does not exist.

Full sheet dealt with the same command plus `--direction uneven-photographs`; seed `135660308`. It dealt EB Garamond, Tobacco and olive, the "Three prints, one line" hero, and the gallery / how-it-works / list / cta / contact / footer blueprints.

Redraws and adaptations, all recorded in `.taste-skill/direction.json` with:

```bash
node .opencode/skills/design-taste-frontend/scripts/draw.mjs \
  --sector nonprofit \
  --brief "Foster-based puppy rescue in Portland, Oregon placing shelter puppies with thoughtful homes" \
  --sections gallery,how-it-works,list,cta,contact,footer \
  --tone warm --have photography --direction uneven-photographs \
  --redraw section:gallery=gallery-tiles-with-label-strips \
  --redraw section:cta=cta-photograph-text-one-half \
  --redraw section:contact=contact-clip-out-coupon
```

- `gallery`: the dealt "Rising triptych (pinned)" holds three photographs. The brief requires six filterable cards, each with photo, name, age, sex, breed and a tag. Redrew to `gallery-tiles-with-label-strips`, the archive blueprint that holds a photo and a label strip, and set it in the direction's uneven print wall (three columns, six ratios and offsets, 2-up and 1-up filtered states).
- `cta`: the dealt "A plain sentence, one action" cannot hold the foster headline, body, two actions and the three-line impact list. Redrew to `cta-photograph-text-one-half`; the section is a full-height 5/7 split with the Otis photograph left and the complete argument right.
- `contact`: the dealt "Sentence, portrait, two links" has no form, while the newsletter needs an email field, validation, an error and a success message. Redrew to `contact-clip-out-coupon`, the form blueprint, then set it as a full-width paper field rather than a floating coupon card. The form sits in columns 8–12; the band avoids a card on a card and gives the page its one light chapter.
- `hero`: kept "Three prints, one line" but shifted the tall print to columns 5–10 and the copy to 1–5 so the two-line h1 has a measure and the tall photo reaches 30% of the first viewport, the inspector's threshold for a focal image. The wide print stays on the right with the stats; the tablet makes the wide print full width; the phone turns the rail vertical. This was a geometry adjustment for the content and the screen, not a new direction.
- Type, palette and the other sections were not redrawn. The tobacco ground, bone ink, olive accent and ochre field were checked against the subject; the photographs' warm browns, cream and grass are the material.

## Idea and live thing

Idea sentence:

> On this page, the six foster-home portraits that belong to this rescue become an uneven print wall, and choosing what fits your home re-hangs that wall.

Competitor test: a kennel-based rescue could not show this material honestly, because its puppies are not in homes. Another foster rescue could use a wall, but not these six portraits, bios and placements; the first blank is this roster's own material, not the category's grid.

Live thing: the filter. It re-hangs the six prints, updates an `aria-live` count, and has an empty state. It is one thing, not a playground; it works with a thumb, and without JavaScript all six prints remain visible.

## Words and labels

All fixed copy is present and unchanged: headlines, body copy, names, ages, sexes, breeds, sizes, bios, tags, good-with lines, detail notes, stats, dates, times, locations, CTA labels, newsletter label/button/success, and footer lines.

The brief calls four lines "eyebrows". The skill bans eyebrow labels. The copy was kept but re-sited so it does not sit as a small label above a heading:

- "Portland, Oregon · Foster-based rescue" is the descriptor beside the wordmark in the header.
- "Waiting for you" sits below the puppies heading and body, introducing the filter row.
- "How it works" sits below the how-it-works heading and body, introducing the steps.
- "Come say hi" sits below the events heading and body, introducing the table.

These labels are set at the body size in italic, not as tiny uppercase tracked labels. Nothing above a heading was added.

Added functional copy, all short and reviewable:

- Photo captions "Biscuit · 5 months" and "At home with a foster family".
- "What your gift does" over the impact list.
- "Showing N puppies" / "No puppies showing" / "No puppies match that yet. Try another filter."
- "Enter a valid email address."
- "Menu" / "Close", "Good with", "Detail note".
- Mailto subjects and bodies for the application and donation actions.
- The photo credit line in the footer.

No proof, customer, quote, rating or statistic was invented. The stats and event details are the brief's. The social names are plain text because the brief supplies no URLs.

## Build

- Files: `site/index.html`, `site/styles.css`, `site/script.js`.
- Type: EB Garamond, roman body and italic headings. Five sizes: 14 / 19 / 24 / 42 / 48 px. The h1 is 48 / 38 / 37 px at 1440 / 768 / 390 and stays on two authored lines.
- Palette: tobacco `#472913` ground, surface `#55321a`, bone ink `#e4e0cf`, muted `#b39f84`, olive accent `#525e1b`, ochre field `#c79a3e` with dark ink, bone newsletter field, surface footer. Contrast checked: ink/ground 9.95:1, muted/ground 5.15:1, dark/ochre 6.60:1, bone/olive 5.33:1, error/bone 7.58:1. No cream-and-terracotta, no violet.
- Frame: one pair of margins: 19 px at 390, 38 px at 768, 72 px at 1440. Section spacing 128–224 px desktop, 128–160 px phone. Full-bleed fields and photographs are deliberate chapters; all text stays on the margins.
- Layout words by section: hero = three prints on a rail; puppies = uneven print wall; how it works = photographs down a diagonal; events = poster table on an ochre field; foster = full-height photo/text split; newsletter = paper form band; footer = photograph half, menu half.
- Imagery: seven supplied photographs, untouched, square corners, 16 `<img>` placements. No recolouring, no generated images, no fetched images, no drawings. `alt` describes each photograph; the footer credits the authors and licences from `CREDITS.md`. The hero image is eager/fetchpriority high; the rest lazy.
- House rules: no gradients, no shadows on rest, no hairlines, no monospaced prose, no index numbering, no uppercase micro-labels, no emoji, no icon cards. The events table is a real `<table>` and the input is a real form field; neither uses drawn rules.
- Motion: the signature shutter on the tall hero print, masked h1 lines, section reveals in reading order with 60–80 ms delays, hover/press feedback, and a slow scroll-linked drift on the tall print. The reduced-motion page is the finished page: no transforms, no clip paths, no hidden text, no smooth scroll. All motion is under `prefers-reduced-motion: no-preference` except colour transitions.
- Semantics: one h1; h2 per section; h3 per step and the impact label; real buttons for cards and filters; native `<dialog role="dialog" aria-modal="true">`; `aria-pressed` on filters; `aria-live` count; `aria-describedby` on the email input; `aria-invalid` on error; skip link; visible focus on every control. The mobile menu is a disclosure; focus moves to the first link and Escape returns to the toggle.
- JavaScript: small, dependency-free, guarded. The menu, filters, dialog, newsletter and reveals are separate blocks. If JavaScript is off, the header/footer links, all six cards, all copy and the form fields are still present; filters and the detail enhancement require JS as the brief allows.

## Inspector and lint: findings and fixes

Commands:

```bash
node .opencode/skills/design-taste-frontend/scripts/lint.mjs site
node .opencode/skills/design-taste-frontend/scripts/inspect.mjs site/index.html
```

Final lint: **0 FAIL, 0 WARN**.

Final inspect at 1440×900, 768×1024 and 390×844: **0 FAIL, 1 WARN**. The warning is `no-footage`: there is no video. The brief permits only the supplied local photographs and forbids fetching or replacing imagery, so a clip was not added. The reduced-motion page reported no hidden text. There was no horizontal overflow at 390, no broken image, and no console error. The inspector measured one h1, 11 headings, all headlines at two lines or fewer, body text at 19 px, five sizes, EB Garamond actually rendering, 16 images, and hero media at 30% of the first viewport.

The first inspect found one FAIL and two WARNs in the work; all were fixed except the asset warning:

- `headline-lines` at 768: "Fostering is free. The payoff is enormous." wrapped to three lines in the narrow foster half. Changed the split from 1fr/1fr to 5fr/7fr and reduced the left padding; now two lines at every width.
- `no-footage`: kept. Defended above; adding stock footage would violate the only-images constraint.
- The initial gallery filter state left the right third of the wall empty when two puppies matched. Added `data-visible` to the grid: 2 matches use a centred two-up wall at 75% width, 1 match a centred single print at 50%, 3 or more the three-column wall. The source photographs are 800 px wide, so the 2-up is capped rather than blown up to the full page width.
- The tablet hero was underfilled at the fold: the landscape was half width beside the stats. Made it full width at 768 with the three stats below, so the first screen ends on a photograph and the numbers.
- The events table at 768 was cramped in five columns. Widened it to seven columns; the dates still break over three lines at 768 but the table now reads as a table rather than a stack of fragments.
- The footer email pressed its column at 768, and the social line crowded it. Added `overflow-wrap: anywhere` and let the mobile footer meta stack.
- Focus on the selected filter, the newsletter button, the dialog CTA and the skip link used `currentColor`, which disappeared against the surface under it. Each got an outline colour chosen for its ground.
- The mobile menu opened without moving focus into it. It now focuses the first link; Escape returns focus to the toggle; outside click closes it.

## Look-and-fix

### Round 1 (before fixes)

Seen in one second: a cream puppy filling a tobacco-brown frame, with the title under a small print on the left.

Idea: the foster-home portraits become an uneven print wall; the filter re-hangs it.

Live thing: the filter.

Layout words by section: hero=three prints on a rail / puppies=uneven print wall / how-it-works=diagonal photographs / events=poster table on ochre / foster=full-height split / newsletter=paper form band / footer=photograph half and menu half.

Scores: design 7.5 · usability 7.5 · creativity 8 · content 9 → 7.75. Caps applied: 1 FAIL (`headline-lines` at 768) caps the overall at 6.0.

Top three problems:

1. Foster headline at 768 runs to three lines (FAIL). Fixed with the wider text side of the split.
2. Events table at 768 is too narrow; dates and locations break into fragments. Fixed by widening the table.
3. With two matching puppies, the filtered wall leaves the right third empty and the section looks unfinished. Fixed with the 2-up centred wall.

Also fixed: tablet hero underfilled, footer email crowding, focus colours, menu focus.

### Round 2 (final)

Seen in one second: the same cream puppy; the title and one action are on the first screen.

Idea and live thing: unchanged.

Scores: design 8 · usability 8 · creativity 8 · content 9 → 8.1. Caps applied: none (0 FAIL; the one WARN is an asset constraint, not a banned device).

Top three problems: none that a stranger would notice on the final screenshots. Remaining soft spots, kept with reasons:

- At 768 the event dates still break over three lines in the table. The full-width stack that would fix it would turn the tablet events section into a long list and lose the poster composition; the table remains legible at 19 px.
- The two-up filtered wall is a visible scale jump from the six-up wall. That is the live thing doing its job: the wall re-hangs. It is capped at 75% so the 800 px sources are not enlarged further.
- The footer credit line is dense. It is required by the CC BY / CC BY-SA licences and is set at 14 px in the full ink, not hidden or reduced below the small step.

## Testing

- `node .opencode/skills/design-taste-frontend/scripts/lint.mjs site` → 0 FAIL, 0 WARN.
- `node .opencode/skills/design-taste-frontend/scripts/inspect.mjs site/index.html` → 0 FAIL, 1 WARN (`no-footage`), 1440 / 768 / 390. Opened every screenshot the inspector listed after the final change: `desktop-fold`, `desktop-page-01` to `03`, `tablet-fold`, `tablet-page-01` to `02`, `mobile-fold`, `mobile-page-01` to `02`.
- Custom Chromium CDP test (`.taste-skill/test.mjs`, using the skill's `scripts/lib/cdp.mjs`) from `file://`:
  - Filters: all → 6, apartment → 2 (Mochi, Maple), high-energy → 3 (Biscuit, Pepper, Juniper), cuddly → 3 (Mochi, Otis, Maple), bonded → 2 (Juniper, Maple). `aria-pressed` followed each; the live count followed each; the grid updated immediately.
  - Empty state: a temporary unmatched filter showed "No puppies showing", the empty message, and zero visible cards; restoring All returned six.
  - Detail: opened Mochi; focus moved to `[data-close]`; Tab reached the CTA; Tab from the CTA wrapped to Close; Shift+Tab from Close wrapped to the CTA; Escape closed it, removed the body scroll lock, and returned focus to the Mochi card; reopening from Biscuit and clicking the backdrop closed it and returned focus to Biscuit. The dialog showed photo/alt, name, age, sex, breed, size, bio, good-with, detail note, tags and the "Start adoption application" mailto. Body overflow was `hidden` while open.
  - Newsletter: `not-an-email` produced the inline error, `aria-invalid="true"`, focus on the field, success hidden; `hello@example.com` hid the error, showed "You’re on the list. Watch your inbox for wet noses.", cleared the field, and did not navigate.
  - Menu at 390: opens with `aria-expanded="true"`, the nav is `display:flex`, focus lands on "Puppies", the toggle reads "Close"; Escape closes and returns focus to the toggle; an outside click closes it.
  - Reduced motion: h1 opacity 1, line transform none, shutter clip none, first reveal opacity 1, scroll behavior auto.
  - No horizontal overflow at 390 (`scrollWidth` 390); no console errors.
- JavaScript disabled (`Emulation.setScriptExecutionDisabled`): no `js` class, h1 visible, all six cards visible, reveals at opacity 1, dialog closed. Screenshot `/.taste-skill/shots/no-js.jpg`.
- `file://` and HTTP: the interaction tests used `file://`; `inspect.mjs` served the page over HTTP. Both loaded the Google font and all local images.
- Playwright CLI smoke captures at 1440 and 390 (`npx playwright screenshot --viewport-size=... --full-page file://$PWD/site/index.html ...`). The `iPhone 13` device profile requests WebKit, which is not installed on this machine, so the 390 capture used the Chromium viewport instead. The CLI captures immediately after load, so those full-page images show the 1.2 s hero intro and the not-yet-revealed below-fold state; the skill inspector, which scrolls and waits, produced the judged screenshots.
- Keyboard focus was checked on the skip link, header links, Donate, filter buttons including the selected one, cards, dialog close/CTA, form field/button and footer links.

## Photographs

All are the supplied files; none was fetched, generated, recoloured or replaced. Credit line in the footer; authors and licences from `CREDITS.md`.

| File | Where used | Author | Licence |
| --- | --- | --- | --- |
| `hero.jpg` | hero wide print; footer close crop | MichaelMcPhee | CC BY 3.0 |
| `mochi.jpg` | hero small print; card; dialog | Ichigocha | CC0 1.0 |
| `biscuit.jpg` | hero tall print; card; how-it-works; dialog crop | jaclou-dl | CC0 1.0 |
| `pepper.jpg` | events photo; card | Kolforn | CC BY-SA 4.0 (cropped) |
| `otis.jpg` | foster split; card | Vannivanni | Public domain |
| `juniper.jpg` | how-it-works; card | Ted Van Pelt | CC BY 2.0 |
| `maple.jpg` | how-it-works; card; phone dialog | Gorfiest | CC0 1.0 |

No open-collection image, no clip and no drawing stands in for photography. The direction sheet's "People" set was not used: it is not this subject's material, and the brief restricts imagery to the supplied set.

## Tradeoffs and known gaps

- No video. The inspector's only warning; the brief's imagery constraint outranks it. A real clip of a foster home or a Portland meetup would be the first addition if the client supplies one.
- No real application or donation endpoint was supplied. The adoption CTA, foster CTA and Donate $25 open a pre-written `mailto:` to `hello@secondchancepaws.org`; the newsletter is front-end only and must be wired to a list before launch. No fake payment form.
- The social names are plain text, not links, because no Instagram or Facebook URLs were supplied. The footer nav and email are real links.
- The supplied portraits are 800×1000. At the desktop tall hero and the 2-up filter state they are near their useful size; on a 2× display they are slightly soft. They were not upscaled or replaced. The 2-up state is capped at 75% for this reason.
- The events table at 768 keeps three-line dates; the full-width alternative was rejected because it loses the poster composition. It is still a real, readable table.
- The brief's eyebrow copy is present but re-sited, as described above. If the client insists on the literal eyebrow placement, that would conflict with the skill's house rule and should be a conscious exception.
- The page's load sequence hides the h1 for under 1.2 s and the below-fold sections reveal on scroll. With JavaScript disabled everything is visible; with reduced motion everything is visible; the inspector's late-title check passes. A zero-wait, no-scroll full-page capture will show the intro or pre-reveal state, not a blank page in normal use.
- The mobile menu is a disclosure, not a modal; it does not trap focus. The links are a short list and Escape/outside click close it. The footer repeats every destination.
- The dialog uses native `<dialog>` with a manual Tab trap and a no-`showModal` fallback. Tested in Chromium; Safari/Firefox were not available.
- The final score is 8.1, not a claim of a perfect page. The remaining soft spots above are the honest gaps.
