"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const BLOCK_TAGS = new Set([
  "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "DD", "DETAILS", "DIV", "DL",
  "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3",
  "H4", "H5", "H6", "HEADER", "HR", "LI", "MAIN", "NAV", "OL", "P", "PRE",
  "SECTION", "SUMMARY", "TABLE", "TD", "TH", "TR", "UL",
]);

function htmlToText(html: string): string {
  // DOMParser produces an inert document: scripts never run and resources
  // (e.g. <img onerror>) are never fetched, unlike assigning to innerHTML.
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style").forEach((el) => el.remove());
  // textContent joins block elements with no separator, so walk the tree and
  // emit line breaks at block boundaries and <br>.
  let out = "";
  const ensureBreak = () => {
    if (out && !out.endsWith("\n")) out += "\n";
  };
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      out += node.nodeValue || "";
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = (node as Element).tagName;
    if (tag === "BR") {
      out += "\n";
      return;
    }
    const block = BLOCK_TAGS.has(tag);
    if (block) ensureBreak();
    node.childNodes.forEach(walk);
    if (block) ensureBreak();
  };
  walk(doc.body);
  return out.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export default function HtmlToTextTool() {
  const t = useTranslations("toolUI.html-to-text");
  const [html, setHtml] = useState(`<h1>제목</h1>\n<p>본문 <a href="#">링크</a>.</p>\n<script>alert(1)</script>`);
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => (typeof window === "undefined" ? "" : htmlToText(html)), [html]);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="card space-y-3">
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      <textarea readOnly value={text} className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
