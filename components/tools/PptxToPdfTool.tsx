"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { loadKrWebFonts } from "@/lib/kr-fonts";
import JSZip from "jszip";

const A4_MM = { w: 297, h: 210 }; // landscape
const A4_PX = { w: 1123, h: 794 };

type FallbackSlide = {
  index: number;
  texts: string[];
  images: string[];
};

function slideNumber(path: string): number {
  const m = path.match(/slide(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
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
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&")
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

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function PptxToPdfTool() {
  const t = useTranslations("toolUI.pptx-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState<FallbackSlide[] | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const buildFallback = async (f: File): Promise<FallbackSlide[]> => {
    const zip = await JSZip.loadAsync(f);
    const slidePaths = Object.keys(zip.files)
      .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
      .sort((a, b) => slideNumber(a) - slideNumber(b));

    const slides: FallbackSlide[] = [];
    for (let i = 0; i < slidePaths.length; i++) {
      const path = slidePaths[i];
      const num = slideNumber(path);
      const xml = await zip.files[path].async("string");
      const texts = extractTexts(xml);

      const images: string[] = [];
      const relPath = `ppt/slides/_rels/slide${num}.xml.rels`;
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

  const handleFile = async (f: File) => {
    if (!/\.pptx$/i.test(f.name)) {
      setError(t("error") + ": .pptx");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    setFallback(null);
    setUsedFallback(false);
    if (containerRef.current) containerRef.current.innerHTML = "";

    try {
      const buffer = await f.arrayBuffer();
      // Try pptx-preview
      try {
        const mod = await import("pptx-preview");
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          const previewer = mod.init(containerRef.current, {
            width: A4_PX.w,
            height: A4_PX.h,
            mode: "slide",
          });
          await previewer.preview(buffer.slice(0));
          setBusy(false);
          return;
        }
      } catch {
        // fall through
        if (containerRef.current) containerRef.current.innerHTML = "";
      }
      // Fallback structured preview
      const slides = await buildFallback(f);
      setFallback(slides);
      setUsedFallback(true);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const downloadPdf = async () => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
        loadKrWebFonts(),
      ]);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });

      if (!usedFallback && containerRef.current) {
        // Each rendered slide is a child of the container
        const slideEls = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(
            ".pptx-preview-wrapper > div, .pptx-preview-slide, .slide"
          )
        );
        const targets: HTMLElement[] =
          slideEls.length > 0
            ? slideEls
            : Array.from(containerRef.current.children).filter(
                (c): c is HTMLElement => c instanceof HTMLElement
              );

        if (targets.length === 0) {
          // Container might be one big slide
          targets.push(containerRef.current);
        }

        for (let i = 0; i < targets.length; i++) {
          const el = targets[i];
          const canvas = await html2canvas(el, { backgroundColor: "#ffffff", scale: 2 });
          const img = canvas.toDataURL("image/jpeg", 0.92);
          if (i > 0) pdf.addPage("a4", "landscape");
          const ratio = canvas.width / canvas.height;
          const drawW = Math.min(A4_MM.w, A4_MM.h * ratio);
          const drawH = Math.min(A4_MM.h, A4_MM.w / ratio);
          pdf.addImage(img, "JPEG", (A4_MM.w - drawW) / 2, (A4_MM.h - drawH) / 2, drawW, drawH);
        }
      } else if (fallback) {
        // Build a virtual slide per item
        for (let i = 0; i < fallback.length; i++) {
          const s = fallback[i];
          const el = document.createElement("div");
          el.style.position = "absolute";
          el.style.left = "-99999px";
          el.style.top = "0";
          el.style.width = `${A4_PX.w}px`;
          el.style.height = `${A4_PX.h}px`;
          el.style.background = "#ffffff";
          el.style.padding = "60px";
          el.style.boxSizing = "border-box";
          el.style.fontFamily =
            "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
          el.style.color = "#111827";
          el.style.overflow = "hidden";

          const title = s.texts[0] ?? "";
          const body = s.texts.slice(1);
          const imgs = s.images
            .slice(0, 4)
            .map(
              (src) =>
                `<img src="${src}" style="max-height:200px;max-width:100%;border-radius:6px;border:1px solid #e5e7eb"/>`
            )
            .join("");
          el.innerHTML = `
            <div style="font-size: 32px; font-weight: 700; margin-bottom: 20px;">${escapeHtml(title)}</div>
            <div style="font-size: 18px; line-height: 1.6;">
              ${body.map((line) => `<div style="margin-bottom: 8px;">${escapeHtml(line)}</div>`).join("")}
            </div>
            ${imgs ? `<div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">${imgs}</div>` : ""}
            <div style="position: absolute; bottom: 20px; right: 30px; font-size: 12px; color: #9ca3af;">${t("slide")} ${s.index}</div>
          `;
          document.body.appendChild(el);
          try {
            const canvas = await html2canvas(el, { backgroundColor: "#ffffff", scale: 2 });
            const img = canvas.toDataURL("image/jpeg", 0.92);
            if (i > 0) pdf.addPage("a4", "landscape");
            pdf.addImage(img, "JPEG", 0, 0, A4_MM.w, A4_MM.h);
          } finally {
            document.body.removeChild(el);
          }
        }
      }

      const outName = file.name.replace(/\.pptx$/i, "") + ".pdf";
      pdf.save(outName);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const slides = fallback || [];

  return (
    <div className="card space-y-4">
      <div
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="text-5xl mb-3">📑</div>
        <div className="font-medium">{t("dropFile")}</div>
        {file && <div className="mt-1 text-sm text-muted truncate">{file.name} · {fmt(file.size)}</div>}
        <input
          ref={inputRef}
          type="file"
          accept=".pptx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      <div className="text-xs text-muted">{t("fidelityNote")}</div>

      {busy && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {file && !busy && (
        <div className="flex flex-wrap gap-2">
          <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
            {busy ? t("processing") : t("downloadPdf")}
          </button>
        </div>
      )}

      {/* Library render target */}
      <div
        ref={containerRef}
        className={fallback ? "hidden" : "overflow-auto flex justify-center"}
      />

      {/* Fallback preview */}
      {fallback && slides.length > 0 && (
        <div className="space-y-3 max-h-[60vh] overflow-auto">
          {slides.map((s) => (
            <div
              key={s.index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="text-xs text-muted mb-2">
                {t("slide")} {s.index}
              </div>
              {s.texts.map((line, i) => (
                <p key={i} className={i === 0 ? "text-base font-semibold mb-1" : "text-sm mb-1"}>
                  {line}
                </p>
              ))}
              {s.images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {s.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="max-h-32 rounded border border-gray-200 dark:border-gray-700"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
