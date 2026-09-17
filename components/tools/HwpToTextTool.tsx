"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { openHwp, readFileBytes, isHwpFile, extractAllText } from "@/lib/hwp";
import { copyText } from "@/lib/clipboard";
import { downloadBlob } from "@/lib/pdf";

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
const txtName = (name: string) => name.replace(/\.(hwp|hwpx)$/i, "") + ".txt";
const txtBlob = (text: string) => new Blob([text], { type: "text/plain;charset=utf-8" });

type Item = {
  id: string;
  file: File;
  status: "pending" | "working" | "done" | "error";
  text: string;
  error?: string;
};

// HWP/HWPX → plain text, one or many files. Extraction runs sequentially on
// drop; the selected file's text is shown for copy/download, and with several
// files every .txt can be downloaded at once as a ZIP.
export default function HwpToTextTool() {
  const t = useTranslations("toolUI.hwp-to-text");
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
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
          const text = extractAllText(doc);
          if (reqId !== reqRef.current) return;
          patch(item.id, { status: "done", text });
          setSelected((s) => s ?? item.id);
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
    const files = Array.from(list).filter(isHwpFile);
    if (!files.length) {
      setError(t("errHwpOnly"));
      return;
    }
    setError("");
    const next: Item[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      status: "pending",
      text: "",
    }));
    setItems((prev) => [...prev, ...next]);
    run(next);
  };

  const reset = () => {
    reqRef.current++;
    setItems([]);
    setSelected(null);
    setError("");
    setBusy(false);
  };

  const current = items.find((x) => x.id === selected) || null;

  const copy = async () => {
    if (!current) return;
    const ok = await copyText(current.text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const downloadZip = async () => {
    const done = items.filter((x) => x.status === "done");
    if (!done.length) return;
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const it of done) zip.file(txtName(it.file.name), it.text);
    downloadBlob(await zip.generateAsync({ type: "blob" }), "hwp-to-text.zip");
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
          <div className="text-5xl mb-3">📝</div>
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
  const charCount = current ? current.text.length : 0;
  const charCountNoSpace = current ? current.text.replace(/\s/g, "").length : 0;

  return (
    <div
      className="card space-y-3"
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
        <input ref={inputRef} type="file" accept=".hwp,.hwpx" multiple onChange={(e) => e.target.files?.length && handleFiles(e.target.files)} className="hidden" />
      </div>

      {items.length > 1 && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-56 overflow-y-auto">
          {items.map((it) => (
            <div
              key={it.id}
              onClick={() => it.status === "done" && setSelected(it.id)}
              className={`flex items-center gap-3 p-2.5 text-sm ${it.status === "done" ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" : ""} ${it.id === selected ? "bg-brand-50 dark:bg-brand-900/20" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="truncate">{it.file.name}</div>
                <div className="text-xs text-muted">
                  {fmt(it.file.size)}
                  {it.status === "working" && ` · ${t("extracting")}`}
                  {it.status === "done" && ` · ${t("charCount", { total: it.text.length.toLocaleString(), noSpace: it.text.replace(/\s/g, "").length.toLocaleString() })}`}
                  {it.status === "error" && <span className="text-red-600"> · {t("errExtract")}: {it.error}</span>}
                </div>
              </div>
              {it.status === "done" && (
                <button
                  onClick={(e) => { e.stopPropagation(); downloadBlob(txtBlob(it.text), txtName(it.file.name)); }}
                  className="text-brand-600 hover:underline text-xs whitespace-nowrap"
                >
                  {t("downloadTxt")}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {items.length === 1 && (
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{items[0].file.name}</div>
          <div className="text-xs text-muted">
            {fmt(items[0].file.size)}
            {current && ` · ${t("charCount", { total: charCount.toLocaleString(), noSpace: charCountNoSpace.toLocaleString() })}`}
          </div>
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      {busy && !current ? (
        <div className="py-16 text-center text-muted">{t("extracting")}</div>
      ) : items.length === 1 && items[0].status === "error" ? (
        <div className="py-8 text-center text-red-600">{t("errExtract")}: {items[0].error}</div>
      ) : current ? (
        <>
          <textarea
            value={current.text}
            readOnly
            className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded font-mono text-sm bg-gray-50 dark:bg-gray-900 resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="btn btn-primary">
              {copied ? `✓ ${t("copied")}` : t("copyAll")}
            </button>
            <button onClick={() => downloadBlob(txtBlob(current.text), txtName(current.file.name))} className="btn btn-secondary">
              {t("downloadTxt")}
            </button>
            {items.length > 1 && (
              <button onClick={downloadZip} disabled={!finished || doneCount === 0} className="btn btn-secondary disabled:opacity-50">
                {t("downloadZip", { count: doneCount })}
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
