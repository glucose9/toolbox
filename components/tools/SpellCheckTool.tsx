"use client";

import { useMemo, useState } from "react";
import { Issue, RULES, applyFixes, checkSpelling, getContext } from "@/lib/spellcheck";

const SAMPLE = "오랫만에 친구한테서 메세지가 왔는데 왠지 답장하기가 싫었다. 됬어 그냥 안되 안그래도 바뻐. 어떻해야 할께 모르겠어. 떡볶기 먹고싶다.";

export default function SpellCheckTool() {
  const [text, setText] = useState(SAMPLE);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const allIssues = useMemo(() => checkSpelling(text), [text]);
  const issues = allIssues.filter((i) => !dismissed.has(`${i.start}:${i.original}`));

  const applyOne = (issue: Issue) => {
    const next = text.slice(0, issue.start) + issue.fix + text.slice(issue.end);
    setText(next);
  };

  const applyAll = () => {
    const safe = issues.filter((i) => !i.caution);
    if (safe.length === 0) return;
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
          <label className="label">검사할 텍스트</label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setDismissed(new Set());
            }}
            placeholder="여기에 한국어 텍스트를 입력하세요"
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y"
          />
        </div>
        <div>
          <label className="label">
            결과 ({issues.length}개{dismissed.size > 0 && `, ${dismissed.size}개 무시됨`})
          </label>
          <div className="border border-gray-200 dark:border-gray-700 rounded h-72 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {issues.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted">
                {text.trim() === "" ? "텍스트를 입력하세요" : "✓ 검사 규칙에 걸리는 표현이 없어요"}
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
                            ⚠ 문맥확인
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
                          ✓ 적용
                        </button>
                        <button onClick={() => dismiss(i)} className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                          무시
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
          전체 적용 ({issues.filter((i) => !i.caution).length}개)
        </button>
        {dismissed.size > 0 && (
          <button onClick={reset} className="btn btn-secondary">무시 목록 초기화</button>
        )}
        <div className="text-xs text-muted flex flex-wrap gap-2 ml-auto">
          {Object.entries(byCategory).map(([k, v]) => (
            <span key={k}>{k} {v}</span>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
        <strong>⚠ 초중급 검사기입니다.</strong> {RULES.length}개의 자주 틀리는 규칙으로 검사하는 가벼운 도구라, 문맥이 필요한 오류(예: 결제/결재, 다르다/틀리다)는 잡지 못합니다.
        외부 서버 없이 전부 브라우저 안에서 처리되며 텍스트는 어디로도 전송되지 않습니다. 정확한 검수가 필요하면 전문 도구를 함께 쓰세요.
      </div>
    </div>
  );
}
