"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  type CaseNode,
  type CaseEdge,
  groupColor,
  groupLabel,
  type NodeGroup,
} from "@/lib/data/caseStudies";
import { cn } from "@/lib/utils";

export function CaseArchitectureMap({
  nodes,
  edges,
}: {
  nodes: CaseNode[];
  edges: CaseEdge[];
}) {
  const [active, setActive] = useState<string>(nodes[0]?.id ?? "");
  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];

  const connected = new Set(
    edges
      .filter((e) => e.from === active || e.to === active)
      .flatMap((e) => [e.from, e.to]),
  );

  const groups = Array.from(new Set(nodes.map((n) => n.group))) as NodeGroup[];

  return (
    <div className="w-full">
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-line/70 bg-bg-base/50 sm:aspect-[16/9]">
        <div className="absolute inset-0 grid-floor opacity-30" />

        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.from);
            const b = nodes.find((n) => n.id === e.to);
            if (!a || !b) return null;
            const isActive = e.from === active || e.to === active;
            return (
              <motion.line
                key={i}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke={isActive ? "hsl(var(--accent))" : "hsl(var(--line))"}
                strokeWidth={isActive ? 1.6 : 1}
                strokeOpacity={isActive ? 0.9 : 0.45}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.03 }}
              />
            );
          })}
        </svg>

        {nodes.map((n) => {
          const isActive = n.id === active;
          const isLinked = connected.has(n.id);
          const color = groupColor[n.group];
          return (
            <button
              key={n.id}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <span
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 font-mono text-[10px] transition-all duration-200 sm:text-[11px]",
                  isActive
                    ? "scale-105 text-ink shadow-glow"
                    : isLinked
                      ? "text-ink"
                      : "text-ink-muted",
                )}
                style={{
                  borderColor: isActive
                    ? `hsl(${color})`
                    : isLinked
                      ? `hsl(${color} / 0.45)`
                      : "hsl(var(--line))",
                  backgroundColor: isActive
                    ? `hsl(${color} / 0.16)`
                    : "hsl(var(--bg-elevated) / 0.7)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: `hsl(${color})` }}
                />
                {n.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {groups.map((g) => (
          <span key={g} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `hsl(${groupColor[g]})` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {groupLabel[g]}
            </span>
          </span>
        ))}
      </div>

      <motion.div
        key={activeNode?.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-lg border border-line/80 bg-bg-base/40 p-4"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: `hsl(${groupColor[activeNode.group]})` }}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            {activeNode?.label}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {activeNode?.detail}
        </p>
      </motion.div>
    </div>
  );
}
