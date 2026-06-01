"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

// A4 dimensions
const A4_MM = { w: 210, h: 297 };
const A4_PX = { w: 794, h: 1123 }; // 96 dpi portrait

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DocxToPdfTool() {
  const t = useTranslations("toolUI.docx-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [html, setHtml] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!/\.docx$/i.test(f.name)) {
      setError(t("error") + ": .docx");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    setHtml("");
    try {
      const mammoth = await import("mammoth/mammoth.browser.js");
      const buf = await f.arrayBuffer();
      const res = await mammoth.convertToHtml({ arrayBuffer: buf });
      setHtml(res.value);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const downloadPdf = async () => {
    if (!file || !html) return;
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Build hidden A4-width container with the entire HTML
      const wrap = document.createElement("div");
      wrap.style.position = "absolute";
      wrap.style.left = "-99999px";
      wrap.style.top = "0";
      wrap.style.width = `${A4_PX.w}px`;
      wrap.style.background = "#ffffff";
      wrap.style.padding = "60px 60px";
      wrap.style.boxSizing = "border-box";
      wrap.style.fontFamily =
        "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
      wrap.style.fontSize = "14px";
      wrap.style.lineHeight = "1.6";
      wrap.style.color = "#111827";
      wrap.innerHTML = `
        <style>
          .doc h1 { font-size: 28px; margin: 0 0 14px; font-weight: 700; }
          .doc h2 { font-size: 22px; margin: 18px 0 10px; font-weight: 700; }
          .doc h3 { font-size: 18px; margin: 14px 0 8px; font-weight: 700; }
          .doc p { margin: 0 0 10px; }
          .doc ul, .doc ol { margin: 0 0 10px 24px; }
          .doc li { margin-bottom: 4px; }
          .doc table { border-collapse: collapse; margin: 10px 0; width: 100%; }
          .doc th, .doc td { border: 1px solid #d1d5db; padding: 6px 8px; }
          .doc img { max-width: 100%; }
          .doc blockquote { margin: 0 0 10px; padding: 8px 12px; border-left: 4px solid #e5e7eb; color: #4b5563; }
          .doc code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #f3f4f6; padding: 1px 4px; border-radius: 3px; }
          .doc pre { background: #f3f4f6; padding: 12px; border-radius: 6px; overflow: auto; }
        </style>
        <div class="doc">${html}</div>
      `;
      document.body.appendChild(wrap);

      let canvas: HTMLCanvasElement;
      try {
        canvas = await html2canvas(wrap, { backgroundColor: "#ffffff", scale: 2 });
      } finally {
        document.body.removeChild(wrap);
      }

      // Slice canvas into A4-portrait pages
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pxPerMm = canvas.width / A4_MM.w;
      const pageHeightPx = Math.floor(A4_MM.h * pxPerMm);

      let yOffset = 0;
      let pageIndex = 0;
      while (yOffset < canvas.height) {
        const sliceHeight = Math.min(pageHeightPx, canvas.height - yOffset);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) break;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          yOffset,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );
        const img = pageCanvas.toDataURL("image/jpeg", 0.92);
        if (pageIndex > 0) pdf.addPage("a4", "portrait");
        const mmHeight = sliceHeight / pxPerMm;
        pdf.addImage(img, "JPEG", 0, 0, A4_MM.w, mmHeight);
        yOffset += sliceHeight;
        pageIndex++;
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">{fmt(file.size)}</div>
        </div>
        <button
          onClick={() => {
            setFile(null);
            setHtml("");
            setError("");
          }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("dropFile")}
        </button>
      </div>

      {busy && <div className="py-2 text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {html && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
              {busy ? t("processing") : t("downloadPdf")}
            </button>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">{t("preview")}</div>
            <div
              className="w-full max-h-[60vh] overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 prose-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </>
      )}
    </div>
  );
}
