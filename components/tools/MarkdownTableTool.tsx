"use client";

import { useMemo, useState } from "react";

type Align = "left" | "center" | "right";

function buildMd(headers: string[], rows: string[][], aligns: Align[]): string {
  if (headers.length === 0) return "";
  const w = headers.map((h, i) => Math.max(3, h.length, ...rows.map((r) => (r[i] || "").length)));
  const fmt = (s: string, i: number) => " " + (s || "").padEnd(w[i], " ") + " ";
  const sep = aligns.map((a, i) => {
    const dash = "-".repeat(w[i]);
    if (a === "center") return ":" + dash.slice(0, -1) + ":";
    if (a === "right") return dash.slice(0, -1) + ":";
    if (a === "left") return ":" + dash.slice(0, -1);
    return dash;
  });
  const out: string[] = [];
  out.push("|" + headers.map((h, i) => fmt(h, i)).join("|") + "|");
  out.push("|" + sep.map((s) => ` ${s} `).join("|") + "|");
  for (const r of rows) out.push("|" + headers.map((_, i) => fmt(r[i] || "", i)).join("|") + "|");
  return out.join("\n");
}

export default function MarkdownTableTool() {
  const [headers, setHeaders] = useState<string[]>(["이름", "나이", "도시"]);
  const [rows, setRows] = useState<string[][]>([
    ["김민준", "30", "서울"],
    ["이서연", "25", "부산"],
  ]);
  const [aligns, setAligns] = useState<Align[]>(["left", "center", "right"]);
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => buildMd(headers, rows, aligns), [headers, rows, aligns]);

  const addRow = () => setRows((r) => [...r, headers.map(() => "")]);
  const removeRow = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  const addCol = () => {
    setHeaders((h) => [...h, `열 ${h.length + 1}`]);
    setRows((r) => r.map((row) => [...row, ""]));
    setAligns((a) => [...a, "left"]);
  };
  const removeCol = (i: number) => {
    if (headers.length <= 1) return;
    setHeaders((h) => h.filter((_, idx) => idx !== i));
    setRows((r) => r.map((row) => row.filter((_, idx) => idx !== i)));
    setAligns((a) => a.filter((_, idx) => idx !== i));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="p-1 align-bottom">
                  <input
                    value={h}
                    onChange={(e) => setHeaders((hs) => hs.map((x, idx) => (idx === i ? e.target.value : x)))}
                    className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-semibold min-w-24"
                  />
                  <div className="flex gap-1 mt-1 justify-center text-xs">
                    {(["left", "center", "right"] as Align[]).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAligns((as) => as.map((x, idx) => (idx === i ? a : x)))}
                        className={`px-1.5 rounded ${aligns[i] === a ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                      >
                        {a === "left" ? "L" : a === "center" ? "C" : "R"}
                      </button>
                    ))}
                    {headers.length > 1 && (
                      <button onClick={() => removeCol(i)} className="px-1.5 text-red-600 hover:underline">×</button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-1">
                <button onClick={addCol} className="px-2 py-1 text-xs text-brand-600 hover:underline">+ 열</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-1">
                    <input
                      value={cell}
                      onChange={(e) =>
                        setRows((rs) => rs.map((r, idx) => (idx === i ? r.map((c, cidx) => (cidx === j ? e.target.value : c)) : r)))
                      }
                      className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 min-w-24"
                    />
                  </td>
                ))}
                <td className="p-1">
                  <button onClick={() => removeRow(i)} className="text-red-600 hover:underline text-xs">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="mt-2 text-sm text-brand-600 hover:underline">+ 행 추가</button>
      </div>

      <div>
        <label className="label">마크다운 결과</label>
        <textarea
          readOnly
          value={md}
          className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs resize-y font-mono"
        />
      </div>
      <button onClick={copy} className="btn btn-primary">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
