"use client";

import { useMemo, useState } from "react";

type Dir = "csv-to-json" | "json-to-csv";

function parseCsv(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === delim) {
        cur.push(field);
        field = "";
      } else if (c === "\n") {
        cur.push(field);
        rows.push(cur);
        cur = [];
        field = "";
      } else if (c === "\r") {
        // ignore (handle \r\n)
      } else {
        field += c;
      }
    }
  }
  if (field !== "" || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.length > 0 && !(r.length === 1 && r[0] === ""));
}

function escapeCsv(v: string, delim: string): string {
  if (v.includes('"') || v.includes(delim) || v.includes("\n")) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

export default function CsvToJsonTool() {
  const [dir, setDir] = useState<Dir>("csv-to-json");
  const [input, setInput] = useState("name,age,city\nAlice,30,Seoul\nBob,25,Busan");
  const [delim, setDelim] = useState(",");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      if (dir === "csv-to-json") {
        const rows = parseCsv(input, delim);
        if (rows.length === 0) return { output: "[]", error: "" };
        const [header, ...data] = rows;
        const json = data.map((row) =>
          header.reduce<Record<string, string>>((acc, key, i) => {
            acc[key] = row[i] ?? "";
            return acc;
          }, {})
        );
        return { output: JSON.stringify(json, null, 2), error: "" };
      } else {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) throw new Error("JSON 배열이어야 합니다.");
        if (parsed.length === 0) return { output: "", error: "" };
        const headerSet = new Set<string>();
        for (const row of parsed) {
          if (row && typeof row === "object") for (const k of Object.keys(row)) headerSet.add(k);
        }
        const headers = [...headerSet];
        const lines = [headers.map((h) => escapeCsv(h, delim)).join(delim)];
        for (const row of parsed) {
          lines.push(
            headers
              .map((h) => {
                const v = (row as Record<string, unknown>)[h];
                return escapeCsv(v == null ? "" : String(v), delim);
              })
              .join(delim)
          );
        }
        return { output: lines.join("\n"), error: "" };
      }
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [dir, input, delim]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const ext = dir === "csv-to-json" ? "json" : "csv";
    const blob = new Blob([output], { type: ext === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-3 text-sm items-center">
        <div className="flex gap-2">
          <button onClick={() => setDir("csv-to-json")} className={`btn ${dir === "csv-to-json" ? "btn-primary" : "btn-secondary"}`}>CSV → JSON</button>
          <button onClick={() => setDir("json-to-csv")} className={`btn ${dir === "json-to-csv" ? "btn-primary" : "btn-secondary"}`}>JSON → CSV</button>
        </div>
        <label className="flex items-center gap-1">
          구분자
          <select value={delim} onChange={(e) => setDelim(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
            <option value=",">쉼표(,)</option>
            <option value=";">세미콜론(;)</option>
            <option value={"\t"}>탭(\t)</option>
            <option value="|">파이프(|)</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">출력</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
        <button onClick={download} disabled={!output} className="btn btn-secondary disabled:opacity-50">파일 다운로드</button>
      </div>
    </div>
  );
}
