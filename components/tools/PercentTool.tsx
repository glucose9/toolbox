"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Mode = "of" | "what-pct" | "change" | "add-sub";

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export default function PercentTool() {
  const t = useTranslations("toolUI.percent");
  const [mode, setMode] = useState<Mode>("of");
  const [v1, setV1] = useState(20);
  const [v2, setV2] = useState(150);
  const [sign, setSign] = useState<"+" | "-">("+");

  let label = "";
  let result = 0;
  if (mode === "of") {
    label = `${v1}% of ${v2}`;
    result = (v1 * v2) / 100;
  } else if (mode === "what-pct") {
    label = t("labelWhatPct", { v1, v2 });
    result = (v1 / v2) * 100;
  } else if (mode === "change") {
    label = t("labelChange", { v1, v2 });
    result = ((v2 - v1) / v1) * 100;
  } else {
    label = `${v2} ${sign === "+" ? "+" : "-"} ${v1}%`;
    result = sign === "+" ? v2 + (v2 * v1) / 100 : v2 - (v2 * v1) / 100;
  }

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-2 text-sm">
        <button onClick={() => setMode("of")} className={`btn ${mode === "of" ? "btn-primary" : "btn-secondary"}`}>{t("modeOf")}</button>
        <button onClick={() => setMode("what-pct")} className={`btn ${mode === "what-pct" ? "btn-primary" : "btn-secondary"}`}>{t("modeWhatPct")}</button>
        <button onClick={() => setMode("change")} className={`btn ${mode === "change" ? "btn-primary" : "btn-secondary"}`}>{t("modeChange")}</button>
        <button onClick={() => setMode("add-sub")} className={`btn ${mode === "add-sub" ? "btn-primary" : "btn-secondary"}`}>{t("modeAddSub")}</button>
      </div>

      {mode === "of" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">{t("percentLabel")}</label><input type="number" value={v1} onChange={(e) => setV1(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
            <div><label className="label">{t("valueLabel")}</label><input type="number" value={v2} onChange={(e) => setV2(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          </div>
        </>
      )}
      {mode === "what-pct" && (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">{t("partLabel")}</label><input type="number" value={v1} onChange={(e) => setV1(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          <div><label className="label">{t("totalLabel")}</label><input type="number" value={v2} onChange={(e) => setV2(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        </div>
      )}
      {mode === "change" && (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label">{t("oldValue")}</label><input type="number" value={v1} onChange={(e) => setV1(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          <div><label className="label">{t("newValue")}</label><input type="number" value={v2} onChange={(e) => setV2(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        </div>
      )}
      {mode === "add-sub" && (
        <div className="grid grid-cols-3 gap-3 items-end">
          <div><label className="label">{t("baseValue")}</label><input type="number" value={v2} onChange={(e) => setV2(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
          <div className="flex gap-1">
            <button onClick={() => setSign("+")} className={`btn ${sign === "+" ? "btn-primary" : "btn-secondary"}`}>+</button>
            <button onClick={() => setSign("-")} className={`btn ${sign === "-" ? "btn-primary" : "btn-secondary"}`}>−</button>
          </div>
          <div><label className="label">{t("pctChange")}</label><input type="number" value={v1} onChange={(e) => setV1(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        </div>
      )}

      <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
        <div className="text-xs text-muted">{label}</div>
        <div className="text-3xl font-bold mt-1">{fmt(result)}{mode === "what-pct" || mode === "change" ? "%" : ""}</div>
      </div>
    </div>
  );
}
