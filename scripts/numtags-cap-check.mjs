// 1..3000 on a 5×8 grid must yield 75 sheets and a 75-page PDF (old cap was 2,000).
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
page.on("download", async (d) => { const p = path.join(DL, `numtags3000__${d.suggestedFilename()}`); await d.saveAs(p); dl.push(p); });
await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForSelector("main input[type=number]", { timeout: 30000 });
await page.locator("main input[type=number]").nth(0).fill("1");
await page.locator("main input[type=number]").nth(1).fill("3000");
await page.waitForTimeout(500);
const text = await page.evaluate(() => document.querySelector("main")?.innerText || "");
const pagesShown = (text.match(/(\d+)\s*장\s*\(3000/) || [])[1];
const capNotice = /까지만 생성됩니다/.test(text); // the cap notice, not the FAQ wording
const t0 = Date.now();
await page.getByRole("button", { name: /PDF 다운로드/ }).first().click();
await page.waitForFunction(() => !/PDF 생성 중/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 300000 });
await page.waitForTimeout(3000);
const ms = Date.now() - t0;
let pdfPages = 0, size = 0;
if (dl[0]) { const b = fs.readFileSync(dl[0]); size = b.length; pdfPages = (await PDFDocument.load(b)).getPageCount(); }
await browser.close();
console.log(`pages shown=${pagesShown} capNotice=${capNotice} pdfPages=${pdfPages} size=${(size / 1048576).toFixed(1)}MB in ${(ms / 1000).toFixed(1)}s`);
const ok = pdfPages === 75 && !capNotice;
console.log(ok ? "ALL OK" : "FAIL");
process.exit(ok ? 0 : 1);
