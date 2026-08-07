"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const COLORS = ["#000","#cd0000","#00cd00","#cdcd00","#0000ee","#cd00cd","#00cdcd","#e5e5e5","#7f7f7f","#ff0000","#00ff00","#ffff00","#5c5cff","#ff00ff","#00ffff","#ffffff"];

const CUBE = [0, 95, 135, 175, 215, 255];

function xterm256(n: number): string | undefined {
  if (!Number.isInteger(n) || n < 0 || n > 255) return undefined;
  if (n < 16) return COLORS[n];
  if (n < 232) {
    const i = n - 16;
    return `rgb(${CUBE[Math.floor(i / 36)]},${CUBE[Math.floor(i / 6) % 6]},${CUBE[i % 6]})`;
  }
  const v = 8 + (n - 232) * 10;
  return `rgb(${v},${v},${v})`;
}

function rgbOf(n: number): number {
  return Number.isInteger(n) && n >= 0 && n <= 255 ? n : 0;
}

type SgrState = { fg?: string; bg?: string; bold?: boolean; italic?: boolean; underline?: boolean };

function applyCodes(state: SgrState, codes: number[]): SgrState {
  let st: SgrState = { ...state };
  for (let i = 0; i < codes.length; i++) {
    const c = codes[i];
    if (!Number.isFinite(c)) continue;
    if (c === 0) st = {};
    else if (c === 1) st.bold = true;
    else if (c === 3) st.italic = true;
    else if (c === 4) st.underline = true;
    else if (c === 22) st.bold = false;
    else if (c === 23) st.italic = false;
    else if (c === 24) st.underline = false;
    else if (c === 38 || c === 48) {
      // Extended color: consume its parameters so they are not read as SGR codes.
      const mode = codes[i + 1];
      let col: string | undefined;
      if (mode === 5) { col = xterm256(codes[i + 2]); i += 2; }
      else if (mode === 2) { col = `rgb(${rgbOf(codes[i + 2])},${rgbOf(codes[i + 3])},${rgbOf(codes[i + 4])})`; i += 4; }
      else { i = codes.length; }
      if (col) { if (c === 38) st.fg = col; else st.bg = col; }
    }
    else if (c === 39) st.fg = undefined;
    else if (c === 49) st.bg = undefined;
    else if (c >= 30 && c <= 37) st.fg = COLORS[c - 30];
    else if (c >= 40 && c <= 47) st.bg = COLORS[c - 40];
    else if (c >= 90 && c <= 97) st.fg = COLORS[c - 90 + 8];
    else if (c >= 100 && c <= 107) st.bg = COLORS[c - 100 + 8];
  }
  return st;
}

function styleOf(st: SgrState): string {
  const styles: string[] = [];
  if (st.fg) styles.push(`color:${st.fg}`);
  if (st.bg) styles.push(`background:${st.bg}`);
  if (st.bold) styles.push("font-weight:bold");
  if (st.italic) styles.push("font-style:italic");
  if (st.underline) styles.push("text-decoration:underline");
  return styles.join(";");
}

function ansiToHtml(input: string): string {
  let out = '<pre style="background:#000;color:#e5e5e5;padding:1em;font-family:monospace;white-space:pre-wrap">';
  let openSpan = false;
  let state: SgrState = {};
  // eslint-disable-next-line no-control-regex
  const parts = input.split(/\[([\d;]*)m/);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      out += parts[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
      if (openSpan) { out += "</span>"; openSpan = false; }
      state = applyCodes(state, parts[i].split(";").map(Number));
      const style = styleOf(state);
      if (style) {
        out += `<span style="${style}">`;
        openSpan = true;
      }
    }
  }
  if (openSpan) out += "</span>";
  out += "</pre>";
  return out;
}

export default function AnsiToHtmlTool() {
  const t = useTranslations("toolUI.ansi-to-html");
  const [input, setInput] = useState("[31mRed[0m [1;32mBold green[0m [4;33mUnderlined yellow[0m");
  const html = useMemo(() => ansiToHtml(input), [input]);
  const [copied, setCopied] = useState(false);
  const copy = async () => { const ok = await copyText(html); if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); } };

  return (
    <div className="card space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("inputPlaceholder")} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y" />
      <label className="label">{t("preview")}</label>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <label className="label">HTML</label>
      <textarea readOnly value={html} className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-xs font-mono resize-y" />
      <button onClick={copy} className="btn btn-primary">{copied ? t("copied") : t("copyHtml")}</button>
    </div>
  );
}
