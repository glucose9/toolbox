"use client";

import { useState, useMemo } from "react";

// 2026 기준 4대보험 요율 (사용자 부담)
const NATIONAL_PENSION = 0.045; // 국민연금 4.5%
const HEALTH = 0.03545; // 건강보험 3.545% (2025년 기준 유지)
const LONG_TERM = 0.004591; // 장기요양 (건강보험료의 12.95% — 급여 대비 약 0.4591%)
const EMPLOYMENT = 0.009; // 고용보험 0.9%

// 간이 소득세 (월급여·부양가족 기준)
function incomeTax(monthly: number, dependents: number, children: number): number {
  // 매우 단순화: 근로소득 간이세액표 근사
  // 실제로는 국세청 표 lookup이 필요하지만, 여기서는 누진 근사
  const taxable = Math.max(0, monthly - 1_500_000); // 비과세 약 150만 가정
  let rate = 0.06;
  if (taxable > 4_000_000) rate = 0.24;
  else if (taxable > 2_500_000) rate = 0.15;
  else if (taxable > 1_500_000) rate = 0.09;

  let tax = taxable * rate;
  // 부양가족 공제 근사 (인당 약 1.5만원 감액)
  tax -= dependents * 12_500;
  tax -= children * 25_000;
  return Math.max(0, tax);
}

export default function NetSalaryTool() {
  const [annual, setAnnual] = useState(48_000_000);
  const [dependents, setDependents] = useState(1); // 본인 포함
  const [children, setChildren] = useState(0);
  const [nontaxable, setNontaxable] = useState(200_000); // 비과세 (식대 등)

  const result = useMemo(() => {
    const monthly = annual / 12;
    const taxableMonthly = monthly - nontaxable;
    const pension = Math.min(taxableMonthly * NATIONAL_PENSION, 5_530_000 * NATIONAL_PENSION); // 상한
    const health = taxableMonthly * HEALTH;
    const longTerm = taxableMonthly * LONG_TERM;
    const employment = taxableMonthly * EMPLOYMENT;
    const tax = incomeTax(taxableMonthly, dependents, children);
    const localTax = tax * 0.1;
    const totalDeduction = pension + health + longTerm + employment + tax + localTax;
    const net = monthly - totalDeduction;
    return { monthly, pension, health, longTerm, employment, tax, localTax, totalDeduction, net };
  }, [annual, dependents, children, nontaxable]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label className="sm:col-span-2">연봉 (원)
          <input type="number" value={annual} onChange={(e) => setAnnual(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{fmt(annual)}원 / 월 {fmt(annual / 12)}원</div>
        </label>
        <label>본인 포함 부양가족 수
          <input type="number" min="1" value={dependents} onChange={(e) => setDependents(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>20세 이하 자녀
          <input type="number" min="0" value={children} onChange={(e) => setChildren(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">비과세 (식대·자가운전·교통비 등)
          <input type="number" value={nontaxable} onChange={(e) => setNontaxable(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">월 {fmt(nontaxable)}원 (식대는 월 20만원까지 비과세)</div>
        </label>
      </div>

      <div className="card-section space-y-1 text-sm">
        <div className="font-semibold mb-1">월 공제 내역</div>
        <Row label="국민연금 (4.5%)" value={result.pension} />
        <Row label="건강보험 (3.545%)" value={result.health} />
        <Row label="장기요양 (0.459%)" value={result.longTerm} />
        <Row label="고용보험 (0.9%)" value={result.employment} />
        <Row label="소득세 (간이)" value={result.tax} />
        <Row label="지방소득세 (10%)" value={result.localTax} />
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <Row label="공제 합계" value={result.totalDeduction} className="font-semibold text-red-600" />
      </div>

      <div className="card-section">
        <div className="text-xs text-muted">월 실수령액</div>
        <div className="text-3xl font-bold text-green-600">{fmt(result.net)}원</div>
        <div className="text-xs text-muted mt-1">연 환산: {fmt(result.net * 12)}원</div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 4대보험은 2026년 요율 기준. 소득세는 국세청 근로소득 간이세액표 근사이며 실제 회사·연말정산과 차이가 있을 수 있습니다. 상여·성과급은 별도 계산.
      </div>
    </div>
  );
}

function Row({ label, value, className = "" }: { label: string; value: number; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <span>{label}</span>
      <span>-{Math.round(value).toLocaleString("ko-KR")}원</span>
    </div>
  );
}
