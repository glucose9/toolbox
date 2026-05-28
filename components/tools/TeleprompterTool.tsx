"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

const SAMPLE_SCRIPTS: Record<string, string> = {
  ko: `안녕하세요, 시청자 여러분.\n오늘의 주요 뉴스를 전해드리겠습니다.\n\n첫 번째 소식입니다.\n오늘 오전, 새로운 기술 발표회가 열렸습니다.\n관련 업계 관계자들이 큰 관심을 보였는데요.\n자세한 내용을 전해드립니다.\n\n다음 소식으로 넘어가겠습니다.\n주말 날씨는 대체로 맑겠습니다.\n나들이하기 좋은 날씨가 이어질 전망입니다.\n\n이상으로 오늘의 뉴스를 마치겠습니다.\n시청해 주셔서 감사합니다.`,
  en: `Good evening, and welcome.\nHere are tonight's top stories.\n\nOur first story.\nA new technology was unveiled this morning.\nIndustry observers are watching closely.\nMore details to come.\n\nMoving on.\nThe weekend forecast looks clear.\nPerfect weather is expected to continue.\n\nThat's all for tonight.\nThank you for watching.`,
  ja: `こんばんは。今夜のニュースをお伝えします。\n\n最初のニュースです。\n今朝、新技術の発表会が開かれました。\n業界関係者が大きな関心を寄せています。\n詳しくお伝えします。\n\n続いてのニュースです。\n週末の天気は概ね晴れの予報。\nお出かけ日和が続く見通しです。\n\n本日のニュースはここまで。\nご視聴ありがとうございました。`,
  zh: `各位观众,晚上好。\n以下是今晚的主要新闻。\n\n第一条新闻。\n今天上午,一项新技术发布会举行。\n业界相关人士高度关注。\n详细内容稍后报道。\n\n下一条新闻。\n本周末天气以晴为主。\n适合外出游玩的好天气将持续。\n\n今天的新闻到此结束。\n感谢您的收看。`,
};

export default function TeleprompterTool() {
  const t = useTranslations("toolUI.teleprompter");
  const [script, setScript] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(60); // px per second
  const [fontSize, setFontSize] = useState(48);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [mirror, setMirror] = useState(false);
  const [dark, setDark] = useState(true);
  const [running, setRunning] = useState(false); // teleprompter view active
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);

  // pick locale-appropriate sample on mount
  useEffect(() => {
    if (script) return;
    const lang = document.documentElement.lang || "ko";
    setScript(SAMPLE_SCRIPTS[lang] || SAMPLE_SCRIPTS.ko);
  }, [script]);

  const step = useCallback((ts: number) => {
    if (!playing) {
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
      return;
    }
    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
    lastTsRef.current = ts;
    offsetRef.current += dt * speed;
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateY(${-offsetRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(step);
  }, [playing, speed]);

  useEffect(() => {
    if (!running) return;
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
    };
  }, [running, step]);

  const restart = () => {
    offsetRef.current = 0;
    if (scrollRef.current) scrollRef.current.style.transform = "translateY(0)";
  };

  const start = () => {
    if (!script.trim()) return;
    setRunning(true);
    restart();
    setPlaying(true);
  };

  const stop = () => {
    setRunning(false);
    setPlaying(false);
    restart();
  };

  const toggleFullscreen = useCallback(async () => {
    const el = wrapRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  // keyboard controls
  useEffect(() => {
    if (!running) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        setSpeed((s) => Math.min(300, s + 5));
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        setSpeed((s) => Math.max(10, s - 5));
      } else if (e.key === "r" || e.key === "R") {
        restart();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "Escape") {
        // let browser handle exiting fullscreen; also stop running
        if (!document.fullscreenElement) stop();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, toggleFullscreen]);

  if (!running) {
    return (
      <div className="card space-y-4">
        <div>
          <label className="label">{t("script")}</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-64 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 font-mono text-sm resize-y"
            placeholder={t("scriptPlaceholder")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <label className="flex flex-col gap-1">
            <span>{t("speed")}: {speed} px/s</span>
            <input type="range" min={10} max={300} step={5} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} />
          </label>
          <label className="flex flex-col gap-1">
            <span>{t("fontSize")}: {fontSize}px</span>
            <input type="range" min={20} max={120} step={2} value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} />
          </label>
          <label className="flex flex-col gap-1">
            <span>{t("lineHeight")}: {lineHeight.toFixed(1)}</span>
            <input type="range" min={1.2} max={2.4} step={0.1} value={lineHeight} onChange={(e) => setLineHeight(parseFloat(e.target.value))} />
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} />
              <span>{t("mirror")}</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
              <span>{t("darkBg")}</span>
            </label>
          </div>
        </div>

        <button onClick={start} className="btn btn-primary w-full text-lg py-3" disabled={!script.trim()}>
          ▶ {t("start")}
        </button>

        <div className="text-xs text-muted leading-relaxed">
          {t("hotkeysHint")}
        </div>
      </div>
    );
  }

  // Running view
  return (
    <div
      ref={wrapRef}
      className={`fixed inset-0 z-50 ${dark ? "bg-black text-white" : "bg-white text-black"} overflow-hidden`}
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
    >
      {/* center guide line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className={`border-t-2 ${dark ? "border-red-500/60" : "border-red-500/40"}`} />
      </div>

      {/* scrolling text */}
      <div
        ref={scrollRef}
        className="will-change-transform px-8 sm:px-20"
        style={{
          paddingTop: "50vh",
          paddingBottom: "50vh",
          fontSize: `${fontSize}px`,
          lineHeight,
          fontWeight: 600,
          whiteSpace: "pre-wrap",
          wordBreak: "keep-all",
          textAlign: "center",
        }}
      >
        {script}
      </div>

      {/* control bar (un-mirrored so buttons remain readable) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm text-sm"
        style={{ transform: mirror ? "translateX(-50%) scaleX(-1)" : undefined }}
      >
        <button onClick={() => setPlaying((p) => !p)} className="px-3 py-1 hover:bg-white/10 rounded" aria-label={playing ? "pause" : "play"}>
          {playing ? "⏸" : "▶"}
        </button>
        <button onClick={restart} className="px-3 py-1 hover:bg-white/10 rounded" aria-label="restart">↻</button>
        <button onClick={() => setSpeed((s) => Math.max(10, s - 5))} className="px-3 py-1 hover:bg-white/10 rounded">−</button>
        <span className="px-2 tabular-nums w-20 text-center">{speed} px/s</span>
        <button onClick={() => setSpeed((s) => Math.min(300, s + 5))} className="px-3 py-1 hover:bg-white/10 rounded">+</button>
        <span className="mx-2 opacity-50">|</span>
        <button onClick={toggleFullscreen} className="px-3 py-1 hover:bg-white/10 rounded" aria-label="fullscreen">⛶</button>
        <button onClick={stop} className="px-3 py-1 hover:bg-white/10 rounded" aria-label="exit">✕</button>
      </div>
    </div>
  );
}
