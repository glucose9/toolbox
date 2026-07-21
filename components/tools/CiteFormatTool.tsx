"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CiteType = "journal" | "book" | "web";

export default function CiteFormatTool() {
  const t = useTranslations("toolUI.cite-format");
  const [type, setType] = useState<CiteType>("journal");
  const [authors, setAuthors] = useState("Kim, J., Lee, S., & Park, H.");
  const [year, setYear] = useState("2024");
  const [title, setTitle] = useState("The role of attention in working memory");
  const [container, setContainer] = useState("Journal of Cognitive Science");
  const [volume, setVolume] = useState("12");
  const [issue, setIssue] = useState("3");
  const [pages, setPages] = useState("45-67");
  const [publisher, setPublisher] = useState("Academic Press");
  const [city, setCity] = useState("New York");
  const [url, setUrl] = useState("");
  const [accessed, setAccessed] = useState("");
  const [doi, setDoi] = useState("10.1234/abcd.2024.567");

  const splitAuthors = (s: string) => {
    if (s.includes(";")) return s.split(";").map((a) => a.trim()).filter(Boolean);
    const INITIALS = /^[A-ZÀ-Ý]\.([\s-]*[A-ZÀ-Ý]\.)*$/;
    const out: string[] = [];
    for (const part of s.split(/\s*&\s*|\s+and\s+/)) {
      for (const raw of part.split(",")) {
        const tk = raw.trim();
        if (!tk) continue;
        if (INITIALS.test(tk) && out.length > 0) out[out.length - 1] += `, ${tk}`;
        else out.push(tk);
      }
    }
    return out;
  };

  const mlaAuthors = (raw: string) => {
    const list = splitAuthors(raw);
    const deinvert = (n: string) => {
      const ix = n.indexOf(",");
      return ix >= 0 ? `${n.slice(ix + 1).trim()} ${n.slice(0, ix).trim()}` : n;
    };
    if (list.length === 0) return raw.trim();
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]}, and ${deinvert(list[1])}`;
    return `${list[0]}, et al.`;
  };

  const apa = (() => {
    const a = authors.trim();
    if (type === "journal") {
      return `${a} (${year}). ${title}. *${container}*, ${volume}${issue ? `(${issue})` : ""}, ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`;
    }
    if (type === "book") {
      return `${a} (${year}). *${title}*. ${publisher}.`;
    }
    return `${a} (${year}). ${title}.${container ? ` *${container}*.` : ""}${url ? ` ${url}` : ""}${accessed ? ` (Retrieved ${accessed})` : ""}`;
  })();

  const mla = (() => {
    const a = mlaAuthors(authors).replace(/\.$/, "");
    if (type === "journal") {
      return `${a}. "${title}." *${container}*, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`;
    }
    if (type === "book") {
      return `${a}. *${title}*. ${publisher}, ${year}.`;
    }
    return `${a}. "${title}." ${container ? `*${container}*, ` : ""}${year}, ${url}${accessed ? `. Accessed ${accessed}` : ""}.`;
  })();

  const chicago = (() => {
    const a = authors.trim();
    if (type === "journal") {
      return `${a}. "${title}." *${container}* ${volume}, no. ${issue} (${year}): ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`;
    }
    if (type === "book") {
      return `${a}. *${title}*. ${city}: ${publisher}, ${year}.`;
    }
    return `${a}. "${title}." ${container || "Website"}. ${accessed ? `Accessed ${accessed}. ` : ""}${url}`;
  })();

  const harvard = (() => {
    const a = authors.trim();
    if (type === "journal") {
      return `${a} ${year}, '${title}', *${container}*, vol. ${volume}, no. ${issue}, pp. ${pages}.`;
    }
    if (type === "book") {
      return `${a} ${year}, *${title}*, ${publisher}, ${city}.`;
    }
    return `${a} ${year}, *${title}*, viewed ${accessed || "n.d."}, <${url}>.`;
  })();

  const ieee = (() => {
    const list = splitAuthors(authors).map((n) => {
      if (n.includes(",")) {
        const [last, first] = n.split(",").map((s) => s.trim());
        const initials = first.split(/\s+/).map((w) => w[0]?.toUpperCase() + ".").join(" ");
        return `${initials} ${last}`;
      }
      return n;
    });
    const a = list.length > 1 ? list.slice(0, -1).join(", ") + ", and " + list.slice(-1) : list[0];
    if (type === "journal") {
      return `${a}, "${title}," *${container}*, vol. ${volume}, no. ${issue}, pp. ${pages}, ${year}.`;
    }
    if (type === "book") {
      return `${a}, *${title}*. ${city}: ${publisher}, ${year}.`;
    }
    return `${a}, "${title}." ${container} [Online]. Available: ${url}. [Accessed: ${accessed || "n.d."}].`;
  })();

  const styles = [
    { label: "APA 7th", value: apa },
    { label: "MLA 9th", value: mla },
    { label: "Chicago", value: chicago },
    { label: "Harvard", value: harvard },
    { label: "IEEE", value: ieee },
  ];

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const renderMd = (s: string) =>
    s.split(/(\*[^*]+\*)/).map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <span key={i}>{part}</span>
    );

  const typeLabel = (typ: CiteType) =>
    typ === "journal" ? t("typeJournal") : typ === "book" ? t("typeBook") : t("typeWeb");

  return (
    <div className="card space-y-3">
      <div className="flex gap-2 flex-wrap">
        {(["journal", "book", "web"] as const).map((tt) => (
          <button
            key={tt}
            onClick={() => setType(tt)}
            className={`px-3 py-1.5 rounded text-sm ${type === tt ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {typeLabel(tt)}
          </button>
        ))}
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
        {type === "journal" && (
          <>
            <label>{t("journalName")}
              <input value={container} onChange={(e) => setContainer(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("volume")}
              <input value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("issue")}
              <input value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("pages")}
              <input value={pages} onChange={(e) => setPages(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label className="sm:col-span-2">{t("doiOptional")}
              <input value={doi} onChange={(e) => setDoi(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder="10.xxxx/xxxxx" />
            </label>
          </>
        )}
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
        {type === "web" && (
          <>
            <label>{t("siteOptional")}
              <input value={container} onChange={(e) => setContainer(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>{t("accessed")}
              <input value={accessed} onChange={(e) => setAccessed(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder="2025-05-16" />
            </label>
            <label className="sm:col-span-2">URL
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" placeholder="https://..." />
            </label>
          </>
        )}
      </div>

      <div className="space-y-2 mt-2">
        {styles.map((s) => (
          <div key={s.label} className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{s.label}</span>
              <button onClick={() => copy(s.value.replace(/\*/g, ""))} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
            </div>
            <div className="text-sm leading-relaxed break-words">{renderMd(s.value)}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
