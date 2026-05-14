"use client";

import { useEffect, useState } from "react";

type Info = { key: string; code: string; keyCode: number; which: number; modifiers: string[]; location: number };

export default function KeycodeTool() {
  const [last, setLast] = useState<Info | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      const mods: string[] = [];
      if (e.altKey) mods.push("Alt");
      if (e.ctrlKey) mods.push("Ctrl");
      if (e.shiftKey) mods.push("Shift");
      if (e.metaKey) mods.push("Meta");
      setLast({ key: e.key, code: e.code, keyCode: e.keyCode, which: e.which, modifiers: mods, location: e.location });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="card space-y-3">
      <div className="bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded p-12 text-center">
        <div className="text-sm text-muted">아무 키나 눌러보세요</div>
        {last ? (
          <div className="mt-4 text-5xl font-bold font-mono">{last.key === " " ? "Space" : last.key}</div>
        ) : (
          <div className="mt-4 text-5xl font-bold font-mono text-muted">⌨️</div>
        )}
      </div>
      {last && (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="py-2 pr-3 text-muted">key</td><td className="font-mono">{JSON.stringify(last.key)}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">code</td><td className="font-mono">{last.code}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">keyCode (deprecated)</td><td className="font-mono">{last.keyCode}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">which (deprecated)</td><td className="font-mono">{last.which}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">modifiers</td><td className="font-mono">{last.modifiers.join(" + ") || "—"}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">location</td><td className="font-mono">{last.location} (0=일반, 1=왼쪽, 2=오른쪽, 3=숫자패드)</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
