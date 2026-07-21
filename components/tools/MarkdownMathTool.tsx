"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Marked } from "marked";
import DOMPurify from "dompurify";
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

// Local instance: registering the math extensions on the shared `marked`
// singleton would apply them to every other markdown tool in the session.
const mathMarked = new Marked({ gfm: true, breaks: true, extensions: [blockMathExt, inlineMathExt] });

// KaTeX emits MathML alongside its HTML output; allow those tags/attrs so
// DOMPurify doesn't strip the rendered math.
const SANITIZE_CONFIG = {
  ADD_TAGS: ["semantics", "annotation", "math", "mrow", "mi", "mo", "mn", "msup", "msub", "mfrac", "msqrt", "mtext", "mspace", "mover", "munder", "mtable", "mtr", "mtd", "mstyle"],
  ADD_ATTR: ["encoding", "definitionURL", "mathvariant"],
};

export default function MarkdownMathTool() {
  const t = useTranslations("toolUI.markdown-math");
  const [md, setMd] = useState(SAMPLE);
  const [printError, setPrintError] = useState("");
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mdFileRef = useRef<HTMLInputElement>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);

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
    let raw: string;
    try {
      raw = mathMarked.parse(md) as string;
    } catch (e) {
      raw = `<p style="color:red">${(e as Error).message}</p>`;
    }
    return DOMPurify.sanitize(raw, SANITIZE_CONFIG);
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
      title: extractTitle(md) || t("defaultTitle"),
      styles: extraStyles,
    });
    if (!ok) setPrintError(t("popupBlocked"));
    else setPrintError("");
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="label !mb-0">{t("markdownLabel")}</label>
            <div className="flex gap-2 text-xs">
              <button onClick={() => mdFileRef.current?.click()} className="text-brand-600 hover:underline">{t("loadMd")}</button>
              <button onClick={() => imgFileRef.current?.click()} className="text-brand-600 hover:underline">{t("insertImage")}</button>
              <button onClick={() => downloadText(md, (extractTitle(md) || "markdown-math") + ".md")} className="text-brand-600 hover:underline">{t("saveMd")}</button>
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
          <label className="label">{t("preview")}</label>
          <div
            className="w-full h-[28rem] p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <style>{`.katex-display-block { text-align: center; margin: 0.8em 0; }`}</style>
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="btn btn-secondary">{copied ? t("htmlCopied") : t("copyHtml")}</button>
        <button onClick={printPdf} className="btn btn-primary">{t("savePdf")}</button>
      </div>
      {printError && <div className="text-sm text-red-600">{printError}</div>}
      <div className="text-xs text-muted bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
        <strong>{t("tipLabel")}</strong> {t("tipInline")} <code>$E=mc^2$</code>, {t("tipBlock")} <code>$$...$$</code>. {t("tipDocs")}{" "}
        <a href="https://katex.org/docs/supported.html" target="_blank" rel="noreferrer" className="underline">{t("officialDocs")}</a>{t("tipDocsSuffix")}
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
  // Next.js bundles katex.min.css into a hashed /_next/static/css file, so the
  // sheet href never contains "katex" — collect the rules by content instead
  // (every rule in katex.min.css mentions "katex" in its selector or font name).
  const parts: string[] = [];
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (/katex/i.test(rule.cssText)) parts.push(rule.cssText);
        }
      } catch {
        // Cross-origin sheet: cssRules is unreadable — fetch if it is KaTeX's.
        if ((sheet.href || "").includes("katex")) {
          try {
            const res = await fetch(sheet.href as string);
            if (res.ok) parts.push(await res.text());
          } catch {
            /* ignore */
          }
        }
      }
    }
  } catch {
    /* ignore */
  }
  cachedKatexCss = parts.join("\n");
  return cachedKatexCss;
}
