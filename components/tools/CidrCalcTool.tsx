"use client";

import { useMemo, useState } from "react";

function ipToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const v = parseInt(p, 10);
    if (Number.isNaN(v) || v < 0 || v > 255) return null;
    n = (n * 256 + v) >>> 0;
  }
  return n;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

export default function CidrCalcTool() {
  const [input, setInput] = useState("192.168.0.0/24");

  const result = useMemo(() => {
    const m = input.trim().match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
    if (!m) return { error: "예: 192.168.0.0/24 형식으로 입력" };
    const ip = ipToInt(m[1]);
    const prefix = parseInt(m[2], 10);
    if (ip === null || prefix < 0 || prefix > 32) return { error: "잘못된 IP 또는 prefix" };

    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const totalHosts = 2 ** (32 - prefix);
    const usable = prefix >= 31 ? totalHosts : Math.max(0, totalHosts - 2);
    const wildcard = ~mask >>> 0;
    return {
      ip: intToIp(ip),
      prefix,
      mask: intToIp(mask),
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      firstHost: prefix < 31 ? intToIp(network + 1) : intToIp(network),
      lastHost: prefix < 31 ? intToIp(broadcast - 1) : intToIp(broadcast),
      total: totalHosts,
      usable,
      wildcard: intToIp(wildcard),
      binary: mask.toString(2).padStart(32, "0").match(/.{8}/g)!.join("."),
      error: "",
    };
  }, [input]);

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">IPv4/CIDR</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-base font-mono"
        />
      </div>

      {result.error ? (
        <div className="text-sm text-red-600">{result.error}</div>
      ) : (
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="py-2 pr-3 text-muted">네트워크</td><td className="font-mono">{result.network}/{result.prefix}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">브로드캐스트</td><td className="font-mono">{result.broadcast}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">서브넷 마스크</td><td className="font-mono">{result.mask}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">와일드카드</td><td className="font-mono">{result.wildcard}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">마스크 (2진)</td><td className="font-mono text-xs">{result.binary}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">첫 호스트</td><td className="font-mono">{result.firstHost}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">마지막 호스트</td><td className="font-mono">{result.lastHost}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">총 주소 수</td><td className="font-mono">{result.total!.toLocaleString()}</td></tr>
            <tr><td className="py-2 pr-3 text-muted">사용 가능 호스트</td><td className="font-mono">{result.usable!.toLocaleString()}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
