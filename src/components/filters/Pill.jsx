import PropTypes from "prop-types";

export function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border bg-white/5 backdrop-blur-md px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${
        active
          ? "border-primary/60 bg-primary/15 text-primary text-glow-red shadow-[0_0_12px_rgba(255,70,85,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "border-white/10 text-foreground/70 hover:border-white/25 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

Pill.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export function NmPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex items-center gap-1.5 border bg-white/5 backdrop-blur-md px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-primary/60 bg-primary/15 text-primary text-glow-red shadow-[0_0_12px_rgba(255,70,85,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "border-white/10 text-foreground/60 hover:border-white/25 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

NmPill.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export function HidePill({ active, onClick, children, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex items-center gap-1.5 border bg-white/5 backdrop-blur-md px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-destructive/60 bg-destructive/15 text-destructive text-glow-red shadow-[0_0_12px_rgba(255,70,85,0.35),inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "border-white/10 text-foreground/60 hover:border-white/25 hover:text-foreground"
      }`}
    >
      {Icon ? <Icon className="h-3 w-3" /> : null}
      {children}
    </button>
  );
}

HidePill.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.elementType,
};

export default Pill;
