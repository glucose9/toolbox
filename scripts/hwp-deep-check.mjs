// HWP deep verification against production: every HWP tool × every real HWP
// fixture, asserting on actual output (rendered SVG text, extracted text,
// downloaded .txt/.hwpx contents) and saving viewer screenshots for a human
// fidelity pass (fonts, tables). Fixtures are personal documents and stay
// gitignored; so do the shots and the report.
// usage: node scripts/hwp-deep-check.mjs [outJson]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");
const JSZip = require("jszip");

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIX = path.join(ROOT, "scripts", "fixtures");
const SHOTS = path.join(ROOT, "scripts", "hwp-shots");
const DL = path.join(ROOT, ".harness-downloads", "hwp");
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync(DL, { recursive: true });
const OUT = process.argv[2] || path.join(ROOT, "scripts", "hwp-deep-check.json");
const BASE = (process.env.HARNESS_BASE || "https://barokit.com") + "/tools/";
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;
const KO = /[가-힣]/g;

const variants = [
  ["sample", path.join(FIX, "sample.hwp")],
  ["form-tables", path.join(FIX, "hwp-variants", "form-tables.hwp")],
  ["notice-forms", path.join(FIX, "hwp-variants", "notice-forms.hwp")],
  ["large-complex", path.join(FIX, "hwp-variants", "large-complex.hwp")],
  ["hwpx", path.join(FIX, "hwp-variants", "sample.hwpx")],
].filter(([, p]) => fs.existsSync(p));

const koCount = (s) => (s.match(KO) || []).length;
const now = () => Date.now();

async function newPage(context, rec) {
  const page = await context.newPage();
  page.on("pageerror", (e) => rec.jsErrors.push(String(e?.message || e).slice(0, 200)));
  page.on("console", (m) => {
    if (m.type() === "error" && !/vercel|insights|DevTools/i.test(m.text())) rec.consoleErrors.push(m.text().slice(0, 200));
  });
  await page.addInitScript(() => {
    window.print = () => {};
    window.open = () => null; // hwp-to-pdf's print path — never trigger it here
  });
  return page;
}

async function upload(page, file) {
  // the input is class="hidden" — wait for it to exist, not to be visible
  await page.waitForSelector("input[type=file]", { state: "attached", timeout: 30000 });
  await page.setInputFiles("input[type=file]", file);
}

async function waitFor(page, fn, timeout) {
  const t0 = now();
  await page.waitForFunction(fn, null, { timeout, polling: 500 });
  return now() - t0;
}

async function viewer(context, name, file) {
  const rec = { tool: "hwp-viewer", variant: name, ok: false, jsErrors: [], consoleErrors: [] };
  const page = await newPage(context, rec);
  try {
    await page.goto(BASE + "hwp-viewer", { waitUntil: "domcontentloaded", timeout: 45000 });
    await upload(page, file);
    rec.renderMs = await waitFor(page, () => !!document.querySelector("main svg") || !!document.querySelector("main .text-red-600"), 180000);
    const info = await page.evaluate(() => {
      const svg = document.querySelector("main svg");
      const main = document.querySelector("main")?.innerText || "";
      const m = main.match(/(\d+)페이지/);
      return {
        hasSvg: !!svg,
        textEls: svg ? svg.querySelectorAll("text, tspan").length : 0,
        svgText: svg ? svg.textContent.slice(0, 4000) : "",
        pageCount: m ? Number(m[1]) : 0,
        width: svg?.getAttribute("width"), height: svg?.getAttribute("height"), viewBox: svg?.getAttribute("viewBox"),
        error: document.querySelector("main .text-red-600")?.textContent || "",
        fontFamilies: svg ? [...new Set([...svg.querySelectorAll("[font-family]")].map((e) => e.getAttribute("font-family")))].slice(0, 6) : [],
      };
    });
    Object.assign(rec, { pageCount: info.pageCount, textEls: info.textEls, koChars: koCount(info.svgText), size: `${info.width}x${info.height} vb=${info.viewBox}`, fontFamilies: info.fontFamilies, error: info.error });
    rec.sample = info.svgText.replace(/\s+/g, " ").slice(0, 120);
    const box = page.locator("main svg").first();
    if (info.hasSvg) {
      await box.screenshot({ path: path.join(SHOTS, `${name}__viewer_p1.png`) }).catch((e) => (rec.shotErr = String(e).slice(0, 100)));
      if (info.pageCount > 1) {
        const clicked = await page.evaluate(() => {
          const b = [...document.querySelectorAll("main button")].find((x) => /^(›|»|▶|>|다음)/.test((x.textContent || "").trim()));
          if (b) { b.click(); return (b.textContent || "").trim(); }
          return null;
        });
        if (clicked) {
          await page.waitForTimeout(1500);
          await page.locator("main svg").first().screenshot({ path: path.join(SHOTS, `${name}__viewer_p2.png`) }).catch(() => {});
          rec.page2 = true;
        }
      }
    }
    rec.ok = info.hasSvg && info.textEls > 0 && rec.koChars > 0 && !info.error;
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

async function toText(context, name, file) {
  const rec = { tool: "hwp-to-text", variant: name, ok: false, jsErrors: [], consoleErrors: [] };
  const page = await newPage(context, rec);
  const downloads = [];
  page.on("download", async (d) => {
    const p = path.join(DL, `${name}__${d.suggestedFilename()}`);
    await d.saveAs(p);
    downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size, path: p });
  });
  try {
    await page.goto(BASE + "hwp-to-text", { waitUntil: "domcontentloaded", timeout: 45000 });
    await upload(page, file);
    rec.extractMs = await waitFor(page, () => (document.querySelector("main textarea")?.value || "").length > 0 || !!document.querySelector("main .text-red-600"), 180000);
    const text = await page.evaluate(() => document.querySelector("main textarea")?.value || "");
    rec.chars = text.length; rec.koChars = koCount(text); rec.sample = text.replace(/\s+/g, " ").slice(0, 120);
    rec.error = await page.evaluate(() => document.querySelector("main .text-red-600")?.textContent || "");
    const btn = page.getByRole("button", { name: /\.txt/ });
    if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(2500); }
    rec.downloads = downloads.map(({ name, size }) => ({ name, size }));
    if (downloads[0]) {
      const saved = fs.readFileSync(downloads[0].path, "utf8");
      rec.downloadKo = koCount(saved); rec.downloadMatches = saved.trim() === text.trim();
    }
    rec.ok = rec.chars > 20 && rec.koChars > 0 && !!downloads[0] && downloads[0].size > 0 && !rec.error;
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

async function toPdf(context, name, file) {
  const rec = { tool: "hwp-to-pdf", variant: name, ok: false, jsErrors: [], consoleErrors: [] };
  const page = await newPage(context, rec);
  const downloads = [];
  page.on("download", async (d) => {
    const p = path.join(DL, `${name}__${d.suggestedFilename()}`);
    await d.saveAs(p);
    downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size, path: p });
  });
  try {
    await page.goto(BASE + "hwp-to-pdf", { waitUntil: "domcontentloaded", timeout: 45000 });
    await upload(page, file);
    // new flow: conversion runs on upload and produces a real PDF; wait for the download button (or an error)
    rec.renderMs = await waitFor(page, () => /\d+페이지 준비됨/.test(document.querySelector("main")?.innerText || "") || !!document.querySelector("main .text-red-600"), 300000);
    const info = await page.evaluate(() => {
      const main = document.querySelector("main")?.innerText || "";
      const m = main.match(/(\d+)페이지 준비됨/);
      const svg = document.querySelector("main svg");
      return { pages: m ? Number(m[1]) : 0, hasPreview: !!svg, previewText: svg ? svg.textContent.slice(0, 2000) : "", error: document.querySelector("main .text-red-600")?.textContent || "", saveBtn: !!document.querySelector("main .btn-primary") };
    });
    Object.assign(rec, { pages: info.pages, hasPreview: info.hasPreview, koChars: koCount(info.previewText), error: info.error, saveBtn: info.saveBtn });
    if (info.hasPreview) await page.locator("main svg").first().screenshot({ path: path.join(SHOTS, `${name}__topdf_preview.png`) }).catch(() => {});
    const btn = page.getByRole("button", { name: /PDF 다운로드/ });
    if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(3000); }
    rec.downloads = downloads.map(({ name, size }) => ({ name, size }));
    if (downloads[0]) {
      const bytes = fs.readFileSync(downloads[0].path);
      rec.pdfMagic = bytes.subarray(0, 5).toString() === "%PDF-";
      const { PDFDocument } = require("pdf-lib");
      try { const pdf = await PDFDocument.load(bytes); rec.pdfPages = pdf.getPageCount(); const pg = pdf.getPage(0); rec.pdfPageSize = `${pg.getWidth().toFixed(1)}x${pg.getHeight().toFixed(1)}pt`; } catch (e) { rec.pdfLoadErr = String(e).slice(0, 100); }
    }
    rec.ok = info.pages > 0 && info.hasPreview && !info.error && !!downloads[0] && rec.pdfMagic === true && rec.pdfPages === info.pages;
    rec.note = downloads[0] ? `pdf ${downloads[0].size}B, ${rec.pdfPages} pages, ${rec.pdfPageSize}` : "no download";
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

async function toHwpx(context, name, file) {
  const rec = { tool: "hwp-to-hwpx", variant: name, ok: false, jsErrors: [], consoleErrors: [] };
  if (file.endsWith(".hwpx")) { rec.skipped = "input already hwpx"; return rec; }
  const page = await newPage(context, rec);
  const downloads = [];
  page.on("download", async (d) => {
    const p = path.join(DL, `${name}__${d.suggestedFilename()}`);
    await d.saveAs(p);
    downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size, path: p });
  });
  try {
    await page.goto(BASE + "hwp-to-hwpx", { waitUntil: "domcontentloaded", timeout: 45000 });
    await upload(page, file);
    rec.convertMs = await waitFor(page, () => /\.hwpx 다운로드/.test(document.querySelector("main")?.innerText || "") || /실패/.test(document.querySelector("main")?.innerText || ""), 240000);
    rec.error = await page.evaluate(() => document.querySelector("main .text-red-600")?.textContent || "");
    const btn = page.getByRole("button", { name: /\.hwpx 다운로드/ });
    if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(3000); }
    rec.downloads = downloads.map(({ name, size }) => ({ name, size }));
    if (downloads[0]) {
      const zip = await JSZip.loadAsync(fs.readFileSync(downloads[0].path));
      const names = Object.keys(zip.files);
      rec.zipEntries = names.length;
      rec.hasHpf = names.some((n) => /content\.hpf$/i.test(n));
      const sec = names.find((n) => /section0\.xml$/i.test(n));
      rec.hasSection = !!sec;
      if (sec) { const xml = await zip.file(sec).async("string"); rec.sectionKo = koCount(xml); rec.sectionBytes = xml.length; }
      rec.hasMime = names.includes("mimetype");
    }
    rec.ok = !!downloads[0] && rec.hasHpf && rec.hasSection && (rec.sectionKo || 0) > 0 && !rec.error;
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

async function editor(context) {
  const rec = { tool: "hwp-editor", variant: "typed", ok: false, jsErrors: [], consoleErrors: [] };
  const page = await newPage(context, rec);
  const downloads = [];
  page.on("download", async (d) => {
    const p = path.join(DL, `editor__${d.suggestedFilename()}`);
    await d.saveAs(p);
    downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size, path: p });
  });
  try {
    await page.goto(BASE + "hwp-editor", { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("main textarea", { timeout: 30000 });
    await page.fill("main textarea", "바로킷 HWPX 생성 검증.\n두 번째 줄입니다. English mixed 123.");
    await page.getByRole("button", { name: /\.hwpx 다운로드/ }).first().click();
    await page.waitForTimeout(4000);
    rec.downloads = downloads.map(({ name, size }) => ({ name, size }));
    if (downloads[0]) {
      const zip = await JSZip.loadAsync(fs.readFileSync(downloads[0].path));
      const names = Object.keys(zip.files);
      rec.hasHpf = names.some((n) => /content\.hpf$/i.test(n));
      const sec = names.find((n) => /section0\.xml$/i.test(n));
      if (sec) { const xml = await zip.file(sec).async("string"); rec.sectionKo = koCount(xml); rec.containsTyped = xml.includes("바로킷 HWPX 생성 검증"); }
    }
    rec.ok = !!downloads[0] && rec.hasHpf && !!rec.containsTyped;
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

async function batch(context, tool = "hwp-to-pdf") {
  const EXT = { "hwp-to-pdf": /\.pdf$/i, "hwp-to-text": /\.txt$/i, "hwp-to-hwpx": /\.hwpx$/i }[tool];
  const rec = { tool, variant: "batch", ok: false, jsErrors: [], consoleErrors: [] };
  const files = variants.filter(([n, p]) => n !== "large-complex" && (tool !== "hwp-to-hwpx" || !p.endsWith(".hwpx"))).slice(0, 3).map(([, p]) => p);
  if (files.length < 2) { rec.skipped = "need 2+ fixtures"; return rec; }
  const page = await newPage(context, rec);
  const downloads = [];
  page.on("download", async (d) => {
    const p = path.join(DL, `batch__${d.suggestedFilename()}`);
    await d.saveAs(p);
    downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size, path: p });
  });
  try {
    await page.goto(BASE + tool, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("input[type=file]", { state: "attached", timeout: 30000 });
    await page.setInputFiles("input[type=file]", files);
    const t0 = now();
    await page.waitForFunction((n) => new RegExp("완료: " + n + " / " + n).test(document.querySelector("main")?.innerText || ""), files.length, { timeout: 300000 });
    rec.ms = now() - t0;
    const zipBtn = page.getByRole("button", { name: /ZIP/ });
    await zipBtn.first().click();
    await page.waitForTimeout(4000);
    rec.downloads = downloads.map(({ name, size }) => ({ name, size }));
    const z = downloads.find((d) => /\.zip$/.test(d.name));
    if (z) {
      const zip = await JSZip.loadAsync(fs.readFileSync(z.path));
      const names = Object.keys(zip.files);
      rec.zipPdfs = names.filter((n) => EXT.test(n)).length;
      const first = names.find((n) => EXT.test(n));
      if (first) {
        const b = await zip.file(first).async("nodebuffer");
        rec.firstMagic = tool === "hwp-to-pdf" ? b.subarray(0, 5).toString() === "%PDF-" : tool === "hwp-to-hwpx" ? b.subarray(0, 2).toString() === "PK" : koCount(b.toString("utf8")) > 0;
      }
    }
    rec.ok = rec.zipPdfs === files.length && rec.firstMagic === true;
    rec.note = `${files.length} files → zip entries=${rec.zipPdfs}`;
  } catch (e) {
    rec.error = String(e?.message || e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return rec;
}

const browser = await chromium.launch();
const context = await browser.newContext({ acceptDownloads: true, locale: "ko-KR", viewport: { width: 1280, height: 1600 } });
const results = [];
for (const [name, file] of variants) {
  for (const fn of [viewer, toText, toPdf, toHwpx]) {
    if (ONLY && !ONLY.has(fn.name)) continue;
    const r = await fn(context, name, file);
    results.push(r);
    console.log(`${r.ok ? "OK  " : r.skipped ? "SKIP" : "FAIL"} ${r.tool.padEnd(12)} ${name.padEnd(14)} ${r.skipped || r.error || ""} ${r.pageCount ? "pages=" + r.pageCount : ""}${r.pages ? "pages=" + r.pages : ""} ${r.chars ? "chars=" + r.chars : ""} ${r.koChars != null ? "ko=" + r.koChars : ""} ${r.renderMs || r.extractMs || r.convertMs ? "ms=" + (r.renderMs || r.extractMs || r.convertMs) : ""}`);
  }
}
if (!ONLY || ONLY.has("editor")) {
  results.push(await editor(context));
  console.log(`${results.at(-1).ok ? "OK  " : "FAIL"} hwp-editor   typed          ${results.at(-1).error || ""}`);
}
if (!ONLY || ONLY.has("batch")) {
  for (const tool of ["hwp-to-pdf", "hwp-to-text", "hwp-to-hwpx"]) {
    results.push(await batch(context, tool));
    console.log(`${results.at(-1).ok ? "OK  " : "FAIL"} ${tool.padEnd(12)} batch(3 files) ${results.at(-1).note || results.at(-1).error || ""}`);
  }
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(results, null, 2));
const bad = results.filter((r) => !r.ok && !r.skipped);
console.log(`\n${results.length - bad.length}/${results.length} passed; ${bad.length} failed → ${OUT}; shots in ${SHOTS}`);
