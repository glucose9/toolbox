"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

export default function HtmlToMarkdownTool() {
  const t = useTranslations("toolUI.html-to-markdown");
  const [html, setHtml] = useState(`<h1>제목</h1>\n<p>본문 <strong>굵게</strong> <a href="https://example.com">링크</a></p>\n<ul><li>항목 1</li><li>항목 2</li></ul>`);
  const [md, setMd] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const skipInitial = useRef(true);

  useEffect(() => {
    if (skipInitial.current) { skipInitial.current = false; return; }
    const timer = setTimeout(() => {
      setBusy(true);
      import("turndown")
        .then(({ default: TurndownService }) => {
          const ts = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
          ts.remove(["script", "style", "noscript"]);
          setMd(ts.turndown(html));
        })
        .finally(() => setBusy(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [html]);

  const copy = async () => { const ok = await copyText(md); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  return (
    <div className="card space-y-3">
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" />
      {busy && <p className="text-sm text-gray-500 dark:text-gray-400">{t("converting")}</p>}
      <textarea readOnly value={md} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono resize-y" />
      <button onClick={copy} disabled={!md} className="btn btn-secondary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
    </div>
  );
}
