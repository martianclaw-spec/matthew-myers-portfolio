"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { operatorBackground as bg } from "@/lib/data/content";
import { ModuleShell, SectionLabel, Panel } from "@/components/ui/primitives";

export function OperatorBackground() {
  return (
    <ModuleShell>
      <SectionLabel>{bg.kicker}</SectionLabel>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[28px]"
      >
        {bg.headline}
      </motion.h2>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        {bg.narrative}
      </p>

      {/* Evolution timeline */}
      <div className="mt-8">
        <SectionLabel>operator to systems engineer</SectionLabel>
        <div className="relative mt-1 space-y-4 pl-6">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          {bg.phases.map((phase, i) => (
            <motion.div
              key={phase.tag}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative"
            >
              <span className="absolute -left-6 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="absolute h-3.5 w-3.5 rounded-full border border-accent/40" />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  {phase.tag}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-ink-faint">
                  {phase.period}
                </span>
              </div>
              <div className="mt-0.5 text-sm font-medium text-ink">{phase.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{phase.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Transferable strengths */}
      <div className="mt-8">
        <SectionLabel>what the operator years built</SectionLabel>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {bg.strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-lg border border-line/80 bg-bg-base/40 p-4"
            >
              <h4 className="text-sm font-semibold text-ink">{s.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What this adds to engineering */}
      <div className="mt-8">
        <SectionLabel>what this adds to my engineering</SectionLabel>
        <Panel>
          <ul className="space-y-2">
            {bg.engineeringAdds.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </ModuleShell>
  );
}
