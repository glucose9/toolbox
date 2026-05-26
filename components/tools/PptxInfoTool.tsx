"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JSZip from "jszip";

type Info = {
  slideCount: number;
  title: string;
  author: string;
  lastModifiedBy: string;
  created: string;
  modified: string;
  application: string;
  company: string;
};

function tagText(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return "";
  return m[1]
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function PptxInfoTool() {
  const t = useTranslations("toolUI.pptx-info");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    setInfo(null);
    try {
      const zip = await JSZip.loadAsync(file);
      const core = zip.files["docProps/core.xml"]
        ? await zip.files["docProps/core.xml"].async("string")
        : "";
      const app = zip.files["docProps/app.xml"]
        ? await zip.files["docProps/app.xml"].async("string")
        : "";

      const slideCount = Object.keys(zip.files).filter((p) =>
        /^ppt\/slides\/slide\d+\.xml$/.test(p)
      ).length;

      const appSlides = tagText(app, "Slides");

      setInfo({
        slideCount: appSlides ? parseInt(appSlides, 10) || slideCount : slideCount,
        title: tagText(core, "dc:title"),
        author: tagText(core, "dc:creator"),
        lastModifiedBy: tagText(core, "cp:lastModifiedBy"),
        created: formatDate(tagText(core, "dcterms:created")),
        modified: formatDate(tagText(core, "dcterms:modified")),
        application: tagText(app, "Application"),
        company: tagText(app, "Company"),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const na = t("notAvailable");
  const rows: { label: string; value: string | number }[] = info
    ? [
        { label: t("slideCount"), value: info.slideCount },
        { label: t("title"), value: info.title || na },
        { label: t("author"), value: info.author || na },
        { label: t("lastModifiedBy"), value: info.lastModifiedBy || na },
        { label: t("created"), value: info.created || na },
        { label: t("modified"), value: info.modified || na },
        { label: t("application"), value: info.application || na },
        { label: t("company"), value: info.company || na },
      ]
    : [];

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
        <div className="text-5xl mb-3">ℹ️</div>
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

      {loading && <div className="text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {info && (
        <table className="w-full text-sm border-collapse">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 pr-4 text-muted font-medium align-top w-1/3">{r.label}</td>
                <td className="py-2 break-words">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
