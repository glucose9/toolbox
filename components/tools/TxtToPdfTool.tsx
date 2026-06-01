"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const A4_MM = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } };

type Orientation = "portrait" | "landscape";

const CJK_RE = /[぀-ヿ㐀-䶿一-鿿가-힯]/;

export default function TxtToPdfTool() {
  const t = useTranslations("toolUI.txt-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [margin, setMargin] = useState(20);
  const [monospace, setMonospace] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadFile = async (f: File) => {
    setError("");
    try {
      const t1 = await f.text();
      setText(t1);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    }
  };

  const downloadPdf = async () => {
    if (!text) return;
    setError("");
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pageW = A4_MM[orientation].w;
      const pageH = A4_MM[orientation].h;

      // CJK detection → fall back to html2canvas for crisp glyphs.
      if (CJK_RE.test(text)) {
        const { default: html2canvas } = await import("html2canvas");
        const pxPerMm = 96 / 25.4;
        const widthPx = Math.round(pageW * pxPerMm);
        const paddingPx = Math.round(margin * pxPerMm);

        const wrap = document.createElement("div");
        wrap.style.position = "absolute";
        wrap.style.left = "-99999px";
        wrap.style.top = "0";
        wrap.style.width = `${widthPx}px`;
        wrap.style.background = "#ffffff";
        wrap.style.padding = `${paddingPx}px`;
        wrap.style.boxSizing = "border-box";
        wrap.style.fontFamily = monospace
          ? "ui-monospace, SFMono-Regular, Menlo, monospace"
          : "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
        wrap.style.fontSize = `${fontSize}pt`;
        wrap.style.lineHeight = `${lineHeight}`;
        wrap.style.color = "#111827";
        wrap.style.whiteSpace = "pre-wrap";
        wrap.style.wordBreak = "break-word";
        wrap.textContent = text;
        document.body.appendChild(wrap);

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(wrap, { backgroundColor: "#ffffff", scale: 2 });
        } finally {
          document.body.removeChild(wrap);
        }

        const pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
        const renderPxPerMm = canvas.width / pageW;
        const pageHeightPx = Math.floor(pageH * renderPxPerMm);
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
          if (pageIndex > 0) pdf.addPage("a4", orientation);
          const mmHeight = sliceHeight / renderPxPerMm;
          pdf.addImage(img, "JPEG", 0, 0, pageW, mmHeight);
          yOffset += sliceHeight;
          pageIndex++;
        }
        pdf.save("text.pdf");
        return;
      }

      // ASCII-only path → use crisp text rendering
      const pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
      pdf.setFont(monospace ? "courier" : "helvetica", "normal");
      pdf.setFontSize(fontSize);

      const usableW = pageW - 2 * margin;
      // Approx mm per line (pt → mm: 1pt = 0.3528mm)
      const ptToMm = 0.3528;
      const lineHeightMm = fontSize * ptToMm * lineHeight;

      // Preserve user newlines: split first, then wrap each line
      const sourceLines = text.split(/\r?\n/);
      const lines: string[] = [];
      for (const src of sourceLines) {
        if (src.length === 0) {
          lines.push("");
          continue;
        }
        const wrapped = pdf.splitTextToSize(src, usableW) as string[];
        for (const w of wrapped) lines.push(w);
      }

      let y = margin + lineHeightMm; // baseline for first line
      let pageIndex = 0;
      for (const line of lines) {
        if (y > pageH - margin) {
          pdf.addPage("a4", orientation);
          pageIndex++;
          y = margin + lineHeightMm;
        }
        pdf.text(line || " ", margin, y);
        y += lineHeightMm;
      }
      void pageIndex;
      pdf.save("text.pdf");
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("text")}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y ${monospace ? "font-mono" : ""}`}
          placeholder=""
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("fontSize")}: {fontSize}pt</span>
          <input
            type="range"
            min={8}
            max={24}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("lineHeight")}: {lineHeight.toFixed(1)}</span>
          <input
            type="range"
            min={12}
            max={20}
            value={Math.round(lineHeight * 10)}
            onChange={(e) => setLineHeight(parseInt(e.target.value, 10) / 10)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("margin")}: {margin}mm</span>
          <input
            type="range"
            min={5}
            max={40}
            value={margin}
            onChange={(e) => setMargin(parseInt(e.target.value, 10))}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("orientation")}</span>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as Orientation)}
            className="input"
          >
            <option value="portrait">{t("portrait")}</option>
            <option value="landscape">{t("landscape")}</option>
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={monospace}
          onChange={(e) => setMonospace(e.target.checked)}
        />
        <span>{t("monospace")}</span>
      </label>

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadPdf} disabled={busy || !text} className="btn btn-primary">
          {busy ? t("processing") : t("downloadPdf")}
        </button>
        <button onClick={() => inputRef.current?.click()} className="btn btn-secondary">
          {t("uploadFile")}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".txt,text/plain"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
