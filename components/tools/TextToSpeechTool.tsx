"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function TextToSpeechTool() {
  const t = useTranslations("toolUI.text-to-speech");
  const tc = useTranslations("common");
  const [text, setText] = useState("안녕하세요. 텍스트를 음성으로 읽어줍니다. Hello, this is text-to-speech.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [vol, setVol] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      // prefer Korean by default. voiceschanged can fire repeatedly, so read the
      // current selection functionally instead of through a stale closure -
      // otherwise a later re-fire would overwrite the user's own choice.
      const fallback = list.find((v) => v.lang.startsWith("ko"))?.voiceURI ?? list[0]?.voiceURI;
      if (fallback) setVoiceURI((prev) => prev || fallback);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  // Some engines (notably Chrome with remote voices on long text) stop without
  // ever firing onend/onerror, which would leave `playing` stuck at true.
  // Poll the engine and release the flag once it has been idle for ~1s.
  useEffect(() => {
    if (!playing) return;
    let idle = 0;
    const id = window.setInterval(() => {
      const s = window.speechSynthesis;
      if (s.speaking || s.pending) { idle = 0; return; }
      if (++idle >= 2) setPlaying(false);
    }, 500);
    return () => window.clearInterval(id);
  }, [playing]);

  const play = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.voiceURI === voiceURI);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = vol;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  if (!supported) {
    return (
      <div className="card">
        <div className="text-sm text-red-600">{t("notSupported")}</div>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y"
      />

      <div>
        <label className="label">{t("voice", { count: voices.length })}</label>
        <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang}){v.default ? " ⭐" : ""}
            </option>
          ))}
        </select>
      </div>

      <label className="block text-sm">{t("rate")} ({rate.toFixed(1)}x)<input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full" /></label>

      <div className="flex gap-2">
        {/* Stays enabled while playing: play() cancels the queue first, so this
            also recovers from an engine that stalled without firing onend. */}
        <button onClick={play} disabled={!text.trim()} className="btn btn-primary disabled:opacity-50">▶ {t("play")}</button>
        <button onClick={stop} disabled={!playing} className="btn btn-secondary disabled:opacity-50">⏹ {t("stop")}</button>
      </div>

      <details className="rounded border border-gray-200 dark:border-gray-700">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
        <div className="p-3 pt-1">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label>{t("pitch")} ({pitch.toFixed(1)})<input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(+e.target.value)} className="w-full" /></label>
            <label>{t("volume")} ({Math.round(vol * 100)}%)<input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} className="w-full" /></label>
          </div>
        </div>
      </details>

      <div className="text-xs text-muted">
        {t("osVoiceNote")}
      </div>
    </div>
  );
}
