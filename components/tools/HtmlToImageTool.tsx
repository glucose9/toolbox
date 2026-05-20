"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SAMPLE_HTML = `<div class="card">
  <h1>Hello, world!</h1>
  <p>This is a snapshot rendered from HTML and CSS.</p>
  <button>Click me</button>
</div>`;

const SAMPLE_CSS = `body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
.card {
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
}
.card h1 { margin: 0 0 8px; font-size: 28px; }
.card p { margin: 0 0 16px; opacity: 0.9; }
.card button {
  background: white;
  color: #6366f1;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`;

export default function HtmlToImageTool() {
  const t = useTranslations("toolUI.html-to-image");
  const [html, setHtml] = useState<string>(SAMPLE_HTML);
  const [css, setCss] = useState<string>(SAMPLE_CSS);
  const [width, setWidth] = useState<number>(800);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`;
  }, [html, css]);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc;
    }
  }, [srcDoc]);

  const downloadPng = async () => {
    const frame = iframeRef.current;
    if (!frame) return;
    const doc = frame.contentDocument;
    const body = doc?.body;
    if (!doc || !body) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(body, {
      width,
      windowWidth: width,
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `html-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="card">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="label">{t("html")}</label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder={t("samplePlaceholder")}
              className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y"
              spellCheck={false}
            />
          </div>
          <div>
            <label className="label">{t("css")}</label>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y"
              spellCheck={false}
            />
          </div>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="label">{t("width")}</label>
              <input
                type="number"
                min={100}
                max={3000}
                value={width}
                onChange={(e) => setWidth(Math.max(100, Math.min(3000, Number(e.target.value) || 800)))}
                className="input"
              />
            </div>
            <button onClick={downloadPng} className="btn btn-primary">
              {t("downloadPng")}
            </button>
          </div>
        </div>

        <div>
          <label className="label">{t("preview")}</label>
          <div
            className="border border-gray-200 dark:border-gray-700 rounded overflow-auto bg-white"
            style={{ maxHeight: 520 }}
          >
            <iframe
              ref={iframeRef}
              title="html-preview"
              sandbox="allow-same-origin"
              style={{ width, border: 0, display: "block", background: "white" }}
              className="min-h-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
