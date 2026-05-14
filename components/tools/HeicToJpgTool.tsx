"use client";

import { useRef, useState } from "react";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HeicToJpgTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outUrl, setOutUrl] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [quality, setQuality] = useState(0.9);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const convert = async (f: File, q: number) => {
    setBusy(true);
    setError("");
    try {
      // dynamic import to keep heic2any out of initial bundle
      const mod = (await import("heic2any")).default;
      const blob = (await mod({ blob: f, toType: "image/jpeg", quality: q })) as Blob;
      if (outUrl) URL.revokeObjectURL(outUrl);
      setOutUrl(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } catch (e) {
      setError("변환 실패: " + (e as Error).message + " (HEIC 파일이 맞는지 확인)");
    } finally {
      setBusy(false);
    }
  };

  const handleFile = (f: File) => {
    const ok = /\.(heic|heif)$/i.test(f.name) || /heic|heif/.test(f.type);
    if (!ok) {
      setError("HEIC/HEIF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    convert(f, quality);
  };

  const download = () => {
    if (!outUrl || !file) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = file.name.replace(/\.(heic|heif)$/i, "") + ".jpg";
    a.click();
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
          <div className="text-5xl mb-3">📱</div>
          <div className="font-medium">HEIC 파일을 드래그하거나 클릭</div>
          <div className="mt-1 text-sm text-muted">아이폰에서 찍은 .heic / .heif</div>
          <input ref={inputRef} type="file" accept=".heic,.heif,image/heic,image/heif" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
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
            {fmt(file.size)}
            {outSize > 0 && ` → ${fmt(outSize)} (JPG)`}
          </div>
        </div>
        <button onClick={() => { setFile(null); setOutUrl(""); setOutSize(0); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div>
        <label className="label">화질 ({Math.round(quality * 100)}%)</label>
        <input type="range" min="0.4" max="1" step="0.05" value={quality} onChange={(e) => { const q = +e.target.value; setQuality(q); convert(file, q); }} className="w-full" />
      </div>

      {busy ? (
        <div className="py-8 text-center text-muted">변환 중...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : outUrl ? (
        <>
          <img src={outUrl} alt="" className="max-w-full max-h-96 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={download} className="btn btn-primary">📥 JPG 다운로드</button>
        </>
      ) : null}
    </div>
  );
}
