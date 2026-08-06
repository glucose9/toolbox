import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Locale-scoped 404. Rendered inside app/[locale]/layout.tsx, so it inherits
// <html lang>, globals.css, Header and Footer automatically. This catches
// notFound() thrown from the [locale] segment (invalid locale, unknown tool /
// category / kit slug, or any unmatched path under a locale).
export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-6 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-muted leading-relaxed">{t("description")}</p>
      <div className="mt-8">
        <Link href="/" className="btn btn-primary">
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
