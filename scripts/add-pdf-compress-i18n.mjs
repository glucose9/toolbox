// One-off script to add pdf-compress translations across all locale files.
// Run: node scripts/add-pdf-compress-i18n.mjs
import fs from "node:fs";

const NAV_TITLE = {
  ko: "PDF 압축",
  en: "PDF Compress",
  ja: "PDF圧縮",
  zh: "PDF压缩",
};

const TOOL_UI = {
  ko: {
    dropOrClick: "PDF 파일을 드래그하거나 클릭해서 업로드",
    errPdfOnly: "PDF 파일만 업로드할 수 있습니다.",
    errConvert: "압축 실패",
    errCanvasFailed: "이미지 생성 실패",
    otherFile: "다른 파일 선택",
    originalSize: "원본: {size}",
    compressedLabel: "압축 결과",
    placeholder: "압축 시작 버튼을 누르면 결과가 여기에 표시됩니다",
    compressionLevel: "압축 강도",
    presetHigh: "고화질",
    presetMedium: "표준 (권장)",
    presetLow: "최대 압축",
    startCompress: "압축 시작",
    compressing: "압축 중...",
    rendering: "페이지 렌더링 중",
    savedPct: "{pct}% 절감",
    notReduced: "원본이 이미 작아 압축 효과가 크지 않습니다",
    downloadPdf: "PDF 다운로드",
    textLostNotice: "⚠️ 압축 후에는 텍스트 선택·검색이 불가능합니다 (모든 페이지가 이미지로 변환됩니다)",
  },
  en: {
    dropOrClick: "Drag & drop a PDF, or click to upload",
    errPdfOnly: "Only PDF files can be uploaded.",
    errConvert: "Compression failed",
    errCanvasFailed: "Failed to render page image",
    otherFile: "Choose another file",
    originalSize: "Original: {size}",
    compressedLabel: "Compressed result",
    placeholder: "The result will appear here after you start compressing",
    compressionLevel: "Compression level",
    presetHigh: "High quality",
    presetMedium: "Standard (recommended)",
    presetLow: "Max compression",
    startCompress: "Start compressing",
    compressing: "Compressing...",
    rendering: "Rendering pages",
    savedPct: "{pct}% smaller",
    notReduced: "The original is already small, so savings are minimal",
    downloadPdf: "Download PDF",
    textLostNotice: "⚠️ After compression, text can no longer be selected or searched (every page becomes an image)",
  },
  ja: {
    dropOrClick: "PDFファイルをドラッグ&ドロップ、またはクリックしてアップロード",
    errPdfOnly: "PDFファイルのみアップロードできます。",
    errConvert: "圧縮に失敗しました",
    errCanvasFailed: "画像の生成に失敗しました",
    otherFile: "別のファイルを選択",
    originalSize: "元のサイズ: {size}",
    compressedLabel: "圧縮結果",
    placeholder: "圧縮を開始すると結果がここに表示されます",
    compressionLevel: "圧縮レベル",
    presetHigh: "高画質",
    presetMedium: "標準(推奨)",
    presetLow: "最大圧縮",
    startCompress: "圧縮開始",
    compressing: "圧縮中...",
    rendering: "ページをレンダリング中",
    savedPct: "{pct}% 削減",
    notReduced: "元のファイルがすでに小さいため、削減効果は限定的です",
    downloadPdf: "PDFをダウンロード",
    textLostNotice: "⚠️ 圧縮後はテキストの選択・検索ができなくなります(全ページが画像に変換されます)",
  },
  zh: {
    dropOrClick: "拖放 PDF 文件，或点击上传",
    errPdfOnly: "只能上传 PDF 文件。",
    errConvert: "压缩失败",
    errCanvasFailed: "生成图片失败",
    otherFile: "选择其他文件",
    originalSize: "原始大小：{size}",
    compressedLabel: "压缩结果",
    placeholder: "点击开始压缩后，结果会显示在这里",
    compressionLevel: "压缩强度",
    presetHigh: "高画质",
    presetMedium: "标准（推荐）",
    presetLow: "最大压缩",
    startCompress: "开始压缩",
    compressing: "压缩中...",
    rendering: "正在渲染页面",
    savedPct: "减少 {pct}%",
    notReduced: "原文件已经很小，压缩效果不明显",
    downloadPdf: "下载 PDF",
    textLostNotice: "⚠️ 压缩后文本将无法选择或搜索（所有页面都会转换为图片）",
  },
};

const TOOL_META = {
  ko: {
    h1: "PDF 용량 줄이기",
    description:
      "PDF 파일 용량을 확 줄이세요. 스캔한 문서·사진이 많이 들어간 PDF에 특히 효과적입니다. 이메일 첨부 25MB 제한, 정부 민원 사이트 업로드 용량 제한, 카톡 전송 등을 해결하는 데 자주 쓰입니다. 파일은 브라우저 안에서만 처리됩니다.",
    howTo: [
      "PDF 파일을 업로드합니다.",
      "압축 강도(화질)와 해상도를 선택합니다.",
      "압축 시작 버튼을 누르면 페이지별로 처리됩니다.",
      "압축 전후 용량을 비교한 뒤 다운로드합니다.",
    ],
    faq: [
      { q: "어떻게 용량을 줄이나요?", a: "각 페이지를 이미지로 다시 렌더링한 뒤 압축률 높은 JPG로 재인코딩해서 PDF를 다시 만듭니다. 스캔본이나 사진이 많은 PDF에서 특히 효과가 큽니다(50~90% 절감)." },
      { q: "텍스트를 마우스로 선택하거나 검색할 수 있나요?", a: "아니요. 압축 과정에서 모든 페이지가 이미지로 변환되기 때문에 텍스트 선택·검색·복사가 안 됩니다. 텍스트 선택이 꼭 필요하면 이 도구 대신 원본 프로그램에서 저장 옵션을 조정하세요." },
      { q: "이미 텍스트 위주라 용량이 작은 PDF도 압축되나요?", a: "가능하지만 이득이 적습니다. 이 도구는 사진·스캔본처럼 이미지 비중이 큰 PDF에서 가장 효과적입니다. 텍스트 위주 PDF는 원래도 용량이 작아 큰 차이가 없습니다." },
      { q: "화질은 어느 정도로 설정해야 하나요?", a: "이메일·제출용은 '보통'이면 충분합니다. 인쇄가 필요하면 '고화질'을, 최대한 작게 만들어야 하면 '최대 압축'을 선택하세요." },
      { q: "파일이 서버로 전송되나요?", a: "아니요. 모든 처리가 브라우저 안에서 일어나며 파일이 외부로 전송되지 않습니다." },
      { q: "비밀번호 걸린 PDF도 되나요?", a: "현재 미지원입니다. 잠금을 해제한 뒤 시도해 주세요." },
      { q: "양식 필드나 하이퍼링크도 유지되나요?", a: "아니요. 이미지로 재구성되는 과정에서 양식 필드, 하이퍼링크, 북마크는 사라집니다. 이런 요소가 중요하면 압축하지 말고 원본을 사용하세요." },
    ],
  },
  en: {
    h1: "Reduce PDF File Size",
    description:
      "Shrink your PDF file size significantly. Especially effective for scanned documents and photo-heavy PDFs. Commonly used to get under email attachment limits (25MB), government portal upload caps, or to send via chat apps. Everything runs in your browser.",
    howTo: [
      "Upload your PDF file.",
      "Choose a compression level (quality) and resolution.",
      "Click Start Compressing — pages are processed one by one.",
      "Compare the before/after size, then download.",
    ],
    faq: [
      { q: "How does this reduce file size?", a: "Each page is re-rendered as an image and re-encoded as a highly compressed JPEG, then rebuilt into a PDF. This works especially well on scanned or photo-heavy PDFs (50–90% smaller)." },
      { q: "Can I still select or search text afterward?", a: "No. Every page becomes an image during compression, so text selection, search, and copy no longer work. If you need selectable text, use your original program's save/export options instead of this tool." },
      { q: "Does it help PDFs that are already mostly text?", a: "It works, but the benefit is small. This tool is most effective on image-heavy or scanned PDFs. Text-heavy PDFs are usually already small, so there's little to gain." },
      { q: "Which quality setting should I choose?", a: "\"Standard\" is enough for email or submissions. Choose \"High quality\" if you plan to print, or \"Max compression\" if you need the smallest possible file." },
      { q: "Is my file uploaded to a server?", a: "No. Everything happens in your browser — your file is never sent anywhere." },
      { q: "Does it work with password-protected PDFs?", a: "Not currently. Please remove the password first, then try again." },
      { q: "Are form fields and hyperlinks preserved?", a: "No. Since pages are rebuilt as images, form fields, hyperlinks, and bookmarks are lost. If these matter, don't compress — use the original file." },
    ],
  },
  ja: {
    h1: "PDFの容量を減らす",
    description:
      "PDFファイルの容量を大幅に削減します。スキャン文書や写真が多いPDFに特に効果的です。メール添付の25MB制限、行政サイトのアップロード容量制限、チャットアプリでの送信などによく使われます。すべてブラウザ内で処理されます。",
    howTo: [
      "PDFファイルをアップロードします。",
      "圧縮レベル(画質)と解像度を選びます。",
      "圧縮開始ボタンを押すとページごとに処理されます。",
      "圧縮前後のサイズを比較してダウンロードします。",
    ],
    faq: [
      { q: "どうやって容量を減らしていますか?", a: "各ページを画像として再描画し、圧縮率の高いJPEGに再エンコードしてPDFを再構築します。スキャン文書や写真の多いPDFで特に効果的です(50〜90%削減)。" },
      { q: "圧縮後もテキストを選択・検索できますか?", a: "いいえ。圧縮の過程で全ページが画像に変換されるため、テキストの選択・検索・コピーはできなくなります。テキスト選択が必要な場合は、元のプログラムの保存オプションを調整してください。" },
      { q: "すでにテキスト中心で容量が小さいPDFも圧縮できますか?", a: "可能ですが効果は小さいです。このツールは写真やスキャン文書のような画像中心のPDFで最も効果を発揮します。" },
      { q: "画質はどれを選べばいいですか?", a: "メールや提出用なら「標準」で十分です。印刷が必要なら「高画質」、できるだけ小さくしたい場合は「最大圧縮」を選んでください。" },
      { q: "ファイルはサーバーに送信されますか?", a: "いいえ。すべての処理はブラウザ内で行われ、ファイルが外部に送信されることはありません。" },
      { q: "パスワード保護されたPDFにも対応していますか?", a: "現在は非対応です。ロックを解除してからお試しください。" },
      { q: "フォームフィールドやハイパーリンクは保持されますか?", a: "いいえ。画像として再構築されるため、フォームフィールド、ハイパーリンク、ブックマークは失われます。これらが重要な場合は圧縮せず元のファイルをお使いください。" },
    ],
  },
  zh: {
    h1: "压缩 PDF 文件大小",
    description:
      "大幅缩小 PDF 文件体积，对扫描文档和图片较多的 PDF 尤其有效。常用于解决邮件附件 25MB 限制、政务网站上传容量限制、聊天软件发送等场景。所有处理都在浏览器中完成。",
    howTo: [
      "上传 PDF 文件。",
      "选择压缩强度(画质)和分辨率。",
      "点击开始压缩，系统会逐页处理。",
      "对比压缩前后的大小，然后下载。",
    ],
    faq: [
      { q: "是如何缩小文件体积的?", a: "每一页都会被重新渲染为图片，并以高压缩率重新编码为 JPEG，再重建为 PDF。这种方式对扫描文档或图片较多的 PDF 尤其有效(可减少 50%~90%)。" },
      { q: "压缩后还能选中或搜索文字吗?", a: "不能。压缩过程中所有页面都会转换为图片,因此无法选中、搜索或复制文字。如果需要保留可选中文字,请使用原始程序的另存为/导出选项,而不是本工具。" },
      { q: "已经以文字为主、体积很小的 PDF 也能压缩吗?", a: "可以,但效果有限。本工具对图片较多或扫描类 PDF 最有效。以文字为主的 PDF 本身体积已经很小,压缩收益不大。" },
      { q: "应该选择哪种画质?", a: "邮件或提交材料选择「标准」即可。需要打印请选择「高画质」,需要尽可能小的文件请选择「最大压缩」。" },
      { q: "文件会上传到服务器吗?", a: "不会。所有处理都在浏览器中完成,文件不会被发送到任何外部服务器。" },
      { q: "支持有密码保护的 PDF 吗?", a: "目前不支持。请先解除密码保护后再试。" },
      { q: "表单字段和超链接会保留吗?", a: "不会。由于页面被重建为图片,表单字段、超链接和书签都会丢失。如果这些内容很重要,请不要压缩,直接使用原始文件。" },
    ],
  },
};

const LOCALES = ["ko", "en", "ja", "zh"];

for (const locale of LOCALES) {
  const mainPath = `messages/${locale}.json`;
  const main = JSON.parse(fs.readFileSync(mainPath, "utf-8"));
  if (main.tools["pdf-compress"]) {
    console.log(`skip ${mainPath} (already has tools.pdf-compress)`);
  } else {
    main.tools["pdf-compress"] = NAV_TITLE[locale];
    main.toolUI["pdf-compress"] = TOOL_UI[locale];
    fs.writeFileSync(mainPath, JSON.stringify(main, null, 2) + "\n", "utf-8");
    console.log(`updated ${mainPath}`);
  }

  const metaPath = `messages/tool-meta-${locale}.json`;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  if (meta["pdf-compress"]) {
    console.log(`skip ${metaPath} (already has pdf-compress)`);
  } else {
    meta["pdf-compress"] = TOOL_META[locale];
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf-8");
    console.log(`updated ${metaPath}`);
  }
}

console.log("done");
