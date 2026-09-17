// E2E for number-tags: 1..100 on a 2×5 grid (10 sheets).
//  - preview (sheet 1) lists 1,11,21,…,91 in stack order; 1..10 in per-sheet order
//  - a 10-page PDF downloads
//  - the number is vertically centred in its cell on the PDF page (html2canvas
//    used to place it ~15% too low) — measured from the page-1 JPEG's pixels
// usage: [HARNESS_BASE=http://localhost:3210] node scripts/numtags-check.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const { PDFDocument } = require("pdf-lib");

const BASE = (process.env.HARNESS_BASE || "https://barokit.com") + "/tools/number-tags";
const DL = path.resolve("./.harness-downloads/targeted");
fs.mkdirSync(DL, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ acceptDownloads: true, locale: "ko-KR" });
const page = await context.newPage();
const dl = [];
page.on("download", async (d) => { const p = path.join(DL, `number-tags__${d.suggestedFilename()}`); await d.saveAs(p); dl.push(p); });
await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForSelector("main input[type=number]", { timeout: 30000 });

const setNumber = async (idx, v) => page.locator("main input[type=number]").nth(idx).fill(String(v));
const setRange = async (idx, v) =>
  page.evaluate(({ idx, v }) => {
    const el = document.querySelectorAll("main input[type=range]")[idx];
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, String(v));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, { idx, v });
const previewList = () => page.evaluate(() => [...document.querySelectorAll("main [data-preview-numbers] li")].map((li) => li.textContent.trim()));

await setNumber(0, 1);
await setNumber(1, 100);
await setRange(0, 2); // cols
await setRange(1, 5); // rows
await page.waitForTimeout(500);

const stackNums = await previewList();
const expected = Array.from({ length: 10 }, (_, i) => String(1 + i * 10));
const previewOk = JSON.stringify(stackNums) === JSON.stringify(expected);
console.log("preview sheet 1 (stack):", stackNums.join(","), previewOk ? "OK" : "MISMATCH expected " + expected.join(","));

await page.getByRole("button", { name: /PDF 다운로드/ }).first().click();
await page.waitForFunction(() => !/PDF 생성 중/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 120000 });
await page.waitForTimeout(2500);
let pdfPages = 0;
let centering = null;
if (dl[0]) {
  const bytes = fs.readFileSync(dl[0]);
  pdfPages = (await PDFDocument.load(bytes)).getPageCount();
  // first embedded JPEG = page 1 raster
  const s = bytes.indexOf(Buffer.from([0xff, 0xd8, 0xff]));
  const e = bytes.indexOf(Buffer.from([0xff, 0xd9]), s) + 2;
  const dataUrl = "data:image/jpeg;base64," + bytes.subarray(s, e).toString("base64");
  const probe = await context.newPage();
  centering = await probe.evaluate(async (src) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    // geometry of cell (0,0) for margin 10mm, gap 2mm, 2 cols × 5 rows, portrait A4 (794×1123 css px)
    const k = img.width / 794; // raster scale
    const mm = (v) => (v / 25.4) * 96 * k;
    const m = mm(10), g = mm(2);
    const cellW = (img.width - 2 * m - g) / 2;
    const cellH = (img.height - 2 * m - 4 * g) / 5;
    const x0 = Math.round(m), y0 = Math.round(m);
    const d = ctx.getImageData(x0, y0, Math.round(cellW), Math.round(cellH)).data;
    let minY = Infinity, maxY = -Infinity, dark = 0;
    for (let y = 0; y < Math.round(cellH); y++) for (let x = 0; x < Math.round(cellW); x++) {
      const i = (y * Math.round(cellW) + x) * 4;
      if (d[i] < 90 && d[i + 1] < 90 && d[i + 2] < 90) { dark++; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    }
    const textCenter = (minY + maxY) / 2;
    return { dark, offsetPct: +(((textCenter - cellH / 2) / cellH) * 100).toFixed(1), textHeightPct: +(((maxY - minY) / cellH) * 100).toFixed(1) };
  }, dataUrl);
  await probe.close();
}
console.log("pdf:", dl[0] ? path.basename(dl[0]) + " pages=" + pdfPages : "no download");
console.log("cell 1 text vertical offset from centre:", centering ? `${centering.offsetPct}% (text height ${centering.textHeightPct}% of cell, ${centering.dark} dark px)` : "n/a");
const centeredOk = !!centering && centering.dark > 50 && Math.abs(centering.offsetPct) <= 1.5;

await page.getByRole("button", { name: /장별 순서/ }).first().click();
await page.waitForTimeout(300);
const seqNums = await previewList();
const seqOk = JSON.stringify(seqNums) === JSON.stringify(Array.from({ length: 10 }, (_, i) => String(i + 1)));
console.log("preview (per sheet):", seqNums.join(","), seqOk ? "OK" : "MISMATCH");
await browser.close();
const ok = previewOk && pdfPages === 10 && seqOk && centeredOk;
console.log(ok ? "ALL OK" : "FAIL" + (centeredOk ? "" : " (text not centred)"));
process.exit(ok ? 0 : 1);
