"use client";

import { useState } from "react";

const ACTIVITY = [
  { label: "거의 활동 없음 (사무직)", mult: 1.2 },
  { label: "가벼운 운동 (주 1~3회)", mult: 1.375 },
  { label: "보통 운동 (주 3~5회)", mult: 1.55 },
  { label: "강한 운동 (주 6~7회)", mult: 1.725 },
  { label: "매우 강한 운동 / 육체노동", mult: 1.9 },
];

export default function BmrTool() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [actIdx, setActIdx] = useState(1);

  // Mifflin-St Jeor
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * ACTIVITY[actIdx].mult;

  return (
    <div className="card space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setGender("male")} className={`btn flex-1 ${gender === "male" ? "btn-primary" : "btn-secondary"}`}>남성</button>
        <button onClick={() => setGender("female")} className={`btn flex-1 ${gender === "female" ? "btn-primary" : "btn-secondary"}`}>여성</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="label">나이</label><input type="number" value={age} onChange={(e) => setAge(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">키 (cm)</label><input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
        <div><label className="label">몸무게 (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" /></div>
      </div>
      <div>
        <label className="label">활동량</label>
        <select value={actIdx} onChange={(e) => setActIdx(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
          {ACTIVITY.map((a, i) => <option key={i} value={i}>{a.label} (×{a.mult})</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3 text-center">
          <div className="text-xs text-muted">기초대사량 BMR</div>
          <div className="text-xl font-bold mt-1">{Math.round(bmr)} kcal</div>
        </div>
        <div className="border border-brand-500 bg-brand-50 dark:bg-brand-900/20 rounded p-3 text-center">
          <div className="text-xs text-muted">활동 반영 TDEE</div>
          <div className="text-xl font-bold mt-1">{Math.round(tdee)} kcal</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">감량</div><div className="font-bold">{Math.round(tdee - 500)} kcal</div></div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">유지</div><div className="font-bold">{Math.round(tdee)} kcal</div></div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded text-center"><div className="text-muted">증량</div><div className="font-bold">{Math.round(tdee + 500)} kcal</div></div>
      </div>
    </div>
  );
}
