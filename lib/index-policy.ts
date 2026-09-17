// Index policy (2026-09, file-tool focus).
//
// The 2026-07 scaled-content demotion is a *site-level* quality judgment:
// Google weighs how much of what it indexes here is thin or duplicative.
// 277 tools × 4 locales with 96% carrying no real content was the problem.
// So only the defensible core — file tools (HWP / PDF / image / video /
// encoding) — plus pages backed by a real long-form article are indexed.
// Everything else stays live for users but is noindexed.
//
// Reversible: add a slug to INDEX_EXTRA_SLUGS to re-index it.
import { tools, type ToolConfig } from "@/lib/tools";
import { TOOL_ARTICLES } from "@/lib/tool-articles";

export const FILE_CATEGORIES: ReadonlySet<string> = new Set(["document", "pdf", "image", "video"]);

// Sit in a file category but are generators/calculators, not file tools.
const NON_FILE_IN_FILE_CATEGORIES = new Set([
  "number-tags",
  "teleprompter",
  "aspect-ratio-calculator",
  "color-blindness-simulator",
  "color-palette",
  "og-card",
  "text-card",
  "meme-generator",
  "kakaotalk-chat",
  "beat-maker",
]);

// File tools that live in the text/dev categories.
const FILE_TOOLS_ELSEWHERE = new Set([
  "encoding-convert",
  "file-split-join",
  "file-hash-verify",
  "file-to-base64",
  "base64-image",
]);

// Manual re-index escape hatch (proven non-file pages, etc.).
const INDEX_EXTRA_SLUGS = new Set<string>([]);

export function isFileTool(t: ToolConfig): boolean {
  if (FILE_CATEGORIES.has(t.category)) return !NON_FILE_IN_FILE_CATEGORIES.has(t.slug);
  return FILE_TOOLS_ELSEWHERE.has(t.slug);
}

export function isIndexableTool(t: ToolConfig): boolean {
  return isFileTool(t) || t.slug in TOOL_ARTICLES || INDEX_EXTRA_SLUGS.has(t.slug);
}

const bySlug = new Map(tools.map((t) => [t.slug, t]));
export function isIndexableSlug(slug: string): boolean {
  const t = bySlug.get(slug);
  return !!t && isIndexableTool(t);
}

export const indexableTools: ToolConfig[] = tools.filter(isIndexableTool);

// Kits whose every tool is a file tool.
export const INDEXED_KIT_SLUGS: ReadonlySet<string> = new Set(["pdf-conversion", "photo-cleanup", "youtube-creator"]);
