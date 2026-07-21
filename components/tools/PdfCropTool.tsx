"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

const MM_TO_PT = 2.83465;

export default function PdfCropTool() {
  const t = useTranslations("toolUI.pdf-crop");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) return;
    setFile(f);
    const src = await PDFDocument.load(await readBytes(f));
    setPageCount(src.getPageCount());
  };

  const run = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      const mTop = top * MM_TO_PT, mBottom = bottom * MM_TO_PT, mLeft = left * MM_TO_PT, mRight = right * MM_TO_PT;
      for (const page of src.getPages()) {
        const { width, height } = page.getSize();
        // CropBox lives in unrotated user space, so the sides the user sees on
        // screen must be remapped through the page's /Rotate value first.
        const rot = ((page.getRotation().angle % 360) + 360) % 360;
        let t2 = mTop, b = mBottom, l = mLeft, r = mRight;
        if (rot === 90) { l = mTop; t2 = mRight; r = mBottom; b = mLeft; }
        else if (rot === 180) { l = mRight; r = mLeft; t2 = mBottom; b = mTop; }
        else if (rot === 270) { l = mBottom; b = mRight; r = mTop; t2 = mLeft; }
        if (l + r >= width || t2 + b >= height) throw new Error(t("errMarginTooLarge"));
        page.setCropBox(l, b, width - l - r, height - t2 - b);
      }
      const out = await src.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "_cropped.pdf");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) {
    return (
      <div className="card">
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">✂️</div>
          <div className="font-medium mt-2">{t("uploadPdf")}</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <div className="text-sm"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmtBytes(file.size)} · {t("pages", { count: pageCount })}</div></div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <label>{t("topMm")}<input type="number" min="0" value={top} onChange={(e) => setTop(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>{t("bottomMm")}<input type="number" min="0" value={bottom} onChange={(e) => setBottom(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>{t("leftMm")}<input type="number" min="0" value={left} onChange={(e) => setLeft(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>{t("rightMm")}<input type="number" min="0" value={right} onChange={(e) => setRight(+e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? t("processing") : `✂️ ${t("crop")}`}</button>
        <button onClick={() => setFile(null)} className="btn btn-secondary">{t("otherFile")}</button>
      </div>
    </div>
  );
}
