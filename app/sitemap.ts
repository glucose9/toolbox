import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tools";
import { CATEGORY_INTRO } from "@/lib/category-content";
import { KITS } from "@/lib/kits";
import { indexableTools, FILE_CATEGORIES, INDEXED_KIT_SLUGS } from "@/lib/index-policy";

// Korean-only, file-tool-focused sitemap (2026-09). Non-ko locales are
// served for users but noindexed (app/[locale]/layout.tsx); which tools,
// categories and kits are indexed is decided in lib/index-policy.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  // Stable release date instead of build time: a fresh `new Date()` on every
  // build stamped every URL as modified each deploy, which destroys the lastmod
  // trust signal. Bump this when content meaningfully changes.
  const lastModified = new Date("2026-09-17");
  const entries: MetadataRoute.Sitemap = [];

  entries.push({ url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 });

  for (const cat of Object.keys(CATEGORY_INTRO)) {
    if (!FILE_CATEGORIES.has(cat)) continue;
    entries.push({
      url: `${SITE_URL}/category/${cat}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  entries.push({ url: `${SITE_URL}/kits`, lastModified, changeFrequency: "monthly", priority: 0.6 });
  for (const kit of KITS) {
    if (!INDEXED_KIT_SLUGS.has(kit.slug)) continue;
    entries.push({
      url: `${SITE_URL}/kits/${kit.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const t of indexableTools) {
    entries.push({
      url: `${SITE_URL}/tools/${t.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const p of ["about", "privacy", "terms"]) {
    entries.push({
      url: `${SITE_URL}/${p}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
