"use client";
import { useMemo, useState } from "react";

type Mode = "wake" | "sleep";

function addMinutes(d: Date, m: number): Date {
  return new Date(d.getTime() + m * 60000);
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function SleepRecommendTool() {
  const [mode, setMode] = useState<Mode>("wake");
  const [time, setTime] = useState("23:00");

  const results = useMemo(() => {
    const [h, m] = time.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return [];
    const base = new Date();
    base.setHours(h, m, 0, 0);
    const fallAsleep = 15; // 잠드는 데 15분
    const cycles = [3, 4, 5, 6];
    return cycles.map((c) => {
      const dir = mode === "wake" ? 1 : -1;
      const d = addMinutes(base, dir * (90 * c + (mode === "sleep" ? -fallAsleep : fallAsleep)));
      return { cycles: c, hours: (90 * c) / 60, time: fmtTime(d) };
    });
  }, [time, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("wake")} className={`btn flex-1 ${mode === "wake" ? "btn-primary" : "btn-secondary"}`}>지금 자면 → 일어날 시간</button>
        <button onClick={() => setMode("sleep")} className={`btn flex-1 ${mode === "sleep" ? "btn-primary" : "btn-secondary"}`}>일어날 시간 → 자야 할 시간</button>
      </div>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg" />
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.cycles} className="flex justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
            <span>{r.cycles}사이클 ({r.hours}시간)</span>
            <strong className="text-lg">{r.time}</strong>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">한 사이클은 90분. 잠드는 데 15분 가정. 사이클이 끝날 때 일어나면 가장 개운합니다.</div>
    </div>
  );
}
