"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";

function calcSedanTax(cc: number, ageYears: number, isBusiness: boolean): {
  baseAnnual: number;
  educationTax: number;
  reduction: number;
  total: number;
} {
  // 지방세법 제127조 제1항 제1호(비영업용) / 제2호(영업용) 승용자동차 cc당 세액
  let rate: number;
  if (isBusiness) {
    if (cc <= 1000) rate = 18;
    else if (cc <= 1600) rate = 18;
    else if (cc <= 2000) rate = 19;
    else if (cc <= 2500) rate = 19;
    else rate = 24;
  } else {
    if (cc <= 1000) rate = 80;
    else if (cc <= 1600) rate = 140;
    else rate = 200;
  }
  const baseAnnual = cc * rate;
  // 차령에 따른 경감은 "제1호에 따른 비영업용 승용자동차" 한정 (지방세법 제127조 제3항)
  let reductionRate = 0;
  if (!isBusiness && ageYears >= 3) {
    reductionRate = Math.min(0.5, (ageYears - 2) * 0.05);
  }
  const reduction = Math.round(baseAnnual * reductionRate);
  const afterReduction = baseAnnual - reduction;
  // 지방교육세는 비영업용 승용자동차 자동차세액의 30% (지방세법 제150조·제151조) — 영업용은 비과세
  const educationTax = isBusiness ? 0 : Math.round(afterReduction * 0.3);
  return {
    baseAnnual,
    educationTax,
    reduction,
    total: afterReduction + educationTax,
  };
}

const EV_TAX = 130_000;

export default function CarTaxTool() {
  const t = useTranslations("toolUI.car-tax");
  const locale = useLocale();
  const numLocale = locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US";

  const [type, setType] = useState<"sedan" | "ev" | "hybrid">("sedan");
  const [cc, setCc] = useState(2000);
  const [ageYears, setAgeYears] = useState(3);
  const [isBusiness, setIsBusiness] = useState(false);

  const result = useMemo(() => {
    if (type === "ev") {
      return {
        baseAnnual: EV_TAX,
        educationTax: 0,
        reduction: 0,
        total: EV_TAX,
        annual: EV_TAX,
        half: Math.round(EV_TAX / 2),
      };
    }
    // 하이브리드 자동차세 감면 제도는 없음 — 일반 승용차와 동일 과세
    const sedan = calcSedanTax(cc, ageYears, isBusiness);
    return { ...sedan, annual: sedan.total, half: Math.round(sedan.total / 2) };
  }, [type, cc, ageYears, isBusiness]);

  const fmt = (n: number) => Math.round(n).toLocaleString(numLocale);

  const typeLabel = (tp: "sedan" | "hybrid" | "ev") =>
    tp === "sedan" ? t("typeSedan") : tp === "hybrid" ? t("typeHybrid") : t("typeEv");

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["sedan", "hybrid", "ev"] as const).map((tp) => (
          <button
            key={tp}
            onClick={() => setType(tp)}
            className={`px-3 py-1.5 rounded text-sm ${type === tp ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {typeLabel(tp)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {type !== "ev" && (
          <label>
            {t("displacement")}
            <input
              type="number"
              value={cc}
              onChange={(e) => setCc(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted mt-1">{t("displacementHint")}</div>
          </label>
        )}
        <label>
          {t("ageYears")}
          <input
            type="number"
            min={0}
            value={ageYears}
            onChange={(e) => setAgeYears(+e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <div className="text-xs text-muted mt-1">{t("ageHint")}</div>
        </label>
        {type !== "ev" && (
          <label className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBusiness}
              onChange={(e) => setIsBusiness(e.target.checked)}
            />
            {t("business")}
          </label>
        )}
      </div>

      <div className="card-section space-y-1 text-sm">
        {type !== "ev" && (
          <>
            <div className="flex justify-between">
              <span>{t("baseTax")}</span>
              <span>{t("won", { v: fmt(result.baseAnnual) })}</span>
            </div>
            {result.reduction > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{t("ageReduction", { years: ageYears })}</span>
                <span>-{t("won", { v: fmt(result.reduction) })}</span>
              </div>
            )}
            {result.educationTax > 0 && (
              <div className="flex justify-between">
                <span>{t("educationTax")}</span>
                <span>+{t("won", { v: fmt(result.educationTax) })}</span>
              </div>
            )}
            {type === "hybrid" && (
              <div className="text-xs text-muted">{t("hybridSameNote")}</div>
            )}
          </>
        )}
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div className="flex justify-between font-semibold">
          <span>{t("annualTax")}</span>
          <span className="text-blue-600">{t("won", { v: fmt(result.annual) })}</span>
        </div>
        <div className="text-xs text-muted mt-1">{t("biAnnual", { half: fmt(result.half) })}</div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
