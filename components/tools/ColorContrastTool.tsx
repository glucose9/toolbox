"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const full = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
  const n = parseInt(full, 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function relLum([r, g, b]: [number, number, number]): number {
  const norm = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * norm(r) + 0.7152 * norm(g) + 0.0722 * norm(b);
}

function contrast(a: string, b: string): number | null {
  const ra = hexToRgb(a);
  const rb = hexToRgb(b);
  if (!ra || !rb) return null;
  const la = relLum(ra);
  const lb = relLum(rb);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export default function ColorContrastTool() {
  const t = useTranslations("toolUI.color-contrast");
  const [fg, setFg] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");

  const ratio = useMemo(() => contrast(fg, bg), [fg, bg]);

  const grade = (r: number, large: boolean) => {
    const aa = large ? 3 : 4.5;
    const aaa = large ? 4.5 : 7;
    if (r >= aaa) return { label: t("aaaPass"), color: "text-green-600" };
    if (r >= aa) return { label: t("aaPass"), color: "text-lime-600" };
    return { label: t("fail"), color: "text-red-600" };
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">{t("textColor")}</label>
          <div className="flex gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-12 h-9 p-0 border border-gray-200 dark:border-gray-700 rounded" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono" />
          </div>
        </div>
        <div>
          <label className="label">{t("bgColor")}</label>
          <div className="flex gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-9 p-0 border border-gray-200 dark:border-gray-700 rounded" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono" />
          </div>
        </div>
      </div>

      <div style={{ background: bg, color: fg }} className="p-6 rounded border border-gray-300 dark:border-gray-700">
        <p className="text-sm">{t("normalSample")}</p>
        <p className="text-xl font-bold mt-2">{t("largeSample")}</p>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold">{ratio ? ratio.toFixed(2) : "—"}<span className="text-base text-muted">:1</span></div>
        <div className="text-xs text-muted mt-1">{t("ratioCaption")}</div>
      </div>

      {ratio && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="font-medium mb-1">{t("normalText")}</div>
            <div className={grade(ratio, false).color}>{grade(ratio, false).label}</div>
            <div className="text-xs text-muted mt-1">AA ≥ 4.5, AAA ≥ 7</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="font-medium mb-1">{t("largeText")}</div>
            <div className={grade(ratio, true).color}>{grade(ratio, true).label}</div>
            <div className="text-xs text-muted mt-1">AA ≥ 3, AAA ≥ 4.5</div>
          </div>
        </div>
      )}
    </div>
  );
}
