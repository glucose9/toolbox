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
const LatexEditorTool = dynamic(() => import("./tools/LatexEditorTool"), { ssr: false });
const SciCalcTool = dynamic(() => import("./tools/SciCalcTool"), { ssr: false });
const NumToKoreanTool = dynamic(() => import("./tools/NumToKoreanTool"), { ssr: false });
const PercentTool = dynamic(() => import("./tools/PercentTool"), { ssr: false });
const DiscountTool = dynamic(() => import("./tools/DiscountTool"), { ssr: false });
const VatTool = dynamic(() => import("./tools/VatTool"), { ssr: false });
const BmiTool = dynamic(() => import("./tools/BmiTool"), { ssr: false });
const CompoundTool = dynamic(() => import("./tools/CompoundTool"), { ssr: false });
const WorldTimeTool = dynamic(() => import("./tools/WorldTimeTool"), { ssr: false });
const NamePickerTool = dynamic(() => import("./tools/NamePickerTool"), { ssr: false });
const VideoRotateTool = dynamic(() => import("./tools/VideoRotateTool"), { ssr: false });
const ImagePixelateTool = dynamic(() => import("./tools/ImagePixelateTool"), { ssr: false });
const PdfExtractTool = dynamic(() => import("./tools/PdfExtractTool"), { ssr: false });
const MarkdownTocTool = dynamic(() => import("./tools/MarkdownTocTool"), { ssr: false });
const SqlFormatterTool = dynamic(() => import("./tools/SqlFormatterTool"), { ssr: false });
const CronParserTool = dynamic(() => import("./tools/CronParserTool"), { ssr: false });
const CidrCalcTool = dynamic(() => import("./tools/CidrCalcTool"), { ssr: false });
const TimeCalcTool = dynamic(() => import("./tools/TimeCalcTool"), { ssr: false });
const WageConverterTool = dynamic(() => import("./tools/WageConverterTool"), { ssr: false });
const DueDateTool = dynamic(() => import("./tools/DueDateTool"), { ssr: false });
const SlugGeneratorTool = dynamic(() => import("./tools/SlugGeneratorTool"), { ssr: false });
const HtmlMinifierTool = dynamic(() => import("./tools/HtmlMinifierTool"), { ssr: false });
const CssMinifierTool = dynamic(() => import("./tools/CssMinifierTool"), { ssr: false });
const JsMinifierTool = dynamic(() => import("./tools/JsMinifierTool"), { ssr: false });
const JsonDiffTool = dynamic(() => import("./tools/JsonDiffTool"), { ssr: false });
const TextBinaryTool = dynamic(() => import("./tools/TextBinaryTool"), { ssr: false });
const TextHexTool = dynamic(() => import("./tools/TextHexTool"), { ssr: false });
const AnsiToHtmlTool = dynamic(() => import("./tools/AnsiToHtmlTool"), { ssr: false });
const KeycodeTool = dynamic(() => import("./tools/KeycodeTool"), { ssr: false });
const FileToBase64Tool = dynamic(() => import("./tools/FileToBase64Tool"), { ssr: false });
const UnicodeLookupTool = dynamic(() => import("./tools/UnicodeLookupTool"), { ssr: false });
const SvgMinifierTool = dynamic(() => import("./tools/SvgMinifierTool"), { ssr: false });
const TextReverseTool = dynamic(() => import("./tools/TextReverseTool"), { ssr: false });
const LineNumbersTool = dynamic(() => import("./tools/LineNumbersTool"), { ssr: false });
const ReadingTimeTool = dynamic(() => import("./tools/ReadingTimeTool"), { ssr: false });
const HanjaToHangulTool = dynamic(() => import("./tools/HanjaToHangulTool"), { ssr: false });
const AsciiBoxTool = dynamic(() => import("./tools/AsciiBoxTool"), { ssr: false });
const EncodingConvertTool = dynamic(() => import("./tools/EncodingConvertTool"), { ssr: false });
const LineJoinerTool = dynamic(() => import("./tools/LineJoinerTool"), { ssr: false });
const TextCardTool = dynamic(() => import("./tools/TextCardTool"), { ssr: false });
const ImageCompareTool = dynamic(() => import("./tools/ImageCompareTool"), { ssr: false });
const ImageZipTool = dynamic(() => import("./tools/ImageZipTool"), { ssr: false });
const QrLogoTool = dynamic(() => import("./tools/QrLogoTool"), { ssr: false });
const QrTextTool = dynamic(() => import("./tools/QrTextTool"), { ssr: false });
const VideoMergeTool = dynamic(() => import("./tools/VideoMergeTool"), { ssr: false });
const VideoMuteTool = dynamic(() => import("./tools/VideoMuteTool"), { ssr: false });
const VideoInfoTool = dynamic(() => import("./tools/VideoInfoTool"), { ssr: false });
const PdfBlankPageTool = dynamic(() => import("./tools/PdfBlankPageTool"), { ssr: false });
const PdfMetadataTool = dynamic(() => import("./tools/PdfMetadataTool"), { ssr: false });
const PdfCropTool = dynamic(() => import("./tools/PdfCropTool"), { ssr: false });
const CaffeineTool = dynamic(() => import("./tools/CaffeineTool"), { ssr: false });
const ZodiacTool = dynamic(() => import("./tools/ZodiacTool"), { ssr: false });
const ChineseZodiacTool = dynamic(() => import("./tools/ChineseZodiacTool"), { ssr: false });
const AlcoholConverterTool = dynamic(() => import("./tools/AlcoholConverterTool"), { ssr: false });
const BmrTool = dynamic(() => import("./tools/BmrTool"), { ssr: false });
const RunningPaceTool = dynamic(() => import("./tools/RunningPaceTool"), { ssr: false });
const TipTool = dynamic(() => import("./tools/TipTool"), { ssr: false });
const UnitPriceTool = dynamic(() => import("./tools/UnitPriceTool"), { ssr: false });
const DiceCoinTool = dynamic(() => import("./tools/DiceCoinTool"), { ssr: false });
const RpsTool = dynamic(() => import("./tools/RpsTool"), { ssr: false });
const KoreaHolidaysTool = dynamic(() => import("./tools/KoreaHolidaysTool"), { ssr: false });
const LunchPickerTool = dynamic(() => import("./tools/LunchPickerTool"), { ssr: false });
const BaseballStatsTool = dynamic(() => import("./tools/BaseballStatsTool"), { ssr: false });
const BookReadingTimeTool = dynamic(() => import("./tools/BookReadingTimeTool"), { ssr: false });
const ImageInvertTool = dynamic(() => import("./tools/ImageInvertTool"), { ssr: false });
const ImageWatermarkImgTool = dynamic(() => import("./tools/ImageWatermarkImgTool"), { ssr: false });
const ImageColorTransparentTool = dynamic(() => import("./tools/ImageColorTransparentTool"), { ssr: false });
const ImageChannelsTool = dynamic(() => import("./tools/ImageChannelsTool"), { ssr: false });
const ImageFreeRotateTool = dynamic(() => import("./tools/ImageFreeRotateTool"), { ssr: false });
const HtmlToTextTool = dynamic(() => import("./tools/HtmlToTextTool"), { ssr: false });
const HtmlToMarkdownTool = dynamic(() => import("./tools/HtmlToMarkdownTool"), { ssr: false });
const MarkdownToTextTool = dynamic(() => import("./tools/MarkdownToTextTool"), { ssr: false });
const TextCompressTool = dynamic(() => import("./tools/TextCompressTool"), { ssr: false });
const TextBlockquoteTool = dynamic(() => import("./tools/TextBlockquoteTool"), { ssr: false });
const DataSizeTool = dynamic(() => import("./tools/DataSizeTool"), { ssr: false });
const MimeTypesTool = dynamic(() => import("./tools/MimeTypesTool"), { ssr: false });
const CssColorsTool = dynamic(() => import("./tools/CssColorsTool"), { ssr: false });
const HttpMethodsTool = dynamic(() => import("./tools/HttpMethodsTool"), { ssr: false });
const EnvParserTool = dynamic(() => import("./tools/EnvParserTool"), { ssr: false });
const JamoDecomposeTool = dynamic(() => import("./tools/JamoDecomposeTool"), { ssr: false });
const DurationFormatTool = dynamic(() => import("./tools/DurationFormatTool"), { ssr: false });
const BcryptHashTool = dynamic(() => import("./tools/BcryptHashTool"), { ssr: false });
const RotAllTool = dynamic(() => import("./tools/RotAllTool"), { ssr: false });
const CardMaskTool = dynamic(() => import("./tools/CardMaskTool"), { ssr: false });
const PdfImagesExtractTool = dynamic(() => import("./tools/PdfImagesExtractTool"), { ssr: false });
const PdfNUpTool = dynamic(() => import("./tools/PdfNUpTool"), { ssr: false });
const PdfPageSizeTool = dynamic(() => import("./tools/PdfPageSizeTool"), { ssr: false });
const VideoResizeTool = dynamic(() => import("./tools/VideoResizeTool"), { ssr: false });
const AudioMergeTool = dynamic(() => import("./tools/AudioMergeTool"), { ssr: false });
const AudioVolumeTool = dynamic(() => import("./tools/AudioVolumeTool"), { ssr: false });
const ExchangeRateTool = dynamic(() => import("./tools/ExchangeRateTool"), { ssr: false });
const StatisticsTool = dynamic(() => import("./tools/StatisticsTool"), { ssr: false });
const CarFuelTool = dynamic(() => import("./tools/CarFuelTool"), { ssr: false });
const RentCalcTool = dynamic(() => import("./tools/RentCalcTool"), { ssr: false });
const SleepRecommendTool = dynamic(() => import("./tools/SleepRecommendTool"), { ssr: false });
const BloodDonationTool = dynamic(() => import("./tools/BloodDonationTool"), { ssr: false });
const InstallmentTool = dynamic(() => import("./tools/InstallmentTool"), { ssr: false });
const KoreanPhoneTool = dynamic(() => import("./tools/KoreanPhoneTool"), { ssr: false });
const KoreanBizNumTool = dynamic(() => import("./tools/KoreanBizNumTool"), { ssr: false });
const KoreanRrnTool = dynamic(() => import("./tools/KoreanRrnTool"), { ssr: false });
const FamilyKinshipTool = dynamic(() => import("./tools/FamilyKinshipTool"), { ssr: false });
const NumberFormatTool = dynamic(() => import("./tools/NumberFormatTool"), { ssr: false });
const StarsTool = dynamic(() => import("./tools/StarsTool"), { ssr: false });
const GolfHandicapTool = dynamic(() => import("./tools/GolfHandicapTool"), { ssr: false });
const TextSimilarityTool = dynamic(() => import("./tools/TextSimilarityTool"), { ssr: false });
const FontPreviewTool = dynamic(() => import("./tools/FontPreviewTool"), { ssr: false });
const WordCloudTool = dynamic(() => import("./tools/WordCloudTool"), { ssr: false });
const RandomStringTool = dynamic(() => import("./tools/RandomStringTool"), { ssr: false });
const EmojiSearchTool = dynamic(() => import("./tools/EmojiSearchTool"), { ssr: false });
const UserAgentTool = dynamic(() => import("./tools/UserAgentTool"), { ssr: false });
const PasswordComparatorTool = dynamic(() => import("./tools/PasswordComparatorTool"), { ssr: false });
const NumberToEnglishTool = dynamic(() => import("./tools/NumberToEnglishTool"), { ssr: false });
const JsBeautifierTool = dynamic(() => import("./tools/JsBeautifierTool"), { ssr: false });
const TextStatsTool = dynamic(() => import("./tools/TextStatsTool"), { ssr: false });

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
    case "LatexEditorTool":
      return <LatexEditorTool />;
    case "SciCalcTool":
      return <SciCalcTool />;
    case "NumToKoreanTool":
      return <NumToKoreanTool />;
    case "PercentTool":
      return <PercentTool />;
    case "DiscountTool":
      return <DiscountTool />;
    case "VatTool":
      return <VatTool />;
    case "BmiTool":
      return <BmiTool />;
    case "CompoundTool":
      return <CompoundTool />;
    case "WorldTimeTool":
      return <WorldTimeTool />;
    case "NamePickerTool":
      return <NamePickerTool />;
    case "VideoRotateTool":
      return <VideoRotateTool />;
    case "ImagePixelateTool":
      return <ImagePixelateTool />;
    case "PdfExtractTool":
      return <PdfExtractTool />;
    case "MarkdownTocTool":
      return <MarkdownTocTool />;
    case "SqlFormatterTool":
      return <SqlFormatterTool />;
    case "CronParserTool":
      return <CronParserTool />;
    case "CidrCalcTool":
      return <CidrCalcTool />;
    case "TimeCalcTool":
      return <TimeCalcTool />;
    case "WageConverterTool":
      return <WageConverterTool />;
    case "DueDateTool":
      return <DueDateTool />;
    case "SlugGeneratorTool": return <SlugGeneratorTool />;
    case "HtmlMinifierTool": return <HtmlMinifierTool />;
    case "CssMinifierTool": return <CssMinifierTool />;
    case "JsMinifierTool": return <JsMinifierTool />;
    case "JsonDiffTool": return <JsonDiffTool />;
    case "TextBinaryTool": return <TextBinaryTool />;
    case "TextHexTool": return <TextHexTool />;
    case "AnsiToHtmlTool": return <AnsiToHtmlTool />;
    case "KeycodeTool": return <KeycodeTool />;
    case "FileToBase64Tool": return <FileToBase64Tool />;
    case "UnicodeLookupTool": return <UnicodeLookupTool />;
    case "SvgMinifierTool": return <SvgMinifierTool />;
    case "TextReverseTool": return <TextReverseTool />;
    case "LineNumbersTool": return <LineNumbersTool />;
    case "ReadingTimeTool": return <ReadingTimeTool />;
    case "HanjaToHangulTool": return <HanjaToHangulTool />;
    case "AsciiBoxTool": return <AsciiBoxTool />;
    case "EncodingConvertTool": return <EncodingConvertTool />;
    case "LineJoinerTool": return <LineJoinerTool />;
    case "TextCardTool": return <TextCardTool />;
    case "ImageCompareTool": return <ImageCompareTool />;
    case "ImageZipTool": return <ImageZipTool />;
    case "QrLogoTool": return <QrLogoTool />;
    case "QrTextTool": return <QrTextTool />;
    case "VideoMergeTool": return <VideoMergeTool />;
    case "VideoMuteTool": return <VideoMuteTool />;
    case "VideoInfoTool": return <VideoInfoTool />;
    case "PdfBlankPageTool": return <PdfBlankPageTool />;
    case "PdfMetadataTool": return <PdfMetadataTool />;
    case "PdfCropTool": return <PdfCropTool />;
    case "CaffeineTool": return <CaffeineTool />;
    case "ZodiacTool": return <ZodiacTool />;
    case "ChineseZodiacTool": return <ChineseZodiacTool />;
    case "AlcoholConverterTool": return <AlcoholConverterTool />;
    case "BmrTool": return <BmrTool />;
    case "RunningPaceTool": return <RunningPaceTool />;
    case "TipTool": return <TipTool />;
    case "UnitPriceTool": return <UnitPriceTool />;
    case "DiceCoinTool": return <DiceCoinTool />;
    case "RpsTool": return <RpsTool />;
    case "KoreaHolidaysTool": return <KoreaHolidaysTool />;
    case "LunchPickerTool": return <LunchPickerTool />;
    case "BaseballStatsTool": return <BaseballStatsTool />;
    case "BookReadingTimeTool": return <BookReadingTimeTool />;
    case "ImageInvertTool": return <ImageInvertTool />;
    case "ImageWatermarkImgTool": return <ImageWatermarkImgTool />;
    case "ImageColorTransparentTool": return <ImageColorTransparentTool />;
    case "ImageChannelsTool": return <ImageChannelsTool />;
    case "ImageFreeRotateTool": return <ImageFreeRotateTool />;
    case "HtmlToTextTool": return <HtmlToTextTool />;
    case "HtmlToMarkdownTool": return <HtmlToMarkdownTool />;
    case "MarkdownToTextTool": return <MarkdownToTextTool />;
    case "TextCompressTool": return <TextCompressTool />;
    case "TextBlockquoteTool": return <TextBlockquoteTool />;
    case "DataSizeTool": return <DataSizeTool />;
    case "MimeTypesTool": return <MimeTypesTool />;
    case "CssColorsTool": return <CssColorsTool />;
    case "HttpMethodsTool": return <HttpMethodsTool />;
    case "EnvParserTool": return <EnvParserTool />;
    case "JamoDecomposeTool": return <JamoDecomposeTool />;
    case "DurationFormatTool": return <DurationFormatTool />;
    case "BcryptHashTool": return <BcryptHashTool />;
    case "RotAllTool": return <RotAllTool />;
    case "CardMaskTool": return <CardMaskTool />;
    case "PdfImagesExtractTool": return <PdfImagesExtractTool />;
    case "PdfNUpTool": return <PdfNUpTool />;
    case "PdfPageSizeTool": return <PdfPageSizeTool />;
    case "VideoResizeTool": return <VideoResizeTool />;
    case "AudioMergeTool": return <AudioMergeTool />;
    case "AudioVolumeTool": return <AudioVolumeTool />;
    case "ExchangeRateTool": return <ExchangeRateTool />;
    case "StatisticsTool": return <StatisticsTool />;
    case "CarFuelTool": return <CarFuelTool />;
    case "RentCalcTool": return <RentCalcTool />;
    case "SleepRecommendTool": return <SleepRecommendTool />;
    case "BloodDonationTool": return <BloodDonationTool />;
    case "InstallmentTool": return <InstallmentTool />;
    case "KoreanPhoneTool": return <KoreanPhoneTool />;
    case "KoreanBizNumTool": return <KoreanBizNumTool />;
    case "KoreanRrnTool": return <KoreanRrnTool />;
    case "FamilyKinshipTool": return <FamilyKinshipTool />;
    case "NumberFormatTool": return <NumberFormatTool />;
    case "StarsTool": return <StarsTool />;
    case "GolfHandicapTool": return <GolfHandicapTool />;
    case "TextSimilarityTool": return <TextSimilarityTool />;
    case "FontPreviewTool": return <FontPreviewTool />;
    case "WordCloudTool": return <WordCloudTool />;
    case "RandomStringTool": return <RandomStringTool />;
    case "EmojiSearchTool": return <EmojiSearchTool />;
    case "UserAgentTool": return <UserAgentTool />;
    case "PasswordComparatorTool": return <PasswordComparatorTool />;
    case "NumberToEnglishTool": return <NumberToEnglishTool />;
    case "JsBeautifierTool": return <JsBeautifierTool />;
    case "TextStatsTool": return <TextStatsTool />;
    default:
      return <div>도구를 찾을 수 없습니다.</div>;
  }
}
