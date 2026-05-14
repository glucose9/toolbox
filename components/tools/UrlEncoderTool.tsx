"use client";

import { useState } from "react";

type Mode = "component" | "uri";

export default function UrlEncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("component");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () => {
    setError("");
    try {
      setOutput(mode === "component" ? encodeURIComponent(input) : encodeURI(input));
    } catch (e) {
      setError("인코딩 실패: " + (e as Error).message);
    }
  };

  const decode = () => {
    setError("");
    try {
      setOutput(mode === "component" ? decodeURIComponent(input) : decodeURI(input));
    } catch (e) {
      setError("디코딩 실패: " + (e as Error).message);
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" checked={mode === "component"} onChange={() => setMode("component")} />
          encodeURIComponent
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" checked={mode === "uri"} onChange={() => setMode("uri")} />
          encodeURI
        </label>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="인코딩/디코딩할 텍스트"
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={encode} className="btn btn-primary">인코딩 →</button>
        <button onClick={decode} className="btn btn-primary">← 디코딩</button>
        <button onClick={swap} className="btn btn-secondary">⇅ 위아래 바꿈</button>
      </div>
      <textarea
        readOnly
        value={output}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!output} className="btn btn-secondary disabled:opacity-50">
        {copied ? "✓ 복사됨" : "복사"}
      </button>
    </div>
  );
}
