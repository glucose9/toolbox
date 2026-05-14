"use client";
import { useMemo, useState } from "react";

export default function TextStatsTool() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const noSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.match(/[.!?。!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const avgWordLen = words > 0 ? noSpace / words : 0;
    const avgSentenceLen = sentences > 0 ? words / sentences : 0;
    // Simplified Flesch (English approximation)
    const flesch = sentences > 0 && words > 0 ? 206.835 - 1.015 * (words / sentences) - 84.6 * (noSpace / words / 4) : 0;
    return { chars, noSpace, words, sentences, paragraphs, avgWordLen, avgSentenceLen, flesch };
  }, [text]);
  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="텍스트를 입력하세요" className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">글자</div><div className="text-xl font-bold">{stats.chars.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">공백 제외</div><div className="text-xl font-bold">{stats.noSpace.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">단어</div><div className="text-xl font-bold">{stats.words.toLocaleString()}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">문장</div><div className="text-xl font-bold">{stats.sentences}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">단락</div><div className="text-xl font-bold">{stats.paragraphs}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">평균 단어 길이</div><div className="text-xl font-bold">{stats.avgWordLen.toFixed(1)}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">평균 문장 길이</div><div className="text-xl font-bold">{stats.avgSentenceLen.toFixed(1)}</div></div>
        <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded"><div className="text-xs text-muted">가독성 (영어)</div><div className="text-xl font-bold">{stats.flesch.toFixed(0)}</div></div>
      </div>
    </div>
  );
}
