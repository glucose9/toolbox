"use client";

import { useEffect, useState } from "react";

export default function TextToSpeechTool() {
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
      // prefer Korean by default
      const ko = list.find((v) => v.lang.startsWith("ko"));
      if (ko && !voiceURI) setVoiceURI(ko.voiceURI);
      else if (list[0] && !voiceURI) setVoiceURI(list[0].voiceURI);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="text-sm text-red-600">이 브라우저는 Web Speech API를 지원하지 않습니다. 크롬·엣지·사파리 최신 버전을 권장합니다.</div>
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
        <label className="label">음성 ({voices.length}개 사용 가능)</label>
        <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm">
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang}){v.default ? " ⭐" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <label>속도 ({rate.toFixed(1)}x)<input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full" /></label>
        <label>음높이 ({pitch.toFixed(1)})<input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(+e.target.value)} className="w-full" /></label>
        <label>음량 ({Math.round(vol * 100)}%)<input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} className="w-full" /></label>
      </div>

      <div className="flex gap-2">
        <button onClick={play} disabled={playing || !text.trim()} className="btn btn-primary disabled:opacity-50">▶ 재생</button>
        <button onClick={stop} disabled={!playing} className="btn btn-secondary disabled:opacity-50">⏹ 정지</button>
      </div>

      <div className="text-xs text-muted">
        OS에 설치된 음성을 사용합니다. 다른 언어 음성을 추가하려면 OS 설정에서 음성 팩을 다운로드하세요.
      </div>
    </div>
  );
}
