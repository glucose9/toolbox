"use client";

export type PrintOptions = {
  title?: string;
  styles?: string;
  bodyClass?: string;
};

export function printHtmlAsPdf(html: string, opts: PrintOptions = {}): boolean {
  const w = window.open("", "_blank");
  if (!w) return false;
  const { title = "document", styles = "", bodyClass = "" } = opts;
  const baseStyles = `
    @page { size: A4; margin: 20mm; }
    html, body { margin: 0; padding: 0; background: #fff; color: #000; font-family: -apple-system, "Segoe UI", "Pretendard", system-ui, sans-serif; line-height: 1.6; }
    h1, h2, h3, h4 { line-height: 1.3; }
    h1 { font-size: 22pt; margin: 1em 0 0.5em; border-bottom: 1px solid #ddd; padding-bottom: 0.2em; }
    h2 { font-size: 16pt; margin: 1em 0 0.4em; }
    h3 { font-size: 13pt; margin: 0.8em 0 0.3em; }
    p, ul, ol, blockquote, table { margin: 0.6em 0; }
    ul, ol { padding-left: 1.4em; }
    blockquote { border-left: 3px solid #ccc; padding-left: 1em; color: #555; }
    code { background: #f4f4f4; padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.9em; }
    pre { background: #f4f4f4; padding: 0.8em; border-radius: 4px; overflow-x: auto; }
    pre code { background: transparent; padding: 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 0.4em 0.6em; }
    th { background: #f4f4f4; }
    img { max-width: 100%; }
    a { color: #0366d6; }
  `;
  const doc = `<!doctype html>
<html><head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>${baseStyles}${styles}</style>
</head><body class="${escapeHtml(bodyClass)}">${html}
<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 300); });<\/script>
</body></html>`;
  w.document.open();
  w.document.write(doc);
  w.document.close();
  return true;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
