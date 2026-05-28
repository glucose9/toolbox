import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Captured at build time (SSG pages bake these in).
const BUILD_SHA = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || "").slice(0, 7);
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const BUILD_BRANCH = process.env.VERCEL_GIT_COMMIT_REF || "";

export default async function Footer() {
  const t = await getTranslations();
  const commitUrl = BUILD_SHA
    ? `https://github.com/glucose9/toolbox/commit/${BUILD_SHA}`
    : null;
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-muted">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{t("site.name")}</div>
            <div className="mt-1">{t("footer.tagline")}</div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
            <Link href="/about" className="hover:text-brand-600">{t("footer.about")}</Link>
            <Link href="/privacy" className="hover:text-brand-600">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:text-brand-600">{t("footer.terms")}</Link>
          </div>
        </div>
        <div className="mt-6 text-xs opacity-75 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© {new Date().getFullYear()} {t("site.name")}.</span>
          <span className="opacity-60">·</span>
          {commitUrl ? (
            <a href={commitUrl} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-brand-600">
              build {BUILD_SHA}{BUILD_BRANCH && BUILD_BRANCH !== "main" ? ` (${BUILD_BRANCH})` : ""}
            </a>
          ) : (
            <span className="font-mono">build dev</span>
          )}
          <span className="opacity-60">·</span>
          <time dateTime={BUILD_DATE} className="font-mono">{BUILD_DATE}</time>
        </div>
      </div>
    </footer>
  );
}
