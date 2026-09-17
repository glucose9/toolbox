"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { HwpDocument } from "@rhwp/core";
import { openHwp, readFileBytes, isHwpFile } from "@/lib/hwp";
import { withKrFontFallbacks, KR_FONTS_CSS_URL } from "@/lib/kr-fonts";
import { hwpToPdfBytes } from "@/lib/hwp-pdf";
import { downloadBlob } from "@/lib/pdf";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
const pdfName = (name: string) => name.replace(/\.(hwp|hwpx)$/i, "") + ".pdf";

type Item = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  pages: number;
  done: number;
  pdf: Blob | null;
  error?: string;
};

// HWP/HWPX → real .pdf files, one or many. Pages are rasterized from rhwp's
// SVG with the same web fonts as the preview (lib/hwp-pdf.ts), so the output
// is identical on every device and needs no print dialog. The browser-print
// path is kept as a secondary option for people who want selectable text.
export default function HwpToPdfTool() {
  const t = useTranslations("toolUI.hwp-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const reqRef = useRef(0);

  useEffect(() => () => { reqRef.current++; }, []);

  const patch = (id: string, p: Partial<Item>) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const run = async (list: Item[]) => {
    const reqId = ++reqRef.current;
    setBusy(true);
    for (const item of list) {
      if (reqId !== reqRef.current) return;
      patch(item.id, { status: "working" });
      let doc: HwpDocument | null = null;
      try {
        doc = await openHwp(await readFileBytes(item.file));
        const total = doc.pageCount();
        patch(item.id, { pages: total });
        if (!preview && total > 0) setPreview(withKrFontFallbacks(doc.renderPageSvg(0)));
        const bytes = await hwpToPdfBytes(doc, (done) => {
          if (reqId === reqRef.current) patch(item.id, { done });
        });
        if (reqId !== reqRef.current) return;
        patch(item.id, { status: "done", pdf: new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" }) });
      } catch (e) {
        if (reqId !== reqRef.current) return;
        patch(item.id, { status: "error", error: (e as Error).message });
      } finally {
        doc?.free?.();
      }
    }
    if (reqId === reqRef.current) setBusy(false);
  };

  const handleFiles = (list: FileList | File[]) => {
    const files = Array.from(list).filter(isHwpFile);
    if (!files.length) {
      setError(t("errorFormat"));
      return;
    }
    setError("");
    const next: Item[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      status: "pending",
      pages: 0,
      done: 0,
      pdf: null,
    }));
    setItems((prev) => [...prev, ...next]);
    run(next);
  };

  const reset = () => {
    reqRef.current++;
    setItems([]);
    setPreview("");
    setError("");
    setBusy(false);
  };

  const downloadOne = (item: Item) => item.pdf && downloadBlob(item.pdf, pdfName(item.file.name));

  const downloadZip = async () => {
    const done = items.filter((x) => x.status === "done" && x.pdf);
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const it of done) zip.file(pdfName(it.file.name), it.pdf!);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "hwp-to-pdf.zip");
  };

  // Secondary path: the browser's own print engine produces a PDF with
  // selectable text. Re-renders the document into a popup.
  const printOne = async (item: Item) => {
    const w = window.open("", "_blank");
    if (!w) {
      setError(t("errorPopup"));
      return;
    }
    let doc: HwpDocument | null = null;
    try {
      doc = await openHwp(await readFileBytes(item.file));
      const safeName = item.file.name.replace(/\.(hwp|hwpx)$/i, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      w.document.open();
      w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${safeName}</title><link rel="stylesheet" href="${KR_FONTS_CSS_URL}"><style>@page{margin:0}html,body{margin:0;padding:0;background:#fff}.page{page-break-after:always;display:flex;justify-content:center;align-items:flex-start}.page:last-child{page-break-after:auto}.page svg{max-width:100%;height:auto;display:block}</style></head><body>`);
      const total = doc.pageCount();
      for (let i = 0; i < total; i++) w.document.write(`<div class="page">${withKrFontFallbacks(doc.renderPageSvg(i))}</div>`);
      w.document.write(`<script>window.addEventListener('load',function(){(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){setTimeout(function(){window.print();},300);});});<\/script></body></html>`);
      w.document.close();
    } catch (e) {
      setError(t("errorAnalyze") + ": " + (e as Error).message);
      w.close();
    } finally {
      doc?.free?.();
    }
  };

  if (items.length === 0) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
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
            multiple
            onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  const doneCount = items.filter((x) => x.status === "done").length;
  const finished = !busy && items.every((x) => x.status === "done" || x.status === "error");

  return (
    <div
      className="card space-y-4"
      onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm font-medium">
          {finished ? t("batchDone", { done: doneCount, total: items.length }) : t("batchProgress", { done: doneCount, total: items.length })}
        </div>
        <div className="flex gap-3 text-sm">
          <button onClick={() => inputRef.current?.click()} className="text-brand-600 hover:underline">{t("addFiles")}</button>
          <button onClick={reset} className="text-brand-600 hover:underline">{t("otherFile")}</button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".hwp,.hwpx"
          multiple
          onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 p-2.5 text-sm">
            <div className="flex-1 min-w-0">
              <div className="truncate">{it.file.name}</div>
              <div className="text-xs text-muted">
                {fmt(it.file.size)}
                {it.status === "working" && ` · ${t("rendering", { done: it.done, total: it.pages || "?" })}`}
                {it.status === "done" && it.pdf && ` · ${t("pagesReady", { n: it.pages })} · ${fmt(it.pdf.size)}`}
                {it.status === "error" && <span className="text-red-600"> · {t("errorAnalyze")}: {it.error}</span>}
              </div>
            </div>
            {it.status === "pending" && <span className="text-muted">…</span>}
            {it.status === "working" && (
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 transition-all" style={{ width: `${it.pages ? Math.max(4, (it.done / it.pages) * 100) : 4}%` }} />
              </div>
            )}
            {it.status === "done" && (
              <button onClick={() => downloadOne(it)} className="btn btn-primary text-xs py-1.5 whitespace-nowrap">
                {t("savePdf")}
              </button>
            )}
          </div>
        ))}
      </div>

      {preview && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded p-4 overflow-auto max-h-[45vh]">
          <div className="bg-white shadow inline-block" dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex flex-wrap gap-2 items-center">
        {items.length > 1 && (
          <button onClick={downloadZip} disabled={!finished || doneCount === 0} className="btn btn-primary disabled:opacity-50">
            {t("downloadZip", { count: doneCount })}
          </button>
        )}
        {items.length === 1 && items[0].status === "done" && (
          <button onClick={() => printOne(items[0])} className="btn btn-secondary text-sm">
            {t("printAlt")}
          </button>
        )}
      </div>
      <div className="text-xs text-muted leading-relaxed">{t("rasterNote")}</div>
    </div>
  );
}
