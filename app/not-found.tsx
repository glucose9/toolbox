import Link from "next/link";

// Global 404 for requests that never enter the [locale] segment (non-locale
// unmatched paths). There is no root app/layout.tsx, so this page must render
// its own <html>/<body>. Kept minimal and self-contained (globals.css is only
// imported by the locale layout, so styling is inlined here). Uses the default
// locale (ko) for lang, with a bilingual fallback label.
export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          background: "#111827",
          color: "#f3f4f6",
        }}
      >
        <p style={{ fontSize: "4rem", fontWeight: 800, margin: 0, color: "#3b82f6" }}>404</p>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "1rem 0 0.25rem" }}>
          페이지를 찾을 수 없습니다
        </h1>
        <p style={{ color: "#9ca3af", margin: 0 }}>Page not found</p>
        <Link
          href="/"
          style={{
            marginTop: "1.5rem",
            display: "inline-block",
            padding: "0.6rem 1.25rem",
            borderRadius: "0.5rem",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          홈으로 / Home
        </Link>
      </body>
    </html>
  );
}
