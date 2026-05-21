"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Network } from "lucide-react";
import { identity, telemetry } from "@/lib/data/content";
import { useOS } from "@/lib/store";
import { ModuleShell, SectionLabel, Chip, Panel } from "@/components/ui/primitives";

const principles = [
  "Operational software systems",
  "Workflow-driven SaaS products",
  "AI-native product experiences",
];

export function SystemOverview() {
  const openModule = useOS((s) => s.openModule);

  return (
    <ModuleShell>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SectionLabel>identity</SectionLabel>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {identity.name}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {identity.roles.map((r) => (
            <Chip key={r} active>
              {r}
            </Chip>
          ))}
        </div>

        <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-ink-muted">
          {identity.positioning}
        </p>

        <div className="mt-7">
          <SectionLabel>operating focus</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-3">
            {principles.map((p) => (
              <Panel key={p} className="flex items-center">
                <span className="text-sm text-ink">{p}</span>
              </Panel>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-2 sm:grid-cols-4">
          {telemetry.map((t) => (
            <Panel key={t.id} className="py-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {t.label}
              </div>
              <div className="mt-1 text-sm font-medium text-ink">{t.value}</div>
            </Panel>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => openModule("projects")}
            className="group inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/15"
          >
            <Boxes className="h-4 w-4" />
            Explore projects
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            onClick={() => openModule("architecture")}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-base/50 px-4 py-2 text-sm text-ink-muted transition hover:border-accent/40 hover:text-ink"
          >
            <Network className="h-4 w-4" />
            View architecture
          </button>
        </div>
      </motion.div>
    </ModuleShell>
  );
}
