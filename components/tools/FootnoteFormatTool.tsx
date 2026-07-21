"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Style = "chicago-note" | "chicago-short" | "korean-1" | "mla";

export default function FootnoteFormatTool() {
  const t = useTranslations("toolUI.footnote-format");
  const [style, setStyle] = useState<Style>("chicago-note");
  const [type, setType] = useState<"book" | "journal" | "web">("book");
  const [authors, setAuthors] = useState("Albert Einstein");
  const [title, setTitle] = useState("Relativity: The Special and General Theory");
  const [publisher, setPublisher] = useState("Henry Holt");
  const [city, setCity] = useState("New York");
  const [year, setYear] = useState("1920");
  const [pages, setPages] = useState("42");
  const [journal, setJournal] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [url, setUrl] = useState("");
  const [accessed, setAccessed] = useState("");

  const fn = (() => {
    if (style === "chicago-note") {
      if (type === "book") return `${authors}, *${title}* (${city}: ${publisher}, ${year}), ${pages}.`;
      if (type === "journal") return `${authors}, "${title}," *${journal}* ${volume}, no. ${issue} (${year}): ${pages}.`;
      return `${authors}, "${title}," ${journal || "Website"}, accessed ${accessed || "n.d."}, ${url}.`;
    }
    if (style === "chicago-short") {
      const surnames = authors
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
        .map((a) => a.split(/\s+/).pop() || a);
      const lastName =
        surnames.length === 0
          ? authors
          : surnames.length === 1
            ? surnames[0]
            : surnames.length === 2
              ? `${surnames[0]} and ${surnames[1]}`
              : `${surnames[0]} et al.`;
      const shortTitle = title.split(":")[0].split(" ").slice(0, 3).join(" ");
      if (type === "book") return `${lastName}, *${shortTitle}*, ${pages}.`;
      return `${lastName}, "${shortTitle}," ${pages}.`;
    }
    if (style === "korean-1") {
      if (type === "book") return `${authors}, 《${title}》, ${publisher}, ${year}, ${pages}쪽.`;
      if (type === "journal") return `${authors}, 「${title}」, 《${journal}》, ${volume}권 ${issue}호, ${year}, ${pages}쪽.`;
      return `${authors}, 「${title}」, ${journal || "웹사이트"}, ${url} (${accessed || "검색일 없음"}).`;
    }
    if (type === "book") return `${authors}, *${title}* (${publisher}, ${year}) ${pages}.`;
    if (type === "web") return `${authors}, "${title}," ${journal || "Website"}, ${year}, ${url}. Accessed ${accessed || "n.d."}.`;
    return `${authors}, "${title}," *${journal}*, vol. ${volume}, no. ${issue}, ${year}, p. ${pages}.`;
  })();

  const ibid = "ibid., " + pages + ".";

  const labels: Record<Style, string> = {
    "chicago-note": t("labelChicagoNote"),
    "chicago-short": t("labelChicagoShort"),
    "korean-1": t("labelKorean"),
    mla: t("labelMla"),
  };

  const copy = (txt: string) => navigator.clipboard.writeText(txt);

  const renderItalic = (s: string) =>
    s.split(/(\*[^*]+\*)/).map((p, i) =>
      p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>
    );

  const typeLabel = (tp: "book" | "journal" | "web") =>
    tp === "book" ? t("typeBook") : tp === "journal" ? t("typeJournal") : t("typeWeb");

  return (
    <div className="card space-y-3">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(labels) as Style[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1.5 rounded text-sm ${style === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {labels[s]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(["book", "journal", "web"] as const).map((tt) => (
            <button
              key={tt}
              onClick={() => setType(tt)}
              className={`px-3 py-1 rounded text-xs ${type === tt ? "bg-gray-700 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {typeLabel(tt)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <label>{t("authors")}
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("year")}
          <input value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">{t("title")}
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        {type === "book" && (
          <>
            <label>{t("publisher")}
              <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("city")}
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
          </>
        )}
        {type === "journal" && (
          <>
            <label>{t("journalName")}
              <input value={journal} onChange={(e) => setJournal(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("volIssue")}
              <div className="flex gap-1">
                <input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder={t("volumePh")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
                <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder={t("issuePh")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              </div>
            </label>
          </>
        )}
        {type === "web" && (
          <>
            <label className="sm:col-span-2">URL
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("accessed")}
              <input value={accessed} onChange={(e) => setAccessed(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
          </>
        )}
        <label>{t("pages")}
          <input value={pages} onChange={(e) => setPages(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
      </div>

      <div className="space-y-2 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t("footnote")}</span>
            <button onClick={() => copy(fn.replace(/\*/g, ""))} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
          </div>
          <div className="text-sm leading-relaxed break-words">{renderItalic(fn)}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t("ibidLabel")}</span>
            <button onClick={() => copy(ibid)} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
          </div>
          <div className="text-sm leading-relaxed">{ibid}</div>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
