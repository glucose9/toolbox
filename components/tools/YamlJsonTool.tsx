"use client";

import { useMemo, useState } from "react";
import YAML from "yaml";

type Dir = "yaml-to-json" | "json-to-yaml";

const SAMPLE_YAML = `name: barokit
version: 1.0.0
tools:
  - qr
  - pdf
  - hwp
nested:
  enabled: true
  count: 35
`;

export default function YamlJsonTool() {
  const [dir, setDir] = useState<Dir>("yaml-to-json");
  const [input, setInput] = useState(SAMPLE_YAML);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      if (dir === "yaml-to-json") {
        const parsed = YAML.parse(input);
        return { output: JSON.stringify(parsed, null, 2), error: "" };
      } else {
        const parsed = JSON.parse(input);
        return { output: YAML.stringify(parsed), error: "" };
      }
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [dir, input]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const swap = () => {
    if (!output) return;
    setInput(output);
    setDir(dir === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json");
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => setDir("yaml-to-json")} className={`btn ${dir === "yaml-to-json" ? "btn-primary" : "btn-secondary"}`}>YAML → JSON</button>
        <button onClick={() => setDir("json-to-yaml")} className={`btn ${dir === "json-to-yaml" ? "btn-primary" : "btn-secondary"}`}>JSON → YAML</button>
        <button onClick={swap} disabled={!output} className="btn btn-secondary disabled:opacity-50">⇄ 결과로 시작</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">{dir === "yaml-to-json" ? "YAML" : "JSON"}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">{dir === "yaml-to-json" ? "JSON" : "YAML"}</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button onClick={copy} disabled={!output} className="btn btn-primary disabled:opacity-50">{copied ? "✓ 복사됨" : "복사"}</button>
    </div>
  );
}
