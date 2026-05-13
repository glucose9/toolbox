"use client";

import { useMemo, useState } from "react";

function getByteLength(s: string) {
  return new Blob([s]).size;
}

export default function CounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\r?\n/).length : 0;
    const bytes = getByteLength(text);
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
    return { withSpaces, withoutSpaces, words, lines, bytes, paragraphs };
  }, [text]);

  const cards = [
    { label: "글자수 (공백 포함)", value: stats.withSpaces },
    { label: "글자수 (공백 제외)", value: stats.withoutSpaces },
    { label: "단어수", value: stats.words },
    { label: "줄 수", value: stats.lines },
    { label: "문단수", value: stats.paragraphs },
    { label: "바이트", value: stats.bytes },
  ];

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label">텍스트 입력</label>
          <textarea
            className="input min-h-[300px] font-mono text-sm"
            placeholder="여기에 텍스트를 붙여넣으세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <button onClick={() => setText("")} className="btn btn-secondary text-sm">
              지우기
            </button>
            <button
              onClick={() => navigator.clipboard.readText().then(setText).catch(() => {})}
              className="btn btn-secondary text-sm"
            >
              붙여넣기
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {cards.map((c) => (
            <div key={c.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{c.label}</span>
              <span className="text-2xl font-bold tabular-nums">{c.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
