"use client";
import { useMemo, useState } from "react";

function htmlToText(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.querySelectorAll("script, style").forEach((el) => el.remove());
  return (div.innerText || div.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}

export default function HtmlToTextTool() {
  const [html, setHtml] = useState(`<h1>제목</h1>\n<p>본문 <a href="#">링크</a>.</p>\n<script>alert(1)</script>`);
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => (typeof window === "undefined" ? "" : htmlToText(html)), [html]);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="card space-y-3">
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={text} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
