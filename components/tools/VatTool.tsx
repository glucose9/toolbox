"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "from-supply" | "from-total";

const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "—");

export default function VatTool() {
  const t = useTranslations("toolUI.vat");
  const [mode, setMode] = useState<Mode>("from-total");
  const [val, setVal] = useState(110000);
  const [rate, setRate] = useState(10);

  let supply = 0, vat = 0, total = 0;
  if (mode === "from-supply") {
    supply = val;
    vat = (val * rate) / 100;
    total = supply + vat;
  } else {
    total = val;
    supply = val / (1 + rate / 100);
    vat = total - supply;
  }

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button onClick={() => setMode("from-supply")} className={`btn ${mode === "from-supply" ? "btn-primary" : "btn-secondary"}`}>{t("fromSupply")}</button>
        <button onClick={() => setMode("from-total")} className={`btn ${mode === "from-total" ? "btn-primary" : "btn-secondary"}`}>{t("fromTotal")}</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{mode === "from-supply" ? t("supplyAmount") : t("totalAmount")}</label>
          <input type="number" value={val} onChange={(e) => setVal(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div>
          <label className="label">{t("vatRate")}</label>
          <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("supply")}</div>
          <div className="text-xl font-bold mt-1">{fmt(supply)}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("vat")} ({rate}%)</div>
          <div className="text-xl font-bold mt-1">{fmt(vat)}</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">{t("total")}</div>
          <div className="text-xl font-bold mt-1">{fmt(total)}</div>
        </div>
      </div>
    </div>
  );
}
