"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { loadKrWebFonts } from "@/lib/kr-fonts";

const A4_MM = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } };

type Orientation = "portrait" | "landscape";

const SAMPLE_HTML = `<h1>Hello, PDF!</h1>
<p>HTML과 CSS를 그대로 PDF로 만들 수 있습니다.</p>
<ul>
  <li>리스트 항목 1</li>
  <li>리스트 항목 2</li>
  <li>리스트 항목 3</li>
</ul>
<blockquote>인용문도 잘 표현됩니다.</blockquote>
<table>
  <thead><tr><th>이름</th><th>점수</th></tr></thead>
  <tbody>
    <tr><td>김</td><td>95</td></tr>
    <tr><td>이</td><td>88</td></tr>
  </tbody>
</table>`;

const SAMPLE_CSS = `body { font-family: 'Pretendard', 'Noto Sans KR', sans-serif; color: #111827; line-height: 1.6; }
h1 { font-size: 28px; margin: 0 0 12px; }
p { margin: 0 0 10px; }
ul { margin: 0 0 12px 20px; }
blockquote { margin: 12px 0; padding: 8px 14px; border-left: 4px solid #6366f1; color: #4b5563; background: #f9fafb; }
table { border-collapse: collapse; margin-top: 12px; }
th, td { border: 1px solid #d1d5db; padding: 6px 10px; }
th { background: #f3f4f6; }`;

export default function HtmlToPdfTool() {
  const t = useTranslations("toolUI.html-to-pdf");
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [css, setCss] = useState(SAMPLE_CSS);
  const [width, setWidth] = useState(794);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const loadSample = () => {
    setHtml(SAMPLE_HTML);
    setCss(SAMPLE_CSS);
  };

  const downloadPdf = async () => {
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas").then(async (m) => (await loadKrWebFonts(), m)),
        import("jspdf"),
      ]);

      const wrap = document.createElement("div");
      wrap.style.position = "absolute";
      wrap.style.left = "-99999px";
      wrap.style.top = "0";
      wrap.style.width = `${width}px`;
      wrap.style.background = "#ffffff";
      wrap.style.boxSizing = "border-box";
      wrap.style.padding = "32px";
      wrap.innerHTML = `<style>${css}</style><div class="html-to-pdf-root">${html}</div>`;
      document.body.appendChild(wrap);

      let canvas: HTMLCanvasElement;
      try {
        canvas = await html2canvas(wrap, { backgroundColor: "#ffffff", scale: 2 });
      } finally {
        document.body.removeChild(wrap);
      }

      const pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
      const pageW = A4_MM[orientation].w;
      const pageH = A4_MM[orientation].h;
      const pxPerMm = canvas.width / pageW;
      const pageHeightPx = Math.floor(pageH * pxPerMm);

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
        const mmHeight = sliceHeight / pxPerMm;
        pdf.addImage(img, "JPEG", 0, 0, pageW, mmHeight);
        yOffset += sliceHeight;
        pageIndex++;
      }

      pdf.save("html.pdf");
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">{t("html")}</label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">CSS</label>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span>{t("width")} (px)</span>
          <input
            type="number"
            value={width}
            min={400}
            max={2000}
            onChange={(e) => setWidth(parseInt(e.target.value, 10) || 794)}
            className="input"
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

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
          {busy ? t("processing") : t("downloadPdf")}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {t("sample")}
        </button>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
