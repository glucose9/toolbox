"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("toolUI.doi-lookup");
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
      const isISBN = /^[0-9-]{9,16}[0-9Xx]$/.test(q.replace(/\s/g, ""));
      if (isISBN) {
        const isbn = q.replace(/[^0-9X]/gi, "");
        const r = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
        const j = await r.json();
        const data = j[`ISBN:${isbn}`];
        if (!data) throw new Error(t("errorIsbnNotFound"));
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
        if (!r.ok) throw new Error(t("errorCrossref"));
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
      setError(e instanceof Error ? e.message : t("errorLookup"));
    } finally {
      setLoading(false);
    }
  };

  const apa = meta && (() => {
    const toInitials = (n: string) => {
      const ix = n.indexOf(",");
      if (ix < 0) return n.trim();
      const family = n.slice(0, ix).trim();
      const given = n.slice(ix + 1).trim();
      if (!family) return given;
      if (!given) return family;
      const ini = given
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.split("-").filter(Boolean).map((p) => `${p[0].toUpperCase()}.`).join("-"))
        .join(" ");
      return ini ? `${family}, ${ini}` : family;
    };
    const list = meta.authors.map(toInitials).filter(Boolean);
    // APA 7: 마지막 저자 앞 &, 21명 이상이면 처음 19명 + ... + 마지막 저자
    const a =
      list.length === 0
        ? ""
        : list.length === 1
          ? list[0]
          : list.length > 20
            ? `${list.slice(0, 19).join(", ")}, ... ${list[list.length - 1]}`
            : `${list.slice(0, -1).join(", ")}, & ${list[list.length - 1]}`;
    const year = meta.year || "n.d.";
    if (meta.type === "book") return `${a} (${year}). ${meta.title}. ${meta.publisher}.`;
    return `${a} (${year}). ${meta.title}. ${meta.container}, ${meta.volume}${meta.issue ? `(${meta.issue})` : ""}, ${meta.pages}.${meta.doi ? ` https://doi.org/${meta.doi}` : ""}`;
  })();

  const mla = meta && (() => {
    const list = meta.authors;
    // MLA 9: 첫 저자만 'Family, Given' 역순, 둘째부터는 정순
    const natural = (n: string) => {
      const ix = n.indexOf(",");
      if (ix < 0) return n.trim();
      const family = n.slice(0, ix).trim();
      const given = n.slice(ix + 1).trim();
      return given ? `${given} ${family}` : family;
    };
    const a = list.length === 0 ? "" : list.length === 1 ? list[0] : list.length === 2 ? `${list[0]}, and ${natural(list[1])}` : `${list[0]}, et al.`;
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
        <label className="label">{t("queryLabel")}</label>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("queryPlaceholder")}
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
            onKeyDown={(e) => e.key === "Enter" && lookup()}
          />
          <button onClick={lookup} disabled={loading} className="btn btn-primary">{loading ? t("looking") : t("lookup")}</button>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 dark:text-red-400">⚠️ {error}</div>}

      {meta && (
        <div className="space-y-3">
          <div className="card-section">
            <div className="text-sm space-y-1">
              <div><strong>{t("authors")}:</strong> {meta.authors.join("; ")}</div>
              <div><strong>{t("title")}:</strong> {meta.title}</div>
              {meta.container && <div><strong>{t("journalPublisher")}:</strong> {meta.container || meta.publisher}</div>}
              {meta.year && <div><strong>{t("year")}:</strong> {meta.year}</div>}
              {meta.volume && <div><strong>{t("volIssuePage")}:</strong> {meta.volume}{meta.issue && `(${meta.issue})`}, {meta.pages}</div>}
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
                <button onClick={() => copy(s.value)} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
              </div>
              <div className="text-sm leading-relaxed break-words">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: t("footer") }} />
    </div>
  );
}
