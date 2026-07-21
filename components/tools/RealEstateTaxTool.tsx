"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

type Mode = "acquisition" | "transfer" | "property";

function calcAcquisitionTax(price: number, isHouse: boolean, isMulti: boolean, area: number, multiCount: number): {
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
    // 다주택 중과는 주택 수 기준: 조정 2주택 8%, 조정 3주택 이상·법인 12%
    baseRate = multiCount >= 3 ? 0.12 : 0.08;
  } else {
    if (price <= 6_00_000_000) baseRate = 0.01;
    // 6~9억 연속 누진: 세율(%) = 취득가(억) × 2/3 − 3 (1~3% 클램프)
    else if (price <= 9_00_000_000) baseRate = Math.min(0.03, Math.max(0.01, ((price / 100_000_000) * 2 / 3 - 3) / 100));
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
  // 단기세율 판정은 총 보유개월(년×12+월) 기준
  const totalMonths = holdYears * 12 + holdMonths;
  let rate: number;
  let progDeduction = 0;
  if (totalMonths < 12) rate = 0.7;
  else if (totalMonths < 24) rate = 0.6;
  else {
    // 2026 소득세 8구간 누진세율 + 누진공제
    if (taxable <= 14_000_000) rate = 0.06;
    else if (taxable <= 50_000_000) { rate = 0.15; progDeduction = 1_260_000; }
    else if (taxable <= 88_000_000) { rate = 0.24; progDeduction = 5_760_000; }
    else if (taxable <= 150_000_000) { rate = 0.35; progDeduction = 15_440_000; }
    else if (taxable <= 300_000_000) { rate = 0.38; progDeduction = 19_940_000; }
    else if (taxable <= 500_000_000) { rate = 0.4; progDeduction = 25_940_000; }
    else if (taxable <= 1_000_000_000) { rate = 0.42; progDeduction = 35_940_000; }
    else { rate = 0.45; progDeduction = 65_940_000; }
  }
  const tax = Math.max(0, Math.round(taxable * rate - progDeduction));
  const localTax = Math.round(tax * 0.1);
  return { taxable, rate, tax, localTax, total: tax + localTax, exempt: false };
}

function calcPropertyTax(stdValue: number): { tax: number; rate: number } {
  // 과세표준 = 공시가격 × 공정시장가액비율 60%, 주택 재산세는 초과누진세율
  const base = stdValue * 0.6;
  let rate: number;
  let tax: number;
  if (base <= 60_000_000) { rate = 0.001; tax = base * 0.001; }
  else if (base <= 150_000_000) { rate = 0.0015; tax = 60_000 + (base - 60_000_000) * 0.0015; }
  else if (base <= 300_000_000) { rate = 0.0025; tax = 195_000 + (base - 150_000_000) * 0.0025; }
  else { rate = 0.004; tax = 570_000 + (base - 300_000_000) * 0.004; }
  return { tax: Math.round(tax), rate };
}

export default function RealEstateTaxTool() {
  const t = useTranslations("toolUI.real-estate-tax");
  const locale = useLocale();
  const [mode, setMode] = useState<Mode>("acquisition");

  const [price, setPrice] = useState(500_000_000);
  const [isHouse, setIsHouse] = useState(true);
  const [isMulti, setIsMulti] = useState(false);
  const [multiCount, setMultiCount] = useState(2);
  const [area, setArea] = useState(85);

  const [profit, setProfit] = useState(100_000_000);
  const [holdYears, setHoldYears] = useState(3);
  const [holdMonths, setHoldMonths] = useState(0);
  const [is1House, setIs1House] = useState(true);

  const [stdValue, setStdValue] = useState(300_000_000);

  const acq = useMemo(() => calcAcquisitionTax(price, isHouse, isMulti, area, multiCount), [price, isHouse, isMulti, area, multiCount]);
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
            {isMulti && (
              <div className="sm:col-span-2 flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="radio" checked={multiCount === 2} onChange={() => setMultiCount(2)} /> {t("multi2")}</label>
                <label className="flex items-center gap-2"><input type="radio" checked={multiCount >= 3} onChange={() => setMultiCount(3)} /> {t("multi3")}</label>
              </div>
            )}
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
