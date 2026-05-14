"use client";
import { useState } from "react";

function score(pw: string): number {
  if (!pw) return 0;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  const e = pool > 0 ? Math.log2(pool) * pw.length : 0;
  return Math.min(100, Math.round((e / 80) * 100));
}

function color(s: number): string {
  if (s < 30) return "bg-red-500";
  if (s < 50) return "bg-orange-500";
  if (s < 70) return "bg-yellow-500";
  if (s < 85) return "bg-lime-500";
  return "bg-green-500";
}

export default function PasswordComparatorTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const sa = score(a), sb = score(b);
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {[{ v: a, set: setA, s: sa, n: "A" }, { v: b, set: setB, s: sb, n: "B" }].map((x) => (
          <div key={x.n} className="space-y-2">
            <label className="label">비밀번호 {x.n}</label>
            <input type="text" value={x.v} onChange={(e) => x.set(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" />
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden"><div className={`h-full ${color(x.s)}`} style={{ width: `${x.s}%` }} /></div>
            <div className="text-sm text-center">{x.s}/100</div>
          </div>
        ))}
      </div>
      {a && b && (
        <div className="text-center bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3">
          <strong>{sa === sb ? "동등" : sa > sb ? "A" : "B"}</strong>{sa !== sb ? "가 더 안전합니다" : "한 강도"}
        </div>
      )}
    </div>
  );
}
