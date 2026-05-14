"use client";

import { useRef, useState } from "react";

export default function QrDecoderTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFile = async (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 지원합니다.");
      return;
    }
    setError("");
    setResult("");
    setFile(f);
    setBusy(true);
    if (preview) URL.revokeObjectURL(preview);
    const url = URL.createObjectURL(f);
    setPreview(url);
    try {
      const jsQR = (await import("jsqr")).default;
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error("이미지 로드 실패"));
        i.src = url;
      });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height);
      const code = jsQR(data.data, data.width, data.height);
      if (code) setResult(code.data);
      else setError("QR 코드를 인식하지 못했어요. 더 크고 선명한 이미지로 시도해보세요.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isUrl = /^https?:\/\//i.test(result);
  const isWifi = result.startsWith("WIFI:");

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">🔍</div>
          <div className="font-medium">QR 코드 이미지를 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm truncate font-medium">{file.name}</div>
        <button onClick={() => { setFile(null); setResult(""); setError(""); if (preview) URL.revokeObjectURL(preview); setPreview(""); }} className="text-sm text-brand-600 hover:underline">다른 파일</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {preview && <img src={preview} alt="" className="max-w-full max-h-64 rounded border border-gray-200 dark:border-gray-700 mx-auto" />}
        <div>
          <label className="label">인식 결과</label>
          {busy ? (
            <div className="text-sm text-muted">스캔 중...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : result ? (
            <>
              <textarea readOnly value={result} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y break-all" />
              <div className="flex gap-2 mt-2">
                <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
                {isUrl && <a href={result} target="_blank" rel="noreferrer" className="btn btn-secondary">🔗 열기</a>}
              </div>
              {isWifi && <div className="text-xs text-muted mt-2">와이파이 QR — 네트워크 정보가 인식되었습니다.</div>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
