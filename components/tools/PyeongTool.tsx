"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// 1평 = 3.3058㎡ (정확히는 400/121)
const PY_TO_SQM = 400 / 121;

export default function PyeongTool() {
  const t = useTranslations("toolUI.pyeong");
  const [pyeong, setPyeong] = useState("32");
  const [sqm, setSqm] = useState((32 * PY_TO_SQM).toFixed(2));
  // 표시용 문자열은 2자리 반올림이므로 파생값 계산에는 정밀 원본값을 따로 보관한다
  const [exactSqm, setExactSqm] = useState(32 * PY_TO_SQM);

  const updatePy = (v: string) => {
    setPyeong(v);
    const n = parseFloat(v);
    setSqm(isNaN(n) ? "" : (n * PY_TO_SQM).toFixed(2));
    setExactSqm(isNaN(n) ? 0 : n * PY_TO_SQM);
  };
  const updateSqm = (v: string) => {
    setSqm(v);
    const n = parseFloat(v);
    setPyeong(isNaN(n) ? "" : (n / PY_TO_SQM).toFixed(2));
    setExactSqm(isNaN(n) ? 0 : n);
  };

  const presets = [
    { label: t("presetOneroom"), py: 7, note: t("presetOneroomNote") },
    { label: t("presetTworoom"), py: 13, note: t("presetTworoomNote") },
    { label: t("preset20"), py: 24, note: t("preset20Note") },
    { label: t("preset30"), py: 33, note: t("preset30Note") },
    { label: t("preset40"), py: 42, note: t("preset40Note") },
    { label: t("preset50"), py: 52, note: t("preset50Note") },
  ];

  const sqmN = exactSqm;
  const py = exactSqm / PY_TO_SQM;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("pyeongLabel")}</label>
          <input
            type="number"
            value={pyeong}
            onChange={(e) => updatePy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg"
          />
        </div>
        <div>
          <label className="label">{t("sqmLabel")}</label>
          <input
            type="number"
            value={sqm}
            onChange={(e) => updateSqm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-lg"
          />
        </div>
      </div>

      <div className="card-section text-sm space-y-1">
        <div className="font-semibold mb-1">{t("conversionTitle")}</div>
        <div>📐 {py.toFixed(2)} {t("pyeongUnit")} = {sqmN.toFixed(2)} ㎡ = {(sqmN * 10.7639).toFixed(2)} ft²</div>
        <div>📏 {t("squareSide", { side: Math.sqrt(sqmN).toFixed(2) })}</div>
        <div>🏠 {t("exclusiveArea", { val: (py * 0.78).toFixed(1) })}</div>
      </div>

      <div>
        <label className="label">{t("commonSizes")}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => updatePy(p.py.toString())}
              className="px-3 py-2 text-left rounded border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-sm"
            >
              <div className="font-semibold">{p.label} ({p.py}{t("pyeongUnit")})</div>
              <div className="text-xs text-muted">{p.note}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
