"use client";

import { useState, useMemo } from "react";

// 2026 종합소득세 누진세율 (과세표준 기준)
const TAX_BRACKETS = [
  { up: 14_000_000, rate: 0.06, deduction: 0 },
  { up: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { up: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { up: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { up: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { up: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { up: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { up: Infinity, rate: 0.45, deduction: 65_940_000 },
];

function calcIncomeTax(taxBase: number): { tax: number; bracket: number; rate: number } {
  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    if (taxBase <= TAX_BRACKETS[i].up) {
      const b = TAX_BRACKETS[i];
      return { tax: Math.max(0, taxBase * b.rate - b.deduction), bracket: i, rate: b.rate };
    }
  }
  return { tax: 0, bracket: 0, rate: 0 };
}

export default function IncomeTaxTool() {
  const [grossIncome, setGrossIncome] = useState(50_000_000);
  const [necessaryExpense, setNecessaryExpense] = useState(0); // 사업·임대 필요경비
  const [personalDeduction, setPersonalDeduction] = useState(1_500_000); // 본인 기본공제
  const [dependents, setDependents] = useState(0); // 부양가족 (1인 150만)
  const [pensionContrib, setPensionContrib] = useState(0); // 국민연금 등
  const [otherDeduction, setOtherDeduction] = useState(0); // 기타 소득공제

  const result = useMemo(() => {
    const income = grossIncome - necessaryExpense;
    const totalDeduction = personalDeduction + dependents * 1_500_000 + pensionContrib + otherDeduction;
    const taxBase = Math.max(0, income - totalDeduction);
    const { tax, bracket, rate } = calcIncomeTax(taxBase);
    const localTax = tax * 0.1;
    const total = tax + localTax;
    const effectiveRate = grossIncome > 0 ? (total / grossIncome) * 100 : 0;
    return { income, totalDeduction, taxBase, tax, localTax, total, bracket, rate, effectiveRate };
  }, [grossIncome, necessaryExpense, personalDeduction, dependents, pensionContrib, otherDeduction]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>
          연 총 수입 (원)
          <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{fmt(grossIncome)}원</div>
        </label>
        <label>
          필요경비 (사업/임대 등)
          <input type="number" value={necessaryExpense} onChange={(e) => setNecessaryExpense(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">근로소득은 0, 사업소득은 실제 경비</div>
        </label>
        <label>
          본인 기본공제
          <input type="number" value={personalDeduction} onChange={(e) => setPersonalDeduction(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">기본 150만원 (만 70세 100만원 추가)</div>
        </label>
        <label>
          부양가족 수
          <input type="number" min={0} value={dependents} onChange={(e) => setDependents(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">1인당 150만원 추가 공제</div>
        </label>
        <label>
          국민연금·건강보험 등 (연간)
          <input type="number" value={pensionContrib} onChange={(e) => setPensionContrib(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{fmt(pensionContrib)}원</div>
        </label>
        <label>
          기타 소득공제 (연간)
          <input type="number" value={otherDeduction} onChange={(e) => setOtherDeduction(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">주택자금·신용카드·기부금 등</div>
        </label>
      </div>

      <div className="card-section space-y-1 text-sm">
        <div className="flex justify-between">
          <span>총 수입</span>
          <span>{fmt(grossIncome)}원</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>− 필요경비</span>
          <span>{fmt(necessaryExpense)}원</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>= 소득금액</span>
          <span>{fmt(result.income)}원</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>− 소득공제 합계</span>
          <span>{fmt(result.totalDeduction)}원</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>= 과세표준</span>
          <span>{fmt(result.taxBase)}원</span>
        </div>
        <div className="flex justify-between text-blue-600">
          <span>적용 세율 (한계세율)</span>
          <span>{(result.rate * 100).toFixed(0)}%</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div className="flex justify-between">
          <span>산출세액</span>
          <span>{fmt(result.tax)}원</span>
        </div>
        <div className="flex justify-between">
          <span>+ 지방소득세 (10%)</span>
          <span>{fmt(result.localTax)}원</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-1">
          <span>최종 납부세액</span>
          <span className="text-red-600">{fmt(result.total)}원</span>
        </div>
        <div className="text-xs text-muted">실효세율: {result.effectiveRate.toFixed(2)}%</div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 2026 종합소득세 누진세율표 기준 추정치. 근로소득공제·연금소득공제·세액공제(자녀·기부·교육비 등)는 별도 처리가 필요해 단순화됐습니다. 정확한 산정은 홈택스의 모의계산이나 세무사 상담을 추천합니다.
      </div>
    </div>
  );
}
