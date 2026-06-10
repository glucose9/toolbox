// Curated "kits" — subject/exam-targeted tool bundles (e.g. AP Chemistry).
// Discovery surface: people who don't know a tool exists find it through the
// kit that matches their situation; also new SEO landing pages for intent
// keywords like "AP Chemistry tools".
//
// Anti-doorway rules (keep these when adding kits):
// - Hand-curated, few in number. Never split one intent into many kits.
// - Every kit gets UNIQUE copy: its own intro and a per-tool "role in this
//   kit" note. Do not reuse the tool's generic description here.
// - Kits link to tool pages (the canonical pages); they never duplicate them.

export type KitLocale = "ko" | "en" | "ja" | "zh";

export type KitToolEntry = {
  slug: string; // must exist in lib/tools.ts
  note: Record<KitLocale, string>; // kit-specific role, NOT the generic description
};

export type Kit = {
  slug: string;
  icon: string;
  tools: KitToolEntry[];
  copy: Record<KitLocale, { title: string; tagline: string; intro: string }>;
};

export const KITS_INDEX_COPY: Record<KitLocale, { title: string; intro: string }> = {
  ko: {
    title: "키트 모음 — 상황별 도구 세트",
    intro:
      "시험·과목·작업별로 필요한 도구만 골라 묶었습니다. 전부 무료, 회원가입 없음, 브라우저에서 바로 실행됩니다.",
  },
  en: {
    title: "Toolkits — Curated Tool Bundles",
    intro:
      "Hand-picked tool sets for specific classes, exams, and tasks. All free, no sign-up, everything runs in your browser.",
  },
  ja: {
    title: "キット一覧 — 用途別ツールセット",
    intro:
      "試験・科目・作業ごとに必要なツールだけを厳選してまとめました。すべて無料・登録不要・ブラウザで即実行。",
  },
  zh: {
    title: "工具包 — 按场景精选的工具组合",
    intro:
      "按考试、科目与任务精选所需工具。全部免费、无需注册、直接在浏览器中运行。",
  },
};

export const KITS: Kit[] = [
  {
    slug: "ap-chemistry",
    icon: "🧪",
    copy: {
      en: {
        title: "AP Chemistry Toolkit — Periodic Table, Calculator & Unit Converter",
        tagline: "Periodic table, sci calculator, unit converter — everything for chem class.",
        intro:
          "Taking AP Chemistry or a general chemistry course? This kit bundles the tools you reach for during homework and labs: an interactive periodic table for element properties and trends, a scientific calculator for molar math and pH logs, and converters for pressure, volume, and temperature. Free, no sign-up, and everything runs locally in your browser.",
      },
      ko: {
        title: "화학 공부 키트 — 주기율표·공학용 계산기·단위 변환",
        tagline: "주기율표부터 몰 계산까지, 화학 수업에 필요한 도구 한 세트.",
        intro:
          "고등 화학(내신·수능)부터 대학 일반화학까지, 과제와 실험에서 바로 쓰는 도구를 묶었습니다. 원소 성질을 찾는 주기율표, 몰 계산·pH 로그용 공학 계산기, 압력·부피·온도 단위 변환까지. 전부 무료이고 브라우저에서 바로 실행됩니다.",
      },
      ja: {
        title: "化学学習キット — 周期表・関数電卓・単位換算",
        tagline: "周期表からモル計算まで、化学の授業に必要なツールを1セットに。",
        intro:
          "高校化学から大学の一般化学まで、宿題や実験レポートでそのまま使えるツールをまとめました。元素の性質を調べる周期表、モル計算やpHの対数計算に使える関数電卓、圧力・体積・温度の単位換算など。すべて無料、ブラウザで即実行。",
      },
      zh: {
        title: "化学学习工具包 — 元素周期表·科学计算器·单位换算",
        tagline: "从元素周期表到摩尔计算，化学课所需工具一站集齐。",
        intro:
          "从高中化学到大学普通化学，这里汇集了作业与实验中最常用的工具：查询元素性质的周期表、用于摩尔计算和 pH 对数的科学计算器，以及压力、体积、温度单位换算。全部免费，浏览器内直接运行。",
      },
    },
    tools: [
      {
        slug: "periodic-table",
        note: {
          ko: "원소 성질·전자배치·주기적 경향 즉시 확인",
          en: "Look up elements, electron configs, and periodic trends",
          ja: "元素の性質・電子配置・周期的傾向をすぐ確認",
          zh: "快速查询元素性质、电子排布与周期性规律",
        },
      },
      {
        slug: "sci-calc",
        note: {
          ko: "몰 계산·pH 로그·지수 계산용 공학 계산기",
          en: "Molar math, logs for pH, and scientific notation",
          ja: "モル計算・pHの対数・指数計算に",
          zh: "摩尔计算、pH 对数与科学记数法",
        },
      },
      {
        slug: "unit-converter",
        note: {
          ko: "압력·부피·온도 단위 빠른 환산",
          en: "Convert pressure, volume, and temperature units fast",
          ja: "圧力・体積・温度の単位換算",
          zh: "压力、体积、温度单位快速换算",
        },
      },
      {
        slug: "graph-calc",
        note: {
          ko: "반응속도·농도 그래프 그려보기",
          en: "Plot rate laws and concentration curves",
          ja: "反応速度や濃度のグラフ化",
          zh: "绘制速率定律与浓度曲线",
        },
      },
      {
        slug: "statistics",
        note: {
          ko: "실험 데이터 평균·표준편차 정리",
          en: "Mean and standard deviation for lab data",
          ja: "実験データの平均・標準偏差",
          zh: "实验数据的均值与标准差",
        },
      },
      {
        slug: "formula-builder",
        note: {
          ko: "보고서용 화학식·수식 작성",
          en: "Write formulas and equations for lab reports",
          ja: "レポート用の数式作成",
          zh: "撰写实验报告中的公式",
        },
      },
    ],
  },
  {
    slug: "ap-calculus",
    icon: "📈",
    copy: {
      en: {
        title: "AP Calculus Toolkit — Graphing Calculator & Math Tools",
        tagline: "Graph functions, check work, and typeset clean solutions.",
        intro:
          "For AP Calculus AB/BC and any first calculus course: graph functions and explore limits and derivatives visually, verify answers with a full scientific calculator (equation solver included), and write up clean solutions in LaTeX. Free and entirely in-browser — nothing to install.",
      },
      ko: {
        title: "미적분·수학 공부 키트 — 그래프 계산기와 수학 도구",
        tagline: "그래프로 이해하고, 계산기로 검산하고, 수식으로 정리.",
        intro:
          "고등 미적분부터 대학 미적분학까지: 함수를 그래프로 그려 극한·도함수를 눈으로 이해하고, 방정식 솔버가 내장된 공학용 계산기로 검산하고, LaTeX로 풀이를 깔끔하게 정리하세요. 설치 없이 브라우저에서 전부 무료로 실행됩니다.",
      },
      ja: {
        title: "微積分・数学学習キット — グラフ電卓と数学ツール",
        tagline: "グラフで理解し、電卓で検算し、数式で清書。",
        intro:
          "高校の微積分から大学の解析学まで：関数をグラフ化して極限・導関数を視覚的に理解し、方程式ソルバー内蔵の関数電卓で検算し、LaTeXで解答を清書できます。インストール不要、すべてブラウザで無料。",
      },
      zh: {
        title: "微积分·数学学习工具包 — 图形计算器与数学工具",
        tagline: "用图像理解、用计算器验算、用公式排版。",
        intro:
          "从高中微积分到大学数学分析：绘制函数图像直观理解极限与导数，用内置方程求解的科学计算器验算，再用 LaTeX 排版工整的解答。免安装，全部在浏览器中免费运行。",
      },
    },
    tools: [
      {
        slug: "graph-calc",
        note: {
          ko: "함수 그래프·극한·도함수 시각화",
          en: "Graph functions and explore limits and derivatives visually",
          ja: "関数のグラフ化と微分の視覚化",
          zh: "绘制函数图像，直观理解极限与导数",
        },
      },
      {
        slug: "sci-calc",
        note: {
          ko: "식 계산·방정식 풀이·변수 저장",
          en: "Evaluate expressions, solve equations, store variables",
          ja: "式の計算・方程式・変数保存",
          zh: "表达式计算、解方程、变量存储",
        },
      },
      {
        slug: "formula-builder",
        note: {
          ko: "과제용 수식 작성",
          en: "Build clean math notation for assignments",
          ja: "課題用の数式入力",
          zh: "为作业排版数学公式",
        },
      },
      {
        slug: "latex-editor",
        note: {
          ko: "LaTeX로 풀이 정리",
          en: "Typeset solutions in LaTeX",
          ja: "LaTeXで解答を清書",
          zh: "用 LaTeX 排版解答",
        },
      },
      {
        slug: "markdown-math",
        note: {
          ko: "마크다운+수식 노트 미리보기",
          en: "Notes with Markdown + math preview",
          ja: "Markdown+数式ノート",
          zh: "Markdown+数学公式笔记",
        },
      },
    ],
  },
  {
    slug: "ap-physics",
    icon: "⚛️",
    copy: {
      en: {
        title: "AP Physics Toolkit — Calculator, Unit Converter & Graphing",
        tagline: "SI conversions, trig-heavy math, and kinematics plots in one place.",
        intro:
          "Built for AP Physics 1/2/C and intro physics courses: convert SI units (newtons, joules, watts), crunch trig-heavy problems on a scientific calculator, plot kinematics and wave functions, and run quick error analysis on lab measurements. Free, no account needed.",
      },
      ko: {
        title: "물리 공부 키트 — 계산기·단위 변환·그래프",
        tagline: "SI 단위 환산, 삼각함수 계산, 운동 그래프까지 한 곳에서.",
        intro:
          "고등 물리(내신·수능)와 대학 일반물리용: SI 단위(N·J·W)를 환산하고, 삼각함수가 많은 문제를 공학용 계산기로 풀고, 운동·파동 그래프를 그리고, 실험 측정값의 오차 분석까지. 회원가입 없이 전부 무료입니다.",
      },
      ja: {
        title: "物理学習キット — 電卓・単位換算・グラフ",
        tagline: "SI単位換算、三角関数計算、運動グラフをひとまとめに。",
        intro:
          "高校物理から大学の一般物理まで：SI単位（N・J・W）の換算、三角関数の多い問題の計算、運動・波動のグラフ化、実験測定値の誤差分析まで。登録不要、すべて無料。",
      },
      zh: {
        title: "物理学习工具包 — 计算器·单位换算·绘图",
        tagline: "SI 单位换算、三角计算、运动图像，一站搞定。",
        intro:
          "适用于高中物理与大学普通物理：换算 SI 单位（牛顿、焦耳、瓦特），用科学计算器处理大量三角函数运算，绘制运动学与波动图像，并对实验测量做误差分析。无需注册，全部免费。",
      },
    },
    tools: [
      {
        slug: "physics-constants",
        note: {
          ko: "c·h·e·G 등 CODATA 상수 검색·복사",
          en: "Look up and copy CODATA constants: c, h, e, G and more",
          ja: "c・h・e・GなどCODATA定数を検索・コピー",
          zh: "查询并复制 c、h、e、G 等 CODATA 常数",
        },
      },
      {
        slug: "sci-calc",
        note: {
          ko: "삼각함수·지수·공학 표기 계산",
          en: "Trig, exponents, and scientific notation",
          ja: "三角関数・指数・工学表記",
          zh: "三角函数、指数与科学记数",
        },
      },
      {
        slug: "unit-converter",
        note: {
          ko: "SI 단위 환산 (N·J·W·m/s)",
          en: "SI conversions: N, J, W, m/s and more",
          ja: "SI単位換算（N・J・W・m/s）",
          zh: "SI 单位换算（N、J、W、m/s）",
        },
      },
      {
        slug: "graph-calc",
        note: {
          ko: "운동·파동 그래프 그리기",
          en: "Plot kinematics and wave functions",
          ja: "運動・波動のグラフ",
          zh: "绘制运动学与波动图像",
        },
      },
      {
        slug: "formula-builder",
        note: {
          ko: "물리 공식 깔끔하게 정리",
          en: "Write physics equations cleanly",
          ja: "物理の数式作成",
          zh: "排版物理公式",
        },
      },
      {
        slug: "statistics",
        note: {
          ko: "실험 오차·통계 분석",
          en: "Error analysis for lab measurements",
          ja: "実験誤差の統計",
          zh: "实验误差统计分析",
        },
      },
    ],
  },
  {
    slug: "ap-statistics",
    icon: "📊",
    copy: {
      en: {
        title: "AP Statistics Toolkit — Descriptive Stats, Regression & Probability",
        tagline: "Descriptive stats, regression, and probability sims for stats class.",
        intro:
          "For AP Statistics and intro stats courses: get one-click descriptive statistics on any data set, run linear regression with r and r², visualize distributions, and simulate dice rolls and coin flips for probability exercises. All free, all in your browser.",
      },
      ko: {
        title: "통계 공부 키트 — 기술통계·회귀·확률",
        tagline: "기술통계, 회귀분석, 확률 시뮬레이션까지 통계 수업 한 세트.",
        intro:
          "고등 확률과 통계부터 대학 기초통계까지: 데이터를 붙여넣으면 기술통계가 한 번에 나오고, r·r²와 함께 선형회귀를 돌리고, 분포를 시각화하고, 주사위·동전 시뮬레이션으로 확률 감을 잡을 수 있습니다. 전부 무료, 브라우저에서 바로.",
      },
      ja: {
        title: "統計学習キット — 記述統計・回帰・確率",
        tagline: "記述統計、回帰分析、確率シミュレーションを1セットに。",
        intro:
          "高校の確率統計から大学の基礎統計まで：データを貼り付けるだけで記述統計が一括表示、r・r²付きの線形回帰、分布の可視化、サイコロ・コインの確率シミュレーションまで。すべて無料、ブラウザで即実行。",
      },
      zh: {
        title: "统计学习工具包 — 描述统计·回归·概率",
        tagline: "描述统计、回归分析与概率模拟，统计课一包搞定。",
        intro:
          "适用于高中概率统计与大学基础统计：粘贴数据即可一键获得描述统计，运行带 r 和 r² 的线性回归，可视化分布，并用骰子和抛硬币模拟理解概率。全部免费，浏览器内运行。",
      },
    },
    tools: [
      {
        slug: "statistics",
        note: {
          ko: "데이터 기술통계 한 번에",
          en: "One-click descriptive stats for data sets",
          ja: "記述統計をワンクリックで",
          zh: "一键描述统计",
        },
      },
      {
        slug: "stat-tables",
        note: {
          ko: "z표·t분포표 — 임계값 조회와 Φ(z) 계산",
          en: "z-table and t-table — critical values and Φ(z) lookup",
          ja: "z表・t分布表 — 臨界値とΦ(z)の参照",
          zh: "z 表与 t 分布表 — 临界值与 Φ(z) 查询",
        },
      },
      {
        slug: "sci-calc",
        note: {
          ko: "통계 탭 내장: 평균·Sx·사분위·회귀",
          en: "Built-in Stats tab: mean, Sx, quartiles, regression",
          ja: "統計タブ内蔵：平均・四分位・回帰",
          zh: "内置统计页：均值、四分位、回归",
        },
      },
      {
        slug: "graph-calc",
        note: {
          ko: "분포·회귀선 시각화",
          en: "Visualize distributions and regression lines",
          ja: "分布と回帰直線の可視化",
          zh: "可视化分布与回归线",
        },
      },
      {
        slug: "percent",
        note: {
          ko: "퍼센트·변화율 빠른 계산",
          en: "Quick percent and percent-change checks",
          ja: "パーセント・変化率の計算",
          zh: "百分比与变化率快速计算",
        },
      },
      {
        slug: "dice-coin",
        note: {
          ko: "주사위·동전 확률 시뮬레이션",
          en: "Simulate dice and coin flips for probability",
          ja: "サイコロ・コイン確率シミュレーション",
          zh: "骰子与抛硬币概率模拟",
        },
      },
    ],
  },
  {
    slug: "research-paper",
    icon: "📚",
    copy: {
      en: {
        title: "Research Paper Toolkit — Citations, BibTeX & LaTeX",
        tagline: "Citations, bibliography cleanup, and LaTeX — the writing-up survival kit.",
        intro:
          "Everything for the writing-up phase of a paper or thesis: generate APA/MLA/Chicago citations, turn DOIs into full references, convert and sort BibTeX bibliographies, fix footnotes, typeset in LaTeX, and keep an eye on word limits. Free with no sign-up; your text never leaves the browser.",
      },
      ko: {
        title: "논문 작성 키트 — 인용·참고문헌·LaTeX",
        tagline: "인용 생성부터 참고문헌 정리, LaTeX까지 — 논문 마무리 생존 키트.",
        intro:
          "논문·레포트 마무리 단계에 필요한 것만 모았습니다: APA·MLA·시카고 인용 생성, DOI로 서지정보 조회, BibTeX 변환·정렬, 각주 정리, LaTeX 작성, 분량(글자수) 확인까지. 회원가입 없이 무료이며 텍스트는 브라우저 밖으로 나가지 않습니다.",
      },
      ja: {
        title: "論文執筆キット — 引用・参考文献・LaTeX",
        tagline: "引用作成から参考文献整理、LaTeXまで — 執筆仕上げの必携セット。",
        intro:
          "論文・レポートの仕上げ段階に必要なツールを厳選：APA・MLA・シカゴ引用の作成、DOIからの書誌情報取得、BibTeXの変換・整列、脚注の整形、LaTeX執筆、文字数チェックまで。登録不要・無料、テキストはブラウザの外に出ません。",
      },
      zh: {
        title: "论文写作工具包 — 引用·参考文献·LaTeX",
        tagline: "从引用生成到参考文献整理再到 LaTeX，论文收尾必备。",
        intro:
          "为论文与报告的收尾阶段精选工具：生成 APA/MLA/芝加哥引用，通过 DOI 获取完整文献信息，转换并排序 BibTeX，整理脚注，撰写 LaTeX，并随时检查字数限制。免费无需注册，文本不会离开浏览器。",
      },
    },
    tools: [
      {
        slug: "cite-format",
        note: {
          ko: "APA·MLA·시카고 인용 생성",
          en: "APA, MLA, Chicago citations in seconds",
          ja: "APA・MLA・シカゴ引用作成",
          zh: "APA、MLA、芝加哥引用生成",
        },
      },
      {
        slug: "doi-lookup",
        note: {
          ko: "DOI로 서지정보 조회",
          en: "Turn a DOI into a full citation",
          ja: "DOIから書誌情報取得",
          zh: "通过 DOI 获取文献信息",
        },
      },
      {
        slug: "bibtex-convert",
        note: {
          ko: "BibTeX 형식 변환",
          en: "Convert BibTeX to other formats",
          ja: "BibTeX形式変換",
          zh: "BibTeX 格式转换",
        },
      },
      {
        slug: "bib-sort",
        note: {
          ko: "참고문헌 정렬·중복 제거",
          en: "Sort and dedupe your bibliography",
          ja: "参考文献の整列・重複除去",
          zh: "参考文献排序与去重",
        },
      },
      {
        slug: "footnote-format",
        note: {
          ko: "각주 형식 정리",
          en: "Clean up footnotes consistently",
          ja: "脚注の整形",
          zh: "脚注格式整理",
        },
      },
      {
        slug: "latex-editor",
        note: {
          ko: "LaTeX 작성·미리보기",
          en: "Write and preview LaTeX",
          ja: "LaTeX作成・プレビュー",
          zh: "LaTeX 编写与预览",
        },
      },
      {
        slug: "character-counter",
        note: {
          ko: "단어·글자수 제한 확인",
          en: "Track word and character limits",
          ja: "文字数・単語数の確認",
          zh: "字数统计与限制检查",
        },
      },
    ],
  },
  {
    slug: "pdf-conversion",
    icon: "🔄",
    copy: {
      en: {
        title: "PDF Conversion Kit — Convert Anything to and from PDF",
        tagline: "Word, Excel, PowerPoint, images, Markdown ↔ PDF, all in your browser.",
        intro:
          "Every PDF conversion in one place: turn Word, Excel, PowerPoint, Markdown, HTML, and plain text into PDFs, or go the other way — PDF to Word, PowerPoint, HTML, and images. Files are processed entirely in your browser and never uploaded, so contracts and reports stay private.",
      },
      ko: {
        title: "PDF 변환 키트 — 무엇이든 PDF로, PDF에서 무엇으로든",
        tagline: "워드·엑셀·PPT·이미지·마크다운 ↔ PDF, 전부 브라우저에서.",
        intro:
          "PDF 변환을 한 곳에 모았습니다: 워드·엑셀·파워포인트·마크다운·HTML·텍스트를 PDF로, 반대로 PDF를 워드·PPT·HTML·이미지로. 모든 파일은 서버 업로드 없이 브라우저 안에서만 처리되어 계약서·보고서 같은 민감한 문서도 안전합니다.",
      },
      ja: {
        title: "PDF変換キット — 何でもPDFへ、PDFから何へでも",
        tagline: "Word・Excel・PPT・画像・Markdown ↔ PDF、すべてブラウザで。",
        intro:
          "PDF変換をひとまとめに：Word・Excel・PowerPoint・Markdown・HTML・テキストをPDFへ、逆にPDFをWord・PPT・HTML・画像へ。ファイルはサーバーにアップロードされず、すべてブラウザ内で処理されるため、契約書や報告書も安全です。",
      },
      zh: {
        title: "PDF 转换工具包 — 任意格式与 PDF 互转",
        tagline: "Word、Excel、PPT、图片、Markdown ↔ PDF，全部在浏览器内完成。",
        intro:
          "所有 PDF 转换集中于此：将 Word、Excel、PowerPoint、Markdown、HTML、纯文本转为 PDF，或反向将 PDF 转为 Word、PPT、HTML 与图片。文件完全在浏览器内处理、不上传服务器，合同与报告等敏感文档更安全。",
      },
    },
    tools: [
      {
        slug: "docx-to-pdf",
        note: {
          ko: "워드(.docx) → PDF, 원본 서식 보존",
          en: "Word (.docx) → PDF with original formatting",
          ja: "Word（.docx）→ PDF、書式を保持",
          zh: "Word（.docx）→ PDF，保留原格式",
        },
      },
      {
        slug: "xlsx-to-pdf",
        note: {
          ko: "엑셀 → PDF, 셀 색·병합·테두리 보존",
          en: "Excel → PDF, keeping cell colors, merges, and borders",
          ja: "Excel → PDF、セルの色・結合・罫線を保持",
          zh: "Excel → PDF，保留单元格颜色、合并与边框",
        },
      },
      {
        slug: "pptx-to-pdf",
        note: {
          ko: "파워포인트 → 슬라이드별 PDF 페이지",
          en: "PowerPoint → one PDF page per slide",
          ja: "PowerPoint → スライドごとにPDFページ",
          zh: "PowerPoint → 每张幻灯片一页 PDF",
        },
      },
      {
        slug: "md-to-pdf",
        note: {
          ko: "마크다운/README → 깔끔한 PDF",
          en: "Markdown / README → clean PDF",
          ja: "Markdown／README → 整ったPDF",
          zh: "Markdown / README → 整洁的 PDF",
        },
      },
      {
        slug: "html-to-pdf",
        note: {
          ko: "HTML+CSS 코드 → PDF 렌더링",
          en: "Render HTML + CSS straight to PDF",
          ja: "HTML+CSS → PDFレンダリング",
          zh: "HTML+CSS 直接渲染为 PDF",
        },
      },
      {
        slug: "txt-to-pdf",
        note: {
          ko: "텍스트·메모·로그 → PDF",
          en: "Plain text, notes, and logs → PDF",
          ja: "テキスト・メモ・ログ → PDF",
          zh: "纯文本、笔记、日志 → PDF",
        },
      },
      {
        slug: "images-to-pdf",
        note: {
          ko: "사진·스캔 이미지 여러 장 → 한 PDF",
          en: "Combine photos and scans into one PDF",
          ja: "写真・スキャン画像を1つのPDFに",
          zh: "多张照片/扫描图合成一个 PDF",
        },
      },
      {
        slug: "pdf-to-docx",
        note: {
          ko: "PDF → 워드, 원본 모양 그대로 + 복사 가능 텍스트",
          en: "PDF → Word with the original look plus copyable text",
          ja: "PDF → Word、元の見た目＋コピー可能テキスト",
          zh: "PDF → Word，保留原样并附可复制文字",
        },
      },
      {
        slug: "pdf-to-pptx",
        note: {
          ko: "PDF 페이지 → 파워포인트 슬라이드",
          en: "PDF pages → PowerPoint slides",
          ja: "PDFページ → PowerPointスライド",
          zh: "PDF 页面 → PowerPoint 幻灯片",
        },
      },
      {
        slug: "pdf-to-html",
        note: {
          ko: "PDF → 단일 HTML, 드래그로 텍스트 복사 가능",
          en: "PDF → single HTML file with selectable text",
          ja: "PDF → 単一HTML、テキスト選択可能",
          zh: "PDF → 单个 HTML，文字可选中复制",
        },
      },
      {
        slug: "pdf-to-images",
        note: {
          ko: "PDF 페이지 → PNG 이미지 추출",
          en: "Export PDF pages as PNG images",
          ja: "PDFページ → PNG画像",
          zh: "PDF 页面导出为 PNG 图片",
        },
      },
    ],
  },
];

export function getKit(slug: string): Kit | undefined {
  return KITS.find((k) => k.slug === slug);
}
