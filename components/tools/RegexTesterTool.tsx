"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const FLAGS = ["g", "i", "m", "s", "u", "y"] as const;
type Flag = (typeof FLAGS)[number];

export default function RegexTesterTool() {
  const t = useTranslations("toolUI.regex-tester");
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [flags, setFlags] = useState<Flag[]>(["g"]);
  const [input, setInput] = useState("Hello, world! Hello, Claude.");
  const [replacement, setReplacement] = useState("[$&]");

  const { error, matches, replaced, highlighted } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags.join(""));
      const ms: { match: string; groups: string[]; index: number }[] = [];
      const src = input;
      if (flags.includes("g")) {
        for (const m of src.matchAll(re)) {
          ms.push({ match: m[0], groups: m.slice(1), index: m.index ?? 0 });
        }
      } else {
        const m = src.match(re);
        if (m) ms.push({ match: m[0], groups: m.slice(1), index: m.index ?? 0 });
      }
      const rep = src.replace(re, replacement);

      let html = "";
      let i = 0;
      for (const m of ms) {
        html += escape(src.slice(i, m.index));
        html += `<mark class="bg-yellow-300 dark:bg-yellow-600 dark:text-white rounded px-0.5">${escape(m.match)}</mark>`;
        i = m.index + m.match.length;
        if (!flags.includes("g")) break;
      }
      html += escape(src.slice(i));
      return { error: "", matches: ms, replaced: rep, highlighted: html };
    } catch (e) {
      return { error: (e as Error).message, matches: [], replaced: "", highlighted: escape(input) };
    }
  }, [pattern, flags, input, replacement]);

  const toggleFlag = (f: Flag) => {
    setFlags((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-muted">/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
        />
        <span className="text-muted">/</span>
        <div className="flex gap-1">
          {FLAGS.map((f) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              className={`w-7 h-7 rounded text-xs font-bold ${flags.includes(f) ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">❌ {error}</div>}

      <div>
        <label className="label">{t("testString")}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
        />
      </div>

      <div>
        <label className="label">{t("highlight")}</label>
        <div
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>

      <div className="text-sm text-muted">{t("matches")}: {matches.length}</div>
      {matches.length > 0 && matches[0].groups.length > 0 && (
        <details className="text-sm">
          <summary className="cursor-pointer">{t("viewGroups")}</summary>
          <ul className="mt-2 space-y-1 font-mono text-xs">
            {matches.slice(0, 20).map((m, i) => (
              <li key={i}>
                #{i + 1} <span className="text-muted">@{m.index}</span>: {m.match}
                {m.groups.length > 0 && (
                  <span className="text-muted"> [groups: {m.groups.map((g) => JSON.stringify(g)).join(", ")}]</span>
                )}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div>
        <label className="label">{t("replacementPreview")}</label>
        <input
          type="text"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono"
        />
        <textarea
          readOnly
          value={replaced}
          className="mt-2 w-full h-20 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
        />
      </div>
    </div>
  );
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]!));
}
