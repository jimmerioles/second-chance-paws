# NOTES — Second Chance Paws

## Skills used

Only the three skills named in the brief were used. No other design skill was consulted.

- `.opencode/skills/emil-design-eng/SKILL.md` — hierarchy, spacing, type, interaction states, invisible details, animation framework.
- `.opencode/skills/animate/SKILL.md` — animation build sequence and hard rules.
- `.opencode/skills/animate/RECIPES.md` — recipes for button press, modal, stagger, and reduced motion.
- `.opencode/skills/review-animations/SKILL.md` — self-review method and required Before/After/Why format.
- `.opencode/skills/review-animations/STANDARDS.md` — exact curves, durations, and review checks.

I read `BRIEF.md`, `CREDITS.md`, all seven photos in `assets/puppies/`, and the skill files above in full. I did not modify anything outside `site/` and this file.

## Workflow actually run

1. Read the brief, credits, skills, recipes, standards, and photos.
2. Set an art direction and design tokens before writing components.
3. Built `site/index.html`, `site/styles.css`, and `site/script.js`.
4. Ran the animate decision framework per interaction before writing motion code.
5. Audited the result with the `review-animations` ten standards and fixed the findings below.
6. Captured and inspected the page at 1440, 1280, 1024, 768, and 390 px.
7. Exercised filters, the detail dialog, keyboard focus, Escape, backdrop close, form validation, the empty state, and reduced motion with Playwright.
8. Served the page over HTTP and repeated the dialog test to confirm assets and scripts load outside `file://`.

## Design direction

**A Pacific Northwest field guide kept on a foster family's fridge.** It is warm and tactile, but organised like a printed guide: numbered sections, monospaced labels, paper tones, and photographs treated as physical prints rather than as background decoration.

- **Palette:** paper `#f6f0e4`, deep paper `#ece2d0`, forest ink `#1a2a23`, event green `#22382c`, rust `#b14727`, rust ink `#8f361c`, marigold `#e7a13c`. The rust section and marigold sun give the page its warmth without turning it into a generic charity palette.
- **Type:** Fraunces for display and editorial italics, Instrument Sans for readable body and UI, IBM Plex Mono for small labels and tabular details. The contrast between the soft serif and the utilitarian mono is the main personality move.
- **Hero:** asymmetric editorial split. The headline is the loudest object; the photo is a slightly rotated print with a paper mat and two pieces of tape, backed by a flat marigold sun. The hand-drawn underline on “soft landing” is the only illustrative mark.
- **Sections:** open cream for browsing, deeper paper for the process, forest for events, rust for fostering/donating, cream again for the newsletter. Each section has a clear job and its own surface without introducing a new component language.
- **Details:** fine rules, dotted separators, a stamp on the newsletter, an impact card that reads like a receipt, tabular numerals in the stats and amounts, a subtle paper-grain overlay, and hover states that act on the photograph rather than lifting the whole card.
- **Accessibility:** semantic landmarks, one `h1`, logical heading order, visible `:focus-visible` rings, skip link, labelled controls, live result count, meaningful alt text, AA contrast for normal text, and reduced-motion variants that keep opacity/colour feedback and remove movement.

## Motion decisions

All motion uses the custom `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` unless noted. No `transition: all`, no `scale(0)`, no `ease-in`, no keyframes, no layout animation.

| Element / trigger | Decision and ingredients | Purpose | Frequency | Interruption / exit |
| --- | --- | --- | --- | --- |
| Buttons, chips, close control | `scale(0.97)` (close `0.96`) on `:active`; 140ms `transform`; colour changes 150–160ms | Feedback | Occasional to tens/day | Transition retargets; release returns immediately |
| Arrow inside a button | `translateX(2px)` on fine-pointer hover; 160ms | Feedback / affordance | Tens/day | Gated hover only |
| Nav links | Underline `scaleX(0 → 1)` on fine-pointer hover and keyboard focus; 140ms | Feedback / state | Occasional | Gated hover; no animation on the link itself |
| Puppy card, fine pointer | Photo `scale(1.03)` over 240ms; arrow circle fills ink and moves 2px; 160/240ms | Affordance connected to the photo | Tens/day | Gated hover; card and text stay still |
| Puppy card, press | Photo `scale(0.995)` over 140ms | Feedback | On activation | Short press; release uses the slower base settle |
| Filter chips | `aria-pressed` state changes instantly; only the 140ms press transform animates | State indication without a muddy crossfade | Occasional | Immediate selection; no colour interpolation |
| Puppy grid after filtering | Newly shown cards enter with `opacity 0 → 1` and `translateY(6px → 0)` over 180ms; 30ms stagger by visible order; exits are instant | Preventing a jarring change / state indication | Occasional | CSS transitions; rapid filter clicks retarget |
| Puppy detail dialog | Panel `opacity 0 → 1` and `scale(0.96 → 1)` over 240ms; backdrop fades over 240ms; close is 160ms; transform-origin stays centred | Spatial consistency / state indication | Occasional | Transitions, not keyframes; close is deliberately faster than open |
| Newsletter success | `opacity 0 → 1` and `translateY(4px → 0)` over 200ms; error appears instantly | State indication | Rare | Entry only; successful state is terminal |
| Reduced motion | Transforms removed; opacity/colour retained at 120–160ms; card stagger removed; hover movement removed | Accessibility | All | Opacity still explains the state change |

**Deliberately not built:** a hero load-in, scroll-triggered reveals, parallax, count-up stats, a shrinking sticky header, skeleton shimmer, a filter exit animation, and an animated filter indicator. None had a purpose stronger than the cost in delay or distraction. The page should be readable the moment it paints.

## Self-review findings (required Before / After / Why table)

The table records what the review method flagged in my own output and what changed.

| Before | After | Why |
| --- | --- | --- |
| Filter chips transitioned `background-color`, `border-color`, and `color` over 150ms while `aria-pressed` changed | Chips change state instantly; only the 140ms `:active` transform remains | Mid-transition the label sat on a half-transparent fill and lost contrast; a functional selected state should be legible immediately |
| Card press scaled the photo to `0.985` with the 240ms hover transition inherited | `scale(0.995)` with an explicit 140ms duration | Press feedback belongs in the 100–160ms band; the larger scale also exposed a visible background ring inside the photo frame |
| Dialog backdrop entered at 220ms while the panel entered at 240ms | Both enter at 240ms and exit at 160ms | The backdrop and panel are one surface; mismatched timing makes the panel arrive after the room has already darkened |
| Close button pressed to `scale(0.94)` | `scale(0.96)` | The skill’s subtle press range is 0.95–0.98; 0.94 reads as a bounce rather than a press |
| Newsletter success lived inside `<form data-newsletter>`; hiding the form made the success message invisible and focus fell to `body` | Success moved outside the form, shown with a 200ms fade/4px rise and focused programmatically | State feedback has to render; the confirmation is the end of the interaction, so focus should land on it |
| Card entrance was initially considered for page load and scroll | Only newly revealed cards animate, and only after a filter change; no scroll reveal | Content should not be hidden behind scroll-triggered motion; the filter change is the moment that needs a bridge |
| A count-up treatment was considered for 412 / 38 / 96% | Static, tabular numerals | Counting numbers is decorative and delays reading a fact the user came for |
| A card lift (`translateY(-4px)`) was considered on hover | The photograph scales inside its frame and the arrow responds; the card itself does not move | Keeps the reading position stable while still showing the whole card is pressable |
| Native `<dialog>` alone was trusted to loop focus | Explicit Tab/Shift+Tab wrap between the last and first controls | In Chromium, tabbing past the CTA dropped focus to `body` for one step; the brief requires a real trap |

## What Emil's skill emphasised that changed the work

- **Frequency before motion.** The biggest change was refusing to add a page-load or scroll-reveal sequence. The page is content someone came to read, not a presentation.
- **Custom curves, not defaults.** Every entrance uses the strong ease-out curve. Built-in `ease-out` would have made the 180–240ms moments feel weaker and slower.
- **Press feedback is not optional.** Buttons, chips, cards, and the close control all acknowledge a press with a subtle scale.
- **Origin correctness.** The modal stays centred (the skill's explicit exception); nothing else pretends to be anchored to a trigger.
- **Exit faster than entry.** The dialog opens in 240ms and leaves in 160ms. The success state enters once and does not animate out.
- **Interruptible tools only.** Transitions rather than keyframes for filters and the dialog; no motion library for a handful of state changes.
- **Reduced motion means gentler, not absent.** Opacity and colour remain; transforms and stagger disappear.
- **Hover gating.** Every hover movement sits behind `@media (hover: hover) and (pointer: fine)`.
- **Invisible details compound.** Scrollbar gutter, body scroll lock, focus restoration, `text-wrap`, tabular numerals, lazy photos with intrinsic dimensions, and the `@starting-style` fallback matter as much as the visible animation.

## Tradeoffs, shortcuts, and known gaps

- The detail bios live in the JavaScript data object. With JavaScript disabled, the cards still show photo, name, age, sex, breed, size, and tags, but the expanded bios and detail view do not exist. The brief permits the detail enhancement to depend on JavaScript.
- Filter exits are instant. Animating cards out would delay the new result set, so only entering cards are animated. This favours immediacy over a fully choreographed grid.
- There is no mobile hamburger. Below 820px the primary links move to their own row; at 390px they fit without horizontal scrolling and without a hidden menu.
- On very short screens the detail panel scrolls. The close control scrolls with the panel; Escape and the backdrop remain available. The panel does not use a fixed header.
- The newsletter is client-side only; there is no backend. The CTAs use `mailto:` because the brief supplies no application or donation URLs.
- `@starting-style` is used for card and success entrances. Older browsers get an instant appearance rather than broken layout. The alternate mount-class pattern was not worth the extra JavaScript for this page.
- Fraunces, Instrument Sans, and IBM Plex Mono load from Google Fonts. Offline, the serif/sans/mono fallback stacks keep the hierarchy intact.
- Testing was Chromium-only through Playwright. Firefox and Safari were not available in this environment. No automated axe audit was run; contrast was checked against the actual palette pairs and keyboard behaviour was tested manually and with scripts.

## How it was tested

**Screenshots**

```sh
npx playwright screenshot --viewport-size=1440,900 --full-page "file://$PWD/site/index.html" /tmp/desktop.png
npx playwright screenshot --viewport-size=768,1024 --full-page "file://$PWD/site/index.html" /tmp/tablet.png
npx playwright screenshot --viewport-size=390,844 --full-page "file://$PWD/site/index.html" /tmp/mobile.png
```

I also checked 1280 and 1024 px widths, and captured section-level crops to inspect type, rules, card rhythm, and the dialog at full resolution. Lazy images were scrolled into view before full-page captures.

**Interaction checks (Playwright, Chromium)**

- **Filters:** all five buttons update `aria-pressed`, visible cards, and the `aria-live` count. `high-energy` returns Biscuit, Pepper, Juniper and reports “3 puppies.” A simulated zero-match state shows the empty message and “0 puppies.”
- **Dialog:** opening Mochi moves focus to the close control, locks document scrolling, and fills name, meta, bio, size, good-with, note, tags, image, alt, and mailto subject. Escape closes it and returns focus to the Mochi card. Backdrop click closes it and returns focus to the Otis card.
- **Focus trap:** repeated Tab cycles between the close control and “Start adoption application” without landing on the page body.
- **Newsletter:** an invalid address shows the inline error, sets `aria-invalid="true"`, and keeps the page in place. A valid address hides the form, shows the exact success message, and focuses it. No navigation or reload.
- **Keyboard:** Tab order reaches filters, cards, CTAs, the input, and the submit button in order; cards are real buttons and open with Enter.
- **Reduced motion:** computed styles confirm the card, image, arrow, and dialog transforms are removed; the dialog keeps an `opacity 0.16s` transition and card opacity fades remain.
- **Console:** no page errors, console errors, or failed requests in the file and HTTP runs.
- **Overflow:** at 1440/768/390 the document `scrollWidth` stayed at or below `clientWidth`; no horizontal scrolling.
- **HTTP:** served the worktree with `python3 -m http.server` and repeated the Maple dialog test over `http://127.0.0.1`; assets, CSS, and JS all loaded with no failures.
