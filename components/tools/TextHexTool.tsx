"use client";

import { useMemo, useState } from "react";

function toHex(s: string, spaced: boolean): string {
  const bytes = new TextEncoder().encode(s);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join(spaced ? " " : "").toUpperCase();
}

function fromHex(s: string): string {
  const cleaned = s.replace(/[^0-9a-fA-F]/g, "");
  if (cleaned.length === 0) return "";
  const bytes = new Uint8Array(Math.floor(cleaned.length / 2));
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(cleaned.substr(i * 2, 2), 16);
  return new TextDecoder().decode(bytes);
}

export default function TextHexTool() {
  const [input, setInput] = useState("Hello 안녕");
  const [spaced, setSpaced] = useState(true);
  const isHex = /^[\s0-9a-fA-F]+$/.test(input.trim()) && input.trim().replace(/\s/g, "").length >= 2;
  const output = useMemo(() => (isHex ? fromHex(input) : toHex(input, spaced)), [input, spaced, isHex]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted">{isHex ? "16진수 → 텍스트" : "텍스트 → 16진수 (UTF-8)"}</span>
        {!isHex && <label className="flex items-center gap-1"><input type="checkbox" checked={spaced} onChange={(e) => setSpaced(e.target.checked)} /> 공백 구분</label>}
      </div>
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
