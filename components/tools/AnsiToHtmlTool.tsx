"use client";

import { useMemo, useState } from "react";

const COLORS = ["#000","#cd0000","#00cd00","#cdcd00","#0000ee","#cd00cd","#00cdcd","#e5e5e5","#7f7f7f","#ff0000","#00ff00","#ffff00","#5c5cff","#ff00ff","#00ffff","#ffffff"];

function ansiToHtml(input: string): string {
  let out = '<pre style="background:#000;color:#e5e5e5;padding:1em;font-family:monospace;white-space:pre-wrap">';
  let openSpan = false;
  // eslint-disable-next-line no-control-regex
  const parts = input.split(/\[([\d;]*)m/);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      out += parts[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
      if (openSpan) { out += "</span>"; openSpan = false; }
      const codes = parts[i].split(";").map(Number);
      if (codes.length === 1 && codes[0] === 0) continue;
      const styles: string[] = [];
      for (const c of codes) {
        if (c >= 30 && c <= 37) styles.push(`color:${COLORS[c - 30]}`);
        else if (c >= 90 && c <= 97) styles.push(`color:${COLORS[c - 90 + 8]}`);
        else if (c >= 40 && c <= 47) styles.push(`background:${COLORS[c - 40]}`);
        else if (c === 1) styles.push("font-weight:bold");
        else if (c === 3) styles.push("font-style:italic");
        else if (c === 4) styles.push("text-decoration:underline");
      }
      if (styles.length) {
        out += `<span style="${styles.join(";")}">`;
        openSpan = true;
      }
    }
  }
  if (openSpan) out += "</span>";
  out += "</pre>";
  return out;
}

export default function AnsiToHtmlTool() {
  const [input, setInput] = useState("[31mRed[0m [1;32mBold green[0m [4;33mUnderlined yellow[0m");
  const html = useMemo(() => ansiToHtml(input), [input]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="ANSI escape sequences (예: \\u001b[31m...)" className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y" />
      <label className="label">미리보기</label>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <label className="label">HTML</label>
      <textarea readOnly value={html} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "HTML 복사"}</button>
    </div>
  );
}
