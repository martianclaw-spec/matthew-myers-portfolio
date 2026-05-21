"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { philosophy, identity } from "@/lib/data/content";
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ root, once: true, amount: 0.55 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function BeatLine({
  text,
  root,
  gradient,
}: {
  text: string;
  root: React.RefObject<HTMLDivElement | null>;
  gradient?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 },
    },
  };
  const word: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 26, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.h3
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ root, once: true, amount: 0.5 }}
      className="max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            variants={word}
            className={
              gradient
                ? "inline-block bg-gradient-to-br from-ink via-ink to-accent bg-clip-text text-transparent"
                : "inline-block"
            }
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.h3>
  );
}

export function PhilosophyLayer() {
  const setPhilosophy = useOS((s) => s.setPhilosophy);
  const openModule = useOS((s) => s.openModule);
  const philosophyOpen = useOS((s) => s.philosophyOpen);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const p = philosophy;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: philosophyOpen ? 1 : 0,
        filter: philosophyOpen ? "blur(0px)" : "blur(10px)",
        pointerEvents: philosophyOpen ? "auto" : "none",
      }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-0 z-[60] bg-bg-base"
    >
      {/* Ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-floor opacity-20" />
        <div className="drift-a breathe absolute -left-20 top-10 h-[42vw] w-[42vw] rounded-full bg-accent/15 blur-[120px]" />
        <div className="drift-b breathe absolute -right-24 top-1/3 h-[40vw] w-[40vw] rounded-full bg-signal-info/12 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[36vw] w-[36vw] -translate-x-1/2 rounded-full bg-accent/8 blur-[140px]" />
      </div>

      {/* Top progress line */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left bg-accent/70"
        style={{ scaleX: progress }}
      />

      {/* Header bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
          {p.kicker}
        </span>
        <button
          onClick={() => setPhilosophy(false)}
          className="flex items-center gap-1.5 rounded-md border border-line bg-bg-elevated/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition hover:border-accent/40 hover:text-ink"
        >
          <X className="h-3.5 w-3.5" />
          close
        </button>
      </div>

      {/* Scroll narrative */}
      <div
        ref={scrollRef}
        className="grain relative h-full overflow-y-auto scroll-smooth"
      >
        {/* Scene 1 - opening */}
        <section className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-balance text-6xl font-semibold tracking-tight text-ink sm:text-8xl">
              {p.title}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-balance text-base text-ink-muted sm:text-lg">
              {p.intro}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-ink-faint"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              scroll
            </span>
            <ChevronDown className="h-4 w-4 animate-pulse-soft" />
          </motion.div>
        </section>

        {/* Scene 2 - paragraph 1 */}
        <section className="flex min-h-[90dvh] items-center justify-center px-6">
          <Reveal root={scrollRef} className="max-w-3xl">
            <p className="text-balance text-2xl font-light leading-relaxed text-ink-muted sm:text-3xl">
              {p.paragraphs.p1}
            </p>
          </Reveal>
        </section>

        {/* Scene 3 - beat 1 */}
        <section className="flex min-h-[80dvh] items-center justify-center px-6">
          <BeatLine root={scrollRef} text={p.paragraphs.beat1} />
        </section>

        {/* Scene 4 - paragraph 2 */}
        <section className="flex min-h-[90dvh] items-center justify-center px-6">
          <Reveal root={scrollRef} className="max-w-3xl">
            <p className="text-balance text-2xl font-light leading-relaxed text-ink-muted sm:text-3xl">
              {p.paragraphs.p2}
            </p>
          </Reveal>
        </section>

        {/* Scene 5 - paragraph 3 */}
        <section className="flex min-h-[90dvh] items-center justify-center px-6">
          <Reveal root={scrollRef} className="max-w-3xl">
            <p className="text-balance text-2xl font-light leading-relaxed text-ink sm:text-3xl">
              {p.paragraphs.p3}
            </p>
          </Reveal>
        </section>

        {/* Scene 6 - climactic beat */}
        <section className="flex min-h-[100dvh] items-center justify-center px-6">
          <BeatLine root={scrollRef} text={p.paragraphs.beat2} gradient />
        </section>

        {/* Scene 7 - takeaways and close */}
        <section className="flex min-h-[100dvh] flex-col items-center justify-center gap-10 px-6 pb-24">
          <Reveal root={scrollRef} className="w-full max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.takeaways.map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center"
                >
                  <p className="text-balance text-xl font-medium leading-snug text-ink sm:text-2xl">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal root={scrollRef} delay={0.1} className="text-center">
            <p className="mx-auto max-w-xl text-balance text-lg text-ink-muted">
              {p.signature}
            </p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="font-mono text-sm text-ink">{identity.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                {identity.roles[0]}
              </span>
            </div>
            <button
              onClick={() => {
                setPhilosophy(false);
                openModule("projects");
              }}
              className="group mt-9 inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/15"
            >
              See what I have built
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </section>
      </div>
    </motion.div>
  );
}
