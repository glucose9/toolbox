export type Category =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide"
  | "unknown";

export type Element = {
  z: number;
  sym: string;
  name: string;
  ko: string;
  ja: string;
  zh: string;
  cat: Category;
  mass: number;
  row: number;
  col: number;
  config?: string;
  en?: number; // electronegativity (Pauling)
  mp?: number; // melting point K
  bp?: number; // boiling point K
  density?: number; // g/cm³
  discovered?: string;
};

export const CATEGORY_LABELS: Record<Category, { ko: string; en: string; ja: string; zh: string; bg: string; border: string }> = {
  alkali:        { ko: "알칼리 금속",   en: "Alkali metal",         ja: "アルカリ金属",       zh: "碱金属",   bg: "bg-red-100 dark:bg-red-900/40",     border: "border-red-300 dark:border-red-700" },
  alkaline:      { ko: "알칼리 토금속", en: "Alkaline earth metal", ja: "アルカリ土類金属",   zh: "碱土金属", bg: "bg-orange-100 dark:bg-orange-900/40", border: "border-orange-300 dark:border-orange-700" },
  transition:    { ko: "전이 금속",     en: "Transition metal",     ja: "遷移金属",           zh: "过渡金属", bg: "bg-yellow-100 dark:bg-yellow-900/40", border: "border-yellow-300 dark:border-yellow-700" },
  "post-transition": { ko: "전이후 금속", en: "Post-transition",    ja: "卑金属",             zh: "贫金属",   bg: "bg-lime-100 dark:bg-lime-900/40",   border: "border-lime-300 dark:border-lime-700" },
  metalloid:     { ko: "준금속",        en: "Metalloid",            ja: "半金属",             zh: "类金属",   bg: "bg-emerald-100 dark:bg-emerald-900/40", border: "border-emerald-300 dark:border-emerald-700" },
  nonmetal:      { ko: "비금속",        en: "Reactive nonmetal",    ja: "非金属",             zh: "非金属",   bg: "bg-cyan-100 dark:bg-cyan-900/40",   border: "border-cyan-300 dark:border-cyan-700" },
  halogen:       { ko: "할로젠",        en: "Halogen",              ja: "ハロゲン",           zh: "卤素",     bg: "bg-sky-100 dark:bg-sky-900/40",     border: "border-sky-300 dark:border-sky-700" },
  noble:         { ko: "비활성 기체",   en: "Noble gas",            ja: "貴ガス",             zh: "稀有气体", bg: "bg-violet-100 dark:bg-violet-900/40", border: "border-violet-300 dark:border-violet-700" },
  lanthanide:    { ko: "란타넘족",      en: "Lanthanide",           ja: "ランタノイド",       zh: "镧系元素", bg: "bg-pink-100 dark:bg-pink-900/40",   border: "border-pink-300 dark:border-pink-700" },
  actinide:      { ko: "악티늄족",      en: "Actinide",             ja: "アクチノイド",       zh: "锕系元素", bg: "bg-fuchsia-100 dark:bg-fuchsia-900/40", border: "border-fuchsia-300 dark:border-fuchsia-700" },
  unknown:       { ko: "미확인",        en: "Unknown",              ja: "不明",               zh: "未知",     bg: "bg-gray-100 dark:bg-gray-800",      border: "border-gray-300 dark:border-gray-600" },
};

// row/col use 1-indexed standard periodic table positions
// Lanthanides go in row 9, actinides row 10 (separate block)
export const ELEMENTS: Element[] = [
  { z: 1,   sym: "H",  name: "Hydrogen",   ko: "수소",     ja: "水素",         zh: "氢",   cat: "nonmetal",        mass: 1.008,   row: 1, col: 1,  config: "1s¹",       en: 2.20, mp: 14, bp: 20, density: 0.00009 },
  { z: 2,   sym: "He", name: "Helium",     ko: "헬륨",     ja: "ヘリウム",     zh: "氦",   cat: "noble",           mass: 4.0026,  row: 1, col: 18, config: "1s²",       mp: 1,  bp: 4,  density: 0.00018 },
  { z: 3,   sym: "Li", name: "Lithium",    ko: "리튬",     ja: "リチウム",     zh: "锂",   cat: "alkali",          mass: 6.94,    row: 2, col: 1,  config: "[He] 2s¹", en: 0.98, mp: 454, bp: 1615, density: 0.534 },
  { z: 4,   sym: "Be", name: "Beryllium",  ko: "베릴륨",   ja: "ベリリウム",   zh: "铍",   cat: "alkaline",        mass: 9.0122,  row: 2, col: 2,  config: "[He] 2s²", en: 1.57, mp: 1560, bp: 2742, density: 1.85 },
  { z: 5,   sym: "B",  name: "Boron",      ko: "붕소",     ja: "ホウ素",       zh: "硼",   cat: "metalloid",       mass: 10.81,   row: 2, col: 13, config: "[He] 2s² 2p¹", en: 2.04, mp: 2349, bp: 4200, density: 2.34 },
  { z: 6,   sym: "C",  name: "Carbon",     ko: "탄소",     ja: "炭素",         zh: "碳",   cat: "nonmetal",        mass: 12.011,  row: 2, col: 14, config: "[He] 2s² 2p²", en: 2.55, mp: 3823, bp: 4098, density: 2.27 },
  { z: 7,   sym: "N",  name: "Nitrogen",   ko: "질소",     ja: "窒素",         zh: "氮",   cat: "nonmetal",        mass: 14.007,  row: 2, col: 15, config: "[He] 2s² 2p³", en: 3.04, mp: 63, bp: 77, density: 0.00125 },
  { z: 8,   sym: "O",  name: "Oxygen",     ko: "산소",     ja: "酸素",         zh: "氧",   cat: "nonmetal",        mass: 15.999,  row: 2, col: 16, config: "[He] 2s² 2p⁴", en: 3.44, mp: 54, bp: 90, density: 0.00143 },
  { z: 9,   sym: "F",  name: "Fluorine",   ko: "플루오린", ja: "フッ素",       zh: "氟",   cat: "halogen",         mass: 18.998,  row: 2, col: 17, config: "[He] 2s² 2p⁵", en: 3.98, mp: 53, bp: 85, density: 0.0017 },
  { z: 10,  sym: "Ne", name: "Neon",       ko: "네온",     ja: "ネオン",       zh: "氖",   cat: "noble",           mass: 20.180,  row: 2, col: 18, config: "[He] 2s² 2p⁶", mp: 25, bp: 27, density: 0.0009 },
  { z: 11,  sym: "Na", name: "Sodium",     ko: "나트륨",   ja: "ナトリウム",   zh: "钠",   cat: "alkali",          mass: 22.990,  row: 3, col: 1,  config: "[Ne] 3s¹", en: 0.93, mp: 371, bp: 1156, density: 0.97 },
  { z: 12,  sym: "Mg", name: "Magnesium",  ko: "마그네슘", ja: "マグネシウム", zh: "镁",   cat: "alkaline",        mass: 24.305,  row: 3, col: 2,  config: "[Ne] 3s²", en: 1.31, mp: 923, bp: 1363, density: 1.74 },
  { z: 13,  sym: "Al", name: "Aluminium",  ko: "알루미늄", ja: "アルミニウム", zh: "铝",   cat: "post-transition", mass: 26.982,  row: 3, col: 13, config: "[Ne] 3s² 3p¹", en: 1.61, mp: 933, bp: 2792, density: 2.70 },
  { z: 14,  sym: "Si", name: "Silicon",    ko: "규소",     ja: "ケイ素",       zh: "硅",   cat: "metalloid",       mass: 28.085,  row: 3, col: 14, config: "[Ne] 3s² 3p²", en: 1.90, mp: 1687, bp: 3538, density: 2.33 },
  { z: 15,  sym: "P",  name: "Phosphorus", ko: "인",       ja: "リン",         zh: "磷",   cat: "nonmetal",        mass: 30.974,  row: 3, col: 15, config: "[Ne] 3s² 3p³", en: 2.19, mp: 317, bp: 553, density: 1.82 },
  { z: 16,  sym: "S",  name: "Sulfur",     ko: "황",       ja: "硫黄",         zh: "硫",   cat: "nonmetal",        mass: 32.06,   row: 3, col: 16, config: "[Ne] 3s² 3p⁴", en: 2.58, mp: 388, bp: 718, density: 2.07 },
  { z: 17,  sym: "Cl", name: "Chlorine",   ko: "염소",     ja: "塩素",         zh: "氯",   cat: "halogen",         mass: 35.45,   row: 3, col: 17, config: "[Ne] 3s² 3p⁵", en: 3.16, mp: 172, bp: 239, density: 0.00321 },
  { z: 18,  sym: "Ar", name: "Argon",      ko: "아르곤",   ja: "アルゴン",     zh: "氩",   cat: "noble",           mass: 39.948,  row: 3, col: 18, config: "[Ne] 3s² 3p⁶", mp: 84, bp: 87, density: 0.00178 },
  { z: 19,  sym: "K",  name: "Potassium",  ko: "칼륨",     ja: "カリウム",     zh: "钾",   cat: "alkali",          mass: 39.098,  row: 4, col: 1,  config: "[Ar] 4s¹", en: 0.82, mp: 337, bp: 1032, density: 0.86 },
  { z: 20,  sym: "Ca", name: "Calcium",    ko: "칼슘",     ja: "カルシウム",   zh: "钙",   cat: "alkaline",        mass: 40.078,  row: 4, col: 2,  config: "[Ar] 4s²", en: 1.00, mp: 1115, bp: 1757, density: 1.55 },
  { z: 21,  sym: "Sc", name: "Scandium",   ko: "스칸듐",   ja: "スカンジウム", zh: "钪",   cat: "transition",      mass: 44.956,  row: 4, col: 3,  config: "[Ar] 3d¹ 4s²", en: 1.36, mp: 1814, bp: 3109, density: 2.99 },
  { z: 22,  sym: "Ti", name: "Titanium",   ko: "타이타늄", ja: "チタン",       zh: "钛",   cat: "transition",      mass: 47.867,  row: 4, col: 4,  config: "[Ar] 3d² 4s²", en: 1.54, mp: 1941, bp: 3560, density: 4.51 },
  { z: 23,  sym: "V",  name: "Vanadium",   ko: "바나듐",   ja: "バナジウム",   zh: "钒",   cat: "transition",      mass: 50.942,  row: 4, col: 5,  config: "[Ar] 3d³ 4s²", en: 1.63, mp: 2183, bp: 3680, density: 6.11 },
  { z: 24,  sym: "Cr", name: "Chromium",   ko: "크로뮴",   ja: "クロム",       zh: "铬",   cat: "transition",      mass: 51.996,  row: 4, col: 6,  config: "[Ar] 3d⁵ 4s¹", en: 1.66, mp: 2180, bp: 2944, density: 7.15 },
  { z: 25,  sym: "Mn", name: "Manganese",  ko: "망가니즈", ja: "マンガン",     zh: "锰",   cat: "transition",      mass: 54.938,  row: 4, col: 7,  config: "[Ar] 3d⁵ 4s²", en: 1.55, mp: 1519, bp: 2334, density: 7.21 },
  { z: 26,  sym: "Fe", name: "Iron",       ko: "철",       ja: "鉄",           zh: "铁",   cat: "transition",      mass: 55.845,  row: 4, col: 8,  config: "[Ar] 3d⁶ 4s²", en: 1.83, mp: 1811, bp: 3134, density: 7.87 },
  { z: 27,  sym: "Co", name: "Cobalt",     ko: "코발트",   ja: "コバルト",     zh: "钴",   cat: "transition",      mass: 58.933,  row: 4, col: 9,  config: "[Ar] 3d⁷ 4s²", en: 1.88, mp: 1768, bp: 3200, density: 8.86 },
  { z: 28,  sym: "Ni", name: "Nickel",     ko: "니켈",     ja: "ニッケル",     zh: "镍",   cat: "transition",      mass: 58.693,  row: 4, col: 10, config: "[Ar] 3d⁸ 4s²", en: 1.91, mp: 1728, bp: 3186, density: 8.91 },
  { z: 29,  sym: "Cu", name: "Copper",     ko: "구리",     ja: "銅",           zh: "铜",   cat: "transition",      mass: 63.546,  row: 4, col: 11, config: "[Ar] 3d¹⁰ 4s¹", en: 1.90, mp: 1358, bp: 2835, density: 8.96 },
  { z: 30,  sym: "Zn", name: "Zinc",       ko: "아연",     ja: "亜鉛",         zh: "锌",   cat: "transition",      mass: 65.38,   row: 4, col: 12, config: "[Ar] 3d¹⁰ 4s²", en: 1.65, mp: 693, bp: 1180, density: 7.13 },
  { z: 31,  sym: "Ga", name: "Gallium",    ko: "갈륨",     ja: "ガリウム",     zh: "镓",   cat: "post-transition", mass: 69.723,  row: 4, col: 13, config: "[Ar] 3d¹⁰ 4s² 4p¹", en: 1.81, mp: 303, bp: 2477, density: 5.91 },
  { z: 32,  sym: "Ge", name: "Germanium",  ko: "저마늄",   ja: "ゲルマニウム", zh: "锗",   cat: "metalloid",       mass: 72.630,  row: 4, col: 14, en: 2.01, mp: 1211, bp: 3106, density: 5.32 },
  { z: 33,  sym: "As", name: "Arsenic",    ko: "비소",     ja: "ヒ素",         zh: "砷",   cat: "metalloid",       mass: 74.922,  row: 4, col: 15, en: 2.18, mp: 1090, bp: 887, density: 5.78 },
  { z: 34,  sym: "Se", name: "Selenium",   ko: "셀레늄",   ja: "セレン",       zh: "硒",   cat: "nonmetal",        mass: 78.971,  row: 4, col: 16, en: 2.55, mp: 494, bp: 958, density: 4.81 },
  { z: 35,  sym: "Br", name: "Bromine",    ko: "브로민",   ja: "臭素",         zh: "溴",   cat: "halogen",         mass: 79.904,  row: 4, col: 17, en: 2.96, mp: 266, bp: 332, density: 3.12 },
  { z: 36,  sym: "Kr", name: "Krypton",    ko: "크립톤",   ja: "クリプトン",   zh: "氪",   cat: "noble",           mass: 83.798,  row: 4, col: 18, mp: 116, bp: 120, density: 0.00375 },
  { z: 37,  sym: "Rb", name: "Rubidium",   ko: "루비듐",   ja: "ルビジウム",   zh: "铷",   cat: "alkali",          mass: 85.468,  row: 5, col: 1,  en: 0.82, mp: 312, bp: 961, density: 1.53 },
  { z: 38,  sym: "Sr", name: "Strontium",  ko: "스트론튬", ja: "ストロンチウム", zh: "锶", cat: "alkaline",        mass: 87.62,   row: 5, col: 2,  en: 0.95, mp: 1050, bp: 1655, density: 2.64 },
  { z: 39,  sym: "Y",  name: "Yttrium",    ko: "이트륨",   ja: "イットリウム", zh: "钇",   cat: "transition",      mass: 88.906,  row: 5, col: 3,  en: 1.22, mp: 1799, bp: 3609, density: 4.47 },
  { z: 40,  sym: "Zr", name: "Zirconium",  ko: "지르코늄", ja: "ジルコニウム", zh: "锆",   cat: "transition",      mass: 91.224,  row: 5, col: 4,  en: 1.33, mp: 2128, bp: 4682, density: 6.51 },
  { z: 41,  sym: "Nb", name: "Niobium",    ko: "나이오븀", ja: "ニオブ",       zh: "铌",   cat: "transition",      mass: 92.906,  row: 5, col: 5,  en: 1.60, mp: 2750, bp: 5017, density: 8.57 },
  { z: 42,  sym: "Mo", name: "Molybdenum", ko: "몰리브데넘", ja: "モリブデン", zh: "钼",   cat: "transition",    mass: 95.95,   row: 5, col: 6,  en: 2.16, mp: 2896, bp: 4912, density: 10.28 },
  { z: 43,  sym: "Tc", name: "Technetium", ko: "테크네튬", ja: "テクネチウム", zh: "锝",   cat: "transition",      mass: 98,      row: 5, col: 7,  en: 1.9, mp: 2430, bp: 4538, density: 11 },
  { z: 44,  sym: "Ru", name: "Ruthenium",  ko: "루테늄",   ja: "ルテニウム",   zh: "钌",   cat: "transition",      mass: 101.07,  row: 5, col: 8,  en: 2.2, mp: 2607, bp: 4423, density: 12.45 },
  { z: 45,  sym: "Rh", name: "Rhodium",    ko: "로듐",     ja: "ロジウム",     zh: "铑",   cat: "transition",      mass: 102.91,  row: 5, col: 9,  en: 2.28, mp: 2237, bp: 3968, density: 12.41 },
  { z: 46,  sym: "Pd", name: "Palladium",  ko: "팔라듐",   ja: "パラジウム",   zh: "钯",   cat: "transition",      mass: 106.42,  row: 5, col: 10, en: 2.20, mp: 1828, bp: 3236, density: 12.02 },
  { z: 47,  sym: "Ag", name: "Silver",     ko: "은",       ja: "銀",           zh: "银",   cat: "transition",      mass: 107.87,  row: 5, col: 11, en: 1.93, mp: 1235, bp: 2435, density: 10.50 },
  { z: 48,  sym: "Cd", name: "Cadmium",    ko: "카드뮴",   ja: "カドミウム",   zh: "镉",   cat: "transition",      mass: 112.41,  row: 5, col: 12, en: 1.69, mp: 594, bp: 1040, density: 8.69 },
  { z: 49,  sym: "In", name: "Indium",     ko: "인듐",     ja: "インジウム",   zh: "铟",   cat: "post-transition", mass: 114.82,  row: 5, col: 13, en: 1.78, mp: 430, bp: 2345, density: 7.31 },
  { z: 50,  sym: "Sn", name: "Tin",        ko: "주석",     ja: "スズ",         zh: "锡",   cat: "post-transition", mass: 118.71,  row: 5, col: 14, en: 1.96, mp: 505, bp: 2875, density: 7.31 },
  { z: 51,  sym: "Sb", name: "Antimony",   ko: "안티모니", ja: "アンチモン",   zh: "锑",   cat: "metalloid",       mass: 121.76,  row: 5, col: 15, en: 2.05, mp: 904, bp: 1860, density: 6.69 },
  { z: 52,  sym: "Te", name: "Tellurium",  ko: "텔루륨",   ja: "テルル",       zh: "碲",   cat: "metalloid",       mass: 127.60,  row: 5, col: 16, en: 2.1, mp: 723, bp: 1261, density: 6.24 },
  { z: 53,  sym: "I",  name: "Iodine",     ko: "아이오딘", ja: "ヨウ素",       zh: "碘",   cat: "halogen",         mass: 126.90,  row: 5, col: 17, en: 2.66, mp: 387, bp: 457, density: 4.93 },
  { z: 54,  sym: "Xe", name: "Xenon",      ko: "제논",     ja: "キセノン",     zh: "氙",   cat: "noble",           mass: 131.29,  row: 5, col: 18, en: 2.60, mp: 161, bp: 165, density: 0.0059 },
  { z: 55,  sym: "Cs", name: "Cesium",     ko: "세슘",     ja: "セシウム",     zh: "铯",   cat: "alkali",          mass: 132.91,  row: 6, col: 1,  en: 0.79, mp: 302, bp: 944, density: 1.87 },
  { z: 56,  sym: "Ba", name: "Barium",     ko: "바륨",     ja: "バリウム",     zh: "钡",   cat: "alkaline",        mass: 137.33,  row: 6, col: 2,  en: 0.89, mp: 1000, bp: 2170, density: 3.59 },
  { z: 57,  sym: "La", name: "Lanthanum",  ko: "란타넘",   ja: "ランタン",     zh: "镧",   cat: "lanthanide",      mass: 138.91,  row: 9, col: 4,  en: 1.10, mp: 1193, bp: 3737, density: 6.15 },
  { z: 58,  sym: "Ce", name: "Cerium",     ko: "세륨",     ja: "セリウム",     zh: "铈",   cat: "lanthanide",      mass: 140.12,  row: 9, col: 5,  en: 1.12, mp: 1068, bp: 3716, density: 6.77 },
  { z: 59,  sym: "Pr", name: "Praseodymium", ko: "프라세오디뮴", ja: "プラセオジム", zh: "镨", cat: "lanthanide", mass: 140.91, row: 9, col: 6, en: 1.13, mp: 1208, bp: 3793, density: 6.77 },
  { z: 60,  sym: "Nd", name: "Neodymium",  ko: "네오디뮴", ja: "ネオジム",     zh: "钕",   cat: "lanthanide",      mass: 144.24,  row: 9, col: 7, en: 1.14, mp: 1297, bp: 3347, density: 7.01 },
  { z: 61,  sym: "Pm", name: "Promethium", ko: "프로메튬", ja: "プロメチウム", zh: "钷",   cat: "lanthanide",      mass: 145,     row: 9, col: 8, en: 1.13, mp: 1315, bp: 3273, density: 7.26 },
  { z: 62,  sym: "Sm", name: "Samarium",   ko: "사마륨",   ja: "サマリウム",   zh: "钐",   cat: "lanthanide",      mass: 150.36,  row: 9, col: 9, en: 1.17, mp: 1345, bp: 2067, density: 7.52 },
  { z: 63,  sym: "Eu", name: "Europium",   ko: "유로퓸",   ja: "ユウロピウム", zh: "铕",   cat: "lanthanide",      mass: 151.96,  row: 9, col: 10, en: 1.2, mp: 1099, bp: 1802, density: 5.24 },
  { z: 64,  sym: "Gd", name: "Gadolinium", ko: "가돌리늄", ja: "ガドリニウム", zh: "钆",   cat: "lanthanide",      mass: 157.25,  row: 9, col: 11, en: 1.20, mp: 1585, bp: 3546, density: 7.90 },
  { z: 65,  sym: "Tb", name: "Terbium",    ko: "터븀",     ja: "テルビウム",   zh: "铽",   cat: "lanthanide",      mass: 158.93,  row: 9, col: 12, en: 1.1, mp: 1629, bp: 3503, density: 8.23 },
  { z: 66,  sym: "Dy", name: "Dysprosium", ko: "디스프로슘", ja: "ジスプロシウム", zh: "镝", cat: "lanthanide",   mass: 162.50,  row: 9, col: 13, en: 1.22, mp: 1680, bp: 2840, density: 8.55 },
  { z: 67,  sym: "Ho", name: "Holmium",    ko: "홀뮴",     ja: "ホルミウム",   zh: "钬",   cat: "lanthanide",      mass: 164.93,  row: 9, col: 14, en: 1.23, mp: 1734, bp: 2993, density: 8.80 },
  { z: 68,  sym: "Er", name: "Erbium",     ko: "어븀",     ja: "エルビウム",   zh: "铒",   cat: "lanthanide",      mass: 167.26,  row: 9, col: 15, en: 1.24, mp: 1802, bp: 3141, density: 9.07 },
  { z: 69,  sym: "Tm", name: "Thulium",    ko: "툴륨",     ja: "ツリウム",     zh: "铥",   cat: "lanthanide",      mass: 168.93,  row: 9, col: 16, en: 1.25, mp: 1818, bp: 2223, density: 9.32 },
  { z: 70,  sym: "Yb", name: "Ytterbium",  ko: "이터븀",   ja: "イッテルビウム", zh: "镱", cat: "lanthanide",      mass: 173.05,  row: 9, col: 17, en: 1.1, mp: 1097, bp: 1469, density: 6.90 },
  { z: 71,  sym: "Lu", name: "Lutetium",   ko: "루테튬",   ja: "ルテチウム",   zh: "镥",   cat: "lanthanide",      mass: 174.97,  row: 9, col: 18, en: 1.27, mp: 1925, bp: 3675, density: 9.84 },
  { z: 72,  sym: "Hf", name: "Hafnium",    ko: "하프늄",   ja: "ハフニウム",   zh: "铪",   cat: "transition",      mass: 178.49,  row: 6, col: 4,  en: 1.3, mp: 2506, bp: 4876, density: 13.31 },
  { z: 73,  sym: "Ta", name: "Tantalum",   ko: "탄탈럼",   ja: "タンタル",     zh: "钽",   cat: "transition",      mass: 180.95,  row: 6, col: 5,  en: 1.5, mp: 3290, bp: 5731, density: 16.65 },
  { z: 74,  sym: "W",  name: "Tungsten",   ko: "텅스텐",   ja: "タングステン", zh: "钨",   cat: "transition",      mass: 183.84,  row: 6, col: 6,  en: 2.36, mp: 3695, bp: 5828, density: 19.25 },
  { z: 75,  sym: "Re", name: "Rhenium",    ko: "레늄",     ja: "レニウム",     zh: "铼",   cat: "transition",      mass: 186.21,  row: 6, col: 7,  en: 1.9, mp: 3459, bp: 5869, density: 21.02 },
  { z: 76,  sym: "Os", name: "Osmium",     ko: "오스뮴",   ja: "オスミウム",   zh: "锇",   cat: "transition",      mass: 190.23,  row: 6, col: 8,  en: 2.2, mp: 3306, bp: 5285, density: 22.57 },
  { z: 77,  sym: "Ir", name: "Iridium",    ko: "이리듐",   ja: "イリジウム",   zh: "铱",   cat: "transition",      mass: 192.22,  row: 6, col: 9,  en: 2.20, mp: 2719, bp: 4701, density: 22.42 },
  { z: 78,  sym: "Pt", name: "Platinum",   ko: "백금",     ja: "白金",         zh: "铂",   cat: "transition",      mass: 195.08,  row: 6, col: 10, en: 2.28, mp: 2041, bp: 4098, density: 21.45 },
  { z: 79,  sym: "Au", name: "Gold",       ko: "금",       ja: "金",           zh: "金",   cat: "transition",      mass: 196.97,  row: 6, col: 11, en: 2.54, mp: 1337, bp: 3129, density: 19.32 },
  { z: 80,  sym: "Hg", name: "Mercury",    ko: "수은",     ja: "水銀",         zh: "汞",   cat: "transition",      mass: 200.59,  row: 6, col: 12, en: 2.00, mp: 234, bp: 630, density: 13.53 },
  { z: 81,  sym: "Tl", name: "Thallium",   ko: "탈륨",     ja: "タリウム",     zh: "铊",   cat: "post-transition", mass: 204.38,  row: 6, col: 13, en: 1.62, mp: 577, bp: 1746, density: 11.85 },
  { z: 82,  sym: "Pb", name: "Lead",       ko: "납",       ja: "鉛",           zh: "铅",   cat: "post-transition", mass: 207.2,   row: 6, col: 14, en: 1.87, mp: 600, bp: 2022, density: 11.34 },
  { z: 83,  sym: "Bi", name: "Bismuth",    ko: "비스무트", ja: "ビスマス",     zh: "铋",   cat: "post-transition", mass: 208.98,  row: 6, col: 15, en: 2.02, mp: 544, bp: 1837, density: 9.78 },
  { z: 84,  sym: "Po", name: "Polonium",   ko: "폴로늄",   ja: "ポロニウム",   zh: "钋",   cat: "post-transition", mass: 209,     row: 6, col: 16, en: 2.0, mp: 527, bp: 1235, density: 9.20 },
  { z: 85,  sym: "At", name: "Astatine",   ko: "아스타틴", ja: "アスタチン",   zh: "砹",   cat: "halogen",         mass: 210,     row: 6, col: 17, en: 2.2, mp: 575, bp: 610 },
  { z: 86,  sym: "Rn", name: "Radon",      ko: "라돈",     ja: "ラドン",       zh: "氡",   cat: "noble",           mass: 222,     row: 6, col: 18, mp: 202, bp: 211, density: 0.00973 },
  { z: 87,  sym: "Fr", name: "Francium",   ko: "프랑슘",   ja: "フランシウム", zh: "钫",   cat: "alkali",          mass: 223,     row: 7, col: 1,  en: 0.7, mp: 300, bp: 950 },
  { z: 88,  sym: "Ra", name: "Radium",     ko: "라듐",     ja: "ラジウム",     zh: "镭",   cat: "alkaline",        mass: 226,     row: 7, col: 2,  en: 0.9, mp: 973, bp: 2010, density: 5.0 },
  { z: 89,  sym: "Ac", name: "Actinium",   ko: "악티늄",   ja: "アクチニウム", zh: "锕",   cat: "actinide",        mass: 227,     row: 10, col: 4, en: 1.1, mp: 1323, bp: 3471, density: 10.07 },
  { z: 90,  sym: "Th", name: "Thorium",    ko: "토륨",     ja: "トリウム",     zh: "钍",   cat: "actinide",        mass: 232.04,  row: 10, col: 5, en: 1.3, mp: 2115, bp: 5061, density: 11.72 },
  { z: 91,  sym: "Pa", name: "Protactinium", ko: "프로트악티늄", ja: "プロトアクチニウム", zh: "镤", cat: "actinide", mass: 231.04, row: 10, col: 6, en: 1.5, mp: 1841, bp: 4300, density: 15.37 },
  { z: 92,  sym: "U",  name: "Uranium",    ko: "우라늄",   ja: "ウラン",       zh: "铀",   cat: "actinide",        mass: 238.03,  row: 10, col: 7, en: 1.38, mp: 1405, bp: 4404, density: 18.95 },
  { z: 93,  sym: "Np", name: "Neptunium",  ko: "넵투늄",   ja: "ネプツニウム", zh: "镎",   cat: "actinide",        mass: 237,     row: 10, col: 8, en: 1.36, mp: 917, bp: 4273, density: 20.45 },
  { z: 94,  sym: "Pu", name: "Plutonium",  ko: "플루토늄", ja: "プルトニウム", zh: "钚",   cat: "actinide",        mass: 244,     row: 10, col: 9, en: 1.28, mp: 913, bp: 3505, density: 19.84 },
  { z: 95,  sym: "Am", name: "Americium",  ko: "아메리슘", ja: "アメリシウム", zh: "镅",   cat: "actinide",        mass: 243,     row: 10, col: 10, en: 1.13, mp: 1449, bp: 2880, density: 13.69 },
  { z: 96,  sym: "Cm", name: "Curium",     ko: "퀴륨",     ja: "キュリウム",   zh: "锔",   cat: "actinide",        mass: 247,     row: 10, col: 11, en: 1.28, mp: 1613, bp: 3383, density: 13.51 },
  { z: 97,  sym: "Bk", name: "Berkelium",  ko: "버클륨",   ja: "バークリウム", zh: "锫",   cat: "actinide",        mass: 247,     row: 10, col: 12, en: 1.3, mp: 1259, bp: 2900, density: 14.78 },
  { z: 98,  sym: "Cf", name: "Californium", ko: "캘리포늄", ja: "カリホルニウム", zh: "锎", cat: "actinide",       mass: 251,     row: 10, col: 13, en: 1.3, mp: 1173, bp: 1743, density: 15.1 },
  { z: 99,  sym: "Es", name: "Einsteinium", ko: "아인슈타이늄", ja: "アインスタイニウム", zh: "锿", cat: "actinide", mass: 252,   row: 10, col: 14, en: 1.3, mp: 1133, bp: 1269, density: 8.84 },
  { z: 100, sym: "Fm", name: "Fermium",    ko: "페르뮴",   ja: "フェルミウム", zh: "镄",   cat: "actinide",        mass: 257,     row: 10, col: 15, en: 1.3, mp: 1800 },
  { z: 101, sym: "Md", name: "Mendelevium", ko: "멘델레븀", ja: "メンデレビウム", zh: "钔", cat: "actinide",       mass: 258,     row: 10, col: 16, en: 1.3, mp: 1100 },
  { z: 102, sym: "No", name: "Nobelium",   ko: "노벨륨",   ja: "ノーベリウム", zh: "锘",   cat: "actinide",        mass: 259,     row: 10, col: 17, en: 1.3, mp: 1100 },
  { z: 103, sym: "Lr", name: "Lawrencium", ko: "로렌슘",   ja: "ローレンシウム", zh: "铹", cat: "actinide",        mass: 266,     row: 10, col: 18, en: 1.3, mp: 1900 },
  { z: 104, sym: "Rf", name: "Rutherfordium", ko: "러더포듐", ja: "ラザホージウム", zh: "𬬻", cat: "transition",  mass: 267,     row: 7, col: 4 },
  { z: 105, sym: "Db", name: "Dubnium",    ko: "두브늄",   ja: "ドブニウム",   zh: "𬭊",   cat: "transition",      mass: 268,     row: 7, col: 5 },
  { z: 106, sym: "Sg", name: "Seaborgium", ko: "시보귬",   ja: "シーボーギウム", zh: "𬭳", cat: "transition",      mass: 269,     row: 7, col: 6 },
  { z: 107, sym: "Bh", name: "Bohrium",    ko: "보륨",     ja: "ボーリウム",   zh: "𬭛",   cat: "transition",      mass: 270,     row: 7, col: 7 },
  { z: 108, sym: "Hs", name: "Hassium",    ko: "하슘",     ja: "ハッシウム",   zh: "𬛏",   cat: "transition",      mass: 269,     row: 7, col: 8 },
  { z: 109, sym: "Mt", name: "Meitnerium", ko: "마이트너륨", ja: "マイトネリウム", zh: "鿏", cat: "unknown",      mass: 278,     row: 7, col: 9 },
  { z: 110, sym: "Ds", name: "Darmstadtium", ko: "다름슈타튬", ja: "ダームスタチウム", zh: "𫟼", cat: "unknown",  mass: 281,     row: 7, col: 10 },
  { z: 111, sym: "Rg", name: "Roentgenium", ko: "뢴트게늄", ja: "レントゲニウム", zh: "𬬭", cat: "unknown",       mass: 282,     row: 7, col: 11 },
  { z: 112, sym: "Cn", name: "Copernicium", ko: "코페르니슘", ja: "コペルニシウム", zh: "鎶", cat: "transition",   mass: 285,     row: 7, col: 12 },
  { z: 113, sym: "Nh", name: "Nihonium",   ko: "니호늄",   ja: "ニホニウム",   zh: "鉨",   cat: "unknown",         mass: 286,     row: 7, col: 13 },
  { z: 114, sym: "Fl", name: "Flerovium",  ko: "플레로븀", ja: "フレロビウム", zh: "𫓧",   cat: "unknown",         mass: 289,     row: 7, col: 14 },
  { z: 115, sym: "Mc", name: "Moscovium",  ko: "모스코븀", ja: "モスコビウム", zh: "镆",   cat: "unknown",         mass: 290,     row: 7, col: 15 },
  { z: 116, sym: "Lv", name: "Livermorium", ko: "리버모륨", ja: "リバモリウム", zh: "𫟷",  cat: "unknown",         mass: 293,     row: 7, col: 16 },
  { z: 117, sym: "Ts", name: "Tennessine", ko: "테네신",   ja: "テネシン",     zh: "鿬",   cat: "unknown",         mass: 294,     row: 7, col: 17 },
  { z: 118, sym: "Og", name: "Oganesson",  ko: "오가네손", ja: "オガネソン",   zh: "鿫",   cat: "unknown",         mass: 294,     row: 7, col: 18 },
];
