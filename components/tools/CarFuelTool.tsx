"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const fmt = (n: number) => isFinite(n) ? Math.round(n).toLocaleString() : "—";

export default function CarFuelTool() {
  const t = useTranslations("toolUI.car-fuel");
  const [efficiency, setEfficiency] = useState(12); // km/L
  const [price, setPrice] = useState(1700); // 원/L
  const [distance, setDistance] = useState(30); // km/일

  const perKm = price / efficiency;
  const daily = distance * perKm;
  const monthly = daily * 30;
  const yearly = daily * 365;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="label">{t("efficiency")}</label><input type="number" step="0.1" value={efficiency} onChange={(e) => setEfficiency(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("fuelPrice")}</label><input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">{t("dailyDistance")}</label><input type="number" value={distance} onChange={(e) => setDistance(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">{t("perKm")}</div><div className="text-lg font-bold">{t("amount", { value: fmt(perKm) })}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">{t("daily")}</div><div className="text-lg font-bold">{t("amount", { value: fmt(daily) })}</div></div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center"><div className="text-xs text-muted">{t("monthly")}</div><div className="text-lg font-bold">{t("amount", { value: fmt(monthly) })}</div></div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center"><div className="text-xs text-muted">{t("yearly")}</div><div className="text-lg font-bold">{t("amount", { value: fmt(yearly) })}</div></div>
      </div>
    </div>
  );
}
