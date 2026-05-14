"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";
import { printHtmlAsPdf } from "@/lib/print";
import { downloadText, imageToMarkdown, insertAtCursor, readMdFile } from "@/lib/markdown-io";

const SAMPLE = `# 마크다운 + 수학 수식 (KaTeX)

본문 안에 인라인 수식: $E = mc^2$, $f(x) = ax^2 + bx + c$.

## 블록 수식
$$
\\int_{-\\infty}^{\\infty} e^{-x^2}\\, dx = \\sqrt{\\pi}
$$

## 행렬
$$
A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}
$$

## 합계
$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

## 그리스 문자와 분수
$\\alpha, \\beta, \\gamma, \\theta, \\pi$ 그리고 $\\frac{a}{b}$.
`;

const inlineMathExt = {
  name: "inlineMath",
  level: "inline" as const,
  start(src: string) {
    return src.match(/\$[^\s]/)?.index;
  },
  tokenizer(src: string) {
    const rule = /^\$([^\$\n]+?)\$/;
    const match = rule.exec(src);
    if (match) {
      return { type: "inlineMath", raw: match[0], text: match[1].trim() };
    }
    return undefined;
  },
  renderer(token: { text: string }) {
    try {
      return katex.renderToString(token.text, { throwOnError: false, displayMode: false });
    } catch {
      return token.text;
    }
  },
};

const blockMathExt = {
  name: "blockMath",
  level: "block" as const,
  start(src: string) {
    return src.match(/\$\$/)?.index;
  },
  tokenizer(src: string) {
    const rule = /^\$\$([\s\S]+?)\$\$/;
    const match = rule.exec(src);
    if (match) {
      return { type: "blockMath", raw: match[0], text: match[1].trim() };
    }
    return undefined;
  },
  renderer(token: { text: string }) {
    try {
      return `<p class="katex-display-block">${katex.renderToString(token.text, { throwOnError: false, displayMode: true })}</p>`;
    } catch {
      return token.text;
    }
  },
};

let extensionsRegistered = false;

function registerExtensions() {
  if (extensionsRegistered) return;
  marked.use({ extensions: [blockMathExt, inlineMathExt] });
  extensionsRegistered = true;
}

export default function MarkdownMathTool() {
  const [md, setMd] = useState(SAMPLE);
  const [printError, setPrintError] = useState("");
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mdFileRef = useRef<HTMLInputElement>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerExtensions();
    marked.setOptions({ gfm: true, breaks: true });
  }, []);

  const loadMd = async (f: File) => setMd(await readMdFile(f));
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

  const printPdf = async () => {
    const katexCss = await loadKatexCssText();
    const extraStyles = `${katexCss}\n.katex-display-block { text-align: center; margin: 0.8em 0; }`;
    const ok = printHtmlAsPdf(html, {
      title: extractTitle(md) || "마크다운+수식",
      styles: extraStyles,
    });
    if (!ok) setPrintError("팝업 차단을 해제해주세요.");
    else setPrintError("");
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label !mb-0">마크다운 (수식: $...$, $$...$$)</label>
            <div className="flex gap-2 text-xs">
              <button onClick={() => mdFileRef.current?.click()} className="text-brand-600 hover:underline">📄 .md 불러오기</button>
              <button onClick={() => imgFileRef.current?.click()} className="text-brand-600 hover:underline">🖼️ 이미지 삽입</button>
              <button onClick={() => downloadText(md, (extractTitle(md) || "markdown-math") + ".md")} className="text-brand-600 hover:underline">💾 .md 저장</button>
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
            className="w-full h-[28rem] p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">미리보기</label>
          <div
            className="w-full h-[28rem] p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <style>{`.katex-display-block { text-align: center; margin: 0.8em 0; }`}</style>
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="btn btn-secondary">{copied ? "✓ HTML 복사됨" : "HTML 복사"}</button>
        <button onClick={printPdf} className="btn btn-primary">📕 PDF로 저장</button>
      </div>
      {printError && <div className="text-sm text-red-600">{printError}</div>}
      <div className="text-xs text-muted bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
        <strong>💡 수식 입력:</strong> 인라인 <code>$E=mc^2$</code>, 블록 <code>$$...$$</code>. KaTeX 지원 명령어는{" "}
        <a href="https://katex.org/docs/supported.html" target="_blank" rel="noreferrer" className="underline">공식 문서</a>를 참고하세요.
      </div>
    </div>
  );
}

function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

let cachedKatexCss: string | null = null;
async function loadKatexCssText(): Promise<string> {
  if (cachedKatexCss !== null) return cachedKatexCss;
  try {
    const links = Array.from(document.styleSheets);
    for (const sheet of links) {
      const href = sheet.href || "";
      if (href.includes("katex")) {
        try {
          const rules = sheet.cssRules;
          if (rules) {
            const text = Array.from(rules).map((r) => r.cssText).join("\n");
            cachedKatexCss = text;
            return text;
          }
        } catch {
          // CORS - fall through to fetch
        }
        try {
          const res = await fetch(href);
          if (res.ok) {
            const t = await res.text();
            cachedKatexCss = t;
            return t;
          }
        } catch {
          /* ignore */
        }
      }
    }
  } catch {
    /* ignore */
  }
  cachedKatexCss = "";
  return "";
}
