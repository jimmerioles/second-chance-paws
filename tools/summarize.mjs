import fs from "node:fs";
import path from "node:path";

const evidenceDir = path.resolve(process.argv[2] || "evidence");
const slugs = fs.existsSync(evidenceDir)
  ? fs.readdirSync(evidenceDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : [];

const rows = [];
for (const slug of slugs.sort()) {
  const p = path.join(evidenceDir, slug, "report.json");
  if (!fs.existsSync(p)) continue;
  const r = JSON.parse(fs.readFileSync(p, "utf8"));
  const m = r.metrics;
  const axeInitial = r.axe?.initial?.violations ?? [];
  const axeDialog = r.axe?.dialog?.violations ?? [];
  const src = m.source || {};
  const bytes = Object.values(src).reduce((n, f) => n + (f?.bytes || 0), 0);
  const lines = Object.values(src).reduce((n, f) => n + (f?.lines || 0), 0);
  rows.push({
    slug,
    highEnergy: (m.highEnergyVisible || []).join(", "),
    bonded: (m.bondedVisible || []).join(", "),
    dialog: [m.detailOpened, m.detailFocusInside, m.detailClosedByEscape, m.focusReturnedToCard].join(" / "),
    newsletter: m.newsletterSuccess ? "success" : "missing",
    axeInitial: axeInitial.length,
    axeDialog: axeDialog.length,
    axeIds: [...new Set([...axeInitial, ...axeDialog].map((v) => v.id))].join(", "),
    overflow: [m.horizontalOverflowDesktop, m.horizontalOverflowMobile].join(" / "),
    console: (r.consoleErrors?.length || 0) + (r.pageErrors?.length || 0),
    bytes,
    lines,
    h1: (m.h1 || []).length,
  });
}

const esc = (v) => String(v).replaceAll("|", "\\|");
console.log("| Worktree | High-energy filter | Bonded filter | Dialog open/focus/esc/return | Newsletter | axe initial | axe dialog | axe ids | Overflow D/M | Errors | Source bytes | Lines | h1 |");
console.log("|---|---|---|---|---|---:|---:|---|---|---|---:|---:|---:|");
for (const r of rows) {
  console.log(
    `| ${esc(r.slug)} | ${esc(r.highEnergy)} | ${esc(r.bonded)} | ${esc(r.dialog)} | ${esc(r.newsletter)} | ${r.axeInitial} | ${r.axeDialog} | ${esc(r.axeIds || "—")} | ${esc(r.overflow)} | ${r.console} | ${r.bytes} | ${r.lines} | ${r.h1} |`
  );
}
