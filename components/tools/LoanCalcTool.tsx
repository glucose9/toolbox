"use client";

import { useState, useMemo } from "react";

export default function LoanCalcTool() {
  const [principal, setPrincipal] = useState(300_000_000);
  const [rate, setRate] = useState(4.5);
  const [months, setMonths] = useState(360);
  const [method, setMethod] = useState<"equal-payment" | "equal-principal" | "bullet">("equal-payment");

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    if (method === "equal-payment") {
      // 원리금균등
      const monthly = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      const total = monthly * months;
      const interest = total - principal;
      // First and last month schedule (just sample)
      const schedule: { m: number; pay: number; principal: number; interest: number; remain: number }[] = [];
      let remain = principal;
      for (let m = 1; m <= months; m++) {
        const intPart = remain * r;
        const prinPart = monthly - intPart;
        remain -= prinPart;
        schedule.push({ m, pay: monthly, principal: prinPart, interest: intPart, remain: Math.max(0, remain) });
      }
      return { monthly, total, interest, schedule, firstMonth: monthly, lastMonth: monthly };
    }
    if (method === "equal-principal") {
      // 원금균등
      const monthlyPrincipal = principal / months;
      let remain = principal;
      let total = 0;
      const schedule: { m: number; pay: number; principal: number; interest: number; remain: number }[] = [];
      for (let m = 1; m <= months; m++) {
        const interest = remain * r;
        const pay = monthlyPrincipal + interest;
        total += pay;
        remain -= monthlyPrincipal;
        schedule.push({ m, pay, principal: monthlyPrincipal, interest, remain: Math.max(0, remain) });
      }
      return { monthly: NaN, total, interest: total - principal, schedule, firstMonth: schedule[0].pay, lastMonth: schedule[schedule.length - 1].pay };
    }
    // bullet (만기일시상환): 매월 이자만, 만기에 원금
    const monthlyInterest = principal * r;
    const totalInterest = monthlyInterest * months;
    return {
      monthly: monthlyInterest,
      total: principal + totalInterest,
      interest: totalInterest,
      schedule: [],
      firstMonth: monthlyInterest,
      lastMonth: monthlyInterest + principal,
    };
  }, [principal, rate, months, method]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <label>대출 원금 (원)
          <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{fmt(principal)}원 ({(principal / 100_000_000).toFixed(2)}억)</div>
        </label>
        <label>연 이자율 (%)
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>대출 기간 (개월)
          <input type="number" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          <div className="text-xs text-muted mt-1">{(months / 12).toFixed(1)}년</div>
        </label>
        <label>상환 방식
          <select value={method} onChange={(e) => setMethod(e.target.value as typeof method)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="equal-payment">원리금균등 (매월 동일)</option>
            <option value="equal-principal">원금균등 (점차 감소)</option>
            <option value="bullet">만기일시상환</option>
          </select>
        </label>
      </div>

      <div className="card-section grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div>
          <div className="text-xs text-muted">{method === "equal-principal" ? "첫 달" : "월 납입금"}</div>
          <div className="text-lg font-bold">{fmt(result.firstMonth)}원</div>
        </div>
        {method === "equal-principal" && (
          <div>
            <div className="text-xs text-muted">마지막 달</div>
            <div className="text-lg font-bold">{fmt(result.lastMonth)}원</div>
          </div>
        )}
        <div>
          <div className="text-xs text-muted">총 이자</div>
          <div className="text-lg font-bold text-red-600">{fmt(result.interest)}원</div>
        </div>
        <div>
          <div className="text-xs text-muted">총 상환액</div>
          <div className="text-lg font-bold">{fmt(result.total)}원</div>
        </div>
      </div>

      {result.schedule.length > 0 && (
        <details>
          <summary className="text-sm cursor-pointer text-blue-600">📊 상환 스케줄 (1·12·{months}회차)</summary>
          <div className="mt-2 overflow-x-auto">
            <table className="text-xs w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-1">회차</th>
                  <th className="text-right p-1">납입</th>
                  <th className="text-right p-1">원금</th>
                  <th className="text-right p-1">이자</th>
                  <th className="text-right p-1">잔액</th>
                </tr>
              </thead>
              <tbody>
                {[0, 11, months - 1].filter((i, j, arr) => arr.indexOf(i) === j && i < result.schedule.length).map((i) => {
                  const s = result.schedule[i];
                  return (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="p-1">{s.m}</td>
                      <td className="text-right p-1">{fmt(s.pay)}</td>
                      <td className="text-right p-1">{fmt(s.principal)}</td>
                      <td className="text-right p-1">{fmt(s.interest)}</td>
                      <td className="text-right p-1">{fmt(s.remain)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </details>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 실제 은행은 중도상환수수료·근저당설정비·DSR 규제 등이 추가됩니다. 이 계산은 단순 원리금 시뮬레이션입니다.
      </div>
    </div>
  );
}
