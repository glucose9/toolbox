"use client";

import { useMemo, useState } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateToc(md: string, maxLevel: number): string {
  const lines = md.split("\n");
  const out: string[] = [];
  const counts: Record<string, number> = {};
  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const level = m[1].length;
    if (level > maxLevel) continue;
    const text = m[2].trim();
    let slug = slugify(text);
    counts[slug] = (counts[slug] || 0) + 1;
    if (counts[slug] > 1) slug += `-${counts[slug] - 1}`;
    const indent = "  ".repeat(level - 1);
    out.push(`${indent}- [${text}](#${slug})`);
  }
  return out.join("\n");
}

const SAMPLE = `# 프로젝트 소개

## 설치 방법
### macOS / Linux
### Windows

## 사용법
### 기본 명령
### 고급 설정

## 기여하기

## 라이선스`;

export default function MarkdownTocTool() {
  const [md, setMd] = useState(SAMPLE);
  const [maxLevel, setMaxLevel] = useState(3);
  const [copied, setCopied] = useState(false);

  const toc = useMemo(() => generateToc(md, maxLevel), [md, maxLevel]);

  const copy = async () => {
    await navigator.clipboard.writeText(toc);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">마크다운</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">생성된 목차</label>
          <textarea
            readOnly
            value={toc}
            placeholder="헤딩(#, ##, ###)이 발견되면 목차가 표시됩니다"
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          최대 레벨 (H1 ~ H{maxLevel})
          <input type="range" min="1" max="6" value={maxLevel} onChange={(e) => setMaxLevel(+e.target.value)} className="ml-2 w-32" />
        </label>
        <button onClick={copy} disabled={!toc} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
      </div>
    </div>
  );
}
