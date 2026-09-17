"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, pdfErrorKey, readBytes } from "@/lib/pdf";

type PresetKey = "high" | "medium" | "low";
const PRESET_VALUES: Record<PresetKey, { scale: number; quality: number }> = {
  high: { scale: 2.2, quality: 0.82 },
  medium: { scale: 1.6, quality: 0.6 },
  low: { scale: 1.1, quality: 0.4 },
};

type Item = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  done: number;
  total: number;
  out: Blob | null;
  error?: string;
};

const outName = (name: string) => name.replace(/\.pdf$/i, "") + "-compressed.pdf";

async function compressPdf(file: File, preset: PresetKey, onProgress: (done: number, total: number) => void): Promise<Blob> {
  const { scale, quality } = PRESET_VALUES[preset];
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const srcDoc = await pdfjs.getDocument({ data: await readBytes(file) }).promise;
  const total = srcDoc.numPages;
  onProgress(0, total);
  const outDoc = await PDFDocument.create();
  for (let i = 1; i <= total; i++) {
    const page = await srcDoc.getPage(i);
    const pagePts = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
    const jpegBlob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("canvas.toBlob failed"))), "image/jpeg", quality)
    );
    canvas.width = canvas.height = 0;
    const embedded = await outDoc.embedJpg(new Uint8Array(await jpegBlob.arrayBuffer()));
    const outPage = outDoc.addPage([pagePts.width, pagePts.height]);
    outPage.drawImage(embedded, { x: 0, y: 0, width: pagePts.width, height: pagePts.height });
    onProgress(i, total);
  }
  const out = await outDoc.save();
  return new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
}

// PDF compression (page rasterization), one or many files. Pick a level,
// press start: files compress sequentially with per-file progress; download
// each result or all as a ZIP.
export default function PdfCompressTool() {
  const t = useTranslations("toolUI.pdf-compress");
  const tc = useTranslations("common");
  const PRESETS: { key: PresetKey; label: string }[] = [
    { key: "high", label: t("presetHigh") },
    { key: "medium", label: t("presetMedium") },
    { key: "low", label: t("presetLow") },
  ];

  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [preset, setPreset] = useState<PresetKey>("medium");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const reqRef = useRef(0);

  const patch = (id: string, p: Partial<Item>) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const handleFiles = (list: FileList | File[]) => {
    const files = Array.from(list).filter(isPdfFile);
    if (!files.length) {
      setError(t("errPdfOnly"));
      return;
    }
    setError("");
    setItems((prev) => [
      ...prev,
      ...files.map<Item>((f) => ({ id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`, file: f, status: "pending", done: 0, total: 0, out: null })),
    ]);
  };

  const start = async () => {
    const reqId = ++reqRef.current;
    setBusy(true);
    setError("");
    // (re)compress everything not yet done with the current preset
    const todo = items.filter((x) => x.status !== "working");
    for (const item of todo) {
      if (reqId !== reqRef.current) return;
      patch(item.id, { status: "working", done: 0, total: 0, out: null, error: undefined });
      try {
        const out = await compressPdf(item.file, preset, (done, total) => {
          if (reqId === reqRef.current) patch(item.id, { done, total });
        });
        if (reqId !== reqRef.current) return;
        patch(item.id, { status: "done", out });
      } catch (e) {
        if (reqId !== reqRef.current) return;
        const key = pdfErrorKey(e);
        patch(item.id, { status: "error", error: key ? tc(key) : (e as Error).message });
      }
    }
    if (reqId === reqRef.current) setBusy(false);
  };

  const reset = () => {
    reqRef.current++;
    setItems([]);
    setError("");
    setBusy(false);
  };

  const downloadZip = async () => {
    const done = items.filter((x) => x.status === "done" && x.out);
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const it of done) zip.file(outName(it.file.name), it.out!);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "pdf-compressed.zip");
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
          <div className="text-5xl mb-3">🗜️</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("hint")}</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple onChange={(e) => e.target.files?.length && handleFiles(e.target.files)} className="hidden" />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  const doneCount = items.filter((x) => x.status === "done").length;
  const finished = !busy && doneCount > 0 && items.every((x) => x.status === "done" || x.status === "error");
  const totalIn = items.reduce((n, x) => n + x.file.size, 0);
  const totalOut = items.reduce((n, x) => n + (x.out ? x.out.size : x.file.size), 0);
  const pctAll = totalIn > 0 ? Math.round((1 - totalOut / totalIn) * 100) : 0;

  return (
    <div
      className="card space-y-4"
      onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm font-medium">
          {finished ? t("batchDone", { done: doneCount, total: items.length }) : busy ? t("batchProgress", { done: doneCount, total: items.length }) : t("fileCount", { count: items.length })}
        </div>
        <div className="flex gap-3 text-sm">
          <button onClick={() => inputRef.current?.click()} className="text-brand-600 hover:underline">{t("addFiles")}</button>
          <button onClick={reset} className="text-brand-600 hover:underline">{t("otherFile")}</button>
        </div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple onChange={(e) => e.target.files?.length && handleFiles(e.target.files)} className="hidden" />
      </div>

      <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5">
        {t("textLostNotice")}
      </div>

      <div>
        <label className="label">{t("compressionLevel")}</label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPreset(p.key)}
              disabled={busy}
              className={`px-3 py-2 rounded-lg border text-sm ${
                preset === p.key
                  ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                  : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((it) => {
          const pct = it.out ? Math.round((1 - it.out.size / it.file.size) * 100) : 0;
          return (
            <div key={it.id} className="flex items-center gap-3 p-2.5 text-sm">
              <div className="flex-1 min-w-0">
                <div className="truncate">{it.file.name}</div>
                <div className="text-xs text-muted">
                  {fmtBytes(it.file.size)}
                  {it.status === "working" && ` · ${t("rendering")} (${it.done} / ${it.total || "?"})`}
                  {it.status === "done" && it.out && (
                    <>
                      {" → "}{fmtBytes(it.out.size)}{" "}
                      {it.out.size < it.file.size ? <span className="text-green-600 font-medium">{t("savedPct", { pct })}</span> : <span>{t("notReduced")}</span>}
                    </>
                  )}
                  {it.status === "error" && <span className="text-red-600"> · {t("errConvert")}: {it.error}</span>}
                </div>
              </div>
              {it.status === "working" && (
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 transition-all" style={{ width: `${it.total ? Math.max(4, (it.done / it.total) * 100) : 4}%` }} />
                </div>
              )}
              {it.status === "done" && it.out && (
                <button onClick={() => downloadBlob(it.out!, outName(it.file.name))} className="btn btn-primary text-xs py-1.5 whitespace-nowrap">
                  {t("downloadPdf")}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={start} disabled={busy} className="btn btn-primary disabled:opacity-50">
          {busy ? t("compressing") : doneCount > 0 ? t("recompress") : t("startCompress")}
        </button>
        {items.length > 1 && (
          <button onClick={downloadZip} disabled={!finished} className="btn btn-secondary disabled:opacity-50">
            {t("downloadZip", { count: doneCount })}
          </button>
        )}
        {finished && items.length > 1 && (
          <span className="text-sm text-muted">
            {pctAll > 0 ? t("totalSaved", { from: fmtBytes(totalIn), to: fmtBytes(totalOut), pct: pctAll }) : t("notReduced")}
          </span>
        )}
      </div>
    </div>
  );
}
