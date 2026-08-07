// Notifies IndexNow-participating search engines (Naver, Bing, Yandex, ...)
// about our indexable URLs. Naver has supported IndexNow since 2023-07 — this
// is how we request collection without the Search Advisor console.
//
// The key file lives at public/<key>.txt (deployed before pinging).
// Run after a deploy that changes indexable content:
//   node scripts/indexnow-ping.mjs
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOST = "barokit.com";

const keyFile = fs.readdirSync(path.join(ROOT, "public")).find((f) => /^[0-9a-f]{16,128}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file missing in public/");
const key = keyFile.replace(/\.txt$/, "");

// Derive the URL list from the live sitemap — single source of truth.
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length < 10) throw new Error("sitemap parse suspiciously small: " + urls.length);
console.log(`pinging ${urls.length} URLs for ${HOST} (key ${key.slice(0, 8)}…)`);

const body = JSON.stringify({
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList: urls,
});

for (const endpoint of ["https://api.indexnow.org/indexnow", "https://searchadvisor.naver.com/indexnow"]) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    console.log(endpoint, "→", res.status, res.statusText);
  } catch (e) {
    console.log(endpoint, "→ FAILED:", String(e.message).slice(0, 120));
  }
}
