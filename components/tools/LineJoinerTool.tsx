"use client";

import { useMemo, useState } from "react";

export default function LineJoinerTool() {
  const [text, setText] = useState("apple\nbanana\ncherry");
  const [sep, setSep] = useState(", ");
  const [quote, setQuote] = useState<"none" | "single" | "double">("none");
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [trim, setTrim] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let lines = text.split(/\r?\n/);
    if (trim) lines = lines.map((l) => l.trim());
    if (removeEmpty) lines = lines.filter(Boolean);
    if (quote === "single") lines = lines.map((l) => `'${l.replace(/'/g, "\\'")}'`);
    else if (quote === "double") lines = lines.map((l) => `"${l.replace(/"/g, '\\"')}"`);
    return lines.join(sep);
  }, [text, sep, quote, removeEmpty, trim]);

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono" />
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>구분자<input type="text" value={sep} onChange={(e) => setSep(e.target.value)} placeholder=", " className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1" /></label>
        <label>따옴표<select value={quote} onChange={(e) => setQuote(e.target.value as typeof quote)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mt-1"><option value="none">없음</option><option value="single">홑따옴표 '</option><option value="double">쌍따옴표 "</option></select></label>
        <label className="flex items-center gap-1"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> 줄 양끝 공백 제거</label>
        <label className="flex items-center gap-1"><input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} /> 빈 줄 제거</label>
      </div>
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono break-all" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
