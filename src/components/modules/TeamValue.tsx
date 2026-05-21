"use client";

import { motion } from "framer-motion";
import { teamValue } from "@/lib/data/content";
import { ModuleShell, SectionLabel } from "@/components/ui/primitives";

export function TeamValue() {
  return (
    <ModuleShell>
      <SectionLabel>what i bring to teams</SectionLabel>
      <p className="mb-4 max-w-lg text-sm text-ink-muted">
        Where I create leverage when I join a team and take ownership of a
        problem.
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {teamValue.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-lg border border-line/80 bg-bg-base/40 p-4 transition hover:border-accent/40"
          >
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/5 blur-xl transition group-hover:bg-accent/10" />
            <h4 className="text-sm font-semibold text-ink">{v.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              {v.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </ModuleShell>
  );
}
