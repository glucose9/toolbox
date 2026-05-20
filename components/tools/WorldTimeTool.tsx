"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type City = { key: string; tz: string };

const ALL_CITIES: City[] = [
  { key: "seoul", tz: "Asia/Seoul" },
  { key: "tokyo", tz: "Asia/Tokyo" },
  { key: "beijing", tz: "Asia/Shanghai" },
  { key: "singapore", tz: "Asia/Singapore" },
  { key: "bangkok", tz: "Asia/Bangkok" },
  { key: "dubai", tz: "Asia/Dubai" },
  { key: "london", tz: "Europe/London" },
  { key: "paris", tz: "Europe/Paris" },
  { key: "berlin", tz: "Europe/Berlin" },
  { key: "moscow", tz: "Europe/Moscow" },
  { key: "newyork", tz: "America/New_York" },
  { key: "la", tz: "America/Los_Angeles" },
  { key: "chicago", tz: "America/Chicago" },
  { key: "toronto", tz: "America/Toronto" },
  { key: "sf", tz: "America/Los_Angeles" },
  { key: "sydney", tz: "Australia/Sydney" },
  { key: "auckland", tz: "Pacific/Auckland" },
  { key: "honolulu", tz: "Pacific/Honolulu" },
  { key: "saopaulo", tz: "America/Sao_Paulo" },
];

const DEFAULTS = ["seoul", "newyork", "london", "tokyo"];

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
  const t = useTranslations("toolUI.world-time");
  const locale = useLocale();
  const [cities, setCities] = useState<string[]>(DEFAULTS);
  const [now, setNow] = useState(new Date());

  const dateLocale = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US";

  function formatTime(d: Date, tz: string) {
    return new Intl.DateTimeFormat(dateLocale, { timeZone: tz, dateStyle: "medium", timeStyle: "medium", hour12: false }).format(d);
  }

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const add = (key: string) => {
    if (!cities.includes(key)) setCities([...cities, key]);
  };
  const remove = (key: string) => setCities(cities.filter((c) => c !== key));

  const available = ALL_CITIES.filter((c) => !cities.includes(c.key));
  const seoulOffset = (() => {
    const seoul = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    return seoul.getTime();
  })();

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        {cities.map((key) => {
          const city = ALL_CITIES.find((c) => c.key === key);
          if (!city) return null;
          const cityNow = new Date(now.toLocaleString("en-US", { timeZone: city.tz }));
          const diffH = Math.round((cityNow.getTime() - seoulOffset) / (1000 * 60 * 60));
          return (
            <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div>
                <div className="font-semibold">{t(`city.${key}`)}</div>
                <div className="text-xs text-muted">{offset(city.tz)}{key !== "seoul" && ` · ${t("seoulDiff", { sign: diffH >= 0 ? "+" : "", hours: diffH })}`}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg">{formatTime(now, city.tz)}</div>
              </div>
              <button onClick={() => remove(key)} className="text-red-600 hover:underline ml-3 text-sm">×</button>
            </div>
          );
        })}
      </div>

      {available.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-1">{t("addCity")}</div>
          <div className="flex flex-wrap gap-1.5">
            {available.map((c) => (
              <button key={c.key} onClick={() => add(c.key)} className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                + {t(`city.${c.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
