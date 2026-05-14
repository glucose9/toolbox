"use client";

import { useState } from "react";

const PRESETS: Record<string, string[]> = {
  한식: ["김치찌개", "된장찌개", "비빔밥", "불고기", "삼겹살", "갈비탕", "냉면", "칼국수", "순두부찌개", "제육볶음", "감자탕", "닭갈비"],
  중식: ["짜장면", "짬뽕", "탕수육", "마라탕", "마파두부", "양장피", "깐풍기"],
  일식: ["초밥", "라멘", "돈카츠", "우동", "규동", "오므라이스", "텐동"],
  양식: ["파스타", "피자", "스테이크", "햄버거", "샐러드", "리조또"],
  분식: ["떡볶이", "김밥", "라볶이", "쫄면", "어묵", "튀김"],
};

export default function LunchPickerTool() {
  const [category, setCategory] = useState("한식");
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  const pool = custom.trim() ? custom.split(/[\n,]/).map((s) => s.trim()).filter(Boolean) : PRESETS[category];

  const pick = () => {
    if (pool.length === 0) return;
    setSpinning(true);
    let frames = 0;
    const id = setInterval(() => {
      const idx = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length;
      setResult(pool[idx]);
      frames++;
      if (frames > 15) { clearInterval(id); setSpinning(false); }
    }, 60);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.keys(PRESETS).map((c) => (
          <button key={c} onClick={() => { setCategory(c); setCustom(""); }} className={`btn ${category === c && !custom ? "btn-primary" : "btn-secondary"}`}>{c}</button>
        ))}
      </div>
      <div>
        <label className="label">또는 직접 입력 (한 줄에 하나)</label>
        <textarea value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="원하는 메뉴들을 직접 입력하면 위 카테고리 대신 사용됩니다" className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
      </div>
      <button onClick={pick} disabled={spinning || pool.length === 0} className="btn btn-primary w-full disabled:opacity-50">{spinning ? "🎰 룰렛..." : "🍱 메뉴 추첨"}</button>
      {result && (
        <div className={`bg-brand-50 dark:bg-brand-900/20 border-2 border-brand-500 rounded p-8 text-center ${spinning ? "animate-pulse" : ""}`}>
          <div className="text-xs text-muted">오늘의 메뉴</div>
          <div className="text-4xl font-bold mt-2">{result}</div>
        </div>
      )}
      <div className="text-xs text-muted">{pool.length}개 메뉴 중 선택. 결과는 재미로만 쓰세요!</div>
    </div>
  );
}
