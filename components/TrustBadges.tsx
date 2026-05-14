import { getTranslations } from "next-intl/server";
import { tools } from "@/lib/tools";

export default async function TrustBadges({ variant = "full" }: { variant?: "full" | "compact" }) {
  const t = await getTranslations("trust");
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
          🔒 {t("browser")}
        </span>
        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          ✓ {t("noWatermark")}
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          ✓ {t("noSignup")}
        </span>
      </div>
    );
  }

  const items = [
    { icon: "🔒", text: t("noUpload") },
    { icon: "🆓", text: t("browser") },
    { icon: "✓", text: t("noWatermark") },
    { icon: "🚀", text: t("noSignup") },
    { icon: "🛠️", text: `${tools.length}+ tools` },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center text-sm">
      {items.map((item) => (
        <span
          key={item.text}
          className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-full"
        >
          {item.icon} {item.text}
        </span>
      ))}
    </div>
  );
}
