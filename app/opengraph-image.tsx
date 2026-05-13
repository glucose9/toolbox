import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, tools } from "@/lib/tools";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.85, marginBottom: 16, display: "flex" }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, display: "flex" }}>
          {`무료 온라인 도구 ${tools.length}개`}
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, display: "flex" }}>{SITE_TAGLINE}</div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 32, display: "flex" }}>
          가입 불필요 · 워터마크 없음 · 브라우저 안 처리
        </div>
      </div>
    ),
    { ...size }
  );
}
