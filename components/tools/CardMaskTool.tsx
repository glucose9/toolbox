"use client";
import { useMemo, useState } from "react";

function mask(text: string): string {
  return text
    .replace(/\b(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})[-\s]?(\d{4})\b/g, "$1-****-****-$4")
    .replace(/\b(\d{6})[-\s]?(\d{7})\b/g, "$1-*******")
    .replace(/\b(01[016-9])[-\s]?(\d{3,4})[-\s]?(\d{4})\b/g, "$1-****-$3")
    .replace(/\b(0[2-6][0-5]?)[-\s]?(\d{3,4})[-\s]?(\d{4})\b/g, "$1-****-$3")
    .replace(/([a-zA-Z0-9._%+-]{2})[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, "$1***$2");
}

export default function CardMaskTool() {
  const [text, setText] = useState("카드 1234-5678-9012-3456\n주민 990101-1234567\n전화 010-1234-5678\n이메일 alice@example.com");
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => mask(text), [text]);
  const copy = async () => { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={out} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
