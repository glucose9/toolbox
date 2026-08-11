"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolConfig } from "@/lib/tools";

// All tools are client-only (ssr:false). Without a loading placeholder the
// server HTML has a zero-height hole where the tool belongs, and the UI pops
// in mid-page shoving HowTo/article/FAQ down — large CLS on every tool page.
const lazyTool = <P extends object>(load: () => Promise<{ default: ComponentType<P> }>) =>
  dynamic(load, {
    ssr: false,
    loading: () => <div className="card min-h-[20rem] animate-pulse" aria-busy="true" />,
  });

const QRTool = lazyTool(() => import("./tools/QRTool"));
const ImageConvertTool = lazyTool(() => import("./tools/ImageConvertTool"));
const ImageCompressTool = lazyTool(() => import("./tools/ImageCompressTool"));
const ImageResizeTool = lazyTool(() => import("./tools/ImageResizeTool"));
const CounterTool = lazyTool(() => import("./tools/CounterTool"));
const ColorTool = lazyTool(() => import("./tools/ColorTool"));
const Base64Tool = lazyTool(() => import("./tools/Base64Tool"));
const PasswordTool = lazyTool(() => import("./tools/PasswordTool"));
const VideoToGifTool = lazyTool(() => import("./tools/VideoToGifTool"));
const VideoToMp3Tool = lazyTool(() => import("./tools/VideoToMp3Tool"));
const VideoCompressTool = lazyTool(() => import("./tools/VideoCompressTool"));
const VideoTrimTool = lazyTool(() => import("./tools/VideoTrimTool"));
const HwpViewerTool = lazyTool(() => import("./tools/HwpViewerTool"));
const HwpToTextTool = lazyTool(() => import("./tools/HwpToTextTool"));
const HwpToPdfTool = lazyTool(() => import("./tools/HwpToPdfTool"));
const HwpToHwpxTool = lazyTool(() => import("./tools/HwpToHwpxTool"));
const PdfMergeTool = lazyTool(() => import("./tools/PdfMergeTool"));
const PdfSplitTool = lazyTool(() => import("./tools/PdfSplitTool"));
const PdfRotateTool = lazyTool(() => import("./tools/PdfRotateTool"));
const PdfDeletePagesTool = lazyTool(() => import("./tools/PdfDeletePagesTool"));
const ImagesToPdfTool = lazyTool(() => import("./tools/ImagesToPdfTool"));
const PdfToImagesTool = lazyTool(() => import("./tools/PdfToImagesTool"));
const TextCaseTool = lazyTool(() => import("./tools/TextCaseTool"));
const TextSortTool = lazyTool(() => import("./tools/TextSortTool"));
const TextDedupeTool = lazyTool(() => import("./tools/TextDedupeTool"));
const JsonFormatterTool = lazyTool(() => import("./tools/JsonFormatterTool"));
const UrlEncoderTool = lazyTool(() => import("./tools/UrlEncoderTool"));
const HashTool = lazyTool(() => import("./tools/HashTool"));
const UuidTool = lazyTool(() => import("./tools/UuidTool"));
const RegexTesterTool = lazyTool(() => import("./tools/RegexTesterTool"));
const TimestampTool = lazyTool(() => import("./tools/TimestampTool"));
const Base64ImageTool = lazyTool(() => import("./tools/Base64ImageTool"));
const LoremIpsumTool = lazyTool(() => import("./tools/LoremIpsumTool"));
const MarkdownPreviewTool = lazyTool(() => import("./tools/MarkdownPreviewTool"));
const DiffCheckerTool = lazyTool(() => import("./tools/DiffCheckerTool"));
const CsvToJsonTool = lazyTool(() => import("./tools/CsvToJsonTool"));
const YamlJsonTool = lazyTool(() => import("./tools/YamlJsonTool"));
const ImageExifStripTool = lazyTool(() => import("./tools/ImageExifStripTool"));
const ImageCropTool = lazyTool(() => import("./tools/ImageCropTool"));
const ImageRotateTool = lazyTool(() => import("./tools/ImageRotateTool"));
const SpellCheckTool = lazyTool(() => import("./tools/SpellCheckTool"));
const MarkdownMathTool = lazyTool(() => import("./tools/MarkdownMathTool"));
const FaviconTool = lazyTool(() => import("./tools/FaviconTool"));
const ImageFilterTool = lazyTool(() => import("./tools/ImageFilterTool"));
const PdfWatermarkTool = lazyTool(() => import("./tools/PdfWatermarkTool"));
const PdfPageNumberTool = lazyTool(() => import("./tools/PdfPageNumberTool"));
const PdfTextExtractTool = lazyTool(() => import("./tools/PdfTextExtractTool"));
const JwtDecoderTool = lazyTool(() => import("./tools/JwtDecoderTool"));
const CssShadowTool = lazyTool(() => import("./tools/CssShadowTool"));
const JsonXmlTool = lazyTool(() => import("./tools/JsonXmlTool"));
const DDayTool = lazyTool(() => import("./tools/DDayTool"));
const UnitConverterTool = lazyTool(() => import("./tools/UnitConverterTool"));
const ImageTextOverlayTool = lazyTool(() => import("./tools/ImageTextOverlayTool"));
const ImageToAsciiTool = lazyTool(() => import("./tools/ImageToAsciiTool"));
const HeicToJpgTool = lazyTool(() => import("./tools/HeicToJpgTool"));
const AudioTrimTool = lazyTool(() => import("./tools/AudioTrimTool"));
const KorEngKeyboardTool = lazyTool(() => import("./tools/KorEngKeyboardTool"));
const BaseConverterTool = lazyTool(() => import("./tools/BaseConverterTool"));
const HtmlEntityTool = lazyTool(() => import("./tools/HtmlEntityTool"));
const PasswordStrengthTool = lazyTool(() => import("./tools/PasswordStrengthTool"));
const ColorContrastTool = lazyTool(() => import("./tools/ColorContrastTool"));
const LottoTool = lazyTool(() => import("./tools/LottoTool"));
const QrDecoderTool = lazyTool(() => import("./tools/QrDecoderTool"));
const ExifViewerTool = lazyTool(() => import("./tools/ExifViewerTool"));
const ColorExtractTool = lazyTool(() => import("./tools/ColorExtractTool"));
const GifToMp4Tool = lazyTool(() => import("./tools/GifToMp4Tool"));
const VideoThumbnailTool = lazyTool(() => import("./tools/VideoThumbnailTool"));
const VideoSpeedTool = lazyTool(() => import("./tools/VideoSpeedTool"));
const MarkdownTableTool = lazyTool(() => import("./tools/MarkdownTableTool"));
const DocxViewerTool = lazyTool(() => import("./tools/DocxViewerTool"));
const CssGradientTool = lazyTool(() => import("./tools/CssGradientTool"));
const KorRomanizeTool = lazyTool(() => import("./tools/KorRomanizeTool"));
const KoreanAgeTool = lazyTool(() => import("./tools/KoreanAgeTool"));
const LunarSolarTool = lazyTool(() => import("./tools/LunarSolarTool"));
const MorseTool = lazyTool(() => import("./tools/MorseTool"));
const CaesarCipherTool = lazyTool(() => import("./tools/CaesarCipherTool"));
const HttpStatusTool = lazyTool(() => import("./tools/HttpStatusTool"));
const PdfReorderTool = lazyTool(() => import("./tools/PdfReorderTool"));
const ImageStackTool = lazyTool(() => import("./tools/ImageStackTool"));
const ImageBorderTool = lazyTool(() => import("./tools/ImageBorderTool"));
const TextToSpeechTool = lazyTool(() => import("./tools/TextToSpeechTool"));
const WordFrequencyTool = lazyTool(() => import("./tools/WordFrequencyTool"));
const LatexEditorTool = lazyTool(() => import("./tools/LatexEditorTool"));
const SciCalcTool = lazyTool(() => import("./tools/SciCalcTool"));
const NumToKoreanTool = lazyTool(() => import("./tools/NumToKoreanTool"));
const PercentTool = lazyTool(() => import("./tools/PercentTool"));
const DiscountTool = lazyTool(() => import("./tools/DiscountTool"));
const VatTool = lazyTool(() => import("./tools/VatTool"));
const BmiTool = lazyTool(() => import("./tools/BmiTool"));
const CompoundTool = lazyTool(() => import("./tools/CompoundTool"));
const WorldTimeTool = lazyTool(() => import("./tools/WorldTimeTool"));
const NamePickerTool = lazyTool(() => import("./tools/NamePickerTool"));
const VideoRotateTool = lazyTool(() => import("./tools/VideoRotateTool"));
const ImagePixelateTool = lazyTool(() => import("./tools/ImagePixelateTool"));
const PdfExtractTool = lazyTool(() => import("./tools/PdfExtractTool"));
const MarkdownTocTool = lazyTool(() => import("./tools/MarkdownTocTool"));
const SqlFormatterTool = lazyTool(() => import("./tools/SqlFormatterTool"));
const CronParserTool = lazyTool(() => import("./tools/CronParserTool"));
const CidrCalcTool = lazyTool(() => import("./tools/CidrCalcTool"));
const TimeCalcTool = lazyTool(() => import("./tools/TimeCalcTool"));
const WageConverterTool = lazyTool(() => import("./tools/WageConverterTool"));
const DueDateTool = lazyTool(() => import("./tools/DueDateTool"));
const SlugGeneratorTool = lazyTool(() => import("./tools/SlugGeneratorTool"));
const HtmlMinifierTool = lazyTool(() => import("./tools/HtmlMinifierTool"));
const CssMinifierTool = lazyTool(() => import("./tools/CssMinifierTool"));
const JsMinifierTool = lazyTool(() => import("./tools/JsMinifierTool"));
const JsonDiffTool = lazyTool(() => import("./tools/JsonDiffTool"));
const TextBinaryTool = lazyTool(() => import("./tools/TextBinaryTool"));
const TextHexTool = lazyTool(() => import("./tools/TextHexTool"));
const AnsiToHtmlTool = lazyTool(() => import("./tools/AnsiToHtmlTool"));
const KeycodeTool = lazyTool(() => import("./tools/KeycodeTool"));
const FileToBase64Tool = lazyTool(() => import("./tools/FileToBase64Tool"));
const UnicodeLookupTool = lazyTool(() => import("./tools/UnicodeLookupTool"));
const SvgMinifierTool = lazyTool(() => import("./tools/SvgMinifierTool"));
const TextReverseTool = lazyTool(() => import("./tools/TextReverseTool"));
const LineNumbersTool = lazyTool(() => import("./tools/LineNumbersTool"));
const ReadingTimeTool = lazyTool(() => import("./tools/ReadingTimeTool"));
const HanjaToHangulTool = lazyTool(() => import("./tools/HanjaToHangulTool"));
const AsciiBoxTool = lazyTool(() => import("./tools/AsciiBoxTool"));
const EncodingConvertTool = lazyTool(() => import("./tools/EncodingConvertTool"));
const LineJoinerTool = lazyTool(() => import("./tools/LineJoinerTool"));
const TextCardTool = lazyTool(() => import("./tools/TextCardTool"));
const ImageCompareTool = lazyTool(() => import("./tools/ImageCompareTool"));
const ImageZipTool = lazyTool(() => import("./tools/ImageZipTool"));
const QrLogoTool = lazyTool(() => import("./tools/QrLogoTool"));
const QrTextTool = lazyTool(() => import("./tools/QrTextTool"));
const CiteFormatTool = lazyTool(() => import("./tools/CiteFormatTool"));
const DoiLookupTool = lazyTool(() => import("./tools/DoiLookupTool"));
const BibtexConvertTool = lazyTool(() => import("./tools/BibtexConvertTool"));
const BibSortTool = lazyTool(() => import("./tools/BibSortTool"));
const TitleCaseTool = lazyTool(() => import("./tools/TitleCaseTool"));
const KoreanCiteTool = lazyTool(() => import("./tools/KoreanCiteTool"));
const TextNormalizeTool = lazyTool(() => import("./tools/TextNormalizeTool"));
const FootnoteFormatTool = lazyTool(() => import("./tools/FootnoteFormatTool"));
const LoanCalcTool = lazyTool(() => import("./tools/LoanCalcTool"));
const SavingsCalcTool = lazyTool(() => import("./tools/SavingsCalcTool"));
const NetSalaryTool = lazyTool(() => import("./tools/NetSalaryTool"));
const GpaTool = lazyTool(() => import("./tools/GpaTool"));
const PyeongTool = lazyTool(() => import("./tools/PyeongTool"));
const GraphCalcTool = lazyTool(() => import("./tools/GraphCalcTool"));
const FormulaBuilderTool = lazyTool(() => import("./tools/FormulaBuilderTool"));
const PeriodicTableTool = lazyTool(() => import("./tools/PeriodicTableTool"));
const StatTablesTool = lazyTool(() => import("./tools/StatTablesTool"));
const PhysicsConstantsTool = lazyTool(() => import("./tools/PhysicsConstantsTool"));
const ChartMakerTool = lazyTool(() => import("./tools/ChartMakerTool"));
const HwpEditorTool = lazyTool(() => import("./tools/HwpEditorTool"));
const CarTaxTool = lazyTool(() => import("./tools/CarTaxTool"));
const SeverancePayTool = lazyTool(() => import("./tools/SeverancePayTool"));
const IncomeTaxTool = lazyTool(() => import("./tools/IncomeTaxTool"));
const SttTool = lazyTool(() => import("./tools/SttTool"));
const OcrTool = lazyTool(() => import("./tools/OcrTool"));
const PdfUnlockTool = lazyTool(() => import("./tools/PdfUnlockTool"));
const RealEstateTaxTool = lazyTool(() => import("./tools/RealEstateTaxTool"));
const YoutubeThumbnailTool = lazyTool(() => import("./tools/YoutubeThumbnailTool"));
const SubtitleTool = lazyTool(() => import("./tools/SubtitleTool"));
const ColorPaletteTool = lazyTool(() => import("./tools/ColorPaletteTool"));
const HanjaDictTool = lazyTool(() => import("./tools/HanjaDictTool"));
const VideoEditorTool = lazyTool(() => import("./tools/VideoEditorTool"));
const PomodoroTool = lazyTool(() => import("./tools/PomodoroTool"));
const TripSplitTool = lazyTool(() => import("./tools/TripSplitTool"));
const OgCardMakerTool = lazyTool(() => import("./tools/OgCardMakerTool"));
const MermaidTool = lazyTool(() => import("./tools/MermaidTool"));
const ImageBatchTool = lazyTool(() => import("./tools/ImageBatchTool"));
const VideoMergeTool = lazyTool(() => import("./tools/VideoMergeTool"));
const VideoMuteTool = lazyTool(() => import("./tools/VideoMuteTool"));
const VideoInfoTool = lazyTool(() => import("./tools/VideoInfoTool"));
const PdfBlankPageTool = lazyTool(() => import("./tools/PdfBlankPageTool"));
const PdfMetadataTool = lazyTool(() => import("./tools/PdfMetadataTool"));
const PdfCropTool = lazyTool(() => import("./tools/PdfCropTool"));
const CaffeineTool = lazyTool(() => import("./tools/CaffeineTool"));
const ZodiacTool = lazyTool(() => import("./tools/ZodiacTool"));
const ChineseZodiacTool = lazyTool(() => import("./tools/ChineseZodiacTool"));
const AlcoholConverterTool = lazyTool(() => import("./tools/AlcoholConverterTool"));
const BmrTool = lazyTool(() => import("./tools/BmrTool"));
const RunningPaceTool = lazyTool(() => import("./tools/RunningPaceTool"));
const TipTool = lazyTool(() => import("./tools/TipTool"));
const UnitPriceTool = lazyTool(() => import("./tools/UnitPriceTool"));
const DiceCoinTool = lazyTool(() => import("./tools/DiceCoinTool"));
const RpsTool = lazyTool(() => import("./tools/RpsTool"));
const KoreaHolidaysTool = lazyTool(() => import("./tools/KoreaHolidaysTool"));
const LunchPickerTool = lazyTool(() => import("./tools/LunchPickerTool"));
const BaseballStatsTool = lazyTool(() => import("./tools/BaseballStatsTool"));
const BookReadingTimeTool = lazyTool(() => import("./tools/BookReadingTimeTool"));
const ImageInvertTool = lazyTool(() => import("./tools/ImageInvertTool"));
const ImageWatermarkImgTool = lazyTool(() => import("./tools/ImageWatermarkImgTool"));
const ImageColorTransparentTool = lazyTool(() => import("./tools/ImageColorTransparentTool"));
const ImageChannelsTool = lazyTool(() => import("./tools/ImageChannelsTool"));
const ImageFreeRotateTool = lazyTool(() => import("./tools/ImageFreeRotateTool"));
const HtmlToTextTool = lazyTool(() => import("./tools/HtmlToTextTool"));
const HtmlToMarkdownTool = lazyTool(() => import("./tools/HtmlToMarkdownTool"));
const MarkdownToTextTool = lazyTool(() => import("./tools/MarkdownToTextTool"));
const TextCompressTool = lazyTool(() => import("./tools/TextCompressTool"));
const TextBlockquoteTool = lazyTool(() => import("./tools/TextBlockquoteTool"));
const DataSizeTool = lazyTool(() => import("./tools/DataSizeTool"));
const MimeTypesTool = lazyTool(() => import("./tools/MimeTypesTool"));
const CssColorsTool = lazyTool(() => import("./tools/CssColorsTool"));
const HttpMethodsTool = lazyTool(() => import("./tools/HttpMethodsTool"));
const EnvParserTool = lazyTool(() => import("./tools/EnvParserTool"));
const JamoDecomposeTool = lazyTool(() => import("./tools/JamoDecomposeTool"));
const DurationFormatTool = lazyTool(() => import("./tools/DurationFormatTool"));
const BcryptHashTool = lazyTool(() => import("./tools/BcryptHashTool"));
const RotAllTool = lazyTool(() => import("./tools/RotAllTool"));
const CardMaskTool = lazyTool(() => import("./tools/CardMaskTool"));
const PdfImagesExtractTool = lazyTool(() => import("./tools/PdfImagesExtractTool"));
const PdfNUpTool = lazyTool(() => import("./tools/PdfNUpTool"));
const PdfPageSizeTool = lazyTool(() => import("./tools/PdfPageSizeTool"));
const VideoResizeTool = lazyTool(() => import("./tools/VideoResizeTool"));
const AudioMergeTool = lazyTool(() => import("./tools/AudioMergeTool"));
const AudioVolumeTool = lazyTool(() => import("./tools/AudioVolumeTool"));
const ExchangeRateTool = lazyTool(() => import("./tools/ExchangeRateTool"));
const StatisticsTool = lazyTool(() => import("./tools/StatisticsTool"));
const CarFuelTool = lazyTool(() => import("./tools/CarFuelTool"));
const RentCalcTool = lazyTool(() => import("./tools/RentCalcTool"));
const SleepRecommendTool = lazyTool(() => import("./tools/SleepRecommendTool"));
const BloodDonationTool = lazyTool(() => import("./tools/BloodDonationTool"));
const InstallmentTool = lazyTool(() => import("./tools/InstallmentTool"));
const KoreanPhoneTool = lazyTool(() => import("./tools/KoreanPhoneTool"));
const KoreanBizNumTool = lazyTool(() => import("./tools/KoreanBizNumTool"));
const KoreanRrnTool = lazyTool(() => import("./tools/KoreanRrnTool"));
const FamilyKinshipTool = lazyTool(() => import("./tools/FamilyKinshipTool"));
const NumberFormatTool = lazyTool(() => import("./tools/NumberFormatTool"));
const StarsTool = lazyTool(() => import("./tools/StarsTool"));
const BeatMakerTool = lazyTool(() => import("./tools/BeatMakerTool"));
const GolfHandicapTool = lazyTool(() => import("./tools/GolfHandicapTool"));
const TextSimilarityTool = lazyTool(() => import("./tools/TextSimilarityTool"));
const FontPreviewTool = lazyTool(() => import("./tools/FontPreviewTool"));
const WordCloudTool = lazyTool(() => import("./tools/WordCloudTool"));
const RandomStringTool = lazyTool(() => import("./tools/RandomStringTool"));
const EmojiSearchTool = lazyTool(() => import("./tools/EmojiSearchTool"));
const UserAgentTool = lazyTool(() => import("./tools/UserAgentTool"));
const PasswordComparatorTool = lazyTool(() => import("./tools/PasswordComparatorTool"));
const NumberToEnglishTool = lazyTool(() => import("./tools/NumberToEnglishTool"));
const JsBeautifierTool = lazyTool(() => import("./tools/JsBeautifierTool"));
const TextStatsTool = lazyTool(() => import("./tools/TextStatsTool"));
const BarcodeGeneratorTool = lazyTool(() => import("./tools/BarcodeGeneratorTool"));
const BarcodeReaderTool = lazyTool(() => import("./tools/BarcodeReaderTool"));
const BackgroundRemoverTool = lazyTool(() => import("./tools/BackgroundRemoverTool"));
const AspectRatioTool = lazyTool(() => import("./tools/AspectRatioTool"));
const ColorBlindnessTool = lazyTool(() => import("./tools/ColorBlindnessTool"));
const PptxViewerTool = lazyTool(() => import("./tools/PptxViewerTool"));
const PptxToTextTool = lazyTool(() => import("./tools/PptxToTextTool"));
const PptxImagesTool = lazyTool(() => import("./tools/PptxImagesTool"));
const PptxInfoTool = lazyTool(() => import("./tools/PptxInfoTool"));
const TeleprompterTool = lazyTool(() => import("./tools/TeleprompterTool"));
const NumberTagsTool = lazyTool(() => import("./tools/NumberTagsTool"));
const DocxToPdfTool = lazyTool(() => import("./tools/DocxToPdfTool"));
const XlsxToPdfTool = lazyTool(() => import("./tools/XlsxToPdfTool"));
const PptxToPdfTool = lazyTool(() => import("./tools/PptxToPdfTool"));
const HtmlToPdfTool = lazyTool(() => import("./tools/HtmlToPdfTool"));
const MdToPdfTool = lazyTool(() => import("./tools/MdToPdfTool"));
const TxtToPdfTool = lazyTool(() => import("./tools/TxtToPdfTool"));
const PdfToDocxTool = lazyTool(() => import("./tools/PdfToDocxTool"));
const PdfToPptxTool = lazyTool(() => import("./tools/PdfToPptxTool"));
const PdfToHtmlTool = lazyTool(() => import("./tools/PdfToHtmlTool"));
const KakaoChatTool = lazyTool(() => import("./tools/KakaoChatTool"));
const MemeGeneratorTool = lazyTool(() => import("./tools/MemeGeneratorTool"));
const ImageColorPickerTool = lazyTool(() => import("./tools/ImageColorPickerTool"));
const CodeToImageTool = lazyTool(() => import("./tools/CodeToImageTool"));
const HtmlToImageTool = lazyTool(() => import("./tools/HtmlToImageTool"));
const SvgBlobTool = lazyTool(() => import("./tools/SvgBlobTool"));
const DataUriTool = lazyTool(() => import("./tools/DataUriTool"));
const FileHashVerifyTool = lazyTool(() => import("./tools/FileHashVerifyTool"));
const FileSplitJoinTool = lazyTool(() => import("./tools/FileSplitJoinTool"));
const PdfEsignTool = lazyTool(() => import("./tools/PdfEsignTool"));
const PdfCompressTool = lazyTool(() => import("./tools/PdfCompressTool"));

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
    case "CiteFormatTool": return <CiteFormatTool />;
    case "DoiLookupTool": return <DoiLookupTool />;
    case "BibtexConvertTool": return <BibtexConvertTool />;
    case "BibSortTool": return <BibSortTool />;
    case "TitleCaseTool": return <TitleCaseTool />;
    case "KoreanCiteTool": return <KoreanCiteTool />;
    case "TextNormalizeTool": return <TextNormalizeTool />;
    case "FootnoteFormatTool": return <FootnoteFormatTool />;
    case "LoanCalcTool": return <LoanCalcTool />;
    case "SavingsCalcTool": return <SavingsCalcTool />;
    case "NetSalaryTool": return <NetSalaryTool />;
    case "GpaTool": return <GpaTool />;
    case "PyeongTool": return <PyeongTool />;
    case "GraphCalcTool": return <GraphCalcTool />;
    case "FormulaBuilderTool": return <FormulaBuilderTool />;
    case "PeriodicTableTool": return <PeriodicTableTool />;
    case "StatTablesTool": return <StatTablesTool />;
    case "PhysicsConstantsTool": return <PhysicsConstantsTool />;
    case "ChartMakerTool": return <ChartMakerTool />;
    case "HwpEditorTool": return <HwpEditorTool />;
    case "CarTaxTool": return <CarTaxTool />;
    case "SeverancePayTool": return <SeverancePayTool />;
    case "IncomeTaxTool": return <IncomeTaxTool />;
    case "SttTool": return <SttTool />;
    case "OcrTool": return <OcrTool />;
    case "PdfUnlockTool": return <PdfUnlockTool />;
    case "RealEstateTaxTool": return <RealEstateTaxTool />;
    case "YoutubeThumbnailTool": return <YoutubeThumbnailTool />;
    case "SubtitleTool": return <SubtitleTool />;
    case "ColorPaletteTool": return <ColorPaletteTool />;
    case "HanjaDictTool": return <HanjaDictTool />;
    case "VideoEditorTool": return <VideoEditorTool />;
    case "PomodoroTool": return <PomodoroTool />;
    case "TripSplitTool": return <TripSplitTool />;
    case "OgCardMakerTool": return <OgCardMakerTool />;
    case "MermaidTool": return <MermaidTool />;
    case "ImageBatchTool": return <ImageBatchTool />;
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
    case "BeatMakerTool": return <BeatMakerTool />;
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
    case "BarcodeGeneratorTool": return <BarcodeGeneratorTool config={config} />;
    case "BarcodeReaderTool": return <BarcodeReaderTool />;
    case "BackgroundRemoverTool": return <BackgroundRemoverTool />;
    case "AspectRatioTool": return <AspectRatioTool />;
    case "ColorBlindnessTool": return <ColorBlindnessTool />;
    case "PptxViewerTool": return <PptxViewerTool />;
    case "PptxToTextTool": return <PptxToTextTool />;
    case "PptxImagesTool": return <PptxImagesTool />;
    case "PptxInfoTool": return <PptxInfoTool />;
    case "TeleprompterTool": return <TeleprompterTool />;
    case "NumberTagsTool": return <NumberTagsTool />;
    case "DocxToPdfTool": return <DocxToPdfTool />;
    case "XlsxToPdfTool": return <XlsxToPdfTool />;
    case "PptxToPdfTool": return <PptxToPdfTool />;
    case "HtmlToPdfTool": return <HtmlToPdfTool />;
    case "MdToPdfTool": return <MdToPdfTool />;
    case "TxtToPdfTool": return <TxtToPdfTool />;
    case "PdfToDocxTool": return <PdfToDocxTool />;
    case "PdfToPptxTool": return <PdfToPptxTool />;
    case "PdfToHtmlTool": return <PdfToHtmlTool />;
    case "KakaoChatTool": return <KakaoChatTool />;
    case "MemeGeneratorTool": return <MemeGeneratorTool />;
    case "ImageColorPickerTool": return <ImageColorPickerTool />;
    case "CodeToImageTool": return <CodeToImageTool />;
    case "HtmlToImageTool": return <HtmlToImageTool />;
    case "SvgBlobTool": return <SvgBlobTool />;
    case "DataUriTool": return <DataUriTool />;
    case "FileHashVerifyTool": return <FileHashVerifyTool />;
    case "FileSplitJoinTool": return <FileSplitJoinTool />;
    case "PdfEsignTool": return <PdfEsignTool />;
    case "PdfCompressTool": return <PdfCompressTool />;
    default:
      return <div>Tool not found.</div>;
  }
}
