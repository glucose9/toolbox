"use client";

import { useState } from "react";

export default function TextDedupeTool() {
  const [text, setText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreSpace, setIgnoreSpace] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = text ? text.split(/\r?\n/) : [];
  const seen = new Set<string>();
  let removed = 0;
  const result = lines
    .filter((line) => {
      if (removeEmpty && line.trim() === "") return false;
      let key = line;
      if (ignoreCase) key = key.toLowerCase();
      if (ignoreSpace) key = key.replace(/\s+/g, "");
      if (seen.has(key)) {
        removed++;
        return false;
      }
      seen.add(key);
      return true;
    })
    .join("\n");

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="한 줄에 하나씩 입력하세요"
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
          대소문자 무시
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={ignoreSpace} onChange={(e) => setIgnoreSpace(e.target.checked)} />
          공백 무시
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          빈 줄 제거
        </label>
      </div>
      <textarea
        readOnly
        value={result}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="text-xs text-muted">
        원본 {lines.length}줄 → 고유 {lines.length - removed}줄 ({removed}줄 제거됨)
      </div>
      <button onClick={copy} disabled={!result} className="btn btn-primary disabled:opacity-50">
        {copied ? "✓ 복사됨" : "복사"}
      </button>
    </div>
  );
}
