// Targeted live checks for tools the generic harness cannot judge (inline
// results, extra inputs, two-file flows). Each check asserts on the actual
// output. usage: node scripts/targeted-check.mjs [slug,slug,...]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const JSZip = require("jszip");

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIX = path.join(ROOT, "scripts", "fixtures");
const DL = path.join(ROOT, ".harness-downloads", "targeted");
fs.mkdirSync(DL, { recursive: true });
const BASE = "https://barokit.com/tools/";
const F = (n) => path.join(FIX, n);
const only = process.argv[2] ? new Set(process.argv[2].split(",")) : null;

const mainText = (page) => page.evaluate(() => document.querySelector("main")?.innerText || "");
const hasErr = (t) => /실패|오류|error/i.test(t);

const CHECKS = {
  "pptx-viewer": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.pptx"));
    // slides render as text lines (+ images only when the deck has any)
    await p.waitForFunction(() => /슬라이드\s*\d+/.test(document.querySelector("main")?.innerText || "") || document.querySelector("main .text-red-600"), null, { timeout: 60000 });
    const t = await mainText(p);
    const err = await p.evaluate(() => document.querySelector("main .text-red-600")?.textContent || "");
    return { ok: /슬라이드\s*\d+/.test(t) && !err, note: err || t.match(/슬라이드\s*\d+[^\n]{0,30}/)?.[0] };
  },
  "pptx-images": async (p, dl) => {
    await p.setInputFiles("input[type=file]", F("test.pptx"));
    await p.waitForFunction(() => [...document.querySelectorAll("main button")].some((b) => /다운로드/.test(b.textContent)), null, { timeout: 60000 });
    await p.getByRole("button", { name: /다운로드/ }).first().click();
    await p.waitForTimeout(3000);
    return { ok: dl.some((d) => /\.zip$|\.png$|\.jpe?g$/.test(d.name) && d.size > 0), note: dl.map((d) => d.name).join(",") };
  },
  "pptx-info": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.pptx"));
    await p.waitForFunction(() => /슬라이드/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 60000 });
    const t = await mainText(p);
    return { ok: /슬라이드[^\n]*\d+/.test(t) && !hasErr(t), note: t.match(/슬라이드[^\n]{0,20}/)?.[0] };
  },
  "pdf-delete-pages": async (p, dl) => {
    await p.setInputFiles("input[type=file]", F("test.pdf"));
    await p.waitForSelector("main input[type=text]", { timeout: 30000 });
    await p.fill("main input[type=text]", "1");
    await p.locator("main .btn-primary").first().click();
    await p.waitForTimeout(4000);
    return { ok: dl.some((d) => /\.pdf$/.test(d.name) && d.size > 100), note: dl.map((d) => d.name).join(",") };
  },
  "pdf-extract": async (p, dl) => {
    await p.setInputFiles("input[type=file]", F("test.pdf"));
    await p.waitForSelector("main input[type=text]", { timeout: 30000 });
    await p.fill("main input[type=text]", "1");
    await p.locator("main .btn-primary").first().click();
    await p.waitForTimeout(4000);
    return { ok: dl.some((d) => /\.pdf$/.test(d.name) && d.size > 100), note: dl.map((d) => d.name).join(",") };
  },
  "image-color-picker": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.png"));
    await p.waitForSelector("main canvas", { timeout: 30000 });
    const c = p.locator("main canvas").first();
    const box = await c.boundingBox();
    await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await p.waitForTimeout(800);
    const t = await mainText(p);
    return { ok: /#[0-9a-f]{6}/i.test(t) || /rgb\(/i.test(t), note: t.match(/#[0-9a-f]{6}/i)?.[0] };
  },
  "file-hash-verify": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.png"));
    await p.waitForFunction(() => /[0-9a-f]{32,}/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 30000 });
    const t = await mainText(p);
    return { ok: /[0-9a-f]{64}/.test(t), note: "sha256 shown: " + /[0-9a-f]{64}/.test(t) };
  },
  "pdf-esign": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.pdf"));
    await p.waitForSelector("main canvas", { timeout: 60000 });
    const n = await p.locator("main canvas").count();
    const t = await mainText(p);
    return { ok: n >= 1 && !hasErr(t), note: `canvases=${n} (upload→preview only; signing needs a drawn signature)` };
  },
  "file-split-join": async (p, dl) => {
    await p.setInputFiles("input[type=file]", F("test.png"));
    await p.waitForTimeout(800);
    const sel = p.locator("main select").first();
    if (await sel.count()) await sel.selectOption("KB").catch(() => {});
    const num = p.locator("main input[type=number]").first();
    if (await num.count()) await num.fill("5");
    await p.waitForTimeout(500);
    const btn = p.locator("main .btn-primary").first();
    await btn.click();
    await p.waitForTimeout(4000);
    const t = await mainText(p);
    return { ok: dl.some((d) => d.size > 0) || /\d+\s*(개|parts?)/.test(t), note: dl.map((d) => d.name).join(",") || t.match(/\d+\s*개[^\n]{0,20}/)?.[0] };
  },
  "base64-image": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.png"));
    await p.waitForFunction(() => /data:image\/png;base64,/.test(document.querySelector("main")?.innerText || "") || (document.querySelector("main textarea")?.value || "").startsWith("data:image"), null, { timeout: 30000 });
    return { ok: true, note: "data URL rendered" };
  },
  "file-to-base64": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.png"));
    await p.waitForFunction(() => /iVBORw0KGgo/.test((document.querySelector("main textarea")?.value || "") + (document.querySelector("main")?.innerText || "")), null, { timeout: 30000 });
    return { ok: true, note: "PNG base64 prefix present" };
  },
  "encoding-convert": async (p) => {
    await p.setInputFiles("input[type=file]", F("test.csv"));
    await p.waitForTimeout(2500);
    const t = await mainText(p);
    const ta = await p.evaluate(() => [...document.querySelectorAll("main textarea")].map((x) => x.value).join("\n"));
    return { ok: (ta.length > 10 || /[가-힣]/.test(t)) && !hasErr(t), note: (ta || t).replace(/\s+/g, " ").slice(0, 60) };
  },
  "video-merge": async (p, dl) => {
    await p.setInputFiles("input[type=file]", [F("test.mp4"), F("test-b.mp4")]);
    await p.waitForTimeout(1000);
    await p.locator("main .btn-primary").first().click();
    await p.waitForFunction(() => !/합치는 중|병합 중|처리 중|다운로드 중/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 240000 });
    await p.waitForTimeout(2000);
    const t = await mainText(p);
    return { ok: dl.some((d) => /\.mp4$/.test(d.name) && d.size > 1000) || (!!(await p.$("main video")) && !hasErr(t)), note: dl.map((d) => d.name + ":" + d.size).join(",") || (t.match(/실패[^\n]*/)?.[0] ?? "video element present") };
  },
  "audio-merge": async (p, dl) => {
    await p.setInputFiles("input[type=file]", [F("test.wav"), F("test-b.wav")]);
    await p.waitForTimeout(1000);
    await p.locator("main .btn-primary").first().click();
    await p.waitForFunction(() => !/합치는 중|병합 중|처리 중|다운로드 중/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 240000 });
    await p.waitForTimeout(2000);
    const t = await mainText(p);
    return { ok: dl.some((d) => d.size > 1000) || (!!(await p.$("main audio")) && !hasErr(t)), note: dl.map((d) => d.name + ":" + d.size).join(",") || (t.match(/실패[^\n]*/)?.[0] ?? "audio element present") };
  },
  "video-speed": async (p, dl) => {
    await p.setInputFiles("input[type=file]", F("test.mp4"));
    await p.waitForTimeout(1000);
    await p.getByRole("button", { name: /변환/ }).first().click();
    await p.waitForFunction(() => !/변환 중|처리 중|다운로드 중|로드/.test(document.querySelector("main")?.innerText || ""), null, { timeout: 240000 });
    await p.waitForTimeout(2000);
    const t = await mainText(p);
    return { ok: (dl.some((d) => d.size > 1000) || !!(await p.$("main video"))) && !hasErr(t), note: t.match(/(실패|오류|Failed)[^\n]*/)?.[0] || dl.map((d) => d.name).join(",") || "video element present" };
  },
};

const browser = await chromium.launch();
const context = await browser.newContext({ acceptDownloads: true, locale: "ko-KR" });
const results = [];
for (const [slug, fn] of Object.entries(CHECKS)) {
  if (only && !only.has(slug)) continue;
  const page = await context.newPage();
  const dl = [];
  const errs = [];
  page.on("download", async (d) => { const fp = path.join(DL, `${slug}__${d.suggestedFilename()}`); await d.saveAs(fp); dl.push({ name: d.suggestedFilename(), size: fs.statSync(fp).size }); });
  page.on("pageerror", (e) => errs.push(String(e?.message || e).slice(0, 120)));
  await page.addInitScript(() => { window.print = () => {}; });
  let r;
  try {
    await page.goto(BASE + slug, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1500);
    r = await fn(page, dl);
  } catch (e) {
    r = { ok: false, note: "ERR " + String(e?.message || e).slice(0, 140) };
  }
  if (errs.length) r.jsErrors = errs;
  results.push({ slug, ...r });
  console.log(`${r.ok ? "OK  " : "FAIL"} ${slug.padEnd(20)} ${r.note || ""}${errs.length ? "  js:" + errs[0] : ""}`);
  await page.close().catch(() => {});
}
await browser.close();
fs.writeFileSync(path.join(ROOT, "scripts", "targeted-check.json"), JSON.stringify(results, null, 2));
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
