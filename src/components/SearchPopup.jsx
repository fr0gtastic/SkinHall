import { useEffect, useState } from "react";
import { parseSearchQuery, toFilterParams } from "@/lib/parseSearchQuery";
import { Input } from "@/components/ui/input";

export default function SearchPopup({ onChange, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (v) => { if (controlledOpen !== undefined) onOpenChange?.(v); else setInternalOpen(v); };
  const [value, setValue] = useState("");
  const parsed = parseSearchQuery(value);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") { setOpen(false); setValue(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  const apply = () => {
    if (!parsed || Object.keys(parsed).length === 0) {
      onChange?.({});
      setOpen(false);
      setValue("");
      return;
    }
    const fp = toFilterParams(parsed);
    const patch = {};
    if (fp.rarity) patch.rarity = [fp.rarity];
    if (fp.w) patch.weapons = [fp.w];
    if (fp.sort) patch.sort = { key: fp.sort, dir: fp.dir };
    onChange?.(patch);
    setOpen(false);
    setValue("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20">
      <div className="mx-4 w-full max-w-md rounded-2xl glass-panel p-4">
        <Input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") apply(); }}
          placeholder="Search filters..." className="glass-input rounded-full"
        />
        <div className="mt-2 flex gap-2 text-sm">
          {parsed.rarity && <span className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">{parsed.rarity}</span>}
          {parsed.weaponType && <span className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">{parsed.weaponType}</span>}
          {parsed.sort && <span className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">{parsed.sort}</span>}
        </div>
      </div>
    </div>
  );
}
