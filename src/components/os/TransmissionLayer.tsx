"use client";

import { Fragment, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { X, ChevronDown, ChevronRight, Bot, Boxes, Mail } from "lucide-react";
import { transmission } from "@/lib/data/content";
import { useOS } from "@/lib/store";

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
      viewport={{ root, once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ClosingLine({
  text,
  root,
}: {
  text: string;
  root: React.RefObject<HTMLDivElement | null>;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <motion.h3
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ root, once: true, amount: 0.5 }}
      className="max-w-3xl text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            variants={word}
            className="inline-block bg-gradient-to-br from-ink via-ink to-accent bg-clip-text text-transparent"
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h3>
  );
}

export function TransmissionLayer() {
  const setTransmission = useOS((s) => s.setTransmission);
  const transmissionOpen = useOS((s) => s.transmissionOpen);
  const openModule = useOS((s) => s.openModule);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const t = transmission;

  const go = (id: "ask" | "projects" | "contact") => {
    setTransmission(false);
    openModule(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: transmissionOpen ? 1 : 0,
        filter: transmissionOpen ? "blur(0px)" : "blur(10px)",
        pointerEvents: transmissionOpen ? "auto" : "none",
      }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-0 z-[60] bg-bg-base"
    >
      {/* Ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-floor opacity-20" />
        <div className="drift-a breathe absolute -left-24 top-0 h-[40vw] w-[40vw] rounded-full bg-accent/12 blur-[130px]" />
        <div className="drift-b breathe absolute -right-24 bottom-0 h-[38vw] w-[38vw] rounded-full bg-signal-info/10 blur-[140px]" />
      </div>

      {/* Progress + header */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-accent/70"
        style={{ scaleX: progress }}
      />
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
          {t.kicker} / {t.codename}
        </span>
        <button
          onClick={() => setTransmission(false)}
          className="flex items-center gap-1.5 rounded-md border border-line bg-bg-elevated/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition hover:border-accent/40 hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
          close
        </button>
      </div>

      <div ref={scrollRef} className="grain relative h-full overflow-y-auto scroll-smooth">
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
          {/* Opening */}
          <section className="flex min-h-[100dvh] flex-col justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-xl text-balance text-lg text-ink-muted">
                {t.intro}
              </p>

              {/* Evolution path */}
              <div className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {t.evolution.map((step, i) => (
                  <Fragment key={step}>
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                      className="rounded-full border border-line bg-bg-elevated/60 px-3 py-1.5 font-mono text-[11px] tracking-wide text-ink"
                    >
                      {step}
                    </motion.span>
                    {i < t.evolution.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.46 + i * 0.12 }}
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
                      </motion.span>
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-14 flex items-center gap-2 text-ink-faint"
            >
              <ChevronDown className="h-4 w-4 animate-pulse-soft" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                read the transmission
              </span>
            </motion.div>
          </section>

          {/* Beats */}
          <section className="space-y-16 py-12 sm:space-y-24">
            {t.beats.map((beat, i) => (
              <Reveal root={scrollRef} key={beat.tag}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                    {beat.tag}
                  </span>
                  <span className="h-px flex-1 bg-line/60" />
                </div>
                <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {beat.title}
                </h2>
                <p className="mt-3 text-balance text-lg font-light leading-relaxed text-ink-muted sm:text-xl">
                  {beat.body}
                </p>
              </Reveal>
            ))}
          </section>

          {/* Closing statement */}
          <section className="flex min-h-[80dvh] items-center justify-center py-12">
            <ClosingLine root={scrollRef} text={t.closingLine} />
          </section>

          {/* Signals + CTA */}
          <section className="py-16 pb-32">
            <Reveal root={scrollRef}>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                  Signal
                </span>
                <span className="h-px flex-1 bg-line/60" />
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.signals.map((s, i) => (
                <Reveal root={scrollRef} delay={i * 0.04} key={s.title}>
                  <div className="h-full rounded-xl border border-line/80 bg-bg-base/40 p-4">
                    <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal root={scrollRef} delay={0.1} className="mt-12 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => go("ask")}
                className="group inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/15"
              >
                <Bot className="h-4 w-4" />
                Ask the assistant about my background
              </button>
              <button
                onClick={() => go("projects")}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-base/50 px-5 py-2.5 text-sm text-ink-muted transition hover:border-accent/40 hover:text-ink"
              >
                <Boxes className="h-4 w-4" />
                See the work
              </button>
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-base/50 px-5 py-2.5 text-sm text-ink-muted transition hover:border-accent/40 hover:text-ink"
              >
                <Mail className="h-4 w-4" />
                Contact
              </button>
            </Reveal>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
