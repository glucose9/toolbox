"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Item = { str: string; transform: number[] };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function PdfToHtmlTool() {
  const t = useTranslations("toolUI.pdf-to-html");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [copied, setCopied] = useState(false);

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("error") + ": .pdf");
      return;
    }
    setError("");
    setFile(f);
    setHtml("");
    extract(f);
  };

  const extract = async (f: File) => {
    setBusy(true);
    setError("");
    setHtml("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });

      const sections: string[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items as unknown as Item[];

        const rows = new Map<number, Item[]>();
        for (const it of items) {
          if (!it || typeof it.str !== "string") continue;
          const y = Math.round((it.transform?.[5] ?? 0) / 2) * 2;
          if (!rows.has(y)) rows.set(y, []);
          rows.get(y)!.push(it);
        }
        const sortedRows = [...rows.entries()].sort((a, b) => b[0] - a[0]);
        const paragraphs: string[] = [];
        for (const [, rowItems] of sortedRows) {
          rowItems.sort((a, b) => (a.transform?.[4] ?? 0) - (b.transform?.[4] ?? 0));
          const text = rowItems.map((x) => x.str).join("").replace(/\s+/g, " ").trim();
          if (!text) continue;
          paragraphs.push(`    <p>${escapeHtml(text)}</p>`);
        }
        sections.push(
          `  <section class="page" data-page="${i}">\n${paragraphs.join("\n")}\n  </section>`
        );
        setProgress({ done: i, total });
      }

      const docName = escapeHtml(f.name.replace(/\.pdf$/i, ""));
      const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${docName}</title>
<style>
  body { font-family: 'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif; line-height: 1.6; color: #111827; max-width: 800px; margin: 0 auto; padding: 32px 16px; }
  .page { margin: 0 0 48px; padding-bottom: 24px; border-bottom: 1px dashed #d1d5db; }
  .page:last-child { border-bottom: none; }
  .page p { margin: 0 0 8px; }
  h1 { font-size: 22px; margin: 0 0 16px; }
</style>
</head>
<body>
  <h1>${docName}</h1>
${sections.join("\n")}
</body>
</html>`;
      setHtml(fullHtml);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!html) return;
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!file || !html) return;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "") + ".html";
    a.click();
    URL.revokeObjectURL(url);
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
          <div className="text-5xl mb-3">🌐</div>
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
          <div className="text-xs text-muted">{fmtBytes(file.size)}</div>
        </div>
        <button
          onClick={() => { setFile(null); setHtml(""); setError(""); setProgress({ done: 0, total: 0 }); }}
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

      {html && !busy && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="btn btn-primary">
              {copied ? `✓ ${t("copied")}` : t("copyHtml")}
            </button>
            <button onClick={download} className="btn btn-secondary">
              {t("downloadHtml")}
            </button>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">{t("preview")}</div>
            <iframe
              title="preview"
              srcDoc={html}
              sandbox=""
              className="w-full h-[60vh] border border-gray-200 dark:border-gray-700 rounded bg-white"
            />
          </div>
        </>
      )}
    </div>
  );
}
