"use client";

import { useMemo, useState } from "react";

type Change = { path: string; type: "added" | "removed" | "changed"; before?: unknown; after?: unknown };

function diff(a: unknown, b: unknown, path = "$"): Change[] {
  const changes: Change[] = [];
  if (a === undefined && b !== undefined) {
    changes.push({ path, type: "added", after: b });
    return changes;
  }
  if (a !== undefined && b === undefined) {
    changes.push({ path, type: "removed", before: a });
    return changes;
  }
  if (typeof a !== typeof b || (typeof a === "object" && a === null) !== (typeof b === "object" && b === null)) {
    changes.push({ path, type: "changed", before: a, after: b });
    return changes;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      changes.push(...diff(a[i], b[i], `${path}[${i}]`));
    }
    return changes;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      changes.push(...diff((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`));
    }
    return changes;
  }
  if (a !== b) changes.push({ path, type: "changed", before: a, after: b });
  return changes;
}

export default function JsonDiffTool() {
  const [a, setA] = useState(`{"name":"Alice","age":30,"city":"Seoul"}`);
  const [b, setB] = useState(`{"name":"Alice","age":31,"city":"Busan","new":true}`);

  const { changes, error } = useMemo(() => {
    try {
      return { changes: diff(JSON.parse(a), JSON.parse(b)), error: "" };
    } catch (e) {
      return { changes: [], error: (e as Error).message };
    }
  }, [a, b]);

  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">JSON A</label><textarea value={a} onChange={(e) => setA(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" /></div>
        <div><label className="label">JSON B</label><textarea value={b} onChange={(e) => setB(e.target.value)} className="w-full h-44 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm font-mono resize-y" /></div>
      </div>
      {error ? <div className="text-sm text-red-600">{error}</div> : (
        <div className="space-y-1 max-h-72 overflow-y-auto">
          {changes.length === 0 ? <div className="text-sm text-muted">차이 없음</div> : changes.map((c, i) => (
            <div key={i} className={`p-2 rounded text-sm font-mono ${c.type === "added" ? "bg-green-100 dark:bg-green-900/30" : c.type === "removed" ? "bg-red-100 dark:bg-red-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}>
              <span className="font-bold">{c.type === "added" ? "+" : c.type === "removed" ? "-" : "~"}</span>{" "}
              <span>{c.path}</span>{": "}
              {c.type === "changed" && <><span className="line-through opacity-70">{JSON.stringify(c.before)}</span>{" → "}<span>{JSON.stringify(c.after)}</span></>}
              {c.type === "added" && <span>{JSON.stringify(c.after)}</span>}
              {c.type === "removed" && <span>{JSON.stringify(c.before)}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
