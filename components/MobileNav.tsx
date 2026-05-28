"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { tools } from "@/lib/tools";

export default function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Lock body scroll + Esc to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const byCategory: Record<string, typeof tools> = {};
  for (const tool of tools) {
    (byCategory[tool.category] ||= []).push(tool);
  }
  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t("nav.menu")}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-xl"
      >
        ☰
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 animate-in fade-in"
            onClick={close}
            aria-hidden
          />
          <aside
            role="dialog"
            aria-label={t("nav.allTools")}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" onClick={close} className="font-bold text-lg">
                <span className="text-brand-600">●</span> {t("site.name")}
              </Link>
              <button
                onClick={close}
                aria-label={t("common.close")}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
              <Link
                href="/"
                onClick={close}
                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium"
              >
                🏠 <span>{t("nav.home")}</span>
              </Link>

              <div className="mt-2 px-2 pt-2 text-xs text-muted uppercase tracking-wider">
                {t("nav.allTools")}
              </div>

              {Object.entries(byCategory).map(([cat, list]) => {
                const isOpen = !!expanded[cat];
                return (
                  <div key={cat} className="mb-0.5">
                    <button
                      onClick={() => setExpanded((p) => ({ ...p, [cat]: !p[cat] }))}
                      className="w-full flex justify-between items-center px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium">
                        {t(`categories.${cat}`)}{" "}
                        <span className="text-muted font-normal text-xs">({list.length})</span>
                      </span>
                      <span className="text-muted text-lg leading-none">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <ul className="pl-3 pb-1">
                        <li>
                          <Link
                            href={`/category/${cat}`}
                            onClick={close}
                            className="flex items-center gap-2 px-2 py-1 text-xs text-brand-600 hover:underline"
                          >
                            → {t("nav.viewCategory")}
                          </Link>
                        </li>
                        {list.map((tool) => (
                          <li key={tool.slug}>
                            <Link
                              href={`/tools/${tool.slug}`}
                              onClick={close}
                              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                            >
                              <span className="text-base">{tool.icon}</span>
                              <span className="truncate">
                                {t(`tools.${tool.slug}`, {}, { fallback: tool.navTitle } as never)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 p-3 text-xs text-muted">
              <div className="flex gap-3">
                <Link href="/about" onClick={close} className="hover:text-brand-600">
                  {t("footer.about")}
                </Link>
                <Link href="/privacy" onClick={close} className="hover:text-brand-600">
                  {t("footer.privacy")}
                </Link>
                <Link href="/terms" onClick={close} className="hover:text-brand-600">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
