// Generate real-format test files for barokit converter E2E testing.
// Run from C:\Users\gluco\toolbox so node_modules resolves.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(new URL("file:///C:/Users/gluco/toolbox/package.json"));

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const w = (name, buf) => {
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log("WROTE", name, fs.statSync(path.join(OUT, name)).size, "bytes");
};

// ---------- DOCX (docx package) ----------
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell } = require("docx");
const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("바로킷 변환 테스트 문서")] }),
      new Paragraph({ children: [new TextRun("이 문서는 한글 텍스트 변환 검증용입니다. Korean + English mixed content.")] }),
      new Paragraph({ children: [new TextRun({ text: "굵은 텍스트 bold", bold: true }), new TextRun(" 그리고 일반 텍스트.")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Second section 두 번째 섹션")] }),
      new Paragraph({ children: [new TextRun("숫자와 특수문자: 12,345원 / 100% / <태그> & 기호")] }),
      new Table({
        rows: [
          new TableRow({ children: [new TableCell({ children: [new Paragraph("항목")] }), new TableCell({ children: [new Paragraph("값")] })] }),
          new TableRow({ children: [new TableCell({ children: [new Paragraph("가격")] }), new TableCell({ children: [new Paragraph("9,900원")] })] }),
        ],
      }),
    ],
  }],
});
const docxBuf = await Packer.toBuffer(doc);
w("test.docx", docxBuf);

// ---------- XLSX (xlsx package) ----------
const XLSX = require("xlsx");
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([
  ["항목", "수량", "단가", "합계"],
  ["사과", 3, 1500, { f: "B2*C2" }],
  ["바나나", 5, 800, { f: "B3*C3" }],
  ["Total 합계", "", "", { f: "SUM(D2:D3)" }],
]);
XLSX.utils.book_append_sheet(wb, ws, "시트1");
const ws2 = XLSX.utils.aoa_to_sheet([["Second sheet"], ["둘째 시트 데이터", 42]]);
XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");
w("test.xlsx", XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));

// ---------- PPTX (pptxgenjs) ----------
const PptxGenJS = require("pptxgenjs");
const pptx = new PptxGenJS();
const s1 = pptx.addSlide();
s1.addText("바로킷 PPTX 테스트", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 32, bold: true });
s1.addText("첫 번째 슬라이드 본문 텍스트입니다. First slide body.", { x: 0.5, y: 1.8, w: 9, h: 1, fontSize: 18 });
const s2 = pptx.addSlide();
s2.addText("Slide 2 — 두 번째 슬라이드", { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 28 });
s2.addText("• 항목 하나\n• 항목 둘\n• Item three", { x: 0.5, y: 1.8, w: 9, h: 2, fontSize: 16 });
const pptxBuf = await pptx.write("nodebuffer");
w("test.pptx", pptxBuf);

// ---------- PDF (pdf-lib, 2 pages, English — StandardFonts can't embed Korean) ----------
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const pdf = await PDFDocument.create();
const font = await pdf.embedFont(StandardFonts.Helvetica);
const fontB = await pdf.embedFont(StandardFonts.HelveticaBold);
const p1 = pdf.addPage([595, 842]);
p1.drawText("Barokit PDF Test Document", { x: 50, y: 780, size: 24, font: fontB, color: rgb(0.1, 0.1, 0.4) });
p1.drawText("Page 1 of 2. This paragraph exists to verify text extraction,", { x: 50, y: 740, size: 12, font });
p1.drawText("PDF-to-DOCX conversion, and page splitting. Price: $12,345.67", { x: 50, y: 722, size: 12, font });
p1.drawRectangle({ x: 50, y: 600, width: 200, height: 80, color: rgb(0.9, 0.5, 0.2) });
const p2 = pdf.addPage([595, 842]);
p2.drawText("Second Page Heading", { x: 50, y: 780, size: 20, font: fontB });
p2.drawText("Page 2 content line. The quick brown fox jumps over the lazy dog.", { x: 50, y: 740, size: 12, font });
w("test.pdf", Buffer.from(await pdf.save()));

// second small PDF for merge test
const pdfB = await PDFDocument.create();
const fB = await pdfB.embedFont(StandardFonts.TimesRoman);
const pb = pdfB.addPage([595, 842]);
pb.drawText("Merge candidate B — single page", { x: 50, y: 780, size: 18, font: fB });
w("test-b.pdf", Buffer.from(await pdfB.save()));

// ---------- TXT / MD / HTML / CSV ----------
w("test.txt", Buffer.from("바로킷 TXT 변환 테스트\n한글 첫 줄입니다.\nSecond line in English.\n셋째 줄: 숫자 12,345 와 기호 %&<>\n", "utf8"));
w("test.md", Buffer.from("# 마크다운 테스트\n\n**굵게** 그리고 *기울임*.\n\n- 목록 하나\n- List two\n\n| 열1 | 열2 |\n|---|---|\n| 가 | 나 |\n\n```js\nconsole.log('code block');\n```\n", "utf8"));
w("test.html", Buffer.from("<!doctype html><html><head><meta charset='utf-8'><title>HTML 테스트</title></head><body><h1>HTML → PDF 테스트</h1><p>한글 문단입니다. English paragraph too.</p><ul><li>항목 1</li><li>Item 2</li></ul><table border='1'><tr><td>셀A</td><td>셀B</td></tr></table></body></html>", "utf8"));

// ---------- WAV (1.5s stereo 44.1kHz sine 440Hz — pure PCM, no deps) ----------
{
  const sr = 44100, dur = 1.5, ch = 2, n = Math.floor(sr * dur);
  const data = Buffer.alloc(n * ch * 2);
  for (let i = 0; i < n; i++) {
    const v = Math.round(Math.sin((2 * Math.PI * 440 * i) / sr) * 12000 * Math.min(1, (n - i) / 2000));
    for (let c = 0; c < ch; c++) data.writeInt16LE(v, (i * ch + c) * 2);
  }
  const hdr = Buffer.alloc(44);
  hdr.write("RIFF", 0); hdr.writeUInt32LE(36 + data.length, 4); hdr.write("WAVE", 8);
  hdr.write("fmt ", 12); hdr.writeUInt32LE(16, 16); hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(ch, 22);
  hdr.writeUInt32LE(sr, 24); hdr.writeUInt32LE(sr * ch * 2, 28); hdr.writeUInt16LE(ch * 2, 32); hdr.writeUInt16LE(16, 34);
  hdr.write("data", 36); hdr.writeUInt32LE(data.length, 40);
  w("test.wav", Buffer.concat([hdr, data]));
}
console.log("DONE");
