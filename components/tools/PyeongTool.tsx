"use client";

import { useState } from "react";

// 1평 = 3.3058㎡ (정확히는 400/121)
const PY_TO_SQM = 400 / 121;

export default function PyeongTool() {
  const [pyeong, setPyeong] = useState("32");
  const [sqm, setSqm] = useState((32 * PY_TO_SQM).toFixed(2));

  const updatePy = (v: string) => {
    setPyeong(v);
    const n = parseFloat(v);
    setSqm(isNaN(n) ? "" : (n * PY_TO_SQM).toFixed(2));
  };
  const updateSqm = (v: string) => {
    setSqm(v);
    const n = parseFloat(v);
    setPyeong(isNaN(n) ? "" : (n / PY_TO_SQM).toFixed(2));
  };

  const presets = [
    { label: "원룸", py: 7, note: "약 23㎡, 1인 거주" },
    { label: "투룸", py: 13, note: "약 43㎡, 신혼·1인" },
    { label: "20평대", py: 24, note: "약 79㎡, 2~3인 가족" },
    { label: "30평대", py: 33, note: "약 109㎡, 4인 가족 표준" },
    { label: "40평대", py: 42, note: "약 139㎡, 대형 평형" },
    { label: "50평대", py: 52, note: "약 172㎡, 펜트하우스급" },
  ];

  const py = parseFloat(pyeong) || 0;
  const sqmN = parseFloat(sqm) || 0;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">평</label>
          <input
            type="number"
            value={pyeong}
            onChange={(e) => updatePy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg"
          />
        </div>
        <div>
          <label className="label">제곱미터 (㎡)</label>
          <input
            type="number"
            value={sqm}
            onChange={(e) => updateSqm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg"
          />
        </div>
      </div>

      <div className="card-section text-sm space-y-1">
        <div className="font-semibold mb-1">단위 환산</div>
        <div>📐 {py.toFixed(2)} 평 = {sqmN.toFixed(2)} ㎡ = {(sqmN * 10.7639).toFixed(2)} ft²</div>
        <div>📏 한 변이 {Math.sqrt(sqmN).toFixed(2)}m 인 정사각형 면적</div>
        <div>🏠 분양면적이면 전용면적은 약 {(py * 0.78).toFixed(1)}평 (전용률 약 78% 가정)</div>
      </div>

      <div>
        <label className="label">자주 쓰는 평수</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => updatePy(p.py.toString())}
              className="px-3 py-2 text-left rounded border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-sm"
            >
              <div className="font-semibold">{p.label} ({p.py}평)</div>
              <div className="text-xs text-muted">{p.note}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 1평 = 400/121 ≈ 3.3058㎡. 한국 부동산 광고는 분양면적 기준(공용 포함)이 흔해, 실제 전용면적은 70~80% 수준입니다. 법적으로 면적 표기는 ㎡가 원칙입니다.
      </div>
    </div>
  );
}
