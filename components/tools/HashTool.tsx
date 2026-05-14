"use client";

import { useEffect, useState } from "react";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";
const ALGOS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

function buf2hex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function md5(input: Uint8Array): string {
  function add32(a: number, b: number) {
    return (a + b) & 0xffffffff;
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn((b & c) | (~b & d), a, b, x, s, t);
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn((b & d) | (c & ~d), a, b, x, s, t);
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(b ^ c ^ d, a, b, x, s, t);
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) =>
    cmn(c ^ (b | ~d), a, b, x, s, t);

  const n = input.length;
  const padded = new Uint8Array(((n + 8) >>> 6) * 64 + 64);
  padded.set(input);
  padded[n] = 0x80;
  const bits = n * 8;
  padded[padded.length - 8] = bits & 0xff;
  padded[padded.length - 7] = (bits >>> 8) & 0xff;
  padded[padded.length - 6] = (bits >>> 16) & 0xff;
  padded[padded.length - 5] = (bits >>> 24) & 0xff;

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < padded.length; i += 64) {
    const x = new Array<number>(16);
    for (let j = 0; j < 16; j++) {
      x[j] =
        padded[i + j * 4] |
        (padded[i + j * 4 + 1] << 8) |
        (padded[i + j * 4 + 2] << 16) |
        (padded[i + j * 4 + 3] << 24);
    }
    const oa = a, ob = b, oc = c, od = d;
    a = ff(a, b, c, d, x[0], 7, -680876936); d = ff(d, a, b, c, x[1], 12, -389564586); c = ff(c, d, a, b, x[2], 17, 606105819); b = ff(b, c, d, a, x[3], 22, -1044525330);
    a = ff(a, b, c, d, x[4], 7, -176418897); d = ff(d, a, b, c, x[5], 12, 1200080426); c = ff(c, d, a, b, x[6], 17, -1473231341); b = ff(b, c, d, a, x[7], 22, -45705983);
    a = ff(a, b, c, d, x[8], 7, 1770035416); d = ff(d, a, b, c, x[9], 12, -1958414417); c = ff(c, d, a, b, x[10], 17, -42063); b = ff(b, c, d, a, x[11], 22, -1990404162);
    a = ff(a, b, c, d, x[12], 7, 1804603682); d = ff(d, a, b, c, x[13], 12, -40341101); c = ff(c, d, a, b, x[14], 17, -1502002290); b = ff(b, c, d, a, x[15], 22, 1236535329);

    a = gg(a, b, c, d, x[1], 5, -165796510); d = gg(d, a, b, c, x[6], 9, -1069501632); c = gg(c, d, a, b, x[11], 14, 643717713); b = gg(b, c, d, a, x[0], 20, -373897302);
    a = gg(a, b, c, d, x[5], 5, -701558691); d = gg(d, a, b, c, x[10], 9, 38016083); c = gg(c, d, a, b, x[15], 14, -660478335); b = gg(b, c, d, a, x[4], 20, -405537848);
    a = gg(a, b, c, d, x[9], 5, 568446438); d = gg(d, a, b, c, x[14], 9, -1019803690); c = gg(c, d, a, b, x[3], 14, -187363961); b = gg(b, c, d, a, x[8], 20, 1163531501);
    a = gg(a, b, c, d, x[13], 5, -1444681467); d = gg(d, a, b, c, x[2], 9, -51403784); c = gg(c, d, a, b, x[7], 14, 1735328473); b = gg(b, c, d, a, x[12], 20, -1926607734);

    a = hh(a, b, c, d, x[5], 4, -378558); d = hh(d, a, b, c, x[8], 11, -2022574463); c = hh(c, d, a, b, x[11], 16, 1839030562); b = hh(b, c, d, a, x[14], 23, -35309556);
    a = hh(a, b, c, d, x[1], 4, -1530992060); d = hh(d, a, b, c, x[4], 11, 1272893353); c = hh(c, d, a, b, x[7], 16, -155497632); b = hh(b, c, d, a, x[10], 23, -1094730640);
    a = hh(a, b, c, d, x[13], 4, 681279174); d = hh(d, a, b, c, x[0], 11, -358537222); c = hh(c, d, a, b, x[3], 16, -722521979); b = hh(b, c, d, a, x[6], 23, 76029189);
    a = hh(a, b, c, d, x[9], 4, -640364487); d = hh(d, a, b, c, x[12], 11, -421815835); c = hh(c, d, a, b, x[15], 16, 530742520); b = hh(b, c, d, a, x[2], 23, -995338651);

    a = ii(a, b, c, d, x[0], 6, -198630844); d = ii(d, a, b, c, x[7], 10, 1126891415); c = ii(c, d, a, b, x[14], 15, -1416354905); b = ii(b, c, d, a, x[5], 21, -57434055);
    a = ii(a, b, c, d, x[12], 6, 1700485571); d = ii(d, a, b, c, x[3], 10, -1894986606); c = ii(c, d, a, b, x[10], 15, -1051523); b = ii(b, c, d, a, x[1], 21, -2054922799);
    a = ii(a, b, c, d, x[8], 6, 1873313359); d = ii(d, a, b, c, x[15], 10, -30611744); c = ii(c, d, a, b, x[6], 15, -1560198380); b = ii(b, c, d, a, x[13], 21, 1309151649);
    a = ii(a, b, c, d, x[4], 6, -145523070); d = ii(d, a, b, c, x[11], 10, -1120210379); c = ii(c, d, a, b, x[2], 15, 718787259); b = ii(b, c, d, a, x[9], 21, -343485551);

    a = add32(a, oa); b = add32(b, ob); c = add32(c, oc); d = add32(d, od);
  }

  const out = new Uint8Array(16);
  [a, b, c, d].forEach((v, i) => {
    out[i * 4] = v & 0xff;
    out[i * 4 + 1] = (v >>> 8) & 0xff;
    out[i * 4 + 2] = (v >>> 16) & 0xff;
    out[i * 4 + 3] = (v >>> 24) & 0xff;
  });
  return [...out].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function digest(algo: Algorithm, data: Uint8Array): Promise<string> {
  if (algo === "MD5") return md5(data);
  const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  const buf = await crypto.subtle.digest(algo, ab as ArrayBuffer);
  return buf2hex(buf);
}

export default function HashTool() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string>("");

  useEffect(() => {
    if (mode !== "text") return;
    const bytes = new TextEncoder().encode(text);
    let cancelled = false;
    (async () => {
      const out: Record<string, string> = {};
      for (const a of ALGOS) {
        out[a] = await digest(a, bytes);
        if (cancelled) return;
      }
      if (!cancelled) setHashes(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [text, mode]);

  const hashFile = async (f: File) => {
    setBusy(true);
    try {
      const buf = await f.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const out: Record<string, string> = {};
      for (const a of ALGOS) out[a] = await digest(a, bytes);
      setHashes(out);
    } finally {
      setBusy(false);
    }
  };

  const copy = async (key: string) => {
    await navigator.clipboard.writeText(hashes[key]);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => { setMode("text"); setHashes({}); }} className={`btn ${mode === "text" ? "btn-primary" : "btn-secondary"}`}>텍스트</button>
        <button onClick={() => { setMode("file"); setHashes({}); }} className={`btn ${mode === "file" ? "btn-primary" : "btn-secondary"}`}>파일</button>
      </div>

      {mode === "text" ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="해시할 텍스트"
          className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
        />
      ) : (
        <div>
          <input
            type="file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                hashFile(f);
              }
            }}
            className="w-full"
          />
          {file && <div className="text-xs text-muted mt-1">{file.name}</div>}
          {busy && <div className="text-sm text-muted mt-2">계산 중...</div>}
        </div>
      )}

      <div className="space-y-2">
        {ALGOS.map((a) => (
          <div key={a} className="flex items-center gap-2">
            <div className="text-xs font-semibold w-20 shrink-0">{a}</div>
            <input
              readOnly
              value={hashes[a] || ""}
              className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded text-xs font-mono bg-gray-50 dark:bg-gray-900"
            />
            <button
              onClick={() => copy(a)}
              disabled={!hashes[a]}
              className="text-sm text-brand-600 hover:underline disabled:opacity-30 shrink-0"
            >
              {copied === a ? "✓" : "복사"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
