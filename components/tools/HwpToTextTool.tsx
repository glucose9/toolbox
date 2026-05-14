"use client";

import { useRef, useState } from "react";
import { openHwp, readFileBytes, isHwpFile, extractAllText } from "@/lib/hwp";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HwpToTextTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File) => {
    if (!isHwpFile(file)) {
      setError(".hwp 또는 .hwpx 파일만 지원합니다.");
      return;
    }
    setError("");
    setLoading(true);
    setFileName(file.name);
    setFileSize(file.size);
    setText("");
    try {
      const bytes = await readFileBytes(file);
      const doc = await openHwp(bytes);
      const extracted = extractAllText(doc);
      setText(extracted);
      doc.free?.();
    } catch (e) {
      setError("텍스트 추출에 실패했습니다: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.(hwp|hwpx)$/i, "") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFileName("");
    setFileSize(0);
    setText("");
    setError("");
  };

  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, "").length;

  if (!fileName) {
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
          <div className="text-5xl mb-3">📝</div>
          <div className="font-medium">.hwp / .hwpx 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">본문 텍스트만 자동 추출됩니다</div>
          <input
            ref={inputRef}
            type="file"
            accept=".hwp,.hwpx"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{fileName}</div>
          <div className="text-xs text-muted">
            {fmt(fileSize)}
            {text && ` · ${charCount.toLocaleString()}자 (공백 제외 ${charCountNoSpace.toLocaleString()}자)`}
          </div>
        </div>
        <button onClick={reset} className="text-sm text-brand-600 hover:underline">
          다른 파일
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted">텍스트 추출 중...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-600">{error}</div>
      ) : (
        <>
          <textarea
            value={text}
            readOnly
            className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded font-mono text-sm bg-gray-50 dark:bg-gray-900 resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="btn btn-primary">
              {copied ? "✓ 복사됨" : "전체 복사"}
            </button>
            <button onClick={download} className="btn btn-secondary">
              .txt로 다운로드
            </button>
          </div>
        </>
      )}
    </div>
  );
}
