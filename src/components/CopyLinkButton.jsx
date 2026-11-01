// CopyLinkButton.jsx - shares the current view via URL.
import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function CopyLinkButton({ className = "", text }) {
  const [copied, setCopied] = useState(false);

  const value = text
    ? (text.startsWith("/") ? `${window.location.origin}${text}` : text)
    : window.location.href;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      onClick={copy}
      className={`group inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2 font-display text-[11px] uppercase tracking-[0.14em] text-foreground/80 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-white/25 hover:bg-white/10 hover:text-foreground rounded-full ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copied
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5" /> Share view
        </>
      )}
    </button>
  );
}