"use client";

import { useRef, useState } from "react";
import { downloadText } from "@/lib/markdown-io";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DocxViewerTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!/\.docx$/i.test(f.name)) {
      setError(".docx 파일만 지원합니다 (.doc은 미지원).");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    setHtml("");
    setText("");
    try {
      const mammoth = await import("mammoth/mammoth.browser.js");
      const buf = await f.arrayBuffer();
      const htmlRes = await mammoth.convertToHtml({ arrayBuffer: buf });
      const textRes = await mammoth.extractRawText({ arrayBuffer: buf });
      setHtml(htmlRes.value);
      setText(textRes.value);
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
          <div className="text-5xl mb-3">📃</div>
          <div className="font-medium">.docx 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">워드 없이 브라우저에서 바로 보기</div>
          <input ref={inputRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
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
          <div className="text-xs text-muted">{fmt(file.size)}{text && ` · ${text.length.toLocaleString()}자`}</div>
        </div>
        <button onClick={() => { setFile(null); setHtml(""); setText(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      {busy ? (
        <div className="py-8 text-center text-muted">변환 중...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <>
          <div
            className="w-full max-h-[60vh] overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 prose-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => downloadText(text, file.name.replace(/\.docx$/i, "") + ".txt", "text/plain;charset=utf-8")} className="btn btn-primary">📥 텍스트(.txt) 추출</button>
            <button onClick={() => downloadText(html, file.name.replace(/\.docx$/i, "") + ".html", "text/html;charset=utf-8")} className="btn btn-secondary">HTML로 저장</button>
          </div>
        </>
      )}
    </div>
  );
}
