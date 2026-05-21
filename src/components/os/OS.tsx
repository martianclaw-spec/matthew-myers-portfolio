"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useOS } from "@/lib/store";
import { BootSequence } from "./BootSequence";
import { StatusBar } from "./StatusBar";
import { Dock } from "./Dock";
import { CommandPalette } from "./CommandPalette";
import { WindowFrame } from "./WindowFrame";
import { ModuleRenderer } from "./ModuleRenderer";
import { DesktopIdle } from "./DesktopIdle";
import { PhilosophyLayer } from "./PhilosophyLayer";
import { CaseStudyLayer } from "./CaseStudyLayer";

export function OS() {
  const [mounted, setMounted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const [renderPhilosophy, setRenderPhilosophy] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const booted = useOS((s) => s.booted);
  const windows = useOS((s) => s.windows);
  const togglePalette = useOS((s) => s.togglePalette);
  const setPalette = useOS((s) => s.setPalette);
  const philosophyOpen = useOS((s) => s.philosophyOpen);
  const setPhilosophy = useOS((s) => s.setPhilosophy);
  const caseStudyOpen = useOS((s) => s.caseStudyOpen);
  const closeCaseStudy = useOS((s) => s.closeCaseStudy);

  useEffect(() => setMounted(true), []);

  // Remove the boot overlay on a timer so it never blocks interaction even if
  // the exit animation is throttled by the browser.
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => setShowBoot(false), 540);
    return () => clearTimeout(t);
  }, [booted]);

  // Mount immediately on open, unmount on a timer after close so the exit
  // fade can play without the layer ever getting stuck and blocking the OS.
  useEffect(() => {
    if (philosophyOpen) {
      setRenderPhilosophy(true);
      return;
    }
    const t = setTimeout(() => setRenderPhilosophy(false), 620);
    return () => clearTimeout(t);
  }, [philosophyOpen]);

  // Keep the case study mounted through its close fade, then unmount.
  useEffect(() => {
    if (caseStudyOpen) {
      setCaseId(caseStudyOpen);
      return;
    }
    const t = setTimeout(() => setCaseId(null), 620);
    return () => clearTimeout(t);
  }, [caseStudyOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape") {
        setPalette(false);
        setPhilosophy(false);
        closeCaseStudy();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePalette, setPalette, setPhilosophy, closeCaseStudy]);

  if (!mounted) {
    return <div className="fixed inset-0 bg-bg-base" />;
  }

  const visibleWindows = windows.filter((w) => !w.minimized);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-bg-base">
      <div className="pointer-events-none absolute inset-0 aurora" />
      <div className="pointer-events-none absolute inset-0 grid-floor" />

      {showBoot && <BootSequence />}

      {booted && (
        <>
          <StatusBar />

          <main className="absolute inset-0 pt-11">
            {windows.length === 0 && <DesktopIdle />}
            <AnimatePresence>
              {windows.map((win) => (
                <WindowFrame key={win.id} win={win}>
                  <ModuleRenderer id={win.id} />
                </WindowFrame>
              ))}
            </AnimatePresence>
            {windows.length > 0 && visibleWindows.length === 0 && (
              <DesktopIdle />
            )}
          </main>

          <Dock />
          <CommandPalette />
          {renderPhilosophy && <PhilosophyLayer />}
          {caseId && <CaseStudyLayer id={caseId} />}
        </>
      )}
    </div>
  );
}
