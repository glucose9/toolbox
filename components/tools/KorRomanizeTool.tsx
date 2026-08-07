"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const CHO_ROM = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
const JUNG_ROM = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
const JONG_ROM = ["", "k", "kk", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "l", "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];

// 종성 → 다음 초성 결합 시 발음 변화 ([prev_jong_idx, next_cho_letter] → [prev_jong_rom, next_cho_rom])
// 단순화된 RR 규칙 적용
const LIAISON: Record<string, [string, string]> = {
  // ㄱ + ㅎ → k + (silent h) — actually ㄱ+ㅎ becomes ㅋ in pronunciation
  "1-h": ["", "k"],   // ㄱ + ㅎ
  "7-h": ["", "t"],   // ㄷ + ㅎ
  "17-h": ["", "p"],  // ㅂ + ㅎ
  "22-h": ["", "ch"], // ㅈ + ㅎ
};

// 국어의 로마자 표기법 붙임: 자음 사이 동화 작용 ("종성로마자-초성로마자" → [종성, 초성])
// ㄴ+ㄹ 은 유음화(ll)를 기본으로 한다(신라 Silla, 선릉 Seolleung). 신문로(Sinmunno)류
// 형태소 경계 예외는 사전 없이는 판별할 수 없어 적용하지 않는다.
const ASSIMILATION: Record<string, [string, string]> = {
  "k-n": ["ng", "n"], "k-r": ["ng", "n"], "k-m": ["ng", "m"],
  "t-n": ["n", "n"], "t-r": ["n", "n"], "t-m": ["n", "m"],
  "p-n": ["m", "n"], "p-r": ["m", "n"], "p-m": ["m", "m"],
  "n-r": ["l", "l"], "l-n": ["l", "l"], "l-r": ["l", "l"],
  "m-r": ["m", "n"], "ng-r": ["ng", "n"],
};

function romanizeChar(prevJong: number, nextCho: number): { jongRom: string; choRom: string } {
  const choIdx = nextCho;
  // We're processing prev syllable's jong with current syllable's cho
  let jongRom = JONG_ROM[prevJong];
  let choRom = CHO_ROM[choIdx];
  // Pass-through if prev had no jong
  if (prevJong === 0) return { jongRom: "", choRom };
  // Liaison: jong moves to next syllable if next is ㅇ (cho index 11)
  if (choIdx === 11) {
    // Drop the jong final and use it as the next cho
    const finals: Record<number, string> = { 1: "g", 2: "kk", 4: "n", 7: "d", 8: "r", 16: "m", 17: "b", 19: "s", 20: "ss", 21: "ng", 22: "j", 23: "ch", 24: "k", 25: "t", 26: "p", 27: "h" };
    if (finals[prevJong]) {
      return { jongRom: "", choRom: finals[prevJong] };
    }
  }
  const assimilated = ASSIMILATION[`${jongRom}-${choRom}`];
  if (assimilated) return { jongRom: assimilated[0], choRom: assimilated[1] };
  return { jongRom, choRom };
}

function romanize(text: string): string {
  let out = "";
  let prevJong = 0;
  let prevWasHangul = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const code = c.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const idx = code - 0xac00;
      const choIdx = Math.floor(idx / 588);
      const jungIdx = Math.floor((idx % 588) / 28);
      const jongIdx = idx % 28;
      if (prevWasHangul) {
        const { jongRom, choRom } = romanizeChar(prevJong, choIdx);
        out += jongRom + choRom;
      } else {
        out += CHO_ROM[choIdx];
      }
      out += JUNG_ROM[jungIdx];
      prevJong = jongIdx;
      prevWasHangul = true;
    } else {
      // flush prev jong
      if (prevWasHangul && prevJong > 0) out += JONG_ROM[prevJong];
      prevJong = 0;
      prevWasHangul = false;
      out += c;
    }
  }
  if (prevWasHangul && prevJong > 0) out += JONG_ROM[prevJong];
  return out;
}

function capitalize(s: string): string {
  return s.replace(/(^|\s)([a-z])/g, (_, sp, l) => sp + l.toUpperCase());
}

export default function KorRomanizeTool() {
  const t = useTranslations("toolUI.kor-romanize");
  const [input, setInput] = useState("안녕하세요. 김민준입니다. 서울특별시.");
  const [cap, setCap] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const r = romanize(input);
    return cap ? capitalize(r) : r;
  }, [input, cap]);

  const copy = async () => {
    const ok = await copyText(output);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base resize-y"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={cap} onChange={(e) => setCap(e.target.checked)} />
        {t("capitalize")}
      </label>
      <textarea
        readOnly
        value={output}
        className="w-full h-32 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-base resize-y font-mono"
      />
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
