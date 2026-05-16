"use client";

import { useState, useMemo } from "react";

export default function SavingsCalcTool() {
  const [type, setType] = useState<"installment" | "deposit">("installment");
  const [monthly, setMonthly] = useState(500_000);
  const [principal, setPrincipal] = useState(10_000_000);
  const [rate, setRate] = useState(3.5);
  const [months, setMonths] = useState(12);
  const [taxFree, setTaxFree] = useState(false);
  const [interestType, setInterestType] = useState<"simple" | "compound">("simple");

  const result = useMemo(() => {
    const taxRate = taxFree ? 0 : 0.154; // 일반과세 15.4%
    const annualRate = rate / 100;
    if (type === "installment") {
      // 정기적금: 매월 입금
      const totalPaid = monthly * months;
      let interest = 0;
      if (interestType === "simple") {
        // 단리: 각 회차 입금이 남은 기간 동안 이자
        for (let m = 1; m <= months; m++) {
          interest += monthly * annualRate * (months - m + 1) / 12;
        }
      } else {
        // 복리: 매월 복리
        const r = annualRate / 12;
        let bal = 0;
        for (let m = 1; m <= months; m++) {
          bal = (bal + monthly) * (1 + r);
        }
        interest = bal - totalPaid;
      }
      const tax = interest * taxRate;
      return { totalPaid, interest, tax, netInterest: interest - tax, final: totalPaid + interest - tax };
    }
    // 정기예금: 일시 예치
    const totalPaid = principal;
    let interest = 0;
    if (interestType === "simple") {
      interest = principal * annualRate * (months / 12);
    } else {
      const r = annualRate / 12;
      interest = principal * (Math.pow(1 + r, months) - 1);
    }
    const tax = interest * taxRate;
    return { totalPaid, interest, tax, netInterest: interest - tax, final: principal + interest - tax };
  }, [type, monthly, principal, rate, months, taxFree, interestType]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        {(["installment", "deposit"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded text-sm ${type === t ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {t === "installment" ? "📅 정기적금" : "💰 정기예금"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {type === "installment" ? (
          <label>월 적립액 (원)
            <input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">{fmt(monthly)}원</div>
          </label>
        ) : (
          <label>예치 원금 (원)
            <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">{fmt(principal)}원</div>
          </label>
        )}
        <label>연 이자율 (%)
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>기간 (개월)
          <input type="number" value={months} onChange={(e) => setMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>이자 방식
          <select value={interestType} onChange={(e) => setInterestType(e.target.value as typeof interestType)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="simple">단리 (일반)</option>
            <option value="compound">복리 (월복리)</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" checked={taxFree} onChange={(e) => setTaxFree(e.target.checked)} />
          비과세 (청년적금·ISA 등)
        </label>
      </div>

      <div className="card-section grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-xs text-muted">총 납입원금</div>
          <div className="text-base font-bold">{fmt(result.totalPaid)}원</div>
        </div>
        <div>
          <div className="text-xs text-muted">세전 이자</div>
          <div className="text-base font-bold text-blue-600">{fmt(result.interest)}원</div>
        </div>
        <div>
          <div className="text-xs text-muted">이자과세 ({taxFree ? 0 : 15.4}%)</div>
          <div className="text-base font-bold text-red-600">-{fmt(result.tax)}원</div>
        </div>
        <div>
          <div className="text-xs text-muted">세후 이자</div>
          <div className="text-base font-bold">{fmt(result.netInterest)}원</div>
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div className="text-xs text-muted">만기 수령액</div>
          <div className="text-2xl font-bold text-green-600">{fmt(result.final)}원</div>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 일반 이자소득세 15.4% (소득세 14% + 지방세 1.4%). 청년도약계좌·ISA 등은 비과세. 단리는 한국 은행 적금 표준이며, 복리는 일부 ELS/ELB·해외 상품에서 사용됩니다.
      </div>
    </div>
  );
}
