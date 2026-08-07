"use client";

// Robust copy-to-clipboard. navigator.clipboard.writeText silently rejects in
// some environments (permission policies, embedded webviews, older Safari) —
// and an unhandled rejection means the 복사 button does nothing with zero
// feedback. Falls back to the legacy textarea/execCommand path and reports
// success so callers can show honest feedback.
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
