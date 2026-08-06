import type { MetadataRoute } from "next";
import { tools, SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";
import { CATEGORY_INTRO } from "@/lib/category-content";
import { KITS } from "@/lib/kits";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable release date instead of build time: a fresh `new Date()` on every
  // build stamped every URL as modified each deploy, which destroys the lastmod
  // trust signal. Bump this when content meaningfully changes.
  const lastModified = new Date("2026-08-01");
  const entries: MetadataRoute.Sitemap = [];
  const pfx = (locale: string, path: string) =>
    locale === routing.defaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;

  // Home pages
  for (const locale of routing.locales) {
    const url = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;
    entries.push({
      url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "x-default": SITE_URL,
          ko: SITE_URL,
          en: `${SITE_URL}/en`,
          ja: `${SITE_URL}/ja`,
          zh: `${SITE_URL}/zh`,
        },
      },
    });
  }

  // Category landing pages × locales
  for (const cat of Object.keys(CATEGORY_INTRO)) {
    for (const locale of routing.locales) {
      entries.push({
        url: pfx(locale, `/category/${cat}`),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: {
            "x-default": `${SITE_URL}/category/${cat}`,
            ko: `${SITE_URL}/category/${cat}`,
            en: `${SITE_URL}/en/category/${cat}`,
            ja: `${SITE_URL}/ja/category/${cat}`,
            zh: `${SITE_URL}/zh/category/${cat}`,
          },
        },
      });
    }
  }

  // Kit pages (index + each kit) × locales
  for (const locale of routing.locales) {
    entries.push({
      url: pfx(locale, "/kits"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          "x-default": `${SITE_URL}/kits`,
          ko: `${SITE_URL}/kits`,
          en: `${SITE_URL}/en/kits`,
          ja: `${SITE_URL}/ja/kits`,
          zh: `${SITE_URL}/zh/kits`,
        },
      },
    });
  }
  for (const kit of KITS) {
    for (const locale of routing.locales) {
      entries.push({
        url: pfx(locale, `/kits/${kit.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: {
            "x-default": `${SITE_URL}/kits/${kit.slug}`,
            ko: `${SITE_URL}/kits/${kit.slug}`,
            en: `${SITE_URL}/en/kits/${kit.slug}`,
            ja: `${SITE_URL}/ja/kits/${kit.slug}`,
            zh: `${SITE_URL}/zh/kits/${kit.slug}`,
          },
        },
      });
    }
  }

  // Tool pages × locales
  for (const t of tools) {
    for (const locale of routing.locales) {
      const url = locale === routing.defaultLocale
        ? `${SITE_URL}/tools/${t.slug}`
        : `${SITE_URL}/${locale}/tools/${t.slug}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            "x-default": `${SITE_URL}/tools/${t.slug}`,
            ko: `${SITE_URL}/tools/${t.slug}`,
            en: `${SITE_URL}/en/tools/${t.slug}`,
            ja: `${SITE_URL}/ja/tools/${t.slug}`,
            zh: `${SITE_URL}/zh/tools/${t.slug}`,
          },
        },
      });
    }
  }

  // Legal pages (about / privacy / terms) × locales — indexable (they inherit
  // robots index/follow and set their own canonical) but were previously
  // omitted from the sitemap.
  for (const p of ["about", "privacy", "terms"]) {
    for (const locale of routing.locales) {
      entries.push({
        url: pfx(locale, `/${p}`),
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: {
          languages: {
            "x-default": `${SITE_URL}/${p}`,
            ko: `${SITE_URL}/${p}`,
            en: `${SITE_URL}/en/${p}`,
            ja: `${SITE_URL}/ja/${p}`,
            zh: `${SITE_URL}/zh/${p}`,
          },
        },
      });
    }
  }

  return entries;
}
