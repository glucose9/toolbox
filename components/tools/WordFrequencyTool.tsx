"use client";

import { useMemo, useState } from "react";

const KOR_STOPWORDS = new Set(["은", "는", "이", "가", "을", "를", "에", "의", "도", "와", "과", "로", "으로", "에서", "께서", "한테", "에게", "라고", "이라고", "라는", "면", "이면", "고", "이고", "만", "조차", "마저", "까지", "부터", "그리고", "그러나", "하지만", "또한", "또는", "그", "이", "저", "것", "수", "더", "다", "잘", "안", "못", "있다", "없다", "하다", "되다", "이다"]);
const ENG_STOPWORDS = new Set(["the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be", "been", "being", "to", "of", "in", "on", "at", "by", "for", "with", "as", "this", "that", "it", "its", "i", "you", "he", "she", "we", "they", "his", "her", "their", "our", "my", "your"]);

type Mode = "words" | "chars";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"'(){}\[\]<>\/\\|`~@#$%^&*+=]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function countChars(text: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const c of text) {
    if (/\s/.test(c)) continue;
    map.set(c, (map.get(c) || 0) + 1);
  }
  return map;
}

export default function WordFrequencyTool() {
  const [text, setText] = useState("한글 한글 단어 빈도 분석 도구입니다. 단어 단어 단어가 많이 등장하면 빈도가 높아집니다.");
  const [mode, setMode] = useState<Mode>("words");
  const [removeStopwords, setRemoveStopwords] = useState(true);
  const [minLen, setMinLen] = useState(2);

  const sorted = useMemo(() => {
    if (mode === "chars") {
      const map = countChars(text);
      return [...map.entries()].sort((a, b) => b[1] - a[1]);
    }
    const tokens = tokenize(text);
    const map = new Map<string, number>();
    for (const t of tokens) {
      if (t.length < minLen) continue;
      if (removeStopwords && (KOR_STOPWORDS.has(t) || ENG_STOPWORDS.has(t))) continue;
      map.set(t, (map.get(t) || 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [text, mode, removeStopwords, minLen]);

  const total = sorted.reduce((s, [, c]) => s + c, 0);
  const maxCount = sorted[0]?.[1] || 1;

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y"
      />

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex gap-2">
          <button onClick={() => setMode("words")} className={`btn ${mode === "words" ? "btn-primary" : "btn-secondary"}`}>단어</button>
          <button onClick={() => setMode("chars")} className={`btn ${mode === "chars" ? "btn-primary" : "btn-secondary"}`}>글자</button>
        </div>
        {mode === "words" && (
          <>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={removeStopwords} onChange={(e) => setRemoveStopwords(e.target.checked)} />
              불용어 제거
            </label>
            <label>
              최소 길이
              <input type="number" min="1" max="10" value={minLen} onChange={(e) => setMinLen(+e.target.value)} className="ml-1 w-12 px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
          </>
        )}
      </div>

      <div className="text-xs text-muted">고유 {sorted.length}개 · 전체 {total.toLocaleString()}개</div>

      <div className="max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-3 py-2 text-left">{mode === "words" ? "단어" : "글자"}</th>
              <th className="px-3 py-2 text-right">횟수</th>
              <th className="px-3 py-2 text-right">비율</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sorted.slice(0, 200).map(([word, count]) => (
              <tr key={word}>
                <td className="px-3 py-1.5 font-mono">{word}</td>
                <td className="px-3 py-1.5 text-right tabular-nums">{count}</td>
                <td className="px-3 py-1.5 text-right text-xs text-muted">{((count / total) * 100).toFixed(1)}%</td>
                <td className="px-3 py-1.5 w-32">
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded">
                    <div className="h-full bg-brand-500 rounded" style={{ width: `${(count / maxCount) * 100}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
