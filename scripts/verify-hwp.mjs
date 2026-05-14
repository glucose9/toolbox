import { readFileSync, writeFileSync } from "node:fs";
import init, { HwpDocument } from "@rhwp/core";

const wasmPath = new URL("../node_modules/@rhwp/core/rhwp_bg.wasm", import.meta.url);
const wasmBytes = readFileSync(wasmPath);
await init({ module_or_path: wasmBytes });

globalThis.measureTextWidth = (font, text) => {
  const m = font.match(/(\d+(?:\.\d+)?)px/);
  const px = m ? parseFloat(m[1]) : 12;
  return text.length * px * 0.55;
};

const hwpPath = process.argv[2];
if (!hwpPath) {
  console.error("usage: node verify-hwp.mjs <path.hwp>");
  process.exit(2);
}

const bytes = readFileSync(hwpPath);
console.log(`file: ${hwpPath}  bytes: ${bytes.length}`);

const doc = new HwpDocument(new Uint8Array(bytes));
const sections = doc.getSectionCount();
console.log(`sections: ${sections}`);

let totalParas = 0;
let totalChars = 0;
const collected = [];
for (let s = 0; s < sections; s++) {
  const paras = doc.getParagraphCount(s);
  totalParas += paras;
  for (let p = 0; p < paras; p++) {
    const len = doc.getParagraphLength(s, p);
    totalChars += len;
    if (len > 0) {
      const t = doc.getTextRange(s, p, 0, len);
      collected.push(t);
    } else {
      collected.push("");
    }
  }
}
console.log(`paragraphs: ${totalParas}  total chars: ${totalChars}`);

let pages = 0;
try {
  pages = doc.pageCount();
} catch (e) {
  console.log(`pageCount failed: ${e.message}`);
}
console.log(`pages: ${pages}`);

let svgLen = 0;
try {
  const svg = doc.renderPageSvg(0);
  svgLen = svg.length;
} catch (e) {
  console.log(`renderPageSvg failed: ${e.message}`);
}
console.log(`page0 svg length: ${svgLen}`);

try {
  const hwpx = doc.exportHwpx();
  const out = hwpPath.replace(/\.hwp$/i, "") + ".verified.hwpx";
  writeFileSync(out, Buffer.from(hwpx));
  console.log(`hwpx exported: ${out}  bytes: ${hwpx.length}`);
} catch (e) {
  console.log(`exportHwpx failed: ${e.message}`);
}

const text = collected.join("\n").replace(/\n{3,}/g, "\n\n").trim();
const preview = text.slice(0, 300).replace(/\n/g, " | ");
console.log(`\ntext preview (first 300 chars):\n${preview}`);
console.log(`\ntotal text length: ${text.length}`);
