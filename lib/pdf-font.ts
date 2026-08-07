"use client";

// Support for embedding real, selectable Korean text into generated PDFs.
//
// public/fonts/NanumGothic-pdf.ttf is a self-hosted subset (built by
// scripts/build-kr-pdf-font.mjs) covering ASCII, Latin-1, common punctuation,
// currency, compat jamo, all 11,172 Hangul syllables and fullwidth forms.
// pdf-lib embeds it with subset:true, so the final PDF only carries the
// glyphs actually used (tens of KB, not the 1.6MB source).
//
// KR_TEXT_PDF_COVERAGE must stay in sync with the ranges in the build script:
// text outside it (rare hanja, emoji, ...) should take the raster fallback.

let fontBytesPromise: Promise<ArrayBuffer> | null = null;

export function fetchKrPdfFontBytes(): Promise<ArrayBuffer> {
  if (fontBytesPromise) return fontBytesPromise;
  fontBytesPromise = fetch("/fonts/NanumGothic-pdf.ttf").then((r) => {
    if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
    return r.arrayBuffer();
  });
  fontBytesPromise.catch(() => {
    fontBytesPromise = null; // retry on transient failure
  });
  return fontBytesPromise;
}

const KR_TEXT_PDF_COVERAGE =
  /^[\t\n\r\u0020-\u007e\u00a0-\u00ff\u2010-\u2027\u20a0-\u20bf\u3000-\u303f\u3131-\u318e\uac00-\ud7a3\uff01-\uffee]*$/;

/** True when every character can be drawn from the subset font - i.e. the
 *  document can become a real text PDF instead of a rasterized one. */
export function canRenderAsKrTextPdf(text: string): boolean {
  return KR_TEXT_PDF_COVERAGE.test(text);
}

export interface KrTextMeasurer {
  widthOf(text: string, size: number): number;
}

/** Greedy line breaker in pt units. Breaks at spaces and around CJK
 *  characters (Korean wraps anywhere; Latin words stay whole). */
export function breakIntoLines(
  source: string,
  maxWidthPt: number,
  sizePt: number,
  font: KrTextMeasurer
): string[] {
  const isCjk = (ch: string) => {
    const c = ch.codePointAt(0)!;
    return (
      (c >= 0xac00 && c <= 0xd7a3) ||
      (c >= 0x3130 && c <= 0x318f) ||
      (c >= 0x3000 && c <= 0x303f) ||
      (c >= 0xff00 && c <= 0xffef)
    );
  };
  const widthCache = new Map<string, number>();
  const chWidth = (ch: string) => {
    let w = widthCache.get(ch);
    if (w === undefined) {
      w = font.widthOf(ch, sizePt);
      widthCache.set(ch, w);
    }
    return w;
  };

  const out: string[] = [];
  for (const raw of source.split(/\r?\n/)) {
    if (raw.length === 0) {
      out.push("");
      continue;
    }
    let lineStart = 0;
    let width = 0;
    let lastBreak = -1; // index where the current line could break
    const chars = [...raw];
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (i > lineStart && (chars[i - 1] === " " || isCjk(chars[i - 1]) || isCjk(ch))) {
        lastBreak = i;
      }
      const w = chWidth(ch);
      if (width + w > maxWidthPt && i > lineStart) {
        const breakAt = lastBreak > lineStart ? lastBreak : i;
        out.push(chars.slice(lineStart, breakAt).join("").replace(/ +$/, ""));
        lineStart = breakAt;
        while (chars[lineStart] === " ") lineStart++;
        width = 0;
        for (let j = lineStart; j <= i; j++) width += chWidth(chars[j] ?? "");
        lastBreak = -1;
        continue;
      }
      width += w;
    }
    out.push(chars.slice(lineStart).join(""));
  }
  return out;
}
