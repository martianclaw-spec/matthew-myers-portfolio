"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data/skills";
import { ModuleShell, SectionLabel } from "@/components/ui/primitives";

export function Skills() {
  return (
    <ModuleShell>
      <SectionLabel>skills and stack</SectionLabel>
      <div className="space-y-6">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-ink">
              {group.label}
            </div>
            <div className="space-y-2.5">
              {group.items.map((item, i) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-ink-muted">{item.name}</span>
                    <span className="font-mono text-[10px] text-ink-faint">
                      {item.level}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-base">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-soft to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 0.7, delay: i * 0.06, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModuleShell>
  );
}
