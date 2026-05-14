"use client";

import { useRef, useState } from "react";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";
import { downloadText } from "@/lib/markdown-io";

export default function PdfTextExtractTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [copied, setCopied] = useState(false);

  const extract = async (f: File) => {
    setBusy(true);
    setError("");
    setText("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });
      const parts: string[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((it: any) => ("str" in it ? it.str : ""))
          .join(" ");
        parts.push(pageText);
        setProgress({ done: i, total });
      }
      setText(parts.join("\n\n").replace(/[ \t]+/g, " ").trim());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError("PDF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    extract(f);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
          <div className="text-5xl mb-3">📋</div>
          <div className="font-medium">PDF 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">본문 텍스트만 추출 (스캔본 PDF는 결과 없음)</div>
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
          <div className="text-xs text-muted">
            {fmtBytes(file.size)}
            {text && ` · ${text.length.toLocaleString()}자 추출됨`}
          </div>
        </div>
        <button onClick={() => { setFile(null); setText(""); setProgress({ done: 0, total: 0 }); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      {busy ? (
        <div className="py-8 text-center text-muted">추출 중... ({progress.done} / {progress.total})</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <>
          <textarea
            readOnly
            value={text}
            placeholder="추출된 텍스트가 없습니다. 스캔본 PDF일 수 있습니다."
            className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} disabled={!text} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "전체 복사"}</button>
            <button onClick={() => downloadText(text, file.name.replace(/\.pdf$/i, "") + ".txt", "text/plain;charset=utf-8")} disabled={!text} className="btn btn-secondary disabled:opacity-50">
              .txt 다운로드
            </button>
          </div>
        </>
      )}
    </div>
  );
}
