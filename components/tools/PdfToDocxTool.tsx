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
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = async (file: File) => {
    setError("");
    setProgress("");
    setBusy(true);
    setFileName(file.name);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const { Document, Packer, Paragraph, ImageRun, PageBreak } = await import("docx");

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

        // Word page width: ~540pt (A4 595pt minus side margins).
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
        if (i < numPages) {
          paragraphs.push(new Paragraph({ children: [new PageBreak()] }));
        }
      }

      setProgress(t("buildingDocx"));
      const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      a.click();
      URL.revokeObjectURL(url);
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
