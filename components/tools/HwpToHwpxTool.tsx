"use client";

import { useRef, useState } from "react";
import { openHwp, readFileBytes, isHwpFile } from "@/lib/hwp";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HwpToHwpxTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    const lower = file.name.toLowerCase();
    if (!isHwpFile(file)) {
      setError(".hwp 또는 .hwpx 파일만 지원합니다.");
      return;
    }
    if (lower.endsWith(".hwpx")) {
      setError("이 파일은 이미 HWPX 형식입니다. 변환할 필요가 없습니다.");
      return;
    }
    setError("");
    setLoading(true);
    setFileName(file.name);
    setFileSize(file.size);
    setOutBlob(null);
    try {
      const bytes = await readFileBytes(file);
      const doc = await openHwp(bytes);
      const hwpxBytes = doc.exportHwpx();
      const ab = new ArrayBuffer(hwpxBytes.byteLength);
      new Uint8Array(ab).set(hwpxBytes);
      setOutBlob(new Blob([ab], { type: "application/hwp+zip" }));
      doc.free?.();
    } catch (e) {
      setError("HWPX 변환에 실패했습니다: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!outBlob) return;
    const url = URL.createObjectURL(outBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.hwp$/i, "") + ".hwpx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFileName("");
    setFileSize(0);
    setOutBlob(null);
    setError("");
  };

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
          <div className="text-5xl mb-3">🔄</div>
          <div className="font-medium">.hwp 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">국가 표준 HWPX(KS X 6101) 포맷으로 변환합니다</div>
          <input
            ref={inputRef}
            type="file"
            accept=".hwp"
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
          <div className="truncate font-medium">{fileName}</div>
          <div className="text-xs text-muted">
            {fmt(fileSize)}
            {outBlob && ` → ${fmt(outBlob.size)} (HWPX)`}
          </div>
        </div>
        <button onClick={reset} className="text-sm text-brand-600 hover:underline">
          다른 파일
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted">HWPX로 변환 중...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-600">{error}</div>
      ) : outBlob ? (
        <button onClick={download} className="btn btn-primary">
          ✓ .hwpx 다운로드
        </button>
      ) : null}
    </div>
  );
}
