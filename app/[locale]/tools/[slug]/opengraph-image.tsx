import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { getTool, tools, SITE_NAME, categoryLabels } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TRUST_LINE: Record<string, string> = {
  ko: "무료 · 가입 불필요 · 워터마크 없음",
  en: "Free · No signup · No watermark",
  ja: "無料 · 登録不要 · 透かしなし",
  zh: "免费 · 无需注册 · 无水印",
};

function safeT(t: (k: string) => string, key: string, fallback: string): string {
  try {
    const v = t(key);
    return v === key ? fallback : v;
  } catch {
    return fallback;
  }
}

export async function generateImageMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const tool = getTool(slug);
  const t = await getTranslations({ locale });
  const alt = tool
    ? safeT(t, `toolMeta.${slug}.h1`, tool.h1)
    : safeT(t, "site.name", SITE_NAME);
  return [{ id: tool?.slug || "default", size, contentType, alt }];
}

export default async function OGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const tool = getTool(slug) || tools[0];
  const t = await getTranslations({ locale });
  const siteName = safeT(t, "site.name", SITE_NAME);
  const category = safeT(t, `categories.${tool.category}`, categoryLabels[tool.category] || tool.category);
  const h1 = safeT(t, `toolMeta.${tool.slug}.h1`, tool.h1);
  const meta = safeT(t, `toolMeta.${tool.slug}.metaDescription`, tool.metaDescription);
  const trust = TRUST_LINE[locale] || TRUST_LINE.ko;
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
          {`${siteName} · ${category}`}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 140, display: "flex" }}>{tool.icon}</div>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.1, display: "flex" }}>
            {h1}
          </div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, marginTop: 16, lineHeight: 1.4, maxWidth: 1000, display: "flex" }}>
          {meta}
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 32, display: "flex" }}>
          {trust}
        </div>
      </div>
    ),
    { ...size }
  );
}
