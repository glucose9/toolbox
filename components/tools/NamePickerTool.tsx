"use client";

import { useState } from "react";

function pick(pool: string[], n: number, allowRepeat: boolean): string[] {
  if (pool.length === 0) return [];
  const out: string[] = [];
  const working = allowRepeat ? [...pool] : pool.slice();
  for (let i = 0; i < n; i++) {
    if (!allowRepeat && working.length === 0) break;
    const rand = crypto.getRandomValues(new Uint32Array(1))[0];
    const idx = rand % working.length;
    out.push(working[idx]);
    if (!allowRepeat) working.splice(idx, 1);
  }
  return out;
}

export default function NamePickerTool() {
  const [input, setInput] = useState("김민준\n이서연\n박지호\n최예린\n정도윤\n강유나");
  const [count, setCount] = useState(2);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);

  const pool = input.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

  const draw = () => {
    if (pool.length === 0) return;
    setSpinning(true);
    let frames = 0;
    const id = setInterval(() => {
      setResults(pick(pool, count, true));
      frames++;
      if (frames > 12) {
        clearInterval(id);
        setResults(pick(pool, count, allowRepeat));
        setSpinning(false);
      }
    }, 60);
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">이름 / 항목 (한 줄에 하나)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y"
        />
        <div className="text-xs text-muted mt-1">{pool.length}명 / {pool.length}개</div>
      </div>

      <div className="flex flex-wrap gap-3 items-end text-sm">
        <label>
          뽑을 개수
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(+e.target.value)} className="ml-2 w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={allowRepeat} onChange={(e) => setAllowRepeat(e.target.checked)} />
          중복 허용
        </label>
        <button onClick={draw} disabled={pool.length === 0 || spinning} className="btn btn-primary disabled:opacity-50">🎲 추첨</button>
      </div>

      {results.length > 0 && (
        <div className={`bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 ${spinning ? "animate-pulse" : ""}`}>
          <div className="text-xs text-muted mb-2">당첨 ({results.length}개)</div>
          <div className="flex flex-wrap gap-2">
            {results.map((r, i) => (
              <span key={i} className="px-3 py-1.5 bg-brand-600 text-white rounded font-medium">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
