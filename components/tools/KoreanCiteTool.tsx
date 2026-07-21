"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type LocaleKey = "ko" | "en" | "ja" | "zh";

interface FormatDef {
  reference: (args: BuildArgs) => string;
  intext: (args: BuildArgs) => string;
}

interface BuildArgs {
  refList: string;
  intextAuthors: string;
  year: string;
  title: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}

interface LocaleConfig {
  styles: string[];
  defaults: {
    authors: string;
    title: string;
    journal: string;
  };
  formats: Record<string, FormatDef>;
}

const firstPage = (pages: string) => pages.split(/[-–—]/)[0]?.trim() ?? pages;

const LOCALE_CONFIGS: Record<LocaleKey, LocaleConfig> = {
  ko: {
    styles: ["kpa", "kera", "kss", "koreaU"],
    defaults: {
      authors: "김민지, 이서연, 박지훈",
      title: "작업기억과 주의의 상호작용 연구",
      journal: "한국심리학회지: 인지",
    },
    formats: {
      kpa: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      kera: {
        reference: ({ refList, year, title, journal, volume, issue, pages }) =>
          `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors}, ${year}, p. ${firstPage(pages)})`,
      },
      kss: {
        reference: ({ refList, year, title, journal, volume, issue, pages }) =>
          `${refList}. ${year}. "${title}." 《${journal}》 ${volume}(${issue}): ${pages}.`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors} ${year}: ${firstPage(pages)})`,
      },
      koreaU: {
        reference: ({ refList, year, title, journal, volume, issue, pages }) =>
          `${refList}, 「${title}」, 《${journal}》, ${volume}권 ${issue}호 (${year}), ${pages}쪽.`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors}, ${year}, ${firstPage(pages)}쪽)`,
      },
    },
  },
  en: {
    styles: ["apa", "mla", "chicago", "harvard"],
    defaults: {
      authors: "Smith, J., Park, A., Chen, L.",
      title: "Working memory and attention",
      journal: "Journal of Cognitive Psychology",
    },
    formats: {
      apa: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      mla: {
        reference: ({ refList, title, journal, volume, issue, year, pages, doi }) =>
          `${refList}. "${title}." *${journal}*, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, pages }) => `(${intextAuthors} ${firstPage(pages)})`,
      },
      chicago: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList}. ${year}. "${title}." *${journal}* ${volume}(${issue}): ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors} ${year}, ${firstPage(pages)})`,
      },
      harvard: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList} (${year}) '${title}', *${journal}*, ${volume}(${issue}), pp. ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors}, ${year}, p. ${firstPage(pages)})`,
      },
    },
  },
  ja: {
    styles: ["jpa", "jst", "jss", "sist"],
    defaults: {
      authors: "田中太郎, 佐藤花子",
      title: "ワーキングメモリと注意の研究",
      journal: "心理学研究",
    },
    formats: {
      jpa: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      jst: {
        reference: ({ refList, title, journal, year, volume, issue, pages, doi }) =>
          `${refList}. ${title}. ${journal}. ${year}, ${volume}(${issue}), p.${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      jss: {
        reference: ({ refList, year, title, journal, volume, issue, pages }) =>
          `${refList}, ${year}, 「${title}」『${journal}』${volume}(${issue}): ${pages}.`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors} ${year}: ${firstPage(pages)})`,
      },
      sist: {
        reference: ({ refList, title, journal, year, volume, issue, pages, doi }) =>
          `${refList}. ${title}. ${journal}. ${year}, vol.${volume}, no.${issue}, p.${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors} ${year})`,
      },
    },
  },
  zh: {
    styles: ["gb7714", "cnki", "cma", "apaCn"],
    defaults: {
      authors: "张伟, 王芳, 李娜",
      title: "工作记忆与注意力相互作用",
      journal: "心理学报",
    },
    formats: {
      gb7714: {
        reference: ({ refList, title, journal, year, volume, issue, pages }) =>
          `${refList}. ${title}[J]. ${journal}, ${year}, ${volume}(${issue}): ${pages}.`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      cnki: {
        reference: ({ refList, title, journal, year, volume, issue, pages, doi }) =>
          `${refList}. ${title}[J]. ${journal}, ${year}, ${volume}(${issue}): ${pages}.${doi ? ` DOI:${doi}.` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
      cma: {
        reference: ({ refList, title, journal, year, volume, issue, pages }) =>
          `${refList}. ${title}. ${journal}, ${year}, ${volume}(${issue}): ${pages}.`,
        intext: ({ intextAuthors, year, pages }) => `(${intextAuthors}, ${year}, 第${firstPage(pages)}页)`,
      },
      apaCn: {
        reference: ({ refList, year, title, journal, volume, issue, pages, doi }) =>
          `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
        intext: ({ intextAuthors, year }) => `(${intextAuthors}, ${year})`,
      },
    },
  },
};

function getLocaleKey(locale: string): LocaleKey {
  if (locale === "en" || locale === "ja" || locale === "zh") return locale;
  return "ko";
}

export default function KoreanCiteTool() {
  const t = useTranslations("toolUI.korean-cite");
  const localeRaw = useLocale();
  const localeKey = getLocaleKey(localeRaw);
  const config = LOCALE_CONFIGS[localeKey];
  const styleKeys = config.styles;

  const stylesMap = t.raw("styles") as Record<string, string>;
  const notesMap = t.raw("notes") as Record<string, string>;

  const [style, setStyle] = useState<string>(styleKeys[0]);
  const [authors, setAuthors] = useState(config.defaults.authors);
  const [year, setYear] = useState("2024");
  const [title, setTitle] = useState(config.defaults.title);
  const [journal, setJournal] = useState(config.defaults.journal);
  const [volume, setVolume] = useState("36");
  const [issue, setIssue] = useState("2");
  const [pages, setPages] = useState("123-145");
  const [doi, setDoi] = useState("");

  const splitAuthors = (() => {
    if (authors.includes(";")) return authors.split(";").map((a) => a.trim()).filter(Boolean);
    const INITIALS = /^[A-ZÀ-Ý]\.([\s-]*[A-ZÀ-Ý]\.)*$/;
    const out: string[] = [];
    for (const part of authors.split(/\s*&\s*|\s+and\s+/)) {
      for (const raw of part.split(/[,·、]/)) {
        const tk = raw.trim();
        if (!tk) continue;
        if (INITIALS.test(tk) && out.length > 0) out[out.length - 1] += `, ${tk}`;
        else out.push(tk);
      }
    }
    return out;
  })();
  const surname = (n: string) => (localeKey === "en" ? n.split(",")[0].trim() : n);
  const intextAuthors = (() => {
    if (splitAuthors.length === 0) return "";
    if (splitAuthors.length === 1) return surname(splitAuthors[0]);
    if (splitAuthors.length === 2) {
      if (localeKey === "en") return `${surname(splitAuthors[0])} & ${surname(splitAuthors[1])}`;
      return `${splitAuthors[0]}, ${splitAuthors[1]}`;
    }
    if (localeKey === "en") return `${surname(splitAuthors[0])} et al.`;
    if (localeKey === "ja") return `${splitAuthors[0]} ほか`;
    if (localeKey === "zh") return `${splitAuthors[0]} 等`;
    return `${splitAuthors[0]} 외`;
  })();

  const refList = (() => {
    if (localeKey !== "en" || splitAuthors.length < 2) return splitAuthors.join(", ");
    const conj = style === "apa" || style === "harvard" ? "&" : "and";
    return `${splitAuthors.slice(0, -1).join(", ")}, ${conj} ${splitAuthors[splitAuthors.length - 1]}`;
  })();
  const buildArgs: BuildArgs = {
    refList,
    intextAuthors,
    year,
    title,
    journal,
    volume,
    issue,
    pages,
    doi,
  };

  const activeFormat = config.formats[style] ?? config.formats[styleKeys[0]];
  const referenceText = activeFormat.reference(buildArgs);
  const intextText = activeFormat.intext(buildArgs);
  const noteText = notesMap?.[style] ?? "";

  const copy = (txt: string) => navigator.clipboard.writeText(txt);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("selectStyle")}</label>
        <div className="flex flex-wrap gap-2">
          {styleKeys.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1.5 rounded text-sm ${style === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {stylesMap?.[s] ?? s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <label className="sm:col-span-2">{t("authorsCommaSep")}
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("year")}
          <input value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("volIssue")}
          <div className="flex gap-1">
            <input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder={t("volumePh")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder={t("issuePh")} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        </label>
        <label className="sm:col-span-2">{t("articleTitle")}
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("journalName")}
          <input value={journal} onChange={(e) => setJournal(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>{t("pages")}
          <input value={pages} onChange={(e) => setPages(e.target.value)} placeholder="123-145" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">{t("doiOpt")}
          <input value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="10.xxxx/xxxx" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
      </div>

      <div className="space-y-2 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t("referenceItem")}</span>
            <button onClick={() => copy(referenceText.replace(/\*/g, ""))} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
          </div>
          <div className="text-sm leading-relaxed break-words">{referenceText.split(/(\*[^*]+\*)/).map((p, i) =>
            p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>
          )}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{t("intextLabel")}</span>
            <button onClick={() => copy(intextText)} className="text-xs text-gray-500 hover:text-blue-600">{t("copy")}</button>
          </div>
          <div className="text-sm leading-relaxed">{intextText}</div>
        </div>
        {noteText && <div className="text-xs text-muted leading-relaxed">{noteText}</div>}
      </div>
    </div>
  );
}
