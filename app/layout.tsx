import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/tools";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "QR코드 생성, 이미지 변환, 글자수 세기 등 자주 쓰는 무료 온라인 도구 모음. 가입 불필요, 워터마크 없음, 브라우저 안에서 안전하게 처리됩니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
