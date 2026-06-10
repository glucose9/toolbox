// Shared client-side tool-search index used by the header SearchBar and the
// home-page HomeSearch. Supports Korean 초성 search (ㅂㅋ → 바코드), multi-token
// AND matching, and simple prefix/word-boundary ranking.

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

export type IndexedTool = {
  tool: ToolConfig;
  title: string; // visible (translated) title
  hay: string; // lowercased combined searchable text
  cho: string; // 초성 of the visible title (for ㅂㅋ → 바코드)
  category: string;
};

type TFn = (k: string, params?: Record<string, unknown>, options?: { fallback?: string }) => string;

export function buildIndex(toolsList: ToolConfig[], tFn: TFn): IndexedTool[] {
  return toolsList.map((tool) => {
    const title = tFn(`tools.${tool.slug}`, {}, { fallback: tool.navTitle });
    const h1 = tFn(`toolMeta.${tool.slug}.h1`, {}, { fallback: tool.h1 });
    const desc = tFn(`toolMeta.${tool.slug}.description`, {}, { fallback: tool.description });
    const category = tFn(`categories.${tool.category}`, {}, { fallback: categoryLabels[tool.category] || tool.category });
    const hay = [title, h1, desc, tool.slug, category, tool.navTitle, tool.title, tool.description]
      .join(" ")
      .toLowerCase();
    return { tool, title, hay, cho: toCho(title), category };
  });
}

function scoreMatch(item: IndexedTool, tokens: string[], rawQ: string, isCho: boolean): number {
  // Returns -1 for no match, lower is better.
  let score = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (isCho) {
      // initial-consonant search against the title's 초성
      if (!item.cho.includes(tok)) return -1;
    } else {
      if (!item.hay.includes(tok)) return -1;
    }
  }
  const t = item.title.toLowerCase();
  if (t === rawQ) score -= 100;
  else if (t.startsWith(rawQ)) score -= 50;
  else if (new RegExp(`\\b${rawQ.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(t)) score -= 20;
  else if (t.includes(rawQ)) score -= 10;
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
  const scored: { item: IndexedTool; score: number }[] = [];
  for (const item of index) {
    const s = scoreMatch(item, tokens, q, isCho);
    if (s !== -1) scored.push({ item, score: s });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.item.tool);
}
