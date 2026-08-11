"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { downloadBlob, fmtBytes, isPdfFile, parsePageGroups, pdfErrorKey, readBytes } from "@/lib/pdf";

type Mode = "every" | "ranges";

export default function PdfSplitTool() {
  const t = useTranslations("toolUI.pdf-split");
  const tc = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<Mode>("every");
  const [ranges, setRanges] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) {
      setError(t("errorPdfOnly"));
      return;
    }
    setError("");
    setFile(f);
    try {
      const bytes = await readBytes(f);
      const src = await PDFDocument.load(bytes);
      setPageCount(src.getPageCount());
    } catch (e) {
      const key = pdfErrorKey(e);
      setError(key ? tc(key) : t("errorPdfLoad") + ": " + (e as Error).message);
    }
  };

  const split = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const bytes = await readBytes(file);
      const src = await PDFDocument.load(bytes);
      const total = src.getPageCount();
      const baseName = file.name.replace(/\.pdf$/i, "");

      const groups: number[][] =
        mode === "every"
          ? Array.from({ length: total }, (_, i) => [i + 1])
          : parsePageGroups(ranges, total);

      if (groups.length === 0) {
        setError(t("errorNoRange"));
        setBusy(false);
        return;
      }

      if (groups.length === 1 && groups[0].length === total) {
        setError(t("errorFullRange"));
        setBusy(false);
        return;
      }

      const zip = new JSZip();
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const out = await PDFDocument.create();
        const indexes = group.map((n) => n - 1);
        const pages = await out.copyPages(src, indexes);
        pages.forEach((p) => out.addPage(p));
        const pdfBytes = await out.save();
        const label = group.length === 1 ? `p${group[0]}` : `p${group[0]}-${group[group.length - 1]}`;
        zip.file(`${baseName}_${label}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, `${baseName}_split.zip`);
    } catch (e) {
      const key = pdfErrorKey(e);
      setError(key ? tc(key) : t("errorSplit") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
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
          <div className="text-5xl mb-3">✂️</div>
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

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">
            {fmtBytes(file.size)} · {t("pages", { n: pageCount })}
          </div>
        </div>
        <button onClick={() => { setFile(null); setPageCount(0); }} className="text-sm text-brand-600 hover:underline">
          {t("otherFile")}
        </button>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="mode" checked={mode === "every"} onChange={() => setMode("every")} />
          {t("modeEvery", { n: pageCount })}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="mode" checked={mode === "ranges"} onChange={() => setMode("ranges")} />
          {t("modeRanges")}
        </label>
        {mode === "ranges" && (
          <input
            type="text"
            value={ranges}
            onChange={(e) => setRanges(e.target.value)}
            placeholder={t("rangePlaceholder")}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900"
          />
        )}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button onClick={split} disabled={busy} className="btn btn-primary disabled:opacity-50">
        {busy ? t("splitting") : t("splitButton")}
      </button>
    </div>
  );
}
