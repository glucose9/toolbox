// Trust pages content (About / Privacy / Terms) per locale.
// Reflects barokit's actual behavior: all processing client-side, no file upload,
// localStorage only (favorites/recent/usage/theme), optional Google Analytics & ads.

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };
export type LegalKind = "about" | "privacy" | "terms";
export type Locale = "ko" | "en" | "ja" | "zh";

const UPDATED = "2026-05-24";

export const LEGAL: Record<LegalKind, Record<Locale, LegalDoc>> = {
  about: {
    ko: {
      title: "사이트 소개",
      updated: UPDATED,
      intro: "바로킷(barokit.com)은 가입 없이 무료로 쓰는 온라인 도구 모음입니다. QR·바코드·이미지·동영상·PDF·문서·개발·계산 등 250개 이상의 실용 도구를 제공합니다.",
      sections: [
        { h: "무엇을 하나요", p: ["일상과 업무에서 자주 필요한 작은 작업들 — QR/바코드 생성, 이미지 변환·압축, 동영상 처리, PDF 편집, 텍스트 정리, 개발 유틸리티, 각종 계산기 — 을 한곳에서 빠르게 처리할 수 있게 만듭니다."] },
        { h: "핵심 원칙", p: ["모든 처리는 사용자의 브라우저 안에서 이루어집니다. 파일은 서버로 업로드되지 않습니다.", "가입·로그인이 필요 없습니다.", "대부분의 도구에 워터마크가 없습니다.", "한국어·영어·일본어·중국어를 지원합니다."] },
        { h: "어떻게 작동하나요", p: ["이미지·동영상·PDF 같은 파일 처리는 WebAssembly와 브라우저 API(Canvas, Web Crypto 등)를 사용해 기기 안에서 직접 실행됩니다. 따라서 파일이 외부로 전송되지 않아 개인정보·보안 측면에서 안전합니다.", "일부 무거운 기능(영상 변환, 배경 제거 등)은 최초 사용 시 처리 엔진을 한 번 내려받은 뒤 브라우저에 캐시합니다."] },
        { h: "문의", p: ["개선 제안이나 오류 제보는 사이트 운영자에게 연락해 주세요."] },
      ],
    },
    en: {
      title: "About",
      updated: UPDATED,
      intro: "Barokit (barokit.com) is a collection of free online tools you can use without signing up. It offers 250+ practical tools across QR, barcode, image, video, PDF, document, developer, and calculator categories.",
      sections: [
        { h: "What it does", p: ["It brings together the small everyday and work tasks you need most — generating QR/barcodes, converting and compressing images, processing video, editing PDFs, cleaning up text, developer utilities, and various calculators — so you can do them quickly in one place."] },
        { h: "Core principles", p: ["All processing happens inside your browser. Files are never uploaded to a server.", "No signup or login required.", "Most tools have no watermark.", "Available in Korean, English, Japanese, and Chinese."] },
        { h: "How it works", p: ["File processing (images, video, PDF) runs directly on your device using WebAssembly and browser APIs (Canvas, Web Crypto, etc.). Your files are not transmitted anywhere, which is safer for privacy and security.", "Some heavy features (video conversion, background removal) download a processing engine once on first use and then cache it in your browser."] },
        { h: "Contact", p: ["For suggestions or bug reports, please contact the site operator."] },
      ],
    },
    ja: {
      title: "サイト紹介",
      updated: UPDATED,
      intro: "バロキット(barokit.com)は登録不要で無料で使えるオンラインツール集です。QR・バーコード・画像・動画・PDF・文書・開発・計算など250以上の実用ツールを提供します。",
      sections: [
        { h: "何ができる?", p: ["日常や仕事でよく必要になる小さな作業 — QR/バーコード生成、画像の変換・圧縮、動画処理、PDF編集、テキスト整理、開発ユーティリティ、各種計算機 — を一箇所で素早く処理できます。"] },
        { h: "基本原則", p: ["すべての処理はブラウザ内で行われます。ファイルはサーバーにアップロードされません。", "登録・ログイン不要。", "ほとんどのツールに透かしがありません。", "韓国語・英語・日本語・中国語に対応。"] },
        { h: "仕組み", p: ["画像・動画・PDFなどのファイル処理はWebAssemblyとブラウザAPI(Canvas、Web Cryptoなど)を使って端末内で直接実行されます。ファイルが外部に送信されないため、プライバシーとセキュリティの面で安全です。", "一部の重い機能(動画変換、背景除去など)は初回利用時に処理エンジンを一度ダウンロードし、ブラウザにキャッシュします。"] },
        { h: "お問い合わせ", p: ["改善のご提案やバグ報告はサイト運営者までご連絡ください。"] },
      ],
    },
    zh: {
      title: "关于本站",
      updated: UPDATED,
      intro: "Barokit(barokit.com)是无需注册即可免费使用的在线工具集,提供QR、条码、图像、视频、PDF、文档、开发、计算等250多种实用工具。",
      sections: [
        { h: "能做什么", p: ["把日常和工作中最常需要的小任务 — 生成QR/条码、转换和压缩图像、处理视频、编辑PDF、整理文本、开发工具、各种计算器 — 集中在一处快速完成。"] },
        { h: "核心原则", p: ["所有处理都在您的浏览器中完成。文件不会上传到服务器。", "无需注册或登录。", "大多数工具无水印。", "支持韩语、英语、日语、中文。"] },
        { h: "工作原理", p: ["图像、视频、PDF等文件处理使用WebAssembly和浏览器API(Canvas、Web Crypto等)直接在您的设备上运行。文件不会传输到任何地方,在隐私和安全方面更安全。", "部分较重的功能(视频转换、背景去除等)在首次使用时下载一次处理引擎,然后缓存在浏览器中。"] },
        { h: "联系", p: ["如有建议或错误报告,请联系网站运营者。"] },
      ],
    },
  },
  privacy: {
    ko: {
      title: "개인정보처리방침",
      updated: UPDATED,
      intro: "바로킷은 사용자의 개인정보를 최소한으로만 다루며, 파일 처리 과정에서 어떤 파일도 서버로 전송하지 않습니다. 본 방침은 바로킷이 어떤 정보를 어떻게 다루는지 설명합니다.",
      sections: [
        { h: "수집하지 않는 정보", p: ["회원가입이 없으므로 이름·이메일·전화번호 등 계정 정보를 수집하지 않습니다.", "도구에 올린 파일(이미지·동영상·PDF 등)은 브라우저 안에서만 처리되며 서버로 업로드·저장되지 않습니다."] },
        { h: "기기에 저장되는 정보 (localStorage)", p: ["편의 기능을 위해 다음 정보를 사용자의 브라우저에만 저장합니다: 즐겨찾기한 도구, 최근 사용한 도구, 도구 사용 횟수, 다크모드 설정.", "이 정보는 외부로 전송되지 않으며, 브라우저 설정에서 사이트 데이터를 지우면 삭제됩니다."] },
        { h: "일부 도구의 외부 서비스 호출", p: ["대부분의 도구는 완전히 오프라인(브라우저 내)에서 작동하지만, 일부 도구는 사용자가 요청한 데이터를 가져오기 위해 공개 외부 API를 호출합니다. 예: DOI 조회(CrossRef), 유튜브 썸네일(YouTube), 도서 정보(OpenLibrary), 환율 등.", "이때 전송되는 것은 사용자가 입력한 검색값(예: DOI, 영상 URL)뿐이며, 사용자의 파일은 전송되지 않습니다."] },
        { h: "분석 도구", p: ["사이트 개선을 위해 Google Analytics를 사용할 수 있습니다. 방문 페이지, 대략적 위치(국가 수준), 기기·브라우저 종류 등 익명화된 통계가 수집됩니다. 개별 사용자를 식별하지 않습니다.", "Google의 데이터 처리에 대해서는 Google 개인정보처리방침을 참고하세요."] },
        { h: "광고", p: ["향후 Google AdSense 등 제3자 광고를 게재할 수 있습니다. 광고 제공자는 쿠키를 사용해 관심 기반 광고를 표시할 수 있습니다. 사용자는 Google 광고 설정에서 맞춤 광고를 끌 수 있습니다."] },
        { h: "쿠키", p: ["바로킷 자체는 로그인·추적용 쿠키를 사용하지 않습니다. 단, 위의 분석·광고 제공자가 쿠키를 설정할 수 있습니다."] },
        { h: "아동", p: ["바로킷은 특정 연령을 대상으로 하지 않으며, 의도적으로 아동의 개인정보를 수집하지 않습니다."] },
        { h: "변경", p: ["본 방침은 필요 시 갱신될 수 있으며, 변경 시 본 페이지의 최종 수정일이 갱신됩니다."] },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: UPDATED,
      intro: "Barokit handles only minimal personal data and never transmits your files to a server during processing. This policy explains what information Barokit handles and how.",
      sections: [
        { h: "Information we do NOT collect", p: ["There is no signup, so we do not collect account information such as your name, email, or phone number.", "Files you load into a tool (images, video, PDFs, etc.) are processed only inside your browser and are never uploaded to or stored on a server."] },
        { h: "Information stored on your device (localStorage)", p: ["For convenience features we store the following only in your browser: favorited tools, recently used tools, tool usage counts, and dark-mode preference.", "This data is not transmitted anywhere and is removed if you clear site data in your browser settings."] },
        { h: "External calls by some tools", p: ["Most tools work fully offline (in-browser), but a few call public third-party APIs to fetch data you request — e.g., DOI lookup (CrossRef), YouTube thumbnails (YouTube), book info (OpenLibrary), exchange rates.", "In those cases only your query (e.g., a DOI or video URL) is sent — your files are never transmitted."] },
        { h: "Analytics", p: ["We may use Google Analytics to improve the site. It collects anonymized statistics such as pages visited, approximate location (country level), and device/browser type. It does not identify individual users.", "See Google's Privacy Policy for how Google processes this data."] },
        { h: "Advertising", p: ["We may display third-party ads such as Google AdSense in the future. Ad providers may use cookies to show interest-based ads. You can opt out of personalized ads in Google Ads Settings."] },
        { h: "Cookies", p: ["Barokit itself does not use login or tracking cookies. However, the analytics and ad providers above may set cookies."] },
        { h: "Children", p: ["Barokit is not directed at any specific age group and does not knowingly collect personal information from children."] },
        { h: "Changes", p: ["This policy may be updated as needed; the last-updated date on this page will reflect any changes."] },
      ],
    },
    ja: {
      title: "プライバシーポリシー",
      updated: UPDATED,
      intro: "バロキットは利用者の個人情報を最小限のみ扱い、ファイル処理の過程でいかなるファイルもサーバーに送信しません。本ポリシーはバロキットがどの情報をどのように扱うかを説明します。",
      sections: [
        { h: "収集しない情報", p: ["登録がないため、氏名・メール・電話番号などのアカウント情報を収集しません。", "ツールに読み込んだファイル(画像・動画・PDFなど)はブラウザ内でのみ処理され、サーバーへのアップロード・保存は行いません。"] },
        { h: "端末に保存される情報 (localStorage)", p: ["利便機能のため、次の情報を利用者のブラウザにのみ保存します:お気に入りツール、最近使ったツール、ツール使用回数、ダークモード設定。", "この情報は外部に送信されず、ブラウザ設定でサイトデータを消去すると削除されます。"] },
        { h: "一部ツールの外部サービス呼び出し", p: ["ほとんどのツールは完全にオフライン(ブラウザ内)で動作しますが、一部のツールは利用者が要求したデータを取得するため公開外部APIを呼び出します。例:DOI検索(CrossRef)、YouTubeサムネイル(YouTube)、書籍情報(OpenLibrary)、為替レートなど。", "この際送信されるのは利用者が入力した検索値(例:DOI、動画URL)のみで、利用者のファイルは送信されません。"] },
        { h: "分析ツール", p: ["サイト改善のためGoogle Analyticsを使用する場合があります。訪問ページ、おおよその位置(国レベル)、端末・ブラウザの種類など匿名化された統計を収集します。個別の利用者を識別しません。", "Googleのデータ処理についてはGoogleプライバシーポリシーをご参照ください。"] },
        { h: "広告", p: ["今後Google AdSenseなどの第三者広告を掲載する場合があります。広告提供者はCookieを使用して関心に基づく広告を表示することがあります。Google広告設定でパーソナライズ広告をオフにできます。"] },
        { h: "Cookie", p: ["バロキット自体はログイン・追跡用Cookieを使用しません。ただし上記の分析・広告提供者がCookieを設定する場合があります。"] },
        { h: "子ども", p: ["バロキットは特定の年齢層を対象とせず、意図的に子どもの個人情報を収集しません。"] },
        { h: "変更", p: ["本ポリシーは必要に応じて更新されることがあり、変更時には本ページの最終更新日が更新されます。"] },
      ],
    },
    zh: {
      title: "隐私政策",
      updated: UPDATED,
      intro: "Barokit仅处理最少量的个人数据,在处理过程中绝不将您的文件传输到服务器。本政策说明Barokit处理哪些信息以及如何处理。",
      sections: [
        { h: "我们不收集的信息", p: ["由于无需注册,我们不收集您的姓名、邮箱、电话等账户信息。", "您加载到工具中的文件(图像、视频、PDF等)仅在您的浏览器内处理,绝不上传或存储到服务器。"] },
        { h: "存储在您设备上的信息 (localStorage)", p: ["为提供便利功能,我们仅在您的浏览器中存储以下信息:收藏的工具、最近使用的工具、工具使用次数、深色模式设置。", "这些信息不会传输到任何地方,在浏览器设置中清除站点数据即可删除。"] },
        { h: "部分工具的外部服务调用", p: ["大多数工具完全离线(在浏览器内)运行,但部分工具会调用公开的第三方API以获取您请求的数据,例如:DOI查询(CrossRef)、YouTube缩略图(YouTube)、图书信息(OpenLibrary)、汇率等。", "此时仅发送您输入的查询值(如DOI、视频URL),您的文件绝不会被传输。"] },
        { h: "分析工具", p: ["我们可能使用Google Analytics来改进网站。它收集匿名统计信息,如访问页面、大致位置(国家级别)、设备/浏览器类型等,不识别个人用户。", "有关Google如何处理这些数据,请参阅Google隐私政策。"] },
        { h: "广告", p: ["我们未来可能展示Google AdSense等第三方广告。广告提供商可能使用Cookie展示基于兴趣的广告。您可在Google广告设置中关闭个性化广告。"] },
        { h: "Cookie", p: ["Barokit本身不使用登录或追踪Cookie。但上述分析和广告提供商可能设置Cookie。"] },
        { h: "儿童", p: ["Barokit不针对任何特定年龄群体,也不会有意收集儿童的个人信息。"] },
        { h: "变更", p: ["本政策可能根据需要更新,变更时本页面的最后更新日期将相应更新。"] },
      ],
    },
  },
  terms: {
    ko: {
      title: "이용약관",
      updated: UPDATED,
      intro: "바로킷(barokit.com)을 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.",
      sections: [
        { h: "서비스 제공", p: ["바로킷은 무료 온라인 도구를 \"있는 그대로(as-is)\" 제공합니다. 서비스의 정확성·가용성·적합성을 보장하지 않으며, 예고 없이 도구를 변경·중단할 수 있습니다."] },
        { h: "이용자 책임", p: ["도구는 적법한 목적으로만 사용해야 합니다.", "계산기·세금·법률·의료 관련 도구의 결과는 참고용이며, 중요한 결정 전에는 전문가나 공식 자료로 반드시 확인해야 합니다.", "PDF 잠금 해제, 전자 서명 등은 본인이 정당한 권한을 가진 파일에만 사용해야 합니다. 위·변조 등 불법 사용에 대한 책임은 이용자에게 있습니다."] },
        { h: "책임의 한계", p: ["바로킷은 도구 사용으로 발생한 직접·간접 손해(데이터 손실, 오계산, 업무 차질 등)에 대해 책임지지 않습니다. 중요한 파일은 항상 백업하세요."] },
        { h: "지식재산", p: ["이용자가 도구로 생성한 결과물(QR, 바코드, 변환된 파일 등)은 이용자에게 귀속됩니다. 바로킷은 이에 대한 권리를 주장하지 않습니다."] },
        { h: "제3자 서비스", p: ["사이트에는 분석·광고 등 제3자 서비스가 포함될 수 있으며, 해당 서비스에는 각자의 약관이 적용됩니다."] },
        { h: "변경", p: ["본 약관은 필요 시 갱신될 수 있으며, 변경 후 사이트를 계속 이용하면 변경에 동의한 것으로 간주됩니다."] },
      ],
    },
    en: {
      title: "Terms of Service",
      updated: UPDATED,
      intro: "By using Barokit (barokit.com), you agree to these terms.",
      sections: [
        { h: "The service", p: ["Barokit provides free online tools \"as-is.\" We do not guarantee accuracy, availability, or fitness for any purpose, and may change or discontinue tools without notice."] },
        { h: "Your responsibilities", p: ["Use the tools only for lawful purposes.", "Results from calculator, tax, legal, or medical tools are for reference only; always verify with a professional or official source before making important decisions.", "Tools like PDF unlock and e-signature must only be used on files you are authorized to modify. You are responsible for any unlawful use such as forgery."] },
        { h: "Limitation of liability", p: ["Barokit is not liable for any direct or indirect damages (data loss, miscalculation, business disruption, etc.) arising from use of the tools. Always back up important files."] },
        { h: "Intellectual property", p: ["Output you generate with the tools (QR codes, barcodes, converted files, etc.) belongs to you. Barokit claims no rights to it."] },
        { h: "Third-party services", p: ["The site may include third-party services such as analytics and advertising, each governed by their own terms."] },
        { h: "Changes", p: ["These terms may be updated as needed; continuing to use the site after changes constitutes acceptance."] },
      ],
    },
    ja: {
      title: "利用規約",
      updated: UPDATED,
      intro: "バロキット(barokit.com)を利用することで、本規約に同意したものとみなされます。",
      sections: [
        { h: "サービスの提供", p: ["バロキットは無料オンラインツールを「現状有姿(as-is)」で提供します。正確性・可用性・適合性を保証せず、予告なくツールを変更・中止する場合があります。"] },
        { h: "利用者の責任", p: ["ツールは適法な目的にのみ使用してください。", "計算機・税金・法律・医療関連ツールの結果は参考用であり、重要な決定の前には専門家や公式資料で必ず確認してください。", "PDFロック解除、電子署名などは、正当な権限を持つファイルにのみ使用してください。偽造などの不法使用の責任は利用者にあります。"] },
        { h: "責任の制限", p: ["バロキットはツール使用により生じた直接・間接の損害(データ損失、誤計算、業務支障など)について責任を負いません。重要なファイルは常にバックアップしてください。"] },
        { h: "知的財産", p: ["利用者がツールで生成した成果物(QR、バーコード、変換ファイルなど)は利用者に帰属します。バロキットはこれに対する権利を主張しません。"] },
        { h: "第三者サービス", p: ["サイトには分析・広告などの第三者サービスが含まれる場合があり、それぞれの規約が適用されます。"] },
        { h: "変更", p: ["本規約は必要に応じて更新されることがあり、変更後もサイトを継続利用する場合は変更に同意したものとみなされます。"] },
      ],
    },
    zh: {
      title: "服务条款",
      updated: UPDATED,
      intro: "使用Barokit(barokit.com)即表示您同意本条款。",
      sections: [
        { h: "服务提供", p: ["Barokit按\"现状(as-is)\"提供免费在线工具。我们不保证准确性、可用性或适用性,并可能在不另行通知的情况下更改或停止工具。"] },
        { h: "用户责任", p: ["工具仅可用于合法目的。", "计算器、税务、法律、医疗相关工具的结果仅供参考;在做出重要决定前,请务必咨询专业人士或核对官方资料。", "PDF解锁、电子签名等工具只能用于您有合法权限的文件。伪造等非法使用的责任由用户承担。"] },
        { h: "责任限制", p: ["Barokit对因使用工具而产生的任何直接或间接损害(数据丢失、计算错误、业务中断等)不承担责任。请始终备份重要文件。"] },
        { h: "知识产权", p: ["您使用工具生成的成果(QR码、条码、转换的文件等)归您所有。Barokit不主张任何权利。"] },
        { h: "第三方服务", p: ["本站可能包含分析、广告等第三方服务,各自受其自身条款约束。"] },
        { h: "变更", p: ["本条款可能根据需要更新;变更后继续使用本站即表示接受变更。"] },
      ],
    },
  },
};
