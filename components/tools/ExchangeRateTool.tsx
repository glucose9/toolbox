"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ExchangeRateTool() {
  const t = useTranslations("toolUI.exchange-rate");
  const [rate, setRate] = useState(1380); // 1 USD = ? KRW
  const [usd, setUsd] = useState(100);
  const [krw, setKrw] = useState(138000);
  const [active, setActive] = useState<"usd" | "krw">("usd");

  const updateUsd = (v: number) => { setUsd(v); setKrw(v * rate); };
  const updateKrw = (v: number) => { setKrw(v); if (rate > 0) setUsd(v / rate); };
  const updateRate = (v: number) => { setRate(v); if (active === "usd") setKrw(usd * v); else if (v > 0) setUsd(krw / v); };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">USD</label><input type="number" value={usd} onChange={(e) => { setActive("usd"); updateUsd(+e.target.value); }} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" /></div>
        <div><label className="label">KRW</label><input type="number" value={Math.round(krw)} onChange={(e) => { setActive("krw"); updateKrw(+e.target.value); }} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono" /></div>
      </div>
      <div>
        <label className="label text-xs">{t("rateLabel")}</label>
        <input type="number" step="0.01" value={rate} onChange={(e) => updateRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm" />
        <div className="text-xs text-muted mt-1">{t("rateHint")}</div>
        {!(rate > 0) && <div className="text-xs text-amber-600 mt-1">{t("rateRequired")}</div>}
      </div>
    </div>
  );
}
