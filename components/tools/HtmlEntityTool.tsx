"use client";

import { useMemo, useState } from "react";

const NAMED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  " ": "&nbsp;",
};
const REVERSED = Object.fromEntries(Object.entries(NAMED).map(([k, v]) => [v, k])) as Record<string, string>;

function encodeBasic(s: string): string {
  return s.replace(/[&<>"'  ]/g, (c) => NAMED[c] || c);
}

function encodeAll(s: string): string {
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0)!;
    if (cp < 128 && !NAMED[ch]) out += ch;
    else if (NAMED[ch]) out += NAMED[ch];
    else out += `&#${cp};`;
  }
  return out;
}

function decode(s: string): string {
  return s
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => REVERSED[m] || m)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));
}

type Mode = "encode-basic" | "encode-all" | "decode";

export default function HtmlEntityTool() {
  const [input, setInput] = useState('<p class="hi">안녕 & "world"</p>');
  const [mode, setMode] = useState<Mode>("encode-basic");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (mode === "encode-basic") return encodeBasic(input);
    if (mode === "encode-all") return encodeAll(input);
    return decode(input);
  }, [input, mode]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => setMode("encode-basic")} className={`btn ${mode === "encode-basic" ? "btn-primary" : "btn-secondary"}`}>인코딩 (& &lt; &gt;만)</button>
        <button onClick={() => setMode("encode-all")} className={`btn ${mode === "encode-all" ? "btn-primary" : "btn-secondary"}`}>전체 인코딩 (한글 포함)</button>
        <button onClick={() => setMode("decode")} className={`btn ${mode === "decode" ? "btn-primary" : "btn-secondary"}`}>디코딩</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <textarea
        readOnly
        value={output}
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
