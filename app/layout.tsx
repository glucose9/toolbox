import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/tools";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
  verification: {
    google: "Pw2pA4IIXPiUyS1QAyG6TZ80fiX_AK4o7-QwcwwORXk",
    other: {
      "naver-site-verification": "935309ab74d516b01521acfccc0a2675e71cf090",
    },
  },
};

const themeInit = `
try {
  const t = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && prefersDark)) document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
