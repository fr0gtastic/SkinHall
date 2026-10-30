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
      <div className="w-full max-w-md rounded-md border border-border bg-card/95 p-4 backdrop-blur-xl">
        <Input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") apply(); }}
          placeholder="Search filters..."
        />
        <div className="mt-2 flex gap-2 text-sm">
          {parsed.rarity && <span className="rounded bg-muted px-2 py-1">{parsed.rarity}</span>}
          {parsed.weaponType && <span className="rounded bg-muted px-2 py-1">{parsed.weaponType}</span>}
          {parsed.sort && <span className="rounded bg-muted px-2 py-1">{parsed.sort}</span>}
        </div>
      </div>
    </div>
  );
}
