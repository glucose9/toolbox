"use client";

import { useMemo, useState } from "react";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

type Dir = "json-to-xml" | "xml-to-json";

const SAMPLE_JSON = `{
  "user": {
    "@_id": "1",
    "name": "Alice",
    "email": "alice@example.com",
    "tags": ["admin", "kr"]
  }
}`;

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<user id="1">
  <name>Alice</name>
  <email>alice@example.com</email>
  <tags>admin</tags>
  <tags>kr</tags>
</user>`;

export default function JsonXmlTool() {
  const [dir, setDir] = useState<Dir>("json-to-xml");
  const [input, setInput] = useState(SAMPLE_JSON);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    try {
      if (dir === "json-to-xml") {
        const obj = JSON.parse(input);
        const builder = new XMLBuilder({ ignoreAttributes: false, format: true, indentBy: "  ", attributeNamePrefix: "@_" });
        return { output: builder.build(obj) as string, error: "" };
      } else {
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const obj = parser.parse(input);
        return { output: JSON.stringify(obj, null, 2), error: "" };
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
    setDir(dir === "json-to-xml" ? "xml-to-json" : "json-to-xml");
  };

  const loadSample = () => {
    setInput(dir === "json-to-xml" ? SAMPLE_JSON : SAMPLE_XML);
  };

  return (
    <div className="card space-y-3">
      <div className="flex flex-wrap gap-2 text-sm">
        <button onClick={() => { setDir("json-to-xml"); setInput(SAMPLE_JSON); }} className={`btn ${dir === "json-to-xml" ? "btn-primary" : "btn-secondary"}`}>JSON → XML</button>
        <button onClick={() => { setDir("xml-to-json"); setInput(SAMPLE_XML); }} className={`btn ${dir === "xml-to-json" ? "btn-primary" : "btn-secondary"}`}>XML → JSON</button>
        <button onClick={swap} disabled={!output} className="btn btn-secondary disabled:opacity-50">⇄ 결과로 시작</button>
        <button onClick={loadSample} className="btn btn-secondary">샘플</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="label">{dir === "json-to-xml" ? "JSON" : "XML"}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-72 p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-sm resize-y font-mono"
          />
        </div>
        <div>
          <label className="label">{dir === "json-to-xml" ? "XML" : "JSON"}</label>
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
