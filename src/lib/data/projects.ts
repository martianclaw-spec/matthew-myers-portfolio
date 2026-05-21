export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  codename: string;
  name: string;
  tagline: string;
  status: "live" | "building" | "scaling";
  year: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  metrics: ProjectMetric[];
  accent: string;
}

export const projects: Project[] = [
  {
    id: "simpull",
    codename: "SP-VMS",
    name: "SimPull",
    tagline: "Venue management OS for sim racing",
    status: "building",
    year: "2026",
    summary:
      "A full-stack venue management system for commercial sim racing. SimPull runs the session lifecycle across a network of rig PCs: customer kiosk, real-time rig control over a WebSocket bus, content sync for 600+ cars, analytics, backups, offline license keys, and a federated multi-tenant hub. Built offline-first with zero cloud dependency for core operations.",
    capabilities: [
      "Real-time rig agents launch and kill Assetto Corsa per session",
      "Offline-first: sessions, leaderboards, backups, and licensing run with no internet",
      "Pull-based content distribution to every rig with no network shares",
      "Federated multi-tenant hub monitoring all deployed venues",
      "Zero-dependency Stripe payment gate and HMAC license keys",
      "Role-based staff portal, analytics, and automated backups",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "SQLite", "WebSockets"],
    metrics: [
      { label: "Tenancy", value: "Federated" },
      { label: "Realtime", value: "WebSocket" },
      { label: "Resilience", value: "Offline-first" },
    ],
    accent: "265 70% 66%",
  },
  {
    id: "golf-kiosk",
    codename: "GK-V1",
    name: "Golf Kiosk v1",
    tagline: "Self-service golf simulator kiosk",
    status: "scaling",
    year: "2025",
    summary:
      "A self-service kiosk that turns a golf simulator bay into an unattended retail surface. Players book, extend, and pay without staff, while the system enforces session limits and hands off cleanly to the simulator software. Designed from day one for white-label deployment across multiple locations.",
    capabilities: [
      "Simbook integration for booking and session state",
      "Trackman workflow support for live simulator handoff",
      "QR booking and in-session extension flows",
      "Session enforcement with automatic time governance",
      "White-label deployment strategy per venue brand",
      "Multi-location rollout thinking baked into config",
    ],
    stack: ["Next.js", "TypeScript", "API Integrations", "Tailwind", "Vercel"],
    metrics: [
      { label: "Model", value: "Self-serve" },
      { label: "Deploy", value: "White-label" },
      { label: "Scale", value: "Multi-site" },
    ],
    accent: "150 60% 50%",
  },
  {
    id: "simbook",
    codename: "SB-OPS",
    name: "Simbook",
    tagline: "Operational control system for simulator venues",
    status: "building",
    year: "2026",
    summary:
      "A multi-tenant SaaS platform for golf and sim-racing venues. Simbook collapses booking, payments, self-service kiosks, league management, and physical hardware orchestration into one operator surface, backed by a defense-in-depth authorization model and an atomic money path.",
    capabilities: [
      "Three surfaces: guest booking, operator dashboard, platform admin",
      "Stripe Connect payouts, per-station subscriptions, idempotent refunds",
      "Self-service kiosks with revocable per-station credentials",
      "PC-side auto-launch agent that starts and stops racing rigs",
      "Row Level Security, table grants, and definer RPCs as three layers",
      "Atomic wallet and gift-card redemption with rollback",
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Stripe Connect"],
    metrics: [
      { label: "Tenancy", value: "Multi-venue" },
      { label: "Payments", value: "Stripe Connect" },
      { label: "Hardware", value: "Auto-launch" },
    ],
    accent: "215 90% 64%",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "Building",
  scaling: "Scaling",
};
