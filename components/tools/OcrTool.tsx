"use client";

import { useState, useRef } from "react";

type RecognizeResult = { data: { text: string; confidence: number } };

const LANGS = [
  { code: "kor", label: "한국어" },
  { code: "eng", label: "영어" },
  { code: "kor+eng", label: "한국어 + 영어" },
  { code: "jpn", label: "일본어" },
  { code: "chi_sim", label: "중국어 (간체)" },
  { code: "chi_tra", label: "중국어 (번체)" },
];

export default function OcrTool() {
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
      const result = (await Tesseract.recognize(imgUrl, lang, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      })) as RecognizeResult;
      setText(result.data.text);
      setConfidence(result.data.confidence);
    } catch (e) {
      setError(`OCR 실패: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
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
          언어
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
        <button onClick={() => fileRef.current?.click()} className="btn">📷 이미지 선택</button>
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
          {busy ? `🔍 인식 중... ${progress}%` : "🔍 OCR 시작"}
        </button>
        {imgUrl && !busy && (
          <button onClick={() => { setImgUrl(null); setText(""); }} className="btn">🗑️ 초기화</button>
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
              <label className="label !mb-0">인식된 텍스트</label>
              <span className="text-xs text-muted">신뢰도: {confidence.toFixed(0)}%</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={copy} className="btn">📋 복사</button>
            <button onClick={download} className="btn">💾 .txt 다운로드</button>
          </div>
        </>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 Tesseract.js 엔진 사용. 첫 사용 시 한국어 학습 데이터(~10MB)를 다운로드하며, 이후엔 캐시됩니다. 인식 정확도는 (1) 이미지 해상도, (2) 글자 크기, (3) 배경 대비, (4) 폰트 종류에 따라 크게 달라집니다. 손글씨·기울어진 사진은 정확도가 떨어집니다. 모든 처리는 브라우저 안에서 일어나며 외부 전송 없음.
      </div>
    </div>
  );
}
