"use client";
import { useState } from "react";
import LZString from "lz-string";

type Mode = "compress" | "decompress";

export default function TextCompressTool() {
  const [mode, setMode] = useState<Mode>("compress");
  const [input, setInput] = useState("이것은 테스트 텍스트입니다. 반복되는 텍스트가 많으면 압축률이 높아집니다. 이것은 테스트 텍스트입니다.");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    setError("");
    try {
      if (mode === "compress") setOutput(LZString.compressToEncodedURIComponent(input));
      else setOutput(LZString.decompressFromEncodedURIComponent(input) || "");
    } catch (e) { setError((e as Error).message); }
  };

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const saved = input.length - output.length;
  const pct = mode === "compress" && input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("compress")} className={`btn flex-1 ${mode === "compress" ? "btn-primary" : "btn-secondary"}`}>압축</button>
        <button onClick={() => setMode("decompress")} className={`btn flex-1 ${mode === "decompress" ? "btn-primary" : "btn-secondary"}`}>해제</button>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <button onClick={run} className="btn btn-primary">{mode === "compress" ? "압축" : "해제"}</button>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y break-all" />
      {output && <div className="text-xs text-muted">{input.length} → {output.length} ({mode === "compress" ? `${pct}% 절감` : "해제됨"})</div>}
      <button onClick={copy} disabled={!output} className="btn btn-secondary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
