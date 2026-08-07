"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

export default function JsMinifierTool() {
  const t = useTranslations("toolUI.js-minifier");
  const tc = useTranslations("common");
  const [input, setInput] = useState(`// sample\nfunction add(a, b) {\n  // add two numbers\n  return a + b;\n}\n\nconst result = add(1, 2);\nconsole.log("Result:", result);`);
  const [output, setOutput] = useState("");
  const [srcLen, setSrcLen] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mangle, setMangle] = useState(true);
  const [copied, setCopied] = useState(false);

  const minify = async () => {
    setBusy(true);
    setError("");
    try {
      const terser = await import("terser");
      const result = await terser.minify(input, { mangle, compress: true });
      setOutput(result.code || "");
      setSrcLen(input.length);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const skipInitial = useRef(true);

  useEffect(() => {
    if (skipInitial.current) { skipInitial.current = false; return; }
    const timer = setTimeout(() => { minify(); }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mangle]);

  const copy = async () => { const ok = await copyText(output); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  const saved = srcLen - output.length;
  const pct = output && srcLen > 0 ? Math.round((saved / srcLen) * 100) : 0;

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="flex flex-wrap gap-3 text-sm items-center">
        <button onClick={minify} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? t("processing") : t("compress")}</button>
        {output && <button onClick={copy} className="btn btn-secondary">{copied ? t("copied") : t("copy")}</button>}
      </div>
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" checked={mangle} onChange={(e) => setMangle(e.target.checked)} /> {t("mangle")}</label>
        </div>
      </details>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {output && (
        <>
          <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
          <div className="text-sm text-muted">{srcLen} → {output.length} ({pct}% {t("saved")})</div>
        </>
      )}
    </div>
  );
}
