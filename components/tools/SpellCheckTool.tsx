"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Issue, RULES, applyFixes, checkSpelling, getContext } from "@/lib/spellcheck";

const SAMPLE = "오랫만에 친구한테서 메세지가 왔는데 왠지 답장하기가 싫었다. 됬어 그냥 안되 안그래도 바뻐. 어떻해야 할께 모르겠어. 떡볶기 먹고싶다.";

export default function SpellCheckTool() {
  const t = useTranslations("toolUI.spell-check");
  const [text, setText] = useState(SAMPLE);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const allIssues = useMemo(() => checkSpelling(text), [text]);
  const issues = allIssues.filter((i) => !dismissed.has(`${i.start}:${i.original}`));

  const shiftDismissed = (applied: Issue[]) => {
    setDismissed((prev) => {
      const next = new Set<string>();
      for (const key of prev) {
        const sep = key.indexOf(":");
        const start = Number(key.slice(0, sep));
        const original = key.slice(sep + 1);
        let delta = 0;
        for (const a of applied) if (a.end <= start) delta += a.fix.length - (a.end - a.start);
        next.add(`${start + delta}:${original}`);
      }
      return next;
    });
  };

  const applyOne = (issue: Issue) => {
    const next = text.slice(0, issue.start) + issue.fix + text.slice(issue.end);
    shiftDismissed([issue]);
    setText(next);
  };

  const applyAll = () => {
    const safe = issues.filter((i) => !i.caution);
    if (safe.length === 0) return;
    shiftDismissed(safe);
    setText(applyFixes(text, safe));
  };

  const dismiss = (issue: Issue) => {
    setDismissed((prev) => new Set(prev).add(`${issue.start}:${issue.original}`));
  };

  const reset = () => {
    setDismissed(new Set());
  };

  const byCategory = issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">{t("textLabel")}</label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setDismissed(new Set());
            }}
            placeholder={t("textPlaceholder")}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y"
          />
        </div>
        <div>
          <label className="label">
            {t("resultLabel", { n: issues.length })}{dismissed.size > 0 && t("dismissedSuffix", { n: dismissed.size })}
          </label>
          <div className="border border-gray-200 dark:border-gray-700 rounded h-72 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {issues.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted">
                {text.trim() === "" ? t("emptyInput") : t("noIssues")}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {issues.map((i, idx) => {
                  const ctx = getContext(text, i);
                  return (
                    <li key={`${i.start}-${idx}`} className="p-3 text-sm">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {i.category}
                        </span>
                        {i.caution && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                            {t("contextCheck")}
                          </span>
                        )}
                        <span className="line-through text-red-600">{i.original}</span>
                        <span className="text-muted">→</span>
                        <span className="text-green-600 font-medium">{i.fix}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted font-mono">
                        …{ctx.before}<span className="text-red-600 font-semibold">{i.original}</span>{ctx.after}…
                      </div>
                      <div className="mt-1 text-xs text-muted">{i.reason}</div>
                      <div className="mt-1.5 flex gap-2">
                        <button onClick={() => applyOne(i)} className="text-xs px-2 py-0.5 rounded bg-brand-600 text-white hover:bg-brand-700">
                          {t("apply")}
                        </button>
                        <button onClick={() => dismiss(i)} className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                          {t("dismiss")}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          onClick={applyAll}
          disabled={issues.filter((i) => !i.caution).length === 0}
          className="btn btn-primary disabled:opacity-50"
        >
          {t("applyAll", { n: issues.filter((i) => !i.caution).length })}
        </button>
        {dismissed.size > 0 && (
          <button onClick={reset} className="btn btn-secondary">{t("resetDismissed")}</button>
        )}
        <div className="text-xs text-muted flex flex-wrap gap-2 ml-auto">
          {Object.entries(byCategory).map(([k, v]) => (
            <span key={k}>{k} {v}</span>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800" dangerouslySetInnerHTML={{ __html: t("disclaimer", { n: RULES.length }) }} />
    </div>
  );
}
