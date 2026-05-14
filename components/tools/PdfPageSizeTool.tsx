"use client";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, isPdfFile, readBytes } from "@/lib/pdf";

const SIZES: Record<string, [number, number]> = {
  A4: [595, 842], A3: [842, 1191], A5: [420, 595], Letter: [612, 792], Legal: [612, 1008], B5: [499, 709],
};

export default function PdfPageSizeTool() {
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
        const embedded = await out.embedPage(p);
        const scale = Math.min(target[0] / width, target[1] / height);
        const w = width * scale, h = height * scale;
        newPage.drawPage(embedded, { x: (target[0] - w) / 2, y: (target[1] - h) / 2, width: w, height: h });
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
        <div className="font-medium mt-2">PDF 업로드</div>
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
      <button onClick={run} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "처리 중..." : "변환"}</button>
    </div>
  );
}
