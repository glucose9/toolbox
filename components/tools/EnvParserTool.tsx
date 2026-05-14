"use client";
import { useMemo, useState } from "react";

function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const m = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

export default function EnvParserTool() {
  const [text, setText] = useState(`# Database\nDB_HOST=localhost\nDB_PORT=5432\nDB_USER="admin"\nAPI_KEY='secret123'\n\n# App\nDEBUG=true\nPORT=3000`);
  const json = useMemo(() => JSON.stringify(parseEnv(text), null, 2), [text]);
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={json} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={() => navigator.clipboard.writeText(json)} className="btn btn-primary">JSON 복사</button>
    </div>
  );
}
