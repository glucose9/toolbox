import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SearchBar from "./SearchBar";
import DarkToggle from "./DarkToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {
  const t = await getTranslations();
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight whitespace-nowrap">
          <span className="text-brand-600">●</span> {t("site.name")}
        </Link>
        <div className="flex-1 max-w-sm hidden sm:block">
          <SearchBar />
        </div>
        <div className="flex-1" />
        <LanguageSwitcher />
        <DarkToggle />
      </div>
      <div className="sm:hidden px-4 pb-2">
        <SearchBar />
      </div>
    </header>
  );
}
