import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intl(req);
  // Promote 307 → 308 (permanent) ONLY for the /ko/foo → /foo canonicalization
  // (Korean served at root via the as-needed prefix). That redirect is stable
  // per-URL, so permanence is safe and good for SEO.
  //
  // Never promote any other redirect: locale-detection style redirects are
  // request-dependent, and browsers cache 308s aggressively — a cached
  // "/kits/x → /en/kits/x" permanently stuck Korean users in English.
  // (Detection is now disabled in i18n/routing.ts, but keep this guard so a
  // future config change can't reintroduce the bug.)
  if (res && res.status === 307) {
    const location = res.headers.get("location");
    if (location) {
      const target = new URL(location, req.url);
      const isKoStrip =
        req.nextUrl.pathname.startsWith("/ko") &&
        (target.pathname === req.nextUrl.pathname.slice(3) ||
          (req.nextUrl.pathname === "/ko" && target.pathname === "/"));
      if (isKoStrip) {
        const redirect = NextResponse.redirect(target, 308);
        res.headers.forEach((v, k) => {
          if (k.toLowerCase() !== "location") redirect.headers.set(k, v);
        });
        return redirect;
      }
    }
  }
  return res;
}

export const config = {
  // Exclude Next.js metadata routes (icon / apple-icon / opengraph-image /
  // twitter-image) so next-intl's locale routing doesn't swallow them into a
  // 404. These have no file extension, so the `.*\\..*` guard (which covers
  // robots.txt / sitemap.xml) misses them and they must be listed explicitly.
  // `.*opengraph-image` / `.*twitter-image` also cover the per-tool image
  // routes under /[locale]/tools/[slug]/…
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|.*opengraph-image|.*twitter-image|.*\\..*).*)"],
};
