"use client";

import { useEffect, useState, useMemo } from "react";
import QRCode from "qrcode";

type TabKey = "url" | "wifi" | "vcard" | "text";

const tabs: { key: TabKey; label: string }[] = [
  { key: "url", label: "URL" },
  { key: "wifi", label: "와이파이" },
  { key: "vcard", label: "명함" },
  { key: "text", label: "텍스트" },
];

function escapeVcard(s: string) {
  return s.replace(/[\\,;]/g, (m) => "\\" + m);
}

function escapeWifi(s: string) {
  return s.replace(/[\\;,":]/g, (m) => "\\" + m);
}

export default function QRTool({ config }: { config: Record<string, unknown> }) {
  const initialTab = (config.defaultTab as TabKey) || "url";
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [values, setValues] = useState<Record<string, string>>({
    url: "",
    text: "",
    ssid: "",
    password: "",
    encryption: "WPA",
    name: "",
    org: "",
    title: "",
    phone: "",
    email: "",
    website: "",
  });
  const [dataUrl, setDataUrl] = useState("");
  const [svg, setSvg] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const qrText = useMemo(() => {
    switch (tab) {
      case "url":
        return values.url.trim();
      case "text":
        return values.text;
      case "wifi": {
        if (!values.ssid) return "";
        const enc = values.encryption || "WPA";
        return `WIFI:T:${enc};S:${escapeWifi(values.ssid)};P:${escapeWifi(values.password)};;`;
      }
      case "vcard": {
        if (!values.name) return "";
        const lines = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${escapeVcard(values.name)}`,
          values.org && `ORG:${escapeVcard(values.org)}`,
          values.title && `TITLE:${escapeVcard(values.title)}`,
          values.phone && `TEL;TYPE=CELL:${values.phone}`,
          values.email && `EMAIL:${values.email}`,
          values.website && `URL:${values.website}`,
          "END:VCARD",
        ].filter(Boolean) as string[];
        return lines.join("\n");
      }
    }
  }, [tab, values]);

  useEffect(() => {
    if (!qrText) {
      setDataUrl("");
      setSvg("");
      return;
    }
    const opts = {
      width: 480,
      margin: 2,
      errorCorrectionLevel: "M" as const,
      color: { dark: fgColor, light: bgColor },
    };
    QRCode.toDataURL(qrText, opts).then(setDataUrl).catch(() => setDataUrl(""));
    QRCode.toString(qrText, { ...opts, type: "svg" }).then(setSvg).catch(() => setSvg(""));
  }, [qrText, fgColor, bgColor]);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-${tab}-${Date.now()}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${tab}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              tab === t.key
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {tab === "url" && (
            <div>
              <label className="label">URL 주소</label>
              <input
                className="input"
                type="url"
                placeholder="https://example.com"
                value={values.url}
                onChange={update("url")}
              />
            </div>
          )}

          {tab === "text" && (
            <div>
              <label className="label">텍스트 내용</label>
              <textarea
                className="input min-h-[120px]"
                placeholder="QR로 만들 텍스트"
                value={values.text}
                onChange={update("text")}
              />
            </div>
          )}

          {tab === "wifi" && (
            <>
              <div>
                <label className="label">와이파이 이름 (SSID)</label>
                <input className="input" value={values.ssid} onChange={update("ssid")} placeholder="MyWiFi" />
              </div>
              <div>
                <label className="label">비밀번호</label>
                <input className="input" value={values.password} onChange={update("password")} />
              </div>
              <div>
                <label className="label">암호화 방식</label>
                <select className="input" value={values.encryption} onChange={update("encryption")}>
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">암호 없음</option>
                </select>
              </div>
            </>
          )}

          {tab === "vcard" && (
            <>
              <div>
                <label className="label">이름 *</label>
                <input className="input" value={values.name} onChange={update("name")} />
              </div>
              <div>
                <label className="label">회사 / 소속</label>
                <input className="input" value={values.org} onChange={update("org")} />
              </div>
              <div>
                <label className="label">직책</label>
                <input className="input" value={values.title} onChange={update("title")} />
              </div>
              <div>
                <label className="label">전화번호</label>
                <input className="input" type="tel" value={values.phone} onChange={update("phone")} />
              </div>
              <div>
                <label className="label">이메일</label>
                <input className="input" type="email" value={values.email} onChange={update("email")} />
              </div>
              <div>
                <label className="label">웹사이트</label>
                <input className="input" type="url" value={values.website} onChange={update("website")} />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6 min-h-[280px]">
          {dataUrl ? (
            <>
              <img src={dataUrl} alt="QR Code" className="w-60 h-60 rounded" />
              <div className="mt-4 flex gap-2">
                <button onClick={downloadPng} className="btn btn-primary">PNG 다운로드</button>
                <button onClick={downloadSvg} className="btn btn-secondary">SVG 다운로드</button>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5">
                  <span>전경:</span>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-gray-300"
                  />
                </label>
                <label className="flex items-center gap-1.5">
                  <span>배경:</span>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-7 h-7 rounded cursor-pointer border border-gray-300"
                  />
                </label>
                <button
                  onClick={() => {
                    setFgColor("#000000");
                    setBgColor("#ffffff");
                  }}
                  className="text-brand-600 hover:underline"
                >
                  초기화
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center text-sm">
              왼쪽에 내용을 입력하면<br />QR코드가 여기에 표시됩니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
