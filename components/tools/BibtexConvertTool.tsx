"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

type Entry = {
  type: string;
  key: string;
  fields: Record<string, string>;
};

function parseBibtex(input: string): Entry[] {
  const entries: Entry[] = [];
  const re = /@(\w+)\s*\{\s*([^,]+),/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    const type = m[1].toLowerCase();
    const key = m[2].trim();
    // 엔트리 종료는 중괄호 깊이로 판정 (닫는 }가 마지막 필드와 같은 줄에 올 수 있음)
    let depth = 1;
    let i = re.lastIndex;
    while (i < input.length && depth > 0) {
      const ch = input[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    const body = input.slice(re.lastIndex, depth === 0 ? i - 1 : input.length);
    re.lastIndex = i;
    const fields: Record<string, string> = {};
    const fre = /(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)"|([^,{}"\n]+))/g;
    let f: RegExpExecArray | null;
    while ((f = fre.exec(body)) !== null) {
      const name = f[1].toLowerCase();
      const raw = (f[2] ?? f[3] ?? f[4] ?? "").trim();
      // author 는 중괄호를 남겨 둔다: {{Ernst and Young}} 같은 기관 저자를 분리하지 않기 위함
      fields[name] = name === "author" ? raw : raw.replace(/[{}]/g, "").trim();
    }
    entries.push({ type, key, fields });
  }
  return entries;
}

// 중괄호 밖의 " and " 만 저자 구분자로 취급 (중괄호 안은 단일 리터럴 저자)
function splitAuthorTokens(raw: string): string[] {
  const out: string[] = [];
  let buf = "";
  let depth = 0;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      if (depth > 0) depth--;
    } else if (depth === 0 && /\s/.test(ch)) {
      const m = /^\s+and\s+/i.exec(raw.slice(i));
      if (m) {
        out.push(buf);
        buf = "";
        i += m[0].length - 1;
        continue;
      }
    }
    buf += ch;
  }
  out.push(buf);
  return out.map((s) => s.trim()).filter(Boolean);
}

function isLiteralAuthor(token: string): boolean {
  return /^\{[\s\S]*\}$/.test(token);
}

function stripBraces(token: string): string {
  return token.replace(/[{}]/g, "").trim();
}

// 'Family, Given' → 'Given Family' (MLA 둘째 이후 저자용)
function naturalOrder(token: string): string {
  const plain = stripBraces(token);
  if (isLiteralAuthor(token)) return plain;
  const ix = plain.indexOf(",");
  if (ix < 0) return plain;
  const family = plain.slice(0, ix).trim();
  const given = plain.slice(ix + 1).trim();
  return given ? `${given} ${family}` : family;
}

function formatAuthors(raw: string, style: "apa" | "mla" | "chicago"): string {
  if (!raw) return "";
  const authors = splitAuthorTokens(raw);
  const formatted = authors.map((token) => {
    const a = stripBraces(token);
    if (isLiteralAuthor(token)) return a;
    if (a.includes(",")) return a;
    const parts = a.split(/\s+/);
    if (parts.length < 2) return a;
    const last = parts.pop()!;
    return `${last}, ${parts.map((p) => p[0] + ".").join(" ")}`;
  });
  if (style === "apa") {
    if (formatted.length === 1) return formatted[0];
    // APA 7: 21명 이상이면 처음 19명 + ... + 마지막 저자
    if (formatted.length > 20) {
      return `${formatted.slice(0, 19).join(", ")}, ... ${formatted[formatted.length - 1]}`;
    }
    return `${formatted.slice(0, -1).join(", ")}, & ${formatted[formatted.length - 1]}`;
  }
  if (style === "mla") {
    if (formatted.length === 1) return formatted[0];
    // MLA 9: 첫 저자만 역순, 둘째 저자는 정순
    if (formatted.length === 2) return `${formatted[0]}, and ${naturalOrder(authors[1])}`;
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
  const t = useTranslations("toolUI.bibtex-convert");
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

  const copy = () => void copyText(output);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("bibtexInput")}</label>
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
        <span className="text-xs text-muted self-center ml-2">{t("entriesParsed", { count: entries.length })}</span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label">{t("result")}</label>
          <button onClick={copy} className="text-xs text-gray-500 hover:text-blue-600">{t("copyAll")}</button>
        </div>
        <textarea
          value={output}
          readOnly
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-950 text-sm"
        />
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("note")}
      </div>
    </div>
  );
}
