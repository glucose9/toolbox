"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

type FallbackSlide = {
  index: number;
  texts: string[];
  images: string[];
};

function slideNumber(path: string): number {
  const m = path.match(/slide(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
}

/** Resolve an OPC relationship Target against the part's base directory (e.g. "ppt/"). */
function resolveRelTarget(target: string, baseDir: string): string {
  let p = target.replace(/^\.\//, "");
  if (p.startsWith("/")) return p.replace(/^\/+/, "");
  let dir = baseDir;
  while (p.startsWith("../")) {
    p = p.slice(3);
    dir = dir.replace(/[^/]+\/$/, "");
  }
  return dir + p;
}

function relAttr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
}

/**
 * Presentation order is defined by <p:sldIdLst> in ppt/presentation.xml (resolved through
 * ppt/_rels/presentation.xml.rels), NOT by the slideN.xml part file names — PowerPoint keeps
 * part names stable when slides are reordered. Falls back to numeric file-name order.
 */
async function orderedSlidePaths(zip: JSZip): Promise<string[]> {
  const byName = Object.keys(zip.files)
    .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
    .sort((a, b) => slideNumber(a) - slideNumber(b));
  try {
    const relFile = zip.files["ppt/_rels/presentation.xml.rels"];
    const presFile = zip.files["ppt/presentation.xml"];
    if (!relFile || !presFile) return byName;
    const relXml = await relFile.async("string");
    const idToPath = new Map<string, string>();
    for (const tag of relXml.match(/<Relationship\b[^>]*>/g) || []) {
      const id = relAttr(tag, "Id");
      const target = relAttr(tag, "Target");
      if (!id || !target) continue;
      const resolved = resolveRelTarget(target, "ppt/");
      if (/^ppt\/slides\/slide\d+\.xml$/.test(resolved)) idToPath.set(id, resolved);
    }
    const presXml = await presFile.async("string");
    const lst = presXml.match(/<p:sldIdLst[\s\S]*?<\/p:sldIdLst>/);
    if (!lst) return byName;
    const ordered: string[] = [];
    for (const ref of lst[0].match(/r:id="[^"]+"/g) || []) {
      const id = ref.replace(/^r:id="/, "").replace(/"$/, "");
      const path = idToPath.get(id);
      if (path && zip.files[path] && !ordered.includes(path)) ordered.push(path);
    }
    if (ordered.length === 0) return byName;
    for (const p of byName) if (!ordered.includes(p)) ordered.push(p);
    return ordered;
  } catch {
    return byName;
  }
}

function extractTexts(xml: string): string[] {
  const matches = xml.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [];
  return matches
    .map((m) =>
      m
        .replace(/<a:t>/, "")
        .replace(/<\/a:t>/, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
    )
    .filter((s) => s.trim());
}

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
};

export default function PptxViewerTool() {
  const t = useTranslations("toolUI.pptx-viewer");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<FallbackSlide[] | null>(null);
  const [current, setCurrent] = useState(0);

  const buildFallback = async (file: File) => {
    const zip = await JSZip.loadAsync(file);
    const slidePaths = await orderedSlidePaths(zip);

    const slides: FallbackSlide[] = [];
    for (let i = 0; i < slidePaths.length; i++) {
      const path = slidePaths[i];
      const xml = await zip.files[path].async("string");
      const texts = extractTexts(xml);

      // Map images via slide rels
      const images: string[] = [];
      const relPath = path.replace(/^ppt\/slides\//, "ppt/slides/_rels/") + ".rels";
      if (zip.files[relPath]) {
        const relXml = await zip.files[relPath].async("string");
        const targets = relXml.match(/Target="([^"]*media\/[^"]+)"/g) || [];
        for (const target of targets) {
          const tm = target.match(/Target="([^"]+)"/);
          if (!tm) continue;
          let mediaPath = tm[1].replace(/^\.\.\//, "ppt/");
          if (!mediaPath.startsWith("ppt/")) mediaPath = "ppt/" + mediaPath.replace(/^\//, "");
          mediaPath = mediaPath.replace("ppt/ppt/", "ppt/");
          const fileEntry =
            zip.files[mediaPath] ||
            zip.files[`ppt/media/${tm[1].split("/").pop()}`];
          if (fileEntry) {
            const ext = mediaPath.split(".").pop()?.toLowerCase() || "png";
            if (MIME[ext]) {
              const blob = await fileEntry.async("blob");
              images.push(URL.createObjectURL(new Blob([blob], { type: MIME[ext] })));
            }
          }
        }
      }
      slides.push({ index: i + 1, texts, images });
    }
    return slides;
  };

  const onFile = async (file: File) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    setFallback(null);
    setCurrent(0);
    if (containerRef.current) containerRef.current.innerHTML = "";

    const buffer = await file.arrayBuffer();

    // Primary: pptx-preview library
    try {
      const mod = await import("pptx-preview");
      if (containerRef.current) {
        const width = Math.min(containerRef.current.clientWidth || 960, 960);
        const previewer = mod.init(containerRef.current, {
          width,
          height: Math.round((width * 9) / 16),
          mode: "slide",
        });
        await previewer.preview(buffer.slice(0));
        setLoading(false);
        return;
      }
    } catch {
      // fall through to structured fallback
      if (containerRef.current) containerRef.current.innerHTML = "";
    }

    // Fallback: structured content preview
    try {
      const slides = await buildFallback(file);
      setFallback(slides);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("renderFailed"));
    } finally {
      setLoading(false);
    }
  };

  const slides = fallback || [];

  return (
    <div className="card space-y-4">
      <div
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="text-5xl mb-3">📊</div>
        <div className="font-medium">{t("dropFile")}</div>
        {fileName && <div className="mt-1 text-sm text-muted truncate">{fileName}</div>}
        <input
          ref={inputRef}
          type="file"
          accept=".pptx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </div>

      <div className="text-xs text-muted">{t("fidelityNote")}</div>

      {loading && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* Library render target (hidden when fallback active) */}
      <div
        ref={containerRef}
        className={fallback ? "hidden" : "overflow-auto flex justify-center"}
      />

      {/* Structured fallback */}
      {fallback && slides.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="btn btn-secondary disabled:opacity-40"
            >
              {t("prev")}
            </button>
            <div className="text-sm text-muted">
              {t("slide")} {current + 1} / {slides.length}
            </div>
            <button
              onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))}
              disabled={current === slides.length - 1}
              className="btn btn-secondary disabled:opacity-40"
            >
              {t("next")}
            </button>
          </div>

          <div className="aspect-video w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-6 overflow-auto">
            <div className="text-xs text-muted mb-3">
              {t("slide")} {slides[current].index}
            </div>
            {slides[current].texts.map((line, i) => (
              <p
                key={i}
                className={i === 0 ? "text-lg font-semibold mb-2" : "text-sm mb-1"}
              >
                {line}
              </p>
            ))}
            {slides[current].images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {slides[current].images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="max-h-48 rounded border border-gray-200 dark:border-gray-700"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
