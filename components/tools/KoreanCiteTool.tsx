"use client";

import { useState } from "react";

type Style = "kpa" | "kera" | "kss" | "korea-univ";

export default function KoreanCiteTool() {
  const [style, setStyle] = useState<Style>("kpa");
  const [authors, setAuthors] = useState("김민지, 이서연, 박지훈");
  const [year, setYear] = useState("2024");
  const [title, setTitle] = useState("작업기억과 주의의 상호작용 연구");
  const [journal, setJournal] = useState("한국심리학회지: 인지");
  const [volume, setVolume] = useState("36");
  const [issue, setIssue] = useState("2");
  const [pages, setPages] = useState("123-145");
  const [doi, setDoi] = useState("");

  const splitAuthors = authors.split(/[,·、]/).map((a) => a.trim()).filter(Boolean);
  const intextAuthors = (() => {
    if (splitAuthors.length === 1) return splitAuthors[0];
    if (splitAuthors.length === 2) return `${splitAuthors[0]}, ${splitAuthors[1]}`;
    return `${splitAuthors[0]} 외`;
  })();

  const refList = splitAuthors.join(", ");

  const formats = {
    kpa: {
      label: "한국심리학회 (KPA)",
      reference: `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`,
      intext: `(${intextAuthors}, ${year})`,
      note: "한국심리학회는 APA 형식을 한국어로 번안. 저자명 사이 쉼표, 연도는 괄호.",
    },
    kera: {
      label: "한국교육학회 (KERA)",
      reference: `${refList} (${year}). ${title}. *${journal}*, ${volume}(${issue}), ${pages}.`,
      intext: `(${intextAuthors}, ${year}, p. ${pages.split("-")[0]})`,
      note: "한국교육학회 표준. 직접 인용 시 페이지 번호 명시.",
    },
    kss: {
      label: "한국사회학회 (KSS)",
      reference: `${refList}. ${year}. "${title}." 《${journal}》 ${volume}(${issue}): ${pages}.`,
      intext: `(${intextAuthors} ${year}: ${pages.split("-")[0]})`,
      note: "한국사회학회 양식. 제목은 큰따옴표, 저널은 겹화살괄호.",
    },
    "korea-univ": {
      label: "고려대 인문대 / 일반대학원",
      reference: `${refList}, 「${title}」, 《${journal}》, ${volume}권 ${issue}호 (${year}), ${pages}쪽.`,
      intext: `(${intextAuthors}, ${year}, ${pages.split("-")[0]}쪽)`,
      note: "국문 논문 가장 흔한 형식. 제목은 낫표, 저널은 겹화살괄호.",
    },
  };

  const cur = formats[style];
  const copy = (t: string) => navigator.clipboard.writeText(t);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">양식 선택</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(formats) as Style[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1.5 rounded text-sm ${style === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {formats[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <label className="sm:col-span-2">저자 (쉼표로 구분)
          <input value={authors} onChange={(e) => setAuthors(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>연도
          <input value={year} onChange={(e) => setYear(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>권(호)
          <div className="flex gap-1">
            <input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="권" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
            <input value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="호" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
          </div>
        </label>
        <label className="sm:col-span-2">논문 제목
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>학술지명
          <input value={journal} onChange={(e) => setJournal(e.target.value)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>페이지
          <input value={pages} onChange={(e) => setPages(e.target.value)} placeholder="123-145" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label className="sm:col-span-2">DOI (선택)
          <input value={doi} onChange={(e) => setDoi(e.target.value)} placeholder="10.xxxx/xxxx" className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
      </div>

      <div className="space-y-2 mt-2">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">참고문헌 항목</span>
            <button onClick={() => copy(cur.reference.replace(/\*/g, ""))} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
          </div>
          <div className="text-sm leading-relaxed break-words">{cur.reference.split(/(\*[^*]+\*)/).map((p, i) =>
            p.startsWith("*") ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>
          )}</div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">본문 내 인용 (in-text)</span>
            <button onClick={() => copy(cur.intext)} className="text-xs text-gray-500 hover:text-blue-600">📋 복사</button>
          </div>
          <div className="text-sm leading-relaxed">{cur.intext}</div>
        </div>
        <div className="text-xs text-muted leading-relaxed">{cur.note}</div>
      </div>
    </div>
  );
}
