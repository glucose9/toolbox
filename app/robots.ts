import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/tools";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // No Disallow. We previously blocked the auto-generated /*/opengraph-image
        // and /*/twitter-image routes, but that made Search Console report them under
        // "Blocked by robots.txt" (alarming, looked like pages weren't indexing) and
        // stopped Google/social crawlers from fetching link-preview images. Per Google's
        // guidance, don't block resources your pages reference — let them be crawled.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
