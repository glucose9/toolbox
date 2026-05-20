"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function BackgroundRemoverTool() {
  const t = useTranslations("toolUI.background-remover");
  const [origUrl, setOrigUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setError("");
    setResultUrl("");
    const url = URL.createObjectURL(f);
    setOrigUrl(url);
    setBusy(true);
    setStatus(t("loadingModel"));
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(f, {
        progress: (key: string, current: number, total: number) => {
          if (key.startsWith("fetch")) {
            setStatus(t("downloadingModel", { pct: Math.round((current / total) * 100) }));
          } else {
            setStatus(t("processing"));
          }
        },
      });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `no-bg-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="card space-y-4">
      <div
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !busy && inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-500 transition-colors"
      >
        <div className="text-4xl mb-2">🪄</div>
        <div className="font-medium">{t("uploadImage")}</div>
        <div className="mt-1 text-xs text-muted">{t("firstRunNote")}</div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      </div>

      {busy && (
        <div className="text-sm text-center text-muted">
          <div className="inline-block animate-spin mr-2">⏳</div>
          {status || t("processing")}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">{error}</div>
      )}

      {(origUrl || resultUrl) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {origUrl && (
            <div>
              <div className="text-xs text-muted mb-1">{t("original")}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={origUrl} alt="original" className="max-w-full rounded border border-gray-200 dark:border-gray-700" />
            </div>
          )}
          {resultUrl && (
            <div>
              <div className="text-xs text-muted mb-1">{t("result")}</div>
              <div className="rounded border border-gray-200 dark:border-gray-700 bg-[repeating-conic-gradient(#e5e7eb_0%_25%,#fff_0%_50%)] bg-[length:20px_20px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="result" className="max-w-full" />
              </div>
              <button onClick={download} className="btn btn-primary mt-2 w-full">{t("downloadPng")}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
