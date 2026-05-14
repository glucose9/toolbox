"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Item = { id: string; file: File };

export default function PdfMergeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const addFiles = (list: FileList) => {
    const next: Item[] = [];
    for (const f of Array.from(list)) {
      if (isPdfFile(f)) {
        next.push({ id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`, file: f });
      }
    }
    if (!next.length) setError("PDF 파일을 선택해주세요.");
    else setError("");
    setItems((prev) => [...prev, ...next]);
  };

  const move = (id: string, dir: -1 | 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  const merge = async () => {
    if (items.length < 2) {
      setError("PDF를 2개 이상 업로드하세요.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const out = await PDFDocument.create();
      for (const it of items) {
        const bytes = await readBytes(it.file);
        const src = await PDFDocument.load(bytes);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const merged = await out.save();
      downloadBlob(new Blob([merged.buffer as ArrayBuffer], { type: "application/pdf" }), `merged-${Date.now()}.pdf`);
    } catch (e) {
      setError("병합 실패: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📎</div>
          <div className="font-medium">PDF 파일들을 드래그하거나 클릭 (여러 개 가능)</div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={(e) => e.target.files && addFiles(e.target.files)}
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
        <div className="text-sm text-muted">{items.length}개 파일</div>
        <button onClick={() => inputRef.current?.click()} className="text-sm text-brand-600 hover:underline">
          + 파일 추가
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="hidden"
        />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((it, i) => (
          <div key={it.id} className="flex items-center gap-3 p-2.5">
            <div className="text-sm tabular-nums text-muted w-6 text-center">{i + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{it.file.name}</div>
              <div className="text-xs text-muted">{fmtBytes(it.file.size)}</div>
            </div>
            <button
              onClick={() => move(it.id, -1)}
              disabled={i === 0}
              className="text-gray-500 hover:text-brand-600 disabled:opacity-30 px-1"
              aria-label="위로"
            >
              ▲
            </button>
            <button
              onClick={() => move(it.id, 1)}
              disabled={i === items.length - 1}
              className="text-gray-500 hover:text-brand-600 disabled:opacity-30 px-1"
              aria-label="아래로"
            >
              ▼
            </button>
            <button onClick={() => remove(it.id)} className="text-gray-400 hover:text-red-600 text-lg leading-none px-1">
              ×
            </button>
          </div>
        ))}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button onClick={merge} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? "병합 중..." : `📎 ${items.length}개 PDF 병합`}
        </button>
        <button onClick={() => setItems([])} className="btn btn-secondary">
          전체 삭제
        </button>
      </div>
    </div>
  );
}
