"use client";

import { useState, useMemo } from "react";

type Person = { id: number; name: string };
type Expense = { id: number; description: string; amount: number; paidBy: number; sharedBy: number[] };

export default function TripSplitTool() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: "민지" },
    { id: 2, name: "지훈" },
    { id: 3, name: "서연" },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: "숙소 1박", amount: 240_000, paidBy: 1, sharedBy: [1, 2, 3] },
    { id: 2, description: "저녁 식사", amount: 60_000, paidBy: 2, sharedBy: [1, 2, 3] },
  ]);

  const addPerson = () => {
    const id = Date.now();
    setPeople([...people, { id, name: "" }]);
  };
  const removePerson = (id: number) => {
    setPeople(people.filter((p) => p.id !== id));
    setExpenses(expenses.filter((e) => e.paidBy !== id).map((e) => ({ ...e, sharedBy: e.sharedBy.filter((p) => p !== id) })));
  };
  const updatePerson = (id: number, name: string) => {
    setPeople(people.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { id: Date.now(), description: "", amount: 0, paidBy: people[0]?.id || 0, sharedBy: people.map((p) => p.id) },
    ]);
  };
  const removeExpense = (id: number) => setExpenses(expenses.filter((e) => e.id !== id));
  const updateExpense = (id: number, patch: Partial<Expense>) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  // Calculate balances
  const balances = useMemo(() => {
    const b: Record<number, number> = {};
    people.forEach((p) => (b[p.id] = 0));
    for (const ex of expenses) {
      if (!ex.sharedBy.length) continue;
      const perPerson = ex.amount / ex.sharedBy.length;
      b[ex.paidBy] = (b[ex.paidBy] || 0) + ex.amount;
      ex.sharedBy.forEach((p) => {
        b[p] = (b[p] || 0) - perPerson;
      });
    }
    return b;
  }, [people, expenses]);

  // Simplify settlements (greedy)
  const settlements = useMemo(() => {
    const debtors: { id: number; amount: number }[] = [];
    const creditors: { id: number; amount: number }[] = [];
    Object.entries(balances).forEach(([idStr, amt]) => {
      const id = +idStr;
      if (amt < -1) debtors.push({ id, amount: -amt });
      else if (amt > 1) creditors.push({ id, amount: amt });
    });
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const result: { from: number; to: number; amount: number }[] = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(debtors[i].amount, creditors[j].amount);
      result.push({ from: debtors[i].id, to: creditors[j].id, amount: Math.round(pay) });
      debtors[i].amount -= pay;
      creditors[j].amount -= pay;
      if (debtors[i].amount < 1) i++;
      if (creditors[j].amount < 1) j++;
    }
    return result;
  }, [balances]);

  const nameOf = (id: number) => people.find((p) => p.id === id)?.name || "?";
  const fmt = (n: number) => Math.round(n).toLocaleString("ko-KR");
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="card space-y-4">
      {/* People */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="label !mb-0">참여자</label>
          <button onClick={addPerson} className="text-xs text-blue-600 hover:underline">+ 추가</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {people.map((p) => (
            <div key={p.id} className="flex gap-1">
              <input
                value={p.name}
                onChange={(e) => updatePerson(p.id, e.target.value)}
                placeholder="이름"
                className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
              />
              <button onClick={() => removePerson(p.id)} className="text-red-500 px-2">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="label !mb-0">비용 내역</label>
          <button onClick={addExpense} className="text-xs text-blue-600 hover:underline">+ 추가</button>
        </div>
        <div className="space-y-2">
          {expenses.map((e) => (
            <div key={e.id} className="border border-gray-200 dark:border-gray-700 rounded p-2 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <input
                  value={e.description}
                  onChange={(ev) => updateExpense(e.id, { description: ev.target.value })}
                  placeholder="내역 (예: 저녁)"
                  className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
                <input
                  type="number"
                  value={e.amount}
                  onChange={(ev) => updateExpense(e.id, { amount: +ev.target.value })}
                  placeholder="금액"
                  className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                />
                <select
                  value={e.paidBy}
                  onChange={(ev) => updateExpense(e.id, { paidBy: +ev.target.value })}
                  className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                >
                  {people.map((p) => (
                    <option key={p.id} value={p.id}>{p.name || "?"} 결제</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted">나눠 부담:</span>
                {people.map((p) => (
                  <label key={p.id} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={e.sharedBy.includes(p.id)}
                      onChange={(ev) =>
                        updateExpense(e.id, {
                          sharedBy: ev.target.checked
                            ? [...e.sharedBy, p.id]
                            : e.sharedBy.filter((id) => id !== p.id),
                        })
                      }
                    />
                    {p.name || "?"}
                  </label>
                ))}
                <button onClick={() => removeExpense(e.id)} className="text-red-500 ml-auto">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="card-section">
        <div className="text-sm space-y-1">
          <div className="flex justify-between font-semibold">
            <span>총 지출</span>
            <span>{fmt(total)}원</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>1인당 평균</span>
            <span>{fmt(total / Math.max(1, people.length))}원</span>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        <div className="text-sm font-semibold mb-1">정산 결과 (최소 송금)</div>
        {settlements.length === 0 ? (
          <div className="text-sm text-muted">정산할 금액이 없습니다 (이미 균등하거나 비용 없음)</div>
        ) : (
          <ul className="text-sm space-y-1">
            {settlements.map((s, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="font-medium">{nameOf(s.from)}</span>
                <span className="text-muted">→</span>
                <span className="font-medium">{nameOf(s.to)}</span>
                <span className="ml-auto text-blue-600 font-semibold">{fmt(s.amount)}원</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-xs text-muted leading-relaxed">
        💡 그리디 알고리즘으로 송금 횟수를 최소화합니다. 각 지출마다 "나눠 부담"으로 일부만 분담하는 것도 가능 (예: 술 안 마신 사람 제외). 모든 처리는 브라우저 안에서 일어나며 데이터가 외부로 전송되지 않습니다.
      </div>
    </div>
  );
}
