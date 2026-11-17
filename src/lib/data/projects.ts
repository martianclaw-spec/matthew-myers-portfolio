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
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "hacktivist",
    codename: "HX-OPS",
    name: "Hacktivist Platform",
    tagline: "The operating system behind hacktivist.ai's golf and sim-racing venues",
    status: "live",
    year: "2025 to now",
    summary:
      "The platform hacktivist.ai runs on, built end to end by Matthew. Guests book a bay, pay, get a check-in code and check in at a kiosk with no front desk. Operators get leagues, gift cards, group rentals, payouts and a live control room over TrackMan golf bays and racing rigs. It has been live and earning revenue since December 2025 across five Central Pennsylvania locations, with about 925 paid bookings in its first year, and other venues (bars, hotels, golf rooms) can run their bays on it under their own name.",
    capabilities: [
      "Online booking with check-in codes and self-service kiosk check-in",
      "Stripe Connect payments, payouts, gift cards and idempotent refunds",
      "Winter leagues, group rentals and promotions run from one operator dashboard",
      "Remote control of TrackMan golf bays and racing rigs from the control room",
      "Multi-venue: host venues keep their own name while Hacktivist runs the bays",
      "Three-layer authorization: Row Level Security, table grants and definer RPCs",
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Stripe Connect"],
    metrics: [
      { label: "Venues", value: "5 live" },
      { label: "Paid bookings", value: "925+" },
      { label: "Payments", value: "Stripe Connect" },
    ],
    accent: "215 90% 64%",
    liveUrl: "https://hacktivist.ai",
  },
  {
    id: "hacktivist-racing",
    codename: "HX-RACE",
    name: "Hacktivist Racing",
    tagline: "Commercial launcher and rig control for Assetto Corsa and rFactor 2",
    status: "live",
    year: "2025 to now",
    summary:
      "The sim-racing layer of the Hacktivist platform. A lightweight agent on every rig PC holds a WebSocket to the venue server and launches, monitors and shuts down Assetto Corsa and rFactor 2 sessions, so a customer goes from kiosk to green flag with no staff touching a PC. Very few people have built a commercial launcher for these simulators. It runs offline-first, syncs 600+ cars to every rig, and survives server restarts mid-race.",
    capabilities: [
      "Rig agents launch and kill Assetto Corsa and rFactor 2 per session",
      "Kiosk flow: pick an experience, pay, and the right rig launches itself",
      "Session state persisted in SQLite with crash recovery mid-race",
      "Pull-based content sync for 600+ cars and tracks with no network shares",
      "Multi-venue hub that every site checks in with every 60 seconds",
      "Offline-first: sessions, backups and licensing run with no internet",
    ],
    stack: ["Node.js", "Express", "React", "TypeScript", "SQLite", "WebSockets", "Electron"],
    metrics: [
      { label: "Simulators", value: "AC + rF2" },
      { label: "Staff per launch", value: "Zero" },
      { label: "Resilience", value: "Offline-first" },
    ],
    accent: "265 70% 66%",
  },
  {
    id: "venue-ops-mcp",
    codename: "HX-MCP",
    name: "Venue Ops MCP",
    tagline: "An AI agent that helps run the venues, with a human on every change",
    status: "live",
    year: "2026",
    summary:
      "An MCP server over the live Hacktivist platform. Staff ask an AI agent in plain English about bookings, bay and rig status, revenue, gift cards, league sign-ups, customers and TrackMan scorecards, and it can move or cancel bookings, resend confirmations, launch races and restart kiosks. Every change goes through a prepare-then-confirm step: the tool returns a preview and nothing happens until a person says yes. A small public version is on GitHub.",
    capabilities: [
      "Read tools for bookings, revenue, bays, rigs, leagues, gift cards and customers",
      "Prepare-then-confirm actions: previews first, changes only after a human yes",
      "Race launch on empty rigs with any installed car and track",
      "Golf bay PC and kiosk control (reload, restart, update, take down)",
      "Customer email drafts that are never sent without approval",
      "Customer-written text treated as data, never as instructions",
    ],
    stack: ["TypeScript", "MCP", "Supabase", "PostgreSQL", "Claude"],
    metrics: [
      { label: "Protocol", value: "MCP" },
      { label: "Safety", value: "Human confirm" },
      { label: "Scope", value: "Live venues" },
    ],
    accent: "38 92% 58%",
    liveUrl: "https://github.com/martianclaw-spec/venue-ops-mcp",
  },
  {
    id: "martian-core",
    codename: "MC-CORE",
    name: "Martian Core",
    tagline: "The platform Matthew's other products run on",
    status: "scaling",
    year: "2026",
    summary:
      "Built at Martian Industries, Matthew's software studio. Martian Core gives every product its own Postgres schema plus logins, file storage, secrets, transactional email, hosting with deploys, uptime monitoring, website analytics and an AI phone line, all behind one SDK. It is also exposed to AI agents as an MCP server, so a new product can be stood up, wired and deployed from a conversation. More than 20 client and internal products run on it, from local business sites to a municipal platform and an AI front-desk assistant.",
    capabilities: [
      "One Postgres schema per product, with an audit log on every write",
      "Auth, storage, secrets and email behind a single SDK",
      "Hosting, deploys, uptime monitoring and analytics wired at project start",
      "Twilio AI phone line and missed-call text-back for small businesses",
      "Full MCP interface so agents can create tables, deploy and monitor",
      "Runs the 814 Builds web and AI agency's client work",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "MCP", "Twilio", "Stripe"],
    metrics: [
      { label: "Products", value: "20+" },
      { label: "Interface", value: "SDK + MCP" },
      { label: "Model", value: "Multi-project" },
    ],
    accent: "150 60% 50%",
    liveUrl: "https://martianindustries.io",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "Building",
  scaling: "Scaling",
};

export interface SideProject {
  name: string;
  detail: string;
  url: string;
}

// Smaller public work on GitHub. Production code for the Hacktivist platform
// lives in private repositories.
export const moreOnGithub: SideProject[] = [
  {
    name: "Older Than Brady",
    detail: "NFL trivia game with seeded, shareable challenge links. No backend.",
    url: "https://older-than-brady.vercel.app",
  },
  {
    name: "Fleet uptime pinger",
    detail: "GitHub Actions monitor that watches the venue fleet from outside its own hosting, built after a real outage.",
    url: "https://github.com/martianclaw-spec/simpull-uptime",
  },
  {
    name: "venue-ops-mcp (public demo)",
    detail: "A minimal public MCP server for venue operations, runnable from Claude Desktop.",
    url: "https://github.com/martianclaw-spec/venue-ops-mcp",
  },
  {
    name: "The Loft at 708",
    detail: "Client website for an event venue in Huntingdon, PA, built through 814 Builds.",
    url: "https://huntingdon-banquet-website.vercel.app",
  },
];
