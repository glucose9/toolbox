"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Item = { str: string; transform: number[] };

type Line = {
  text: string;
  size: number;
};

export default function PdfToDocxTool() {
  const t = useTranslations("toolUI.pdf-to-docx");
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
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    setDone(false);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const docxMod = await import("docx");
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak } = docxMod;

      const bytes = await readBytes(file);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });

      // First pass: collect lines + sizes across all pages, to detect heading thresholds.
      const pages: Line[][] = [];
      const allSizes: number[] = [];

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items as unknown as Item[];

        // Group items by approximate Y position into lines.
        const rows = new Map<number, { items: Item[]; y: number }>();
        for (const it of items) {
          if (!it || typeof it.str !== "string") continue;
          const y = Math.round(it.transform?.[5] ?? 0);
          const key = Math.round(y / 2) * 2;
          if (!rows.has(key)) rows.set(key, { items: [], y });
          rows.get(key)!.items.push(it);
        }
        const sortedRows = [...rows.values()].sort((a, b) => b.y - a.y);
        const lines: Line[] = [];
        for (const row of sortedRows) {
          const text = row.items.map((x) => x.str).join("").replace(/\s+/g, " ").trim();
          if (!text) continue;
          let maxSize = 0;
          for (const x of row.items) {
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

      // Determine size thresholds: body = median, then any sizes notably larger become headings.
      const sortedSizes = [...allSizes].sort((a, b) => a - b);
      const median = sortedSizes.length
        ? sortedSizes[Math.floor(sortedSizes.length / 2)]
        : 12;
      const uniqueLarge = Array.from(new Set(sortedSizes.filter((s) => s > median * 1.15)))
        .sort((a, b) => b - a)
        .slice(0, 3);

      const headingLevelFor = (size: number): "h1" | "h2" | "h3" | null => {
        if (uniqueLarge.length === 0 || size <= median * 1.15) return null;
        const idx = uniqueLarge.indexOf(size);
        if (idx === 0) return "h1";
        if (idx === 1) return "h2";
        return "h3";
      };

      // Build docx paragraphs page-by-page with page breaks between pages.
      const paragraphs: InstanceType<typeof Paragraph>[] = [];
      for (let p = 0; p < pages.length; p++) {
        const lines = pages[p];
        for (const line of lines) {
          const lvl = headingLevelFor(line.size);
          const heading =
            lvl === "h1"
              ? HeadingLevel.HEADING_1
              : lvl === "h2"
                ? HeadingLevel.HEADING_2
                : lvl === "h3"
                  ? HeadingLevel.HEADING_3
                  : undefined;
          paragraphs.push(
            new Paragraph({
              heading,
              children: [
                new TextRun({
                  text: line.text,
                  bold: !!lvl,
                  size: Math.round(Math.max(18, Math.min(60, line.size * 2))),
                }),
              ],
            })
          );
        }
        if (p < pages.length - 1) {
          paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
        }
      }

      const doc = new Document({ sections: [{ children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      a.click();
      URL.revokeObjectURL(url);
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
          <div className="text-5xl mb-3">📄</div>
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
            {progress.total > 0 && ` · ${t("pageCount", { count: progress.total })}`}
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
      {done && !busy && <div className="text-sm text-green-600">✓ {t("donelabel")}</div>}

      <div className="flex flex-wrap gap-2">
        <button onClick={convert} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? t("processing") : t("downloadDocx")}
        </button>
      </div>
    </div>
  );
}
