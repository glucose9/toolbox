import { ImageResponse } from "next/og";
import { getTool, tools, SITE_NAME, categoryLabels } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  return [{ id: tool?.slug || "default", size, contentType, alt: tool?.h1 || SITE_NAME }];
}

export default async function OGImage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug) || tools[0];
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
        <div style={{ fontSize: 32, opacity: 0.8, marginBottom: 12, display: "flex" }}>
          {`${SITE_NAME} · ${categoryLabels[tool.category]}`}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 140, display: "flex" }}>{tool.icon}</div>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.1, display: "flex" }}>
            {tool.h1}
          </div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 16, lineHeight: 1.4, maxWidth: 1000, display: "flex" }}>
          {tool.metaDescription}
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 32, display: "flex" }}>
          무료 · 가입 불필요 · 워터마크 없음
        </div>
      </div>
    ),
    { ...size }
  );
}
