"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Page = {
  id: string;
  origIndex: number;
  rotation: number;
  thumb: string;
};

export default function PdfReorderTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) {
      setError("PDF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });
      const next: Page[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const c = document.createElement("canvas");
        c.width = Math.ceil(viewport.width);
        c.height = Math.ceil(viewport.height);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: c.getContext("2d")!, viewport, canvas: c } as any).promise;
        next.push({
          id: `${i}-${Math.random().toString(36).slice(2, 6)}`,
          origIndex: i - 1,
          rotation: 0,
          thumb: c.toDataURL("image/png"),
        });
        setProgress({ done: i, total });
      }
      setPages(next);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const remove = (id: string) => setPages((p) => p.filter((x) => x.id !== id));
  const rotate = (id: string) => setPages((p) => p.map((x) => (x.id === id ? { ...x, rotation: (x.rotation + 90) % 360 } : x)));

  const onDragStart = (id: string) => setDragId(id);
  const onDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!dragId || dragId === overId) return;
    setPages((p) => {
      const from = p.findIndex((x) => x.id === dragId);
      const to = p.findIndex((x) => x.id === overId);
      if (from < 0 || to < 0) return p;
      const next = [...p];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };
  const onDragEnd = () => setDragId(null);

  const save = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const src = await PDFDocument.load(bytes);
      const out = await PDFDocument.create();
      const indexes = pages.map((p) => p.origIndex);
      const copied = await out.copyPages(src, indexes);
      copied.forEach((p, i) => {
        const rot = pages[i].rotation;
        if (rot > 0) {
          const cur = p.getRotation().angle;
          p.setRotation(degrees((cur + rot) % 360));
        }
        out.addPage(p);
      });
      const result = await out.save();
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadBlob(new Blob([result.buffer as ArrayBuffer], { type: "application/pdf" }), `${baseName}_reordered.pdf`);
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
          <div className="text-5xl mb-3">🔀</div>
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
          <div className="text-xs text-muted">{fmtBytes(file.size)} · {pages.length}페이지</div>
        </div>
        <button onClick={() => { setFile(null); setPages([]); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      {busy ? (
        <div className="py-4 text-center text-muted text-sm">렌더링 중... ({progress.done} / {progress.total})</div>
      ) : null}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {pages.map((p, i) => (
          <div
            key={p.id}
            draggable
            onDragStart={() => onDragStart(p.id)}
            onDragOver={(e) => onDragOver(e, p.id)}
            onDragEnd={onDragEnd}
            className={`border border-gray-200 dark:border-gray-700 rounded p-1.5 bg-white dark:bg-gray-900 cursor-move ${dragId === p.id ? "opacity-50" : ""}`}
          >
            <div className="relative">
              <img src={p.thumb} alt="" style={{ transform: `rotate(${p.rotation}deg)` }} className="w-full transition-transform" />
              <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1 rounded">{i + 1}</div>
            </div>
            <div className="flex gap-1 mt-1 text-xs">
              <button onClick={() => rotate(p.id)} className="flex-1 text-brand-600 hover:underline">🔃</button>
              <button onClick={() => remove(p.id)} className="flex-1 text-red-600 hover:underline">×</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted">드래그해서 순서 변경 · 🔃 회전 · × 삭제</div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={save} disabled={busy || pages.length === 0} className="btn btn-primary disabled:opacity-50">
        💾 정렬된 PDF 저장
      </button>
    </div>
  );
}
