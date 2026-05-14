import type { MetadataRoute } from "next";
import { tools, SITE_URL } from "@/lib/tools";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of routing.locales) {
    const url = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;
    entries.push({
      url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ko: SITE_URL,
          en: `${SITE_URL}/en`,
          ja: `${SITE_URL}/ja`,
          zh: `${SITE_URL}/zh`,
        },
      },
    });
  }

  // Tool pages × locales
  for (const t of tools) {
    for (const locale of routing.locales) {
      const url = locale === routing.defaultLocale
        ? `${SITE_URL}/tools/${t.slug}`
        : `${SITE_URL}/${locale}/tools/${t.slug}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            ko: `${SITE_URL}/tools/${t.slug}`,
            en: `${SITE_URL}/en/tools/${t.slug}`,
            ja: `${SITE_URL}/ja/tools/${t.slug}`,
            zh: `${SITE_URL}/zh/tools/${t.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
