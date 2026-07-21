"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function TextDedupeTool() {
  const t = useTranslations("toolUI.text-dedupe");
  const [text, setText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreSpace, setIgnoreSpace] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = text ? text.split(/\r?\n/) : [];
  const seen = new Set<string>();
  let removed = 0;
  const keptLines = lines
    .filter((line) => {
      if (removeEmpty && line.trim() === "") {
        removed++;
        return false;
      }
      let key = line;
      if (ignoreCase) key = key.toLowerCase();
      if (ignoreSpace) key = key.replace(/\s+/g, "");
      if (seen.has(key)) {
        removed++;
        return false;
      }
      seen.add(key);
      return true;
    });
  const result = keptLines.join("\n");

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
          {t("ignoreCase")}
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={ignoreSpace} onChange={(e) => setIgnoreSpace(e.target.checked)} />
          {t("ignoreSpace")}
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          {t("removeEmpty")}
        </label>
      </div>
      <textarea
        readOnly
        value={result}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="text-xs text-muted">
        {t("stats", { total: lines.length, unique: keptLines.length, removed })}
      </div>
      <button onClick={copy} disabled={!result} className="btn btn-primary disabled:opacity-50">
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}
