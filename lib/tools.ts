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
    | "VideoTrimTool";
  category: "qr" | "image" | "video" | "text" | "dev";
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

  // ===== Text =====
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

  // ===== Dev =====
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
  text: "텍스트",
  dev: "개발자",
};
