"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { loadKrWebFonts, krFallbackChain } from "@/lib/kr-fonts";

const A4_MM = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } };
const A4_PX = { portrait: { w: 794, h: 1123 }, landscape: { w: 1123, h: 794 } };

function fmt(n: number) {
  return n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

type SheetEntry = { name: string; html: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WS = any;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Normalize cell color from SheetJS style — handles rgb hex or theme/argb.
function colorToHex(c: { rgb?: string; theme?: number } | undefined): string | null {
  if (!c) return null;
  if (c.rgb) {
    // ARGB → strip alpha
    const v = c.rgb.length === 8 ? c.rgb.slice(2) : c.rgb;
    return "#" + v.toUpperCase();
  }
  return null;
}

function borderSide(b: { style?: string; color?: { rgb?: string } } | undefined): string {
  if (!b || !b.style || b.style === "none") return "none";
  const widthMap: Record<string, string> = {
    thin: "1px",
    medium: "2px",
    thick: "3px",
    dashed: "1px",
    dotted: "1px",
    double: "3px",
    hair: "0.5px",
  };
  const styleMap: Record<string, string> = {
    thin: "solid",
    medium: "solid",
    thick: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
    hair: "solid",
  };
  const width = widthMap[b.style] || "1px";
  const style = styleMap[b.style] || "solid";
  const color = colorToHex(b.color) || "#000";
  return `${width} ${style} ${color}`;
}

// Decode column reference (e.g. "A", "AB") to 0-based index.
function colRefToIndex(ref: string): number {
  let n = 0;
  for (let i = 0; i < ref.length; i++) {
    n = n * 26 + (ref.charCodeAt(i) - 64);
  }
  return n - 1;
}

function decodeAddr(addr: string): { c: number; r: number } {
  const m = addr.match(/^([A-Z]+)(\d+)$/);
  if (!m) return { c: 0, r: 0 };
  return { c: colRefToIndex(m[1]), r: parseInt(m[2], 10) - 1 };
}

// Build a styled HTML table from a worksheet, preserving cell styles, merges,
// column widths and row heights.
function buildStyledTable(ws: WS): string {
  if (!ws || !ws["!ref"]) return "<table></table>";

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // Use sheet ref to determine bounds.
  const ref: string = ws["!ref"];
  const [start, end] = ref.split(":");
  const s = decodeAddr(start);
  const e = decodeAddr(end || start);

  // Merges → map of "topleft" → {rs, cs}; map of "covered" → true
  const mergeRoot = new Map<string, { rs: number; cs: number }>();
  const covered = new Set<string>();
  const merges: { s: { c: number; r: number }; e: { c: number; r: number } }[] =
    ws["!merges"] || [];
  for (const m of merges) {
    const key = `${m.s.r}_${m.s.c}`;
    mergeRoot.set(key, { rs: m.e.r - m.s.r + 1, cs: m.e.c - m.s.c + 1 });
    for (let r = m.s.r; r <= m.e.r; r++) {
      for (let c = m.s.c; c <= m.e.c; c++) {
        if (!(r === m.s.r && c === m.s.c)) covered.add(`${r}_${c}`);
      }
    }
  }

  // Column widths: SheetJS `!cols[i].wpx` (pixel) or `.wch` (char). Default 64px.
  const cols: { wpx?: number; wch?: number }[] = ws["!cols"] || [];
  const colWidths: number[] = [];
  for (let c = s.c; c <= e.c; c++) {
    const cd = cols[c];
    if (cd?.wpx) colWidths.push(cd.wpx);
    else if (cd?.wch) colWidths.push(Math.round(cd.wch * 7 + 5));
    else colWidths.push(64);
  }

  // Row heights: !rows[i].hpx
  const rows: { hpx?: number; hpt?: number }[] = ws["!rows"] || [];

  const colNumberToRef = (n: number): string => {
    let s = "";
    let v = n + 1;
    while (v > 0) {
      const m = (v - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      v = Math.floor((v - 1) / 26);
    }
    return s;
  };

  let html = '<table class="xlsx-styled"><colgroup>';
  for (const w of colWidths) html += `<col style="width:${w}px;" />`;
  html += "</colgroup><tbody>";

  for (let r = s.r; r <= e.r; r++) {
    const rh = rows[r]?.hpx ?? (rows[r]?.hpt ? Math.round(rows[r]!.hpt! * 1.333) : null);
    html += rh ? `<tr style="height:${rh}px;">` : "<tr>";
    for (let c = s.c; c <= e.c; c++) {
      const key = `${r}_${c}`;
      if (covered.has(key)) continue;
      const addr = colNumberToRef(c) + (r + 1);
      const cell = ws[addr];
      const styles: string[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st: any = cell?.s;
      if (st) {
        // Fill (background)
        const bg =
          colorToHex(st.fill?.fgColor) ||
          colorToHex(st.fill?.bgColor);
        if (bg && bg !== "#000000") styles.push(`background-color:${bg}`);
        // Font
        if (st.font) {
          if (st.font.name) styles.push(`font-family:${krFallbackChain(st.font.name)}`);
          if (st.font.sz) styles.push(`font-size:${st.font.sz}px`);
          if (st.font.bold) styles.push("font-weight:700");
          if (st.font.italic) styles.push("font-style:italic");
          if (st.font.underline) styles.push("text-decoration:underline");
          const fc = colorToHex(st.font.color);
          if (fc) styles.push(`color:${fc}`);
        }
        // Alignment
        if (st.alignment) {
          if (st.alignment.horizontal)
            styles.push(`text-align:${st.alignment.horizontal}`);
          if (st.alignment.vertical) {
            const m: Record<string, string> = {
              top: "top",
              center: "middle",
              bottom: "bottom",
            };
            styles.push(`vertical-align:${m[st.alignment.vertical] || "middle"}`);
          }
          if (st.alignment.wrapText) styles.push("white-space:normal");
        }
        // Borders
        if (st.border) {
          const bt = borderSide(st.border.top);
          const br = borderSide(st.border.right);
          const bb = borderSide(st.border.bottom);
          const bl = borderSide(st.border.left);
          if (bt !== "none") styles.push(`border-top:${bt}`);
          if (br !== "none") styles.push(`border-right:${br}`);
          if (bb !== "none") styles.push(`border-bottom:${bb}`);
          if (bl !== "none") styles.push(`border-left:${bl}`);
        }
      }

      // Default border if none set
      if (!styles.some((x) => x.startsWith("border-"))) {
        styles.push("border:1px solid #d1d5db");
      }
      // Default vertical-align
      if (!styles.some((x) => x.startsWith("vertical-align"))) {
        styles.push("vertical-align:middle");
      }

      const styleAttr = styles.join(";");
      const mr = mergeRoot.get(key);
      const span =
        mr && (mr.rs > 1 || mr.cs > 1)
          ? ` rowspan="${mr.rs}" colspan="${mr.cs}"`
          : "";

      // Use formatted text (w) when available, else raw value (v).
      const display: string =
        cell?.w !== undefined
          ? String(cell.w)
          : cell?.v !== undefined
            ? String(cell.v)
            : "";
      html += `<td${span} style="${styleAttr};padding:4px 8px;">${escapeHtml(display)}</td>`;
    }
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}

export default function XlsxToPdfTool() {
  const t = useTranslations("toolUI.xlsx-to-pdf");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (f: File) => {
    if (!/\.(xlsx|xls|csv)$/i.test(f.name)) {
      setError(t("error") + ": .xlsx / .xls / .csv");
      return;
    }
    setError("");
    setFile(f);
    setBusy(true);
    setSheets([]);
    try {
      const XLSX = await import("xlsx");
      const buf = await f.arrayBuffer();
      // cellStyles: true pulls in fill/font/border/alignment etc. (xlsx only)
      const wb = XLSX.read(buf, { type: "array", cellStyles: true });
      const out: SheetEntry[] = [];
      for (const name of wb.SheetNames) {
        const ws = wb.Sheets[name];
        if (!ws) continue;
        // For CSV / non-styled files this still works because cell.s will be undefined.
        const html = buildStyledTable(ws);
        out.push({ name, html });
      }
      setSheets(out);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const renderSheetContainer = (sheet: SheetEntry): HTMLDivElement => {
    const wrap = document.createElement("div");
    wrap.style.position = "absolute";
    wrap.style.left = "-99999px";
    wrap.style.top = "0";
    wrap.style.background = "#ffffff";
    wrap.style.padding = "24px";
    wrap.style.boxSizing = "border-box";
    wrap.style.fontFamily =
      "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', system-ui, -apple-system, sans-serif";
    wrap.style.fontSize = "12px";
    wrap.style.color = "#111827";
    wrap.innerHTML = `
      <style>
        .xlsx-wrap table.xlsx-styled { border-collapse: collapse; width: max-content; }
        .xlsx-wrap table.xlsx-styled td { white-space: nowrap; }
        .xlsx-wrap .title { font-weight: 700; font-size: 14px; margin-bottom: 8px; }
      </style>
      <div class="xlsx-wrap">
        <div class="title">${escapeHtml(sheet.name)}</div>
        ${sheet.html}
      </div>
    `;
    return wrap;
  };

  const downloadPdf = async () => {
    if (!file || sheets.length === 0) return;
    setError("");
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
        loadKrWebFonts(),
      ]);

      let pdf: import("jspdf").jsPDF | null = null;

      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        const el = renderSheetContainer(sheet);
        document.body.appendChild(el);

        const rect = el.getBoundingClientRect();
        const ratio = rect.width / Math.max(1, rect.height);
        const orientation: "portrait" | "landscape" = ratio > 1.2 ? "landscape" : "portrait";

        const targetPx = A4_PX[orientation].w;
        const scale = Math.min(2, Math.max(0.5, targetPx / Math.max(1, rect.width)));

        let canvas: HTMLCanvasElement;
        try {
          canvas = await html2canvas(el, {
            backgroundColor: "#ffffff",
            scale: 2 * scale,
            logging: false,
          });
        } finally {
          document.body.removeChild(el);
        }

        if (!pdf) {
          pdf = new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
        } else {
          pdf.addPage("a4", orientation);
        }

        const pageW = A4_MM[orientation].w;
        const pageH = A4_MM[orientation].h;
        const pxPerMm = canvas.width / pageW;
        const pageHeightPx = Math.floor(pageH * pxPerMm);

        let yOffset = 0;
        let firstSlice = true;
        while (yOffset < canvas.height) {
          const sliceHeight = Math.min(pageHeightPx, canvas.height - yOffset);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;
          const ctx = pageCanvas.getContext("2d");
          if (!ctx) break;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
          const img = pageCanvas.toDataURL("image/jpeg", 0.92);
          if (!firstSlice) pdf.addPage("a4", orientation);
          const mmHeight = sliceHeight / pxPerMm;
          pdf.addImage(img, "JPEG", 0, 0, pageW, mmHeight);
          yOffset += sliceHeight;
          firstSlice = false;
        }
      }

      const outName = file.name.replace(/\.(xlsx|xls|csv)$/i, "") + ".pdf";
      pdf?.save(outName);
    } catch (e) {
      setError(t("error") + ": " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!file) {
    return (
      <div className="card">
        <div
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-5xl mb-3">📊</div>
          <div className="font-medium">{t("dropFile")}</div>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="text-xs text-muted leading-relaxed bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-2 rounded">
        ✨ {t("fidelityNote")}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm min-w-0">
          <div className="truncate font-medium">{file.name}</div>
          <div className="text-xs text-muted">
            {fmt(file.size)}
            {sheets.length > 0 && ` · ${t("sheetsFound", { count: sheets.length })}`}
          </div>
        </div>
        <button
          onClick={() => {
            setFile(null);
            setSheets([]);
            setError("");
          }}
          className="text-sm text-brand-600 hover:underline"
        >
          {t("dropFile")}
        </button>
      </div>

      {busy && <div className="py-2 text-sm text-muted">{t("processing")}</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {sheets.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            <button onClick={downloadPdf} disabled={busy} className="btn btn-primary">
              {busy ? t("processing") : t("downloadPdf")}
            </button>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-auto">
            {sheets.map((s, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div className="text-sm font-semibold mb-2">{s.name}</div>
                <div className="text-xs overflow-auto" dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
