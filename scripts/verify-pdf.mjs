import { readFileSync, writeFileSync, statSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PDFDocument, degrees } from "pdf-lib";

const src = process.argv[2];
if (!src) {
  console.error("usage: node verify-pdf.mjs <path.pdf>");
  process.exit(2);
}

const outDir = join(tmpdir(), "toolbox-pdf-verify");
mkdirSync(outDir, { recursive: true });

const bytes = readFileSync(src);
console.log(`source: ${src}  bytes: ${bytes.length}`);

// 1. Load + page count (pdf-merge, pdf-split, pdf-rotate, pdf-delete-pages all start here)
const doc = await PDFDocument.load(bytes);
const total = doc.getPageCount();
console.log(`pageCount: ${total}`);

// 2. Merge (this PDF + itself)
{
  const out = await PDFDocument.create();
  for (const _ of [0, 1]) {
    const src2 = await PDFDocument.load(bytes);
    const pages = await out.copyPages(src2, src2.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const merged = await out.save();
  const dst = join(outDir, "merged.pdf");
  writeFileSync(dst, merged);
  console.log(`merge: ${total} + ${total} = ${(await PDFDocument.load(merged)).getPageCount()}  ${statSync(dst).size} bytes`);
}

// 3. Split: first page only
{
  const out = await PDFDocument.create();
  const src2 = await PDFDocument.load(bytes);
  const [p] = await out.copyPages(src2, [0]);
  out.addPage(p);
  const result = await out.save();
  const dst = join(outDir, "split-p1.pdf");
  writeFileSync(dst, result);
  console.log(`split p1: ${(await PDFDocument.load(result)).getPageCount()} page  ${statSync(dst).size} bytes`);
}

// 4. Rotate page 1 by 90 degrees
{
  const src2 = await PDFDocument.load(bytes);
  const page = src2.getPage(0);
  const before = page.getRotation().angle;
  page.setRotation(degrees((before + 90) % 360));
  const after = src2.getPage(0).getRotation().angle;
  const result = await src2.save();
  const dst = join(outDir, "rotated.pdf");
  writeFileSync(dst, result);
  console.log(`rotate: ${before}° -> ${after}°  ${statSync(dst).size} bytes`);
}

// 5. Delete page 1 (if total > 1)
if (total > 1) {
  const out = await PDFDocument.create();
  const src2 = await PDFDocument.load(bytes);
  const keep = Array.from({ length: total - 1 }, (_, i) => i + 1);
  const pages = await out.copyPages(src2, keep);
  pages.forEach((p) => out.addPage(p));
  const result = await out.save();
  const dst = join(outDir, "no-p1.pdf");
  writeFileSync(dst, result);
  console.log(`delete p1: ${total} -> ${(await PDFDocument.load(result)).getPageCount()} pages  ${statSync(dst).size} bytes`);
} else {
  console.log(`delete p1: skipped (single-page PDF)`);
}

// 6. Embed PDF page + create image-to-pdf-like flow: embed an existing PDF page as image is not direct,
//    so simulate images-to-pdf by creating a fresh PDF with a synthetic 1x1 PNG.
{
  const out = await PDFDocument.create();
  // 1x1 transparent PNG bytes
  const pngBytes = Uint8Array.from([
    0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0x00,0x00,0x00,0x0d,0x49,0x48,0x44,0x52,
    0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x01,0x08,0x06,0x00,0x00,0x00,0x1f,0x15,0xc4,
    0x89,0x00,0x00,0x00,0x0a,0x49,0x44,0x41,0x54,0x78,0x9c,0x63,0x00,0x01,0x00,0x00,
    0x05,0x00,0x01,0x0d,0x0a,0x2d,0xb4,0x00,0x00,0x00,0x00,0x49,0x45,0x4e,0x44,0xae,
    0x42,0x60,0x82
  ]);
  const png = await out.embedPng(pngBytes);
  const page = out.addPage([200, 200]);
  page.drawImage(png, { x: 50, y: 50, width: 100, height: 100 });
  const result = await out.save();
  const dst = join(outDir, "image-to-pdf.pdf");
  writeFileSync(dst, result);
  console.log(`images-to-pdf: ${(await PDFDocument.load(result)).getPageCount()} page  ${statSync(dst).size} bytes`);
}

// 7. PDF -> images: needs pdfjs-dist + a canvas polyfill in node. Test that the worker loads.
{
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const loadingTask = pdfjs.getDocument({ data: new Uint8Array(bytes), useWorker: false, disableWorker: true });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    console.log(`pdfjs load + page1 viewport: ${Math.round(viewport.width)}x${Math.round(viewport.height)} pt`);
    // Skip render (needs canvas) — browser path is what users actually hit.
  } catch (e) {
    console.log(`pdfjs check failed (expected in pure node): ${e.message.slice(0, 120)}`);
  }
}

console.log(`\nartifacts in: ${outDir}`);
