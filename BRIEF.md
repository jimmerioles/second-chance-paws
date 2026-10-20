# Shared Brief — Second Chance Paws

Build a single-page website for **Second Chance Paws**, a fictional foster-based puppy rescue in Portland, Oregon. The site's job is to help someone meet the puppies, understand the adoption process, and take one next step (apply, foster, or donate).

This brief is identical in every worktree. Change the design, not the content.

---

## Deliverable

Create exactly these files:

```
site/index.html
site/styles.css
site/script.js
```

- Static HTML, CSS, and vanilla JavaScript only.
- No build step, no framework, no Tailwind, no component library.
- Google Fonts are allowed. Any other runtime dependency must be loaded from a CDN and must degrade gracefully.
- Use the provided local photos in `assets/puppies/`. Do not replace them, recolor them, or generate new imagery.
- Do not modify `BRIEF.md`, `assets/`, or anything outside `site/` and `NOTES.md`.
- The page must work when opened directly as a file and when served over HTTP.

## Design freedom

You own art direction, palette, typography, layout, spacing, image treatment, and motion. Make deliberate choices specific to this rescue: warm, playful, trustworthy, and a little bit scrappy. Avoid generic SaaS, generic "rescue charity", and generic AI landing-page looks.

The content below is fixed. You may add short functional labels (for example, "Filter by" or "Good with"), but do not rewrite the supplied headlines, body copy, names, bios, stats, dates, or CTA labels.

---

## Content

### Brand

- Name: **Second Chance Paws**
- Location: Portland, Oregon
- Positioning: foster-based puppy rescue serving the Pacific Northwest
- Contact: `hello@secondchancepaws.org`

### Navigation

Links: **Puppies**, **How it works**, **Events**, **Foster**
Header CTA: **Donate**

### Hero

- Eyebrow: **Portland, Oregon · Foster-based rescue**
- Headline: **Every puppy deserves a soft landing.**
- Body: **We pull puppies from overcrowded shelters across the Pacific Northwest, then match them with homes that fit their energy, size, and personality.**
- Primary CTA: **Meet the puppies**
- Secondary CTA: **Become a foster**
- Stats:
  - **412** puppies placed
  - **38** foster homes
  - **96%** placement rate

Hero photo: `assets/puppies/hero.jpg`

### Adoptable puppies

- Eyebrow: **Waiting for you**
- Headline: **Small paws. Big personalities.**
- Body: **Every puppy here is living with a foster family, not in a kennel. Filter by what fits your home, then come say hello.**

Filters: **All puppies**, **Apartment-friendly**, **High energy**, **Cuddly**, **Bonded pair**

| Slug | Name | Age | Sex | Breed | Size / weight | Tags | Bio | Good with | Detail note |
|---|---|---|---|---|---|---|---|---|---|
| `mochi` | **Mochi** | 4 months | Female | Shiba Inu mix | Small · 12 lb | Apartment-friendly, Cuddly | **A 12-pound philosopher who believes every sunbeam is a personal invitation.** | Dogs, kids 8+ | Still learning leash manners |
| `biscuit` | **Biscuit** | 5 months | Male | Golden Retriever mix | Medium · 28 lb | High energy, Good with kids | **A golden-hearted goofball with one ear that hasn't decided which way to point.** | Dogs, cats, kids | Crate trained |
| `pepper` | **Pepper** | 3 months | Female | Border Collie mix | Medium · 18 lb | High energy, Smart | **Herding socks, leaves, and the occasional leaf blower.** | Dogs, kids 10+ | Crate trained |
| `otis` | **Otis** | 6 months | Male | Great Dane mix | Large · 48 lb | Low energy, Cuddly | **A 48-pound lap dog in training. Proceed with a sturdy sofa.** | Dogs, kids 12+ | House-trained |
| `juniper` | **Juniper** | 4 months | Female | Australian Shepherd mix | Medium · 22 lb | High energy, Bonded pair | **Trail-ready and always the first to investigate a new smell.** | Dogs, kids 10+ | Bonded with Maple |
| `maple` | **Maple** | 3 months | Female | Australian Shepherd mix | Medium · 16 lb | Bonded pair, Apartment-friendly, Cuddly | **A quieter soul who blossoms once Juniper shows her the way.** | Dogs | Bonded with Juniper; shy at first |

Filter membership:

- **Apartment-friendly**: Mochi, Maple
- **High energy**: Biscuit, Pepper, Juniper
- **Cuddly**: Mochi, Otis, Maple
- **Bonded pair**: Juniper, Maple

Each card must show the puppy's photo, name, age, sex, breed, and at least one tag.

### Puppy detail

Opening a card reveals a detail view containing:

- Photo, name, age, sex, breed, size / weight
- Full bio
- "Good with" and the detail note
- Tags
- CTA: **Start adoption application**

The detail view must close via a visible close control, `Escape`, and a backdrop click. Return focus to the card that opened it.

### How it works

- Eyebrow: **How it works**
- Headline: **From application to homecoming.**
- Body: **No auctions, no guesswork. Just a thoughtful match for both of you.**

Steps:

1. **Apply** — **Tell us about your home, your schedule, and the kind of puppy you're hoping for. It takes about 10 minutes.**
2. **Meet** — **We'll set up a low-pressure meet at the puppy's foster home or at a weekend social.**
3. **Bring them home** — **You'll go home with food, a favorite blanket, and a 30-day check-in from our team.**

### Events

- Eyebrow: **Come say hi**
- Headline: **Puppy socials & meetups**
- Body: **The best way to fall in love is in person. All events are free and family-friendly.**

| Event | Date | Time | Location |
|---|---|---|---|
| **Puppy Social** | Saturday, November 7, 2026 | 11:00 AM – 2:00 PM | Laurelhurst Park, Portland |
| **Meet & Greet** | Sunday, November 15, 2026 | 1:00 – 4:00 PM | Rev Hall, 715 SE Lincoln St |
| **Foster Info Session** | Saturday, November 21, 2026 | 10:00 – 11:00 AM | Online |

### Foster & donate

- Headline: **Fostering is free. The payoff is enormous.**
- Body: **We cover food, supplies, and vet care. You provide the couch, the patience, and the occasional sock sacrifice.**
- CTAs: **Become a foster**, **Donate $25**
- Impact list:
  - **$25** — one week of food
  - **$75** — a vet visit
  - **$150** — a spay or neuter

### Newsletter

- Headline: **Get the occasional puppy update.**
- Body: **No spam, just new arrivals and event invites.**
- Email label: **Email address**
- Button: **Sign me up**
- Success message: **You're on the list. Watch your inbox for wet noses.**

### Footer

- **Second Chance Paws · Portland, OR**
- `hello@secondchancepaws.org`
- **Instagram · Facebook**
- **© 2026 Second Chance Paws**

---

## Required interactions

1. **Filtering.** The filter buttons update the puppy grid immediately. The active filter has a clear selected state. Show an empty state if a filter has no matches (it should not happen with the supplied data, but handle it).
2. **Puppy detail.** Cards are keyboard operable and open the detail view. Focus moves into the detail view, is trapped there while open, and returns to the originating card on close. Background scrolling is locked while open.
3. **Newsletter.** Validate the email field. Show an inline error for an invalid address and the success message for a valid one. Do not navigate or reload.
4. **Reduced motion.** Respect `prefers-reduced-motion: reduce`. Motion must never be required to understand or operate the page.

## Technical contract (for automated comparison)

Use these hooks in addition to whatever classes and structure you choose:

- Filter controls: `button[data-filter]` with values `all`, `apartment`, `high-energy`, `cuddly`, `bonded`.
- Selected filter: `aria-pressed="true"`.
- Puppy cards: `[data-puppy="mochi"]`, `[data-puppy="biscuit"]`, etc. Each card must be a `<button>`, `<a>`, or contain one of them.
- Card count / result announcement: an element with `aria-live="polite"` that reports the visible count.
- Detail view: `[role="dialog"][aria-modal="true"]`; close control `[data-close]`.
- Newsletter: `form[data-newsletter]`, `input[type="email"]`, success element `[data-newsletter-success]`.
- Images: meaningful `alt` text; decorative images use `alt=""`.

## Quality bar

- Responsive at 390 px, 768 px, and 1440 px.
- Semantic HTML, one `<h1>`, logical heading order.
- Visible keyboard focus on every interactive element.
- Text contrast meets WCAG AA.
- No horizontal scrolling at 390 px.
- No console errors.
- All content present and readable with JavaScript disabled where practical (the filter and detail enhancements may require JS; the page must not be blank).
- Prefer CSS for layout and motion. Keep JavaScript small, readable, and dependency-free.

## NOTES.md

Also create `NOTES.md` at the worktree root:

- Which skill(s) you used, including the exact skill path.
- The workflow or commands the skill prescribed, and what you actually ran.
- Key design decisions and why they fit this brief.
- What the skill emphasized that you would not have done otherwise.
- Any tradeoffs, shortcuts, or known gaps.
- How you tested the page (viewport sizes, keyboard, filter/detail/newsletter).

Do not put marketing copy in `NOTES.md`. This is evidence for the comparison.
