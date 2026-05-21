"use client";

import { useEffect, useState } from "react";
import { Command, Activity } from "lucide-react";
import { useOS } from "@/lib/store";
import { identity, telemetry } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const toneColor: Record<string, string> = {
  ok: "bg-signal-ok",
  warn: "bg-signal-warn",
  info: "bg-signal-info",
};

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export function StatusBar() {
  const togglePalette = useOS((s) => s.togglePalette);

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-11 items-center justify-between gap-4 border-b border-line/70 px-3 sm:px-4 glass">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-tight text-ink">
            {identity.handle}
          </span>
        </div>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        {telemetry.map((t) => (
          <div key={t.id} className="flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", toneColor[t.tone])} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {t.label}
            </span>
            <span className="font-mono text-[10px] text-ink-muted">{t.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={togglePalette}
          className="group flex items-center gap-2 rounded-md border border-line bg-bg-elevated/60 px-2.5 py-1 text-ink-muted transition hover:border-accent/40 hover:text-ink"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden font-mono text-[10px] tracking-wide sm:inline">
            command
          </span>
          <kbd className="hidden rounded bg-bg-base px-1 font-mono text-[9px] text-ink-faint sm:inline">
            CTRL K
          </kbd>
        </button>
        <div className="hidden items-center gap-1.5 font-mono text-[11px] text-ink-muted sm:flex">
          <Activity className="h-3.5 w-3.5 text-accent" />
          <Clock />
        </div>
      </div>
    </header>
  );
}
