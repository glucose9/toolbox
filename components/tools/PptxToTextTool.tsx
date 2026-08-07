"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";
import { copyText } from "@/lib/clipboard";

type SlideText = { index: number; text: string };

function slideNumber(path: string): number {
  const m = path.match(/slide(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
}

/** Resolve an OPC relationship Target against the part's base directory (e.g. "ppt/slides/"). */
function resolveRelTarget(target: string, baseDir: string): string {
  let p = target.replace(/^\.\//, "");
  if (p.startsWith("/")) return p.replace(/^\/+/, "");
  let dir = baseDir;
  while (p.startsWith("../")) {
    p = p.slice(3);
    dir = dir.replace(/[^/]+\/$/, "");
  }
  return dir + p;
}

function relAttr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : null;
}

/**
 * Presentation order is defined by <p:sldIdLst> in ppt/presentation.xml (resolved through
 * ppt/_rels/presentation.xml.rels), NOT by the slideN.xml part file names — PowerPoint keeps
 * part names stable when slides are reordered. Falls back to numeric file-name order.
 */
async function orderedSlidePaths(zip: JSZip): Promise<string[]> {
  const byName = Object.keys(zip.files)
    .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
    .sort((a, b) => slideNumber(a) - slideNumber(b));
  try {
    const relFile = zip.files["ppt/_rels/presentation.xml.rels"];
    const presFile = zip.files["ppt/presentation.xml"];
    if (!relFile || !presFile) return byName;
    const relXml = await relFile.async("string");
    const idToPath = new Map<string, string>();
    for (const tag of relXml.match(/<Relationship\b[^>]*>/g) || []) {
      const id = relAttr(tag, "Id");
      const target = relAttr(tag, "Target");
      if (!id || !target) continue;
      const resolved = resolveRelTarget(target, "ppt/");
      if (/^ppt\/slides\/slide\d+\.xml$/.test(resolved)) idToPath.set(id, resolved);
    }
    const presXml = await presFile.async("string");
    const lst = presXml.match(/<p:sldIdLst[\s\S]*?<\/p:sldIdLst>/);
    if (!lst) return byName;
    const ordered: string[] = [];
    for (const ref of lst[0].match(/r:id="[^"]+"/g) || []) {
      const id = ref.replace(/^r:id="/, "").replace(/"$/, "");
      const path = idToPath.get(id);
      if (path && zip.files[path] && !ordered.includes(path)) ordered.push(path);
    }
    if (ordered.length === 0) return byName;
    for (const p of byName) if (!ordered.includes(p)) ordered.push(p);
    return ordered;
  } catch {
    return byName;
  }
}

/** Notes are linked from slideN.xml.rels; notesSlideN.xml numbering does NOT track slide numbers. */
async function notesPathFor(zip: JSZip, slidePath: string): Promise<string | null> {
  const relPath = slidePath.replace(/^ppt\/slides\//, "ppt/slides/_rels/") + ".rels";
  const relFile = zip.files[relPath];
  if (!relFile) {
    const legacy = `ppt/notesSlides/notesSlide${slideNumber(slidePath)}.xml`;
    return zip.files[legacy] ? legacy : null;
  }
  const relXml = await relFile.async("string");
  for (const tag of relXml.match(/<Relationship\b[^>]*>/g) || []) {
    const type = relAttr(tag, "Type") || "";
    const target = relAttr(tag, "Target");
    if (!target || !/\/notesSlide$/.test(type)) continue;
    const resolved = resolveRelTarget(target, "ppt/slides/");
    if (zip.files[resolved]) return resolved;
  }
  return null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function extractTexts(xml: string): string {
  const paragraphs = xml.match(/<a:p(?:\s[^>]*)?>[\s\S]*?<\/a:p>/g);
  const blocks = paragraphs && paragraphs.length > 0 ? paragraphs : [xml];
  return blocks
    .map((block) =>
      (block.match(/<a:t>([\s\S]*?)<\/a:t>/g) || [])
        .map((m) => decodeEntities(m.replace(/<a:t>/, "").replace(/<\/a:t>/, "")))
        .join("")
    )
    .join("\n");
}

export default function PptxToTextTool() {
  const t = useTranslations("toolUI.pptx-to-text");
  const tc = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [srcFile, setSrcFile] = useState<File | null>(null);
  const [slides, setSlides] = useState<SlideText[]>([]);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = async (file: File, withNotes: boolean) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    setSrcFile(file);
    setSlides([]);
    try {
      const zip = await JSZip.loadAsync(file);
      const slidePaths = await orderedSlidePaths(zip);

      const result: SlideText[] = [];
      for (let i = 0; i < slidePaths.length; i++) {
        const path = slidePaths[i];
        const xml = await zip.files[path].async("string");
        let text = extractTexts(xml);
        if (withNotes) {
          const notePath = await notesPathFor(zip, path);
          if (notePath) {
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
    if (srcFile) {
      process(srcFile, checked);
    }
  };

  const allText = slides
    .map((s) => `${t("slide")} ${s.index}\n${s.text}`)
    .join("\n\n");

  const copyAll = async () => {
    const ok = await copyText(allText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
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
      {srcFile ? (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-sm truncate font-medium">{fileName}</div>
          <button
            onClick={() => inputRef.current?.click()}
            className="text-sm text-brand-600 hover:underline"
          >
            {tc("other")}
          </button>
        </div>
      ) : (
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
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pptx"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />

      {loading && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && slides.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={copyAll} className="btn btn-primary">
              {copied ? `✓ ${t("copied")}` : t("copyAll")}
            </button>
            <button onClick={download} className="btn btn-secondary">
              {t("downloadTxt")}
            </button>
            <label className="label flex items-center gap-2 cursor-pointer mb-0 ml-auto">
              <input
                type="checkbox"
                checked={includeNotes}
                onChange={(e) => toggleNotes(e.target.checked)}
              />
              {t("includeNotes")}
            </label>
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
