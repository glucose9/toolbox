"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Format = "png" | "jpeg";

export default function PdfToImagesTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<Format>("png");
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError("PDF 파일만 지원합니다.");
      return;
    }
    setError("");
    setFile(f);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(file);
      const loadingTask = pdfjs.getDocument({ data: bytes });
      const pdf = await loadingTask.promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });
      const zip = new JSZip();
      const baseName = file.name.replace(/\.pdf$/i, "");

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d")!;
        if (format === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas.toBlob 실패"))), `image/${format}`, format === "jpeg" ? 0.92 : undefined)
        );
        const padded = String(i).padStart(String(total).length, "0");
        zip.file(`${baseName}_p${padded}.${format === "jpeg" ? "jpg" : "png"}`, blob);
        setProgress({ done: i, total });
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, `${baseName}_images.zip`);
    } catch (e) {
      setError("변환 실패: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
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
          <div className="text-5xl mb-3">🏞️</div>
          <div className="font-medium">PDF 파일을 드래그하거나 클릭</div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
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
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{fmtBytes(file.size)}</div>
        </div>
        <button onClick={() => setFile(null)} className="text-sm text-brand-600 hover:underline">
          다른 파일
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">포맷</label>
          <div className="flex gap-2">
            <button onClick={() => setFormat("png")} className={`btn ${format === "png" ? "btn-primary" : "btn-secondary"}`}>PNG</button>
            <button onClick={() => setFormat("jpeg")} className={`btn ${format === "jpeg" ? "btn-primary" : "btn-secondary"}`}>JPG</button>
          </div>
        </div>
        <div>
          <label className="label">배율 ({scale}x)</label>
          <input type="range" min="1" max="3" step="0.5" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full" />
        </div>
      </div>

      {busy ? (
        <div className="py-4 text-center text-muted text-sm">
          렌더링 중... ({progress.done} / {progress.total})
        </div>
      ) : null}

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={convert} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? "변환 중..." : "🏞️ 이미지로 변환 (ZIP)"}
      </button>
    </div>
  );
}
