"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return Object.keys(obj)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys(obj[k]);
        return acc;
      }, {});
  }
  return value;
}

export default function JsonFormatterTool() {
  const t = useTranslations("toolUI.json-formatter");
  const [text, setText] = useState("");
  const [indent, setIndent] = useState<"2" | "4" | "tab">("2");
  const [doSort, setDoSort] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [copied, setCopied] = useState(false);

  const parse = (): { ok: boolean; value: unknown } => {
    try {
      const value = JSON.parse(text);
      setError("");
      setValidated(true);
      return { ok: true, value };
    } catch (e) {
      setError((e as Error).message);
      setValidated(false);
      return { ok: false, value: null };
    }
  };

  const format = (minified = false) => {
    const parsed = parse();
    if (!parsed.ok) return;
    const target = doSort ? sortKeys(parsed.value) : parsed.value;
    const indentStr = minified ? 0 : indent === "tab" ? "\t" : parseInt(indent, 10);
    setText(JSON.stringify(target, null, indentStr as never));
  };

  const validate = () => {
    parse();
  };

  const copy = async () => {
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
          setValidated(false);
        }}
        placeholder='{"hello": "world"}'
        className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          {t("indent")}:
          <select value={indent} onChange={(e) => setIndent(e.target.value as "2" | "4" | "tab")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="2">{t("twoSpaces")}</option>
            <option value="4">{t("fourSpaces")}</option>
            <option value="tab">{t("tab")}</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={doSort} onChange={(e) => setDoSort(e.target.checked)} />
          {t("sortKeys")}
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => format(false)} className="btn btn-primary">{t("format")}</button>
        <button onClick={() => format(true)} className="btn btn-secondary">{t("minify")}</button>
        <button onClick={validate} className="btn btn-secondary">{t("validateOnly")}</button>
        <button onClick={copy} className="btn btn-secondary">{t("copy")}{copied ? " ✓" : ""}</button>
      </div>
      {error ? (
        <div className="text-sm text-red-600">❌ {error}</div>
      ) : validated && text ? (
        <div className="text-sm text-green-600">✓ {t("validJson")}</div>
      ) : null}
    </div>
  );
}
