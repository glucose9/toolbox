"use client";

// Real PDF output for HWP/HWPX documents (2026-09).
//
// rhwp renders each page to SVG. We rasterize every page through an <img>
// into a canvas and embed the JPEGs with pdf-lib — a downloadable .pdf that
// looks exactly like the on-screen preview, on every device, with no print
// dialog. (The previous implementation opened a popup and called
// window.print(): nothing was produced by the tool itself, batch conversion
// was impossible and iOS users could barely save the result.)
//
// Font fidelity: an SVG loaded through <img> cannot reach external resources,
// so the page's web fonts would silently fall back to system fonts. We embed
// the Noto KR @font-face rules as data: URIs — but only the unicode-range
// subsets the document actually uses (Google splits Korean into ~100 small
// subsets per face), which keeps it to ~1MB per session instead of ~10MB.
import { PDFDocument } from "pdf-lib";
import type { HwpDocument } from "@rhwp/core";
import { withKrFontFallbacks, KR_FONTS_CSS_URL } from "@/lib/kr-fonts";
import { extractAllText } from "@/lib/hwp";

type Face = { block: string; url: string; ranges: [number, number][] };

let facesPromise: Promise<Face[]> | null = null;
const subsetCache = new Map<string, Promise<string>>();

function parseUnicodeRange(spec: string): [number, number][] {
  const out: [number, number][] = [];
  for (const part of spec.split(",")) {
    const m = part.trim().match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f]+))?$/i);
    if (!m) continue;
    if (m[1].includes("?")) {
      out.push([parseInt(m[1].replace(/\?/g, "0"), 16), parseInt(m[1].replace(/\?/g, "F"), 16)]);
    } else {
      const a = parseInt(m[1], 16);
      out.push([a, m[2] ? parseInt(m[2], 16) : a]);
    }
  }
  return out;
}

async function loadFaces(): Promise<Face[]> {
  if (facesPromise) return facesPromise;
  facesPromise = (async () => {
    const css = await (await fetch(KR_FONTS_CSS_URL)).text();
    const faces: Face[] = [];
    for (const block of css.match(/@font-face\s*\{[^}]*\}/g) || []) {
      const url = block.match(/url\(([^)]+)\)/)?.[1]?.replace(/^["']|["']$/g, "");
      const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
      if (!url) continue;
      faces.push({ block, url, ranges: range ? parseUnicodeRange(range) : [[0, 0x10ffff]] });
    }
    return faces;
  })().catch(() => {
    facesPromise = null;
    return [];
  });
  return facesPromise;
}

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  }
  return btoa(s);
}

function inlinedBlock(face: Face): Promise<string> {
  let p = subsetCache.get(face.url);
  if (!p) {
    p = (async () => {
      const buf = await (await fetch(face.url)).arrayBuffer();
      return face.block.replace(/url\([^)]+\)\s*format\([^)]*\)/, `url(data:font/woff2;base64,${toBase64(buf)}) format("woff2")`)
        .replace(/url\([^)]+\)/, (m) => (m.startsWith("url(data:") ? m : `url(data:font/woff2;base64,${toBase64(buf)})`));
    })().catch(() => "");
    subsetCache.set(face.url, p);
  }
  return p;
}

/** @font-face CSS (data: URIs) covering exactly the characters in `text`. */
export async function embeddedFontCssFor(text: string): Promise<string> {
  const faces = await loadFaces();
  if (!faces.length) return "";
  const cps = new Set<number>();
  for (const ch of text) cps.add(ch.codePointAt(0) as number);
  const needed = faces.filter((f) => {
    for (const [a, b] of f.ranges) for (const cp of cps) if (cp >= a && cp <= b) return true;
    return false;
  });
  const blocks = await Promise.all(needed.map(inlinedBlock));
  return blocks.filter(Boolean).join("\n");
}

function svgSize(svg: string): { w: number; h: number } {
  const w = parseFloat(svg.match(/<svg\b[^>]*\bwidth="([\d.]+)/)?.[1] || "0");
  const h = parseFloat(svg.match(/<svg\b[^>]*\bheight="([\d.]+)/)?.[1] || "0");
  if (w > 0 && h > 0) return { w, h };
  const vb = svg.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"\s*/);
  return { w: vb ? parseFloat(vb[1]) : 793.7, h: vb ? parseFloat(vb[2]) : 1122.5 };
}

/** blob: hrefs are unreachable from an <img>-loaded SVG; inline them. */
async function inlineBlobHrefs(svg: string): Promise<string> {
  const urls = [...new Set([...svg.matchAll(/(?:xlink:)?href="(blob:[^"]+)"/g)].map((m) => m[1]))];
  if (!urls.length) return svg;
  const pairs = await Promise.all(
    urls.map(async (u) => {
      try {
        const b = await (await fetch(u)).blob();
        const data = await new Promise<string>((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.onerror = () => rej(r.error);
          r.readAsDataURL(b);
        });
        return [u, data] as const;
      } catch {
        return [u, ""] as const;
      }
    })
  );
  let out = svg;
  for (const [u, data] of pairs) if (data) out = out.split(u).join(data);
  return out;
}

async function rasterizePage(svg: string, fontCss: string, scale: number, quality: number): Promise<{ jpg: Uint8Array; w: number; h: number }> {
  const { w, h } = svgSize(svg);
  let markup = await inlineBlobHrefs(svg);
  if (fontCss) markup = markup.replace(/<svg\b[^>]*>/, (m) => `${m}<style>${fontCss}</style>`);
  const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("page rasterize failed"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((res, rej) =>
      canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/jpeg", quality)
    );
    canvas.width = canvas.height = 0;
    return { jpg: new Uint8Array(await blob.arrayBuffer()), w, h };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export type HwpPdfProgress = (done: number, total: number) => void;

/** Render an opened HWP document to PDF bytes. Pages are sized from the SVG
 *  (rhwp emits CSS px at 96dpi; 1px = 0.75pt, so A4 793.7px → 595.3pt). */
export async function hwpToPdfBytes(
  doc: HwpDocument,
  onProgress?: HwpPdfProgress,
  opts: { scale?: number; quality?: number } = {}
): Promise<Uint8Array> {
  const total = doc.pageCount();
  // 2x (≈190dpi) for ordinary documents; long booklets drop to 1.5x so a
  // 100-page file stays ~20MB instead of ~45MB. Text stays crisp at both.
  const scale = opts.scale ?? (total > 20 ? 1.5 : 2);
  const quality = opts.quality ?? 0.8;
  const fontCss = await embeddedFontCssFor(extractAllText(doc)).catch(() => "");
  const pdf = await PDFDocument.create();
  for (let i = 0; i < total; i++) {
    const svg = withKrFontFallbacks(doc.renderPageSvg(i));
    const { jpg, w, h } = await rasterizePage(svg, fontCss, scale, quality);
    const image = await pdf.embedJpg(jpg);
    const page = pdf.addPage([w * 0.75, h * 0.75]);
    page.drawImage(image, { x: 0, y: 0, width: w * 0.75, height: h * 0.75 });
    onProgress?.(i + 1, total);
    await new Promise((r) => setTimeout(r, 0)); // keep the UI responsive
  }
  return pdf.save();
}
