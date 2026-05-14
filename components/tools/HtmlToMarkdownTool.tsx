"use client";
import { useState } from "react";

export default function HtmlToMarkdownTool() {
  const [html, setHtml] = useState(`<h1>제목</h1>\n<p>본문 <strong>굵게</strong> <a href="https://example.com">링크</a></p>\n<ul><li>항목 1</li><li>항목 2</li></ul>`);
  const [md, setMd] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const convert = async () => {
    setBusy(true);
    try {
      const TurndownService = (await import("turndown")).default;
      const ts = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
      setMd(ts.turndown(html));
    } finally { setBusy(false); }
  };

  const copy = async () => { await navigator.clipboard.writeText(md); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={convert} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "변환 중..." : "변환"}</button>
      <textarea readOnly value={md} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} disabled={!md} className="btn btn-secondary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
