"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const isHeic = (f: File) => /\.(heic|heif)$/i.test(f.name) || /heic|heif/.test(f.type);
const jpgName = (name: string) => name.replace(/\.(heic|heif)$/i, "") + ".jpg";

type BatchItem = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  blob: Blob | null;
  url: string;
  error?: string;
};

// Single file keeps the live quality-slider preview; multiple files (the
// dominant real case — a batch of iPhone photos) convert sequentially at a
// fixed quality with per-file downloads and a ZIP of everything. Previously
// only files[0] was taken, silently discarding the rest.
export default function HeicToJpgTool() {
  const t = useTranslations("toolUI.heic-to-jpg");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [batch, setBatch] = useState<BatchItem[]>([]);
  const [outUrl, setOutUrl] = useState("");
  const [outSize, setOutSize] = useState(0);
  const [quality, setQuality] = useState(0.9);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Only the newest conversion may write state: dragging the quality slider can start
  // several long-running conversions and they are not guaranteed to finish in order.
  const reqRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const convert = async (f: File, q: number) => {
    if (timerRef.current) clearTimeout(timerRef.current); // drop any pending debounced run
    const reqId = ++reqRef.current;
    setBusy(true);
    setError("");
    try {
      // dynamic import to keep heic2any out of initial bundle
      const mod = (await import("heic2any")).default;
      const blob = (await mod({ blob: f, toType: "image/jpeg", quality: q })) as Blob;
      if (reqId !== reqRef.current) return; // superseded — discard this result
      const url = URL.createObjectURL(blob);
      setOutUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setOutSize(blob.size);
    } catch (e) {
      if (reqId !== reqRef.current) return;
      setError(t("errConvert") + ": " + (e as Error).message);
    } finally {
      if (reqId === reqRef.current) setBusy(false);
    }
  };

  const runBatch = async (files: File[]) => {
    const reqId = ++reqRef.current;
    const items: BatchItem[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      status: "pending",
      blob: null,
      url: "",
    }));
    setBatch(items);
    setBusy(true);
    const mod = (await import("heic2any")).default;
    for (const item of items) {
      if (reqId !== reqRef.current) return; // user reset mid-batch
      setBatch((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: "working" } : x)));
      try {
        const blob = (await mod({ blob: item.file, toType: "image/jpeg", quality: 0.9 })) as Blob;
        if (reqId !== reqRef.current) return;
        const url = URL.createObjectURL(blob);
        setBatch((prev) => prev.map((x) => (x.id === item.id ? { ...x, status: "done", blob, url } : x)));
      } catch (e) {
        if (reqId !== reqRef.current) return;
        setBatch((prev) =>
          prev.map((x) => (x.id === item.id ? { ...x, status: "error", error: (e as Error).message } : x))
        );
      }
    }
    if (reqId === reqRef.current) setBusy(false);
  };

  // slider ticks are debounced so a drag does not queue one heavy decode per step
  const scheduleConvert = (f: File, q: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => convert(f, q), 300);
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleFiles = (list: FileList) => {
    const files = Array.from(list).filter(isHeic);
    if (!files.length) {
      setError(t("errHeicOnly"));
      return;
    }
    setError("");
    if (files.length === 1) {
      setFile(files[0]);
      setBatch([]);
      convert(files[0], quality);
    } else {
      setFile(null);
      runBatch(files);
    }
  };

  const reset = () => {
    reqRef.current++; // ignore anything still in flight
    if (timerRef.current) clearTimeout(timerRef.current);
    setFile(null);
    setOutUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return "";
    });
    setOutSize(0);
    setBatch((prev) => {
      prev.forEach((x) => x.url && URL.revokeObjectURL(x.url));
      return [];
    });
    setBusy(false);
    setError("");
  };

  const download = () => {
    if (!outUrl || !file) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = jpgName(file.name);
    a.click();
  };

  const downloadOne = (item: BatchItem) => {
    if (!item.url) return;
    const a = document.createElement("a");
    a.href = item.url;
    a.download = jpgName(item.file.name);
    a.click();
  };

  const downloadZip = async () => {
    const done = batch.filter((x) => x.status === "done" && x.blob);
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const item of done) zip.file(jpgName(item.file.name), item.blob!);
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "heic-to-jpg.zip";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
  };

  if (!file && batch.length === 0) {
    return (
      <div className="card">
        <div
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📱</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("subtitle")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".heic,.heif,image/heic,image/heif"
            multiple
            onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  if (batch.length > 0) {
    const doneCount = batch.filter((x) => x.status === "done").length;
    const finished = batch.every((x) => x.status === "done" || x.status === "error");
    return (
      <div className="card space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-sm font-medium">
            {finished
              ? t("batchDone", { done: doneCount, total: batch.length })
              : t("batchProgress", { done: doneCount, total: batch.length })}
          </div>
          <button onClick={reset} className="text-sm text-brand-600 hover:underline">{t("otherFile")}</button>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
          {batch.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-2.5 text-sm">
              <div className="flex-1 min-w-0">
                <div className="truncate">{jpgName(item.file.name)}</div>
                <div className="text-xs text-muted">
                  {fmt(item.file.size)}
                  {item.blob && ` → ${fmt(item.blob.size)}`}
                </div>
              </div>
              {item.status === "working" && <span className="text-muted animate-pulse">…</span>}
              {item.status === "error" && <span className="text-xs text-red-600" title={item.error}>{t("errConvert")}</span>}
              {item.status === "done" && (
                <button onClick={() => downloadOne(item)} className="text-brand-600 hover:underline text-xs whitespace-nowrap">
                  JPG ↓
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={downloadZip} disabled={!finished || doneCount === 0} className="btn btn-primary disabled:opacity-50">
          {t("downloadZip", { count: doneCount })}
        </button>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file!.name}</div>
          <div className="text-xs text-muted">
            {fmt(file!.size)}
            {outSize > 0 && ` → ${fmt(outSize)} (JPG)`}
          </div>
        </div>
        <button onClick={reset} className="text-sm text-brand-600 hover:underline">
          {t("otherFile")}
        </button>
      </div>

      <div>
        <label className="label">{t("quality")} ({Math.round(quality * 100)}%)</label>
        <input type="range" min="0.4" max="1" step="0.05" value={quality} onChange={(e) => { const q = +e.target.value; setQuality(q); scheduleConvert(file!, q); }} className="w-full" />
      </div>

      {busy ? (
        <div className="py-8 text-center text-muted">{t("converting")}</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : outUrl ? (
        <>
          <img src={outUrl} alt="" className="max-w-full max-h-96 rounded border border-gray-200 dark:border-gray-700" />
          <button onClick={download} className="btn btn-primary">{t("downloadJpg")}</button>
        </>
      ) : null}
    </div>
  );
}
