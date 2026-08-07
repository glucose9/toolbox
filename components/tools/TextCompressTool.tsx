"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LZString from "lz-string";
import { copyText } from "@/lib/clipboard";

type Mode = "compress" | "decompress";

export default function TextCompressTool() {
  const t = useTranslations("toolUI.text-compress");
  const [mode, setMode] = useState<Mode>("compress");
  const [input, setInput] = useState("이것은 테스트 텍스트입니다. 반복되는 텍스트가 많으면 압축률이 높아집니다. 이것은 테스트 텍스트입니다.");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    setError("");
    try {
      if (mode === "compress") setOutput(LZString.compressToEncodedURIComponent(input));
      else {
        const decoded = LZString.decompressFromEncodedURIComponent(input);
        if (input.trim() !== "" && !decoded) { setOutput(""); setError(t("invalidCompressed")); return; }
        setOutput(decoded || "");
      }
    } catch (e) { setError((e as Error).message); }
  };

  const copy = async () => { const ok = await copyText(output); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };
  const saved = input.length - output.length;
  const pct = mode === "compress" && input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("compress")} className={`btn flex-1 ${mode === "compress" ? "btn-primary" : "btn-secondary"}`}>{t("compress")}</button>
        <button onClick={() => setMode("decompress")} className={`btn flex-1 ${mode === "decompress" ? "btn-primary" : "btn-secondary"}`}>{t("decompress")}</button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <button onClick={run} className="btn btn-primary">{mode === "compress" ? t("compress") : t("decompress")}</button>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y break-all" />
      {output && <div className="text-xs text-muted">{input.length} → {output.length} ({mode === "compress" ? (pct < 0 ? `${-pct}% ${t("increased")}` : `${pct}% ${t("saved")}`) : t("decompressed")})</div>}
      <button onClick={copy} disabled={!output} className="btn btn-secondary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
