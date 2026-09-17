"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

// A4 dimensions in mm
const A4_MM = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } };
// On-screen render size (96 DPI). html2canvas scales further for crisp output.
const A4_PX = { portrait: { w: 794, h: 1123 }, landscape: { w: 1123, h: 794 } };

type Orientation = "portrait" | "landscape";
// "sequential": page 1 = 1..N, page 2 = N+1..2N — right when you cut one sheet
// at a time. "stack": the same cell position advances by 1 on every sheet, so
// a stack of printed sheets cut in one go yields piles of consecutive numbers
// (cell 1 → 1..P, cell 2 → P+1..2P, …). That is how number tickets are
// actually produced on a guillotine cutter.
type Order = "sequential" | "stack";

export default function NumberTagsTool() {
  const t = useTranslations("toolUI.number-tags");
  const tc = useTranslations("common");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(50);
  const [bg, setBg] = useState("#fef3c7"); // amber-100
  const [fg, setFg] = useState("#111827"); // gray-900
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(8);
  const [fontPct, setFontPct] = useState(45); // % of cell shorter side
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [padDigits, setPadDigits] = useState(0);
  const [radius, setRadius] = useState(8);
  const [margin, setMargin] = useState(10); // mm
  const [gap, setGap] = useState(2); // mm
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [order, setOrder] = useState<Order>("stack");
  const [busy, setBusy] = useState(false);
  const previewBoxRef = useRef<HTMLDivElement>(null);

  const numbers = useMemo(() => {
    const start = Math.min(from, to);
    const end = Math.max(from, to);
    const count = Math.min(2000, Math.max(0, end - start + 1));
    return Array.from({ length: count }, (_, i) => start + i);
  }, [from, to]);

  const perPage = Math.max(1, cols * rows);
  const pageCount = Math.max(1, Math.ceil(numbers.length / perPage));
  const tagsPerA4Hint = perPage;

  // Numbers for page p (0-based), one entry per cell; null = blank cell.
  const pageNumbers = (p: number): (number | null)[] =>
    Array.from({ length: perPage }, (_, i) => {
      const idx = order === "stack" ? i * pageCount + p : p * perPage + i;
      return idx < numbers.length ? numbers[idx] : null;
    });
  // First two piles after a stack cut, for the hint ("cell 1: 1–50, cell 2: 51–100").
  const pile = (i: number) => {
    const a = i * pageCount;
    const b = Math.min(numbers.length, (i + 1) * pageCount) - 1;
    return a < numbers.length ? [numbers[a], numbers[b]] : null;
  };

  const renderNum = (n: number) => {
    const digits = Math.abs(n).toString();
    const padded = padDigits > 0 ? digits.padStart(padDigits, "0") : digits;
    return `${prefix}${n < 0 ? "-" : ""}${padded}${suffix}`;
  };

  // Build an offscreen DOM at exact A4 px size with one page worth of tags.
  const buildPageElement = (cells: (number | null)[]): HTMLDivElement => {
    const { w: pageWpx, h: pageHpx } = A4_PX[orientation];
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.top = "0";
    el.style.width = `${pageWpx}px`;
    el.style.height = `${pageHpx}px`;
    el.style.background = "#ffffff";
    el.style.padding = `${mmToPx(margin)}px`;
    el.style.boxSizing = "border-box";
    el.style.display = "grid";
    el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    el.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    el.style.gap = `${mmToPx(gap)}px`;

    // Estimate font size from cell dimensions
    const innerW = pageWpx - 2 * mmToPx(margin) - (cols - 1) * mmToPx(gap);
    const innerH = pageHpx - 2 * mmToPx(margin) - (rows - 1) * mmToPx(gap);
    const cellW = innerW / cols;
    const cellH = innerH / rows;
    const fontPx = Math.min(cellW, cellH) * (fontPct / 100);

    for (const n of cells) {
      if (n === null) {
        el.appendChild(document.createElement("div")); // blank cell keeps the grid aligned
        continue;
      }
      const cell = document.createElement("div");
      cell.style.background = bg;
      cell.style.color = fg;
      cell.style.borderRadius = `${radius}px`;
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontWeight = "700";
      cell.style.lineHeight = "1";
      cell.style.textAlign = "center";
      cell.style.fontSize = `${fontPx}px`;
      cell.style.fontFamily = "system-ui, -apple-system, 'Pretendard', 'Noto Sans KR', sans-serif";
      cell.style.overflow = "hidden";
      cell.style.padding = "4%";
      cell.textContent = renderNum(n);
      el.appendChild(cell);
    }
    return el;
  };

  const downloadPdf = async () => {
    if (numbers.length === 0) return;
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const { w: mmW, h: mmH } = A4_MM[orientation];
      const pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });

      for (let p = 0; p < pageCount; p++) {
        const pageEl = buildPageElement(pageNumbers(p));
        document.body.appendChild(pageEl);
        const canvas = await html2canvas(pageEl, { backgroundColor: "#ffffff", scale: 2 });
        document.body.removeChild(pageEl);

        const img = canvas.toDataURL("image/jpeg", 0.92);
        if (p > 0) pdf.addPage("a4", orientation);
        pdf.addImage(img, "JPEG", 0, 0, mmW, mmH);
      }
      pdf.save(`number-tags-${from}-${to}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  const print = () => window.print();

  // Live preview: scale A4 page down to fit a max width
  const previewMaxW = 480;
  const a4w = A4_PX[orientation].w;
  const a4h = A4_PX[orientation].h;
  const scale = previewMaxW / a4w;
  const previewCells = pageNumbers(0);
  const pile1 = pile(0);
  const pile2 = pile(1);

  // Calculate font for preview cell
  const innerW = a4w - 2 * mmToPx(margin) - (cols - 1) * mmToPx(gap);
  const innerH = a4h - 2 * mmToPx(margin) - (rows - 1) * mmToPx(gap);
  const cellW = innerW / cols;
  const cellH = innerH / rows;
  const previewFontPx = Math.min(cellW, cellH) * (fontPct / 100);

  return (
    <div className="space-y-4">
      <style>{`
        @media print {
          @page { size: A4 ${orientation}; margin: 0; }
          body * { visibility: hidden; }
          #nt-print, #nt-print * { visibility: visible; }
          #nt-print { position: absolute; left: 0; top: 0; width: 100%; }
          .nt-page { page-break-after: always; }
          .nt-page:last-child { page-break-after: auto; }
        }
      `}</style>

      <div className="card space-y-3 print:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("from")}</span>
            <input type="number" value={from} onChange={(e) => setFrom(parseInt(e.target.value, 10) || 0)} className="input" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("to")}</span>
            <input type="number" value={to} onChange={(e) => setTo(parseInt(e.target.value, 10) || 0)} className="input" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("cols")}: {cols}</span>
            <input type="range" min={1} max={12} value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10))} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>{t("rows")}: {rows}</span>
            <input type="range" min={1} max={16} value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10))} />
          </label>
        </div>

        {/* Cut order — matters as soon as there is more than one sheet */}
        <div className="text-sm">
          <div className="mb-1">{t("order")}</div>
          <div className="flex flex-wrap gap-2">
            {(["stack", "sequential"] as Order[]).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOrder(o)}
                className={`px-3 py-1.5 rounded-lg border ${order === o ? "border-brand-600 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300" : "border-gray-300 dark:border-gray-700 hover:border-gray-400"}`}
              >
                {o === "stack" ? t("orderStack") : t("orderSequential")}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-muted">
            {order === "stack"
              ? pile1 && pile2
                ? t("orderStackHint", { pages: pageCount, a: renderNum(pile1[0]), b: renderNum(pile1[1]), c: renderNum(pile2[0]), d: renderNum(pile2[1]) })
                : t("orderStackHintShort", { pages: pageCount })
              : t("orderSequentialHint")}
          </p>
        </div>

        <details className="rounded border border-gray-200 dark:border-gray-700">
          <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
          <div className="p-3 pt-1 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("prefix")}</span>
                <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="No." className="input" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("suffix")}</span>
                <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="번" className="input" />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("padDigits")}: {padDigits === 0 ? t("padNone") : padDigits}</span>
                <input type="range" min={0} max={6} value={padDigits} onChange={(e) => setPadDigits(parseInt(e.target.value, 10))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("orientation")}</span>
                <select value={orientation} onChange={(e) => setOrientation(e.target.value as Orientation)} className="input">
                  <option value="portrait">{t("portrait")}</option>
                  <option value="landscape">{t("landscape")}</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("background")}</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-10 h-9 rounded cursor-pointer border border-gray-300" />
                  <span className="font-mono text-xs">{bg}</span>
                </div>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("textColor")}</span>
                <div className="flex items-center gap-2">
                  <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-10 h-9 rounded cursor-pointer border border-gray-300" />
                  <span className="font-mono text-xs">{fg}</span>
                </div>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("fontPct")}: {fontPct}%</span>
                <input type="range" min={20} max={80} value={fontPct} onChange={(e) => setFontPct(parseInt(e.target.value, 10))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("radius")}: {radius}px</span>
                <input type="range" min={0} max={48} value={radius} onChange={(e) => setRadius(parseInt(e.target.value, 10))} />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("marginMm")}: {margin}mm</span>
                <input type="range" min={0} max={20} value={margin} onChange={(e) => setMargin(parseInt(e.target.value, 10))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>{t("gapMm")}: {gap}mm</span>
                <input type="range" min={0} max={10} value={gap} onChange={(e) => setGap(parseInt(e.target.value, 10))} />
              </label>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-muted">{t("perPage")}</span>
                <div className="font-semibold">{tagsPerA4Hint} {t("tagsUnit")}</div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-muted">{t("pages")}</span>
                <div className="font-semibold">{pageCount} {t("pagesUnit")} ({numbers.length} {t("tagsUnit")})</div>
              </div>
            </div>

            <button onClick={print} disabled={numbers.length === 0} className="btn btn-secondary">🖨 {t("print")}</button>
          </div>
        </details>

        <div className="flex flex-wrap gap-2">
          <button onClick={downloadPdf} disabled={busy || numbers.length === 0} className="btn btn-primary">
            {busy ? "⏳ " + t("generating") : "📄 " + t("downloadPdf")}
          </button>
        </div>
        <p className="text-xs text-muted">{t("hint")}</p>
      </div>

      <div ref={previewBoxRef} className="card print:hidden">
        <div className="text-sm font-medium mb-2">{t("preview")} ({t("page")} 1/{pageCount})</div>
        <div className="overflow-auto">
          <div
            style={{
              width: `${a4w * scale}px`,
              height: `${a4h * scale}px`,
              transform: `scale(1)`,
              background: "#ffffff",
              padding: `${mmToPx(margin) * scale}px`,
              boxSizing: "border-box",
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: `${mmToPx(gap) * scale}px`,
              border: "1px solid #d1d5db",
            }}
          >
            {previewCells.map((n, i) => n === null ? <div key={`blank-${i}`} /> : (
              <div
                key={n}
                style={{
                  background: bg,
                  color: fg,
                  borderRadius: `${radius * scale}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  lineHeight: 1,
                  textAlign: "center",
                  fontSize: `${previewFontPx * scale}px`,
                  overflow: "hidden",
                  padding: "4%",
                }}
              >
                <span>{renderNum(n)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print-only: full multi-page layout */}
      <div id="nt-print" className="hidden print:block">
        {Array.from({ length: pageCount }).map((_, p) => {
          const cells = pageNumbers(p);
          return (
            <div
              key={p}
              className="nt-page"
              style={{
                width: `${A4_MM[orientation].w}mm`,
                height: `${A4_MM[orientation].h}mm`,
                padding: `${margin}mm`,
                boxSizing: "border-box",
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: `${gap}mm`,
                background: "#fff",
              }}
            >
              {cells.map((n, i) => n === null ? <div key={`blank-${i}`} /> : (
                <div
                  key={n}
                  style={{
                    background: bg,
                    color: fg,
                    borderRadius: `${radius}px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: `${(Math.min(...mmCellSize(cols, rows, margin, gap, orientation)) * (fontPct / 100))}mm` }}>
                    {renderNum(n)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function mmToPx(mm: number): number {
  return (mm / 25.4) * 96; // 96 dpi
}

function mmCellSize(cols: number, rows: number, margin: number, gap: number, orientation: Orientation): [number, number] {
  const { w, h } = A4_MM[orientation];
  const innerW = w - 2 * margin - (cols - 1) * gap;
  const innerH = h - 2 * margin - (rows - 1) * gap;
  return [innerW / cols, innerH / rows];
}
