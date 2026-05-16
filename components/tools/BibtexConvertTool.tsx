"use client";

import { useState } from "react";

type Entry = {
  type: string;
  key: string;
  fields: Record<string, string>;
};

function parseBibtex(input: string): Entry[] {
  const entries: Entry[] = [];
  const re = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\n\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    const type = m[1].toLowerCase();
    const key = m[2].trim();
    const body = m[3];
    const fields: Record<string, string> = {};
    const fre = /(\w+)\s*=\s*[{"](.+?)["}](?=\s*,?\s*\n|\s*,?\s*$)/gs;
    let f: RegExpExecArray | null;
    while ((f = fre.exec(body)) !== null) {
      fields[f[1].toLowerCase()] = f[2].replace(/[{}]/g, "").trim();
    }
    entries.push({ type, key, fields });
  }
  return entries;
}

function formatAuthors(raw: string, style: "apa" | "mla" | "chicago"): string {
  if (!raw) return "";
  const authors = raw.split(/\s+and\s+/i).map((a) => a.trim());
  const formatted = authors.map((a) => {
    if (a.includes(",")) return a;
    const parts = a.split(/\s+/);
    if (parts.length < 2) return a;
    const last = parts.pop()!;
    return `${last}, ${parts.map((p) => p[0] + ".").join(" ")}`;
  });
  if (style === "apa") return formatted.join(", ");
  if (style === "mla") {
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]}, and ${formatted[1]}`;
    return `${formatted[0]}, et al.`;
  }
  return formatted.join(", ");
}

function toApa(e: Entry): string {
  const f = e.fields;
  const a = formatAuthors(f.author || "", "apa");
  const year = f.year || "n.d.";
  if (e.type === "book") {
    return `${a} (${year}). ${f.title}. ${f.publisher || ""}.`;
  }
  if (e.type === "inproceedings" || e.type === "incollection") {
    return `${a} (${year}). ${f.title}. In ${f.booktitle || ""} (pp. ${f.pages || ""}). ${f.publisher || ""}.`;
  }
  return `${a} (${year}). ${f.title}. ${f.journal || ""}, ${f.volume || ""}${f.number ? `(${f.number})` : ""}, ${f.pages || ""}.${f.doi ? ` https://doi.org/${f.doi}` : ""}`;
}

function toMla(e: Entry): string {
  const f = e.fields;
  const a = formatAuthors(f.author || "", "mla");
  if (e.type === "book") {
    return `${a}. ${f.title}. ${f.publisher || ""}, ${f.year || ""}.`;
  }
  return `${a}. "${f.title}." ${f.journal || f.booktitle || ""}, vol. ${f.volume || ""}, no. ${f.number || ""}, ${f.year || ""}, pp. ${f.pages || ""}.`;
}

function toChicago(e: Entry): string {
  const f = e.fields;
  const a = formatAuthors(f.author || "", "chicago");
  if (e.type === "book") {
    return `${a}. ${f.title}. ${f.publisher || ""}, ${f.year || ""}.`;
  }
  return `${a}. "${f.title}." ${f.journal || ""} ${f.volume || ""}, no. ${f.number || ""} (${f.year || ""}): ${f.pages || ""}.`;
}

export default function BibtexConvertTool() {
  const [input, setInput] = useState(`@article{einstein1905,
  author = {Einstein, Albert},
  title = {Zur Elektrodynamik bewegter Körper},
  journal = {Annalen der Physik},
  volume = {322},
  number = {10},
  pages = {891--921},
  year = {1905}
}`);
  const [style, setStyle] = useState<"apa" | "mla" | "chicago">("apa");

  const entries = parseBibtex(input);
  const formatter = style === "apa" ? toApa : style === "mla" ? toMla : toChicago;
  const output = entries.map(formatter).join("\n\n");

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">BibTeX 입력 (여러 개 가능)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono"
        />
      </div>

      <div className="flex gap-2 flex-wrap text-sm">
        {(["apa", "mla", "chicago"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3 py-1.5 rounded ${style === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {s.toUpperCase()}
          </button>
        ))}
        <span className="text-xs text-muted self-center ml-2">{entries.length}개 항목 파싱됨</span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">변환 결과</label>
          <button onClick={copy} className="text-xs text-gray-500 hover:text-blue-600">📋 전체 복사</button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-950 text-sm"
        />
      </div>

      <div className="text-xs text-muted leading-relaxed">
        @article, @book, @inproceedings 등 일반적인 BibTeX 항목을 지원합니다. 복잡한 LaTeX 매크로는 일부 변환되지 않을 수 있습니다.
      </div>
    </div>
  );
}
