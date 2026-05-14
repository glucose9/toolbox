"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";

function fmt(n: number) { return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`; }

export default function ImageZipTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const add = (list: FileList) => {
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles((p) => [...p, ...imgs]);
  };

  const remove = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const zipAll = async () => {
    if (files.length === 0) return;
    setBusy(true);
    try {
      const zip = new JSZip();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        zip.file(f.name, buf);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `images-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setBusy(false);
    }
  };

  const total = files.reduce((s, f) => s + f.size, 0);

  return (
    <div className="card space-y-3">
      <div onClick={() => inputRef.current?.click()} onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-500">
        <div className="text-3xl mb-2">🗜️</div>
        <div className="text-sm">이미지 추가 (여러 장)</div>
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => e.target.files && add(e.target.files)} className="hidden" />
      </div>
      {files.length > 0 && (
        <>
          <div className="text-sm text-muted">{files.length}장 · 총 {fmt(total)}</div>
          <div className="max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 p-2 text-sm">
                <img src={URL.createObjectURL(f)} alt="" className="w-8 h-8 object-cover rounded" />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="text-xs text-muted">{fmt(f.size)}</span>
                <button onClick={() => remove(i)} className="text-red-600">×</button>
              </div>
            ))}
          </div>
          <button onClick={zipAll} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "압축 중..." : "📦 ZIP 다운로드"}</button>
        </>
      )}
    </div>
  );
}
