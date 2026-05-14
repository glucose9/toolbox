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
const HwpViewerTool = dynamic(() => import("./tools/HwpViewerTool"), { ssr: false });
const HwpToTextTool = dynamic(() => import("./tools/HwpToTextTool"), { ssr: false });
const HwpToPdfTool = dynamic(() => import("./tools/HwpToPdfTool"), { ssr: false });
const HwpToHwpxTool = dynamic(() => import("./tools/HwpToHwpxTool"), { ssr: false });
const PdfMergeTool = dynamic(() => import("./tools/PdfMergeTool"), { ssr: false });
const PdfSplitTool = dynamic(() => import("./tools/PdfSplitTool"), { ssr: false });
const PdfRotateTool = dynamic(() => import("./tools/PdfRotateTool"), { ssr: false });
const PdfDeletePagesTool = dynamic(() => import("./tools/PdfDeletePagesTool"), { ssr: false });
const ImagesToPdfTool = dynamic(() => import("./tools/ImagesToPdfTool"), { ssr: false });
const PdfToImagesTool = dynamic(() => import("./tools/PdfToImagesTool"), { ssr: false });
const TextCaseTool = dynamic(() => import("./tools/TextCaseTool"), { ssr: false });
const TextSortTool = dynamic(() => import("./tools/TextSortTool"), { ssr: false });
const TextDedupeTool = dynamic(() => import("./tools/TextDedupeTool"), { ssr: false });
const JsonFormatterTool = dynamic(() => import("./tools/JsonFormatterTool"), { ssr: false });
const UrlEncoderTool = dynamic(() => import("./tools/UrlEncoderTool"), { ssr: false });
const HashTool = dynamic(() => import("./tools/HashTool"), { ssr: false });
const UuidTool = dynamic(() => import("./tools/UuidTool"), { ssr: false });
const RegexTesterTool = dynamic(() => import("./tools/RegexTesterTool"), { ssr: false });
const TimestampTool = dynamic(() => import("./tools/TimestampTool"), { ssr: false });
const Base64ImageTool = dynamic(() => import("./tools/Base64ImageTool"), { ssr: false });
const LoremIpsumTool = dynamic(() => import("./tools/LoremIpsumTool"), { ssr: false });
const MarkdownPreviewTool = dynamic(() => import("./tools/MarkdownPreviewTool"), { ssr: false });
const DiffCheckerTool = dynamic(() => import("./tools/DiffCheckerTool"), { ssr: false });
const CsvToJsonTool = dynamic(() => import("./tools/CsvToJsonTool"), { ssr: false });
const YamlJsonTool = dynamic(() => import("./tools/YamlJsonTool"), { ssr: false });
const ImageExifStripTool = dynamic(() => import("./tools/ImageExifStripTool"), { ssr: false });
const ImageCropTool = dynamic(() => import("./tools/ImageCropTool"), { ssr: false });
const ImageRotateTool = dynamic(() => import("./tools/ImageRotateTool"), { ssr: false });
const SpellCheckTool = dynamic(() => import("./tools/SpellCheckTool"), { ssr: false });
const MarkdownMathTool = dynamic(() => import("./tools/MarkdownMathTool"), { ssr: false });
const FaviconTool = dynamic(() => import("./tools/FaviconTool"), { ssr: false });
const ImageFilterTool = dynamic(() => import("./tools/ImageFilterTool"), { ssr: false });
const PdfWatermarkTool = dynamic(() => import("./tools/PdfWatermarkTool"), { ssr: false });
const PdfPageNumberTool = dynamic(() => import("./tools/PdfPageNumberTool"), { ssr: false });
const PdfTextExtractTool = dynamic(() => import("./tools/PdfTextExtractTool"), { ssr: false });
const JwtDecoderTool = dynamic(() => import("./tools/JwtDecoderTool"), { ssr: false });
const CssShadowTool = dynamic(() => import("./tools/CssShadowTool"), { ssr: false });
const JsonXmlTool = dynamic(() => import("./tools/JsonXmlTool"), { ssr: false });
const DDayTool = dynamic(() => import("./tools/DDayTool"), { ssr: false });
const UnitConverterTool = dynamic(() => import("./tools/UnitConverterTool"), { ssr: false });
const ImageTextOverlayTool = dynamic(() => import("./tools/ImageTextOverlayTool"), { ssr: false });
const ImageToAsciiTool = dynamic(() => import("./tools/ImageToAsciiTool"), { ssr: false });
const HeicToJpgTool = dynamic(() => import("./tools/HeicToJpgTool"), { ssr: false });
const AudioTrimTool = dynamic(() => import("./tools/AudioTrimTool"), { ssr: false });
const KorEngKeyboardTool = dynamic(() => import("./tools/KorEngKeyboardTool"), { ssr: false });
const BaseConverterTool = dynamic(() => import("./tools/BaseConverterTool"), { ssr: false });
const HtmlEntityTool = dynamic(() => import("./tools/HtmlEntityTool"), { ssr: false });
const PasswordStrengthTool = dynamic(() => import("./tools/PasswordStrengthTool"), { ssr: false });
const ColorContrastTool = dynamic(() => import("./tools/ColorContrastTool"), { ssr: false });
const LottoTool = dynamic(() => import("./tools/LottoTool"), { ssr: false });
const QrDecoderTool = dynamic(() => import("./tools/QrDecoderTool"), { ssr: false });
const ExifViewerTool = dynamic(() => import("./tools/ExifViewerTool"), { ssr: false });
const ColorExtractTool = dynamic(() => import("./tools/ColorExtractTool"), { ssr: false });
const GifToMp4Tool = dynamic(() => import("./tools/GifToMp4Tool"), { ssr: false });
const VideoThumbnailTool = dynamic(() => import("./tools/VideoThumbnailTool"), { ssr: false });
const VideoSpeedTool = dynamic(() => import("./tools/VideoSpeedTool"), { ssr: false });
const MarkdownTableTool = dynamic(() => import("./tools/MarkdownTableTool"), { ssr: false });
const DocxViewerTool = dynamic(() => import("./tools/DocxViewerTool"), { ssr: false });
const CssGradientTool = dynamic(() => import("./tools/CssGradientTool"), { ssr: false });
const KorRomanizeTool = dynamic(() => import("./tools/KorRomanizeTool"), { ssr: false });
const KoreanAgeTool = dynamic(() => import("./tools/KoreanAgeTool"), { ssr: false });
const LunarSolarTool = dynamic(() => import("./tools/LunarSolarTool"), { ssr: false });
const MorseTool = dynamic(() => import("./tools/MorseTool"), { ssr: false });
const CaesarCipherTool = dynamic(() => import("./tools/CaesarCipherTool"), { ssr: false });
const HttpStatusTool = dynamic(() => import("./tools/HttpStatusTool"), { ssr: false });
const PdfReorderTool = dynamic(() => import("./tools/PdfReorderTool"), { ssr: false });
const ImageStackTool = dynamic(() => import("./tools/ImageStackTool"), { ssr: false });
const ImageBorderTool = dynamic(() => import("./tools/ImageBorderTool"), { ssr: false });
const TextToSpeechTool = dynamic(() => import("./tools/TextToSpeechTool"), { ssr: false });
const WordFrequencyTool = dynamic(() => import("./tools/WordFrequencyTool"), { ssr: false });

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
    case "HwpViewerTool":
      return <HwpViewerTool />;
    case "HwpToTextTool":
      return <HwpToTextTool />;
    case "HwpToPdfTool":
      return <HwpToPdfTool />;
    case "HwpToHwpxTool":
      return <HwpToHwpxTool />;
    case "PdfMergeTool":
      return <PdfMergeTool />;
    case "PdfSplitTool":
      return <PdfSplitTool />;
    case "PdfRotateTool":
      return <PdfRotateTool />;
    case "PdfDeletePagesTool":
      return <PdfDeletePagesTool />;
    case "ImagesToPdfTool":
      return <ImagesToPdfTool />;
    case "PdfToImagesTool":
      return <PdfToImagesTool />;
    case "TextCaseTool":
      return <TextCaseTool />;
    case "TextSortTool":
      return <TextSortTool />;
    case "TextDedupeTool":
      return <TextDedupeTool />;
    case "JsonFormatterTool":
      return <JsonFormatterTool />;
    case "UrlEncoderTool":
      return <UrlEncoderTool />;
    case "HashTool":
      return <HashTool />;
    case "UuidTool":
      return <UuidTool />;
    case "RegexTesterTool":
      return <RegexTesterTool />;
    case "TimestampTool":
      return <TimestampTool />;
    case "Base64ImageTool":
      return <Base64ImageTool />;
    case "LoremIpsumTool":
      return <LoremIpsumTool />;
    case "MarkdownPreviewTool":
      return <MarkdownPreviewTool />;
    case "DiffCheckerTool":
      return <DiffCheckerTool />;
    case "CsvToJsonTool":
      return <CsvToJsonTool />;
    case "YamlJsonTool":
      return <YamlJsonTool />;
    case "ImageExifStripTool":
      return <ImageExifStripTool />;
    case "ImageCropTool":
      return <ImageCropTool />;
    case "ImageRotateTool":
      return <ImageRotateTool />;
    case "SpellCheckTool":
      return <SpellCheckTool />;
    case "MarkdownMathTool":
      return <MarkdownMathTool />;
    case "FaviconTool":
      return <FaviconTool />;
    case "ImageFilterTool":
      return <ImageFilterTool />;
    case "PdfWatermarkTool":
      return <PdfWatermarkTool />;
    case "PdfPageNumberTool":
      return <PdfPageNumberTool />;
    case "PdfTextExtractTool":
      return <PdfTextExtractTool />;
    case "JwtDecoderTool":
      return <JwtDecoderTool />;
    case "CssShadowTool":
      return <CssShadowTool />;
    case "JsonXmlTool":
      return <JsonXmlTool />;
    case "DDayTool":
      return <DDayTool />;
    case "UnitConverterTool":
      return <UnitConverterTool />;
    case "ImageTextOverlayTool":
      return <ImageTextOverlayTool />;
    case "ImageToAsciiTool":
      return <ImageToAsciiTool />;
    case "HeicToJpgTool":
      return <HeicToJpgTool />;
    case "AudioTrimTool":
      return <AudioTrimTool />;
    case "KorEngKeyboardTool":
      return <KorEngKeyboardTool />;
    case "BaseConverterTool":
      return <BaseConverterTool />;
    case "HtmlEntityTool":
      return <HtmlEntityTool />;
    case "PasswordStrengthTool":
      return <PasswordStrengthTool />;
    case "ColorContrastTool":
      return <ColorContrastTool />;
    case "LottoTool":
      return <LottoTool />;
    case "QrDecoderTool":
      return <QrDecoderTool />;
    case "ExifViewerTool":
      return <ExifViewerTool />;
    case "ColorExtractTool":
      return <ColorExtractTool />;
    case "GifToMp4Tool":
      return <GifToMp4Tool />;
    case "VideoThumbnailTool":
      return <VideoThumbnailTool />;
    case "VideoSpeedTool":
      return <VideoSpeedTool />;
    case "MarkdownTableTool":
      return <MarkdownTableTool />;
    case "DocxViewerTool":
      return <DocxViewerTool />;
    case "CssGradientTool":
      return <CssGradientTool />;
    case "KorRomanizeTool":
      return <KorRomanizeTool />;
    case "KoreanAgeTool":
      return <KoreanAgeTool />;
    case "LunarSolarTool":
      return <LunarSolarTool />;
    case "MorseTool":
      return <MorseTool />;
    case "CaesarCipherTool":
      return <CaesarCipherTool />;
    case "HttpStatusTool":
      return <HttpStatusTool />;
    case "PdfReorderTool":
      return <PdfReorderTool />;
    case "ImageStackTool":
      return <ImageStackTool />;
    case "ImageBorderTool":
      return <ImageBorderTool />;
    case "TextToSpeechTool":
      return <TextToSpeechTool />;
    case "WordFrequencyTool":
      return <WordFrequencyTool />;
    default:
      return <div>도구를 찾을 수 없습니다.</div>;
  }
}
