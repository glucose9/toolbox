"use client";
import { useMemo, useState } from "react";

const EMOJIS: { emoji: string; keywords: string[] }[] = [
  { emoji: "😀", keywords: ["smile", "happy", "웃음", "행복"] },
  { emoji: "😂", keywords: ["laugh", "tears", "웃음", "ㅋㅋ"] },
  { emoji: "🥰", keywords: ["love", "사랑"] },
  { emoji: "😎", keywords: ["cool", "선글라스"] },
  { emoji: "😭", keywords: ["cry", "울음", "ㅠㅠ"] },
  { emoji: "😡", keywords: ["angry", "화남"] },
  { emoji: "🤔", keywords: ["think", "생각", "고민"] },
  { emoji: "👍", keywords: ["thumbs up", "좋아요", "good"] },
  { emoji: "👎", keywords: ["thumbs down", "싫어요", "bad"] },
  { emoji: "👏", keywords: ["clap", "박수"] },
  { emoji: "🙏", keywords: ["pray", "기도", "감사"] },
  { emoji: "❤️", keywords: ["heart", "love", "하트", "사랑"] },
  { emoji: "💔", keywords: ["broken heart", "이별"] },
  { emoji: "🔥", keywords: ["fire", "hot", "불"] },
  { emoji: "⭐", keywords: ["star", "별"] },
  { emoji: "✨", keywords: ["sparkles", "반짝"] },
  { emoji: "🎉", keywords: ["party", "celebration", "축하"] },
  { emoji: "🎊", keywords: ["confetti", "축하"] },
  { emoji: "🎁", keywords: ["gift", "선물"] },
  { emoji: "💰", keywords: ["money", "돈"] },
  { emoji: "💸", keywords: ["money flying", "돈"] },
  { emoji: "🏆", keywords: ["trophy", "우승", "trophy"] },
  { emoji: "🎂", keywords: ["cake", "birthday", "생일"] },
  { emoji: "🍕", keywords: ["pizza", "피자"] },
  { emoji: "🍔", keywords: ["burger", "햄버거"] },
  { emoji: "🍣", keywords: ["sushi", "초밥"] },
  { emoji: "🍱", keywords: ["bento", "도시락"] },
  { emoji: "🍙", keywords: ["rice ball", "주먹밥"] },
  { emoji: "🍜", keywords: ["ramen", "라면"] },
  { emoji: "🍺", keywords: ["beer", "맥주"] },
  { emoji: "🍷", keywords: ["wine", "와인"] },
  { emoji: "☕", keywords: ["coffee", "커피"] },
  { emoji: "🐶", keywords: ["dog", "강아지"] },
  { emoji: "🐱", keywords: ["cat", "고양이"] },
  { emoji: "🦁", keywords: ["lion", "사자"] },
  { emoji: "🐰", keywords: ["rabbit", "토끼"] },
  { emoji: "🐻", keywords: ["bear", "곰"] },
  { emoji: "🐯", keywords: ["tiger", "호랑이"] },
  { emoji: "💻", keywords: ["laptop", "노트북"] },
  { emoji: "📱", keywords: ["phone", "휴대폰"] },
  { emoji: "📷", keywords: ["camera", "카메라"] },
  { emoji: "🎮", keywords: ["game", "게임"] },
  { emoji: "🎵", keywords: ["music", "음악"] },
  { emoji: "🎬", keywords: ["movie", "영화"] },
  { emoji: "📚", keywords: ["books", "책"] },
  { emoji: "✏️", keywords: ["pencil", "연필"] },
  { emoji: "✅", keywords: ["check", "체크"] },
  { emoji: "❌", keywords: ["x", "엑스", "취소"] },
  { emoji: "⚠️", keywords: ["warning", "경고"] },
  { emoji: "🚀", keywords: ["rocket", "로켓"] },
  { emoji: "🌟", keywords: ["glowing star", "별"] },
];

export default function EmojiSearchTool() {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return EMOJIS;
    return EMOJIS.filter((e) => e.keywords.some((k) => k.toLowerCase().includes(query)));
  }, [q]);
  const copy = async (e: string) => { await navigator.clipboard.writeText(e); setCopied(e); setTimeout(() => setCopied(""), 1500); };
  return (
    <div className="card space-y-3">
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="이모지 검색 (예: 사랑, smile, 강아지)" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {filtered.map((e) => (
          <button key={e.emoji} onClick={() => copy(e.emoji)} className="p-2 text-3xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition" title={e.keywords.join(", ")}>
            {copied === e.emoji ? "✓" : e.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
