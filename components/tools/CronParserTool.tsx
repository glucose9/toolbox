"use client";

import { useMemo, useState } from "react";
import { CronExpressionParser } from "cron-parser";

const PRESETS = [
  { label: "매분", expr: "* * * * *" },
  { label: "매시 정각", expr: "0 * * * *" },
  { label: "매일 자정", expr: "0 0 * * *" },
  { label: "매주 월 9시", expr: "0 9 * * 1" },
  { label: "매월 1일 자정", expr: "0 0 1 * *" },
  { label: "평일 9시", expr: "0 9 * * 1-5" },
  { label: "15분마다", expr: "*/15 * * * *" },
];

function describe(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5 && parts.length !== 6) return "5필드 또는 6필드(초 포함) 형식이어야 합니다.";
  const [...rest] = parts.length === 6 ? parts : ["0", ...parts];
  const [sec, min, hour, dom, mon, dow] = rest;
  const desc: string[] = [];
  desc.push(min === "*" ? "매분" : `분: ${min}`);
  desc.push(hour === "*" ? "매시" : `시: ${hour}`);
  if (dom !== "*") desc.push(`매월 ${dom}일`);
  if (mon !== "*") desc.push(`${mon}월`);
  if (dow !== "*") desc.push(`요일: ${dow} (0=일)`);
  if (parts.length === 6 && sec !== "0") desc.push(`초: ${sec}`);
  return desc.join(", ");
}

export default function CronParserTool() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const { description, next, error } = useMemo(() => {
    try {
      const iter = CronExpressionParser.parse(expr);
      const list: string[] = [];
      for (let i = 0; i < 10; i++) {
        list.push(iter.next().toDate().toLocaleString());
      }
      return { description: describe(expr), next: list, error: "" };
    } catch (e) {
      return { description: "", next: [], error: (e as Error).message };
    }
  }, [expr]);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">Cron 표현식 (분 시 일 월 요일)</label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="예: 0 9 * * 1"
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs">
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => setExpr(p.expr)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            {p.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className="text-sm text-red-600">❌ {error}</div>
      ) : (
        <>
          <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3 text-sm">
            <div className="text-xs text-muted">의미</div>
            <div className="font-medium">{description}</div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">다음 10회 실행 시각</div>
            <ol className="text-sm font-mono space-y-0.5 bg-gray-50 dark:bg-gray-900 p-3 rounded">
              {next.map((t, i) => (
                <li key={i}>
                  <span className="text-muted">{i + 1}.</span> {t}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
