# Blind design scores

Scores are 1–5 in 0.5 steps, where 3 is competent and 5 is exceptional. Weighted subtotal = `sum(score / 5 * weight)`, maximum 90. Code quality and skill fidelity are excluded.

## Score table

| Criterion | Weight | A | B | C | D | E |
|---|---:|---:|---:|---:|---:|---:|
| Distinctiveness & art direction | 20 | 4.5 | 5.0 | 4.5 | 4.5 | 3.5 |
| Typography | 15 | 4.5 | 4.5 | 3.5 | 4.5 | 4.5 |
| Layout & hierarchy | 15 | 4.5 | 4.5 | 3.0 | 4.5 | 4.5 |
| Color & contrast | 10 | 4.5 | 4.0 | 4.0 | 5.0 | 4.5 |
| Motion & micro-interactions | 10 | 4.5 | 4.0 | 4.0 | 3.5 | 3.5 |
| UX & interaction completeness | 10 | 3.5 | 4.0 | 4.0 | 4.5 | 4.5 |
| Accessibility & responsiveness | 10 | 4.0 | 3.0 | 4.0 | 4.5 | 4.0 |
| **Weighted subtotal (/90)** |  | **78.0** | **77.0** | **69.5** | **80.0** | **74.0** |
| **Rank** |  | **2** | **3** | **5** | **1** | **4** |

## Letter notes

**A — 78.0, rank 2.**
A's strength is a warm, authored "rescue field journal": cream paper, forest green and rust, taped-in photography, indexed 01–05 sections, and a serif/sans pairing that carries from the hero to the events ledger and impact card. The layout is calm and legible at both widths, and the restrained press/hover motion and full-bleed color changes give it character without noise. Its costs are functional rather than visual: the supplied check reports background scrolling is not locked while the dialog is open, there is an empty `H2` in the outline, and the system is more polished-heritage than truly scrappy. It would suit a rescue that wants to feel established, thoughtful, and editorial — a good fit for storytelling and donor trust.

**B — 77.0, rank 3.**
B commits hardest to a single idea: a vintage cinema-poster identity that runs through the marquee hero, "showtimes" events, concession-board impact list, and box-office newsletter. The slab display type, cream-and-forest matting, mustard/red accents, and bulb/shutter details make it the most memorable and least template-like of the five. The costs are real: eight serious accessible-name mismatches on the brand and cards, a success state that leaves the email field looking invalid with a heavy red outline, and extra invented labels ("program note") that add noise to fixed copy. It would suit an event-led, social-first rescue that wants personality and shareability and is willing to spend a pass on accessibility and form-state polish.

**C — 69.5, rank 5.**
C is the most gallery-like: a brown, gold, and olive art book with italic display serif, collaged photos, and generous margins that feels printed rather than templated. The big image moments and the events/footer treatment are genuinely distinctive and emotionally warm. The cost is usability: the how-it-works section becomes a long, sparse runway of floating photos, the staggered grid is hard to scan, tiny italic body and caption text is tiring on brown, and the page runs roughly 2,000 px longer than any other entry. It would suit a boutique rescue or fundraising campaign where atmosphere and craft matter more than a fast, utilitarian path to adoption.

**D — 80.0, rank 1.**
D is the most complete and controlled: a field-guide palette of forest green, cream, mustard, and plum; a confident display serif against a clean sans; a split hero, disciplined card grid, and clear color-blocked sections. Filter counts, the detailed profile, the success panel, and the automated interaction and axe checks are all clean, and the responsive layouts hold together. The cost is temperament: motion is almost entirely absent, so it feels calmer and less alive than A, B, or C, and the premium-organic look is more "considered brand system" than "scrappy rescue." It would suit a rescue that needs to look credible and warm with minimal production risk, especially one with accessibility as a hard requirement.

**E — 74.0, rank 4.**
E is a confident, friendly modern pet brand: lavender and deep purple with green accents, a bold grotesque display face, rounded cards, offset shadows, and a neat date-tile events list. The hierarchy and responsive behavior are strong, the detail drawer is clear, and the page feels immediately approachable. Its cost is distinctiveness: gradient blobs, rounded cards, and the purple/green DTC palette could belong to almost any pet subscription or vet startup, and motion is functional rather than expressive; one serious accessible-name mismatch remains on the brand. It would suit a young, social-first rescue that prioritizes approachability and ease over a strong editorial point of view.

## Verdict

**If I had to ship one: D.** It has the best combination of strong art direction, near-complete interaction and accessibility results, and production restraint; nothing in the screenshots or checks looks risky, and its calm confidence fits a trust-based adoption decision. A is the warmer runner-up, but the reported scroll-lock miss and slightly safer identity keep it behind.

**Best pure design: B.** It is the only entry with a fully carried, unmistakable concept — the cinema framing survives every section rather than stopping at the hero — and it has the strongest typographic personality. I would pick it for pure design and then budget a focused accessibility and success-state pass before launch.

## Limits of this judgment

- This was judged from six static screenshots and two text summaries per site, without source, notes, or the mapping.
- Keyboard focus styling, focus trapping, Escape/backdrop behavior, scroll locking, and the feel of easing/duration cannot be verified from stills; they are taken from the supplied checks and motion descriptions, which are single-run and self-reported.
- The filter screenshot for every site is framed at the top of the page, so the filtered grid's visual selected state could not be inspected directly.
- Axe catches detectable WCAG issues only; the serious name-mismatch findings are weighted, but other assistive-technology problems could remain invisible.
- D's mobile full-page capture shows later card images unloaded, while its report records loaded natural dimensions for those images; this looks like a lazy-loading screenshot artifact and was not scored as a defect.
- Color and type judgments are made from compressed screenshots; exact contrast conclusions are deferred to the reported axe results.
