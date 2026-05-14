"use client";

import { useMemo, useState } from "react";

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}초`;
  return `${m}분 ${s}초`;
}

export default function ReadingTimeTool() {
  const [text, setText] = useState("");
  const [speakingRate, setSpeakingRate] = useState(300); // chars/min (Korean)
  const [readingRate, setReadingRate] = useState(500);   // chars/min

  const { chars, charsNoSpace, words, speakingSec, readingSec } = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      chars,
      charsNoSpace,
      words,
      speakingSec: (chars / speakingRate) * 60,
      readingSec: (chars / readingRate) * 60,
    };
  }, [text, speakingRate, readingRate]);

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="원고나 글을 붙여넣으세요" className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">글자수</div><div className="text-xl font-bold">{chars.toLocaleString()}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">공백 제외</div><div className="text-xl font-bold">{charsNoSpace.toLocaleString()}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 text-center"><div className="text-xs text-muted">단어</div><div className="text-xl font-bold">{words.toLocaleString()}</div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <label>발표 속도 ({speakingRate}자/분)<input type="range" min="100" max="500" step="20" value={speakingRate} onChange={(e) => setSpeakingRate(+e.target.value)} className="w-full" /></label>
        </div>
        <div>
          <label>묵독 속도 ({readingRate}자/분)<input type="range" min="200" max="900" step="20" value={readingRate} onChange={(e) => setReadingRate(+e.target.value)} className="w-full" /></label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-4 text-center">
          <div className="text-xs text-muted">발표 시간</div>
          <div className="text-2xl font-bold mt-1">{fmtTime(speakingSec)}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
          <div className="text-xs text-muted">묵독 시간</div>
          <div className="text-2xl font-bold mt-1">{fmtTime(readingSec)}</div>
        </div>
      </div>
    </div>
  );
}
