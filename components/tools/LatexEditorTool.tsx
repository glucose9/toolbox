"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import katex from "katex";
import "katex/dist/katex.min.css";

const PRESET_KEYS = [
  { key: "fraction", code: "\\frac{a}{b}" },
  { key: "sqrt", code: "\\sqrt{x^2 + y^2}" },
  { key: "integral", code: "\\int_{0}^{\\infty} e^{-x^2}\\, dx" },
  { key: "sum", code: "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}" },
  { key: "limit", code: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1" },
  { key: "matrix", code: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
  { key: "log", code: "\\log_a b = \\frac{\\ln b}{\\ln a}" },
  { key: "function", code: "f(x) = ax^2 + bx + c" },
  { key: "quadratic", code: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
];

export default function LatexEditorTool() {
  const t = useTranslations("toolUI.latex-editor");
  const [code, setCode] = useState("E = mc^2");
  const [displayMode, setDisplayMode] = useState(true);
  const [copied, setCopied] = useState("");

  const { html, mathml, error } = useMemo(() => {
    try {
      const html = katex.renderToString(code, { throwOnError: true, displayMode });
      const mathml = katex.renderToString(code, { throwOnError: true, displayMode, output: "mathml" });
      return { html, mathml: mathml.replace(/.*?<math/s, "<math").replace(/<\/math>.*/s, "</math>"), error: "" };
    } catch (e) {
      return { html: "", mathml: "", error: (e as Error).message };
    }
  }, [code, displayMode]);

  const copy = async (key: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const downloadSvg = () => {
    if (!html) return;
    // Standalone SVG has no page CSS: re-render without the MathML copy
    // (which is only hidden by katex.min.css) and embed the KaTeX rules,
    // otherwise the equation shows twice and loses its layout.
    let svgHtml: string;
    try {
      svgHtml = katex.renderToString(code, { throwOnError: true, displayMode, output: "html" });
    } catch {
      return;
    }
    const container = document.createElement("div");
    container.innerHTML = svgHtml;
    document.body.appendChild(container);
    const rect = container.getBoundingClientRect();
    const w = Math.ceil(rect.width) + 20;
    const h = Math.ceil(rect.height) + 20;
    document.body.removeChild(container);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<style><![CDATA[
${collectKatexCss()}
]]></style>
<foreignObject width="100%" height="100%">
  <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: KaTeX_Main, 'Times New Roman', serif; padding: 10px;">
    ${svgHtml}
  </div>
</foreignObject>
</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "equation.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-1.5 text-xs">
        {PRESET_KEYS.map((p) => (
          <button key={p.key} onClick={() => setCode(p.code)} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            {t(`preset_${p.key}`)}
          </button>
        ))}
      </div>

      <div>
        <label className="label">{t("latexCode")}</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={displayMode} onChange={(e) => setDisplayMode(e.target.checked)} />
        {t("displayMode")}
      </label>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded p-6 min-h-32 flex items-center justify-center overflow-x-auto">
        {error ? (
          <div className="text-sm text-red-600 font-mono">{error}</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => copy("latex", code)} className="btn btn-primary">{copied === "latex" ? t("latexCopied") : t("copyLatex")}</button>
        <button onClick={() => copy("mathml", mathml)} disabled={!mathml} className="btn btn-secondary disabled:opacity-50">{copied === "mathml" ? t("mathmlCopied") : t("copyMathml")}</button>
        <button onClick={downloadSvg} disabled={!html} className="btn btn-secondary disabled:opacity-50">{t("downloadSvg")}</button>
      </div>
    </div>
  );
}

function collectKatexCss(): string {
  // katex.min.css is bundled into a hashed CSS file, so pick its rules out by
  // content (they all mention "katex" in a selector or font-family name).
  const parts: string[] = [];
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (/katex/i.test(rule.cssText)) parts.push(rule.cssText);
        }
      } catch {
        /* cross-origin sheet — skip */
      }
    }
  } catch {
    /* ignore */
  }
  return parts.join("\n");
}
