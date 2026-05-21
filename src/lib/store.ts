import { create } from "zustand";
import { moduleMap, type ModuleId } from "./modules";

export interface WindowState {
  id: ModuleId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

interface OSState {
  booted: boolean;
  windows: WindowState[];
  topZ: number;
  paletteOpen: boolean;
  philosophyOpen: boolean;
  transmissionOpen: boolean;
  caseStudyOpen: string | null;
  activeProject: string | null;

  boot: () => void;
  openModule: (id: ModuleId) => void;
  setPhilosophy: (open: boolean) => void;
  setTransmission: (open: boolean) => void;
  openCaseStudy: (id: string) => void;
  closeCaseStudy: () => void;
  closeModule: (id: ModuleId) => void;
  focusModule: (id: ModuleId) => void;
  minimizeModule: (id: ModuleId) => void;
  moveModule: (id: ModuleId, x: number, y: number) => void;
  setPalette: (open: boolean) => void;
  togglePalette: () => void;
  setActiveProject: (id: string | null) => void;
}

function spawnPosition(index: number) {
  const offset = index * 32;
  return {
    x: 120 + offset,
    y: 96 + offset,
  };
}

export const useOS = create<OSState>((set, get) => ({
  booted: false,
  windows: [],
  topZ: 10,
  paletteOpen: false,
  philosophyOpen: false,
  transmissionOpen: false,
  caseStudyOpen: null,
  activeProject: null,

  boot: () => set({ booted: true }),

  setPhilosophy: (open) => set({ philosophyOpen: open }),
  setTransmission: (open) => set({ transmissionOpen: open }),
  openCaseStudy: (id) => set({ caseStudyOpen: id, paletteOpen: false }),
  closeCaseStudy: () => set({ caseStudyOpen: null }),

  openModule: (id) => {
    if (id === "philosophy") {
      set({ philosophyOpen: true, paletteOpen: false });
      return;
    }
    if (id === "transmission") {
      set({ transmissionOpen: true, paletteOpen: false });
      return;
    }
    if (id.startsWith("case:")) {
      set({ caseStudyOpen: id.slice(5), paletteOpen: false });
      return;
    }
    const { windows, topZ } = get();
    const existing = windows.find((w) => w.id === id);
    const nextZ = topZ + 1;
    if (existing) {
      set({
        topZ: nextZ,
        windows: windows.map((w) =>
          w.id === id ? { ...w, z: nextZ, minimized: false } : w,
        ),
      });
      return;
    }
    const def = moduleMap[id];
    const pos = spawnPosition(windows.length);
    const maxW = typeof window !== "undefined" ? window.innerWidth : 1440;
    const maxH = typeof window !== "undefined" ? window.innerHeight : 900;
    set({
      topZ: nextZ,
      windows: [
        ...windows,
        {
          id,
          x: Math.min(pos.x, Math.max(40, maxW - def.defaultSize.w - 40)),
          y: Math.min(pos.y, Math.max(72, maxH - def.defaultSize.h - 80)),
          w: Math.min(def.defaultSize.w, maxW - 48),
          h: Math.min(def.defaultSize.h, maxH - 140),
          z: nextZ,
          minimized: false,
        },
      ],
    });
  },

  closeModule: (id) =>
    set({ windows: get().windows.filter((w) => w.id !== id) }),

  focusModule: (id) => {
    const { windows, topZ } = get();
    const nextZ = topZ + 1;
    set({
      topZ: nextZ,
      windows: windows.map((w) =>
        w.id === id ? { ...w, z: nextZ, minimized: false } : w,
      ),
    });
  },

  minimizeModule: (id) =>
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w,
      ),
    }),

  moveModule: (id, x, y) =>
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    }),

  setPalette: (open) => set({ paletteOpen: open }),
  togglePalette: () => set({ paletteOpen: !get().paletteOpen }),
  setActiveProject: (id) => set({ activeProject: id }),
}));
