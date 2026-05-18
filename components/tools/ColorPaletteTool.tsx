"use client";

import { useState } from "react";

type Mode = "random" | "monochrome" | "analogous" | "complementary" | "triad" | "tetrad";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generate(mode: Mode, baseHue?: number): { hex: string; name: string }[] {
  const h0 = baseHue !== undefined ? baseHue : Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 25); // 60~85
  const l = 50 + Math.floor(Math.random() * 10); // 50~60

  const palette: { hex: string; name: string }[] = [];
  if (mode === "random") {
    for (let i = 0; i < 5; i++) {
      const h = Math.floor(Math.random() * 360);
      const ss = 50 + Math.floor(Math.random() * 35);
      const ll = 40 + Math.floor(Math.random() * 30);
      palette.push({ hex: hslToHex(h, ss, ll), name: `Color ${i + 1}` });
    }
  } else if (mode === "monochrome") {
    for (let i = 0; i < 5; i++) {
      const ll = 20 + i * 15;
      palette.push({ hex: hslToHex(h0, s, ll), name: `${ll}%` });
    }
  } else if (mode === "analogous") {
    [-30, -15, 0, 15, 30].forEach((d, i) => {
      const h = (h0 + d + 360) % 360;
      palette.push({ hex: hslToHex(h, s, l), name: `+${d}°`.replace("+-", "-") || (i === 2 ? "base" : "") });
    });
  } else if (mode === "complementary") {
    palette.push({ hex: hslToHex(h0, s, l - 15), name: "Dark" });
    palette.push({ hex: hslToHex(h0, s, l), name: "Base" });
    palette.push({ hex: hslToHex(h0, s, l + 15), name: "Light" });
    palette.push({ hex: hslToHex((h0 + 180) % 360, s, l), name: "Comp" });
    palette.push({ hex: hslToHex((h0 + 180) % 360, s, l - 15), name: "Comp Dark" });
  } else if (mode === "triad") {
    [0, 120, 240].forEach((d) => {
      const h = (h0 + d) % 360;
      palette.push({ hex: hslToHex(h, s, l), name: `${h}°` });
    });
    palette.push({ hex: hslToHex(h0, s, l - 20), name: "Shade" });
    palette.push({ hex: hslToHex(h0, s, l + 20), name: "Tint" });
  } else if (mode === "tetrad") {
    [0, 90, 180, 270].forEach((d) => {
      const h = (h0 + d) % 360;
      palette.push({ hex: hslToHex(h, s, l), name: `${h}°` });
    });
    palette.push({ hex: hslToHex(h0, 0, 50), name: "Gray" });
  }
  return palette;
}

const MODE_LABELS: Record<Mode, string> = {
  random: "🎲 랜덤",
  monochrome: "⚫ 단색조 (Mono)",
  analogous: "🌈 유사색 (Analogous)",
  complementary: "🎯 보색 (Complement)",
  triad: "▲ 삼각 (Triad)",
  tetrad: "■ 사각 (Tetrad)",
};

export default function ColorPaletteTool() {
  const [mode, setMode] = useState<Mode>("complementary");
  const [palette, setPalette] = useState(() => generate("complementary"));
  const [copied, setCopied] = useState<string | null>(null);

  const regenerate = () => setPalette(generate(mode));

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(palette.map((c) => c.hex).join(", "));
    setCopied("all");
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setPalette(generate(m)); }}
            className={`px-3 py-1.5 rounded text-sm ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {palette.map((c, i) => (
          <button
            key={i}
            onClick={() => copyHex(c.hex)}
            className="aspect-square rounded relative group border border-gray-200 dark:border-gray-700 overflow-hidden"
            style={{ backgroundColor: c.hex }}
            title={`클릭해서 ${c.hex} 복사`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 hover:bg-black/50 transition text-white opacity-0 hover:opacity-100">
              <div className="font-mono text-sm font-semibold">{c.hex}</div>
              <div className="text-xs mt-1">{copied === c.hex ? "✓ 복사됨" : c.name}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={regenerate} className="btn btn-primary">🎨 새 팔레트 생성</button>
        <button onClick={copyAll} className="btn">📋 {copied === "all" ? "✓ 모두 복사됨" : "전체 HEX 복사"}</button>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 색 조화 규칙 기반 팔레트 생성. <strong>단색조</strong>는 한 색의 명도 변화, <strong>유사색</strong>은 색상환에서 30도 이내, <strong>보색</strong>은 정반대 색, <strong>삼각</strong>은 120도 간격, <strong>사각</strong>은 90도 간격으로 만듭니다. 색상 칸을 클릭하면 HEX 코드가 복사됩니다.
      </div>
    </div>
  );
}
