"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "work" | "break" | "longBreak" | "idle";

export default function PomodoroTool() {
  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [cyclesUntilLong, setCyclesUntilLong] = useState(4);

  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(25 * 60);
  const [cyclesDone, setCyclesDone] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase === "idle") setRemaining(workMin * 60);
  }, [workMin, phase]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Transition
          if (phase === "work") {
            const newCount = cyclesDone + 1;
            setCyclesDone(newCount);
            playSound();
            if (newCount % cyclesUntilLong === 0) {
              setPhase("longBreak");
              return longBreakMin * 60;
            } else {
              setPhase("break");
              return breakMin * 60;
            }
          } else {
            playSound();
            setPhase("work");
            return workMin * 60;
          }
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase, cyclesDone, cyclesUntilLong, workMin, breakMin, longBreakMin]);

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      /* ignore */
    }
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("🍅 포모도로", {
        body: phase === "work" ? "수고하셨어요! 휴식 시간입니다." : "휴식 끝! 다시 집중 시작.",
      });
    }
  };

  const start = () => {
    if (phase === "idle") {
      setPhase("work");
      setRemaining(workMin * 60);
    }
    setRunning(true);
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setPhase("idle");
    setRemaining(workMin * 60);
    setCyclesDone(0);
  };
  const skip = () => {
    if (phase === "work") {
      const newCount = cyclesDone + 1;
      setCyclesDone(newCount);
      if (newCount % cyclesUntilLong === 0) {
        setPhase("longBreak");
        setRemaining(longBreakMin * 60);
      } else {
        setPhase("break");
        setRemaining(breakMin * 60);
      }
    } else {
      setPhase("work");
      setRemaining(workMin * 60);
    }
  };

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;
  const totalSec =
    phase === "work" ? workMin * 60 : phase === "longBreak" ? longBreakMin * 60 : breakMin * 60;
  const progressPct = phase === "idle" ? 0 : ((totalSec - remaining) / totalSec) * 100;

  const phaseLabel = {
    idle: "대기 중",
    work: "🍅 집중",
    break: "☕ 짧은 휴식",
    longBreak: "🛋️ 긴 휴식",
  }[phase];

  const phaseColor = {
    idle: "text-gray-500",
    work: "text-red-500",
    break: "text-green-500",
    longBreak: "text-blue-500",
  }[phase];

  return (
    <div className="card space-y-4">
      <div className="text-center">
        <div className={`text-sm font-medium ${phaseColor}`}>{phaseLabel}</div>
        <div className="text-7xl sm:text-8xl font-mono font-bold tracking-tight my-3">
          {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${phase === "work" ? "bg-red-500" : phase === "longBreak" ? "bg-blue-500" : "bg-green-500"}`}
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
        <div className="text-sm text-muted mt-2">
          완료한 사이클: <strong>{cyclesDone}</strong> / 긴 휴식까지 {cyclesUntilLong - (cyclesDone % cyclesUntilLong)}개
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {!running ? (
          <button onClick={start} className="btn btn-primary">▶ 시작</button>
        ) : (
          <button onClick={pause} className="btn btn-secondary">⏸ 일시정지</button>
        )}
        <button onClick={skip} className="btn">⏭ 건너뛰기</button>
        <button onClick={reset} className="btn">🔄 초기화</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
        <label>
          집중 (분)
          <input type="number" min={1} max={120} value={workMin} onChange={(e) => setWorkMin(+e.target.value || 25)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>
          짧은 휴식
          <input type="number" min={1} max={60} value={breakMin} onChange={(e) => setBreakMin(+e.target.value || 5)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>
          긴 휴식
          <input type="number" min={1} max={120} value={longBreakMin} onChange={(e) => setLongBreakMin(+e.target.value || 15)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
        <label>
          긴 휴식 주기
          <input type="number" min={2} max={10} value={cyclesUntilLong} onChange={(e) => setCyclesUntilLong(+e.target.value || 4)} className="w-full px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
        </label>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 포모도로 기법: 25분 집중 + 5분 휴식을 한 사이클로, 4사이클 후 15분 긴 휴식. 알림은 브라우저 알림 권한 + 사운드. 탭을 닫지 않아야 작동합니다 (백그라운드 탭은 브라우저 정책상 1초 미만 정밀도 보장 안 됨).
      </div>
    </div>
  );
}
