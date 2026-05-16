"use client";

import { useState } from "react";

type Style = "chicago-note" | "chicago-short" | "korean-1" | "mla";

export default function FootnoteFormatTool() {
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
      const lastName = authors.split(",")[0].split(/\s+/).pop() || authors;
      const shortTitle = title.split(":")[0].split(" ").slice(0, 3).join(" ");
      return `${lastName}, *${shortTitle}*, ${pages}.`;
    }
    if (style === "korean-1") {
      if (type === "book") return `${authors}, 《${title}》, ${publisher}, ${year}, ${pages}쪽.`;
      if (type === "journal") return `${authors}, 「${title}」, 《${journal}》, ${volume}권 ${issue}호, ${year}, ${pages}쪽.`;
      return `${authors}, 「${title}」, ${journal || "웹사이트"}, ${url} (${accessed || "검색일 없음"}).`;
    }
    // mla note style (rare but for in-text footnote)
    if (type === "book") return `${authors}, *${title}* (${publisher}, ${year}) ${pages}.`;
    return `${authors}, "${title}," *${journal}*, vol. ${volume}, no. ${issue}, ${year}, p. ${pages}.`;
  })();

  const ibid = "ibid., " + pages + ".";

  const labels = {
    "chicago-note": "Chicago Full Note (영문 인문계 표준)",
    "chicago-short": "Chicago Short Note (재인용용)",
    "korean-1": "국문 인문계 (전통적 한국 양식)",
    mla: "MLA Note Format",
  };

  const copy = (t: string) => navigator.clipboard.writeText(t);

  const renderItalic = (s: string) =>
    s.split(/(\*[^*]+\*)/).map((p, i) =>
      p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>
    );

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
          {(["book", "journal", "web"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded text-xs ${type === t ? "bg-gray-700 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {t === "book" ? "단행본" : t === "journal" ? "학술지" : "웹"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <label>저자
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>연도
          <input value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">제목
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        {type === "book" && (
          <>
            <label>출판사
              <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>출판도시
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
          </>
        )}
        {type === "journal" && (
          <>
            <label>학술지명
              <input value={journal} onChange={(e) => setJournal(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>권/호
              <div className="flex gap-1">
                <input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="권" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
                <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="호" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
              </div>
            </label>
          </>
        )}
        {type === "web" && (
          <>
            <label className="sm:col-span-2">URL
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
            <label>접속일
              <input value={accessed} onChange={(e) => setAccessed(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            </label>
          </>
        )}
        <label>인용 페이지
          <input value={pages} onChange={(e) => setPages(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
      </div>

      <div className="space-y-2 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">각주</span>
            <button onClick={() => copy(fn.replace(/\*/g, ""))} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
          </div>
          <div className="text-sm leading-relaxed break-words">{renderItalic(fn)}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">바로 다음 재인용 (ibid.)</span>
            <button onClick={() => copy(ibid)} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
          </div>
          <div className="text-sm leading-relaxed">{ibid}</div>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 같은 출처를 바로 다음에 다시 인용할 때 'ibid.'(같은 책)를 씁니다. 국문에서는 '위의 책'·'앞의 책' 사용.
      </div>
    </div>
  );
}
