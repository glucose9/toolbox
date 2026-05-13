import { tools } from "@/lib/tools";

export default function TrustBadges({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800">
          🔒 브라우저 안에서만 처리
        </span>
        <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          ✓ 워터마크 없음
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          ✓ 가입 불필요
        </span>
      </div>
    );
  }

  const items = [
    { icon: "🔒", text: "파일이 외부로 안 나감" },
    { icon: "🆓", text: "평생 무료" },
    { icon: "✓", text: "워터마크 없음" },
    { icon: "🚀", text: "가입 불필요" },
    { icon: "🛠️", text: `도구 ${tools.length}개 무료 공개` },
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
