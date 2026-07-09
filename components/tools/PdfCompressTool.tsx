"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type PresetKey = "high" | "medium" | "low";

export default function PdfCompressTool() {
  const t = useTranslations("toolUI.pdf-compress");

  const PRESETS: { key: PresetKey; label: string; scale: number; quality: number }[] = [
    { key: "high", label: t("presetHigh"), scale: 2.2, quality: 0.82 },
    { key: "medium", label: t("presetMedium"), scale: 1.6, quality: 0.6 },
    { key: "low", label: t("presetLow"), scale: 1.1, quality: 0.4 },
  ];

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<PresetKey>("medium");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [output, setOutput] = useState<{ url: string; size: number } | null>(null);

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("errPdfOnly"));
      return;
    }
    setError("");
    setOutput(null);
    setFile(f);
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    setOutput(null);
    try {
      const { scale, quality } = PRESETS.find((p) => p.key === preset)!;
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(file);
      const srcDoc = await pdfjs.getDocument({ data: bytes }).promise;
      const total = srcDoc.numPages;
      setProgress({ done: 0, total });

      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= total; i++) {
        const page = await srcDoc.getPage(i);
        const pagePts = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;

        const jpegBlob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(t("errCanvasFailed")))), "image/jpeg", quality)
        );
        const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
        const embedded = await outDoc.embedJpg(jpegBytes);

        const outPage = outDoc.addPage([pagePts.width, pagePts.height]);
        outPage.drawImage(embedded, { x: 0, y: 0, width: pagePts.width, height: pagePts.height });

        setProgress({ done: i, total });
      }

      const out = await outDoc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
      setOutput({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(t("errConvert") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const doDownload = async () => {
    if (!output || !file) return;
    const res = await fetch(output.url);
    const blob = await res.blob();
    downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-compressed.pdf");
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
          <div className="text-5xl mb-3">🗜️</div>
          <div className="font-medium">{t("dropOrClick")}</div>
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

  const reduced = output ? output.size < file.size : false;
  const pct = output ? Math.round((1 - output.size / file.size) * 100) : 0;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{t("originalSize", { size: fmtBytes(file.size) })}</div>
        </div>
        <button
          onClick={() => {
            setFile(null);
            setOutput(null);
          }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("otherFile")}
        </button>
      </div>

      <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5">
        {t("textLostNotice")}
      </div>

      <div>
        <label className="label">{t("compressionLevel")}</label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPreset(p.key)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                preset === p.key
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                  : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {busy && (
        <div>
          <div className="text-sm text-muted mb-1">
            {t("rendering")} ({progress.done} / {progress.total})
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 transition-all"
              style={{ width: `${progress.total ? Math.max(2, (progress.done / progress.total) * 100) : 2}%` }}
            />
          </div>
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={compress} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? t("compressing") : t("startCompress")}
      </button>

      {output && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm mb-2">
            {t("compressedLabel")}: {fmtBytes(output.size)}
          </div>
          {reduced ? (
            <div className="text-sm font-medium text-green-600 mb-3">{t("savedPct", { pct })}</div>
          ) : (
            <div className="text-sm text-muted mb-3">{t("notReduced")}</div>
          )}
          <button onClick={doDownload} className="btn btn-primary">
            {t("downloadPdf")}
          </button>
        </div>
      )}
    </div>
  );
}
