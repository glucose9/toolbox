"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// 16-step sequencer: 8 melody rows (C-major pentatonic — any pattern sounds
// consonant) + 4 synthesized drum rows. Everything is generated with the Web
// Audio API (no samples), and the exact same synth code renders the WAV
// export through an OfflineAudioContext.

const STEPS = 16;
// top row first (E5 → C4)
const MELODY = [
  { label: "E5", freq: 659.26 },
  { label: "D5", freq: 587.33 },
  { label: "C5", freq: 523.25 },
  { label: "A4", freq: 440.0 },
  { label: "G4", freq: 392.0 },
  { label: "E4", freq: 329.63 },
  { label: "D4", freq: 293.66 },
  { label: "C4", freq: 261.63 },
];
const DRUMS = ["hihat", "clap", "snare", "kick"] as const;
type DrumKey = (typeof DRUMS)[number];

type Grid = { melody: boolean[][]; drums: Record<DrumKey, boolean[]> };

const emptyGrid = (): Grid => ({
  melody: MELODY.map(() => Array(STEPS).fill(false)),
  drums: { hihat: Array(STEPS).fill(false), clap: Array(STEPS).fill(false), snare: Array(STEPS).fill(false), kick: Array(STEPS).fill(false) },
});

const presetGrid = (): Grid => {
  const g = emptyGrid();
  const on = (row: number, ...cols: number[]) => cols.forEach((c) => (g.melody[row][c] = true));
  // gentle pentatonic riff
  on(7, 0);          // C4
  on(5, 2);          // E4
  on(4, 4);          // G4
  on(3, 6);          // A4
  on(2, 8, 9);       // C5
  on(3, 11);         // A4
  on(4, 12);         // G4
  on(5, 14);         // E4
  g.drums.kick = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false];
  g.drums.snare = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false];
  g.drums.hihat = Array(STEPS).fill(false).map((_, i) => i % 2 === 0);
  g.drums.clap = [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false];
  return g;
};

// ---- synth voices (shared by live playback and offline WAV render) ----
type Ctx = BaseAudioContext;

function playKick(ctx: Ctx, dest: AudioNode, t: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
  gain.gain.setValueAtTime(1.0, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
  osc.connect(gain).connect(dest);
  osc.start(t);
  osc.stop(t + 0.3);
}

function noiseBuffer(ctx: Ctx, seconds: number): AudioBuffer {
  const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * seconds)), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function playSnare(ctx: Ctx, dest: AudioNode, t: number) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.18);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1600;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.7, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
  src.connect(hp).connect(gain).connect(dest);
  src.start(t);
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, t);
  const og = ctx.createGain();
  og.gain.setValueAtTime(0.4, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  osc.connect(og).connect(dest);
  osc.start(t);
  osc.stop(t + 0.1);
}

function playHihat(ctx: Ctx, dest: AudioNode, t: number) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 0.05);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 7000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.35, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
  src.connect(hp).connect(gain).connect(dest);
  src.start(t);
}

function playClap(ctx: Ctx, dest: AudioNode, t: number) {
  for (let i = 0; i < 3; i++) {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx, 0.06);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1200;
    bp.Q.value = 1.2;
    const gain = ctx.createGain();
    const start = t + i * 0.012;
    gain.gain.setValueAtTime(0.5, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);
    src.connect(bp).connect(gain).connect(dest);
    src.start(start);
  }
}

const DRUM_VOICES: Record<DrumKey, (ctx: Ctx, dest: AudioNode, t: number) => void> = {
  kick: playKick,
  snare: playSnare,
  hihat: playHihat,
  clap: playClap,
};

function playNote(ctx: Ctx, dest: AudioNode, t: number, freq: number, stepSec: number) {
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = freq * 2;
  const gain = ctx.createGain();
  const g2 = ctx.createGain();
  g2.gain.value = 0.25;
  const dur = Math.max(stepSec * 1.6, 0.25);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.32, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.connect(gain);
  osc2.connect(g2).connect(gain);
  gain.connect(dest);
  osc.start(t);
  osc2.start(t);
  osc.stop(t + dur + 0.05);
  osc2.stop(t + dur + 0.05);
}

function scheduleStep(ctx: Ctx, dest: AudioNode, grid: Grid, step: number, t: number, stepSec: number) {
  MELODY.forEach((n, r) => {
    if (grid.melody[r][step]) playNote(ctx, dest, t, n.freq, stepSec);
  });
  DRUMS.forEach((d) => {
    if (grid.drums[d][step]) DRUM_VOICES[d](ctx, dest, t);
  });
}

function encodeWav(buf: AudioBuffer): Blob {
  const ch = buf.numberOfChannels;
  const n = buf.length;
  const data = new DataView(new ArrayBuffer(44 + n * ch * 2));
  const writeStr = (o: number, s: string) => { for (let i = 0; i < s.length; i++) data.setUint8(o + i, s.charCodeAt(i)); };
  writeStr(0, "RIFF");
  data.setUint32(4, 36 + n * ch * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  data.setUint32(16, 16, true);
  data.setUint16(20, 1, true);
  data.setUint16(22, ch, true);
  data.setUint32(24, buf.sampleRate, true);
  data.setUint32(28, buf.sampleRate * ch * 2, true);
  data.setUint16(32, ch * 2, true);
  data.setUint16(34, 16, true);
  writeStr(36, "data");
  data.setUint32(40, n * ch * 2, true);
  let o = 44;
  const chans = Array.from({ length: ch }, (_, c) => buf.getChannelData(c));
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < ch; c++) {
      const v = Math.max(-1, Math.min(1, chans[c][i]));
      data.setInt16(o, v < 0 ? v * 0x8000 : v * 0x7fff, true);
      o += 2;
    }
  }
  return new Blob([data.buffer], { type: "audio/wav" });
}

export default function BeatMakerTool() {
  const t = useTranslations("toolUI.beat-maker");
  const [grid, setGrid] = useState<Grid>(presetGrid);
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [curStep, setCurStep] = useState(-1);
  const [exporting, setExporting] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);
  const nextTimeRef = useRef(0);
  const gridRef = useRef(grid);
  const bpmRef = useRef(bpm);
  gridRef.current = grid;
  bpmRef.current = bpm;

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setCurStep(-1);
  };

  const play = async () => {
    if (playing) {
      stop();
      return;
    }
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      // headroom + limiter so simultaneous kick + notes don't clip
      const master = ctxRef.current.createGain();
      master.gain.value = 0.7;
      const comp = ctxRef.current.createDynamicsCompressor();
      master.connect(comp).connect(ctxRef.current.destination);
      masterRef.current = master;
    }
    const ctx = ctxRef.current;
    await ctx.resume();
    stepRef.current = 0;
    nextTimeRef.current = ctx.currentTime + 0.08;
    setPlaying(true);
    // lookahead scheduler: 25ms tick, schedule 120ms ahead for stable timing
    timerRef.current = setInterval(() => {
      const stepSec = 60 / bpmRef.current / 4;
      while (nextTimeRef.current < ctx.currentTime + 0.12) {
        const s = stepRef.current % STEPS;
        scheduleStep(ctx, masterRef.current ?? ctx.destination, gridRef.current, s, nextTimeRef.current, stepSec);
        const delay = Math.max(0, (nextTimeRef.current - ctx.currentTime) * 1000);
        setTimeout(() => setCurStep(s), delay);
        nextTimeRef.current += stepSec;
        stepRef.current++;
      }
    }, 25);
  };

  useEffect(() => stop, []);

  const downloadWav = async () => {
    setExporting(true);
    try {
      const stepSec = 60 / bpm / 4;
      const loops = 4;
      const total = loops * STEPS * stepSec + 0.6;
      const off = new OfflineAudioContext(1, Math.ceil(44100 * total), 44100);
      const master = off.createGain();
      master.gain.value = 0.7;
      const comp = off.createDynamicsCompressor();
      master.connect(comp).connect(off.destination);
      for (let l = 0; l < loops; l++) {
        for (let s = 0; s < STEPS; s++) {
          scheduleStep(off, master, grid, s, 0.05 + (l * STEPS + s) * stepSec, stepSec);
        }
      }
      const rendered = await off.startRendering();
      const url = URL.createObjectURL(encodeWav(rendered));
      const a = document.createElement("a");
      a.href = url;
      a.download = `barokit-beat-${bpm}bpm.wav`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } finally {
      setExporting(false);
    }
  };

  const toggleMelody = (r: number, c: number) =>
    setGrid((g) => {
      const melody = g.melody.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? !v : v)) : row));
      return { ...g, melody };
    });
  const toggleDrum = (d: DrumKey, c: number) =>
    setGrid((g) => ({ ...g, drums: { ...g.drums, [d]: g.drums[d].map((v, ci) => (ci === c ? !v : v)) } }));

  const cellCls = (active: boolean, isPlayCol: boolean, accent: boolean, tone: "melody" | "drum") => {
    const base = "w-6 h-7 sm:w-7 sm:h-8 rounded border transition-colors ";
    const on = tone === "melody" ? "bg-brand-600 border-brand-700" : "bg-amber-500 border-amber-600";
    const off = accent
      ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
      : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700";
    return base + (active ? on : off) + (isPlayCol ? " ring-2 ring-brand-400" : "");
  };

  return (
    <div className="card space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={play} className="btn btn-primary min-w-[7rem]">
          {playing ? `■ ${t("stop")}` : `▶ ${t("play")}`}
        </button>
        <label className="flex items-center gap-2 text-sm flex-1 min-w-[12rem]">
          <span className="whitespace-nowrap">{t("bpm")}: {bpm}</span>
          <input type="range" min={60} max={180} value={bpm} onChange={(e) => setBpm(+e.target.value)} className="w-full" />
        </label>
        <button onClick={() => setGrid(presetGrid())} className="btn btn-secondary">{t("preset")}</button>
        <button onClick={() => { setGrid(emptyGrid()); }} className="btn">{t("clear")}</button>
        <button onClick={downloadWav} disabled={exporting} className="btn btn-secondary disabled:opacity-50">
          {exporting ? t("exporting") : `📥 ${t("downloadWav")}`}
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="text-xs font-medium text-muted mb-1">{t("melodyLabel")}</div>
          {MELODY.map((n, r) => (
            <div key={n.label} className="flex items-center gap-1 mb-1">
              <span className="w-8 text-[11px] text-muted text-right pr-1 font-mono">{n.label}</span>
              {Array.from({ length: STEPS }, (_, c) => (
                <button
                  key={c}
                  aria-label={`${n.label} ${c + 1}`}
                  onClick={() => toggleMelody(r, c)}
                  className={cellCls(grid.melody[r][c], c === curStep, c % 4 === 0, "melody")}
                />
              ))}
            </div>
          ))}
          <div className="text-xs font-medium text-muted mb-1 mt-3">{t("drumsLabel")}</div>
          {DRUMS.map((d) => (
            <div key={d} className="flex items-center gap-1 mb-1">
              <span className="w-8 text-[11px] text-muted text-right pr-1">{t(`row_${d}`)}</span>
              {Array.from({ length: STEPS }, (_, c) => (
                <button
                  key={c}
                  aria-label={`${t(`row_${d}`)} ${c + 1}`}
                  onClick={() => toggleDrum(d, c)}
                  className={cellCls(grid.drums[d][c], c === curStep, c % 4 === 0, "drum")}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted">{t("hint")}</div>
    </div>
  );
}
