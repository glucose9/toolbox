"use client";
import { useRef, useState } from "react";
import JSZip from "jszip";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

export default function PdfImagesExtractTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

  const extract = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const pdf = await pdfjs.getDocument({ data: await readBytes(file) }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });
      const zip = new JSZip();
      const base = file.name.replace(/\.pdf$/i, "");
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const c = document.createElement("canvas");
        c.width = Math.ceil(viewport.width); c.height = Math.ceil(viewport.height);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: c.getContext("2d")!, viewport, canvas: c } as any).promise;
        const blob = await new Promise<Blob>((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error())), "image/png"));
        zip.file(`${base}_p${String(i).padStart(3, "0")}.png`, blob);
        setProgress({ done: i, total });
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = `${base}_images.zip`; a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">🖼️</div>
        <div className="font-medium mt-2">PDF 업로드</div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && isPdfFile(e.target.files[0]) && setFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="text-sm"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmtBytes(file.size)}</div></div>
      <label className="text-sm">배율 ({scale}x)<input type="range" min="1" max="3" step="0.5" value={scale} onChange={(e) => setScale(+e.target.value)} className="w-full" /></label>
      {busy && <div className="text-sm text-muted">렌더링 중... ({progress.done}/{progress.total})</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={extract} disabled={busy} className="btn btn-primary disabled:opacity-50">📦 ZIP 다운로드</button>
    </div>
  );
}
