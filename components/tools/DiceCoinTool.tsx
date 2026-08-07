"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DICE = [4, 6, 8, 10, 12, 20, 100];

function rand(max: number): number {
  return (crypto.getRandomValues(new Uint32Array(1))[0] % max) + 1;
}

export default function DiceCoinTool() {
  const t = useTranslations("toolUI.dice-coin");
  const tc = useTranslations("common");
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [coin, setCoin] = useState("");

  const roll = () => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) out.push(rand(sides));
    setResults(out);
  };

  const flip = () => setCoin(rand(2) === 1 ? t("heads") : t("tails"));

  const sum = results.reduce((s, n) => s + n, 0);

  return (
    <div className="card space-y-4">
      <div>
        <label className="label">{t("sides")}</label>
        <div className="flex flex-wrap gap-1">
          {DICE.map((s) => (
            <button key={s} onClick={() => setSides(s)} className={`btn ${sides === s ? "btn-primary" : "btn-secondary"}`}>D{s}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">{t("count")}</label><input type="number" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <button onClick={roll} className="btn btn-primary self-end">{t("roll")}</button>
      </div>
      {results.length > 0 && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {results.map((r, i) => (
              <span key={i} className="w-12 h-12 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center text-xl font-bold border border-gray-200 dark:border-gray-700">{r}</span>
            ))}
          </div>
          {results.length > 1 && <div className="text-sm text-muted">{t("sum")}: <strong>{sum}</strong></div>}
        </div>
      )}
      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1 space-y-2">
          <button onClick={flip} className="btn btn-primary w-full">{t("flipCoin")}</button>
          {coin && (
            <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-4 text-center">
              <span className="inline-flex min-w-12 h-12 px-3 rounded-lg bg-white dark:bg-gray-900 items-center justify-center text-xl font-bold border border-gray-200 dark:border-gray-700">{coin}</span>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
