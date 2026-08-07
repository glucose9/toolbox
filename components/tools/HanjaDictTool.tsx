"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { copyText } from "@/lib/clipboard";

// Common Korean hanja with sound + meaning + stroke count
// Source: 한국어문회 한자능력검정시험 + 기초 한자 1800자 중 자주 쓰는 ~250자
const HANJA_DATA: { hanja: string; sound: string; meaning: string; strokes: number; level: string }[] = [
  // 8급
  { hanja: "一", sound: "일", meaning: "하나", strokes: 1, level: "8급" },
  { hanja: "二", sound: "이", meaning: "둘", strokes: 2, level: "8급" },
  { hanja: "三", sound: "삼", meaning: "셋", strokes: 3, level: "8급" },
  { hanja: "四", sound: "사", meaning: "넷", strokes: 5, level: "8급" },
  { hanja: "五", sound: "오", meaning: "다섯", strokes: 4, level: "8급" },
  { hanja: "六", sound: "육/륙", meaning: "여섯", strokes: 4, level: "8급" },
  { hanja: "七", sound: "칠", meaning: "일곱", strokes: 2, level: "8급" },
  { hanja: "八", sound: "팔", meaning: "여덟", strokes: 2, level: "8급" },
  { hanja: "九", sound: "구", meaning: "아홉", strokes: 2, level: "8급" },
  { hanja: "十", sound: "십", meaning: "열", strokes: 2, level: "8급" },
  { hanja: "人", sound: "인", meaning: "사람", strokes: 2, level: "8급" },
  { hanja: "山", sound: "산", meaning: "메/산", strokes: 3, level: "8급" },
  { hanja: "水", sound: "수", meaning: "물", strokes: 4, level: "8급" },
  { hanja: "火", sound: "화", meaning: "불", strokes: 4, level: "8급" },
  { hanja: "木", sound: "목", meaning: "나무", strokes: 4, level: "8급" },
  { hanja: "金", sound: "금/김", meaning: "쇠/성씨", strokes: 8, level: "8급" },
  { hanja: "土", sound: "토", meaning: "흙", strokes: 3, level: "8급" },
  { hanja: "日", sound: "일", meaning: "날/해", strokes: 4, level: "8급" },
  { hanja: "月", sound: "월", meaning: "달", strokes: 4, level: "8급" },
  { hanja: "年", sound: "년/연", meaning: "해", strokes: 6, level: "8급" },
  { hanja: "父", sound: "부", meaning: "아비", strokes: 4, level: "8급" },
  { hanja: "母", sound: "모", meaning: "어미", strokes: 5, level: "8급" },
  { hanja: "兄", sound: "형", meaning: "형/맏", strokes: 5, level: "8급" },
  { hanja: "弟", sound: "제", meaning: "아우", strokes: 7, level: "8급" },
  { hanja: "大", sound: "대", meaning: "큰", strokes: 3, level: "8급" },
  { hanja: "小", sound: "소", meaning: "작을", strokes: 3, level: "8급" },
  { hanja: "中", sound: "중", meaning: "가운데", strokes: 4, level: "8급" },
  { hanja: "上", sound: "상", meaning: "위", strokes: 3, level: "8급" },
  { hanja: "下", sound: "하", meaning: "아래", strokes: 3, level: "8급" },
  { hanja: "東", sound: "동", meaning: "동녘", strokes: 8, level: "8급" },
  { hanja: "西", sound: "서", meaning: "서녘", strokes: 6, level: "8급" },
  { hanja: "南", sound: "남", meaning: "남녘", strokes: 9, level: "8급" },
  { hanja: "北", sound: "북/배", meaning: "북녘/달아날", strokes: 5, level: "8급" },
  { hanja: "白", sound: "백", meaning: "흰", strokes: 5, level: "8급" },
  { hanja: "靑", sound: "청", meaning: "푸를", strokes: 8, level: "8급" },
  { hanja: "校", sound: "교", meaning: "학교", strokes: 10, level: "8급" },
  { hanja: "敎", sound: "교", meaning: "가르칠", strokes: 11, level: "8급" },
  { hanja: "學", sound: "학", meaning: "배울", strokes: 16, level: "8급" },
  { hanja: "生", sound: "생", meaning: "날", strokes: 5, level: "8급" },
  { hanja: "民", sound: "민", meaning: "백성", strokes: 5, level: "8급" },
  { hanja: "韓", sound: "한", meaning: "한국/나라", strokes: 17, level: "8급" },
  { hanja: "國", sound: "국", meaning: "나라", strokes: 11, level: "8급" },
  { hanja: "軍", sound: "군", meaning: "군사", strokes: 9, level: "8급" },
  { hanja: "王", sound: "왕", meaning: "임금", strokes: 4, level: "8급" },
  { hanja: "長", sound: "장", meaning: "긴/어른", strokes: 8, level: "8급" },
  { hanja: "門", sound: "문", meaning: "문", strokes: 8, level: "8급" },
  { hanja: "萬", sound: "만", meaning: "일만", strokes: 13, level: "8급" },
  { hanja: "外", sound: "외", meaning: "바깥", strokes: 5, level: "8급" },
  { hanja: "女", sound: "녀/여", meaning: "계집/여자", strokes: 3, level: "8급" },
  { hanja: "男", sound: "남", meaning: "사내", strokes: 7, level: "7급" },
  { hanja: "子", sound: "자", meaning: "아들", strokes: 3, level: "7급" },
  { hanja: "家", sound: "가", meaning: "집", strokes: 10, level: "7급" },
  { hanja: "口", sound: "구", meaning: "입", strokes: 3, level: "7급" },
  { hanja: "目", sound: "목", meaning: "눈", strokes: 5, level: "6급" },
  { hanja: "耳", sound: "이", meaning: "귀", strokes: 6, level: "5급" },
  { hanja: "手", sound: "수", meaning: "손", strokes: 4, level: "7급" },
  { hanja: "足", sound: "족", meaning: "발", strokes: 7, level: "7급" },
  { hanja: "心", sound: "심", meaning: "마음", strokes: 4, level: "7급" },
  { hanja: "天", sound: "천", meaning: "하늘", strokes: 4, level: "7급" },
  { hanja: "地", sound: "지", meaning: "땅", strokes: 6, level: "7급" },
  { hanja: "雨", sound: "우", meaning: "비", strokes: 8, level: "5급" },
  { hanja: "雪", sound: "설", meaning: "눈", strokes: 11, level: "6급" },
  { hanja: "風", sound: "풍", meaning: "바람", strokes: 9, level: "6급" },
  { hanja: "電", sound: "전", meaning: "번개/전기", strokes: 13, level: "7급" },
  { hanja: "光", sound: "광", meaning: "빛", strokes: 6, level: "6급" },
  { hanja: "色", sound: "색", meaning: "빛/색", strokes: 6, level: "7급" },
  { hanja: "音", sound: "음", meaning: "소리", strokes: 9, level: "6급" },
  { hanja: "車", sound: "차/거", meaning: "수레", strokes: 7, level: "7급" },
  { hanja: "道", sound: "도", meaning: "길", strokes: 13, level: "7급" },
  { hanja: "市", sound: "시", meaning: "저자/시장", strokes: 5, level: "7급" },
  { hanja: "村", sound: "촌", meaning: "마을", strokes: 7, level: "7급" },
  { hanja: "邑", sound: "읍", meaning: "고을", strokes: 7, level: "7급" },
  { hanja: "洞", sound: "동/통", meaning: "골/꿰뚫을", strokes: 9, level: "7급" },
  { hanja: "里", sound: "리/이", meaning: "마을", strokes: 7, level: "7급" },
  { hanja: "海", sound: "해", meaning: "바다", strokes: 10, level: "7급" },
  { hanja: "江", sound: "강", meaning: "강", strokes: 6, level: "7급" },
  { hanja: "石", sound: "석", meaning: "돌", strokes: 5, level: "6급" },
  { hanja: "花", sound: "화", meaning: "꽃", strokes: 7, level: "7급" },
  { hanja: "草", sound: "초", meaning: "풀", strokes: 9, level: "7급" },
  { hanja: "竹", sound: "죽", meaning: "대", strokes: 6, level: "4급" },
  { hanja: "魚", sound: "어", meaning: "물고기", strokes: 11, level: "5급" },
  { hanja: "鳥", sound: "조", meaning: "새", strokes: 11, level: "4급" },
  { hanja: "犬", sound: "견", meaning: "개", strokes: 4, level: "4급" },
  { hanja: "牛", sound: "우", meaning: "소", strokes: 4, level: "5급" },
  { hanja: "馬", sound: "마", meaning: "말", strokes: 10, level: "5급" },
  { hanja: "羊", sound: "양", meaning: "양", strokes: 6, level: "4급" },
  { hanja: "鷄", sound: "계", meaning: "닭", strokes: 21, level: "4급" },
  { hanja: "食", sound: "식/사", meaning: "먹을/밥", strokes: 9, level: "7급" },
  { hanja: "飮", sound: "음", meaning: "마실", strokes: 13, level: "6급" },
  { hanja: "衣", sound: "의", meaning: "옷", strokes: 6, level: "6급" },
  { hanja: "住", sound: "주", meaning: "살/거주", strokes: 7, level: "7급" },
  { hanja: "行", sound: "행/항", meaning: "갈/항렬", strokes: 6, level: "6급" },
  { hanja: "言", sound: "언", meaning: "말씀", strokes: 7, level: "6급" },
  { hanja: "語", sound: "어", meaning: "말씀", strokes: 14, level: "7급" },
  { hanja: "文", sound: "문", meaning: "글월", strokes: 4, level: "7급" },
  { hanja: "字", sound: "자", meaning: "글자", strokes: 6, level: "7급" },
  { hanja: "書", sound: "서", meaning: "글/책", strokes: 10, level: "6급" },
  { hanja: "讀", sound: "독/두", meaning: "읽을/구절", strokes: 22, level: "6급" },
  { hanja: "問", sound: "문", meaning: "물을", strokes: 11, level: "7급" },
  { hanja: "答", sound: "답", meaning: "대답", strokes: 12, level: "7급" },
  { hanja: "知", sound: "지", meaning: "알", strokes: 8, level: "5급" },
  { hanja: "識", sound: "식/지", meaning: "알/기록", strokes: 19, level: "5급" },
  { hanja: "思", sound: "사", meaning: "생각", strokes: 9, level: "5급" },
  { hanja: "想", sound: "상", meaning: "생각", strokes: 13, level: "4급" },
  { hanja: "愛", sound: "애", meaning: "사랑", strokes: 13, level: "6급" },
  { hanja: "情", sound: "정", meaning: "뜻/마음", strokes: 11, level: "5급" },
  { hanja: "意", sound: "의", meaning: "뜻", strokes: 13, level: "6급" },
  { hanja: "事", sound: "사", meaning: "일", strokes: 8, level: "7급" },
  { hanja: "業", sound: "업", meaning: "일/업", strokes: 13, level: "6급" },
  { hanja: "工", sound: "공", meaning: "장인/일", strokes: 3, level: "7급" },
  { hanja: "農", sound: "농", meaning: "농사", strokes: 13, level: "7급" },
  { hanja: "商", sound: "상", meaning: "장사", strokes: 11, level: "5급" },
  { hanja: "公", sound: "공", meaning: "공평할", strokes: 4, level: "6급" },
  { hanja: "私", sound: "사", meaning: "사사로울", strokes: 7, level: "4급" },
  { hanja: "新", sound: "신", meaning: "새", strokes: 13, level: "6급" },
  { hanja: "舊", sound: "구", meaning: "옛", strokes: 18, level: "5급" },
  { hanja: "古", sound: "고", meaning: "예/옛", strokes: 5, level: "6급" },
  { hanja: "今", sound: "금", meaning: "이제", strokes: 4, level: "6급" },
  { hanja: "前", sound: "전", meaning: "앞", strokes: 9, level: "7급" },
  { hanja: "後", sound: "후", meaning: "뒤", strokes: 9, level: "7급" },
  { hanja: "左", sound: "좌", meaning: "왼", strokes: 5, level: "7급" },
  { hanja: "右", sound: "우", meaning: "오른", strokes: 5, level: "7급" },
  { hanja: "高", sound: "고", meaning: "높을", strokes: 10, level: "6급" },
  { hanja: "低", sound: "저", meaning: "낮을", strokes: 7, level: "4급" },
  { hanja: "多", sound: "다", meaning: "많을", strokes: 6, level: "6급" },
  { hanja: "少", sound: "소", meaning: "적을", strokes: 4, level: "7급" },
  { hanja: "強", sound: "강", meaning: "강할", strokes: 11, level: "6급" },
  { hanja: "弱", sound: "약", meaning: "약할", strokes: 10, level: "6급" },
  { hanja: "正", sound: "정", meaning: "바를", strokes: 5, level: "7급" },
  { hanja: "反", sound: "반", meaning: "돌이킬", strokes: 4, level: "6급" },
  { hanja: "同", sound: "동", meaning: "한가지/같을", strokes: 6, level: "7급" },
  { hanja: "異", sound: "이", meaning: "다를", strokes: 11, level: "4급" },
  { hanja: "黑", sound: "흑", meaning: "검을", strokes: 12, level: "5급" },
  { hanja: "紅", sound: "홍", meaning: "붉을", strokes: 9, level: "4급" },
  { hanja: "黃", sound: "황", meaning: "누를", strokes: 12, level: "6급" },
  { hanja: "綠", sound: "녹/록", meaning: "푸를", strokes: 14, level: "6급" },
  { hanja: "藍", sound: "람", meaning: "쪽", strokes: 18, level: "2급" },
  { hanja: "美", sound: "미", meaning: "아름다울", strokes: 9, level: "6급" },
  { hanja: "麗", sound: "려/리", meaning: "고울", strokes: 19, level: "4급" },
  { hanja: "善", sound: "선", meaning: "착할", strokes: 12, level: "5급" },
  { hanja: "惡", sound: "악/오", meaning: "악할/미워할", strokes: 12, level: "5급" },
  { hanja: "眞", sound: "진", meaning: "참", strokes: 10, level: "4급" },
  { hanja: "僞", sound: "위", meaning: "거짓", strokes: 14, level: "3급" },
  { hanja: "始", sound: "시", meaning: "비로소", strokes: 8, level: "6급" },
  { hanja: "終", sound: "종", meaning: "마칠", strokes: 11, level: "5급" },
  { hanja: "成", sound: "성", meaning: "이룰", strokes: 7, level: "6급" },
  { hanja: "敗", sound: "패", meaning: "패할", strokes: 11, level: "5급" },
  { hanja: "勝", sound: "승", meaning: "이길", strokes: 12, level: "6급" },
  { hanja: "負", sound: "부", meaning: "질", strokes: 9, level: "4급" },
  { hanja: "戰", sound: "전", meaning: "싸움", strokes: 16, level: "6급" },
  { hanja: "和", sound: "화", meaning: "화할", strokes: 8, level: "6급" },
  { hanja: "平", sound: "평", meaning: "평평할", strokes: 5, level: "7급" },
  { hanja: "安", sound: "안", meaning: "편안할", strokes: 6, level: "7급" },
  { hanja: "全", sound: "전", meaning: "온전할", strokes: 6, level: "7급" },
  { hanja: "重", sound: "중", meaning: "무거울", strokes: 9, level: "6급" },
  { hanja: "輕", sound: "경", meaning: "가벼울", strokes: 14, level: "5급" },
  { hanja: "速", sound: "속", meaning: "빠를", strokes: 11, level: "6급" },
  { hanja: "急", sound: "급", meaning: "급할", strokes: 9, level: "6급" },
  { hanja: "永", sound: "영", meaning: "길/오랠", strokes: 5, level: "6급" },
  { hanja: "遠", sound: "원", meaning: "멀", strokes: 14, level: "6급" },
  { hanja: "近", sound: "근", meaning: "가까울", strokes: 8, level: "6급" },
  { hanja: "明", sound: "명", meaning: "밝을", strokes: 8, level: "6급" },
  { hanja: "暗", sound: "암", meaning: "어두울", strokes: 13, level: "4급" },
  { hanja: "春", sound: "춘", meaning: "봄", strokes: 9, level: "7급" },
  { hanja: "夏", sound: "하", meaning: "여름", strokes: 10, level: "7급" },
  { hanja: "秋", sound: "추", meaning: "가을", strokes: 9, level: "7급" },
  { hanja: "冬", sound: "동", meaning: "겨울", strokes: 5, level: "7급" },
  { hanja: "朝", sound: "조", meaning: "아침", strokes: 12, level: "6급" },
  { hanja: "夕", sound: "석", meaning: "저녁", strokes: 3, level: "7급" },
  { hanja: "晝", sound: "주", meaning: "낮", strokes: 11, level: "6급" },
  { hanja: "夜", sound: "야", meaning: "밤", strokes: 8, level: "6급" },
];

export default function HanjaDictTool() {
  const t = useTranslations("toolUI.hanja-dict");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof HANJA_DATA[0] | null>(HANJA_DATA[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HANJA_DATA;
    return HANJA_DATA.filter(
      (h) =>
        h.hanja.includes(q) ||
        h.sound.toLowerCase().includes(q) ||
        h.meaning.includes(q) ||
        h.level.includes(q)
    );
  }, [query]);

  return (
    <div className="card space-y-3">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
        <div className="text-xs text-muted mt-1">{t("count", { count: filtered.length, total: HANJA_DATA.length })}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 max-h-[28rem] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1">
            {filtered.map((h) => (
              <button
                key={h.hanja + h.sound}
                onClick={() => setSelected(h)}
                className={`aspect-square flex flex-col items-center justify-center rounded border ${selected?.hanja === h.hanja ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                title={`${h.hanja} (${h.sound}, ${h.meaning})`}
              >
                <span className="text-2xl">{h.hanja}</span>
                <span className="text-[0.6rem] text-muted mt-0.5">{h.sound}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="border border-gray-200 dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-950">
            <div className="text-7xl text-center my-2">{selected.hanja}</div>
            <div className="space-y-1 text-sm">
              <div><strong>{t("reading")}:</strong> {selected.sound}</div>
              <div><strong>{t("meaning")}:</strong> {selected.meaning}</div>
              <div><strong>{t("readingMeaning")}:</strong> {selected.meaning} {selected.sound}</div>
              <div><strong>{t("strokes")}:</strong> {t("strokesValue", { count: selected.strokes })}</div>
              <div><strong>{t("grade")}:</strong> {selected.level}</div>
              <div className="pt-2">
                <button
                  onClick={() => void copyText(selected.hanja)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  {t("copyHanja")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("note", { count: HANJA_DATA.length })}
      </div>
    </div>
  );
}
