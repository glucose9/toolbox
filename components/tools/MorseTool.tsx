"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

const MORSE_EN: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};

// 한국어 모스 부호 (KS X 1001 기준)
const MORSE_KR: Record<string, string> = {
  "ㄱ": ".-..", "ㄴ": "..-.", "ㄷ": "-...", "ㄹ": "...-", "ㅁ": "--", "ㅂ": ".--", "ㅅ": "--.",
  "ㅇ": "-.-", "ㅈ": ".--.", "ㅊ": "-.-.", "ㅋ": "-..-", "ㅌ": "--..", "ㅍ": "---", "ㅎ": ".---",
  "ㅏ": ".", "ㅑ": "..", "ㅓ": "-", "ㅕ": "...", "ㅗ": ".-", "ㅛ": "-.", "ㅜ": "....",
  "ㅠ": ".-.", "ㅡ": "-..", "ㅣ": "..-",
};

// 표준 국문 모스 합성 규정: 복합모음·쌍자음·겹받침은 기본 자모 조합으로 전송
const JAMO_EXPAND: Record<string, string> = {
  "ㄲ": "ㄱㄱ", "ㄸ": "ㄷㄷ", "ㅃ": "ㅂㅂ", "ㅆ": "ㅅㅅ", "ㅉ": "ㅈㅈ",
  "ㅐ": "ㅏㅣ", "ㅒ": "ㅑㅣ", "ㅔ": "ㅓㅣ", "ㅖ": "ㅕㅣ",
  "ㅘ": "ㅗㅏ", "ㅙ": "ㅗㅏㅣ", "ㅚ": "ㅗㅣ", "ㅝ": "ㅜㅓ", "ㅞ": "ㅜㅓㅣ", "ㅟ": "ㅜㅣ", "ㅢ": "ㅡㅣ",
  "ㄳ": "ㄱㅅ", "ㄵ": "ㄴㅈ", "ㄶ": "ㄴㅎ", "ㄺ": "ㄹㄱ", "ㄻ": "ㄹㅁ", "ㄼ": "ㄹㅂ",
  "ㄽ": "ㄹㅅ", "ㄾ": "ㄹㅌ", "ㄿ": "ㄹㅍ", "ㅀ": "ㄹㅎ", "ㅄ": "ㅂㅅ",
};

const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

function decomposeHangul(c: string): string {
  const code = c.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) {
    const idx = code - 0xac00;
    const cho = CHO[Math.floor(idx / 588)];
    const jung = JUNG[Math.floor((idx % 588) / 28)];
    const jong = JONG[idx % 28];
    return [cho, jung, jong].join("");
  }
  return c;
}

function toMorse(text: string): string {
  const words = text.split(/\s+/);
  return words
    .map((w) =>
      Array.from(w)
        .map((c) => {
          if (c.charCodeAt(0) >= 0xac00 && c.charCodeAt(0) <= 0xd7a3) {
            return Array.from(decomposeHangul(c))
              .flatMap((j) => Array.from(JAMO_EXPAND[j] ?? j))
              .map((j) => MORSE_KR[j] || j)
              .filter(Boolean)
              .join(" ");
          }
          const jamo = Array.from(JAMO_EXPAND[c] ?? c).map((j) => MORSE_KR[j]);
          if (jamo.every(Boolean)) return jamo.join(" ");
          const up = c.toUpperCase();
          return MORSE_EN[up] || c;
        })
        .join(" ")
    )
    .join(" / ");
}

function fromMorse(morse: string): string {
  const reverse: Record<string, string> = {};
  for (const [k, v] of Object.entries(MORSE_KR)) reverse[v] = k;
  for (const [k, v] of Object.entries(MORSE_EN)) reverse[v] = k; // 충돌 코드는 영문 우선

  const words = morse.split(/\s*\/\s*/);
  return words
    .map((w) =>
      w
        .split(/\s+/)
        .filter(Boolean)
        .map((code) => reverse[code] || `[${code}]`)
        .join("")
    )
    .join(" ");
}

function isMorse(s: string): boolean {
  return /^[.\-\s/]+$/.test(s.trim());
}

export default function MorseTool() {
  const t = useTranslations("toolUI.morse");
  const [text, setText] = useState("Hello World");
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const isMorseInput = isMorse(text);
  const output = useMemo(() => (isMorseInput ? fromMorse(text) : toMorse(text)), [text, isMorseInput]);

  const play = async () => {
    const morse = isMorseInput ? text : output;
    setPlaying(true);
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const unit = 0.08;
      let t = ctx.currentTime;
      for (const c of morse) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 600;
        if (c === ".") {
          gain.gain.setValueAtTime(0.3, t);
          osc.start(t);
          osc.stop(t + unit);
          t += unit + unit;
        } else if (c === "-") {
          gain.gain.setValueAtTime(0.3, t);
          osc.start(t);
          osc.stop(t + unit * 3);
          t += unit * 3 + unit;
        } else if (c === " ") {
          t += unit * 2;
        } else if (c === "/") {
          t += unit * 6;
        }
      }
      await new Promise((r) => setTimeout(r, (t - ctx.currentTime) * 1000 + 100));
      ctx.close();
    } finally {
      setPlaying(false);
    }
  };

  const copy = async () => {
    const ok = await copyText(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("placeholder")}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="text-xs text-muted">{t("autoDetect")}: {isMorseInput ? t("morseToText") : t("textToMorse")}</div>
      <textarea
        readOnly
        value={output}
        className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={play} disabled={playing} className="btn btn-primary disabled:opacity-50">
          {playing ? t("playing") : t("playSound")}
        </button>
        <button onClick={copy} disabled={!output} className="btn btn-secondary disabled:opacity-50">{copied ? t("copied") : t("copy")}</button>
      </div>
      <div className="text-xs text-muted">{t("note")}</div>
    </div>
  );
}
