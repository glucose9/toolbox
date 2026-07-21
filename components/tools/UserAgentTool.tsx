"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function parse(ua: string) {
  const browsers = [
    { name: "Edge", re: /Edg\/([\d.]+)/ },
    { name: "Opera", re: /OPR\/([\d.]+)/ },
    { name: "Chrome", re: /Chrome\/([\d.]+)/ },
    { name: "Firefox", re: /Firefox\/([\d.]+)/ },
    { name: "Safari", re: /Version\/([\d.]+).*Safari/ },
  ];
  const oss = [
    // Windows 10 and 11 both report "Windows NT 10.0" (UA freeze).
    { name: "Windows 10/11", re: /Windows NT 10.0/ },
    { name: "macOS", re: /Mac OS X ([\d_]+)/ },
    { name: "Android", re: /Android ([\d.]+)/ },
    { name: "iOS", re: /OS ([\d_]+) like Mac/ },
    { name: "Linux", re: /Linux/ },
  ];
  const devices = [
    // Android tablets carry "Android" without the "Mobile" token, so check
    // tablets before phones.
    { name: "Tablet", re: /iPad|Tablet|Android(?!.*Mobile)/ },
    { name: "Mobile", re: /Mobi|iPhone/ },
    { name: "Desktop", re: /./ },
  ];
  let browser = "Unknown", os = "Unknown", device = "Unknown";
  for (const b of browsers) { const m = ua.match(b.re); if (m) { browser = `${b.name} ${m[1]}`; break; } }
  for (const o of oss) { const m = ua.match(o.re); if (m) { os = o.name + (m[1] ? ` ${m[1].replace(/_/g, ".")}` : ""); break; } }
  for (const d of devices) { if (d.re.test(ua)) { device = d.name; break; } }
  return { browser, os, device };
}

export default function UserAgentTool() {
  const t = useTranslations("toolUI.user-agent");
  const [ua, setUa] = useState("");
  useEffect(() => { setUa(navigator.userAgent); }, []);
  const info = parse(ua);
  return (
    <div className="card space-y-3">
      <textarea value={ua} onChange={(e) => setUa(e.target.value)} className="w-full h-24 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-xs font-mono resize-y" />
      <table className="w-full text-sm">
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr><td className="py-2 pr-3 text-muted">{t("browser")}</td><td className="font-mono">{info.browser}</td></tr>
          <tr><td className="py-2 pr-3 text-muted">{t("os")}</td><td className="font-mono">{info.os}</td></tr>
          <tr><td className="py-2 pr-3 text-muted">{t("device")}</td><td className="font-mono">{info.device}</td></tr>
        </tbody>
      </table>
    </div>
  );
}
