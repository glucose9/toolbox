"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

type RecognizeResult = { data: { text: string; confidence: number } };

export default function OcrTool() {
  const t = useTranslations("toolUI.ocr");
  const LANGS = [
    { code: "kor", label: t("langKo") },
    { code: "eng", label: t("langEn") },
    { code: "kor+eng", label: t("langKoEn") },
    { code: "jpn", label: t("langJa") },
    { code: "chi_sim", label: t("langZhSim") },
    { code: "chi_tra", label: t("langZhTra") },
  ];

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [lang, setLang] = useState("kor+eng");
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    setImgUrl(URL.createObjectURL(f));
    setText("");
    setError(null);
    setProgress(0);
  };

  const recognize = async () => {
    if (!imgUrl) return;
    setBusy(true);
    setError(null);
    setProgress(0);
    setText("");
    try {
      const Tesseract = (await import("tesseract.js")).default;
      // tesseract.js swallows worker failures other than core load (language pack
      // fetch, initialize), leaving recognize() pending forever — surface them here.
      let failWorker: (msg: string) => void = () => {};
      const workerFailed = new Promise<never>((_, reject) => {
        failWorker = (msg: string) => reject(new Error(msg));
      });
      const result = (await Promise.race([
        Tesseract.recognize(imgUrl, lang, {
          logger: (m: { status: string; progress: number }) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
            }
          },
          errorHandler: (err: unknown) => failWorker(err instanceof Error ? err.message : String(err)),
        }),
        workerFailed,
      ])) as RecognizeResult;
      setText(result.data.text);
      setConfidence(result.data.confidence);
    } catch (e) {
      setError(t("errorPrefix", { msg: e instanceof Error ? e.message : t("unknownError") }));
    } finally {
      setBusy(false);
    }
  };

  const copy = () => navigator.clipboard.writeText(text);
  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ocr-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 items-end">
        <label className="flex-1 min-w-[200px] text-sm">
          {t("language")}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            disabled={busy}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </label>
        <button onClick={() => fileRef.current?.click()} className="btn">{t("selectImage")}</button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      {imgUrl && (
        <div className="border border-gray-200 dark:border-gray-700 rounded p-2 bg-gray-50 dark:bg-gray-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgUrl} alt="OCR target" className="max-h-64 mx-auto block" />
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={recognize} disabled={!imgUrl || busy} className="btn btn-primary">
          {busy ? t("recognizing", { progress }) : t("startOcr")}
        </button>
        {imgUrl && !busy && (
          <button onClick={() => { setImgUrl(null); setText(""); setError(null); setProgress(0); }} className="btn">{t("reset")}</button>
        )}
      </div>

      {busy && (
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded h-2 overflow-hidden">
          <div className="bg-blue-600 h-full transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      {text && (
        <>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="label !mb-0">{t("recognizedText")}</label>
              <span className="text-xs text-muted">{t("confidence", { value: confidence.toFixed(0) })}</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={copy} className="btn">{t("copy")}</button>
            <button onClick={download} className="btn">{t("downloadTxt")}</button>
          </div>
        </>
      )}

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
