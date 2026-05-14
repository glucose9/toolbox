"use client";
import { useMemo, useState } from "react";

function rot(t: string, s: number): string {
  return Array.from(t).map((c) => {
    if (/[A-Z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 65 + s) % 26) + 65);
    if (/[a-z]/.test(c)) return String.fromCharCode(((c.charCodeAt(0) - 97 + s) % 26) + 97);
    return c;
  }).join("");
}

export default function RotAllTool() {
  const [text, setText] = useState("Khoor Zruog");
  const results = useMemo(() => Array.from({ length: 25 }, (_, i) => ({ shift: i + 1, result: rot(text, i + 1) })), [text]);
  return (
    <div className="card space-y-3">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
      <div className="border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {results.map((r) => (
          <div key={r.shift} className="flex items-center gap-3 px-3 py-1.5 text-sm">
            <span className="text-xs text-muted w-12">ROT{r.shift}</span>
            <span className="font-mono flex-1 break-all">{r.result}</span>
            <button onClick={() => navigator.clipboard.writeText(r.result)} className="text-xs text-brand-600 hover:underline">복사</button>
          </div>
        ))}
      </div>
    </div>
  );
}
