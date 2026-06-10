"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type Loc = "ko" | "en" | "ja" | "zh";
type Constant = {
  symbol: string;
  value: string; // display value (CODATA 2018)
  unit: string;
  names: Record<Loc, string>;
  group: "universal" | "em" | "atomic" | "physchem" | "other";
};

const CONSTANTS: Constant[] = [
  { symbol: "c", value: "2.99792458 × 10⁸", unit: "m/s", group: "universal", names: { ko: "진공에서의 빛의 속력", en: "Speed of light in vacuum", ja: "真空中の光速", zh: "真空中光速" } },
  { symbol: "G", value: "6.67430 × 10⁻¹¹", unit: "N·m²/kg²", group: "universal", names: { ko: "만유인력 상수", en: "Gravitational constant", ja: "万有引力定数", zh: "万有引力常数" } },
  { symbol: "h", value: "6.62607015 × 10⁻³⁴", unit: "J·s", group: "universal", names: { ko: "플랑크 상수", en: "Planck constant", ja: "プランク定数", zh: "普朗克常数" } },
  { symbol: "ħ", value: "1.054571817 × 10⁻³⁴", unit: "J·s", group: "universal", names: { ko: "디랙 상수 (ℏ = h/2π)", en: "Reduced Planck constant", ja: "ディラック定数", zh: "约化普朗克常数" } },
  { symbol: "g", value: "9.80665", unit: "m/s²", group: "universal", names: { ko: "표준 중력 가속도", en: "Standard gravity", ja: "標準重力加速度", zh: "标准重力加速度" } },
  { symbol: "e", value: "1.602176634 × 10⁻¹⁹", unit: "C", group: "em", names: { ko: "기본 전하", en: "Elementary charge", ja: "電気素量", zh: "基本电荷" } },
  { symbol: "ε₀", value: "8.8541878128 × 10⁻¹²", unit: "F/m", group: "em", names: { ko: "진공 유전율", en: "Vacuum permittivity", ja: "真空の誘電率", zh: "真空介电常数" } },
  { symbol: "μ₀", value: "1.25663706212 × 10⁻⁶", unit: "N/A²", group: "em", names: { ko: "진공 투자율", en: "Vacuum permeability", ja: "真空の透磁率", zh: "真空磁导率" } },
  { symbol: "k (1/4πε₀)", value: "8.9875517923 × 10⁹", unit: "N·m²/C²", group: "em", names: { ko: "쿨롱 상수", en: "Coulomb constant", ja: "クーロン定数", zh: "库仑常数" } },
  { symbol: "mₑ", value: "9.1093837015 × 10⁻³¹", unit: "kg", group: "atomic", names: { ko: "전자 질량", en: "Electron mass", ja: "電子の質量", zh: "电子质量" } },
  { symbol: "mₚ", value: "1.67262192369 × 10⁻²⁷", unit: "kg", group: "atomic", names: { ko: "양성자 질량", en: "Proton mass", ja: "陽子の質量", zh: "质子质量" } },
  { symbol: "mₙ", value: "1.67492749804 × 10⁻²⁷", unit: "kg", group: "atomic", names: { ko: "중성자 질량", en: "Neutron mass", ja: "中性子の質量", zh: "中子质量" } },
  { symbol: "u", value: "1.66053906660 × 10⁻²⁷", unit: "kg", group: "atomic", names: { ko: "원자 질량 단위", en: "Atomic mass unit", ja: "原子質量単位", zh: "原子质量单位" } },
  { symbol: "a₀", value: "5.29177210903 × 10⁻¹¹", unit: "m", group: "atomic", names: { ko: "보어 반지름", en: "Bohr radius", ja: "ボーア半径", zh: "玻尔半径" } },
  { symbol: "R∞", value: "1.0973731568160 × 10⁷", unit: "m⁻¹", group: "atomic", names: { ko: "뤼드베리 상수", en: "Rydberg constant", ja: "リュードベリ定数", zh: "里德伯常数" } },
  { symbol: "eV", value: "1.602176634 × 10⁻¹⁹", unit: "J", group: "atomic", names: { ko: "전자볼트", en: "Electron volt", ja: "電子ボルト", zh: "电子伏特" } },
  { symbol: "N_A", value: "6.02214076 × 10²³", unit: "mol⁻¹", group: "physchem", names: { ko: "아보가드로 수", en: "Avogadro constant", ja: "アボガドロ定数", zh: "阿伏伽德罗常数" } },
  { symbol: "k_B", value: "1.380649 × 10⁻²³", unit: "J/K", group: "physchem", names: { ko: "볼츠만 상수", en: "Boltzmann constant", ja: "ボルツマン定数", zh: "玻尔兹曼常数" } },
  { symbol: "R", value: "8.314462618", unit: "J/(mol·K)", group: "physchem", names: { ko: "기체 상수", en: "Gas constant", ja: "気体定数", zh: "气体常数" } },
  { symbol: "σ", value: "5.670374419 × 10⁻⁸", unit: "W/(m²·K⁴)", group: "physchem", names: { ko: "슈테판-볼츠만 상수", en: "Stefan–Boltzmann constant", ja: "シュテファン＝ボルツマン定数", zh: "斯特藩-玻尔兹曼常数" } },
  { symbol: "F", value: "9.648533212 × 10⁴", unit: "C/mol", group: "physchem", names: { ko: "패러데이 상수", en: "Faraday constant", ja: "ファラデー定数", zh: "法拉第常数" } },
  { symbol: "Vₘ", value: "22.41396954", unit: "L/mol (0°C, 1 atm)", group: "physchem", names: { ko: "이상기체 몰부피 (표준상태)", en: "Molar volume of ideal gas (STP)", ja: "理想気体のモル体積（標準状態）", zh: "理想气体摩尔体积（标准状况）" } },
  { symbol: "atm", value: "101325", unit: "Pa", group: "other", names: { ko: "표준 대기압", en: "Standard atmosphere", ja: "標準大気圧", zh: "标准大气压" } },
  { symbol: "T₀", value: "273.15", unit: "K (= 0 °C)", group: "other", names: { ko: "섭씨 0도의 절대온도", en: "Celsius zero in kelvin", ja: "セ氏0度の絶対温度", zh: "摄氏零度的热力学温度" } },
  { symbol: "v_s", value: "343", unit: "m/s (20 °C)", group: "other", names: { ko: "공기 중 소리의 속력 (20°C)", en: "Speed of sound in air (20 °C)", ja: "空気中の音速（20°C）", zh: "空气中声速（20 °C）" } },
];

export default function PhysicsConstantsTool() {
  const t = useTranslations("toolUI.physics-constants");
  const locale = (useLocale() as Loc) || "ko";
  const loc: Loc = ["ko", "en", "ja", "zh"].includes(locale) ? locale : "ko";
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return CONSTANTS;
    return CONSTANTS.filter(
      (c) =>
        c.symbol.toLowerCase().includes(needle) ||
        c.names[loc].toLowerCase().includes(needle) ||
        c.names.en.toLowerCase().includes(needle) ||
        c.unit.toLowerCase().includes(needle)
    );
  }, [q, loc]);

  const copy = async (c: Constant) => {
    // Copy the plain numeric form (× 10ⁿ → e-notation) for pasting into calculators.
    const plain = c.value
      .replace(/\s*×\s*10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/, (_, sup: string) => {
        const map: Record<string, string> = { "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
        return "e" + sup.split("").map((ch) => map[ch] ?? ch).join("");
      })
      .replace(/\s/g, "");
    await navigator.clipboard.writeText(plain);
    setCopied(c.symbol);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="card space-y-3">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs text-muted border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-3">{t("colSymbol")}</th>
              <th className="py-2 pr-3">{t("colName")}</th>
              <th className="py-2 pr-3 text-right">{t("colValue")}</th>
              <th className="py-2 pr-3">{t("colUnit")}</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.symbol} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-1.5 pr-3 font-mono font-semibold whitespace-nowrap">{c.symbol}</td>
                <td className="py-1.5 pr-3">{c.names[loc]}</td>
                <td className="py-1.5 pr-3 font-mono text-right whitespace-nowrap">{c.value}</td>
                <td className="py-1.5 pr-3 font-mono text-muted whitespace-nowrap">{c.unit}</td>
                <td className="py-1.5 text-right">
                  <button onClick={() => copy(c)} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                    {copied === c.symbol ? "✓" : t("copy")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <div className="py-6 text-center text-sm text-muted">{t("noResults")}</div>}
      </div>

      <div className="text-xs text-muted">{t("sourceNote")}</div>
    </div>
  );
}
