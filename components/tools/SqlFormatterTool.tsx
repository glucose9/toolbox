"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";

const DIALECTS = [
  "sql", "mysql", "postgresql", "sqlite", "mariadb", "transactsql",
  "bigquery", "snowflake", "redshift", "spark", "db2", "plsql", "n1ql", "trino",
] as const;

type Dialect = (typeof DIALECTS)[number];

const SAMPLE = `select u.id, u.name, count(o.id) as cnt from users u left join orders o on u.id = o.user_id where u.created_at > '2024-01-01' group by u.id, u.name having count(o.id) > 5 order by cnt desc limit 10;`;

export default function SqlFormatterTool() {
  const [input, setInput] = useState(SAMPLE);
  const [dialect, setDialect] = useState<Dialect>("sql");
  const [tabWidth, setTabWidth] = useState(2);
  const [keywordCase, setKeywordCase] = useState<"upper" | "lower" | "preserve">("upper");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      return {
        output: format(input, { language: dialect as Parameters<typeof format>[1] extends infer P ? P extends { language?: infer L } ? L : never : never, tabWidth, keywordCase }),
        error: "",
      };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, dialect, tabWidth, keywordCase]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-3 items-end text-sm">
        <label>
          dialect
          <select value={dialect} onChange={(e) => setDialect(e.target.value as Dialect)} className="ml-2 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            {DIALECTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label>
          들여쓰기
          <select value={tabWidth} onChange={(e) => setTabWidth(+e.target.value)} className="ml-2 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="2">2칸</option>
            <option value="4">4칸</option>
          </select>
        </label>
        <label>
          키워드
          <select value={keywordCase} onChange={(e) => setKeywordCase(e.target.value as "upper" | "lower" | "preserve")} className="ml-2 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value="upper">대문자</option>
            <option value="lower">소문자</option>
            <option value="preserve">그대로</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">포맷 결과</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-80 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
