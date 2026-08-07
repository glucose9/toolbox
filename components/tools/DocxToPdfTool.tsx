"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { loadKrWebFonts, applyKrFontFallbacks } from "@/lib/kr-fonts";

const A4_MM = { w: 210, h: 297 };

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

// docx-preview's section-class can vary between versions ("docx", "docx_page",
// "section.docx"); on some inputs (no explicit page breaks) it also flattens to
// a single wrapper. Try several selectors, then fall back to the wrapper itself.
function findPages(container: HTMLElement): HTMLElement[] {
  const selectors = [
    "section.docx",
    "section.docx_page",
    ".docx-wrapper > section",
    ".docx > section",
    "section",
  ];
  for (const sel of selectors) {
    const found = Array.from(container.querySelectorAll<HTMLElement>(sel));
    if (found.length > 0) return found;
  }
  const wrapper = container.querySelector<HTMLElement>(
    ".docx-wrapper, .docx-rendered, .docx"
  );
  if (wrapper) return [wrapper];
  return container.children.length > 0 ? [container.children[0] as HTMLElement] : [];
}

export default function DocxToPdfTool() {
  const t = useTranslations("toolUI.docx-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [rendered, setRendered] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Render the docx into the preview container via docx-preview.
  useEffect(() => {
    if (!file || !previewRef.current) return;
    let cancelled = false;
    setRendered(false);
    setPageCount(0);
    setError("");
    setBusy(true);

    (async () => {
      try {
        const [docxPreview] = await Promise.all([import("docx-preview"), loadKrWebFonts()]);
        const container = previewRef.current!;
        container.innerHTML = "";
        const buf = await file.arrayBuffer();
        if (cancelled) return;
        await docxPreview.renderAsync(buf, container, undefined, {
          className: "docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          experimental: true,
          useBase64URL: true,
        });
        if (cancelled) return;
        applyKrFontFallbacks(container);
        const pages = findPages(container);
        setPageCount(pages.length);
        setRendered(true);
      } catch (e) {
        if (!cancelled) setError(t("error") + ": " + (e as Error).message);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [file, t]);

  const handleFile = (f: File) => {
    if (!/\.docx$/i.test(f.name)) {
      setError(t("error") + ": .docx");
      return;
    }
    setError("");
    setFile(f);
  };

  const downloadPdf = async () => {
    if (!file || !previewRef.current) return;
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const container = previewRef.current;
      const sections = findPages(container);
      if (sections.length === 0) throw new Error("no pages rendered");

      // Determine page size from the first section (docx-preview sets page sizing).
      const first = sections[0];
      const firstRect = first.getBoundingClientRect();
      const orientation: "portrait" | "landscape" =
        firstRect.width > firstRect.height ? "landscape" : "portrait";

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Use the FULL page width/height from the rendered section,
      // then map to A4. This preserves the original document's aspect.
      const pageW = orientation === "portrait" ? A4_MM.w : A4_MM.h;
      const pageH = orientation === "portrait" ? A4_MM.h : A4_MM.w;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const canvas = await html2canvas(sec, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
        });
        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage("a4", orientation);

        // Fit image into the A4 page preserving aspect (letterbox if needed).
        const cw = canvas.width;
        const ch = canvas.height;
        const pageRatio = pageW / pageH;
        const imgRatio = cw / ch;
        let drawW = pageW;
        let drawH = pageH;
        if (imgRatio > pageRatio) {
          // image wider than page → fit width
          drawW = pageW;
          drawH = pageW / imgRatio;
        } else {
          // image taller → fit height
          drawH = pageH;
          drawW = pageH * imgRatio;
        }
        const x = (pageW - drawW) / 2;
        const y = (pageH - drawH) / 2;
        pdf.addImage(img, "JPEG", x, y, drawW, drawH);
      }

      const outName = file.name.replace(/\.docx$/i, "") + ".pdf";
      pdf.save(outName);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📄</div>
          <div className="font-medium">{t("dropFile")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="text-xs text-muted leading-relaxed bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 rounded">
        ✨ {t("fidelityNote")}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">
            {fmt(file.size)}
            {pageCount > 0 && ` · ${pageCount} ${t("pagesUnit")}`}
          </div>
        </div>
        <button
          onClick={() => {
            setFile(null);
            setRendered(false);
            setPageCount(0);
            setError("");
            if (previewRef.current) previewRef.current.innerHTML = "";
          }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("dropFile")}
        </button>
      </div>

      {busy && <div className="py-2 text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {rendered && (
        <div className="flex flex-wrap gap-2">
          <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
            {busy ? t("processing") : t("downloadPdf")}
          </button>
        </div>
      )}

      <div>
        <div className="text-sm font-medium mb-2">{t("preview")}</div>
        <div className="w-full max-h-[70vh] overflow-auto p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800">
          <div ref={previewRef} className="docx-preview-host" />
        </div>
      </div>

      <style jsx global>{`
        .docx-preview-host .docx-wrapper {
          background: transparent;
          padding: 0;
        }
        .docx-preview-host section.docx {
          background: #ffffff;
          margin: 0 auto 12px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
