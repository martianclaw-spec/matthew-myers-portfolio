import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ModuleShell({ children }: { children: ReactNode }) {
  return <div className="p-5 sm:p-6">{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
      {children}
    </div>
  );
}

export function Chip({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide transition",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-line bg-bg-base/50 text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line/80 bg-bg-base/40 p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
