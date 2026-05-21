"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { archNodes, archEdges } from "@/lib/data/architecture";
import { ModuleShell, SectionLabel } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function ArchitectureMap() {
  const [active, setActive] = useState<string>("operator");
  const activeNode = archNodes.find((n) => n.id === active) ?? archNodes[0];

  const connected = new Set(
    archEdges
      .filter((e) => e.from === active || e.to === active)
      .flatMap((e) => [e.from, e.to]),
  );

  return (
    <ModuleShell>
      <SectionLabel>architecture map</SectionLabel>
      <p className="mb-4 max-w-lg text-sm text-ink-muted">
        How the systems connect end to end. Hover any node to trace its links and
        read how it fits the operator surface.
      </p>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-line/70 bg-bg-base/40">
        <div className="absolute inset-0 grid-floor opacity-40" />

        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {archEdges.map((e, i) => {
            const a = archNodes.find((n) => n.id === e.from)!;
            const b = archNodes.find((n) => n.id === e.to)!;
            const isActive = e.from === active || e.to === active;
            return (
              <motion.line
                key={i}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke={
                  isActive ? "hsl(var(--accent))" : "hsl(var(--line))"
                }
                strokeWidth={isActive ? 1.6 : 1}
                strokeOpacity={isActive ? 0.9 : 0.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              />
            );
          })}
        </svg>

        {archNodes.map((n) => {
          const isActive = n.id === active;
          const isLinked = connected.has(n.id);
          return (
            <button
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                className={cn(
                  "block whitespace-nowrap rounded-lg border px-3 py-1.5 font-mono text-[11px] transition-all duration-200",
                  isActive
                    ? "border-accent bg-accent/15 text-accent shadow-glow"
                    : isLinked
                      ? "border-accent/30 bg-bg-elevated/80 text-ink"
                      : "border-line bg-bg-elevated/60 text-ink-muted",
                )}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-lg border border-line/80 bg-bg-base/40 p-4"
      >
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
          {activeNode.label}
        </div>
        <p className="mt-1 text-sm text-ink-muted">{activeNode.detail}</p>
      </motion.div>
    </ModuleShell>
  );
}
