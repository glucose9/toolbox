"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBlob, fmtBytes, isPdfFile, readBytes } from "@/lib/pdf";

type Meta = { title: string; author: string; subject: string; keywords: string; creator: string; producer: string };

export default function PdfMetadataTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta>({ title: "", author: "", subject: "", keywords: "", creator: "", producer: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!isPdfFile(f)) return;
    setFile(f);
    const src = await PDFDocument.load(await readBytes(f));
    setMeta({
      title: src.getTitle() || "",
      author: src.getAuthor() || "",
      subject: src.getSubject() || "",
      keywords: (src.getKeywords() || "").toString(),
      creator: src.getCreator() || "",
      producer: src.getProducer() || "",
    });
  };

  const save = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const src = await PDFDocument.load(await readBytes(file));
      src.setTitle(meta.title);
      src.setAuthor(meta.author);
      src.setSubject(meta.subject);
      src.setKeywords(meta.keywords.split(/[,;]\s*/).filter(Boolean));
      src.setCreator(meta.creator);
      src.setProducer(meta.producer);
      const out = await src.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "") + "_meta.pdf");
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };

  if (!file) {
    return (
      <div className="card">
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500">
          <div className="text-5xl">📋</div>
          <div className="font-medium mt-2">PDF 업로드</div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" />
        </div>
      </div>
    );
  }

  const fields: { key: keyof Meta; label: string }[] = [
    { key: "title", label: "제목" }, { key: "author", label: "저자" },
    { key: "subject", label: "주제" }, { key: "keywords", label: "키워드 (쉼표 구분)" },
    { key: "creator", label: "작성 프로그램" }, { key: "producer", label: "PDF 변환 프로그램" },
  ];

  return (
    <div className="card space-y-3">
      <div className="text-sm"><div className="font-medium truncate">{file.name}</div><div className="text-xs text-muted">{fmtBytes(file.size)}</div></div>
      <div className="space-y-2">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="label">{f.label}</label>
            <input type="text" value={meta[f.key]} onChange={(e) => setMeta((m) => ({ ...m, [f.key]: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
          </div>
        ))}
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="flex gap-2">
        <button onClick={save} disabled={busy} className="btn btn-primary disabled:opacity-50">{busy ? "저장 중..." : "💾 저장"}</button>
        <button onClick={() => setFile(null)} className="btn btn-secondary">다른 파일</button>
      </div>
    </div>
  );
}
