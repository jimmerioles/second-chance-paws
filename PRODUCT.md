# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS, and vanilla JavaScript. No framework, no build step. The brief fixes this stack, so no stack question was asked; Google Fonts are the only permitted runtime dependency beyond the provided local photos.

## Users

Primary: prospective adopters in Portland and the wider Pacific Northwest who are researching puppies on a phone, often in short sessions between other things, and who need to judge fit (energy, size, household) before committing to contact.

Secondary: people considering fostering, current or prospective donors, and neighbours looking for a weekend event to attend.

The core job: meet the puppies as individuals, understand what adoption actually involves, and take one concrete next step without feeling pressured.

## Product Purpose

Second Chance Paws is a foster-based puppy rescue. This single page exists to turn casual interest into one of three actions: start an adoption application, become a foster, or donate. Success means a visitor can identify a puppy that fits their home, understands the three-step process and its low-pressure tone, and knows when and where to meet the rescue in person.

## Positioning

Every puppy lives with a foster family, not in a kennel. The rescue pulls puppies from overcrowded Pacific Northwest shelters and matches them by energy, size, and personality rather than running an auction or a first-come queue. The site should make that foster-home model tangible rather than claiming it in a badge.

## Operating Context

- Visitors browse on phones and desktops, often before or after work; the page must read without images loading and remain fully usable with JavaScript disabled for core content.
- Adoption starts with a roughly 10-minute application covering home, schedule, and preferred puppy.
- Meets happen at the puppy's foster home or at weekend socials; events are free and family-friendly.
- Fostering is cost-free to the foster: the rescue covers food, supplies, and vet care.
- Donation amounts map to concrete impact: $25 one week of food, $75 a vet visit, $150 a spay or neuter.

## Capabilities and Constraints

- One page with fixed supplied content: hero, six puppy cards, filter controls, puppy detail view, three-step process, three events, foster/donate block, newsletter, footer.
- Filters: All puppies, Apartment-friendly, High energy, Cuddly, Bonded pair. Filtering is immediate and announced to assistive technology.
- Puppy detail is a modal dialog: keyboard operable cards, focus moved in and trapped, Escape/backdrop/visible close, focus returned to the originating card, background scroll locked.
- Newsletter validates inline without navigation; invalid addresses get an inline error, valid ones get the supplied success message.
- Respects `prefers-reduced-motion: reduce`; motion is never required to understand or operate the page.
- No fabricated testimonials, placement claims, partner logos, prices, or capabilities beyond the brief.
- Photos in `assets/puppies/` are the only imagery and may not be replaced, recolored, or regenerated.

## Brand Commitments

- Name: Second Chance Paws. Location: Portland, Oregon.
- Voice: warm, playful, trustworthy, a little scrappy. Specific and deadpan rather than sentimental or corporate.
- Contact: hello@secondchancepaws.org.
- The supplied headlines, body copy, names, bios, stats, dates, and CTA labels are fixed and must not be rewritten.
- Tone should feel like a small foster network run by real people, not a national charity brand or a SaaS product.

## Evidence on Hand

- Seven real photos: `assets/puppies/hero.jpg` plus one portrait per puppy (`mochi`, `biscuit`, `pepper`, `otis`, `juniper`, `maple`).
- Supplied operational facts: 412 puppies placed, 38 foster homes, 96% placement rate; six puppy profiles with bios, tags, compatibility, and detail notes; three dated events; three donation impact tiers.
- No testimonials, adopter stories, staff bios, press coverage, or financial documents exist. Future work must not invent them.

## Product Principles

1. Show the individual puppy, not the category. Specific bios and real photos do the persuading.
2. Lower the pressure at every step. Applications, meets, and fostering are framed as conversations, not gates.
3. Make the foster-home model visible in structure and language, not only in a claim.
4. Keep the next step obvious without letting any one action crowd out the other two.
5. Stay honest and plain. No urgency devices, no invented proof, no ecommerce mechanics.

## Accessibility & Inclusion

WCAG AA contrast, semantic HTML with one `<h1>` and logical heading order, visible focus on every interactive element, full keyboard operation of filters and the detail dialog, screen-reader announcements for result counts and newsletter state, no horizontal scrolling at 390 px, and reduced-motion support. Content must remain readable with JavaScript disabled.
