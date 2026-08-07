import type { MetadataRoute } from "next";
import { tools, SITE_URL, NOINDEX_SLUGS } from "@/lib/tools";
import { CATEGORY_INTRO } from "@/lib/category-content";
import { KITS } from "@/lib/kits";

// Korean-only sitemap (2026-08): non-ko locales are served for users but
// noindexed (see app/[locale]/layout.tsx) while the site recovers from a
// scaled-content demotion, so their URLs don't belong here. NOINDEX_SLUGS
// are likewise excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  // Stable release date instead of build time: a fresh `new Date()` on every
  // build stamped every URL as modified each deploy, which destroys the lastmod
  // trust signal. Bump this when content meaningfully changes.
  const lastModified = new Date("2026-08-08");
  const entries: MetadataRoute.Sitemap = [];

  entries.push({ url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 });

  for (const cat of Object.keys(CATEGORY_INTRO)) {
    entries.push({
      url: `${SITE_URL}/category/${cat}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  entries.push({ url: `${SITE_URL}/kits`, lastModified, changeFrequency: "weekly", priority: 0.8 });
  for (const kit of KITS) {
    entries.push({
      url: `${SITE_URL}/kits/${kit.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const t of tools) {
    if (NOINDEX_SLUGS.has(t.slug)) continue;
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
