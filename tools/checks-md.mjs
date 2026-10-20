import fs from "node:fs";

const r = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const m = r.metrics || {};
const axe = (state) => {
  const v = r.axe?.[state]?.violations ?? [];
  if (!v.length) return "0 violations";
  return v.map((x) => `${x.id} (${x.nodes} node${x.nodes === 1 ? "" : "s"}, ${x.impact})`).join("; ");
};
const vis = (x) => (x && x.length ? x.join(", ") : "none");

console.log(`# Automated checks

These are the same checks for every site, run in headless Chromium against the site served over HTTP.

- **Filters:** high-energy → ${vis(m.highEnergyVisible)}; bonded → ${vis(m.bondedVisible)}; selected state \`aria-pressed\` → ${m.highEnergyPressed ?? "n/a"}.
- **Detail dialog:** opened → ${m.detailOpened}; focus moved inside → ${m.detailFocusInside}; \`aria-modal\` → ${m.detailAriaModal ?? "n/a"}; Escape closed → ${m.detailClosedByEscape}; focus returned to → ${m.focusReturnedToCard ?? "n/a"}; background scroll locked → ${m.detailBodyLocked}.
- **Newsletter:** invalid prevented → ${m.newsletterInvalidPrevented}; visible inline error → ${m.newsletterInvalidError ? "yes" : "no"}; valid success text → ${m.newsletterSuccess ?? "missing"}.
- **axe-core (WCAG 2.1 A/AA), initial page:** ${axe("initial")}.
- **axe-core, detail dialog open:** ${axe("dialog")}.
- **Horizontal overflow:** desktop ${m.horizontalOverflowDesktop}; mobile ${m.horizontalOverflowMobile} (scrollWidth ${m.mobileScrollWidth} / viewport ${m.mobileInnerWidth}).
- **Console / page errors:** ${(r.consoleErrors?.length || 0) + (r.pageErrors?.length || 0)}.
- **Source size:** ${Object.entries(m.source || {})
  .map(([f, s]) => `${f} ${s ? `${s.lines} lines / ${s.bytes} bytes` : "missing"}`)
  .join("; ")}.

Screenshots: \`desktop-fold.png\` (normal motion), \`desktop-full.png\` and \`mobile-full.png\` (captured with reduced motion so scroll reveals are finished), \`detail.png\`, \`filter-high-energy.png\`, \`newsletter-success.png\`.
`);
