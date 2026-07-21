"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { marked } from "marked";
import DOMPurify from "dompurify";

const A4_MM = { w: 210, h: 297 };
const A4_PX_W = 794;

const SAMPLE_MD = `# 마크다운으로 PDF 만들기

마크다운을 그대로 **PDF**로 변환해 보세요.

## 기능
- 헤더, 목록, 표 지원
- \`inline code\` 와 코드블록
- 인용문 처리

\`\`\`js
function hello() {
  return "world";
}
\`\`\`

> 인용문은 이렇게 표시됩니다.

| 항목 | 설명 |
|---|---|
| A | 첫 번째 |
| B | 두 번째 |
`;

export default function MdToPdfTool() {
  const t = useTranslations("toolUI.md-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [md, setMd] = useState(SAMPLE_MD);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const html = useMemo(() => {
    let raw: string;
    try {
      marked.setOptions({ gfm: true, breaks: true });
      raw = marked.parse(md) as string;
    } catch (e) {
      raw = `<p style="color:red">${(e as Error).message}</p>`;
    }
    // Allow target so "open in new tab" links written in raw HTML survive;
    // iframes/scripts stay stripped (intended XSS hardening).
    return DOMPurify.sanitize(raw, { ADD_ATTR: ["target"] });
  }, [md]);

  const loadSample = () => {
    setMd(SAMPLE_MD);
  };

  const loadFile = async (f: File) => {
    setError("");
    try {
      const text = await f.text();
      setMd(text);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    }
  };

  const downloadPdf = async () => {
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const wrap = document.createElement("div");
      wrap.style.position = "absolute";
      wrap.style.left = "-99999px";
      wrap.style.top = "0";
      wrap.style.width = `${A4_PX_W}px`;
      wrap.style.background = "#ffffff";
      wrap.style.padding = "56px";
      wrap.style.boxSizing = "border-box";
      wrap.style.fontFamily =
        "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
      wrap.style.fontSize = "14px";
      wrap.style.lineHeight = "1.65";
      wrap.style.color = "#111827";
      wrap.innerHTML = `
        <style>
          .md h1 { font-size: 30px; font-weight: 700; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
          .md h2 { font-size: 24px; font-weight: 700; margin: 22px 0 10px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; }
          .md h3 { font-size: 19px; font-weight: 700; margin: 18px 0 8px; }
          .md h4 { font-size: 16px; font-weight: 700; margin: 14px 0 6px; }
          .md p { margin: 0 0 10px; }
          .md ul, .md ol { margin: 0 0 12px 24px; }
          .md li { margin-bottom: 4px; }
          .md code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #f3f4f6; padding: 1px 5px; border-radius: 3px; font-size: 0.92em; }
          .md pre { background: #f3f4f6; padding: 12px 14px; border-radius: 6px; overflow: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.5; margin: 0 0 12px; }
          .md pre code { background: transparent; padding: 0; }
          .md blockquote { margin: 0 0 12px; padding: 8px 14px; border-left: 4px solid #6366f1; color: #4b5563; background: #f9fafb; }
          .md table { border-collapse: collapse; margin: 0 0 14px; width: 100%; }
          .md th, .md td { border: 1px solid #d1d5db; padding: 6px 10px; vertical-align: top; }
          .md th { background: #f3f4f6; font-weight: 600; }
          .md a { color: #4f46e5; text-decoration: underline; }
          .md hr { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }
          .md img { max-width: 100%; }
        </style>
        <div class="md">${html}</div>
      `;
      document.body.appendChild(wrap);

      let canvas: HTMLCanvasElement;
      try {
        canvas = await html2canvas(wrap, { backgroundColor: "#ffffff", scale: 2 });
      } finally {
        document.body.removeChild(wrap);
      }

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

      pdf.save("markdown.pdf");
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
          <label className="label">{t("markdown")}</label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            className="w-full h-80 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">{t("preview")}</label>
          <div
            className="w-full h-80 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm overflow-y-auto prose-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
          {busy ? t("processing") : t("downloadPdf")}
        </button>
        <button onClick={() => inputRef.current?.click()} className="btn btn-secondary">
          {t("uploadFile")}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {t("sample")}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".md,.markdown,text/markdown,.txt"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
