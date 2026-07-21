"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function secondsToIso(s: number): string {
  if (!isFinite(s)) return "";
  const abs = Math.abs(s);
  const h = Math.floor(abs / 3600), m = Math.floor((abs % 3600) / 60), sec = Math.floor(abs % 60);
  let out = "PT";
  if (h > 0) out += `${h}H`;
  if (m > 0) out += `${m}M`;
  if (sec > 0 || out === "PT") out += `${sec}S`;
  return (s < 0 ? "-" : "") + out;
}

function humanToSeconds(s: string): number {
  let total = 0;
  const m = s.match(/(\d+(?:\.\d+)?)\s*(일|d|day|days|시간|h|hour|hours|분|m|min|minute|minutes|초|s|sec|second|seconds)/gi);
  if (!m) return parseFloat(s) || 0;
  for (const part of m) {
    const num = parseFloat(part);
    if (/일|d|day/i.test(part)) total += num * 86400;
    else if (/시간|h|hour/i.test(part)) total += num * 3600;
    else if (/분|m|min/i.test(part)) total += num * 60;
    else total += num;
  }
  return total;
}

export default function DurationFormatTool() {
  const t = useTranslations("toolUI.duration-format");
  const [input, setInput] = useState("5400");
  const isNum = /^\d+(\.\d+)?$/.test(input.trim());
  const seconds = useMemo(() => isNum ? parseFloat(input) : humanToSeconds(input), [input, isNum]);

  const secondsToHuman = (s: number): string => {
    if (!isFinite(s)) return "";
    const abs = Math.abs(s);
    const days = Math.floor(abs / 86400);
    const h = Math.floor((abs % 86400) / 3600);
    const m = Math.floor((abs % 3600) / 60);
    const sec = Math.floor(abs % 60);
    const parts: string[] = [];
    if (days > 0) parts.push(t("daysUnit", { n: days }));
    if (h > 0) parts.push(t("hoursUnit", { n: h }));
    if (m > 0) parts.push(t("minutesUnit", { n: m }));
    if (sec > 0 || parts.length === 0) parts.push(t("secondsUnit", { n: sec }));
    return (s < 0 ? "-" : "") + parts.join(" ");
  };

  return (
    <div className="card space-y-3">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("placeholder")} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      <div className="grid grid-cols-1 gap-2">
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("seconds")}</div><div className="font-mono">{seconds}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">{t("humanReadable")}</div><div className="font-mono">{secondsToHuman(seconds)}</div></div>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded"><div className="text-xs text-muted">ISO 8601</div><div className="font-mono">{secondsToIso(seconds)}</div></div>
      </div>
    </div>
  );
}
