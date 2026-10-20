import { chromium } from "playwright-core";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const [siteArg, outArg, label = "site"] = process.argv.slice(2);
if (!siteArg || !outArg) {
  console.error("Usage: node tools/capture.mjs <site-dir> <out-dir> [label]");
  process.exit(2);
}

const siteDir = path.resolve(siteArg);
const rootDir = path.dirname(siteDir);
const sitePrefix = `/${path.basename(siteDir)}/`;
const outDir = path.resolve(outArg);
const indexPath = path.join(siteDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error(`Missing ${indexPath}`);
  process.exit(2);
}
fs.mkdirSync(outDir, { recursive: true });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const isFavicon = pathname === "/favicon.ico";
  let rel = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  const file = path.resolve(rootDir, rel);
  if (!file.startsWith(rootDir + path.sep) && file !== path.join(rootDir, "index.html")) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(isFavicon ? 204 : 404);
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const siteUrl = `http://127.0.0.1:${server.address().port}${sitePrefix}`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM || "/usr/bin/chromium",
  args: ["--no-sandbox", "--font-render-hinting=none"],
});

const report = {
  label,
  siteDir,
  capturedAt: new Date().toISOString(),
  consoleErrors: [],
  pageErrors: [],
  failedRequests: [],
  metrics: {},
  axe: {},
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function prepare(page) {
  page.on("console", (msg) => {
    if (msg.type() === "error") report.consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => report.pageErrors.push(String(err)));
  page.on("requestfailed", (req) => {
    report.failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`);
  });
  await page.goto(siteUrl, { waitUntil: "load", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 35));
    }
    window.scrollTo(0, 0);
  });
  await sleep(900);
}

async function axe(page) {
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async () => {
    const result = await axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return {
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 4).map((n) => n.target),
      })),
      passes: result.passes.length,
      incomplete: result.incomplete.length,
    };
  });
}

async function visibleCards(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("[data-puppy]")]
      .filter((el) => {
        if (el.hidden || el.getAttribute("aria-hidden") === "true") return false;
        const cs = getComputedStyle(el);
        return cs.display !== "none" && cs.visibility !== "hidden" && el.getClientRects().length > 0;
      })
      .map((el) => el.dataset.puppy)
  );
}

// ---------- Desktop ----------
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await desktop.newPage();
await prepare(page);

report.axe.initial = await axe(page);

await page.screenshot({ path: path.join(outDir, "desktop-fold.png") });
// Full-page captures use reduced motion so scroll-triggered reveals are in their
// finished state. The normal fold above still shows the authored first impression.
await page.emulateMedia({ reducedMotion: "reduce" });
await page.evaluate(async () => {
  const step = Math.max(300, window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 45));
  }
  window.scrollTo(0, 0);
});
await sleep(500);
await page.screenshot({ path: path.join(outDir, "desktop-full.png"), fullPage: true });
await page.emulateMedia({ reducedMotion: "no-preference" });

report.metrics.initialVisibleCards = await visibleCards(page);
report.metrics.horizontalOverflowDesktop = await page.evaluate(
  () => document.documentElement.scrollWidth > window.innerWidth + 1
);
report.metrics.h1 = await page.evaluate(() => [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()));
report.metrics.headings = await page.evaluate(() =>
  [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => `${h.tagName}: ${h.textContent.trim().slice(0, 80)}`)
);
report.metrics.images = await page.evaluate(() =>
  [...document.images].map((img) => ({ src: img.getAttribute("src"), alt: img.getAttribute("alt"), naturalWidth: img.naturalWidth }))
);
report.metrics.fonts = await page.evaluate(() => {
  const families = new Set();
  document.querySelectorAll("h1,h2,h3,p,a,button,span,div").forEach((el) => {
    const f = getComputedStyle(el).fontFamily;
    if (f) families.add(f);
  });
  return [...families];
});

// Filter: high energy
async function clickFilter(value) {
  const ok = await page.evaluate((v) => {
    const btn = document.querySelector(`button[data-filter="${v}"]`);
    if (!btn) return false;
    btn.click();
    return true;
  }, value);
  await sleep(700);
  return ok;
}

report.metrics.filterHighEnergyClicked = await clickFilter("high-energy");
report.metrics.highEnergyVisible = await visibleCards(page);
report.metrics.highEnergyPressed = await page.evaluate(
  () => document.querySelector('button[data-filter="high-energy"]')?.getAttribute("aria-pressed")
);
await page.locator("[data-puppy]").first().scrollIntoViewIfNeeded().catch(() => {});
await sleep(300);
await page.screenshot({ path: path.join(outDir, "filter-high-energy.png") });

report.metrics.filterBondedClicked = await clickFilter("bonded");
report.metrics.bondedVisible = await visibleCards(page);
await page.screenshot({ path: path.join(outDir, "filter-bonded.png") });

await clickFilter("all");

// Detail dialog
const openResult = await page.evaluate(() => {
  const card = document.querySelector('[data-puppy="mochi"]');
  if (!card) return "missing-card";
  const target = card.matches("button,a") ? card : card.querySelector("button,a");
  if (!target) return "missing-clickable";
  target.click();
  return "clicked";
});
report.metrics.detailOpenAction = openResult;
let dialogOpen = false;
try {
  await page.waitForSelector('[role="dialog"]', { state: "visible", timeout: 2500 });
  dialogOpen = true;
} catch {
  dialogOpen = false;
}
report.metrics.detailOpened = dialogOpen;
if (dialogOpen) {
  await sleep(600);
  report.metrics.detailAriaModal = await page.evaluate(
    () => document.querySelector('[role="dialog"]')?.getAttribute("aria-modal")
  );
  report.metrics.detailFocusInside = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    return !!d && d.contains(document.activeElement);
  });
  report.metrics.detailBodyLocked = await page.evaluate(() => {
    const o = getComputedStyle(document.body).overflow;
    return o === "hidden" || o === "clip";
  });
  report.axe.dialog = await axe(page);
  await page.screenshot({ path: path.join(outDir, "detail.png") });
  await page.keyboard.press("Escape");
  await sleep(600);
  report.metrics.detailClosedByEscape = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return true;
    const cs = getComputedStyle(d);
    return d.hidden || cs.display === "none" || cs.visibility === "hidden" || !d.getClientRects().length;
  });
  report.metrics.focusReturnedToCard = await page.evaluate(
    () => document.activeElement?.closest("[data-puppy]")?.dataset.puppy ?? null
  );
}

// Newsletter
const invalidResult = await page.evaluate(() => {
  const form = document.querySelector("form[data-newsletter]");
  if (!form) return "missing-form";
  const input = form.querySelector('input[type="email"]');
  const submit = form.querySelector('button[type="submit"], button');
  if (!input || !submit) return "missing-fields";
  input.value = "not-an-email";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  submit.click();
  return "submitted";
});
await sleep(500);
report.metrics.newsletterInvalidAction = invalidResult;
report.metrics.newsletterInvalidError = await page.evaluate(() => {
  const form = document.querySelector("form[data-newsletter]");
  const alert = form?.querySelector('[role="alert"], .error, [data-error]');
  return alert ? alert.textContent.trim() : null;
});
report.metrics.newsletterInvalidPrevented = await page.evaluate(() => {
  const input = document.querySelector('form[data-newsletter] input[type="email"]');
  return input ? !input.validity.valid : null;
});

const validResult = await page.evaluate(() => {
  const form = document.querySelector("form[data-newsletter]");
  if (!form) return "missing-form";
  const input = form.querySelector('input[type="email"]');
  const submit = form.querySelector('button[type="submit"], button');
  if (!input || !submit) return "missing-fields";
  input.value = "puppy@example.com";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  submit.click();
  return "submitted";
});
await sleep(700);
report.metrics.newsletterValidAction = validResult;
report.metrics.newsletterSuccess = await page.evaluate(
  () => document.querySelector("[data-newsletter-success]")?.textContent.trim() ?? null
);
await page.screenshot({ path: path.join(outDir, "newsletter-success.png") });

// ---------- Mobile ----------
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const mpage = await mobile.newPage();
await prepare(mpage);
report.metrics.horizontalOverflowMobile = await mpage.evaluate(
  () => document.documentElement.scrollWidth > window.innerWidth + 1
);
report.metrics.mobileScrollWidth = await mpage.evaluate(() => document.documentElement.scrollWidth);
report.metrics.mobileInnerWidth = await mpage.evaluate(() => window.innerWidth);
await mpage.screenshot({ path: path.join(outDir, "mobile-fold.png") });
await mpage.emulateMedia({ reducedMotion: "reduce" });
await mpage.evaluate(async () => {
  const step = Math.max(300, window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 45));
  }
  window.scrollTo(0, 0);
});
await sleep(500);
await mpage.screenshot({ path: path.join(outDir, "mobile-full.png"), fullPage: true });

// Source stats
const files = ["index.html", "styles.css", "script.js"];
report.metrics.source = Object.fromEntries(
  files.map((f) => {
    const p = path.join(siteDir, f);
    if (!fs.existsSync(p)) return [f, null];
    const text = fs.readFileSync(p, "utf8");
    return [f, { bytes: Buffer.byteLength(text), lines: text.split("\n").length }];
  })
);

await browser.close();
server.close();
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
