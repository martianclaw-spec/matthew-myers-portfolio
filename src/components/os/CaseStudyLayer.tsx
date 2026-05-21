"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { X, ChevronDown, ArrowRight, Boxes, ExternalLink } from "lucide-react";
import { caseStudies } from "@/lib/data/caseStudies";
import { useOS } from "@/lib/store";
import { event } from "@/lib/analytics";
import { CaseArchitectureMap } from "./CaseArchitectureMap";

function Reveal({
  children,
  root,
  delay = 0,
  className,
}: {
  children: ReactNode;
  root: React.RefObject<HTMLDivElement | null>;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ root, once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SceneLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[11px] text-accent">{index}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink-faint">
        {children}
      </span>
      <span className="h-px flex-1 bg-line/60" />
    </div>
  );
}

export function CaseStudyLayer({ id }: { id: string }) {
  const closeCaseStudy = useOS((s) => s.closeCaseStudy);
  const caseStudyOpen = useOS((s) => s.caseStudyOpen);
  const openModule = useOS((s) => s.openModule);
  const setActiveProject = useOS((s) => s.setActiveProject);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const c = caseStudies[id];
  const open = caseStudyOpen === id;

  if (!c) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: open ? 1 : 0,
        filter: open ? "blur(0px)" : "blur(10px)",
        pointerEvents: open ? "auto" : "none",
      }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-0 z-[60] bg-bg-base"
    >
      {/* Ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-floor opacity-20" />
        <div className="drift-a breathe absolute -left-24 top-0 h-[40vw] w-[40vw] rounded-full bg-accent/12 blur-[130px]" />
        <div className="drift-b breathe absolute -right-24 top-1/2 h-[38vw] w-[38vw] rounded-full bg-signal-info/10 blur-[140px]" />
      </div>

      {/* Progress + header */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-accent/70"
        style={{ scaleX: progress }}
      />
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
          Case Study / {c.codename}
        </span>
        <button
          onClick={closeCaseStudy}
          className="flex items-center gap-1.5 rounded-md border border-line bg-bg-elevated/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition hover:border-accent/40 hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
          close
        </button>
      </div>

      <div
        ref={scrollRef}
        className="grain relative h-full overflow-y-auto scroll-smooth"
      >
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-8">
          {/* Scene 1 - hero */}
          <section className="flex min-h-[100dvh] flex-col justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                {c.status}
              </span>
              <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
                {c.name}
              </h1>
              <p className="mt-4 max-w-2xl text-balance text-xl font-light leading-snug text-ink sm:text-2xl">
                {c.positioning}
              </p>
              <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-ink-muted">
                {c.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-bg-base/50 px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {c.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-line/80 bg-bg-base/40 p-3"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint">
                      {s.label}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-ink">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-1.5">
                {c.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line/70 bg-bg-elevated/50 px-2 py-1 font-mono text-[10px] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {c.liveUrl && (
                <a
                  href={c.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => event("visit_live_site", { project: c.id })}
                  className="group mt-7 inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/15"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit the live product
                  <span className="font-mono text-[11px] text-accent/70">
                    {c.liveUrl.replace("https://", "")}
                  </span>
                </a>
              )}
            </motion.div>

            <div className="mt-12 flex items-center gap-2 text-ink-faint">
              <ChevronDown className="h-4 w-4 animate-pulse-soft" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                scroll to explore the system
              </span>
            </div>
          </section>

          {/* Scene 2 - problem */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="01">The problem</SceneLabel>
              <p className="max-w-3xl text-balance text-xl font-light leading-relaxed text-ink-muted sm:text-2xl">
                {c.problem.lead}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.problem.friction.map((f, i) => (
                <Reveal root={scrollRef} delay={i * 0.05} key={f.title}>
                  <div className="h-full rounded-xl border border-line/80 bg-bg-base/40 p-5">
                    <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Scene 3 - architecture */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="02">Systems and architecture</SceneLabel>
              <p className="max-w-3xl text-base leading-relaxed text-ink-muted">
                {c.architecture.intro}
              </p>
            </Reveal>
            <Reveal root={scrollRef} delay={0.05} className="mt-7">
              <CaseArchitectureMap
                nodes={c.architecture.nodes}
                edges={c.architecture.edges}
              />
            </Reveal>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {c.architecture.principles.map((p, i) => (
                <Reveal root={scrollRef} delay={i * 0.04} key={p.title}>
                  <div className="h-full rounded-xl border border-line/80 bg-bg-base/40 p-5">
                    <h3 className="text-sm font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Scene 4 - product */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="03">Product and UX thinking</SceneLabel>
              <p className="max-w-3xl text-base leading-relaxed text-ink-muted">
                {c.product.intro}
              </p>
            </Reveal>
            <div className="mt-8 space-y-3">
              {c.product.decisions.map((d, i) => (
                <Reveal root={scrollRef} delay={i * 0.03} key={d.title}>
                  <div className="rounded-xl border border-line/80 bg-bg-base/40 p-5">
                    <h3 className="text-base font-semibold text-ink">{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {d.decision}
                    </p>
                    <div className="mt-3 flex items-start gap-2 border-t border-line/60 pt-3">
                      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                        why
                      </span>
                      <p className="text-sm leading-relaxed text-ink">{d.why}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Scene 5 - technical highlights */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="04">Technical highlights</SceneLabel>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.highlights.map((h, i) => (
                <Reveal root={scrollRef} delay={i * 0.03} key={h.title}>
                  <div className="group h-full rounded-xl border border-line/80 bg-bg-base/40 p-5 transition hover:border-accent/40">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-accent">
                      {h.tag}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold text-ink">
                      {h.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                      {h.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Scene 6 - AI-native */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="05">AI-native engineering</SceneLabel>
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
                <p className="text-balance text-lg leading-relaxed text-ink sm:text-xl">
                  {c.ai.thesis}
                </p>
              </div>
            </Reveal>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Reveal root={scrollRef}>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  What the workflow enabled
                </div>
                <div className="mt-3 space-y-3">
                  {c.ai.enabled.map((e) => (
                    <div
                      key={e.title}
                      className="rounded-lg border border-line/80 bg-bg-base/40 p-4"
                    >
                      <h4 className="text-sm font-medium text-ink">{e.title}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                        {e.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal root={scrollRef} delay={0.06}>
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  Where human judgment decided
                </div>
                <div className="mt-3 space-y-3">
                  {c.ai.judgment.map((j) => (
                    <div
                      key={j.title}
                      className="rounded-lg border border-line/80 bg-bg-base/40 p-4"
                    >
                      <h4 className="text-sm font-medium text-ink">{j.title}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                        {j.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Scene 7 - what it demonstrates */}
          <section className="py-20">
            <Reveal root={scrollRef}>
              <SceneLabel index="06">What this demonstrates</SceneLabel>
            </Reveal>
            <div className="space-y-2.5">
              {c.demonstrates.map((d, i) => (
                <Reveal root={scrollRef} delay={i * 0.04} key={d}>
                  <div className="flex items-start gap-4 border-b border-line/50 pb-3">
                    <span className="mt-1 font-mono text-[11px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-balance text-lg font-light leading-snug text-ink sm:text-xl">
                      {d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Scene 8 - roadmap */}
          <section className="py-20 pb-32">
            <Reveal root={scrollRef}>
              <SceneLabel index="07">Current status and roadmap</SceneLabel>
              <p className="max-w-3xl text-base leading-relaxed text-ink-muted">
                {c.roadmap.status}
              </p>
            </Reveal>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {(
                [
                  { label: "Now", items: c.roadmap.now, tone: "175 70% 52%" },
                  { label: "Next", items: c.roadmap.next, tone: "215 90% 64%" },
                  { label: "Horizon", items: c.roadmap.horizon, tone: "200 18% 62%" },
                ] as const
              ).map((col, ci) => (
                <Reveal root={scrollRef} delay={ci * 0.06} key={col.label}>
                  <div className="h-full rounded-xl border border-line/80 bg-bg-base/40 p-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `hsl(${col.tone})` }}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink">
                        {col.label}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {col.items.map((it) => (
                        <li
                          key={it}
                          className="text-[13px] leading-relaxed text-ink-muted"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal root={scrollRef} delay={0.1} className="mt-12 text-center">
              <button
                onClick={() => {
                  closeCaseStudy();
                  setActiveProject(id);
                  openModule("projects");
                }}
                className="group inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/15"
              >
                <Boxes className="h-4 w-4" />
                Back to the projects explorer
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </Reveal>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
