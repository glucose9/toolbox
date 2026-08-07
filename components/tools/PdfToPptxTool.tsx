"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

export default function PdfToPptxTool() {
  const t = useTranslations("toolUI.pdf-to-pptx");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [done, setDone] = useState(false);

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("error") + ": .pdf");
      return;
    }
    setError("");
    setFile(f);
    setDone(false);
    // Start converting right away (same UX as pdf-to-docx); the button below
    // stays as a retry. Pass f directly: setFile hasn't committed yet.
    convert(f);
  };

  const convert = async (f: File) => {
    setBusy(true);
    setError("");
    setDone(false);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const pptxgenMod = await import("pptxgenjs");
      const PptxGen = pptxgenMod.default;

      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });

      const pres = new PptxGen();

      // Decide layout from first page aspect ratio.
      const firstPage = await pdf.getPage(1);
      const firstVp = firstPage.getViewport({ scale: 1 });
      const ratio = firstVp.width / firstVp.height;
      // 16:9 ≈ 1.778, 4:3 ≈ 1.333
      let slideW: number;
      const slideH = 7.5;
      if (ratio > 1.5) {
        pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
        slideW = 40 / 3;
      } else {
        pres.layout = "LAYOUT_4x3"; // 10 x 7.5 in
        slideW = 10;
      }

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas context unavailable");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

        const slide = pres.addSlide();
        // Contain the page inside the slide (centered, aspect ratio preserved).
        const pageRatio = viewport.width / viewport.height;
        let imgW = slideW;
        let imgH = slideW / pageRatio;
        if (imgH > slideH) {
          imgH = slideH;
          imgW = slideH * pageRatio;
        }
        slide.addImage({ data: dataUrl, x: (slideW - imgW) / 2, y: (slideH - imgH) / 2, w: imgW, h: imgH });

        setProgress({ done: i, total });
      }

      const outName = f.name.replace(/\.pdf$/i, "") + ".pptx";
      await pres.writeFile({ fileName: outName });
      setDone(true);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
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
          <div className="text-5xl mb-3">📊</div>
          <div className="font-medium">{t("dropFile")}</div>
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
          <div className="text-xs text-muted">
            {fmtBytes(file.size)}
            {progress.total > 0 && ` · ${t("slideCount", { count: progress.total })}`}
          </div>
        </div>
        <button
          onClick={() => { setFile(null); setError(""); setProgress({ done: 0, total: 0 }); setDone(false); }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("dropFile")}
        </button>
      </div>

      {busy && (
        <div className="py-2 text-sm text-muted">
          {t("processing")}
          {progress.total > 0 && ` (${progress.done} / ${progress.total})`}
        </div>
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {done && !busy && <div className="text-sm text-green-600">✓</div>}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => file && convert(file)} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? t("processing") : t("downloadPptx")}
        </button>
      </div>
    </div>
  );
}
