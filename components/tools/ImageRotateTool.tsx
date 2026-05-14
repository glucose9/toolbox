"use client";

import { useEffect, useRef, useState } from "react";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageRotateTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<HTMLImageElement | null>(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [outUrl, setOutUrl] = useState("");
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
    setAngle(0);
    setFlipH(false);
    setFlipV(false);
    const img = new Image();
    img.onload = () => setSrc(img);
    img.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!src || !file) return;
    const a = ((angle % 360) + 360) % 360;
    const isQuarter = a === 90 || a === 270;
    const w = isQuarter ? src.naturalHeight : src.naturalWidth;
    const h = isQuarter ? src.naturalWidth : src.naturalHeight;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.translate(w / 2, h / 2);
    ctx.rotate((a * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(src, -src.naturalWidth / 2, -src.naturalHeight / 2);
    const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
    c.toBlob(
      (blob) => {
        if (!blob) return;
        setOutBlob(blob);
        if (outUrl) URL.revokeObjectURL(outUrl);
        setOutUrl(URL.createObjectURL(blob));
      },
      mime,
      0.92
    );
  }, [src, angle, flipH, flipV, file]);

  const download = () => {
    if (!outBlob || !file) return;
    const ext = file.type === "image/png" ? "png" : "jpg";
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = file.name.replace(/\.[^.]+$/, "") + `_rotated.${ext}`;
    a.click();
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
          <div className="text-5xl mb-3">🔄</div>
          <div className="font-medium">이미지를 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setSrc(null); setOutBlob(null); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>회전</span>
        <button onClick={() => setAngle((a) => a - 90)} className="btn btn-secondary">← 90°</button>
        <span className="font-mono w-12 text-center">{((angle % 360) + 360) % 360}°</span>
        <button onClick={() => setAngle((a) => a + 90)} className="btn btn-secondary">90° →</button>
        <button onClick={() => setAngle((a) => a + 180)} className="btn btn-secondary">180°</button>
        <button onClick={() => setFlipH((v) => !v)} className={`btn ${flipH ? "btn-primary" : "btn-secondary"}`}>좌우반전</button>
        <button onClick={() => setFlipV((v) => !v)} className={`btn ${flipV ? "btn-primary" : "btn-secondary"}`}>상하반전</button>
      </div>

      {outUrl && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded p-3">
          <img src={outUrl} alt="" className="max-w-full max-h-96 mx-auto" />
        </div>
      )}
      {outBlob && <div className="text-xs text-muted">결과 크기: {fmt(outBlob.size)}</div>}

      <button onClick={download} disabled={!outBlob} className="btn btn-primary disabled:opacity-50">📥 다운로드</button>
    </div>
  );
}
