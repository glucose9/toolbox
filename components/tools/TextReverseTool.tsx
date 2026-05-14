"use client";

import { useMemo, useState } from "react";

type Mode = "chars" | "words" | "lines";

export default function TextReverseTool() {
  const [text, setText] = useState("안녕 Hello World\n두번째 줄\n세번째 줄");
  const [mode, setMode] = useState<Mode>("chars");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (mode === "chars") return Array.from(text).reverse().join("");
    if (mode === "words") return text.split(" ").reverse().join(" ");
    return text.split("\n").reverse().join("\n");
  }, [text, mode]);

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="flex gap-2">
        <button onClick={() => setMode("chars")} className={`btn ${mode === "chars" ? "btn-primary" : "btn-secondary"}`}>글자</button>
        <button onClick={() => setMode("words")} className={`btn ${mode === "words" ? "btn-primary" : "btn-secondary"}`}>단어</button>
        <button onClick={() => setMode("lines")} className={`btn ${mode === "lines" ? "btn-primary" : "btn-secondary"}`}>줄</button>
      </div>
      <textarea readOnly value={output} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
