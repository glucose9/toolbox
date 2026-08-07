"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { copyText } from "@/lib/clipboard";

type Detection = { format: string; text: string };

export default function BarcodeReaderTool() {
  const t = useTranslations("toolUI.barcode-reader");
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState<Detection | null>(null);
  const [error, setError] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const url = URL.createObjectURL(file);
      setPreview(url);
      const reader = new BrowserMultiFormatReader();
      const res = await reader.decodeFromImageUrl(url);
      setResult({ format: res.getBarcodeFormat().toString(), text: res.getText() });
    } catch (e) {
      if (e instanceof NotFoundException) {
        setError(t("notFound"));
      } else {
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      setBusy(false);
    }
  };

  const copy = () => {
    if (!result) return;
    void copyText(result.text);
  };

  return (
    <div className="card">
      <div
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
      >
        <div className="text-5xl mb-3">📷</div>
        <div className="font-medium">{t("dropOrClick")}</div>
        <div className="mt-1 text-sm text-muted">{t("supports")}</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>

      {busy && <div className="mt-4 text-sm text-muted">{t("decoding")}</div>}

      {preview && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted mb-2">{t("preview")}</div>
            <img src={preview} alt="" className="max-w-full max-h-64 rounded border border-gray-200 dark:border-gray-700" />
          </div>
          <div>
            {result && (
              <>
                <div className="text-sm text-muted mb-1">{t("format")}</div>
                <div className="font-mono text-sm mb-3">{result.format}</div>
                <div className="text-sm text-muted mb-1">{t("content")}</div>
                <div className="font-mono text-sm break-all bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                  {result.text}
                </div>
                <button onClick={copy} className="btn btn-secondary mt-3">{t("copy")}</button>
                {/^https?:\/\//.test(result.text) && (
                  <a href={result.text} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3 ml-2">
                    {t("openUrl")}
                  </a>
                )}
              </>
            )}
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
