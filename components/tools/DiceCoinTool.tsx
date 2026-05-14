"use client";

import { useState } from "react";

const DICE = [4, 6, 8, 10, 12, 20, 100];

function rand(max: number): number {
  return (crypto.getRandomValues(new Uint32Array(1))[0] % max) + 1;
}

export default function DiceCoinTool() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [coin, setCoin] = useState("");

  const roll = () => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(rand(sides));
    setResults(out);
  };

  const flip = () => setCoin(rand(2) === 1 ? "앞면 (H)" : "뒷면 (T)");

  const sum = results.reduce((s, n) => s + n, 0);

  return (
    <div className="card space-y-4">
      <div>
        <label className="label">주사위 면</label>
        <div className="flex flex-wrap gap-1">
          {DICE.map((s) => (
            <button key={s} onClick={() => setSides(s)} className={`btn ${sides === s ? "btn-primary" : "btn-secondary"}`}>D{s}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">개수</label><input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <button onClick={roll} className="btn btn-primary self-end">🎲 굴리기</button>
      </div>
      {results.length > 0 && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {results.map((r, i) => (
              <span key={i} className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center text-xl font-bold border border-gray-200 dark:border-gray-700">{r}</span>
            ))}
          </div>
          {results.length > 1 && <div className="text-sm text-muted">합: <strong>{sum}</strong></div>}
        </div>
      )}
      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="space-y-2">
        <button onClick={flip} className="btn btn-primary w-full">🪙 동전 던지기</button>
        {coin && <div className="text-center text-2xl font-bold">{coin}</div>}
      </div>
    </div>
  );
}
