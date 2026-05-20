"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

type Mode = "acquisition" | "transfer" | "property";

function calcAcquisitionTax(price: number, isHouse: boolean, isMulti: boolean, area: number): {
  baseRate: number;
  base: number;
  localEdu: number;
  ruralSpecial: number;
  total: number;
} {
  let baseRate: number;
  if (!isHouse) {
    baseRate = 0.04;
  } else if (isMulti) {
    if (price <= 6_00_000_000) baseRate = 0.08;
    else baseRate = 0.12;
  } else {
    if (price <= 6_00_000_000) baseRate = 0.01;
    else if (price <= 9_00_000_000) baseRate = 0.02;
    else baseRate = 0.03;
  }
  const base = Math.round(price * baseRate);
  const ruralSpecial = area > 85 || !isHouse ? Math.round(base * 0.1) : 0;
  const localEdu = Math.round(base * 0.1);
  return { baseRate, base, localEdu, ruralSpecial, total: base + localEdu + ruralSpecial };
}

function calcTransferTax(profit: number, holdYears: number, is1House: boolean, holdMonths: number): {
  taxable: number;
  rate: number;
  tax: number;
  localTax: number;
  total: number;
  exempt: boolean;
} {
  if (is1House && holdYears >= 2) {
    return { taxable: 0, rate: 0, tax: 0, localTax: 0, total: 0, exempt: true };
  }
  const baseExemption = 2_500_000;
  let longTermRate = 0;
  if (holdYears >= 15) longTermRate = 0.3;
  else if (holdYears >= 10) longTermRate = 0.2;
  else if (holdYears >= 5) longTermRate = 0.1;
  else if (holdYears >= 3) longTermRate = 0.06;
  const longTermDeduction = Math.round(profit * longTermRate);
  const taxable = Math.max(0, profit - longTermDeduction - baseExemption);
  let rate: number;
  if (holdYears < 1 || holdMonths < 12) rate = 0.7;
  else if (holdYears < 2) rate = 0.6;
  else {
    if (taxable <= 14_000_000) rate = 0.06;
    else if (taxable <= 50_000_000) rate = 0.15;
    else if (taxable <= 88_000_000) rate = 0.24;
    else if (taxable <= 150_000_000) rate = 0.35;
    else if (taxable <= 300_000_000) rate = 0.38;
    else if (taxable <= 500_000_000) rate = 0.4;
    else rate = 0.42;
  }
  const tax = Math.max(0, Math.round(taxable * rate));
  const localTax = Math.round(tax * 0.1);
  return { taxable, rate, tax, localTax, total: tax + localTax, exempt: false };
}

function calcPropertyTax(stdValue: number): { tax: number; rate: number } {
  let rate: number;
  if (stdValue <= 60_000_000) rate = 0.001;
  else if (stdValue <= 150_000_000) rate = 0.0015;
  else if (stdValue <= 300_000_000) rate = 0.0025;
  else rate = 0.004;
  return { tax: Math.round(stdValue * rate), rate };
}

export default function RealEstateTaxTool() {
  const t = useTranslations("toolUI.real-estate-tax");
  const locale = useLocale();
  const [mode, setMode] = useState<Mode>("acquisition");

  const [price, setPrice] = useState(500_000_000);
  const [isHouse, setIsHouse] = useState(true);
  const [isMulti, setIsMulti] = useState(false);
  const [area, setArea] = useState(85);

  const [profit, setProfit] = useState(100_000_000);
  const [holdYears, setHoldYears] = useState(3);
  const [holdMonths, setHoldMonths] = useState(0);
  const [is1House, setIs1House] = useState(true);

  const [stdValue, setStdValue] = useState(300_000_000);

  const acq = useMemo(() => calcAcquisitionTax(price, isHouse, isMulti, area), [price, isHouse, isMulti, area]);
  const tr = useMemo(() => calcTransferTax(profit, holdYears, is1House, holdMonths), [profit, holdYears, is1House, holdMonths]);
  const prop = useMemo(() => calcPropertyTax(stdValue), [stdValue]);

  const fmt = (n: number) => Math.round(n).toLocaleString(locale);
  const krw = (amount: string) => t("krw", { amount });

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["acquisition", "transfer", "property"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded text-sm ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {t(`tab.${m}`)}
          </button>
        ))}
      </div>

      {mode === "acquisition" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label>
              {t("price")}
              <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{t("priceNote", { amount: fmt(price), eok: (price / 100_000_000).toFixed(2) })}</div>
            </label>
            <label>
              {t("area")}
              <input type="number" value={area} onChange={(e) => setArea(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{t("areaNote")}</div>
            </label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={isHouse} onChange={(e) => setIsHouse(e.target.checked)} /> {t("isHouse")}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={isMulti} onChange={(e) => setIsMulti(e.target.checked)} /> {t("isMulti")}</label>
          </div>

          <div className="card-section space-y-1 text-sm">
            <div className="flex justify-between"><span>{t("appliedRate")}</span><span>{(acq.baseRate * 100).toFixed(1)}%</span></div>
            <div className="flex justify-between"><span>{t("acqBase")}</span><span>{krw(fmt(acq.base))}</span></div>
            <div className="flex justify-between text-muted"><span>{t("localEdu")}</span><span>+{krw(fmt(acq.localEdu))}</span></div>
            {acq.ruralSpecial > 0 && (
              <div className="flex justify-between text-muted"><span>{t("ruralSpecial")}</span><span>+{krw(fmt(acq.ruralSpecial))}</span></div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <div className="flex justify-between font-bold"><span>{t("acqTotal")}</span><span className="text-red-600">{krw(fmt(acq.total))}</span></div>
            <div className="text-xs text-muted">{t("acqRatio", { ratio: ((acq.total / price) * 100).toFixed(2) })}</div>
          </div>
        </>
      )}

      {mode === "transfer" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label className="sm:col-span-2">
              {t("profit")}
              <input type="number" value={profit} onChange={(e) => setProfit(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{krw(fmt(profit))}</div>
            </label>
            <label>
              {t("holdYears")}
              <input type="number" min={0} value={holdYears} onChange={(e) => setHoldYears(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>
              {t("holdMonths")}
              <input type="number" min={0} max={11} value={holdMonths} onChange={(e) => setHoldMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label className="sm:col-span-2 flex items-center gap-2"><input type="checkbox" checked={is1House} onChange={(e) => setIs1House(e.target.checked)} /> {t("is1House")}</label>
          </div>

          <div className="card-section space-y-1 text-sm">
            {tr.exempt ? (
              <div className="text-green-600 font-semibold">✓ {t("exempt")}</div>
            ) : (
              <>
                <div className="flex justify-between"><span>{t("taxBase")}</span><span>{krw(fmt(tr.taxable))}</span></div>
                <div className="flex justify-between"><span>{t("appliedRate")}</span><span>{(tr.rate * 100).toFixed(0)}%</span></div>
                <div className="flex justify-between"><span>{t("transferTax")}</span><span>{krw(fmt(tr.tax))}</span></div>
                <div className="flex justify-between text-muted"><span>{t("localIncomeTax")}</span><span>+{krw(fmt(tr.localTax))}</span></div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <div className="flex justify-between font-bold"><span>{t("transferTotal")}</span><span className="text-red-600">{krw(fmt(tr.total))}</span></div>
              </>
            )}
          </div>
        </>
      )}

      {mode === "property" && (
        <>
          <label className="block text-sm">
            {t("stdValue")}
            <input type="number" value={stdValue} onChange={(e) => setStdValue(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">{t("stdValueNote")}</div>
          </label>

          <div className="card-section space-y-1 text-sm">
            <div className="flex justify-between"><span>{t("appliedRate")}</span><span>{(prop.rate * 100).toFixed(2)}%</span></div>
            <div className="flex justify-between font-bold"><span>{t("propertyAnnual")}</span><span className="text-red-600">{krw(fmt(prop.tax))}</span></div>
            <div className="text-xs text-muted mt-1">{t("propertyNote")}</div>
          </div>
        </>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 {t("disclaimer")}
      </div>
    </div>
  );
}
