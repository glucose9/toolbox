"use client";

import dynamic from "next/dynamic";
import type { ToolConfig } from "@/lib/tools";

const QRTool = dynamic(() => import("./tools/QRTool"), { ssr: false });
const ImageConvertTool = dynamic(() => import("./tools/ImageConvertTool"), { ssr: false });
const ImageCompressTool = dynamic(() => import("./tools/ImageCompressTool"), { ssr: false });
const ImageResizeTool = dynamic(() => import("./tools/ImageResizeTool"), { ssr: false });
const CounterTool = dynamic(() => import("./tools/CounterTool"), { ssr: false });
const ColorTool = dynamic(() => import("./tools/ColorTool"), { ssr: false });
const Base64Tool = dynamic(() => import("./tools/Base64Tool"), { ssr: false });
const PasswordTool = dynamic(() => import("./tools/PasswordTool"), { ssr: false });
const VideoToGifTool = dynamic(() => import("./tools/VideoToGifTool"), { ssr: false });
const VideoToMp3Tool = dynamic(() => import("./tools/VideoToMp3Tool"), { ssr: false });
const VideoCompressTool = dynamic(() => import("./tools/VideoCompressTool"), { ssr: false });
const VideoTrimTool = dynamic(() => import("./tools/VideoTrimTool"), { ssr: false });

export default function ToolRenderer({ tool }: { tool: ToolConfig }) {
  const config = tool.config || {};
  switch (tool.component) {
    case "QRTool":
      return <QRTool config={config} />;
    case "ImageConvertTool":
      return <ImageConvertTool config={config} />;
    case "ImageCompressTool":
      return <ImageCompressTool />;
    case "ImageResizeTool":
      return <ImageResizeTool />;
    case "CounterTool":
      return <CounterTool />;
    case "ColorTool":
      return <ColorTool />;
    case "Base64Tool":
      return <Base64Tool />;
    case "PasswordTool":
      return <PasswordTool />;
    case "VideoToGifTool":
      return <VideoToGifTool />;
    case "VideoToMp3Tool":
      return <VideoToMp3Tool />;
    case "VideoCompressTool":
      return <VideoCompressTool />;
    case "VideoTrimTool":
      return <VideoTrimTool />;
    default:
      return <div>도구를 찾을 수 없습니다.</div>;
  }
}
