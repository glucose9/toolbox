"use client";
import { useMemo, useState } from "react";

export default function TextBlockquoteTool() {
  const [text, setText] = useState("이것은 인용할 텍스트입니다.\n여러 줄도 가능합니다.");
  const [depth, setDepth] = useState(1);
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => {
    const prefix = "> ".repeat(depth);
    return text.split("\n").map((l) => prefix + l).join("\n");
  }, [text, depth]);
  const copy = async () => { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <label className="text-sm">깊이 ({depth})<input type="range" min="1" max="5" value={depth} onChange={(e) => setDepth(+e.target.value)} className="w-full" /></label>
      <textarea readOnly value={out} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
