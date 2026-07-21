"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HwpDocument } from "@rhwp/core";
import { openHwp, readFileBytes, isHwpFile } from "@/lib/hwp";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HwpToPdfTool() {
  const t = useTranslations("toolUI.hwp-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HwpDocument | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    return () => {
      docRef.current?.free?.();
    };
  }, []);

  const handleFile = async (file: File) => {
    if (!isHwpFile(file)) {
      setError(t("errorFormat"));
      return;
    }
    setError("");
    setLoading(true);
    setFileName(file.name);
    setFileSize(file.size);
    setPages([]);
    try {
      const bytes = await readFileBytes(file);
      docRef.current?.free?.();
      const doc = await openHwp(bytes);
      docRef.current = doc;
      const total = doc.pageCount();
      setProgress({ done: 0, total });
      const collected: string[] = [];
      for (let i = 0; i < total; i++) {
        collected.push(doc.renderPageSvg(i));
        setProgress({ done: i + 1, total });
        if (i % 4 === 3) await new Promise((r) => setTimeout(r, 0));
      }
      setPages(collected);
    } catch (e) {
      setError(t("errorAnalyze") + ": " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const printPdf = () => {
    const w = window.open("", "_blank");
    if (!w) {
      setError(t("errorPopup"));
      return;
    }
    const safeName = fileName
      .replace(/\.(hwp|hwpx)$/i, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const head = `<!doctype html>
<html><head>
<meta charset="utf-8">
<title>${safeName}</title>
<style>
  @page { margin: 0; }
  html, body { margin: 0; padding: 0; background: #fff; }
  .page { page-break-after: always; display: flex; justify-content: center; align-items: flex-start; padding: 0; }
  .page:last-child { page-break-after: auto; }
  .page svg { max-width: 100%; height: auto; display: block; }
</style>
</head><body>
`;
    const tail = `<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 200); });<\/script>
</body></html>`;
    // Write page-by-page instead of joining every page SVG into one giant string —
    // avoids holding a second full-document copy in memory on large documents.
    w.document.open();
    w.document.write(head);
    for (const svg of pages) {
      w.document.write(`<div class="page">${svg}</div>`);
    }
    w.document.write(tail);
    w.document.close();
  };

  const reset = () => {
    docRef.current?.free?.();
    docRef.current = null;
    setFileName("");
    setFileSize(0);
    setPages([]);
    setError("");
    setProgress({ done: 0, total: 0 });
  };

  if (!fileName) {
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
          <div className="text-5xl mb-3">📕</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("hint")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".hwp,.hwpx"
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
          <div className="truncate font-medium">{fileName}</div>
          <div className="text-xs text-muted">
            {fmt(fileSize)}
            {pages.length > 0 && ` · ${t("pagesReady", { n: pages.length })}`}
          </div>
        </div>
        <button onClick={reset} className="text-sm text-brand-600 hover:underline">
          {t("otherFile")}
        </button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted">
          {t("rendering", { done: progress.done, total: progress.total })}
        </div>
      ) : error ? (
        <div className="py-8 text-center text-red-600">{error}</div>
      ) : pages.length > 0 ? (
        <>
          <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 overflow-auto max-h-[55vh]">
            <div className="bg-white shadow inline-block" dangerouslySetInnerHTML={{ __html: pages[0] }} />
          </div>
          <div className="text-xs text-muted">
            {t("preview", { n: pages.length })}
          </div>
          <button onClick={printPdf} className="btn btn-primary">
            {t("savePdf")}
          </button>
          <div className="text-xs text-muted leading-relaxed">
            {t.rich("instructions", { strong: (c) => <strong>{c}</strong> })}
          </div>
        </>
      ) : null}
    </div>
  );
}
