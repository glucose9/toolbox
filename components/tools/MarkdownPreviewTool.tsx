"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";

const SAMPLE = `# 제목 1

마크다운 **굵게**, *기울임*, ~~취소선~~.

## 목록
- 항목 1
- 항목 2
  - 하위 항목

## 표
| 이름 | 나이 |
|---|---|
| 김 | 30 |
| 이 | 25 |

\`\`\`js
console.log("hello");
\`\`\`

> 인용문

[링크](https://example.com)
`;

export default function MarkdownPreviewTool() {
  const [md, setMd] = useState(SAMPLE);
  const [showHtml, setShowHtml] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    marked.setOptions({ gfm: true, breaks: true });
  }, []);

  const html = useMemo(() => {
    try {
      return marked.parse(md) as string;
    } catch (e) {
      return `<p style="color:red">${(e as Error).message}</p>`;
    }
  }, [md]);

  const copy = async () => {
    await navigator.clipboard.writeText(html);
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
            className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">미리보기</label>
          {showHtml ? (
            <textarea
              readOnly
              value={html}
              className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs resize-y font-mono"
            />
          ) : (
            <div
              className="w-full h-96 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm overflow-y-auto prose-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setShowHtml((v) => !v)} className="btn btn-secondary">
          {showHtml ? "👁️ 렌더링 보기" : "📄 HTML 코드 보기"}
        </button>
        <button onClick={copy} className="btn btn-primary">{copied ? "✓ HTML 복사됨" : "HTML 복사"}</button>
      </div>
    </div>
  );
}
