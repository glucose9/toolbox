"use client";

import { useState, useMemo } from "react";

// 2026 한국 자동차세 (지방세법)
// 승용차: cc당 세율 + 차령별 경감
function calcSedanTax(cc: number, ageYears: number, isBusiness: boolean): {
  baseAnnual: number;
  educationTax: number;
  reduction: number;
  total: number;
} {
  let rate: number;
  if (isBusiness) {
    if (cc <= 1000) rate = 18;
    else if (cc <= 1600) rate = 18;
    else rate = 24;
  } else {
    if (cc <= 1000) rate = 80;
    else if (cc <= 1600) rate = 140;
    else rate = 200;
  }
  const baseAnnual = cc * rate;
  // 차령 경감 (3년차부터 5%씩, 최대 50%)
  let reductionRate = 0;
  if (ageYears >= 3) {
    reductionRate = Math.min(0.5, (ageYears - 2) * 0.05);
  }
  const reduction = Math.round(baseAnnual * reductionRate);
  const afterReduction = baseAnnual - reduction;
  // 지방교육세 30%
  const educationTax = Math.round(afterReduction * 0.3);
  return {
    baseAnnual,
    educationTax,
    reduction,
    total: afterReduction + educationTax,
  };
}

const EV_TAX = 130_000; // 전기차 연 13만원
const HYBRID_RATE = 0.5; // 하이브리드 50% 경감 (2026 기준)

export default function CarTaxTool() {
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
    if (type === "hybrid") {
      const sedan = calcSedanTax(cc, ageYears, isBusiness);
      const hybridTotal = Math.round(sedan.total * (1 - HYBRID_RATE));
      return { ...sedan, total: hybridTotal, annual: hybridTotal, half: Math.round(hybridTotal / 2) };
    }
    const sedan = calcSedanTax(cc, ageYears, isBusiness);
    return { ...sedan, annual: sedan.total, half: Math.round(sedan.total / 2) };
  }, [type, cc, ageYears, isBusiness]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["sedan", "hybrid", "ev"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded text-sm ${type === t ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {t === "sedan" ? "🚗 일반 승용차" : t === "hybrid" ? "🌱 하이브리드" : "⚡ 전기차"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {type !== "ev" && (
          <label>
            배기량 (cc)
            <input
              type="number"
              value={cc}
              onChange={(e) => setCc(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted mt-1">예: 경차 1000cc, 준중형 1600cc, 중형 2000cc, 대형 3000cc+</div>
          </label>
        )}
        <label>
          차령 (년)
          <input
            type="number"
            min={0}
            value={ageYears}
            onChange={(e) => setAgeYears(+e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
          <div className="text-xs text-muted mt-1">3년차부터 5%씩 경감, 최대 50% (12년차+)</div>
        </label>
        {type !== "ev" && (
          <label className="sm:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBusiness}
              onChange={(e) => setIsBusiness(e.target.checked)}
            />
            영업용 (택시·렌터카 등)
          </label>
        )}
      </div>

      <div className="card-section space-y-1 text-sm">
        {type !== "ev" && (
          <>
            <div className="flex justify-between">
              <span>기본 세액 (배기량 × 세율)</span>
              <span>{fmt(result.baseAnnual)}원</span>
            </div>
            {result.reduction > 0 && (
              <div className="flex justify-between text-green-600">
                <span>차령 경감 ({ageYears}년차)</span>
                <span>-{fmt(result.reduction)}원</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>지방교육세 (30%)</span>
              <span>+{fmt(result.educationTax)}원</span>
            </div>
            {type === "hybrid" && (
              <div className="flex justify-between text-green-600">
                <span>하이브리드 경감 (50%)</span>
                <span>-{fmt(result.baseAnnual + result.educationTax - result.reduction - result.total)}원</span>
              </div>
            )}
          </>
        )}
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div className="flex justify-between font-semibold">
          <span>연간 자동차세</span>
          <span className="text-blue-600">{fmt(result.annual)}원</span>
        </div>
        <div className="text-xs text-muted mt-1">반기별(6월·12월) 납부: 각 {fmt(result.half)}원</div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 한국 지방세법 기준 자동차세 추정치. 영업용·하이브리드·전기차는 별도 세율·경감 적용. 정확한 고지액은 지방자치단체의 통지서를 참고하세요. 연납 신청 시 약 10% 추가 할인.
      </div>
    </div>
  );
}
