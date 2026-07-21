"use client";
import { useRef, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { useTranslations } from "next-intl";
import { downloadBlob, isPdfFile, readBytes } from "@/lib/pdf";

const SIZES: Record<string, [number, number]> = {
  A4: [595, 842], A3: [842, 1191], A5: [420, 595], Letter: [612, 792], Legal: [612, 1008], B5: [499, 709],
};

export default function PdfPageSizeTool() {
  const t = useTranslations("toolUI.pdf-page-size");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState("A4");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      const out = await PDFDocument.create();
      const target = SIZES[size];
      for (const p of src.getPages()) {
        const newPage = out.addPage(target);
        const { width, height } = p.getSize();
        // embedPage ignores the source page's /Rotate, so bake it in here:
        // swap the on-screen dimensions and rotate the drawn content back.
        const rot = ((p.getRotation().angle % 360) + 360) % 360;
        const swap = rot === 90 || rot === 270;
        const effW = swap ? height : width;
        const effH = swap ? width : height;
        const embedded = await out.embedPage(p);
        const scale = Math.min(target[0] / effW, target[1] / effH);
        const w = effW * scale, h = effH * scale;
        const x = (target[0] - w) / 2, y = (target[1] - h) / 2;
        newPage.drawPage(embedded, {
          x: rot === 180 || rot === 270 ? x + w : x,
          y: rot === 90 || rot === 180 ? y + h : y,
          width: width * scale,
          height: height * scale,
          rotate: degrees(-rot),
        });
      }
      const result = await out.save();
      downloadBlob(new Blob([result.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + `_${size}.pdf`);
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) return (
    <div className="card">
      <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
        <div className="text-5xl">📐</div>
        <div className="font-medium mt-2">{t("uploadPdf")}</div>
        <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && isPdfFile(e.target.files[0]) && setFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div className="text-sm font-medium truncate">{file.name}</div>
      <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
        {Object.keys(SIZES).map((k) => <option key={k}>{k}</option>)}
      </select>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? t("processing") : t("convert")}</button>
    </div>
  );
}
