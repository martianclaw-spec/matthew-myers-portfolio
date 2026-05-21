import {
  LayoutDashboard,
  Boxes,
  Network,
  Sparkles,
  Trophy,
  Cpu,
  Mail,
  Telescope,
  ServerCog,
  Gauge,
  type LucideIcon,
} from "lucide-react";

export type ModuleId =
  | "overview"
  | "philosophy"
  | "projects"
  | "case:simbook"
  | "case:simpull"
  | "architecture"
  | "ai"
  | "value"
  | "skills"
  | "contact";

export interface ModuleDef {
  id: ModuleId;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  command: string;
  defaultSize: { w: number; h: number };
}

export const modules: ModuleDef[] = [
  {
    id: "overview",
    title: "System Overview",
    short: "Overview",
    description: "Identity, positioning, and operating principles.",
    icon: LayoutDashboard,
    command: "open overview",
    defaultSize: { w: 760, h: 560 },
  },
  {
    id: "philosophy",
    title: "The Shift",
    short: "Philosophy",
    description: "Why this moment matters, and why I build.",
    icon: Telescope,
    command: "open philosophy",
    defaultSize: { w: 0, h: 0 },
  },
  {
    id: "projects",
    title: "Projects Explorer",
    short: "Projects",
    description: "Inspect shipped and in-flight systems.",
    icon: Boxes,
    command: "open projects",
    defaultSize: { w: 880, h: 620 },
  },
  {
    id: "case:simbook",
    title: "Case Study: Simbook",
    short: "Simbook",
    description: "Multi-tenant venue SaaS systems breakdown.",
    icon: ServerCog,
    command: "open simbook case study",
    defaultSize: { w: 0, h: 0 },
  },
  {
    id: "case:simpull",
    title: "Case Study: SimPull",
    short: "SimPull",
    description: "Distributed sim racing venue OS breakdown.",
    icon: Gauge,
    command: "open simpull case study",
    defaultSize: { w: 0, h: 0 },
  },
  {
    id: "architecture",
    title: "Architecture Map",
    short: "Architecture",
    description: "How the systems connect end to end.",
    icon: Network,
    command: "show architecture",
    defaultSize: { w: 860, h: 620 },
  },
  {
    id: "ai",
    title: "AI-Native Workflow",
    short: "AI Workflow",
    description: "AI as leverage across the build lifecycle.",
    icon: Sparkles,
    command: "open ai workflow",
    defaultSize: { w: 780, h: 580 },
  },
  {
    id: "value",
    title: "What I Bring",
    short: "Value",
    description: "What I contribute to a team.",
    icon: Trophy,
    command: "open value",
    defaultSize: { w: 820, h: 580 },
  },
  {
    id: "skills",
    title: "Skills and Stack",
    short: "Skills",
    description: "Tools and capabilities in active use.",
    icon: Cpu,
    command: "open skills",
    defaultSize: { w: 760, h: 580 },
  },
  {
    id: "contact",
    title: "Contact",
    short: "Contact",
    description: "Open a channel.",
    icon: Mail,
    command: "contact matthew",
    defaultSize: { w: 640, h: 520 },
  },
];

export const moduleMap: Record<ModuleId, ModuleDef> = modules.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<ModuleId, ModuleDef>,
);
