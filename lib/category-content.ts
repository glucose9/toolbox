// Per-category intro copy for category landing pages (unique content, not just link lists).
import type { Locale } from "@/lib/legal";

type Cat = "qr" | "barcode" | "image" | "video" | "document" | "pdf" | "text" | "dev" | "calc" | "academic";

export const CATEGORY_INTRO: Record<Cat, Record<Locale, { title: string; intro: string }>> = {
  qr: {
    ko: { title: "QR코드 도구", intro: "URL·와이파이·명함·텍스트를 QR코드로 만들고, 이미지 속 QR을 읽어내는 도구 모음입니다. 모두 워터마크 없이 무료이며 브라우저 안에서 처리됩니다." },
    en: { title: "QR Code Tools", intro: "Create QR codes from URLs, Wi-Fi, vCards, and text — and decode QR codes from images. All free, watermark-free, and processed in your browser." },
    ja: { title: "QRコードツール", intro: "URL・Wi-Fi・名刺・テキストからQRコードを作成し、画像内のQRも読み取れるツール集です。すべて透かしなし・無料でブラウザ内処理。" },
    zh: { title: "QR码工具", intro: "从URL、Wi-Fi、名片、文本生成QR码,并可识别图片中的QR码。全部免费无水印,在浏览器内处理。" },
  },
  barcode: {
    ko: { title: "바코드 도구", intro: "EAN-13·UPC·Code 128·ITF-14 등 주요 바코드를 생성하고, 이미지에서 바코드를 인식합니다. 상품 라벨·물류·도서 ISBN에 바로 쓸 수 있습니다." },
    en: { title: "Barcode Tools", intro: "Generate major barcodes like EAN-13, UPC, Code 128, and ITF-14, and decode barcodes from images. Ready for product labels, logistics, and book ISBNs." },
    ja: { title: "バーコードツール", intro: "EAN-13・UPC・Code 128・ITF-14など主要バーコードを生成し、画像からバーコードを読み取ります。商品ラベル・物流・書籍ISBNにすぐ使えます。" },
    zh: { title: "条码工具", intro: "生成 EAN-13、UPC、Code 128、ITF-14 等主要条码,并从图片识别条码。可直接用于商品标签、物流、图书 ISBN。" },
  },
  image: {
    ko: { title: "이미지 도구", intro: "이미지 변환·압축·리사이즈·크롭부터 배경 제거, 색 추출, OCR, 워터마크까지. 사진은 서버로 올라가지 않고 브라우저 안에서만 처리됩니다." },
    en: { title: "Image Tools", intro: "From converting, compressing, resizing, and cropping to background removal, color extraction, OCR, and watermarks. Photos stay in your browser and are never uploaded." },
    ja: { title: "画像ツール", intro: "変換・圧縮・リサイズ・切り抜きから背景除去、色抽出、OCR、透かしまで。写真はサーバーに上がらず、ブラウザ内だけで処理されます。" },
    zh: { title: "图像工具", intro: "从转换、压缩、缩放、裁剪到背景去除、取色、OCR、水印。照片不会上传服务器,仅在浏览器内处理。" },
  },
  video: {
    ko: { title: "동영상 도구", intro: "동영상 자르기·압축·회전·속도 조절, GIF·MP3 변환, 자막 편집까지 ffmpeg 기반으로 브라우저에서 직접 처리합니다. 대용량도 업로드 없이." },
    en: { title: "Video Tools", intro: "Trim, compress, rotate, change speed, convert to GIF/MP3, and edit subtitles — all powered by ffmpeg directly in your browser, even for large files, with no upload." },
    ja: { title: "動画ツール", intro: "動画のカット・圧縮・回転・速度変更、GIF・MP3変換、字幕編集までffmpegでブラウザ内処理。大容量もアップロードなしで。" },
    zh: { title: "视频工具", intro: "剪辑、压缩、旋转、变速、转 GIF/MP3、编辑字幕 — 全部基于 ffmpeg 在浏览器内处理,大文件也无需上传。" },
  },
  document: {
    ko: { title: "문서·오피스 도구", intro: "한컴오피스 HWP·HWPX, 워드(DOCX), 파워포인트(PPTX) 파일을 보고, 텍스트·이미지를 추출하고, PDF로 변환하고, 정보를 확인합니다. 별도 프로그램 설치 없이 브라우저에서, 업로드 없이." },
    en: { title: "Document & Office Tools", intro: "View Hancom Office HWP/HWPX, Word (DOCX), and PowerPoint (PPTX) files, extract text and images, convert to PDF, and check file info — right in your browser, no software install and no upload." },
    ja: { title: "ドキュメント・Officeツール", intro: "Hancom Office の HWP・HWPX、Word（DOCX）、PowerPoint（PPTX）ファイルを表示し、テキスト・画像を抽出、PDF変換、情報確認ができます。ソフト不要・アップロードなし、ブラウザ内で。" },
    zh: { title: "文档·Office工具", intro: "查看 Hancom Office 的 HWP/HWPX、Word（DOCX）、PowerPoint（PPTX）文件,提取文本和图片、转换为 PDF、查看文件信息 — 无需安装软件、无需上传,在浏览器内完成。" },
  },
  pdf: {
    ko: { title: "PDF 도구", intro: "PDF 합치기·분할·회전·페이지 삭제, 워터마크·페이지번호, 텍스트 추출, 전자 서명까지. 계약서 같은 민감 문서도 업로드 없이 안전하게." },
    en: { title: "PDF Tools", intro: "Merge, split, rotate, delete pages, add watermarks and page numbers, extract text, and e-sign. Even sensitive documents like contracts stay safe with no upload." },
    ja: { title: "PDFツール", intro: "PDFの結合・分割・回転・ページ削除、透かし・ページ番号、テキスト抽出、電子署名まで。契約書のような機密文書もアップロードなしで安全に。" },
    zh: { title: "PDF工具", intro: "合并、拆分、旋转、删除页面,添加水印和页码,提取文本,电子签名。合同等敏感文档也无需上传,安全处理。" },
  },
  text: {
    ko: { title: "텍스트 도구", intro: "글자수 세기, 대소문자·정렬·중복 제거, 마크다운, 정규식, JSON·CSV 변환 등 글과 데이터를 다루는 도구 모음입니다." },
    en: { title: "Text Tools", intro: "Character counting, case conversion, sorting, deduplication, Markdown, regex, JSON/CSV conversion, and more for working with text and data." },
    ja: { title: "テキストツール", intro: "文字数カウント、大文字小文字変換、並べ替え、重複除去、Markdown、正規表現、JSON・CSV変換など、文章とデータを扱うツール集です。" },
    zh: { title: "文本工具", intro: "字数统计、大小写转换、排序、去重、Markdown、正则表达式、JSON/CSV 转换等处理文本和数据的工具集。" },
  },
  dev: {
    ko: { title: "개발자 도구", intro: "해시·UUID·JWT·Base64, 정규식 테스터, JSON·YAML 포맷터, cron 파서, 코드 minify, 코드 스크린샷 등 개발에 자주 쓰는 유틸리티 모음입니다." },
    en: { title: "Developer Tools", intro: "Hashing, UUID, JWT, Base64, regex tester, JSON/YAML formatters, cron parser, code minifiers, code screenshots, and more everyday developer utilities." },
    ja: { title: "開発者ツール", intro: "ハッシュ・UUID・JWT・Base64、正規表現テスター、JSON・YAMLフォーマッター、cronパーサー、コードminify、コードスクリーンショットなど開発で使うユーティリティ集です。" },
    zh: { title: "开发者工具", intro: "哈希、UUID、JWT、Base64、正则测试、JSON/YAML 格式化、cron 解析、代码压缩、代码截图等常用开发工具。" },
  },
  calc: {
    ko: { title: "계산기·생활 도구", intro: "대출·적금·세금·실수령액 계산, 단위·환율 변환, BMI·칼로리, 디데이, 여행 경비 분할 등 일상과 업무에 필요한 계산 도구 모음입니다." },
    en: { title: "Calculator & Life Tools", intro: "Loan, savings, tax, and net-salary calculators, unit and currency converters, BMI/calories, D-day, trip cost splitting, and more for everyday life and work." },
    ja: { title: "計算機・生活ツール", intro: "ローン・積立・税金・手取り計算、単位・為替変換、BMI・カロリー、記念日カウント、旅行費用の割り勘など、日常と仕事に必要な計算ツール集です。" },
    zh: { title: "计算器·生活工具", intro: "贷款、储蓄、税金、实发工资计算,单位和汇率换算,BMI/卡路里,纪念日,旅行费用分摊等日常与工作所需的计算工具。" },
  },
  academic: {
    ko: { title: "논문·인용 도구", intro: "APA·MLA·Chicago 등 학술 인용 양식 생성, 각주·미주 포맷, DOI 조회, BibTeX 변환 등 논문 작성에 필요한 도구 모음입니다." },
    en: { title: "Citation & Essay Tools", intro: "Generate academic citations (APA, MLA, Chicago), format footnotes/endnotes, look up DOIs, convert BibTeX, and more for writing papers." },
    ja: { title: "論文・引用ツール", intro: "APA・MLA・Chicagoなど学術引用形式の生成、脚注・文末注のフォーマット、DOI検索、BibTeX変換など論文作成に必要なツール集です。" },
    zh: { title: "论文·引用工具", intro: "生成学术引用格式(APA、MLA、Chicago),格式化脚注/尾注,查询 DOI,转换 BibTeX 等写论文所需的工具。" },
  },
};

export type { Cat };
