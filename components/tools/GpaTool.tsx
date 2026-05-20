"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Course = { id: number; name: string; grade: string; credit: number };

const GRADE_43: Record<string, number> = {
  "A+": 4.3, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0, P: 4.3, NP: 0,
};

const GRADE_45: Record<string, number> = {
  "A+": 4.5, A: 4.0, "A-": 3.5,
  "B+": 3.5, B: 3.0, "B-": 2.5,
  "C+": 2.5, C: 2.0, "C-": 1.5,
  "D+": 1.5, D: 1.0, "D-": 0.5,
  F: 0, P: 4.5, NP: 0,
};

const GRADE_40: Record<string, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0, P: 4.0, NP: 0,
};

export default function GpaTool() {
  const t = useTranslations("toolUI.gpa");
  const [scale, setScale] = useState<"4.3" | "4.5" | "4.0">("4.5");
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "선형대수", grade: "A+", credit: 3 },
    { id: 2, name: "데이터구조", grade: "A", credit: 3 },
    { id: 3, name: "영어", grade: "B+", credit: 2 },
  ]);

  const table = scale === "4.3" ? GRADE_43 : scale === "4.5" ? GRADE_45 : GRADE_40;
  const max = parseFloat(scale);

  const totalCredits = courses.reduce((s, c) => s + (c.grade === "P" || c.grade === "NP" ? 0 : c.credit), 0);
  const totalPoints = courses.reduce((s, c) => {
    if (c.grade === "P" || c.grade === "NP") return s;
    return s + (table[c.grade] ?? 0) * c.credit;
  }, 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const ratio = gpa / max;
  const gpa45 = ratio * 4.5;
  const gpa43 = ratio * 4.3;
  const gpa40 = ratio * 4.0;
  const gpa100 = ratio * 100;

  const addCourse = () => setCourses([...courses, { id: Date.now(), name: "", grade: "A", credit: 3 }]);
  const removeCourse = (id: number) => setCourses(courses.filter((c) => c.id !== id));
  const updateCourse = (id: number, key: keyof Course, value: string | number) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const scaleNote = scale === "4.5" ? t("note45") : scale === "4.3" ? t("note43") : t("note40");

  return (
    <div className="card space-y-3">
      <div>
        <label className="label">{t("scaleLabel")}</label>
        <div className="flex gap-2">
          {(["4.5", "4.3", "4.0"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-3 py-1.5 rounded text-sm ${scale === s ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {t("scalePointFormat", { scale: s })}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted mt-1">
          {scaleNote}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-1">{t("courseName")}</th>
              <th className="text-left p-1 w-20">{t("grade")}</th>
              <th className="text-left p-1 w-16">{t("credit")}</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-1">
                  <input value={c.name} onChange={(e) => updateCourse(c.id, "name", e.target.value)} className="w-full px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
                </td>
                <td className="p-1">
                  <select value={c.grade} onChange={(e) => updateCourse(c.id, "grade", e.target.value)} className="w-full px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900">
                    {Object.keys(table).map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </td>
                <td className="p-1">
                  <input type="number" min="0" max="6" value={c.credit} onChange={(e) => updateCourse(c.id, "credit", +e.target.value)} className="w-full px-1 py-0.5 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900" />
                </td>
                <td className="p-1 text-center">
                  <button onClick={() => removeCourse(c.id)} className="text-red-500 text-lg">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addCourse} className="btn">{t("addCourse")}</button>

      <div className="card-section">
        <div className="text-center">
          <div className="text-xs text-muted">{t("gpaOn", { scale })}</div>
          <div className="text-4xl font-bold text-blue-600">{gpa.toFixed(3)}</div>
          <div className="text-xs text-muted mt-1">{t("totalCredits", { credits: totalCredits })}</div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <div className="grid grid-cols-3 gap-2 text-sm text-center">
          <div>
            <div className="text-xs text-muted">{t("convert45")}</div>
            <div className="font-semibold">{gpa45.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-muted">{t("convert43")}</div>
            <div className="font-semibold">{gpa43.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-muted">{t("convert40")}</div>
            <div className="font-semibold">{gpa40.toFixed(2)}</div>
          </div>
          <div className="col-span-3 mt-2">
            <div className="text-xs text-muted">{t("convert100")}</div>
            <div className="font-semibold">{t("scoreFmt", { value: gpa100.toFixed(1) })}</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted leading-relaxed">
        {t("tipNote")}
      </div>
    </div>
  );
}
