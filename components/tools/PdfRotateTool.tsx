"use client";

import { useRef, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, parsePageRanges, readBytes } from "@/lib/pdf";

export default function PdfRotateTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [scope, setScope] = useState<"all" | "selected">("all");
  const [pages, setPages] = useState("");
  const [angle, setAngle] = useState(90);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) {
      setError("PDF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    try {
      const bytes = await readBytes(f);
      const src = await PDFDocument.load(bytes);
      setPageCount(src.getPageCount());
    } catch (e) {
      setError("PDF 로드 실패: " + (e as Error).message);
    }
  };

  const rotate = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const doc = await PDFDocument.load(bytes);
      const total = doc.getPageCount();
      const targets =
        scope === "all"
          ? Array.from({ length: total }, (_, i) => i + 1)
          : parsePageRanges(pages, total);

      if (targets.length === 0) {
        setError("회전할 페이지가 없습니다.");
        setBusy(false);
        return;
      }

      for (const p of targets) {
        const page = doc.getPage(p - 1);
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      }

      const out = await doc.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), `${baseName}_rotated.pdf`);
    } catch (e) {
      setError("회전 실패: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🔃</div>
          <div className="font-medium">PDF 파일을 드래그하거나 클릭</div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">
            {fmtBytes(file.size)} · {pageCount}페이지
          </div>
        </div>
        <button onClick={() => { setFile(null); setPageCount(0); }} className="text-sm text-brand-600 hover:underline">
          다른 파일
        </button>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="scope" checked={scope === "all"} onChange={() => setScope("all")} />
          전체 페이지 회전
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="scope" checked={scope === "selected"} onChange={() => setScope("selected")} />
          선택한 페이지만
        </label>
        {scope === "selected" && (
          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="예: 1-3, 5, 7-9"
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900"
          />
        )}
      </div>

      <div>
        <label className="label">회전 각도</label>
        <div className="flex gap-2">
          {[90, 180, 270].map((a) => (
            <button
              key={a}
              onClick={() => setAngle(a)}
              className={`btn ${angle === a ? "btn-primary" : "btn-secondary"}`}
            >
              {a}°
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={rotate} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? "회전 중..." : `🔃 ${angle}° 회전해서 저장`}
      </button>
    </div>
  );
}
