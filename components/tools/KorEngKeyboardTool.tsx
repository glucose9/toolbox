"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

// 영문 키 → 한글 자모
const E2K: Record<string, string> = {
  q: "ㅂ", w: "ㅈ", e: "ㄷ", r: "ㄱ", t: "ㅅ", y: "ㅛ", u: "ㅕ", i: "ㅑ", o: "ㅐ", p: "ㅔ",
  a: "ㅁ", s: "ㄴ", d: "ㅇ", f: "ㄹ", g: "ㅎ", h: "ㅗ", j: "ㅓ", k: "ㅏ", l: "ㅣ",
  z: "ㅋ", x: "ㅌ", c: "ㅊ", v: "ㅍ", b: "ㅠ", n: "ㅜ", m: "ㅡ",
  Q: "ㅃ", W: "ㅉ", E: "ㄸ", R: "ㄲ", T: "ㅆ", O: "ㅒ", P: "ㅖ",
};

const K2E: Record<string, string> = Object.fromEntries(
  Object.entries(E2K).map(([k, v]) => [v, k])
);

const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

const JUNG_COMBO: Record<string, string> = { "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ", "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ", "ㅡㅣ": "ㅢ" };
const JONG_COMBO: Record<string, string> = { "ㄱㅅ": "ㄳ", "ㄴㅈ": "ㄵ", "ㄴㅎ": "ㄶ", "ㄹㄱ": "ㄺ", "ㄹㅁ": "ㄻ", "ㄹㅂ": "ㄼ", "ㄹㅅ": "ㄽ", "ㄹㅌ": "ㄾ", "ㄹㅍ": "ㄿ", "ㄹㅎ": "ㅀ", "ㅂㅅ": "ㅄ" };

const isCho = (j: string) => CHO.includes(j);
const isJung = (j: string) => JUNG.includes(j);

function engToKor(text: string): string {
  const jamos: string[] = [];
  for (const c of text) {
    const j = E2K[c] || E2K[c.toLowerCase()];
    if (j) jamos.push(j);
    else jamos.push(c);
  }
  return composeJamos(jamos);
}

function composeJamos(jamos: string[]): string {
  let result = "";
  let i = 0;
  while (i < jamos.length) {
    const j1 = jamos[i];
    if (!isCho(j1) || !isJung(jamos[i + 1])) {
      result += j1;
      i++;
      continue;
    }
    let cho = j1;
    let jung = jamos[i + 1];
    i += 2;
    if (i < jamos.length && JUNG_COMBO[jung + jamos[i]]) {
      jung = JUNG_COMBO[jung + jamos[i]];
      i++;
    }
    let jong = "";
    if (i < jamos.length && isCho(jamos[i])) {
      const nextStart = isJung(jamos[i + 1]);
      if (!nextStart && JONG.includes(jamos[i])) {
        jong = jamos[i];
        i++;
        if (i < jamos.length && JONG_COMBO[jong + jamos[i]]) {
          const combined = JONG_COMBO[jong + jamos[i]];
          if (!(i + 1 < jamos.length && isJung(jamos[i + 1]))) {
            jong = combined;
            i++;
          }
        }
      }
    }
    const choIdx = CHO.indexOf(cho);
    const jungIdx = JUNG.indexOf(jung);
    const jongIdx = JONG.indexOf(jong);
    if (choIdx >= 0 && jungIdx >= 0 && jongIdx >= 0) {
      result += String.fromCharCode(0xac00 + choIdx * 588 + jungIdx * 28 + jongIdx);
    } else {
      result += cho + jung + jong;
    }
  }
  return result;
}

function korToEng(text: string): string {
  let out = "";
  for (const c of text) {
    const code = c.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const idx = code - 0xac00;
      const cho = CHO[Math.floor(idx / 588)];
      const jung = JUNG[Math.floor((idx % 588) / 28)];
      const jong = JONG[idx % 28];
      out += jamoToEng(cho) + jamoToEng(jung) + jamoToEng(jong);
    } else if (K2E[c]) {
      out += K2E[c];
    } else {
      out += c;
    }
  }
  return out;
}

function jamoToEng(j: string): string {
  if (!j) return "";
  if (K2E[j]) return K2E[j];
  for (const [combo, single] of Object.entries({ ...JUNG_COMBO, ...JONG_COMBO })) {
    if (single === j) {
      return jamoToEng(combo[0]) + jamoToEng(combo[1]);
    }
  }
  return j;
}

type Dir = "eng-to-kor" | "kor-to-eng";

export default function KorEngKeyboardTool() {
  const t = useTranslations("toolUI.kor-eng-keyboard");
  const [input, setInput] = useState("dkssudgktpdy");
  const [dir, setDir] = useState<Dir>("eng-to-kor");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => (dir === "eng-to-kor" ? engToKor(input) : korToEng(input)), [input, dir]);

  const copy = async () => {
    const ok = await copyText(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => { setDir("eng-to-kor"); if (input === "" || input === "안녕하세요") setInput("dkssudgktpdy"); }} className={`btn ${dir === "eng-to-kor" ? "btn-primary" : "btn-secondary"}`}>{t("engToKor")}</button>
        <button onClick={() => { setDir("kor-to-eng"); if (input === "" || input === "dkssudgktpdy") setInput("안녕하세요"); }} className={`btn ${dir === "kor-to-eng" ? "btn-primary" : "btn-secondary"}`}>{t("korToEng")}</button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base resize-y"
      />
      <textarea
        readOnly
        value={output}
        className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-base resize-y"
      />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
      <div className="text-xs text-muted">{t("layoutNote")}</div>
    </div>
  );
}
