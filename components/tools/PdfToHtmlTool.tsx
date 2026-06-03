"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

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
      const pages: { dataUrl: string; w: number; h: number; textLayer: string }[] = [];

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

        // Build transparent text layer for copy-paste
        const textContent = await page.getTextContent();
        const spans: string[] = [];
        for (const item of textContent.items) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const it = item as any;
          if (!it.str || !it.transform) continue;
          const tx: number[] = it.transform;
          // PDF transform: [a, b, c, d, e, f] — [a,b] = horizontal scale + skew
          const fontSize = Math.sqrt(tx[0] * tx[0] + tx[1] * tx[1]) * SCALE;
          if (fontSize < 1) continue;
          const x = tx[4] * SCALE;
          // pdfjs origin bottom-left → canvas top-left. Flip Y, then subtract fontSize so baseline aligns.
          const y = canvas.height - tx[5] * SCALE - fontSize;
          spans.push(
            `<span style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;font-size:${fontSize.toFixed(1)}px;">${escapeHtml(it.str)}</span>`
          );
        }

        pages.push({
          dataUrl: canvas.toDataURL("image/jpeg", 0.85),
          w: canvas.width,
          h: canvas.height,
          textLayer: spans.join(""),
        });
      }

      setProgress(t("buildingHtml"));
      const title = file.name.replace(/\.pdf$/i, "");
      const escapedTitle = escapeHtml(title);
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapedTitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 24px 16px; background: #525659; font-family: system-ui, -apple-system, "Pretendard", "Noto Sans KR", sans-serif; }
    .page { position: relative; background: #fff; margin: 0 auto 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: block; line-height: 0; }
    .page img { display: block; width: 100%; height: auto; }
    .text-layer { position: absolute; inset: 0; line-height: 1; pointer-events: auto; }
    .text-layer span { position: absolute; color: transparent; white-space: nowrap; cursor: text; transform-origin: 0% 0%; }
    .text-layer span::selection { background: rgba(60,120,255,0.35); color: transparent; }
    .meta { color: #ccc; text-align: center; font-size: 12px; margin: 0 0 12px; }
    @media print {
      body { background: #fff; padding: 0; }
      .page { box-shadow: none; margin: 0; page-break-after: always; }
      .page:last-child { page-break-after: auto; }
      .meta { display: none; }
    }
  </style>
</head>
<body>
  <div class="meta">${escapedTitle} · ${numPages} page${numPages > 1 ? "s" : ""} · 텍스트 드래그하면 복사 가능 / drag to select &amp; copy text</div>
${pages
  .map((p, idx) => {
    // To preserve absolute coordinates while allowing img to scale responsively,
    // set the .page container to the canvas pixel size; the image fills it.
    return `  <div class="page" style="width:${p.w}px;max-width:100%;aspect-ratio:${p.w}/${p.h};" data-page="${idx + 1}">
    <img src="${p.dataUrl}" alt="page ${idx + 1}" width="${p.w}" height="${p.h}" />
    <div class="text-layer" style="width:${p.w}px;height:${p.h}px;">${p.textLayer}</div>
  </div>`;
  })
  .join("\n")}
  <script>
    // Scale the text layer with the displayed image size so coordinates match.
    (function () {
      function rescale() {
        document.querySelectorAll('.page').forEach(function (page) {
          var img = page.querySelector('img');
          var layer = page.querySelector('.text-layer');
          if (!img || !layer) return;
          var scale = img.clientWidth / img.naturalWidth;
          layer.style.transform = 'scale(' + scale + ')';
          layer.style.transformOrigin = '0 0';
          page.style.height = (img.naturalHeight * scale) + 'px';
        });
      }
      window.addEventListener('load', rescale);
      window.addEventListener('resize', rescale);
    })();
  </script>
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
      <div className="text-xs text-muted leading-relaxed bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 rounded">
        ✨ {t("textLayerNote")}
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
            <div className="text-sm text-muted mb-2">{t("preview")} — {t("previewHint")}</div>
            <iframe
              src={previewUrl}
              className="w-full h-[600px] rounded border border-gray-200 dark:border-gray-700"
              title={t("preview")}
            />
          </div>
        </>
      )}
    </div>
  );
}
