"use client";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, isPdfFile, readBytes } from "@/lib/pdf";

export default function PdfNUpTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [perPage, setPerPage] = useState<2 | 4 | 6>(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      const out = await PDFDocument.create();
      const pages = src.getPages();
      const total = pages.length;
      const cols = perPage === 2 ? 1 : perPage === 4 ? 2 : 2;
      const rows = perPage === 2 ? 2 : perPage === 4 ? 2 : 3;
      const A4 = [595, 842] as const;
      for (let i = 0; i < total; i += perPage) {
        const page = out.addPage([A4[0], A4[1]]);
        const cellW = A4[0] / cols;
        const cellH = A4[1] / rows;
        for (let j = 0; j < perPage && i + j < total; j++) {
          const srcPage = pages[i + j];
          const { width, height } = srcPage.getSize();
          const embedded = await out.embedPage(srcPage);
          const r = Math.floor(j / cols), col = j % cols;
          const scale = Math.min(cellW / width, cellH / height) * 0.95;
          const w = width * scale, h = height * scale;
          const x = col * cellW + (cellW - w) / 2;
          const y = A4[1] - (r + 1) * cellH + (cellH - h) / 2;
          page.drawPage(embedded, { x, y, width: w, height: h });
        }
      }
      const result = await out.save();
      downloadBlob(new Blob([result.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + `_${perPage}up.pdf`);
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">🧱</div>
        <div className="font-medium mt-2">PDF 업로드</div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && isPdfFile(e.target.files[0]) && setFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="text-sm font-medium truncate">{file.name}</div>
      <div className="flex gap-2">
        {[2, 4, 6].map((n) => (
          <button key={n} onClick={() => setPerPage(n as 2 | 4 | 6)} className={`btn flex-1 ${perPage === n ? "btn-primary" : "btn-secondary"}`}>{n} per page</button>
        ))}
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "🧱 N-up 생성"}</button>
    </div>
  );
}
