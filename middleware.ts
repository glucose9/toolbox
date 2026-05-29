import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = intl(req);
  // Promote next-intl's 307 (temporary) locale redirects to 308 (permanent) so search
  // engines treat the destination as the canonical URL. Important for /ko/foo → /foo
  // (Korean is served at root via the as-needed prefix).
  if (res && res.status === 307) {
    const location = res.headers.get("location");
    if (location) {
      const redirect = NextResponse.redirect(new URL(location, req.url), 308);
      res.headers.forEach((v, k) => {
        if (k.toLowerCase() !== "location") redirect.headers.set(k, v);
      });
      return redirect;
    }
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
