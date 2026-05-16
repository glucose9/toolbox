"use client";

import { useState } from "react";

type Meta = {
  authors: string[];
  year: string;
  title: string;
  container: string;
  volume: string;
  issue: string;
  pages: string;
  publisher: string;
  doi: string;
  type: "journal" | "book";
};

export default function DoiLookupTool() {
  const [query, setQuery] = useState("10.1038/nature12373");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    setLoading(true);
    setError("");
    setMeta(null);
    try {
      const q = query.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//, "");
      const isISBN = /^[0-9-]{10,17}$/.test(q.replace(/\s/g, ""));
      if (isISBN) {
        const isbn = q.replace(/[^0-9X]/gi, "");
        const r = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const j = await r.json();
        const data = j[`ISBN:${isbn}`];
        if (!data) throw new Error("ISBN 정보를 찾을 수 없습니다.");
        setMeta({
          authors: (data.authors || []).map((a: { name: string }) => a.name),
          year: (data.publish_date || "").match(/\d{4}/)?.[0] || "",
          title: data.title || "",
          container: "",
          volume: "",
          issue: "",
          pages: data.number_of_pages?.toString() || "",
          publisher: (data.publishers || []).map((p: { name: string }) => p.name).join(", "),
          doi: "",
          type: "book",
        });
      } else {
        const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(q)}`);
        if (!r.ok) throw new Error("CrossRef 조회 실패");
        const j = await r.json();
        const m = j.message;
        setMeta({
          authors: (m.author || []).map((a: { family?: string; given?: string }) => `${a.family || ""}, ${a.given || ""}`),
          year: (m.issued?.["date-parts"]?.[0]?.[0] || "").toString(),
          title: (m.title || []).join(" "),
          container: (m["container-title"] || []).join(" ") || "",
          volume: m.volume || "",
          issue: m.issue || "",
          pages: m.page || "",
          publisher: m.publisher || "",
          doi: m.DOI || q,
          type: "journal",
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "조회 실패");
    } finally {
      setLoading(false);
    }
  };

  const apa = meta && (() => {
    const a = meta.authors.join(", ");
    if (meta.type === "book") return `${a} (${meta.year}). ${meta.title}. ${meta.publisher}.`;
    return `${a} (${meta.year}). ${meta.title}. ${meta.container}, ${meta.volume}${meta.issue ? `(${meta.issue})` : ""}, ${meta.pages}.${meta.doi ? ` https://doi.org/${meta.doi}` : ""}`;
  })();

  const mla = meta && (() => {
    const list = meta.authors;
    const a = list.length === 0 ? "" : list.length === 1 ? list[0] : list.length === 2 ? `${list[0]}, and ${list[1]}` : `${list[0]}, et al.`;
    if (meta.type === "book") return `${a}. ${meta.title}. ${meta.publisher}, ${meta.year}.`;
    return `${a}. "${meta.title}." ${meta.container}, vol. ${meta.volume}, no. ${meta.issue}, ${meta.year}, pp. ${meta.pages}.`;
  })();

  const chicago = meta && (() => {
    const a = meta.authors.join(", ");
    if (meta.type === "book") return `${a}. ${meta.title}. ${meta.publisher}, ${meta.year}.`;
    return `${a}. "${meta.title}." ${meta.container} ${meta.volume}, no. ${meta.issue} (${meta.year}): ${meta.pages}.`;
  })();

  const copy = (t: string) => navigator.clipboard.writeText(t);

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        <label className="label">DOI 또는 ISBN</label>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="10.1038/nature12373 또는 9780262033848"
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
          />
          <button onClick={lookup} disabled={loading} className="btn btn-primary">{loading ? "조회 중..." : "조회"}</button>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 dark:text-red-400">⚠️ {error}</div>}

      {meta && (
        <div className="space-y-3">
          <div className="card-section">
            <div className="text-sm space-y-1">
              <div><strong>저자:</strong> {meta.authors.join("; ")}</div>
              <div><strong>제목:</strong> {meta.title}</div>
              {meta.container && <div><strong>저널/출판사:</strong> {meta.container || meta.publisher}</div>}
              {meta.year && <div><strong>연도:</strong> {meta.year}</div>}
              {meta.volume && <div><strong>권/호/쪽:</strong> {meta.volume}{meta.issue && `(${meta.issue})`}, {meta.pages}</div>}
              {meta.doi && <div><strong>DOI:</strong> {meta.doi}</div>}
            </div>
          </div>

          {[
            { label: "APA 7th", value: apa! },
            { label: "MLA 9th", value: mla! },
            { label: "Chicago", value: chicago! },
          ].map((s) => (
            <div key={s.label} className="border border-gray-200 dark:border-gray-700 rounded p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{s.label}</span>
                <button onClick={() => copy(s.value)} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
              </div>
              <div className="text-sm leading-relaxed break-words">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-muted leading-relaxed">
        DOI는 <code>api.crossref.org</code>, ISBN은 <code>openlibrary.org</code>의 무료 API를 직접 호출합니다. 입력값 외에는 서버로 전송되지 않습니다.
      </div>
    </div>
  );
}
