"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";

type LangKey =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "c"
  | "csharp"
  | "go"
  | "rust"
  | "ruby"
  | "swift"
  | "kotlin"
  | "sql"
  | "markup"
  | "css"
  | "json"
  | "yaml"
  | "markdown";

const LANGS: { key: LangKey; label: string }[] = [
  { key: "javascript", label: "JavaScript" },
  { key: "typescript", label: "TypeScript" },
  { key: "python", label: "Python" },
  { key: "java", label: "Java" },
  { key: "c", label: "C" },
  { key: "csharp", label: "C#" },
  { key: "go", label: "Go" },
  { key: "rust", label: "Rust" },
  { key: "ruby", label: "Ruby" },
  { key: "swift", label: "Swift" },
  { key: "kotlin", label: "Kotlin" },
  { key: "sql", label: "SQL" },
  { key: "markup", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "json", label: "JSON" },
  { key: "yaml", label: "YAML" },
  { key: "markdown", label: "Markdown" },
];

type ThemeKey = "dark" | "light" | "dracula" | "nord" | "solarized";

const THEMES: {
  key: ThemeKey;
  label: string;
  bg: string;
  fg: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  punctuation: string;
}[] = [
  {
    key: "dark",
    label: "Dark",
    bg: "#1e1e1e",
    fg: "#d4d4d4",
    comment: "#6a9955",
    keyword: "#569cd6",
    string: "#ce9178",
    number: "#b5cea8",
    function: "#dcdcaa",
    punctuation: "#d4d4d4",
  },
  {
    key: "light",
    label: "Light",
    bg: "#ffffff",
    fg: "#333333",
    comment: "#6a737d",
    keyword: "#d73a49",
    string: "#032f62",
    number: "#005cc5",
    function: "#6f42c1",
    punctuation: "#24292e",
  },
  {
    key: "dracula",
    label: "Dracula",
    bg: "#282a36",
    fg: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    punctuation: "#f8f8f2",
  },
  {
    key: "nord",
    label: "Nord",
    bg: "#2e3440",
    fg: "#d8dee9",
    comment: "#616e88",
    keyword: "#81a1c1",
    string: "#a3be8c",
    number: "#b48ead",
    function: "#88c0d0",
    punctuation: "#eceff4",
  },
  {
    key: "solarized",
    label: "Solarized",
    bg: "#002b36",
    fg: "#839496",
    comment: "#586e75",
    keyword: "#859900",
    string: "#2aa198",
    number: "#d33682",
    function: "#268bd2",
    punctuation: "#93a1a1",
  },
];

const DEFAULT_CODE = `function greet(name) {
  // say hello
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("world");`;

export default function CodeToImageTool() {
  const t = useTranslations("toolUI.code-to-image");
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [lang, setLang] = useState<LangKey>("javascript");
  const [themeKey, setThemeKey] = useState<ThemeKey>("dark");
  const [bg, setBg] = useState<string>("#0ea5e9");
  const [windowTitle, setWindowTitle] = useState<string>("main.js");
  const [showControls, setShowControls] = useState<boolean>(true);
  const [error, setError] = useState("");
  const captureRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => THEMES.find((th) => th.key === themeKey) || THEMES[0], [themeKey]);

  const highlighted = useMemo(() => {
    try {
      const grammar = Prism.languages[lang] || Prism.languages.javascript;
      return Prism.highlight(code, grammar, lang);
    } catch {
      return code.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] || c);
    }
  }, [code, lang]);

  // inject scoped style for tokens based on the selected theme
  useEffect(() => {
    const id = "code-to-image-theme-style";
    let el = document.getElementById(id) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `
.code2img-pre { color: ${theme.fg}; background: ${theme.bg}; }
.code2img-pre .token.comment,
.code2img-pre .token.prolog,
.code2img-pre .token.doctype,
.code2img-pre .token.cdata { color: ${theme.comment}; font-style: italic; }
.code2img-pre .token.punctuation { color: ${theme.punctuation}; }
.code2img-pre .token.property,
.code2img-pre .token.tag,
.code2img-pre .token.boolean,
.code2img-pre .token.number,
.code2img-pre .token.constant,
.code2img-pre .token.symbol { color: ${theme.number}; }
.code2img-pre .token.selector,
.code2img-pre .token.attr-name,
.code2img-pre .token.string,
.code2img-pre .token.char,
.code2img-pre .token.builtin,
.code2img-pre .token.inserted { color: ${theme.string}; }
.code2img-pre .token.operator,
.code2img-pre .token.entity,
.code2img-pre .token.url,
.code2img-pre .language-css .token.string,
.code2img-pre .style .token.string { color: ${theme.fg}; }
.code2img-pre .token.atrule,
.code2img-pre .token.attr-value,
.code2img-pre .token.keyword { color: ${theme.keyword}; }
.code2img-pre .token.function,
.code2img-pre .token.class-name { color: ${theme.function}; }
.code2img-pre .token.regex,
.code2img-pre .token.important,
.code2img-pre .token.variable { color: ${theme.number}; }
`;
  }, [theme]);

  const downloadPng = async () => {
    const node = captureRef.current;
    if (!node) return;
    setError("");
    try {
      const html2canvas = (await import("html2canvas")).default;
      // The preview scrolls horizontally, and html2canvas only renders what fits inside the
      // element bounds — long lines would be cut off. Widen the *clone* so everything fits.
      const pre = node.querySelector<HTMLElement>("pre.code2img-pre");
      const hidden = pre ? Math.max(0, pre.scrollWidth - pre.clientWidth) : 0;
      // keep the bitmap within the browser's canvas size limit for very long lines
      const MAX_PX = 16000;
      const wanted = hidden > 0 ? Math.ceil(node.getBoundingClientRect().width + hidden + 24) : 0;
      const fullWidth = Math.min(wanted, MAX_PX);
      const scale = fullWidth > MAX_PX / 2 ? Math.max(1, MAX_PX / fullWidth) : 2;
      const canvas = await html2canvas(node, {
        backgroundColor: bg,
        scale,
        useCORS: true,
        logging: false,
        onclone: (_doc, el) => {
          if (!fullWidth) return;
          el.style.overflow = "visible";
          el.style.width = `${fullWidth}px`;
          el.style.maxWidth = "none";
          const clonedPre = el.querySelector<HTMLElement>("pre.code2img-pre");
          if (clonedPre) clonedPre.style.overflow = "visible";
        },
      });
      const url = canvas.toDataURL("image/png");
      // an over-sized canvas yields "data:," instead of throwing — don't hand that to the user
      if (url.length < 100) throw new Error("canvas encode failed");
      const a = document.createElement("a");
      a.href = url;
      a.download = `code-${Date.now()}.png`;
      a.click();
    } catch {
      setError(t("errorExport"));
    }
  };

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="label">{t("code")}</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-60 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y"
              spellCheck={false}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t("language")}</label>
              <select
                className="input"
                value={lang}
                onChange={(e) => setLang(e.target.value as LangKey)}
              >
                {LANGS.map((l) => (
                  <option key={l.key} value={l.key}>{l.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{t("theme")}</label>
              <select
                className="input"
                value={themeKey}
                onChange={(e) => setThemeKey(e.target.value as ThemeKey)}
              >
                {THEMES.map((th) => (
                  <option key={th.key} value={th.key}>{th.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">{t("windowTitle")}</label>
              <input
                className="input font-mono"
                value={windowTitle}
                onChange={(e) => setWindowTitle(e.target.value)}
                placeholder="main.js"
              />
            </div>
            <div>
              <label className="label">{t("background")}</label>
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-full h-10 rounded cursor-pointer border border-gray-300"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showControls}
              onChange={(e) => setShowControls(e.target.checked)}
            />
            <span>{t("windowControls")}</span>
          </label>

          <button onClick={downloadPng} className="btn btn-primary w-full">
            {t("downloadPng")}
          </button>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>

        <div>
          <label className="label">{t("preview")}</label>
          <div
            ref={captureRef}
            style={{ background: bg, padding: "32px" }}
            className="rounded-lg overflow-auto"
          >
            <div
              style={{ background: theme.bg, color: theme.fg }}
              className="rounded-md shadow-xl overflow-hidden"
            >
              <div
                className="flex items-center px-3 py-2 gap-2"
                style={{
                  background: themeKey === "light" ? "#f5f5f5" : "rgba(255,255,255,0.05)",
                  borderBottom: themeKey === "light" ? "1px solid #e5e5e5" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {showControls && (
                  <div className="flex gap-1.5">
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: "#ff5f56", display: "inline-block" }} />
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: "#ffbd2e", display: "inline-block" }} />
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: "#27c93f", display: "inline-block" }} />
                  </div>
                )}
                <div
                  className="flex-1 text-center text-xs font-mono"
                  style={{ color: themeKey === "light" ? "#666" : "rgba(255,255,255,0.7)" }}
                >
                  {windowTitle}
                </div>
                {showControls && <div style={{ width: 52 }} />}
              </div>
              <pre
                className="code2img-pre"
                style={{
                  margin: 0,
                  padding: "16px 20px",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 13,
                  lineHeight: 1.55,
                  whiteSpace: "pre",
                  overflow: "auto",
                }}
              >
                <code dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
