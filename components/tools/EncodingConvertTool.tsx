"use client";

import { useRef, useState } from "react";

const ENCODINGS = ["utf-8", "euc-kr", "iso-2022-kr", "shift_jis", "gb18030", "big5", "windows-1252", "iso-8859-1"];

export default function EncodingConvertTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [encoding, setEncoding] = useState("euc-kr");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeFile = async (f: File) => {
    setError("");
    try {
      const buf = await f.arrayBuffer();
      const decoder = new TextDecoder(encoding);
      setText(decoder.decode(buf));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const reencode = () => {
    // Take currently displayed text (assumed mis-decoded as UTF-8) and re-decode as selected encoding
    setError("");
    try {
      // Convert current text back to bytes via Latin-1 (each char = 1 byte preserved)
      const bytes = new Uint8Array(text.length);
      for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i) & 0xff;
      const decoder = new TextDecoder(encoding);
      setText(decoder.decode(bytes));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label>원본 인코딩 <select value={encoding} onChange={(e) => setEncoding(e.target.value)} className="ml-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
          {ENCODINGS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select></label>
        <button onClick={() => inputRef.current?.click()} className="btn btn-primary text-xs">파일 업로드</button>
        <input ref={inputRef} type="file" accept=".txt,.csv,.log,text/*" onChange={(e) => e.target.files?.[0] && decodeFile(e.target.files[0])} className="hidden" />
        <button onClick={reencode} className="btn btn-secondary text-xs">텍스트 재해석</button>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="파일을 업로드하거나 깨진 텍스트를 붙여넣으세요" className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!text} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
      <div className="text-xs text-muted">EUC-KR/CP949로 저장된 파일이 UTF-8로 잘못 읽혀 깨진 한글을 복원할 때 사용하세요. 한글 → EUC-KR 인코딩(반대 방향)은 브라우저에서 지원하지 않습니다.</div>
    </div>
  );
}
