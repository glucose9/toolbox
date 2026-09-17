"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { openHwp, readFileBytes, isHwpFile } from "@/lib/hwp";
import { downloadBlob } from "@/lib/pdf";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
const hwpxName = (name: string) => name.replace(/\.hwp$/i, "") + ".hwpx";

type Item = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  out: Blob | null;
  error?: string;
};

// HWP → HWPX (KS X 6101), one or many files. Same batch pattern as HWP → PDF:
// sequential conversion, per-file download, ZIP of everything.
export default function HwpToHwpxTool() {
  const t = useTranslations("toolUI.hwp-to-hwpx");
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const reqRef = useRef(0);

  const patch = (id: string, p: Partial<Item>) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const run = async (list: Item[]) => {
    const reqId = ++reqRef.current;
    setBusy(true);
    for (const item of list) {
      if (reqId !== reqRef.current) return;
      patch(item.id, { status: "working" });
      try {
        const doc = await openHwp(await readFileBytes(item.file));
        try {
          const hwpxBytes = doc.exportHwpx();
          const ab = new ArrayBuffer(hwpxBytes.byteLength);
          new Uint8Array(ab).set(hwpxBytes);
          if (reqId !== reqRef.current) return;
          patch(item.id, { status: "done", out: new Blob([ab], { type: "application/hwp+zip" }) });
        } finally {
          doc.free?.();
        }
      } catch (e) {
        if (reqId !== reqRef.current) return;
        patch(item.id, { status: "error", error: (e as Error).message });
      }
    }
    if (reqId === reqRef.current) setBusy(false);
  };

  const handleFiles = (list: FileList | File[]) => {
    const all = Array.from(list).filter(isHwpFile);
    const already = all.filter((f) => f.name.toLowerCase().endsWith(".hwpx"));
    const files = all.filter((f) => !f.name.toLowerCase().endsWith(".hwpx"));
    if (!files.length) {
      setError(already.length ? t("errAlreadyHwpx") : t("errHwpOnly"));
      return;
    }
    setError(already.length ? t("errAlreadyHwpx") : "");
    const next: Item[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      status: "pending",
      out: null,
    }));
    setItems((prev) => [...prev, ...next]);
    run(next);
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
    for (const it of done) zip.file(hwpxName(it.file.name), it.out!);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "hwp-to-hwpx.zip");
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
          <div className="text-5xl mb-3">🔄</div>
          <div className="font-medium">{t("dropOrClick")}</div>
          <div className="mt-1 text-sm text-muted">{t("subtitle")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".hwp"
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
        <input ref={inputRef} type="file" accept=".hwp" multiple onChange={(e) => e.target.files?.length && handleFiles(e.target.files)} className="hidden" />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 p-2.5 text-sm">
            <div className="flex-1 min-w-0">
              <div className="truncate">{it.file.name}</div>
              <div className="text-xs text-muted">
                {fmt(it.file.size)}
                {it.status === "working" && ` · ${t("converting")}`}
                {it.status === "done" && it.out && ` → ${fmt(it.out.size)} (HWPX)`}
                {it.status === "error" && <span className="text-red-600"> · {t("errConvert")}: {it.error}</span>}
              </div>
            </div>
            {it.status === "pending" && <span className="text-muted">…</span>}
            {it.status === "working" && <span className="text-muted animate-pulse">…</span>}
            {it.status === "done" && it.out && (
              <button onClick={() => downloadBlob(it.out!, hwpxName(it.file.name))} className="btn btn-primary text-xs py-1.5 whitespace-nowrap">
                {t("downloadHwpx")}
              </button>
            )}
          </div>
        ))}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {items.length > 1 && (
        <button onClick={downloadZip} disabled={!finished || doneCount === 0} className="btn btn-primary disabled:opacity-50">
          {t("downloadZip", { count: doneCount })}
        </button>
      )}
    </div>
  );
}
