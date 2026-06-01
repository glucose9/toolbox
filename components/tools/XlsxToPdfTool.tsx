"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const A4_MM = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } };
const A4_PX = { portrait: { w: 794, h: 1123 }, landscape: { w: 1123, h: 794 } };

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

type SheetEntry = { name: string; html: string };

export default function XlsxToPdfTool() {
  const t = useTranslations("toolUI.xlsx-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!/\.(xlsx|xls|csv)$/i.test(f.name)) {
      setError(t("error") + ": .xlsx / .xls / .csv");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    setSheets([]);
    try {
      const XLSX = await import("xlsx");
      const buf = await f.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const out: SheetEntry[] = [];
      for (const name of wb.SheetNames) {
        const ws = wb.Sheets[name];
        if (!ws) continue;
        const html = XLSX.utils.sheet_to_html(ws, { header: "", footer: "" });
        out.push({ name, html });
      }
      setSheets(out);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const renderSheetContainer = (sheet: SheetEntry): HTMLDivElement => {
    const wrap = document.createElement("div");
    wrap.style.position = "absolute";
    wrap.style.left = "-99999px";
    wrap.style.top = "0";
    wrap.style.background = "#ffffff";
    wrap.style.padding = "24px";
    wrap.style.boxSizing = "border-box";
    wrap.style.fontFamily =
      "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
    wrap.style.fontSize = "12px";
    wrap.style.color = "#111827";
    wrap.innerHTML = `
      <style>
        .xlsx-wrap table { border-collapse: collapse; width: max-content; }
        .xlsx-wrap td, .xlsx-wrap th { border: 1px solid #d1d5db; padding: 4px 8px; vertical-align: top; white-space: nowrap; }
        .xlsx-wrap th { background: #f3f4f6; font-weight: 600; }
        .xlsx-wrap .title { font-weight: 700; font-size: 14px; margin-bottom: 8px; }
      </style>
      <div class="xlsx-wrap">
        <div class="title">${escapeHtml(sheet.name)}</div>
        ${sheet.html}
      </div>
    `;
    return wrap;
  };

  const downloadPdf = async () => {
    if (!file || sheets.length === 0) return;
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      let pdf: import("jspdf").jsPDF | null = null;

      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        const el = renderSheetContainer(sheet);
        document.body.appendChild(el);

        // Decide orientation per-sheet: landscape if the rendered width is large
        // relative to height (very wide tables).
        const rect = el.getBoundingClientRect();
        const ratio = rect.width / Math.max(1, rect.height);
        const orientation: "portrait" | "landscape" = ratio > 1.2 ? "landscape" : "portrait";

        // Constrain rendered width to fit the chosen page width.
        const targetPx = A4_PX[orientation].w;
        // Apply zoom-like scaling: pick a scale so the content fits page width.
        const scale = Math.min(2, Math.max(0.5, targetPx / Math.max(1, rect.width)));

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(el, {
            backgroundColor: "#ffffff",
            scale: 2 * scale,
          });
        } finally {
          document.body.removeChild(el);
        }

        if (!pdf) {
          pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
        } else {
          pdf.addPage("a4", orientation);
        }

        const pageW = A4_MM[orientation].w;
        const pageH = A4_MM[orientation].h;
        const pxPerMm = canvas.width / pageW;
        const pageHeightPx = Math.floor(pageH * pxPerMm);

        // Slice into pages if taller than one A4 page
        let yOffset = 0;
        let firstSlice = true;
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
          if (!firstSlice) pdf.addPage("a4", orientation);
          const mmHeight = sliceHeight / pxPerMm;
          pdf.addImage(img, "JPEG", 0, 0, pageW, mmHeight);
          yOffset += sliceHeight;
          firstSlice = false;
        }
      }

      const outName = file.name.replace(/\.(xlsx|xls|csv)$/i, "") + ".pdf";
      pdf?.save(outName);
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
          <div className="text-5xl mb-3">📊</div>
          <div className="font-medium">{t("dropFile")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
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
          <div className="text-xs text-muted">
            {fmt(file.size)}
            {sheets.length > 0 && ` · ${t("sheetsFound", { count: sheets.length })}`}
          </div>
        </div>
        <button
          onClick={() => {
            setFile(null);
            setSheets([]);
            setError("");
          }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("dropFile")}
        </button>
      </div>

      {busy && <div className="py-2 text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {sheets.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
              {busy ? t("processing") : t("downloadPdf")}
            </button>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-auto">
            {sheets.map((s, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div className="text-sm font-semibold mb-2">{s.name}</div>
                <div className="text-xs overflow-auto" dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            ))}
          </div>
        </>
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
