"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type ChartType = "pie" | "donut" | "bar" | "barH" | "line";
type Row = { label: string; value: string };

const PALETTES: Record<string, string[]> = {
  bright: ["#2563eb", "#dc2626", "#16a34a", "#ea580c", "#9333ea", "#0891b2", "#db2777", "#ca8a04", "#4f46e5", "#059669"],
  pastel: ["#93c5fd", "#fca5a5", "#86efac", "#fdba74", "#d8b4fe", "#a5f3fc", "#f9a8d4", "#fde047", "#a5b4fc", "#6ee7b7"],
  warm: ["#f97316", "#ef4444", "#f59e0b", "#e11d48", "#d97706", "#dc2626", "#fb923c", "#facc15", "#fbbf24", "#f43f5e"],
  cool: ["#0ea5e9", "#6366f1", "#14b8a6", "#8b5cf6", "#06b6d4", "#3b82f6", "#10b981", "#a855f7", "#0284c7", "#22d3ee"],
  mono: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1", "#0f172a", "#475569", "#64748b", "#94a3b8"],
};

const W = 760;
const H = 470;

// Format a number: trim trailing zeros, add thousands separators.
function fmt(n: number): string {
  if (!isFinite(n)) return "0";
  const r = Math.round(n * 1000) / 1000;
  return r.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

// Nice axis maximum (1/2/5 × 10^k) at or above v.
function niceMax(v: number): number {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return nice * mag;
}

// Signed axis range [lo, hi] that always includes 0, for bar/line charts so
// negative values render below the zero baseline instead of as flat bars.
function niceRange(values: number[]): { lo: number; hi: number } {
  const dMax = Math.max(0, ...values);
  const dMin = Math.min(0, ...values);
  const hi = dMax > 0 ? niceMax(dMax) : 0;
  const lo = dMin < 0 ? -niceMax(-dMin) : 0;
  return hi === lo ? { lo: 0, hi: 1 } : { lo, hi };
}

function polar(cx: number, cy: number, r: number, frac: number): [number, number] {
  const a = frac * Math.PI * 2 - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

// Annular/pie sector path. innerR=0 → pie slice. Sweep clamped below full turn
// so a single 100% slice stays a valid arc.
function sectorPath(cx: number, cy: number, r: number, ir: number, startFrac: number, endFrac: number): string {
  const sweep = Math.min(endFrac - startFrac, 0.999999);
  const e = startFrac + sweep;
  const large = sweep > 0.5 ? 1 : 0;
  const [ox1, oy1] = polar(cx, cy, r, startFrac);
  const [ox2, oy2] = polar(cx, cy, r, e);
  if (ir <= 0) {
    return `M ${cx} ${cy} L ${ox1.toFixed(2)} ${oy1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)} Z`;
  }
  const [ix1, iy1] = polar(cx, cy, ir, startFrac);
  const [ix2, iy2] = polar(cx, cy, ir, e);
  return `M ${ox1.toFixed(2)} ${oy1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)} L ${ix2.toFixed(2)} ${iy2.toFixed(2)} A ${ir} ${ir} 0 ${large} 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)} Z`;
}

export default function ChartMakerTool() {
  const t = useTranslations("toolUI.chart-maker");
  const svgRef = useRef<SVGSVGElement>(null);
  const [type, setType] = useState<ChartType>("pie");
  const [title, setTitle] = useState("");
  const [paletteKey, setPaletteKey] = useState("bright");
  const [showLegend, setShowLegend] = useState(true);
  const [showValues, setShowValues] = useState(true);
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState<Row[]>([
    { label: "A", value: "30" },
    { label: "B", value: "25" },
    { label: "C", value: "20" },
    { label: "D", value: "15" },
    { label: "E", value: "10" },
  ]);

  const colors = PALETTES[paletteKey];

  const data = useMemo(
    () =>
      rows
        .map((r) => ({ label: r.label.trim(), value: Number(r.value) }))
        .filter((r) => r.label !== "" && isFinite(r.value)),
    [rows]
  );

  const setRow = (i: number, patch: Partial<Row>) =>
    setRows((p) => p.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const addRow = () => setRows((p) => [...p, { label: "", value: "" }]);
  const removeRow = (i: number) => setRows((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : p));

  const download = (kind: "png" | "svg") => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const safeTitle = (title || "chart").replace(/[^\w가-힣-]+/g, "_").slice(0, 40);
    if (kind === "svg") {
      const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${xml}`], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeTitle}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    // PNG: render the SVG (as a base64 data URL, so the image isn't tainted) at 2×.
    const scale = 2;
    const img = new Image();
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${safeTitle}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };
    img.src = `data:image/svg+xml;base64,${svg64}`;
  };

  const copyPng = async () => {
    const svg = svgRef.current;
    if (!svg || typeof ClipboardItem === "undefined") return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = W * 2;
      canvas.height = H * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard image not permitted */
        }
      }, "image/png");
    };
    img.src = `data:image/svg+xml;base64,${svg64}`;
  };

  // ---- chart body (SVG children) ----
  const chart = useMemo(() => {
    const els: React.ReactNode[] = [];
    const titleY = 34;
    const top = title ? 58 : 30;

    if (data.length === 0) {
      return (
        <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="16" fill="#94a3b8">
          {t("noData")}
        </text>
      );
    }

    if (type === "pie" || type === "donut") {
      const total = data.reduce((s, d) => s + Math.max(0, d.value), 0);
      const legendW = showLegend ? 220 : 0;
      const cx = (W - legendW) / 2;
      const cy = top + (H - top - 20) / 2;
      const r = Math.min((W - legendW) / 2, (H - top - 20) / 2) - 10;
      const ir = type === "donut" ? r * 0.55 : 0;
      let acc = 0;
      if (total > 0) {
        data.forEach((d, i) => {
          const v = Math.max(0, d.value);
          if (v === 0) return;
          const start = acc / total;
          acc += v;
          const end = acc / total;
          const color = colors[i % colors.length];
          els.push(<path key={`s${i}`} d={sectorPath(cx, cy, r, ir, start, end)} fill={color} stroke="#fff" strokeWidth="2" />);
          if (showValues) {
            const mid = (start + end) / 2;
            const [lx, ly] = polar(cx, cy, ir > 0 ? (r + ir) / 2 : r * 0.62, mid);
            const pct = (v / total) * 100;
            if (pct >= 5) {
              els.push(
                <text key={`v${i}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill={type === "donut" ? "#1e293b" : "#fff"}>
                  {pct.toFixed(0)}%
                </text>
              );
            }
          }
        });
      }
      if (showLegend) {
        data.forEach((d, i) => {
          const ly = top + 6 + i * 24;
          const color = colors[i % colors.length];
          const pct = total > 0 ? ((Math.max(0, d.value) / total) * 100).toFixed(1) : "0";
          els.push(<rect key={`lg${i}`} x={W - legendW + 10} y={ly} width="14" height="14" rx="3" fill={color} />);
          els.push(
            <text key={`lt${i}`} x={W - legendW + 32} y={ly + 12} fontSize="13" fill="#334155">
              {d.label} · {pct}%
            </text>
          );
        });
      }
    } else if (type === "bar" || type === "barH") {
      const { lo, hi } = niceRange(data.map((d) => d.value));
      const range = hi - lo;
      const GRID = 5;
      if (type === "bar") {
        const plotL = 64, plotR = W - 20, plotT = top, plotB = H - 50;
        const plotW = plotR - plotL, plotH = plotB - plotT;
        const yAt = (v: number) => plotB - ((v - lo) / range) * plotH;
        const zeroY = yAt(0);
        for (let g = 0; g <= GRID; g++) {
          const val = lo + (g / GRID) * range;
          const y = yAt(val);
          els.push(<line key={`g${g}`} x1={plotL} y1={y} x2={plotR} y2={y} stroke={Math.abs(val) < range * 1e-9 ? "#cbd5e1" : "#e2e8f0"} strokeWidth="1" />);
          els.push(<text key={`gl${g}`} x={plotL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{fmt(val)}</text>);
        }
        const slot = plotW / data.length;
        const bw = Math.min(slot * 0.62, 80);
        data.forEach((d, i) => {
          const yv = yAt(d.value);
          const x = plotL + i * slot + (slot - bw) / 2;
          const y = Math.min(zeroY, yv);
          const bh = Math.abs(yv - zeroY);
          els.push(<rect key={`b${i}`} x={x} y={y} width={bw} height={bh} rx="3" fill={colors[i % colors.length]} />);
          if (showValues) els.push(<text key={`bv${i}`} x={x + bw / 2} y={d.value >= 0 ? yv - 5 : yv + 14} textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">{fmt(d.value)}</text>);
          els.push(<text key={`bl${i}`} x={x + bw / 2} y={plotB + 18} textAnchor="middle" fontSize="12" fill="#475569">{d.label.length > 8 ? d.label.slice(0, 7) + "…" : d.label}</text>);
        });
      } else {
        const plotL = 90, plotR = W - 60, plotT = top, plotB = H - 36;
        const plotW = plotR - plotL, plotH = plotB - plotT;
        const xAt = (v: number) => plotL + ((v - lo) / range) * plotW;
        const zeroX = xAt(0);
        for (let g = 0; g <= GRID; g++) {
          const val = lo + (g / GRID) * range;
          const x = xAt(val);
          els.push(<line key={`g${g}`} x1={x} y1={plotT} x2={x} y2={plotB} stroke={Math.abs(val) < range * 1e-9 ? "#cbd5e1" : "#e2e8f0"} strokeWidth="1" />);
          els.push(<text key={`gl${g}`} x={x} y={plotB + 16} textAnchor="middle" fontSize="11" fill="#94a3b8">{fmt(val)}</text>);
        }
        const slot = plotH / data.length;
        const bh = Math.min(slot * 0.62, 46);
        data.forEach((d, i) => {
          const xv = xAt(d.value);
          const y = plotT + i * slot + (slot - bh) / 2;
          const x = Math.min(zeroX, xv);
          const bw = Math.abs(xv - zeroX);
          els.push(<rect key={`b${i}`} x={x} y={y} width={bw} height={bh} rx="3" fill={colors[i % colors.length]} />);
          if (showValues) els.push(<text key={`bv${i}`} x={d.value >= 0 ? xv + 6 : xv - 6} y={y + bh / 2 + 4} textAnchor={d.value >= 0 ? "start" : "end"} fontSize="12" fontWeight="600" fill="#334155">{fmt(d.value)}</text>);
          els.push(<text key={`bl${i}`} x={plotL - 8} y={y + bh / 2 + 4} textAnchor="end" fontSize="12" fill="#475569">{d.label.length > 10 ? d.label.slice(0, 9) + "…" : d.label}</text>);
        });
      }
    } else if (type === "line") {
      const { lo, hi } = niceRange(data.map((d) => d.value));
      const range = hi - lo;
      const GRID = 5;
      const plotL = 64, plotR = W - 20, plotT = top, plotB = H - 50;
      const plotW = plotR - plotL, plotH = plotB - plotT;
      const yAt = (v: number) => plotB - ((v - lo) / range) * plotH;
      for (let g = 0; g <= GRID; g++) {
        const val = lo + (g / GRID) * range;
        const y = yAt(val);
        els.push(<line key={`g${g}`} x1={plotL} y1={y} x2={plotR} y2={y} stroke={Math.abs(val) < range * 1e-9 ? "#cbd5e1" : "#e2e8f0"} strokeWidth="1" />);
        els.push(<text key={`gl${g}`} x={plotL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{fmt(val)}</text>);
      }
      const n = data.length;
      const xAt = (i: number) => (n === 1 ? plotL + plotW / 2 : plotL + (i / (n - 1)) * plotW);
      const pts = data.map((d, i) => `${xAt(i).toFixed(1)},${yAt(d.value).toFixed(1)}`).join(" ");
      els.push(<polyline key="ln" points={pts} fill="none" stroke={colors[0]} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />);
      data.forEach((d, i) => {
        const x = xAt(i), y = yAt(d.value);
        els.push(<circle key={`pt${i}`} cx={x} cy={y} r="4" fill="#fff" stroke={colors[0]} strokeWidth="2.5" />);
        if (showValues) els.push(<text key={`pv${i}`} x={x} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">{fmt(d.value)}</text>);
        els.push(<text key={`pl${i}`} x={x} y={plotB + 18} textAnchor="middle" fontSize="12" fill="#475569">{d.label.length > 8 ? d.label.slice(0, 7) + "…" : d.label}</text>);
      });
    }

    return (
      <>
        {title && (
          <text x={W / 2} y={titleY} textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
            {title}
          </text>
        )}
        {els}
      </>
    );
  }, [type, data, colors, showLegend, showValues, title, t]);

  const TYPES: { id: ChartType; label: string }[] = [
    { id: "pie", label: t("typePie") },
    { id: "donut", label: t("typeDonut") },
    { id: "bar", label: t("typeBar") },
    { id: "barH", label: t("typeBarH") },
    { id: "line", label: t("typeLine") },
  ];

  return (
    <div className="card space-y-4">
      {/* Chart type */}
      <div className="flex flex-wrap gap-1.5">
        {TYPES.map((ty) => (
          <button
            key={ty.id}
            onClick={() => setType(ty.id)}
            className={`px-3 py-1.5 rounded text-sm font-medium ${type === ty.id ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {ty.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white overflow-hidden">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Noto Sans KR', sans-serif" }}>
          <rect x="0" y="0" width={W} height={H} fill="#ffffff" />
          {chart}
        </svg>
      </div>

      {/* Export */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => download("png")} className="btn btn-primary text-sm">⬇ {t("downloadPng")}</button>
        <button onClick={() => download("svg")} className="btn btn-secondary text-sm">⬇ {t("downloadSvg")}</button>
        <button onClick={copyPng} className="btn btn-secondary text-sm">{copied ? "✓ " + t("copied") : "📋 " + t("copyPng")}</button>
      </div>

      {/* Title + options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label">{t("titleLabel")}</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("titlePlaceholder")} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
        </div>
        <div>
          <label className="label">{t("paletteLabel")}</label>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {Object.entries(PALETTES).map(([key, cols]) => (
              <button key={key} onClick={() => setPaletteKey(key)} title={key} className={`flex rounded overflow-hidden border-2 ${paletteKey === key ? "border-brand-500" : "border-transparent"}`}>
                {cols.slice(0, 5).map((c, i) => (<span key={i} style={{ background: c }} className="w-4 h-6" />))}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showLegend} onChange={(e) => setShowLegend(e.target.checked)} /> {t("showLegend")}</label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={showValues} onChange={(e) => setShowValues(e.target.checked)} /> {t("showValues")}</label>
      </div>

      {/* Data editor */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">{t("dataLabel")}</label>
          <span className="text-xs text-muted">{t("rowCount", { count: data.length })}</span>
        </div>
        <div className="space-y-1.5">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-xs text-muted px-1">
            <span>{t("colLabel")}</span>
            <span>{t("colValue")}</span>
            <span className="w-7" />
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input value={r.label} onChange={(e) => setRow(i, { label: e.target.value })} className="px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm" />
              <input value={r.value} onChange={(e) => setRow(i, { value: e.target.value })} inputMode="decimal" className="px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono" />
              <button onClick={() => removeRow(i)} className="w-7 text-red-500 hover:text-red-700" aria-label="remove">×</button>
            </div>
          ))}
        </div>
        <button onClick={addRow} className="btn btn-secondary text-sm mt-2">+ {t("addRow")}</button>
      </div>
    </div>
  );
}
