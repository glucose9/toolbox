"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

const MM_TO_PT = 2.83465;

export default function PdfCropTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) return;
    setFile(f);
    const src = await PDFDocument.load(await readBytes(f));
    setPageCount(src.getPageCount());
  };

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      const t = top * MM_TO_PT, b = bottom * MM_TO_PT, l = left * MM_TO_PT, r = right * MM_TO_PT;
      for (const page of src.getPages()) {
        const { width, height } = page.getSize();
        page.setCropBox(l, b, width - l - r, height - t - b);
      }
      const out = await src.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "_cropped.pdf");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) {
    return (
      <div className="card">
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">✂️</div>
          <div className="font-medium mt-2">PDF 업로드</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="text-sm"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmtBytes(file.size)} · {pageCount}페이지</div></div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>상단 잘라낼 mm<input type="number" min="0" value={top} onChange={(e) => setTop(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>하단 mm<input type="number" min="0" value={bottom} onChange={(e) => setBottom(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>좌측 mm<input type="number" min="0" value={left} onChange={(e) => setLeft(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>우측 mm<input type="number" min="0" value={right} onChange={(e) => setRight(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "✂️ 자르기"}</button>
        <button onClick={() => setFile(null)} className="btn btn-secondary">다른 파일</button>
      </div>
    </div>
  );
}
