"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { aiWorkflow } from "@/lib/data/content";
import { ModuleShell, SectionLabel } from "@/components/ui/primitives";

export function AIWorkflow() {
  return (
    <ModuleShell>
      <SectionLabel>ai-native workflow</SectionLabel>

      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-wider">
            thesis
          </span>
        </div>
        <p className="mt-2 text-balance text-[15px] leading-relaxed text-ink">
          {aiWorkflow.thesis}
        </p>
      </div>

      <div className="mt-5">
        <SectionLabel>where it applies</SectionLabel>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {aiWorkflow.steps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-lg border border-line/80 bg-bg-base/40 p-4 transition hover:border-accent/40"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-ink">{s.label}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {s.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ModuleShell>
  );
}
