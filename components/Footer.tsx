import Link from "next/link";
import { SITE_NAME } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <div className="font-semibold text-gray-900">{SITE_NAME}</div>
            <div className="mt-1">무료 온라인 도구 모음. 가입 불필요.</div>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-brand-600">홈</Link>
            <a href="mailto:hello@example.com" className="hover:text-brand-600">문의</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} {SITE_NAME}. 파일은 브라우저 안에서만 처리되며 어디로도 전송되지 않습니다.
        </div>
      </div>
    </footer>
  );
}
