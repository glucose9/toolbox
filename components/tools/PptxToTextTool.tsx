"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

type SlideText = { index: number; text: string };

function slideNumber(path: string): number {
  const m = path.match(/slide(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
}

function extractTexts(xml: string): string {
  const matches = xml.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [];
  return matches
    .map((m) => m.replace(/<a:t>/, "").replace(/<\/a:t>/, ""))
    .map((s) =>
      s
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
    )
    .join("\n");
}

export default function PptxToTextTool() {
  const t = useTranslations("toolUI.pptx-to-text");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [slides, setSlides] = useState<SlideText[]>([]);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = async (file: File, withNotes: boolean) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    setSlides([]);
    try {
      const zip = await JSZip.loadAsync(file);
      const slidePaths = Object.keys(zip.files)
        .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
        .sort((a, b) => slideNumber(a) - slideNumber(b));

      const result: SlideText[] = [];
      for (let i = 0; i < slidePaths.length; i++) {
        const path = slidePaths[i];
        const num = slideNumber(path);
        const xml = await zip.files[path].async("string");
        let text = extractTexts(xml);
        if (withNotes) {
          const notePath = `ppt/notesSlides/notesSlide${num}.xml`;
          if (zip.files[notePath]) {
            const noteXml = await zip.files[notePath].async("string");
            const noteText = extractTexts(noteXml);
            if (noteText.trim()) text += (text ? "\n\n" : "") + "[Notes]\n" + noteText;
          }
        }
        result.push({ index: i + 1, text });
      }
      setSlides(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const onFile = (file: File) => process(file, includeNotes);

  const toggleNotes = (checked: boolean) => {
    setIncludeNotes(checked);
    if (fileName && inputRef.current?.files?.[0]) {
      process(inputRef.current.files[0], checked);
    }
  };

  const allText = slides
    .map((s) => `${t("slide")} ${s.index}\n${s.text}`)
    .join("\n\n");

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const blob = new Blob([allText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.pptx$/i, "") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-4">
      <div
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="text-5xl mb-3">📄</div>
        <div className="font-medium">{t("dropFile")}</div>
        {fileName && <div className="mt-1 text-sm text-muted truncate">{fileName}</div>}
        <input
          ref={inputRef}
          type="file"
          accept=".pptx"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />
      </div>

      <label className="label flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={includeNotes}
          onChange={(e) => toggleNotes(e.target.checked)}
        />
        {t("includeNotes")}
      </label>

      {loading && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && slides.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={copyAll} className="btn btn-primary">
              {copied ? `✓ ${t("copied")}` : t("copyAll")}
            </button>
            <button onClick={download} className="btn btn-secondary">
              {t("downloadTxt")}
            </button>
          </div>
          <div className="space-y-3">
            {slides.map((s) => (
              <div key={s.index} className="border border-gray-200 dark:border-gray-700 rounded p-3">
                <div className="text-sm font-medium mb-1">
                  {t("slide")} {s.index}
                </div>
                {s.text.trim() ? (
                  <pre className="whitespace-pre-wrap text-sm font-mono">{s.text}</pre>
                ) : (
                  <div className="text-sm text-muted italic">{t("noText")}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
