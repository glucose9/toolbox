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
    | "DueDateTool";
  category: "qr" | "image" | "video" | "text" | "dev" | "document" | "pdf" | "calc";
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
      "PNG 이미지를 JPG로 즉시 변환하세요. 파일은 브라우저 안에서 처리되어 어디로도 업로드되지 않습니다. 화질 조절 가능, 무료, 가입 불필요.",
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
      { q: "투명 배경은 어떻게 되나요?", a: "JPG는 투명도를 지원하지 않아 투명 배경이 흰색으로 채워집니다." },
      { q: "여러 장을 한 번에 변환할 수 있나요?", a: "현재 한 번에 한 장씩 변환됩니다. 여러 장은 순서대로 업로드해주세요." },
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
      "JPG 이미지를 PNG로 변환합니다. PNG는 무손실 포맷이라 인쇄용·편집용으로 더 깨끗합니다. 브라우저 안에서 안전하게 처리됩니다.",
    metaDescription:
      "JPG를 PNG로 무료 변환. 무손실, 안전, 가입 불필요.",
    howTo: [
      "JPG 파일을 드래그하거나 클릭해서 업로드합니다.",
      "오른쪽 미리보기에서 결과를 확인합니다.",
      "PNG 다운로드 버튼을 누릅니다.",
    ],
    faq: [
      { q: "왜 PNG가 JPG보다 용량이 큰가요?", a: "PNG는 무손실 압축이라 모든 픽셀 정보를 보존합니다. 사진은 JPG가 작고, 로고나 스크린샷은 PNG가 더 적합합니다." },
      { q: "JPG에서 사라진 화질이 PNG로 변환하면 살아나나요?", a: "아닙니다. 이미 손실된 정보는 복구되지 않으니, 가능하면 원본부터 PNG로 저장하세요." },
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
      "WebP 이미지를 JPG로 변환합니다. 카톡·문서에 첨부할 때 호환되지 않는 WebP를 한 번에 해결하세요.",
    metaDescription:
      "WebP를 JPG로 무료 변환. 카톡/문서 호환 문제 해결, 안전, 가입 불필요.",
    howTo: [
      "WebP 파일을 업로드합니다.",
      "화질을 선택합니다 (보통 90%면 충분).",
      "JPG로 다운로드합니다.",
    ],
    faq: [
      { q: "WebP가 뭔가요?", a: "구글이 만든 차세대 이미지 포맷으로 용량이 작지만 일부 앱이나 문서에서 열리지 않습니다." },
      { q: "왜 카톡에 WebP를 보내면 안 열리나요?", a: "구버전 카톡이나 일부 디바이스에서 WebP 표시를 지원하지 않습니다. JPG로 변환하면 어디서나 열립니다." },
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
      "JPG를 WebP로 변환해 용량을 30~70% 줄이세요. 웹사이트 로딩 속도가 빨라지고 SEO 점수도 올라갑니다.",
    metaDescription:
      "JPG를 WebP로 무료 변환. 용량 최대 70% 절감, 웹사이트 속도 개선.",
    howTo: [
      "JPG 파일을 업로드합니다.",
      "화질을 조절합니다 (80%면 눈에 거의 차이 없음).",
      "WebP로 다운로드합니다.",
    ],
    faq: [
      { q: "WebP 사용해도 화질이 떨어지지 않나요?", a: "동일 화질일 때 WebP가 JPG보다 25~35% 작습니다. 80% 품질에서 시각적 차이를 거의 느낄 수 없습니다." },
      { q: "구형 브라우저에서도 보이나요?", a: "현대 브라우저 99% 지원합니다. IE만 미지원이지만 IE는 이미 지원 종료됐습니다." },
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
      "사진 용량을 화질 손상 최소화로 80% 이상 줄이세요. 이메일 첨부, 게시판 업로드, 카톡 전송에 딱입니다.",
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
      "이미지를 원하는 픽셀 크기로 조절하세요. 비율 자동 유지, 화질 유지, 무료, 워터마크 없음.",
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
      "한글과컴퓨터 오피스 없이 .hwp · .hwpx 파일을 브라우저에서 바로 열어 보세요. 페이지 넘기기, 확대/축소 지원. 파일은 외부로 전송되지 않습니다.",
    metaDescription:
      "HWP·HWPX 파일을 한컴오피스 없이 무료로 열기. 브라우저에서 바로 보기, 안전, 가입 불필요.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 드래그하거나 클릭해서 업로드합니다.",
      "WebAssembly 엔진이 처음 한 번만 로드됩니다 (~5MB).",
      "페이지를 넘기며 문서를 확인합니다. 확대/축소 버튼으로 가독성을 조절합니다.",
      "PDF로 저장하고 싶으면 'HWP → PDF 변환' 도구를 이용하세요.",
    ],
    faq: [
      { q: "한컴오피스 없이도 정말 열리나요?", a: "네. @rhwp/core라는 오픈소스 Rust+WebAssembly 엔진을 사용해 브라우저 안에서 직접 .hwp / .hwpx를 파싱합니다. 한컴오피스 설치는 필요 없습니다." },
      { q: "어떤 버전까지 지원하나요?", a: "HWP 5.0 이상 바이너리 형식과 KS X 6101 표준의 HWPX 형식을 지원합니다. 구버전 HWP 3.0/97은 미지원입니다." },
      { q: "파일이 서버로 올라가나요?", a: "아니요. 파싱과 렌더링이 전부 브라우저 안에서 일어나며 파일은 어디로도 전송되지 않습니다." },
      { q: "복잡한 서식이 모두 그대로 보이나요?", a: "본문, 표, 이미지, 머리말/꼬리말, 수식 등 대부분이 렌더링됩니다. 일부 특수 도형이나 매크로는 다르게 보일 수 있습니다." },
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
      "한글 문서의 본문 텍스트만 .txt로 추출하세요. 카톡·이메일·번역기에 붙여넣을 때 편리합니다. 브라우저 안에서 처리되어 안전합니다.",
    metaDescription:
      "HWP·HWPX 본문 텍스트 무료 추출. .txt 다운로드, 클립보드 복사, 한컴오피스 불필요.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 업로드합니다.",
      "본문 텍스트가 자동으로 추출되어 미리보기에 표시됩니다.",
      "전체 복사 버튼으로 클립보드에 담거나 .txt 파일로 다운로드합니다.",
    ],
    faq: [
      { q: "표 안의 글자도 추출되나요?", a: "네. 표 셀, 머리말/꼬리말, 각주의 글자까지 모두 추출됩니다." },
      { q: "이미지나 도형은요?", a: "이미지와 도형은 텍스트가 아니라 추출되지 않습니다. 도형 안에 입력된 글자는 추출됩니다." },
      { q: "줄바꿈은 어떻게 처리되나요?", a: "원본의 문단 단위로 줄바꿈이 들어갑니다. 페이지마다 빈 줄 한 칸이 추가되어 구분됩니다." },
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
      "한글 문서를 PDF로 변환하세요. 한컴오피스 없이도 브라우저에서 즉시 변환 가능. 출력물을 외부로 공유할 때 안성맞춤입니다.",
    metaDescription:
      "HWP·HWPX 파일을 PDF로 무료 변환. 한컴오피스 불필요, 브라우저 안전 처리, 가입 없음.",
    howTo: [
      ".hwp 또는 .hwpx 파일을 업로드합니다.",
      "변환된 페이지 미리보기를 확인합니다.",
      "PDF로 저장 버튼을 누르면 모든 페이지가 한 PDF로 합쳐집니다.",
      "파일이 다운로드되면 끝입니다.",
    ],
    faq: [
      { q: "원본 디자인이 그대로 보존되나요?", a: "본문, 표, 머리말/꼬리말, 수식 등 대부분 보존됩니다. 단, 일부 특수 도형이나 한컴 전용 글꼴은 비슷한 글꼴로 대체될 수 있습니다." },
      { q: "긴 문서도 변환 가능한가요?", a: "수십 페이지까지는 일반 PC에서 무리 없이 변환됩니다. 100페이지 이상이면 시간이 좀 걸릴 수 있습니다." },
      { q: "파일이 외부로 업로드되나요?", a: "아니요. 변환은 브라우저 안에서 일어나며 파일이 외부 서버로 전송되지 않습니다." },
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
      "구버전 .hwp 파일을 정부 표준 .hwpx 포맷(KS X 6101)으로 변환하세요. 공공기관 제출, 협업 도구 호환에 유용합니다.",
    metaDescription:
      "HWP를 HWPX(국가 표준)로 무료 변환. 공공기관 제출, 협업, 보존용에 적합.",
    howTo: [
      ".hwp 파일을 업로드합니다.",
      "변환 버튼을 누르면 HWPX(zip+XML) 패키지가 생성됩니다.",
      ".hwpx 파일을 다운로드합니다.",
    ],
    faq: [
      { q: "HWPX가 뭐예요?", a: "한글 문서의 새 표준(KS X 6101)으로, XML+ZIP 기반이라 OOXML(docx)처럼 다른 도구와 호환이 좋습니다. 공공기관·정부 문서 표준으로 채택되었습니다." },
      { q: "원본 서식이 모두 보존되나요?", a: "본문·표·서식·이미지 같은 주요 내용은 보존됩니다. 일부 한컴 전용 기능(매크로 등)은 누락될 수 있습니다." },
      { q: "반대 방향(HWPX → HWP)도 되나요?", a: "현재는 HWP → HWPX 방향만 지원합니다. HWPX는 표준 포맷이라 한컴오피스와 대부분의 뷰어가 직접 열 수 있습니다." },
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
      "여러 PDF 파일을 하나로 합치세요. 드래그로 순서를 자유롭게 바꿀 수 있고, 파일은 브라우저 안에서 처리되어 외부로 전송되지 않습니다.",
    metaDescription:
      "여러 PDF를 하나로 무료 병합. 순서 변경 지원, 워터마크 없음, 가입 불필요, 안전 처리.",
    howTo: [
      "합칠 PDF 파일을 모두 업로드합니다 (여러 개 가능).",
      "위/아래 화살표로 순서를 조절합니다.",
      "병합 버튼을 누르면 한 PDF로 합쳐집니다.",
      "결과 파일을 다운로드합니다.",
    ],
    faq: [
      { q: "파일이 서버로 전송되나요?", a: "아니요. 모든 작업이 브라우저 안에서 일어나며 외부로 전송되지 않습니다." },
      { q: "최대 몇 개까지 합칠 수 있나요?", a: "기술적 제한은 없지만 메모리 한계로 보통 50개 이내, 합쳐서 200MB 이하를 권장합니다." },
      { q: "비밀번호 걸린 PDF도 가능한가요?", a: "현재 비밀번호 보호된 PDF는 지원하지 않습니다. 먼저 잠금을 풀어주세요." },
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
      "PDF를 페이지 단위로 분리하거나, 원하는 페이지 범위만 추출하세요. 결과는 ZIP으로 한 번에 받습니다.",
    metaDescription:
      "PDF를 페이지별 / 범위별로 무료 분할. ZIP 일괄 다운로드, 안전, 가입 불필요.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "분할 방식을 선택합니다 (모든 페이지 / 범위 지정).",
      "범위 지정 시 '1-3, 5, 7-9' 같은 형식으로 입력합니다.",
      "결과 ZIP을 다운로드합니다.",
    ],
    faq: [
      { q: "범위 지정 문법이 어떻게 되나요?", a: "콤마로 구분: '1-3, 5, 7-9'. 1~3페이지를 한 묶음, 5페이지 단독, 7~9페이지를 한 묶음으로 나눕니다." },
      { q: "한 페이지짜리 PDF도 분할되나요?", a: "한 페이지짜리는 분할할 게 없어 그대로 반환됩니다." },
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
      "스캔이나 촬영해서 누워있는 PDF 페이지를 똑바로 세우세요. 전체 페이지 또는 특정 페이지만 90·180·270도 회전 가능.",
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
      "PDF에서 빈 페이지나 필요 없는 페이지를 골라 제거하세요. 페이지를 선택해 삭제 버튼을 누르면 끝.",
    metaDescription:
      "PDF에서 페이지 무료 삭제. 빈 페이지·불필요 페이지 제거, 가입 불필요, 안전.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "삭제할 페이지 번호를 입력합니다 ('2, 5-7' 형식).",
      "처리 버튼을 누르면 해당 페이지가 빠진 PDF가 만들어집니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 파일이 변경되나요?", a: "아니요. 원본은 그대로 두고 새 PDF가 생성됩니다." },
      { q: "여러 범위를 한 번에 삭제할 수 있나요?", a: "네. '2, 5-7, 10' 처럼 콤마로 여러 범위를 함께 지정할 수 있습니다." },
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
      "사진과 스캔본을 한 PDF로 묶으세요. JPG·PNG·WebP 지원, 페이지 크기 선택 가능, 순서 자유롭게 조정.",
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
      { q: "A4 페이지에 맞게 자동 조정되나요?", a: "네. 비율을 유지하면서 페이지에 맞게 축소되어 들어갑니다." },
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
      "PDF 페이지 썸네일을 드래그해서 순서를 자유롭게 바꾸세요. 회전·삭제도 함께 가능. 모든 처리는 브라우저 안에서.",
    metaDescription:
      "PDF 페이지 순서 변경 무료. 드래그 재정렬·회전·삭제, 안전 처리.",
    howTo: ["PDF를 업로드하면 모든 페이지의 썸네일이 보입니다.", "드래그해서 순서를 바꿉니다.", "저장 버튼을 누릅니다."],
    faq: [{ q: "한 페이지만 회전할 수 있나요?", a: "각 썸네일의 회전 버튼으로 페이지별 회전이 가능합니다." }],
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
      "PDF에서 원하는 페이지 번호 또는 범위만 골라 새 PDF로 저장하세요. 한 PDF에서 일부 페이지만 공유할 때 편리.",
    metaDescription:
      "PDF 페이지 추출 무료. 원하는 페이지·범위 선택, 새 PDF 저장.",
    howTo: ["PDF 파일을 업로드합니다.", "추출할 페이지를 '1-3, 5, 7-9' 형식으로 입력합니다.", "추출 버튼을 누릅니다."],
    faq: [{ q: "PDF 분할과 뭐가 달라요?", a: "분할은 여러 PDF로 쪼개고 ZIP으로 받습니다. 추출은 선택한 페이지만 모은 한 PDF를 만듭니다." }],
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
      "PDF 모든 페이지에 텍스트 워터마크(예: 'CONFIDENTIAL', 회사명)를 추가하세요. 색상·투명도·회전·크기 조절 가능.",
    metaDescription:
      "PDF 텍스트 워터마크 무료 추가. 색상·투명도·회전 조절, 모든 페이지에 일괄.",
    howTo: [
      "PDF를 업로드합니다.",
      "워터마크 텍스트, 색상, 투명도, 각도를 설정합니다.",
      "적용 버튼을 누르고 결과를 다운로드합니다.",
    ],
    faq: [{ q: "이미지 워터마크는요?", a: "현재 텍스트만 지원합니다." }],
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
      "PDF 각 페이지에 페이지 번호를 자동으로 넣으세요. 위치(머리말/꼬리말, 좌/중/우), 형식(1, 1/N, p1), 시작 번호 선택 가능.",
    metaDescription:
      "PDF 페이지 번호 자동 추가. 위치·형식·시작번호 선택 가능, 모든 페이지에 일괄.",
    howTo: [
      "PDF를 업로드합니다.",
      "위치(상단/하단, 좌/중/우)와 형식(1, 1/N, p1)을 선택합니다.",
      "적용 버튼을 누르고 결과를 다운로드합니다.",
    ],
    faq: [{ q: "특정 페이지부터 시작 번호를 바꿀 수 있나요?", a: "시작 번호를 설정할 수 있습니다 (예: 5페이지부터 1로 시작)." }],
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
      "PDF에서 본문 텍스트만 .txt로 추출하세요. 검색·번역기에 넣을 때 편리합니다. 스캔본 PDF(이미지)는 추출이 안 될 수 있습니다.",
    metaDescription:
      "PDF 본문 텍스트 무료 추출. .txt 다운로드, 클립보드 복사, 브라우저 안전 처리.",
    howTo: [
      "PDF를 업로드합니다.",
      "추출된 텍스트가 미리보기에 표시됩니다.",
      ".txt로 다운로드하거나 복사합니다.",
    ],
    faq: [
      { q: "스캔본 PDF도 추출되나요?", a: "스캔본은 이미지라 텍스트가 없어 추출되지 않습니다. OCR이 필요합니다." },
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
      "PDF의 각 페이지를 PNG 또는 JPG 이미지로 저장하세요. 해상도 선택 가능, ZIP으로 일괄 다운로드.",
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
      { q: "PNG와 JPG 중 뭐가 좋나요?", a: "그림·도형이 많으면 PNG, 사진이 많으면 JPG가 용량 측면에서 유리합니다." },
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
      "이미지 한 장으로 웹사이트용 파비콘 묶음을 만드세요. 16/32/48/64/128/256 PNG와 ICO 파일을 ZIP으로 한 번에 받습니다.",
    metaDescription:
      "파비콘 무료 생성. PNG/JPG → 16/32/48/64/128/256 + ICO 묶음, 브라우저 안전 처리.",
    howTo: [
      "정사각형에 가까운 이미지를 업로드합니다 (1:1 비율 추천).",
      "생성 버튼을 누르면 6개 해상도 PNG + ICO 묶음이 만들어집니다.",
      "ZIP을 다운로드해서 웹사이트 루트에 배치합니다.",
    ],
    faq: [
      { q: "ICO와 PNG 차이가 뭔가요?", a: "ICO는 여러 해상도를 한 파일에 묶은 윈도우 표준입니다. 최신 브라우저는 PNG도 잘 인식하지만, IE 등 구버전 호환을 위해 둘 다 제공하면 안전합니다." },
      { q: "원본은 어디로 가나요?", a: "어디로도 안 갑니다. 변환이 전부 브라우저 안에서 일어납니다." },
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
      "사진에 흑백·세피아·블러·밝기·대비·채도 필터를 즉시 적용하세요. 실시간 미리보기, 화질 손실 최소, 모든 처리는 브라우저 안에서.",
    metaDescription:
      "이미지 필터 무료 적용. 흑백·세피아·블러·밝기·대비·채도, 실시간 미리보기.",
    howTo: [
      "이미지를 업로드합니다.",
      "필터 슬라이더를 조절하면 실시간으로 적용됩니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "원본 화질이 떨어지나요?", a: "PNG로 저장하면 무손실, JPG는 약간의 손실이 있을 수 있습니다." },
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
      "사진 전체나 선택 영역에 모자이크를 적용해 얼굴·번호판·민감한 정보를 가리세요. 픽셀 크기 조절 가능.",
    metaDescription:
      "이미지 모자이크 무료. 영역 선택, 픽셀 크기 조절, 얼굴/번호판 가리기.",
    howTo: ["이미지를 업로드합니다.", "가릴 영역을 마우스로 드래그합니다.", "픽셀 크기를 조절하고 다운로드합니다."],
    faq: [{ q: "원래대로 복원되나요?", a: "모자이크는 비가역적입니다. 복원되지 않으니 원본 파일을 따로 보관하세요." }],
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
      "여러 이미지를 한 장으로 합치세요. 가로 스택, 세로 스택, 격자 레이아웃 선택. 간격·배경색 조절 가능.",
    metaDescription:
      "이미지 여러 장 합치기 무료. 가로/세로/격자, 간격·배경색 조절, 브라우저 안전 처리.",
    howTo: ["이미지를 여러 장 업로드합니다.", "레이아웃(가로/세로/격자), 간격, 배경색을 설정합니다.", "다운로드 버튼을 누릅니다."],
    faq: [{ q: "이미지 크기가 다른데 어떻게 되나요?", a: "각 이미지를 그대로 두거나, 같은 높이/너비에 맞춰 자동 정렬할 수 있습니다." }],
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
      "사진 주변에 색상 액자(보더)를 추가하세요. 두께·색상·둥근 모서리 조절 가능. SNS 업로드용 폴라로이드 효과에 좋습니다.",
    metaDescription:
      "이미지 액자/보더 무료 추가. 두께·색상·둥근 모서리, 폴라로이드 효과.",
    howTo: ["이미지를 업로드합니다.", "두께·색상·모서리 둥글기를 조절합니다.", "다운로드합니다."],
    faq: [{ q: "PNG 투명도가 유지되나요?", a: "PNG로 저장하면 액자 외 영역은 투명 또는 선택한 배경색으로 채워집니다." }],
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
      "JPG/HEIC 사진의 메타데이터를 확인하세요. 카메라 모델, 촬영 시각, GPS 좌표, ISO·셔터·조리개·렌즈 등이 한 눈에 표시됩니다.",
    metaDescription:
      "이미지 EXIF 정보 무료 보기. 카메라·촬영시각·GPS·조리개·ISO 표시.",
    howTo: ["이미지를 업로드합니다.", "EXIF 정보가 자동 표시됩니다.", "GPS가 있으면 지도 링크가 함께 보입니다."],
    faq: [
      { q: "EXIF가 없는 이미지는요?", a: "PNG, GIF나 EXIF를 지운 JPG는 표시할 정보가 없습니다." },
      { q: "EXIF를 제거하려면?", a: "이 사이트의 '이미지 EXIF 제거' 도구를 이용하세요." },
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
      "사진에서 주요 색상 N개를 자동으로 뽑아 팔레트를 만드세요. 디자인 색상 영감, 브랜드 컬러 분석에 유용합니다.",
    metaDescription:
      "이미지 색상 팔레트 무료 추출. HEX 코드 표시, 5~10색 추출.",
    howTo: ["이미지를 업로드합니다.", "추출할 색상 개수를 선택합니다.", "각 색을 클릭해 HEX 코드를 복사합니다."],
    faq: [{ q: "어떤 알고리즘인가요?", a: "median-cut 양자화로 이미지의 대표 색상을 추출합니다." }],
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
      "사진 위에 제목·문구를 즉시 얹으세요. 폰트·색상·크기·외곽선·위치 자유 조절. 썸네일, 명언짤, 공지 이미지 만들 때 편리합니다.",
    metaDescription:
      "이미지에 텍스트 추가 무료. 폰트·색·외곽선·위치 조절, 브라우저 안전 처리.",
    howTo: [
      "이미지를 업로드합니다.",
      "텍스트, 크기, 색상, 외곽선을 설정합니다.",
      "이미지 위에서 텍스트를 드래그해 위치를 잡습니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [{ q: "한글 폰트는요?", a: "사용자 OS에 설치된 폰트와 웹 표준 폰트를 사용합니다." }],
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
      "사진을 글자(문자)로 표현한 ASCII 아트로 변환하세요. 너비·반전·문자셋 선택 가능. 결과는 텍스트로 복사하거나 PNG로 저장.",
    metaDescription:
      "이미지 ASCII 아트 무료 변환. 너비·문자셋 선택, 텍스트/PNG 저장.",
    howTo: ["이미지를 업로드합니다.", "너비와 문자셋을 선택합니다.", "결과를 복사하거나 다운로드합니다."],
    faq: [{ q: "어떤 이미지가 잘 나오나요?", a: "콘트라스트가 뚜렷한 사진(인물 실루엣, 로고)이 가장 잘 나옵니다." }],
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
      "아이폰에서 찍은 .heic 사진을 어디서나 보이는 .jpg로 변환하세요. 카톡·문서 호환 문제를 한 번에 해결합니다.",
    metaDescription:
      "HEIC → JPG 무료 변환. 아이폰 사진 호환 문제 해결, 브라우저에서 안전 처리.",
    howTo: ["HEIC 파일을 업로드합니다.", "화질을 선택합니다.", "JPG로 다운로드합니다."],
    faq: [{ q: "여러 장을 한 번에 변환할 수 있나요?", a: "현재는 한 장씩 변환됩니다." }],
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
      "사진에 들어있는 위치(GPS)·촬영 시각·기기 정보를 깨끗이 지우세요. SNS 업로드 전 개인정보 보호용으로 추천합니다.",
    metaDescription:
      "이미지 EXIF 메타데이터·GPS 위치 무료 제거. SNS 업로드 전 개인정보 보호, 브라우저에서 안전 처리.",
    howTo: [
      "이미지를 업로드합니다.",
      "EXIF 제거 버튼을 누르면 메타데이터가 없는 새 이미지가 만들어집니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "사진 화질이 떨어지나요?", a: "동일 화질로 재인코딩되어 시각적 차이가 거의 없습니다. 원하면 화질을 조정할 수도 있습니다." },
      { q: "정말 GPS 정보가 사라지나요?", a: "네. Canvas로 픽셀만 재인코딩하기 때문에 EXIF·GPS·촬영 시각이 모두 제거됩니다." },
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
      "사진을 원하는 영역만 잘라내세요. 1:1·4:3·16:9 비율 고정 또는 자유 크롭을 지원합니다.",
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
      "사진을 90·180·270도 회전하거나 좌우/상하로 뒤집으세요. 누워있는 사진을 똑바로 세울 때 편리합니다.",
    metaDescription:
      "이미지 회전·반전 무료. 90·180·270도, 좌우/상하 반전, 화질 손실 없음.",
    howTo: [
      "이미지를 업로드합니다.",
      "회전 또는 반전 버튼을 누릅니다.",
      "결과를 다운로드합니다.",
    ],
    faq: [
      { q: "회전하면 화질이 떨어지나요?", a: "90·180·270도 같은 직각 회전은 화질 손실이 없습니다." },
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
};
