"use client";

import { useState } from "react";
import { buildHwpx } from "@/lib/hwpx-builder";

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
  const [text, setText] = useState(SAMPLE_TEXT);
  const [fontName, setFontName] = useState("함초롬바탕");
  const [fontSize, setFontSize] = useState(11);
  const [filename, setFilename] = useState("문서.hwpx");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

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
      setStatus("✓ 다운로드 완료. 한컴오피스 2018+에서 열어보세요.");
    } catch (e) {
      setStatus(`⚠️ 오류: ${e instanceof Error ? e.message : "알 수 없는 오류"}`);
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
          글꼴
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
            placeholder="직접 입력도 가능"
            className="w-full px-2 py-1 mt-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs"
          />
        </label>

        <label>
          글자 크기 (pt)
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
          파일명
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
          <label className="label !mb-0">본문</label>
          <span className="text-xs text-muted">
            {charCount}자 · {lineCount}줄
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          style={{ fontFamily: fontName, fontSize: `${Math.min(fontSize * 1.2, 28)}px` }}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 resize-y"
        />
        <div className="text-xs text-muted mt-1">
          💡 위 미리보기는 브라우저의 폰트 렌더링입니다. 실제 HWPX는 한컴오피스가 선택한 글꼴로 표시합니다.
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={save} disabled={busy} className="btn btn-primary">
          {busy ? "생성 중..." : "📥 .hwpx 다운로드"}
        </button>
        <button
          onClick={() => {
            setText("");
            setStatus(null);
          }}
          className="btn"
        >
          🗑️ 초기화
        </button>
        {status && <span className="text-sm">{status}</span>}
      </div>

      <div className="text-xs text-muted bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 leading-relaxed">
        <strong>💡 HWPX 파일 안내</strong>
        <ul className="list-disc list-inside mt-1 space-y-0.5">
          <li>HWPX는 한국 정부 표준 한글 문서 포맷(KS X 6101)입니다.</li>
          <li><strong>한컴오피스 2018(NEO+) 이상</strong>에서 열 수 있습니다. 2014 이하는 미지원.</li>
          <li>이 도구는 <strong>본문 + 글꼴 + 크기</strong>만 지정 가능한 미니멀 생성기입니다. 표·이미지·복잡한 서식이 필요하면 한컴오피스에서 직접 편집하세요.</li>
          <li>지정한 글꼴이 실제 PC에 설치돼 있어야 한컴오피스에서 그대로 표시됩니다. 없으면 비슷한 폰트로 대체됩니다.</li>
          <li>파일은 브라우저 안에서 만들어지며 외부로 전송되지 않습니다.</li>
        </ul>
      </div>
    </div>
  );
}
