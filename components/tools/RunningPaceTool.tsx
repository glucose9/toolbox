"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function fmtTime(sec: number): string {
  if (!isFinite(sec) || sec <= 0) return "—";
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60);
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` : `${m}:${s.toString().padStart(2, "0")}`;
}

function fmtPace(secPerKm: number): string {
  if (!isFinite(secPerKm) || secPerKm <= 0) return "—";
  const m = Math.floor(secPerKm / 60), s = Math.floor(secPerKm % 60);
  return `${m}'${s.toString().padStart(2, "0")}"`;
}

export default function RunningPaceTool() {
  const t = useTranslations("toolUI.running-pace");
  const [distance, setDistance] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(50);
  const [seconds, setSeconds] = useState(0);

  const totalSec = hours * 3600 + minutes * 60 + seconds;
  const pace = totalSec / distance;
  const kmh = (distance / totalSec) * 3600;

  // Riegel formula for prediction
  const predict = (newDist: number) => totalSec * Math.pow(newDist / distance, 1.06);

  const PRESETS = [
    { label: "5K", dist: 5 },
    { label: "10K", dist: 10 },
    { label: t("half"), dist: 21.0975 },
    { label: t("marathon"), dist: 42.195 },
  ];

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("distance")}</label>
        <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      </div>
      <div>
        <label className="label">{t("time")}</label>
        <div className="grid grid-cols-3 gap-2">
          <input type="number" min="0" value={hours} onChange={(e) => setHours(+e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder={t("hourPlaceholder")} />
          <input type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(+e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder={t("minutePlaceholder")} />
          <input type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(+e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder={t("secondPlaceholder")} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("avgPace")}</div>
          <div className="text-2xl font-bold mt-1">{fmtPace(pace)}/km</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("avgSpeed")}</div>
          <div className="text-2xl font-bold mt-1">{kmh.toFixed(1)} km/h</div>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">{t("predictions")}</div>
        <div className="space-y-1">
          {PRESETS.map((p) => (
            <div key={p.label} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded text-sm">
              <span>{p.label} ({p.dist}km)</span>
              <span className="font-mono"><strong>{fmtTime(predict(p.dist))}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
