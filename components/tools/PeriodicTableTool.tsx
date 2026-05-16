"use client";

import { useState, useMemo } from "react";
import { ELEMENTS, CATEGORY_LABELS, type Element, type Category } from "@/lib/periodic-elements";

export default function PeriodicTableTool() {
  const [selected, setSelected] = useState<Element | null>(ELEMENTS[0]);
  const [search, setSearch] = useState("");
  const [hoverCat, setHoverCat] = useState<Category | null>(null);

  const searchLower = search.toLowerCase().trim();
  const matchSet = useMemo(() => {
    if (!searchLower) return null;
    return new Set(
      ELEMENTS.filter((e) =>
        e.sym.toLowerCase() === searchLower ||
        e.sym.toLowerCase().startsWith(searchLower) ||
        e.name.toLowerCase().includes(searchLower) ||
        e.ko.includes(searchLower) ||
        e.z.toString() === searchLower
      ).map((e) => e.z)
    );
  }, [searchLower]);

  // Build sparse 10x18 grid
  const grid: (Element | null)[][] = Array.from({ length: 10 }, () => Array(18).fill(null));
  for (const el of ELEMENTS) {
    grid[el.row - 1][el.col - 1] = el;
  }

  // Insert "57-71" and "89-103" markers (visual hint)
  const cellSize = "min-w-[2.5rem]";

  const renderCell = (el: Element | null, row: number, col: number) => {
    if (!el) {
      // Empty cell — but show La/Ac placeholder
      if (row === 6 && col === 3) {
        return (
          <div key={`${row}-${col}`} className="aspect-square border border-pink-300 dark:border-pink-700 rounded bg-pink-50 dark:bg-pink-950 flex items-center justify-center text-[0.55rem] sm:text-xs text-pink-700 dark:text-pink-300">57-71</div>
        );
      }
      if (row === 7 && col === 3) {
        return (
          <div key={`${row}-${col}`} className="aspect-square border border-fuchsia-300 dark:border-fuchsia-700 rounded bg-fuchsia-50 dark:bg-fuchsia-950 flex items-center justify-center text-[0.55rem] sm:text-xs text-fuchsia-700 dark:text-fuchsia-300">89-103</div>
        );
      }
      return <div key={`${row}-${col}`} />;
    }
    const cat = CATEGORY_LABELS[el.cat];
    const isMatch = !matchSet || matchSet.has(el.z);
    const isHover = !hoverCat || el.cat === hoverCat;
    const dimmed = !isMatch || !isHover;
    const isSelected = selected?.z === el.z;
    return (
      <button
        key={el.z}
        onClick={() => setSelected(el)}
        className={`aspect-square border-2 rounded p-0.5 flex flex-col items-center justify-center transition leading-none ${cat.bg} ${cat.border} ${dimmed ? "opacity-25" : ""} ${isSelected ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-900" : ""} hover:scale-110 hover:z-10 relative`}
        title={`${el.z} ${el.sym} ${el.ko}`}
      >
        <div className="text-[0.55rem] sm:text-xs text-gray-700 dark:text-gray-300">{el.z}</div>
        <div className="text-xs sm:text-base font-bold">{el.sym}</div>
        <div className="text-[0.5rem] sm:text-[0.6rem] truncate w-full text-center text-gray-700 dark:text-gray-300 hidden sm:block">{el.ko}</div>
      </button>
    );
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 원소 검색 (예: Fe, 철, 26, Iron)"
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-xs text-gray-500 hover:text-blue-600">✕ 지우기</button>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-1 text-[0.65rem] sm:text-xs">
        {(Object.keys(CATEGORY_LABELS) as Category[]).filter((c) => c !== "unknown").map((c) => {
          const lbl = CATEGORY_LABELS[c];
          return (
            <button
              key={c}
              onMouseEnter={() => setHoverCat(c)}
              onMouseLeave={() => setHoverCat(null)}
              className={`px-2 py-1 border rounded ${lbl.bg} ${lbl.border} ${hoverCat === c ? "ring-2 ring-blue-500" : ""}`}
            >
              {lbl.ko}
            </button>
          );
        })}
      </div>

      {/* Periodic table grid */}
      <div className="overflow-x-auto">
        <div className="grid gap-0.5 sm:gap-1 min-w-[560px]" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
          {Array.from({ length: 7 }).map((_, row) => (
            <div key={`row-${row}`} className="contents">
              {Array.from({ length: 18 }).map((_, col) => renderCell(grid[row][col], row + 1, col + 1))}
            </div>
          ))}
          {/* Spacer row before lanthanides */}
          <div className="col-span-18 h-2"></div>
          {/* Lanthanides row 9 - shifted to col 4-18 */}
          {Array.from({ length: 18 }).map((_, col) => {
            if (col < 3) return <div key={`la-empty-${col}`} />;
            return renderCell(grid[8][col], 9, col + 1);
          })}
          {/* Actinides row 10 */}
          {Array.from({ length: 18 }).map((_, col) => {
            if (col < 3) return <div key={`ac-empty-${col}`} />;
            return renderCell(grid[9][col], 10, col + 1);
          })}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className={`border-2 rounded p-4 ${CATEGORY_LABELS[selected.cat].bg} ${CATEGORY_LABELS[selected.cat].border}`}>
          <div className="flex items-start gap-3">
            <div className="text-center">
              <div className="text-xs text-muted">{selected.z}</div>
              <div className="text-4xl sm:text-5xl font-bold">{selected.sym}</div>
              <div className="text-sm font-semibold">{selected.ko}</div>
              <div className="text-xs text-muted">{selected.name}</div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
              <Stat label="분류" value={CATEGORY_LABELS[selected.cat].ko} />
              <Stat label="원자량" value={selected.mass.toString()} />
              {selected.config && <Stat label="전자 배치" value={selected.config} mono />}
              {selected.en !== undefined && <Stat label="전기음성도" value={selected.en.toString()} />}
              {selected.mp !== undefined && <Stat label="녹는점" value={`${selected.mp} K (${(selected.mp - 273.15).toFixed(0)} °C)`} />}
              {selected.bp !== undefined && <Stat label="끓는점" value={`${selected.bp} K (${(selected.bp - 273.15).toFixed(0)} °C)`} />}
              {selected.density !== undefined && <Stat label="밀도" value={`${selected.density} g/cm³`} />}
              <Stat label="주기 · 족" value={selected.cat === "lanthanide" || selected.cat === "actinide" ? `${selected.cat === "lanthanide" ? 6 : 7}주기 (f-블록)` : `${selected.row}주기 · ${selected.col}족`} />
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-muted leading-relaxed">
        💡 클릭하면 상세 정보, 검색창에 한글·영문·기호·원자번호 모두 가능합니다. 분류 태그 위에 마우스를 올리면 해당 그룹이 강조됩니다.
      </div>
    </div>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <span className="text-xs text-muted">{label}: </span>
      <span className={mono ? "font-mono text-xs" : ""}>{value}</span>
    </div>
  );
}
