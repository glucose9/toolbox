import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-muted">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{t("site.name")}</div>
            <div className="mt-1">{t("footer.tagline")}</div>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand-600">{t("nav.home")}</Link>
          </div>
        </div>
        <div className="mt-6 text-xs opacity-75">
          © {new Date().getFullYear()} {t("site.name")}.
        </div>
      </div>
    </footer>
  );
}
