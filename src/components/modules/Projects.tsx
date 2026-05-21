"use client";

import { motion } from "framer-motion";
import { Check, Circle, ArrowUpRight } from "lucide-react";
import { projects, statusLabel } from "@/lib/data/projects";
import { caseStudies } from "@/lib/data/caseStudies";
import { useOS } from "@/lib/store";
import { ModuleShell, SectionLabel, Chip, Panel } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  live: "text-signal-ok",
  building: "text-accent",
  scaling: "text-signal-info",
};

export function Projects() {
  const activeProject = useOS((s) => s.activeProject);
  const setActiveProject = useOS((s) => s.setActiveProject);
  const openCaseStudy = useOS((s) => s.openCaseStudy);

  const selectedId = activeProject ?? projects[0].id;
  const project = projects.find((p) => p.id === selectedId) ?? projects[0];

  return (
    <ModuleShell>
      <SectionLabel>projects explorer</SectionLabel>
      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-2">
          {projects.map((p) => {
            const selected = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProject(p.id)}
                className={cn(
                  "rounded-lg border px-3 py-3 text-left transition",
                  selected
                    ? "border-accent/50 bg-accent/10"
                    : "border-line bg-bg-base/40 hover:border-accent/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-ink-faint">
                    {p.codename}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider",
                      statusTone[p.status],
                    )}
                  >
                    <Circle className="h-1.5 w-1.5 fill-current" />
                    {statusLabel[p.status]}
                  </span>
                </div>
                <div className="mt-1.5 text-sm font-medium text-ink">
                  {p.name}
                </div>
                <div className="mt-0.5 text-xs text-ink-muted">{p.tagline}</div>
              </button>
            );
          })}
        </div>

        {/* Keyed remount animates the new detail in without waiting on an exit
            animation, so the panel never freezes if a frame callback stalls. */}
        <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {project.name}
                </h3>
                <p className="mt-0.5 text-sm text-ink-muted">{project.tagline}</p>
              </div>
              <Chip>{project.year}</Chip>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <Panel key={m.label} className="py-2.5">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                    {m.label}
                  </div>
                  <div className="mt-0.5 text-sm font-medium text-ink">
                    {m.value}
                  </div>
                </Panel>
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {project.summary}
            </p>

            <div className="mt-5">
              <SectionLabel>capabilities</SectionLabel>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {project.capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm text-ink-muted"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <SectionLabel>stack</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            {caseStudies[project.id] && (
              <button
                onClick={() => openCaseStudy(project.id)}
                className="group mt-5 inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/15"
              >
                View full case study
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )}
          </motion.div>
      </div>
    </ModuleShell>
  );
}
