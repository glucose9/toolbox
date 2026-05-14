export type Category = "단어" | "외래어" | "어미" | "띄어쓰기" | "부사";

export type Rule = {
  pattern: string;
  fix: string;
  reason: string;
  category: Category;
  caution?: boolean;
};

export type Issue = {
  start: number;
  end: number;
  original: string;
  fix: string;
  reason: string;
  category: Category;
  caution?: boolean;
};

export const RULES: Rule[] = [
  // ===== 자주 틀리는 단어 =====
  { pattern: "역활", fix: "역할", reason: "한자어 '役割'. 표준 표기는 '역할'.", category: "단어" },
  { pattern: "댓가", fix: "대가", reason: "한자어 '對價'. 사이시옷 없이 '대가'.", category: "단어" },
  { pattern: "구지", fix: "굳이", reason: "부사 '굳이' (구태여)의 옳은 표기.", category: "단어" },
  { pattern: "오랫만", fix: "오랜만", reason: "'오래간만'의 준말은 '오랜만'.", category: "단어" },
  { pattern: "오랫동안", fix: "오랫동안", reason: "이건 옳은 표기 (사이시옷 적용).", category: "단어" },
  { pattern: "어떻해", fix: "어떡해", reason: "'어떻게 해'의 줄임은 '어떡해'.", category: "단어" },
  { pattern: "어떻해서", fix: "어떡해서", reason: "'어떡해서'가 옳은 표기.", category: "단어" },
  { pattern: "할께", fix: "할게", reason: "어미 '-(으)ㄹ게'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "할께요", fix: "할게요", reason: "어미 '-(으)ㄹ게요'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "갈께", fix: "갈게", reason: "어미 '-(으)ㄹ게'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "갈께요", fix: "갈게요", reason: "어미 '-(으)ㄹ게요'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "먹을께", fix: "먹을게", reason: "어미 '-(으)ㄹ게'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "먹을께요", fix: "먹을게요", reason: "어미 '-(으)ㄹ게요'는 된소리로 적지 않음.", category: "어미" },
  { pattern: "갯수", fix: "개수", reason: "한자어 '個數'. 한자어 합성에서 사이시옷 없음.", category: "단어" },
  { pattern: "촛점", fix: "초점", reason: "한자어 '焦點'. 한자어 합성에서 사이시옷 없음.", category: "단어" },
  { pattern: "댓댓이", fix: "떳떳이", reason: "부사 '떳떳이'의 옳은 표기.", category: "단어" },
  { pattern: "도데체", fix: "도대체", reason: "한자어 '都大體'. '도대체'가 옳은 표기.", category: "단어" },
  { pattern: "도저이", fix: "도저히", reason: "부사 '도저히'의 옳은 표기.", category: "부사" },
  { pattern: "몇일", fix: "며칠", reason: "기간을 묻는 의문은 '며칠'.", category: "단어" },
  { pattern: "설겆이", fix: "설거지", reason: "표준 표기는 '설거지'.", category: "단어" },
  { pattern: "떡복이", fix: "떡볶이", reason: "동사 '볶다'에서 온 명사라 '볶이'.", category: "단어" },
  { pattern: "떡볶기", fix: "떡볶이", reason: "동사 '볶다'에서 온 명사라 '볶이'.", category: "단어" },
  { pattern: "곱배기", fix: "곱빼기", reason: "표준 표기는 '곱빼기'.", category: "단어" },
  { pattern: "김치찌게", fix: "김치찌개", reason: "표준 표기는 '찌개'.", category: "단어" },
  { pattern: "된장찌게", fix: "된장찌개", reason: "표준 표기는 '찌개'.", category: "단어" },
  { pattern: "찌게", fix: "찌개", reason: "표준 표기는 '찌개'.", category: "단어" },
  { pattern: "배게", fix: "베개", reason: "동사 '베다'에서 온 명사라 '베개'.", category: "단어" },
  { pattern: "베게", fix: "베개", reason: "표준 표기는 '베개'.", category: "단어" },
  { pattern: "마음것", fix: "마음껏", reason: "접사 '-껏'을 붙여 '마음껏'.", category: "단어" },
  { pattern: "힘것", fix: "힘껏", reason: "접사 '-껏'을 붙여 '힘껏'.", category: "단어" },
  { pattern: "정성것", fix: "정성껏", reason: "접사 '-껏'을 붙여 '정성껏'.", category: "단어" },
  { pattern: "어쩌피", fix: "어차피", reason: "한자어 '於此彼'. '어차피'가 옳은 표기.", category: "단어" },
  { pattern: "가르키다", fix: "가리키다/가르치다", reason: "방향은 '가리키다', 교육은 '가르치다'. 문맥 확인 필요.", category: "단어", caution: true },
  { pattern: "쩜", fix: "점", reason: "구어 '쩜'은 '점'으로 적음.", category: "단어" },
  { pattern: "쫌", fix: "좀", reason: "구어 '쫌'은 '좀'으로 적음.", category: "단어" },
  { pattern: "예기", fix: "얘기", reason: "구어 '얘기'(이야기의 준말)의 옳은 표기.", category: "단어", caution: true },
  { pattern: "짜집기", fix: "짜깁기", reason: "표준 표기는 '짜깁기'.", category: "단어" },
  { pattern: "삯월세", fix: "사글세", reason: "표준 표기는 '사글세'.", category: "단어" },

  // ===== 부사 -이/-히 =====
  { pattern: "깊숙히", fix: "깊숙이", reason: "어근 끝이 '-ㄱ/ㄱㄱ' 등이면 '-이'.", category: "부사" },
  { pattern: "곰곰히", fix: "곰곰이", reason: "어근 끝이 'ㅁ/ㅂ' 등이면 '-이'.", category: "부사" },
  { pattern: "일일히", fix: "일일이", reason: "첩어성 어근이면 '-이'.", category: "부사" },
  { pattern: "가까히", fix: "가까이", reason: "어근 끝이 'ㄱ'이면 '-이'.", category: "부사" },
  { pattern: "깨끗히", fix: "깨끗이", reason: "어근 끝이 'ㅅ'이면 '-이'.", category: "부사" },
  { pattern: "솔직이", fix: "솔직히", reason: "한자어 어근에 '-히'.", category: "부사" },
  { pattern: "지긋히", fix: "지긋이", reason: "어근 끝이 'ㅅ'이면 '-이'.", category: "부사" },
  { pattern: "꼼꼼이", fix: "꼼꼼히", reason: "첩어성 한자어 어근에 '-히'.", category: "부사" },
  { pattern: "조용이", fix: "조용히", reason: "한자어 어근에 '-히'.", category: "부사" },
  { pattern: "당당이", fix: "당당히", reason: "한자어 어근에 '-히'.", category: "부사" },
  { pattern: "열심이", fix: "열심히", reason: "한자어 '열심'에 '-히'.", category: "부사" },
  { pattern: "단단이", fix: "단단히", reason: "한자어 어근에 '-히'.", category: "부사" },
  { pattern: "엄격이", fix: "엄격히", reason: "한자어 '엄격'에 '-히'.", category: "부사" },
  { pattern: "분명이", fix: "분명히", reason: "한자어 '분명'에 '-히'.", category: "부사" },
  { pattern: "확실이", fix: "확실히", reason: "한자어 '확실'에 '-히'.", category: "부사" },
  { pattern: "자세이", fix: "자세히", reason: "한자어 '자세'에 '-히'.", category: "부사" },

  // ===== 왠/웬 =====
  { pattern: "웬지", fix: "왠지", reason: "'왜인지'의 준말은 '왠지'.", category: "단어" },
  { pattern: "왠일", fix: "웬일", reason: "관형사 '웬'+명사 '일' = '웬일'.", category: "단어" },
  { pattern: "왠떡", fix: "웬 떡", reason: "'어떤 떡'의 뜻은 관형사 '웬'.", category: "단어" },
  { pattern: "왠만하면", fix: "웬만하면", reason: "관형사 '웬만하다'에서 온 '웬만하면'.", category: "단어" },
  { pattern: "왠만큼", fix: "웬만큼", reason: "관형사 '웬만하다'에서 온 '웬만큼'.", category: "단어" },
  { pattern: "왠만한", fix: "웬만한", reason: "관형사 '웬만하다'에서 온 '웬만한'.", category: "단어" },

  // ===== 되/돼 =====
  { pattern: "됬다", fix: "됐다", reason: "'되었다'의 준말은 '됐다'.", category: "어미" },
  { pattern: "됬어", fix: "됐어", reason: "'되었어'의 준말은 '됐어'.", category: "어미" },
  { pattern: "됬어요", fix: "됐어요", reason: "'되었어요'의 준말은 '됐어요'.", category: "어미" },
  { pattern: "됬는데", fix: "됐는데", reason: "'되었는데'의 준말은 '됐는데'.", category: "어미" },
  { pattern: "됬으면", fix: "됐으면", reason: "'되었으면'의 준말은 '됐으면'.", category: "어미" },
  { pattern: "안됬", fix: "안 됐", reason: "'안 되었'의 준말은 '안 됐'.", category: "어미" },
  { pattern: "되요", fix: "돼요", reason: "'되어요'의 준말은 '돼요'.", category: "어미" },
  { pattern: "안되요", fix: "안 돼요", reason: "'안 되어요'의 준말은 '안 돼요'.", category: "어미" },
  { pattern: "안되.", fix: "안 돼.", reason: "'안 되어'의 준말은 '안 돼'.", category: "띄어쓰기" },
  { pattern: "안돼요", fix: "안 돼요", reason: "부정 '안' 뒤에 띄어쓰기.", category: "띄어쓰기" },
  { pattern: "안돼서", fix: "안 돼서", reason: "부정 '안' 뒤에 띄어쓰기.", category: "띄어쓰기" },
  { pattern: "안돼는데", fix: "안 되는데", reason: "'안 되다'의 활용은 '안 되는데'.", category: "어미" },

  // ===== 옛 표기 ~읍니다 → ~습니다 =====
  { pattern: "했읍니다", fix: "했습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },
  { pattern: "갔읍니다", fix: "갔습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },
  { pattern: "있읍니다", fix: "있습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },
  { pattern: "없읍니다", fix: "없습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },
  { pattern: "먹었읍니다", fix: "먹었습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },
  { pattern: "왔읍니다", fix: "왔습니다", reason: "1988년 맞춤법 개정 후 '-습니다'.", category: "어미" },

  // ===== 외래어 =====
  { pattern: "메세지", fix: "메시지", reason: "외래어 표기법: message → 메시지.", category: "외래어" },
  { pattern: "텔레비젼", fix: "텔레비전", reason: "외래어 표기법: television → 텔레비전.", category: "외래어" },
  { pattern: "비전", fix: "비전", reason: "외래어 표기법: vision → 비전 (correct).", category: "외래어" },
  { pattern: "리모콘", fix: "리모컨", reason: "외래어 표기법: remote control → 리모컨.", category: "외래어" },
  { pattern: "에어콘", fix: "에어컨", reason: "외래어 표기법: air conditioner → 에어컨.", category: "외래어" },
  { pattern: "알콜", fix: "알코올", reason: "외래어 표기법: alcohol → 알코올.", category: "외래어" },
  { pattern: "초콜렛", fix: "초콜릿", reason: "외래어 표기법: chocolate → 초콜릿.", category: "외래어" },
  { pattern: "초콜렛", fix: "초콜릿", reason: "외래어 표기법: chocolate → 초콜릿.", category: "외래어" },
  { pattern: "케익", fix: "케이크", reason: "외래어 표기법: cake → 케이크.", category: "외래어" },
  { pattern: "케잌", fix: "케이크", reason: "외래어 표기법: cake → 케이크.", category: "외래어" },
  { pattern: "도너츠", fix: "도넛", reason: "외래어 표기법: donut → 도넛.", category: "외래어" },
  { pattern: "도나스", fix: "도넛", reason: "외래어 표기법: donut → 도넛.", category: "외래어" },
  { pattern: "쥬스", fix: "주스", reason: "외래어 표기법: juice → 주스.", category: "외래어" },
  { pattern: "비스켓", fix: "비스킷", reason: "외래어 표기법: biscuit → 비스킷.", category: "외래어" },
  { pattern: "카페트", fix: "카펫", reason: "외래어 표기법: carpet → 카펫.", category: "외래어" },
  { pattern: "콘테이너", fix: "컨테이너", reason: "외래어 표기법: container → 컨테이너.", category: "외래어" },
  { pattern: "콘트롤", fix: "컨트롤", reason: "외래어 표기법: control → 컨트롤.", category: "외래어" },
  { pattern: "컨셉", fix: "콘셉트", reason: "외래어 표기법: concept → 콘셉트.", category: "외래어" },
  { pattern: "컨셉트", fix: "콘셉트", reason: "외래어 표기법: concept → 콘셉트.", category: "외래어" },
  { pattern: "악세사리", fix: "액세서리", reason: "외래어 표기법: accessory → 액세서리.", category: "외래어" },
  { pattern: "악세서리", fix: "액세서리", reason: "외래어 표기법: accessory → 액세서리.", category: "외래어" },
  { pattern: "악세사리", fix: "액세서리", reason: "외래어 표기법: accessory → 액세서리.", category: "외래어" },
  { pattern: "가디건", fix: "카디건", reason: "외래어 표기법: cardigan → 카디건.", category: "외래어" },
  { pattern: "메뉴얼", fix: "매뉴얼", reason: "외래어 표기법: manual → 매뉴얼.", category: "외래어" },
  { pattern: "부페", fix: "뷔페", reason: "외래어 표기법: buffet → 뷔페.", category: "외래어" },
  { pattern: "후라이", fix: "프라이", reason: "외래어 표기법: fry → 프라이.", category: "외래어" },
  { pattern: "후라이팬", fix: "프라이팬", reason: "외래어 표기법: frypan → 프라이팬.", category: "외래어" },
  { pattern: "후라이드", fix: "프라이드", reason: "외래어 표기법: fried → 프라이드.", category: "외래어" },
  { pattern: "카운셀링", fix: "카운슬링", reason: "외래어 표기법: counseling → 카운슬링.", category: "외래어" },
  { pattern: "악셀", fix: "엑셀", reason: "외래어 표기법: accel → 엑셀.", category: "외래어" },
  { pattern: "엑셀러레이터", fix: "액셀러레이터", reason: "외래어 표기법: accelerator → 액셀러레이터.", category: "외래어" },
  { pattern: "쇼파", fix: "소파", reason: "외래어 표기법: sofa → 소파.", category: "외래어" },
  { pattern: "쏘세지", fix: "소시지", reason: "외래어 표기법: sausage → 소시지.", category: "외래어" },
  { pattern: "소세지", fix: "소시지", reason: "외래어 표기법: sausage → 소시지.", category: "외래어" },
  { pattern: "헬리콥타", fix: "헬리콥터", reason: "외래어 표기법: helicopter → 헬리콥터.", category: "외래어" },
  { pattern: "써비스", fix: "서비스", reason: "외래어 표기법: service → 서비스.", category: "외래어" },
  { pattern: "씨디", fix: "시디", reason: "외래어 표기법: CD → 시디.", category: "외래어", caution: true },
  { pattern: "씽크대", fix: "싱크대", reason: "외래어 표기법: sink → 싱크.", category: "외래어" },
  { pattern: "랍스타", fix: "랍스터", reason: "외래어 표기법: lobster → 랍스터.", category: "외래어" },

  // ===== 띄어쓰기 자주 틀리는 것 =====
  { pattern: "안그래도", fix: "안 그래도", reason: "부정 부사 '안'은 띄어 씀.", category: "띄어쓰기" },
  { pattern: "안한다", fix: "안 한다", reason: "부정 부사 '안'은 띄어 씀.", category: "띄어쓰기" },
  { pattern: "할수있", fix: "할 수 있", reason: "의존명사 '수'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "할수없", fix: "할 수 없", reason: "의존명사 '수'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "갈수있", fix: "갈 수 있", reason: "의존명사 '수'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "갈수없", fix: "갈 수 없", reason: "의존명사 '수'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "그럴수있", fix: "그럴 수 있", reason: "의존명사 '수'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "할것", fix: "할 것", reason: "의존명사 '것'은 띄어 씀.", category: "띄어쓰기" },
  { pattern: "할거야", fix: "할 거야", reason: "의존명사 '거'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "갈거야", fix: "갈 거야", reason: "의존명사 '거'는 띄어 씀.", category: "띄어쓰기" },
  { pattern: "할꺼야", fix: "할 거야", reason: "어미 '-(으)ㄹ'+의존명사 '거': 된소리 X, 띄어쓰기.", category: "띄어쓰기" },
  { pattern: "갈꺼야", fix: "갈 거야", reason: "어미 '-(으)ㄹ'+의존명사 '거': 된소리 X, 띄어쓰기.", category: "띄어쓰기" },
  { pattern: "할만하", fix: "할 만하", reason: "보조형용사 '만하다'는 띄어 씀.", category: "띄어쓰기" },
];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function checkSpelling(text: string): Issue[] {
  const issues: Issue[] = [];
  for (const rule of RULES) {
    const re = new RegExp(escapeRegex(rule.pattern), "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      issues.push({
        start: m.index,
        end: m.index + m[0].length,
        original: m[0],
        fix: rule.fix,
        reason: rule.reason,
        category: rule.category,
        caution: rule.caution,
      });
      if (m.index === re.lastIndex) re.lastIndex++;
    }
  }
  issues.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const deduped: Issue[] = [];
  let lastEnd = -1;
  for (const issue of issues) {
    if (issue.start >= lastEnd) {
      deduped.push(issue);
      lastEnd = issue.end;
    }
  }
  return deduped;
}

export function applyFixes(text: string, issues: Issue[]): string {
  if (issues.length === 0) return text;
  const sorted = [...issues].sort((a, b) => b.start - a.start);
  let out = text;
  for (const i of sorted) {
    out = out.slice(0, i.start) + i.fix + out.slice(i.end);
  }
  return out;
}

export function getContext(text: string, issue: Issue, radius = 12): { before: string; after: string } {
  const before = text.slice(Math.max(0, issue.start - radius), issue.start);
  const after = text.slice(issue.end, Math.min(text.length, issue.end + radius));
  return { before, after };
}
