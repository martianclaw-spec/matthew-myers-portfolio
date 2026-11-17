"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, Boxes, ServerCog } from "lucide-react";
import { useOS } from "@/lib/store";
import { modules, type ModuleId } from "@/lib/modules";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

export function CommandPalette() {
  const open = useOS((s) => s.paletteOpen);
  const setPalette = useOS((s) => s.setPalette);
  const openModule = useOS((s) => s.openModule);
  const setActiveProject = useOS((s) => s.setActiveProject);
  const openCaseStudy = useOS((s) => s.openCaseStudy);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items = useMemo<CommandItem[]>(() => {
    const moduleItems: CommandItem[] = modules.map((m) => ({
      id: m.id,
      label: m.title,
      hint: m.command,
      keywords: `${m.title} ${m.short} ${m.command} ${m.description}`,
      icon: m.icon,
      run: () => openModule(m.id as ModuleId),
    }));

    const projectItems: CommandItem[] = [
      {
        id: "open-mcp",
        label: "Inspect Venue Ops MCP",
        hint: "inspect mcp",
        keywords: "mcp agent ai venue ops claude tools project",
        icon: Boxes,
        run: () => {
          openModule("projects");
          setActiveProject("venue-ops-mcp");
        },
      },
      {
        id: "case-hacktivist",
        label: "Open Hacktivist Platform case study",
        hint: "inspect hacktivist",
        keywords: "hacktivist hacktivist.ai case study venue saas golf trackman booking payments kiosk architecture inspect",
        icon: ServerCog,
        run: () => openCaseStudy("hacktivist"),
      },
      {
        id: "case-racing",
        label: "Open Hacktivist Racing case study",
        hint: "inspect racing",
        keywords: "racing sim racing assetto corsa rfactor rf2 rig launcher case study distributed realtime offline architecture inspect",
        icon: ServerCog,
        run: () => openCaseStudy("hacktivist-racing"),
      },
    ];

    return [...moduleItems, ...projectItems];
  }, [openModule, setActiveProject, openCaseStudy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.keywords.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) {
        item.run();
        setPalette(false);
      }
    } else if (e.key === "Escape") {
      setPalette(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setPalette(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl shadow-panel glass-elevated"
          >
            <div className="flex items-center gap-3 border-b border-line/70 px-4">
              <Search className="h-4 w-4 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command. Try open projects or show architecture"
                className="h-12 w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center font-mono text-xs text-ink-faint">
                  no matching command
                </div>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      item.run();
                      setPalette(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition",
                      i === active
                        ? "bg-accent/10 text-ink"
                        : "text-ink-muted hover:bg-bg-base/60",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          i === active ? "text-accent" : "text-ink-faint",
                        )}
                      />
                      <span className="text-sm">{item.label}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-faint">
                        {item.hint}
                      </span>
                      {i === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-accent" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-line/70 px-4 py-2 font-mono text-[10px] text-ink-faint">
              <span>navigate with arrows</span>
              <span>enter to run / esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
