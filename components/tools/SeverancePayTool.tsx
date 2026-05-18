"use client";

import { useState, useMemo } from "react";

export default function SeverancePayTool() {
  const [years, setYears] = useState(5);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [avgWage3M, setAvgWage3M] = useState(3_500_000); // 평균임금 = 퇴직 직전 3개월 임금 ÷ 일수
  const [annualBonus, setAnnualBonus] = useState(0); // 1년 상여 (3개월 비율로 반영)
  const [annualLeavePay, setAnnualLeavePay] = useState(0); // 연차수당 (3개월 비율)

  const result = useMemo(() => {
    // 총 재직 일수
    const totalDays = years * 365 + months * 30 + days;
    if (totalDays < 365) {
      return { eligible: false, totalDays, dailyAvg: 0, severance: 0, bonusAdded: 0, leaveAdded: 0 };
    }
    // 평균임금 일급 산정 (3개월 임금 + 3개월치 상여 + 연차수당 비율)
    const days3M = 90;
    const bonusAdded = (annualBonus * 3) / 12;
    const leaveAdded = (annualLeavePay * 3) / 12;
    const wage3M = avgWage3M * 3 + bonusAdded + leaveAdded;
    const dailyAvg = wage3M / days3M;
    // 퇴직금 = 1일 평균임금 × 30일 × (재직일수 / 365)
    const severance = dailyAvg * 30 * (totalDays / 365);
    return {
      eligible: true,
      totalDays,
      dailyAvg,
      severance,
      bonusAdded,
      leaveAdded,
    };
  }, [years, months, days, avgWage3M, annualBonus, annualLeavePay]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">재직 기간</label>
        <div className="grid grid-cols-3 gap-2">
          <input type="number" min={0} value={years} onChange={(e) => setYears(+e.target.value)} placeholder="년" className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <input type="number" min={0} max={11} value={months} onChange={(e) => setMonths(+e.target.value)} placeholder="개월" className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <input type="number" min={0} max={30} value={days} onChange={(e) => setDays(+e.target.value)} placeholder="일" className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </div>
        <div className="text-xs text-muted mt-1">총 {result.totalDays}일 (1년 이상이어야 퇴직금 지급 의무)</div>
      </div>

      <label className="block text-sm">
        퇴직 직전 3개월 월 평균임금 (원)
        <input
          type="number"
          value={avgWage3M}
          onChange={(e) => setAvgWage3M(+e.target.value)}
          className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
        />
        <div className="text-xs text-muted mt-1">{fmt(avgWage3M)}원/월. 통상임금이 더 높으면 통상임금이 적용됨</div>
      </label>

      <details>
        <summary className="text-sm cursor-pointer text-blue-600">▾ 상여·연차수당 입력 (선택)</summary>
        <div className="space-y-2 mt-2 text-sm">
          <label className="block">
            연간 상여금 (원)
            <input
              type="number"
              value={annualBonus}
              onChange={(e) => setAnnualBonus(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted">1년치 상여 총액. 퇴직금 산정 시 3/12만 반영.</div>
          </label>
          <label className="block">
            연차수당 (원)
            <input
              type="number"
              value={annualLeavePay}
              onChange={(e) => setAnnualLeavePay(+e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <div className="text-xs text-muted">1년치 미사용 연차수당. 같은 비율로 반영.</div>
          </label>
        </div>
      </details>

      <div className="card-section space-y-1 text-sm">
        {!result.eligible ? (
          <div className="text-amber-600">
            ⚠️ 재직 기간이 1년 미만이면 퇴직금 법정 의무가 없습니다 (회사 내규에 따라 지급할 수도 있음).
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span>1일 평균임금</span>
              <span>{fmt(result.dailyAvg)}원</span>
            </div>
            <div className="text-xs text-muted">= (3개월 임금 + 상여 {fmt(result.bonusAdded)}원 + 연차 {fmt(result.leaveAdded)}원) ÷ 90일</div>
            <div className="flex justify-between mt-2">
              <span>30일분 × 재직년수 환산</span>
              <span>{(result.totalDays / 365).toFixed(2)}년</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>예상 퇴직금</span>
              <span className="text-blue-600">{fmt(result.severance)}원</span>
            </div>
            <div className="text-xs text-muted mt-2">세전 금액입니다. 퇴직소득세는 별도 공제됩니다.</div>
          </>
        )}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 근로기준법 기준 추정. 평균임금 vs 통상임금 중 큰 쪽이 적용되며, 회사가 별도의 퇴직연금(DB/DC)을 운용하는 경우 실제 지급액은 다를 수 있습니다. 정확한 금액은 회사 인사팀·노동부 퇴직금 계산기를 참고하세요.
      </div>
    </div>
  );
}
