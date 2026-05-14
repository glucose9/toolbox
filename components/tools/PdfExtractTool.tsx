"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, parsePageRanges, readBytes } from "@/lib/pdf";

export default function PdfExtractTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState("");
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

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const src = await PDFDocument.load(bytes);
      const total = src.getPageCount();
      const targets = parsePageRanges(pages, total);
      if (targets.length === 0) {
        setError("추출할 페이지를 입력하세요.");
        setBusy(false);
        return;
      }
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, targets.map((n) => n - 1));
      copied.forEach((p) => out.addPage(p));
      const result = await out.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadBlob(new Blob([result.buffer as ArrayBuffer], { type: "application/pdf" }), `${baseName}_extract.pdf`);
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
          <div className="text-5xl mb-3">📑</div>
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
        <label className="label">추출할 페이지 (총 {pageCount}페이지 중)</label>
        <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="예: 1-3, 5, 7-9" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy || !pages.trim()} className="btn btn-primary disabled:opacity-50">
        {busy ? "처리 중..." : "📑 선택 페이지만 추출"}
      </button>
    </div>
  );
}
