"use client";

import { type ReactNode } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import { X, Minus, GripHorizontal } from "lucide-react";
import { useOS, type WindowState } from "@/lib/store";
import { moduleMap } from "@/lib/modules";
import { cn } from "@/lib/utils";

interface WindowFrameProps {
  win: WindowState;
  children: ReactNode;
}

export function WindowFrame({ win, children }: WindowFrameProps) {
  const def = moduleMap[win.id];
  const Icon = def.icon;
  const controls = useDragControls();

  const closeModule = useOS((s) => s.closeModule);
  const focusModule = useOS((s) => s.focusModule);
  const minimizeModule = useOS((s) => s.minimizeModule);
  const moveModule = useOS((s) => s.moveModule);

  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    void info;
    moveModule(win.id, x.get(), y.get());
  };

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragConstraints={{
        left: 8,
        top: 48,
        right: Math.max(8, window.innerWidth - win.w - 8),
        bottom: Math.max(48, window.innerHeight - 120),
      }}
      onDragEnd={onDragEnd}
      onPointerDownCapture={() => focusModule(win.id)}
      style={{ x, y, width: win.w, height: win.h, zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.9 : 1,
        filter: "blur(0px)",
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={cn(
        "absolute left-0 top-0 flex max-w-[calc(100vw-16px)] flex-col overflow-hidden rounded-xl shadow-panel glass-elevated",
      )}
    >
      <div
        onPointerDown={(e) => controls.start(e)}
        onDoubleClick={() => minimizeModule(win.id)}
        className="flex h-10 cursor-grab items-center justify-between border-b border-line/70 px-3 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-accent" />
          <span className="font-mono text-[11px] font-medium tracking-wide text-ink">
            {def.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <GripHorizontal className="mr-1 h-3.5 w-3.5 text-ink-faint" />
          <button
            onClick={() => minimizeModule(win.id)}
            className="flex h-5 w-5 items-center justify-center rounded-md text-ink-faint transition hover:bg-bg-base hover:text-signal-warn"
            aria-label="Minimize"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => closeModule(win.id)}
            className="flex h-5 w-5 items-center justify-center rounded-md text-ink-faint transition hover:bg-bg-base hover:text-red-400"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="grain min-h-0 flex-1 overflow-y-auto">{children}</div>
    </motion.div>
  );
}
