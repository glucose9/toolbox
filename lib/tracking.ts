"use client";

const RECENT_KEY = "barokit_recent";
const FAVORITES_KEY = "barokit_favorites";
const USAGE_KEY = "barokit_usage";
const MAX_RECENT = 8;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("barokit-storage"));
  } catch {}
}

export function trackUse(slug: string) {
  const recent = read<string[]>(RECENT_KEY, []);
  const next = [slug, ...recent.filter((s) => s !== slug)].slice(0, MAX_RECENT);
  write(RECENT_KEY, next);

  const usage = read<Record<string, number>>(USAGE_KEY, {});
  usage[slug] = (usage[slug] || 0) + 1;
  write(USAGE_KEY, usage);
}

export function getRecent(): string[] {
  return read<string[]>(RECENT_KEY, []);
}

export function getUsage(slug?: string): number | Record<string, number> {
  const u = read<Record<string, number>>(USAGE_KEY, {});
  return slug ? u[slug] || 0 : u;
}

export function getFavorites(): string[] {
  return read<string[]>(FAVORITES_KEY, []);
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const fav = getFavorites();
  if (fav.includes(slug)) {
    write(FAVORITES_KEY, fav.filter((s) => s !== slug));
    return false;
  }
  write(FAVORITES_KEY, [slug, ...fav]);
  return true;
}
