export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-7xl md:text-8xl",
    xl: "text-8xl md:text-[10rem] lg:text-[14rem]",
  };
  return (
    <span
      className={`inline-flex items-baseline font-[family-name:var(--font-display)] font-extrabold tracking-tight leading-none ${sizes[size]} ${className}`}
    >
      <span
        className="font-[family-name:var(--font-devanagari)] text-[color:var(--mustard)]"
        style={{
          textShadow:
            "2px 0 0 var(--magenta), 4px 2px 0 var(--magenta), 6px 4px 0 var(--charcoal)",
        }}
      >
        अन्न
      </span>
      <span
        className="text-[color:var(--forest)] ml-1"
        style={{
          textShadow:
            "2px 0 0 var(--mustard), 4px 2px 0 var(--mustard), 6px 4px 0 var(--charcoal)",
        }}
      >
        Data
      </span>
    </span>
  );
}
