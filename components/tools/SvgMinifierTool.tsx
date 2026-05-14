"use client";

import { useMemo, useState } from "react";

function minifySvg(svg: string): string {
  return svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml.*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/g, "")
    .replace(/\s+xmlns:(inkscape|sodipodi)=["'][^"']*["']/g, "")
    .replace(/<(inkscape|sodipodi):[\s\S]*?<\/(inkscape|sodipodi):[^>]*>/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/g, "")
    .replace(/<title[\s\S]*?<\/title>/g, "")
    .replace(/<desc[\s\S]*?<\/desc>/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s*=\s*/g, "=")
    .trim();
}

export default function SvgMinifierTool() {
  const [input, setInput] = useState(`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">\n  <!-- a circle -->\n  <circle cx="50" cy="50" r="40" fill="blue" />\n</svg>`);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => minifySvg(input), [input]);
  const saved = input.length - output.length;
  const pct = input.length > 0 ? Math.round((saved / input.length) * 100) : 0;

  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y" />
      <textarea readOnly value={output} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y" />
      <div className="flex justify-between text-sm">
        <span className="text-muted">{input.length} → {output.length} ({pct}% 절감)</span>
        <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
      </div>
    </div>
  );
}
