"use client";

import { motion } from "framer-motion";
import { modules } from "@/lib/modules";
import { useOS } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Dock() {
  const openModule = useOS((s) => s.openModule);
  const windows = useOS((s) => s.windows);
  const philosophyOpen = useOS((s) => s.philosophyOpen);
  const caseStudyOpen = useOS((s) => s.caseStudyOpen);

  const openIds = new Set<string>(windows.map((w) => w.id));
  if (philosophyOpen) openIds.add("philosophy");
  if (caseStudyOpen) openIds.add(`case:${caseStudyOpen}`);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed inset-x-0 bottom-3 z-30 flex justify-center px-3"
    >
      <div className="flex max-w-[calc(100vw-24px)] items-end gap-1 overflow-x-auto rounded-2xl border border-line/80 px-2 py-2 shadow-panel glass-elevated [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {modules.map((m) => {
          const Icon = m.icon;
          const isOpen = openIds.has(m.id);
          return (
            <button
              key={m.id}
              onClick={() => openModule(m.id)}
              className="group relative flex shrink-0 flex-col items-center"
              aria-label={m.title}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 group-hover:-translate-y-1",
                  isOpen
                    ? "border-accent/50 bg-accent/10 text-accent shadow-glow"
                    : "border-line bg-bg-elevated/70 text-ink-muted group-hover:border-accent/40 group-hover:text-ink",
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-line bg-bg-elevated px-2 py-1 font-mono text-[10px] text-ink opacity-0 transition group-hover:opacity-100">
                {m.short}
              </span>
              <span
                className={cn(
                  "mt-1 h-1 w-1 rounded-full transition",
                  isOpen ? "bg-accent" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
