"use client";

import { useRef, useState } from "react";

export default function Base64ImageTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 지원합니다.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result || ""));
    reader.readAsDataURL(f);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(dataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sizeKb = dataUrl ? Math.round(dataUrl.length / 1024) : 0;
  const valid = dataUrl.startsWith("data:image/");

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">이미지 업로드</label>
          <div
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors h-44 flex flex-col items-center justify-center"
          >
            <div className="text-3xl">🖻</div>
            <div className="text-sm mt-2">이미지 드래그/클릭</div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>
        <div>
          <label className="label">미리보기</label>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg h-44 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            {valid ? (
              <img src={dataUrl} alt="" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-xs text-muted">data URL을 붙여넣거나 이미지를 업로드하세요</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="label">Base64 data URL {dataUrl && `(${sizeKb} KB)`}</label>
        <textarea
          value={dataUrl}
          onChange={(e) => {
            setDataUrl(e.target.value);
            setError("");
          }}
          placeholder="data:image/png;base64,iVBORw0..."
          className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs resize-y font-mono break-all"
        />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!dataUrl} className="btn btn-primary disabled:opacity-50">
        {copied ? "✓ 복사됨" : "data URL 복사"}
      </button>
    </div>
  );
}
