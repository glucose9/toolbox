"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function PdfToHtmlTool() {
  const t = useTranslations("toolUI.pdf-to-html");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [htmlBlob, setHtmlBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setError("");
    setProgress("");
    setBusy(true);
    setFileName(file.name);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setHtmlBlob(null);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const buf = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buf }).promise;
      const numPages = pdf.numPages;
      setPageCount(numPages);

      const SCALE = 2;
      const pageImages: { dataUrl: string; w: number; h: number }[] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress(t("renderingPage", { page: i, total: numPages }));
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: SCALE });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas ctx");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
        pageImages.push({
          dataUrl: canvas.toDataURL("image/jpeg", 0.85),
          w: canvas.width,
          h: canvas.height,
        });
      }

      setProgress(t("buildingHtml"));
      const title = file.name.replace(/\.pdf$/i, "");
      const escapedTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapedTitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 24px 16px; background: #525659; font-family: system-ui, -apple-system, "Pretendard", sans-serif; }
    .page { background: #fff; margin: 0 auto 24px; max-width: 1200px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: block; }
    .page img { display: block; width: 100%; height: auto; }
    .meta { color: #ccc; text-align: center; font-size: 12px; margin: 0 0 12px; }
    @media print {
      body { background: #fff; padding: 0; }
      .page { box-shadow: none; margin: 0; max-width: none; page-break-after: always; }
      .page:last-child { page-break-after: auto; }
      .meta { display: none; }
    }
  </style>
</head>
<body>
  <div class="meta">${escapedTitle} · ${numPages} page${numPages > 1 ? "s" : ""}</div>
${pageImages.map((p, idx) => `  <section class="page" data-page="${idx + 1}"><img src="${p.dataUrl}" alt="page ${idx + 1}" width="${p.w}" height="${p.h}" /></section>`).join("\n")}
</body>
</html>`;

      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      setHtmlBlob(blob);
      setPreviewUrl(URL.createObjectURL(blob));
      setProgress(t("done"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!htmlBlob || !fileName) return;
    const url = URL.createObjectURL(htmlBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.pdf$/i, "") + ".html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyHtml = async () => {
    if (!htmlBlob) return;
    const text = await htmlBlob.text();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-4">
      <div className="text-xs text-muted leading-relaxed bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 px-3 py-2 rounded">
        ⚠️ {t("imageBasedNote")}
      </div>

      <div
        onDrop={(e) => { e.preventDefault(); if (!busy && e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !busy && inputRef.current?.click()}
        className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer transition-colors ${busy ? "opacity-60" : "hover:border-brand-500"}`}
      >
        <div className="text-4xl mb-2">🌐</div>
        <div className="font-medium">{t("dropFile")}</div>
        <div className="mt-1 text-xs text-muted">{t("dropHint")}</div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </div>

      {fileName && !error && (
        <div className="text-sm text-muted">📎 {fileName}{pageCount > 0 && ` · ${pageCount} ${t("pagesUnit")}`}</div>
      )}

      {busy && (
        <div className="text-sm">
          <div className="inline-block animate-spin mr-2">⏳</div>
          {progress || t("processing")}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">{error}</div>
      )}

      {previewUrl && !busy && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={download} className="btn btn-primary">📥 {t("downloadHtml")}</button>
            <button onClick={copyHtml} className="btn btn-secondary">{copied ? "✓ " + t("copied") : "📋 " + t("copyHtml")}</button>
          </div>
          <div>
            <div className="text-sm text-muted mb-2">{t("preview")}</div>
            <iframe
              src={previewUrl}
              className="w-full h-[600px] rounded border border-gray-200 dark:border-gray-700"
              sandbox=""
              title={t("preview")}
            />
          </div>
        </>
      )}
    </div>
  );
}
