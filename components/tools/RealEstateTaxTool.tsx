"use client";

import { useState, useMemo } from "react";

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
    baseRate = 0.04; // 비주택 4%
  } else if (isMulti) {
    // 다주택 (조정지역 가정)
    if (price <= 6_00_000_000) baseRate = 0.08;
    else baseRate = 0.12;
  } else {
    // 1주택 (생애최초 등은 별도)
    if (price <= 6_00_000_000) baseRate = 0.01;
    else if (price <= 9_00_000_000) baseRate = 0.02;
    else baseRate = 0.03;
  }
  const base = Math.round(price * baseRate);
  // 농어촌특별세 (전용 85㎡ 초과 주택 + 비주택): 취득세의 10%
  const ruralSpecial = area > 85 || !isHouse ? Math.round(base * 0.1) : 0;
  // 지방교육세: 취득세의 10%
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
  // 1주택자 + 2년 보유 + 양도가 12억 이하 = 비과세 (단순화)
  if (is1House && holdYears >= 2) {
    return { taxable: 0, rate: 0, tax: 0, localTax: 0, total: 0, exempt: true };
  }
  // 기본공제 250만원
  const baseExemption = 2_500_000;
  let longTermRate = 0;
  if (holdYears >= 15) longTermRate = 0.3;
  else if (holdYears >= 10) longTermRate = 0.2;
  else if (holdYears >= 5) longTermRate = 0.1;
  else if (holdYears >= 3) longTermRate = 0.06;
  const longTermDeduction = Math.round(profit * longTermRate);
  const taxable = Math.max(0, profit - longTermDeduction - baseExemption);
  // 단기 보유 가산
  let rate: number;
  if (holdYears < 1 || holdMonths < 12) rate = 0.7;
  else if (holdYears < 2) rate = 0.6;
  else {
    // 일반 누진세율 (소득세와 동일)
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
  // 단순화: 주택 시가표준액 × 누진세율
  let rate: number;
  if (stdValue <= 60_000_000) rate = 0.001;
  else if (stdValue <= 150_000_000) rate = 0.0015;
  else if (stdValue <= 300_000_000) rate = 0.0025;
  else rate = 0.004;
  return { tax: Math.round(stdValue * rate), rate };
}

export default function RealEstateTaxTool() {
  const [mode, setMode] = useState<Mode>("acquisition");

  // Acquisition
  const [price, setPrice] = useState(500_000_000);
  const [isHouse, setIsHouse] = useState(true);
  const [isMulti, setIsMulti] = useState(false);
  const [area, setArea] = useState(85);

  // Transfer
  const [profit, setProfit] = useState(100_000_000);
  const [holdYears, setHoldYears] = useState(3);
  const [holdMonths, setHoldMonths] = useState(0);
  const [is1House, setIs1House] = useState(true);

  // Property
  const [stdValue, setStdValue] = useState(300_000_000);

  const acq = useMemo(() => calcAcquisitionTax(price, isHouse, isMulti, area), [price, isHouse, isMulti, area]);
  const tr = useMemo(() => calcTransferTax(profit, holdYears, is1House, holdMonths), [profit, holdYears, is1House, holdMonths]);
  const prop = useMemo(() => calcPropertyTax(stdValue), [stdValue]);

  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(["acquisition", "transfer", "property"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded text-sm ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {m === "acquisition" ? "🏠 취득세" : m === "transfer" ? "💸 양도세" : "📋 재산세"}
          </button>
        ))}
      </div>

      {mode === "acquisition" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label>
              매매가 (원)
              <input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{fmt(price)}원 ({(price / 100_000_000).toFixed(2)}억)</div>
            </label>
            <label>
              전용면적 (㎡)
              <input type="number" value={area} onChange={(e) => setArea(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">85㎡(약 26평) 초과 시 농특세 가산</div>
            </label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={isHouse} onChange={(e) => setIsHouse(e.target.checked)} /> 주택 (오피스텔·상가는 체크 해제)</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={isMulti} onChange={(e) => setIsMulti(e.target.checked)} /> 다주택자 (2주택 이상)</label>
          </div>

          <div className="card-section space-y-1 text-sm">
            <div className="flex justify-between"><span>적용 세율</span><span>{(acq.baseRate * 100).toFixed(1)}%</span></div>
            <div className="flex justify-between"><span>취득세 본세</span><span>{fmt(acq.base)}원</span></div>
            <div className="flex justify-between text-muted"><span>지방교육세 (취득세 ×10%)</span><span>+{fmt(acq.localEdu)}원</span></div>
            {acq.ruralSpecial > 0 && (
              <div className="flex justify-between text-muted"><span>농어촌특별세 (취득세 ×10%)</span><span>+{fmt(acq.ruralSpecial)}원</span></div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <div className="flex justify-between font-bold"><span>총 취득세</span><span className="text-red-600">{fmt(acq.total)}원</span></div>
            <div className="text-xs text-muted">매매가 대비 {((acq.total / price) * 100).toFixed(2)}%</div>
          </div>
        </>
      )}

      {mode === "transfer" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label className="sm:col-span-2">
              양도차익 (양도가 − 취득가 − 필요경비, 원)
              <input type="number" value={profit} onChange={(e) => setProfit(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              <div className="text-xs text-muted mt-1">{fmt(profit)}원</div>
            </label>
            <label>
              보유 기간 (년)
              <input type="number" min={0} value={holdYears} onChange={(e) => setHoldYears(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>
              보유 기간 (개월, 1년 미만)
              <input type="number" min={0} max={11} value={holdMonths} onChange={(e) => setHoldMonths(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label className="sm:col-span-2 flex items-center gap-2"><input type="checkbox" checked={is1House} onChange={(e) => setIs1House(e.target.checked)} /> 1세대 1주택 (12억 이하 + 2년 거주 시 비과세)</label>
          </div>

          <div className="card-section space-y-1 text-sm">
            {tr.exempt ? (
              <div className="text-green-600 font-semibold">✓ 1세대 1주택 비과세 요건 충족 (양도세 0원)</div>
            ) : (
              <>
                <div className="flex justify-between"><span>과세표준</span><span>{fmt(tr.taxable)}원</span></div>
                <div className="flex justify-between"><span>적용 세율</span><span>{(tr.rate * 100).toFixed(0)}%</span></div>
                <div className="flex justify-between"><span>양도소득세</span><span>{fmt(tr.tax)}원</span></div>
                <div className="flex justify-between text-muted"><span>지방소득세 (10%)</span><span>+{fmt(tr.localTax)}원</span></div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <div className="flex justify-between font-bold"><span>총 양도세</span><span className="text-red-600">{fmt(tr.total)}원</span></div>
              </>
            )}
          </div>
        </>
      )}

      {mode === "property" && (
        <>
          <label className="block text-sm">
            주택 시가표준액 (원)
            <input type="number" value={stdValue} onChange={(e) => setStdValue(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <div className="text-xs text-muted mt-1">국토교통부 공시가격 (실거래가 70~80% 수준)</div>
          </label>

          <div className="card-section space-y-1 text-sm">
            <div className="flex justify-between"><span>적용 세율</span><span>{(prop.rate * 100).toFixed(2)}%</span></div>
            <div className="flex justify-between font-bold"><span>연간 재산세 (본세)</span><span className="text-red-600">{fmt(prop.tax)}원</span></div>
            <div className="text-xs text-muted mt-1">지방교육세·도시지역분 별도 가산 가능. 종부세는 별도 계산 (공시가 9억 또는 6억 초과 시 발생).</div>
          </div>
        </>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 한국 지방세법·소득세법 기준 추정. 조정대상지역·생애최초·다주택 가산세·1세대 1주택 거주 요건 등 복잡한 변수가 많아 실제 세액과 차이가 있을 수 있습니다. 정확한 계산은 위택스(wetax)·홈택스 또는 세무사 상담을 권장합니다.
      </div>
    </div>
  );
}
