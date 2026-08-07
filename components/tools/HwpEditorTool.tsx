"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { buildHwpx } from "@/lib/hwpx-builder";
import { krFallbackChain, loadKrWebFonts } from "@/lib/kr-fonts";

const FONT_PRESETS = [
  "함초롬바탕",
  "함초롬돋움",
  "맑은 고딕",
  "나눔고딕",
  "나눔명조",
  "굴림",
  "굴림체",
  "돋움",
  "돋움체",
  "바탕",
  "바탕체",
  "궁서",
  "궁서체",
  "신명조",
  "HY신명조",
  "HY견고딕",
  "한컴바탕",
  "한컴돋움",
  "Pretendard",
  "Times New Roman",
  "Arial",
];

const FONT_SIZE_PRESETS = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

const SAMPLE_TEXT = `안녕하세요.

이것은 바로킷 HWPX 에디터로 만든 문서입니다.

글꼴과 글자 크기를 자유롭게 선택해 저장하세요. 한컴오피스 2018 이상에서 열 수 있습니다.`;

export default function HwpEditorTool() {
  const t = useTranslations("toolUI.hwp-editor");
  const [text, setText] = useState(SAMPLE_TEXT);
  const [fontName, setFontName] = useState("함초롬바탕");
  const [fontSize, setFontSize] = useState(11);
  const [filename, setFilename] = useState("문서.hwpx");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    void loadKrWebFonts();
  }, []);

  const save = async () => {
    setBusy(true);
    setStatus(null);
    try {
      const blob = await buildHwpx({
        text,
        fontName,
        fontSizePt: fontSize,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.endsWith(".hwpx") ? filename : filename + ".hwpx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus(`✓ ${t("statusDone")}`);
    } catch (e) {
      setStatus(`⚠️ ${t("statusError", { message: e instanceof Error ? e.message : t("unknownError") })}`);
    } finally {
      setBusy(false);
    }
  };

  const charCount = text.length;
  const lineCount = text.split(/\r?\n/).length;

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
        <label>
          {t("font")}
          <select
            value={fontName}
            onChange={(e) => setFontName(e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          >
            {FONT_PRESETS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={fontName}
            onChange={(e) => setFontName(e.target.value)}
            placeholder={t("fontCustomPh")}
            className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs"
          />
        </label>

        <label>
          {t("fontSize")}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          >
            {FONT_SIZE_PRESETS.map((s) => (
              <option key={s} value={s}>
                {s}pt
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={400}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value) || 11)}
            className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs"
          />
        </label>

        <label>
          {t("filename")}
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </label>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label !mb-0">{t("body")}</label>
          <span className="text-xs text-muted">
            {t("counts", { chars: charCount, lines: lineCount })}
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          style={{ fontFamily: krFallbackChain(fontName), fontSize: `${Math.min(fontSize * 1.2, 28)}px` }}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 resize-y"
        />
        <div className="text-xs text-muted mt-1">
          💡 {t("previewNote")}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={save} disabled={busy} className="btn btn-primary">
          {busy ? t("generating") : `📥 ${t("download")}`}
        </button>
        <button
          onClick={() => {
            setText("");
            setStatus(null);
          }}
          className="btn"
        >
          🗑️ {t("reset")}
        </button>
        {status && <span className="text-sm">{status}</span>}
      </div>

      <div className="text-xs text-muted bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 leading-relaxed">
        <strong>💡 {t("infoTitle")}</strong>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li>{t("info1")}</li>
          <li>{t.rich("info2", { b: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t.rich("info3", { b: (chunks) => <strong>{chunks}</strong> })}</li>
          <li>{t("info4")}</li>
          <li>{t("info5")}</li>
        </ul>
      </div>
    </div>
  );
}
