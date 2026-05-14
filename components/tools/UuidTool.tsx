"use client";

import { useState } from "react";

function uuidv4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UuidTool() {
  const [count, setCount] = useState(5);
  const [hyphens, setHyphens] = useState(true);
  const [upper, setUpper] = useState(false);
  const [list, setList] = useState<string[]>(() => Array.from({ length: 5 }, () => uuidv4()));
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const n = Math.max(1, Math.min(1000, count));
    setList(Array.from({ length: n }, () => uuidv4()));
  };

  const format = (id: string) => {
    let s = hyphens ? id : id.replace(/-/g, "");
    if (upper) s = s.toUpperCase();
    return s;
  };

  const copy = async () => {
    await navigator.clipboard.writeText(list.map(format).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          개수
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} />
          하이픈
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />
          대문자
        </label>
        <button onClick={generate} className="btn btn-primary">생성</button>
        <button onClick={copy} className="btn btn-secondary">{copied ? "✓ 복사됨" : "전체 복사"}</button>
      </div>
      <textarea
        readOnly
        value={list.map(format).join("\n")}
        className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
    </div>
  );
}
