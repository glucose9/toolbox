"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Tab = "file" | "text";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(2)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function utf8ByteLength(s: string): number {
  return new TextEncoder().encode(s).length;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)) as number[]);
  }
  return btoa(binary);
}

export default function DataUriTool() {
  const t = useTranslations("toolUI.data-uri");
  const [tab, setTab] = useState<Tab>("file");
  const [result, setResult] = useState<string>("");
  const [originalBytes, setOriginalBytes] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("Hello, world!");
  const [mime, setMime] = useState<string>("text/plain");
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setFileName(f.name);
    const buf = new Uint8Array(await f.arrayBuffer());
    setOriginalBytes(buf.length);
    const b64 = bytesToBase64(buf);
    const m = f.type || "application/octet-stream";
    setResult(`data:${m};base64,${b64}`);
  };

  const encodeText = () => {
    const bytes = new TextEncoder().encode(textContent);
    setOriginalBytes(bytes.length);
    const b64 = bytesToBase64(bytes);
    setResult(`data:${mime || "text/plain"};base64,${b64}`);
  };

  const stats = useMemo(() => {
    const uriLen = utf8ByteLength(result);
    const inc = originalBytes > 0 ? Math.round(((uriLen - originalBytes) / originalBytes) * 100) : 0;
    return { uriLen, inc };
  }, [result, originalBytes]);

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card">
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setTab("file")}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === "file"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {t("tabFile")}
        </button>
        <button
          onClick={() => setTab("text")}
          className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
            tab === "text"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {t("tabText")}
        </button>
      </div>

      {tab === "file" ? (
        <div className="space-y-3">
          <label className="label">{t("uploadFile")}</label>
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-500"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) onFile(f);
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
              }}
            />
            <div className="text-sm text-muted">{fileName || t("selectFile")}</div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="label">{t("mimeType")}</label>
            <input
              className="input font-mono"
              value={mime}
              onChange={(e) => setMime(e.target.value)}
              placeholder="text/plain"
            />
          </div>
          <div>
            <label className="label">{t("textContent")}</label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y"
              spellCheck={false}
            />
          </div>
          <button onClick={encodeText} className="btn btn-primary">
            {t("result")}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-2">
          <label className="label">{t("result")}</label>
          <textarea
            readOnly
            value={result}
            className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y break-all"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-muted">
              <span>{t("originalSize")}: {formatBytes(originalBytes)}</span>
              <span className="mx-2">·</span>
              <span>{t("uriSize")}: {formatBytes(stats.uriLen)}</span>
              <span className="mx-2">·</span>
              <span>{t("sizeIncrease")}: +{stats.inc}%</span>
            </div>
            <button onClick={copy} className="btn btn-primary">
              {copied ? t("copied") : t("copy")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
