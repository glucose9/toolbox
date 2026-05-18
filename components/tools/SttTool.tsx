"use client";

import { useEffect, useRef, useState } from "react";

// Web Speech API types (TS doesn't include these by default in all browsers)
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

const LANGS = [
  { code: "ko-KR", label: "한국어" },
  { code: "en-US", label: "영어 (US)" },
  { code: "en-GB", label: "영어 (UK)" },
  { code: "ja-JP", label: "일본어" },
  { code: "zh-CN", label: "중국어 (간체)" },
  { code: "es-ES", label: "스페인어" },
  { code: "fr-FR", label: "프랑스어" },
  { code: "de-DE", label: "독일어" },
];

export default function SttTool() {
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
      setError("이 브라우저는 음성 인식을 지원하지 않습니다. 크롬·엣지를 사용하세요.");
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
      setError(`오류: ${e.error}`);
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
          ⚠️ 이 브라우저는 Web Speech API를 지원하지 않습니다. Chrome·Edge·Safari(부분 지원)에서 사용하세요.
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-end">
        <label className="flex-1 min-w-[200px] text-sm">
          언어
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
          <button onClick={start} disabled={!supported} className="btn btn-primary">🎤 녹음 시작</button>
        ) : (
          <button onClick={stop} className="btn btn-secondary">⏹ 중지</button>
        )}
      </div>

      {listening && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          듣고 있습니다... 말씀해 주세요
        </div>
      )}

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="label !mb-0">변환된 텍스트</label>
          <span className="text-xs text-muted">{transcript.length}자</span>
        </div>
        <textarea
          value={transcript + (interim ? `  ${interim}` : "")}
          onChange={(e) => setTranscript(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
          placeholder="녹음을 시작하면 여기에 텍스트가 나타납니다. 직접 편집도 가능합니다."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className="btn">📋 복사</button>
        <button onClick={download} className="btn">💾 .txt 다운로드</button>
        <button onClick={clear} className="btn">🗑️ 초기화</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 브라우저 내장 Web Speech API를 사용합니다. 처음 사용 시 마이크 권한을 허용해 주세요. 인터넷 연결이 필요할 수 있고(브라우저 구현에 따라), 정확도는 사용 환경(주변 소음·말 속도)에 영향을 받습니다. 모든 처리는 브라우저 안에서 일어나며 외부로 음성이 전송되지 않습니다(브라우저 자체 STT 서비스 제외).
      </div>
    </div>
  );
}
