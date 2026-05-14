"use client";

import { useEffect, useState } from "react";

type City = { name: string; tz: string };

const ALL_CITIES: City[] = [
  { name: "서울", tz: "Asia/Seoul" },
  { name: "도쿄", tz: "Asia/Tokyo" },
  { name: "베이징", tz: "Asia/Shanghai" },
  { name: "싱가포르", tz: "Asia/Singapore" },
  { name: "방콕", tz: "Asia/Bangkok" },
  { name: "두바이", tz: "Asia/Dubai" },
  { name: "런던", tz: "Europe/London" },
  { name: "파리", tz: "Europe/Paris" },
  { name: "베를린", tz: "Europe/Berlin" },
  { name: "모스크바", tz: "Europe/Moscow" },
  { name: "뉴욕", tz: "America/New_York" },
  { name: "LA", tz: "America/Los_Angeles" },
  { name: "시카고", tz: "America/Chicago" },
  { name: "토론토", tz: "America/Toronto" },
  { name: "샌프란시스코", tz: "America/Los_Angeles" },
  { name: "시드니", tz: "Australia/Sydney" },
  { name: "오클랜드", tz: "Pacific/Auckland" },
  { name: "호놀룰루", tz: "Pacific/Honolulu" },
  { name: "상파울루", tz: "America/Sao_Paulo" },
];

const DEFAULTS = ["서울", "뉴욕", "런던", "도쿄"];

function formatTime(now: Date, tz: string) {
  const d = new Intl.DateTimeFormat("ko-KR", { timeZone: tz, dateStyle: "medium", timeStyle: "medium", hour12: false }).format(now);
  return d;
}

function offset(tz: string): string {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const diff = (local.getTime() - utc.getTime()) / (1000 * 60 * 60);
  const sign = diff >= 0 ? "+" : "-";
  const abs = Math.abs(diff);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export default function WorldTimeTool() {
  const [cities, setCities] = useState<string[]>(DEFAULTS);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const add = (name: string) => {
    if (!cities.includes(name)) setCities([...cities, name]);
  };
  const remove = (name: string) => setCities(cities.filter((c) => c !== name));

  const available = ALL_CITIES.filter((c) => !cities.includes(c.name));
  const seoulOffset = (() => {
    const seoul = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    return seoul.getTime();
  })();

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        {cities.map((name) => {
          const city = ALL_CITIES.find((c) => c.name === name);
          if (!city) return null;
          const cityNow = new Date(now.toLocaleString("en-US", { timeZone: city.tz }));
          const diffH = Math.round((cityNow.getTime() - seoulOffset) / (1000 * 60 * 60));
          return (
            <div key={name} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div>
                <div className="font-semibold">{city.name}</div>
                <div className="text-xs text-muted">{offset(city.tz)}{name !== "서울" && ` · 서울 ${diffH >= 0 ? "+" : ""}${diffH}시간`}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg">{formatTime(now, city.tz)}</div>
              </div>
              <button onClick={() => remove(name)} className="text-red-600 hover:underline ml-3 text-sm">×</button>
            </div>
          );
        })}
      </div>

      {available.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">도시 추가</div>
          <div className="flex flex-wrap gap-1.5">
            {available.map((c) => (
              <button key={c.name} onClick={() => add(c.name)} className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                + {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
