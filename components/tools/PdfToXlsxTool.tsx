"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Item = { str: string; transform: number[] };

export default function PdfToXlsxTool() {
  const t = useTranslations("toolUI.pdf-to-xlsx");
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
      const XLSX = await import("xlsx");

      const bytes = await readBytes(file);
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      setProgress({ done: 0, total });

      const wb = XLSX.utils.book_new();
      const sheetPrefix = t("sheetPrefix");

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const items = content.items as unknown as Item[];

        // Group by Y to form rows.
        const rows = new Map<number, Item[]>();
        for (const it of items) {
          if (!it || typeof it.str !== "string") continue;
          const y = Math.round((it.transform?.[5] ?? 0) / 2) * 2;
          if (!rows.has(y)) rows.set(y, []);
          rows.get(y)!.push(it);
        }
        const sortedRows = [...rows.entries()].sort((a, b) => b[0] - a[0]);
        const aoa: string[][] = [];
        for (const [, rowItems] of sortedRows) {
          // Sort within row by X.
          rowItems.sort((a, b) => (a.transform?.[4] ?? 0) - (b.transform?.[4] ?? 0));
          const cells: string[] = [];
          for (const ri of rowItems) {
            const s = ri.str ?? "";
            // Split each item by 2+ whitespace as a soft column separator.
            const parts = s.split(/\s{2,}|\t+/).map((p) => p.trim()).filter((p) => p.length > 0);
            if (parts.length === 0 && s.trim()) cells.push(s.trim());
            else cells.push(...parts);
          }
          if (cells.length > 0) aoa.push(cells);
        }

        const ws = XLSX.utils.aoa_to_sheet(aoa.length > 0 ? aoa : [[""]]);
        let sheetName = `${sheetPrefix} ${i}`;
        // Excel sheet names max 31 chars and no certain chars.
        sheetName = sheetName.replace(/[\\/?*[\]:]/g, "_").slice(0, 31);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);

        setProgress({ done: i, total });
      }

      const outName = file.name.replace(/\.pdf$/i, "") + ".xlsx";
      XLSX.writeFile(wb, outName);
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
            {progress.total > 0 && ` · ${t("sheetCount", { count: progress.total })}`}
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
        <button onClick={convert} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? t("processing") : t("downloadXlsx")}
        </button>
      </div>
    </div>
  );
}
