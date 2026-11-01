import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 1) return [];
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl glass-panel px-3 py-2 backdrop-blur-md">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:border-white/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          First
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:border-white/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>
        <button
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border font-display text-[11px] transition-all",
            "border-primary/60 bg-primary/15 text-primary text-glow-red shadow-[0_0_12px_rgba(255,70,85,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
          )}
        >
          {currentPage}
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:border-white/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] text-foreground/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:border-white/25 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Last
        </button>
      </div>
    </div>
  );
}
