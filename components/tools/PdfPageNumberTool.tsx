"use client";

import { useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Pos = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
type Fmt = "n" | "n_of_N" | "page_n" | "page_n_of_N";

const FORMATS: Record<Fmt, (n: number, N: number) => string> = {
  n: (n) => `${n}`,
  n_of_N: (n, N) => `${n} / ${N}`,
  page_n: (n) => `p${n}`,
  page_n_of_N: (n, N) => `p${n} / ${N}`,
};

export default function PdfPageNumberTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pos, setPos] = useState<Pos>("bottom-center");
  const [fmt, setFmt] = useState<Fmt>("n_of_N");
  const [start, setStart] = useState(1);
  const [size, setSize] = useState(10);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) {
      setError("PDF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    const bytes = await readBytes(f);
    const src = await PDFDocument.load(bytes);
    setPageCount(src.getPageCount());
  };

  const apply = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const total = doc.getPageCount();
      const margin = 24;
      doc.getPages().forEach((page, idx) => {
        const num = start + idx;
        const label = FORMATS[fmt](num, start + total - 1);
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(label, size);
        let x = margin;
        let y = margin;
        if (pos.endsWith("center")) x = (width - textWidth) / 2;
        else if (pos.endsWith("right")) x = width - textWidth - margin;
        if (pos.startsWith("top")) y = height - margin - size;
        page.drawText(label, { x, y, size, font, color: rgb(0.3, 0.3, 0.3) });
      });
      const out = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), `${baseName}_paged.pdf`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🔢</div>
          <div className="font-medium">PDF 파일을 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{fmtBytes(file.size)} · {pageCount}페이지</div>
        </div>
        <button onClick={() => { setFile(null); setPageCount(0); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div>
        <label className="label">위치</label>
        <div className="grid grid-cols-3 gap-1">
          {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as Pos[]).map((p) => (
            <button key={p} onClick={() => setPos(p)} className={`px-2 py-1.5 text-xs rounded ${pos === p ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
              {p.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <label className="label">형식</label>
          <select value={fmt} onChange={(e) => setFmt(e.target.value as Fmt)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
            <option value="n">1</option>
            <option value="n_of_N">1 / N</option>
            <option value="page_n">p1</option>
            <option value="page_n_of_N">p1 / N</option>
          </select>
        </div>
        <div>
          <label className="label">시작 번호</label>
          <input type="number" value={start} onChange={(e) => setStart(parseInt(e.target.value) || 1)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">글자 크기</label>
          <input type="number" value={size} onChange={(e) => setSize(parseInt(e.target.value) || 10)} className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={apply} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? "적용 중..." : "🔢 페이지 번호 적용 + 다운로드"}
      </button>
    </div>
  );
}
