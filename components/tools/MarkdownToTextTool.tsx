"use client";
import { useMemo, useState } from "react";

function mdToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*\n?|```/g, ""))
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "• ")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "[이미지: $1]")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*[-=]{3,}\s*$/gm, "");
}

export default function MarkdownToTextTool() {
  const [md, setMd] = useState("# 제목\n\n**굵은** 글자와 [링크](https://example.com), `코드`.\n\n- 항목");
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => mdToText(md), [md]);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="card space-y-3">
      <textarea value={md} onChange={(e) => setMd(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={text} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
