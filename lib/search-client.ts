// Shared client-side tool-search index used by the header SearchBar and the
// home-page HomeSearch. Supports Korean 초성 search (ㅂㅋ → 바코드), multi-token
// AND matching, space-insensitive matching/ranking (pdf합치기 == pdf 합치기),
// and colloquial synonyms (움짤, 큐알, 누끼, ...).

import { categoryLabels, type ToolConfig } from "@/lib/tools";

// Korean 초성(initial consonant) for a Hangul syllable, returns the char itself otherwise.
const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
export function toCho(s: string): string {
  let out = "";
  for (const c of s) {
    const code = c.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      out += CHO[Math.floor((code - 0xac00) / 588)];
    } else if (CHO.includes(c)) {
      out += c;
    } else {
      out += c.toLowerCase();
    }
  }
  return out;
}

export const HANGUL_CHO_ONLY = /^[ㄱ-ㅎ\s]+$/;

// Colloquial words Koreans actually type that appear nowhere in the tool copy.
// Search vocabulary lives here (not in tools.ts) — extend from Search Console
// query data as real zero-result queries surface.
const SEARCH_KEYWORDS: Record<string, string[]> = {
  "video-to-gif": ["움짤", "움짤 만들기", "gif 만들기"],
  "gif-to-mp4": ["움짤 변환"],
  qr: ["큐알", "큐알코드", "qr코드 만들기"],
  "qr-wifi": ["와이파이 큐알"],
  "qr-vcard": ["명함 큐알"],
  "qr-decoder": ["큐알 스캔", "큐알 읽기"],
  "qr-logo": ["큐알"],
  "qr-text": ["큐알"],
  "hwp-viewer": ["한글파일", "한컴", "아래아한글"],
  "hwp-to-text": ["한글파일"],
  "hwp-to-pdf": ["한글파일", "한컴"],
  "hwp-to-hwpx": ["한글파일"],
  "hwp-editor": ["한글파일", "한컴"],
  "json-formatter": ["제이슨"],
  "csv-to-json": ["제이슨"],
  "exif-viewer": ["지피에스", "위치정보", "사진 정보"],
  "image-exif-strip": ["위치정보 삭제", "지피에스"],
  "background-remover": ["누끼", "누끼따기", "배경 지우기"],
  "heic-to-jpg": ["아이폰 사진"],
  "video-to-mp3": ["음원 추출", "mp3 추출", "소리 추출"],
  "image-compress": ["사진 용량 줄이기"],
  "video-compress": ["동영상 용량 줄이기"],
  subtitle: ["자막"],
};

export type IndexedTool = {
  tool: ToolConfig;
  title: string; // visible (translated) title
  titleNs: string; // lowercased title with spaces stripped (ranking)
  hay: string; // lowercased combined searchable text
  hayNs: string; // hay with spaces stripped (Koreans type without spaces)
  cho: string; // 초성 of the visible title, spaces stripped (ㅂㅋ → 바코드)
  category: string;
};

type TFn = (k: string, params?: Record<string, unknown>, options?: { fallback?: string }) => string;

export function buildIndex(toolsList: ToolConfig[], tFn: TFn): IndexedTool[] {
  return toolsList.map((tool) => {
    const title = tFn(`tools.${tool.slug}`, {}, { fallback: tool.navTitle });
    const h1 = tFn(`toolMeta.${tool.slug}.h1`, {}, { fallback: tool.h1 });
    const desc = tFn(`toolMeta.${tool.slug}.description`, {}, { fallback: tool.description });
    const category = tFn(`categories.${tool.category}`, {}, { fallback: categoryLabels[tool.category] || tool.category });
    const keywords = (SEARCH_KEYWORDS[tool.slug] || []).join(" ");
    const hay = [title, h1, desc, tool.slug, category, tool.navTitle, tool.title, tool.description, keywords]
      .join(" ")
      .toLowerCase();
    return {
      tool,
      title,
      titleNs: title.toLowerCase().replace(/\s+/g, ""),
      hay,
      hayNs: hay.replace(/\s+/g, ""),
      cho: toCho(title).replace(/\s+/g, ""),
      category,
    };
  });
}

function scoreMatch(item: IndexedTool, tokens: string[], qNs: string, isCho: boolean): number {
  // Returns -1 for no match, lower is better.
  let score = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (isCho) {
      // initial-consonant search against the title's 초성
      if (!item.cho.includes(tok)) return -1;
    } else if (!item.hay.includes(tok) && !item.hayNs.includes(tok)) {
      // hayNs catches unspaced queries ("pdf합치기") against spaced copy
      return -1;
    }
  }
  // Space-insensitive ranking: "글자수" must rank 글자 수 세기 first even
  // though the title has spaces. (A \b word-boundary tier used to live here —
  // JS \b never matches Hangul, so it was dead code.)
  if (item.titleNs === qNs) score -= 100;
  else if (item.titleNs.startsWith(qNs)) score -= 50;
  else if (item.titleNs.includes(qNs)) score -= 20;
  // Per-token title hits so title matches always beat description-only hits.
  for (const tok of tokens) {
    if (tok && item.titleNs.includes(tok)) score -= 5;
  }
  return score;
}

// Run a query against the index. Empty query returns the first `emptyLimit` tools.
export function searchTools(
  index: IndexedTool[],
  query: string,
  limit = 20,
  emptyLimit = 6
): ToolConfig[] {
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, emptyLimit).map((i) => i.tool);
  const isCho = HANGUL_CHO_ONLY.test(query.trim());
  const tokens = q.split(/\s+/).filter(Boolean);
  const qNs = q.replace(/\s+/g, "");
  const scored: { item: IndexedTool; score: number }[] = [];
  for (const item of index) {
    const s = scoreMatch(item, tokens, qNs, isCho);
    if (s !== -1) scored.push({ item, score: s });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.item.tool);
}
