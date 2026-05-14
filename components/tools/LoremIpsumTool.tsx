"use client";

import { useMemo, useState } from "react";

type Style = "latin" | "korean";
type Unit = "paragraphs" | "sentences" | "words";

const LATIN = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

const KOREAN = "산은 산이요 물은 물이로다 가나다라 마바사 아자차카 타파하 한글 사랑 자랑 우리나라 만세 봄여름 가을겨울 코딩 디자인 아침에 일찍 일어나는 새가 벌레를 잡는다 만시지탄 일촉즉발 일사천리 화룡점정 백문이불여일견 천리길도 한 걸음부터 시작이 반이다 작은 고추가 맵다".split(" ");

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(style: Style, unit: Unit, count: number): string {
  const pool = style === "latin" ? LATIN : KOREAN;
  const word = () => pool[rand(0, pool.length - 1)];
  const sentence = () => {
    const len = rand(6, 14);
    const words = Array.from({ length: len }, () => word());
    let s = words.join(" ");
    if (style === "latin") s = s.charAt(0).toUpperCase() + s.slice(1) + ".";
    else s += style === "korean" ? "다." : ".";
    return s;
  };
  const paragraph = () => {
    const len = rand(3, 6);
    return Array.from({ length: len }, () => sentence()).join(" ");
  };

  if (unit === "words") return Array.from({ length: count }, () => word()).join(" ");
  if (unit === "sentences") return Array.from({ length: count }, () => sentence()).join(" ");
  return Array.from({ length: count }, () => paragraph()).join("\n\n");
}

export default function LoremIpsumTool() {
  const [style, setStyle] = useState<Style>("latin");
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => generate(style, unit, Math.max(1, Math.min(100, count))), [style, unit, count, seed]);

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex gap-2">
          <button onClick={() => setStyle("latin")} className={`btn ${style === "latin" ? "btn-primary" : "btn-secondary"}`}>라틴</button>
          <button onClick={() => setStyle("korean")} className={`btn ${style === "korean" ? "btn-primary" : "btn-secondary"}`}>한글</button>
        </div>
        <div className="flex gap-2">
          {(["paragraphs", "sentences", "words"] as Unit[]).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className={`btn ${unit === u ? "btn-primary" : "btn-secondary"}`}>
              {u === "paragraphs" ? "단락" : u === "sentences" ? "문장" : "단어"}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-1">
          개수
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-16 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
          />
        </label>
        <button onClick={() => setSeed((s) => s + 1)} className="btn btn-secondary">🎲 다시 생성</button>
        <button onClick={copy} className="btn btn-secondary">{copied ? "✓ 복사됨" : "복사"}</button>
      </div>
      <textarea
        readOnly
        value={result}
        className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y whitespace-pre-wrap"
      />
    </div>
  );
}
