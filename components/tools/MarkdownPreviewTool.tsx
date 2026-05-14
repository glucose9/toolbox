"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { printHtmlAsPdf } from "@/lib/print";
import { downloadText, imageToMarkdown, insertAtCursor, readMdFile } from "@/lib/markdown-io";

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
  const [printError, setPrintError] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mdFileRef = useRef<HTMLInputElement>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

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

  const printPdf = () => {
    const ok = printHtmlAsPdf(html, { title: extractTitle(md) || "마크다운" });
    if (!ok) setPrintError("팝업 차단을 해제해주세요.");
    else setPrintError("");
  };

  const loadMd = async (f: File) => {
    const text = await readMdFile(f);
    setMd(text);
  };

  const insertImage = async (f: File) => {
    const ta = taRef.current;
    const md2 = await imageToMarkdown(f);
    if (!ta) {
      setMd((cur) => cur + "\n\n" + md2);
      return;
    }
    const { value, cursor } = insertAtCursor(ta, md2);
    setMd(value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label !mb-0">마크다운</label>
            <div className="flex gap-2 text-xs">
              <button onClick={() => mdFileRef.current?.click()} className="text-brand-600 hover:underline">📄 .md 불러오기</button>
              <button onClick={() => imgFileRef.current?.click()} className="text-brand-600 hover:underline">🖼️ 이미지 삽입</button>
              <button onClick={() => downloadText(md, (extractTitle(md) || "markdown") + ".md")} className="text-brand-600 hover:underline">💾 .md 저장</button>
            </div>
          </div>
          <input ref={mdFileRef} type="file" accept=".md,.markdown,text/markdown" onChange={(e) => e.target.files?.[0] && loadMd(e.target.files[0])} className="hidden" />
          <input ref={imgFileRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && insertImage(e.target.files[0])} className="hidden" />
          <textarea
            ref={taRef}
            value={md}
            onChange={(e) => setMd(e.target.value)}
            onDrop={async (e) => {
              const f = e.dataTransfer.files[0];
              if (!f) return;
              e.preventDefault();
              if (f.type.startsWith("image/")) await insertImage(f);
              else if (/\.(md|markdown|txt)$/i.test(f.name) || f.type.startsWith("text/")) await loadMd(f);
            }}
            onDragOver={(e) => e.preventDefault()}
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
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setShowHtml((v) => !v)} className="btn btn-secondary">
          {showHtml ? "👁️ 렌더링 보기" : "📄 HTML 코드 보기"}
        </button>
        <button onClick={copy} className="btn btn-secondary">{copied ? "✓ HTML 복사됨" : "HTML 복사"}</button>
        <button onClick={printPdf} className="btn btn-primary">📕 PDF로 저장</button>
      </div>
      {printError && <div className="text-sm text-red-600">{printError}</div>}
    </div>
  );
}

function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}
