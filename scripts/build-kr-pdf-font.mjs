// Fetches public/fonts/NanumGothic-pdf.ttf — the Korean font used to embed
// selectable text into generated PDFs (see lib/pdf-font.ts).
//
// The font ships FULL (≈2MB, lazy-loaded and cached only when a text PDF is
// generated); pdf-lib subsets it at generation time so the final PDF carries
// only the glyphs actually used.
//
// It must stay a genuine TrueType (glyf) font: pdf-lib subsets via fontkit,
// whose CFF subsetter corrupts subroutinized charstrings (Noto CJK OTF came
// out with mangled glyphs), and fontkit cannot even parse harfbuzz-resubset
// output ("Trying to access beyond buffer length") — so no pre-subsetting.
//
// Coverage (what lib/pdf-font.ts's allowlist regex may permit): NanumGothic
// carries ASCII/Latin-1, common punctuation, ₩, compat jamo, all 11,172
// Hangul syllables and fullwidth forms. Rare hanja/emoji are NOT covered —
// tools must fall back to the raster path for those.
//
// Run: node scripts/build-kr-pdf-font.mjs   (only to refresh the font)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/nanumgothic/NanumGothic-Regular.ttf";
console.log("source:", SRC);
const ttf = Buffer.from(await (await fetch(SRC)).arrayBuffer());
if (ttf.length < 1024 * 1024) throw new Error("source font suspiciously small");
if (ttf.readUInt32BE(0) !== 0x00010000) throw new Error("not a TrueType (glyf) font");
const dest = path.join(ROOT, "public", "fonts", "NanumGothic-pdf.ttf");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, ttf);
console.log("wrote", dest, (ttf.length / 1024).toFixed(0), "KB");
