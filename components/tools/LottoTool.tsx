"use client";

import { useState } from "react";

function pickSix(exclude: Set<number>): number[] {
  const pool: number[] = [];
  for (let i = 1; i <= 45; i++) if (!exclude.has(i)) pool.push(i);
  const out: number[] = [];
  while (out.length < 6 && pool.length > 0) {
    const rand = crypto.getRandomValues(new Uint32Array(1))[0];
    const idx = rand % pool.length;
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out.sort((a, b) => a - b);
}

function ballColor(n: number): string {
  if (n <= 10) return "bg-yellow-400 text-yellow-900";
  if (n <= 20) return "bg-blue-400 text-white";
  if (n <= 30) return "bg-red-400 text-white";
  if (n <= 40) return "bg-gray-500 text-white";
  return "bg-green-500 text-white";
}

export default function LottoTool() {
  const [games, setGames] = useState(5);
  const [excludeStr, setExcludeStr] = useState("");
  const [results, setResults] = useState<number[][]>(() =>
    Array.from({ length: 5 }, () => pickSix(new Set()))
  );

  const parseExclude = (): Set<number> => {
    const out = new Set<number>();
    for (const part of excludeStr.split(/[\s,]+/)) {
      const n = parseInt(part, 10);
      if (n >= 1 && n <= 45) out.add(n);
    }
    return out;
  };

  const generate = () => {
    const exclude = parseExclude();
    if (exclude.size > 39) return;
    const n = Math.max(1, Math.min(50, games));
    setResults(Array.from({ length: n }, () => pickSix(exclude)));
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-end gap-3 text-sm">
        <label>
          게임 수
          <input
            type="number"
            min="1"
            max="50"
            value={games}
            onChange={(e) => setGames(parseInt(e.target.value) || 1)}
            className="ml-2 w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </label>
        <label className="flex-1 min-w-40">
          제외할 번호 (선택)
          <input
            type="text"
            value={excludeStr}
            onChange={(e) => setExcludeStr(e.target.value)}
            placeholder="예: 7, 13, 23"
            className="ml-2 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 w-full mt-1"
          />
        </label>
        <button onClick={generate} className="btn btn-primary">🎲 추첨</button>
      </div>

      <div className="space-y-2">
        {results.map((game, i) => (
          <div key={i} className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded">
            <div className="text-xs text-muted w-12">#{i + 1}</div>
            <div className="flex gap-1.5 flex-wrap">
              {game.map((n) => (
                <span
                  key={n}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold ${ballColor(n)}`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted">
        Web Crypto의 안전한 난수로 추첨합니다. 어떤 조합이든 당첨 확률은 동일합니다 — 재미로만 쓰세요.
      </div>
    </div>
  );
}
