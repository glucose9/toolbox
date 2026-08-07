"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import JsBarcode from "jsbarcode";

type Format = "CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14" | "ITF" | "MSI" | "pharmacode" | "codabar";

const FORMATS: { key: Format; label: string; placeholder: string; sample: string }[] = [
  { key: "CODE128", label: "Code 128", placeholder: "any text or digits", sample: "HELLO-1234" },
  { key: "EAN13", label: "EAN-13", placeholder: "12 digits (checksum auto)", sample: "880123456789" },
  { key: "EAN8", label: "EAN-8", placeholder: "7 digits (checksum auto)", sample: "1234567" },
  { key: "UPC", label: "UPC-A", placeholder: "11 digits (checksum auto)", sample: "01234567890" },
  { key: "CODE39", label: "Code 39", placeholder: "A-Z 0-9 - . space", sample: "CODE39" },
  { key: "ITF14", label: "ITF-14", placeholder: "13 digits (checksum auto)", sample: "1234567890123" },
  { key: "codabar", label: "Codabar", placeholder: "digits + A/B/C/D", sample: "A1234B" },
];

// ISBN-10 mod-11 check digit (weights 10..1, X = 10)
function isbn10ChecksumOk(raw: string): boolean {
  if (!/^\d{9}[\dXx]$/.test(raw)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(raw[i], 10) * (10 - i);
  const last = raw[9];
  sum += last === "X" || last === "x" ? 10 : parseInt(last, 10);
  return sum % 11 === 0;
}

function isbn10To13(isbn10: string): string {
  const digits = isbn10.replace(/[-\s]/g, "").slice(0, 9);
  if (!/^\d{9}$/.test(digits)) return "";
  const base = "978" + digits;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(base[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return base + check;
}

export default function BarcodeGeneratorTool({ config }: { config: Record<string, unknown> }) {
  const t = useTranslations("toolUI.barcode-generator");
  const tc = useTranslations("common");
  const initial = (config.defaultFormat as Format) || "CODE128";
  const isIsbn = config.isbn === true;
  const [format, setFormat] = useState<Format>(initial);
  const [value, setValue] = useState<string>(() => {
    if (isIsbn) return "9788937462788";
    return FORMATS.find((f) => f.key === initial)?.sample || "HELLO-1234";
  });
  const [showText, setShowText] = useState(true);
  const [bg, setBg] = useState("#ffffff");
  const [fg, setFg] = useState("#000000");
  const [error, setError] = useState<string>("");
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const effectiveValue = isIsbn ? toIsbnInput(value) : value;
  const isbnRaw = value.replace(/[-\s]/g, "");
  const isbnInvalid = isIsbn && /^\d{9}[\dXx]$/.test(isbnRaw) && !isbn10ChecksumOk(isbnRaw);

  useEffect(() => {
    if (!svgRef.current) return;
    if (!effectiveValue) {
      setError("");
      svgRef.current.innerHTML = "";
      const cv = canvasRef.current;
      if (cv) cv.getContext("2d")?.clearRect(0, 0, cv.width, cv.height);
      return;
    }
    if (isbnInvalid) {
      setError(t("invalidIsbn"));
      return;
    }
    const opts = {
      format,
      displayValue: showText,
      background: bg,
      lineColor: fg,
      width: 2,
      height: 100,
      margin: 10,
      font: "monospace",
      fontSize: 18,
    };
    try {
      JsBarcode(svgRef.current, effectiveValue, opts);
      if (canvasRef.current) JsBarcode(canvasRef.current, effectiveValue, opts);
      setError("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  }, [effectiveValue, isbnInvalid, format, showText, bg, fg, t]);

  function toIsbnInput(v: string): string {
    const raw = v.replace(/[-\s]/g, "");
    if (/^\d{13}$/.test(raw)) return raw;
    if (/^\d{10}$/.test(raw) || /^\d{9}[\dX]$/i.test(raw)) {
      const converted = isbn10To13(raw);
      if (converted) return converted;
    }
    if (/^\d{12}$/.test(raw)) return raw;
    return raw;
  }

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${format.toLowerCase()}-${Date.now()}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgRef.current) return;
    const data = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barcode-${format.toLowerCase()}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sample = FORMATS.find((f) => f.key === format) || FORMATS[0];

  return (
    <div className="card">
      {!isIsbn && (
        <div className="flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700 mb-4">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFormat(f.key);
                setValue(f.sample);
              }}
              className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
                format === f.key
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="label">{t("input")}</label>
            <input
              className="input font-mono"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={isIsbn ? "ISBN 10 or 13 (e.g. 9788937462788)" : sample.placeholder}
            />
            {!isIsbn && (
              <p className="mt-1 text-xs text-muted">{t("formatHint")}: {sample.placeholder}</p>
            )}
            {isIsbn && (
              <p className="mt-1 text-xs text-muted">{t("isbnHint")}</p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showText}
              onChange={(e) => setShowText(e.target.checked)}
            />
            <span>{t("showText")}</span>
          </label>

          <details className="rounded border border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer px-3 py-2 text-sm font-medium">{tc("advancedOptions")}</summary>
            <div className="p-3 pt-1">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <label className="flex items-center gap-2">
                  <span>{t("foreground")}</span>
                  <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-7 h-7 rounded cursor-pointer border border-gray-300" />
                </label>
                <label className="flex items-center gap-2">
                  <span>{t("background")}</span>
                  <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-7 h-7 rounded cursor-pointer border border-gray-300" />
                </label>
              </div>
            </div>
          </details>

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-6 min-h-[260px]">
          <svg ref={svgRef} className={`max-w-full ${error ? "hidden" : ""}`} />
          <canvas ref={canvasRef} className="hidden" />
          {!error && effectiveValue && (
            <div className="mt-4 flex gap-2">
              <button onClick={downloadPng} className="btn btn-primary">{t("downloadPng")}</button>
              <button onClick={downloadSvg} className="btn btn-secondary">{t("downloadSvg")}</button>
            </div>
          )}
          {error && (
            <div className="text-sm text-muted text-center">{t("invalidInput")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
