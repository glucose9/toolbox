"use client";

import { useState, useMemo } from "react";

export default function BibSortTool() {
  const [input, setInput] = useState(`Smith, J. (2020). A study on cognition. Journal of Psychology, 12(3), 45-67.

Kim, S. (2019). 학습 동기 연구. 교육심리학 연구, 33(2), 11-25.

Anderson, P., & Lee, M. (2021). Memory and attention. Nature Cognition, 5, 100-115.

Smith, J. (2020). A study on cognition. Journal of Psychology, 12(3), 45-67.`);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [dedupe, setDedupe] = useState(true);
  const [hanging, setHanging] = useState(true);

  const sorted = useMemo(() => {
    let lines = input
      .split(/\n\s*\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (dedupe) lines = Array.from(new Set(lines));
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (order === "desc") lines.reverse();
    return lines;
  }, [input, order, dedupe]);

  const output = sorted.join("\n\n");
  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">참고문헌 (한 항목당 빈 줄로 구분)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" checked={order === "asc"} onChange={() => setOrder("asc")} /> 가나다·A→Z
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" checked={order === "desc"} onChange={() => setOrder("desc")} /> 역순
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} /> 중복 제거
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={hanging} onChange={(e) => setHanging(e.target.checked)} /> Hanging indent 미리보기
        </label>
        <span className="text-xs text-muted self-center ml-auto">{sorted.length}개 항목</span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">정렬 결과</label>
          <button onClick={copy} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-950 text-sm space-y-2 max-h-96 overflow-y-auto">
          {sorted.map((line, i) => (
            <div key={i} style={hanging ? { paddingLeft: "2em", textIndent: "-2em" } : {}}>
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        한글은 가나다 순, 영문은 알파벳 순으로 자연 정렬됩니다 (Intl.Collator 기반). Hanging indent는 워드/한글에서 2em 들여쓰기로 적용하면 됩니다.
      </div>
    </div>
  );
}
