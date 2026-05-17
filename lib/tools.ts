export type FAQItem = { q: string; a: string };

export type ToolConfig = {
  slug: string;
  component:
    | "QRTool"
    | "ImageConvertTool"
    | "ImageCompressTool"
    | "ImageResizeTool"
    | "CounterTool"
    | "ColorTool"
    | "Base64Tool"
    | "PasswordTool"
    | "VideoToGifTool"
    | "VideoToMp3Tool"
    | "VideoCompressTool"
    | "VideoTrimTool"
    | "HwpViewerTool"
    | "HwpToTextTool"
    | "HwpToPdfTool"
    | "HwpToHwpxTool"
    | "PdfMergeTool"
    | "PdfSplitTool"
    | "PdfRotateTool"
    | "PdfDeletePagesTool"
    | "ImagesToPdfTool"
    | "PdfToImagesTool"
    | "TextCaseTool"
    | "TextSortTool"
    | "TextDedupeTool"
    | "JsonFormatterTool"
    | "UrlEncoderTool"
    | "HashTool"
    | "UuidTool"
    | "RegexTesterTool"
    | "TimestampTool"
    | "Base64ImageTool"
    | "LoremIpsumTool"
    | "MarkdownPreviewTool"
    | "DiffCheckerTool"
    | "CsvToJsonTool"
    | "YamlJsonTool"
    | "ImageExifStripTool"
    | "ImageCropTool"
    | "ImageRotateTool"
    | "SpellCheckTool"
    | "MarkdownMathTool"
    | "FaviconTool"
    | "ImageFilterTool"
    | "PdfWatermarkTool"
    | "PdfPageNumberTool"
    | "PdfTextExtractTool"
    | "JwtDecoderTool"
    | "CssShadowTool"
    | "JsonXmlTool"
    | "DDayTool"
    | "UnitConverterTool"
    | "ImageTextOverlayTool"
    | "ImageToAsciiTool"
    | "HeicToJpgTool"
    | "AudioTrimTool"
    | "KorEngKeyboardTool"
    | "BaseConverterTool"
    | "HtmlEntityTool"
    | "PasswordStrengthTool"
    | "ColorContrastTool"
    | "LottoTool"
    | "QrDecoderTool"
    | "ExifViewerTool"
    | "ColorExtractTool"
    | "GifToMp4Tool"
    | "VideoThumbnailTool"
    | "VideoSpeedTool"
    | "MarkdownTableTool"
    | "DocxViewerTool"
    | "CssGradientTool"
    | "KorRomanizeTool"
    | "KoreanAgeTool"
    | "LunarSolarTool"
    | "MorseTool"
    | "CaesarCipherTool"
    | "HttpStatusTool"
    | "PdfReorderTool"
    | "ImageStackTool"
    | "ImageBorderTool"
    | "TextToSpeechTool"
    | "WordFrequencyTool"
    | "LatexEditorTool"
    | "SciCalcTool"
    | "NumToKoreanTool"
    | "PercentTool"
    | "DiscountTool"
    | "VatTool"
    | "BmiTool"
    | "CompoundTool"
    | "WorldTimeTool"
    | "NamePickerTool"
    | "VideoRotateTool"
    | "ImagePixelateTool"
    | "PdfExtractTool"
    | "MarkdownTocTool"
    | "SqlFormatterTool"
    | "CronParserTool"
    | "CidrCalcTool"
    | "TimeCalcTool"
    | "WageConverterTool"
    | "DueDateTool"
    | "SlugGeneratorTool"
    | "HtmlMinifierTool"
    | "CssMinifierTool"
    | "JsMinifierTool"
    | "JsonDiffTool"
    | "TextBinaryTool"
    | "TextHexTool"
    | "AnsiToHtmlTool"
    | "KeycodeTool"
    | "FileToBase64Tool"
    | "UnicodeLookupTool"
    | "SvgMinifierTool"
    | "TextReverseTool"
    | "LineNumbersTool"
    | "ReadingTimeTool"
    | "HanjaToHangulTool"
    | "AsciiBoxTool"
    | "EncodingConvertTool"
    | "LineJoinerTool"
    | "TextCardTool"
    | "ImageCompareTool"
    | "ImageZipTool"
    | "QrLogoTool"
    | "QrTextTool"
    | "CiteFormatTool"
    | "DoiLookupTool"
    | "BibtexConvertTool"
    | "BibSortTool"
    | "TitleCaseTool"
    | "KoreanCiteTool"
    | "TextNormalizeTool"
    | "FootnoteFormatTool"
    | "LoanCalcTool"
    | "SavingsCalcTool"
    | "NetSalaryTool"
    | "GpaTool"
    | "PyeongTool"
    | "GraphCalcTool"
    | "FormulaBuilderTool"
    | "PeriodicTableTool"
    | "VideoMergeTool"
    | "VideoMuteTool"
    | "VideoInfoTool"
    | "PdfBlankPageTool"
    | "PdfMetadataTool"
    | "PdfCropTool"
    | "CaffeineTool"
    | "ZodiacTool"
    | "ChineseZodiacTool"
    | "AlcoholConverterTool"
    | "BmrTool"
    | "RunningPaceTool"
    | "TipTool"
    | "UnitPriceTool"
    | "DiceCoinTool"
    | "RpsTool"
    | "KoreaHolidaysTool"
    | "LunchPickerTool"
    | "BaseballStatsTool"
    | "BookReadingTimeTool"
    | "ImageInvertTool"
    | "ImageWatermarkImgTool"
    | "ImageColorTransparentTool"
    | "ImageChannelsTool"
    | "ImageFreeRotateTool"
    | "HtmlToTextTool"
    | "HtmlToMarkdownTool"
    | "MarkdownToTextTool"
    | "TextCompressTool"
    | "TextBlockquoteTool"
    | "DataSizeTool"
    | "MimeTypesTool"
    | "CssColorsTool"
    | "HttpMethodsTool"
    | "EnvParserTool"
    | "JamoDecomposeTool"
    | "DurationFormatTool"
    | "BcryptHashTool"
    | "RotAllTool"
    | "CardMaskTool"
    | "PdfImagesExtractTool"
    | "PdfNUpTool"
    | "PdfPageSizeTool"
    | "VideoResizeTool"
    | "AudioMergeTool"
    | "AudioVolumeTool"
    | "ExchangeRateTool"
    | "StatisticsTool"
    | "CarFuelTool"
    | "RentCalcTool"
    | "SleepRecommendTool"
    | "BloodDonationTool"
    | "InstallmentTool"
    | "KoreanPhoneTool"
    | "KoreanBizNumTool"
    | "KoreanRrnTool"
    | "FamilyKinshipTool"
    | "NumberFormatTool"
    | "StarsTool"
    | "GolfHandicapTool"
    | "TextSimilarityTool"
    | "FontPreviewTool"
    | "WordCloudTool"
    | "RandomStringTool"
    | "EmojiSearchTool"
    | "UserAgentTool"
    | "PasswordComparatorTool"
    | "NumberToEnglishTool"
    | "JsBeautifierTool"
    | "TextStatsTool";
  category: "qr" | "image" | "video" | "text" | "dev" | "document" | "pdf" | "calc" | "academic";
  icon: string;
  navTitle: string;
  title: string;
  h1: string;
  description: string;
  metaDescription: string;
  howTo: string[];
  faq: FAQItem[];
  addedAt?: string;
  config?: Record<string, unknown>;
};

export function isNewTool(tool: ToolConfig): boolean {
  if (!tool.addedAt) return false;
  const added = new Date(tool.addedAt).getTime();
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return added > thirtyDaysAgo;
}

export const SITE_NAME = "바로킷";
export const SITE_URL = "https://barokit.com";
export const SITE_TAGLINE = "무료 온라인 도구 모음 — QR · 이미지 · 동영상";

export const tools: ToolConfig[] = [
  // ===== QR =====
  {
    slug: "qr",
    component: "QRTool",
    category: "qr",
    icon: "🔳",
    navTitle: "QR코드 생성기",
    title: "QR코드 생성기 - 무료 QR 만들기 (워터마크 없음, 가입 불필요)",
    h1: "QR코드 무료 생성기",
    description:
      "URL, 와이파이, 명함, 텍스트를 QR코드로 변환하세요. 워터마크 없는 PNG/SVG로 다운로드되고, 가입 없이 평생 무료입니다.",
    metaDescription:
      "URL·와이파이·명함·텍스트 QR코드를 무료로 만드세요. 워터마크 없음, 가입 불필요, 즉시 PNG·SVG 다운로드.",
    howTo: [
      "원하는 QR 종류를 위 탭에서 선택합니다 (URL, 와이파이, 명함, 텍스트).",
      "입력 칸에 내용을 채우면 오른쪽에 QR이 실시간으로 만들어집니다.",
      "PNG 또는 SVG 버튼을 눌러 다운로드합니다.",
      "인쇄, 명함, 포스터, 카카오톡 어디든 사용하세요.",
    ],
    faq: [
      { q: "정말 무료인가요?", a: "네. 평생 무료이고 워터마크가 들어가지 않습니다. 회원가입도 필요 없습니다." },
      { q: "만든 QR코드는 영구히 사용 가능한가요?", a: "네. 정적 QR코드라 만든 이미지 자체가 데이터를 담고 있어, 이 사이트가 닫혀도 그대로 작동합니다." },
      { q: "어떤 파일로 받을 수 있나요?", a: "PNG와 SVG 두 가지 형식을 지원합니다. 인쇄용은 SVG, 디지털용은 PNG를 추천합니다." },
      { q: "QR코드 크기는 어떻게 조절하나요?", a: "다운로드한 PNG 파일을 인쇄 프로그램에서 원하는 크기로 늘리거나, SVG로 받으면 화질 손상 없이 무한히 확대됩니다." },
    ],
    config: { defaultTab: "url" },
  },
  {
    slug: "qr-wifi",
    component: "QRTool",
    category: "qr",
    icon: "📶",
    navTitle: "와이파이 QR",
    title: "와이파이 QR코드 만들기 - 비밀번호 자동 연결 QR",
    h1: "와이파이 QR코드 만들기",
    description:
      "Wi-Fi 이름과 비밀번호를 QR코드로 만들면 손님이 스캔만으로 와이파이에 자동 접속됩니다. 카페·식당·에어비앤비에 딱입니다.",
    metaDescription:
      "와이파이 SSID와 비밀번호를 QR코드로. 스캔 한 번으로 자동 연결, 카페/매장/숙소용. 무료, 워터마크 없음.",
    howTo: [
      "와이파이 이름(SSID)을 정확히 입력합니다.",
      "비밀번호와 암호화 방식(WPA/WEP/없음)을 선택합니다.",
      "오른쪽에 생성된 QR을 PNG로 다운로드해 인쇄합니다.",
      "테이블, 벽, 메뉴판에 부착하면 손님이 카메라로 스캔만 하면 자동 접속됩니다.",
    ],
    faq: [
      { q: "아이폰에서도 자동 연결되나요?", a: "네. iOS 11+, Android 10+ 기본 카메라로 스캔하면 와이파이 연결 알림이 자동으로 뜹니다." },
      { q: "공개 와이파이(비밀번호 없음)도 만들 수 있나요?", a: "네. 암호화 방식을 '없음'으로 선택하면 됩니다." },
      { q: "비밀번호가 노출되지 않을까요?", a: "QR 이미지 안에 비밀번호가 평문으로 들어갑니다. 외부에 공유할 거라면 게스트용 별도 와이파이를 만드는 것을 권장합니다." },
    ],
    config: { defaultTab: "wifi" },
  },
  {
    slug: "qr-vcard",
    component: "QRTool",
    category: "qr",
    icon: "💳",
    navTitle: "명함 QR",
    title: "명함 QR코드 만들기 - 스캔하면 연락처 자동 저장",
    h1: "명함 QR코드 (vCard) 만들기",
    description:
      "이름·회사·전화번호·이메일을 QR로 만드세요. 스캔하면 스마트폰 연락처에 바로 저장됩니다. 종이 명함에 인쇄해두면 명함 교환이 1초로 끝납니다.",
    metaDescription:
      "이름, 회사, 연락처를 담은 QR 명함 무료 생성. 스캔만으로 휴대폰 연락처에 자동 저장.",
    howTo: [
      "이름, 회사, 직책, 전화번호, 이메일, 웹사이트를 입력합니다.",
      "QR이 오른쪽에 즉시 만들어집니다.",
      "PNG로 다운로드해 명함 뒷면에 인쇄합니다.",
      "받은 사람이 스캔하면 모든 정보가 연락처에 한 번에 저장됩니다.",
    ],
    faq: [
      { q: "vCard가 뭔가요?", a: "전 세계 표준 디지털 명함 포맷입니다. 모든 스마트폰이 자동으로 인식해 연락처에 저장합니다." },
      { q: "한 명함에 여러 전화번호를 넣을 수 있나요?", a: "한 도구에서는 한 번호만 지원합니다. 휴대폰/사무실을 따로 표기하려면 메인 번호 1개와 추가 정보를 회사명에 함께 넣으세요." },
      { q: "한글 이름도 지원되나요?", a: "네. 한국어, 영어, 일본어, 중국어 모두 정상 인식됩니다." },
    ],
    config: { defaultTab: "vcard" },
  },

  {
    slug: "qr-decoder",
    component: "QrDecoderTool",
    category: "qr",
    icon: "🔍",
    navTitle: "QR 코드 읽기",
    title: "QR 코드 디코더 - 이미지에서 QR 자동 인식",
    h1: "QR 코드 디코더 (이미지 → 텍스트)",
    description:
      "QR 코드가 찍힌 사진을 업로드하면 내용을 자동으로 읽어냅니다. 와이파이·URL·명함 QR 모두 인식. 카메라 없이 PC에서도 사용 가능.",
    metaDescription:
      "QR 코드 이미지 무료 디코더. URL·와이파이·명함 QR 인식, 브라우저에서 안전 처리.",
    howTo: [
      "QR 코드가 있는 이미지를 업로드합니다.",
      "내용이 자동으로 인식되어 표시됩니다.",
      "URL이면 클릭해 바로 열고, 텍스트면 복사합니다.",
    ],
    faq: [
      { q: "어떤 QR 타입을 인식하나요?", a: "표준 QR 모두 (URL, 와이파이, vCard, 텍스트). 흐릿하거나 작은 QR은 인식이 어려울 수 있습니다." },
      { q: "사진이 외부로 가나요?", a: "아니요. 브라우저 안에서 jsQR로 처리됩니다." },
    ],
    addedAt: "2026-05-14",
  },

  // ===== Image converters =====
  {
    slug: "png-to-jpg",
    component: "ImageConvertTool",
    category: "image",
    icon: "🖼️",
    navTitle: "PNG → JPG",
    title: "PNG to JPG 변환 - 무료 온라인 이미지 변환기",
    h1: "PNG을 JPG로 변환",
    description:
      "PNG 이미지를 JPG로 즉시 변환하세요. 파일은 브라우저 안에서 처리되어 어디로도 업로드되지 않습니다. 카톡·이메일 첨부 시 용량을 줄이거나, 인쇄소가 JPG만 받을 때, 블로그/SNS 업로드 시 호환성을 높이는 데 자주 쓰입니다. 화질 조절 가능, 무료, 가입 불필요.",
    metaDescription:
      "PNG을 JPG로 무료 변환. 브라우저에서 처리되어 안전, 화질 조절 가능, 가입 불필요.",
    howTo: [
      "PNG 파일을 드래그하거나 클릭해서 업로드합니다.",
      "원하는 화질을 슬라이더로 조절합니다 (90% 권장).",
      "변환 결과를 미리보기로 확인합니다.",
      "다운로드 버튼을 눌러 JPG 파일을 저장합니다.",
    ],
    faq: [
      { q: "내 파일이 서버로 업로드되나요?", a: "아니요. 변환은 브라우저 안에서 일어나고 파일은 어디로도 전송되지 않습니다." },
      { q: "투명 배경은 어떻게 되나요?", a: "JPG는 투명도를 지원하지 않아 투명 배경이 흰색으로 채워집니다. 다른 색을 원하면 [이미지 액자 추가] 도구로 미리 배경을 채우세요." },
      { q: "여러 장을 한 번에 변환할 수 있나요?", a: "현재 한 번에 한 장씩 변환됩니다. 여러 장은 순서대로 업로드해주세요." },
      { q: "PNG가 JPG보다 화질이 좋다는데 왜 바꾸나요?", a: "사진은 JPG가 용량 대비 화질이 더 좋습니다. 로고·스크린샷·도형 위주가 아니면 JPG 변환이 합리적입니다." },
      { q: "변환 후 용량이 얼마나 줄어드나요?", a: "사진 위주 PNG는 90% 화질 JPG로 변환 시 50~80% 용량 감소가 일반적입니다. 단색·로고 PNG는 차이가 적습니다." },
      { q: "화질을 100%로 두면 무손실인가요?", a: "JPG는 본질적으로 손실 압축이라 100%도 완전 무손실은 아닙니다. 무손실이 꼭 필요하면 PNG·WebP(무손실)를 유지하세요." },
    ],
    config: { from: "png", to: "jpeg", defaultQuality: 0.9 },
  },
  {
    slug: "jpg-to-png",
    component: "ImageConvertTool",
    category: "image",
    icon: "🖼️",
    navTitle: "JPG → PNG",
    title: "JPG to PNG 변환 - 무료 무손실 이미지 변환",
    h1: "JPG를 PNG로 변환",
    description:
      "JPG 이미지를 PNG로 변환합니다. PNG는 무손실 포맷이라 인쇄용·편집용으로 더 깨끗하고, 투명 배경을 지원해 디자인 작업에 유리합니다. 로고를 PNG로 다시 받기, 포토샵·일러스트레이터에 깔끔하게 불러오기, 인쇄소에 무손실 파일 보내기 등에 유용합니다.",
    metaDescription:
      "JPG를 PNG로 무료 변환. 무손실, 안전, 가입 불필요.",
    howTo: [
      "JPG 파일을 드래그하거나 클릭해서 업로드합니다.",
      "오른쪽 미리보기에서 결과를 확인합니다.",
      "PNG 다운로드 버튼을 누릅니다.",
    ],
    faq: [
      { q: "왜 PNG가 JPG보다 용량이 큰가요?", a: "PNG는 무손실 압축이라 모든 픽셀 정보를 보존합니다. 사진은 JPG가 작고, 로고나 스크린샷은 PNG가 더 적합합니다." },
      { q: "JPG에서 사라진 화질이 PNG로 변환하면 살아나나요?", a: "아닙니다. 이미 손실된 정보는 복구되지 않으니, 가능하면 원본부터 PNG로 저장하세요. PNG 변환은 '추가 손실을 막는' 정도의 의미입니다." },
      { q: "변환한 PNG의 배경도 투명한가요?", a: "JPG에는 투명도가 없어 PNG로 바꿔도 흰색 배경이 그대로 남습니다. 배경을 투명하게 만들려면 별도의 배경 제거 도구가 필요합니다." },
      { q: "PNG가 더 깨끗한 게 맞나요?", a: "원본 JPG의 화질이 곧 PNG의 한계입니다. PNG는 '여기서부터 더 안 깎이게 보존'한다는 의미입니다." },
      { q: "여러 장을 한 번에 변환할 수 있나요?", a: "현재는 한 장씩 변환됩니다. 여러 장은 순서대로 업로드해주세요." },
    ],
    config: { from: "jpeg", to: "png" },
  },
  {
    slug: "webp-to-jpg",
    component: "ImageConvertTool",
    category: "image",
    icon: "🖼️",
    navTitle: "WebP → JPG",
    title: "WebP to JPG 변환 - 무료 웹P 이미지 변환기",
    h1: "WebP를 JPG로 변환",
    description:
      "WebP 이미지를 JPG로 변환합니다. 카톡·이메일·워드 문서에 첨부했을 때 안 열리는 WebP를 한 번에 해결하세요. 웹에서 다운받은 사진이 WebP라서 보고서·게시판에 못 넣을 때, 구버전 윈도우/오피스 환경에서 호환성을 맞춰야 할 때 유용합니다.",
    metaDescription:
      "WebP를 JPG로 무료 변환. 카톡/문서 호환 문제 해결, 안전, 가입 불필요.",
    howTo: [
      "WebP 파일을 업로드합니다.",
      "화질을 선택합니다 (보통 90%면 충분).",
      "JPG로 다운로드합니다.",
    ],
    faq: [
      { q: "WebP가 뭔가요?", a: "구글이 만든 차세대 이미지 포맷으로 용량이 작지만 일부 앱이나 문서에서 열리지 않습니다. 현대 브라우저는 다 지원하지만 한컴오피스 구버전·일부 메신저에서 문제가 됩니다." },
      { q: "왜 카톡에 WebP를 보내면 안 열리나요?", a: "구버전 카톡이나 일부 디바이스에서 WebP 표시를 지원하지 않습니다. JPG로 변환하면 어디서나 열립니다." },
      { q: "투명한 WebP는 어떻게 처리되나요?", a: "JPG는 투명도가 없어 투명 부분이 흰색으로 채워집니다. 투명 보존이 필요하면 PNG 변환 도구를 사용하세요." },
      { q: "변환하면 화질이 떨어지나요?", a: "WebP → JPG는 재인코딩되어 미세한 손실이 있지만 화질 90% 이상이면 거의 차이 없습니다." },
      { q: "왜 인터넷에서 받은 사진이 WebP인가요?", a: "최근 구글 검색·네이버·일부 SNS가 용량 절감 목적으로 WebP를 기본 포맷으로 사용합니다. '다른 이름으로 저장' 시 WebP로 받게 됩니다." },
    ],
    config: { from: "webp", to: "jpeg", defaultQuality: 0.9 },
  },
  {
    slug: "jpg-to-webp",
    component: "ImageConvertTool",
    category: "image",
    icon: "🖼️",
    navTitle: "JPG → WebP",
    title: "JPG to WebP 변환 - 웹사이트용 이미지 최적화",
    h1: "JPG를 WebP로 변환",
    description:
      "JPG를 WebP로 변환해 용량을 30~70% 줄이세요. 웹사이트 로딩 속도가 빨라지고 Core Web Vitals·SEO 점수에 긍정적입니다. 블로그·쇼핑몰·개인 홈페이지에 사진 업로드 전 일괄 최적화에 자주 쓰입니다.",
    metaDescription:
      "JPG를 WebP로 무료 변환. 용량 최대 70% 절감, 웹사이트 속도 개선.",
    howTo: [
      "JPG 파일을 업로드합니다.",
      "화질을 조절합니다 (80%면 눈에 거의 차이 없음).",
      "WebP로 다운로드합니다.",
    ],
    faq: [
      { q: "WebP 사용해도 화질이 떨어지지 않나요?", a: "동일 화질일 때 WebP가 JPG보다 25~35% 작습니다. 80% 품질에서 시각적 차이를 거의 느낄 수 없습니다." },
      { q: "구형 브라우저에서도 보이나요?", a: "현대 브라우저 99% 지원합니다 (Chrome·Safari·Firefox·Edge 모두). IE만 미지원이지만 IE는 이미 지원 종료됐습니다." },
      { q: "WebP가 SEO에 정말 도움이 되나요?", a: "Google이 페이지 속도(LCP)를 검색 순위에 반영하므로 이미지 용량 절감이 직접적인 도움이 됩니다. 다만 콘텐츠 품질만큼 결정적이진 않습니다." },
      { q: "워드프레스·티스토리에서도 쓸 수 있나요?", a: "워드프레스는 5.8+부터 기본 지원, 티스토리·네이버 블로그도 업로드 가능합니다. 다만 일부 구버전 테마는 자동 호환 안 될 수 있습니다." },
      { q: "투명도가 있는 PNG도 WebP로 바꿀 수 있나요?", a: "이 도구는 JPG → WebP 전용입니다. PNG는 WebP로 바꾸면 투명도와 무손실 모드를 그대로 활용할 수 있어 더 큰 효과가 있습니다 (별도 도구 사용)." },
    ],
    config: { from: "jpeg", to: "webp", defaultQuality: 0.8 },
    addedAt: "2026-05-12",
  },

  // ===== Image compress / resize =====
  {
    slug: "image-compress",
    component: "ImageCompressTool",
    category: "image",
    icon: "🗜️",
    navTitle: "이미지 압축",
    title: "이미지 압축 - 무료 온라인 사진 용량 줄이기",
    h1: "이미지 용량 줄이기",
    description:
      "사진 용량을 화질 손상 최소화로 80% 이상 줄이세요. 이메일 첨부 제한, 카톡 5MB 제한, 게시판 업로드 한도, 블로그 페이지 속도 개선, 클라우드 스토리지 절약 등에 자주 쓰입니다.",
    metaDescription:
      "사진 용량 무료 압축. 최대 80% 절감, 화질 손상 최소, 브라우저 안전 처리.",
    howTo: [
      "이미지를 업로드합니다 (JPG/PNG/WebP).",
      "화질 슬라이더를 조절합니다 (70~80% 추천).",
      "압축 전후 용량을 비교한 뒤 다운로드합니다.",
    ],
    faq: [
      { q: "원본 화질이 사라지나요?", a: "압축은 손실 압축입니다. 원본은 보존되니 압축 결과가 마음에 안 들면 화질을 높여 다시 받으세요." },
      { q: "PNG도 압축되나요?", a: "PNG는 무손실 포맷이라 효과가 적습니다. PNG 용량을 크게 줄이려면 JPG/WebP 변환을 추천합니다." },
      { q: "여러 장을 한 번에 압축할 수 있나요?", a: "현재는 한 장씩 처리됩니다. 여러 장이면 순서대로 업로드하거나 [이미지 ZIP 묶기] 도구로 합쳐서 받으세요." },
      { q: "어느 정도 화질이 적당한가요?", a: "웹·메신저용은 70~80%면 시각적 차이가 거의 없으면서 용량은 절반 이상 줄어듭니다. 인쇄·보관용은 90% 이상 권장." },
      { q: "이메일 첨부 25MB 제한을 넘기는 사진이 있어요.", a: "이 도구로 압축하거나 [이미지 크기 변경]으로 가로 1920px 이하로 줄이면 대부분 해결됩니다. 그래도 안 되면 ZIP으로 묶거나 클라우드 링크를 보내세요." },
      { q: "투명도가 있는 PNG의 투명도가 사라지진 않나요?", a: "PNG를 PNG로 압축하면 투명도는 그대로입니다. 다만 JPG/WebP(손실 모드)로 바꾸면 흰 배경으로 채워질 수 있습니다." },
    ],
  },
  {
    slug: "image-resize",
    component: "ImageResizeTool",
    category: "image",
    icon: "📐",
    navTitle: "이미지 크기 변경",
    title: "이미지 크기 변경 - 무료 온라인 리사이즈",
    h1: "이미지 크기 변경 (리사이즈)",
    description:
      "이미지를 원하는 픽셀 크기로 조절하세요. 비율 자동 유지, 화질 유지, 무료, 워터마크 없음. 블로그 썸네일 1200×630, 인스타 1080×1080, 프로필 사진 500×500 같은 SNS·게시판 규격에 맞추는 데 자주 쓰입니다.",
    metaDescription:
      "이미지 가로·세로 픽셀을 무료로 조절. 비율 유지, 즉시 다운로드.",
    howTo: [
      "이미지를 업로드합니다.",
      "원하는 가로 또는 세로 픽셀을 입력합니다 (비율 자동 유지).",
      "리사이즈된 이미지를 다운로드합니다.",
    ],
    faq: [
      { q: "비율을 무시하고 늘릴 수 있나요?", a: "'비율 유지' 체크를 해제하면 자유 비율로 늘릴 수 있지만 이미지가 일그러질 수 있습니다." },
      { q: "큰 이미지로 늘리면 화질이 좋아지나요?", a: "아닙니다. 픽셀 정보는 늘릴수록 흐려지니, 가능한 한 큰 원본에서 줄이는 방향으로 사용하세요." },
      { q: "SNS 규격(인스타·페북)에 맞추려면?", a: "인스타 정사각형 1080×1080, 스토리/릴스 1080×1920, 페이스북 커버 1640×859, 카톡 프로필 500×500이 표준입니다." },
      { q: "용량도 같이 줄여지나요?", a: "크기를 줄이면 자연히 용량도 줄어듭니다. 더 적극적으로 줄이고 싶으면 [이미지 압축] 도구를 이어 쓰세요." },
      { q: "비례를 유지하면서 정확한 가로·세로로 맞추려면?", a: "원하는 비율이 정해져 있으면 [이미지 자르기] 도구가 더 정확합니다. 이 도구는 비율을 보존한 채로 한 변만 줄이는 용도입니다." },
      { q: "원본보다 크게 만들 수 있나요?", a: "가능은 하지만 픽셀이 늘어나면서 흐려지거나 계단 현상이 생깁니다. AI 업스케일링이 필요하면 별도 전문 도구를 쓰세요." },
    ],
  },

  // ===== Video =====
  {
    slug: "video-to-gif",
    component: "VideoToGifTool",
    category: "video",
    icon: "🎞️",
    navTitle: "동영상 → GIF",
    title: "동영상 GIF 변환 - 무료 온라인 GIF 만들기",
    h1: "동영상을 GIF로 변환",
    description:
      "MP4, MOV, WebM 동영상을 GIF 애니메이션으로 변환하세요. FPS·크기·길이 조절 가능. 파일은 브라우저 안에서 처리되어 외부로 전송되지 않습니다.",
    metaDescription:
      "동영상을 GIF로 무료 변환. MP4/MOV/WebM 지원, FPS·크기·길이 조절, 브라우저 안전 처리.",
    howTo: [
      "동영상 파일을 드래그하거나 업로드합니다.",
      "FPS, 가로 크기, 최대 길이를 슬라이더로 조절합니다.",
      "변환 시작 버튼을 누르면 ffmpeg.wasm이 GIF를 만듭니다 (첫 실행 시 라이브러리 다운로드 ~25MB).",
      "결과 GIF를 다운로드합니다.",
    ],
    faq: [
      { q: "GIF 용량이 너무 큰데요?", a: "프레임/초(FPS)를 10 이하로, 가로 크기를 320px 정도로 줄이면 용량이 크게 작아집니다." },
      { q: "긴 동영상도 변환 가능한가요?", a: "기술적으로 가능하지만 GIF 특성상 30초 이상은 용량이 폭증합니다. 30초 이내를 추천합니다." },
      { q: "투명 GIF로 만들 수 있나요?", a: "동영상은 투명도가 없어 일반 GIF로 변환됩니다." },
    ],
    addedAt: "2026-05-13",
  },
  {
    slug: "video-to-mp3",
    component: "VideoToMp3Tool",
    category: "video",
    icon: "🎵",
    navTitle: "동영상 → MP3",
    title: "동영상 MP3 변환 - 무료 음성 추출 (MP4 to MP3)",
    h1: "동영상에서 MP3 추출",
    description:
      "MP4 등 동영상에서 음성만 추출해 MP3로 저장하세요. 강의·인터뷰·음악 영상에서 오디오만 빼낼 때 편리합니다. 파일은 브라우저 안에서 처리됩니다.",
    metaDescription:
      "동영상에서 MP3 음성을 무료 추출. MP4·MOV·WebM 지원, 음질 선택 가능.",
    howTo: [
      "동영상 파일을 업로드합니다.",
      "원하는 음질(kbps)을 선택합니다 (192kbps 추천).",
      "MP3로 추출 버튼을 누릅니다.",
      "결과 MP3를 다운로드합니다.",
    ],
    faq: [
      { q: "유튜브 영상도 변환 가능한가요?", a: "유튜브 동영상 파일을 먼저 다운로드해야 합니다. 저작권이 있는 콘텐츠 변환은 본인 책임입니다." },
      { q: "음질을 어떻게 정하나요?", a: "음성/강의는 128kbps, 음악은 192~320kbps를 추천합니다. 높을수록 용량 큼." },
    ],
    addedAt: "2026-05-13",
  },
  {
    slug: "video-compress",
    component: "VideoCompressTool",
    category: "video",
    icon: "📉",
    navTitle: "동영상 압축",
    title: "동영상 압축 - 무료 온라인 MP4 용량 줄이기",
    h1: "동영상 용량 줄이기",
    description:
      "동영상 파일 용량을 화질 손상 최소화로 50~80% 줄이세요. 카톡·메일·게시판 업로드 용량 제한 해결에 딱입니다.",
    metaDescription:
      "동영상 무료 압축. MP4 용량 최대 80% 절감, 화질 선택 가능, 브라우저 안전 처리.",
    howTo: [
      "동영상 파일을 업로드합니다.",
      "압축 수준을 선택합니다 (보통 '중간 (CRF 28)' 추천).",
      "압축 시작 버튼을 누릅니다. 길이에 따라 몇 분 걸릴 수 있습니다.",
      "압축된 MP4를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 화질이 많이 떨어지나요?", a: "CRF 28은 시각적 차이를 거의 못 느끼는 표준 수준입니다. 더 좋은 화질이 필요하면 CRF 23을 선택하세요." },
      { q: "큰 파일도 처리 가능한가요?", a: "브라우저 메모리 한계로 1GB 이상은 실패할 수 있습니다. 안정적인 사이즈는 500MB 이내입니다." },
    ],
    addedAt: "2026-05-13",
  },
  {
    slug: "video-trim",
    component: "VideoTrimTool",
    category: "video",
    icon: "✂️",
    navTitle: "동영상 자르기",
    title: "동영상 자르기 - 무료 온라인 비디오 컷팅",
    h1: "동영상 잘라내기",
    description:
      "동영상의 원하는 구간만 잘라내세요. 시작·끝 시점을 슬라이더로 지정. 화질 손실 없는 빠른 컷팅 (스트림 복사 방식).",
    metaDescription:
      "동영상 무료 자르기. 원하는 구간만 추출, 화질 손실 없음, 브라우저 안전 처리.",
    howTo: [
      "동영상 파일을 업로드합니다.",
      "시작·끝 슬라이더로 자를 구간을 지정합니다.",
      "미리보기 버튼으로 정확한 시점을 확인합니다.",
      "자르기 버튼을 누르면 빠르게 처리됩니다.",
      "결과 MP4를 다운로드합니다.",
    ],
    faq: [
      { q: "재인코딩 없이 자르나요?", a: "네. 스트림 복사 방식이라 화질 손실이 없고 매우 빠릅니다. 단, 키프레임 단위로만 잘리니 시작점이 약간 차이날 수 있습니다." },
      { q: "여러 구간을 한 번에 자를 수 있나요?", a: "현재는 한 구간씩만 가능합니다. 여러 번 잘라서 합치는 기능은 추후 추가 예정입니다." },
    ],
    addedAt: "2026-05-13",
  },

  // ===== HWP / HWPX =====
  {
    slug: "hwp-viewer",
    component: "HwpViewerTool",
    category: "document",
    icon: "📄",
    navTitle: "HWP 뷰어",
    title: "HWP 뷰어 - 한글 파일 온라인으로 열기 (한컴 설치 불필요)",
    h1: "HWP / HWPX 파일 뷰어",
    description:
      "한글과컴퓨터 오피스 없이 .hwp · .hwpx 파일을 브라우저에서 바로 열어 보세요. 페이지 넘기기, 확대/축소 지원. 한컴 라이선스가 없는 맥·리눅스 사용자, 학교/회사 PC에 한컴오피스가 설치 안 된 경우, 받은 한글 파일을 빠르게 미리 확인하고 싶을 때 유용합니다. 파일은 외부로 전송되지 않습니다.",
    metaDescription:
      "HWP·HWPX 파일을 한컴오피스 없이 무료로 열기. 브라우저에서 바로 보기, 안전, 가입 불필요.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 드래그하거나 클릭해서 업로드합니다.",
      "WebAssembly 엔진이 처음 한 번만 로드됩니다 (~5MB).",
      "페이지를 넘기며 문서를 확인합니다. 확대/축소 버튼으로 가독성을 조절합니다.",
      "PDF로 저장하고 싶으면 'HWP → PDF 변환' 도구를 이용하세요.",
      "본문 글자만 필요하면 'HWP → 텍스트 추출' 도구로 복사·붙여넣기가 더 편합니다.",
    ],
    faq: [
      { q: "한컴오피스 없이도 정말 열리나요?", a: "네. @rhwp/core라는 오픈소스 Rust+WebAssembly 엔진을 사용해 브라우저 안에서 직접 .hwp / .hwpx를 파싱합니다. 한컴오피스 설치는 필요 없습니다." },
      { q: "어떤 버전까지 지원하나요?", a: "HWP 5.0 이상 바이너리 형식과 KS X 6101 표준의 HWPX 형식을 지원합니다. 구버전 HWP 3.0/97은 구조가 달라 지원되지 않습니다." },
      { q: "파일이 서버로 올라가나요?", a: "아니요. 파싱과 렌더링이 전부 브라우저 안에서 일어나며 파일은 어디로도 전송되지 않습니다. 영업비밀이나 인사 자료가 들어 있어도 안전합니다." },
      { q: "복잡한 서식이 모두 그대로 보이나요?", a: "본문, 표, 이미지, 머리말/꼬리말, 수식 등 대부분이 렌더링됩니다. 일부 특수 도형, 매크로, 한컴 전용 글꼴은 다르게 보일 수 있습니다." },
      { q: "맥(macOS)이나 리눅스에서도 됩니까?", a: "네. 한컴오피스는 윈도우 위주지만 이 뷰어는 브라우저만 있으면 macOS·리눅스·크롬OS 모두 동일하게 작동합니다." },
      { q: "모바일 폰에서도 열 수 있나요?", a: "안드로이드·iOS 모바일 브라우저에서도 열립니다. 다만 100페이지 이상의 큰 파일은 메모리 한계로 느려질 수 있어 PC를 권장합니다." },
      { q: "파일을 업로드했는데 안 열려요. 왜 그래요?", a: "(1) HWP 3.0/97 구버전, (2) 일부 손상된 파일, (3) 일부 암호가 걸린 파일은 지원되지 않습니다. 한컴오피스에서 정상 열린다면 '다른 이름으로 저장 → 최신 .hwp/.hwpx'로 다시 저장 후 시도해 보세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "hwp-to-text",
    component: "HwpToTextTool",
    category: "document",
    icon: "📝",
    navTitle: "HWP → 텍스트",
    title: "HWP 텍스트 추출 - 한글 파일에서 본문만 뽑아내기",
    h1: "HWP / HWPX 텍스트 추출",
    description:
      "한글 문서의 본문 텍스트만 .txt로 추출하세요. 카톡·이메일·번역기·ChatGPT에 붙여넣을 때 편리합니다. 회의록 정리, 보고서 요약, 외국어 번역 준비 등에 자주 쓰입니다. 브라우저 안에서 처리되어 안전합니다.",
    metaDescription:
      "HWP·HWPX 본문 텍스트 무료 추출. .txt 다운로드, 클립보드 복사, 한컴오피스 불필요.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 업로드합니다.",
      "본문 텍스트가 자동으로 추출되어 미리보기에 표시됩니다.",
      "전체 복사 버튼으로 클립보드에 담거나 .txt 파일로 다운로드합니다.",
      "추출된 텍스트를 번역기·ChatGPT·메일에 붙여넣어 활용하세요.",
    ],
    faq: [
      { q: "표 안의 글자도 추출되나요?", a: "네. 표 셀, 머리말/꼬리말, 각주의 글자까지 모두 추출됩니다." },
      { q: "이미지나 도형은요?", a: "이미지와 도형 자체는 텍스트가 아니라 추출되지 않습니다. 다만 도형 안에 입력된 글자는 추출됩니다." },
      { q: "줄바꿈은 어떻게 처리되나요?", a: "원본의 문단 단위로 줄바꿈이 들어갑니다. 페이지마다 빈 줄 한 칸이 추가되어 구분됩니다." },
      { q: "글자 색·굵기·정렬도 보존되나요?", a: "아니요. 본 도구는 평문(plain text) 추출이라 서식(폰트·크기·정렬·들여쓰기·색)은 모두 제거됩니다. 서식이 필요하면 'HWP → PDF' 도구를 사용하세요." },
      { q: "ChatGPT나 번역기에 바로 쓸 수 있나요?", a: "네. 추출된 텍스트는 일반 문자열이라 어떤 AI·번역 서비스에도 그대로 복사·붙여넣을 수 있습니다. 한국어·한자·영문이 섞여 있어도 정상 인식됩니다." },
      { q: "암호가 걸린 HWP 파일도 추출되나요?", a: "현재 암호 보호된 파일은 지원하지 않습니다. 한컴오피스에서 암호를 해제하고 저장한 뒤 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "hwp-to-pdf",
    component: "HwpToPdfTool",
    category: "document",
    icon: "📕",
    navTitle: "HWP → PDF",
    title: "HWP를 PDF로 변환 - 한글 파일 PDF 변환기 (무료, 한컴 불필요)",
    h1: "HWP / HWPX → PDF 변환",
    description:
      "한글 문서를 PDF로 변환하세요. 한컴오피스 없이도 브라우저에서 즉시 변환 가능. 한컴 라이선스가 없는 상대에게 자료 공유, 이메일·카카오톡 첨부, 인쇄 직전 포맷 고정 등에 안성맞춤입니다.",
    metaDescription:
      "HWP·HWPX 파일을 PDF로 무료 변환. 한컴오피스 불필요, 브라우저 안전 처리, 가입 없음.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 업로드합니다.",
      "변환된 페이지 미리보기를 확인합니다.",
      "PDF로 저장 버튼을 누르면 모든 페이지가 한 PDF로 합쳐집니다.",
      "파일이 다운로드되면 끝입니다.",
      "변환된 PDF를 더 가공하려면 [PDF 병합]·[PDF 자르기]·[PDF 워터마크] 도구도 활용하세요.",
    ],
    faq: [
      { q: "원본 디자인이 그대로 보존되나요?", a: "본문, 표, 머리말/꼬리말, 수식 등 대부분 보존됩니다. 단, 일부 특수 도형이나 한컴 전용 글꼴(HY신명조 같은 라이선스 글꼴)은 비슷한 글꼴로 대체될 수 있습니다." },
      { q: "긴 문서도 변환 가능한가요?", a: "수십 페이지까지는 일반 PC에서 무리 없이 변환됩니다. 100페이지 이상이면 시간이 좀 걸릴 수 있으니 브라우저를 닫지 말고 기다려 주세요." },
      { q: "파일이 외부로 업로드되나요?", a: "아니요. 변환은 브라우저 안에서 일어나며 파일이 외부 서버로 전송되지 않습니다. 인사·법무·계약 문서도 안심하고 변환할 수 있습니다." },
      { q: "변환된 PDF가 한컴오피스에서 본 것과 미세하게 달라요. 왜요?", a: "한글 전용 글꼴이 PDF에 임베드되지 않으면 비슷한 시스템 폰트로 대체되어 줄 간격·글자 너비가 살짝 달라질 수 있습니다. 인쇄 결과는 대부분 문제없습니다." },
      { q: "공공기관·관공서 제출용으로 써도 되나요?", a: "일반적인 PDF 제출은 가능합니다. 단, 일부 기관은 'PDF/A' 같은 보존용 표준 PDF를 요구하기도 하니 제출 안내문을 확인하세요." },
      { q: "여러 HWP를 한 번에 PDF로 묶을 수 있나요?", a: "본 도구는 한 번에 한 파일씩 변환합니다. 변환한 PDF 여러 개를 합치려면 [PDF 병합] 도구를 이어서 사용하세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "hwp-to-hwpx",
    component: "HwpToHwpxTool",
    category: "document",
    icon: "🔄",
    navTitle: "HWP → HWPX",
    title: "HWP를 HWPX로 변환 - 표준 한글 문서 포맷 변환기",
    h1: "HWP → HWPX 변환",
    description:
      "구버전 .hwp 파일을 정부 표준 .hwpx 포맷(KS X 6101)으로 변환하세요. 공공기관·나라장터·정부24 제출, 협업 도구 호환, 장기 보존용 표준화에 유용합니다.",
    metaDescription:
      "HWP를 HWPX(국가 표준)로 무료 변환. 공공기관 제출, 협업, 보존용에 적합.",
    howTo: [
      ".hwp 파일을 업로드합니다.",
      "변환 버튼을 누르면 HWPX(zip+XML) 패키지가 생성됩니다.",
      ".hwpx 파일을 다운로드합니다.",
      "한컴오피스 2018 이상에서 그대로 열 수 있고, 일부 협업 도구는 미리보기도 지원합니다.",
    ],
    faq: [
      { q: "HWPX가 뭐예요?", a: "한글 문서의 새 표준(KS X 6101)으로, XML+ZIP 기반이라 OOXML(docx)처럼 다른 도구와 호환이 좋습니다. 공공기관·정부 문서 표준으로 채택되었습니다." },
      { q: "원본 서식이 모두 보존되나요?", a: "본문·표·서식·이미지 같은 주요 내용은 보존됩니다. 일부 한컴 전용 기능(매크로, 일부 도형 효과 등)은 누락될 수 있습니다." },
      { q: "반대 방향(HWPX → HWP)도 되나요?", a: "현재는 HWP → HWPX 방향만 지원합니다. HWPX는 표준 포맷이라 한컴오피스와 대부분의 뷰어가 직접 열 수 있어 반대 변환 필요성이 낮습니다." },
      { q: "왜 HWPX로 바꿔야 하나요?", a: "(1) 공공기관·정부 입찰 문서 제출 시 표준 형식 요구, (2) 구조가 공개돼 있어 OneDrive·구글 드라이브 등에서 미리보기·검색이 가능, (3) 장기 보존(아카이브)에 안전. 단순 보기만 한다면 .hwp 그대로 써도 됩니다." },
      { q: "한컴오피스 어떤 버전부터 HWPX를 열 수 있나요?", a: "한컴오피스 2018(NEO+)부터 HWPX를 기본 지원합니다. 더 구버전(한컴오피스 2014 이하)은 별도 변환이 필요합니다." },
      { q: "변환 후 파일 크기가 달라졌어요. 정상인가요?", a: "정상입니다. HWPX는 ZIP 압축된 XML이라 .hwp보다 살짝 작아지거나 커질 수 있습니다. 내용은 동일합니다." },
    ],
    addedAt: "2026-05-14",
  },

  // ===== PDF =====
  {
    slug: "pdf-merge",
    component: "PdfMergeTool",
    category: "pdf",
    icon: "📎",
    navTitle: "PDF 병합",
    title: "PDF 병합 - 무료 PDF 합치기 (가입 불필요, 워터마크 없음)",
    h1: "PDF 합치기",
    description:
      "여러 PDF 파일을 하나로 합치세요. 드래그로 순서를 자유롭게 바꿀 수 있고, 파일은 브라우저 안에서 처리되어 외부로 전송되지 않습니다. 회의 자료 묶음, 영수증/계약서 모음, 학생 과제 일괄 제출, 스캔본 페이지 통합 등에 자주 쓰입니다.",
    metaDescription:
      "여러 PDF를 하나로 무료 병합. 순서 변경 지원, 워터마크 없음, 가입 불필요, 안전 처리.",
    howTo: [
      "합칠 PDF 파일을 모두 업로드합니다 (여러 개 가능).",
      "위/아래 화살표로 순서를 조절합니다.",
      "병합 버튼을 누르면 한 PDF로 합쳐집니다.",
      "결과 파일을 다운로드합니다.",
      "필요하면 [PDF 페이지 번호] 도구로 합친 PDF에 일괄 페이지 번호도 넣을 수 있습니다.",
    ],
    faq: [
      { q: "파일이 서버로 전송되나요?", a: "아니요. 모든 작업이 브라우저 안에서 일어나며 외부로 전송되지 않습니다. 영수증·계약서·인사 자료처럼 민감한 PDF도 안심하고 합칠 수 있습니다." },
      { q: "최대 몇 개까지 합칠 수 있나요?", a: "기술적 제한은 없지만 메모리 한계로 보통 50개 이내, 합쳐서 200MB 이하를 권장합니다. 그 이상이면 데스크톱 브라우저에서 한 번에 처리하세요." },
      { q: "비밀번호 걸린 PDF도 가능한가요?", a: "현재 비밀번호 보호된 PDF는 지원하지 않습니다. PDF 뷰어에서 암호를 해제(다른 이름으로 저장)한 뒤 다시 시도해 주세요." },
      { q: "워터마크가 들어가나요?", a: "아니요. 결과 PDF에 어떤 워터마크나 광고도 삽입되지 않습니다. 원본 그대로 합쳐집니다." },
      { q: "북마크·하이퍼링크·서명은 보존되나요?", a: "각 PDF 페이지 자체는 그대로 옮겨지지만, 일부 외부 북마크나 PDF 양식 필드는 사라질 수 있습니다. 디지털 서명은 병합 후 무효화될 수 있어 주의하세요." },
      { q: "모바일에서도 됩니까?", a: "안드로이드·iOS 모바일 브라우저에서도 작동합니다. 다만 큰 PDF는 메모리 부담이 커 데스크톱 PC를 권장합니다." },
      { q: "이미지(JPG/PNG)도 함께 묶을 수 있나요?", a: "본 도구는 PDF끼리 합치는 용도입니다. 이미지는 먼저 [이미지 → PDF] 도구로 PDF로 만든 뒤 여기서 합치세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-split",
    component: "PdfSplitTool",
    category: "pdf",
    icon: "✂️",
    navTitle: "PDF 분할",
    title: "PDF 분할 - 페이지별로 PDF 나누기 (무료)",
    h1: "PDF 분할 / 나누기",
    description:
      "PDF를 페이지 단위로 분리하거나, 원하는 페이지 범위만 추출하세요. 결과는 ZIP으로 한 번에 받습니다. 챕터별로 PDF 나누기, 첨부용 일부 페이지만 따로 보내기, 시험 문제·해설을 별도 PDF로 분리하는 등에 유용합니다.",
    metaDescription:
      "PDF를 페이지별 / 범위별로 무료 분할. ZIP 일괄 다운로드, 안전, 가입 불필요.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "분할 방식을 선택합니다 (모든 페이지 / 범위 지정).",
      "범위 지정 시 '1-3, 5, 7-9' 같은 형식으로 입력합니다.",
      "결과 ZIP을 다운로드합니다.",
      "필요한 페이지만 한 PDF로 모으려면 [PDF 페이지 추출] 도구가 더 편합니다.",
    ],
    faq: [
      { q: "범위 지정 문법이 어떻게 되나요?", a: "콤마로 구분: '1-3, 5, 7-9'. 1~3페이지를 한 묶음, 5페이지 단독, 7~9페이지를 한 묶음으로 나눕니다." },
      { q: "한 페이지짜리 PDF도 분할되나요?", a: "한 페이지짜리는 분할할 게 없어 그대로 반환됩니다." },
      { q: "결과 파일 이름은 어떻게 되나요?", a: "원본 이름 뒤에 페이지 번호가 붙은 형식으로 자동 생성됩니다 (예: report_p1-3.pdf)." },
      { q: "PDF 분할과 페이지 추출, 어느 걸 써야 하나요?", a: "여러 PDF로 쪼개고 싶으면 분할(이 도구), 선택한 페이지만 한 PDF로 모으고 싶으면 [PDF 페이지 추출] 도구를 쓰세요." },
      { q: "북마크·하이퍼링크는 유지되나요?", a: "각 페이지 본문은 그대로 분리됩니다. 다만 다른 페이지를 가리키던 내부 링크는 분할 후 깨질 수 있습니다." },
      { q: "비밀번호 걸린 PDF도 분할 가능한가요?", a: "현재 암호 보호된 PDF는 미지원입니다. PDF 뷰어에서 잠금을 풀어 저장 후 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-rotate",
    component: "PdfRotateTool",
    category: "pdf",
    icon: "🔃",
    navTitle: "PDF 회전",
    title: "PDF 회전 - 페이지 방향 90/180/270도 돌리기",
    h1: "PDF 페이지 회전",
    description:
      "스캔이나 촬영해서 누워있는 PDF 페이지를 똑바로 세우세요. 전체 페이지 또는 특정 페이지만 90·180·270도 회전 가능. 핸드폰으로 찍은 영수증·계약서 PDF, 가로/세로가 뒤바뀐 스캔 문서 정리에 자주 쓰입니다.",
    metaDescription:
      "PDF 페이지 회전 무료. 90·180·270도 지원, 페이지 선택 가능, 안전 처리.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "회전할 페이지를 선택합니다 (전체 또는 특정 페이지).",
      "회전 각도(90°/180°/270°)를 고릅니다.",
      "회전된 PDF를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 화질이 떨어지나요?", a: "아닙니다. 페이지 메타데이터만 변경되어 화질 손실 없이 회전됩니다." },
      { q: "스캔본인데 글자가 그대로 보이나요?", a: "네. 픽셀 단위로 다시 그리지 않고 페이지 회전 정보만 추가합니다." },
      { q: "어떤 페이지는 가로, 어떤 페이지는 세로인데 어떻게 하나요?", a: "회전할 페이지 번호를 선택해 따로따로 처리하면 됩니다. 예: '1, 3, 5'만 90도, 나머지는 그대로." },
      { q: "파일 용량이 늘어나나요?", a: "거의 그대로입니다. 회전 정보 한 줄만 추가되므로 보통 1KB 미만 차이만 납니다." },
      { q: "회전된 결과가 PDF 뷰어마다 다르게 보여요. 왜죠?", a: "표준 PDF 회전 메타데이터를 사용하므로 Adobe·Chrome·미리보기 등 모든 표준 뷰어에서 동일하게 보입니다. 만약 다르게 보이면 해당 뷰어가 표준을 무시한 경우입니다." },
      { q: "스마트폰 사진을 PDF로 만들었는데 옆으로 누웠어요. 이 도구로 고칠 수 있나요?", a: "네. 90도(또는 -90도) 회전을 적용하면 똑바로 세워집니다. 사진 자체가 EXIF 회전 정보를 가지고 있을 수 있으니 한 번에 잘 안 되면 다른 각도로도 시도해 보세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-delete-pages",
    component: "PdfDeletePagesTool",
    category: "pdf",
    icon: "🗑️",
    navTitle: "PDF 페이지 삭제",
    title: "PDF 페이지 삭제 - 원하지 않는 페이지 제거",
    h1: "PDF에서 페이지 삭제",
    description:
      "PDF에서 빈 페이지나 필요 없는 페이지를 골라 제거하세요. 페이지를 선택해 삭제 버튼을 누르면 끝. 스캔 시 들어간 빈 페이지, 광고/안내 페이지, 부록 일부만 빼고 싶을 때 유용합니다.",
    metaDescription:
      "PDF에서 페이지 무료 삭제. 빈 페이지·불필요 페이지 제거, 가입 불필요, 안전.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "삭제할 페이지 번호를 입력합니다 ('2, 5-7' 형식).",
      "처리 버튼을 누르면 해당 페이지가 빠진 PDF가 만들어집니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 파일이 변경되나요?", a: "아니요. 원본은 그대로 두고 새 PDF가 생성됩니다. 실수했어도 원본은 안전합니다." },
      { q: "여러 범위를 한 번에 삭제할 수 있나요?", a: "네. '2, 5-7, 10' 처럼 콤마로 여러 범위를 함께 지정할 수 있습니다." },
      { q: "삭제 후 페이지 번호가 자동으로 다시 매겨지나요?", a: "PDF 안의 페이지 순서는 자동 정렬되지만, 본문에 인쇄된 페이지 번호(예: 본문 하단의 ‘p. 10’)는 그대로입니다. 새 번호가 필요하면 [PDF 페이지 번호] 도구로 다시 매기세요." },
      { q: "모든 페이지를 다 지우면 어떻게 되나요?", a: "최소 1페이지는 남겨야 합니다. 모든 페이지를 빼고 싶다면 그냥 파일을 지우는 게 맞습니다." },
      { q: "비밀번호 걸린 PDF도 가능한가요?", a: "현재 암호 보호된 PDF는 미지원입니다. 잠금을 해제한 뒤 시도해 주세요." },
      { q: "북마크·하이퍼링크가 깨질 수 있나요?", a: "삭제된 페이지를 가리키던 내부 링크·북마크는 자동으로 제거되거나 무효화될 수 있습니다. 본문 자체에는 영향이 없습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "images-to-pdf",
    component: "ImagesToPdfTool",
    category: "pdf",
    icon: "🖼️",
    navTitle: "이미지 → PDF",
    title: "이미지 PDF 변환 - JPG, PNG를 PDF로 묶기",
    h1: "이미지를 PDF로 변환",
    description:
      "사진과 스캔본을 한 PDF로 묶으세요. JPG·PNG·WebP 지원, 페이지 크기 선택 가능, 순서 자유롭게 조정. 휴대폰 사진으로 찍은 영수증·계약서, 스캔본 묶음, 포트폴리오 정리, 회의 자료 사진 통합 등에 유용합니다.",
    metaDescription:
      "JPG·PNG 이미지를 PDF로 무료 변환. 여러 장 묶기, 순서 변경 지원.",
    howTo: [
      "이미지를 모두 업로드합니다 (여러 장).",
      "페이지 크기(A4·Letter·이미지 크기)와 여백을 선택합니다.",
      "순서를 조정한 뒤 변환 버튼을 누릅니다.",
      "PDF를 다운로드합니다.",
    ],
    faq: [
      { q: "이미지 화질이 떨어지나요?", a: "원본 이미지 그대로 PDF에 임베드되어 화질 손실이 없습니다." },
      { q: "A4 페이지에 맞게 자동 조정되나요?", a: "네. 비율을 유지하면서 페이지에 맞게 축소되어 들어갑니다. 이미지가 작으면 가운데 정렬됩니다." },
      { q: "HEIC(아이폰 사진) 파일도 됩니까?", a: "HEIC는 브라우저가 직접 지원하지 않을 수 있습니다. [HEIC → JPG] 도구로 먼저 변환한 뒤 이 도구에서 묶으세요." },
      { q: "결과 PDF 용량이 너무 커요. 어떻게 줄이죠?", a: "이미지가 원본 그대로 들어가서 사진 여러 장이면 용량이 커집니다. [이미지 압축] 도구로 미리 압축 후 변환하세요." },
      { q: "스캔본을 OCR해서 검색 가능한 PDF로 만들 수 있나요?", a: "이 도구는 이미지를 PDF에 그대로 넣을 뿐 텍스트 인식(OCR)은 하지 않습니다. 검색 가능한 PDF가 필요하면 Adobe Acrobat의 OCR 같은 별도 도구를 쓰세요." },
      { q: "순서를 어떻게 바꾸나요?", a: "업로드 후 썸네일을 드래그하거나 위/아래 버튼으로 재정렬할 수 있습니다." },
      { q: "투명 PNG는 배경이 어떻게 처리되나요?", a: "기본은 흰색 배경 위에 합성됩니다. 결과 PDF는 인쇄 시 깨끗하게 나옵니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-reorder",
    component: "PdfReorderTool",
    category: "pdf",
    icon: "🔀",
    navTitle: "PDF 페이지 순서 변경",
    title: "PDF 페이지 순서 변경 - 드래그로 페이지 재정렬",
    h1: "PDF 페이지 재정렬",
    description:
      "PDF 페이지 썸네일을 드래그해서 순서를 자유롭게 바꾸세요. 회전·삭제도 함께 가능. 모든 처리는 브라우저 안에서. 스캔 순서가 뒤죽박죽인 문서 정리, 책자 인쇄용 페이지 배치, 발표 슬라이드 순서 조정에 유용합니다.",
    metaDescription:
      "PDF 페이지 순서 변경 무료. 드래그 재정렬·회전·삭제, 안전 처리.",
    howTo: [
      "PDF를 업로드하면 모든 페이지의 썸네일이 보입니다.",
      "드래그해서 순서를 바꿉니다.",
      "필요하면 각 페이지의 회전·삭제 버튼도 사용합니다.",
      "저장 버튼을 누르면 새 PDF가 생성됩니다.",
    ],
    faq: [
      { q: "한 페이지만 회전할 수 있나요?", a: "각 썸네일의 회전 버튼으로 페이지별 회전이 가능합니다. 가로/세로가 섞인 문서 정리할 때 편리합니다." },
      { q: "페이지가 너무 많아서 드래그가 불편해요.", a: "범위를 깔끔히 잘라야 한다면 [PDF 페이지 추출]로 필요한 페이지만 모아 새 PDF를 만든 뒤 다시 합치는 방식이 더 빠를 수 있습니다." },
      { q: "원본은 보존되나요?", a: "네. 업로드한 파일은 브라우저 메모리에서만 처리되며, 저장 버튼을 눌러도 원본 파일은 그대로입니다. 새 파일이 다운로드됩니다." },
      { q: "썸네일이 안 보이거나 로딩이 느려요.", a: "큰 PDF는 모든 페이지를 렌더링하느라 시간이 걸립니다. 100페이지 이상이면 데스크톱 브라우저 사용을 권장합니다." },
      { q: "비밀번호 걸린 PDF도 됩니까?", a: "현재 암호 보호된 PDF는 미지원입니다. 잠금 해제 후 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-extract",
    component: "PdfExtractTool",
    category: "pdf",
    icon: "📑",
    navTitle: "PDF 페이지 추출",
    title: "PDF 페이지 추출 - 원하는 페이지만 빼서 새 PDF로",
    h1: "PDF 특정 페이지 추출",
    description:
      "PDF에서 원하는 페이지 번호 또는 범위만 골라 새 PDF로 저장하세요. 한 PDF에서 일부 페이지만 공유할 때, 책자에서 한 챕터만 따로 보낼 때, 양식 PDF에서 필요한 신청서만 추출할 때 편리합니다.",
    metaDescription:
      "PDF 페이지 추출 무료. 원하는 페이지·범위 선택, 새 PDF 저장.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "추출할 페이지를 '1-3, 5, 7-9' 형식으로 입력합니다.",
      "추출 버튼을 누릅니다.",
      "결과 PDF를 다운로드합니다.",
    ],
    faq: [
      { q: "PDF 분할과 뭐가 달라요?", a: "분할은 여러 PDF로 쪼개고 ZIP으로 받습니다. 추출은 선택한 페이지만 모은 한 PDF를 만듭니다. 한 묶음으로 공유하려면 추출이 더 편합니다." },
      { q: "범위 표기 문법은요?", a: "콤마와 하이픈을 씁니다. '1-3, 5, 7-9'는 1·2·3·5·7·8·9 페이지를 순서대로 추출합니다." },
      { q: "순서를 바꿔서 추출할 수 있나요?", a: "입력한 순서대로 페이지가 모입니다. 예: '5, 1-2'는 5페이지가 먼저, 그 뒤에 1·2페이지 순서로 추출됩니다." },
      { q: "마지막 페이지까지 한 번에 지정할 수 있나요?", a: "구체 번호로 입력해야 합니다 (예: 끝이 10페이지라면 '7-10'). 'end' 같은 키워드는 미지원입니다." },
      { q: "추출한 PDF의 페이지 번호도 1부터 시작하나요?", a: "본문에 인쇄된 페이지 번호는 원본 그대로 유지됩니다. 새 번호가 필요하면 [PDF 페이지 번호] 도구로 다시 매기세요." },
      { q: "비밀번호 걸린 PDF도 추출되나요?", a: "현재 미지원입니다. 잠금 해제 후 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-watermark",
    component: "PdfWatermarkTool",
    category: "pdf",
    icon: "💧",
    navTitle: "PDF 워터마크",
    title: "PDF 워터마크 추가 - 텍스트 워터마크 무료 삽입",
    h1: "PDF에 텍스트 워터마크 추가",
    description:
      "PDF 모든 페이지에 텍스트 워터마크(예: 'CONFIDENTIAL', 회사명, 'DRAFT', 'SAMPLE')를 추가하세요. 색상·투명도·회전·크기 조절 가능. 기밀 문서 표시, 시안 단계 표기, 외부 공유 자료에 출처 표시 등에 유용합니다.",
    metaDescription:
      "PDF 텍스트 워터마크 무료 추가. 색상·투명도·회전 조절, 모든 페이지에 일괄.",
    howTo: [
      "PDF를 업로드합니다.",
      "워터마크 텍스트, 색상, 투명도, 각도를 설정합니다.",
      "미리보기로 위치·디자인을 확인합니다.",
      "적용 버튼을 누르고 결과를 다운로드합니다.",
    ],
    faq: [
      { q: "이미지 워터마크는요?", a: "현재 텍스트만 지원합니다. 로고 같은 이미지가 필요하면 PDF 편집기 같은 별도 도구를 사용하세요." },
      { q: "한글도 가능합니까?", a: "네. '대외비'·'사본 금지' 같은 한글 워터마크도 들어갑니다. 시스템 기본 한글 폰트로 렌더링됩니다." },
      { q: "특정 페이지만 워터마크를 넣을 수 있나요?", a: "현재 모든 페이지 일괄 적용입니다. 일부 페이지만 적용하려면 먼저 그 페이지들만 [PDF 페이지 추출]로 빼서 워터마크 후 다시 합치세요." },
      { q: "복사·인쇄를 막을 수 있나요?", a: "워터마크는 시각적 표시일 뿐 복사·인쇄를 막진 못합니다. 진짜 보호가 필요하면 PDF 암호화·복사 방지 같은 별도 보안 도구가 필요합니다." },
      { q: "워터마크가 본문을 가려요. 어떻게 보기 좋게 만들죠?", a: "투명도를 30~50% 정도로 낮추고 색상을 회색 계열로 하면 본문 가독성을 해치지 않습니다. 45도 대각선 배치도 가독성을 덜 해칩니다." },
      { q: "결과 PDF에서 워터마크를 다시 지울 수 있나요?", a: "텍스트로 합쳐져 들어가므로 일반적으로 제거가 어렵습니다. 원본은 따로 보관하세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-page-number",
    component: "PdfPageNumberTool",
    category: "pdf",
    icon: "🔢",
    navTitle: "PDF 페이지 번호",
    title: "PDF 페이지 번호 추가 - 머리말/꼬리말 위치 선택",
    h1: "PDF 페이지 번호 추가",
    description:
      "PDF 각 페이지에 페이지 번호를 자동으로 넣으세요. 위치(머리말/꼬리말, 좌/중/우), 형식(1, 1/N, p1), 시작 번호 선택 가능. 합친 PDF에 일괄 번호 매기기, 보고서·논문·책자 인쇄 준비, 학교 과제 제출용 페이지 표기에 유용합니다.",
    metaDescription:
      "PDF 페이지 번호 자동 추가. 위치·형식·시작번호 선택 가능, 모든 페이지에 일괄.",
    howTo: [
      "PDF를 업로드합니다.",
      "위치(상단/하단, 좌/중/우)와 형식(1, 1/N, p1)을 선택합니다.",
      "필요하면 시작 번호를 조정합니다.",
      "적용 버튼을 누르고 결과를 다운로드합니다.",
    ],
    faq: [
      { q: "특정 페이지부터 시작 번호를 바꿀 수 있나요?", a: "시작 번호를 설정할 수 있습니다 (예: 5페이지부터 1로 시작). 표지·목차를 건너뛰고 본문부터 매길 때 유용합니다." },
      { q: "형식 '1/N'은 뭔가요?", a: "현재 페이지/전체 페이지 형식입니다. 10페이지 문서라면 '3/10' 같은 식으로 표시됩니다. 책자·보고서에 흔히 쓰는 형식입니다." },
      { q: "기존 페이지 번호가 본문에 인쇄돼 있는데 덮어쓸 수 있나요?", a: "기존 번호 위로 새 번호가 추가됩니다. 깔끔하게 만들려면 페이지 번호 위치를 본문 번호와 다른 곳(예: 본문은 가운데, 새 번호는 좌측 하단)으로 두세요." },
      { q: "표지 페이지에는 번호를 빼고 싶어요.", a: "현재 모든 페이지에 일괄 적용됩니다. 표지를 빼고 매기려면 표지를 [PDF 페이지 추출]로 분리 → 본문에만 번호 → 다시 [PDF 병합]으로 합치는 방식이 가능합니다." },
      { q: "글자 크기와 색상을 바꿀 수 있나요?", a: "기본 검은색·표준 크기로 적용됩니다. 보고서·논문에 어울리는 차분한 디자인입니다." },
      { q: "비밀번호 걸린 PDF는요?", a: "현재 미지원입니다. 잠금을 풀고 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-text-extract",
    component: "PdfTextExtractTool",
    category: "pdf",
    icon: "📋",
    navTitle: "PDF 텍스트 추출",
    title: "PDF 텍스트 추출 - 본문 텍스트만 .txt로",
    h1: "PDF에서 텍스트 추출",
    description:
      "PDF에서 본문 텍스트만 .txt로 추출하세요. 검색·번역기·ChatGPT에 넣을 때 편리합니다. 회의록 정리, 논문 인용 준비, 긴 보고서 요약을 위한 사전 작업에 자주 쓰입니다. 스캔본 PDF(이미지)는 추출이 안 될 수 있습니다.",
    metaDescription:
      "PDF 본문 텍스트 무료 추출. .txt 다운로드, 클립보드 복사, 브라우저 안전 처리.",
    howTo: [
      "PDF를 업로드합니다.",
      "추출된 텍스트가 미리보기에 표시됩니다.",
      ".txt로 다운로드하거나 복사합니다.",
      "ChatGPT·번역기·메모 앱 등에 바로 붙여넣어 활용하세요.",
    ],
    faq: [
      { q: "스캔본 PDF도 추출되나요?", a: "스캔본은 이미지라 텍스트가 없어 추출되지 않습니다. OCR(광학 문자 인식)이 필요한데, 이 도구는 OCR 기능이 없습니다." },
      { q: "글자가 추출됐는데 줄바꿈이 이상해요. 왜 그래요?", a: "PDF는 보이는 위치 기준으로 글자를 저장합니다. 두 단 편집·각주·머리말 같은 레이아웃이 있으면 추출 시 순서가 뒤섞이거나 줄바꿈이 어색해질 수 있습니다." },
      { q: "표나 그림 안의 글자도 추출되나요?", a: "표 안의 텍스트는 보통 추출됩니다. 다만 표 구조(셀 경계)는 사라지고 줄바꿈된 평문이 됩니다. 그림(이미지)은 추출 안 됩니다." },
      { q: "한글·한자·영문·이모지가 섞여 있어도 되나요?", a: "네. UTF-8로 저장되어 어떤 문자든 그대로 보존됩니다." },
      { q: "비밀번호 걸린 PDF는요?", a: "현재 미지원입니다. 잠금을 풀고 시도해 주세요." },
      { q: "결과를 검색용 데이터로 쓰려면?", a: "추출된 .txt 파일은 일반 텍스트라 코드 에디터·검색 도구(grep, ripgrep 등)에서 바로 검색할 수 있습니다. 키워드 추출에는 [단어 빈도 분석] 도구가 유용합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "pdf-to-images",
    component: "PdfToImagesTool",
    category: "pdf",
    icon: "🏞️",
    navTitle: "PDF → 이미지",
    title: "PDF 이미지 변환 - 페이지를 PNG/JPG로 추출",
    h1: "PDF 페이지를 이미지로 추출",
    description:
      "PDF의 각 페이지를 PNG 또는 JPG 이미지로 저장하세요. 해상도 선택 가능, ZIP으로 일괄 다운로드. PPT 슬라이드용 이미지 추출, SNS·블로그에 첨부할 미리보기, 메신저로 한 페이지만 캡처해 공유하기 등에 유용합니다.",
    metaDescription:
      "PDF 페이지를 PNG·JPG로 무료 추출. 해상도 선택, ZIP 일괄 다운로드.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "출력 형식(PNG/JPG)과 배율(1x~3x)을 선택합니다.",
      "변환 버튼을 누르면 각 페이지가 이미지로 렌더링됩니다.",
      "결과 ZIP을 다운로드합니다.",
    ],
    faq: [
      { q: "이미지 화질을 어떻게 조절하나요?", a: "배율 슬라이더로 1x(저용량)~3x(고화질) 사이를 선택합니다. 3x면 인쇄용으로도 적합합니다." },
      { q: "PNG와 JPG 중 뭐가 좋나요?", a: "그림·도형·다이어그램이 많으면 PNG(무손실), 사진 위주면 JPG(용량 작음)가 유리합니다. 모르겠으면 PNG가 안전합니다." },
      { q: "한 페이지만 이미지로 변환할 수 있나요?", a: "현재는 전체 페이지가 ZIP으로 묶여 나옵니다. 한 페이지만 필요하면 ZIP을 풀어서 해당 이미지만 쓰면 됩니다." },
      { q: "결과 ZIP이 너무 커요. 줄일 수 있나요?", a: "배율을 1x로 낮추거나 JPG 포맷을 쓰면 용량이 줄어듭니다. 페이지가 많고 고화질이 필요 없다면 1x JPG로 충분합니다." },
      { q: "투명 배경으로 만들 수 있나요?", a: "기본은 흰색 배경입니다. PDF 페이지는 보통 흰 종이를 가정하므로 투명 추출은 일반적인 용도에 맞지 않습니다." },
      { q: "비밀번호 걸린 PDF도 되나요?", a: "현재 미지원입니다. 잠금을 풀고 시도해 주세요." },
    ],
    addedAt: "2026-05-14",
  },

  // ===== More image tools =====
  {
    slug: "favicon-generator",
    component: "FaviconTool",
    category: "image",
    icon: "🌐",
    navTitle: "파비콘 생성기",
    title: "파비콘 생성기 - PNG/JPG → 16/32/48/64/128/256 ICO 묶음",
    h1: "파비콘 생성 (PNG → ICO + 다중 해상도)",
    description:
      "이미지 한 장으로 웹사이트용 파비콘 묶음을 만드세요. 16/32/48/64/128/256 PNG와 ICO 파일을 ZIP으로 한 번에 받습니다. 개인 블로그·포트폴리오 사이트·기업 홈페이지의 브라우저 탭 아이콘과 즐겨찾기 아이콘 설정에 바로 사용 가능합니다.",
    metaDescription:
      "파비콘 무료 생성. PNG/JPG → 16/32/48/64/128/256 + ICO 묶음, 브라우저 안전 처리.",
    howTo: [
      "정사각형에 가까운 이미지를 업로드합니다 (1:1 비율 추천).",
      "생성 버튼을 누르면 6개 해상도 PNG + ICO 묶음이 만들어집니다.",
      "ZIP을 다운로드해서 웹사이트 루트에 배치합니다.",
      "<link rel=\"icon\" href=\"/favicon.ico\"> 같은 HTML 태그를 head에 추가합니다.",
    ],
    faq: [
      { q: "ICO와 PNG 차이가 뭔가요?", a: "ICO는 여러 해상도를 한 파일에 묶은 윈도우 표준입니다. 최신 브라우저는 PNG도 잘 인식하지만, IE 등 구버전 호환을 위해 둘 다 제공하면 안전합니다." },
      { q: "원본은 어디로 가나요?", a: "어디로도 안 갑니다. 변환이 전부 브라우저 안에서 일어납니다." },
      { q: "왜 여러 해상도가 필요한가요?", a: "브라우저 탭은 16/32px, 즐겨찾기는 48/64px, 모바일 홈 화면은 128/256px을 사용합니다. 한 해상도만 쓰면 작은 크기에서 흐릿하게 보일 수 있어 여러 해상도를 제공합니다." },
      { q: "직사각형 이미지를 넣으면 어떻게 되나요?", a: "정사각형으로 늘려지거나 잘릴 수 있어 결과가 어색해집니다. 미리 [이미지 자르기] 도구로 1:1로 잘라서 업로드하세요." },
      { q: "Apple touch icon이나 매니페스트 아이콘도 만드나요?", a: "현재는 일반 favicon용 묶음만 생성합니다. iOS·PWA용 180px·512px 아이콘이 추가로 필요하면 [이미지 크기 변경] 도구를 활용하세요." },
      { q: "배경이 투명한 PNG로 만들 수 있나요?", a: "원본 PNG의 투명도가 그대로 유지됩니다. 로고만 보이고 배경이 비치는 파비콘으로 만들 수 있습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-filter",
    component: "ImageFilterTool",
    category: "image",
    icon: "🎨",
    navTitle: "이미지 필터",
    title: "이미지 필터 - 흑백/세피아/블러/밝기/대비 무료 적용",
    h1: "이미지 필터 적용",
    description:
      "사진에 흑백·세피아·블러·밝기·대비·채도 필터를 즉시 적용하세요. 실시간 미리보기, 화질 손실 최소, 모든 처리는 브라우저 안에서. 블로그·SNS 분위기 통일, 옛 사진 느낌의 세피아, 인스타 톤 보정, 프레젠테이션 자료의 배경 흐림에 자주 쓰입니다.",
    metaDescription:
      "이미지 필터 무료 적용. 흑백·세피아·블러·밝기·대비·채도, 실시간 미리보기.",
    howTo: [
      "이미지를 업로드합니다.",
      "필터 슬라이더를 조절하면 실시간으로 적용됩니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 화질이 떨어지나요?", a: "PNG로 저장하면 무손실, JPG는 약간의 손실이 있을 수 있습니다." },
      { q: "어떤 필터들이 있나요?", a: "흑백, 세피아, 블러(흐림), 밝기, 대비, 채도, 색조 회전을 슬라이더로 자유롭게 조절할 수 있습니다." },
      { q: "여러 필터를 동시에 적용할 수 있나요?", a: "네. 슬라이더들을 동시에 움직여 흑백 + 대비 강조, 블러 + 밝기 같은 조합을 실시간으로 만들 수 있습니다." },
      { q: "필터 적용 후 원본으로 되돌릴 수 있나요?", a: "모든 슬라이더를 기본값(0)으로 두면 원본 상태로 돌아갑니다. 저장 전이라면 언제든 비교 가능합니다." },
      { q: "여러 장에 같은 필터를 일괄 적용할 수 있나요?", a: "현재는 한 장씩 처리됩니다. 여러 장에 같은 톤을 적용하려면 슬라이더 값을 기록해 두고 차례대로 적용하세요." },
      { q: "AI 보정(인물 보정·하늘 교체 등)도 됩니까?", a: "이 도구는 기본 픽셀 연산(밝기/대비/블러)만 합니다. AI 보정은 별도 전문 서비스가 필요합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-pixelate",
    component: "ImagePixelateTool",
    category: "image",
    icon: "🔲",
    navTitle: "이미지 픽셀화/모자이크",
    title: "이미지 픽셀화 / 모자이크 - 얼굴/번호판 가리기",
    h1: "이미지 픽셀화 / 모자이크",
    description:
      "사진 전체나 선택 영역에 모자이크를 적용해 얼굴·번호판·민감한 정보를 가리세요. 픽셀 크기 조절 가능. SNS 업로드 전 행인 얼굴 가리기, 차량 번호판 처리, 카톡 캡처 속 개인정보 가리기, 후기·블로그용 사진의 신상 보호에 자주 쓰입니다.",
    metaDescription:
      "이미지 모자이크 무료. 영역 선택, 픽셀 크기 조절, 얼굴/번호판 가리기.",
    howTo: [
      "이미지를 업로드합니다.",
      "가릴 영역을 마우스로 드래그합니다.",
      "픽셀 크기를 조절합니다 (보통 10~20px이 적당).",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "원래대로 복원되나요?", a: "모자이크는 비가역적입니다. 복원되지 않으니 원본 파일을 따로 보관하세요." },
      { q: "픽셀 크기를 얼마로 해야 적당한가요?", a: "얼굴 정도면 10~20px, 더 확실히 가리려면 30~50px. 너무 작으면 패턴이 남아 식별될 수 있습니다." },
      { q: "여러 영역을 한 번에 가릴 수 있나요?", a: "네. 드래그를 여러 번 반복해 영역을 차례로 추가할 수 있습니다." },
      { q: "AI가 모자이크를 복원할 수 있다는데 정말인가요?", a: "픽셀 크기가 너무 작으면(예: 5px) 일부 AI 복원 도구로 추정이 가능합니다. 민감 정보는 20~30px 이상으로 강하게 가리는 게 안전합니다." },
      { q: "검은 박스로 가리는 게 더 안전하지 않나요?", a: "맞습니다. 완벽한 익명성이 필요하면 모자이크 대신 검은색 박스(완전 불투명)로 덮으세요. 이 도구는 자연스러운 마스킹용입니다." },
      { q: "동영상에도 됩니까?", a: "현재는 사진 전용입니다. 동영상은 별도 편집 도구가 필요합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-stack",
    component: "ImageStackTool",
    category: "image",
    icon: "🗂️",
    navTitle: "이미지 합치기",
    title: "이미지 합치기 - 여러 사진 가로/세로/격자로 한 장에",
    h1: "이미지 합치기 (가로 / 세로 / 격자)",
    description:
      "여러 이미지를 한 장으로 합치세요. 가로 스택, 세로 스택, 격자 레이아웃 선택. 간격·배경색 조절 가능. 인스타·블로그용 콜라주, 비교 사진(전/후), 메뉴 사진 모음, 채팅 캡처 여러 장 한 장으로 묶기에 자주 쓰입니다.",
    metaDescription:
      "이미지 여러 장 합치기 무료. 가로/세로/격자, 간격·배경색 조절, 브라우저 안전 처리.",
    howTo: [
      "이미지를 여러 장 업로드합니다.",
      "레이아웃(가로/세로/격자)을 선택합니다.",
      "이미지 사이 간격과 배경색을 조절합니다.",
      "다운로드 버튼을 누릅니다.",
    ],
    faq: [
      { q: "이미지 크기가 다른데 어떻게 되나요?", a: "각 이미지를 그대로 두거나, 같은 높이/너비에 맞춰 자동 정렬할 수 있습니다." },
      { q: "몇 장까지 합칠 수 있나요?", a: "기술적 제한은 없지만 결과 이미지가 너무 커지면 메모리 부담이 됩니다. 보통 10장 이내가 안정적입니다." },
      { q: "비교용 Before/After를 만들 수 있나요?", a: "가로 스택을 선택하고 두 이미지를 나란히 놓으면 됩니다. 슬라이더로 비교하려면 [이미지 비교 슬라이더] 도구를 쓰세요." },
      { q: "격자 레이아웃은 몇 칸까지 되나요?", a: "2×2, 3×3, 4×4 같은 정사각형 격자가 흔하게 쓰이고, 입력 장수에 따라 자동으로 행/열이 정해집니다." },
      { q: "투명 배경으로 만들 수 있나요?", a: "배경색을 투명으로 두고 PNG로 저장하면 됩니다. JPG는 투명도가 없어 안 됩니다." },
      { q: "순서를 바꾸려면?", a: "업로드 후 썸네일을 드래그하거나 위/아래 버튼으로 재정렬할 수 있습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-border",
    component: "ImageBorderTool",
    category: "image",
    icon: "🖼️",
    navTitle: "이미지 액자 추가",
    title: "이미지 액자/보더 추가 - 사진 둘러싸기 무료",
    h1: "이미지 액자 / 보더 추가",
    description:
      "사진 주변에 색상 액자(보더)를 추가하세요. 두께·색상·둥근 모서리 조절 가능. 인스타그램용 흰 폴라로이드 프레임, 미니멀한 검은 테두리, SNS 일관된 톤 유지, 결혼식·여행 사진 인쇄 전 액자 효과에 자주 쓰입니다.",
    metaDescription:
      "이미지 액자/보더 무료 추가. 두께·색상·둥근 모서리, 폴라로이드 효과.",
    howTo: [
      "이미지를 업로드합니다.",
      "테두리 두께(px)를 조절합니다.",
      "색상과 모서리 둥글기를 설정합니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "PNG 투명도가 유지되나요?", a: "PNG로 저장하면 액자 외 영역은 투명 또는 선택한 배경색으로 채워집니다." },
      { q: "두께는 얼마로 해야 자연스러워요?", a: "이미지 가로 대비 2~5% 정도가 깔끔합니다. 1080px 이미지면 20~50px 정도가 적당합니다." },
      { q: "폴라로이드 느낌으로 만들려면?", a: "흰색 색상 + 적당한 두께 + 모서리 살짝 둥글게(8~15px) + 아래쪽만 더 두꺼우면 폴라로이드 분위기가 납니다." },
      { q: "여러 색의 테두리를 동시에 적용할 수 있나요?", a: "현재는 단일 색상만 지원합니다. 이중 테두리는 두 번 적용해서 만들 수 있습니다." },
      { q: "둥근 모서리로 인스타 스토리 스타일 만들 수 있나요?", a: "네. 모서리 둥글기를 크게 설정하면 카드형·스토리형 디자인이 됩니다." },
      { q: "원본 비율은 유지되나요?", a: "테두리가 바깥쪽으로 추가되어 전체 크기는 커지지만, 이미지 내용 비율은 그대로 유지됩니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "exif-viewer",
    component: "ExifViewerTool",
    category: "image",
    icon: "🔬",
    navTitle: "EXIF 정보 보기",
    title: "이미지 EXIF 정보 보기 - 촬영 시각·GPS·카메라 정보",
    h1: "이미지 EXIF / 메타데이터 보기",
    description:
      "JPG/HEIC 사진의 메타데이터를 확인하세요. 카메라 모델, 촬영 시각, GPS 좌표, ISO·셔터·조리개·렌즈 등이 한 눈에 표시됩니다. 사진의 출처·시점 확인, 카메라 설정 분석, 위치 정보 노출 점검, 법적 증거 확인 전 메타데이터 점검에 유용합니다.",
    metaDescription:
      "이미지 EXIF 정보 무료 보기. 카메라·촬영시각·GPS·조리개·ISO 표시.",
    howTo: [
      "이미지를 업로드합니다.",
      "EXIF 정보가 자동 표시됩니다.",
      "GPS가 있으면 지도 링크가 함께 보입니다.",
    ],
    faq: [
      { q: "EXIF가 없는 이미지는요?", a: "PNG, GIF나 EXIF를 지운 JPG는 표시할 정보가 없습니다." },
      { q: "EXIF를 제거하려면?", a: "이 사이트의 [이미지 EXIF 제거] 도구를 이용하세요. SNS 업로드 전 위치·기기 정보를 깨끗이 지울 수 있습니다." },
      { q: "GPS 좌표가 노출돼서 걱정이에요. 위험한가요?", a: "위험할 수 있습니다. 사진을 SNS·블로그에 그대로 올리면 집·직장 위치가 노출됩니다. 업로드 전 EXIF 제거를 권장합니다." },
      { q: "어떤 정보를 알 수 있나요?", a: "카메라/스마트폰 기종, 렌즈, ISO·셔터·조리개·초점거리, 촬영 시각, GPS 좌표(있으면), 방향, 화이트밸런스, 플래시 사용 여부 등." },
      { q: "사진이 합성·편집됐는지 알 수 있나요?", a: "EXIF에 'Photoshop'·'Lightroom' 같은 편집 소프트웨어 정보가 남아 있을 수 있습니다. 다만 결정적 증거는 아니며 일부는 의도적으로 지울 수도 있습니다." },
      { q: "Instagram·SNS에서 받은 사진은 왜 EXIF가 비어 있나요?", a: "대부분 SNS는 업로드 시 EXIF를 자동 제거합니다. 그래서 캡처해서 받은 사진에는 정보가 거의 남지 않습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "color-extract",
    component: "ColorExtractTool",
    category: "image",
    icon: "🎨",
    navTitle: "이미지 색상 추출",
    title: "이미지 주요 색상 추출 - 팔레트 생성기",
    h1: "이미지에서 색상 팔레트 추출",
    description:
      "사진에서 주요 색상 N개를 자동으로 뽑아 팔레트를 만드세요. 디자인 색상 영감, 브랜드 컬러 분석, 무드보드 제작, PPT/포스터 색 통일에 유용합니다. 각 색의 HEX 코드를 클릭 한 번에 복사할 수 있습니다.",
    metaDescription:
      "이미지 색상 팔레트 무료 추출. HEX 코드 표시, 5~10색 추출.",
    howTo: [
      "이미지를 업로드합니다.",
      "추출할 색상 개수를 선택합니다 (보통 5~8개).",
      "각 색을 클릭해 HEX 코드를 복사합니다.",
      "CSS·디자인 도구에 바로 붙여넣어 활용합니다.",
    ],
    faq: [
      { q: "어떤 알고리즘인가요?", a: "median-cut 양자화로 이미지의 대표 색상을 추출합니다. 인접 픽셀의 평균이 아닌 대표 색을 뽑아 사람 눈에 자연스러운 팔레트를 만듭니다." },
      { q: "몇 개 색을 추출하는 게 좋아요?", a: "브랜드 분석은 3~5개, 무드보드는 8~10개가 적당합니다. 너무 많으면 비슷한 색이 중복돼 의미가 줄어듭니다." },
      { q: "HEX 외에 RGB·HSL 코드도 표시되나요?", a: "현재 HEX 코드(#RRGGBB) 중심으로 표시됩니다. HEX는 [색상 변환] 도구로 RGB/HSL/CMYK로 쉽게 바꿀 수 있습니다." },
      { q: "흰색·검은색이 자꾸 추출돼요. 빼고 싶어요.", a: "이미지 자체에 흰 여백·검은 그림자가 많으면 자연스러운 결과입니다. 잘라내거나 보정한 이미지를 다시 올리세요." },
      { q: "투명도가 있는 PNG는 어떻게 처리되나요?", a: "투명 부분은 흰색으로 간주되어 흰색이 추출 결과에 포함될 수 있습니다." },
      { q: "여러 사진의 팔레트를 동시에 만들 수 있나요?", a: "현재는 한 장씩입니다. 무드보드용이면 [이미지 합치기]로 합친 뒤 추출하면 통합 팔레트가 나옵니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-text-overlay",
    component: "ImageTextOverlayTool",
    category: "image",
    icon: "🔤",
    navTitle: "이미지에 글자 넣기",
    title: "이미지에 텍스트 추가 - 썸네일·짤·공지 이미지 무료 제작",
    h1: "이미지에 글자 넣기 (텍스트 오버레이)",
    description:
      "사진 위에 제목·문구를 즉시 얹으세요. 폰트·색상·크기·외곽선·위치 자유 조절. 유튜브 썸네일, 명언 짤, 매장 공지 이미지, SNS 카드뉴스, 행사 안내 이미지 만들 때 편리합니다.",
    metaDescription:
      "이미지에 텍스트 추가 무료. 폰트·색·외곽선·위치 조절, 브라우저 안전 처리.",
    howTo: [
      "이미지를 업로드합니다.",
      "텍스트, 크기, 색상, 외곽선을 설정합니다.",
      "이미지 위에서 텍스트를 드래그해 위치를 잡습니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "한글 폰트는요?", a: "사용자 OS에 설치된 폰트와 웹 표준 폰트를 사용합니다. 윈도우는 맑은 고딕·나눔고딕, 맥은 Apple SD 고딕 Neo 등을 자동 인식합니다." },
      { q: "외곽선은 왜 필요한가요?", a: "배경 색이 복잡하거나 텍스트와 비슷한 색일 때 글자가 묻히지 않게 해줍니다. 보통 흰 글자에 검은 외곽선(또는 반대)이 가독성 좋습니다." },
      { q: "여러 줄 텍스트도 됩니까?", a: "줄바꿈을 넣으면 여러 줄로 표시됩니다. 각 줄의 정렬(왼쪽·가운데·오른쪽)도 선택 가능합니다." },
      { q: "유튜브 썸네일 만들기 좋은 설정?", a: "이미지 크기 1280×720, 큰 글자(70~100px), 굵게, 흰색 본문 + 검은색 외곽선 4~6px이 표준입니다." },
      { q: "이모지도 들어가나요?", a: "OS 이모지 폰트가 적용되어 표시됩니다. 다만 OS별로 모양이 약간 다를 수 있습니다." },
      { q: "텍스트만 별도로 PNG로 받을 수 있나요?", a: "현재는 합성된 이미지 형태로만 저장됩니다. 텍스트만 따로 필요하면 [텍스트 카드 만들기] 도구를 이용하세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-to-ascii",
    component: "ImageToAsciiTool",
    category: "image",
    icon: "👾",
    navTitle: "이미지 → ASCII",
    title: "이미지 ASCII 아트 변환 - 글자로 그림 그리기",
    h1: "이미지 → ASCII 아트",
    description:
      "사진을 글자(문자)로 표현한 ASCII 아트로 변환하세요. 너비·반전·문자셋 선택 가능. 결과는 텍스트로 복사하거나 PNG로 저장. 채팅·이메일 시그니처용 캐릭터 아트, 터미널 배너, 코드 주석 장식, 빈티지 게임 스타일 그래픽 만들기에 재미있습니다.",
    metaDescription:
      "이미지 ASCII 아트 무료 변환. 너비·문자셋 선택, 텍스트/PNG 저장.",
    howTo: [
      "이미지를 업로드합니다.",
      "출력 너비(글자 수)와 문자셋을 선택합니다.",
      "결과를 텍스트로 복사하거나 PNG 이미지로 저장합니다.",
    ],
    faq: [
      { q: "어떤 이미지가 잘 나오나요?", a: "콘트라스트가 뚜렷한 사진(인물 실루엣, 로고, 단순 일러스트)이 가장 잘 나옵니다. 복잡한 풍경 사진은 ASCII로 잘 표현이 안 됩니다." },
      { q: "너비를 얼마로 해야 적당해요?", a: "터미널 표시용은 80~120자, 채팅용은 40~60자, 큰 포스터용은 200자 이상이 적당합니다." },
      { q: "결과가 깨져 보여요. 왜죠?", a: "ASCII 아트는 고정폭(monospace) 글꼴에서만 제대로 보입니다. 메모장·VS Code 같은 코드 에디터에 붙여넣어 확인하세요." },
      { q: "어떤 문자셋을 고르면 좋아요?", a: "디테일이 필요하면 70자 문자셋, 깔끔한 윤곽이면 10자 문자셋(@%#*+=-:. )이 좋습니다." },
      { q: "컬러 ASCII도 됩니까?", a: "현재 흑백 ASCII 위주입니다. 컬러 ASCII는 ANSI 컬러 코드가 필요해 일반 텍스트로는 표현이 어렵습니다." },
      { q: "복사한 ASCII를 트위터·디스코드에 올릴 수 있나요?", a: "줄당 길이를 40~60자 정도로 제한하면 됩니다. 디스코드는 코드 블록(```)으로 감싸면 깔끔하게 보입니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "heic-to-jpg",
    component: "HeicToJpgTool",
    category: "image",
    icon: "📱",
    navTitle: "HEIC → JPG",
    title: "HEIC를 JPG로 변환 - 아이폰 사진 무료 변환",
    h1: "HEIC (아이폰 사진) → JPG",
    description:
      "아이폰에서 찍은 .heic 사진을 어디서나 보이는 .jpg로 변환하세요. 카톡·문서·구버전 윈도우 호환 문제를 한 번에 해결합니다. 보고서 첨부, 인쇄소 제출, 안드로이드 친구에게 사진 보내기, 워드/한컴 문서에 사진 삽입 시 자주 필요합니다.",
    metaDescription:
      "HEIC → JPG 무료 변환. 아이폰 사진 호환 문제 해결, 브라우저에서 안전 처리.",
    howTo: [
      "HEIC 파일을 업로드합니다.",
      "화질을 선택합니다 (90% 권장).",
      "JPG로 다운로드합니다.",
    ],
    faq: [
      { q: "여러 장을 한 번에 변환할 수 있나요?", a: "현재는 한 장씩 변환됩니다. 여러 장이면 순서대로 업로드해 주세요." },
      { q: "HEIC가 뭐예요? 왜 안 열려요?", a: "iOS 11부터 아이폰이 기본 사용하는 고효율 이미지 포맷입니다. 용량은 작지만 윈도우 10 구버전·카톡 구버전·워드·한컴 등에서 안 열리는 경우가 많습니다." },
      { q: "변환하면 화질이 떨어지나요?", a: "JPG는 손실 포맷이지만 90% 품질이면 시각적 차이가 거의 없습니다. 무손실이 꼭 필요하면 PNG 변환 도구를 쓰세요." },
      { q: "라이브 포토(움직이는 사진)도 됩니까?", a: "정지 이미지만 변환됩니다. 라이브 포토의 움직이는 부분은 별도 동영상(.mov)으로 저장되어 이 도구에서는 처리되지 않습니다." },
      { q: "EXIF·GPS 정보가 그대로 옮겨지나요?", a: "기본적으로는 메타데이터가 유지됩니다. SNS 업로드 전 위치 정보를 지우려면 변환 후 [이미지 EXIF 제거] 도구를 이어서 쓰세요." },
      { q: "아이폰 자체에서 JPG로 저장하려면?", a: "설정 → 카메라 → 포맷 → '높은 호환성'을 선택하면 새 사진부터 JPG로 저장됩니다. 기존 HEIC는 이 도구로 변환하면 됩니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-exif-strip",
    component: "ImageExifStripTool",
    category: "image",
    icon: "🕵️",
    navTitle: "EXIF 정보 제거",
    title: "이미지 EXIF 제거 - 사진 메타데이터·위치정보 삭제",
    h1: "이미지 EXIF / 메타데이터 제거",
    description:
      "사진에 들어있는 위치(GPS)·촬영 시각·기기 정보를 깨끗이 지우세요. SNS 업로드 전 개인정보 보호용으로 추천합니다. 인스타·트위터·당근마켓에 사진 올리기 전, 블로그에 후기 사진 게재 전, 모르는 사람에게 사진 공유할 때 안전을 위해 자주 씁니다.",
    metaDescription:
      "이미지 EXIF 메타데이터·GPS 위치 무료 제거. SNS 업로드 전 개인정보 보호, 브라우저에서 안전 처리.",
    howTo: [
      "이미지를 업로드합니다.",
      "EXIF 제거 버튼을 누르면 메타데이터가 없는 새 이미지가 만들어집니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "사진 화질이 떨어지나요?", a: "동일 화질로 재인코딩되어 시각적 차이가 거의 없습니다. 원하면 화질을 조정할 수도 있습니다." },
      { q: "정말 GPS 정보가 사라지나요?", a: "네. Canvas로 픽셀만 재인코딩하기 때문에 EXIF·GPS·촬영 시각이 모두 제거됩니다. 제거 결과는 [이미지 EXIF 정보 보기]로 확인할 수 있습니다." },
      { q: "왜 EXIF를 지워야 하나요?", a: "사진을 그대로 SNS에 올리면 GPS 좌표로 집·직장 위치가 노출될 수 있습니다. 또 기기 정보로 어떤 폰을 쓰는지도 알 수 있어 사생활 보호 측면에서 제거하는 게 안전합니다." },
      { q: "Instagram·페이스북은 자동으로 EXIF를 지우지 않나요?", a: "대부분 SNS가 업로드 시 자동 제거하지만 일부 메신저·블로그·중고거래 앱은 그대로 두는 경우가 있어 미리 지우는 게 안전합니다." },
      { q: "여러 장을 한 번에 처리할 수 있나요?", a: "현재는 한 장씩 처리됩니다. 일괄로 빠르게 처리하려면 순서대로 업로드해 주세요." },
      { q: "원본 화질을 그대로 보존하면서 EXIF만 지울 수 있나요?", a: "PNG로 저장하면 무손실, JPG는 100% 품질로 저장해도 미세 손실이 있을 수 있습니다. 완전 보존이 필요하면 PNG로 받으세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-crop",
    component: "ImageCropTool",
    category: "image",
    icon: "✂️",
    navTitle: "이미지 자르기",
    title: "이미지 자르기 - 사진 크롭 (정해진 비율 / 자유)",
    h1: "이미지 크롭 / 자르기",
    description:
      "사진을 원하는 영역만 잘라내세요. 1:1·4:3·16:9·9:16 비율 고정 또는 자유 크롭을 지원합니다. 프로필 사진 정사각형 자르기, 인스타 스토리 9:16, 유튜브 썸네일 16:9, 카드뉴스 4:5 같은 SNS 규격 맞추기에 자주 쓰입니다.",
    metaDescription:
      "이미지 자르기 무료. 1:1·4:3·16:9 비율 고정, 자유 크롭, 브라우저 안전 처리.",
    howTo: [
      "이미지를 업로드합니다.",
      "비율을 선택하거나 자유 모드로 둡니다.",
      "마우스로 자를 영역을 드래그합니다.",
      "잘라낸 이미지를 다운로드합니다.",
    ],
    faq: [
      { q: "원본이 변경되나요?", a: "아닙니다. 잘라낸 새 이미지만 만들어지고 원본은 그대로입니다." },
      { q: "자주 쓰는 SNS 비율은요?", a: "프로필·인스타 게시물 1:1, 인스타 스토리·릴스 9:16, 유튜브 썸네일 16:9, 페북 게시물 4:5가 표준입니다." },
      { q: "자르기 후 화질이 떨어지나요?", a: "잘라낸 픽셀만 보존되므로 화질 손실이 없습니다. 다만 잘라낸 영역이 작으면 해상도가 낮아져 흐릿해 보일 수 있습니다." },
      { q: "비율을 안 정하고 자유롭게 자를 수 있나요?", a: "자유 모드를 선택하면 비율 고정 없이 마우스로 원하는 영역만 드래그할 수 있습니다." },
      { q: "여러 장을 같은 영역으로 자를 수 있나요?", a: "현재는 한 장씩 처리됩니다. 같은 사이즈로 일괄 변경하려면 [이미지 크기 변경]을 함께 쓰세요." },
      { q: "동그란 모양으로 자를 수 있나요?", a: "현재는 사각형 자르기만 지원합니다. 원형이 필요하면 [이미지 액자 추가]에서 모서리 둥글기를 최대로 주거나 별도 도구를 사용하세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "image-rotate",
    component: "ImageRotateTool",
    category: "image",
    icon: "🔄",
    navTitle: "이미지 회전",
    title: "이미지 회전 - 사진 90/180/270도 돌리기 + 좌우반전",
    h1: "이미지 회전 / 반전",
    description:
      "사진을 90·180·270도 회전하거나 좌우/상하로 뒤집으세요. 누워있는 사진을 똑바로 세울 때, 스캔본 방향 맞출 때, 카메라로 잘못 찍은 사진 보정에 편리합니다. 화질 손실 없이 픽셀을 그대로 회전합니다.",
    metaDescription:
      "이미지 회전·반전 무료. 90·180·270도, 좌우/상하 반전, 화질 손실 없음.",
    howTo: [
      "이미지를 업로드합니다.",
      "회전(90·180·270) 또는 반전(좌우/상하) 버튼을 누릅니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "회전하면 화질이 떨어지나요?", a: "90·180·270도 같은 직각 회전은 화질 손실이 없습니다. 픽셀이 그대로 재배치됩니다." },
      { q: "임의 각도(예: 30도)도 됩니까?", a: "현재 도구는 직각 회전(90의 배수)만 지원합니다. 임의 각도는 이미지가 잘리거나 빈 공간이 생겨 별도의 처리가 필요합니다." },
      { q: "좌우 반전과 상하 반전은 언제 쓰나요?", a: "거울 효과(좌우 반전)는 글자가 거꾸로 보이는 셀카 보정에, 상하 반전은 물에 비친 효과나 디자인 효과로 자주 씁니다." },
      { q: "여러 장을 같은 방향으로 일괄 회전할 수 있나요?", a: "현재는 한 장씩 처리됩니다. 모든 사진의 방향이 같은 식으로 잘못된 경우 카메라 EXIF Orientation을 수정하는 별도 도구가 더 효율적입니다." },
      { q: "EXIF에 적힌 회전 정보만 바꾸나요, 픽셀을 진짜 돌리나요?", a: "이 도구는 실제 픽셀을 재배치합니다. 어떤 뷰어·앱에서 열어도 같은 방향으로 보이게 됩니다." },
      { q: "PDF 페이지 회전도 됩니까?", a: "이 도구는 이미지 전용입니다. PDF 회전은 [PDF 회전] 도구를 사용하세요." },
    ],
    addedAt: "2026-05-14",
  },

  {
    slug: "gif-to-mp4",
    component: "GifToMp4Tool",
    category: "video",
    icon: "🎬",
    navTitle: "GIF → MP4",
    title: "GIF를 MP4로 변환 - 용량 줄이고 호환성 높이기",
    h1: "GIF → MP4 변환",
    description:
      "GIF 애니메이션을 MP4 동영상으로 변환하세요. 일반적으로 용량이 70~90% 줄고 모든 플랫폼에서 호환됩니다.",
    metaDescription:
      "GIF → MP4 무료 변환. 용량 최대 90% 절감, 브라우저에서 안전 처리.",
    howTo: ["GIF 파일을 업로드합니다.", "변환 버튼을 누르면 MP4가 생성됩니다.", "결과를 다운로드합니다."],
    faq: [{ q: "투명도는 어떻게 되나요?", a: "MP4는 투명도를 지원하지 않아 검은 배경으로 채워집니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "video-rotate",
    component: "VideoRotateTool",
    category: "video",
    icon: "🔃",
    navTitle: "동영상 회전",
    title: "동영상 회전 - 90/180/270도 + 좌우 반전",
    h1: "동영상 회전 / 반전",
    description:
      "옆으로 누운 동영상을 똑바로 세우거나, 좌우/상하로 반전하세요. ffmpeg.wasm 기반, 음성 그대로 유지.",
    metaDescription:
      "동영상 회전 무료. 90/180/270도, 좌우/상하 반전, ffmpeg.wasm.",
    howTo: ["동영상을 업로드합니다.", "회전 각도 또는 반전을 선택합니다.", "변환 후 다운로드합니다."],
    faq: [{ q: "메타데이터만 바꾸나요?", a: "MP4 메타데이터 회전이 아니라 실제로 영상을 재인코딩합니다. 모든 플레이어에서 똑바로 보입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "video-thumbnail",
    component: "VideoThumbnailTool",
    category: "video",
    icon: "🖼️",
    navTitle: "동영상 썸네일 추출",
    title: "동영상에서 썸네일 추출 - 특정 시점 캡처 무료",
    h1: "동영상 썸네일 / 프레임 캡처",
    description:
      "동영상의 원하는 시점에서 정지화면을 PNG로 저장하세요. 유튜브 영상 썸네일 만들기, 강의 슬라이드 캡처에 유용합니다.",
    metaDescription:
      "동영상 썸네일 무료 추출. 시점 선택, PNG 다운로드, 모든 처리는 브라우저 안.",
    howTo: ["동영상을 업로드합니다.", "원하는 시점에서 캡처 버튼을 누릅니다.", "PNG로 다운로드합니다."],
    faq: [{ q: "어떤 포맷을 지원하나요?", a: "MP4, MOV, WebM 등 브라우저가 재생할 수 있는 포맷이면 됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "video-speed",
    component: "VideoSpeedTool",
    category: "video",
    icon: "⏩",
    navTitle: "동영상 속도 변경",
    title: "동영상 재생속도 변경 - 0.25x ~ 4x 무료",
    h1: "동영상 재생속도 변경",
    description:
      "동영상 재생속도를 늦추거나 빠르게 만드세요. 강의 빠르게 듣기·운동 영상 분석에 유용합니다. ffmpeg.wasm 기반.",
    metaDescription:
      "동영상 재생속도 무료 변경. 0.25x ~ 4x, 음성 함께 처리.",
    howTo: ["동영상을 업로드합니다.", "속도 배율을 선택합니다.", "변환 후 다운로드합니다."],
    faq: [{ q: "음성도 함께 변하나요?", a: "네. 영상과 음성 모두 같은 비율로 처리됩니다." }],
    addedAt: "2026-05-14",
  },

  // ===== More Video / Audio =====
  {
    slug: "audio-trim",
    component: "AudioTrimTool",
    category: "video",
    icon: "🎚️",
    navTitle: "오디오 자르기",
    title: "오디오 자르기 - MP3 구간 잘라내기 무료",
    h1: "오디오 자르기 / 구간 추출",
    description:
      "MP3·WAV·M4A·OGG 등 오디오 파일에서 원하는 구간만 잘라내세요. 화질 손실 없는 빠른 컷팅, ffmpeg.wasm 기반.",
    metaDescription:
      "오디오 자르기 무료. MP3/WAV/M4A 구간 추출, 화질 손실 없음.",
    howTo: ["오디오 파일을 업로드합니다.", "시작·끝 시점을 슬라이더로 지정합니다.", "자르기 버튼을 누르고 결과를 다운로드합니다."],
    faq: [{ q: "어떤 포맷을 지원하나요?", a: "MP3, WAV, M4A, OGG, AAC, FLAC 대부분의 일반 오디오 포맷을 지원합니다." }],
    addedAt: "2026-05-14",
  },

  // ===== Text =====
  {
    slug: "markdown-toc",
    component: "MarkdownTocTool",
    category: "text",
    icon: "📑",
    navTitle: "마크다운 목차 생성",
    title: "마크다운 목차(TOC) 생성기 - 헤딩 자동 추출",
    h1: "마크다운 TOC 생성기",
    description:
      "마크다운 본문의 H1~H6 헤딩을 자동으로 분석해 목차(Table of Contents)를 만들어 줍니다. 들여쓰기와 앵커 링크 자동.",
    metaDescription:
      "마크다운 목차 자동 생성. 헤딩 H1-H6 추출, 앵커 링크, 들여쓰기.",
    howTo: ["마크다운을 붙여넣습니다.", "TOC가 자동 생성됩니다.", "복사해서 문서 맨 위에 붙입니다."],
    faq: [{ q: "어떤 레벨까지 포함되나요?", a: "기본 H1~H3이고 슬라이더로 조절할 수 있습니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "markdown-table",
    component: "MarkdownTableTool",
    category: "text",
    icon: "📊",
    navTitle: "마크다운 표 생성",
    title: "마크다운 표 생성기 - 행/열 입력으로 즉시 작성",
    h1: "마크다운 표 생성기",
    description:
      "행/열 수를 정하고 셀에 내용을 채우면 마크다운 표 문법으로 자동 생성됩니다. 정렬·셀 추가/삭제, 미리보기 동시 제공.",
    metaDescription:
      "마크다운 표 무료 생성기. 행/열 추가, 정렬 선택, 실시간 미리보기.",
    howTo: ["행/열 수를 정하거나 +/- 버튼으로 조절합니다.", "각 셀에 내용을 입력합니다.", "정렬을 선택하고 결과를 복사합니다."],
    faq: [{ q: "복잡한 표(병합 셀)도 가능한가요?", a: "마크다운 표 문법은 셀 병합을 지원하지 않습니다. 단순 표만 가능합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "kor-romanize",
    component: "KorRomanizeTool",
    category: "text",
    icon: "🅰️",
    navTitle: "한글 → 로마자",
    title: "한글 로마자 변환 - 국립국어원 표기법 (Revised Romanization)",
    h1: "한글 → 로마자 변환",
    description:
      "한글을 국립국어원 로마자 표기법(Revised Romanization)으로 변환하세요. 영문 명함·이름·주소 표기에 유용합니다.",
    metaDescription:
      "한글 로마자 변환 무료. Revised Romanization 표준, 즉시 변환.",
    howTo: ["한글 텍스트를 입력합니다.", "로마자 결과가 자동 표시됩니다.", "복사해서 사용합니다."],
    faq: [{ q: "어떤 표기법을 따르나요?", a: "2000년 국립국어원 고시 '국어의 로마자 표기법'을 기반으로 합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "morse",
    component: "MorseTool",
    category: "text",
    icon: "📡",
    navTitle: "모스 부호 변환",
    title: "모스 부호 변환기 - 텍스트 ↔ 모스 양방향",
    h1: "모스 부호 변환 (Morse Code)",
    description:
      "텍스트를 모스 부호로, 모스 부호를 텍스트로 변환하세요. 영문·숫자·한국어 자모 지원, 소리로 듣기 기능 포함.",
    metaDescription:
      "모스 부호 변환 무료. 영문·숫자·한글 자모, 소리 재생 지원.",
    howTo: ["변환할 텍스트나 모스 부호를 입력합니다.", "방향이 자동 감지되어 결과가 표시됩니다.", "▶ 버튼으로 모스 부호를 소리로 들을 수 있습니다."],
    faq: [{ q: "한글 모스 부호도 있나요?", a: "한국어 모스 부호 표준에 따라 자음·모음을 변환합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "text-to-speech",
    component: "TextToSpeechTool",
    category: "text",
    icon: "🔊",
    navTitle: "텍스트 → 음성 (TTS)",
    title: "텍스트 음성 변환 (TTS) - 브라우저 음성으로 읽기",
    h1: "텍스트 → 음성 (TTS)",
    description:
      "텍스트를 컴퓨터 음성으로 읽어줍니다. 한국어·영어·일본어·중국어 등 OS에 설치된 음성을 사용. 속도·음높이 조절 가능.",
    metaDescription:
      "텍스트 음성 변환 무료. 한국어·영어·다국어, 속도·음높이 조절, 브라우저 내장 TTS.",
    howTo: ["읽을 텍스트를 입력합니다.", "음성·속도·음높이를 선택합니다.", "▶ 재생 버튼을 누릅니다."],
    faq: [
      { q: "음성 종류가 적어요", a: "사용 가능한 음성은 OS와 브라우저에 따라 다릅니다. 윈도우/맥/안드로이드/아이폰 모두 기본 한국어 음성을 제공합니다." },
      { q: "MP3로 저장할 수 있나요?", a: "Web Speech API는 파일 저장을 지원하지 않습니다. 재생만 됩니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "word-frequency",
    component: "WordFrequencyTool",
    category: "text",
    icon: "📈",
    navTitle: "단어 빈도 분석",
    title: "단어 빈도 분석기 - 자주 쓰인 단어/글자 통계",
    h1: "단어 / 글자 빈도 분석",
    description:
      "텍스트에서 단어와 글자별 등장 횟수를 셉니다. 글·논문·로그 분석에 유용. 불용어 제거·대소문자 무시 옵션.",
    metaDescription:
      "단어 빈도 분석 무료. 단어/글자 카운트, 불용어 제거, 정렬 옵션.",
    howTo: ["텍스트를 입력합니다.", "옵션을 설정합니다 (불용어, 대소문자 등).", "단어별 빈도 표가 표시됩니다."],
    faq: [{ q: "불용어가 뭔가요?", a: "'은/는/이/가' 같은 의미 없이 자주 쓰이는 조사·관사를 분석 결과에서 빼는 기능입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "latex-editor",
    component: "LatexEditorTool",
    category: "text",
    icon: "∫",
    navTitle: "LaTeX 수식 에디터",
    title: "LaTeX 수식 에디터 - 실시간 KaTeX 렌더링 + 이미지 저장",
    h1: "LaTeX 수식 에디터",
    description:
      "LaTeX로 수식을 입력하면 실시간으로 KaTeX가 렌더링합니다. 적분·시그마·행렬·분수 모두 지원하며 결과를 PNG/SVG로 저장하거나 코드를 복사하세요.",
    metaDescription:
      "LaTeX 수식 에디터 무료. 실시간 KaTeX 렌더링, PNG·SVG 저장, MathML 출력.",
    howTo: [
      "LaTeX 수식을 입력합니다 (예: \\frac{a}{b}, \\int_0^1 x dx).",
      "오른쪽에 실시간으로 렌더링됩니다.",
      "PNG/SVG로 저장하거나 LaTeX/MathML 코드를 복사합니다.",
    ],
    faq: [
      { q: "어떤 명령어를 지원하나요?", a: "KaTeX 지원 범위(commonly used commands). 분수·근호·적분·시그마·행렬·그리스 문자 등 대부분 지원됩니다." },
      { q: "결과를 워드/PPT에 붙여넣고 싶어요", a: "PNG로 저장한 뒤 워드/파워포인트에 이미지로 삽입하세요." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "num-to-korean",
    component: "NumToKoreanTool",
    category: "text",
    icon: "💰",
    navTitle: "숫자 → 한글",
    title: "숫자를 한글로 변환 - 계약서·영수증·통장용 (일금...원정)",
    h1: "숫자 → 한글 변환",
    description:
      "12,345원을 '일만 이천삼백사십오 원'으로, 계약서·영수증·세금계산서에 쓸 형식으로 변환하세요. 일/금/원정 자동 추가.",
    metaDescription:
      "숫자 한글 변환 무료. 계약서·영수증 표기, 일금/원정 자동 추가.",
    howTo: ["숫자를 입력합니다.", "변환 결과가 즉시 표시됩니다.", "계약서 형식, 통장 형식 등 옵션을 선택합니다."],
    faq: [{ q: "어디까지 표현되나요?", a: "조(10¹²) 단위까지 지원합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "kor-eng-keyboard",
    component: "KorEngKeyboardTool",
    category: "text",
    icon: "⌨️",
    navTitle: "한↔영 자판 변환",
    title: "한영 자판 변환기 - 영타 한글 변환 (dkssud → 안녕)",
    h1: "한영 자판 변환 (오타 변환)",
    description:
      "한글 키보드에 영문으로 친 'dkssudgktpdy'를 '안녕하세요'로 즉시 변환하세요. 반대도 가능. 실수로 입력한 글 복구에 유용합니다.",
    metaDescription:
      "한영 자판 변환 무료. dkssudgktpdy → 안녕하세요 양방향 변환.",
    howTo: ["변환할 텍스트를 입력합니다.", "방향(한→영, 영→한)을 선택하면 즉시 변환됩니다."],
    faq: [{ q: "특수문자나 숫자는 어떻게 되나요?", a: "한글·영문에 해당하지 않는 글자는 그대로 유지됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "character-counter",
    component: "CounterTool",
    category: "text",
    icon: "📝",
    navTitle: "글자수 세기",
    title: "글자수 세기 - 공백 포함/제외, 띄어쓰기, 바이트",
    h1: "글자수 세기",
    description:
      "텍스트의 글자수, 단어수, 줄 수를 실시간으로 셉니다. 네이버 블로그·자기소개서·논문 글자수 제한 맞출 때 사용하세요.",
    metaDescription:
      "텍스트 글자수 무료 카운터. 공백 포함/제외, 단어수, 바이트 수 실시간 표시.",
    howTo: [
      "위 입력창에 텍스트를 붙여넣습니다.",
      "오른쪽에 글자수, 공백 제외, 단어, 줄 수가 실시간으로 표시됩니다.",
      "원하는 글자 제한에 맞을 때까지 수정합니다.",
    ],
    faq: [
      { q: "네이버 블로그 글자수 기준이 뭔가요?", a: "네이버는 일반적으로 공백 포함 기준으로 셉니다. 본 도구는 공백 포함/제외 둘 다 보여줍니다." },
      { q: "한글과 영어가 다르게 세어지나요?", a: "글자수는 동일하게 1자씩 세지만, 바이트 기준은 한글이 2~3바이트라 다릅니다. 바이트 수도 함께 표시됩니다." },
    ],
  },

  {
    slug: "text-case",
    component: "TextCaseTool",
    category: "text",
    icon: "🔠",
    navTitle: "대소문자 변환",
    title: "대소문자 변환 - UPPER/lower/camel/snake/kebab 케이스",
    h1: "텍스트 케이스 변환",
    description:
      "텍스트를 UPPER·lower·Title·camelCase·snake_case·kebab-case·CONSTANT_CASE로 즉시 변환합니다.",
    metaDescription:
      "대소문자·케이스 변환 무료. camelCase, snake_case, kebab-case, CONSTANT_CASE 지원.",
    howTo: [
      "변환할 텍스트를 입력합니다.",
      "원하는 케이스 버튼을 누르면 즉시 변환됩니다.",
      "복사 버튼으로 결과를 클립보드에 담습니다.",
    ],
    faq: [{ q: "한글도 변환되나요?", a: "한글은 대소문자가 없어서 그대로 유지됩니다. 영문 부분만 변환됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "text-sort",
    component: "TextSortTool",
    category: "text",
    icon: "🔢",
    navTitle: "줄 정렬",
    title: "줄 정렬 - 텍스트 라인 오름차순/내림차순/길이순",
    h1: "텍스트 줄 정렬",
    description:
      "여러 줄로 된 텍스트를 알파벳/가나다 순, 역순, 길이순, 무작위로 정렬합니다. 대소문자 무시·중복 제거 옵션 지원.",
    metaDescription:
      "텍스트 줄 정렬 무료. 알파벳·역순·길이·랜덤, 대소문자 무시, 중복 제거 옵션.",
    howTo: [
      "정렬할 텍스트를 한 줄에 하나씩 붙여넣습니다.",
      "정렬 방식을 선택합니다.",
      "결과를 복사합니다.",
    ],
    faq: [{ q: "숫자도 자연 정렬되나요?", a: "네. '1, 2, 10, 11' 처럼 자연 정렬을 지원합니다 (사전 정렬 1, 10, 11, 2가 아님)." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "lorem-ipsum",
    component: "LoremIpsumTool",
    category: "text",
    icon: "📜",
    navTitle: "Lorem Ipsum",
    title: "Lorem Ipsum 생성기 - 더미 텍스트 / 한글 더미 문장",
    h1: "Lorem Ipsum / 한글 더미 텍스트",
    description:
      "디자인 시안과 목업에 쓸 더미 텍스트를 생성하세요. 라틴어 Lorem Ipsum과 한글 더미 문장을 단어/문장/단락 수로 만들어드립니다.",
    metaDescription:
      "Lorem Ipsum / 한글 더미 텍스트 무료 생성. 단어·문장·단락 수 선택 가능.",
    howTo: [
      "스타일(라틴 / 한글)을 선택합니다.",
      "단위(단어 / 문장 / 단락)와 개수를 입력합니다.",
      "생성 버튼을 눌러 결과를 복사합니다.",
    ],
    faq: [{ q: "왜 Lorem Ipsum을 쓰나요?", a: "콘텐츠 대신 디자인 자체에 집중하기 위해 의미 없는 텍스트를 채워 넣는 디자인 관행입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "markdown-preview",
    component: "MarkdownPreviewTool",
    category: "text",
    icon: "📖",
    navTitle: "마크다운 미리보기",
    title: "마크다운 미리보기 - Markdown → HTML 실시간 변환",
    h1: "마크다운 → HTML 미리보기",
    description:
      "마크다운을 입력하면 실시간으로 HTML로 변환되어 미리보기가 표시됩니다. GitHub Flavored Markdown(GFM) 지원, HTML 소스 복사 가능.",
    metaDescription:
      "마크다운 무료 미리보기. GitHub Flavored Markdown, HTML 코드 복사, 실시간 변환.",
    howTo: [
      "왼쪽에 마크다운 텍스트를 작성합니다.",
      "오른쪽에 HTML 결과가 즉시 표시됩니다.",
      "필요하면 HTML 소스 보기로 복사합니다.",
    ],
    faq: [
      { q: "어떤 마크다운 문법을 지원하나요?", a: "GitHub Flavored Markdown (GFM) — 표, 체크박스, 코드 펜스, 자동 링크 등을 지원합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "spell-check",
    component: "SpellCheckTool",
    category: "text",
    icon: "📝",
    navTitle: "맞춤법 검사",
    title: "한국어 맞춤법 검사 - 자주 틀리는 표현 무료 검사",
    h1: "한국어 맞춤법 검사기 (오프라인)",
    description:
      "자주 틀리는 한국어 표현 100여 개를 즉시 검사합니다. 외부 서버 없이 브라우저 안에서 처리되며 텍스트는 전송되지 않습니다. 초중급 가이드용이라 문맥이 필요한 오류는 잡지 못합니다.",
    metaDescription:
      "한국어 맞춤법 무료 검사. 외부 서버 없이 브라우저에서 처리, 자주 틀리는 표현 100+, 가입 불필요.",
    howTo: [
      "검사할 한국어 텍스트를 붙여넣습니다.",
      "오른쪽에 자동으로 오류 후보가 표시됩니다.",
      "각 항목 옆 '적용' 버튼으로 한 개씩 고치거나, '전체 적용'으로 일괄 수정합니다.",
    ],
    faq: [
      { q: "부산대·네이버 맞춤법 검사기처럼 정확한가요?", a: "아니요. 이건 자주 틀리는 표현 ~120개를 매칭하는 가벼운 도구입니다. 형태소 분석과 문맥 판단을 하는 전문 검사기와 같은 수준은 아닙니다." },
      { q: "왜 서버 검사기를 안 쓰나요?", a: "이 사이트의 모든 도구는 외부 서버 없이 브라우저 안에서만 처리되도록 설계했습니다. 부산대 등 공개 검사기는 상업·외부 호출이 라이센스로 제한됩니다." },
      { q: "내 글이 저장되거나 전송되나요?", a: "아니요. 검사 전 과정이 브라우저 안에서만 일어나며 어디로도 전송되지 않습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "markdown-math",
    component: "MarkdownMathTool",
    category: "text",
    icon: "🧮",
    navTitle: "마크다운 + 수식",
    title: "마크다운 + 수학(KaTeX) 미리보기 - 논문·수업 자료용",
    h1: "마크다운 + LaTeX 수식 미리보기",
    description:
      "$x^2 + y^2 = 1$ 같은 LaTeX 수식이 포함된 마크다운을 실시간으로 렌더링합니다. KaTeX 기반이며 PDF로 출력할 수 있어 논문 초안·수업 자료에 적합합니다.",
    metaDescription:
      "마크다운 + LaTeX 수식 무료 미리보기. KaTeX 기반, PDF 출력 지원, 논문·수업 자료용.",
    howTo: [
      "왼쪽에 마크다운을 작성합니다.",
      "수식은 인라인 `$E=mc^2$` 또는 블록 `$$ \\\\int_0^1 x dx $$` 형식으로 적습니다.",
      "오른쪽 미리보기에 수식이 실시간으로 렌더링됩니다.",
      "PDF로 저장 버튼을 누르면 인쇄 다이얼로그가 열립니다.",
    ],
    faq: [
      { q: "어떤 LaTeX 문법을 지원하나요?", a: "KaTeX 지원 범위(commonly used commands)를 따릅니다. 일반 수식, 행렬, 분수, 적분, 합계, 그리스 문자 등 대부분 지원됩니다." },
      { q: "PDF 화질이 깨지나요?", a: "수식이 SVG/HTML로 렌더링되어 PDF에서 벡터 품질로 저장됩니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "diff-checker",
    component: "DiffCheckerTool",
    category: "text",
    icon: "🔀",
    navTitle: "텍스트 비교 (diff)",
    title: "텍스트 비교 (diff) - 두 텍스트 차이점 찾기",
    h1: "텍스트 비교 / Diff",
    description:
      "두 텍스트를 나란히 비교해 추가·삭제·변경된 부분을 표시합니다. 코드 리뷰·문서 변경 추적에 유용합니다.",
    metaDescription:
      "텍스트 두 개 무료 비교(diff). 라인·단어 단위 차이 표시, 색상 하이라이트.",
    howTo: [
      "왼쪽·오른쪽에 비교할 텍스트를 붙여넣습니다.",
      "줄 단위 또는 단어 단위 모드를 선택합니다.",
      "차이가 색상으로 표시됩니다.",
    ],
    faq: [{ q: "어떤 알고리즘을 쓰나요?", a: "표준 Myers diff 알고리즘 기반의 `diff` 라이브러리를 사용합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "text-dedupe",
    component: "TextDedupeTool",
    category: "text",
    icon: "♻️",
    navTitle: "중복 줄 제거",
    title: "중복 줄 제거 - 텍스트에서 중복 라인 삭제",
    h1: "중복 줄 제거 / Unique",
    description:
      "여러 줄 텍스트에서 중복된 줄을 제거하세요. 대소문자 무시·공백 무시 옵션, 빈 줄 제거 옵션 지원.",
    metaDescription:
      "텍스트 중복 라인 무료 제거. 대소문자·공백 무시 옵션, 즉시 처리.",
    howTo: ["텍스트를 입력합니다.", "옵션을 선택합니다 (대소문자/공백 무시).", "결과를 복사합니다."],
    faq: [{ q: "줄 순서가 유지되나요?", a: "네. 원본의 첫 등장 순서가 보존됩니다." }],
    addedAt: "2026-05-14",
  },

  {
    slug: "docx-viewer",
    component: "DocxViewerTool",
    category: "document",
    icon: "📃",
    navTitle: "워드(DOCX) 뷰어",
    title: "DOCX 뷰어 - 마이크로소프트 워드 파일 브라우저에서 보기",
    h1: "DOCX 뷰어 (워드 파일 미리보기)",
    description:
      "마이크로소프트 워드 .docx 파일을 워드 없이 브라우저에서 바로 봅니다. 텍스트만 추출하거나 .txt로 저장도 가능.",
    metaDescription:
      "DOCX 뷰어 무료. 워드 없이 .docx 보기, 텍스트 추출, 브라우저 안전 처리.",
    howTo: ["DOCX 파일을 업로드합니다.", "본문이 자동으로 렌더링됩니다.", "텍스트 추출 버튼으로 .txt로 저장할 수 있습니다."],
    faq: [
      { q: "복잡한 서식이 그대로 보이나요?", a: "mammoth.js 변환기를 사용하며, 본문·표·기본 스타일은 지원됩니다. 복잡한 레이아웃은 단순화될 수 있습니다." },
      { q: ".doc(구버전)도 되나요?", a: "DOCX(2007년 이후 OOXML)만 지원합니다." },
    ],
    addedAt: "2026-05-14",
  },

  // ===== Dev =====
  {
    slug: "korean-age",
    component: "KoreanAgeTool",
    category: "dev",
    icon: "🎂",
    navTitle: "만나이 계산",
    title: "만나이 계산기 - 생년월일 → 만나이·세는 나이·연나이",
    h1: "만나이 / 세는 나이 계산기",
    description:
      "생년월일을 입력하면 만나이·세는 나이·연 나이를 동시에 보여줍니다. 2023년 6월 시행 만나이 통일법 기준.",
    metaDescription:
      "만나이 계산기 무료. 만나이·세는 나이·연 나이 한 번에, 2023년 법 기준.",
    howTo: ["생년월일을 선택합니다.", "기준 날짜 (보통 오늘)를 선택합니다.", "세 가지 나이가 자동 계산됩니다."],
    faq: [
      { q: "만나이가 뭔가요?", a: "생일을 기준으로 세는 나이입니다. 0살로 태어나 생일마다 1살씩 추가됩니다. 2023년 6월부터 한국 법령상 공식 나이가 만나이로 통일되었습니다." },
      { q: "세는 나이는요?", a: "태어나자마자 1살이고 1월 1일마다 모두 1살씩 더하는 전통 한국 나이 셈법입니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "lunar-solar",
    component: "LunarSolarTool",
    category: "dev",
    icon: "🌙",
    navTitle: "음력 ↔ 양력",
    title: "음력 양력 변환기 - 한국 음력/양력 양방향 변환",
    h1: "음력 ↔ 양력 변환",
    description:
      "한국 음력과 양력 날짜를 양방향으로 변환합니다. 1391~2050년 범위, 윤달(閏月) 처리, 간지 표시.",
    metaDescription:
      "한국 음력 양력 변환 무료. 윤달·간지 지원, 1391~2050년.",
    howTo: ["변환 방향과 날짜를 선택합니다.", "결과가 자동 표시됩니다."],
    faq: [{ q: "왜 1391~2050년만 되나요?", a: "한국 음력 데이터의 정확한 표준 범위입니다. 이 범위 밖은 천문 계산이 부정확할 수 있어 제한합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "caesar-cipher",
    component: "CaesarCipherTool",
    category: "dev",
    icon: "🔠",
    navTitle: "시저 암호 / ROT",
    title: "시저 암호 변환기 - ROT13 · ROT47 · 사용자 지정",
    h1: "시저 암호 (Caesar Cipher / ROT)",
    description:
      "텍스트를 시저(카이사르) 방식으로 암호화·복호화합니다. ROT13·ROT47 사전 설정과 1~25 사용자 지정 회전.",
    metaDescription:
      "시저 암호 무료. ROT13·ROT47·1~25 회전, 양방향 변환.",
    howTo: ["텍스트를 입력합니다.", "회전 값을 선택합니다 (13이면 ROT13).", "암호화된 결과가 즉시 표시됩니다."],
    faq: [{ q: "보안용으로 쓸 수 있나요?", a: "시저 암호는 즉시 깨지는 약한 암호입니다. 농담·퀴즈·게임용으로만 쓰세요." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "http-status",
    component: "HttpStatusTool",
    category: "dev",
    icon: "🌐",
    navTitle: "HTTP 상태 코드",
    title: "HTTP 상태 코드 사전 - 200 / 404 / 500 의미 검색",
    h1: "HTTP 상태 코드 사전",
    description:
      "HTTP 응답 상태 코드 100~599의 의미를 검색하세요. 표준(RFC) 코드 + 자주 쓰이는 비표준 코드(418, 429 등).",
    metaDescription:
      "HTTP 상태 코드 사전 무료. 200/301/404/500 등 의미와 사용 예시.",
    howTo: ["코드 번호나 키워드로 검색합니다.", "각 코드별 의미와 사용 예시가 표시됩니다."],
    faq: [{ q: "어떤 코드가 포함되나요?", a: "RFC 9110 표준 + 자주 쓰이는 비표준(418 I'm a teapot, 429 Too Many Requests 등) 모두 포함됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "css-gradient",
    component: "CssGradientTool",
    category: "dev",
    icon: "🌈",
    navTitle: "CSS 그라데이션",
    title: "CSS 그라데이션 생성기 - linear / radial 시각적 빌더",
    h1: "CSS 그라데이션 생성기",
    description:
      "색상 stop을 추가/조절하며 linear·radial 그라데이션을 시각적으로 만들고 CSS 코드를 받으세요. 미리보기 실시간 반영.",
    metaDescription:
      "CSS 그라데이션 무료 생성기. linear/radial, 다중 색상 stop, 실시간 미리보기.",
    howTo: ["타입(linear/radial)과 각도를 정합니다.", "색상 stop을 추가/조절합니다.", "결과 CSS를 복사합니다."],
    faq: [{ q: "복잡한 conic-gradient도 가능한가요?", a: "현재는 linear / radial만 지원합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "base-converter",
    component: "BaseConverterTool",
    category: "dev",
    icon: "🔢",
    navTitle: "진법 변환",
    title: "진법 변환기 - 10진수 ↔ 2/8/16진수 변환",
    h1: "숫자 진법 변환",
    description:
      "10진수, 2진수, 8진수, 16진수 사이를 즉시 변환하세요. 음수·소수도 지원, 자릿수 자동 그룹화.",
    metaDescription:
      "진법 변환 무료. 10/2/8/16 진수 양방향 변환, 음수·소수 지원.",
    howTo: ["변환할 숫자를 입력하고 입력 진법을 선택합니다.", "다른 진법의 값이 자동 계산됩니다."],
    faq: [{ q: "음수도 변환되나요?", a: "네. 2's complement는 아니고 부호 표시 방식입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "html-entity",
    component: "HtmlEntityTool",
    category: "dev",
    icon: "🔣",
    navTitle: "HTML 엔티티",
    title: "HTML 엔티티 인코더/디코더 - & → &amp; 변환",
    h1: "HTML 엔티티 인코더 / 디코더",
    description:
      "&, <, >, \", ' 같은 특수문자를 &amp; &lt; &gt; 같은 HTML 엔티티로 변환하거나 디코딩하세요. 한글·이모지의 숫자 엔티티도 지원.",
    metaDescription:
      "HTML 엔티티 인코더/디코더 무료. & < > \" ' 변환, 숫자 엔티티(한글·이모지) 지원.",
    howTo: ["텍스트를 입력하고 방향을 선택합니다.", "결과를 복사합니다."],
    faq: [{ q: "왜 HTML 엔티티가 필요한가요?", a: "HTML 안에 직접 들어가면 깨지는 글자(< > & 등)를 안전하게 표시하기 위한 표기 방식입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "password-strength",
    component: "PasswordStrengthTool",
    category: "dev",
    icon: "🛡️",
    navTitle: "비밀번호 강도",
    title: "비밀번호 강도 검사기 - 보안 점수 즉시 확인",
    h1: "비밀번호 강도 검사",
    description:
      "비밀번호의 길이·문자 종류·예측 가능성을 점수화해 강도를 평가합니다. 흔한 패스워드·반복 패턴·키보드 시퀀스도 감지.",
    metaDescription:
      "비밀번호 강도 무료 검사. 길이·문자 종류·흔한 패턴 분석, 즉시 점수.",
    howTo: ["검사할 비밀번호를 입력합니다.", "강도 점수와 개선 제안이 실시간 표시됩니다."],
    faq: [{ q: "입력한 비밀번호가 저장되나요?", a: "아니요. 평가가 전부 브라우저 안에서만 일어나고 외부로 전송되지 않습니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "color-contrast",
    component: "ColorContrastTool",
    category: "dev",
    icon: "🎯",
    navTitle: "색 대비 검사 (WCAG)",
    title: "WCAG 색 대비 검사기 - 웹 접근성 명도비 측정",
    h1: "WCAG 색상 대비 검사",
    description:
      "글자색·배경색의 명도 대비비를 계산하고 WCAG AA/AAA 기준 통과 여부를 알려줍니다. 디자인 접근성 검수에 사용하세요.",
    metaDescription:
      "WCAG 색 대비 무료 검사. 명도비·AA/AAA 통과 여부, 미리보기.",
    howTo: ["글자색·배경색을 고릅니다.", "대비비와 통과 기준이 즉시 표시됩니다."],
    faq: [{ q: "기준이 뭐예요?", a: "WCAG 2.1에서 일반 텍스트는 AA 4.5:1, AAA 7:1. 큰 텍스트(18pt 이상)는 AA 3:1, AAA 4.5:1입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "lotto",
    component: "LottoTool",
    category: "dev",
    icon: "🎰",
    navTitle: "로또 번호 생성기",
    title: "로또 번호 생성기 - 1~45 6자리 무료 자동 추출",
    h1: "로또 6/45 번호 생성기",
    description:
      "Web Crypto의 안전한 난수로 로또 6/45 번호를 생성합니다. 여러 게임 한 번에 뽑기, 제외 번호 설정 가능.",
    metaDescription:
      "로또 번호 생성기 무료. Web Crypto 기반 안전 난수, 다중 게임, 제외 번호 옵션.",
    howTo: ["게임 수와 제외할 번호를 선택합니다.", "생성 버튼을 누르면 6자리씩 자동 추출됩니다."],
    faq: [{ q: "당첨률이 올라가나요?", a: "아닙니다. 추첨은 완전 무작위라 어떤 번호 조합도 동일한 확률입니다. 재미로만 쓰세요." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "json-formatter",
    component: "JsonFormatterTool",
    category: "dev",
    icon: "{ }",
    navTitle: "JSON 포맷터",
    title: "JSON 포맷터 - JSON 정렬 / 검증 / 압축",
    h1: "JSON 포맷터 & 검증기",
    description:
      "JSON을 보기 좋게 정렬하거나 한 줄로 압축하세요. 문법 오류를 알려주고, 키 정렬 옵션도 지원합니다.",
    metaDescription:
      "JSON 포맷터 무료. 정렬·압축·검증, 키 정렬 옵션, 오류 위치 표시.",
    howTo: [
      "JSON 문자열을 붙여넣습니다.",
      "정렬·압축·키 정렬 버튼을 누릅니다.",
      "유효성 검사 결과가 자동 표시됩니다.",
    ],
    faq: [
      { q: "어떤 들여쓰기를 지원하나요?", a: "2칸·4칸·탭 중에서 선택할 수 있습니다." },
      { q: "큰 JSON도 처리되나요?", a: "수 MB까지는 무리 없습니다. 브라우저 메모리 한계 안에서 처리됩니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "url-encoder",
    component: "UrlEncoderTool",
    category: "dev",
    icon: "🔗",
    navTitle: "URL 인코더",
    title: "URL 인코더 / 디코더 - 퍼센트 인코딩 변환",
    h1: "URL 인코더 / 디코더",
    description:
      "URL에 들어갈 한글·특수문자를 퍼센트 인코딩으로 변환하거나 디코딩하세요. encodeURIComponent / encodeURI 모드 지원.",
    metaDescription:
      "URL 퍼센트 인코딩 무료 변환. encodeURIComponent / encodeURI 모드, 한글 지원.",
    howTo: [
      "왼쪽에 텍스트/URL을 입력합니다.",
      "인코딩 또는 디코딩 버튼을 누릅니다.",
      "결과를 복사합니다.",
    ],
    faq: [
      { q: "encodeURI와 encodeURIComponent 차이가 뭔가요?", a: "encodeURI는 URL 전체용이라 ':/?#&=' 같은 구분자를 보존합니다. encodeURIComponent는 쿼리스트링 값용으로 모든 특수문자를 인코딩합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "hash-generator",
    component: "HashTool",
    category: "dev",
    icon: "🔒",
    navTitle: "해시 생성",
    title: "해시 생성기 - SHA-256, SHA-512, MD5, SHA-1",
    h1: "텍스트/파일 해시 생성",
    description:
      "텍스트나 파일의 SHA-256·SHA-512·SHA-1·MD5 해시를 즉시 계산하세요. 무결성 검증·체크섬에 사용합니다.",
    metaDescription:
      "SHA-256, SHA-512, SHA-1, MD5 해시 무료 생성. 텍스트·파일 둘 다 지원.",
    howTo: [
      "탭에서 텍스트 또는 파일을 선택합니다.",
      "텍스트를 입력하거나 파일을 업로드합니다.",
      "각 알고리즘별 해시가 자동 계산됩니다.",
    ],
    faq: [
      { q: "어떤 게 가장 안전한가요?", a: "보안용도라면 SHA-256 이상을 권장합니다. MD5와 SHA-1은 충돌 공격이 알려져 있어 무결성 검증용으로만 쓰세요." },
      { q: "파일이 서버로 전송되나요?", a: "아니요. 모든 계산이 브라우저 Web Crypto API로 로컬에서 일어납니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "uuid-generator",
    component: "UuidTool",
    category: "dev",
    icon: "🆔",
    navTitle: "UUID 생성",
    title: "UUID 생성기 - UUID v4 무료 생성 (다중 생성 지원)",
    h1: "UUID v4 생성기",
    description:
      "암호학적으로 안전한 UUID v4를 한 번에 여러 개 생성하세요. 하이픈 포함/제외, 대문자 옵션 지원.",
    metaDescription:
      "UUID v4 무료 생성. 다중 생성, 하이픈 옵션, Web Crypto 기반.",
    howTo: ["생성할 개수를 입력합니다.", "옵션을 선택합니다 (하이픈/대문자).", "복사 버튼으로 결과를 가져갑니다."],
    faq: [{ q: "UUID v4가 정말 고유한가요?", a: "수학적으로 122비트 랜덤이라 충돌 확률이 무시할 수준입니다. 안전한 난수원(Web Crypto)을 사용합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "timestamp-converter",
    component: "TimestampTool",
    category: "dev",
    icon: "⏱️",
    navTitle: "Unix 타임스탬프 변환",
    title: "Unix 타임스탬프 변환기 - 초·밀리초 ↔ 사람이 읽는 시간",
    h1: "Unix 타임스탬프 ↔ 날짜",
    description:
      "Unix 타임스탬프(초 또는 밀리초)를 사람이 읽는 날짜·시간으로 변환하고, 그 반대도 가능합니다. ISO 8601, 로컬, UTC 표시 모두 지원.",
    metaDescription:
      "Unix 타임스탬프 변환기. 초·밀리초 ↔ ISO/로컬/UTC, 현재 시각 즉시 표시.",
    howTo: [
      "타임스탬프 또는 날짜를 입력합니다.",
      "단위(초/밀리초)와 표시 형식(로컬/UTC/ISO)을 선택합니다.",
      "결과가 즉시 표시됩니다.",
    ],
    faq: [
      { q: "초와 밀리초 차이가 뭔가요?", a: "Unix 표준은 초(10자리), JavaScript Date는 밀리초(13자리)를 씁니다. 자릿수로 자동 감지합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "base64-image",
    component: "Base64ImageTool",
    category: "dev",
    icon: "🖻",
    navTitle: "이미지 ↔ Base64",
    title: "이미지 Base64 변환 - data URL 생성기",
    h1: "이미지 ↔ Base64 변환",
    description:
      "이미지를 Base64 data URL로 인코딩하거나, data URL을 다시 이미지로 디코딩하세요. CSS·이메일에 이미지 인라인 임베드할 때 사용합니다.",
    metaDescription:
      "이미지 ↔ Base64 무료 변환. data URL 생성, CSS·이메일 인라인 이미지용.",
    howTo: [
      "이미지를 업로드하면 Base64 data URL이 자동 생성됩니다.",
      "반대로 data URL을 붙여넣으면 이미지로 미리보기 됩니다.",
      "복사 버튼으로 결과를 가져갑니다.",
    ],
    faq: [{ q: "data URL 용량은 원본보다 큰가요?", a: "Base64는 약 33% 용량이 증가합니다. 인라인 임베드 외에는 보통 외부 파일이 더 효율적입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "csv-to-json",
    component: "CsvToJsonTool",
    category: "dev",
    icon: "📊",
    navTitle: "CSV ↔ JSON",
    title: "CSV JSON 변환기 - 양방향 자동 변환",
    h1: "CSV ↔ JSON 변환",
    description:
      "CSV 데이터를 JSON 배열로, JSON 배열을 CSV로 변환하세요. 첫 줄을 헤더로 인식하며 따옴표·쉼표가 포함된 값도 정상 처리합니다.",
    metaDescription:
      "CSV ↔ JSON 무료 변환. 헤더 자동 인식, 인용 처리, 양방향 변환.",
    howTo: [
      "CSV 또는 JSON 텍스트를 붙여넣습니다.",
      "방향(CSV→JSON / JSON→CSV)을 선택합니다.",
      "결과를 복사하거나 .csv·.json 파일로 다운로드합니다.",
    ],
    faq: [
      { q: "어떤 구분자를 지원하나요?", a: "기본은 쉼표(,)이고, 설정에서 탭(\\t)·세미콜론(;)으로 바꿀 수 있습니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "yaml-json",
    component: "YamlJsonTool",
    category: "dev",
    icon: "🧾",
    navTitle: "YAML ↔ JSON",
    title: "YAML JSON 변환기 - 양방향 자동 변환",
    h1: "YAML ↔ JSON 변환",
    description:
      "YAML과 JSON 사이를 자유롭게 변환하세요. Kubernetes, GitHub Actions, OpenAPI 설정 파일 작업에 유용합니다.",
    metaDescription:
      "YAML ↔ JSON 무료 변환. K8s / GitHub Actions / OpenAPI 설정 작업에 적합.",
    howTo: [
      "YAML 또는 JSON 텍스트를 붙여넣습니다.",
      "방향을 선택합니다.",
      "결과를 복사합니다.",
    ],
    faq: [{ q: "어떤 YAML 사양을 따르나요?", a: "YAML 1.2 (eemeli/yaml 라이브러리 기반)를 따릅니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "sql-formatter",
    component: "SqlFormatterTool",
    category: "dev",
    icon: "🗃️",
    navTitle: "SQL 포맷터",
    title: "SQL 포맷터 - 정렬·들여쓰기 자동 (MySQL/Postgres/SQLite/MSSQL)",
    h1: "SQL 포맷터 / 정렬기",
    description:
      "복잡한 SQL을 보기 좋게 정렬합니다. MySQL·Postgres·SQLite·MSSQL·BigQuery·Snowflake 등 14가지 dialect 지원.",
    metaDescription:
      "SQL 포맷터 무료. MySQL·Postgres·SQLite·MSSQL 등 14 dialect.",
    howTo: ["SQL을 붙여넣습니다.", "dialect를 선택합니다.", "포맷 버튼을 누릅니다."],
    faq: [{ q: "여러 쿼리도 되나요?", a: "세미콜론(;)으로 구분된 여러 쿼리도 함께 포맷됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "cron-parser",
    component: "CronParserTool",
    category: "dev",
    icon: "⏰",
    navTitle: "Cron 표현식 분석",
    title: "Cron 표현식 분석기 - 다음 실행 시각 + 사람이 읽는 설명",
    h1: "Cron 표현식 분석 (Next Run)",
    description:
      "Cron 표현식을 입력하면 사람이 읽기 좋은 설명과 다음 N회 실행 시각을 보여줍니다. 5필드·6필드(초 포함) 지원.",
    metaDescription:
      "Cron 표현식 분석 무료. 다음 실행 시각, 사람 읽는 설명, 5/6 필드.",
    howTo: ["Cron 표현식을 입력합니다 (예: '0 9 * * 1').", "설명과 다음 10회 실행 시각이 표시됩니다."],
    faq: [{ q: "한국 시간대로 보이나요?", a: "브라우저 시간대(보통 한국 시간)를 사용합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "cidr-calc",
    component: "CidrCalcTool",
    category: "dev",
    icon: "🌐",
    navTitle: "IPv4 / CIDR 계산기",
    title: "IPv4 CIDR 서브넷 계산기 - 네트워크/브로드캐스트/호스트 수",
    h1: "IPv4 / CIDR 서브넷 계산기",
    description:
      "CIDR 표기(예: 192.168.0.0/24)에서 네트워크 주소·브로드캐스트·서브넷 마스크·사용 가능 호스트 수를 계산합니다.",
    metaDescription:
      "IPv4 CIDR 계산기 무료. 네트워크/브로드캐스트/마스크/호스트 수.",
    howTo: ["IPv4 주소와 prefix 길이를 입력합니다 (예: 192.168.0.0/24).", "결과가 즉시 표시됩니다."],
    faq: [{ q: "IPv6도 되나요?", a: "현재는 IPv4만 지원합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "jwt-decoder",
    component: "JwtDecoderTool",
    category: "dev",
    icon: "🔓",
    navTitle: "JWT 디코더",
    title: "JWT 디코더 - JSON Web Token 헤더/페이로드 검사",
    h1: "JWT 디코더 (헤더 / 페이로드)",
    description:
      "JWT 토큰의 헤더와 페이로드를 디코드하세요. 만료 시각·발급자 등을 한 눈에 확인. 서명 검증은 하지 않으므로 디버깅 용도로만 쓰세요.",
    metaDescription:
      "JWT 토큰 디코더 무료. 헤더·페이로드·만료 시각 표시, 브라우저에서 안전 처리.",
    howTo: ["JWT 토큰을 붙여넣습니다.", "헤더·페이로드가 자동 디코딩됩니다.", "exp/iat 시각이 사람 읽기 좋게 표시됩니다."],
    faq: [{ q: "서명도 검증되나요?", a: "아니요. 디코딩만 합니다. 서명 검증에는 비밀 키가 필요해 클라이언트에서 안전하게 할 수 없습니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "css-shadow",
    component: "CssShadowTool",
    category: "dev",
    icon: "🌑",
    navTitle: "CSS 그림자 생성",
    title: "CSS box-shadow 생성기 - 슬라이더로 그림자 만들기",
    h1: "CSS box-shadow 그림자 생성기",
    description:
      "슬라이더로 box-shadow를 시각적으로 만들고 코드를 복사하세요. 다중 그림자 레이어 지원, 미리보기 즉시 반영.",
    metaDescription:
      "CSS box-shadow 무료 생성기. 슬라이더 UI, 다중 레이어, 실시간 미리보기.",
    howTo: ["슬라이더로 X/Y 오프셋, 블러, 확장, 색상, 투명도를 조절합니다.", "+ 버튼으로 그림자 레이어를 추가합니다.", "결과 CSS를 복사합니다."],
    faq: [{ q: "inset 그림자도 가능한가요?", a: "네. 각 레이어마다 'inset' 토글을 켤 수 있습니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "json-xml",
    component: "JsonXmlTool",
    category: "dev",
    icon: "📄",
    navTitle: "JSON ↔ XML",
    title: "JSON XML 변환기 - 양방향 자동 변환",
    h1: "JSON ↔ XML 변환",
    description:
      "JSON과 XML 사이를 자유롭게 변환하세요. 속성 처리·들여쓰기 옵션 지원.",
    metaDescription:
      "JSON ↔ XML 무료 변환. 양방향, 들여쓰기 옵션, fast-xml-parser 기반.",
    howTo: ["JSON 또는 XML을 붙여넣고 방향을 선택합니다.", "결과를 복사합니다."],
    faq: [{ q: "XML 속성은 어떻게 변환되나요?", a: "@_ 접두사로 속성을 구분합니다 (예: `{\"@_id\": \"1\"}` ↔ `<tag id=\"1\">`)." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "dday",
    component: "DDayTool",
    category: "dev",
    icon: "📅",
    navTitle: "D-day 계산기",
    title: "D-day 계산기 - 디데이 / 날짜 차이 / 며칠 후",
    h1: "D-day · 날짜 계산기",
    description:
      "두 날짜 사이의 일수, 특정 날짜까지의 D-day, 오늘에서 N일 후 같은 날짜 계산을 한 번에. 한국 음력은 지원하지 않습니다.",
    metaDescription:
      "D-day 계산기 무료. 두 날짜 사이 일수, 디데이, N일 후 계산, 즉시 결과.",
    howTo: ["탭에서 모드를 선택합니다 (D-day / 차이 / N일 후).", "날짜를 입력하면 결과가 즉시 표시됩니다."],
    faq: [{ q: "윤년 처리는요?", a: "JavaScript Date API를 사용해 그레고리력 윤년이 자동 처리됩니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "unit-converter",
    component: "UnitConverterTool",
    category: "dev",
    icon: "📏",
    navTitle: "단위 변환기",
    title: "단위 변환기 - 길이/무게/온도/면적/부피 변환",
    h1: "단위 변환기",
    description:
      "길이(m·km·inch·ft), 무게(g·kg·lb·oz), 온도(°C·°F·K), 면적(m²·평·acre), 부피(L·mL·gallon)를 즉시 변환하세요.",
    metaDescription:
      "단위 변환기 무료. 길이·무게·온도·면적·부피, 즉시 양방향 변환.",
    howTo: ["탭에서 종류를 고릅니다.", "한 쪽에 값을 입력하면 다른 쪽이 자동 계산됩니다."],
    faq: [{ q: "한국 단위(평·근)도 지원하나요?", a: "면적의 '평'은 지원합니다. 무게 '근'은 지역마다 달라 표준값을 지정하기 어려워 미지원입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "regex-tester",
    component: "RegexTesterTool",
    category: "dev",
    icon: "🔎",
    navTitle: "정규식 테스터",
    title: "정규식 테스터 - JavaScript Regex 매칭 확인",
    h1: "정규식 테스터",
    description:
      "정규식 패턴과 플래그(gimsuy)를 입력해 매칭 결과를 실시간으로 확인하세요. 캡처 그룹·치환 미리보기 지원.",
    metaDescription:
      "JavaScript 정규식 무료 테스터. 매칭 결과 실시간 표시, 캡처 그룹·치환 지원.",
    howTo: [
      "정규식 패턴을 입력합니다.",
      "테스트할 문자열을 입력합니다.",
      "플래그(g, i, m 등)를 선택합니다.",
      "매칭 결과와 캡처 그룹이 자동 표시됩니다.",
    ],
    faq: [
      { q: "어떤 엔진을 쓰나요?", a: "브라우저의 JavaScript 정규식 엔진을 사용합니다. ECMAScript 표준이며 lookahead/lookbehind 모두 지원합니다." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "color-converter",
    component: "ColorTool",
    category: "dev",
    icon: "🎨",
    navTitle: "색상 코드 변환",
    title: "색상 코드 변환 - HEX RGB HSL 변환기",
    h1: "색상 코드 변환 (HEX ↔ RGB ↔ HSL)",
    description:
      "HEX, RGB, HSL 색상 코드를 서로 변환하세요. 디자이너와 개발자를 위한 무료 도구.",
    metaDescription:
      "HEX RGB HSL 색상 코드 무료 변환기. 실시간 미리보기.",
    howTo: [
      "원하는 형식의 색상 코드를 입력하거나 색상 휠에서 선택합니다.",
      "다른 형식의 코드가 자동으로 변환되어 표시됩니다.",
      "원하는 코드를 복사 버튼으로 복사합니다.",
    ],
    faq: [
      { q: "HSL이 뭐가 다른가요?", a: "HSL(색조, 채도, 명도)은 색을 직관적으로 조절할 때 편리합니다. 같은 색의 밝기만 바꾸고 싶을 때 HSL이 RGB보다 쉽습니다." },
    ],
  },
  {
    slug: "base64",
    component: "Base64Tool",
    category: "dev",
    icon: "🔐",
    navTitle: "Base64 변환",
    title: "Base64 인코더/디코더 - 무료 온라인 변환기",
    h1: "Base64 인코더 / 디코더",
    description:
      "텍스트와 Base64를 서로 변환하세요. URL-safe 옵션 지원, 한글 자동 처리.",
    metaDescription:
      "Base64 인코딩/디코딩 무료 변환기. 한글 지원, URL-safe 옵션.",
    howTo: [
      "왼쪽에 텍스트(또는 Base64)를 입력합니다.",
      "오른쪽에 변환 결과가 즉시 표시됩니다.",
      "복사 버튼으로 클립보드에 복사합니다.",
    ],
    faq: [
      { q: "한글도 Base64로 변환되나요?", a: "네. 내부적으로 UTF-8 인코딩 후 Base64로 변환합니다." },
      { q: "URL-safe Base64가 뭔가요?", a: "URL에 그대로 사용 가능한 변형 Base64로, '+/='를 '-_'로 대체합니다." },
    ],
  },
  {
    slug: "password-generator",
    component: "PasswordTool",
    category: "dev",
    icon: "🔑",
    navTitle: "비밀번호 생성기",
    title: "비밀번호 생성기 - 무료 랜덤 강력 비밀번호 만들기",
    h1: "안전한 비밀번호 생성기",
    description:
      "암호학적으로 안전한 랜덤 비밀번호를 생성합니다. 길이·대소문자·숫자·특수문자 선택 가능.",
    metaDescription:
      "강력하고 안전한 랜덤 비밀번호 무료 생성. 길이·문자 종류 선택 가능.",
    howTo: [
      "원하는 길이와 포함할 문자 종류를 선택합니다.",
      "생성 버튼을 누르면 랜덤 비밀번호가 만들어집니다.",
      "복사 버튼으로 클립보드에 복사하세요.",
    ],
    faq: [
      { q: "내 비밀번호가 어디로 전송되나요?", a: "아닙니다. 비밀번호는 브라우저 안에서만 생성되며 외부로 전송되지 않습니다." },
      { q: "강력한 비밀번호는 몇 자가 좋나요?", a: "16자 이상에 대소문자·숫자·특수문자를 모두 포함하면 사실상 안전합니다." },
    ],
  },

  // ===== Batch G (43 new tools) - dev =====
  { slug: "slug-generator", component: "SlugGeneratorTool", category: "dev", icon: "🔗", navTitle: "URL 슬러그 생성", title: "URL 슬러그 생성기 - 한글·공백 → SEO 친화 URL", h1: "URL 슬러그 생성기", description: "한글이나 공백, 특수문자를 SEO 친화적인 URL 슬러그로 변환합니다. 한글 로마자 변환 옵션 포함.", metaDescription: "URL 슬러그 무료 생성. 한글·특수문자 → SEO 친화 URL.", howTo: ["원본 텍스트를 입력합니다.", "옵션을 선택합니다.", "슬러그를 복사합니다."], faq: [{ q: "한글은 어떻게 처리되나요?", a: "한글 그대로 두거나 로마자 변환 옵션을 선택할 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "html-minifier", component: "HtmlMinifierTool", category: "dev", icon: "📦", navTitle: "HTML 미니파이어", title: "HTML 미니파이어 - 공백·주석 제거로 용량 절감", h1: "HTML 미니파이어", description: "HTML에서 공백·주석·줄바꿈을 제거해 용량을 줄입니다. 빠른 로딩을 위한 배포 최적화에 사용.", metaDescription: "HTML 미니파이 무료. 공백·주석 제거, 용량 절감.", howTo: ["HTML을 붙여넣습니다.", "압축 버튼을 누릅니다.", "결과를 복사합니다."], faq: [{ q: "원본 의미가 바뀌나요?", a: "아닙니다. 공백·주석만 제거합니다." }], addedAt: "2026-05-14" },
  { slug: "css-minifier", component: "CssMinifierTool", category: "dev", icon: "🎨", navTitle: "CSS 미니파이어", title: "CSS 미니파이어 - 공백·주석 제거", h1: "CSS 미니파이어", description: "CSS에서 공백·주석·불필요한 세미콜론을 제거해 용량을 절감합니다.", metaDescription: "CSS 미니파이 무료. 공백·주석 제거, 용량 절감.", howTo: ["CSS를 붙여넣습니다.", "압축 버튼을 누릅니다."], faq: [{ q: "복원 가능한가요?", a: "구조는 살아 있어 가독성이 떨어질 뿐 의미는 같습니다." }], addedAt: "2026-05-14" },
  { slug: "js-minifier", component: "JsMinifierTool", category: "dev", icon: "📦", navTitle: "JavaScript 미니파이어", title: "JavaScript 미니파이어 - terser 기반 압축", h1: "JavaScript 미니파이어", description: "Terser 기반으로 JavaScript를 압축하고 mangle합니다. 식별자 단축·dead code 제거 포함.", metaDescription: "JavaScript 미니파이 무료. terser 기반, mangle·dead code 제거.", howTo: ["JS를 붙여넣고 압축 버튼을 누릅니다.", "결과를 복사합니다."], faq: [{ q: "ES6+ 문법 지원?", a: "네. ES2022까지 지원합니다." }], addedAt: "2026-05-14" },
  { slug: "json-diff", component: "JsonDiffTool", category: "dev", icon: "🔍", navTitle: "JSON 비교 (diff)", title: "JSON 비교 - 두 JSON 차이점 즉시 찾기", h1: "JSON 비교 / Diff", description: "두 JSON의 차이점을 객체 단위로 비교해 추가·제거·변경된 키를 표시합니다.", metaDescription: "JSON 비교 무료. 객체 단위 diff, 추가·제거·변경 표시.", howTo: ["왼쪽·오른쪽에 JSON을 붙여넣습니다.", "차이점이 자동 표시됩니다."], faq: [{ q: "배열 순서가 다르면?", a: "JSON 표준에 따라 배열 순서는 의미가 있으니 다른 것으로 표시됩니다." }], addedAt: "2026-05-14" },
  { slug: "text-binary", component: "TextBinaryTool", category: "dev", icon: "0️⃣", navTitle: "텍스트 ↔ 2진수", title: "텍스트 2진수 변환 - 글자 → Binary 양방향", h1: "텍스트 ↔ 2진수 변환", description: "텍스트를 비트 단위 2진수로, 2진수를 텍스트로 변환합니다. ASCII와 UTF-8 모두 지원.", metaDescription: "텍스트 2진수 무료 변환. UTF-8 지원, 양방향.", howTo: ["변환할 텍스트나 2진수를 입력합니다."], faq: [{ q: "한글도 되나요?", a: "UTF-8 인코딩으로 한글도 변환됩니다 (한 글자 3바이트)." }], addedAt: "2026-05-14" },
  { slug: "text-hex", component: "TextHexTool", category: "dev", icon: "1️⃣6️⃣", navTitle: "텍스트 ↔ 16진수", title: "텍스트 16진수 변환 - UTF-8 hex dump", h1: "텍스트 ↔ 16진수 변환", description: "텍스트를 16진수(hex)로, 16진수를 텍스트로 변환합니다. 디버깅·인코딩 확인에 유용.", metaDescription: "텍스트 16진수 무료 변환. UTF-8 hex dump, 양방향.", howTo: ["변환할 텍스트나 hex를 입력합니다."], faq: [{ q: "공백 구분도 되나요?", a: "공백 포함/제외 출력을 선택할 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "ansi-to-html", component: "AnsiToHtmlTool", category: "dev", icon: "🌈", navTitle: "ANSI → HTML", title: "ANSI 컬러 코드 → HTML 변환 - 터미널 출력 시각화", h1: "ANSI 색상 코드 → HTML", description: "터미널의 ANSI 이스케이프 시퀀스를 HTML로 변환해 웹 페이지에 색상 그대로 표시합니다.", metaDescription: "ANSI → HTML 무료 변환. 터미널 색상 그대로 웹에 표시.", howTo: ["ANSI 이스케이프 시퀀스 텍스트를 붙여넣습니다.", "HTML 결과를 받습니다."], faq: [{ q: "어떤 코드 지원?", a: "기본 16색 + 256색 + RGB(트루컬러)를 모두 지원합니다." }], addedAt: "2026-05-14" },
  { slug: "keycode-viewer", component: "KeycodeTool", category: "dev", icon: "⌨️", navTitle: "키 코드 확인", title: "JavaScript 키 코드 확인 - keyCode / key / code", h1: "JavaScript 키 이벤트 코드 확인", description: "키보드 키를 누르면 해당 이벤트의 key·code·keyCode·which 속성이 표시됩니다.", metaDescription: "JS 키보드 이벤트 코드 무료 확인. key·code·keyCode 표시.", howTo: ["페이지에서 아무 키나 누릅니다.", "이벤트 속성이 실시간 표시됩니다."], faq: [{ q: "key와 code 차이는?", a: "key는 입력 결과(예: 'A'), code는 물리적 키 위치(예: 'KeyA')입니다." }], addedAt: "2026-05-14" },
  { slug: "file-to-base64", component: "FileToBase64Tool", category: "dev", icon: "📂", navTitle: "파일 → Base64", title: "파일 Base64 인코딩 - 모든 파일 → data URL", h1: "파일 → Base64 변환", description: "이미지·PDF·동영상 등 모든 파일을 Base64 data URL로 인코딩합니다. data URL → 파일 디코딩도 지원.", metaDescription: "파일 Base64 무료 변환. data URL 생성, 모든 파일 지원.", howTo: ["파일을 업로드합니다.", "Base64 결과를 복사하거나 다운로드합니다."], faq: [{ q: "큰 파일도 되나요?", a: "10MB 이하 권장. Base64는 약 33% 용량이 증가합니다." }], addedAt: "2026-05-14" },
  { slug: "unicode-lookup", component: "UnicodeLookupTool", category: "dev", icon: "Ⓤ", navTitle: "유니코드 찾기", title: "유니코드 코드포인트 변환 - 글자 ↔ U+XXXX", h1: "유니코드 코드포인트 ↔ 글자", description: "글자의 유니코드 코드포인트(U+XXXX)와 이름을 확인하고, 코드포인트로 글자를 만들 수 있습니다.", metaDescription: "유니코드 코드포인트 무료 검색. 글자 ↔ U+XXXX, 이모지 분석.", howTo: ["글자를 입력하면 코드포인트가 표시됩니다.", "반대로 U+XXXX를 입력하면 글자가 표시됩니다."], faq: [{ q: "이모지도 되나요?", a: "네. 다중 코드포인트(서러게이트 페어, ZWJ 시퀀스)까지 표시합니다." }], addedAt: "2026-05-14" },
  { slug: "svg-minifier", component: "SvgMinifierTool", category: "dev", icon: "🎨", navTitle: "SVG 미니파이어", title: "SVG 미니파이어 - 주석·공백·메타데이터 제거", h1: "SVG 미니파이어", description: "SVG 파일에서 주석·여분 공백·에디터 메타데이터를 제거해 용량을 줄입니다.", metaDescription: "SVG 미니파이 무료. 주석·메타데이터 제거, 용량 절감.", howTo: ["SVG 코드를 붙여넣습니다.", "최적화 버튼을 누릅니다."], faq: [{ q: "어디까지 줄여요?", a: "보통 30~60% 용량이 줄어듭니다." }], addedAt: "2026-05-14" },

  // ===== Batch G - text =====
  { slug: "text-reverse", component: "TextReverseTool", category: "text", icon: "↩️", navTitle: "텍스트 거꾸로", title: "텍스트 거꾸로 - 글자/단어/줄 단위 역순", h1: "텍스트 거꾸로 만들기", description: "글자, 단어, 줄 단위로 텍스트를 역순으로 뒤집습니다. 짤·재미용·암호화 연습에 사용.", metaDescription: "텍스트 거꾸로 무료. 글자·단어·줄 역순.", howTo: ["텍스트를 입력합니다.", "모드를 선택합니다.", "복사합니다."], faq: [{ q: "한글도 되나요?", a: "네. 한글 음절 단위로 역순됩니다." }], addedAt: "2026-05-14" },
  { slug: "line-numbers", component: "LineNumbersTool", category: "text", icon: "1️⃣", navTitle: "줄 번호 추가", title: "텍스트 줄 번호 추가 - 자동 번호 매기기", h1: "줄 번호 추가", description: "여러 줄 텍스트에 자동으로 줄 번호를 매깁니다. 시작 번호·구분자·자릿수 패딩 설정 가능.", metaDescription: "줄 번호 추가 무료. 시작 번호·구분자 조절, 일괄 처리.", howTo: ["텍스트를 입력합니다.", "옵션을 조절하면 즉시 반영됩니다."], faq: [{ q: "0부터 시작도 되나요?", a: "시작 번호를 자유롭게 입력할 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "reading-time", component: "ReadingTimeTool", category: "text", icon: "⏰", navTitle: "발표·읽기 시간", title: "발표 시간 / 읽기 시간 추정 - 글자수 → 분", h1: "발표 / 읽기 시간 추정", description: "텍스트 글자수로 발표 시간(WPM)과 묵독 시간을 추정합니다. 한국어·영어 분당 속도 조절 가능.", metaDescription: "발표 시간 추정 무료. WPM 기반, 한국어·영어 지원.", howTo: ["원고를 붙여넣습니다.", "분당 단어/글자 수를 조절합니다."], faq: [{ q: "기본 속도?", a: "한국어 발표 평균 분당 300자, 묵독 분당 500자입니다." }], addedAt: "2026-05-14" },
  { slug: "hanja-to-hangul", component: "HanjaToHangulTool", category: "text", icon: "漢", navTitle: "한자 → 한글", title: "한자 한글 변환 - 자주 쓰는 한자 600자", h1: "한자 → 한글 변환", description: "자주 쓰는 한자 600자를 한글 음으로 변환합니다. 이름·기사·계약서 한자 읽기에 유용.", metaDescription: "한자 한글 변환 무료. 자주 쓰는 한자 600자, 빠른 검색.", howTo: ["한자가 포함된 텍스트를 입력합니다.", "한글 변환 결과가 표시됩니다."], faq: [{ q: "모든 한자가 되나요?", a: "자주 쓰는 600자 사전 기반입니다. 누락된 한자는 그대로 둡니다." }], addedAt: "2026-05-14" },
  { slug: "ascii-box", component: "AsciiBoxTool", category: "text", icon: "▢", navTitle: "ASCII 박스", title: "ASCII 박스 / 테두리 - 텍스트를 박스로 둘러싸기", h1: "ASCII 박스 만들기", description: "텍스트를 깔끔한 ASCII / 유니코드 박스로 둘러쌉니다. 코드 주석, README 강조, 채팅 메시지에 사용.", metaDescription: "ASCII 박스 무료. 텍스트 둘러싸기, 다양한 박스 스타일.", howTo: ["텍스트를 입력합니다.", "박스 스타일을 선택합니다.", "복사합니다."], faq: [{ q: "스타일 종류?", a: "단순 ASCII (+-|), 둥근 모서리, 두꺼운 선 등 여러 스타일 지원." }], addedAt: "2026-05-14" },
  { slug: "encoding-convert", component: "EncodingConvertTool", category: "text", icon: "🔤", navTitle: "텍스트 인코딩 변환", title: "텍스트 인코딩 변환 - EUC-KR / CP949 / UTF-8 깨진 글자 복구", h1: "텍스트 인코딩 변환", description: "EUC-KR / CP949로 저장된 파일이 UTF-8로 잘못 읽혀 깨진 한글을 복원합니다. ��대신 글자가 보이게 됩니다.", metaDescription: "한글 깨짐 복구 무료. EUC-KR / CP949 / UTF-8 변환, 텍스트·파일 지원.", howTo: ["깨진 글자가 포함된 텍스트를 붙여넣거나 파일을 업로드합니다.", "원본 인코딩을 선택합니다.", "복원된 결과를 받습니다."], faq: [{ q: "왜 한글이 깨지나요?", a: "파일이 EUC-KR/CP949로 저장됐는데 프로그램이 UTF-8로 읽으면 깨집니다. 원본 인코딩을 알려주면 복원 가능합니다." }], addedAt: "2026-05-14" },
  { slug: "line-joiner", component: "LineJoinerTool", category: "text", icon: "🔗", navTitle: "여러 줄 → 한 줄", title: "줄 합치기 - 여러 줄을 한 줄로 또는 구분자로 연결", h1: "텍스트 줄 합치기", description: "여러 줄 텍스트를 한 줄로 합치거나, 쉼표·세미콜론 등 구분자로 연결합니다. 엑셀 셀에서 SQL IN 절 등에 유용.", metaDescription: "여러 줄 합치기 무료. 구분자 선택, 빈 줄 제거, 따옴표 옵션.", howTo: ["줄별로 입력된 텍스트를 붙여넣습니다.", "구분자와 옵션을 선택합니다."], faq: [{ q: "SQL IN 절은 어떻게?", a: "구분자 쉼표 + 따옴표 옵션을 켜면 'A','B','C' 형식이 됩니다." }], addedAt: "2026-05-14" },

  // ===== Batch G - image =====
  { slug: "text-card", component: "TextCardTool", category: "image", icon: "📇", navTitle: "텍스트 카드 만들기", title: "텍스트 카드 만들기 - 글자 → SNS용 이미지 (인스타·트위터)", h1: "텍스트 → 이미지 카드", description: "명언·인용·공지·홍보 글을 SNS 공유용 이미지 카드로 만들어 PNG로 저장하세요. 그라데이션 배경·폰트·크기 조절. 인스타 카드뉴스, 트위터 트윗 캡처 스타일, 가게 메뉴/공지, 학습 노트 정리 등에 자주 쓰입니다.", metaDescription: "텍스트 카드 무료 생성. SNS 공유용 이미지, 그라데이션 배경.", howTo: ["문구를 입력합니다.", "배경(단색·그라데이션)을 선택합니다.", "폰트와 크기, 정렬을 조절합니다.", "PNG로 저장합니다."], faq: [{ q: "어떤 크기로 저장돼요?", a: "정사각형 1080×1080(인스타 게시물), 세로형 1080×1350(인스타 추천 비율), 가로형 1200×630(페북·OG 이미지) 중 선택할 수 있습니다." }, { q: "여러 줄 글도 들어가나요?", a: "줄바꿈을 그대로 인식해 여러 줄로 표시됩니다. 줄 사이 간격도 조절 가능합니다." }, { q: "한글 폰트는 어떤 게 좋아요?", a: "본문은 깔끔한 산세리프(나눔고딕·맑은 고딕·Pretendard), 인용/명언은 명조(나눔명조·KoPubWorld 명조)가 분위기 있습니다." }, { q: "이모지·특수문자도 들어가나요?", a: "OS 이모지 폰트가 적용됩니다. 윈도우·맥·iOS에서 모양이 약간 다를 수 있습니다." }, { q: "여러 장을 시리즈로 만들 수 있나요?", a: "한 번에 한 장씩 만듭니다. 카드뉴스 시리즈라면 같은 설정으로 텍스트만 바꿔 여러 번 저장하세요." }], addedAt: "2026-05-14" },
  { slug: "image-compare", component: "ImageCompareTool", category: "image", icon: "↔️", navTitle: "이미지 비교 슬라이더", title: "이미지 Before/After 비교 - 슬라이더로 두 사진 비교", h1: "이미지 Before/After 슬라이더", description: "두 이미지를 비교하는 슬라이더형 미리보기를 만듭니다. 보정 전·후, 인테리어 리뉴얼 전·후, 다이어트 전·후, 디자인 시안 A/B 비교, 시간 경과 비교(같은 장소 다른 시기)에 자주 쓰입니다.", metaDescription: "Before/After 슬라이더 무료. 두 이미지 비교, PNG 저장.", howTo: ["두 이미지(전·후)를 업로드합니다.", "슬라이더를 좌우로 움직여 비교합니다.", "원하는 위치에서 스크린샷을 캡처하거나 PNG로 저장합니다."], faq: [{ q: "두 이미지 크기가 다르면?", a: "큰 쪽에 맞춰 자동 정렬합니다. 더 정확한 비교를 원하면 [이미지 크기 변경]으로 미리 같은 크기로 맞추세요." }, { q: "이 슬라이더를 그대로 블로그에 임베드할 수 있나요?", a: "현재는 캡처용 미리보기만 제공합니다. 인터랙티브 슬라이더로 임베드하려면 별도의 JS 라이브러리(twentytwenty 등)가 필요합니다." }, { q: "Before/After 사진 어떻게 찍어야 잘 나와요?", a: "같은 위치·각도·조명·렌즈로 찍는 게 핵심입니다. 삼각대를 쓰거나 격자 가이드를 켜고 촬영하세요." }, { q: "세 장 이상 비교는 안 됩니까?", a: "이 도구는 두 장 비교 전용입니다. 여러 장 비교는 [이미지 합치기]의 격자 레이아웃을 사용하세요." }, { q: "결과를 GIF로 만들 수 있나요?", a: "본 도구는 정적 비교용입니다. 움직이는 비교가 필요하면 슬라이더 위치별로 캡처해서 [동영상 → GIF] 도구로 합쳐보세요." }], addedAt: "2026-05-14" },
  { slug: "image-zip", component: "ImageZipTool", category: "image", icon: "🗜️", navTitle: "이미지 ZIP 묶기", title: "이미지 ZIP 일괄 묶기 - 여러 사진 한 ZIP으로", h1: "이미지 → ZIP 묶기", description: "여러 이미지를 한 ZIP 파일로 묶습니다. 메일 첨부, 카톡 공유, 클라우드 업로드, 외장 디스크 백업, 보고서 첨부 자료 일괄 전송 등에 편리합니다.", metaDescription: "이미지 ZIP 무료 묶기. 여러 사진 한 번에, 폴더 구조 유지.", howTo: ["이미지들을 업로드합니다 (여러 장 동시 가능).", "필요하면 파일명 정리를 확인합니다.", "ZIP 다운로드 버튼을 누릅니다."], faq: [{ q: "압축률은요?", a: "이미지(JPG/PNG/WebP 등)는 이미 압축돼 있어 ZIP 추가 압축률이 낮습니다. 용량을 줄이려는 목적이라면 [이미지 압축]을 먼저 쓰세요. 이 도구는 '여러 장을 한 파일로 묶기'가 목적입니다." }, { q: "왜 ZIP으로 묶나요?", a: "(1) 메일 첨부 한도 회피, (2) 카톡으로 사진 여러 장을 한 번에 보내기, (3) 폴더 구조 유지하며 백업, (4) 다른 사람과 공유 시 분실 방지." }, { q: "PDF로 묶는 게 더 낫지 않나요?", a: "보고서·문서 목적이면 [이미지 → PDF]가 낫고, 원본 이미지 파일을 그대로 보존하면서 묶고 싶다면 ZIP이 더 적합합니다." }, { q: "ZIP 안의 파일 순서가 중요한가요?", a: "ZIP은 일반적으로 알파벳·숫자 순으로 정렬됩니다. 순서를 명확히 하려면 파일명 앞에 01_, 02_ 같은 번호를 붙이세요." }, { q: "비밀번호 걸린 ZIP도 만들 수 있나요?", a: "현재 평문 ZIP만 생성합니다. 암호가 필요하면 다운로드 후 7-Zip·WinRAR 같은 도구로 다시 압축하세요." }, { q: "최대 몇 장까지 묶을 수 있나요?", a: "기술적 제한은 없지만 브라우저 메모리 한계로 보통 100장·전체 500MB 이내가 안정적입니다." }], addedAt: "2026-05-14" },
  { slug: "qr-logo", component: "QrLogoTool", category: "qr", icon: "🖼️", navTitle: "로고 있는 QR", title: "로고 들어간 QR 코드 - 중앙에 이미지 삽입", h1: "로고 들어간 QR 코드", description: "QR 코드 중앙에 로고/아이콘을 삽입하세요. 브랜드 QR에 유용. 오류 정정 레벨 자동 설정.", metaDescription: "로고 QR 무료 생성. 중앙 이미지 삽입, 브랜드 QR.", howTo: ["URL/텍스트를 입력합니다.", "로고 이미지를 업로드합니다.", "PNG로 다운로드합니다."], faq: [{ q: "스캔이 잘 되나요?", a: "오류 정정 레벨 H를 사용해 로고 영역(중앙 25%까지)을 가려도 스캔 가능합니다." }], addedAt: "2026-05-14" },
  { slug: "qr-text", component: "QrTextTool", category: "qr", icon: "🆎", navTitle: "텍스트 있는 QR", title: "텍스트 들어간 QR 코드 - 중앙에 글자 삽입", h1: "텍스트 들어간 QR 코드", description: "QR 코드 중앙에 가게 이름·이름·행사명·로고 텍스트 등 글자를 삽입합니다. 색상·배경 모양 자유 설정.", metaDescription: "텍스트 QR 무료 생성. 중앙 글자 삽입, 배경 모양·색상 선택.", howTo: ["QR에 담을 URL/텍스트를 입력합니다.", "중앙에 표시할 글자를 입력합니다.", "글자 크기·색·배경 모양을 조절합니다.", "PNG로 다운로드합니다."], faq: [{ q: "스캔이 잘 되나요?", a: "오류 정정 레벨 H로 생성되어 중앙 영역(약 25%까지)을 글자로 가려도 스캔이 가능합니다. 너무 크게 가리면 인식이 어려울 수 있어요." }, { q: "한글도 되나요?", a: "한글·영어·이모지 모두 가능합니다. 시스템 폰트로 렌더링됩니다." }], addedAt: "2026-05-16" },

  // ===== Batch H - academic / 논문·인용 =====
  { slug: "cite-format", component: "CiteFormatTool", category: "academic", icon: "📑", navTitle: "인용 형식 변환기", title: "인용 형식 변환기 - APA·MLA·Chicago·Harvard·IEEE 5종 동시", h1: "인용 형식 변환기 (APA·MLA·Chicago·Harvard·IEEE)", description: "저자·연도·제목·저널 등을 입력하면 APA 7판, MLA 9판, Chicago, Harvard, IEEE 5가지 형식의 참고문헌 항목을 동시에 생성합니다. 학술지·단행본·웹사이트 지원.", metaDescription: "참고문헌 형식 변환 무료. APA, MLA, Chicago, Harvard, IEEE 5종 동시 생성.", howTo: ["자료 유형(학술지·단행본·웹사이트)을 선택합니다.", "저자·연도·제목 등 정보를 입력합니다.", "5종 형식이 자동 생성되며 원하는 것을 복사합니다."], faq: [{ q: "어떤 형식을 지원하나요?", a: "APA 7판, MLA 9판, Chicago(Notes-Bibliography), Harvard, IEEE 등 가장 널리 쓰이는 5가지를 지원합니다." }, { q: "이탤릭 처리는?", a: "저널명·서명은 별표(*)로 표시되며, 워드/한글에 붙여넣은 뒤 이탤릭으로 변환해주세요." }], addedAt: "2026-05-16" },
  { slug: "doi-lookup", component: "DoiLookupTool", category: "academic", icon: "🔍", navTitle: "DOI·ISBN 자동 조회", title: "DOI / ISBN → 참고문헌 자동 생성", h1: "DOI · ISBN 자동 참고문헌 조회", description: "DOI 또는 ISBN을 입력하면 CrossRef·Open Library API로 메타데이터를 자동 조회해 APA·MLA·Chicago 형식의 참고문헌을 만듭니다.", metaDescription: "DOI ISBN 자동 인용 무료. CrossRef Open Library 메타데이터 조회.", howTo: ["DOI(예: 10.1038/nature12373) 또는 ISBN(예: 9780262033848)을 입력합니다.", "조회 버튼을 누르면 자동으로 메타데이터를 가져옵니다.", "APA·MLA·Chicago 형식 중 복사합니다."], faq: [{ q: "어떤 데이터베이스를 쓰나요?", a: "DOI는 CrossRef(api.crossref.org), ISBN은 Open Library(openlibrary.org)의 공개 API를 직접 호출합니다." }, { q: "한국 학술지도 되나요?", a: "DOI가 CrossRef에 등록되어 있다면 가능합니다. KCI 등재 학술지는 대부분 등록되어 있습니다." }], addedAt: "2026-05-16" },
  { slug: "bibtex-convert", component: "BibtexConvertTool", category: "academic", icon: "📚", navTitle: "BibTeX 변환", title: "BibTeX → APA·MLA·Chicago 변환", h1: "BibTeX 참고문헌 변환기", description: "LaTeX의 BibTeX 항목을 일반 텍스트(APA·MLA·Chicago) 참고문헌으로 변환합니다. 워드/한글 논문 작성 시 유용.", metaDescription: "BibTeX 변환 무료. APA MLA Chicago 텍스트 변환, 여러 항목 한번에.", howTo: ["@article, @book 등 BibTeX 항목을 붙여넣습니다.", "원하는 인용 스타일을 선택합니다.", "변환 결과를 복사해 문서에 붙여넣습니다."], faq: [{ q: "여러 항목을 한 번에?", a: "예. 여러 @entry를 한 번에 붙여넣어도 모두 변환됩니다." }, { q: "지원하는 항목 유형?", a: "@article, @book, @inproceedings, @incollection 등 주요 BibTeX 유형을 지원합니다." }], addedAt: "2026-05-16" },
  { slug: "bib-sort", component: "BibSortTool", category: "academic", icon: "🔤", navTitle: "참고문헌 정렬·중복제거", title: "참고문헌 가나다·알파벳 정렬 + 중복 제거", h1: "참고문헌 정렬 / 중복 제거 / Hanging indent", description: "참고문헌 목록을 가나다·알파벳 순으로 정렬하고 중복 항목을 제거합니다. Hanging indent 미리보기 제공.", metaDescription: "참고문헌 정렬 무료. 가나다 알파벳, 중복 제거, hanging indent.", howTo: ["참고문헌 항목들을 빈 줄로 구분해 붙여넣습니다.", "정렬 순서와 중복 제거 옵션을 선택합니다.", "결과를 복사해 워드/한글에 붙여넣습니다."], faq: [{ q: "한글과 영문 섞여 있어도 되나요?", a: "예. Intl.Collator로 자연 정렬되어 한글은 가나다, 영문은 알파벳 순으로 처리됩니다." }, { q: "Hanging indent란?", a: "참고문헌 목록에서 첫 줄은 그대로 두고 두 번째 줄부터 들여쓰는 방식입니다. APA·MLA 표준." }], addedAt: "2026-05-16" },
  { slug: "title-case", component: "TitleCaseTool", category: "academic", icon: "🅰️", navTitle: "영문 제목 대문자화", title: "영문 제목 Title Case 변환 (APA · Chicago · MLA)", h1: "영문 제목 Title Case 변환", description: "영문 논문·에세이 제목을 APA, Chicago, MLA 규칙에 맞춰 자동으로 대문자화합니다. 짧은 전치사·접속사는 소문자 유지.", metaDescription: "Title Case 변환 무료. APA Chicago MLA 규칙, 영문 논문 제목 대문자화.", howTo: ["영문 제목을 입력합니다.", "APA·Chicago·MLA 등 다양한 결과를 비교합니다.", "원하는 스타일을 복사합니다."], faq: [{ q: "APA와 Chicago 차이는?", a: "APA는 4자 이상 단어를 대문자, Chicago는 모든 주요 단어를 대문자로 처리합니다. 짧은 전치사·접속사·관사는 둘 다 소문자 유지." }], addedAt: "2026-05-16" },
  { slug: "korean-cite", component: "KoreanCiteTool", category: "academic", icon: "🇰🇷", navTitle: "한국 학회지 인용", title: "한국 학회지 인용 양식 - 한국심리학회 · 교육학회 · 사회학회", h1: "한국 학회지 인용 양식 (KPA · KERA · KSS · 국문 인문계)", description: "한국심리학회·교육학회·사회학회·국문 인문계 등 한국 학술 학회별 참고문헌 및 본문 인용 양식을 자동 생성합니다.", metaDescription: "한국 학회 인용 무료. 한국심리학회 KPA 한국교육학회 한국사회학회 양식.", howTo: ["원하는 학회 양식을 선택합니다.", "저자·연도·제목·학술지 등을 입력합니다.", "참고문헌과 본문 내 인용을 함께 복사합니다."], faq: [{ q: "어떤 학회를 지원하나요?", a: "한국심리학회(KPA), 한국교육학회(KERA), 한국사회학회(KSS), 그리고 일반 국문 인문계 표준 양식을 지원합니다." }, { q: "KPA와 APA 차이?", a: "한국심리학회는 APA를 기반으로 한국어로 번안했습니다. 저자 표기 방식과 일부 구두점이 다릅니다." }], addedAt: "2026-05-17" },
  { slug: "text-normalize", component: "TextNormalizeTool", category: "academic", icon: "🧹", navTitle: "표절검사 텍스트 정규화", title: "표절검사 전 텍스트 정규화 - 따옴표 · 공백 · 유니코드", h1: "표절검사 텍스트 정규화", description: "카피킬러·턴잇인 검사 전에 따옴표·공백·줄바꿈·유니코드를 통일합니다. 텍스트 차이로 인한 오탐을 줄여줍니다.", metaDescription: "표절검사 텍스트 정규화 무료. 따옴표 공백 유니코드 통일, 카피킬러 사전 처리.", howTo: ["원본 텍스트를 붙여넣습니다.", "정규화 옵션을 선택합니다.", "결과를 복사해 검사기에 넣습니다."], faq: [{ q: "왜 필요한가요?", a: "“ ” ‘ ’ 같은 둥근 따옴표와 \" ' 곧은 따옴표는 표절검사에서 다른 문자로 인식될 수 있습니다. 정규화 후 검사하면 정확도가 올라갑니다." }, { q: "NFC가 뭔가요?", a: "유니코드 정규화 형식 C. 한글의 조합형('ㄱ'+'ㅏ')을 완성형('가')으로 통일합니다." }], addedAt: "2026-05-17" },
  { slug: "footnote-format", component: "FootnoteFormatTool", category: "academic", icon: "📝", navTitle: "각주 포맷터", title: "각주 / 미주 포맷터 - Chicago · 국문 인문계", h1: "각주 / 미주 형식 변환", description: "Chicago Full Note, Chicago Short Note, 국문 인문계 등 다양한 각주 양식을 자동 생성합니다. ibid. 재인용도 함께 제공.", metaDescription: "각주 미주 포맷 무료. Chicago 국문 인문계 양식, ibid 재인용.", howTo: ["양식과 자료 유형(단행본·학술지·웹)을 선택합니다.", "저자·제목·페이지 등을 입력합니다.", "각주와 재인용 형식을 복사합니다."], faq: [{ q: "ibid. 사용법?", a: "바로 직전 각주와 같은 출처를 가리킬 때 'ibid., 페이지'로 표기합니다. 한국 논문에서는 '위의 책'·'앞의 글'을 씁니다." }], addedAt: "2026-05-17" },

  // ===== Batch H - calc 추가 =====
  { slug: "loan-calc", component: "LoanCalcTool", category: "calc", icon: "🏦", navTitle: "대출 이자 계산기", title: "대출 이자 계산기 - 원리금균등 · 원금균등 · 만기일시", h1: "대출 이자 / 월 상환액 계산기", description: "대출 원금·이자율·기간을 입력해 원리금균등, 원금균등, 만기일시상환 3가지 방식의 월 상환액과 총 이자를 계산합니다.", metaDescription: "대출 이자 계산 무료. 원리금균등 원금균등 만기일시 상환 시뮬레이션.", howTo: ["대출 원금, 연 이자율, 기간(개월)을 입력합니다.", "상환 방식을 선택합니다.", "월 납입금과 총 이자를 확인합니다."], faq: [{ q: "원리금균등 vs 원금균등?", a: "원리금균등은 매월 같은 금액을 갚아 가계 부담이 일정합니다. 원금균등은 첫 달이 가장 많고 점차 줄어들며 총 이자가 더 적습니다." }, { q: "중도상환수수료는?", a: "이 계산기는 단순 시뮬레이션이며 실제 은행 수수료·DSR 규제 등은 별도로 확인하세요." }], addedAt: "2026-05-17" },
  { slug: "savings-calc", component: "SavingsCalcTool", category: "calc", icon: "💰", navTitle: "적금·예금 계산기", title: "적금 / 예금 만기금액 계산 - 이자 · 세금 포함", h1: "적금 · 예금 만기금액 계산기", description: "정기적금·정기예금의 단리/복리 만기금액을 계산합니다. 이자소득세 15.4% 자동 차감, 비과세 옵션 지원.", metaDescription: "적금 예금 계산 무료. 단리 복리 만기금액, 이자과세 비과세 ISA.", howTo: ["적금 또는 예금을 선택합니다.", "월 적립액(예치 원금), 이자율, 기간을 입력합니다.", "세후 만기 수령액을 확인합니다."], faq: [{ q: "적금과 예금 차이?", a: "적금은 매월 일정액 적립, 예금은 처음 한 번에 예치합니다. 이자 계산 방식이 달라 같은 이자율이어도 결과가 다릅니다." }, { q: "이자소득세란?", a: "일반 이자에 부과되는 15.4% 세금(소득세 14% + 지방세 1.4%). 청년도약계좌·ISA 등은 비과세." }], addedAt: "2026-05-17" },
  { slug: "net-salary", component: "NetSalaryTool", category: "calc", icon: "💵", navTitle: "연봉 실수령액", title: "연봉 실수령액 계산기 - 4대보험 · 소득세 자동 공제", h1: "연봉 → 월 실수령액 계산기", description: "연봉에서 국민연금·건강보험·고용보험·소득세·지방소득세를 모두 공제한 월 실수령액을 계산합니다. 부양가족·자녀·비과세 반영.", metaDescription: "연봉 실수령액 무료 계산. 4대보험 소득세 공제, 부양가족 자녀 비과세.", howTo: ["연봉(원)을 입력합니다.", "본인 포함 부양가족 수와 자녀 수를 입력합니다.", "비과세 항목(식대 등)을 입력합니다.", "월 실수령액과 공제 내역을 확인합니다."], faq: [{ q: "왜 회사 명세서와 달라요?", a: "소득세는 회사가 국세청 간이세액표에서 lookup하며, 연말정산 결과에 따라 환급/추가납부가 발생합니다. 이 계산은 누진 근사로 ±5% 정도 오차가 있을 수 있습니다." }, { q: "비과세 한도?", a: "식대 월 20만원, 자가운전보조금 월 20만원, 교통비 등이 비과세입니다." }], addedAt: "2026-05-17" },
  { slug: "gpa", component: "GpaTool", category: "calc", icon: "🎓", navTitle: "GPA 학점 계산기", title: "대학 학점 GPA 계산기 - 4.5 · 4.3 · 4.0 척도 환산", h1: "GPA 학점 계산기 (4.5 · 4.3 · 4.0)", description: "과목명·등급·학점을 입력해 GPA를 계산하고 4.5, 4.3, 4.0, 100점 척도로 환산합니다. P/NP·재수강 등 처리.", metaDescription: "GPA 학점 계산 무료. 4.5 4.3 4.0 척도 환산, 유학 미국 대학원.", howTo: ["학교의 척도(4.5/4.3/4.0)를 선택합니다.", "과목명·등급·학점을 입력합니다.", "GPA와 환산 점수를 확인합니다."], faq: [{ q: "어떤 척도를 써야 하나요?", a: "한국 대학 다수가 4.5점 척도 (서울대·한양대·이대 등), 미국 대학은 4.0점 척도, 연·고대 등은 4.3점이 흔합니다." }, { q: "유학용 환산?", a: "WES·ECE 같은 학점 환산 기관은 한국 GPA를 미국식 4.0으로 변환합니다. 이 계산기는 단순 비례 환산이므로 참고용입니다." }], addedAt: "2026-05-17" },
  { slug: "pyeong", component: "PyeongTool", category: "calc", icon: "🏠", navTitle: "평 ↔ ㎡ 변환", title: "평 ↔ 제곱미터 변환기 - 부동산 평수 환산", h1: "평 ↔ ㎡ 부동산 평수 환산", description: "평을 제곱미터로, 제곱미터를 평으로 정확히 환산합니다. 원룸·30평대 등 자주 쓰는 평수 프리셋과 전용면적 추정 제공.", metaDescription: "평 제곱미터 변환 무료. 부동산 평수 계산, 전용면적 분양면적.", howTo: ["평 또는 ㎡를 입력하면 다른 단위로 자동 변환됩니다.", "자주 쓰는 평수 프리셋을 클릭해 비교합니다."], faq: [{ q: "1평이 정확히 몇 ㎡?", a: "1평 = 400/121 ≈ 3.3058㎡. 일제강점기에 도입된 단위로, 법적으로는 ㎡가 표준입니다." }, { q: "전용면적과 분양면적?", a: "전용면적은 실제 사용 공간, 분양면적은 공용 공간(엘리베이터·계단)을 포함합니다. 한국 아파트 전용률은 보통 70~80%입니다." }], addedAt: "2026-05-17" },
  { slug: "graph-calc", component: "GraphCalcTool", category: "calc", icon: "📈", navTitle: "그래픽 계산기", title: "그래픽 계산기 - 함수 그래프 그리기 (Desmos 스타일)", h1: "그래픽 계산기 (함수 그래프)", description: "y = f(x) 형태의 함수를 입력하면 인터랙티브한 2D 그래프로 그려줍니다. 다중 함수, 마우스 드래그·휠 확대, 좌표 추적 지원.", metaDescription: "그래픽 계산기 무료. 함수 그래프 그리기, 다중 함수, Desmos 대안.", howTo: ["함수식을 y = 뒤에 입력합니다 (예: x^2, sin(x), 2x+1).", "+ 함수 추가로 여러 곡선을 동시에 그립니다.", "마우스 드래그로 이동, 휠로 확대/축소합니다.", "마우스를 올리면 좌표와 함수값이 표시됩니다."], faq: [{ q: "어떤 함수가 가능한가요?", a: "사칙연산, 거듭제곱(^), 삼각함수(sin/cos/tan/asin/acos/atan), log/log10/exp/sqrt/abs, 상수 pi/e를 지원합니다." }, { q: "다항식·지수·로그 모두 되나요?", a: "예. x^3 - 3x, e^(-x^2), log(x), 1/sin(x) 등 거의 모든 1변수 함수가 가능합니다." }, { q: "Desmos와 비교하면?", a: "Desmos만큼 풍부하지는 않지만 기본 함수 그래프, 다중 함수 비교, 좌표 확인은 모두 됩니다. 모두 브라우저에서 처리되어 가입 없이 즉시 사용 가능." }], addedAt: "2026-05-17" },
  { slug: "formula-builder", component: "FormulaBuilderTool", category: "calc", icon: "𝑓", navTitle: "수식 빌더 (버튼식)", title: "수식 빌더 - 버튼 클릭으로 LaTeX 수식 만들기", h1: "수식 빌더 (LaTeX 버튼식 입력)", description: "버튼을 클릭해 분수·근호·적분·시그마·행렬·그리스 문자 등을 조립합니다. 실시간 KaTeX 미리보기와 LaTeX 코드 복사를 함께 제공.", metaDescription: "수식 빌더 무료. 버튼 클릭으로 LaTeX 수식 만들기, 실시간 미리보기, MathML 워드 한글.", howTo: ["버튼을 눌러 분수·근호·적분 등 구조를 삽입합니다.", "빈 칸에 자동으로 커서가 들어가니 바로 숫자·문자를 타이핑합니다.", "그리스 문자·관계 기호 패드에서 ε, ≤, ∞ 등을 추가합니다.", "오른쪽 위 미리보기로 확인 후 코드를 복사합니다."], faq: [{ q: "LaTeX 수식 에디터와 뭐가 달라요?", a: "기존 LaTeX 에디터는 텍스트 직접 입력 위주이고, 이 도구는 계산기처럼 버튼을 눌러 조립하는 방식입니다. LaTeX 문법을 몰라도 됩니다." }, { q: "워드/한글에 어떻게 넣어요?", a: "코드를 복사한 뒤 워드는 수식 도구 > LaTeX 모드, 한글은 수식 편집기에 붙여넣으면 됩니다. 또는 [LaTeX 수식 에디터] 도구에서 이미지로 저장 가능합니다." }, { q: "오프라인에서도 되나요?", a: "예. KaTeX는 100% 브라우저 렌더링이라 인터넷 없이도 작동합니다." }], addedAt: "2026-05-17" },
  { slug: "periodic-table", component: "PeriodicTableTool", category: "calc", icon: "⚛️", navTitle: "주기율표", title: "인터랙티브 주기율표 - 118개 원소 한국어", h1: "주기율표 (118개 원소)", description: "수소부터 오가네손까지 118개 원소를 한국어·영문 이름, 원자량, 전자 배치, 녹는점/끓는점, 전기음성도 등과 함께 표시. 한글·영문·기호·원자번호로 검색 가능.", metaDescription: "주기율표 무료. 118개 원소 한국어, 전자 배치, 전기음성도, 녹는점.", howTo: ["원소 칸을 클릭하면 상세 정보가 표시됩니다.", "검색창에 한글(철)·영문(Iron)·기호(Fe)·원자번호(26) 모두 가능합니다.", "분류 태그 위에 마우스를 올리면 해당 그룹의 원소들이 강조됩니다."], faq: [{ q: "어떤 정보가 있나요?", a: "원자번호, 기호, 한국어·영문 이름, 원자량, 전자 배치, 전기음성도, 녹는점·끓는점(K/°C), 밀도, 분류(알칼리/할로젠 등)." }, { q: "고등학교 화학 공부에 쓸 수 있나요?", a: "네. 한국 교과서 표기 기준이며 모든 원소 정보가 클릭 한 번에 표시됩니다." }, { q: "최신 원소도 있나요?", a: "오가네손(Og, 118번)까지 IUPAC 공식 명명된 모든 원소를 포함합니다." }], addedAt: "2026-05-17" },

  // ===== Batch G - video =====
  { slug: "video-merge", component: "VideoMergeTool", category: "video", icon: "🎞️", navTitle: "동영상 합치기", title: "동영상 합치기 - 여러 클립을 한 동영상으로", h1: "동영상 합치기 (concat)", description: "여러 동영상을 순서대로 이어붙여 한 파일로 만듭니다. ffmpeg.wasm 기반. 동일 코덱 권장.", metaDescription: "동영상 합치기 무료. 여러 클립 연결, ffmpeg.wasm.", howTo: ["동영상 파일들을 업로드합니다.", "순서를 조절하고 합치기 버튼을 누릅니다."], faq: [{ q: "다른 해상도여도 되나요?", a: "같은 해상도·코덱 권장. 다르면 재인코딩이 길어집니다." }], addedAt: "2026-05-14" },
  { slug: "video-mute", component: "VideoMuteTool", category: "video", icon: "🔇", navTitle: "동영상 무음", title: "동영상 무음 만들기 - 오디오 트랙 제거", h1: "동영상 무음 / 오디오 제거", description: "동영상의 소리를 완전히 제거합니다. ffmpeg로 비디오 스트림만 복사해 빠른 처리.", metaDescription: "동영상 무음 무료. 오디오 트랙 제거, 화질 손실 없음.", howTo: ["동영상을 업로드합니다.", "처리 버튼을 누르고 다운로드합니다."], faq: [{ q: "화질이 떨어지나요?", a: "재인코딩 없이 처리하므로 화질 손실이 없습니다." }], addedAt: "2026-05-14" },
  { slug: "video-info", component: "VideoInfoTool", category: "video", icon: "ℹ️", navTitle: "동영상 정보 보기", title: "동영상 정보 보기 - 해상도/길이/용량 확인", h1: "동영상 정보 / 메타데이터", description: "동영상의 해상도·길이·용량·재생시간·프레임수 등 기본 정보를 보여줍니다.", metaDescription: "동영상 정보 무료 보기. 해상도·길이·용량 확인.", howTo: ["동영상을 업로드합니다.", "정보가 자동 표시됩니다."], faq: [{ q: "코덱 정보도 보이나요?", a: "브라우저 비디오 API는 코덱 정보를 제공하지 않습니다. 해상도·길이·용량만 표시됩니다." }], addedAt: "2026-05-14" },

  // ===== Batch G - pdf =====
  { slug: "pdf-blank-page", component: "PdfBlankPageTool", category: "pdf", icon: "📄", navTitle: "PDF 빈 페이지 추가", title: "PDF 빈 페이지 추가 - 원하는 위치에 빈 페이지", h1: "PDF에 빈 페이지 추가", description: "PDF의 원하는 위치에 빈 페이지를 끼워 넣습니다. 양면 인쇄 시 챕터 시작을 오른쪽에 맞추기, 책자 페이지 매수 맞춤, 메모용 빈 공간 추가, 발표 자료 사이 휴식 페이지 삽입 등에 사용합니다.", metaDescription: "PDF 빈 페이지 추가 무료. 위치 선택, 여러 페이지 일괄.", howTo: ["PDF를 업로드합니다.", "삽입 위치와 개수를 선택합니다.", "처리 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "빈 페이지 크기는요?", a: "원본 PDF의 첫 페이지 크기를 따라갑니다 (A4 PDF면 A4, Letter면 Letter)." }, { q: "여러 위치에 한 번에 넣을 수 있나요?", a: "위치마다 따로 작업해야 합니다. 처음 결과물을 다시 업로드해 두 번째 위치를 처리하세요." }, { q: "왜 빈 페이지를 넣나요?", a: "양면 인쇄 시 새 챕터를 오른쪽 면에서 시작하게 맞추거나, 인쇄소 4·8·16배수 매수 규정에 맞추는 데 자주 씁니다." }, { q: "회색·격자 같은 다른 빈 페이지도 만들 수 있나요?", a: "현재 완전 흰색 빈 페이지만 지원합니다. 격자/줄 노트 페이지가 필요하면 이미지로 만든 뒤 [이미지 → PDF]로 변환해 합치세요." }], addedAt: "2026-05-14" },
  { slug: "pdf-metadata", component: "PdfMetadataTool", category: "pdf", icon: "📋", navTitle: "PDF 메타데이터 편집", title: "PDF 메타데이터 편집 - 제목·저자·키워드 변경", h1: "PDF 메타데이터 / 속성 편집", description: "PDF의 제목·저자·주제·키워드·작성자 정보를 보고 수정합니다. 회사 외부로 보낼 자료에서 내부 작성자 정보 제거, 도서관·아카이브용 표준 메타데이터 설정, SEO를 위한 키워드 입력에 유용합니다.", metaDescription: "PDF 메타데이터 무료 편집. 제목·저자·키워드 변경.", howTo: ["PDF를 업로드합니다.", "현재 메타데이터 필드가 자동으로 채워집니다.", "원하는 값으로 수정합니다.", "저장 버튼을 누르고 다운로드합니다."], faq: [{ q: "기존 메타데이터를 보려면?", a: "업로드하면 현재 값이 자동 입력됩니다. 비어 있는 필드는 그대로 두면 됩니다." }, { q: "왜 메타데이터를 바꾸나요?", a: "외부 공유 전 작성자/회사 컴퓨터 이름 같은 흔적을 지우거나, 검색·아카이브 시스템에서 잘 찾히도록 제목·키워드를 명확히 설정하기 위해서입니다." }, { q: "작성 일시·수정 일시도 바꿀 수 있나요?", a: "표준 필드(제목·저자·주제·키워드·작성자) 위주로 편집합니다. 작성 일시 같은 시스템 자동 필드는 도구에 따라 다르게 처리되니 확인 후 사용하세요." }, { q: "내용은 그대로 두고 메타데이터만 바꾸나요?", a: "네. 본문·이미지·서식은 전혀 건드리지 않고 PDF 헤더의 정보만 수정됩니다." }, { q: "비밀번호 걸린 PDF는요?", a: "현재 미지원입니다. 잠금을 풀고 시도해 주세요." }], addedAt: "2026-05-14" },
  { slug: "pdf-crop", component: "PdfCropTool", category: "pdf", icon: "✂️", navTitle: "PDF 페이지 자르기", title: "PDF 페이지 여백 자르기 - 모든 페이지 일괄 크롭", h1: "PDF 페이지 자르기 (crop)", description: "PDF 모든 페이지의 상·하·좌·우 여백을 mm 단위로 잘라냅니다. 스캔본의 검은 가장자리·여백 제거, 책 스캔 시 두 페이지를 한 페이지로 보이게 자르기, 태블릿 화면에 맞게 여백 줄여 가독성 높이기에 유용합니다.", metaDescription: "PDF 여백 자르기 무료. 상하좌우 mm 단위 크롭.", howTo: ["PDF를 업로드합니다.", "상·하·좌·우 각 방향에서 잘라낼 여백(mm)을 입력합니다.", "미리보기로 결과를 확인합니다.", "처리 버튼을 누르고 다운로드합니다."], faq: [{ q: "각 페이지마다 다르게 자를 수 있나요?", a: "현재는 모든 페이지에 동일한 크롭 값이 적용됩니다. 페이지마다 다른 크롭이 필요하다면 [PDF 페이지 추출]로 분리 → 각각 크롭 → [PDF 병합]으로 합치는 방식이 가능합니다." }, { q: "잘라낸 부분이 정말 사라지나요?", a: "PDF의 CropBox 메타데이터가 변경되어 표시 영역이 줄어듭니다. 일부 뷰어에서는 잘린 부분이 다시 보일 수 있어 완전 제거가 필요하면 [PDF → 이미지]로 변환 후 다시 PDF로 만드세요." }, { q: "단위가 mm인 이유?", a: "한국·유럽에서 인쇄 기준으로 가장 흔히 쓰는 단위입니다. 1 inch = 25.4mm로 환산해 입력하면 됩니다." }, { q: "여백을 너무 많이 잘라서 본문이 잘렸어요.", a: "원본은 보존되니 다시 업로드해 값을 줄여서 재시도하세요. 보통 5~15mm가 안전한 범위입니다." }, { q: "비밀번호 걸린 PDF는요?", a: "현재 미지원입니다. 잠금을 풀고 시도해 주세요." }], addedAt: "2026-05-14" },

  // ===== 계산기·생활 =====
  {
    slug: "time-calc",
    component: "TimeCalcTool",
    category: "calc",
    icon: "⏱️",
    navTitle: "시간 계산기",
    title: "시간 계산기 - 시각 ± 시간 / 두 시각 차이",
    h1: "시간 계산기",
    description:
      "시각에 시간을 더하거나 빼고, 두 시각의 차이를 계산합니다. 24시간/12시간 표기 모두 지원.",
    metaDescription:
      "시간 계산기 무료. 시각 ± 시간, 두 시각 차이, 24/12시간.",
    howTo: ["모드를 선택합니다 (덧셈/뺄셈/차이).", "값을 입력하면 즉시 계산됩니다."],
    faq: [{ q: "초 단위까지 되나요?", a: "네. 시:분:초 모두 지원합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "wage-converter",
    component: "WageConverterTool",
    category: "calc",
    icon: "💼",
    navTitle: "시급 ↔ 월급 환산",
    title: "시급 ↔ 월급 ↔ 연봉 환산기 - 한국 근로기준법 기준",
    h1: "시급 / 월급 / 연봉 환산기",
    description:
      "시급·일급·주급·월급·연봉을 서로 환산합니다. 주 40시간(주휴수당 포함 209시간/월) 기준. 한국 최저시급 비교도 표시.",
    metaDescription:
      "시급 월급 환산 무료. 주 40h, 주휴수당 포함, 한국 최저시급 비교.",
    howTo: ["한 칸에 금액을 입력합니다.", "나머지 모든 단위가 자동 환산됩니다.", "주 근로시간을 조절할 수 있습니다."],
    faq: [
      { q: "주휴수당이 뭐예요?", a: "주 15시간 이상 근무하면 받는 유급 휴일 수당입니다. 시급 → 월급 환산 시 209시간 기준에 자동 포함됩니다." },
      { q: "2026년 최저시급은?", a: "도구 안에 최신 한국 최저시급이 표시됩니다 (참고용)." },
    ],
    addedAt: "2026-05-14",
  },
  {
    slug: "due-date",
    component: "DueDateTool",
    category: "calc",
    icon: "🤰",
    navTitle: "출산 예정일",
    title: "출산 예정일 계산기 - 마지막 생리일 또는 수정일 기준",
    h1: "임신 / 출산 예정일 계산기",
    description:
      "마지막 생리 시작일(LMP) 또는 수정일 기준으로 예상 출산일·현재 임신 주수·삼분기를 계산합니다. Naegele 공식 기반.",
    metaDescription:
      "출산 예정일 계산 무료. 마지막 생리일 / 수정일, 임신 주수, 삼분기.",
    howTo: ["기준 모드(마지막 생리일 / 수정일)를 선택합니다.", "날짜를 입력하면 예정일·주수가 계산됩니다."],
    faq: [{ q: "정확한가요?", a: "Naegele 공식 기반 추정치입니다. 정확한 예정일은 산부인과 초음파 검진을 따르세요." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "sci-calc",
    component: "SciCalcTool",
    category: "calc",
    icon: "🧮",
    navTitle: "공학용 계산기",
    title: "공학용 계산기 - sin/cos/log/√ 함수 지원",
    h1: "공학용 계산기",
    description:
      "삼각함수, 로그, 거듭제곱, 제곱근 등 공학·과학 계산을 지원합니다. 식 입력 방식이라 길고 복잡한 계산도 한 번에 가능.",
    metaDescription:
      "공학용 계산기 무료. sin·cos·tan·log·sqrt·pow, 식 입력 방식, 즉시 결과.",
    howTo: ["식을 입력합니다 (예: sin(30) + cos(60)).", "결과가 즉시 표시됩니다.", "괄호로 우선순위를 명확히 합니다."],
    faq: [{ q: "각도 단위가 뭔가요?", a: "도(degree)와 라디안(radian) 모드를 선택할 수 있습니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "percent",
    component: "PercentTool",
    category: "calc",
    icon: "%",
    navTitle: "백분율 계산기",
    title: "백분율 계산기 - 퍼센트 다양한 계산 한 번에",
    h1: "백분율 계산기",
    description:
      "X의 N%, X는 Y의 몇%, X에서 Y까지 변화율, X에 N% 증가/감소를 모두 한 화면에서 계산합니다.",
    metaDescription:
      "백분율 계산기 무료. 퍼센트 다양한 모드, 증감률·변화율.",
    howTo: ["원하는 모드를 선택합니다.", "값을 입력하면 결과가 즉시 표시됩니다."],
    faq: [{ q: "증감률 계산 공식이 뭔가요?", a: "(새값 - 기존값) / 기존값 × 100" }],
    addedAt: "2026-05-14",
  },
  {
    slug: "discount",
    component: "DiscountTool",
    category: "calc",
    icon: "🏷️",
    navTitle: "할인율 계산기",
    title: "할인율 계산기 - 정가/할인가/할인율 즉시 계산",
    h1: "할인율 계산기",
    description:
      "정가에서 할인율 적용해 할인가 계산, 정가와 할인가로 할인율 계산, 할인가 + 할인율로 정가 역산 등 모드 지원.",
    metaDescription:
      "할인율 계산기 무료. 정가↔할인가↔할인율 양방향 계산.",
    howTo: ["모드를 선택합니다.", "두 값을 입력하면 나머지가 계산됩니다."],
    faq: [{ q: "중복 할인은요?", a: "할인 후 결과를 다시 입력하면 됩니다 (예: 30% → 다시 10%)." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "vat",
    component: "VatTool",
    category: "calc",
    icon: "🧾",
    navTitle: "부가세 계산기",
    title: "부가세 계산기 - 공급가액·부가세·합계 자동 계산",
    h1: "부가세(VAT) 계산기",
    description:
      "한국 부가가치세 10% 기준으로 공급가액·부가세·합계를 자동 계산합니다. 부가세 포함 가격에서 공급가액 역산도 지원.",
    metaDescription:
      "부가세 계산기 무료. 10% VAT, 공급가↔부가세↔합계, 역산 지원.",
    howTo: ["모드(공급가 입력 / 합계 입력)를 선택합니다.", "값을 입력하면 나머지가 계산됩니다."],
    faq: [{ q: "면세 사업자도 쓰나요?", a: "면세 사업자에게는 부가세가 없습니다. 일반 과세자(부가세 10%)용입니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "bmi",
    component: "BmiTool",
    category: "calc",
    icon: "⚖️",
    navTitle: "BMI 계산기",
    title: "BMI 체질량지수 계산기 - 비만도 측정",
    h1: "BMI (체질량지수) 계산기",
    description:
      "키와 몸무게로 BMI(체질량지수)를 계산하고 WHO 아시아-태평양 기준으로 저체중·정상·과체중·비만을 판정합니다.",
    metaDescription:
      "BMI 계산기 무료. 키·몸무게 입력, 비만도 즉시 판정, WHO 아시아 기준.",
    howTo: ["키(cm)와 몸무게(kg)를 입력합니다.", "BMI 값과 단계 판정이 즉시 표시됩니다."],
    faq: [{ q: "근육량이 많아도 정확한가요?", a: "BMI는 단순 계산이라 근육·지방 비율을 구분하지 못합니다. 운동선수 등은 따로 체지방률 측정을 권장합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "compound",
    component: "CompoundTool",
    category: "calc",
    icon: "📈",
    navTitle: "복리 계산기",
    title: "복리 계산기 - 예금·적금 만기 금액 계산",
    h1: "복리 / 적금 계산기",
    description:
      "원금·이자율·기간을 넣으면 복리로 불어난 만기 금액을 계산합니다. 일시예금과 매월 적립 두 모드 지원.",
    metaDescription:
      "복리 계산기 무료. 예금·적금 만기 금액, 이자 비교, 즉시 계산.",
    howTo: ["원금(또는 매월 적립), 연이율, 기간을 입력합니다.", "복리 주기(연/월)를 선택합니다.", "만기 금액과 총 이자가 표시됩니다."],
    faq: [{ q: "세금은 포함되나요?", a: "세전 금액입니다. 한국 이자소득세 15.4%는 별도로 차감해 계산하세요." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "world-time",
    component: "WorldTimeTool",
    category: "calc",
    icon: "🌏",
    navTitle: "세계 시간",
    title: "세계 시간 / 시차 - 주요 도시 현재 시각",
    h1: "세계 시간 / 시차",
    description:
      "서울·도쿄·뉴욕·런던·파리·시드니 등 주요 도시의 현재 시간을 한 번에 보세요. 도시 추가·삭제 가능, 실시간 업데이트.",
    metaDescription:
      "세계 시간 무료. 도시별 현재 시각, 시차 계산, 실시간 업데이트.",
    howTo: ["기본 도시들이 표시됩니다.", "+ 버튼으로 도시를 추가합니다.", "X 버튼으로 도시를 제거합니다."],
    faq: [{ q: "서머타임이 적용되나요?", a: "Intl.DateTimeFormat이 자동으로 처리합니다." }],
    addedAt: "2026-05-14",
  },
  {
    slug: "name-picker",
    component: "NamePickerTool",
    category: "calc",
    icon: "🎲",
    navTitle: "이름 랜덤 뽑기",
    title: "이름 랜덤 뽑기 - 제비뽑기 / 추첨 무료",
    h1: "이름 / 항목 랜덤 추첨",
    description:
      "이름이나 항목 목록에서 무작위로 N개를 뽑으세요. 회식 메뉴 정하기, 발표자 선정, 경품 추첨에 편리합니다.",
    metaDescription:
      "이름 랜덤 뽑기 무료. 제비뽑기·추첨, 중복 허용/제외, Web Crypto 안전 난수.",
    howTo: ["이름이나 항목을 한 줄에 하나씩 입력합니다.", "뽑을 개수와 중복 허용 여부를 선택합니다.", "추첨 버튼을 누르면 결과가 나옵니다."],
    faq: [{ q: "얼마나 공정한가요?", a: "Web Crypto의 안전한 난수를 사용해 통계적으로 균등하게 추첨됩니다." }],
    addedAt: "2026-05-14",
  },

  // ===== Batch G - 계산기·생활 (14) =====
  { slug: "caffeine", component: "CaffeineTool", category: "calc", icon: "☕", navTitle: "카페인 섭취 추적", title: "카페인 섭취 계산기 - 일일 권장량 비교", h1: "카페인 섭취 추적기", description: "오늘 마신 커피·차·에너지 음료의 총 카페인을 합산하고 일일 권장량(성인 400mg)과 비교합니다.", metaDescription: "카페인 계산기 무료. 음료별 합산, 권장량 비교.", howTo: ["마신 음료를 추가합니다.", "총 카페인이 자동 표시됩니다."], faq: [{ q: "임산부는 얼마까지?", a: "임산부는 200mg/일 이하 권장 (WHO)." }], addedAt: "2026-05-14" },
  { slug: "zodiac", component: "ZodiacTool", category: "calc", icon: "♓", navTitle: "별자리 찾기", title: "별자리 찾기 - 생일로 별자리 확인 (서양 12궁)", h1: "별자리 찾기", description: "생일을 입력하면 서양 12궁 별자리와 기간, 성격 특징을 알려줍니다.", metaDescription: "별자리 찾기 무료. 서양 12궁, 생일로 확인.", howTo: ["생년월일을 입력합니다.", "결과가 표시됩니다."], faq: [{ q: "음력 생일도 되나요?", a: "별자리는 양력 기준입니다. 음력→양력 변환 도구를 함께 쓰세요." }], addedAt: "2026-05-14" },
  { slug: "chinese-zodiac", component: "ChineseZodiacTool", category: "calc", icon: "🐰", navTitle: "12지 띠 찾기", title: "띠 찾기 - 생년으로 12지 동물 확인", h1: "12지 / 띠 찾기", description: "출생 연도로 12지 띠(쥐·소·호랑이·토끼…)와 천간을 함께 보여줍니다.", metaDescription: "띠 찾기 무료. 12지 동물, 천간/지지, 음력 입춘 기준.", howTo: ["출생 연도를 입력합니다.", "띠와 간지가 표시됩니다."], faq: [{ q: "음력 입춘 전 출생은?", a: "전통적으로 띠는 음력 입춘 기준이라 1~2월 출생은 전 해 띠인 경우가 있습니다." }], addedAt: "2026-05-14" },
  { slug: "alcohol-converter", component: "AlcoholConverterTool", category: "calc", icon: "🍶", navTitle: "알코올 도수 환산", title: "알코올 도수 환산 - 소주 N잔 = 맥주 M잔", h1: "알코올 도수·총량 환산", description: "술 종류별 알코올 함유량을 같은 양으로 환산합니다. 소주·맥주·와인·위스키 등 비교.", metaDescription: "알코올 환산 무료. 소주↔맥주↔와인, 도수·총량 비교.", howTo: ["기준 술과 잔 수를 선택합니다.", "다른 술로 환산된 잔 수가 표시됩니다."], faq: [{ q: "음주운전 가능한가요?", a: "법정 한계 0.03% 이상이면 음주운전입니다. 한 잔도 위험하니 운전 시 절대 금주하세요." }], addedAt: "2026-05-14" },
  { slug: "bmr", component: "BmrTool", category: "calc", icon: "🔥", navTitle: "기초대사량 (BMR)", title: "기초대사량 BMR 계산기 - Mifflin-St Jeor 공식", h1: "기초대사량 (BMR) / TDEE", description: "성별·나이·키·몸무게로 기초대사량(BMR)과 활동량 반영 TDEE를 계산합니다. 다이어트·증량 칼로리 기준값.", metaDescription: "BMR 기초대사량 무료 계산. Mifflin-St Jeor, TDEE 포함.", howTo: ["정보를 입력합니다.", "활동량 레벨을 선택합니다.", "BMR과 TDEE가 표시됩니다."], faq: [{ q: "어떤 공식인가요?", a: "Mifflin-St Jeor (가장 정확하다고 알려진 공식)." }], addedAt: "2026-05-14" },
  { slug: "running-pace", component: "RunningPaceTool", category: "calc", icon: "🏃", navTitle: "러닝 페이스 계산", title: "러닝 페이스 계산기 - km당 분, 5K/10K/마라톤 예측", h1: "러닝 페이스 / 시간 계산", description: "거리·시간·페이스 중 두 개를 입력하면 나머지가 계산됩니다. 5K/10K/하프/풀 마라톤 완주 시간 예측 포함.", metaDescription: "러닝 페이스 무료 계산. km당 분, 5K/10K/마라톤 시간 예측.", howTo: ["거리·시간·페이스 중 두 개를 입력합니다.", "다른 값들이 자동 계산됩니다."], faq: [{ q: "마라톤 시간 예측은 정확한가요?", a: "Riegel 공식 기반으로 5K 페이스로 마라톤 시간을 추정합니다. 실전 페이스는 조금 더 느릴 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "tip-calculator", component: "TipTool", category: "calc", icon: "💵", navTitle: "팁 계산기", title: "팁 계산기 - 식당 팁 비율 + N분의 1 나누기", h1: "팁 계산기 (Tip)", description: "총 금액·팁 비율·인원 수를 입력하면 1인당 부담액을 계산합니다. 미국·유럽 식당용.", metaDescription: "팁 계산기 무료. 비율·인원 N분의 1, 미국·유럽 식당.", howTo: ["총액·팁 비율·인원을 입력합니다.", "1인당 금액이 표시됩니다."], faq: [{ q: "한국에서도 쓰나요?", a: "한국은 보통 팁 문화가 없습니다. 해외여행 때 유용." }], addedAt: "2026-05-14" },
  { slug: "unit-price", component: "UnitPriceTool", category: "calc", icon: "🏪", navTitle: "단가 비교", title: "단가 비교 계산기 - 큰 용량 vs 작은 용량 어느 게 싸나", h1: "단위당 가격 비교", description: "용량 다른 두 상품의 가격을 단위(100ml, 100g 등) 기준으로 비교해 어느 게 싼지 알려줍니다.", metaDescription: "단가 비교 무료. 용량 다른 두 상품 가격 비교.", howTo: ["두 상품의 가격과 용량을 입력합니다.", "어느 게 더 싼지 즉시 표시됩니다."], faq: [{ q: "어떤 단위가 되나요?", a: "ml, L, g, kg, 개수 등 자유롭게 입력 가능합니다." }], addedAt: "2026-05-14" },
  { slug: "dice-coin", component: "DiceCoinTool", category: "calc", icon: "🎲", navTitle: "주사위 / 동전", title: "주사위 / 동전 던지기 - D4/D6/D8/D10/D20 + 동전", h1: "주사위 굴리기 / 동전 던지기", description: "다양한 주사위(D4·D6·D8·D10·D12·D20·D100)와 동전을 굴립니다. 보드게임·TRPG·결정 보조에 사용.", metaDescription: "주사위·동전 무료. D4~D100, Web Crypto 안전 난수.", howTo: ["주사위 종류와 개수를 선택합니다.", "굴리기 버튼을 누릅니다."], faq: [{ q: "어떻게 공정한가요?", a: "Web Crypto의 안전한 난수를 사용합니다." }], addedAt: "2026-05-14" },
  { slug: "rps", component: "RpsTool", category: "calc", icon: "✊", navTitle: "가위바위보", title: "가위바위보 봇 - 컴퓨터와 즉시 한 판", h1: "가위바위보 (Rock Paper Scissors)", description: "컴퓨터와 가위바위보 한 판. 승률 통계도 함께 표시됩니다.", metaDescription: "가위바위보 무료. 컴퓨터와 한 판, 승률 통계.", howTo: ["가위·바위·보 중 하나를 선택합니다.", "결과가 즉시 표시됩니다."], faq: [{ q: "컴퓨터가 치팅하나요?", a: "공정한 랜덤입니다. 사용자 패턴을 학습하지 않습니다." }], addedAt: "2026-05-14" },
  { slug: "korea-holidays", component: "KoreaHolidaysTool", category: "calc", icon: "🎌", navTitle: "한국 공휴일", title: "한국 공휴일 - 올해 / 내년 공휴일 모음", h1: "한국 공휴일 캘린더", description: "현재 연도와 다음 연도의 한국 법정 공휴일을 한 번에 보여줍니다. 음력 명절·대체공휴일 포함.", metaDescription: "한국 공휴일 무료. 올해·내년, 음력 명절·대체공휴일.", howTo: ["연도를 선택합니다.", "공휴일 목록이 표시됩니다."], faq: [{ q: "임시공휴일은요?", a: "정부가 임시 지정한 공휴일은 발표 시기에 따라 갱신됩니다." }], addedAt: "2026-05-14" },
  { slug: "lunch-picker", component: "LunchPickerTool", category: "calc", icon: "🍱", navTitle: "점심 메뉴 추천", title: "점심 메뉴 룰렛 - 뭐 먹지 결정 도와줌", h1: "점심 메뉴 추천 룰렛", description: "메뉴를 못 정할 때 룰렛으로 결정. 한식·중식·일식·양식 카테고리 미리 입력, 직접 추가도 가능.", metaDescription: "점심 메뉴 룰렛 무료. 한식·중식·일식·양식, 직접 추가.", howTo: ["카테고리를 선택하거나 직접 메뉴를 추가합니다.", "룰렛을 돌립니다."], faq: [{ q: "결과 그대로 따라야 하나요?", a: "재미로만 쓰세요. 동료들과 합의하시고요." }], addedAt: "2026-05-14" },
  { slug: "baseball-stats", component: "BaseballStatsTool", category: "calc", icon: "⚾", navTitle: "야구 ERA/타율", title: "야구 ERA·타율·OPS 계산기", h1: "야구 통계 계산기 (ERA / AVG / OPS)", description: "투수 ERA, 타자 타율·출루율·장타율·OPS를 즉시 계산합니다. 사회인 야구·중계 시청 보조용.", metaDescription: "야구 ERA·타율·OPS 무료 계산. KBO·MLB.", howTo: ["계산하고 싶은 항목을 선택합니다.", "값을 입력합니다."], faq: [{ q: "OPS가 뭐예요?", a: "출루율(OBP) + 장타율(SLG). 타자 전반적 능력 지표." }], addedAt: "2026-05-14" },
  { slug: "book-reading-time", component: "BookReadingTimeTool", category: "calc", icon: "📚", navTitle: "책 읽기 시간", title: "책 읽는 시간 계산기 - 페이지수 → 완독 시간", h1: "책 완독 시간 예측", description: "총 페이지 수와 분당 읽는 속도로 책 완독에 걸리는 시간을 추정합니다. 평균 한국어 독서 속도 적용.", metaDescription: "책 읽기 시간 무료 추정. 페이지수·속도, 완독 시간.", howTo: ["총 페이지를 입력합니다.", "독서 속도를 조절합니다."], faq: [{ q: "기본 속도는?", a: "한국어 평균 분당 250~350자 (페이지당 약 2~3분)." }], addedAt: "2026-05-14" },

  // ===== Batch H (50 tools) =====
  { slug: "image-invert", component: "ImageInvertTool", category: "image", icon: "◐", navTitle: "이미지 색반전", title: "이미지 색반전 (네거티브) - 음화 효과 무료", h1: "이미지 색 반전 / 네거티브", description: "이미지 색상을 반전해 음화(네거티브) 효과를 만들어요.", metaDescription: "이미지 색반전 무료. 네거티브 효과, 즉시 변환.", howTo: ["이미지를 업로드합니다.", "결과를 다운로드합니다."], faq: [{ q: "투명도는?", a: "투명도는 유지되고 색만 반전됩니다." }], addedAt: "2026-05-15" },
  { slug: "image-watermark-img", component: "ImageWatermarkImgTool", category: "image", icon: "🏷️", navTitle: "이미지 워터마크", title: "이미지 워터마크 - 로고/이미지 워터마크 삽입", h1: "이미지 워터마크 (이미지로)", description: "사진에 로고나 이미지를 워터마크로 얹습니다. 위치·투명도·크기 조절.", metaDescription: "이미지 워터마크 무료. 로고 삽입.", howTo: ["배경 이미지를 업로드합니다.", "워터마크 이미지를 업로드합니다."], faq: [{ q: "위치 자유?", a: "9개 위치 선택 + 미세 조정 가능." }], addedAt: "2026-05-15" },
  { slug: "image-color-transparent", component: "ImageColorTransparentTool", category: "image", icon: "🟦", navTitle: "특정 색 → 투명", title: "이미지 특정 색을 투명으로 - 배경 색 제거", h1: "이미지 색상 → 투명", description: "이미지에서 특정 색(보통 흰색 배경)을 투명으로 만들어요.", metaDescription: "이미지 배경색 투명 무료.", howTo: ["이미지를 업로드합니다.", "색상과 허용 범위를 선택합니다."], faq: [{ q: "복잡한 배경도?", a: "단색 배경에만 효과적입니다." }], addedAt: "2026-05-15" },
  { slug: "image-channels", component: "ImageChannelsTool", category: "image", icon: "🎚️", navTitle: "RGB 채널 분리", title: "이미지 RGB 채널 분리 - 빨강/녹색/파랑 보기", h1: "이미지 RGB 채널 분리", description: "이미지의 빨강·녹색·파랑 채널을 각각 분리해 그레이스케일 이미지로 보여줍니다.", metaDescription: "이미지 RGB 채널 분리 무료.", howTo: ["이미지를 업로드합니다.", "각 채널이 자동 표시됩니다."], faq: [{ q: "왜?", a: "이미지 분석·합성에 사용." }], addedAt: "2026-05-15" },
  { slug: "image-free-rotate", component: "ImageFreeRotateTool", category: "image", icon: "↻", navTitle: "이미지 임의 각도", title: "이미지 임의 각도 회전 - 1° 단위 정밀 회전", h1: "이미지 1° 단위 회전", description: "이미지를 1° 단위로 자유롭게 회전합니다. 비뚤어진 사진 보정에 사용.", metaDescription: "이미지 임의 각도 회전 무료.", howTo: ["이미지를 업로드합니다.", "각도를 조절합니다."], faq: [{ q: "여백은?", a: "투명 또는 선택한 색으로 채워집니다." }], addedAt: "2026-05-15" },
  { slug: "html-to-text", component: "HtmlToTextTool", category: "text", icon: "📰", navTitle: "HTML → 텍스트", title: "HTML 태그 제거 - 본문 텍스트만 추출", h1: "HTML → 일반 텍스트", description: "HTML 코드에서 모든 태그를 제거하고 본문 텍스트만 추출합니다.", metaDescription: "HTML 태그 제거 무료.", howTo: ["HTML을 붙여넣습니다."], faq: [{ q: "스크립트?", a: "<script>는 본문에 포함되지 않습니다." }], addedAt: "2026-05-15" },
  { slug: "html-to-markdown", component: "HtmlToMarkdownTool", category: "text", icon: "↻", navTitle: "HTML → 마크다운", title: "HTML 마크다운 변환 - turndown 기반", h1: "HTML → 마크다운 변환", description: "HTML을 마크다운으로 변환합니다. 블로그 마이그레이션·위키 변환에 유용.", metaDescription: "HTML 마크다운 변환 무료. turndown 기반.", howTo: ["HTML을 붙여넣습니다."], faq: [{ q: "표도?", a: "GFM 확장으로 표가 변환됩니다." }], addedAt: "2026-05-15" },
  { slug: "markdown-to-text", component: "MarkdownToTextTool", category: "text", icon: "📜", navTitle: "마크다운 → 텍스트", title: "마크다운 문법 제거 - 일반 텍스트만", h1: "마크다운 → 일반 텍스트", description: "마크다운 문법을 제거하고 텍스트만 남깁니다.", metaDescription: "마크다운 텍스트 변환 무료.", howTo: ["마크다운을 붙여넣습니다."], faq: [{ q: "링크?", a: "[텍스트](url) → 텍스트로 변환." }], addedAt: "2026-05-15" },
  { slug: "text-compress", component: "TextCompressTool", category: "text", icon: "🗜️", navTitle: "텍스트 압축", title: "텍스트 LZ 압축 - URL용 짧은 문자열", h1: "텍스트 LZ 압축 / 해제", description: "긴 텍스트를 LZ-string으로 압축해 짧은 문자열로 변환.", metaDescription: "텍스트 압축 무료. LZ-string.", howTo: ["텍스트를 입력하고 압축합니다."], faq: [{ q: "압축률?", a: "JSON 등 반복이 많으면 70%+." }], addedAt: "2026-05-15" },
  { slug: "text-blockquote", component: "TextBlockquoteTool", category: "text", icon: "❝", navTitle: "인용구 만들기", title: "인용구 / 블록쿼트 변환", h1: "인용구 / 블록쿼트 만들기", description: "텍스트 앞에 '>'를 붙여 마크다운 블록쿼트나 이메일 인용 형식으로.", metaDescription: "블록쿼트 인용구 무료 변환.", howTo: ["텍스트를 입력합니다.", "깊이를 선택합니다."], faq: [{ q: "중첩은?", a: "깊이 2 이상이면 '>>'." }], addedAt: "2026-05-15" },
  { slug: "data-size", component: "DataSizeTool", category: "dev", icon: "💾", navTitle: "데이터 단위 변환", title: "데이터 단위 변환 - B/KB/MB/GB/TB", h1: "데이터 크기 변환", description: "바이트·킬로바이트·메가·기가·테라·페타 사이를 변환. SI(1000) vs IEC(1024) 모두 지원.", metaDescription: "데이터 단위 변환 무료.", howTo: ["값과 단위를 입력합니다."], faq: [{ q: "KB vs KiB?", a: "KB=1000B, KiB=1024B." }], addedAt: "2026-05-15" },
  { slug: "mime-types", component: "MimeTypesTool", category: "dev", icon: "📁", navTitle: "MIME 타입 사전", title: "MIME 타입 사전 - 파일 확장자 ↔ Content-Type", h1: "MIME 타입 사전", description: "확장자나 MIME 타입을 양방향 검색합니다.", metaDescription: "MIME 타입 사전 무료.", howTo: ["검색합니다."], faq: [{ q: "얼마나?", a: "주요 100+ 확장자." }], addedAt: "2026-05-15" },
  { slug: "css-colors", component: "CssColorsTool", category: "dev", icon: "🎨", navTitle: "CSS 색상 사전", title: "CSS named colors 사전 - 148개 색상", h1: "CSS 색상 이름 사전", description: "CSS에서 쓰는 148개 색상 이름을 HEX와 함께 보여줍니다.", metaDescription: "CSS 색상 사전 무료.", howTo: ["검색하거나 클릭해 복사."], faq: [{ q: "표준?", a: "CSS Color Module Level 4." }], addedAt: "2026-05-15" },
  { slug: "http-methods", component: "HttpMethodsTool", category: "dev", icon: "🔁", navTitle: "HTTP 메소드 사전", title: "HTTP 메소드 사전 - GET/POST/PUT/DELETE", h1: "HTTP 메소드 사전", description: "HTTP 메소드 의미·사용법·멱등성 정리.", metaDescription: "HTTP 메소드 사전 무료.", howTo: ["메소드를 클릭."], faq: [{ q: "멱등성?", a: "여러 번 실행해도 같은 결과." }], addedAt: "2026-05-15" },
  { slug: "env-parser", component: "EnvParserTool", category: "dev", icon: "🔐", navTitle: ".env 파서", title: ".env 파일 파서 - KEY=VALUE → JSON", h1: ".env 파일 파서", description: "환경 변수 파일을 JSON 객체로 변환.", metaDescription: ".env 파서 무료.", howTo: [".env 내용을 붙여넣습니다."], faq: [{ q: "인용은?", a: "쌍·홑따옴표 모두 처리." }], addedAt: "2026-05-15" },
  { slug: "jamo-decompose", component: "JamoDecomposeTool", category: "dev", icon: "ㄱ", navTitle: "한글 자모 분해", title: "한글 자모 분해/결합", h1: "한글 자모 분해 / 결합", description: "한글 음절을 초성·중성·종성으로 분해 또는 결합.", metaDescription: "한글 자모 분해 무료.", howTo: ["글자를 입력합니다."], faq: [{ q: "겹받침?", a: "ㄳ, ㄵ 등 분해/결합 지원." }], addedAt: "2026-05-15" },
  { slug: "duration-format", component: "DurationFormatTool", category: "dev", icon: "⏳", navTitle: "초 → 시간 형식", title: "초 ↔ 시:분:초 변환", h1: "초 ↔ 시간 형식 변환", description: "초 단위 숫자를 사람이 읽기 좋은 형식으로 변환.", metaDescription: "초 시간 변환 무료.", howTo: ["값을 입력합니다."], faq: [{ q: "ISO 8601?", a: "PT1H30M도 지원." }], addedAt: "2026-05-15" },
  { slug: "bcrypt-hash", component: "BcryptHashTool", category: "dev", icon: "🔒", navTitle: "bcrypt 해시", title: "bcrypt 해시 생성기", h1: "bcrypt 해시 / 검증", description: "bcrypt 해시 생성·검증. cost factor 조절.", metaDescription: "bcrypt 해시 무료.", howTo: ["비밀번호를 입력합니다."], faq: [{ q: "운영용?", a: "테스트용입니다." }], addedAt: "2026-05-15" },
  { slug: "rot-all", component: "RotAllTool", category: "dev", icon: "🔠", navTitle: "ROT 전체 보기", title: "ROT 1~25 한 번에 보기", h1: "ROT 전체 변환 (1~25)", description: "ROT1~25 모두 적용한 결과를 한 번에 표시. 시저 암호 해독.", metaDescription: "ROT 전체 변환 무료.", howTo: ["텍스트를 입력합니다."], faq: [{ q: "ROT13?", a: "가장 흔히 쓰는 회전." }], addedAt: "2026-05-15" },
  { slug: "card-mask", component: "CardMaskTool", category: "dev", icon: "💳", navTitle: "민감정보 마스킹", title: "민감정보 마스킹 - 카드/주민번호/전화", h1: "민감정보 자동 마스킹", description: "카드번호·주민번호·전화번호·이메일을 자동 감지해 별표 처리.", metaDescription: "민감정보 마스킹 무료.", howTo: ["텍스트를 입력합니다."], faq: [{ q: "어떤 패턴?", a: "한국 카드/RRN/전화/이메일." }], addedAt: "2026-05-15" },
  { slug: "pdf-images-extract", component: "PdfImagesExtractTool", category: "pdf", icon: "🖼️", navTitle: "PDF 이미지 추출", title: "PDF 페이지를 이미지로 일괄 추출", h1: "PDF에서 이미지 추출", description: "PDF 각 페이지를 고해상도 PNG로 렌더링해 ZIP 묶음으로 저장.", metaDescription: "PDF 이미지 추출 무료.", howTo: ["PDF를 업로드합니다."], faq: [{ q: "원본 이미지 추출?", a: "현재는 페이지 렌더 방식." }], addedAt: "2026-05-15" },
  { slug: "pdf-n-up", component: "PdfNUpTool", category: "pdf", icon: "🧱", navTitle: "PDF N-up", title: "PDF N-up - 한 페이지에 여러 페이지 모으기 (2up · 4up)", h1: "PDF N-up (한 페이지에 여러 페이지 배치)", description: "여러 페이지를 한 장에 2x2·2x1로 모아 인쇄용 책자나 요약본을 만듭니다. 종이 절약, 강의 자료를 한 장에 4페이지 인쇄, 발표 슬라이드 핸드아웃 만들기에 자주 쓰입니다.", metaDescription: "PDF N-up 무료 변환. 2up·4up·8up 한 장에 여러 페이지, 인쇄 절약.", howTo: ["PDF를 업로드합니다.", "한 페이지에 모을 페이지 수(2·4·6·8 등)를 선택합니다.", "배치 방향(가로/세로)을 고릅니다.", "처리 후 다운로드합니다."], faq: [{ q: "여백은 어떻게 되나요?", a: "기본 여백이 적용되어 인쇄해도 가장자리에 잘림이 없도록 안전 영역을 둡니다." }, { q: "글자가 작아져서 잘 안 보이지 않나요?", a: "2up은 절반 크기, 4up은 1/4 크기가 됩니다. 본문 글자가 12pt 이상인 PDF는 4up까지 무난하고, 더 작은 글자는 2up을 권장합니다." }, { q: "양면 인쇄 책자(booklet)도 됩니까?", a: "본 도구는 단순 N-up 배치입니다. 책자 인쇄(중철 페이지 순서 자동 정렬)는 별도 책자 인쇄 도구나 프린터 드라이버의 옵션을 사용하세요." }, { q: "PPT/Keynote 슬라이드 핸드아웃에 좋나요?", a: "네. 슬라이드를 PDF로 출력 후 이 도구로 4up·6up·9up 핸드아웃을 만들 수 있어 인쇄·배포용으로 좋습니다." }], addedAt: "2026-05-15" },
  { slug: "pdf-page-size", component: "PdfPageSizeTool", category: "pdf", icon: "📐", navTitle: "PDF 페이지 크기", title: "PDF 페이지 크기 변경 - A4 · Letter · Legal · B5 변환", h1: "PDF 페이지 크기 변경 (A4·Letter·Legal·B5)", description: "모든 페이지를 A4·Letter·Legal·B5 등 표준 용지로 변경합니다. 미국 Letter 사이즈로 받은 PDF를 한국 A4로, 책자용 B5 크기로 변환할 때 유용합니다. 비율 유지 옵션으로 본문 잘림 없이 변환됩니다.", metaDescription: "PDF 페이지 크기 변경 무료. A4 Letter Legal B5 변환, 비율 유지.", howTo: ["PDF를 업로드합니다.", "원하는 용지 크기를 선택합니다 (A4/Letter/Legal/B5).", "변환 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "본문이 잘리나요?", a: "기본은 비율 유지(fit) 모드라 본문이 잘리지 않습니다. 새 용지보다 페이지가 크면 축소되어 들어가고, 작으면 여백이 추가됩니다." }, { q: "Letter와 A4 차이?", a: "Letter는 미국 표준(216×279mm), A4는 한국·유럽 표준(210×297mm)입니다. Letter는 약간 더 넓고 짧습니다." }, { q: "이미 인쇄된 PDF에서 크기만 바꾸면 잘 나오나요?", a: "축소는 보통 깔끔합니다. 확대는 화질이 떨어질 수 있으니 가능하면 원본에서 다시 출력하세요." }, { q: "페이지마다 다른 크기로 만들 수 있나요?", a: "현재는 모든 페이지가 같은 크기로 일괄 변경됩니다. 페이지별로 다르게 하려면 분리/변환/병합 단계를 따로 진행해야 합니다." }, { q: "B5나 A5도 됩니까?", a: "표준 ISO 용지(A·B 시리즈) 일부와 US Letter/Legal을 지원합니다. 더 특수한 크기는 [PDF 페이지 자르기]나 별도 도구를 이용해야 할 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "video-resize", component: "VideoResizeTool", category: "video", icon: "📐", navTitle: "동영상 리사이즈", title: "동영상 해상도 변경 - 720p/1080p/4K", h1: "동영상 해상도 변경", description: "동영상을 720p/1080p/4K로 변환.", metaDescription: "동영상 해상도 변경 무료.", howTo: ["해상도를 선택합니다."], faq: [{ q: "비율?", a: "기본 유지." }], addedAt: "2026-05-15" },
  { slug: "audio-merge", component: "AudioMergeTool", category: "video", icon: "🎵", navTitle: "오디오 합치기", title: "오디오 파일 합치기", h1: "오디오 합치기", description: "여러 MP3를 순서대로 합쳐 하나로.", metaDescription: "오디오 합치기 무료.", howTo: ["파일을 업로드합니다."], faq: [{ q: "다른 포맷?", a: "같은 포맷 권장." }], addedAt: "2026-05-15" },
  { slug: "audio-volume", component: "AudioVolumeTool", category: "video", icon: "🔉", navTitle: "오디오 볼륨", title: "오디오 볼륨 조절 - dB 단위", h1: "오디오 볼륨 조절", description: "음원을 dB 단위로 키우거나 줄입니다.", metaDescription: "오디오 볼륨 무료.", howTo: ["dB 값을 선택합니다."], faq: [{ q: "왜곡?", a: "+6dB 이상은 클리핑 가능." }], addedAt: "2026-05-15" },
  { slug: "exchange-rate", component: "ExchangeRateTool", category: "calc", icon: "💱", navTitle: "환율 계산기", title: "환율 계산기 - 사용자 입력 환율", h1: "환율 / 통화 환산", description: "환율을 직접 입력하고 여러 통화로 환산. 라이브 환율은 외부 사이트 확인.", metaDescription: "환율 계산기 무료.", howTo: ["환율을 입력합니다."], faq: [{ q: "실시간?", a: "외부 API 없음 → 사용자 입력." }], addedAt: "2026-05-15" },
  { slug: "statistics", component: "StatisticsTool", category: "calc", icon: "📊", navTitle: "통계 계산", title: "통계 계산기 - 평균/중앙값/표준편차", h1: "기초 통계 계산기", description: "평균·중앙값·최빈값·표준편차·분산·사분위.", metaDescription: "통계 계산기 무료.", howTo: ["숫자들을 입력합니다."], faq: [{ q: "표본 vs 모집단?", a: "둘 다 표시." }], addedAt: "2026-05-15" },
  { slug: "car-fuel", component: "CarFuelTool", category: "calc", icon: "⛽", navTitle: "자동차 연비", title: "자동차 연비 계산 - 주유 비용", h1: "자동차 연비 / 주유비 계산", description: "연비·기름값·거리로 비용 계산.", metaDescription: "자동차 연비 무료 계산.", howTo: ["연비와 가격을 입력합니다."], faq: [{ q: "전기차?", a: "현재 휘발유·경유 기준." }], addedAt: "2026-05-15" },
  { slug: "rent-calc", component: "RentCalcTool", category: "calc", icon: "🏠", navTitle: "전세 ↔ 월세", title: "전세 ↔ 월세 환산", h1: "전세 ↔ 월세 환산", description: "전월세 전환율 기반 환산.", metaDescription: "전월세 환산 무료.", howTo: ["전세금이나 월세를 입력합니다."], faq: [{ q: "전환율?", a: "한국 평균 3~6%/년." }], addedAt: "2026-05-15" },
  { slug: "sleep-recommend", component: "SleepRecommendTool", category: "calc", icon: "😴", navTitle: "잠 시간 추천", title: "수면 시간 추천 - 90분 사이클", h1: "수면 사이클 / 기상 시간", description: "90분 사이클 기반 최적 기상/취침 시간.", metaDescription: "수면 시간 추천 무료.", howTo: ["시간을 입력합니다."], faq: [{ q: "왜 90분?", a: "한 수면 사이클." }], addedAt: "2026-05-15" },
  { slug: "blood-donation", component: "BloodDonationTool", category: "calc", icon: "🩸", navTitle: "헌혈 가능일", title: "헌혈 다음 가능일 - 전혈/혈장/혈소판", h1: "헌혈 다음 가능일", description: "한국 적십자사 기준 헌혈 간격 계산.", metaDescription: "헌혈 가능일 무료 계산.", howTo: ["마지막 날짜를 입력합니다."], faq: [{ q: "기준?", a: "전혈 8주, 혈장 2주." }], addedAt: "2026-05-15" },
  { slug: "installment", component: "InstallmentTool", category: "calc", icon: "💳", navTitle: "할부 계산", title: "할부 계산기 - 월 부담액", h1: "신용카드 할부 계산", description: "원금·이자율·기간으로 월 부담 계산.", metaDescription: "할부 계산기 무료.", howTo: ["원금·이자율·기간을 입력합니다."], faq: [{ q: "수수료?", a: "이자율로 대체 입력." }], addedAt: "2026-05-15" },
  { slug: "korean-phone", component: "KoreanPhoneTool", category: "calc", icon: "📞", navTitle: "전화번호 정규화", title: "한국 전화번호 형식 변환", h1: "한국 전화번호 형식 변환", description: "010-XXXX-XXXX 형식으로 정규화.", metaDescription: "한국 전화번호 정규화 무료.", howTo: ["전화번호를 입력합니다."], faq: [{ q: "+82?", a: "국제 형식도 지원." }], addedAt: "2026-05-15" },
  { slug: "korean-biz-num", component: "KoreanBizNumTool", category: "calc", icon: "🏢", navTitle: "사업자등록번호 검증", title: "사업자등록번호 검증 - 체크섬 확인", h1: "사업자등록번호 검증", description: "10자리 사업자등록번호 체크섬 검증.", metaDescription: "사업자등록번호 검증 무료.", howTo: ["번호를 입력합니다."], faq: [{ q: "실존 검증?", a: "형식만 검증." }], addedAt: "2026-05-15" },
  { slug: "korean-rrn", component: "KoreanRrnTool", category: "calc", icon: "🆔", navTitle: "주민번호 검증", title: "주민등록번호 형식 검증", h1: "주민등록번호 형식 검증", description: "주민번호 체크섬·생년월일·성별 추출. 브라우저 내 처리.", metaDescription: "주민번호 검증 무료.", howTo: ["13자리 입력."], faq: [{ q: "안전?", a: "브라우저 안에서만 처리, 전송 없음." }], addedAt: "2026-05-15" },
  { slug: "family-kinship", component: "FamilyKinshipTool", category: "calc", icon: "👨‍👩‍👧", navTitle: "촌수 계산", title: "촌수 계산 - 가족 호칭 찾기", h1: "촌수 / 가족 호칭", description: "친가·외가 관계 입력하면 한국식 호칭 표시.", metaDescription: "촌수 계산 무료.", howTo: ["관계 단계를 선택합니다."], faq: [{ q: "사돈?", a: "직계·방계만 지원." }], addedAt: "2026-05-15" },
  { slug: "number-format", component: "NumberFormatTool", category: "calc", icon: "🔢", navTitle: "숫자 형식 변환", title: "숫자 형식 변환 - 콤마/한국식 단위", h1: "숫자 자릿수 포맷", description: "콤마·언더스코어·100만 등 다양한 형식.", metaDescription: "숫자 형식 변환 무료.", howTo: ["숫자를 입력합니다."], faq: [{ q: "큰 숫자?", a: "BigInt로 무제한." }], addedAt: "2026-05-15" },
  { slug: "stars", component: "StarsTool", category: "calc", icon: "⭐", navTitle: "별점 시각화", title: "별점 시각화 - 4.5/5 → ★★★★½", h1: "별점 / 평점 시각화", description: "점수를 별 모양으로 시각화. 반쪽 별 지원.", metaDescription: "별점 시각화 무료.", howTo: ["점수와 만점을 입력."], faq: [{ q: "이모지?", a: "유니코드 별." }], addedAt: "2026-05-15" },
  { slug: "golf-handicap", component: "GolfHandicapTool", category: "calc", icon: "⛳", navTitle: "골프 핸디캡", title: "골프 핸디캡 - USGA 방식", h1: "골프 핸디캡 계산", description: "최근 스코어로 USGA 방식 핸디캡 추정.", metaDescription: "골프 핸디캡 무료.", howTo: ["스코어를 입력합니다."], faq: [{ q: "정확?", a: "공식 핸디캡은 협회 등록 필요." }], addedAt: "2026-05-15" },
  { slug: "text-similarity", component: "TextSimilarityTool", category: "dev", icon: "≈", navTitle: "텍스트 유사도", title: "텍스트 유사도 - Levenshtein", h1: "텍스트 유사도 (Levenshtein)", description: "두 문자열의 편집 거리·유사도.", metaDescription: "텍스트 유사도 무료.", howTo: ["두 텍스트를 입력합니다."], faq: [{ q: "긴 문서?", a: "수천 글자까지 빠름." }], addedAt: "2026-05-15" },
  { slug: "font-preview", component: "FontPreviewTool", category: "dev", icon: "🔤", navTitle: "폰트 미리보기", title: "폰트 미리보기 - 시스템·웹 폰트", h1: "웹 폰트 미리보기", description: "폰트로 텍스트가 어떻게 보이는지 미리보기.", metaDescription: "폰트 미리보기 무료.", howTo: ["폰트 이름과 텍스트를 입력."], faq: [{ q: "구글 폰트?", a: "URL 추가 가능." }], addedAt: "2026-05-15" },
  { slug: "word-cloud", component: "WordCloudTool", category: "text", icon: "☁️", navTitle: "워드 클라우드", title: "워드 클라우드 생성", h1: "워드 클라우드 생성", description: "자주 등장하는 단어를 크기로 시각화.", metaDescription: "워드 클라우드 무료.", howTo: ["텍스트를 입력합니다."], faq: [{ q: "한글?", a: "불용어 제거 옵션." }], addedAt: "2026-05-15" },
  { slug: "random-string", component: "RandomStringTool", category: "dev", icon: "🎲", navTitle: "랜덤 문자열", title: "랜덤 문자열 생성기 - 토큰/ID/API 키", h1: "랜덤 문자열 / 토큰 생성", description: "Web Crypto 기반 안전 난수 문자열.", metaDescription: "랜덤 문자열 무료.", howTo: ["길이·문자셋을 선택합니다."], faq: [{ q: "비번?", a: "비번은 별도 도구." }], addedAt: "2026-05-15" },
  { slug: "emoji-search", component: "EmojiSearchTool", category: "text", icon: "😀", navTitle: "이모지 검색", title: "이모지 검색 - 한글·영문 키워드", h1: "이모지 검색", description: "키워드로 이모지 검색·복사.", metaDescription: "이모지 검색 무료.", howTo: ["검색어를 입력합니다."], faq: [{ q: "최신?", a: "Unicode 15 이상." }], addedAt: "2026-05-15" },
  { slug: "user-agent", component: "UserAgentTool", category: "dev", icon: "🌐", navTitle: "User-Agent 분석", title: "User-Agent 분석 - 브라우저·OS·기기", h1: "User-Agent 파서", description: "UA 문자열에서 브라우저·OS·기기 추출.", metaDescription: "User-Agent 파서 무료.", howTo: ["UA를 붙여넣거나 자기 UA를 봅니다."], faq: [{ q: "UA?", a: "브라우저 자기 소개 문자열." }], addedAt: "2026-05-15" },
  { slug: "password-comparator", component: "PasswordComparatorTool", category: "dev", icon: "⚖️", navTitle: "비밀번호 비교", title: "비밀번호 강도 비교 - 두 비밀번호 동시", h1: "비밀번호 강도 비교", description: "두 비밀번호 강도 비교.", metaDescription: "비밀번호 비교 무료.", howTo: ["두 비번을 입력합니다."], faq: [{ q: "어떻게?", a: "엔트로피·패턴 종합." }], addedAt: "2026-05-15" },
  { slug: "number-to-english", component: "NumberToEnglishTool", category: "text", icon: "🔤", navTitle: "숫자 → 영어", title: "숫자 영어 변환 - twelve thousand", h1: "숫자 → 영어 변환", description: "숫자를 영어 단어로. 영문 수표·계약서.", metaDescription: "숫자 영어 변환 무료.", howTo: ["숫자를 입력합니다."], faq: [{ q: "소수?", a: "'point' 뒤 각 자리." }], addedAt: "2026-05-15" },
  { slug: "js-beautifier", component: "JsBeautifierTool", category: "dev", icon: "✨", navTitle: "JS 정리", title: "JavaScript 포맷터", h1: "JavaScript 포맷터", description: "minify된 JS를 보기 좋게 재정렬.", metaDescription: "JS 포맷 무료.", howTo: ["JS를 붙여넣습니다."], faq: [{ q: "TS?", a: "비슷하게 작동." }], addedAt: "2026-05-15" },
  { slug: "text-stats", component: "TextStatsTool", category: "text", icon: "📊", navTitle: "텍스트 종합 통계", title: "텍스트 종합 통계 - 가독성 포함", h1: "텍스트 종합 통계", description: "글자·단어·문장·단락·가독성 분석.", metaDescription: "텍스트 통계 무료.", howTo: ["텍스트를 입력합니다."], faq: [{ q: "가독성?", a: "Flesch Reading Ease." }], addedAt: "2026-05-15" },
];

export function getTool(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(): Record<string, ToolConfig[]> {
  return tools.reduce((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {} as Record<string, ToolConfig[]>);
}

export const categoryLabels: Record<string, string> = {
  qr: "QR코드",
  image: "이미지",
  video: "동영상",
  document: "한글(HWP) 문서",
  pdf: "PDF",
  text: "텍스트",
  dev: "개발자",
  calc: "계산기·생활",
  academic: "논문·인용",
};
