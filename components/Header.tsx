import Link from "next/link";
import { SITE_NAME } from "@/lib/tools";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-brand-600">●</span> {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-700">
          <Link href="/#qr" className="hover:text-brand-600">QR</Link>
          <Link href="/#image" className="hover:text-brand-600">이미지</Link>
          <Link href="/#text" className="hover:text-brand-600">텍스트</Link>
          <Link href="/#dev" className="hover:text-brand-600">개발자</Link>
        </nav>
      </div>
    </header>
  );
}
