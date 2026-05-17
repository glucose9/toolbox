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
      "URL, 와이파이, 명함, 텍스트를 QR코드로 변환하세요. 워터마크 없는 PNG/SVG로 다운로드되고, 가입 없이 평생 무료입니다. 매장 메뉴 QR, 행사 안내, SNS 링크 명함, 이벤트 페이지, 자료실 링크 등 어디든 사용 가능합니다.",
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
      { q: "왜 QR을 동적/추적용으로 못 만드나요?", a: "동적 QR(클릭 추적·URL 변경)은 외부 서버가 필요해 가입·유료 서비스가 됩니다. 본 도구는 영구·무료를 위해 정적 QR만 만듭니다." },
      { q: "스캔이 안 될 때는?", a: "QR이 너무 작거나(2cm 미만), 인쇄 화질이 낮거나, 본문에 너무 긴 텍스트가 들어가면 인식이 어렵습니다. 인쇄용은 SVG로 받고, 크기는 3cm 이상을 권장합니다." },
      { q: "디자인을 꾸미고 싶어요. 색이나 로고 넣을 수 있나요?", a: "기본 도구는 흑백입니다. 로고 삽입은 [로고 있는 QR] 도구, 중앙에 글자 넣기는 [텍스트 있는 QR] 도구를 사용하세요." },
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
      "Wi-Fi 이름과 비밀번호를 QR코드로 만들면 손님이 스캔만으로 와이파이에 자동 접속됩니다. 카페·식당·에어비앤비·미용실·병원 대기실·사무실 손님용에 딱이고, 매번 비밀번호를 알려주는 번거로움이 사라집니다.",
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
      { q: "비밀번호가 노출되지 않을까요?", a: "QR 이미지 안에 비밀번호가 평문으로 들어갑니다. 외부에 공유할 거라면 게스트용 별도 와이파이를 만들거나, 공유기에서 손님용 SSID를 따로 설정하는 것을 권장합니다." },
      { q: "WPA·WPA2·WPA3 차이는요?", a: "한국 일반 가정·매장은 WPA2가 가장 흔합니다. 공유기 설정에서 '보안 모드'를 확인해 동일하게 선택하면 됩니다. 모르면 기본값 WPA로 두세요." },
      { q: "한글 와이파이 이름도 됩니까?", a: "표준상 가능하지만 일부 기기에서 깨질 수 있어 영문·숫자로 짓는 것을 권장합니다. 한글 SSID가 이미 있다면 그대로 입력해 시도해 보세요." },
      { q: "스캔해도 와이파이가 안 잡혀요. 왜죠?", a: "(1) SSID 대소문자 오타, (2) 비밀번호 오타, (3) 5GHz 전용 SSID인데 폰이 2.4GHz만 지원, (4) 공유기에서 'SSID 숨김'으로 설정된 경우 — 이 중 하나를 확인해 보세요." },
      { q: "한 매장에 여러 와이파이가 있으면?", a: "각 와이파이마다 QR을 따로 만들어 부착하세요. 손님용은 게스트망, 직원용은 메인망 식으로 분리하면 보안이 좋아집니다." },
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
      "이름·회사·전화번호·이메일을 QR로 만드세요. 스캔하면 스마트폰 연락처에 바로 저장됩니다. 종이 명함에 인쇄해두면 명함 교환이 1초로 끝나고, 행사·전시회 부스, 영업 미팅, 컨퍼런스 명찰 등에 자주 쓰입니다.",
    metaDescription:
      "이름, 회사, 연락처를 담은 QR 명함 무료 생성. 스캔만으로 휴대폰 연락처에 자동 저장.",
    howTo: [
      "이름, 회사, 직책, 전화번호, 이메일, 웹사이트를 입력합니다.",
      "QR이 오른쪽에 즉시 만들어집니다.",
      "PNG로 다운로드해 명함 뒷면에 인쇄합니다.",
      "받은 사람이 스캔하면 모든 정보가 연락처에 한 번에 저장됩니다.",
    ],
    faq: [
      { q: "vCard가 뭔가요?", a: "전 세계 표준 디지털 명함 포맷(.vcf)입니다. 모든 스마트폰이 자동으로 인식해 연락처에 저장합니다." },
      { q: "한 명함에 여러 전화번호를 넣을 수 있나요?", a: "한 도구에서는 한 번호만 지원합니다. 휴대폰/사무실을 따로 표기하려면 메인 번호 1개와 추가 정보를 회사명에 함께 넣으세요." },
      { q: "한글 이름도 지원되나요?", a: "네. 한국어, 영어, 일본어, 중국어 모두 정상 인식됩니다." },
      { q: "정보가 바뀌면 어떻게 되나요?", a: "정적 QR이라 한 번 인쇄한 QR은 정보 수정이 안 됩니다. 자주 바뀌는 정보(회사·연락처)는 본인 웹사이트 링크로 만들고, 그 페이지에 최신 정보를 두는 방법이 안전합니다." },
      { q: "사진(프로필)도 넣을 수 있나요?", a: "vCard 표준은 사진 임베드를 지원하지만 용량이 커지면 QR 인식이 어려워집니다. 작은 썸네일 이미지여도 보통 권장하지 않습니다." },
      { q: "SNS 링크도 함께 들어가나요?", a: "웹사이트 칸에 인스타·링크드인·블로그 URL을 넣으면 연락처에 함께 저장됩니다. 여러 SNS는 본인 링크 모음 페이지(linktr.ee 등)를 만들어 한 URL로 묶는 방법이 좋습니다." },
      { q: "받는 사람이 별도 앱 없이도 스캔되나요?", a: "iOS 11+, Android 10+ 기본 카메라로 자동 인식됩니다. 별도 QR 스캐너 앱이 필요 없습니다." },
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
      "QR 코드가 찍힌 사진을 업로드하면 내용을 자동으로 읽어냅니다. 와이파이·URL·명함 QR 모두 인식. 카메라 없이 PC에서도 사용 가능. 스크린샷 속 QR 디코딩, 인쇄물 사진의 QR 확인, 안전성 의심되는 QR을 카메라로 스캔하지 않고 PC에서 미리 보기 등에 유용합니다.",
    metaDescription:
      "QR 코드 이미지 무료 디코더. URL·와이파이·명함 QR 인식, 브라우저에서 안전 처리.",
    howTo: [
      "QR 코드가 있는 이미지를 업로드합니다.",
      "내용이 자동으로 인식되어 표시됩니다.",
      "URL이면 클릭해 바로 열고, 텍스트면 복사합니다.",
    ],
    faq: [
      { q: "어떤 QR 타입을 인식하나요?", a: "표준 QR 모두 (URL, 와이파이, vCard, 텍스트, SMS, 위치 등). 흐릿하거나 너무 작은 QR은 인식이 어려울 수 있습니다." },
      { q: "사진이 외부로 가나요?", a: "아니요. 브라우저 안에서 jsQR 라이브러리로 처리됩니다. 외부로 전송되지 않습니다." },
      { q: "QR이 일부 가려져 있어도 됩니까?", a: "오류 정정 레벨에 따라 다릅니다. 중앙 25%까지 가려도 인식되는 경우가 많지만, 모서리의 위치 표시 패턴이 가려지면 인식이 안 됩니다." },
      { q: "스크린샷의 QR도 인식되나요?", a: "네. 핸드폰 화면을 캡처한 이미지나 다른 사람이 보낸 카톡 사진 속 QR도 업로드해서 디코딩할 수 있습니다." },
      { q: "왜 QR을 카메라 대신 디코더로 보나요?", a: "(1) 모르는 사람에게서 받은 QR이 악성 URL일 가능성 점검, (2) 인쇄물 사진을 PC에서 확인, (3) 멀티스크린 환경에서 폰이 없을 때 등." },
      { q: "QR 이미지가 흐릿해서 인식이 안 돼요. 어떻게 하죠?", a: "원본 화질이 너무 낮으면 인식이 어렵습니다. 가능하면 더 큰 해상도로 다시 찍거나 캡처하세요. [이미지 크기 변경]으로 키우는 건 도움이 안 됩니다(픽셀 정보가 늘지 않음)." },
      { q: "여러 QR이 한 이미지에 있을 때는?", a: "현재는 첫 번째로 인식된 QR만 표시됩니다. 여러 개라면 이미지를 잘라서 한 번에 하나씩 업로드해 주세요." },
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
      "MP4, MOV, WebM 동영상을 GIF 애니메이션으로 변환하세요. FPS·크기·길이 조절 가능. 카톡·디스코드·트위터 같은 곳에 짧은 영상 공유, 매장 인스타 스토리 짤, 코딩 튜토리얼 데모, 회의록 핵심 부분 캡처 등에 자주 쓰입니다. 파일은 브라우저 안에서 처리되어 외부로 전송되지 않습니다.",
    metaDescription:
      "동영상을 GIF로 무료 변환. MP4/MOV/WebM 지원, FPS·크기·길이 조절, 브라우저 안전 처리.",
    howTo: [
      "동영상 파일을 드래그하거나 업로드합니다.",
      "FPS, 가로 크기, 최대 길이를 슬라이더로 조절합니다.",
      "변환 시작 버튼을 누르면 ffmpeg.wasm이 GIF를 만듭니다 (첫 실행 시 라이브러리 다운로드 ~25MB).",
      "결과 GIF를 다운로드합니다.",
    ],
    faq: [
      { q: "GIF 용량이 너무 큰데요?", a: "프레임/초(FPS)를 10 이하로, 가로 크기를 320px 정도로 줄이면 용량이 크게 작아집니다. 색상 수가 많은 화려한 영상일수록 GIF 용량이 큽니다." },
      { q: "긴 동영상도 변환 가능한가요?", a: "기술적으로 가능하지만 GIF 특성상 30초 이상은 용량이 폭증합니다. 30초 이내를 추천합니다. 더 긴 영상이라면 [GIF → MP4] 방향이 더 적합합니다." },
      { q: "투명 GIF로 만들 수 있나요?", a: "동영상은 투명도가 없어 일반 GIF로 변환됩니다." },
      { q: "ffmpeg.wasm이 뭔가요?", a: "동영상 처리 라이브러리 ffmpeg을 WebAssembly로 컴파일해 브라우저에서 직접 실행하는 기술입니다. 처음 한 번만 라이브러리(약 25MB)를 다운받고 이후엔 캐시되어 빠릅니다." },
      { q: "화질이 떨어지는데요?", a: "GIF는 256색 제한이라 원본 동영상보다 색이 단순해집니다. 화질이 중요하면 GIF 대신 MP4·WebM·짧은 영상 원본을 그대로 공유하세요." },
      { q: "카톡에 보낼 짧은 짤은 어떻게 만드나요?", a: "FPS 10, 가로 320px, 길이 3~5초로 설정하면 카톡에 잘 올라가는 가벼운 GIF가 만들어집니다." },
      { q: "오디오는 어떻게 되나요?", a: "GIF는 무음입니다. 소리가 필요하면 동영상 그대로 공유하거나 [동영상 압축]으로 용량을 줄여서 보내세요." },
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
      "MP4 등 동영상에서 음성만 추출해 MP3로 저장하세요. 강의·인터뷰·음악 영상에서 오디오만 빼낼 때, 운전 중 듣고 싶은 동영상을 음성으로, 팟캐스트용 인터뷰 영상 음성만 가져오기 등에 편리합니다. 파일은 브라우저 안에서 처리됩니다.",
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
      { q: "MP3 외에 다른 포맷도 됩니까?", a: "현재 MP3 출력만 지원합니다. AAC·WAV·FLAC 같은 포맷이 필요하면 별도 변환 도구가 필요합니다." },
      { q: "스테레오/모노 선택 가능한가요?", a: "원본 동영상의 오디오 채널을 그대로 따라갑니다. 강의처럼 모노로 충분한 영상은 추출된 MP3도 모노입니다." },
      { q: "큰 파일도 됩니까?", a: "브라우저 메모리 한계로 1GB 이상은 실패할 수 있습니다. 긴 영상이면 먼저 [동영상 자르기]로 잘라 부분별로 추출하세요." },
      { q: "여러 파일을 한 번에 변환하려면?", a: "현재는 한 파일씩 처리됩니다. 여러 개를 추출한 뒤 [오디오 합치기]로 합쳐 한 MP3로 만들 수 있습니다." },
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
      "동영상 파일 용량을 화질 손상 최소화로 50~80% 줄이세요. 카톡 300MB 제한, 이메일 25MB 첨부 한도, 디스코드 25MB 업로드, 게시판 100MB 제한 등을 해결하는 데 자주 쓰입니다.",
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
      { q: "CRF가 뭔가요?", a: "Constant Rate Factor — 동영상 압축 표준 척도입니다. 숫자가 낮을수록 화질이 좋고 용량이 크며, 높을수록 그 반대입니다. 18(시각적 무손실) ~ 28(표준 압축) ~ 35(많이 압축) 정도가 일반적입니다." },
      { q: "처리에 시간이 너무 오래 걸려요. 빠르게 하려면?", a: "동영상 길이의 1~3배 시간이 걸리는 게 일반적입니다. 긴 영상은 먼저 [동영상 자르기]로 필요한 부분만 잘라낸 뒤 압축하세요." },
      { q: "오디오 품질도 떨어지나요?", a: "기본 설정은 오디오를 적절히 압축해 차이가 거의 없습니다. 음악 영상이 아니면 들리는 차이가 없습니다." },
      { q: "압축해도 카톡 한도(300MB)를 못 넘기는데요?", a: "해상도를 720p나 480p로 낮춰서 [동영상 리사이즈] 도구를 사용하거나, 영상을 둘로 잘라서 보내세요." },
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
      "동영상의 원하는 구간만 잘라내세요. 시작·끝 시점을 슬라이더로 지정. 화질 손실 없는 빠른 컷팅 (스트림 복사 방식). 강의·회의 영상에서 핵심 부분만 추출, 긴 여행 영상에서 하이라이트만 따기, SNS용 짧은 클립 만들기에 자주 쓰입니다.",
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
      { q: "여러 구간을 한 번에 자를 수 있나요?", a: "현재는 한 구간씩만 가능합니다. 여러 부분이 필요하면 한 부분씩 자른 뒤 [동영상 합치기]로 합치세요." },
      { q: "초 단위로 정확하게 자르려면?", a: "키프레임 위치 때문에 시작점이 0.5~2초 차이날 수 있습니다. 정확한 컷이 필요하면 재인코딩 옵션이 있는 전문 편집기(다빈치 리졸브 등)가 필요합니다." },
      { q: "오디오만 자를 수 있나요?", a: "동영상 자르기와 동시에 오디오도 같은 구간으로 잘립니다. 음성만 추출하려면 [동영상 → MP3] 도구를 먼저 쓰고 [오디오 자르기]를 이어 쓰세요." },
      { q: "결과 파일이 원본보다 크거나 비슷한 이유?", a: "재인코딩 없이 그대로 복사하기 때문에 비트레이트가 동일합니다. 용량을 더 줄이려면 [동영상 압축]을 추가로 사용하세요." },
      { q: "MOV·MKV·AVI 같은 다른 포맷도 됩니까?", a: "MP4·WebM 위주 지원이며, MOV는 대부분 됩니다. MKV·AVI는 일부 코덱에 따라 결과가 달라질 수 있습니다." },
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
      "GIF 애니메이션을 MP4 동영상으로 변환하세요. 일반적으로 용량이 70~90% 줄고 모든 플랫폼에서 호환됩니다. 블로그·웹페이지에서 GIF 대신 MP4로 자동 재생, 카톡으로 GIF 보내기 어려울 때, 트위터·X에 무거운 GIF 대신 가벼운 동영상으로 올릴 때 자주 쓰입니다.",
    metaDescription:
      "GIF → MP4 무료 변환. 용량 최대 90% 절감, 브라우저에서 안전 처리.",
    howTo: [
      "GIF 파일을 업로드합니다.",
      "변환 버튼을 누르면 MP4가 생성됩니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "투명도는 어떻게 되나요?", a: "MP4는 투명도를 지원하지 않아 검은 배경으로 채워집니다. 투명이 꼭 필요하면 WebM 변환을 고려하세요." },
      { q: "왜 MP4로 바꾸나요?", a: "(1) 같은 화질에 용량이 10배 이상 작음, (2) 모바일 데이터 절약, (3) 웹페이지 로딩 속도, (4) 카톡 등 일부 메신저에서 GIF는 정적 이미지로 변할 때가 있는데 MP4는 그대로 재생." },
      { q: "화질이 떨어지나요?", a: "MP4는 색상 제한이 없어 GIF보다 오히려 화질이 더 좋아집니다. 256색 제한이 사라지면서 그라데이션이 부드러워집니다." },
      { q: "MP4가 GIF처럼 자동 반복재생되게 하려면?", a: "HTML에서 <video autoplay loop muted playsinline>을 쓰면 GIF처럼 동작합니다. 워드프레스·티스토리에도 임베드 가능." },
      { q: "변환 후 깜빡이거나 끊겨요.", a: "원본 GIF의 프레임 레이트가 낮으면 그대로 변환됩니다. 부드러운 영상이 필요하면 더 높은 FPS의 원본을 사용하세요." },
    ],
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
      "옆으로 누운 동영상을 똑바로 세우거나, 좌우/상하로 반전하세요. ffmpeg.wasm 기반, 음성 그대로 유지. 핸드폰으로 세로로 찍었다가 옆으로 저장된 영상 보정, 거울 효과(좌우 반전) 만들기, 회전 정보가 잘못된 영상 일괄 수정에 자주 쓰입니다.",
    metaDescription:
      "동영상 회전 무료. 90/180/270도, 좌우/상하 반전, ffmpeg.wasm.",
    howTo: [
      "동영상을 업로드합니다.",
      "회전 각도(90·180·270) 또는 반전(좌우/상하)을 선택합니다.",
      "변환 후 다운로드합니다.",
    ],
    faq: [
      { q: "메타데이터만 바꾸나요?", a: "MP4 메타데이터 회전이 아니라 실제로 영상을 재인코딩합니다. 모든 플레이어에서 똑바로 보입니다." },
      { q: "재인코딩이라 시간이 오래 걸리나요?", a: "영상 길이의 1~2배 정도 걸립니다. 긴 영상이면 [동영상 자르기]로 필요한 부분만 자른 뒤 회전하세요." },
      { q: "음성도 같이 유지되나요?", a: "네. 오디오 트랙은 재인코딩하지 않고 그대로 복사됩니다." },
      { q: "임의 각도(45도 같은) 회전은 안 되나요?", a: "현재는 90도 단위 회전만 지원합니다. 임의 각도는 빈 공간이 생겨 별도 편집기가 필요합니다." },
      { q: "왜 폰으로 세로로 찍었는데 PC에서 옆으로 보이나요?", a: "동영상 EXIF 회전 정보가 잘못 저장된 경우가 흔합니다. 이 도구로 한 번 회전해 두면 어떤 플레이어에서도 똑바로 보입니다." },
      { q: "회전 후 화질이 떨어지나요?", a: "재인코딩 과정에서 미세한 손실이 있지만 기본 설정은 시각적 차이가 거의 없습니다." },
    ],
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
      "동영상의 원하는 시점에서 정지화면을 PNG로 저장하세요. 유튜브 영상 썸네일 만들기, 강의 슬라이드 캡처, 영화·뉴스에서 인용용 캡처, SNS 공유용 미리보기 이미지 추출에 유용합니다.",
    metaDescription:
      "동영상 썸네일 무료 추출. 시점 선택, PNG 다운로드, 모든 처리는 브라우저 안.",
    howTo: [
      "동영상을 업로드합니다.",
      "재생바를 움직여 원하는 시점으로 이동합니다.",
      "캡처 버튼을 눌러 정지화면을 PNG로 저장합니다.",
    ],
    faq: [
      { q: "어떤 포맷을 지원하나요?", a: "MP4, MOV, WebM 등 브라우저가 재생할 수 있는 포맷이면 됩니다." },
      { q: "캡처 화질은 원본만큼 나오나요?", a: "동영상 원본 해상도 그대로 캡처됩니다. 1080p 동영상이면 1920×1080 PNG가 만들어집니다." },
      { q: "여러 시점을 한 번에 캡처할 수 있나요?", a: "현재는 한 번에 한 장씩입니다. 여러 장은 시점을 옮기며 캡처를 반복하세요." },
      { q: "유튜브 썸네일용으로 쓸 수 있나요?", a: "네. 캡처한 PNG를 [이미지 자르기]로 16:9 비율(1280×720)에 맞추고, [이미지에 글자 넣기]로 텍스트를 더하면 유튜브 썸네일이 됩니다." },
      { q: "정확히 0.1초 단위로 캡처할 수 있나요?", a: "브라우저 동영상 API의 정밀도 한계로 정확한 프레임 단위 캡처는 어렵습니다. 0.5~1초 정도 차이가 날 수 있습니다." },
      { q: "JPG로도 저장되나요?", a: "기본 PNG 저장이며, 캡처한 이미지를 [PNG → JPG] 도구로 추가 변환할 수 있습니다." },
    ],
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
      "동영상 재생속도를 늦추거나 빠르게 만드세요. 강의·인터넷 강의를 1.5~2배속으로 빠르게 듣기, 운동·골프 스윙 분석을 슬로우 모션으로, 요리 영상 압축, 댄스 안무 분석 등에 유용합니다. ffmpeg.wasm 기반.",
    metaDescription:
      "동영상 재생속도 무료 변경. 0.25x ~ 4x, 음성 함께 처리.",
    howTo: [
      "동영상을 업로드합니다.",
      "속도 배율을 선택합니다 (0.25x · 0.5x · 1.5x · 2x · 3x · 4x).",
      "변환 후 다운로드합니다.",
    ],
    faq: [
      { q: "음성도 함께 변하나요?", a: "네. 영상과 음성 모두 같은 비율로 처리됩니다. 빨라지면 목소리가 높아지고, 느려지면 낮아집니다." },
      { q: "음성 피치 유지하면서 속도만 바꿀 수 있나요?", a: "현재 도구는 음성도 비례로 변환됩니다. 피치 유지 변속이 필요하면 별도 음성 편집 소프트웨어(Audacity 등)를 쓰세요." },
      { q: "강의 영상을 2배속으로 줄이면 용량도 절반?", a: "영상은 같은 비트레이트로 더 짧아져 보통 용량이 절반 정도로 줄어듭니다." },
      { q: "0.25배속이 너무 느리지 않나요?", a: "골프 스윙·과학 실험·댄스 안무 같이 동작을 자세히 분석할 때 유용합니다. 그냥 천천히 보고 싶으면 0.5x가 적당합니다." },
      { q: "프레임이 끊기는 느낌이 나요. 왜죠?", a: "원본 FPS(보통 30fps)에서 속도를 늦추면 같은 프레임이 반복되어 끊기는 느낌이 듭니다. 60fps 이상으로 찍은 영상이 부드럽습니다." },
      { q: "처리에 얼마나 걸리나요?", a: "원본 영상의 1~2배 시간이 걸립니다. 긴 영상은 [동영상 자르기]로 필요한 부분만 먼저 잘라내세요." },
    ],
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
      "MP3·WAV·M4A·OGG 등 오디오 파일에서 원하는 구간만 잘라내세요. 화질 손실 없는 빠른 컷팅, ffmpeg.wasm 기반. 음악에서 후렴구만 따기, 강의·팟캐스트에서 인용 구간 추출, 벨소리·알람음 만들기, 회의 녹음에서 핵심 부분만 보존에 자주 쓰입니다.",
    metaDescription:
      "오디오 자르기 무료. MP3/WAV/M4A 구간 추출, 화질 손실 없음.",
    howTo: [
      "오디오 파일을 업로드합니다.",
      "시작·끝 시점을 슬라이더로 지정합니다.",
      "자르기 버튼을 누르고 결과를 다운로드합니다.",
    ],
    faq: [
      { q: "어떤 포맷을 지원하나요?", a: "MP3, WAV, M4A, OGG, AAC, FLAC 대부분의 일반 오디오 포맷을 지원합니다." },
      { q: "음질이 떨어지나요?", a: "MP3 같은 손실 포맷은 재인코딩 시 미세한 손실이 있을 수 있습니다. WAV·FLAC 무손실 포맷은 그대로 유지됩니다." },
      { q: "벨소리용으로 짧게 자를 수 있나요?", a: "네. 30초 정도로 잘라서 .m4a로 저장하면 아이폰 벨소리로도 사용 가능합니다 (별도 등록 절차 필요)." },
      { q: "여러 구간을 한 번에 자를 수 있나요?", a: "현재는 한 구간씩만 가능합니다. 여러 부분이 필요하면 한 부분씩 자른 뒤 [오디오 합치기]로 합치세요." },
      { q: "결과 파일 이름은 어떻게 되나요?", a: "원본 이름 뒤에 시작/끝 시간 정보가 붙어 자동 생성됩니다 (예: lecture_30s-60s.mp3)." },
      { q: "큰 오디오 파일도 됩니까?", a: "보통 100MB 이내가 안정적입니다. 1시간 이상 녹음이라면 먼저 더 작은 부분으로 자른 뒤 처리하세요." },
    ],
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
      "마크다운 본문의 H1~H6 헤딩을 자동으로 분석해 목차(Table of Contents)를 만들어 줍니다. 들여쓰기와 앵커 링크 자동. GitHub README, 기술 블로그 글, 노션 페이지, 학습 노트, 회의록 정리에 자주 쓰입니다.",
    metaDescription:
      "마크다운 목차 자동 생성. 헤딩 H1-H6 추출, 앵커 링크, 들여쓰기.",
    howTo: ["마크다운을 붙여넣습니다.", "TOC가 자동 생성됩니다.", "복사해서 문서 맨 위에 붙입니다."],
    faq: [
      { q: "어떤 레벨까지 포함되나요?", a: "기본 H1~H3이고 슬라이더로 조절할 수 있습니다. 너무 깊으면 목차가 복잡해지니 3~4단계가 적당합니다." },
      { q: "앵커 링크가 작동하나요?", a: "GitHub·GitLab·노션 등 대부분 마크다운 뷰어에서 자동 작동합니다. 각 항목이 해당 헤딩으로 점프합니다." },
      { q: "GitHub README에 어떻게 적용해요?", a: "생성된 TOC를 복사해서 README.md 맨 위에 붙여넣으면 됩니다. GitHub가 자동으로 헤딩 ID를 만들어 링크가 작동합니다." },
      { q: "한글 헤딩도 앵커가 만들어지나요?", a: "네. GitHub 방식의 슬러그(소문자·공백→하이픈)로 만들어지며 한글도 지원됩니다." },
      { q: "TOC에 번호를 매길 수 있나요?", a: "옵션으로 자동 번호(1., 1.1., 1.1.1.)를 추가할 수 있습니다." },
    ],
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
      "행/열 수를 정하고 셀에 내용을 채우면 마크다운 표 문법으로 자동 생성됩니다. 정렬·셀 추가/삭제, 미리보기 동시 제공. GitHub README 비교표, 기술 블로그 비교/사양표, 노션·옵시디언 노트, 회의록 결정 사항 표에 자주 쓰입니다.",
    metaDescription:
      "마크다운 표 무료 생성기. 행/열 추가, 정렬 선택, 실시간 미리보기.",
    howTo: ["행/열 수를 정하거나 +/- 버튼으로 조절합니다.", "각 셀에 내용을 입력합니다.", "정렬을 선택하고 결과를 복사합니다."],
    faq: [
      { q: "복잡한 표(병합 셀)도 가능한가요?", a: "마크다운 표 문법은 셀 병합을 지원하지 않습니다. 단순 표만 가능합니다. 복잡한 표는 HTML <table>을 직접 써야 합니다." },
      { q: "엑셀에서 복사한 표도 변환되나요?", a: "엑셀 셀을 복사해 붙여넣기 기능이 있다면 자동 변환됩니다. 없다면 셀별로 다시 입력해야 합니다." },
      { q: "정렬은 어떻게 표시되나요?", a: "구분선에 콜론을 넣어 표현합니다. :--- 왼쪽, :---: 가운데, ---: 오른쪽. GitHub·노션 등 대부분 마크다운 뷰어가 지원." },
      { q: "표 내용에 줄바꿈을 넣을 수 있나요?", a: "마크다운 표 셀 안에는 <br> HTML 태그로 줄바꿈을 표시합니다. 일부 뷰어에서만 작동." },
      { q: "GitHub에서 어떻게 보이나요?", a: "GFM(GitHub Flavored Markdown)을 따르면 그대로 표가 렌더링됩니다. 생성 결과는 GFM 표준입니다." },
    ],
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
      "한글을 국립국어원 로마자 표기법(Revised Romanization)으로 변환하세요. 영문 명함·이름·주소 표기, 여권 발급용 이름 표기, 해외 호텔 예약, SNS 영문 닉네임 만들기에 유용합니다.",
    metaDescription:
      "한글 로마자 변환 무료. Revised Romanization 표준, 즉시 변환.",
    howTo: ["한글 텍스트를 입력합니다.", "로마자 결과가 자동 표시됩니다.", "복사해서 사용합니다."],
    faq: [
      { q: "어떤 표기법을 따르나요?", a: "2000년 국립국어원 고시 '국어의 로마자 표기법'을 기반으로 합니다. 외교부 여권 표기법과 거의 동일합니다." },
      { q: "왜 '김' 이 'Gim'? 'Kim'이 흔한데요?", a: "표준은 'Gim'이지만 관습적·역사적으로 'Kim'이 굳어졌습니다. 여권은 본인 결정에 따라 'Kim' 사용이 일반적." },
      { q: "여권 영문 이름은 어떤 표기를 써야 하나요?", a: "외교부 여권법상 본인 결정이지만 가족 구성원·기존 표기 일관성이 중요합니다. 한 번 정하면 바꾸기 어려우니 신중히." },
      { q: "이전 매큐-라이샤워(McCune-Reischauer) 표기도 됩니까?", a: "현재는 Revised Romanization만 지원합니다. M-R 표기(서울 → Sŏul)는 도서관·학술 분야에서 일부 쓰입니다." },
      { q: "두음법칙·받침 발음이 정확히 반영되나요?", a: "기본 규칙은 적용되지만 일부 예외 발음은 사람 검수가 필요합니다. 중요한 문서는 결과 확인 후 사용하세요." },
      { q: "외국인 이름을 한글로 거꾸로 변환되나요?", a: "이 도구는 한글 → 로마자 한 방향만 지원합니다. 외국 이름 한글 표기는 외래어 표기법이 따로 있어 별도 지식이 필요합니다." },
    ],
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
      "텍스트를 모스 부호로, 모스 부호를 텍스트로 변환하세요. 영문·숫자·한국어 자모 지원, 소리로 듣기 기능 포함. 모스 부호 학습, 햄(아마추어) 무선 시험 준비, 군대 통신 학습, 코딩 학습 보조, 재미용 메시지 암호화에 자주 쓰입니다.",
    metaDescription:
      "모스 부호 변환 무료. 영문·숫자·한글 자모, 소리 재생 지원.",
    howTo: ["변환할 텍스트나 모스 부호를 입력합니다.", "방향이 자동 감지되어 결과가 표시됩니다.", "▶ 버튼으로 모스 부호를 소리로 들을 수 있습니다."],
    faq: [
      { q: "한글 모스 부호도 있나요?", a: "한국어 모스 부호 표준에 따라 자음·모음을 변환합니다. ㄱ은 '·-··', ㅏ는 '·' 식." },
      { q: "모스 부호를 어떻게 읽어요?", a: "점(·)은 짧은 신호, 선(-)은 긴 신호. 글자 사이는 짧은 공백, 단어 사이는 긴 공백. SOS는 '··· --- ···'." },
      { q: "왜 SOS가 ···---··· 인가요?", a: "기억하기 쉽고 다른 신호와 구분되도록 정해진 국제 조난 신호입니다. 'Save Our Souls'는 후에 붙은 의미." },
      { q: "햄 무선통신에서도 같은 부호?", a: "네. 국제 모스 부호는 전 세계 동일합니다. 햄 라디오·해상 통신·일부 군대 통신에서 지금도 사용." },
      { q: "소리로 들으면 어떤 속도?", a: "기본 표준 속도(13 WPM 정도)로 재생됩니다. 빠르게 듣고 싶다면 옵션에서 속도를 조절할 수 있을 수도 있습니다." },
      { q: "모스 부호 학습 팁은요?", a: "처음엔 점·선 패턴으로 외우지 말고 소리 그 자체로 외우는 게 좋습니다. 'A'는 '디-다', 'B'는 '다-디-디-디' 식으로." },
    ],
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
      "텍스트를 컴퓨터 음성으로 읽어줍니다. 한국어·영어·일본어·중국어 등 OS에 설치된 음성을 사용. 속도·음높이 조절 가능. 발음 연습, 시각장애 보조, 글 교정 시 음성으로 듣기, 외국어 학습, 짧은 안내 음성 만들기에 자주 쓰입니다.",
    metaDescription:
      "텍스트 음성 변환 무료. 한국어·영어·다국어, 속도·음높이 조절, 브라우저 내장 TTS.",
    howTo: ["읽을 텍스트를 입력합니다.", "음성·속도·음높이를 선택합니다.", "▶ 재생 버튼을 누릅니다."],
    faq: [
      { q: "음성 종류가 적어요", a: "사용 가능한 음성은 OS와 브라우저에 따라 다릅니다. 윈도우/맥/안드로이드/아이폰 모두 기본 한국어 음성을 제공합니다." },
      { q: "MP3로 저장할 수 있나요?", a: "Web Speech API는 파일 저장을 지원하지 않습니다. 재생만 됩니다. 녹음하려면 화면 녹화 도구나 별도 TTS 서비스(Google TTS, Naver Clova 등)가 필요합니다." },
      { q: "AI 음성처럼 자연스럽나요?", a: "OS 내장 음성이라 자연스러움은 환경에 따라 다릅니다. 맥의 'Siri'·iOS는 비교적 자연스럽고, 윈도우 기본 음성은 조금 기계적일 수 있습니다." },
      { q: "영어 발음 연습용으로 쓸 수 있나요?", a: "네. 영어 음성을 선택하고 속도를 0.7~0.8로 낮추면 발음 학습용으로 좋습니다." },
      { q: "긴 글도 읽어주나요?", a: "기술적 제한은 없지만 너무 길면 브라우저가 중간에 끊을 수 있습니다. 1000자 이내로 나눠서 사용하세요." },
      { q: "왜 한국어 음성이 끊기거나 멈춰요?", a: "브라우저별로 안정성이 다릅니다. 크롬·엣지가 가장 안정적이고, 사파리·파이어폭스는 일부 제한이 있을 수 있습니다." },
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
      "텍스트에서 단어와 글자별 등장 횟수를 셉니다. 글·논문·로그 분석에 유용. 불용어 제거·대소문자 무시 옵션. 논문 키워드 추출, 블로그 SEO 키워드 분석, 글쓰기 시 자주 반복되는 어휘 점검, 로그 패턴 분석에 자주 쓰입니다.",
    metaDescription:
      "단어 빈도 분석 무료. 단어/글자 카운트, 불용어 제거, 정렬 옵션.",
    howTo: ["텍스트를 입력합니다.", "옵션을 설정합니다 (불용어, 대소문자 등).", "단어별 빈도 표가 표시됩니다."],
    faq: [
      { q: "불용어가 뭔가요?", a: "'은/는/이/가' 같은 의미 없이 자주 쓰이는 조사·관사·접속사 등을 분석 결과에서 빼는 기능입니다. 의미 있는 단어만 남게 됩니다." },
      { q: "한글·영문 단어가 잘 구분되나요?", a: "네. 한글은 띄어쓰기 + 조사 분리, 영문은 공백·구두점 기준으로 단어를 나눕니다." },
      { q: "글자 빈도와 단어 빈도 차이?", a: "글자 빈도는 'ㄱ·ㄴ·ㄷ' 또는 음절 단위로, 단어 빈도는 의미 단위로 셉니다. 분석 목적에 따라 선택." },
      { q: "결과를 어떻게 활용하나요?", a: "(1) 글쓰기에서 같은 단어 과다 사용 점검, (2) SEO 키워드 밀도 확인, (3) 논문 핵심 개념 추출, (4) [워드 클라우드]와 함께 시각화." },
      { q: "내 텍스트가 외부로 가나요?", a: "모든 분석은 브라우저 안에서 일어납니다. 외부로 전송되지 않으니 민감한 글이라도 안심하고 분석할 수 있습니다." },
      { q: "긴 글 분석도 빠른가요?", a: "수만 자도 즉시 처리됩니다. 책 한 권 분량(10만자+)도 무리 없이 분석 가능합니다." },
    ],
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
      "LaTeX로 수식을 입력하면 실시간으로 KaTeX가 렌더링합니다. 적분·시그마·행렬·분수 모두 지원하며 결과를 PNG/SVG로 저장하거나 코드를 복사하세요. 논문 작성, 수학·물리 강의 자료, 블로그 글에 수식 삽입, 발표 자료 만들기에 자주 쓰입니다.",
    metaDescription:
      "LaTeX 수식 에디터 무료. 실시간 KaTeX 렌더링, PNG·SVG 저장, MathML 출력.",
    howTo: [
      "LaTeX 수식을 입력합니다 (예: \\frac{a}{b}, \\int_0^1 x dx).",
      "오른쪽에 실시간으로 렌더링됩니다.",
      "PNG/SVG로 저장하거나 LaTeX/MathML 코드를 복사합니다.",
    ],
    faq: [
      { q: "어떤 명령어를 지원하나요?", a: "KaTeX 지원 범위(commonly used commands). 분수·근호·적분·시그마·행렬·그리스 문자 등 대부분 지원됩니다." },
      { q: "결과를 워드/PPT에 붙여넣고 싶어요", a: "PNG로 저장한 뒤 워드/파워포인트에 이미지로 삽입하세요. 워드의 LaTeX 수식 모드(2016+)에 코드를 직접 붙여넣어도 됩니다." },
      { q: "LaTeX 문법을 잘 몰라요. 어떻게 시작?", a: "[수식 빌더] 도구를 추천합니다. 버튼 클릭으로 분수·근호·적분 등을 만들 수 있어 LaTeX 학습 없이 사용 가능합니다." },
      { q: "PNG vs SVG 어느 게 좋아요?", a: "PDF·인쇄·웹에는 SVG(벡터, 무한 확대), 카톡·SNS·메일에는 PNG(호환성 좋음)을 권장합니다." },
      { q: "수식 색깔도 바꿀 수 있나요?", a: "LaTeX에서 \\color{red}{x^2} 같이 색을 지정할 수 있습니다. 다크 모드 자료에 흰 글자 수식이 필요할 때 유용." },
      { q: "긴 수식이 너무 작게 나와요. 키울 수 있나요?", a: "PNG 저장 시 배율을 조정해 더 크게 받을 수 있습니다. SVG는 사이즈 무관하게 깔끔합니다." },
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
      "12,345원을 '일만 이천삼백사십오 원'으로, 계약서·영수증·세금계산서에 쓸 형식으로 변환하세요. 일/금/원정 자동 추가. 부동산 계약서, 임대차 계약, 차용증, 영수증·세금계산서 작성, 금액 위조 방지에 자주 쓰입니다.",
    metaDescription:
      "숫자 한글 변환 무료. 계약서·영수증 표기, 일금/원정 자동 추가.",
    howTo: ["숫자를 입력합니다.", "변환 결과가 즉시 표시됩니다.", "계약서 형식, 통장 형식 등 옵션을 선택합니다."],
    faq: [
      { q: "어디까지 표현되나요?", a: "조(10¹²) 단위까지 지원합니다. 1,000조 이상은 일반 거래에선 거의 쓰이지 않습니다." },
      { q: "왜 계약서에 한글 금액을 쓰나요?", a: "숫자만 쓰면 0 하나를 슬쩍 추가하는 위조가 쉬워 한글로도 함께 적어 변조를 막습니다. 법적으로 분쟁 시 둘이 다르면 한글이 우선합니다." },
      { q: "'일금'·'원정'이 뭐예요?", a: "'일금 X 원정' 형식은 금액 앞뒤에 변조 방지용 표기를 붙인 것입니다. '一金'(한 금액)과 '元定'(원정·정확한 금액)이라는 뜻." },
      { q: "정자체(壹·貳·參) 한자도 됩니까?", a: "옵션으로 한자(갖은자) 표기도 지원할 수 있습니다. 전통 계약서에 사용." },
      { q: "엔화·달러도 변환되나요?", a: "이 도구는 원화 기준 한국어 변환이 주 목적입니다. 외화 표기는 일반적으로 영문 표기를 함께 씁니다." },
      { q: "소수점도 한글로?", a: "원 단위 금액은 보통 소수점이 없지만, 필요시 '점 X' 형태로 표시됩니다." },
    ],
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
      "한글 키보드에 영문으로 친 'dkssudgktpdy'를 '안녕하세요'로 즉시 변환하세요. 반대도 가능. 실수로 입력한 글 복구, 카톡·게시판에 영타로 보낸 메시지 복원, 비밀번호 한영 혼동 디버깅에 자주 쓰입니다.",
    metaDescription:
      "한영 자판 변환 무료. dkssudgktpdy → 안녕하세요 양방향 변환.",
    howTo: ["변환할 텍스트를 입력합니다.", "방향(한→영, 영→한)을 선택하면 즉시 변환됩니다."],
    faq: [
      { q: "특수문자나 숫자는 어떻게 되나요?", a: "한글·영문에 해당하지 않는 글자(숫자·특수문자·이모지)는 그대로 유지됩니다." },
      { q: "왜 'dkssud'이 '안녕'으로 되나요?", a: "한글 두벌식 자판 기준입니다. d=ㅇ, k=ㅏ, s=ㄴ, s=ㄴ, u=ㅕ, d=ㅇ → 'ㅇㅏㄴㄴㅕㅇ' = '안녕'." },
      { q: "세벌식 자판도 됩니까?", a: "현재는 두벌식 표준 자판 기준입니다. 세벌식 사용자는 결과가 다를 수 있어요." },
      { q: "한자도 가능?", a: "한자는 자판 변환이 아니라 한자 입력 시스템이라 이 도구는 처리하지 않습니다." },
      { q: "비밀번호 입력 시 한영 전환을 잊었어요. 복구할 수 있나요?", a: "네. 영문 비밀번호를 한글 자판 상태로 쳤다면 이 도구로 변환해 보세요. 다만 실제 비밀번호 검증은 시스템에서 해야 합니다." },
      { q: "휴대폰 천지인 자판도 변환되나요?", a: "PC 표준 두벌식 변환이라 모바일 천지인은 변환이 다를 수 있습니다." },
    ],
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
      "텍스트의 글자수, 단어수, 줄 수를 실시간으로 셉니다. 네이버 블로그·자기소개서·논문 글자수 제한 맞출 때, 입시 자소서, 공모전 응모, 신문 칼럼 분량 맞추기, 트위터·SNS 글자수 제한 확인에 자주 쓰입니다.",
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
      { q: "자소서·대학 입시 글자수 기준?", a: "대학마다 다릅니다. 대부분 공백 포함, 일부 공백 제외. 모집요강 확인 필수. 한 자 차이로 잘릴 수 있으니 항상 95% 정도로 작성하는 게 안전." },
      { q: "트위터 280자 제한 어떻게 세요?", a: "트위터는 영문 1글자, 한글 2글자로 카운트합니다 (일본어·중국어 동일). 본 도구의 '글자수'와 다를 수 있습니다." },
      { q: "이모지는 몇 자로 세나요?", a: "보통 1자로 세지만 이모지 종류(피부톤·결합 이모지)에 따라 2~4자로 세는 시스템도 있습니다. SNS별 정확한 카운트는 본 사이트에서 확인하세요." },
      { q: "원고지 매수도 계산되나요?", a: "200자 원고지 기준 자동 계산이 표시됩니다. 신춘문예·문예 공모전 등에 유용합니다." },
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
      "텍스트를 UPPER·lower·Title·camelCase·snake_case·kebab-case·CONSTANT_CASE로 즉시 변환합니다. 코딩 변수명 변환, 파일명 일관성 맞추기, URL 슬러그 만들기, CSS 클래스명, DB 컬럼명 작성에 자주 쓰입니다.",
    metaDescription:
      "대소문자·케이스 변환 무료. camelCase, snake_case, kebab-case, CONSTANT_CASE 지원.",
    howTo: [
      "변환할 텍스트를 입력합니다.",
      "원하는 케이스 버튼을 누르면 즉시 변환됩니다.",
      "복사 버튼으로 결과를 클립보드에 담습니다.",
    ],
    faq: [
      { q: "한글도 변환되나요?", a: "한글은 대소문자가 없어서 그대로 유지됩니다. 영문 부분만 변환됩니다." },
      { q: "각 케이스 차이?", a: "camelCase(자바스크립트 변수), PascalCase(클래스명), snake_case(파이썬·DB), kebab-case(URL·CSS), CONSTANT_CASE(상수)." },
      { q: "영문 제목 Title Case는 어떤 규칙?", a: "기본 영문 Title Case는 모든 단어 첫 글자만 대문자입니다. APA·Chicago 같은 학술 규칙(짧은 전치사는 소문자)이 필요하면 [영문 제목 대문자화] 도구를 쓰세요." },
      { q: "이미 변환된 텍스트를 다시 바꿀 수 있나요?", a: "네. 어떤 케이스의 텍스트든 다른 케이스로 자유롭게 변환됩니다. 'helloWorld' → 'hello_world' → 'HELLO-WORLD' 모두 가능." },
      { q: "Sentence case도 있나요?", a: "있습니다. 문장형(첫 글자만 대문자, 나머지 소문자)도 옵션에 포함됩니다." },
    ],
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
      "여러 줄로 된 텍스트를 알파벳/가나다 순, 역순, 길이순, 무작위로 정렬합니다. 대소문자 무시·중복 제거 옵션 지원. 명단 정리, 단어 사전 만들기, 데이터 클렌징, 알파벳 순 인덱싱, 참고문헌 정렬에 자주 쓰입니다.",
    metaDescription:
      "텍스트 줄 정렬 무료. 알파벳·역순·길이·랜덤, 대소문자 무시, 중복 제거 옵션.",
    howTo: [
      "정렬할 텍스트를 한 줄에 하나씩 붙여넣습니다.",
      "정렬 방식을 선택합니다.",
      "결과를 복사합니다.",
    ],
    faq: [
      { q: "숫자도 자연 정렬되나요?", a: "네. '1, 2, 10, 11' 처럼 자연 정렬을 지원합니다 (사전 정렬 1, 10, 11, 2가 아님)." },
      { q: "한글과 영문 섞여 있어도 정렬됩니까?", a: "네. Intl.Collator로 자연 정렬되어 한글은 가나다, 영문은 알파벳 순으로 처리됩니다." },
      { q: "중복 제거 옵션은 어떻게 작동?", a: "정렬 후 같은 줄을 1개만 남깁니다. 대소문자·공백 무시 옵션과 조합하면 'apple'과 'Apple'을 같다고 처리." },
      { q: "랜덤 셔플(무작위) 정렬은 언제 써요?", a: "발표 순서 정하기, 단어 카드 섞기, 명단 무작위 배치 등에 유용합니다. Web Crypto의 안전한 난수 사용." },
      { q: "엑셀에서 복사한 데이터도 됩니까?", a: "엑셀 한 열을 복사하면 줄바꿈으로 구분된 형태가 됩니다. 그대로 붙여넣으면 정렬 가능합니다." },
      { q: "참고문헌 정렬에도 쓸 수 있나요?", a: "네. 다만 학술 참고문헌 전용 정렬은 [참고문헌 정렬·중복제거] 도구가 hanging indent까지 지원해 더 적합합니다." },
    ],
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
      "디자인 시안과 목업에 쓸 더미 텍스트를 생성하세요. 라틴어 Lorem Ipsum과 한글 더미 문장을 단어/문장/단락 수로 만들어드립니다. 웹사이트 시안, 책·잡지 레이아웃 목업, 모바일 앱 와이어프레임, 인쇄물 디자인 작업에 자주 쓰입니다.",
    metaDescription:
      "Lorem Ipsum / 한글 더미 텍스트 무료 생성. 단어·문장·단락 수 선택 가능.",
    howTo: [
      "스타일(라틴 / 한글)을 선택합니다.",
      "단위(단어 / 문장 / 단락)와 개수를 입력합니다.",
      "생성 버튼을 눌러 결과를 복사합니다.",
    ],
    faq: [
      { q: "왜 Lorem Ipsum을 쓰나요?", a: "콘텐츠 대신 디자인 자체에 집중하기 위해 의미 없는 텍스트를 채워 넣는 디자인 관행입니다. 16세기 인쇄소에서 시작된 전통입니다." },
      { q: "원본 Lorem Ipsum의 뜻은?", a: "키케로의 'De Finibus Bonorum et Malorum'(BC 45)에서 추출된 라틴어 문장의 변형입니다. 임의 추출이라 자체로는 의미가 없습니다." },
      { q: "왜 한글 더미가 필요한가요?", a: "라틴어는 글자 길이·자모 분포가 한글과 달라서 한글 디자인 검토엔 부적합합니다. 한글 더미는 실제 한국어 자모 빈도를 반영해 더 정확한 시각 검증 가능." },
      { q: "단어/문장/단락 어느 단위로 만들어요?", a: "버튼 라벨에는 단어, 본문에는 단락, 긴 설명에는 여러 단락. 디자인 요소에 맞춰 적당히 선택." },
      { q: "같은 결과가 반복되지 않게 하려면?", a: "도구가 매번 다른 순서로 단어를 조합합니다. 새로고침 시마다 다른 결과가 나옵니다." },
      { q: "이모지·특수문자도 섞을 수 있나요?", a: "기본은 일반 텍스트입니다. 특수문자가 필요하면 [이모지 검색] 도구로 따로 추가하세요." },
    ],
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
      "마크다운을 입력하면 실시간으로 HTML로 변환되어 미리보기가 표시됩니다. GitHub Flavored Markdown(GFM) 지원, HTML 소스 복사 가능. README 미리보기, 블로그 글 발행 전 확인, 노션·디스코드 메시지 포맷 미리보기에 자주 쓰입니다.",
    metaDescription:
      "마크다운 무료 미리보기. GitHub Flavored Markdown, HTML 코드 복사, 실시간 변환.",
    howTo: [
      "왼쪽에 마크다운 텍스트를 작성합니다.",
      "오른쪽에 HTML 결과가 즉시 표시됩니다.",
      "필요하면 HTML 소스 보기로 복사합니다.",
    ],
    faq: [
      { q: "어떤 마크다운 문법을 지원하나요?", a: "GitHub Flavored Markdown (GFM) — 표, 체크박스, 코드 펜스, 자동 링크, 취소선, 작업 목록 등을 지원합니다." },
      { q: "GitHub README에 그대로 작동하나요?", a: "네. 이 도구의 결과는 GitHub README와 거의 동일하게 렌더링됩니다." },
      { q: "수식(LaTeX)도 됩니까?", a: "본 도구는 기본 GFM만 지원합니다. 수식이 필요하면 [마크다운 + 수식] 도구를 사용하세요." },
      { q: "HTML 소스로 복사 가능한가요?", a: "네. 미리보기 결과의 HTML을 그대로 복사할 수 있습니다. 워드프레스·티스토리 같은 블로그에 HTML 모드로 붙여넣기 좋습니다." },
      { q: "코드 블록 syntax highlighting도 되나요?", a: "기본적인 코드 펜스(```)는 지원되며, 일부 언어 하이라이트가 적용됩니다." },
      { q: "이미지를 첨부하면 어떻게 표시되나요?", a: "![alt](url) 문법으로 이미지 링크를 넣으면 미리보기에 표시됩니다. 외부 URL이 필요해요." },
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
      "자주 틀리는 한국어 표현 100여 개를 즉시 검사합니다. 외부 서버 없이 브라우저 안에서 처리되며 텍스트는 전송되지 않습니다. 빠른 1차 점검에 적합하며, 카톡·메일·블로그·SNS 글 검토에 자주 쓰입니다. 초중급 가이드용이라 문맥이 필요한 오류는 잡지 못합니다.",
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
      { q: "내 글이 저장되거나 전송되나요?", a: "아니요. 검사 전 과정이 브라우저 안에서만 일어나며 어디로도 전송되지 않습니다. 영업비밀·개인사 같은 민감한 글도 안심하고 검사할 수 있습니다." },
      { q: "어떤 오류를 잡나요?", a: "'되/돼', '이/히' 부사, '안/않', '맞히다/맞추다', '데/대' 등 한국어 사용자가 자주 헷갈리는 표현 중심입니다." },
      { q: "전문 검사가 필요한 경우?", a: "공식 문서·중요 글이라면 (1) 부산대 우리말 배움터(개인용 무료), (2) 네이버 맞춤법 검사기(웹 직접), (3) 한컴오피스 내장 검사기 등을 추가로 거치세요." },
      { q: "ChatGPT 같은 AI 검사와 비교?", a: "AI는 문맥 파악 능력이 뛰어나지만 가끔 잘못된 수정을 제안합니다. 이 도구는 확실한 오류만 검출해 오탐이 적습니다." },
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
      "$x^2 + y^2 = 1$ 같은 LaTeX 수식이 포함된 마크다운을 실시간으로 렌더링합니다. KaTeX 기반이며 PDF로 출력할 수 있어 논문 초안·수업 자료에 적합합니다. 수학·물리·공학·경제 논문 작성, 강의 노트 정리, 통계 보고서, 학생 과제 제출용으로 자주 쓰입니다.",
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
      { q: "PDF 화질이 깨지나요?", a: "수식이 SVG/HTML로 렌더링되어 PDF에서 벡터 품질로 저장됩니다. 인쇄용으로도 깨끗합니다." },
      { q: "GitHub README에도 수식 렌더링되나요?", a: "GitHub는 2022년부터 마크다운에 LaTeX 수식을 지원합니다. 이 도구로 미리보기하고 그대로 README에 붙여넣으면 됩니다." },
      { q: "옵시디언·노션과 비교?", a: "노션은 LaTeX 수식을 부분 지원하고, 옵시디언은 거의 완벽 지원합니다. 이 도구는 가벼운 단발 작성·미리보기 용도입니다." },
      { q: "수식 작성이 어려워요. 도와줄 도구?", a: "[수식 빌더] 도구로 버튼 클릭만으로 LaTeX 코드를 만들 수 있습니다. 그 결과를 이 도구의 마크다운에 붙여넣으면 됩니다." },
      { q: "이미지도 함께 넣을 수 있나요?", a: "마크다운의 ![alt](url) 문법으로 외부 이미지 링크가 가능합니다. 다만 PDF 출력 시 이미지가 안 보이면 브라우저 캐시·CORS 설정을 확인하세요." },
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
      "두 텍스트를 나란히 비교해 추가·삭제·변경된 부분을 표시합니다. 코드 리뷰·문서 변경 추적, 계약서 수정 사항 확인, 번역본 대조, 표절 의심 부분 비교, 이력서 버전 관리에 자주 쓰입니다.",
    metaDescription:
      "텍스트 두 개 무료 비교(diff). 라인·단어 단위 차이 표시, 색상 하이라이트.",
    howTo: [
      "왼쪽·오른쪽에 비교할 텍스트를 붙여넣습니다.",
      "줄 단위 또는 단어 단위 모드를 선택합니다.",
      "차이가 색상으로 표시됩니다.",
    ],
    faq: [
      { q: "어떤 알고리즘을 쓰나요?", a: "표준 Myers diff 알고리즘 기반의 `diff` 라이브러리를 사용합니다. Git·VSCode 등과 동일한 표준입니다." },
      { q: "줄 단위 vs 단어 단위 어느 게 좋아요?", a: "코드는 줄 단위가 깔끔하고, 문장·산문은 단어 단위가 더 세밀하게 차이를 보여줍니다." },
      { q: "긴 문서도 비교 가능한가요?", a: "수만 줄까지 즉시 처리됩니다. 다만 단어 단위는 메모리를 더 쓰니 짧은 문장에 적합합니다." },
      { q: "Git diff와 결과가 다른 이유?", a: "Git은 컨텍스트 라인(앞뒤 몇 줄)을 함께 보여주고, 이 도구는 변경 부분만 하이라이트합니다. 본질적 알고리즘은 같습니다." },
      { q: "이미지/PDF는 비교 안 되나요?", a: "텍스트 전용입니다. 이미지는 [이미지 Before/After 슬라이더], PDF는 텍스트 추출 후 비교를 권장합니다." },
      { q: "차이를 GitHub Pull Request처럼 공유할 수 있나요?", a: "현재는 화면에만 표시됩니다. 스크린샷을 캡처하거나 결과를 복사해서 공유하세요." },
    ],
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
      "여러 줄 텍스트에서 중복된 줄을 제거하세요. 대소문자 무시·공백 무시 옵션, 빈 줄 제거 옵션 지원. 이메일 명단 중복 제거, 데이터 클렌징, 단어 사전 정리, 로그 분석, 중복 URL 제거에 자주 쓰입니다.",
    metaDescription:
      "텍스트 중복 라인 무료 제거. 대소문자·공백 무시 옵션, 즉시 처리.",
    howTo: ["텍스트를 입력합니다.", "옵션을 선택합니다 (대소문자/공백 무시).", "결과를 복사합니다."],
    faq: [
      { q: "줄 순서가 유지되나요?", a: "네. 원본의 첫 등장 순서가 보존됩니다. 정렬이 필요하면 [줄 정렬] 도구를 이어 쓰세요." },
      { q: "엑셀 중복 제거와 비교하면?", a: "엑셀 '중복된 항목 제거'와 같은 동작이지만, 별도 옵션(대소문자·공백 무시) 처리가 더 편합니다. 짧은 작업에 빠릅니다." },
      { q: "이메일 'a@x.com'과 'A@X.com'을 같다고 처리?", a: "대소문자 무시 옵션을 켜면 같은 이메일로 인식해 하나만 남깁니다." },
      { q: "빈 줄도 제거되나요?", a: "옵션으로 빈 줄 일괄 제거가 가능합니다. 데이터 정리할 때 유용합니다." },
      { q: "여러 단어를 한 줄에 넣어도 됩니까?", a: "이 도구는 '줄(line)' 단위로 비교합니다. 한 줄에 여러 단어가 있으면 그 줄 전체가 같아야 중복 처리됩니다." },
      { q: "엑셀 명단 정리에 쓸 수 있나요?", a: "엑셀 한 열을 복사해 붙여넣으면 됩니다. 결과를 다시 엑셀로 가져가도 깔끔합니다." },
    ],
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
      "생년월일을 입력하면 만나이·세는 나이·연 나이를 동시에 보여줍니다. 2023년 6월 시행 만나이 통일법 기준. 행정 서류 작성, 의료 처방, 보험 가입, 입사 지원, 술·담배 구매 연령 확인 등 일상에서 자주 필요합니다.",
    metaDescription:
      "만나이 계산기 무료. 만나이·세는 나이·연 나이 한 번에, 2023년 법 기준.",
    howTo: ["생년월일을 선택합니다.", "기준 날짜 (보통 오늘)를 선택합니다.", "세 가지 나이가 자동 계산됩니다."],
    faq: [
      { q: "만나이가 뭔가요?", a: "생일을 기준으로 세는 나이입니다. 0살로 태어나 생일마다 1살씩 추가됩니다. 2023년 6월부터 한국 법령상 공식 나이가 만나이로 통일되었습니다." },
      { q: "세는 나이는요?", a: "태어나자마자 1살이고 1월 1일마다 모두 1살씩 더하는 전통 한국 나이 셈법입니다. 만나이 통일법 시행 후 점차 사라지는 추세입니다." },
      { q: "연 나이는 또 뭐예요?", a: "현재 연도 - 출생 연도. 생일 상관없이 계산. 음주·청소년보호법 같은 일부 법령에서 사용됩니다." },
      { q: "병역 의무·국민연금은 어떤 나이 기준?", a: "병역 의무는 연 나이(출생연도 기준), 국민연금 수령·기초연금은 만나이 기준입니다. 헷갈리니 확인이 필요합니다." },
      { q: "직장 호칭은 어떻게 변하나요?", a: "법적으로는 만나이지만 일상 회화·서열은 여전히 세는 나이 기준이 많아 혼재합니다. 통일까지 시간이 걸릴 듯합니다." },
      { q: "정년·은퇴 나이는?", a: "만 60세 정년이 법적 기준입니다. 회사 내규에 따라 차이가 있을 수 있어요." },
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
      "한국 음력과 양력 날짜를 양방향으로 변환합니다. 1391~2050년 범위, 윤달(閏月) 처리, 간지 표시. 부모님·조부모님 음력 생일을 양력으로, 제사일 양력 환산, 설·추석 같은 음력 명절 날짜 확인, 사주·궁합 입력에 자주 쓰입니다.",
    metaDescription:
      "한국 음력 양력 변환 무료. 윤달·간지 지원, 1391~2050년.",
    howTo: ["변환 방향과 날짜를 선택합니다.", "결과가 자동 표시됩니다."],
    faq: [
      { q: "왜 1391~2050년만 되나요?", a: "한국 음력 데이터의 정확한 표준 범위입니다. 이 범위 밖은 천문 계산이 부정확할 수 있어 제한합니다." },
      { q: "윤달이 뭐예요?", a: "음력은 양력보다 1년에 약 11일 짧아 2~3년에 한 번씩 같은 달을 한 번 더 끼웁니다. 그 추가된 달을 윤달(閏月)이라고 합니다." },
      { q: "음력 생일과 양력 생일이 매년 다르네요?", a: "음력 생일은 양력 기준으로 매년 다른 날짜에 옵니다. 부모님 음력 생신을 양력 캘린더에 넣으려면 매년 변환이 필요합니다." },
      { q: "한식·단오·동지 같은 절기도 됩니까?", a: "절기는 24절기로 양력 기준이라 매년 거의 같은 날짜입니다. 음력 변환과는 별개입니다." },
      { q: "북한 음력도 같나요?", a: "한국과 북한은 모두 동일한 동아시아 음력을 사용합니다. 중국·베트남도 거의 같지만 미세한 차이가 있을 수 있어요." },
      { q: "조부모님이 음력 생신을 양력 X월에 한다고 하시는데?", a: "음력 생신 → 양력 변환은 매년 다른 결과입니다. 변환된 양력 날짜로 캘린더에 매년 다시 등록하거나, 음력을 그대로 인식하는 캘린더 앱을 쓰세요." },
    ],
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
      "텍스트를 시저(카이사르) 방식으로 암호화·복호화합니다. ROT13·ROT47 사전 설정과 1~25 사용자 지정 회전. CTF 문제 풀이, 인터넷 게시판 스포일러 숨기기, 코딩 학습용 암호 입문, 재미용 메시지 변환에 자주 쓰입니다.",
    metaDescription:
      "시저 암호 무료. ROT13·ROT47·1~25 회전, 양방향 변환.",
    howTo: ["텍스트를 입력합니다.", "회전 값을 선택합니다 (13이면 ROT13).", "암호화된 결과가 즉시 표시됩니다."],
    faq: [
      { q: "보안용으로 쓸 수 있나요?", a: "시저 암호는 즉시 깨지는 약한 암호입니다. 농담·퀴즈·게임용으로만 쓰세요. 실제 보안에는 AES·RSA 같은 현대 암호가 필요합니다." },
      { q: "ROT13이 뭐예요?", a: "13자리 회전한 시저 암호. 자기 자신이 역함수라 같은 변환을 두 번 적용하면 원본으로 돌아갑니다. 인터넷 게시판에서 스포일러 숨기는 데 흔히 사용됩니다." },
      { q: "ROT47은요?", a: "ASCII 문자 33~126 범위(영문·숫자·기호)를 47만큼 회전. 영문만 회전하는 ROT13과 달리 거의 모든 출력 가능 문자에 적용됩니다." },
      { q: "어떤 회전 값이 적용됐는지 모를 때?", a: "[ROT 전체 보기] 도구로 1~25 모든 회전 결과를 한 번에 볼 수 있습니다. CTF·퀴즈 풀 때 유용." },
      { q: "한글에도 시저가 됩니까?", a: "한글은 자모가 24개라 시저 방식이 정확히 정의되지 않습니다. 본 도구는 영문·숫자 중심으로 작동합니다." },
      { q: "역사적으로 누가 만들었나요?", a: "고대 로마의 율리우스 카이사르가 3자리 회전으로 군사 메시지를 암호화한 것에서 유래했습니다." },
    ],
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
      "HTTP 응답 상태 코드 100~599의 의미를 검색하세요. 표준(RFC) 코드 + 자주 쓰이는 비표준 코드(418, 429 등). API 디버깅, 에러 화면 분석, 백엔드 응답 설계, 면접 준비, 웹 개발 학습에 자주 쓰입니다.",
    metaDescription:
      "HTTP 상태 코드 사전 무료. 200/301/404/500 등 의미와 사용 예시.",
    howTo: ["코드 번호나 키워드로 검색합니다.", "각 코드별 의미와 사용 예시가 표시됩니다."],
    faq: [
      { q: "어떤 코드가 포함되나요?", a: "RFC 9110 표준 + 자주 쓰이는 비표준(418 I'm a teapot, 429 Too Many Requests 등) 모두 포함됩니다." },
      { q: "2xx vs 3xx vs 4xx vs 5xx 차이?", a: "2xx 성공, 3xx 리다이렉트, 4xx 클라이언트 오류, 5xx 서버 오류. 일반적으로 4xx는 사용자/요청 문제, 5xx는 서버 자체 문제입니다." },
      { q: "401 vs 403 차이?", a: "401(Unauthorized)은 인증 자체가 안 됨(로그인 필요), 403(Forbidden)은 인증은 됐지만 권한이 없음. 헷갈리지 마세요." },
      { q: "404가 가장 흔한가요?", a: "사용자가 보는 에러로는 404가 흔하지만, 서비스 운영 측면에선 502/503/504 같은 게이트웨이 오류가 더 골치 아픕니다." },
      { q: "왜 418 Teapot이 있어요?", a: "1998년 만우절 농담 RFC였다가 표준에 남았습니다. 실제 사용은 거의 없지만 일부 서비스가 장난스럽게 사용합니다." },
      { q: "200이지만 응답이 빈 거면 정상?", a: "HTTP 측면에서는 정상이지만 비즈니스 로직 측면에선 빈 응답이 문제가 될 수 있습니다. 코드만 보지 말고 본문도 확인하세요." },
    ],
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
      "색상 stop을 추가/조절하며 linear·radial 그라데이션을 시각적으로 만들고 CSS 코드를 받으세요. 미리보기 실시간 반영. 웹사이트 배경, 버튼 디자인, 카드 UI 헤더, 모바일 앱 그라데이션, 마케팅 페이지 배경에 자주 쓰입니다.",
    metaDescription:
      "CSS 그라데이션 무료 생성기. linear/radial, 다중 색상 stop, 실시간 미리보기.",
    howTo: ["타입(linear/radial)과 각도를 정합니다.", "색상 stop을 추가/조절합니다.", "결과 CSS를 복사합니다."],
    faq: [
      { q: "복잡한 conic-gradient도 가능한가요?", a: "현재는 linear / radial만 지원합니다. conic-gradient(원형 시계방향)는 별도 입력 필요." },
      { q: "두 색 vs 세 색 이상 차이?", a: "두 색은 단순하고 깔끔, 세 색 이상은 더 풍부한 표현. 다만 너무 많으면 더러워 보이니 3~4색 이내 권장." },
      { q: "어떤 각도가 좋아요?", a: "135도(왼쪽 위 → 오른쪽 아래)가 가장 자연스럽고 흔합니다. 90도(왼→오) 또는 180도(위→아래)도 깔끔합니다." },
      { q: "투명한 그라데이션도 됩니까?", a: "각 색상 stop의 alpha(rgba)를 조절하면 됩니다. 글자 위에 어두운 그라데이션 오버레이 만들 때 유용." },
      { q: "다크 모드용 그라데이션 팁?", a: "어두운 톤(#1a1a2e → #16213e 등)이 잘 어울립니다. 너무 어둡지 않게 약간 채도를 줘야 평면적이지 않습니다." },
      { q: "구버전 브라우저 지원?", a: "현대 브라우저는 모두 표준 CSS gradient를 지원합니다. IE 같은 구버전이 필요하면 -webkit-, -moz- 같은 vendor prefix가 필요합니다." },
    ],
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
      "10진수, 2진수, 8진수, 16진수 사이를 즉시 변환하세요. 음수·소수도 지원, 자릿수 자동 그룹화. 코딩·CS 학습, 색상 코드(#RRGGBB) 분석, IP 주소 변환, 비트 연산 디버깅, 어셈블리 학습에 자주 쓰입니다.",
    metaDescription:
      "진법 변환 무료. 10/2/8/16 진수 양방향 변환, 음수·소수 지원.",
    howTo: ["변환할 숫자를 입력하고 입력 진법을 선택합니다.", "다른 진법의 값이 자동 계산됩니다."],
    faq: [
      { q: "음수도 변환되나요?", a: "네. 2's complement는 아니고 부호 표시 방식입니다. CS 학습용 2's complement가 필요하면 별도 계산이 필요합니다." },
      { q: "16진수가 왜 코딩에 자주 쓰여요?", a: "1바이트(8비트)를 2자리로 표현할 수 있어 메모리·색상 코드 표기에 효율적입니다. 0~FF가 0~255와 일치." },
      { q: "8진수는 어디 써요?", a: "리눅스 파일 권한(755·644 등), 이스케이프 문자(\\077 등)에 주로 사용. 일상 코딩에선 거의 안 씁니다." },
      { q: "왜 컴퓨터는 2진수를 쓰나요?", a: "전기 신호 ON/OFF로 0·1 두 상태를 가장 안정적으로 구분할 수 있어서입니다. 3진수·4진수도 이론적으로 가능하지만 정확도 문제로 사용 안 함." },
      { q: "큰 숫자도 변환되나요?", a: "JavaScript 안전 정수 범위(2^53)까지 안정적입니다. 그 이상은 BigInt 모드 또는 별도 도구가 필요합니다." },
      { q: "소수도 변환 가능?", a: "네. 0.5(10진) = 0.1(2진) 같은 변환을 자동으로 합니다. 다만 0.1(10진)처럼 2진에서 무한순환소수가 되는 경우는 반올림됩니다." },
    ],
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
      "&, <, >, \", ' 같은 특수문자를 &amp; &lt; &gt; 같은 HTML 엔티티로 변환하거나 디코딩하세요. 한글·이모지의 숫자 엔티티도 지원. 블로그 코드 예시 안전 표기, XSS 방지 인코딩, 이메일 HTML 작성, 사이트맵·RSS 검증에 자주 쓰입니다.",
    metaDescription:
      "HTML 엔티티 인코더/디코더 무료. & < > \" ' 변환, 숫자 엔티티(한글·이모지) 지원.",
    howTo: ["텍스트를 입력하고 방향을 선택합니다.", "결과를 복사합니다."],
    faq: [
      { q: "왜 HTML 엔티티가 필요한가요?", a: "HTML 안에 직접 들어가면 깨지는 글자(< > & 등)를 안전하게 표시하기 위한 표기 방식입니다." },
      { q: "이름 엔티티 vs 숫자 엔티티?", a: "&amp;처럼 이름으로 쓰거나 &#38;처럼 숫자(코드포인트)로 쓸 수 있습니다. 둘 다 결과는 같습니다." },
      { q: "한글도 엔티티가 있나요?", a: "한글은 숫자 엔티티(&#44032; = '가') 형태만 사용됩니다. 이름 엔티티는 영문 특수문자에만 있어요." },
      { q: "XSS 방어에 충분한가요?", a: "기본 방어로 시작은 좋지만 완전하지 않습니다. 컨텍스트(HTML/JS/CSS/URL)별로 다른 인코딩이 필요해 보안 라이브러리(DOMPurify 등)를 권장합니다." },
      { q: "이메일 HTML에 왜 엔티티가 많이 보여요?", a: "이메일 클라이언트마다 인코딩 처리가 다르고 안전을 위해 모든 특수문자를 엔티티로 미리 변환하는 관행입니다." },
      { q: "디코딩하니 깨진 글자가 보여요. 왜?", a: "이중 인코딩(엔티티가 또 엔티티화) 상태이거나, 잘못된 엔티티 번호일 수 있습니다." },
    ],
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
      "비밀번호의 길이·문자 종류·예측 가능성을 점수화해 강도를 평가합니다. 흔한 패스워드·반복 패턴·키보드 시퀀스도 감지. 새 계정 만들 때 안전한 비밀번호 점검, 회사 보안 정책 통과 여부 확인, 보안 의식 학습에 자주 쓰입니다.",
    metaDescription:
      "비밀번호 강도 무료 검사. 길이·문자 종류·흔한 패턴 분석, 즉시 점수.",
    howTo: ["검사할 비밀번호를 입력합니다.", "강도 점수와 개선 제안이 실시간 표시됩니다."],
    faq: [
      { q: "입력한 비밀번호가 저장되나요?", a: "아니요. 평가가 전부 브라우저 안에서만 일어나고 외부로 전송되지 않습니다. 네트워크 탭에서 확인 가능." },
      { q: "강한 비밀번호 기준?", a: "(1) 12자 이상, (2) 대소문자+숫자+특수문자 혼합, (3) 사전 단어·키보드 패턴 없음, (4) 다른 사이트 비번 재사용 안 함." },
      { q: "왜 사전 단어를 피하라고 하나요?", a: "공격자는 사전 공격(dictionary attack)을 자주 씁니다. 'password', '123456', '서울', 본인 이름·생일은 가장 위험합니다." },
      { q: "패스프레이즈(긴 문장)도 안전한가요?", a: "네. 'correct horse battery staple' 같은 4단어 무작위 조합이 짧은 복잡 비밀번호보다 안전합니다. 다만 의미 없는 단어 조합이어야 합니다." },
      { q: "두 가지 인증(2FA)도 필요?", a: "강력한 비밀번호 + 2FA가 가장 안전합니다. 비번이 유출되어도 2FA가 막아줍니다. 중요한 계정엔 반드시 설정하세요." },
      { q: "비밀번호 관리자가 좋다는데?", a: "1Password·Bitwarden·KeePass 같은 관리자를 쓰면 각 사이트마다 다른 강력한 비번을 안전하게 보관할 수 있습니다." },
    ],
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
      "글자색·배경색의 명도 대비비를 계산하고 WCAG AA/AAA 기준 통과 여부를 알려줍니다. 디자인 접근성 검수, 정부·공공기관 사이트(접근성 필수), 시각장애 사용자 배려, 모바일 가독성 확인에 자주 쓰입니다.",
    metaDescription:
      "WCAG 색 대비 무료 검사. 명도비·AA/AAA 통과 여부, 미리보기.",
    howTo: ["글자색·배경색을 고릅니다.", "대비비와 통과 기준이 즉시 표시됩니다."],
    faq: [
      { q: "기준이 뭐예요?", a: "WCAG 2.1에서 일반 텍스트는 AA 4.5:1, AAA 7:1. 큰 텍스트(18pt 이상)는 AA 3:1, AAA 4.5:1입니다." },
      { q: "AA vs AAA 차이?", a: "AA는 표준 권장, AAA는 더 엄격한 기준입니다. 정부·공공기관은 보통 AA를 의무로 합니다." },
      { q: "왜 디자인에 중요한가요?", a: "시각장애·노안·색약·저조도 환경(야외 햇빛)에서 가독성을 보장합니다. 일반 사용자에게도 편안한 화면이 됩니다." },
      { q: "회색 글자에 흰 배경이 왜 안 좋아요?", a: "디자인은 깔끔해 보이지만 대비가 낮아 시각 약자가 읽기 어렵습니다. 본문 텍스트는 #767676 이상 대비 필요." },
      { q: "한국에서 법적 의무인가요?", a: "공공기관·정부 사이트는 '장애인차별금지법'과 'KS X 6385' 기준으로 접근성 의무 적용. 민간도 사회적 책임으로 권장됩니다." },
      { q: "색맹 디자인도 별도로 확인?", a: "본 도구는 명도 대비만 봅니다. 색맹 시뮬레이션이 필요하면 별도 도구·디자이너 도구(Figma 플러그인 등)를 쓰세요." },
    ],
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
      "Web Crypto의 안전한 난수로 로또 6/45 번호를 생성합니다. 여러 게임 한 번에 뽑기, 제외 번호 설정 가능. 매주 로또 자동 추첨 보조, 회사 송년회 게임 번호, 학교·동호회 추첨 등에 자주 쓰입니다.",
    metaDescription:
      "로또 번호 생성기 무료. Web Crypto 기반 안전 난수, 다중 게임, 제외 번호 옵션.",
    howTo: ["게임 수와 제외할 번호를 선택합니다.", "생성 버튼을 누르면 6자리씩 자동 추출됩니다."],
    faq: [
      { q: "당첨률이 올라가나요?", a: "아닙니다. 추첨은 완전 무작위라 어떤 번호 조합도 동일한 확률(약 814만분의 1)입니다. 재미로만 쓰세요." },
      { q: "왜 'Web Crypto'를 강조하나요?", a: "일반 Math.random()보다 통계적으로 균등한 난수를 제공해 패턴 편향이 없습니다. 안전한 추첨이 필요한 환경에 적합." },
      { q: "특정 번호를 빼고 뽑을 수 있나요?", a: "네. '제외 번호'에 본인이 빼고 싶은 번호(예: 13, 23)를 입력하면 그 번호는 추첨되지 않습니다." },
      { q: "고정 번호도 정할 수 있어요?", a: "도구 옵션에 따라 다릅니다. 자주 등장하는 번호 5개 + 자동 1개 같은 방식이 가능할 수도 있어요." },
      { q: "한 번에 몇 게임까지 뽑을 수 있나요?", a: "5게임(한 판 최대) 또는 그 이상. 제한 없이 여러 번 누르면 됩니다." },
      { q: "역대 당첨 번호 통계 분석은?", a: "이 도구는 단순 무작위 추첨이라 통계 분석은 없습니다. 다만 무작위 분석상 어떤 패턴도 미래를 예측하지는 못합니다." },
    ],
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
      "JSON을 보기 좋게 정렬하거나 한 줄로 압축하세요. 문법 오류를 알려주고, 키 정렬 옵션도 지원합니다. API 응답 디버깅, 설정 파일 검토, log·monitoring 데이터 분석, 외부 데이터 소스 정리에 자주 쓰입니다.",
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
      { q: "주석(comment)이 있는 JSON5도 됩니까?", a: "표준 JSON은 주석을 허용하지 않습니다. JSON5·JSONC는 별도 파서가 필요해 미지원입니다." },
      { q: "어디서 오류가 났는지 알 수 있나요?", a: "네. 오류 위치(줄·열)와 원인 메시지가 표시됩니다. 누락된 따옴표·콤마·중괄호를 빠르게 찾을 수 있어요." },
      { q: "키를 알파벳 순으로 정렬할 수 있나요?", a: "네. 정렬 옵션을 켜면 모든 키를 알파벳 순으로 재배열합니다. diff·git 비교 시 일관성을 위해 유용합니다." },
      { q: "압축하면 얼마나 줄어드나요?", a: "공백·줄바꿈 제거로 보통 20~40% 감소. 큰 JSON 응답을 전송할 때 효율적." },
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
      "URL에 들어갈 한글·특수문자를 퍼센트 인코딩으로 변환하거나 디코딩하세요. encodeURIComponent / encodeURI 모드 지원. API 호출 쿼리스트링 작성, 검색 URL 분석, 한글 깨진 URL 복구, 웹 디버깅에 자주 쓰입니다.",
    metaDescription:
      "URL 퍼센트 인코딩 무료 변환. encodeURIComponent / encodeURI 모드, 한글 지원.",
    howTo: [
      "왼쪽에 텍스트/URL을 입력합니다.",
      "인코딩 또는 디코딩 버튼을 누릅니다.",
      "결과를 복사합니다.",
    ],
    faq: [
      { q: "encodeURI와 encodeURIComponent 차이가 뭔가요?", a: "encodeURI는 URL 전체용이라 ':/?#&=' 같은 구분자를 보존합니다. encodeURIComponent는 쿼리스트링 값용으로 모든 특수문자를 인코딩합니다." },
      { q: "왜 한글 URL이 %EA%B0%80 같이 보여요?", a: "URL 표준은 ASCII만 허용해 비ASCII 문자(한글·이모지)는 UTF-8 바이트별로 %XX 형태로 인코딩됩니다. 한글 1자 = 3바이트 = 9개의 %." },
      { q: "어떤 글자가 인코딩되나요?", a: "공백, 한글, 한자, 이모지, !#$&'()*+,/:;=?@[] 같은 예약 문자들이 인코딩됩니다." },
      { q: "쿼리스트링 작성 시 어느 모드?", a: "encodeURIComponent를 쓰는 게 안전합니다. encodeURI는 = & ? 같은 구조 문자를 보존해서 의도와 달라질 수 있어요." },
      { q: "URL이 너무 길어요. 줄일 수 있나요?", a: "퍼센트 인코딩은 글자를 줄이지 못합니다. 다만 [텍스트 압축] 도구로 일부 파라미터를 압축할 수 있습니다." },
      { q: "디코딩 시 깨지는 이유?", a: "이중 인코딩(이미 인코딩된 것을 또 인코딩)됐거나, UTF-8 외 인코딩(EUC-KR 등)으로 인코딩된 URL일 수 있습니다." },
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
      "텍스트나 파일의 SHA-256·SHA-512·SHA-1·MD5 해시를 즉시 계산하세요. 무결성 검증·체크섬에 사용합니다. 다운로드 파일의 무결성 확인, 백업 파일 검증, API 시그니처 비교, 보안 학습에 자주 쓰입니다.",
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
      { q: "비밀번호 해싱에 SHA-256을 써도 되나요?", a: "안 됩니다. SHA-256은 빠른 해시라 무차별 대입 공격에 취약합니다. 비번 해싱엔 bcrypt·Argon2·scrypt를 쓰세요. ([bcrypt 해시] 도구 참고)" },
      { q: "큰 파일도 계산되나요?", a: "수백 MB 파일도 처리 가능합니다. 다만 메모리에 올리는 만큼 큰 파일은 시간이 걸립니다." },
      { q: "왜 텍스트와 파일 해시가 달라요?", a: "같은 내용이어도 줄바꿈 코드(\\n vs \\r\\n), 끝 공백, 인코딩 차이로 해시가 다를 수 있습니다." },
      { q: "체크섬(checksum)도 같은 건가요?", a: "체크섬은 단순 오류 검증용(CRC32 등), 해시는 보안용으로 더 강력합니다. 두 용도 모두 SHA-256으로 통일해서 써도 됩니다." },
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
      "암호학적으로 안전한 UUID v4를 한 번에 여러 개 생성하세요. 하이픈 포함/제외, 대문자 옵션 지원. 데이터베이스 PK, API 식별자, 임시 토큰, 추적 ID, 파일명 충돌 방지 등 다양한 개발 시나리오에 자주 쓰입니다.",
    metaDescription:
      "UUID v4 무료 생성. 다중 생성, 하이픈 옵션, Web Crypto 기반.",
    howTo: ["생성할 개수를 입력합니다.", "옵션을 선택합니다 (하이픈/대문자).", "복사 버튼으로 결과를 가져갑니다."],
    faq: [
      { q: "UUID v4가 정말 고유한가요?", a: "수학적으로 122비트 랜덤이라 충돌 확률이 무시할 수준입니다. 안전한 난수원(Web Crypto)을 사용합니다." },
      { q: "v1·v3·v5·v7과 차이?", a: "v4는 순수 랜덤. v1은 시간+MAC, v7은 시간+랜덤(정렬 가능). 일반 용도엔 v4가 가장 흔합니다." },
      { q: "DB PK로 UUID 쓰면 단점?", a: "정수 PK보다 저장 공간이 크고(16바이트), 인덱스 스캔이 약간 느립니다. 대규모 분산 시스템·MSA에 적합." },
      { q: "보안 토큰으로 써도 되나요?", a: "v4는 안전한 난수라 토큰 용도로 가능합니다. 다만 더 짧은 토큰이 필요하면 [랜덤 문자열] 도구를 쓰세요." },
      { q: "하이픈을 빼는 이유?", a: "URL에 넣을 때 짧게, 데이터베이스 BIN(16) 저장 시 효율적이라 등의 이유로 가끔 하이픈을 뺍니다." },
      { q: "한 번에 몇 개까지 생성 가능?", a: "기술적 제한은 없지만 보통 1~1000개. 매우 많은 ID가 필요하면 서버 측에서 일괄 생성을 권장합니다." },
    ],
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
      "Unix 타임스탬프(초 또는 밀리초)를 사람이 읽는 날짜·시간으로 변환하고, 그 반대도 가능합니다. ISO 8601, 로컬, UTC 표시 모두 지원. 데이터베이스 로그 분석, API 디버깅, 쿠키·JWT 만료 확인, 시간대 변환 작업에 자주 쓰입니다.",
    metaDescription:
      "Unix 타임스탬프 변환기. 초·밀리초 ↔ ISO/로컬/UTC, 현재 시각 즉시 표시.",
    howTo: [
      "타임스탬프 또는 날짜를 입력합니다.",
      "단위(초/밀리초)와 표시 형식(로컬/UTC/ISO)을 선택합니다.",
      "결과가 즉시 표시됩니다.",
    ],
    faq: [
      { q: "초와 밀리초 차이가 뭔가요?", a: "Unix 표준은 초(10자리), JavaScript Date는 밀리초(13자리)를 씁니다. 자릿수로 자동 감지합니다." },
      { q: "왜 Unix 타임스탬프를 쓰나요?", a: "시간대·로케일 독립적으로 시각을 표현하는 표준입니다. 1970년 1월 1일 UTC를 0으로 잡고 경과 초로 계산." },
      { q: "2038년 문제가 뭐예요?", a: "32비트 정수로 초 단위를 표현하면 2038년 1월 19일 03:14:08 UTC에 오버플로가 납니다. 64비트로 전환된 시스템은 안전." },
      { q: "현재 시각의 타임스탬프?", a: "도구가 자동으로 '지금'을 표시해줍니다. 새로고침할 때마다 갱신됩니다." },
      { q: "타임존이 어떻게 적용되나요?", a: "타임스탬프 자체는 UTC 기준 절대 시각이며, 표시할 때 브라우저 시간대(한국은 KST)로 변환됩니다." },
      { q: "JSON에서 자주 보는 ISO 8601 형식?", a: "2026-05-17T15:30:00.000Z 같은 표준 표기. 'Z'는 UTC 시간을 의미합니다." },
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
      "이미지를 Base64 data URL로 인코딩하거나, data URL을 다시 이미지로 디코딩하세요. CSS·이메일에 이미지 인라인 임베드, SVG 아이콘 인라인, React 컴포넌트 안에 이미지 포함, 작은 아이콘 캐싱 회피에 자주 쓰입니다.",
    metaDescription:
      "이미지 ↔ Base64 무료 변환. data URL 생성, CSS·이메일 인라인 이미지용.",
    howTo: [
      "이미지를 업로드하면 Base64 data URL이 자동 생성됩니다.",
      "반대로 data URL을 붙여넣으면 이미지로 미리보기 됩니다.",
      "복사 버튼으로 결과를 가져갑니다.",
    ],
    faq: [
      { q: "data URL 용량은 원본보다 큰가요?", a: "Base64는 약 33% 용량이 증가합니다. 인라인 임베드 외에는 보통 외부 파일이 더 효율적입니다." },
      { q: "언제 인라인이 좋아요?", a: "(1) 매우 작은 아이콘(<5KB), (2) HTTP 요청 줄이고 싶을 때, (3) 이메일에 이미지 첨부 없이 보낼 때." },
      { q: "큰 이미지를 Base64로 쓰면?", a: "용량 증가 + 캐싱 안 됨 + HTML/CSS 파일이 비대해집니다. 큰 이미지는 외부 파일이 좋습니다." },
      { q: "data URL이 페이지에서 작동 안 해요. 왜?", a: "(1) 길이 제한 — 일부 브라우저가 매우 긴 data URL을 못 다룸, (2) Content Security Policy(CSP)가 data URL을 막을 수 있음." },
      { q: "이메일에 이미지 첨부 대신 인라인으로 쓰면?", a: "Gmail·아웃룩 등 일부 메일 클라이언트는 보안상 인라인 이미지를 차단합니다. 신뢰성을 위해 첨부도 함께 권장." },
      { q: "SVG도 Base64가 좋아요?", a: "SVG는 원본 텍스트가 더 짧을 때가 많아 'data:image/svg+xml,...' 형식(Base64 없이)이 더 효율적입니다." },
    ],
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
      "CSV 데이터를 JSON 배열로, JSON 배열을 CSV로 변환하세요. 첫 줄을 헤더로 인식하며 따옴표·쉼표가 포함된 값도 정상 처리합니다. 엑셀 데이터 API 입력, 보고서 데이터 처리, DB 백업 정리, 데이터 마이그레이션에 자주 쓰입니다.",
    metaDescription:
      "CSV ↔ JSON 무료 변환. 헤더 자동 인식, 인용 처리, 양방향 변환.",
    howTo: [
      "CSV 또는 JSON 텍스트를 붙여넣습니다.",
      "방향(CSV→JSON / JSON→CSV)을 선택합니다.",
      "결과를 복사하거나 .csv·.json 파일로 다운로드합니다.",
    ],
    faq: [
      { q: "어떤 구분자를 지원하나요?", a: "기본은 쉼표(,)이고, 설정에서 탭(\\t)·세미콜론(;)으로 바꿀 수 있습니다. TSV(탭 구분)도 처리 가능." },
      { q: "엑셀 데이터를 그대로 붙여넣을 수 있나요?", a: "엑셀 셀을 복사하면 탭 구분 TSV가 됩니다. 구분자를 탭으로 설정하면 그대로 변환됩니다." },
      { q: "한글이 깨져요. 왜?", a: "CSV 파일이 EUC-KR/CP949 인코딩이면 깨질 수 있습니다. [텍스트 인코딩 변환] 도구로 UTF-8로 바꾼 뒤 시도하세요." },
      { q: "큰 CSV도 처리되나요?", a: "수만 줄까지는 무리 없습니다. 매우 큰 파일(수십 MB+)은 브라우저 메모리 부담이 커집니다." },
      { q: "JSON 중첩 객체를 CSV로 변환하면?", a: "중첩 키는 평탄화되거나 JSON 문자열로 들어갑니다. 단순 1차원 구조가 CSV와 잘 맞습니다." },
      { q: "결과를 엑셀로 가져가려면?", a: "CSV 다운로드 후 엑셀에서 '데이터 → 텍스트 가져오기'로 UTF-8 인코딩 선택해 열면 깔끔합니다." },
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
      "YAML과 JSON 사이를 자유롭게 변환하세요. Kubernetes, GitHub Actions, OpenAPI, Docker Compose, Ansible 설정 파일 작업, 두 형식 간 빠른 변환에 유용합니다.",
    metaDescription:
      "YAML ↔ JSON 무료 변환. K8s / GitHub Actions / OpenAPI 설정 작업에 적합.",
    howTo: [
      "YAML 또는 JSON 텍스트를 붙여넣습니다.",
      "방향을 선택합니다.",
      "결과를 복사합니다.",
    ],
    faq: [
      { q: "어떤 YAML 사양을 따르나요?", a: "YAML 1.2 (eemeli/yaml 라이브러리 기반)를 따릅니다." },
      { q: "왜 YAML과 JSON을 변환?", a: "YAML은 사람이 읽기 좋고(주석 가능, 들여쓰기 기반), JSON은 기계가 파싱하기 좋습니다. 도구·시스템 간 호환을 위해 변환합니다." },
      { q: "YAML 주석은 JSON에서 어떻게 되나요?", a: "JSON 표준에는 주석이 없어 YAML → JSON 변환 시 주석은 사라집니다." },
      { q: "들여쓰기가 중요한가요?", a: "YAML은 들여쓰기로 구조를 표현하므로 매우 민감합니다. 탭과 공백이 섞이면 안 되며, 보통 2칸 공백 들여쓰기를 씁니다." },
      { q: "Kubernetes YAML을 어떻게 점검?", a: "이 도구로 JSON 변환 후 [JSON 포맷터]로 검증하거나, Kubernetes 전용 도구(kubectl --dry-run)를 사용하세요." },
      { q: "복잡한 YAML(앵커·태그)도 됩니까?", a: "YAML 앵커(&) 참조(*), 태그(!)도 대부분 지원됩니다. 일부 비표준 확장은 단순화될 수 있어요." },
    ],
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
      "복잡한 SQL을 보기 좋게 정렬합니다. MySQL·Postgres·SQLite·MSSQL·BigQuery·Snowflake 등 14가지 dialect 지원. 코드 리뷰 전 가독성 정리, ORM이 생성한 쿼리 분석, 한 줄로 압축된 로그 쿼리 복구에 자주 쓰입니다.",
    metaDescription:
      "SQL 포맷터 무료. MySQL·Postgres·SQLite·MSSQL 등 14 dialect.",
    howTo: ["SQL을 붙여넣습니다.", "dialect를 선택합니다.", "포맷 버튼을 누릅니다."],
    faq: [
      { q: "여러 쿼리도 되나요?", a: "세미콜론(;)으로 구분된 여러 쿼리도 함께 포맷됩니다." },
      { q: "왜 dialect를 선택해야 하나요?", a: "DB마다 예약어·함수·연산자가 조금씩 달라 더 정확한 포맷팅을 위해서입니다. MySQL은 백틱, Postgres는 큰따옴표 사용 등." },
      { q: "쿼리가 너무 길어 가독성이 떨어져요. 자동 줄바꿈?", a: "포맷 후 SELECT·FROM·WHERE·JOIN이 줄바꿈되어 가독성이 크게 좋아집니다." },
      { q: "ORM이 만든 못생긴 쿼리도 정리되나요?", a: "네. Sequelize·TypeORM·Prisma 같은 ORM이 생성하는 긴 쿼리도 깔끔하게 정리됩니다." },
      { q: "주석은 보존되나요?", a: "-- 한 줄 주석, /* ... */ 블록 주석 모두 보존됩니다." },
      { q: "데이터 마이그레이션·DDL도 됩니까?", a: "CREATE/ALTER/DROP 같은 DDL, INSERT·UPDATE·DELETE DML 모두 포맷됩니다." },
    ],
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
      "Cron 표현식을 입력하면 사람이 읽기 좋은 설명과 다음 N회 실행 시각을 보여줍니다. 5필드·6필드(초 포함) 지원. 리눅스 cron 작업 작성, GitHub Actions 스케줄 검증, AWS EventBridge, Vercel Cron 설정 검토에 자주 쓰입니다.",
    metaDescription:
      "Cron 표현식 분석 무료. 다음 실행 시각, 사람 읽는 설명, 5/6 필드.",
    howTo: ["Cron 표현식을 입력합니다 (예: '0 9 * * 1').", "설명과 다음 10회 실행 시각이 표시됩니다."],
    faq: [
      { q: "한국 시간대로 보이나요?", a: "브라우저 시간대(보통 한국 시간)를 사용합니다. 서버 cron은 보통 UTC라 9시간 차이가 있을 수 있어 주의." },
      { q: "5필드와 6필드 차이?", a: "5필드: 분 시 일 월 요일. 6필드: 초 분 시 일 월 요일. AWS는 6필드(년 추가도), 일반 리눅스는 5필드." },
      { q: "'0 9 * * 1'이 뭐예요?", a: "매주 월요일 오전 9시 0분 실행. 0(분) 9(시) *(매일) *(매월) 1(월요일)." },
      { q: "L·W 같은 특수 문자?", a: "L(Last day), W(Weekday)는 Quartz·AWS 일부 확장입니다. 표준 cron(리눅스)에선 미지원." },
      { q: "GitHub Actions는 cron 시간이 정확하지 않은데요?", a: "GitHub Actions의 schedule은 정확한 실행 시간을 보장하지 않고 ±5~15분 지연될 수 있습니다. 정확한 시간이 필요하면 다른 서비스가 적합." },
      { q: "한 번 실행되고 끝나는 작업도 cron으로?", a: "cron은 반복 실행용입니다. 한 번만 실행하려면 'at' 명령이나 별도 스케줄러를 쓰세요." },
    ],
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
      "CIDR 표기(예: 192.168.0.0/24)에서 네트워크 주소·브로드캐스트·서브넷 마스크·사용 가능 호스트 수를 계산합니다. 사내 네트워크 설계, AWS VPC 서브넷 분할, 방화벽 규칙 작성, 네트워크 인증 시험 준비에 자주 쓰입니다.",
    metaDescription:
      "IPv4 CIDR 계산기 무료. 네트워크/브로드캐스트/마스크/호스트 수.",
    howTo: ["IPv4 주소와 prefix 길이를 입력합니다 (예: 192.168.0.0/24).", "결과가 즉시 표시됩니다."],
    faq: [
      { q: "IPv6도 되나요?", a: "현재는 IPv4만 지원합니다. IPv6 CIDR(/64 등)은 별도 도구가 필요합니다." },
      { q: "CIDR이 뭐예요?", a: "Classless Inter-Domain Routing. 'IP주소/prefix길이' 형식으로 서브넷을 표현. /24는 상위 24비트가 네트워크, 나머지 8비트가 호스트." },
      { q: "/24는 호스트가 몇 개?", a: "256개 주소 중 네트워크 주소·브로드캐스트 빼면 254개 사용 가능. /16은 65,534개, /20은 4,094개." },
      { q: "AWS VPC에서 자주 쓰는 CIDR?", a: "VPC는 /16 (65,534개)에서 시작해 서브넷별로 /24 (254개) 정도가 흔합니다. AZ별로 /20씩 나누기도 합니다." },
      { q: "사설 IP 대역이 따로 있나요?", a: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16이 사설 IP. 가정·사내 네트워크에 자주 사용됩니다." },
      { q: "두 CIDR이 겹치는지 확인?", a: "이 도구로 각각 계산해 IP 범위를 비교하거나, 별도 'subnet overlap' 도구가 필요합니다." },
    ],
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
      "JWT 토큰의 헤더와 페이로드를 디코드하세요. 만료 시각·발급자 등을 한 눈에 확인. 서명 검증은 하지 않으므로 디버깅 용도로만 쓰세요. API 인증 디버깅, 만료 토큰 확인, OAuth 흐름 분석, SSO 토큰 검사에 자주 쓰입니다.",
    metaDescription:
      "JWT 토큰 디코더 무료. 헤더·페이로드·만료 시각 표시, 브라우저에서 안전 처리.",
    howTo: ["JWT 토큰을 붙여넣습니다.", "헤더·페이로드가 자동 디코딩됩니다.", "exp/iat 시각이 사람 읽기 좋게 표시됩니다."],
    faq: [
      { q: "서명도 검증되나요?", a: "아니요. 디코딩만 합니다. 서명 검증에는 비밀 키가 필요해 클라이언트에서 안전하게 할 수 없습니다." },
      { q: "토큰이 외부로 가나요?", a: "아니요. 모든 디코딩이 브라우저에서 일어납니다. 다만 본인 인증 토큰을 공개 도구에 붙여넣는 것 자체가 노출 위험이니 운영 토큰은 주의하세요." },
      { q: "JWT가 뭐예요?", a: "JSON Web Token. Header.Payload.Signature 3부분을 점(.)으로 연결한 인증 토큰 표준. 서버 상태 없이 인증 정보를 클라이언트에 전달." },
      { q: "exp·iat·iss는 무슨 뜻?", a: "exp(expiration time, 만료), iat(issued at, 발급 시각), iss(issuer, 발급자), sub(subject, 대상). RFC 7519 표준 클레임." },
      { q: "JWT 안에 비밀번호 같은 게 들어가도 되나요?", a: "안 됩니다. JWT는 Base64URL 인코딩일 뿐 암호화가 아니라 누구나 디코드 가능합니다. 민감 정보는 절대 페이로드에 넣지 마세요." },
      { q: "만료된 토큰을 어떻게 알 수 있나요?", a: "exp 클레임의 Unix 타임스탬프가 현재 시각보다 작으면 만료입니다. 이 도구가 자동으로 만료 여부를 표시합니다." },
    ],
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
      "슬라이더로 box-shadow를 시각적으로 만들고 코드를 복사하세요. 다중 그림자 레이어 지원, 미리보기 즉시 반영. 카드 UI, 버튼 강조, 모달 띄움 효과, 머티리얼 디자인 elevation 표현에 자주 쓰입니다.",
    metaDescription:
      "CSS box-shadow 무료 생성기. 슬라이더 UI, 다중 레이어, 실시간 미리보기.",
    howTo: ["슬라이더로 X/Y 오프셋, 블러, 확장, 색상, 투명도를 조절합니다.", "+ 버튼으로 그림자 레이어를 추가합니다.", "결과 CSS를 복사합니다."],
    faq: [
      { q: "inset 그림자도 가능한가요?", a: "네. 각 레이어마다 'inset' 토글을 켤 수 있습니다. inset은 안쪽 그림자(들어간 느낌)를 만듭니다." },
      { q: "자연스러운 그림자 팁?", a: "(1) Y 오프셋만, X는 0, (2) 블러를 오프셋의 2배, (3) 알파 0.1~0.3, (4) 색상은 완전 검은색보다 짙은 회색이 자연스럽습니다." },
      { q: "여러 레이어가 왜 필요해요?", a: "현실의 빛은 여러 방향에서 옵니다. 가까운 작은 그림자 + 멀리 큰 그림자를 겹치면 자연스러운 입체감." },
      { q: "성능에 영향?", a: "정적 그림자는 거의 영향 없습니다. 다만 모바일에서 블러 큰 그림자가 많으면 GPU 부하가 늘 수 있어요." },
      { q: "Tailwind CSS 그림자와 비교?", a: "Tailwind의 shadow-sm/md/lg/xl/2xl은 미리 정해진 공식 그림자 세트입니다. 커스텀 그림자가 필요할 때 이 도구로 만들어 사용하세요." },
      { q: "글자에도 그림자가 되나요?", a: "box-shadow는 박스용입니다. 글자 그림자는 text-shadow 속성을 별도로 써야 합니다." },
    ],
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
      "JSON과 XML 사이를 자유롭게 변환하세요. 속성 처리·들여쓰기 옵션 지원. 레거시 SOAP API 디버깅, RSS 피드 처리, 정부 공공 API 응답 분석, 한국 금융·보험·통신 시스템 데이터 작업에 자주 쓰입니다.",
    metaDescription:
      "JSON ↔ XML 무료 변환. 양방향, 들여쓰기 옵션, fast-xml-parser 기반.",
    howTo: ["JSON 또는 XML을 붙여넣고 방향을 선택합니다.", "결과를 복사합니다."],
    faq: [
      { q: "XML 속성은 어떻게 변환되나요?", a: "@_ 접두사로 속성을 구분합니다 (예: `{\"@_id\": \"1\"}` ↔ `<tag id=\"1\">`)." },
      { q: "왜 두 형식이 다 쓰이나요?", a: "JSON은 웹 API·JS 친화적, XML은 SOAP·구버전 엔터프라이즈 시스템에서 표준입니다. 한국 공공기관 API는 XML이 많아요." },
      { q: "CDATA 섹션도 처리되나요?", a: "네. <![CDATA[...]]> 안의 텍스트는 JSON에선 일반 문자열로 변환됩니다." },
      { q: "XML 네임스페이스(xmlns)?", a: "기본적으로 지원되며, 옵션에 따라 네임스페이스 접두어를 보존하거나 제거할 수 있습니다." },
      { q: "큰 XML/JSON도 됩니까?", a: "수 MB까지는 무리 없습니다. 매우 큰 파일은 스트리밍 파서가 필요한데, 본 도구는 메모리 기반입니다." },
      { q: "공공데이터포털 API 응답에도 적합?", a: "네. data.go.kr의 많은 API가 XML 응답을 반환합니다. 이 도구로 JSON 변환 후 분석하면 편합니다." },
    ],
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
      "두 날짜 사이의 일수, 특정 날짜까지의 D-day, 오늘에서 N일 후 같은 날짜 계산을 한 번에. 시험·결혼·전역·기념일까지 남은 일수, 프로젝트 마감일 카운트다운, 사귄 지 며칠, 생일까지 등 일상에서 자주 쓰입니다. 한국 음력은 지원하지 않습니다.",
    metaDescription:
      "D-day 계산기 무료. 두 날짜 사이 일수, 디데이, N일 후 계산, 즉시 결과.",
    howTo: ["탭에서 모드를 선택합니다 (D-day / 차이 / N일 후).", "날짜를 입력하면 결과가 즉시 표시됩니다."],
    faq: [
      { q: "윤년 처리는요?", a: "JavaScript Date API를 사용해 그레고리력 윤년이 자동 처리됩니다." },
      { q: "D-day의 의미?", a: "D는 'Day'를 뜻하며, D-1은 어떤 일 1일 전, D+1은 1일 후를 의미합니다. 군대 D-day(전역일)에서 유래." },
      { q: "음력 날짜도 됩니까?", a: "본 도구는 양력만 처리합니다. 음력 기반 디데이가 필요하면 [음력 ↔ 양력] 도구로 양력 변환 후 계산하세요." },
      { q: "시간(시·분·초)까지 정확히 계산되나요?", a: "기본은 날짜 단위입니다. 시·분 단위 카운트다운이 필요하면 별도 도구가 필요합니다." },
      { q: "두 날짜 사이가 어떻게 셈해져요?", a: "보통 시작일 포함, 종료일 포함 모두 포함하는 방식 또는 한쪽만 포함하는 방식이 있습니다. 도구는 단순 일수 차이로 표시." },
      { q: "여러 D-day 동시 추적?", a: "현재는 한 번에 하나입니다. 즐겨찾기·캘린더 앱에서 여러 D-day를 추적하는 게 효율적입니다." },
    ],
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
      "길이(m·km·inch·ft), 무게(g·kg·lb·oz), 온도(°C·°F·K), 면적(m²·평·acre), 부피(L·mL·gallon)를 즉시 변환하세요. 미국식 단위 영화·요리 레시피 변환, 해외 직구 사이즈 비교, 항공기 화물 무게, 해외 출장 키·체중 표기에 자주 쓰입니다.",
    metaDescription:
      "단위 변환기 무료. 길이·무게·온도·면적·부피, 즉시 양방향 변환.",
    howTo: ["탭에서 종류를 고릅니다.", "한 쪽에 값을 입력하면 다른 쪽이 자동 계산됩니다."],
    faq: [
      { q: "한국 단위(평·근)도 지원하나요?", a: "면적의 '평'은 지원합니다. 무게 '근'은 지역마다 달라 표준값을 지정하기 어려워 미지원입니다." },
      { q: "왜 미국은 미터법을 안 써요?", a: "미국은 야드파운드법(inch·ft·lb)을 일상에서 사용합니다. 과학·의학에선 미터법을 쓰지만 일상은 다릅니다." },
      { q: "0°C가 화씨로?", a: "0°C = 32°F (물 어는점). 100°C = 212°F (물 끓는점). 미국 일상 온도는 70°F(약 21°C)가 쾌적." },
      { q: "1피트가 정확히 몇 cm?", a: "1피트 = 30.48cm (정확값). 1인치 = 2.54cm. 미국 신장 6피트 = 약 183cm." },
      { q: "갤런은 미국과 영국이 달라요?", a: "맞습니다. 미국 갤런(3.785L) ≠ 영국 갤런(4.546L). 도구에서 어느 표준인지 확인 필요." },
      { q: "전문 단위 변환이 필요한 경우?", a: "원자력·천문·금융 등 특수 분야는 별도 전문 도구나 코드로 처리하세요. 본 도구는 일상 단위 위주입니다." },
    ],
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
      "정규식 패턴과 플래그(gimsuy)를 입력해 매칭 결과를 실시간으로 확인하세요. 캡처 그룹·치환 미리보기 지원. 데이터 추출, 입력 검증 규칙 작성, 로그 분석, VS Code/IDE 검색 패턴 미리보기, 정규식 학습에 자주 쓰입니다.",
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
      { q: "Python·Java 정규식과 호환되나요?", a: "기본 문법은 거의 같지만 일부 고급 기능(named groups 문법 등)이 다릅니다. 다른 언어용은 그 언어 전용 테스터를 사용하세요." },
      { q: "플래그(g, i, m, s, u, y) 차이?", a: "g(전역), i(대소문자 무시), m(여러 줄), s(점이 줄바꿈 매칭), u(유니코드), y(sticky)." },
      { q: "캡처 그룹이 뭐예요?", a: "괄호 ( ) 안에 묶인 부분의 매칭 결과를 따로 가져올 수 있습니다. JavaScript에선 match[1], match[2] 식으로 접근." },
      { q: "이메일/전화번호 정규식이 있나요?", a: "이메일 RFC 표준은 매우 복잡합니다. 실용 패턴 'name@domain' 정도는 검증되지만 100% 완벽은 어렵습니다." },
      { q: "정규식이 너무 어려워요. 학습 자료?", a: "regex101.com 같은 사이트의 시각화·설명이 학습에 좋습니다. 본 도구는 빠른 테스트용입니다." },
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
      "HEX, RGB, HSL 색상 코드를 서로 변환하세요. 디자이너와 개발자를 위한 무료 도구. 디자인 시스템 색상 정리, CSS 작성, 포토샵·일러스트레이터 색 옮기기, 브랜드 컬러 표준화에 자주 쓰입니다.",
    metaDescription:
      "HEX RGB HSL 색상 코드 무료 변환기. 실시간 미리보기.",
    howTo: [
      "원하는 형식의 색상 코드를 입력하거나 색상 휠에서 선택합니다.",
      "다른 형식의 코드가 자동으로 변환되어 표시됩니다.",
      "원하는 코드를 복사 버튼으로 복사합니다.",
    ],
    faq: [
      { q: "HSL이 뭐가 다른가요?", a: "HSL(색조, 채도, 명도)은 색을 직관적으로 조절할 때 편리합니다. 같은 색의 밝기만 바꾸고 싶을 때 HSL이 RGB보다 쉽습니다." },
      { q: "HEX와 RGB는 같은 색이에요?", a: "네. 표기 방식만 다릅니다. #FF0000 = rgb(255, 0, 0) = 빨강. HEX는 짧고 익숙해서 CSS에서 흔히 사용됩니다." },
      { q: "투명도(알pha)도 포함되나요?", a: "RGBA, HSLA, HEX 8자리(#RRGGBBAA)로 알파 채널을 표시할 수 있습니다." },
      { q: "디자인용으로 어떤 형식이 좋아요?", a: "CSS는 HEX 또는 hsl(), 디자인 도구(Figma)에선 HEX 8자리, 인쇄용은 CMYK(이 도구 미지원)." },
      { q: "CMYK도 변환되나요?", a: "현재는 RGB 기반 색상만 지원합니다. CMYK는 인쇄용으로 별도 전문 도구가 필요합니다." },
      { q: "한국 사이트 색상 추출에도 좋은가요?", a: "[이미지 색상 추출] 도구와 함께 쓰면 좋습니다. 이미지에서 색상 팔레트 추출 후 각 색을 HSL로 변환해 디자인 시스템 만들기." },
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
      "텍스트와 Base64를 서로 변환하세요. URL-safe 옵션 지원, 한글 자동 처리. API 인증 토큰 분석, JWT 페이로드 디코딩, 이메일 첨부파일 디버깅, 데이터 안전 전송용 인코딩에 자주 쓰입니다.",
    metaDescription:
      "Base64 인코딩/디코딩 무료 변환기. 한글 지원, URL-safe 옵션.",
    howTo: [
      "왼쪽에 텍스트(또는 Base64)를 입력합니다.",
      "오른쪽에 변환 결과가 즉시 표시됩니다.",
      "복사 버튼으로 클립보드에 복사합니다.",
    ],
    faq: [
      { q: "한글도 Base64로 변환되나요?", a: "네. 내부적으로 UTF-8 인코딩 후 Base64로 변환합니다." },
      { q: "URL-safe Base64가 뭔가요?", a: "URL에 그대로 사용 가능한 변형 Base64로, '+/='를 '-_'로 대체합니다. JWT가 이 방식을 씁니다." },
      { q: "Base64가 보안용인가요?", a: "아닙니다. 단순 인코딩이라 누구나 디코드 가능합니다. 비밀 정보는 별도 암호화 필요." },
      { q: "왜 33% 용량이 늘어나요?", a: "Base64는 3바이트를 4글자로 인코딩(64진법). 결과가 항상 원본보다 4/3배 정도로 커집니다." },
      { q: "이미지를 Base64로 만들고 싶다면?", a: "[이미지 ↔ Base64] 도구를 별도로 사용하세요. 이미지 인라인 임베드용." },
      { q: "디코드 시 깨지는 이유?", a: "(1) URL-safe Base64인데 일반 모드로 디코드, (2) 패딩(=) 누락, (3) 이중 인코딩 — 세 가지 원인이 흔합니다." },
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
      "암호학적으로 안전한 랜덤 비밀번호를 생성합니다. 길이·대소문자·숫자·특수문자 선택 가능. 새 계정 가입, 회사 시스템 비밀번호 변경, 와이파이 공유기 비번 설정, 임시 토큰 생성에 자주 쓰입니다.",
    metaDescription:
      "강력하고 안전한 랜덤 비밀번호 무료 생성. 길이·문자 종류 선택 가능.",
    howTo: [
      "원하는 길이와 포함할 문자 종류를 선택합니다.",
      "생성 버튼을 누르면 랜덤 비밀번호가 만들어집니다.",
      "복사 버튼으로 클립보드에 복사하세요.",
    ],
    faq: [
      { q: "내 비밀번호가 어디로 전송되나요?", a: "아닙니다. 비밀번호는 브라우저 안에서만 생성되며 외부로 전송되지 않습니다. Web Crypto의 안전한 난수를 사용합니다." },
      { q: "강력한 비밀번호는 몇 자가 좋나요?", a: "16자 이상에 대소문자·숫자·특수문자를 모두 포함하면 사실상 안전합니다." },
      { q: "왜 특수문자 포함이 권장되나요?", a: "문자 종류가 다양할수록 무차별 대입 공격 시 경우의 수가 기하급수적으로 늘어납니다. 알파벳만 16자(약 4×10²²) vs 특수문자 포함 16자(약 1×10³¹)." },
      { q: "비밀번호 관리자에 저장하면 어떻게 외워요?", a: "안 외워도 됩니다. 1Password·Bitwarden·KeePass 같은 비밀번호 관리자가 자동 입력해줍니다. 마스터 비번 하나만 외우면 됩니다." },
      { q: "회사 정책에 맞는 비밀번호 만들기?", a: "길이·필수 문자 종류 옵션을 회사 정책에 맞춰 조절하면 됩니다. 보통 영·숫자·특수 1개씩 + 8자 이상 정도가 흔합니다." },
      { q: "여러 사이트에 같은 비번 쓰면 안 되는 이유?", a: "한 사이트가 해킹당하면 그 비번이 다른 모든 사이트에 시도됩니다(credential stuffing). 사이트마다 다른 비번이 필수." },
    ],
  },

  // ===== Batch G (43 new tools) - dev =====
  { slug: "slug-generator", component: "SlugGeneratorTool", category: "dev", icon: "🔗", navTitle: "URL 슬러그 생성", title: "URL 슬러그 생성기 - 한글·공백 → SEO 친화 URL (자동 변환)", h1: "URL 슬러그 생성기", description: "한글이나 공백, 특수문자를 SEO 친화적인 URL 슬러그로 변환합니다. 한글 로마자 변환 옵션 포함. 블로그 글 URL 만들기, 워드프레스·티스토리·노션 글 주소, 정적 사이트 페이지 경로, 제품·상품 URL 정리에 자주 쓰입니다.", metaDescription: "URL 슬러그 무료 생성. 한글·특수문자 → SEO 친화 URL.", howTo: ["원본 텍스트(글 제목 등)를 입력합니다.", "한글 처리 옵션을 선택합니다.", "슬러그를 복사해 URL로 활용합니다."], faq: [{ q: "한글은 어떻게 처리되나요?", a: "한글 그대로 두거나 로마자 변환 옵션을 선택할 수 있습니다. 검색엔진은 한글 URL도 인식하지만 외국인 공유엔 로마자가 유리해요." }, { q: "왜 슬러그가 SEO에 중요해요?", a: "URL에 키워드가 있으면 검색엔진이 페이지 주제를 빠르게 파악합니다. 'p=123' 같은 ID URL보다 'how-to-bake-cake'가 훨씬 좋습니다." }, { q: "슬러그 길이는 얼마가 좋아요?", a: "보통 3~5단어, 60자 이하가 권장됩니다. 너무 길면 검색 결과에 잘리고 공유 시 어색합니다." }, { q: "대소문자 어느 게 표준?", a: "소문자가 표준입니다. 일부 서버는 대소문자 구분 / 안 함이 다르고 URL이 더 보기 좋아요." }, { q: "이미 발행된 글의 슬러그를 바꾸면?", a: "404 오류가 나거나 SEO에 부정적입니다. 꼭 바꿔야 한다면 301 리다이렉트를 설정하세요." }], addedAt: "2026-05-14" },
  { slug: "html-minifier", component: "HtmlMinifierTool", category: "dev", icon: "📦", navTitle: "HTML 미니파이어", title: "HTML 미니파이어 - 공백·주석 제거로 용량 30~50% 절감", h1: "HTML 미니파이어", description: "HTML에서 공백·주석·줄바꿈을 제거해 용량을 줄입니다. 빠른 로딩을 위한 배포 최적화, Core Web Vitals 개선, 모바일 데이터 절약에 자주 쓰입니다.", metaDescription: "HTML 미니파이 무료. 공백·주석 제거, 용량 절감.", howTo: ["HTML을 붙여넣습니다.", "압축 버튼을 누릅니다.", "결과를 복사해서 배포에 사용합니다."], faq: [{ q: "원본 의미가 바뀌나요?", a: "아닙니다. 공백·주석만 제거합니다. 브라우저 렌더링은 완전히 동일합니다." }, { q: "용량이 얼마나 줄어요?", a: "일반 HTML은 30~50% 감소. 들여쓰기·주석이 많을수록 효과가 큽니다." }, { q: "주석이 다 사라지나요?", a: "기본적으로 모두 제거됩니다. 보존할 주석은 <!--! 같은 특수 표시로 표시하거나 옵션을 조정해야 합니다." }, { q: "SEO에 영향?", a: "코드 크기 자체는 SEO에 직접 영향이 없지만, 페이지 로딩 속도(LCP)를 빠르게 해 간접적으로 도움이 됩니다." }, { q: "운영 환경에서는 자동화해야겠죠?", a: "네. Webpack·Vite·Next.js 같은 번들러가 빌드 시 자동 minify합니다. 본 도구는 단발 작업·점검용." }], addedAt: "2026-05-14" },
  { slug: "css-minifier", component: "CssMinifierTool", category: "dev", icon: "🎨", navTitle: "CSS 미니파이어", title: "CSS 미니파이어 - 공백·주석 제거 (용량 40~60% 절감)", h1: "CSS 미니파이어", description: "CSS에서 공백·주석·불필요한 세미콜론을 제거해 용량을 절감합니다. 배포 최적화, 페이지 로딩 속도 개선, CDN 비용 절감에 자주 쓰입니다.", metaDescription: "CSS 미니파이 무료. 공백·주석 제거, 용량 절감.", howTo: ["CSS를 붙여넣습니다.", "압축 버튼을 누릅니다.", "결과를 복사해 배포에 사용합니다."], faq: [{ q: "복원 가능한가요?", a: "구조는 살아 있어 가독성이 떨어질 뿐 의미는 같습니다. 다시 [HTML 미니파이어]처럼 보기 좋게 만들려면 별도 prettifier가 필요합니다." }, { q: "용량 얼마나 줄어요?", a: "일반 CSS는 40~60% 감소합니다. 인덴트·주석이 많을수록 더 큰 효과." }, { q: "Sass/Less도 됩니까?", a: "이 도구는 일반 CSS만 입력으로 받습니다. Sass·Less는 먼저 CSS로 컴파일한 뒤 미니파이하세요." }, { q: "주석 100% 다 제거되나요?", a: "기본적으로 다 제거됩니다. 라이선스 주석(/*! ... */)은 보존 옵션이 있을 수 있어요." }, { q: "운영에선 어떻게 처리?", a: "Webpack·Vite·PostCSS 같은 빌드 도구의 cssnano·csso 플러그인이 자동 처리합니다. 본 도구는 빠른 점검·단발 작업용." }], addedAt: "2026-05-14" },
  { slug: "js-minifier", component: "JsMinifierTool", category: "dev", icon: "📦", navTitle: "JavaScript 미니파이어", title: "JavaScript 미니파이어 - terser 기반 압축 (mangle·dead code 제거)", h1: "JavaScript 미니파이어", description: "Terser 기반으로 JavaScript를 압축하고 mangle합니다. 식별자 단축·dead code 제거 포함. 라이브러리 배포, npm 패키지 publishing, 정적 사이트 최적화에 자주 쓰입니다.", metaDescription: "JavaScript 미니파이 무료. terser 기반, mangle·dead code 제거.", howTo: ["JS를 붙여넣고 압축 버튼을 누릅니다.", "결과를 복사해 배포에 사용합니다."], faq: [{ q: "ES6+ 문법 지원?", a: "네. ES2022까지 지원합니다. async/await, optional chaining 등 최신 문법 모두 처리." }, { q: "mangle이 뭐예요?", a: "변수·함수 이름을 짧게 바꾸는 것입니다. longUserName → a 식. 디버깅엔 어렵지만 용량이 크게 줄어듭니다." }, { q: "dead code elimination?", a: "사용되지 않는 코드(if(false), unreachable 등)를 자동 제거. 라이브러리 트리쉐이킹과 함께 큰 효과." }, { q: "용량 얼마나 줄어요?", a: "일반 JavaScript는 40~70% 감소. gzip 압축까지 더하면 추가 60~80% 절감." }, { q: "source map은 어떻게?", a: "이 도구는 단순 압축만 합니다. 운영용은 Webpack·esbuild·terser-cli가 source map 함께 생성해 디버깅을 도와줍니다." }], addedAt: "2026-05-14" },
  { slug: "json-diff", component: "JsonDiffTool", category: "dev", icon: "🔍", navTitle: "JSON 비교 (diff)", title: "JSON 비교 - 두 JSON 차이점 즉시 찾기 (객체 단위)", h1: "JSON 비교 / Diff", description: "두 JSON의 차이점을 객체 단위로 비교해 추가·제거·변경된 키를 표시합니다. API 응답 변경 추적, 설정 파일 diff, GraphQL 응답 비교, JSON 스키마 마이그레이션 검증에 자주 쓰입니다.", metaDescription: "JSON 비교 무료. 객체 단위 diff, 추가·제거·변경 표시.", howTo: ["왼쪽·오른쪽에 JSON을 붙여넣습니다.", "차이점이 자동 표시됩니다 (색상 하이라이트)."], faq: [{ q: "배열 순서가 다르면?", a: "JSON 표준에 따라 배열 순서는 의미가 있으니 다른 것으로 표시됩니다. 순서 무관 비교가 필요하면 미리 정렬해 두세요." }, { q: "텍스트 diff와 다른 점?", a: "JSON diff는 키 구조를 이해해서 키-값 차이만 보여줍니다. 텍스트 diff는 모든 공백·줄바꿈 차이를 봅니다." }, { q: "중첩 객체도 비교되나요?", a: "네. 중첩 객체 안의 키도 재귀적으로 비교합니다. 깊은 곳의 변경도 표시." }, { q: "키 순서가 달라도 같다고 인식?", a: "JSON 표준은 키 순서가 무의미하므로 키만 같으면 같은 객체로 봅니다. 본 도구는 키 순서를 무시합니다." }, { q: "어디에 활용?", a: "API 변경 점검, A/B 테스트 응답 비교, 데이터 마이그레이션 전후 검증, 환경별 설정 차이 확인 등 다양." }], addedAt: "2026-05-14" },
  { slug: "text-binary", component: "TextBinaryTool", category: "dev", icon: "0️⃣", navTitle: "텍스트 ↔ 2진수", title: "텍스트 2진수 변환 - 글자 → Binary 양방향 (ASCII · UTF-8)", h1: "텍스트 ↔ 2진수 변환", description: "텍스트를 비트 단위 2진수로, 2진수를 텍스트로 변환합니다. ASCII와 UTF-8 모두 지원. CS 학습, 디버깅, 암호 학습, CTF 문제 풀이에 자주 쓰입니다.", metaDescription: "텍스트 2진수 무료 변환. UTF-8 지원, 양방향.", howTo: ["변환할 텍스트나 2진수를 입력합니다.", "변환 결과가 즉시 표시됩니다."], faq: [{ q: "한글도 되나요?", a: "UTF-8 인코딩으로 한글도 변환됩니다 (한 글자 3바이트 = 24비트)." }, { q: "왜 'A'가 01000001이에요?", a: "ASCII 표준에서 'A' = 65 = 01000001(2진수). 컴퓨터는 모든 문자를 숫자로 저장하는데, 그 숫자가 0과 1의 조합입니다." }, { q: "공백으로 비트를 구분해야 하나요?", a: "도구가 자동 인식합니다. 8비트씩 그룹화하거나 공백 없이 입력해도 됩니다." }, { q: "ASCII 외 문자는?", a: "한글·일어·이모지는 UTF-8 가변 길이 인코딩(1~4바이트)으로 표현됩니다. 도구가 자동 처리." }, { q: "이걸로 암호 만들기?", a: "단순 텍스트의 2진 표현은 암호가 아닙니다. 누구나 디코드할 수 있어요. 실제 암호는 AES·RSA가 필요합니다." }], addedAt: "2026-05-14" },
  { slug: "text-hex", component: "TextHexTool", category: "dev", icon: "1️⃣6️⃣", navTitle: "텍스트 ↔ 16진수", title: "텍스트 16진수 변환 - UTF-8 hex dump (디버깅·인코딩)", h1: "텍스트 ↔ 16진수 변환", description: "텍스트를 16진수(hex)로, 16진수를 텍스트로 변환합니다. 디버깅·인코딩 확인, 네트워크 패킷 분석, 임베디드 펌웨어 작업, hex dump 분석에 자주 쓰입니다.", metaDescription: "텍스트 16진수 무료 변환. UTF-8 hex dump, 양방향.", howTo: ["변환할 텍스트나 hex를 입력합니다.", "양방향 결과가 자동 표시됩니다."], faq: [{ q: "공백 구분도 되나요?", a: "공백 포함/제외 출력을 선택할 수 있습니다. 0x 접두어 옵션도 있을 수 있어요." }, { q: "왜 16진수를 쓰나요?", a: "1바이트(8비트)를 2자리로 표현할 수 있어 효율적입니다. 0~FF가 0~255. 디버깅 시 한눈에 바이트가 보입니다." }, { q: "16진수와 2진수 차이?", a: "16진수가 짧고 읽기 좋습니다. 'C8' = '11001000'(2진). 같은 정보지만 16진은 1바이트당 2자리로 효율적." }, { q: "한글도 hex로?", a: "UTF-8 인코딩 후 hex로 변환됩니다. '가' = '%EA%B0%80' = EA B0 80." }, { q: "hex dump가 뭐예요?", a: "리눅스 `xxd`·`hexdump` 명령처럼 바이트별로 16진수와 ASCII를 나란히 보여주는 형식. 디버깅 표준입니다." }], addedAt: "2026-05-14" },
  { slug: "ansi-to-html", component: "AnsiToHtmlTool", category: "dev", icon: "🌈", navTitle: "ANSI → HTML", title: "ANSI 컬러 코드 → HTML 변환 - 터미널 출력 웹 시각화", h1: "ANSI 색상 코드 → HTML", description: "터미널의 ANSI 이스케이프 시퀀스를 HTML로 변환해 웹 페이지·블로그·문서에 색상 그대로 표시합니다. CI/CD 로그 공유, 터미널 스크린샷 대체, 기술 블로그 코드 출력 예시에 자주 쓰입니다.", metaDescription: "ANSI → HTML 무료 변환. 터미널 색상 그대로 웹에 표시.", howTo: ["ANSI 이스케이프 시퀀스 텍스트를 붙여넣습니다.", "HTML 결과를 받습니다.", "블로그·문서에 붙여넣어 컬러 그대로 표시합니다."], faq: [{ q: "어떤 코드 지원?", a: "기본 16색 + 256색 + RGB(트루컬러)를 모두 지원합니다. 굵게·기울임·밑줄 같은 텍스트 속성도 처리." }, { q: "ANSI가 뭐예요?", a: "터미널 색상·서식을 위한 표준 이스케이프 코드(\\033[31m 등). 리눅스·맥 터미널, git 출력, CI 로그에 흔히 쓰입니다." }, { q: "어떤 명령 결과를 옮기기 좋아요?", a: "git status, npm output, jest 결과, ls --color, eslint·typescript 에러 등 컬러 출력이 있는 모든 명령." }, { q: "터미널에서 결과를 어떻게 복사?", a: "리눅스/맥에서 `command 2>&1 | tee output.txt` 한 뒤 파일을 열어 복사. 컬러 코드가 포함된 채로 저장됩니다." }, { q: "결과 HTML이 너무 길어요. 줄일 수 있나요?", a: "ANSI 정보가 글자마다 들어가 HTML이 커집니다. 필요한 부분만 잘라서 변환하세요." }], addedAt: "2026-05-14" },
  { slug: "keycode-viewer", component: "KeycodeTool", category: "dev", icon: "⌨️", navTitle: "키 코드 확인", title: "JavaScript 키 코드 확인 - keyCode / key / code 표시", h1: "JavaScript 키 이벤트 코드 확인", description: "키보드 키를 누르면 해당 이벤트의 key·code·keyCode·which 속성이 실시간 표시됩니다. 키보드 단축키 구현, 게임 조작 디버깅, 폼 키 이벤트 처리, IME 입력 디버깅에 자주 쓰입니다.", metaDescription: "JS 키보드 이벤트 코드 무료 확인. key·code·keyCode 표시.", howTo: ["페이지에서 아무 키나 누릅니다.", "이벤트 속성이 실시간 표시됩니다.", "Shift·Ctrl·Alt 조합도 확인 가능."], faq: [{ q: "key와 code 차이는?", a: "key는 입력 결과(예: 'A', 'ㄱ'), code는 물리적 키 위치(예: 'KeyA'). 단축키는 보통 code(키 위치)를 권장." }, { q: "keyCode는 왜 deprecated?", a: "구버전 표준이며 키보드 레이아웃마다 값이 다른 문제가 있었습니다. 현재는 key·code 사용 권장." }, { q: "한글 입력 시 IME 어떻게?", a: "한글 입력 중에는 ime-process 단계에서 key 이벤트가 다르게 발생합니다. compositionstart/end 이벤트로 별도 처리 필요." }, { q: "단축키(Ctrl+S 등) 검증?", a: "ctrlKey, shiftKey, altKey, metaKey 속성을 같이 확인하세요. 맥은 보통 metaKey(Cmd), 윈도우는 ctrlKey." }, { q: "방향키, Enter, Escape는?", a: "key가 'ArrowUp', 'Enter', 'Escape' 같은 명확한 이름으로 표시됩니다." }, { q: "Function 키(F1~F12)?", a: "key가 'F1', 'F2' 같이 표시됩니다. 브라우저가 F1(도움말), F5(새로고침) 등을 가로채는 경우가 있어 주의." }], addedAt: "2026-05-14" },
  { slug: "file-to-base64", component: "FileToBase64Tool", category: "dev", icon: "📂", navTitle: "파일 → Base64", title: "파일 Base64 인코딩 - 모든 파일 → data URL (양방향)", h1: "파일 → Base64 변환", description: "이미지·PDF·동영상 등 모든 파일을 Base64 data URL로 인코딩합니다. data URL → 파일 디코딩도 지원. 인라인 첨부 파일, 코드 안에 작은 파일 임베드, 디버깅 시 파일 텍스트화에 자주 쓰입니다.", metaDescription: "파일 Base64 무료 변환. data URL 생성, 모든 파일 지원.", howTo: ["파일을 업로드합니다.", "Base64 data URL이 자동 생성됩니다.", "복사하거나 다운로드하세요."], faq: [{ q: "큰 파일도 되나요?", a: "10MB 이하 권장. Base64는 약 33% 용량이 증가합니다. 큰 파일은 메모리 부담으로 실패할 수 있어요." }, { q: "어디에 활용?", a: "(1) HTML/CSS 인라인 이미지, (2) 이메일 첨부 대신 인라인, (3) JSON 안에 파일 임베드, (4) Postman 같은 API 테스트." }, { q: "이미지만 변환되나요?", a: "PDF·MP3·동영상·문서 등 모든 파일이 변환됩니다. MIME 타입이 자동 인식돼 data URL이 만들어집니다." }, { q: "data URL을 다시 파일로?", a: "Base64 data URL을 붙여넣으면 원본 파일로 디코드해 다운로드할 수 있습니다." }, { q: "이미지 전용 도구가 있나요?", a: "이미지 전용은 [이미지 ↔ Base64] 도구가 미리보기 등 더 편한 기능을 제공합니다." }, { q: "Base64는 안전한가요?", a: "단순 인코딩이라 누구나 디코드 가능합니다. 민감한 파일은 별도 암호화·접근 제어가 필요해요." }], addedAt: "2026-05-14" },
    { slug: "unicode-lookup", component: "UnicodeLookupTool", category: "dev", icon: "Ⓤ", navTitle: "유니코드 찾기", title: "유니코드 코드포인트 변환 - 글자 ↔ U+XXXX (이모지 분석)", h1: "유니코드 코드포인트 ↔ 글자", description: "글자의 유니코드 코드포인트(U+XXXX)와 이름을 확인하고, 코드포인트로 글자를 만들 수 있습니다. 이모지 분석, 폰트 호환성 디버깅, 한자 코드 확인, 특수문자 입력에 자주 쓰입니다.", metaDescription: "유니코드 코드포인트 무료 검색. 글자 ↔ U+XXXX, 이모지 분석.", howTo: ["글자를 입력하면 코드포인트가 표시됩니다.", "반대로 U+XXXX를 입력하면 글자가 표시됩니다."], faq: [{ q: "이모지도 되나요?", a: "네. 다중 코드포인트(서러게이트 페어, ZWJ 시퀀스)까지 표시합니다. 가족 이모지(👨‍👩‍👧‍👦)는 5개 코드포인트의 결합입니다." }, { q: "유니코드가 뭐예요?", a: "전 세계 모든 글자에 고유 번호를 부여하는 표준. U+0041 = 'A', U+AC00 = '가', U+1F600 = '😀'." }, { q: "왜 한글이 두 가지 표기?", a: "유니코드는 한글을 음절형(가, U+AC00)과 자모형(ㄱ+ㅏ)로 모두 표현 가능. NFC 정규화로 통일." }, { q: "이모지 변형이 안 보여요?", a: "어떤 폰트가 그 이모지를 지원 안 하면 □ 또는 ?로 보입니다. 시스템·앱 폰트 업데이트 확인." }, { q: "한자 코드는 어디?", a: "U+4E00 ~ U+9FFF(CJK Unified Ideographs)에 약 2만 자가 모여 있습니다. 확장 영역도 있어 총 9만자 이상." }, { q: "사이트에서 글자가 깨질 때?", a: "사이트 폰트가 해당 유니코드 범위를 지원하지 않습니다. 웹폰트(Pretendard·Noto 등)로 해결되는 경우가 많아요." }], addedAt: "2026-05-14" },
  { slug: "svg-minifier", component: "SvgMinifierTool", category: "dev", icon: "🎨", navTitle: "SVG 미니파이어", title: "SVG 미니파이어 - 주석·공백·메타데이터 제거 (용량 30~60% 절감)", h1: "SVG 미니파이어", description: "SVG 파일에서 주석·여분 공백·에디터 메타데이터(Inkscape·Illustrator)를 제거해 용량을 줄입니다. 웹 아이콘 최적화, React 아이콘 컴포넌트, 로딩 속도 개선에 자주 쓰입니다.", metaDescription: "SVG 미니파이 무료. 주석·메타데이터 제거, 용량 절감.", howTo: ["SVG 코드를 붙여넣습니다.", "최적화 버튼을 누릅니다.", "결과를 복사해 웹에 사용합니다."], faq: [{ q: "어디까지 줄여요?", a: "보통 30~60% 용량이 줄어듭니다. Illustrator·Figma 출력 SVG는 메타데이터가 많아 더 큰 효과." }, { q: "디자인이 달라지나요?", a: "아닙니다. 시각적으로 동일하며 용량과 가독성만 줄어듭니다. Path·좌표는 그대로." }, { q: "SVG vs PNG 어느 게 좋아요?", a: "아이콘·로고·일러스트는 SVG(벡터, 무한 확대). 사진은 PNG·WebP가 효율적." }, { q: "SVGO와 같은 도구인가요?", a: "유사한 기능을 제공합니다. SVGO는 더 많은 옵션(plugin)을 가지며, 빌드 자동화에 적합." }, { q: "Path 데이터도 압축되나요?", a: "기본 압축은 공백·주석 제거 위주. d 속성의 경로 데이터 단축은 SVGO 같은 전문 도구에서 더 강력합니다." }, { q: "React 컴포넌트에 인라인할 때?", a: "최적화한 SVG를 JSX에 그대로 붙여넣으면 됩니다. style·class를 React 표기(camelCase)로 바꿔야 할 수 있어요." }], addedAt: "2026-05-14" },

  // ===== Batch G - text =====
  { slug: "text-reverse", component: "TextReverseTool", category: "text", icon: "↩️", navTitle: "텍스트 거꾸로", title: "텍스트 거꾸로 - 글자/단어/줄 단위 역순", h1: "텍스트 거꾸로 만들기", description: "글자, 단어, 줄 단위로 텍스트를 역순으로 뒤집습니다. 짤·재미용·암호화 연습에 사용.", metaDescription: "텍스트 거꾸로 무료. 글자·단어·줄 역순.", howTo: ["텍스트를 입력합니다.", "모드를 선택합니다.", "복사합니다."], faq: [{ q: "한글도 되나요?", a: "네. 한글 음절 단위로 역순됩니다." }], addedAt: "2026-05-14" },
  { slug: "line-numbers", component: "LineNumbersTool", category: "text", icon: "1️⃣", navTitle: "줄 번호 추가", title: "텍스트 줄 번호 추가 - 자동 번호 매기기", h1: "줄 번호 추가", description: "여러 줄 텍스트에 자동으로 줄 번호를 매깁니다. 시작 번호·구분자·자릿수 패딩 설정 가능.", metaDescription: "줄 번호 추가 무료. 시작 번호·구분자 조절, 일괄 처리.", howTo: ["텍스트를 입력합니다.", "옵션을 조절하면 즉시 반영됩니다."], faq: [{ q: "0부터 시작도 되나요?", a: "시작 번호를 자유롭게 입력할 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "reading-time", component: "ReadingTimeTool", category: "text", icon: "⏰", navTitle: "발표·읽기 시간", title: "발표 시간 / 읽기 시간 추정 - 글자수 → 분", h1: "발표 / 읽기 시간 추정", description: "텍스트 글자수로 발표 시간(WPM)과 묵독 시간을 추정합니다. 한국어·영어 분당 속도 조절 가능.", metaDescription: "발표 시간 추정 무료. WPM 기반, 한국어·영어 지원.", howTo: ["원고를 붙여넣습니다.", "분당 단어/글자 수를 조절합니다."], faq: [{ q: "기본 속도?", a: "한국어 발표 평균 분당 300자, 묵독 분당 500자입니다." }], addedAt: "2026-05-14" },
  { slug: "hanja-to-hangul", component: "HanjaToHangulTool", category: "text", icon: "漢", navTitle: "한자 → 한글", title: "한자 한글 변환 - 자주 쓰는 한자 600자", h1: "한자 → 한글 변환", description: "자주 쓰는 한자 600자를 한글 음으로 변환합니다. 이름·기사·계약서 한자 읽기에 유용.", metaDescription: "한자 한글 변환 무료. 자주 쓰는 한자 600자, 빠른 검색.", howTo: ["한자가 포함된 텍스트를 입력합니다.", "한글 변환 결과가 표시됩니다."], faq: [{ q: "모든 한자가 되나요?", a: "자주 쓰는 600자 사전 기반입니다. 누락된 한자는 그대로 둡니다." }], addedAt: "2026-05-14" },
  { slug: "ascii-box", component: "AsciiBoxTool", category: "text", icon: "▢", navTitle: "ASCII 박스", title: "ASCII 박스 / 테두리 - 텍스트를 박스로 둘러싸기 (코드 주석·README)", h1: "ASCII 박스 만들기", description: "텍스트를 깔끔한 ASCII / 유니코드 박스로 둘러쌉니다. 코드 주석 헤더, README 강조 표시, 디스코드·슬랙 메시지 강조, 터미널 출력 꾸미기, 메뉴 텍스트 디자인에 자주 쓰입니다.", metaDescription: "ASCII 박스 무료. 텍스트 둘러싸기, 다양한 박스 스타일.", howTo: ["텍스트를 입력합니다.", "박스 스타일을 선택합니다.", "복사해서 어디든 붙여넣습니다."], faq: [{ q: "스타일 종류?", a: "단순 ASCII (+-|), 둥근 모서리(╭─╮), 두꺼운 선(┃━), 이중선(║═) 등 여러 스타일 지원합니다." }, { q: "왜 깨져 보여요?", a: "유니코드 박스 문자(─│┌)는 고정폭(monospace) 폰트에서만 정확히 정렬됩니다. 코드 에디터·터미널에서는 잘 보이고, 워드의 일반 폰트에선 어긋날 수 있습니다." }, { q: "여러 줄 텍스트도 됩니까?", a: "네. 줄바꿈된 텍스트도 자동으로 가장 긴 줄에 맞춰 박스가 그려집니다." }, { q: "코드 주석에 어떻게 활용?", a: "각 언어 주석 표시(//, #, /*)와 함께 박스 안에 섹션 제목을 넣으면 가독성이 크게 좋아집니다." }, { q: "한글도 됩니까?", a: "네. 다만 한글은 영문보다 두 배 폭이라 일부 폰트에서 박스가 어긋날 수 있어요. D2Coding·Source Code Pro 같은 한글 등폭 폰트를 권장합니다." }], addedAt: "2026-05-14" },
  { slug: "encoding-convert", component: "EncodingConvertTool", category: "text", icon: "🔤", navTitle: "텍스트 인코딩 변환", title: "텍스트 인코딩 변환 - EUC-KR / CP949 / UTF-8 한글 깨짐 복구", h1: "텍스트 인코딩 변환 / 한글 깨짐 복구", description: "EUC-KR / CP949로 저장된 파일이 UTF-8로 잘못 읽혀 깨진 한글(��)을 복원합니다. 옛 텍스트 파일 열기, 메모장에서 깨진 CSV·이메일, 구버전 한컴오피스·정부 시스템 파일 복구, 깃허브에서 한글 파일 안 보일 때 자주 쓰입니다.", metaDescription: "한글 깨짐 복구 무료. EUC-KR / CP949 / UTF-8 변환, 텍스트·파일 지원.", howTo: ["깨진 글자가 포함된 텍스트를 붙여넣거나 파일을 업로드합니다.", "원본 인코딩을 선택합니다.", "복원된 결과를 받습니다."], faq: [{ q: "왜 한글이 깨지나요?", a: "파일이 EUC-KR/CP949로 저장됐는데 프로그램이 UTF-8로 읽으면 깨집니다. 원본 인코딩을 알려주면 복원 가능합니다." }, { q: "EUC-KR과 CP949 차이?", a: "EUC-KR이 더 좁은 범위(2,350자), CP949가 더 넓은 범위(11,172자, 모든 한글) 지원. 윈도우 한글 메모장 기본은 CP949입니다." }, { q: "복구가 안 돼요. 왜?", a: "(1) 원본 인코딩 추측이 틀렸을 수 있음, (2) 파일이 한번 더 깨진 상태(이중 변환)일 수 있음, (3) 이미지로 저장된 텍스트는 OCR이 필요합니다." }, { q: "이메일·구글 시트에서 한글이 깨질 때도 사용?", a: "외국 메일 시스템·다른 나라 OS에서 받은 한글이 자주 깨집니다. EUC-KR로 시도해 보세요." }, { q: "엑셀 CSV 한글 깨짐도 해결?", a: "네. 엑셀이 한국어 CSV를 UTF-8로 잘못 읽어 깨지는 경우가 흔합니다. 이 도구로 EUC-KR → UTF-8 변환 후 다시 열면 됩니다." }, { q: "파일 업로드도 됩니까?", a: "텍스트 입력뿐 아니라 .txt·.csv 파일 업로드도 지원합니다. 큰 파일도 브라우저 안에서 즉시 처리됩니다." }], addedAt: "2026-05-14" },
  { slug: "line-joiner", component: "LineJoinerTool", category: "text", icon: "🔗", navTitle: "여러 줄 → 한 줄", title: "줄 합치기 - 여러 줄을 한 줄로 또는 구분자로 연결 (SQL IN 절)", h1: "텍스트 줄 합치기", description: "여러 줄 텍스트를 한 줄로 합치거나, 쉼표·세미콜론 등 구분자로 연결합니다. 엑셀 한 열을 SQL IN 절('A','B','C')로 만들기, CSV 데이터 정리, 명단을 한 줄 텍스트로 변환, 검색 키워드 OR 검색문 만들기에 자주 쓰입니다.", metaDescription: "여러 줄 합치기 무료. 구분자 선택, 빈 줄 제거, 따옴표 옵션.", howTo: ["줄별로 입력된 텍스트를 붙여넣습니다.", "구분자와 옵션(따옴표·괄호 등)을 선택합니다.", "결과를 복사해 SQL·코드·검색창에 활용합니다."], faq: [{ q: "SQL IN 절은 어떻게?", a: "구분자 쉼표 + 따옴표 옵션을 켜면 'A','B','C' 형식이 됩니다. WHERE name IN ('A','B','C')에 그대로 사용 가능." }, { q: "빈 줄도 합쳐지나요?", a: "옵션으로 빈 줄 자동 제거가 가능합니다. 보통 빈 줄은 빼고 합치는 게 깔끔합니다." }, { q: "구분자에 줄바꿈을 넣을 수 있나요?", a: "특수 구분자(탭·줄바꿈)도 지원합니다. 이스케이프 문자(\\n, \\t)로 입력하세요." }, { q: "엑셀에서 복사한 데이터도 됩니까?", a: "네. 엑셀 한 열을 복사하면 줄바꿈으로 구분된 텍스트가 됩니다. 그대로 붙여넣어 처리하면 됩니다." }, { q: "결과가 너무 길어요. 한 줄로 만드는 게 맞나요?", a: "사용 목적에 따라 다릅니다. SQL IN 절은 한 줄, JSON 배열은 짧은 항목이면 한 줄, 긴 항목은 줄바꿈도 OK." }, { q: "반대로 한 줄을 여러 줄로 나누려면?", a: "이 도구의 역방향은 [중복 줄 제거]나 다른 텍스트 분할 도구를 사용하세요. 또는 정규식 치환으로 콤마 → 줄바꿈." }], addedAt: "2026-05-14" },

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
  { slug: "video-merge", component: "VideoMergeTool", category: "video", icon: "🎞️", navTitle: "동영상 합치기", title: "동영상 합치기 - 여러 클립을 한 동영상으로 (ffmpeg.wasm)", h1: "동영상 합치기 (concat)", description: "여러 동영상을 순서대로 이어붙여 한 파일로 만듭니다. ffmpeg.wasm 기반. 핸드폰으로 여러 컷으로 나눠 찍은 영상을 한 편으로, 강의 영상 시리즈를 한 파일로, 결혼식 하이라이트 영상 모음 만들기에 유용합니다. 동일 코덱 권장.", metaDescription: "동영상 합치기 무료. 여러 클립 연결, ffmpeg.wasm.", howTo: ["동영상 파일들을 업로드합니다 (여러 개 동시).", "위/아래 화살표로 순서를 조절합니다.", "합치기 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "다른 해상도여도 되나요?", a: "같은 해상도·코덱 권장. 다르면 재인코딩이 길어지고 일부 클립이 잘리거나 흐려질 수 있습니다." }, { q: "최대 몇 개까지?", a: "기술적 제한은 없지만 합쳐서 1GB 이내가 안정적입니다. 큰 파일은 먼저 [동영상 압축]으로 줄이세요." }, { q: "클립 사이에 전환 효과(페이드)도 들어가나요?", a: "현재는 단순 이어붙이기(concat)만 지원합니다. 페이드인/아웃이나 자막은 별도 영상 편집기에서 처리하세요." }, { q: "오디오는 어떻게 되나요?", a: "각 클립의 오디오가 순서대로 이어집니다. 음량 차이가 크면 [오디오 볼륨] 도구로 미리 맞추세요." }, { q: "MOV·MKV 파일도 됩니까?", a: "ffmpeg 기반이라 MP4·MOV·WebM은 대부분 잘 됩니다. MKV·AVI는 코덱에 따라 결과가 다를 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "video-mute", component: "VideoMuteTool", category: "video", icon: "🔇", navTitle: "동영상 무음", title: "동영상 무음 만들기 - 오디오 트랙 제거 (화질 손실 없음)", h1: "동영상 무음 / 오디오 제거", description: "동영상의 소리를 완전히 제거합니다. ffmpeg로 비디오 스트림만 복사해 빠른 처리, 화질 손실 없음. 주변 소음이 거슬리는 영상, 저작권 음악이 들어간 영상의 음성 제거, SNS·블로그용 GIF 같은 무음 영상 만들기에 자주 쓰입니다.", metaDescription: "동영상 무음 무료. 오디오 트랙 제거, 화질 손실 없음.", howTo: ["동영상을 업로드합니다.", "처리 버튼을 누르고 다운로드합니다."], faq: [{ q: "화질이 떨어지나요?", a: "재인코딩 없이 처리하므로 화질 손실이 없습니다. 비디오 스트림은 그대로 복사하고 오디오 트랙만 제거합니다." }, { q: "처리 속도가 빠른 이유?", a: "재인코딩 없이 컨테이너 수정만 하므로 짧은 영상은 몇 초, 긴 영상도 1분 내에 끝납니다." }, { q: "BGM만 빼고 사람 목소리는 남길 수 있나요?", a: "이 도구는 전체 오디오를 제거합니다. 보컬·BGM 분리는 AI 음성 분리 도구가 필요합니다." }, { q: "왜 무음으로 만드나요?", a: "(1) 시끄러운 배경음 제거, (2) 저작권 음악이 자동 검열되는 SNS에 올리기, (3) BGM을 새로 입힐 영상 준비, (4) 음성 없이도 이해되는 튜토리얼 만들기 등." }, { q: "오디오만 빼낼 수도 있나요?", a: "반대로 오디오만 추출하려면 [동영상 → MP3] 도구를 쓰세요." }], addedAt: "2026-05-14" },
  { slug: "video-info", component: "VideoInfoTool", category: "video", icon: "ℹ️", navTitle: "동영상 정보 보기", title: "동영상 정보 보기 - 해상도/길이/용량/프레임수 확인", h1: "동영상 정보 / 메타데이터", description: "동영상의 해상도·길이·용량·재생시간·프레임수 등 기본 정보를 보여줍니다. 업로드 전 규격 확인, 영상 편집 전 사양 점검, 카톡·SNS 첨부 한도 확인, 어떤 도구로 처리할지 판단할 때 유용합니다.", metaDescription: "동영상 정보 무료 보기. 해상도·길이·용량 확인.", howTo: ["동영상을 업로드합니다.", "정보가 자동 표시됩니다."], faq: [{ q: "코덱 정보도 보이나요?", a: "브라우저 비디오 API는 코덱 정보를 제공하지 않습니다. 해상도·길이·용량만 표시됩니다. 자세한 코덱 정보가 필요하면 MediaInfo 같은 전용 프로그램을 쓰세요." }, { q: "왜 동영상 정보를 알아야 하나요?", a: "예: 4K 영상은 카톡에 못 올라가므로 720p로 줄여야 한다, 1분 영상이 500MB면 압축이 필요하다, 30fps인지 60fps인지에 따라 GIF 변환 설정이 다르다 등 후속 작업 판단에 필요합니다." }, { q: "프레임 수(FPS)는 어떻게 의미하나요?", a: "초당 프레임 수. 일반 영상은 30fps, 부드러운 슬로우 모션·게임은 60fps 이상이 흔합니다. 영화는 24fps가 표준입니다." }, { q: "MOV·MKV·AVI 같은 다른 포맷도 정보가 나오나요?", a: "브라우저가 재생할 수 있는 포맷이면 정보가 표시됩니다. 일부 구형 코덱은 정보가 부분적으로만 나올 수 있습니다." }, { q: "EXIF·메타데이터에 들어 있는 위치 정보도 보이나요?", a: "촬영 위치 같은 정보는 동영상 EXIF에 들어 있을 수 있지만 본 도구는 기본 사양 위주로 표시합니다." }], addedAt: "2026-05-14" },

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
      "시각에 시간을 더하거나 빼고, 두 시각의 차이를 계산합니다. 24시간/12시간 표기 모두 지원. 회의 종료 시간 예측, 비행기 도착 시각 계산, 근무 시간 정산, 요리 타이머 합산 등에 자주 쓰입니다.",
    metaDescription:
      "시간 계산기 무료. 시각 ± 시간, 두 시각 차이, 24/12시간.",
    howTo: ["모드를 선택합니다 (덧셈/뺄셈/차이).", "값을 입력하면 즉시 계산됩니다."],
    faq: [
      { q: "초 단위까지 되나요?", a: "네. 시:분:초 모두 지원합니다." },
      { q: "자정 넘는 계산도 됩니까?", a: "네. 23시 + 3시간 = 다음 날 2시처럼 자동으로 처리됩니다. 결과에 '+1일' 같은 표시도 함께 나옵니다." },
      { q: "두 날짜 사이 일수 계산도 있나요?", a: "이 도구는 같은 날의 시각 계산용입니다. 여러 날에 걸친 기간은 [디데이 계산기]를 사용하세요." },
      { q: "근무 시간 정산에 쓸 수 있나요?", a: "출근/퇴근 시각의 '차이' 모드로 계산하면 됩니다. 점심시간 1시간을 빼려면 차이에서 1:00을 추가로 빼세요." },
      { q: "오전·오후(AM/PM) 표기는요?", a: "24시간(15:30)·12시간(3:30 PM) 양쪽 모두 지원합니다. 입력 칸 옆에서 형식을 선택할 수 있습니다." },
    ],
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
      "시급·일급·주급·월급·연봉을 서로 환산합니다. 주 40시간(주휴수당 포함 209시간/월) 기준. 한국 최저시급 비교도 표시. 알바·계약직 급여 책정, 프리랜서 시간당 단가 결정, 채용 공고의 연봉을 시급으로 비교하기 등에 자주 쓰입니다.",
    metaDescription:
      "시급 월급 환산 무료. 주 40h, 주휴수당 포함, 한국 최저시급 비교.",
    howTo: ["한 칸에 금액을 입력합니다.", "나머지 모든 단위가 자동 환산됩니다.", "주 근로시간을 조절할 수 있습니다."],
    faq: [
      { q: "주휴수당이 뭐예요?", a: "주 15시간 이상 근무하면 받는 유급 휴일 수당입니다. 시급 → 월급 환산 시 209시간 기준에 자동 포함됩니다." },
      { q: "2026년 최저시급은?", a: "도구 안에 최신 한국 최저시급이 표시됩니다 (참고용)." },
      { q: "209시간은 어떻게 나오나요?", a: "주 40시간 근무 + 주 8시간 주휴수당 = 주 48시간. 월 4.345주 평균 × 48 ≈ 209시간. 정규직 풀타임 기준입니다." },
      { q: "주 40시간 미만(파트타임)은 어떻게?", a: "도구에서 주 근로시간을 직접 입력할 수 있습니다. 주 25시간 알바라면 25로 바꾸세요. 주 15시간 미만은 주휴수당이 없습니다." },
      { q: "실수령액(세후)도 계산되나요?", a: "이 도구는 세전 환산입니다. 4대보험·소득세를 공제한 실수령액은 [연봉 실수령액] 도구를 사용하세요." },
      { q: "야간수당·연장수당도 포함?", a: "기본 시급만 환산합니다. 야간(22~06시)·연장(주40h 초과)·휴일근무는 통상시급의 1.5배가 별도 적용됩니다." },
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
      "마지막 생리 시작일(LMP) 또는 수정일 기준으로 예상 출산일·현재 임신 주수·삼분기를 계산합니다. Naegele 공식 기반. 임신 확인 직후 첫 산부인과 방문 전 대략적 예측, 임신 주차별 변화 추적, 출산 준비 일정 짜기에 유용합니다.",
    metaDescription:
      "출산 예정일 계산 무료. 마지막 생리일 / 수정일, 임신 주수, 삼분기.",
    howTo: ["기준 모드(마지막 생리일 / 수정일)를 선택합니다.", "날짜를 입력하면 예정일·주수가 계산됩니다."],
    faq: [
      { q: "정확한가요?", a: "Naegele 공식(LMP + 280일) 기반 추정치입니다. 약 70%의 출산이 예정일 ±2주 안에 일어납니다. 정확한 예정일은 산부인과 초음파 검진을 따르세요." },
      { q: "마지막 생리일을 모르면?", a: "수정일(배란일) 기준으로 계산하거나, 초음파로 측정한 임신 주수에서 역산해야 합니다. 산부인과 첫 방문 시 정확하게 확인됩니다." },
      { q: "임신 주수는 어떻게 세나요?", a: "마지막 생리 시작일을 임신 0주 0일로 칩니다. 실제 수정은 약 2주 뒤지만 임신 주수는 LMP 기준이 표준입니다. 40주 = 만 9개월." },
      { q: "삼분기는 어떻게 나누나요?", a: "1삼분기: 0~13주, 2삼분기: 14~27주, 3삼분기: 28~40주. 각 시기마다 신체 변화와 주의사항이 다릅니다." },
      { q: "쌍둥이도 같은 공식인가요?", a: "쌍둥이는 평균 36~37주에 출산하는 경우가 많아 예정일 추정과 다를 수 있습니다. 산부인과 검진을 따르세요." },
      { q: "이 사이트가 의료 정보 제공인가요?", a: "단순 계산 도구입니다. 의학적 조언이나 진단을 대신하지 않으니, 임신 관련 결정은 반드시 의료진과 상담하세요." },
    ],
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
      "삼각함수, 로그, 거듭제곱, 제곱근 등 공학·과학 계산을 지원합니다. 식 입력 방식이라 길고 복잡한 계산도 한 번에 가능. 수학·물리·공학 학생, 엔지니어, 수능 수학 풀이 보조, 통계 빠른 계산 등에 자주 쓰입니다.",
    metaDescription:
      "공학용 계산기 무료. sin·cos·tan·log·sqrt·pow, 식 입력 방식, 즉시 결과.",
    howTo: ["식을 입력합니다 (예: sin(30) + cos(60)).", "결과가 즉시 표시됩니다.", "괄호로 우선순위를 명확히 합니다."],
    faq: [
      { q: "각도 단위가 뭔가요?", a: "도(degree, 0~360)와 라디안(radian, 0~2π) 모드를 선택할 수 있습니다. 수능·고등학교는 도 단위, 대학 수학은 라디안이 흔합니다." },
      { q: "어떤 함수가 지원되나요?", a: "sin, cos, tan, asin, acos, atan, log(10진), ln(자연로그), sqrt(√), pow(거듭제곱), abs(절댓값), exp 등 표준 함수를 모두 지원합니다." },
      { q: "그래프도 그릴 수 있나요?", a: "그래프가 필요하면 [그래픽 계산기] 도구를, 수식 자체를 LaTeX로 만들고 싶으면 [수식 빌더] 도구를 함께 사용하세요." },
      { q: "큰 숫자나 매우 작은 숫자는?", a: "자바스크립트 부동소수점 범위(약 ±1.8×10³⁰⁸)까지 가능합니다. 그 이상은 e+표기법으로 자동 표시됩니다." },
      { q: "한 번에 여러 식을 계산할 수 있나요?", a: "변수 사용은 미지원이지만, 결과를 다음 식에 복사해 이어서 쓸 수 있습니다." },
      { q: "공학용 표기(scientific notation)도 지원?", a: "결과가 큰 수이면 1.23e+10 형태로 표시되고, 입력도 그렇게 가능합니다 (예: 1.5e3 = 1500)." },
    ],
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
      "X의 N%, X는 Y의 몇%, X에서 Y까지 변화율, X에 N% 증가/감소를 모두 한 화면에서 계산합니다. 매출 증감률, 학생 정답률, 다이어트 체중 변화, 주식 수익률, 시험 점수 비율 등 일상의 모든 퍼센트 계산에 사용합니다.",
    metaDescription:
      "백분율 계산기 무료. 퍼센트 다양한 모드, 증감률·변화율.",
    howTo: ["원하는 모드를 선택합니다.", "값을 입력하면 결과가 즉시 표시됩니다."],
    faq: [
      { q: "증감률 계산 공식이 뭔가요?", a: "(새값 - 기존값) / 기존값 × 100. 예: 1000원 → 1200원이면 (1200-1000)/1000×100 = 20% 증가." },
      { q: "100% 이상 증가는 무슨 뜻인가요?", a: "원래값의 2배 이상이라는 뜻입니다. 1000 → 2500이면 150% 증가(원래의 2.5배). 100% 증가 = 2배라는 점 헷갈리지 마세요." },
      { q: "할인율과 백분율 계산은 다른가요?", a: "할인율 계산 전용은 [할인율 계산기]에서 정가↔할인가 양방향 계산이 더 직관적입니다." },
      { q: "퍼센트 포인트(%p)와 퍼센트(%)는 어떻게 달라요?", a: "퍼센트는 비율 변화, 퍼센트 포인트는 절대 차이입니다. 예: 5% → 7%로 가면 '2%p 증가'(절댓값)이고 '40% 증가'(상대값)입니다." },
      { q: "여러 단계 할인이 누적되나요?", a: "단순 더하기가 아닙니다. 30% 할인 + 10% 할인 = 37% 할인 (1-0.7×0.9). 단계별로 다시 입력해 계산하세요." },
      { q: "음수도 계산되나요?", a: "네. -50%(절반 감소) 같은 음수 변화율도 정상 계산됩니다." },
    ],
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
      "정가에서 할인율 적용해 할인가 계산, 정가와 할인가로 할인율 계산, 할인가 + 할인율로 정가 역산 등 모드 지원. 쇼핑몰 세일 가격 확인, 회원 할인 적용, 카드 즉시할인 + 쿠폰 중복 계산, 매장 가격표 작성에 자주 쓰입니다.",
    metaDescription:
      "할인율 계산기 무료. 정가↔할인가↔할인율 양방향 계산.",
    howTo: ["모드를 선택합니다.", "두 값을 입력하면 나머지가 계산됩니다."],
    faq: [
      { q: "중복 할인은요?", a: "할인 후 결과를 다시 입력하면 됩니다 (예: 30% → 다시 10%). 단순 합산이 아니라 30% 후 10%면 총 37% 할인입니다." },
      { q: "할인율이 정확히 얼마인지 알고 싶어요.", a: "정가와 할인가를 입력하는 모드를 선택하면 정확한 할인율(%)이 자동 계산됩니다." },
      { q: "쿠폰 + 카드 즉시할인 + 적립금 모두 함께 계산할 수 있나요?", a: "단계별로 적용하세요. 정가 → 쿠폰 후 → 카드할인 후 → 적립금 후 식으로 순차 계산합니다. 적립금은 보통 결제 후 차감이라 별도 처리." },
      { q: "부가세 포함/별도일 때는?", a: "이 도구는 단순 할인율 계산만 합니다. 부가세는 [부가세 계산기]로 따로 처리하거나, 부가세 포함 가격을 그대로 입력하면 됩니다." },
      { q: "정가를 역산하려면?", a: "할인가와 할인율을 알면 정가를 역산할 수 있습니다. 모드를 '정가 역산'으로 선택하세요." },
      { q: "1+1 같은 행사는 어떻게?", a: "1+1은 50% 할인과 같습니다 (2개를 1개 가격에). 2+1은 약 33% 할인입니다 (3개를 2개 가격에)." },
    ],
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
      "한국 부가가치세 10% 기준으로 공급가액·부가세·합계를 자동 계산합니다. 부가세 포함 가격에서 공급가액 역산도 지원. 거래명세서·세금계산서 작성, 영수증 검토, 부가세 신고 준비, 단가 책정 시 자주 쓰입니다.",
    metaDescription:
      "부가세 계산기 무료. 10% VAT, 공급가↔부가세↔합계, 역산 지원.",
    howTo: ["모드(공급가 입력 / 합계 입력)를 선택합니다.", "값을 입력하면 나머지가 계산됩니다."],
    faq: [
      { q: "면세 사업자도 쓰나요?", a: "면세 사업자에게는 부가세가 없습니다. 일반 과세자(부가세 10%)용입니다." },
      { q: "공급가액·부가세·합계 관계?", a: "합계 = 공급가액 + 부가세. 부가세 = 공급가액 × 10%. 예: 공급가액 100,000원이면 부가세 10,000원, 합계 110,000원." },
      { q: "VAT 포함가에서 공급가액만 알려면?", a: "합계 ÷ 1.1 = 공급가액. 예: 110,000원 ÷ 1.1 = 100,000원. '합계 입력' 모드로 자동 계산됩니다." },
      { q: "10% 외에 다른 세율도 있나요?", a: "한국 부가세는 일반 과세자 10%가 표준입니다. 0%(영세율, 수출 등)·면세 사업자는 별도 처리. 다른 나라 VAT(EU 20%·일본 10%)는 도구에서 세율을 변경할 수 있다면 사용 가능." },
      { q: "신용카드 결제 금액에 부가세가 포함된 건가요?", a: "사업자가 발급한 영수증은 보통 부가세 포함 합계 금액입니다. 영수증의 '공급가액'과 '세액(부가세)'이 분리 표시되어 있는지 확인하세요." },
      { q: "면세 항목과 과세 항목이 섞여 있으면?", a: "각각 따로 계산해야 합니다. 농산물·교육·의료 등 면세 항목은 부가세 0원, 일반 상품은 10% 적용." },
    ],
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
      "키와 몸무게로 BMI(체질량지수)를 계산하고 WHO 아시아-태평양 기준으로 저체중·정상·과체중·비만을 판정합니다. 다이어트 시작 전 현재 상태 점검, 건강검진 결과 해석, 보험 가입 자료 준비, 목표 체중 설정에 자주 쓰입니다.",
    metaDescription:
      "BMI 계산기 무료. 키·몸무게 입력, 비만도 즉시 판정, WHO 아시아 기준.",
    howTo: ["키(cm)와 몸무게(kg)를 입력합니다.", "BMI 값과 단계 판정이 즉시 표시됩니다."],
    faq: [
      { q: "근육량이 많아도 정확한가요?", a: "BMI는 단순 계산이라 근육·지방 비율을 구분하지 못합니다. 운동선수 등은 따로 체지방률 측정을 권장합니다." },
      { q: "BMI 공식이 뭔가요?", a: "몸무게(kg) ÷ 키(m)². 예: 70kg / (1.70m × 1.70m) = 24.2. WHO 아시아-태평양 기준: 저체중 <18.5, 정상 18.5~22.9, 과체중 23~24.9, 비만 ≥25." },
      { q: "왜 한국과 미국 기준이 달라요?", a: "아시아인은 같은 BMI에서도 서양인보다 체지방률이 높고 대사질환 위험이 큽니다. WHO 아시아-태평양 기준이 더 엄격(과체중 23 vs 미국 25)이라 한국에서는 이 기준을 씁니다." },
      { q: "아동·청소년에게도 같은 기준?", a: "아닙니다. 18세 미만은 성장·발달 단계에 따라 BMI 백분위 곡선을 사용합니다. 이 도구는 성인용이며, 아동은 소아과·소아청소년과 자료를 참고하세요." },
      { q: "BMI 외에 더 정확한 지표는?", a: "체지방률(InBody 등), 허리둘레, 허리/엉덩이 비율(WHR), 내장지방 측정 등이 있습니다. BMI는 빠른 1차 점검용입니다." },
      { q: "임산부도 사용 가능한가요?", a: "임신 중에는 BMI 기준이 다릅니다. 임신 전 BMI를 기준으로 임신 중 권장 체중 증가량이 다르니 산부인과 상담을 받으세요." },
    ],
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
      "원금·이자율·기간을 넣으면 복리로 불어난 만기 금액을 계산합니다. 일시예금과 매월 적립 두 모드 지원. 노후 대비 시뮬레이션, 자녀 학자금 적립 계획, 장기 투자 수익 추정, 단리/복리 비교에 자주 쓰입니다.",
    metaDescription:
      "복리 계산기 무료. 예금·적금 만기 금액, 이자 비교, 즉시 계산.",
    howTo: ["원금(또는 매월 적립), 연이율, 기간을 입력합니다.", "복리 주기(연/월)를 선택합니다.", "만기 금액과 총 이자가 표시됩니다."],
    faq: [
      { q: "세금은 포함되나요?", a: "세전 금액입니다. 한국 이자소득세 15.4%는 별도로 차감해 계산하세요. 세후 정확한 계산은 [적금·예금 계산기]를 사용하세요." },
      { q: "복리와 단리 차이?", a: "단리는 원금에만 이자가 붙고, 복리는 '이자에도 이자'가 붙습니다. 1000만원 5% 10년: 단리는 1500만원, 월복리는 약 1648만원." },
      { q: "한국 적금은 단리 아닌가요?", a: "맞습니다. 한국 일반 은행 적금은 대부분 단리입니다. 복리 효과를 얻으려면 만기 후 재예치하거나 [적금·예금 계산기]에서 단리 계산을 쓰세요." },
      { q: "이자율을 매년 다르게 적용할 수 있나요?", a: "현재는 고정 금리만 지원합니다. 변동 금리는 구간별로 직접 시뮬레이션해야 합니다." },
      { q: "복리 주기가 짧을수록 좋은가요?", a: "맞지만 차이는 크지 않습니다. 연 5% 기준 연복리 vs 월복리 차이는 약 0.1%포인트, 일복리도 비슷합니다. 가장 큰 변수는 기간과 금리입니다." },
      { q: "물가상승률(인플레)도 반영되나요?", a: "이 도구는 명목 수익만 계산합니다. 실질 수익은 결과에서 인플레이션율(예: 연 2~3%)을 빼서 보세요." },
    ],
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
      "서울·도쿄·뉴욕·런던·파리·시드니 등 주요 도시의 현재 시간을 한 번에 보세요. 도시 추가·삭제 가능, 실시간 업데이트. 해외 출장·여행 일정 조정, 화상 미팅 시간 잡기, 해외 친구·가족과 통화 시점 결정, 글로벌 협업 시 자주 쓰입니다.",
    metaDescription:
      "세계 시간 무료. 도시별 현재 시각, 시차 계산, 실시간 업데이트.",
    howTo: ["기본 도시들이 표시됩니다.", "+ 버튼으로 도시를 추가합니다.", "X 버튼으로 도시를 제거합니다."],
    faq: [
      { q: "서머타임이 적용되나요?", a: "Intl.DateTimeFormat이 자동으로 처리합니다. 미국·유럽 일부 도시는 3~11월에 1시간 빨라집니다." },
      { q: "한국 시간 기준으로 시차가 몇 시간인지 알 수 있나요?", a: "각 도시 옆에 한국 기준 시차(예: -14h, +9h)가 표시됩니다." },
      { q: "특정 시각으로 시차를 미리 계산할 수 있나요?", a: "기본은 현재 시간 표시입니다. 미래 특정 시각 환산이 필요하면 World Clock의 'Time Zone Converter' 같은 별도 도구가 더 편할 수 있습니다." },
      { q: "도시 목록을 저장할 수 있나요?", a: "현재는 새로고침 시 기본값으로 돌아갑니다. 자주 보는 도시는 즐겨찾기에 페이지를 등록하세요." },
      { q: "비행기 도착 시간 계산에 쓸 수 있나요?", a: "출발 시각 + 비행 시간 = 출발지 기준 도착 시각. 그 시각을 도착지 시간대로 환산하면 됩니다. [시간 계산기]와 함께 사용하세요." },
      { q: "한국 도시별 시간도 다른가요?", a: "한국은 한 시간대(KST, UTC+9)라 서울·부산·제주 모두 같은 시각입니다." },
    ],
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
      "이름이나 항목 목록에서 무작위로 N개를 뽑으세요. 회식 메뉴 정하기, 발표자 선정, 경품 추첨, 학급·동아리 조 편성, 게임 순서 정하기에 편리합니다. Web Crypto 기반 진짜 랜덤이라 공정합니다.",
    metaDescription:
      "이름 랜덤 뽑기 무료. 제비뽑기·추첨, 중복 허용/제외, Web Crypto 안전 난수.",
    howTo: ["이름이나 항목을 한 줄에 하나씩 입력합니다.", "뽑을 개수와 중복 허용 여부를 선택합니다.", "추첨 버튼을 누르면 결과가 나옵니다."],
    faq: [
      { q: "얼마나 공정한가요?", a: "Web Crypto의 안전한 난수를 사용해 통계적으로 균등하게 추첨됩니다. Math.random()보다 훨씬 안전합니다." },
      { q: "엑셀 명단을 그대로 붙여넣을 수 있나요?", a: "엑셀의 한 열을 선택해 복사하면 줄바꿈으로 구분된 텍스트가 됩니다. 그대로 붙여넣기 가능합니다." },
      { q: "중복 허용/제외 차이?", a: "허용: 같은 이름이 여러 번 당첨될 수 있음 (주사위처럼). 제외: 한 번 뽑힌 이름은 다시 뽑히지 않음 (조 편성용)." },
      { q: "공정성을 증명할 수 있나요?", a: "추첨 화면을 녹화하거나 라이브로 진행하면 됩니다. 더 공식적이려면 추첨 코드를 공개하거나 블록체인 기반 도구를 쓰세요." },
      { q: "팀·조 편성도 가능한가요?", a: "이름 목록에서 N명씩 뽑아 각 조에 배정하는 식으로 활용 가능합니다. 한 번에 N명을 뽑고 다음 추첨에서 나머지를 뽑으세요." },
      { q: "결과를 저장할 수 있나요?", a: "스크린샷이나 결과 텍스트를 복사해 저장하세요. 페이지 새로고침하면 추첨 기록은 사라집니다." },
    ],
    addedAt: "2026-05-14",
  },

  // ===== Batch G - 계산기·생활 (14) =====
  { slug: "caffeine", component: "CaffeineTool", category: "calc", icon: "☕", navTitle: "카페인 섭취 추적", title: "카페인 섭취 계산기 - 일일 권장량 비교 (커피·차·에너지음료)", h1: "카페인 섭취 추적기", description: "오늘 마신 커피·차·에너지 음료의 총 카페인을 합산하고 일일 권장량(성인 400mg)과 비교합니다. 커피 줄이기, 카페인 의존도 확인, 임신 중 안전 섭취량 점검, 수면 영향 분석에 유용합니다.", metaDescription: "카페인 계산기 무료. 음료별 합산, 권장량 비교.", howTo: ["마신 음료(아메리카노·라떼·녹차·에너지드링크 등)를 추가합니다.", "잔 수를 입력하면 총 카페인이 자동 표시됩니다.", "권장량 대비 비율을 확인합니다."], faq: [{ q: "임산부는 얼마까지?", a: "임산부는 200mg/일 이하 권장 (WHO). 임신 중 과도한 카페인은 저체중아·유산 위험과 연관될 수 있습니다." }, { q: "수면에 영향?", a: "카페인 반감기는 5~6시간입니다. 오후 2시 이후 섭취는 밤 수면에 영향을 줄 수 있어요. 늦은 오후엔 디카페인이나 차로 대체하세요." }, { q: "커피 종류별 카페인이 얼마나 다른가요?", a: "아메리카노 150mg, 에스프레소 75mg, 라떼 75mg, 카페인 라떼는 더블샷 기준. 콜드브루는 200mg+로 가장 강합니다." }, { q: "에너지드링크와 비교하면?", a: "레드불 80mg, 몬스터 160mg. 같은 양 기준 커피와 비슷하지만 액상이라 빠르게 흡수됩니다." }, { q: "차에도 카페인이 있나요?", a: "녹차 25~50mg, 홍차 50~70mg, 우롱차 30~50mg. 커피의 약 1/3~1/2 수준입니다. 디카페인 녹차도 있습니다." }], addedAt: "2026-05-14" },
  { slug: "zodiac", component: "ZodiacTool", category: "calc", icon: "♓", navTitle: "별자리 찾기", title: "별자리 찾기 - 생일로 별자리 확인 (서양 12궁 · 성격 특징)", h1: "별자리 찾기 (12궁)", description: "생일을 입력하면 서양 12궁 별자리와 기간, 성격 특징을 알려줍니다. 친구·연인 생일 선물 고를 때 참고, 성격 분석 재미용, SNS 프로필 별자리 표기에 자주 쓰입니다.", metaDescription: "별자리 찾기 무료. 서양 12궁, 생일로 확인.", howTo: ["생년월일을 입력합니다.", "별자리와 성격 특징이 표시됩니다."], faq: [{ q: "음력 생일도 되나요?", a: "별자리는 양력 기준입니다. 음력 생일이라면 [음력 ↔ 양력] 도구로 양력으로 바꾼 뒤 입력하세요." }, { q: "별자리 경계 날짜는 어떻게?", a: "달이 바뀌는 19~23일 즈음이 경계입니다. 자정 기준 양력 생일에 따라 결정됩니다." }, { q: "13번째 별자리(뱀주인자리)는 안 나오나요?", a: "현대 점성술은 전통 12궁 기준입니다. NASA가 천문학적으로 언급한 13궁은 점성술 표준이 아닙니다." }, { q: "동양 띠는 따로 있나요?", a: "[12지 띠 찾기] 도구를 사용하세요. 별자리는 양력 월일, 띠는 출생 연도 기반입니다." }, { q: "성격 분석이 과학적인가요?", a: "재미용입니다. 별자리 성격은 점성술 전통이며 과학적으로 검증되지 않았습니다. 가볍게 즐기세요." }], addedAt: "2026-05-14" },
  { slug: "chinese-zodiac", component: "ChineseZodiacTool", category: "calc", icon: "🐰", navTitle: "12지 띠 찾기", title: "띠 찾기 - 생년으로 12지 동물 확인 (간지 표시)", h1: "12지 / 띠 찾기", description: "출생 연도로 12지 띠(쥐·소·호랑이·토끼…)와 천간(60갑자)을 함께 보여줍니다. 새해 인사용 띠 확인, 연하장 디자인, 사주·궁합 입력 자료, 자녀 출생연도 띠 확인에 자주 쓰입니다.", metaDescription: "띠 찾기 무료. 12지 동물, 천간/지지, 음력 입춘 기준.", howTo: ["출생 연도를 입력합니다.", "띠와 간지(60갑자)가 표시됩니다."], faq: [{ q: "음력 입춘 전 출생은?", a: "전통적으로 띠는 음력 입춘(2월 초) 기준이라 1~2월 출생은 전 해 띠인 경우가 있습니다. 사주에서는 입춘 기준, 일반 회화에서는 양력 1월 1일 기준이 흔합니다." }, { q: "12지 동물 순서가 뭔가요?", a: "쥐(자)·소(축)·호랑이(인)·토끼(묘)·용(진)·뱀(사)·말(오)·양(미)·원숭이(신)·닭(유)·개(술)·돼지(해)." }, { q: "60갑자가 뭐예요?", a: "10간(갑·을·병·정·무·기·경·신·임·계) × 12지를 조합해 60년 주기로 같은 간지가 돌아옵니다. '경자년', '갑오년' 같은 표현이 60갑자입니다." }, { q: "한국·중국·일본 띠가 같나요?", a: "거의 같지만 일부 동물이 다릅니다. 일본은 '토끼' 대신 '돼지'를 멧돼지로 부르고, 베트남은 토끼 대신 고양이를 씁니다." }, { q: "올해 띠가 뭐예요?", a: "도구에 현재 연도를 입력하면 자동으로 알려줍니다. 2026년은 말띠, 2027년은 양띠입니다 (입춘 기준)." }], addedAt: "2026-05-14" },
  { slug: "alcohol-converter", component: "AlcoholConverterTool", category: "calc", icon: "🍶", navTitle: "알코올 도수 환산", title: "알코올 도수 환산 - 소주 N잔 = 맥주 M잔 (혈중알코올 추정)", h1: "알코올 도수·총량 환산", description: "술 종류별 알코올 함유량을 같은 양으로 환산합니다. 소주·맥주·와인·위스키 등 비교. 회식 자리에서 본인 주량 파악, 음주 후 시간 계산, 술 비교에 자주 쓰입니다.", metaDescription: "알코올 환산 무료. 소주↔맥주↔와인, 도수·총량 비교.", howTo: ["기준 술과 잔 수를 선택합니다.", "다른 술로 환산된 잔 수가 표시됩니다."], faq: [{ q: "음주운전 가능한가요?", a: "법정 한계 0.03% 이상이면 음주운전입니다. 한 잔(소주 1잔, 맥주 200ml)도 위험하니 운전 시 절대 금주하세요." }, { q: "소주 1잔과 맥주 한 잔의 알코올 양이 같나요?", a: "소주 1잔(50ml, 17%) ≈ 8.5g 알코올. 맥주 200ml(5%) ≈ 10g. 거의 비슷합니다. 맥주 500ml(생맥주 한 잔) = 소주 약 3잔." }, { q: "술이 깨려면 얼마나 걸리나요?", a: "성인 남성 기준 시간당 0.015%씩 분해됩니다. 0.05%였다면 약 3시간 후 0%. 다만 개인차·식사 여부에 따라 다릅니다." }, { q: "와인 한 병은 소주 몇 병?", a: "와인 750ml(12%) ≈ 90g 알코올. 소주 360ml(17%) ≈ 60g. 와인 한 병 ≈ 소주 1.5병 정도." }, { q: "막걸리, 사케, 위스키도 비교되나요?", a: "막걸리(6%)·청주(15%)·사케(15%)·위스키(40%)·보드카(40%) 등 주요 주종 환산을 지원합니다." }, { q: "혈중알코올농도(BAC)도 계산되나요?", a: "체중·성별에 따라 추정 가능합니다만 정확한 측정은 측정기로 해야 합니다. 음주 후 운전은 절대 금물." }], addedAt: "2026-05-14" },
  { slug: "bmr", component: "BmrTool", category: "calc", icon: "🔥", navTitle: "기초대사량 (BMR)", title: "기초대사량 BMR 계산기 - Mifflin-St Jeor 공식 (TDEE)", h1: "기초대사량 (BMR) / TDEE", description: "성별·나이·키·몸무게로 기초대사량(BMR)과 활동량 반영 TDEE를 계산합니다. 다이어트·증량 칼로리 기준값. 식단 짤 때 일일 칼로리 목표 설정, 운동량 결정, 체중 정체기 원인 파악에 자주 쓰입니다.", metaDescription: "BMR 기초대사량 무료 계산. Mifflin-St Jeor, TDEE 포함.", howTo: ["성별·나이·키·몸무게를 입력합니다.", "활동량 레벨을 선택합니다.", "BMR과 TDEE가 표시됩니다."], faq: [{ q: "어떤 공식인가요?", a: "Mifflin-St Jeor — 가장 정확하다고 알려진 현대 공식입니다. Harris-Benedict보다 5~10% 정확도 높음." }, { q: "BMR과 TDEE 차이?", a: "BMR은 가만히 누워있어도 쓰는 최소 에너지. TDEE는 BMR + 활동·운동 칼로리. 다이어트 기준은 TDEE를 봐야 합니다." }, { q: "활동량 레벨은 어떻게 선택?", a: "거의 운동 안 함(BMR×1.2), 가벼운 운동 주 1~3회(×1.375), 보통 주 3~5회(×1.55), 활발 주 6~7회(×1.725), 매우 활발(×1.9)." }, { q: "다이어트 칼로리는 얼마?", a: "TDEE - 500kcal 정도면 주 0.5kg 감량 페이스가 됩니다. -1000은 주 1kg이지만 너무 가파른 감량은 근손실·요요 위험." }, { q: "근육이 많으면 더 정확한 공식이 있나요?", a: "Katch-McArdle 공식(체지방률 입력)이 더 정확합니다. InBody로 체지방률을 알면 그 공식 쓰는 것이 좋습니다." }, { q: "이 숫자만 따라가면 살이 빠지나요?", a: "BMR은 추정치(±5%)이고 실제 소모는 일·수면·스트레스 등에 따라 다릅니다. 2~3주 추이를 보며 조정하세요." }], addedAt: "2026-05-14" },
  { slug: "running-pace", component: "RunningPaceTool", category: "calc", icon: "🏃", navTitle: "러닝 페이스 계산", title: "러닝 페이스 계산기 - km당 분, 5K/10K/하프/풀 마라톤 예측", h1: "러닝 페이스 / 시간 계산", description: "거리·시간·페이스 중 두 개를 입력하면 나머지가 계산됩니다. 5K/10K/하프/풀 마라톤 완주 시간 예측 포함. 마라톤 대회 목표 시간 설정, 훈련 페이스 결정, 한강 달리기 기록 측정에 자주 쓰입니다.", metaDescription: "러닝 페이스 무료 계산. km당 분, 5K/10K/마라톤 시간 예측.", howTo: ["거리·시간·페이스 중 두 개를 입력합니다.", "다른 값들이 자동 계산됩니다.", "5K/10K/하프/풀 환산 페이스도 함께 확인하세요."], faq: [{ q: "마라톤 시간 예측은 정확한가요?", a: "Riegel 공식 기반으로 5K 페이스로 마라톤 시간을 추정합니다. 실전 페이스는 조금 더 느릴 수 있습니다 (특히 30km 이후)." }, { q: "페이스가 뭐예요?", a: "1km를 달리는 데 걸리는 시간(분:초). '5:30/km'면 1km당 5분 30초로 달린다는 뜻입니다. 낮을수록 빠릅니다." }, { q: "초보자 페이스는 얼마가 적당해요?", a: "처음 달리기 시작하면 6:30~7:30/km도 무리 없는 페이스입니다. 천천히 오래 달릴 수 있는 게 우선이고 속도는 점점 올라갑니다." }, { q: "서브3·서브4가 뭔가요?", a: "풀 마라톤을 3시간/4시간 이내로 완주하는 것. 서브4는 4:15/km, 서브3는 4:15/km 페이스 유지가 필요합니다." }, { q: "트레드밀에서도 같나요?", a: "트레드밀은 바람 저항이 없고 벨트가 도와줘 야외보다 약 0.5~1분/km 빨리 달리는 효과가 있습니다. 보정해서 보세요." }, { q: "GPS 시계 없이도 계산할 수 있나요?", a: "달린 거리(트랙 한 바퀴 = 400m)와 시간만 알면 됩니다. 한강 구간별 거리 정보가 공개되어 있어 참고하세요." }], addedAt: "2026-05-14" },
  { slug: "tip-calculator", component: "TipTool", category: "calc", icon: "💵", navTitle: "팁 계산기", title: "팁 계산기 - 식당 팁 비율 + N분의 1 나누기 (해외여행용)", h1: "팁 계산기 (Tip)", description: "총 금액·팁 비율·인원 수를 입력하면 1인당 부담액을 계산합니다. 미국·유럽 여행 식당에서 팁 계산, 그룹 식사 비용 분담, 호텔·우버 팁 결정에 자주 쓰입니다.", metaDescription: "팁 계산기 무료. 비율·인원 N분의 1, 미국·유럽 식당.", howTo: ["총액과 팁 비율(보통 15~20%)을 입력합니다.", "인원 수를 입력합니다.", "1인당 부담액이 표시됩니다."], faq: [{ q: "한국에서도 쓰나요?", a: "한국은 보통 팁 문화가 없습니다. 봉사료가 포함된 호텔 레스토랑 정도에서만 추가 팁을 고려합니다. 해외여행 때 주로 사용." }, { q: "미국 식당 팁 비율은?", a: "일반 식당 15~20%, 고급 식당 20~25%, 배달 10~15%가 표준입니다. 서비스가 좋으면 더 줘도 됩니다." }, { q: "유럽은요?", a: "이탈리아·프랑스 등은 서비스료가 포함된 경우가 많아 5~10% 추가로 충분합니다. 영국은 12.5% 정도. 독일은 5~10%." }, { q: "택시·우버 팁은?", a: "미국은 10~15% 정도가 일반적. 우버는 앱에서 직접 추가할 수 있습니다. 한국은 보통 없음." }, { q: "팁을 안 주면 무례한가요?", a: "미국은 매우 무례하게 받아들여집니다. 서비스가 정말 나쁘지 않는 한 최소 10~15%는 주는 게 좋습니다. 유럽은 비교적 관대." }, { q: "신용카드 결제 시 팁 입력 방법?", a: "영수증의 'Tip' 칸에 금액을 쓰고 합계를 적습니다. 일부 단말기는 화면에서 비율을 선택할 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "unit-price", component: "UnitPriceTool", category: "calc", icon: "🏪", navTitle: "단가 비교", title: "단가 비교 계산기 - 큰 용량 vs 작은 용량 어느 게 더 싼가", h1: "단위당 가격 비교", description: "용량 다른 두 상품의 가격을 단위(100ml, 100g 등) 기준으로 비교해 어느 게 싼지 알려줍니다. 마트·편의점·이커머스에서 같은 제품의 대용량/소용량 가격 비교, 같은 종류 다른 브랜드 비교, 1+1 vs 일반 단품 비교에 자주 쓰입니다.", metaDescription: "단가 비교 무료. 용량 다른 두 상품 가격 비교.", howTo: ["두 상품의 가격과 용량을 입력합니다.", "어느 게 더 싼지 즉시 표시됩니다.", "단위당 가격 차이도 함께 보여줍니다."], faq: [{ q: "어떤 단위가 되나요?", a: "ml, L, g, kg, 개수 등 자유롭게 입력 가능합니다. 자동으로 같은 단위로 환산해 비교합니다." }, { q: "왜 마트는 100g당 가격을 표시할까요?", a: "공정거래위원회 규정으로 가공식품·생필품은 단위가격(100g, 100ml 등) 표시가 의무입니다. 가격표 작은 글씨에 적혀있어요." }, { q: "큰 용량이 항상 싼가요?", a: "대부분 그렇지만 마케팅·재고 처리 때문에 작은 용량이 더 싼 경우도 있습니다. 항상 단위당 가격으로 비교하세요." }, { q: "할인이나 쿠폰 적용 후 비교는?", a: "할인된 최종 가격을 입력하면 됩니다. 1+1은 한 개 가격으로 두 개 받는 거니 가격 ÷ 2로 입력." }, { q: "유통기한이 짧은데 큰 용량을 사도 될까?", a: "단순 가격만 보지 말고 본인 소비 속도를 함께 고려하세요. 못 다 먹고 버리면 결국 비싸집니다." }, { q: "쿠팡·마켓컬리 같은 이커머스에서도 쓰기 좋나요?", a: "네. 동일 상품의 다른 용량·다른 판매자 비교에 특히 유용합니다." }], addedAt: "2026-05-14" },
  { slug: "dice-coin", component: "DiceCoinTool", category: "calc", icon: "🎲", navTitle: "주사위 / 동전", title: "주사위 / 동전 던지기 - D4/D6/D8/D10/D20 + 동전 (랜덤)", h1: "주사위 굴리기 / 동전 던지기", description: "다양한 주사위(D4·D6·D8·D10·D12·D20·D100)와 동전을 굴립니다. 보드게임·TRPG·DnD 룰 적용, 결정 보조('할까 말까' 동전 던지기), 게임 순서 정하기, 아이 학습용 수학 활동 등에 사용.", metaDescription: "주사위·동전 무료. D4~D100, Web Crypto 안전 난수.", howTo: ["주사위 종류(면 수)와 개수를 선택합니다.", "굴리기 버튼을 누르면 결과가 표시됩니다.", "여러 번 굴려도 매번 새 결과."], faq: [{ q: "어떻게 공정한가요?", a: "Web Crypto의 안전한 난수를 사용합니다. Math.random()보다 통계적으로 더 균등합니다." }, { q: "D20이 뭔가요?", a: "20면체 주사위. 던전 앤 드래곤(DnD) 같은 TRPG에서 가장 자주 쓰입니다. 1이 critical fail, 20이 critical hit." }, { q: "여러 개를 동시에 굴릴 수 있나요?", a: "네. '3D6'(주사위 6면 3개)처럼 개수를 지정해 합계와 각 결과를 한 번에 볼 수 있습니다." }, { q: "동전 던지기는 50:50이 정확한가요?", a: "통계적으로 거의 균등합니다. 다만 무작위라 짧은 시도에서는 한쪽으로 치우칠 수 있어요." }, { q: "결정 보조용으로 써도 되나요?", a: "재미용으로는 좋습니다. 다만 중요한 결정은 단순 랜덤보다 장단점 분석을 거치는 게 좋습니다." }, { q: "물리 주사위와 결과가 다른가요?", a: "통계적으로는 동일합니다. 물리 주사위도 완벽 균일하지 않으니 무작위성으로는 디지털이 더 신뢰할 만합니다." }], addedAt: "2026-05-14" },
  { slug: "rps", component: "RpsTool", category: "calc", icon: "✊", navTitle: "가위바위보", title: "가위바위보 봇 - 컴퓨터와 즉시 한 판 (공정한 랜덤)", h1: "가위바위보 (Rock Paper Scissors)", description: "컴퓨터와 가위바위보 한 판. 승률 통계도 함께 표시됩니다. 결정 보조, 심심풀이, 아이들 놀이, 친구와 떨어져 있을 때 가상으로 한 판, 회의에서 누가 발표할지 정할 때 등 다양하게 쓰입니다.", metaDescription: "가위바위보 무료. 컴퓨터와 한 판, 승률 통계.", howTo: ["가위·바위·보 중 하나를 선택합니다.", "결과가 즉시 표시됩니다.", "여러 판 하면 승률 누적이 표시됩니다."], faq: [{ q: "컴퓨터가 치팅하나요?", a: "공정한 랜덤입니다. 사용자 패턴을 학습하지 않습니다. Web Crypto 기반 난수 사용." }, { q: "왜 가위바위보가 공정한가요?", a: "각 선택지가 정확히 1/3 확률입니다. 가위는 보를 이기고, 보는 바위를, 바위는 가위를 — 사이클 구조라 우열이 없습니다." }, { q: "사람과 달리 패턴이 있나요?", a: "완전 랜덤이라 패턴이 없습니다. 사람은 보를 자주 내는 경향이 있다고 알려져 있지만, 이 봇은 통계적으로 균등합니다." }, { q: "여러 명이 동시에 할 수 있나요?", a: "현재는 1대1만 지원합니다. 여러 명이라면 각자 컴퓨터와 따로 하거나 [이름 랜덤 뽑기]를 사용하세요." }, { q: "최선의 전략이 있나요?", a: "랜덤 봇 상대로는 어떤 전략도 평균 1/3 승률입니다. 사람 상대라면 상대 패턴 파악이 핵심." }], addedAt: "2026-05-14" },
  { slug: "korea-holidays", component: "KoreaHolidaysTool", category: "calc", icon: "🎌", navTitle: "한국 공휴일", title: "한국 공휴일 - 올해 / 내년 공휴일 모음 (음력 명절 · 대체공휴일)", h1: "한국 공휴일 캘린더", description: "현재 연도와 다음 연도의 한국 법정 공휴일을 한 번에 보여줍니다. 음력 명절·대체공휴일 포함. 휴가 계획, 연차 사용 타이밍, 가족 모임 일정, 해외여행 일정 잡기에 자주 쓰입니다.", metaDescription: "한국 공휴일 무료. 올해·내년, 음력 명절·대체공휴일.", howTo: ["연도를 선택합니다.", "공휴일 목록이 표시됩니다.", "황금연휴 여부도 함께 확인할 수 있습니다."], faq: [{ q: "임시공휴일은요?", a: "정부가 임시 지정한 공휴일은 발표 시기에 따라 갱신됩니다. 보통 선거일·국가적 이벤트 직전에 결정됩니다." }, { q: "대체공휴일이 뭐예요?", a: "법정 공휴일이 토·일요일과 겹치면 다음 주 월요일을 쉬게 하는 제도입니다. 설·추석·어린이날·삼일절·광복절 등이 대상입니다." }, { q: "음력 명절 날짜는 매년 다른가요?", a: "네. 설(음력 1월 1일)·추석(음력 8월 15일)은 양력으로 매년 다른 날짜에 옵니다. 도구가 자동 변환해서 보여줍니다." }, { q: "공휴일이 며칠 연속 쉬는지 알 수 있나요?", a: "도구에서 황금연휴(3일 이상 연속) 자동 하이라이트가 표시됩니다. 휴가 계획 시 유용합니다." }, { q: "외국인 노동자·외국 회사도 같은 공휴일?", a: "한국 법인은 모두 같습니다. 단, 외국 기업의 한국 지사는 본사 캘린더를 함께 쓰는 경우가 있습니다." }, { q: "공휴일에 일하면 휴일수당 받나요?", a: "근로기준법상 공휴일 근무는 통상임금 1.5배입니다. 단, 5인 미만 사업장은 적용이 다를 수 있어요." }], addedAt: "2026-05-14" },
  { slug: "lunch-picker", component: "LunchPickerTool", category: "calc", icon: "🍱", navTitle: "점심 메뉴 추천", title: "점심 메뉴 룰렛 - 오늘 뭐 먹지 결정 도와줌 (한식·중식·일식·양식)", h1: "점심 메뉴 추천 룰렛", description: "메뉴를 못 정할 때 룰렛으로 결정. 한식·중식·일식·양식 카테고리 미리 입력, 직접 추가도 가능. 사무실 점심 메뉴 정하기, 회식 장소 고르기, 데이트 메뉴 선정, 다이어트 식단 다양화에 자주 쓰입니다.", metaDescription: "점심 메뉴 룰렛 무료. 한식·중식·일식·양식, 직접 추가.", howTo: ["카테고리를 선택하거나 직접 메뉴를 추가합니다.", "룰렛을 돌립니다.", "결과 마음에 들 때까지 다시 돌려도 됩니다."], faq: [{ q: "결과 그대로 따라야 하나요?", a: "재미로만 쓰세요. 동료들과 합의가 더 중요합니다." }, { q: "메뉴 카테고리에 뭐가 들어있어요?", a: "한식(김치찌개·삼겹살·비빔밥·국밥), 중식(짜장면·짬뽕·탕수육), 일식(초밥·라멘·돈카츠), 양식(파스타·피자·스테이크) 등 흔한 메뉴가 기본 포함됩니다." }, { q: "메뉴를 직접 추가할 수 있나요?", a: "네. 자주 가는 식당이나 동네 맛집을 추가해 두면 더 실용적입니다." }, { q: "결과가 마음에 안 들면?", a: "다시 돌리거나 본인이 원하는 걸 선택하세요. 룰렛은 결정 보조용이지 강제력은 없습니다." }, { q: "다이어트 메뉴만 따로 만들 수 있나요?", a: "샐러드·연어구이·닭가슴살 도시락 같은 다이어트 메뉴만 따로 입력해서 다이어트 전용 룰렛을 만들 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "baseball-stats", component: "BaseballStatsTool", category: "calc", icon: "⚾", navTitle: "야구 ERA/타율", title: "야구 ERA · 타율 · OPS 계산기 (KBO · MLB)", h1: "야구 통계 계산기 (ERA / AVG / OPS)", description: "투수 ERA(평균자책점), 타자 타율·출루율·장타율·OPS를 즉시 계산합니다. 사회인 야구·중계 시청 보조, 판타지 야구·KBO 시즌 분석, 자녀 야구 성적 관리에 자주 쓰입니다.", metaDescription: "야구 ERA·타율·OPS 무료 계산. KBO·MLB.", howTo: ["계산하고 싶은 항목(ERA/AVG/OPS 등)을 선택합니다.", "필요한 값(자책점·이닝·안타·타수 등)을 입력합니다.", "결과가 즉시 계산됩니다."], faq: [{ q: "OPS가 뭐예요?", a: "출루율(OBP) + 장타율(SLG). 타자 전반적 능력 지표로, 0.800 이상이면 우수, 0.900 이상이면 리그 정상급입니다." }, { q: "ERA 계산 공식?", a: "(자책점 × 9) ÷ 이닝. 2.50 이하면 에이스급, 4.00~4.50이 리그 평균, 5.00 이상이면 부진." }, { q: "타율과 출루율은 어떻게 달라요?", a: "타율은 안타/타수, 출루율은 (안타+볼넷+사구)/(타수+볼넷+사구+희생플라이). 출루율이 더 종합적인 지표입니다." }, { q: "장타율(SLG)은 어떻게 계산?", a: "(단타×1 + 2루타×2 + 3루타×3 + 홈런×4) ÷ 타수. 0.500이 좋고 0.600 넘으면 슬러거입니다." }, { q: "WAR도 계산되나요?", a: "WAR(Wins Above Replacement)은 매우 복잡한 지표라 이 도구에서는 미지원입니다. KBO·MLB 공식 사이트 통계를 참고하세요." }, { q: "KBO와 MLB가 같은 공식인가요?", a: "기본 지표(AVG·ERA·OPS)는 동일합니다. 다만 리그 평균이 달라 같은 수치라도 의미가 다를 수 있습니다." }], addedAt: "2026-05-14" },
  { slug: "book-reading-time", component: "BookReadingTimeTool", category: "calc", icon: "📚", navTitle: "책 읽기 시간", title: "책 읽는 시간 계산기 - 페이지수 → 완독 시간 (한국어 평균 속도)", h1: "책 완독 시간 예측", description: "총 페이지 수와 분당 읽는 속도로 책 완독에 걸리는 시간을 추정합니다. 평균 한국어 독서 속도 적용. 독서 계획 세우기, 시험 전 교과서 진도 예측, 출퇴근 동안 읽을 수 있는 분량 가늠, 독서 모임 일정 잡기에 자주 쓰입니다.", metaDescription: "책 읽기 시간 무료 추정. 페이지수·속도, 완독 시간.", howTo: ["총 페이지 수를 입력합니다.", "독서 속도(분당 자수 또는 페이지)를 조절합니다.", "예상 완독 시간이 표시됩니다."], faq: [{ q: "기본 속도는?", a: "한국어 평균 분당 250~350자 (페이지당 약 2~3분). 영문은 평균 분당 200~300단어." }, { q: "내 독서 속도를 어떻게 알 수 있나요?", a: "익숙한 책 한 페이지를 타이머 켜고 읽어보세요. 그 시간으로 페이지당 평균 시간을 알 수 있습니다." }, { q: "전문서·어려운 책은요?", a: "전문서·철학서는 평균 속도의 절반 이하로 잡으세요. 한 문단을 여러 번 읽어야 할 수도 있습니다." }, { q: "오디오북도 적용되나요?", a: "오디오북은 보통 1.0~1.5배속으로 듣는데, 텍스트 읽기보다 30~50% 느립니다. 따로 계산이 필요합니다." }, { q: "읽다 만 책의 남은 시간 계산?", a: "총 페이지를 (총 - 읽은 페이지)로 바꿔 입력하면 됩니다." }, { q: "평균 한국인의 독서량은?", a: "통계청 자료로 성인 1인당 연 평균 7~8권 정도. 본인 페이스로 꾸준히 읽는 게 중요합니다." }], addedAt: "2026-05-14" },

  // ===== Batch H (50 tools) =====
  { slug: "image-invert", component: "ImageInvertTool", category: "image", icon: "◐", navTitle: "이미지 색반전", title: "이미지 색반전 (네거티브) - 음화 효과 무료", h1: "이미지 색 반전 / 네거티브", description: "이미지 색상을 반전해 음화(네거티브) 효과를 만들어요.", metaDescription: "이미지 색반전 무료. 네거티브 효과, 즉시 변환.", howTo: ["이미지를 업로드합니다.", "결과를 다운로드합니다."], faq: [{ q: "투명도는?", a: "투명도는 유지되고 색만 반전됩니다." }], addedAt: "2026-05-15" },
  { slug: "image-watermark-img", component: "ImageWatermarkImgTool", category: "image", icon: "🏷️", navTitle: "이미지 워터마크", title: "이미지 워터마크 - 로고/이미지 워터마크 삽입", h1: "이미지 워터마크 (이미지로)", description: "사진에 로고나 이미지를 워터마크로 얹습니다. 위치·투명도·크기 조절.", metaDescription: "이미지 워터마크 무료. 로고 삽입.", howTo: ["배경 이미지를 업로드합니다.", "워터마크 이미지를 업로드합니다."], faq: [{ q: "위치 자유?", a: "9개 위치 선택 + 미세 조정 가능." }], addedAt: "2026-05-15" },
  { slug: "image-color-transparent", component: "ImageColorTransparentTool", category: "image", icon: "🟦", navTitle: "특정 색 → 투명", title: "이미지 특정 색을 투명으로 - 배경 색 제거", h1: "이미지 색상 → 투명", description: "이미지에서 특정 색(보통 흰색 배경)을 투명으로 만들어요.", metaDescription: "이미지 배경색 투명 무료.", howTo: ["이미지를 업로드합니다.", "색상과 허용 범위를 선택합니다."], faq: [{ q: "복잡한 배경도?", a: "단색 배경에만 효과적입니다." }], addedAt: "2026-05-15" },
  { slug: "image-channels", component: "ImageChannelsTool", category: "image", icon: "🎚️", navTitle: "RGB 채널 분리", title: "이미지 RGB 채널 분리 - 빨강/녹색/파랑 보기", h1: "이미지 RGB 채널 분리", description: "이미지의 빨강·녹색·파랑 채널을 각각 분리해 그레이스케일 이미지로 보여줍니다.", metaDescription: "이미지 RGB 채널 분리 무료.", howTo: ["이미지를 업로드합니다.", "각 채널이 자동 표시됩니다."], faq: [{ q: "왜?", a: "이미지 분석·합성에 사용." }], addedAt: "2026-05-15" },
  { slug: "image-free-rotate", component: "ImageFreeRotateTool", category: "image", icon: "↻", navTitle: "이미지 임의 각도", title: "이미지 임의 각도 회전 - 1° 단위 정밀 회전", h1: "이미지 1° 단위 회전", description: "이미지를 1° 단위로 자유롭게 회전합니다. 비뚤어진 사진 보정에 사용.", metaDescription: "이미지 임의 각도 회전 무료.", howTo: ["이미지를 업로드합니다.", "각도를 조절합니다."], faq: [{ q: "여백은?", a: "투명 또는 선택한 색으로 채워집니다." }], addedAt: "2026-05-15" },
  { slug: "html-to-text", component: "HtmlToTextTool", category: "text", icon: "📰", navTitle: "HTML → 텍스트", title: "HTML 태그 제거 - 본문 텍스트만 추출 (이메일·웹페이지 본문)", h1: "HTML → 일반 텍스트", description: "HTML 코드에서 모든 태그를 제거하고 본문 텍스트만 추출합니다. 이메일 HTML 본문 정리, 웹사이트 텍스트 복사, RSS 피드 정리, ChatGPT에 깔끔하게 붙여넣기, 검색용 텍스트 추출에 자주 쓰입니다.", metaDescription: "HTML 태그 제거 무료. 웹페이지 본문 추출, 이메일 정리.", howTo: ["HTML을 붙여넣습니다.", "태그가 제거된 본문 텍스트가 표시됩니다.", "복사해서 어디든 활용하세요."], faq: [{ q: "스크립트는?", a: "<script>·<style> 태그 안의 내용은 본문에 포함되지 않습니다." }, { q: "줄바꿈은 어떻게?", a: "<p>·<br>·<div>·<h1> 같은 블록 요소는 자동으로 줄바꿈으로 변환됩니다." }, { q: "이메일에서 자주 쓰는 이유?", a: "HTML 이메일을 평문으로 변환해서 메모장·문서에 깔끔하게 옮길 때 유용합니다. 이미지 자리에 alt 텍스트가 들어갑니다." }, { q: "표 형식 HTML은요?", a: "표는 평문이라 격자가 사라지고 셀 내용만 남습니다. 표 구조가 필요하면 [HTML → 마크다운] 도구를 쓰세요." }, { q: "이모지·특수문자는 유지되나요?", a: "네. UTF-8 텍스트는 그대로 보존됩니다." }, { q: "악성 스크립트는 안전한가요?", a: "이 도구는 HTML을 텍스트로만 변환할 뿐 실행하지 않습니다. 안전하게 처리됩니다." }], addedAt: "2026-05-15" },
  { slug: "html-to-markdown", component: "HtmlToMarkdownTool", category: "text", icon: "↻", navTitle: "HTML → 마크다운", title: "HTML 마크다운 변환 - turndown 기반 (블로그 마이그레이션)", h1: "HTML → 마크다운 변환", description: "HTML을 마크다운으로 변환합니다. 워드프레스·티스토리·네이버 블로그를 깃허브·노션으로 마이그레이션, 위키 변환, 옵시디언으로 노트 옮기기, 이메일 본문 정리에 유용합니다.", metaDescription: "HTML 마크다운 변환 무료. turndown 기반.", howTo: ["HTML을 붙여넣습니다.", "마크다운 결과가 표시됩니다.", "복사해서 마크다운 편집기에 넣습니다."], faq: [{ q: "표도 변환되나요?", a: "GFM(GitHub Flavored Markdown) 확장으로 표가 변환됩니다. 다만 셀 병합 등 복잡한 표는 단순화됩니다." }, { q: "왜 turndown 기반이에요?", a: "turndown은 HTML → 마크다운 변환의 사실상 표준 라이브러리입니다. 깔끔하고 안정적인 결과를 보장합니다." }, { q: "<strong>·<em>·<code> 같은 인라인 태그도?", a: "**굵게**, *기울임*, `코드`로 정확히 변환됩니다." }, { q: "이미지·링크는?", a: "<img>는 ![alt](url), <a>는 [text](url) 형식으로 변환됩니다." }, { q: "블로그 마이그레이션 워크플로?", a: "(1) 원본 블로그 HTML 추출 → (2) 이 도구로 마크다운 변환 → (3) 노션·옵시디언·헥소·휴고에 임포트." }, { q: "스크립트·스타일은?", a: "<script>·<style>·<iframe> 같은 비콘텐츠 태그는 제거됩니다." }], addedAt: "2026-05-15" },
  { slug: "markdown-to-text", component: "MarkdownToTextTool", category: "text", icon: "📜", navTitle: "마크다운 → 텍스트", title: "마크다운 문법 제거 - 일반 텍스트만 남기기 (글자수 정확 측정)", h1: "마크다운 → 일반 텍스트", description: "마크다운 문법(**굵게**, [링크], # 헤딩 등)을 제거하고 텍스트만 남깁니다. 자소서·블로그 글의 진짜 글자수 측정, 마크다운 노트를 평문 메일·카톡으로 보내기, ChatGPT에 깔끔하게 입력하기에 자주 쓰입니다.", metaDescription: "마크다운 텍스트 변환 무료. 문법 제거, 평문 변환.", howTo: ["마크다운을 붙여넣습니다.", "마크다운 기호가 제거된 텍스트가 표시됩니다.", "복사해서 활용하세요."], faq: [{ q: "링크는 어떻게 되나요?", a: "[텍스트](url) → '텍스트'로 변환됩니다. URL은 사라집니다 (옵션으로 보존도 가능)." }, { q: "**굵게** ·*기울임* 표시는?", a: "별표·언더스코어는 제거되고 글자만 남습니다." }, { q: "코드 블록·인라인 코드는?", a: "`코드` 백틱은 제거되고 내용은 그대로 남습니다. 코드 블록 안의 줄바꿈도 유지됩니다." }, { q: "왜 글자수 측정용으로 좋아요?", a: "마크다운 기호(#, *, [])를 글자수로 세면 실제 글자수보다 많게 측정됩니다. 평문으로 변환 후 [글자수 세기]를 쓰면 정확합니다." }, { q: "이미지 마크다운은?", a: "![alt](url) → alt 텍스트만 남습니다. 이미지가 평문 환경에서 표시되지 않아 alt가 본문 역할을 합니다." }, { q: "표는 어떻게 처리?", a: "마크다운 표 격자가 사라지고 셀 내용이 평문으로 정리됩니다." }], addedAt: "2026-05-15" },
  { slug: "text-compress", component: "TextCompressTool", category: "text", icon: "🗜️", navTitle: "텍스트 압축", title: "텍스트 LZ 압축 - URL 파라미터용 짧은 문자열 만들기", h1: "텍스트 LZ 압축 / 해제", description: "긴 텍스트(JSON·코드)를 LZ-string으로 압축해 짧은 문자열로 변환합니다. URL 파라미터로 데이터 전달, 짧은 공유 링크 만들기, localStorage 절약, 채팅에서 긴 코드 공유 등에 자주 쓰입니다.", metaDescription: "텍스트 압축 무료. LZ-string, URL 안전 인코딩.", howTo: ["원본 텍스트 또는 압축된 문자열을 입력합니다.", "방향(압축/해제)이 자동 감지됩니다.", "결과를 복사합니다."], faq: [{ q: "압축률이 얼마나 되나요?", a: "JSON·코드처럼 반복이 많은 텍스트는 70%+ 절감. 자연어는 30~50% 정도 줄어듭니다." }, { q: "LZ-string이 뭐예요?", a: "JavaScript에서 흔히 쓰는 텍스트 압축 라이브러리. URL safe 모드로 압축하면 URL에 그대로 들어가는 문자열이 나옵니다." }, { q: "Base64 인코딩과 다른가요?", a: "Base64는 길이가 늘어나는 인코딩(33% 증가), LZ-string은 압축. 짧게 만드는 목적이라면 LZ-string이 적합합니다." }, { q: "URL에 넣을 때 안전한가요?", a: "URL-safe 옵션을 쓰면 ? = & 같은 특수문자가 들어가지 않아 안전합니다." }, { q: "복호화 키가 필요한가요?", a: "암호가 아닌 단순 압축이라 키 없이 누구나 풀 수 있습니다. 보안 목적이 아닌 길이 절감 용도입니다." }, { q: "한글도 압축되나요?", a: "네. 유니코드를 그대로 처리합니다. 한글이 많은 텍스트는 일반적으로 영문보다 압축률이 조금 낮습니다." }], addedAt: "2026-05-15" },
  { slug: "text-blockquote", component: "TextBlockquoteTool", category: "text", icon: "❝", navTitle: "인용구 만들기", title: "인용구 / 블록쿼트 변환 (마크다운 · 이메일 인용)", h1: "인용구 / 블록쿼트 만들기", description: "텍스트 앞에 '>'를 붙여 마크다운 블록쿼트나 이메일 인용 형식으로 변환합니다. 마크다운 블로그 글에 인용 삽입, 이메일 답장 시 원문 인용, 슬랙·디스코드 코드 블록 만들기, 토론·반박 글 작성에 자주 쓰입니다.", metaDescription: "블록쿼트 인용구 무료 변환. 마크다운, 이메일.", howTo: ["인용할 텍스트를 입력합니다.", "중첩 깊이(1·2·3 이상)를 선택합니다.", "결과를 복사해 블로그·메일에 붙여넣습니다."], faq: [{ q: "중첩 인용은요?", a: "깊이 2 이상이면 '>>', 3이면 '>>>' 식으로 늘어납니다. 이메일 답장 답장처럼 여러 단계 인용에 유용." }, { q: "마크다운 블록쿼트 문법?", a: "각 줄 앞에 '>' + 공백을 붙입니다. 여러 단락은 줄마다 '>'가 필요해 본 도구로 한 번에 처리하면 편합니다." }, { q: "이메일에서 어떻게 쓰여요?", a: "예전 이메일 답장은 원문 앞에 '>' 붙여 표시했습니다. 지금도 평문 이메일에서는 동일한 관행입니다." }, { q: "코드를 인용할 때는?", a: "코드는 인용보다 코드 블록(```)이 더 적합합니다. 다만 채팅에서 인용+코드 같이 쓰면 가독성이 좋아집니다." }, { q: "긴 인용문에서 중간 생략은?", a: "원문 일부를 빼면 '[...]' 또는 '…' 같은 생략 표시를 쓰는 게 학술 관행입니다. 본 도구는 단순 변환만 처리." }], addedAt: "2026-05-15" },
  { slug: "data-size", component: "DataSizeTool", category: "dev", icon: "💾", navTitle: "데이터 단위 변환", title: "데이터 단위 변환 - B / KB / MB / GB / TB (SI vs IEC)", h1: "데이터 크기 변환", description: "바이트·킬로바이트·메가·기가·테라·페타 사이를 변환합니다. SI(1000) vs IEC(1024) 모두 지원. 디스크 용량 비교, 네트워크 대역폭 계산, 파일 크기 가늠, 클라우드 비용 추정에 자주 쓰입니다.", metaDescription: "데이터 단위 변환 무료. B KB MB GB TB, SI/IEC 모두.", howTo: ["값과 단위를 입력합니다.", "다양한 단위로 자동 변환됩니다."], faq: [{ q: "KB vs KiB 차이?", a: "KB(킬로바이트, SI) = 1000 B, KiB(키비바이트, IEC) = 1024 B. 하드디스크는 SI, RAM·OS는 IEC를 자주 씁니다." }, { q: "왜 1TB 디스크가 931GB로 보여요?", a: "제조사는 SI(1TB = 10¹²B)로 표시하고, 윈도우는 IEC(1024 기반)로 계산해 작아 보입니다. 둘 다 맞습니다." }, { q: "MB와 Mb 다른가요?", a: "MB(메가바이트, 대문자 B) = 8 Mb(메가비트, 소문자 b). 인터넷 속도(100Mbps)는 비트, 파일 크기는 바이트." }, { q: "한국에서 어떤 표기?", a: "법적으로는 SI(1KB=1000B)이지만 컴퓨터 분야에서는 IEC(1024 기반)가 흔히 쓰입니다. 혼용이 일반적." }, { q: "구글 드라이브 vs 윈도우 표시?", a: "구글 드라이브는 SI(GB), 윈도우 탐색기는 IEC(GiB)로 표시합니다. 같은 파일도 표시 숫자가 다를 수 있어요." }, { q: "ZB(제타바이트)도 됩니까?", a: "PB(페타) → EB(엑사) → ZB(제타) → YB(요타) 순으로 점점 큽니다. 도구가 모두 지원할 수 있어요." }], addedAt: "2026-05-15" },
  { slug: "mime-types", component: "MimeTypesTool", category: "dev", icon: "📁", navTitle: "MIME 타입 사전", title: "MIME 타입 사전 - 파일 확장자 ↔ Content-Type 검색", h1: "MIME 타입 사전", description: "확장자나 MIME 타입을 양방향 검색합니다. HTTP 응답 헤더 설정, 파일 업로드 검증, 보안 정책 작성, 이메일 첨부 처리, 웹 서버 설정에 자주 쓰입니다.", metaDescription: "MIME 타입 사전 무료. 확장자 ↔ Content-Type 양방향.", howTo: ["확장자 또는 MIME 타입을 검색합니다.", "결과를 복사해 코드·설정에 사용합니다."], faq: [{ q: "얼마나 많은 타입을 지원하나요?", a: "주요 100+ 확장자를 포함합니다. 이미지·동영상·오디오·문서·코드·아카이브 등 흔히 쓰는 형식 위주." }, { q: "MIME 타입이 뭐예요?", a: "Multipurpose Internet Mail Extensions. 파일 형식을 식별하는 표준(예: image/png, application/json). HTTP·이메일 표준입니다." }, { q: "왜 정확한 MIME이 중요한가요?", a: "잘못된 MIME은 (1) 브라우저가 파일을 잘못 처리, (2) 보안 우회 위험, (3) 다운로드/표시 오작동 가능." }, { q: "사용자가 위조한 확장자는 어떻게 검증?", a: "확장자만 보지 말고 파일 magic number(첫 몇 바이트)도 검사하는 게 안전합니다. file-type 라이브러리 권장." }, { q: "내가 만든 커스텀 형식은?", a: "사실상 표준에 없으면 application/x-yourname 같이 표기. 다만 호환을 위해 표준 형식 사용을 권장합니다." }], addedAt: "2026-05-15" },
  { slug: "css-colors", component: "CssColorsTool", category: "dev", icon: "🎨", navTitle: "CSS 색상 사전", title: "CSS named colors 사전 - 148개 색상 이름과 HEX 한눈에", h1: "CSS 색상 이름 사전", description: "CSS에서 쓰는 148개 표준 색상 이름과 HEX 코드를 한눈에 보고 검색합니다. CSS 작성 시 색상 영감, 빠른 프로토타이핑, 디자인 가이드 작성에 자주 쓰입니다.", metaDescription: "CSS 색상 사전 무료. 148개 표준 색상, 클릭 복사.", howTo: ["색상 이름이나 HEX로 검색합니다.", "클릭해서 코드를 복사합니다."], faq: [{ q: "표준은요?", a: "CSS Color Module Level 4. 1차 (basic, 16개) + 2차 (extended, 148개) 모두 포함합니다." }, { q: "이름 대신 HEX 쓰면?", a: "둘 다 표준이며 결과는 같습니다. 'red'와 '#ff0000' 동일. 이름은 가독성, HEX는 정확성·미세 조절." }, { q: "'rebeccapurple' 같은 이상한 이름이?", a: "Eric Meyer의 딸 Rebecca를 기리며 추가된 색입니다. CSS 표준에 정식 등재." }, { q: "비슷한 색이 너무 많아요. 어떻게 골라요?", a: "이름이 비슷해도 미세하게 다릅니다. 예: lightgray(#D3D3D3)와 silver(#C0C0C0). 디자인 통일성을 위해 한 팔레트 안에서만 쓰세요." }, { q: "Tailwind 컬러와 비교?", a: "Tailwind는 자체 컬러 팔레트(red-50 ~ red-900). CSS named colors는 표준이라 어디서나 작동하지만 단계가 적어 디자인 시스템엔 부족할 수 있어요." }], addedAt: "2026-05-15" },
  { slug: "http-methods", component: "HttpMethodsTool", category: "dev", icon: "🔁", navTitle: "HTTP 메소드 사전", title: "HTTP 메소드 사전 - GET / POST / PUT / DELETE / PATCH 정리", h1: "HTTP 메소드 사전", description: "HTTP 메소드 의미·사용법·멱등성을 정리합니다. RESTful API 설계, 백엔드 개발 학습, 인터뷰 준비, API 문서 작성에 자주 쓰입니다.", metaDescription: "HTTP 메소드 사전 무료. GET POST PUT DELETE PATCH 의미와 멱등성.", howTo: ["메소드를 클릭해 상세 정보를 봅니다.", "사용 예시와 멱등성 정보를 확인합니다."], faq: [{ q: "멱등성이 뭐예요?", a: "여러 번 실행해도 같은 결과(서버 상태). GET·PUT·DELETE는 멱등, POST는 비멱등. 같은 POST를 여러 번 하면 여러 리소스가 생성됩니다." }, { q: "PUT vs PATCH 차이?", a: "PUT은 전체 리소스 교체, PATCH는 부분 수정. PUT은 멱등하지만 PATCH는 경우에 따라 다름." }, { q: "POST와 PUT 어느 걸 써요?", a: "리소스 ID를 클라이언트가 정하면 PUT, 서버가 정하면 POST. RESTful API 설계 시 자주 헷갈리는 부분." }, { q: "DELETE에 응답 본문 필요?", a: "표준상 204 No Content 응답이 흔합니다. 다만 삭제한 리소스 정보를 200으로 돌려주는 API도 있어요." }, { q: "OPTIONS는 언제?", a: "CORS preflight 요청에 자동 사용. 직접 호출은 거의 없지만 API가 어떤 메소드를 지원하는지 확인할 때 유용." }], addedAt: "2026-05-15" },
  { slug: "env-parser", component: "EnvParserTool", category: "dev", icon: "🔐", navTitle: ".env 파서", title: ".env 파일 파서 - KEY=VALUE → JSON 변환 (검증·디버깅)", h1: ".env 파일 파서", description: "환경 변수 파일을 JSON 객체로 변환하거나 JSON을 .env 형식으로 변환합니다. 환경 설정 디버깅, 다른 시스템으로 변수 이전, CI/CD 환경 변수 검증에 자주 쓰입니다.", metaDescription: ".env 파서 무료. KEY=VALUE → JSON, 양방향 변환.", howTo: [".env 내용을 붙여넣습니다.", "JSON 형식 결과가 표시됩니다.", "필요하면 반대 방향(JSON → .env)도 가능."], faq: [{ q: "인용은 어떻게 처리?", a: "쌍따옴표·홑따옴표 모두 처리. 'value with spaces' 같은 인용된 값도 정확히 파싱됩니다." }, { q: "주석(#)도 보존되나요?", a: "JSON으로 변환 시 주석은 제거됩니다. .env로 다시 변환할 때는 주석이 없어집니다." }, { q: "여러 줄 값(multi-line)도?", a: "표준 .env는 한 줄 값만 지원합니다. 여러 줄은 \\n 이스케이프를 쓰거나 base64로 인코딩하세요." }, { q: "보안상 안전한가요?", a: "모든 처리는 브라우저 안에서 일어나 외부로 전송되지 않습니다. 그래도 실제 운영 .env는 공개 도구에 붙여넣지 않는 게 좋습니다." }, { q: "왜 JSON으로 변환?", a: "(1) 코드에 직접 임베드, (2) 다른 형식(.toml, .yaml)으로 변환할 중간 단계, (3) 키-값 구조 검증용." }], addedAt: "2026-05-15" },
  { slug: "jamo-decompose", component: "JamoDecomposeTool", category: "dev", icon: "ㄱ", navTitle: "한글 자모 분해", title: "한글 자모 분해 / 결합 - 초성·중성·종성 단위 처리", h1: "한글 자모 분해 / 결합", description: "한글 음절을 초성·중성·종성으로 분해하거나 분리된 자모를 결합합니다. 한글 검색·자동완성 구현, 자판 변환 처리, 음운 분석, 코딩 학습에 자주 쓰입니다.", metaDescription: "한글 자모 분해 무료. 초성 중성 종성, 겹받침 지원.", howTo: ["글자를 입력하면 자모로 분해됩니다.", "반대로 자모를 입력하면 결합됩니다."], faq: [{ q: "겹받침도 됩니까?", a: "ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ 모두 분해/결합 지원." }, { q: "왜 자모 분해가 필요해요?", a: "(1) 초성 검색('ㅎㄱ' → '한국'), (2) 자판 변환, (3) 한글 음운 처리 알고리즘 구현. 한국 앱·검색에 필수 기능." }, { q: "분해 결과가 유니코드 자모와 같나요?", a: "Unicode Hangul Jamo (U+1100~U+11FF) 영역의 자모를 사용. 호환용 자모(U+3131~U+318F)와 다릅니다." }, { q: "겹모음(ㅘ, ㅝ)은?", a: "기본은 한 글자로 처리됩니다. 옵션에 따라 ㅗ+ㅏ로 더 분해할 수도 있어요." }, { q: "초성 검색 구현 예시?", a: "각 글자를 자모 분해 → 초성만 추출 → 사용자 입력과 매칭. '한국' → 'ㅎㄱ', '한식' → 'ㅎㅅ'." }, { q: "성능 걱정?", a: "한 글자 분해는 마이크로초 단위로 매우 빠릅니다. 수만 글자 일괄 처리도 즉시 됩니다." }], addedAt: "2026-05-15" },
  { slug: "duration-format", component: "DurationFormatTool", category: "dev", icon: "⏳", navTitle: "초 → 시간 형식", title: "초 ↔ 시:분:초 변환 (ISO 8601 PT1H30M 지원)", h1: "초 ↔ 시간 형식 변환", description: "초 단위 숫자(7200)를 사람이 읽기 좋은 형식(2:00:00 또는 2시간)으로 변환합니다. 동영상·음악 길이 표시, 로그 분석, API 응답 처리, 운동 기록 변환에 자주 쓰입니다.", metaDescription: "초 시간 변환 무료. 시:분:초·자연어·ISO 8601.", howTo: ["초 단위 숫자나 시간 형식을 입력합니다.", "다양한 형식으로 변환된 결과가 표시됩니다."], faq: [{ q: "ISO 8601 형식도 됩니까?", a: "PT1H30M(1시간 30분), PT45S(45초) 같은 ISO 8601 duration 표기를 지원합니다. YouTube API·ISO 표준 응답에서 자주 보입니다." }, { q: "어떤 형식들?", a: "(1) 7200초, (2) 02:00:00, (3) 2시간, (4) 2h 0m 0s, (5) PT2H. 같은 시간을 여러 형식으로 동시에 표시." }, { q: "음수도 됩니까?", a: "기본은 양수입니다. 음수 duration은 일반적이지 않으니 별도 처리가 필요할 수 있어요." }, { q: "1000시간 이상도?", a: "네. 큰 숫자도 처리됩니다. 1만 시간(1.14년)도 정상 변환." }, { q: "밀리초도 됩니까?", a: "옵션으로 밀리초(ms) 단위도 지원할 수 있습니다. 게임 프레임·웹 성능 측정에 유용." }, { q: "어떤 API가 ISO 8601을 써요?", a: "YouTube Data API의 동영상 길이, JSON Schema의 duration, 일부 캘린더 API가 이 형식을 씁니다." }], addedAt: "2026-05-15" },
  { slug: "bcrypt-hash", component: "BcryptHashTool", category: "dev", icon: "🔒", navTitle: "bcrypt 해시", title: "bcrypt 해시 생성·검증 - 비밀번호 해싱 표준", h1: "bcrypt 해시 / 검증", description: "bcrypt 알고리즘으로 비밀번호를 해시하거나 기존 해시와 비교 검증합니다. 인증 시스템 개발, 테스트용 더미 데이터 생성, 데이터베이스 점검에 자주 쓰입니다.", metaDescription: "bcrypt 해시 무료. 비밀번호 해싱, cost factor 조절.", howTo: ["비밀번호를 입력합니다.", "cost factor(보통 10~12)를 선택합니다.", "해시 생성 또는 기존 해시와 비교 검증."], faq: [{ q: "운영에 그대로 써도 되나요?", a: "테스트·학습용입니다. 실제 운영은 서버 측에서 bcryptjs/bcrypt 라이브러리를 직접 쓰세요. 비밀번호를 외부 도구에 입력하는 건 권장하지 않습니다." }, { q: "cost factor가 뭐예요?", a: "해싱 반복 횟수(2^cost). 클수록 안전하지만 느립니다. 10(2024년 표준), 12(높은 보안), 14+(매우 안전 but 매우 느림)." }, { q: "bcrypt vs SHA-256?", a: "SHA-256은 빠른 해시(검증용), bcrypt는 느린 해시(비밀번호 보호용). 비번 해싱은 느린 해시가 안전(무차별 대입 방어)." }, { q: "salt는 어떻게?", a: "bcrypt는 해시 안에 salt가 자동 포함됩니다. 별도 관리 불필요. 해시 결과 자체에 $2b$10$... 형식으로 salt가 들어 있어요." }, { q: "Argon2와 비교?", a: "Argon2가 더 새롭고 메모리 공격 방어가 강합니다. 다만 bcrypt는 가장 널리 검증되어 호환성이 좋아요. 새 프로젝트면 Argon2 권장." }, { q: "같은 비번을 두 번 해싱하면 같은 결과?", a: "아닙니다. salt가 매번 달라 결과 해시도 매번 다릅니다. 검증은 비밀번호+해시를 비교해야 합니다." }], addedAt: "2026-05-15" },
  { slug: "rot-all", component: "RotAllTool", category: "dev", icon: "🔠", navTitle: "ROT 전체 보기", title: "ROT 1~25 한 번에 보기 - 시저 암호 무차별 해독 (CTF)", h1: "ROT 전체 변환 (1~25)", description: "ROT1부터 ROT25까지 모든 회전을 한 번에 적용한 결과를 표시합니다. CTF 시저 암호 풀이, 어떤 회전이 사용됐는지 모를 때 빠르게 정답 찾기, 암호 학습에 자주 쓰입니다.", metaDescription: "ROT 전체 변환 무료. 1~25 한 번에, CTF 시저 암호 해독.", howTo: ["암호화된 텍스트를 입력합니다.", "ROT1~25 변환 결과가 모두 표시됩니다.", "의미 있는 결과를 찾으세요."], faq: [{ q: "ROT13이 가장 흔한가요?", a: "네. 영문 알파벳 26자의 절반이라 같은 변환을 두 번 적용하면 원복되어 가장 많이 쓰입니다." }, { q: "[시저 암호] 도구와 차이?", a: "단일 회전 적용은 [시저 암호], 모든 회전 한 번에 보고 답 찾기는 이 도구. CTF·퀴즈에 유용." }, { q: "왜 25까지인가요?", a: "26은 원본과 같아 의미 없습니다. 1~25가 모든 다른 결과를 만듭니다." }, { q: "의미 있는 결과를 자동 인식?", a: "현재는 사람이 결과를 훑어보고 의미 있는 영문·한글을 찾아야 합니다. 자동 인식이 가능한 도구도 있긴 합니다." }, { q: "ROT47도 모든 회전을?", a: "ROT47은 더 넓은 범위라 본 도구는 ROT(영문 알파벳 회전) 위주입니다." }], addedAt: "2026-05-15" },
  { slug: "card-mask", component: "CardMaskTool", category: "dev", icon: "💳", navTitle: "민감정보 마스킹", title: "민감정보 마스킹 - 카드 · 주민번호 · 전화 · 이메일 자동 처리", h1: "민감정보 자동 마스킹", description: "카드번호·주민번호·전화번호·이메일을 자동 감지해 별표(*) 처리합니다. 로그 공유 전 점검, 스크린샷 가공, 블로그·발표 자료에서 개인정보 가리기, 데이터 분석 전 익명화에 자주 쓰입니다.", metaDescription: "민감정보 마스킹 무료. 카드/주민번호/전화/이메일 자동 감지.", howTo: ["민감정보가 포함된 텍스트를 붙여넣습니다.", "자동 감지·마스킹된 결과가 표시됩니다.", "복사해 공유에 활용합니다."], faq: [{ q: "어떤 패턴을 감지하나요?", a: "한국 신용카드(16자리), 주민번호(13자리), 휴대폰·일반 전화(10~11자리), 이메일을 자동 감지합니다." }, { q: "어떻게 마스킹돼요?", a: "예: 010-1234-5678 → 010-****-5678, 940101-1******** 같은 형식. 일부만 가려 식별 불가하게 합니다." }, { q: "오탐(false positive)이 있나요?", a: "긴 숫자 시퀀스를 카드로 오인할 수 있어요. 결과를 확인 후 사용하세요." }, { q: "외국 카드·전화번호도 됩니까?", a: "한국 패턴 위주입니다. 해외 카드(15·19자리)·국제 전화 형식은 부분적으로만 감지." }, { q: "GDPR/개인정보보호법 준수에 충분?", a: "기술적 마스킹은 1단계입니다. 법적 준수는 데이터 처리 정책·접근 통제·암호화 등 종합 대책이 필요합니다." }, { q: "다시 원본으로?", a: "마스킹은 비가역적입니다. 원본을 따로 보관하세요." }], addedAt: "2026-05-15" },
  { slug: "pdf-images-extract", component: "PdfImagesExtractTool", category: "pdf", icon: "🖼️", navTitle: "PDF 이미지 추출", title: "PDF 페이지를 이미지로 일괄 추출", h1: "PDF에서 이미지 추출", description: "PDF 각 페이지를 고해상도 PNG로 렌더링해 ZIP 묶음으로 저장.", metaDescription: "PDF 이미지 추출 무료.", howTo: ["PDF를 업로드합니다."], faq: [{ q: "원본 이미지 추출?", a: "현재는 페이지 렌더 방식." }], addedAt: "2026-05-15" },
  { slug: "pdf-n-up", component: "PdfNUpTool", category: "pdf", icon: "🧱", navTitle: "PDF N-up", title: "PDF N-up - 한 페이지에 여러 페이지 모으기 (2up · 4up)", h1: "PDF N-up (한 페이지에 여러 페이지 배치)", description: "여러 페이지를 한 장에 2x2·2x1로 모아 인쇄용 책자나 요약본을 만듭니다. 종이 절약, 강의 자료를 한 장에 4페이지 인쇄, 발표 슬라이드 핸드아웃 만들기에 자주 쓰입니다.", metaDescription: "PDF N-up 무료 변환. 2up·4up·8up 한 장에 여러 페이지, 인쇄 절약.", howTo: ["PDF를 업로드합니다.", "한 페이지에 모을 페이지 수(2·4·6·8 등)를 선택합니다.", "배치 방향(가로/세로)을 고릅니다.", "처리 후 다운로드합니다."], faq: [{ q: "여백은 어떻게 되나요?", a: "기본 여백이 적용되어 인쇄해도 가장자리에 잘림이 없도록 안전 영역을 둡니다." }, { q: "글자가 작아져서 잘 안 보이지 않나요?", a: "2up은 절반 크기, 4up은 1/4 크기가 됩니다. 본문 글자가 12pt 이상인 PDF는 4up까지 무난하고, 더 작은 글자는 2up을 권장합니다." }, { q: "양면 인쇄 책자(booklet)도 됩니까?", a: "본 도구는 단순 N-up 배치입니다. 책자 인쇄(중철 페이지 순서 자동 정렬)는 별도 책자 인쇄 도구나 프린터 드라이버의 옵션을 사용하세요." }, { q: "PPT/Keynote 슬라이드 핸드아웃에 좋나요?", a: "네. 슬라이드를 PDF로 출력 후 이 도구로 4up·6up·9up 핸드아웃을 만들 수 있어 인쇄·배포용으로 좋습니다." }], addedAt: "2026-05-15" },
  { slug: "pdf-page-size", component: "PdfPageSizeTool", category: "pdf", icon: "📐", navTitle: "PDF 페이지 크기", title: "PDF 페이지 크기 변경 - A4 · Letter · Legal · B5 변환", h1: "PDF 페이지 크기 변경 (A4·Letter·Legal·B5)", description: "모든 페이지를 A4·Letter·Legal·B5 등 표준 용지로 변경합니다. 미국 Letter 사이즈로 받은 PDF를 한국 A4로, 책자용 B5 크기로 변환할 때 유용합니다. 비율 유지 옵션으로 본문 잘림 없이 변환됩니다.", metaDescription: "PDF 페이지 크기 변경 무료. A4 Letter Legal B5 변환, 비율 유지.", howTo: ["PDF를 업로드합니다.", "원하는 용지 크기를 선택합니다 (A4/Letter/Legal/B5).", "변환 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "본문이 잘리나요?", a: "기본은 비율 유지(fit) 모드라 본문이 잘리지 않습니다. 새 용지보다 페이지가 크면 축소되어 들어가고, 작으면 여백이 추가됩니다." }, { q: "Letter와 A4 차이?", a: "Letter는 미국 표준(216×279mm), A4는 한국·유럽 표준(210×297mm)입니다. Letter는 약간 더 넓고 짧습니다." }, { q: "이미 인쇄된 PDF에서 크기만 바꾸면 잘 나오나요?", a: "축소는 보통 깔끔합니다. 확대는 화질이 떨어질 수 있으니 가능하면 원본에서 다시 출력하세요." }, { q: "페이지마다 다른 크기로 만들 수 있나요?", a: "현재는 모든 페이지가 같은 크기로 일괄 변경됩니다. 페이지별로 다르게 하려면 분리/변환/병합 단계를 따로 진행해야 합니다." }, { q: "B5나 A5도 됩니까?", a: "표준 ISO 용지(A·B 시리즈) 일부와 US Letter/Legal을 지원합니다. 더 특수한 크기는 [PDF 페이지 자르기]나 별도 도구를 이용해야 할 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "video-resize", component: "VideoResizeTool", category: "video", icon: "📐", navTitle: "동영상 리사이즈", title: "동영상 해상도 변경 - 360p · 720p · 1080p · 4K 변환", h1: "동영상 해상도 변경 (Resize)", description: "동영상을 360p, 720p, 1080p, 4K 등 표준 해상도로 변환합니다. 4K 영상을 카톡 첨부용 720p로 줄이기, 큰 영상의 모바일용 경량 버전 만들기, 강의 영상을 데이터 절약형으로 변환하기 등에 자주 쓰입니다.", metaDescription: "동영상 해상도 변경 무료. 360p·720p·1080p·4K, 비율 유지.", howTo: ["동영상을 업로드합니다.", "원하는 해상도(360p/720p/1080p/4K)를 선택합니다.", "변환 후 다운로드합니다."], faq: [{ q: "비율은 유지되나요?", a: "기본은 원본 비율 그대로 유지하면서 한 변을 기준으로 조정합니다. 가로 16:9 영상은 변환 후에도 16:9입니다." }, { q: "어떤 해상도가 좋아요?", a: "유튜브 1080p, 카톡·인스타 720p, 데이터 절약 영상 480p, 모바일 미리보기 360p가 흔합니다. 4K는 큰 화면용·편집 원본용입니다." }, { q: "해상도를 올리면 화질이 좋아지나요?", a: "아닙니다. 픽셀 정보는 늘릴수록 흐려지니, 원본보다 큰 해상도로 변환하지 마세요. AI 업스케일링이 필요하면 별도 전문 도구가 필요합니다." }, { q: "용량도 같이 줄어드나요?", a: "1080p → 720p로 줄이면 보통 용량이 절반 이하가 됩니다. 더 적극적으로 줄이려면 [동영상 압축]을 이어 쓰세요." }, { q: "오디오는 그대로인가요?", a: "오디오 트랙은 변형되지 않고 그대로 유지됩니다." }, { q: "처리 시간이 오래 걸리나요?", a: "재인코딩이라 영상 길이의 1~2배 시간이 걸립니다. 4K 영상을 720p로 줄이는 건 픽셀 수가 많아 더 오래 걸릴 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "audio-merge", component: "AudioMergeTool", category: "video", icon: "🎵", navTitle: "오디오 합치기", title: "오디오 파일 합치기 - 여러 MP3를 하나로", h1: "오디오 합치기 (MP3·WAV 연결)", description: "여러 오디오 파일을 순서대로 합쳐 하나로 만듭니다. 강의 녹음 여러 회차를 한 파일로, 음악 메들리 만들기, 팟캐스트 인트로/본문/아웃트로 묶기, 회의 녹음 분할본 합치기 등에 자주 쓰입니다.", metaDescription: "오디오 합치기 무료. 여러 MP3·WAV를 한 파일로, 순서 조정 가능.", howTo: ["오디오 파일들을 업로드합니다 (여러 개 동시).", "순서를 조정합니다.", "합치기 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "다른 포맷도 됩니까?", a: "같은 포맷·비트레이트 권장입니다. 다른 포맷을 섞으면 자동 변환되지만 음질이 떨어지거나 시간이 더 걸릴 수 있습니다." }, { q: "사이에 무음 구간을 넣을 수 있나요?", a: "현재 도구는 단순 이어붙이기만 지원합니다. 무음 구간이 필요하면 빈 MP3를 사이에 끼우거나 별도 편집 도구를 쓰세요." }, { q: "여러 트랙을 동시에(레이어로) 합치는 건 됩니까?", a: "현재는 순차 연결(concat)만 지원합니다. BGM과 보이스를 겹쳐 쓰는 믹싱은 Audacity 같은 음성 편집기에서 가능합니다." }, { q: "음량 차이는 자동 맞춰지나요?", a: "아닙니다. 음량 차이가 크면 합친 결과가 어색하니 미리 [오디오 볼륨] 도구로 비슷한 dB로 맞추세요." }, { q: "결과 포맷은 뭐예요?", a: "보통 입력 포맷과 동일하게 저장됩니다. MP3를 합치면 MP3, WAV를 합치면 WAV로 저장됩니다." }], addedAt: "2026-05-15" },
  { slug: "audio-volume", component: "AudioVolumeTool", category: "video", icon: "🔉", navTitle: "오디오 볼륨", title: "오디오 볼륨 조절 - dB 단위 증감 (정규화)", h1: "오디오 볼륨 조절 / 정규화", description: "음원을 dB 단위로 키우거나 줄입니다. 너무 작아 안 들리는 강의 녹음 키우기, 너무 큰 마이크 입력 낮추기, 여러 오디오 파일의 음량을 비슷하게 맞추는 데 자주 쓰입니다.", metaDescription: "오디오 볼륨 무료 조절. dB 단위 증감, 클리핑 경고, MP3/WAV 지원.", howTo: ["오디오 파일을 업로드합니다.", "조절할 dB 값을 입력합니다 (양수: 키움, 음수: 낮춤).", "처리 버튼을 누르고 결과를 다운로드합니다."], faq: [{ q: "왜곡 없이 어디까지 키울 수 있나요?", a: "+6dB 이상은 클리핑(소리 깨짐) 위험이 있습니다. 보통 +3dB까지가 안전합니다." }, { q: "dB가 뭔가요?", a: "데시벨 — 음량 단위. +6dB는 약 2배 큰 소리, -6dB는 약 절반. 일반 강의 녹음이 작으면 +3~6dB가 적당합니다." }, { q: "여러 파일의 볼륨을 동일하게 맞출 수 있나요?", a: "현재 도구는 한 파일씩 처리합니다. 여러 파일을 같은 수준으로 맞추는 'normalize' 기능은 자동화되어 있지 않으니 각각 조절해 보세요." }, { q: "소리가 너무 작아요. 자동으로 최대화할 수 있나요?", a: "원본의 최고점을 0dB 근처로 맞추는 'normalize' 옵션이 있다면 자동 최대화가 됩니다. 더 정밀한 라우드니스 조절(LUFS)은 전문 편집기가 필요합니다." }, { q: "음질이 떨어지나요?", a: "WAV·FLAC 같은 무손실은 그대로 유지되고, MP3 같은 손실 포맷은 재인코딩으로 미세한 손실이 있을 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "exchange-rate", component: "ExchangeRateTool", category: "calc", icon: "💱", navTitle: "환율 계산기", title: "환율 계산기 - 원/달러·엔·유로·위안 환산 (수동 입력 환율)", h1: "환율 / 통화 환산", description: "현재 환율을 직접 입력하고 원화를 여러 통화로 환산하거나 그 반대로 계산합니다. 해외여행 예산 짜기, 직구·해외 쇼핑 가격 환산, 외화 송금 금액 확인에 자주 쓰입니다.", metaDescription: "환율 계산기 무료. 원/달러·엔·유로 환산, 수동 입력.", howTo: ["네이버·다음·은행 환율을 확인합니다.", "환율(예: 1달러 = 1380원)을 입력합니다.", "원화 또는 외화 금액을 입력하면 자동 환산됩니다."], faq: [{ q: "실시간 환율은 안 되나요?", a: "외부 API 의존 없이 동작하기 위해 사용자가 직접 환율을 입력하는 방식입니다. 정확한 환율은 네이버 금융·다음 금융·은행 홈페이지에서 확인 후 입력하세요." }, { q: "여행 환전 시 어떤 환율을 봐야 하나요?", a: "은행 매매기준율 대비 환전 수수료가 다릅니다. 현찰 살 때 약 1.5%, 송금 보낼 때 약 1%. 환전 우대를 받으면 더 저렴합니다." }, { q: "직구할 때 어떤 환율?", a: "신용카드 결제는 매매기준율 + 약 0.5% 수수료가 더 붙습니다. 페이팔은 자체 환율(불리한 편)을 적용합니다." }, { q: "해외 ATM에서 출금하면?", a: "해외 ATM 출금은 매매기준율 + ATM 수수료(보통 3000~5000원). 직접 환전보다 비쌀 수 있습니다." }, { q: "여러 통화 동시 환산은?", a: "한 번에 한 통화씩 환산합니다. 여러 통화는 환율을 각각 바꿔서 비교하세요." }, { q: "환율 변동 영향이 큰가요?", a: "1년 사이 10% 이상 변동도 흔합니다. 큰 금액 송금·환전 시 시점 선택이 중요합니다." }], addedAt: "2026-05-15" },
  { slug: "statistics", component: "StatisticsTool", category: "calc", icon: "📊", navTitle: "통계 계산", title: "통계 계산기 - 평균/중앙값/표준편차/분산/사분위", h1: "기초 통계 계산기", description: "숫자 목록을 입력하면 평균·중앙값·최빈값·표준편차·분산·사분위(Q1·Q3)·범위·합계 등 기초 통계량을 한 번에 계산합니다. 과제·논문 통계, 시험 점수 분석, 설문 결과 정리, 실험 데이터 처리에 자주 쓰입니다.", metaDescription: "통계 계산기 무료. 평균·중앙값·표준편차·분산, 표본/모집단.", howTo: ["숫자들을 쉼표·줄바꿈·공백으로 구분해 입력합니다.", "기초 통계량이 자동 계산됩니다."], faq: [{ q: "표본 vs 모집단 차이?", a: "둘 다 표시됩니다. 표본 표준편차는 n-1로 나누고, 모집단 표준편차는 n으로 나눕니다. 일반적으로 데이터가 표본이면 표본 통계량을 씁니다." }, { q: "엑셀에서 복사한 데이터도 되나요?", a: "엑셀 열을 복사하면 줄바꿈으로 구분된 형태가 됩니다. 그대로 붙여넣기 가능합니다." }, { q: "중앙값이 평균보다 좋은 경우?", a: "극단값(이상치)이 있을 때 중앙값이 더 대표성 있습니다. 예: 연봉 데이터에 1억원짜리가 한 명 섞이면 평균은 왜곡되지만 중앙값은 변하지 않습니다." }, { q: "표준편차가 뭐예요?", a: "데이터가 평균에서 얼마나 떨어져 분포하는지를 나타내는 값. 작으면 데이터가 평균 주변에 모여있고, 크면 넓게 흩어져 있습니다." }, { q: "사분위(Q1·Q3)는 무슨 뜻?", a: "데이터를 4등분한 경계값. Q1은 하위 25%, Q3은 상위 25%. 박스플롯 그릴 때 사용됩니다." }, { q: "정규분포 검정도 되나요?", a: "기초 통계만 계산하며 t-검정·정규성 검정 같은 추론 통계는 미지원입니다. SPSS·R·Python이 필요합니다." }], addedAt: "2026-05-15" },
  { slug: "car-fuel", component: "CarFuelTool", category: "calc", icon: "⛽", navTitle: "자동차 연비", title: "자동차 연비 계산 - 주유 비용·통근 비용·여행 비용", h1: "자동차 연비 / 주유비 계산", description: "차량 연비(km/L)와 기름값으로 운행 비용을 계산합니다. 출퇴근 한 달 기름값, 여행 예상 주유비, 차종 비교(연비 좋은 차 = 얼마 절약?), 카풀 비용 정산에 자주 쓰입니다.", metaDescription: "자동차 연비 무료 계산. 주유비, 통근비, 여행 비용.", howTo: ["연비(km/L)와 유가(원/L)를 입력합니다.", "운행 거리를 입력합니다.", "총 주유비가 계산됩니다."], faq: [{ q: "전기차도 됩니까?", a: "현재 휘발유·경유 기준입니다. 전기차는 kWh/100km와 전기료(kWh)로 별도 계산이 필요합니다." }, { q: "연비를 어떻게 확인해요?", a: "차량 메뉴얼에 공식 연비가 적혀 있고, 트립 컴퓨터로 실주행 연비도 볼 수 있습니다. 도심·고속도로 차이가 큽니다." }, { q: "도심 vs 고속도로 연비 차이?", a: "보통 도심 연비는 고속도로의 70~80% 수준입니다. 신호 대기·가감속이 잦아 효율이 떨어집니다." }, { q: "공인 연비대로 안 나오는데요?", a: "공식 연비는 실험실 측정치라 실주행은 10~20% 낮은 게 일반적입니다. 운전 습관·도로 상태·기온 영향이 큽니다." }, { q: "주유 절약 팁?", a: "(1) 급가속·급제동 자제, (2) 적정 타이어 공기압, (3) 짐 줄이기, (4) 고속도로 100km/h 이하 정속 주행이 효과적." }, { q: "휘발유·경유·LPG 어느 게 경제적?", a: "L당 가격 × 연비를 비교해야 합니다. 경유차는 L당 가격은 싸지만 차값·정비비가 더 들 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "rent-calc", component: "RentCalcTool", category: "calc", icon: "🏠", navTitle: "전세 ↔ 월세", title: "전세 ↔ 월세 환산 - 보증금 + 월세 계산 (전월세 전환율)", h1: "전세 ↔ 월세 환산", description: "전세 보증금을 월세로, 월세를 전세금으로 환산합니다. 전월세 전환율 기반. 이사 시 보증금 부담 비교, 매물 비교(전세 vs 월세 어느 게 유리?), 보증금 일부+월세 옵션 시 자주 쓰입니다.", metaDescription: "전월세 환산 무료. 전세금·보증금·월세 양방향 계산.", howTo: ["전세금 또는 보증금+월세를 입력합니다.", "전환율(보통 한국 평균 3~6%)을 조정합니다.", "환산된 다른 형태가 표시됩니다."], faq: [{ q: "전환율이 뭐예요?", a: "보증금을 월세로 바꿀 때 쓰는 비율 (연간 %)입니다. 보증금 × 전환율 ÷ 12 = 월세. 한국 평균 3~6%/년, 지역·매물에 따라 다릅니다." }, { q: "법정 전환율 상한이 있나요?", a: "주택임대차보호법상 기준금리 + 2%(2024년 기준 약 5.5%)가 상한입니다. 임대인이 일방적으로 더 올릴 수는 없습니다." }, { q: "보증금 1억 + 월세 50만원을 전세로 환산하면?", a: "전환율 5% 기준 월세 50만원 = 보증금 약 1.2억. 합하면 전세 약 2.2억 정도가 됩니다." }, { q: "전세와 월세 어느 게 유리?", a: "보증금 마련 가능하고 안정 거주 원하면 전세. 자금 부담 줄이고 유동성이 중요하면 월세. 단순 환산만으로 결정하지 말고 본인 자금 상황을 보세요." }, { q: "반전세는 어떻게 계산?", a: "반전세 = 보증금 + 월세. 같은 도구로 보증금을 줄이면서 월세를 늘리거나 그 반대로 시뮬레이션 가능합니다." }, { q: "관리비도 포함되나요?", a: "이 도구는 임대료 환산만 합니다. 관리비·공과금은 별도로 본인 예산에 더하세요." }], addedAt: "2026-05-15" },
  { slug: "sleep-recommend", component: "SleepRecommendTool", category: "calc", icon: "😴", navTitle: "잠 시간 추천", title: "수면 시간 추천 - 90분 사이클 기반 최적 기상·취침 시각", h1: "수면 사이클 / 기상 시간", description: "한 수면 사이클(약 90분) 기반으로 가장 개운하게 일어날 수 있는 기상 시각이나 지금 자야 할 시각을 추천합니다. 야근 후 짧은 잠 시간 결정, 아침 시험·면접 전 최적 취침, 시차 적응 계획에 자주 쓰입니다.", metaDescription: "수면 시간 추천 무료. 90분 사이클, 개운한 기상 시각.", howTo: ["기상 시각 또는 취침 시각을 입력합니다.", "추천 시간들이 표시됩니다."], faq: [{ q: "왜 90분 단위인가요?", a: "한 수면 사이클(REM-NREM)이 평균 90분입니다. 사이클 중간에 깨면 피곤하고, 사이클 끝에 깨면 개운합니다." }, { q: "수면 사이클이 사람마다 다르지 않나요?", a: "80~110분 사이로 개인차가 있습니다. 90분은 평균값이라 정확하지 않을 수 있지만 ±15분 정도라 큰 차이는 없습니다." }, { q: "총 몇 시간 자야 하나요?", a: "성인은 7~9시간 (4~6 사이클). 4 사이클(6시간)은 최소 권장, 5 사이클(7.5시간)이 권장." }, { q: "잠들기까지 걸리는 시간은?", a: "보통 10~20분 정도 걸린다고 가정합니다. 도구는 자동으로 이 시간을 더해 계산합니다." }, { q: "낮잠도 90분 단위로?", a: "낮잠은 20~30분(가벼운 회복) 또는 90분(한 사이클 완주)이 권장됩니다. 60분 낮잠은 깊은 수면 중에 깨서 더 피곤할 수 있어요." }, { q: "수면의 질이 더 중요하지 않나요?", a: "맞습니다. 시간 못지않게 어두운 환경·일정한 시간·카페인 줄이기 등 수면 위생이 중요합니다." }], addedAt: "2026-05-15" },
  { slug: "blood-donation", component: "BloodDonationTool", category: "calc", icon: "🩸", navTitle: "헌혈 가능일", title: "헌혈 다음 가능일 - 전혈/혈장/혈소판 (한국 적십자사 기준)", h1: "헌혈 다음 가능일", description: "마지막 헌혈일과 종류로 다음 헌혈 가능일을 계산합니다. 한국 적십자사 기준. 정기 헌혈자 일정 관리, 헌혈증 모으기 계획, 회사·학교 단체 헌혈 일정 짜기, 다중 종류 헌혈 인터벌 확인에 유용합니다.", metaDescription: "헌혈 가능일 무료 계산. 전혈·혈장·혈소판, 적십자사 기준.", howTo: ["마지막 헌혈 날짜와 종류를 선택합니다.", "다음 가능일이 표시됩니다."], faq: [{ q: "헌혈 간격 기준은요?", a: "전혈 8주(56일), 혈장 성분헌혈 2주(14일), 혈소판 성분헌혈 2주. 한국 적십자사 기준입니다." }, { q: "전혈과 성분헌혈 어떻게 달라요?", a: "전혈은 피 전체를 뽑고, 성분헌혈은 혈장·혈소판만 뽑고 나머지는 다시 몸으로 돌려보냅니다. 회복이 빨라 자주 가능합니다." }, { q: "헌혈하면 몇 시간 휴식?", a: "헌혈 직후 15~30분 휴식, 당일은 무리한 운동·음주 자제. 정상 활동은 2~3시간 후 가능." }, { q: "헌혈 자격 조건?", a: "만 16세~69세, 체중 남 50kg/여 45kg 이상, 헌혈 가능 시각 사이 8주 이상. 일부 약물·여행 이력·감기 등은 제한될 수 있습니다." }, { q: "헌혈증을 어디 쓰나요?", a: "수혈이 필요한 가족·지인에게 양도하거나, 본인이 수혈 받을 때 의료비 일부 감면에 사용할 수 있습니다." }, { q: "헌혈해도 빈혈 안 생기나요?", a: "전혈 1회는 약 8주 만에 회복됩니다. 적십자사가 헌혈 전 헤모글로빈 검사를 해 안전 여부를 확인합니다." }], addedAt: "2026-05-15" },
  { slug: "installment", component: "InstallmentTool", category: "calc", icon: "💳", navTitle: "할부 계산", title: "신용카드 할부 계산기 - 월 부담액 + 총 수수료", h1: "신용카드 할부 계산", description: "할부 원금·이자율·기간으로 월 부담액과 총 수수료를 계산합니다. 가전·가구·여행 같은 큰 금액 결제 전 부담 점검, 무이자 할부 vs 일시불 비교, 카드사 별 수수료 비교에 자주 쓰입니다.", metaDescription: "할부 계산기 무료. 카드 월 부담액, 수수료 총합.", howTo: ["할부 원금, 이자율(연 %), 기간(개월)을 입력합니다.", "월 부담액과 총 수수료가 표시됩니다."], faq: [{ q: "카드 수수료율은 어떻게 알 수 있나요?", a: "카드사 홈페이지·고객센터에서 확인할 수 있습니다. 보통 연 15~20% 정도이고, 카드별·등급별로 다릅니다." }, { q: "무이자 할부와 차이?", a: "무이자는 수수료가 0%입니다. 정가만 그대로 분할 결제. 무이자 가능 기간(2·3·6개월)은 카드사·가맹점마다 다릅니다." }, { q: "할부 vs 일시불 어느 게 유리?", a: "수수료가 있는 할부는 결국 더 비쌉니다. 다만 (1) 현금 흐름 분산, (2) 카드 혜택(할부 한정 적립) 때문에 선택할 수 있습니다." }, { q: "중도 일시 상환되나요?", a: "카드사마다 다릅니다. 보통 미경과 수수료는 환급되지만 일부는 위약금이 있습니다. 카드사 약관 확인 필요." }, { q: "캐피탈·핀테크 할부는 다른가요?", a: "토스·카카오페이·페이코 등은 자체 수수료 체계를 씁니다. 카드사 할부와 별개로 별도 약관·이자율 확인이 필요합니다." }, { q: "신용점수에 영향?", a: "정상 상환하면 영향이 없거나 긍정적입니다. 연체하면 신용점수에 즉시 부정적인 영향이 가니 주의하세요." }], addedAt: "2026-05-15" },
    { slug: "korean-phone", component: "KoreanPhoneTool", category: "calc", icon: "📞", navTitle: "전화번호 정규화", title: "한국 전화번호 형식 변환 - 010-XXXX-XXXX (국제 +82 호환)", h1: "한국 전화번호 형식 변환", description: "어떤 형식의 전화번호도 표준 010-XXXX-XXXX 형식으로 정규화합니다. 엑셀·CRM·연락처 데이터 정리, 02-1234-5678 같은 지역번호 처리, 국제 형식(+82) 변환에 자주 쓰입니다.", metaDescription: "한국 전화번호 정규화 무료. 010 형식, +82 국제, 엑셀 일괄.", howTo: ["전화번호 또는 여러 번호를 줄바꿈으로 입력합니다.", "표준 형식으로 자동 변환됩니다.", "복사해서 엑셀·DB에 사용합니다."], faq: [{ q: "+82 국제 형식도 됩니까?", a: "네. +82-10-XXXX-XXXX ↔ 010-XXXX-XXXX 양방향 변환 가능합니다." }, { q: "지역번호(02·031·051 등)도 처리?", a: "네. 02-1234-5678 같은 일반 전화번호도 표준 형식으로 정규화됩니다." }, { q: '01012345678 같이 하이픈 없는 형식도 인식?', a: "네. 하이픈·공백·괄호 모두 자동으로 정리됩니다." }, { q: "여러 번호를 한 번에 처리할 수 있나요?", a: "줄바꿈으로 구분된 여러 번호를 한 번에 입력하면 모두 정규화됩니다." }, { q: "잘못된 번호도 표시되나요?", a: "한국 표준 자릿수에 맞지 않으면 경고가 표시됩니다. 일부 인터넷 전화(070)도 인식합니다." }, { q: "개인정보 노출 우려는?", a: "모든 처리가 브라우저에서 일어나며 외부로 전송되지 않습니다. 안심하고 사용하세요." }], addedAt: "2026-05-15" },
  { slug: "korean-biz-num", component: "KoreanBizNumTool", category: "calc", icon: "🏢", navTitle: "사업자등록번호 검증", title: "사업자등록번호 검증 - 체크섬 확인 (10자리 한국 표준)", h1: "사업자등록번호 검증", description: "한국 10자리 사업자등록번호의 체크섬을 검증해 형식이 올바른지 확인합니다. 거래처 정보 입력 검증, 세금계산서 작성 전 확인, B2B 시스템 데이터 정합성 점검, 거래 위험 1차 점검에 자주 쓰입니다.", metaDescription: "사업자등록번호 검증 무료. 체크섬 확인, 형식 점검.", howTo: ["10자리 사업자등록번호를 입력합니다.", "체크섬 유효성이 즉시 표시됩니다."], faq: [{ q: "실존하는 사업체인지도 검증되나요?", a: "아니요. 이 도구는 체크섬 형식만 검증합니다. 실제 등록 여부는 국세청 '홈택스 → 사업자등록상태 조회'에서 확인하세요." }, { q: "체크섬이 뭐예요?", a: "10자리 번호 중 마지막 자리는 앞 9자리에서 일정 규칙으로 계산된 검증 숫자입니다. 무작위 입력은 거의 통과하지 못합니다." }, { q: "사업자등록번호 구조?", a: "XXX-XX-XXXXX 형식. 앞 3자리는 발급 세무서, 중간 2자리는 사업자 유형(개인/법인), 뒤 5자리는 일련번호 + 체크섬." }, { q: "법인등록번호와 다른 건가요?", a: "다릅니다. 법인등록번호는 13자리로 법인만 가지고, 사업자등록번호는 모든 사업자(개인·법인)가 가집니다." }, { q: "내 회사 번호로 검증해도 안전한가요?", a: "모든 처리가 브라우저 안에서 일어나며 외부로 전송되지 않습니다." }, { q: "엑셀에서 여러 개 한 번에 검증?", a: "현재는 한 번에 하나씩입니다. 대량 검증이 필요하면 엑셀 함수나 별도 스크립트 활용을 권장합니다." }], addedAt: "2026-05-15" },
  { slug: "korean-rrn", component: "KoreanRrnTool", category: "calc", icon: "🆔", navTitle: "주민번호 검증", title: "주민등록번호 형식 검증 - 체크섬·생년월일·성별·외국인 여부", h1: "주민등록번호 형식 검증", description: "13자리 주민등록번호의 체크섬을 검증하고 생년월일·성별·외국인 여부를 추출합니다. 모든 처리가 브라우저 안에서 일어나 외부 전송이 없어 안전합니다. 입력 양식 검증, 자동 채워주는 폼 만들 때, 본인 주민번호 자릿수 빠르게 확인 등에 쓰입니다.", metaDescription: "주민번호 검증 무료. 체크섬, 생년월일·성별 추출, 브라우저 처리.", howTo: ["13자리 주민등록번호를 입력합니다.", "체크섬 유효성, 생년월일, 성별이 표시됩니다."], faq: [{ q: "안전한가요?", a: "모든 처리가 브라우저 안에서만 일어나며 외부 서버로 절대 전송되지 않습니다. 네트워크 탭에서 확인할 수 있습니다." }, { q: "주민번호 구조?", a: "YYMMDD-SXXXXXC. 앞 6자리는 생년월일, 뒤 첫 자리(S)는 성별·국적, 다음 4자리는 지역·일련번호, 마지막 자리는 체크섬." }, { q: "성별 자리(S) 의미?", a: "1·3(남, 한국인), 2·4(여, 한국인), 5·7(남, 외국인), 6·8(여, 외국인), 9(남, 1900년대), 0(여, 1900년대). 9·0은 1900년대생 표기로 사라져 가는 추세." }, { q: "체크섬이 뭐예요?", a: "마지막 자리는 앞 12자리에서 계산되는 검증 숫자입니다. 무작위 13자리는 거의 통과하지 않아 형식 검증에 유용합니다." }, { q: "실제 등록 여부 확인은요?", a: "이 도구는 형식만 검증합니다. 실제 등록 정보는 행정안전부·정부24를 통해서만 본인 확인이 가능합니다." }, { q: "외국인등록번호도 됩니까?", a: "외국인등록번호도 동일한 13자리 구조라 검증됩니다. 성별 자리만 5~8을 사용합니다." }, { q: "주민번호를 어디 노출해도 되나요?", a: "절대 안 됩니다. 이 도구는 본인 확인용·개발 검증용입니다. 주민번호는 가장 민감한 개인정보이며 외부 노출 시 신분도용 위험이 큽니다." }], addedAt: "2026-05-15" },
  { slug: "family-kinship", component: "FamilyKinshipTool", category: "calc", icon: "👨‍👩‍👧", navTitle: "촌수 계산", title: "촌수 계산 - 가족 호칭 찾기 (친가·외가)", h1: "촌수 / 가족 호칭", description: "친가·외가의 가족 관계를 입력하면 정확한 촌수와 한국식 호칭(고모·이모·당숙 등)을 표시합니다. 명절에 헷갈리는 친척 호칭 정리, 결혼식·장례식 인사 준비, 족보 작성에 자주 쓰입니다.", metaDescription: "촌수 계산 무료. 친가·외가, 한국식 호칭(고모·당숙).", howTo: ["나를 기준으로 가족 관계 단계를 선택합니다.", "촌수와 정확한 한국식 호칭이 표시됩니다."], faq: [{ q: "사돈도 됩니까?", a: "현재는 직계·방계 친족만 지원합니다. 사돈(인척) 호칭은 별도 규칙이라 미지원입니다." }, { q: "촌수 계산법?", a: "직계는 1세대당 1촌(부모-나 1촌, 조부모-나 2촌). 방계는 공통 조상 거쳐서 가지 수의 합 (부모-형제 = 2촌, 형제의 자식 = 3촌). 아버지=1촌, 큰아버지=3촌." }, { q: "친가와 외가 호칭이 다른가요?", a: "다릅니다. 아버지 형제는 백부·숙부, 어머니 형제는 외삼촌. 아버지 자매는 고모, 어머니 자매는 이모." }, { q: "사촌 동생/사촌 누나 어떻게 부르나요?", a: "사촌 형제자매는 큰아빠·큰엄마·고모·이모의 자식. 동생/형(누나)에 '사촌' 붙여 부릅니다. 형식적으로는 '재종' 등도 있지만 일상은 그냥 사촌." }, { q: "8촌 넘어가면 친척으로 안 쳐요?", a: "법적으로 친족 범위는 8촌(혈족)·4촌(인척)까지입니다. 그 이상은 호칭도 거의 사라집니다." }, { q: "한자 호칭(백부·종조부 등)도 표시?", a: "네. 전통적 한자 호칭과 현대 흔히 쓰는 호칭(큰아빠 등) 둘 다 표시됩니다." }], addedAt: "2026-05-15" },
  { slug: "number-format", component: "NumberFormatTool", category: "calc", icon: "🔢", navTitle: "숫자 형식 변환", title: "숫자 형식 변환 - 콤마/한국식 단위/언더스코어/공학표기", h1: "숫자 자릿수 포맷", description: "큰 숫자를 콤마(1,000,000), 한국식 단위(100만), 언더스코어(1_000_000), 공학표기(1.0e6) 등 다양한 형식으로 변환합니다. 보고서 작성, 데이터 표 정리, 가독성 높이기, 영수증·청구서 출력에 자주 쓰입니다.", metaDescription: "숫자 형식 변환 무료. 콤마·한국식·언더스코어·과학표기.", howTo: ["숫자를 입력합니다.", "다양한 형식의 변환 결과가 표시됩니다.", "원하는 형식을 복사합니다."], faq: [{ q: "큰 숫자도 됩니까?", a: "BigInt로 처리해 무제한 자릿수를 지원합니다. 100자리 숫자도 정확하게 변환됩니다." }, { q: "한국식 단위가 뭐예요?", a: "1만(10⁴), 1억(10⁸), 1조(10¹²), 1경(10¹⁶) 등 한국 전통 큰 수 표기입니다. 영문 단위(thousand·million·billion)와 자릿수가 다릅니다." }, { q: "왜 언더스코어를 쓰나요?", a: "프로그래밍 언어(JavaScript·Python 등)에서 큰 숫자 가독성을 위해 1_000_000 같은 표기를 지원합니다. 이 도구로 빠르게 변환 가능." }, { q: "공학표기(scientific notation)는 언제 써요?", a: "매우 큰/작은 숫자(천문학·물리학·통계)에 유용합니다. 1.5e6 = 1,500,000." }, { q: "음수와 소수점도 처리?", a: "네. 음수(-1,000), 소수점(1,234.56), 음의 지수(1.5e-5) 모두 지원합니다." }, { q: "한자 표기(壹·萬·億)도 가능?", a: "현재는 한국어 한글 단위만 지원합니다. 한자 숫자는 별도 도구가 필요합니다." }], addedAt: "2026-05-15" },
  { slug: "stars", component: "StarsTool", category: "calc", icon: "⭐", navTitle: "별점 시각화", title: "별점 시각화 - 4.5/5 → ★★★★½ (블로그·후기용)", h1: "별점 / 평점 시각화", description: "점수를 별 모양(★)으로 시각화해 텍스트로 복사할 수 있게 만듭니다. 반쪽 별 지원. 블로그 후기 작성, SNS 평점 표기, 이메일 시그니처, 발표 자료에 자주 쓰입니다.", metaDescription: "별점 시각화 무료. 4.5/5 → ★★★★½ 텍스트, 반쪽 별.", howTo: ["점수(예: 4.5)와 만점(보통 5)을 입력합니다.", "별 모양 텍스트가 만들어집니다.", "복사해서 어디든 붙여넣으세요."], faq: [{ q: "어디에 붙여넣을 수 있나요?", a: "유니코드 별이라 카톡·디스코드·트위터·블로그·티스토리·이메일 어디든 그대로 표시됩니다. 이미지가 아니라 글자입니다." }, { q: "반쪽 별이 어떻게 보이나요?", a: "★★★★½ 형식으로 반쪽 별(½) 또는 ☆ 빈 별 표시 둘 다 가능합니다. 환경에 따라 자동으로 적절한 형식이 선택됩니다." }, { q: "10점 만점도 됩니까?", a: "네. 만점을 10으로 설정하면 7.5/10도 표시 가능합니다. 별 개수는 만점에 맞춰 자동 조정됩니다." }, { q: "다른 도형(하트·동그라미)도 가능?", a: "별(★) 외에 하트(♥)·다이아몬드(◆) 등을 선택할 수 있는 도구가 있을 수도 있습니다. 도구 옵션을 확인하세요." }, { q: "색깔도 넣을 수 있나요?", a: "유니코드 자체에는 색이 없지만, HTML/Markdown에서 색을 입힐 수 있습니다. 블로그 에디터의 색상 기능을 활용하세요." }, { q: "이 별 모양이 모든 폰트에서 같게 보이나요?", a: "약간씩 다릅니다. 시스템 폰트(애플·윈도우·구글)에 따라 모양이 미세하게 달라요." }], addedAt: "2026-05-15" },
  { slug: "golf-handicap", component: "GolfHandicapTool", category: "calc", icon: "⛳", navTitle: "골프 핸디캡", title: "골프 핸디캡 계산 - USGA 방식 (간이 추정)", h1: "골프 핸디캡 계산", description: "최근 라운드 스코어로 USGA 방식 핸디캡을 간이 추정합니다. 본인 실력 점검, 동반자와 핸디캡 매칭, 친선 라운드 베팅 기준 정하기, 시즌별 실력 변화 추적에 자주 쓰입니다.", metaDescription: "골프 핸디캡 무료 계산. USGA 방식, 간이 추정.", howTo: ["최근 라운드(보통 5~20회) 스코어를 입력합니다.", "코스 레이팅과 슬로프(있으면)를 함께 입력합니다.", "추정 핸디캡 인덱스가 계산됩니다."], faq: [{ q: "공식 핸디캡인가요?", a: "공식 핸디캡(GHIN·KGA)은 협회 등록·실명 라운드 인증이 필요합니다. 이 도구는 간이 추정으로 본인 실력 가늠용입니다." }, { q: "USGA 방식이 뭐예요?", a: "미국골프협회 표준. 최근 20개 라운드 중 8개 최고 기록의 평균 × 0.96으로 핸디캡 인덱스를 계산합니다." }, { q: "핸디캡이 0이면 뭐예요?", a: "스크래치(scratch) 골퍼. 매 라운드 파(72) 평균 정도. 상위 1~2%의 실력입니다." }, { q: "보기플레이어가 핸디캡 몇?", a: "보기플레이어(BG, bogey golfer)는 평균 보기 페이스 — 핸디캡 약 18~22 정도입니다." }, { q: "라운드 몇 회 정도 입력하면 신뢰성이 높아요?", a: "최소 5회, 권장 10~20회. 적을수록 한 번의 좋은/나쁜 라운드에 영향을 많이 받습니다." }, { q: "스코어를 그냥 더한 값(예: 92)을 그대로 쓰나요?", a: "코스 난이도(레이팅·슬로프)를 반영한 '차이값(Differential)'을 평균합니다. 도구가 자동 계산합니다." }], addedAt: "2026-05-15" },
  { slug: "text-similarity", component: "TextSimilarityTool", category: "dev", icon: "≈", navTitle: "텍스트 유사도", title: "텍스트 유사도 - Levenshtein 편집 거리 측정", h1: "텍스트 유사도 (Levenshtein)", description: "두 문자열의 Levenshtein 편집 거리와 백분율 유사도를 계산합니다. 오타 검출, 유사 단어 찾기, 검색 자동완성 구현, 데이터 중복 탐지에 자주 쓰입니다.", metaDescription: "텍스트 유사도 무료. Levenshtein 편집 거리, 백분율.", howTo: ["두 텍스트를 각각 입력합니다.", "편집 거리와 유사도(%)가 즉시 표시됩니다."], faq: [{ q: "긴 문서도 빠른가요?", a: "수천 글자까지 즉시 처리됩니다. 매우 긴 문서(수만 자+)는 시간이 더 걸릴 수 있어요." }, { q: "Levenshtein이 뭐예요?", a: "한 문자열을 다른 문자열로 만들 때 필요한 최소 편집 횟수(삽입·삭제·치환). '고양이' → '강아지'는 3회 편집." }, { q: "유사도 % 의미?", a: "100%면 완전 동일, 0%면 전혀 다름. 보통 80% 이상이면 매우 유사, 50% 이하면 다르다고 봄." }, { q: "한글에도 정확한가요?", a: "네. 음절 단위로 계산되므로 한글도 정확합니다. 자모 단위 비교가 필요하면 [한글 자모 분해] 도구와 함께 쓰세요." }, { q: "어디 활용하나요?", a: "(1) 오타 자동 수정 후보 찾기, (2) 데이터베이스 중복 행 탐지, (3) 검색어 fuzzy matching, (4) 표절 검사 1차." }, { q: "다른 유사도 알고리즘?", a: "Jaro-Winkler, Cosine similarity, n-gram 등이 있지만 Levenshtein이 가장 직관적이고 흔히 쓰입니다." }], addedAt: "2026-05-15" },
  { slug: "font-preview", component: "FontPreviewTool", category: "dev", icon: "🔤", navTitle: "폰트 미리보기", title: "폰트 미리보기 - 시스템·웹 폰트로 텍스트 렌더링", h1: "웹 폰트 미리보기", description: "원하는 폰트로 텍스트가 어떻게 보이는지 실시간 미리보기합니다. CSS 폰트 결정, 웹사이트 디자인 시안, 한글 폰트 비교, 명함·포스터 글꼴 선택에 자주 쓰입니다.", metaDescription: "폰트 미리보기 무료. 시스템·웹 폰트, 한글 지원.", howTo: ["폰트 이름을 입력합니다.", "샘플 텍스트가 즉시 렌더링됩니다.", "크기·굵기·자간 조절도 가능."], faq: [{ q: "구글 폰트도 됩니까?", a: "구글 폰트 URL을 추가하면 사용 가능합니다. 'Roboto', 'Inter', 'Pretendard' 같은 흔한 폰트는 자주 시스템에 설치돼 있어요." }, { q: "한글 폰트 추천?", a: "Pretendard, Noto Sans KR, IBM Plex Sans KR, Nanum Gothic 등이 가독성이 좋고 무료입니다." }, { q: "내 컴퓨터의 모든 폰트가 보이나요?", a: "보안상 브라우저가 폰트 목록을 제공하지 않습니다. 폰트 이름을 직접 입력해 미리보기하세요." }, { q: "고정폭(monospace) 폰트는?", a: "D2Coding, Source Code Pro, JetBrains Mono, Fira Code 같은 코딩용 폰트도 미리보기 가능합니다." }, { q: "폰트가 안 보여요. 왜?", a: "(1) 폰트가 설치 안 됨, (2) 폰트 이름 오타, (3) 라이선스 이슈. 브라우저 개발자도구의 Computed 탭에서 실제 사용되는 폰트 확인 가능." }, { q: "한글이 깨져요. 왜?", a: "선택한 폰트가 한글을 지원하지 않을 수 있어요. 영문 폰트는 보통 한글 글리프가 없어 fallback 폰트로 표시됩니다." }], addedAt: "2026-05-15" },
  { slug: "word-cloud", component: "WordCloudTool", category: "text", icon: "☁️", navTitle: "워드 클라우드", title: "워드 클라우드 생성 - 자주 쓰인 단어 시각화 (한글·영문)", h1: "워드 클라우드 생성", description: "자주 등장하는 단어를 크기로 시각화한 워드 클라우드를 만듭니다. 발표 자료의 핵심 키워드 시각화, 설문 응답 요약, 논문·블로그 글의 주제 분석, 마인드맵·인포그래픽 디자인에 자주 쓰입니다.", metaDescription: "워드 클라우드 무료. 한글·영문 텍스트 시각화, PNG 저장.", howTo: ["텍스트를 붙여넣습니다.", "불용어 제거·색상·모양 옵션을 조정합니다.", "워드 클라우드 이미지로 저장합니다."], faq: [{ q: "한글도 됩니까?", a: "네. 한글·영문·이모지 모두 지원하며, 한글 불용어(이/가/은/는) 제거 옵션이 있습니다." }, { q: "어떤 텍스트에 잘 어울려요?", a: "주제어가 명확하고 반복되는 텍스트(설문·논문·블로그·연설문)에 효과적입니다. 너무 짧으면 단어 변별력이 없고, 너무 길면 너무 빽빽해집니다." }, { q: "결과 이미지를 PPT에 쓸 수 있나요?", a: "PNG로 저장해서 발표 자료, 보고서, 인포그래픽에 활용할 수 있습니다. 인쇄용은 고해상도 저장 옵션을 쓰세요." }, { q: "색깔·모양을 바꿀 수 있나요?", a: "색상 팔레트와 모양(사각형·원·하트 등)을 옵션으로 변경할 수 있습니다. 브랜드 컬러에 맞춰 커스터마이즈하세요." }, { q: "단어 빈도 정보만 보고 싶다면?", a: "시각화 없이 빈도 표가 필요하면 [단어 빈도 분석] 도구를 쓰세요." }, { q: "특정 단어 제외할 수 있나요?", a: "직접 입력한 단어를 불용어 목록에 추가할 수 있습니다. 회사명·고유명사 등 제거에 유용." }], addedAt: "2026-05-15" },
  { slug: "random-string", component: "RandomStringTool", category: "dev", icon: "🎲", navTitle: "랜덤 문자열", title: "랜덤 문자열 생성기 - 토큰 · ID · API 키 (Web Crypto)", h1: "랜덤 문자열 / 토큰 생성", description: "Web Crypto 기반 암호학적 안전 난수로 문자열을 생성합니다. API 키·세션 토큰·임시 ID·임시 비밀번호·초대 코드·UUID 대안에 자주 쓰입니다.", metaDescription: "랜덤 문자열 무료. API 키 토큰, Web Crypto 안전 난수.", howTo: ["길이와 문자셋(알파벳·숫자·특수문자)을 선택합니다.", "생성 버튼을 누르면 안전한 난수 문자열이 만들어집니다.", "복사해서 활용하세요."], faq: [{ q: "비밀번호로 써도 되나요?", a: "비밀번호 전용 도구는 [비밀번호 생성기]를 사용하세요. 본 도구는 API 키·토큰 같은 일반 난수 문자열용입니다." }, { q: "Web Crypto가 뭐예요?", a: "브라우저의 암호학적으로 안전한 난수 API. Math.random()보다 통계적·보안적으로 더 강합니다." }, { q: "UUID와 차이?", a: "UUID는 고정 128비트 형식, 랜덤 문자열은 길이·문자셋 자유. 짧은 토큰·ID가 필요하면 랜덤 문자열, 분산 시스템 ID는 UUID." }, { q: "한글·이모지도 가능?", a: "표준 ASCII 문자(알파벳·숫자·특수문자)만 지원합니다. 토큰·키 용도에 한글은 일반적이지 않아요." }, { q: "어느 정도 길이가 안전?", a: "API 키는 32자(약 192비트), 세션 토큰은 32~64자가 일반적입니다. 짧을수록 충돌 위험이 늘어요." }, { q: "URL safe?", a: "옵션으로 URL-safe 문자셋(A-Z, a-z, 0-9, -, _)만 사용할 수 있습니다." }], addedAt: "2026-05-15" },
  { slug: "emoji-search", component: "EmojiSearchTool", category: "text", icon: "😀", navTitle: "이모지 검색", title: "이모지 검색 - 한글·영문 키워드로 빠르게 찾기", h1: "이모지 검색", description: "한글이나 영문 키워드로 이모지를 검색하고 한 번에 복사합니다. 카톡·인스타·트위터 글 작성, 노션 페이지 헤더 꾸미기, 이메일 시그니처, 깃허브 README 꾸미기, 발표 자료 강조에 자주 쓰입니다.", metaDescription: "이모지 검색 무료. 한글·영문 키워드, 클릭 복사.", howTo: ["한글이나 영문 키워드(예: '하트', 'fire')를 입력합니다.", "검색 결과 이모지를 클릭해 복사합니다."], faq: [{ q: "최신 이모지도 있나요?", a: "Unicode 15 이상 표준 이모지를 모두 포함합니다. 2024년 추가된 신규 이모지도 포함." }, { q: "한글로 검색되나요?", a: "네. '웃음', '사랑', '돈', '동물' 등 한글 키워드로도 검색됩니다." }, { q: "복사한 이모지가 안 보여요. 왜죠?", a: "수신자 기기의 폰트가 최신 유니코드를 지원하지 않으면 사각형으로 보일 수 있습니다. 구버전 기기·일부 회사 메신저에서 흔합니다." }, { q: "이모지 종류가 몇 개나 있나요?", a: "Unicode 15.1 기준 약 3,790개 이상. 카테고리별로 정리되어 있습니다." }, { q: "피부톤·성별 변형도 됩니까?", a: "사람 관련 이모지는 5가지 피부톤과 성별 옵션이 있습니다. 클릭으로 변형 선택 가능." }, { q: "결합 이모지(👨‍👩‍👧‍👦)도 됩니까?", a: "가족·직업 결합 이모지도 검색됩니다. 이런 이모지는 일부 기기에서 분리되어 보일 수 있어요." }], addedAt: "2026-05-15" },
  { slug: "user-agent", component: "UserAgentTool", category: "dev", icon: "🌐", navTitle: "User-Agent 분석", title: "User-Agent 분석 - 브라우저 · OS · 기기 정보 추출", h1: "User-Agent 파서", description: "User-Agent 문자열에서 브라우저·OS·기기·버전을 추출합니다. 웹 로그 분석, 호환성 문제 디버깅, 분석 데이터 분류, 봇·크롤러 식별에 자주 쓰입니다.", metaDescription: "User-Agent 파서 무료. 브라우저·OS·기기 자동 분석.", howTo: ["UA 문자열을 붙여넣거나 '내 UA'를 클릭합니다.", "브라우저·OS·기기 정보가 추출돼 표시됩니다."], faq: [{ q: "UA가 뭐예요?", a: "브라우저가 서버에 자기 소개하는 문자열. HTTP 헤더 User-Agent에 들어가며 'Mozilla/5.0 ...' 형식." }, { q: "왜 다 'Mozilla/5.0'으로 시작?", a: "역사적 이유. 1990년대 일부 사이트가 Mozilla만 인식해서 다른 브라우저도 Mozilla인 척했고, 결국 표준이 됐습니다." }, { q: "UA가 사라진다는 말이 있어요?", a: "Chrome이 UA 정보를 줄이는 'User-Agent Client Hints'로 전환 중입니다. 향후 UA는 단순화되고 정밀 정보는 별도 헤더로 제공." }, { q: "UA로 모바일·데스크톱 구분?", a: "iPhone, iPad, Android, Mobile 키워드로 구분 가능. 다만 정확한 구분은 viewport·터치 이벤트 등 추가 정보가 필요합니다." }, { q: "UA를 속일 수 있나요?", a: "브라우저 개발자도구·확장 프로그램으로 UA 변경 가능합니다. 보안용 신원 확인엔 부적합." }, { q: "봇·크롤러 식별?", a: "Googlebot, Bingbot, Slackbot 등 봇은 UA에 자기 이름을 명시합니다. 다만 악성 봇은 사람인 척 위장할 수 있어요." }], addedAt: "2026-05-15" },
  { slug: "password-comparator", component: "PasswordComparatorTool", category: "dev", icon: "⚖️", navTitle: "비밀번호 비교", title: "비밀번호 강도 비교 - 두 비밀번호 동시 평가 (엔트로피)", h1: "비밀번호 강도 비교", description: "두 비밀번호를 동시에 평가해 어느 게 더 강한지 비교합니다. 비밀번호 변경 전 후 비교, 가족·동료에게 비밀번호 위험성 보여주기, 보안 교육 자료에 자주 쓰입니다.", metaDescription: "비밀번호 비교 무료. 엔트로피·패턴 종합 평가.", howTo: ["두 비밀번호를 각각 입력합니다.", "엔트로피·예상 해킹 시간·취약점이 나란히 표시됩니다."], faq: [{ q: "어떻게 평가하나요?", a: "엔트로피(랜덤성), 사전 단어 매칭, 키보드 패턴, 반복 문자, 흔한 비번 데이터베이스를 종합 분석합니다." }, { q: "엔트로피가 뭐예요?", a: "랜덤성을 비트(bit)로 측정한 것. 60비트 이상이면 비교적 안전, 80비트+면 매우 안전. 길이·문자 종류가 클수록 증가." }, { q: "두 비번이 어느 게 더 좋아요?", a: "보통 더 길고 다양한 문자 종류가 포함된 쪽이 강합니다. 동시 비교로 한눈에 확인 가능." }, { q: "비밀번호가 외부로 가나요?", a: "아닙니다. 모든 평가가 브라우저 안에서만 일어납니다. 그래도 운영 비밀번호는 외부 도구에 입력하지 않는 게 좋습니다." }, { q: "왜 비교가 유용해요?", a: "현재 비번 → 새 비번 변경 시 보안이 실제로 강해졌는지 객관적으로 확인. 단순히 '복잡해 보인다' 느낌만으론 부족." }], addedAt: "2026-05-15" },
  { slug: "number-to-english", component: "NumberToEnglishTool", category: "text", icon: "🔤", navTitle: "숫자 → 영어", title: "숫자 영어 단어 변환 - 12,000 → twelve thousand (수표·계약서)", h1: "숫자 → 영어 단어 변환", description: "숫자를 영어 단어로 변환합니다. 영문 수표 발행, 국제 계약서 작성, 영문 인보이스, 영어 글쓰기·작문, 영문 시험 답안 작성에 자주 쓰입니다.", metaDescription: "숫자 영어 단어 변환 무료. twelve thousand, 수표·계약서.", howTo: ["숫자를 입력합니다.", "영어 단어 표현이 즉시 표시됩니다.", "복사해서 활용합니다."], faq: [{ q: "소수도 변환되나요?", a: "'point' 뒤에 각 자리를 읽는 영어 표준 방식. 3.14 → 'three point one four'." }, { q: "영문 수표 표기는?", a: "수표는 'Twelve Thousand and 00/100' 형식을 씁니다. 도구가 이 형식으로 자동 변환합니다." }, { q: "왜 'twelve thousand'에 콤마가 없나요?", a: "영어는 큰 숫자 사이에 'and'를 넣거나 빼는 두 가지 방식이 있습니다. 본 도구는 미국식(and 생략)이 기본입니다." }, { q: "백만·억은 어떻게?", a: "Million(백만, 10⁶), Billion(십억, 10⁹), Trillion(조, 10¹²). 영어와 한국어 자릿수가 달라 헷갈리니 주의." }, { q: "한국에서 영문 수표 어떻게 쓰나요?", a: "외환은행·시중은행에서 외화 송금 시 영문 수표를 발행할 수 있습니다. 금액을 영어 단어로 적어야 부정행위 방지." }, { q: "음수·매우 큰 숫자도 됩니까?", a: "음수는 'minus'·'negative' 접두어를 붙입니다. 큰 숫자도 trillion·quadrillion 수준까지 가능합니다." }], addedAt: "2026-05-15" },
  { slug: "js-beautifier", component: "JsBeautifierTool", category: "dev", icon: "✨", navTitle: "JS 정리", title: "JavaScript 포맷터 - minify된 JS를 보기 좋게 정렬 (Beautify)", h1: "JavaScript 포맷터", description: "minify·압축된 JavaScript를 보기 좋게 재정렬합니다. 외부 라이브러리 분석, 다른 사람의 코드 읽기, 디버깅 보조, 학습 목적의 코드 해독에 자주 쓰입니다.", metaDescription: "JS 포맷 무료. minify된 코드 정리, 들여쓰기·줄바꿈 복원.", howTo: ["minify된 JS를 붙여넣습니다.", "포맷팅 버튼을 누릅니다.", "정리된 결과를 복사합니다."], faq: [{ q: "TypeScript도 됩니까?", a: "비슷하게 작동합니다. TS 특유의 타입 표기(: string, generic <T>)도 대체로 인식됩니다." }, { q: "Beautify vs Minify?", a: "Beautify는 정렬해서 사람이 읽기 좋게, Minify는 압축해서 작게. 정반대 작업." }, { q: "원본 의미가 변하지 않나요?", a: "공백·줄바꿈만 추가되므로 실행 결과는 동일합니다. 다만 minify된 코드의 짧은 변수명은 그대로입니다." }, { q: "mangle된 변수명을 다시 의미 있게?", a: "이건 불가능합니다. 'a, b, c' 같은 변수명을 원래대로 복원하려면 source map이 필요합니다." }, { q: "JSON도 됩니까?", a: "JSON 전용은 [JSON 포맷터] 도구가 더 적합합니다 (JSON 검증·키 정렬 포함)." }, { q: "들여쓰기 단위 조절?", a: "보통 2칸·4칸·탭 선택 가능합니다. 팀 컨벤션에 맞춰 조정하세요." }], addedAt: "2026-05-15" },
  { slug: "text-stats", component: "TextStatsTool", category: "text", icon: "📊", navTitle: "텍스트 종합 통계", title: "텍스트 종합 통계 - 글자·단어·문장·단락·가독성 (Flesch)", h1: "텍스트 종합 통계", description: "텍스트의 글자수·단어수·문장수·단락수·평균 문장 길이·가독성 점수를 한 번에 분석합니다. 자소서·블로그 글·논문의 가독성 점검, 영어 학습용 글 난이도 평가, 글쓰기 자가 진단에 자주 쓰입니다.", metaDescription: "텍스트 통계 무료. 글자수·단어수·가독성, Flesch 점수.", howTo: ["텍스트를 붙여넣습니다.", "종합 통계가 자동 표시됩니다."], faq: [{ q: "가독성이 뭐예요?", a: "Flesch Reading Ease 점수. 0~100점이며 높을수록 쉽게 읽힙니다. 70~80은 일반 신문 수준, 60 이하는 학술적, 30 이하는 매우 어려움." }, { q: "한글에도 적용되나요?", a: "Flesch는 영어 기준 공식이라 한글 가독성은 부정확합니다. 한글은 글자수·문장 평균 길이 같은 기초 지표 중심으로 봐주세요." }, { q: "글자수 세기와 차이?", a: "[글자수 세기]는 글자수만 빠르게, 이 도구는 문장·단락·가독성까지 종합. 자소서 마감 직전이면 [글자수 세기]가 빠르고, 글의 질 평가는 이 도구가 적합." }, { q: "긴 문장이 좋아요 짧은 문장이 좋아요?", a: "글의 종류에 따라 다르지만 일반적으로 평균 15~20단어가 읽기 좋은 길이로 알려져 있습니다. 너무 길면 가독성이 떨어집니다." }, { q: "어휘 다양성도 측정되나요?", a: "단어/총단어 비율로 어휘 다양성을 추정할 수 있습니다. 같은 단어 반복이 심하면 비율이 낮습니다." }, { q: "결과를 어떻게 활용?", a: "(1) 가독성 낮으면 문장 짧게 끊기, (2) 긴 단락은 둘로 나누기, (3) 어휘 단조로우면 동의어로 다양화 — 글쓰기 자가 점검 체크리스트로 쓰세요." }], addedAt: "2026-05-15" },
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
