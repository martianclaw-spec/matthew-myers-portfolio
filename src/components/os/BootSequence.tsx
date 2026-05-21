"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/store";
import { identity } from "@/lib/data/content";

const lines = [
  "initializing kernel",
  "mounting workspace runtime",
  "loading provider registry",
  "linking integration capability layer",
  "calibrating operator surface",
  "engaging ai-native systems",
];

export function BootSequence() {
  const boot = useOS((s) => s.boot);
  const booted = useOS((s) => s.booted);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setStep((s) => Math.min(s + 1, lines.length));
    }, 280);
    return () => clearInterval(lineTimer);
  }, []);

  useEffect(() => {
    const duration = 2100;
    const start = Date.now();
    // Interval drives the visual bar and is resilient to rAF throttling.
    const interval = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(pct);
    }, 60);
    // Timer is the authority for completion so boot never stalls.
    const done = setTimeout(boot, duration + 360);
    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [boot]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base aurora"
      animate={{
        opacity: booted ? 0 : 1,
        filter: booted ? "blur(8px)" : "blur(0px)",
        pointerEvents: booted ? "none" : "auto",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 grid-floor opacity-60" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-scan"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--accent) / 0.12), transparent)",
        }}
      />
      <div className="relative z-10 w-[min(440px,90vw)] px-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.5em] text-accent">
            booting
          </div>
          <h1 className="mt-3 font-mono text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {identity.handle}
          </h1>
        </motion.div>

        <div className="space-y-1.5 font-mono text-[12px]">
          {lines.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < step ? 1 : 0.15 }}
              className="flex items-center gap-2"
            >
              <span className={i < step ? "text-signal-ok" : "text-ink-faint"}>
                {i < step ? "ok" : "..."}
              </span>
              <span className="text-ink-muted">{line}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-bg-elevated">
            <motion.div
              className="h-full rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            <span>system load</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
