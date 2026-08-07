"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function PdfToDocxTool() {
  const t = useTranslations("toolUI.pdf-to-docx");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [includeText, setIncludeText] = useState(true); // include extracted text for copy-paste
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setError("");
    setProgress("");
    setBusy(true);
    setFileName(file.name);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const { Document, Packer, Paragraph, TextRun, ImageRun, PageBreak, HeadingLevel } = await import("docx");

      const buf = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buf }).promise;
      const numPages = pdf.numPages;
      setPageCount(numPages);

      const paragraphs: InstanceType<typeof Paragraph>[] = [];
      const SCALE = 2;

      for (let i = 1; i <= numPages; i++) {
        setProgress(t("renderingPage", { page: i, total: numPages }));
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: SCALE });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("canvas ctx");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        const base64 = dataUrl.split(",")[1];
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

        const targetWidthPt = 540;
        const aspect = canvas.height / canvas.width;
        const targetHeightPt = Math.round(targetWidthPt * aspect);

        paragraphs.push(
          new Paragraph({
            children: [
              new ImageRun({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: bytes as any,
                transformation: { width: targetWidthPt, height: targetHeightPt },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                type: "jpg" as any,
              }),
            ],
          })
        );

        // Optional: include selectable text below each page image
        if (includeText) {
          const textContent = await page.getTextContent();
          // Collect runs with their baseline position, then rebuild lines: group by
          // Y within a tolerance so super/subscripts stay on their own line instead
          // of forming a separate one, and order each line left-to-right instead of
          // by content-stream order.
          const runs: { x: number; y: number; str: string }[] = [];
          for (const item of textContent.items) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const it = item as any;
            if (!it.str || !it.transform) continue;
            runs.push({ x: it.transform[4], y: it.transform[5], str: it.str });
          }
          // pdfjs Y is bottom-up; sort descending so visual top comes first
          runs.sort((a, b) => b.y - a.y || a.x - b.x);
          const Y_TOLERANCE = 4; // pt
          const lines: string[] = [];
          let lineY: number | null = null;
          let cur: { x: number; str: string }[] = [];
          const flushLine = () => {
            if (cur.length === 0) return;
            cur.sort((a, b) => a.x - b.x);
            const text = cur.map((c) => c.str).join(" ").replace(/\s+/g, " ").trim();
            if (text) lines.push(text);
            cur = [];
          };
          for (const run of runs) {
            if (lineY === null || Math.abs(run.y - lineY) > Y_TOLERANCE) {
              flushLine();
              lineY = run.y;
            }
            cur.push(run);
          }
          flushLine();

          if (lines.length > 0) {
            paragraphs.push(
              new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    text: t("extractedTextLabel", { page: i }),
                    italics: true,
                    color: "888888",
                    size: 16, // half-points → 8pt
                  }),
                ],
                heading: HeadingLevel.HEADING_6,
              })
            );
            for (const line of lines) {
              paragraphs.push(
                new Paragraph({
                  children: [new TextRun({ text: line, size: 20, color: "555555" })], // 10pt
                  spacing: { after: 60 },
                })
              );
            }
          }
        }

        if (i < numPages) {
          paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
        }
      }

      setProgress(t("buildingDocx"));
      const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
      // Packer.toBlob never settles in the production webpack bundle (the blob
      // output path of docx's inlined jszip copy hangs; base64 works — verified
      // empirically). Go through base64 and build the Blob ourselves.
      const b64 = await Packer.toBase64String(doc);
      const bin = atob(b64);
      const out = new Uint8Array(bin.length);
      for (let k = 0; k < bin.length; k++) out[k] = bin.charCodeAt(k);
      const blob = new Blob([out], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      a.click();
      // Delay revoke: revoking synchronously after click() can cancel the
      // not-yet-started download.
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setProgress(t("done"));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card space-y-4">
      <div className="text-xs text-muted leading-relaxed bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 px-3 py-2 rounded">
        ⚠️ {t("imageBasedNote")}
      </div>

      <div
        onDrop={(e) => { e.preventDefault(); if (!busy && e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !busy && inputRef.current?.click()}
        className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer transition-colors ${busy ? "opacity-60" : "hover:border-brand-500"}`}
      >
        <div className="text-4xl mb-2">📄</div>
        <div className="font-medium">{t("dropFile")}</div>
        <div className="mt-1 text-xs text-muted">{t("dropHint")}</div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </div>

      <label className="flex items-start gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={includeText}
          onChange={(e) => setIncludeText(e.target.checked)}
          className="mt-1"
        />
        <span>
          <strong>{t("includeTextLabel")}</strong>
          <div className="text-xs text-muted mt-0.5">{t("includeTextHint")}</div>
        </span>
      </label>

      {fileName && !error && (
        <div className="text-sm text-muted">📎 {fileName}{pageCount > 0 && ` · ${pageCount} ${t("pagesUnit")}`}</div>
      )}

      {busy && (
        <div className="text-sm">
          <div className="inline-block animate-spin mr-2">⏳</div>
          {progress || t("processing")}
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
