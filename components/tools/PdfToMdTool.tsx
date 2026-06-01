"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Item = { str: string; transform: number[] };

type Line = {
  text: string;
  size: number;
};

const BULLET_RE = /^([-•*]|\d{1,3}[.)])\s+/;

export default function PdfToMdTool() {
  const t = useTranslations("toolUI.pdf-to-md");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [md, setMd] = useState("");
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
    setMd("");
    extract(f);
  };

  const extract = async (f: File) => {
    setBusy(true);
    setError("");
    setMd("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const bytes = await readBytes(f);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });

      const pages: Line[][] = [];
      const allSizes: number[] = [];

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
        const lines: Line[] = [];
        for (const [, rowItems] of sortedRows) {
          rowItems.sort((a, b) => (a.transform?.[4] ?? 0) - (b.transform?.[4] ?? 0));
          const text = rowItems.map((x) => x.str).join("").replace(/\s+/g, " ").trim();
          if (!text) continue;
          let maxSize = 0;
          for (const x of rowItems) {
            const sz = Math.abs(x.transform?.[0] ?? 0);
            if (sz > maxSize) maxSize = sz;
          }
          if (!maxSize) maxSize = 12;
          lines.push({ text, size: maxSize });
          allSizes.push(maxSize);
        }
        pages.push(lines);
        setProgress({ done: i, total });
      }

      // Heading thresholds based on overall size distribution.
      const sortedSizes = [...allSizes].sort((a, b) => a - b);
      const median = sortedSizes.length
        ? sortedSizes[Math.floor(sortedSizes.length / 2)]
        : 12;
      const uniqueLarge = Array.from(new Set(sortedSizes.filter((s) => s > median * 1.15)))
        .sort((a, b) => b - a)
        .slice(0, 3);

      const headingPrefix = (size: number): string => {
        if (uniqueLarge.length === 0 || size <= median * 1.15) return "";
        const idx = uniqueLarge.indexOf(size);
        if (idx === 0) return "# ";
        if (idx === 1) return "## ";
        return "### ";
      };

      const out: string[] = [];
      for (let p = 0; p < pages.length; p++) {
        const lines = pages[p];
        for (const line of lines) {
          const prefix = headingPrefix(line.size);
          if (prefix) {
            out.push(prefix + line.text);
            out.push("");
            continue;
          }
          const m = line.text.match(BULLET_RE);
          if (m) {
            const rest = line.text.slice(m[0].length).trim();
            out.push(`- ${rest}`);
            continue;
          }
          out.push(line.text);
          out.push("");
        }
        if (p < pages.length - 1) {
          // Trim trailing blank then add separator.
          while (out.length && out[out.length - 1] === "") out.pop();
          out.push("");
          out.push("---");
          out.push("");
        }
      }

      while (out.length && out[out.length - 1] === "") out.pop();
      setMd(out.join("\n"));
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!md) return;
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!file || !md) return;
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "") + ".md";
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
          <div className="text-5xl mb-3">📝</div>
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
          onClick={() => { setFile(null); setMd(""); setError(""); setProgress({ done: 0, total: 0 }); }}
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

      {md && !busy && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="btn btn-primary">
              {copied ? `✓ ${t("copied")}` : t("copyMd")}
            </button>
            <button onClick={download} className="btn btn-secondary">
              {t("downloadMd")}
            </button>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">{t("preview")}</div>
            <pre className="w-full max-h-[60vh] overflow-auto p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono whitespace-pre-wrap">{md}</pre>
          </div>
        </>
      )}
    </div>
  );
}
