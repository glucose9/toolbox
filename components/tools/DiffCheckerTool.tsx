"use client";

import { useMemo, useState } from "react";
import { diffLines, diffWordsWithSpace } from "diff";

type Mode = "lines" | "words";

export default function DiffCheckerTool() {
  const [a, setA] = useState("Hello world\n좋아하는 색은 파랑\n공통 줄");
  const [b, setB] = useState("Hello there\n좋아하는 색은 빨강\n공통 줄\n추가 줄");
  const [mode, setMode] = useState<Mode>("lines");

  const parts = useMemo(() => {
    return mode === "lines" ? diffLines(a, b) : diffWordsWithSpace(a, b);
  }, [a, b, mode]);

  const added = parts.filter((p) => p.added).reduce((n, p) => n + (p.count ?? 0), 0);
  const removed = parts.filter((p) => p.removed).reduce((n, p) => n + (p.count ?? 0), 0);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">원본 (A)</label>
          <textarea
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">변경본 (B)</label>
          <textarea
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex gap-2">
          <button onClick={() => setMode("lines")} className={`btn ${mode === "lines" ? "btn-primary" : "btn-secondary"}`}>줄 단위</button>
          <button onClick={() => setMode("words")} className={`btn ${mode === "words" ? "btn-primary" : "btn-secondary"}`}>단어 단위</button>
        </div>
        <div className="text-muted">
          <span className="text-green-600">+{added}</span> · <span className="text-red-600">−{removed}</span>
        </div>
      </div>
      <div>
        <label className="label">차이</label>
        <pre className="w-full max-h-[28rem] overflow-auto p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono whitespace-pre-wrap">
          {parts.map((p, i) => (
            <span
              key={i}
              className={
                p.added
                  ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                  : p.removed
                  ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 line-through"
                  : "text-muted"
              }
            >
              {p.value}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
