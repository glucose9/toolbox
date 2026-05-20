"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

export default function PdfBlankPageTool() {
  const t = useTranslations("toolUI.pdf-blank-page");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState(1);
  const [count, setCount] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) return;
    setFile(f);
    const src = await PDFDocument.load(await readBytes(f));
    setPageCount(src.getPageCount());
    setPosition(src.getPageCount() + 1);
  };

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      const first = src.getPage(0);
      const w = first.getWidth(), h = first.getHeight();
      const pos = Math.max(1, Math.min(position, src.getPageCount() + 1));
      for (let i = 0; i < count; i++) {
        src.insertPage(pos - 1 + i, [w, h]);
      }
      const out = await src.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "_with-blank.pdf");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) {
    return (
      <div className="card">
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">📄</div>
          <div className="font-medium mt-2">{t("uploadPdf")}</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="text-sm"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmtBytes(file.size)} · {pageCount}{t("pagesSuffix")}</div></div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>{t("insertPosition")} (1~{pageCount + 1})<input type="number" min="1" max={pageCount + 1} value={position} onChange={(e) => setPosition(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>{t("blankPages")}<input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? t("processing") : t("insertBlank")}</button>
        <button onClick={() => setFile(null)} className="btn btn-secondary">{t("otherFile")}</button>
      </div>
    </div>
  );
}
