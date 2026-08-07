"use client";

// Korean web-font fidelity for the document renderers (HWP/DOCX/XLSX/PPTX/…).
//
// Documents name fonts that browsers don't ship (함초롬바탕, 바탕, 굴림, 맑은
// 고딕…). Without help every renderer silently falls back to the system
// default, so the output doesn't look like the original document. This module
// - lazily loads Noto Sans KR / Noto Serif KR (Google Fonts, only when a
//   document tool actually processes a file — nothing on page load), and
// - maps document font names to a fallback chain ("바탕, Noto Serif KR, serif")
//   so locally-installed originals still win when present.
//
// The same chain must be used for BOTH text measurement and display, otherwise
// line-break positions and glyph widths disagree.

export const KR_FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap";

const SERIF_RE =
  /(바탕|batang|명조|myeongjo|myungjo|serif|궁서|gungsuh|함초롬바탕|hcr batang|은바탕|제주명조|nanummyeongjo|나눔명조)/i;
const MONO_RE = /(고정폭|mono|consolas|courier|d2coding)/i;

let loadPromise: Promise<void> | null = null;

/** Idempotently load the Korean web fonts; resolves when usable (or after a
 *  timeout so a blocked CDN never hangs a tool). Safe to call repeatedly. */
export function loadKrWebFonts(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    if (!document.querySelector(`link[href="${KR_FONTS_CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = KR_FONTS_CSS_URL;
      document.head.appendChild(link);
    }
    const probe = Promise.all([
      document.fonts.load('16px "Noto Sans KR"', "한글확인"),
      document.fonts.load('bold 16px "Noto Sans KR"', "한글확인"),
      document.fonts.load('16px "Noto Serif KR"', "한글확인"),
      document.fonts.load('bold 16px "Noto Serif KR"', "한글확인"),
    ]).then(() => undefined);
    const timeout = new Promise<void>((r) => setTimeout(r, 5000));
    await Promise.race([probe, timeout]);
  })().catch(() => {
    loadPromise = null; // allow retry on transient failure
  }) as Promise<void>;
  return loadPromise;
}

/** Generic family for a document font name. */
export function krGenericFor(name: string): "serif" | "monospace" | "sans-serif" {
  if (SERIF_RE.test(name)) return "serif";
  if (MONO_RE.test(name)) return "monospace";
  return "sans-serif";
}

/** "바탕" → `"바탕", "Noto Serif KR", serif` (original first so a locally
 *  installed copy still wins). Accepts a single name, unquoted. */
export function krFallbackChain(name: string): string {
  const clean = name.replace(/^['"]|['"]$/g, "").trim();
  if (!clean) return '"Noto Sans KR", sans-serif';
  const generic = krGenericFor(clean);
  const noto = generic === "serif" ? "Noto Serif KR" : "Noto Sans KR";
  if (/^noto (sans|serif) kr$/i.test(clean)) return `"${clean}", ${generic}`;
  return `"${clean}", "${noto}", ${generic === "monospace" ? `monospace` : generic}`;
}

/** Rewrite every font-family occurrence inside an SVG (or HTML) string —
 *  presentation attributes and inline styles — to carry the KR fallback chain.
 *  Values that already list multiple families are left untouched. */
export function withKrFontFallbacks(markup: string): string {
  const mapValue = (value: string): string => {
    if (value.includes(",")) return value; // already a chain
    return krFallbackChain(value);
  };
  return markup
    .replace(/font-family="([^",]+)"/g, (_m, v: string) => `font-family='${mapValue(v)}'`)
    .replace(/font-family='([^',]+)'/g, (_m, v: string) => `font-family='${mapValue(v)}'`)
    .replace(/font-family\s*:\s*([^;"'}][^;"}]*)/g, (m, v: string) =>
      v.includes(",") ? m : `font-family:${mapValue(v)}`
    );
}

/** For canvas-measurement hooks: rewrite the family part of a CSS `font`
 *  shorthand ("bold 16px 함초롬바탕") to the fallback chain. */
export function withKrFontShorthand(font: string): string {
  const m = font.match(/^(.*?\d[\w.%]*(?:\s*\/\s*[\w.%]+)?\s+)(.+)$/);
  if (!m) return font;
  const [, prefix, family] = m;
  if (family.includes(",")) return font;
  return prefix + krFallbackChain(family);
}

/** Append the fallback chain to inline font-family styles of already-rendered
 *  DOM (used after docx-preview renders into a container). */
export function applyKrFontFallbacks(container: HTMLElement): void {
  const els = container.querySelectorAll<HTMLElement>('[style*="font-family"]');
  els.forEach((el) => {
    const fam = el.style.fontFamily;
    if (fam && !fam.includes(",")) el.style.fontFamily = krFallbackChain(fam);
  });
}
