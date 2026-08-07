"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SAMPLES = [
  {
    key: "flowchart",
    code: `flowchart TD
    A[시작] --> B{조건?}
    B -->|예| C[A 작업]
    B -->|아니오| D[B 작업]
    C --> E[종료]
    D --> E`,
  },
  {
    key: "sequence",
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
    key: "gantt",
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
    key: "class",
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
    key: "pie",
    code: `pie title 시장 점유율
    "Chrome" : 65
    "Safari" : 18
    "Edge" : 10
    "기타" : 7`,
  },
];

export default function MermaidTool() {
  const t = useTranslations("toolUI.mermaid");
  const [code, setCode] = useState(SAMPLES[0].code);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [svgString, setSvgString] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "system-ui, Pretendard, sans-serif",
          // HTML labels render via <foreignObject>, which taints the canvas and
          // makes the PNG export throw. Pure-SVG labels keep the canvas clean
          // (and the downloaded SVG displays in more viewers).
          htmlLabels: false,
          flowchart: { htmlLabels: false },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          class: { htmlLabels: false } as any,
        });
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, code);
        if (cancelled) return;
        setSvgString(svg);
        if (previewRef.current) previewRef.current.innerHTML = svg;
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setSvgString("");
        setError(e instanceof Error ? e.message : t("renderFailed"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, t]);

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
    try {
      // Mermaid emits width="100%", so the Image gets a bogus intrinsic size
      // and the raster comes out cropped. Stamp explicit pixel dimensions from
      // the viewBox before rasterizing.
      const doc = new DOMParser().parseFromString(svgString, "image/svg+xml");
      const svgEl = doc.documentElement;
      const vb = (svgEl.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
      const w = Math.ceil(vb.length === 4 && vb[2] > 0 ? vb[2] : 800);
      const h = Math.ceil(vb.length === 4 && vb[3] > 0 ? vb[3] : 600);
      svgEl.setAttribute("width", String(w));
      svgEl.setAttribute("height", String(h));
      svgEl.style.maxWidth = "none";
      const sized = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([sized], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(t("imageLoadFailed")));
        img.src = url;
      });
      const c = document.createElement("canvas");
      const scale = 2;
      c.width = w * scale;
      c.height = h * scale;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob((blob) => {
        if (!blob) {
          setError(t("imageLoadFailed"));
          return;
        }
        const dlUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dlUrl;
        a.download = `diagram-${Date.now()}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(dlUrl), 10_000);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : t("imageLoadFailed"));
    }
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-1">
        {SAMPLES.map((s) => (
          <button
            key={s.key}
            onClick={() => setCode(s.code)}
            className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            {t(`sample.${s.key}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <label className="label">{t("mermaidCode")}</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono"
          />
          {error && <div className="text-xs text-red-600 mt-1">⚠️ {error}</div>}
        </div>
        <div>
          <label className="label">{t("preview")}</label>
          <div
            ref={previewRef}
            className="w-full min-h-[20rem] p-3 border border-gray-200 dark:border-gray-700 rounded bg-white text-center overflow-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={downloadSvg} disabled={!svgString} className="btn btn-secondary">📥 {t("downloadSvg")}</button>
        <button onClick={downloadPng} disabled={!svgString} className="btn btn-primary">📥 {t("downloadPng")}</button>
        <button onClick={() => navigator.clipboard.writeText(code)} className="btn">📋 {t("copyCode")}</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 {t.rich("description", {
          a: (chunks) => (
            <a href="https://mermaid.js.org/intro/" target="_blank" rel="noreferrer" className="underline">{chunks}</a>
          ),
        })}
      </div>
    </div>
  );
}
