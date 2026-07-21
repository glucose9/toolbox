"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: { transcript: string };
}
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: { length: number; [index: number]: SpeechRecognitionResult };
}
interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type WindowWithSpeech = Window & {
  SpeechRecognition?: { new (): SpeechRecognitionInstance };
  webkitSpeechRecognition?: { new (): SpeechRecognitionInstance };
};

export default function SttTool() {
  const t = useTranslations("toolUI.stt");
  const LANGS = [
    { code: "ko-KR", label: t("langKo") },
    { code: "en-US", label: t("langEnUs") },
    { code: "en-GB", label: t("langEnUk") },
    { code: "ja-JP", label: t("langJa") },
    { code: "zh-CN", label: t("langZh") },
    { code: "es-ES", label: t("langEs") },
    { code: "fr-FR", label: t("langFr") },
    { code: "de-DE", label: t("langDe") },
  ];

  const [lang, setLang] = useState("ko-KR");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const recogRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const w = window as unknown as WindowWithSpeech;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
    }
  }, []);

  const start = () => {
    const w = window as unknown as WindowWithSpeech;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setError(t("notSupported"));
      return;
    }
    const recog = new SR();
    recog.lang = lang;
    recog.continuous = true;
    recog.interimResults = true;
    recog.onresult = (e: SpeechRecognitionEvent) => {
      let finalText = "";
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interimText += r[0].transcript;
      }
      if (finalText) setTranscript((cur) => cur + finalText + " ");
      setInterim(interimText);
    };
    recog.onerror = (e) => {
      setError(t("error", { err: e.error }));
      setListening(false);
    };
    recog.onend = () => {
      setListening(false);
      setInterim("");
    };
    recog.start();
    recogRef.current = recog;
    setListening(true);
    setError(null);
  };

  const stop = () => {
    recogRef.current?.stop();
    setListening(false);
  };

  const clear = () => {
    setTranscript("");
    setInterim("");
  };

  const copy = () => navigator.clipboard.writeText(transcript);

  const download = () => {
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card space-y-3">
      {!supported && (
        <div className="text-sm text-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
          {t("warnNoSupport")}
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-end">
        <label className="flex-1 min-w-[200px] text-sm">
          {t("language")}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            disabled={listening}
            className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </label>
        {!listening ? (
          <button onClick={start} disabled={!supported} className="btn btn-primary">{t("startRec")}</button>
        ) : (
          <button onClick={stop} className="btn btn-secondary">{t("stop")}</button>
        )}
      </div>

      {listening && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          {t("listening")}
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label !mb-0">{t("transcribed")}</label>
          <span className="text-xs text-muted">{t("charCount", { n: transcript.length })}</span>
        </div>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
          placeholder={t("placeholder")}
        />
        {interim && <div className="mt-1 px-3 py-2 text-sm text-muted italic border border-dashed border-gray-200 dark:border-gray-700 rounded">{interim}</div>}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="btn">{t("copy")}</button>
        <button onClick={download} className="btn">{t("downloadTxt")}</button>
        <button onClick={clear} className="btn">{t("clear")}</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
