"use client";

import { useRef, useState } from "react";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function FileToBase64Tool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setDataUrl(String(reader.result || ""));
    reader.readAsDataURL(f);
  };

  const copy = async () => { await navigator.clipboard.writeText(dataUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const downloadFromUrl = () => {
    if (!dataUrl.startsWith("data:")) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "decoded-file";
    a.click();
  };

  return (
    <div className="card space-y-3">
      {!file ? (
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl mb-3">📂</div>
          <div className="font-medium">파일을 드래그하거나 클릭</div>
          <input ref={inputRef} type="file" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm">
            <div><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmt(file.size)} · Base64: {fmt(dataUrl.length)}</div></div>
            <button onClick={() => { setFile(null); setDataUrl(""); }} className="text-brand-600 hover:underline">다른 파일</button>
          </div>
        </>
      )}
      <label className="label">Base64 data URL</label>
      <textarea value={dataUrl} onChange={(e) => setDataUrl(e.target.value)} placeholder="data:application/octet-stream;base64,..." className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y break-all" />
      <div className="flex gap-2">
        <button onClick={copy} disabled={!dataUrl} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
        <button onClick={downloadFromUrl} disabled={!dataUrl.startsWith("data:")} className="btn btn-secondary disabled:opacity-50">data URL → 파일</button>
      </div>
    </div>
  );
}
