// Ad-hoc E2E for number-tags stack-cut ordering: sets 1..100 on a 2×5 grid
// (10 sheets), asserts the preview (sheet 1) shows 1,11,21,…,91 and that a
// 10-page PDF downloads. usage: HARNESS_BASE=http://localhost:3210 node scripts/numtags-check.mjs
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
const page = await browser.newContext({ acceptDownloads: true, locale: "ko-KR" }).then((c) => c.newPage());
const dl = [];
page.on("download", async (d) => { const p = path.join(DL, `number-tags__${d.suggestedFilename()}`); await d.saveAs(p); dl.push(p); });
await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForSelector("main input[type=number]", { timeout: 30000 });

const setNumber = async (idx, v) => { const el = page.locator("main input[type=number]").nth(idx); await el.fill(String(v)); };
const setRange = async (idx, v) =>
  page.evaluate(({ idx, v }) => {
    const el = document.querySelectorAll("main input[type=range]")[idx];
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(el, String(v));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, { idx, v });

await setNumber(0, 1);
await setNumber(1, 100);
await setRange(0, 2); // cols
await setRange(1, 5); // rows
await page.waitForTimeout(500);

const text = await page.evaluate(() => document.querySelector("main")?.innerText || "");
const previewNums = await page.evaluate(() => {
  // preview grid = the card after the options; collect its cell texts in DOM order
  const cards = [...document.querySelectorAll("main .card")];
  const grid = cards[1]?.querySelector("div[style*='grid-template-columns']");
  return grid ? [...grid.children].map((c) => c.textContent.trim()).filter(Boolean) : [];
});
const expected = Array.from({ length: 10 }, (_, i) => String(1 + i * 10));
const previewOk = JSON.stringify(previewNums) === JSON.stringify(expected);
console.log("preview sheet 1:", previewNums.join(","), previewOk ? "OK (stack)" : "MISMATCH expected " + expected.join(","));
console.log("hint:", (text.match(/10장을 겹쳐[^\n]*/) || [""])[0].slice(0, 90));

await page.getByRole("button", { name: /PDF 다운로드/ }).first().click();
await page.waitForFunction(() => !/PDF 생성 중/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 120000 });
await page.waitForTimeout(2500);
let pdfPages = 0;
if (dl[0]) { const pdf = await PDFDocument.load(fs.readFileSync(dl[0])); pdfPages = pdf.getPageCount(); }
console.log("pdf:", dl[0] ? path.basename(dl[0]) + " pages=" + pdfPages : "no download");

// switch to sequential and confirm preview changes
await page.getByRole("button", { name: /장별 순서/ }).first().click();
await page.waitForTimeout(300);
const seqNums = await page.evaluate(() => {
  const cards = [...document.querySelectorAll("main .card")];
  const grid = cards[1]?.querySelector("div[style*='grid-template-columns']");
  return grid ? [...grid.children].map((c) => c.textContent.trim()).filter(Boolean) : [];
});
const seqOk = JSON.stringify(seqNums) === JSON.stringify(Array.from({ length: 10 }, (_, i) => String(i + 1)));
console.log("preview sequential:", seqNums.join(","), seqOk ? "OK" : "MISMATCH");
await browser.close();
const ok = previewOk && pdfPages === 10 && seqOk;
console.log(ok ? "ALL OK" : "FAIL");
process.exit(ok ? 0 : 1);
