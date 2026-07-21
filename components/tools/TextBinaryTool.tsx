"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function toBinary(s: string): string {
  const bytes = new TextEncoder().encode(s);
  return [...bytes].map((b) => b.toString(2).padStart(8, "0")).join(" ");
}

function fromBinary(s: string): string {
  const cleaned = s.replace(/[^01]/g, "");
  if (cleaned.length === 0) return "";
  const bytes = new Uint8Array(Math.floor(cleaned.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleaned.substr(i * 8, 8), 2);
  }
  return new TextDecoder().decode(bytes);
}

export default function TextBinaryTool() {
  const t = useTranslations("toolUI.text-binary");
  const [input, setInput] = useState("Hello 안녕");
  const isBin = /^[\s01]+$/.test(input.trim()) && input.trim().length >= 8;
  const output = useMemo(() => (isBin ? fromBinary(input) : toBinary(input)), [input, isBin]);
  const partialBits = isBin && input.replace(/[^01]/g, "").length % 8 !== 0;
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="text-xs text-muted">{t("autoDetect")}: {isBin ? t("binToText") : t("textToBin")}</div>
      {partialBits && <div className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">{t("partialBits")}</div>}
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
