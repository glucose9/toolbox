"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "wake" | "sleep";

function addMinutes(d: Date, m: number): Date {
  return new Date(d.getTime() + m * 60000);
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function SleepRecommendTool() {
  const t = useTranslations("toolUI.sleep-recommend");
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
      const d = addMinutes(base, dir * (90 * c + fallAsleep));
      return { cycles: c, hours: (90 * c) / 60, time: fmtTime(d) };
    });
  }, [time, mode]);

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMode("wake")} className={`btn flex-1 ${mode === "wake" ? "btn-primary" : "btn-secondary"}`}>{t("modeWake")}</button>
        <button onClick={() => setMode("sleep")} className={`btn flex-1 ${mode === "sleep" ? "btn-primary" : "btn-secondary"}`}>{t("modeSleep")}</button>
      </div>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg" />
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.cycles} className="flex justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
            <span>{t("cyclesAndHours", { cycles: r.cycles, hours: r.hours })}</span>
            <strong className="text-lg">{r.time}</strong>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
