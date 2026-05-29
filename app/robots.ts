import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tools";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // OG image route segments are auto-generated images, not pages. Keep them out of
        // HTML crawl so they don't pile up as "crawled but not indexed" in GSC.
        disallow: [
          "/*/opengraph-image",
          "/*/opengraph-image/*",
          "/*/twitter-image",
          "/*/twitter-image/*",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
