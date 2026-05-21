"use client";

import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { identity } from "@/lib/data/content";
import { modules } from "@/lib/modules";
import { useOS } from "@/lib/store";

export function DesktopIdle() {
  const togglePalette = useOS((s) => s.togglePalette);
  const openModule = useOS((s) => s.openModule);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="pointer-events-none flex h-full w-full items-center justify-center px-6"
    >
      <div className="pointer-events-auto w-full max-w-md text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent">
          command center online
        </div>
        <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {identity.handle}
        </h1>
        <p className="mt-3 text-balance text-sm leading-relaxed text-ink-muted">
          {identity.positioning}
        </p>

        <button
          onClick={togglePalette}
          className="mx-auto mt-7 flex items-center gap-2 rounded-lg border border-line bg-bg-elevated/70 px-4 py-2.5 text-sm text-ink-muted transition hover:border-accent/40 hover:text-ink"
        >
          <Command className="h-4 w-4 text-accent" />
          Open the command palette
          <kbd className="rounded bg-bg-base px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
            CTRL K
          </kbd>
        </button>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => openModule(m.id)}
              className="rounded-full border border-line bg-bg-base/40 px-3 py-1.5 font-mono text-[11px] text-ink-muted transition hover:border-accent/40 hover:text-ink"
            >
              {m.short}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
