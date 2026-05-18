"use client";

import { useEffect, useRef, useState } from "react";

const SAMPLES: { name: string; code: string }[] = [
  {
    name: "순서도 (Flowchart)",
    code: `flowchart TD
    A[시작] --> B{조건?}
    B -->|예| C[A 작업]
    B -->|아니오| D[B 작업]
    C --> E[종료]
    D --> E`,
  },
  {
    name: "시퀀스 (Sequence)",
    code: `sequenceDiagram
    participant 사용자
    participant 브라우저
    participant 서버
    사용자->>브라우저: 검색어 입력
    브라우저->>서버: API 요청
    서버-->>브라우저: 결과 반환
    브라우저-->>사용자: 결과 표시`,
  },
  {
    name: "간트차트 (Gantt)",
    code: `gantt
    title 프로젝트 일정
    dateFormat YYYY-MM-DD
    section 기획
    요구사항 분석 :a1, 2026-01-01, 7d
    설계         :a2, after a1, 5d
    section 개발
    구현         :b1, after a2, 14d
    테스트       :b2, after b1, 5d`,
  },
  {
    name: "클래스 다이어그램",
    code: `classDiagram
    class Animal {
      +String name
      +int age
      +makeSound()
    }
    class Dog {
      +String breed
      +bark()
    }
    class Cat {
      +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
  },
  {
    name: "파이 차트 (Pie)",
    code: `pie title 시장 점유율
    "Chrome" : 65
    "Safari" : 18
    "Edge" : 10
    "기타" : 7`,
  },
];

export default function MermaidTool() {
  const [code, setCode] = useState(SAMPLES[0].code);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [svgString, setSvgString] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose", fontFamily: "system-ui, Pretendard, sans-serif" });
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
        if (cancelled) return;
        setSvgString(svg);
        if (previewRef.current) previewRef.current.innerHTML = svg;
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "렌더링 실패");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagram-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPng = async () => {
    if (!svgString) return;
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("이미지 로드 실패"));
      img.src = url;
    });
    const c = document.createElement("canvas");
    const scale = 2;
    c.width = img.width * scale;
    c.height = img.height * scale;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    c.toBlob((blob) => {
      if (!blob) return;
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = `diagram-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(dlUrl);
    });
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-1">
        {SAMPLES.map((s) => (
          <button
            key={s.name}
            onClick={() => setCode(s.code)}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <label className="label">Mermaid 코드</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono"
          />
          {error && <div className="text-xs text-red-600 mt-1">⚠️ {error}</div>}
        </div>
        <div>
          <label className="label">미리보기</label>
          <div
            ref={previewRef}
            className="w-full min-h-[20rem] p-3 border border-gray-200 dark:border-gray-700 rounded bg-white text-center overflow-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadSvg} disabled={!svgString} className="btn btn-secondary">📥 SVG 다운로드</button>
        <button onClick={downloadPng} disabled={!svgString} className="btn btn-primary">📥 PNG 다운로드 (2x)</button>
        <button onClick={() => navigator.clipboard.writeText(code)} className="btn">📋 코드 복사</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 Mermaid 표기법으로 순서도·시퀀스·간트차트·클래스 다이어그램·파이차트 등을 코드로 그립니다. GitHub README, 노션, Obsidian, 옵시디언, 기술 블로그에 그대로 임베드 가능. 자세한 문법은 <a href="https://mermaid.js.org/intro/" target="_blank" rel="noreferrer" className="underline">mermaid.js.org</a>를 참고.
      </div>
    </div>
  );
}
