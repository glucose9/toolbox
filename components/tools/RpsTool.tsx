"use client";

import { useState } from "react";

const CHOICES = [
  { name: "rock", emoji: "✊", label: "바위" },
  { name: "paper", emoji: "🖐️", label: "보" },
  { name: "scissors", emoji: "✌️", label: "가위" },
];

type Result = "win" | "lose" | "draw";

function decide(p: string, c: string): Result {
  if (p === c) return "draw";
  if ((p === "rock" && c === "scissors") || (p === "paper" && c === "rock") || (p === "scissors" && c === "paper")) return "win";
  return "lose";
}

export default function RpsTool() {
  const [stats, setStats] = useState({ win: 0, lose: 0, draw: 0 });
  const [lastP, setLastP] = useState<string | null>(null);
  const [lastC, setLastC] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<Result | null>(null);

  const play = (player: string) => {
    const cIdx = crypto.getRandomValues(new Uint32Array(1))[0] % 3;
    const cpu = CHOICES[cIdx].name;
    const r = decide(player, cpu);
    setLastP(player); setLastC(cpu); setLastResult(r);
    setStats((s) => ({ ...s, [r]: s[r] + 1 }));
  };

  const findEmoji = (n: string) => CHOICES.find((c) => c.name === n)?.emoji || "";

  return (
    <div className="card space-y-4">
      <div className="flex justify-around gap-2">
        {CHOICES.map((c) => (
          <button key={c.name} onClick={() => play(c.name)} className="text-5xl p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:scale-110 transition">{c.emoji}</button>
        ))}
      </div>
      {lastP && lastC && lastResult && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="flex justify-around items-center">
            <div><div className="text-xs text-muted">나</div><div className="text-5xl">{findEmoji(lastP)}</div></div>
            <div className="text-3xl">vs</div>
            <div><div className="text-xs text-muted">컴퓨터</div><div className="text-5xl">{findEmoji(lastC)}</div></div>
          </div>
          <div className={`mt-3 text-xl font-bold ${lastResult === "win" ? "text-green-600" : lastResult === "lose" ? "text-red-600" : "text-muted"}`}>
            {lastResult === "win" ? "🎉 승리!" : lastResult === "lose" ? "😢 패배" : "🤝 무승부"}
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 text-sm text-center">
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded"><div className="text-xs text-muted">승</div><div className="font-bold">{stats.win}</div></div>
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded"><div className="text-xs text-muted">패</div><div className="font-bold">{stats.lose}</div></div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">무</div><div className="font-bold">{stats.draw}</div></div>
      </div>
      <button onClick={() => setStats({ win: 0, lose: 0, draw: 0 })} className="text-sm text-brand-600 hover:underline">통계 초기화</button>
    </div>
  );
}
