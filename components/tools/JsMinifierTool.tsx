"use client";

import { useState } from "react";

export default function JsMinifierTool() {
  const [input, setInput] = useState(`// sample\nfunction add(a, b) {\n  // add two numbers\n  return a + b;\n}\n\nconst result = add(1, 2);\nconsole.log("Result:", result);`);
  const [output, setOutput] = useState("");
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
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const saved = input.length - output.length;
  const pct = output && input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="flex flex-wrap gap-3 text-sm items-center">
        <label className="flex items-center gap-1"><input type="checkbox" checked={mangle} onChange={(e) => setMangle(e.target.checked)} /> 식별자 단축 (mangle)</label>
        <button onClick={minify} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "압축"}</button>
        {output && <button onClick={copy} className="btn btn-secondary">{copied ? "✓ 복사됨" : "복사"}</button>}
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {output && (
        <>
          <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
          <div className="text-sm text-muted">{input.length} → {output.length} ({pct}% 절감)</div>
        </>
      )}
    </div>
  );
}
