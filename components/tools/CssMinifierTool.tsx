"use client";

import { useMemo, useState } from "react";

function minify(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export default function CssMinifierTool() {
  const [input, setInput] = useState(`/* sample */\n.btn {\n  display: inline-block;\n  padding: 8px 12px;\n  border-radius: 4px;\n  background: #3b82f6;\n  color: white;\n}\n\n.btn:hover {\n  background: #2563eb;\n}`);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => minify(input), [input]);
  const saved = input.length - output.length;
  const pct = input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{input.length} → {output.length} ({pct}% 절감)</span>
        <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
      </div>
    </div>
  );
}
