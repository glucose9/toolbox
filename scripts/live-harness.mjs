// barokit full-tool live-run harness.
// Loads every tool page on production, exercises its primary flow (file upload
// via accept-matched fixture, primary-button clicks), and classifies:
//   FAIL(js-error | hang | ui-error)  /  SUSPECT(no-output | no-fixture | red-text)  /  OK
// usage: node scripts/live-harness.mjs <slugsFile|all> <outFile> [concurrency] [settleMs]
//   slugsFile: newline-separated slugs, or "all" to run every slug in lib/tools.ts
//   requires: npm i -D playwright && npx playwright install chromium
// Known benign flags: clipboard js-errors under headless (no permission),
// "hang" on pages whose CONTENT matches the busy regex (http-status, mime-types),
// red-text from delete buttons / negative amounts / diff highlighting.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const { chromium } = require("playwright");

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FIX = process.env.HARNESS_FIXTURES || path.join(ROOT, "scripts", "fixtures");
const DL_DIR = process.env.HARNESS_DL || path.join(ROOT, ".harness-downloads");
fs.mkdirSync(DL_DIR, { recursive: true });

const [slugsFile, outFile, concArg, timeoutArg] = process.argv.slice(2);
const slugs =
  slugsFile === "all"
    ? [...fs.readFileSync(path.join(ROOT, "lib", "tools.ts"), "utf8").matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1])
    : fs.readFileSync(slugsFile, "utf8").split(/\r?\n/).filter(Boolean);
const CONC = Number(concArg || 5);
const SETTLE_MS = Number(timeoutArg || 20000);

const BASE = "https://barokit.com/tools/";

// fixture chosen by accept attribute (first match wins)
const ACCEPT_MAP = [
  // No hwp fixture in the repo (needs a real HWP file — drop one into
  // scripts/fixtures as sample.hwp to enable, it is gitignored).
  [/hwpx|hwp/, fs.existsSync(path.join(process.env.HARNESS_FIXTURES || "scripts/fixtures", "sample.hwp")) ? ["sample.hwp"] : null],
  [/pdf/, ["test.pdf", "test-b.pdf"]],
  [/docx|wordprocessingml/, ["test.docx"]],
  [/xlsx|spreadsheetml|\.xls|csv/, ["test.xlsx"]],
  [/pptx|presentationml/, ["test.pptx"]],
  [/markdown|\.md/, ["test.md"]],
  [/text\/plain|\.txt/, ["test.txt"]],
  [/html/, ["test.html"]],
  [/json/, ["test.json"]],
  [/svg/, ["test.svg"]],
  [/heic|heif/, null], // no fixture available
  [/webp/, ["test.webp"]],
  [/gif/, ["test.gif"]],
  [/jpe?g/, ["test.jpg", "test.png"]],
  [/png|image/, ["test.png", "test.jpg"]],
  [/video|mp4|mov|webm/, ["test.mp4"]],
  [/audio|mp3|wav|m4a|ogg/, ["test.wav"]],
  [/zip/, ["test.zip"]],
  [/font|ttf|otf|woff/, null],
];
function pickFixtures(accept, multiple) {
  const a = (accept || "").toLowerCase();
  if (!a) return ["test.png"];
  for (const [re, files] of ACCEPT_MAP) {
    if (re.test(a)) {
      if (!files) return null;
      return multiple ? files : [files[0]];
    }
  }
  return ["test.png"];
}

const BUSY_RE = /(로딩 중|변환 중|생성 중|처리 중|추출 중|압축 중|렌더링 중|다운로드 중|분석 중|불러오는 중|loading|converting|processing)/i;
const CLICK_RE = /(변환|생성|만들|다운로드|추출|실행|합치|병합|압축|분할|시작|적용|계산|짧게|미리보기|암호화|복호화|재생)/;
const AVOID_RE = /(인쇄|프린트|다른 파일|전체 삭제|삭제|초기화|샘플|중지|취소|녹음|카메라|공유|즐겨찾기)/;
const NOISE_RE = /(Vercel Web Analytics|Setting up fake worker|_vercel\/insights|Download the React DevTools|hydrat)/i;
// slugs whose success can't be judged generically → don't SUSPECT them on no-output
const MEDIA = new Set(["gif-to-mp4","video-to-gif","video-to-mp3","video-compress","video-trim","video-editor","video-merge","video-mute","video-resize","video-rotate","video-speed","video-thumbnail","video-info","audio-merge","audio-trim","audio-volume","hwp-to-pdf","hwp-viewer","hwp-to-text","hwp-to-hwpx","hwp-editor"]);

async function runTool(context, slug) {
  const page = await context.newPage();
  const rec = { slug, verdict: "OK", reasons: [], jsErrors: [], consoleErrors: [], downloads: [], blobs: 0, clicked: [], uploaded: null, busyAtEnd: false, redText: "", notes: [] };
  const downloads = [];
  page.on("download", async (d) => {
    try {
      const p = path.join(DL_DIR, `${slug}__${d.suggestedFilename()}`);
      await d.saveAs(p);
      downloads.push({ name: d.suggestedFilename(), size: fs.statSync(p).size });
    } catch (e) { downloads.push({ name: "save-failed", err: String(e).slice(0, 80) }); }
  });
  page.on("pageerror", (e) => { const m = String(e && e.message || e); if (!NOISE_RE.test(m)) rec.jsErrors.push(m.slice(0, 200)); });
  page.on("console", (msg) => { if (msg.type() === "error") { const t = msg.text(); if (!NOISE_RE.test(t)) rec.consoleErrors.push(t.slice(0, 200)); } });

  try {
    await page.addInitScript(() => {
      window.print = () => {};
      window.alert = () => {};
      window.confirm = () => true;
      window.prompt = () => "";
      window.__blobs = 0;
      const co = URL.createObjectURL.bind(URL);
      URL.createObjectURL = (b) => { try { if (b && b.type && !/javascript|wasm/.test(b.type)) window.__blobs++; } catch {} return co(b); };
      window.__rejs = [];
      window.addEventListener("unhandledrejection", (e) => window.__rejs.push(String(e.reason && e.reason.message || e.reason).slice(0, 200)));
    });
    await page.goto(BASE + slug, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);

    // upload if there is a file input
    const inputInfo = await page.evaluate(() => {
      const i = document.querySelector('input[type=file]');
      return i ? { accept: i.accept || "", multiple: i.multiple } : null;
    });
    if (inputInfo) {
      const fixtures = pickFixtures(inputInfo.accept, inputInfo.multiple);
      if (!fixtures) {
        rec.verdict = "SUSPECT"; rec.reasons.push("no-fixture:" + inputInfo.accept);
        await page.close(); rec.downloads = downloads; return rec;
      }
      const files = fixtures.map((f) => path.join(FIX, f));
      await page.setInputFiles('input[type=file]', files).catch((e) => rec.notes.push("upload-fail:" + String(e).slice(0, 100)));
      rec.uploaded = fixtures.join(",");
      await page.waitForTimeout(3000);
    }

    // click primary-looking buttons (up to 3 rounds)
    for (let round = 0; round < 3; round++) {
      const clicked = await page.evaluate(({ CLICK, AVOID }) => {
        const seen = window.__clickedTexts = window.__clickedTexts || [];
        const btns = [...document.querySelectorAll("main button, article button, .card button")];
        const cand = btns.find((b) => {
          const t = (b.textContent || "").trim();
          if (!t || b.disabled) return false;
          if (new RegExp(AVOID).test(t)) return false;
          if (seen.includes(t)) return false;
          return new RegExp(CLICK).test(t) || b.className.includes("btn-primary");
        });
        if (cand) {
          const t = (cand.textContent || "").trim().slice(0, 30);
          seen.push(t);
          cand.click();
          return t;
        }
        return null;
      }, { CLICK: CLICK_RE.source, AVOID: AVOID_RE.source }).catch(() => null);
      if (!clicked) break;
      rec.clicked.push(clicked);
      await page.waitForTimeout(2500);
      // stop clicking if busy started — let it settle first
      const busyNow = await page.evaluate((re) => new RegExp(re, "i").test(document.body.innerText), BUSY_RE.source).catch(() => false);
      if (busyNow) break;
    }

    // settle: wait for busy to clear (up to SETTLE_MS, media get x6)
    const budget = MEDIA.has(slug) ? SETTLE_MS * 6 : SETTLE_MS;
    const t0 = Date.now();
    let busy = true;
    while (Date.now() - t0 < budget) {
      busy = await page.evaluate((re) => new RegExp(re, "i").test(document.body.innerText), BUSY_RE.source).catch(() => true);
      if (!busy) break;
      await page.waitForTimeout(1500);
    }
    rec.busyAtEnd = busy;
    await page.waitForTimeout(1000);

    // gather end state
    const end = await page.evaluate(() => {
      const reds = [...document.querySelectorAll('[class*="text-red"]')]
        .map((e) => (e.textContent || "").trim())
        .filter((t) => t && !/^[×✕xX*\s|·]+$/.test(t));
      return {
        blobs: window.__blobs || 0,
        rejs: window.__rejs || [],
        red: reds.join(" | ").slice(0, 300),
        hasMedia: !!document.querySelector("main video, main audio, article video, article audio"),
      };
    }).catch(() => ({ blobs: 0, rejs: [], red: "", hasMedia: false }));
    rec.blobs = end.blobs;
    rec.redText = end.red;
    rec.jsErrors.push(...end.rejs.filter((m) => !NOISE_RE.test(m)));

    // classify
    if (rec.jsErrors.length) { rec.verdict = "FAIL"; rec.reasons.push("js-error"); }
    if (rec.busyAtEnd) { rec.verdict = "FAIL"; rec.reasons.push("hang"); }
    if (end.red) { if (rec.verdict === "OK") rec.verdict = "SUSPECT"; rec.reasons.push("red-text"); }
    if (rec.verdict === "OK" && rec.uploaded && !downloads.length && !end.blobs && !end.hasMedia && !MEDIA.has(slug)) {
      // file went in but nothing observable came out
      rec.verdict = "SUSPECT"; rec.reasons.push("no-output");
    }
  } catch (e) {
    rec.verdict = "FAIL";
    rec.reasons.push("harness-error");
    rec.notes.push(String(e && e.message || e).slice(0, 200));
  } finally {
    rec.downloads = downloads;
    await page.close().catch(() => {});
  }
  return rec;
}

const browser = await chromium.launch();
const context = await browser.newContext({ acceptDownloads: true, locale: "ko-KR" });
const results = [];
let idx = 0;
async function worker(id) {
  while (idx < slugs.length) {
    const my = idx++;
    const slug = slugs[my];
    const t0 = Date.now();
    const rec = await runTool(context, slug);
    rec.ms = Date.now() - t0;
    results.push(rec);
    fs.appendFileSync(outFile + ".ndjson", JSON.stringify(rec) + "\n");
    console.log(`[${results.length}/${slugs.length}] ${rec.verdict.padEnd(7)} ${slug} ${rec.reasons.join(",")} (${(rec.ms / 1000).toFixed(0)}s)`);
  }
}
await Promise.all(Array.from({ length: CONC }, (_, i) => worker(i)));
await browser.close();
fs.writeFileSync(outFile, JSON.stringify(results, null, 1));
const counts = results.reduce((a, r) => ((a[r.verdict] = (a[r.verdict] || 0) + 1), a), {});
console.log("DONE", JSON.stringify(counts));
