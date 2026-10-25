import PropTypes from "prop-types";

export function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`v-cut-sm border px-3 py-1.5 font-display text-[12px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-primary bg-primary/15 text-primary text-glow-red"
          : "border-border bg-card/40 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
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
      className={`v-cut-sm flex items-center gap-1.5 border px-2.5 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-card/40 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
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
      className={`v-cut-sm flex items-center gap-1.5 border px-2.5 py-1.5 font-display text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        active
          ? "border-destructive bg-destructive/15 text-destructive"
          : "border-border bg-card/40 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
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
