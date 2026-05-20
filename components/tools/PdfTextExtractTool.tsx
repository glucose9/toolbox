"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";
import { downloadText } from "@/lib/markdown-io";

export default function PdfTextExtractTool() {
  const t = useTranslations("toolUI.pdf-text-extract");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [copied, setCopied] = useState(false);

  const extract = async (f: File) => {
    setBusy(true);
    setError("");
    setText("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });
      const parts: string[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((it: any) => ("str" in it ? it.str : ""))
          .join(" ");
        parts.push(pageText);
        setProgress({ done: i, total });
      }
      setText(parts.join("\n\n").replace(/[ \t]+/g, " ").trim());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleFile = (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("errPdfOnly"));
      return;
    }
    setError("");
    setFile(f);
    extract(f);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
          <div className="text-5xl mb-3">📋</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("hint")}</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">
            {fmtBytes(file.size)}
            {text && ` · ${t("charsExtracted", { count: text.length.toLocaleString() })}`}
          </div>
        </div>
        <button onClick={() => { setFile(null); setText(""); setProgress({ done: 0, total: 0 }); }} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
      </div>

      {busy ? (
        <div className="py-8 text-center text-muted">{t("extracting")} ({progress.done} / {progress.total})</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <>
          <textarea
            readOnly
            value={text}
            placeholder={t("emptyText")}
            className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} disabled={!text} className="btn btn-primary disabled:opacity-50">{copied ? `✓ ${t("copied")}` : t("copyAll")}</button>
            <button onClick={() => downloadText(text, file.name.replace(/\.pdf$/i, "") + ".txt", "text/plain;charset=utf-8")} disabled={!text} className="btn btn-secondary disabled:opacity-50">
              {t("downloadTxt")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
