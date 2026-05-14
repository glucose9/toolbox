"use client";

import { useState } from "react";

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
  const [text, setText] = useState("");
  const [indent, setIndent] = useState<"2" | "4" | "tab">("2");
  const [doSort, setDoSort] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parse = () => {
    try {
      const v = JSON.parse(text);
      setError("");
      return v;
    } catch (e) {
      setError((e as Error).message);
      return null;
    }
  };

  const format = (minified = false) => {
    const v = parse();
    if (v === null && error) return;
    const target = doSort ? sortKeys(v) : v;
    const indentStr = minified ? 0 : indent === "tab" ? "\t" : parseInt(indent, 10);
    setText(JSON.stringify(target, null, indentStr as never));
  };

  const validate = () => {
    parse();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        placeholder='{"hello": "world"}'
        className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          들여쓰기:
          <select value={indent} onChange={(e) => setIndent(e.target.value as "2" | "4" | "tab")} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="2">2칸</option>
            <option value="4">4칸</option>
            <option value="tab">탭</option>
          </select>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={doSort} onChange={(e) => setDoSort(e.target.checked)} />
          키 정렬
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => format(false)} className="btn btn-primary">정렬</button>
        <button onClick={() => format(true)} className="btn btn-secondary">한 줄로 압축</button>
        <button onClick={validate} className="btn btn-secondary">검증만</button>
        <button onClick={copy} className="btn btn-secondary">복사{copied ? " ✓" : ""}</button>
      </div>
      {error ? (
        <div className="text-sm text-red-600">❌ {error}</div>
      ) : text ? (
        <div className="text-sm text-green-600">✓ 유효한 JSON</div>
      ) : null}
    </div>
  );
}
