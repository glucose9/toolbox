"use client";
import { useState } from "react";

const SYSTEM_FONTS = [
  "system-ui", "Pretendard", "Noto Sans KR", "Nanum Gothic", "Malgun Gothic", "Apple SD Gothic Neo",
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana", "Courier New", "Monaco",
  "Comic Sans MS", "Impact", "Trebuchet MS", "Tahoma", "Palatino", "Garamond",
];

export default function FontPreviewTool() {
  const [text, setText] = useState("디자인이 끝나는 순간이 시작이다. The quick brown fox 1234567890");
  const [font, setFont] = useState("Pretendard");
  const [size, setSize] = useState(24);
  const [weight, setWeight] = useState(400);

  return (
    <div className="card space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-20 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y" />
      <div className="grid grid-cols-2 gap-3 text-sm items-end">
        <label>폰트<input type="text" value={font} onChange={(e) => setFont(e.target.value)} className="w-full mt-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></label>
        <label>크기 ({size}px)<input type="range" min="10" max="80" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" /></label>
        <label>굵기 ({weight})<input type="range" min="100" max="900" step="100" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full" /></label>
      </div>
      <div className="flex flex-wrap gap-1">
        {SYSTEM_FONTS.map((f) => (
          <button key={f} onClick={() => setFont(f)} className={`px-2 py-1 text-xs rounded ${font === f ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>{f}</button>
        ))}
      </div>
      <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded" style={{ fontFamily: font, fontSize: `${size}px`, fontWeight: weight }}>
        {text}
      </div>
    </div>
  );
}
