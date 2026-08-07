"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const fmt = (n: number) => isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";

export default function UnitPriceTool() {
  const t = useTranslations("toolUI.unit-price");
  const tc = useTranslations("common");
  const [pA, setPA] = useState(5000);
  const [vA, setVA] = useState(500);
  const [pB, setPB] = useState(8000);
  const [vB, setVB] = useState(1000);
  const [unit, setUnit] = useState(100);
  const [unitLabel, setUnitLabel] = useState("ml");

  const unitA = (pA / vA) * unit;
  const unitB = (pB / vB) * unit;
  const winner = unitA < unitB ? "A" : unitA > unitB ? "B" : "Tie";
  const diff = Math.abs(unitA - unitB);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className={`border rounded p-3 ${winner === "A" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700"}`}>
          <div className="font-medium mb-2">{t("productA")} {winner === "A" && "🏆"}</div>
          <label className="label text-xs">{t("price")}</label>
          <input type="number" value={pA} onChange={(e) => setPA(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">{t("volume")}</label>
          <input type="number" value={vA} onChange={(e) => setVA(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div className={`border rounded p-3 ${winner === "B" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700"}`}>
          <div className="font-medium mb-2">{t("productB")} {winner === "B" && "🏆"}</div>
          <label className="label text-xs">{t("price")}</label>
          <input type="number" value={pB} onChange={(e) => setPB(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 mb-2" />
          <label className="label text-xs">{t("volume")}</label>
          <input type="number" value={vB} onChange={(e) => setVB(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">{t("perUnit", { side: "A", unit, label: unitLabel })}</div><div className="text-lg font-bold">{t("currency", { value: fmt(unitA) })}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-xs text-muted">{t("perUnit", { side: "B", unit, label: unitLabel })}</div><div className="text-lg font-bold">{t("currency", { value: fmt(unitB) })}</div></div>
      </div>
      {winner !== "Tie" && (
        <div className="text-center text-sm">
          {t.rich("cheaperBy", {
            strong: (chunks) => <strong>{chunks}</strong>,
            winner,
            unit,
            label: unitLabel,
            amount: fmt(diff),
          })}
        </div>
      )}
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="grid grid-cols-2 gap-2 items-end text-sm">
            <label>{t("unitBase")}<input type="number" value={unit} onChange={(e) => setUnit(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
            <label>{t("unitLabel")}<input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
          </div>
        </div>
      </details>
    </div>
  );
}
