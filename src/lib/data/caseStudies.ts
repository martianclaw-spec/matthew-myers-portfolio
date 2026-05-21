export type NodeGroup =
  | "actor"
  | "app"
  | "service"
  | "data"
  | "hardware"
  | "integration";

export interface CaseNode {
  id: string;
  label: string;
  group: NodeGroup;
  detail: string;
  x: number;
  y: number;
}

export interface CaseEdge {
  from: string;
  to: string;
}

export interface NamedBlock {
  title: string;
  body: string;
}

export interface ProductDecision {
  title: string;
  decision: string;
  why: string;
}

export interface HighlightCard {
  tag: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  id: string;
  codename: string;
  name: string;
  positioning: string;
  summary: string;
  status: string;
  liveUrl?: string;
  tags: string[];
  tech: string[];
  stats: { label: string; value: string }[];
  problem: {
    lead: string;
    friction: NamedBlock[];
  };
  architecture: {
    intro: string;
    nodes: CaseNode[];
    edges: CaseEdge[];
    principles: NamedBlock[];
  };
  product: {
    intro: string;
    decisions: ProductDecision[];
  };
  highlights: HighlightCard[];
  ai: {
    thesis: string;
    enabled: NamedBlock[];
    judgment: NamedBlock[];
  };
  demonstrates: string[];
  roadmap: {
    status: string;
    now: string[];
    next: string[];
    horizon: string[];
  };
}

const simbook: CaseStudy = {
  id: "simbook",
  codename: "SB-OPS",
  name: "Simbook",
  positioning: "Operational control system for commercial simulator venues.",
  summary:
    "A multi-tenant SaaS platform for booking, payments, self-service kiosks, and hardware orchestration across golf bays and sim-racing rigs. One operator surface for a real, revenue-generating business.",
  status: "Production hardening",
  liveUrl: "https://simbook.io",
  tags: ["Vertical SaaS", "Multi-tenant", "Payments", "Cyber-physical", "Production"],
  tech: [
    "React",
    "TypeScript",
    "Vite",
    "Supabase",
    "PostgreSQL",
    "Stripe Connect",
    "Deno Edge Functions",
    "shadcn/ui",
  ],
  stats: [
    { label: "Tenancy", value: "Multi-venue" },
    { label: "Payments", value: "Stripe Connect" },
    { label: "Surfaces", value: "Guest / Operator / Admin" },
    { label: "Hardware", value: "Auto-launch agent" },
  ],
  problem: {
    lead: "Simulator venues run on perishable inventory and thin staff. An unbooked bay-hour is gone forever, payments have to clear online, check-in cannot depend on a front desk, and the racing rigs themselves need to start and stop without anyone babysitting a PC. Generic booking tools never reach into the hardware or sit cleanly inside a multi-sided payout flow, so the operations stay manual.",
    friction: [
      {
        title: "Perishable inventory",
        body: "Every empty bay-hour is unrecoverable revenue. Scheduling and pricing have to fill the calendar without constant manual juggling.",
      },
      {
        title: "Front-desk-free operations",
        body: "Venues run lean. Guests need to book, pay, and check in on their own, including as walk-ins, with no staff in the loop.",
      },
      {
        title: "Hardware that babysits itself",
        body: "Racing rigs must launch the right scenario at session start and shut down at the end, so the next guest always gets a clean rig.",
      },
      {
        title: "Money that has to be correct",
        body: "Online payments, wallet and gift-card credit, venue payouts, and refunds all have to reconcile with no half-completed states.",
      },
    ],
  },
  architecture: {
    intro:
      "Authorization is modeled as defense in depth, money moves through atomic boundaries, and the system is designed so the safe path is the default path. Select any node to trace how the surfaces, services, and physical rigs connect.",
    nodes: [
      { id: "guests", label: "Guests", group: "actor", x: 18, y: 9, detail: "Book logged in or as a guest, pay, redeem wallet and gift-card credit, and check in at a kiosk." },
      { id: "operators", label: "Operators", group: "actor", x: 50, y: 9, detail: "Venue dashboard for schedule, stations, pricing, payouts, customers, promos, staff, and a live Control Room." },
      { id: "admin", label: "Platform Admin", group: "actor", x: 82, y: 9, detail: "Super-admin onboarding, venue listing review, and per-station subscription billing." },
      { id: "web", label: "Web App", group: "app", x: 34, y: 30, detail: "Vite, React, and TypeScript front end with lazy-loaded routes and a staging to production environment guard." },
      { id: "kiosk", label: "Kiosk", group: "app", x: 72, y: 30, detail: "Tablet check-in for golf and racing, with revocable per-station credentials." },
      { id: "edge", label: "Edge Functions", group: "service", x: 26, y: 52, detail: "Deno functions for customer creation, walk-in confirmation, payouts, automations, and the agent heartbeat." },
      { id: "rpc", label: "RPC Boundary", group: "service", x: 52, y: 52, detail: "SECURITY DEFINER functions are the only sanctioned path to sensitive operations, with explicit execute grants." },
      { id: "agent", label: "Auto-Launch Agent", group: "hardware", x: 82, y: 52, detail: "PC-side daemon that launches and kills the sim per session, authenticated by an opt-in heartbeat key that fails safe." },
      { id: "db", label: "Postgres + RLS", group: "data", x: 42, y: 74, detail: "Row Level Security, table grants, and definer RPCs form three distinct authorization layers over multi-tenant data." },
      { id: "stripe", label: "Stripe Connect", group: "integration", x: 70, y: 74, detail: "Venue payouts, per-station subscription billing, and idempotent refunds." },
      { id: "resend", label: "Resend", group: "integration", x: 30, y: 92, detail: "Transactional and auth email moved direct to remove a single-vendor failure mode." },
      { id: "maps", label: "Google Maps", group: "integration", x: 58, y: 92, detail: "Public venue directory with map and near-me geolocation." },
    ],
    edges: [
      { from: "guests", to: "web" },
      { from: "operators", to: "web" },
      { from: "admin", to: "web" },
      { from: "web", to: "kiosk" },
      { from: "kiosk", to: "agent" },
      { from: "agent", to: "edge" },
      { from: "web", to: "edge" },
      { from: "web", to: "rpc" },
      { from: "edge", to: "rpc" },
      { from: "rpc", to: "db" },
      { from: "edge", to: "db" },
      { from: "edge", to: "stripe" },
      { from: "edge", to: "resend" },
      { from: "web", to: "maps" },
    ],
    principles: [
      { title: "Defense in depth, not one check", body: "RLS, table grants, and definer RPCs each play a distinct role. A pass caught six tables with policies defined but Row Level Security disabled, leaving player names, emails, and handicaps silently exposed. The fix enabled RLS and added scoped anon reads only for non-PII display." },
      { title: "RPC as a security boundary", body: "Account membership has no blanket insert. A least-privilege definer RPC is the only path to create an account and bind the creator as owner, and it grants owner only, never platform super admin." },
      { title: "Migration drift as operational risk", body: "A partially applied prior migration left a table with RLS on and zero policies, silently breaking an admin token UI. The reconcile migration restores the function and policy idempotently so staging and production converge." },
      { title: "Environment isolation by default", body: "Config points at staging, so a command missing its project ref lands somewhere harmless. The front end guards staging against production refs, and the cutover runbook makes the safe path the default path." },
      { title: "Atomicity in the money path", body: "Wallet and gift-card redemption moved from client-side multi-writes into a single atomic Postgres function, with a rollback that reverses redemptions if the booking fails." },
      { title: "Search-path hardening", body: "SET search_path = public on every definer function closes a known privilege-escalation vector, including the one function that was missing it." },
    ],
  },
  product: {
    intro:
      "Every surface was shaped by a question about the operator's day and the funnel's drop-off, not by a feature list. The decisions below are where product judgment did the heavy lifting.",
    decisions: [
      { title: "Free to set up, pay to publish", decision: "Signup, the full wizard, stations, pricing, and Stripe Connect are all free. Money is asked for only when the venue is ready to operate.", why: "It optimizes time to value and removes the friction that kills self-serve funnels." },
      { title: "Resumable onboarding", decision: "Progress persists so a prospect can leave and return without losing their place in the wizard.", why: "Real funnels are not completed in one sitting, so the flow has to survive interruption." },
      { title: "Keep the white-glove path", decision: "Sales-led super-admin onboarding stays in place as the we will set it up for you option.", why: "Self-serve is additive to an existing sales motion, not a replacement for it." },
      { title: "Know when not to build", decision: "Tap to Pay was deferred because the hardware is not in place. It is marked coming soon with a documented spec.", why: "Scope-killing is as much a senior instinct as scope-adding." },
      { title: "Operator experience first", decision: "Kiosk check-in, hands-free rig launch, and a live Control Room center the operator's daily reality.", why: "Adoption depends on the operator's day, not on the length of the feature list." },
      { title: "Privacy as UX", decision: "League standings stay public while player emails and handicaps are closed off.", why: "Two constraints held at once: useful in public and safe by default." },
    ],
  },
  highlights: [
    { tag: "Security", title: "Three-layer authorization", body: "RLS, Postgres table grants, and SECURITY DEFINER RPCs each play a distinct role. Knowing which layer a failure belongs to turns permission denied into a precise fix." },
    { tag: "Security", title: "The unenforced-policy catch", body: "Six tables carrying names, emails, and handicaps had policies defined but Row Level Security disabled, leaving them silently open. Enabling RLS with scoped reads closed the exposure without breaking the public page." },
    { tag: "Payments", title: "Atomic redemption RPC", body: "Wallet and gift-card redemption moved into one atomic Postgres function with rollback, removing a client-side multi-write race in the payment path." },
    { tag: "Payments", title: "Stripe Connect money flow", body: "Venue payouts, per-station subscription billing, and idempotent refunds, with walk-in sessions verified against Stripe before they confirm." },
    { tag: "Realtime", title: "Hardware auto-launch agent", body: "A PC-side daemon launches the right scenario at session start and shuts it down at the end, authenticated by an opt-in heartbeat key that fails safe." },
    { tag: "Orchestration", title: "Edge function surface", body: "Deno functions handle customer creation, walk-in confirmation, payouts, automations, and the agent heartbeat, with JWT verification configured per function." },
    { tag: "Deployment", title: "Default-safe cutover", body: "An environment guard and a runbook make staging the default target and backups a precondition, so a mistake lands in the harmless place." },
    { tag: "Reliability", title: "Removing a single vendor", body: "Automations and auth email moved direct to Resend to remove a host-locked email gateway as a failure mode." },
    { tag: "Tooling", title: "CI as a gate", body: "GitHub Actions runs a blocking typecheck and build, with a secret-gated edge-function test job, so broken code does not advance." },
  ],
  ai: {
    thesis:
      "AI is a force multiplier for execution, not a substitute for judgment. The engineering reasoning was surfaced fast through an agent, while the product judgment, domain grounding, risk management, and final decisions stayed with the operator.",
    enabled: [
      { title: "Velocity on breadth", body: "Around a dozen migrations, multiple edge-function deploys, CI setup, type regeneration, and a self-serve funnel inside one compressed window." },
      { title: "A deploy bridge", body: "SQL applied through the database editor via browser automation, working around real obstacles like editor auto-closing and destructive-operation confirmations." },
      { title: "Live verification loops", body: "Changes checked as the anonymous role and through UI smoke tests, not just confirmed to compile." },
    ],
    judgment: [
      { title: "Domain grounding", body: "The racing-rig reality and which flows actually matter for a golf launch came from the operator, not the agent." },
      { title: "Risk and sequencing", body: "The constraint do not disrupt the live site shaped every decision and every order of operations." },
      { title: "Saying no", body: "Tap to Pay and the later self-serve phases were deferred on purpose, with rationale documented." },
      { title: "Verification as the gate", body: "Insisting that guest booking and kiosk flows actually work before trusting generated code." },
    ],
  },
  demonstrates: [
    "Operates at the seam of product, operations, and infrastructure.",
    "Thinks in blast radius and instinctively protects production.",
    "Treats PII exposure and access control as launch blockers, not afterthoughts.",
    "Kills scope to ship the right thing now.",
    "Builds for adoption and activation, not just function.",
    "Directs an agent across database, edge functions, CI, and UI while keeping the system coherent.",
  ],
  roadmap: {
    status:
      "Actively developed. The build is security-audited on staging, with the production cutover in progress under a strict do-not-disrupt constraint.",
    now: [
      "Resolve the auth email blocker and complete the production cutover.",
      "Move real customers onto the hardened build.",
    ],
    next: [
      "Add an RLS and permissions regression test suite.",
      "Automate the anonymous-role security checks.",
      "Publish an architecture post-mortem in the author's own voice.",
    ],
    horizon: [
      "Self-serve onboarding phases three through five.",
      "Tap to Pay once the hardware is in place.",
      "Deeper Control Room telemetry for live venue state.",
    ],
  },
};

const simpull: CaseStudy = {
  id: "simpull",
  codename: "SP-VMS",
  name: "SimPull",
  positioning: "Venue management operating system for commercial sim racing.",
  summary:
    "The operational layer between the rigs, the customers, and the staff. SimPull runs the full session lifecycle from check-in through experience selection to launching Assetto Corsa on the right rig, then tracks, analyzes, and syncs everything across a network of Windows machines, online or off.",
  status: "Actively developed",
  tags: [
    "Vertical SaaS",
    "Distributed systems",
    "Realtime",
    "Offline-first",
    "Cyber-physical",
    "Multi-tenant",
  ],
  tech: [
    "React",
    "TypeScript",
    "Vite",
    "Node.js",
    "Express",
    "SQLite",
    "WebSockets",
    "Stripe",
  ],
  stats: [
    { label: "Tenancy", value: "Federated hub" },
    { label: "Realtime", value: "WebSocket bus" },
    { label: "Resilience", value: "Offline-first" },
    { label: "Hardware", value: "Rig agents" },
  ],
  problem: {
    lead: "Commercial sim racing venues have no purpose-built software. Most run manual workflows where a staff member physically walks to a rig to launch a game, or they bolt together generic booking tools that know nothing about the simulator. Every idle rig is lost revenue and every confused customer is churn. SimPull replaces that whole operational gap with one integrated system that still works when the internet does not.",
    friction: [
      { title: "Idle rigs burn revenue", body: "A bay sitting empty is unrecoverable. The session lifecycle has to be fast, self-service, and automatic." },
      { title: "Staff babysitting machines", body: "Manually launching and resetting games per customer is labor that should not exist. The system should do it." },
      { title: "The internet is not guaranteed", body: "A venue cannot stop operating because its connection dropped. Core functions have to run fully offline." },
      { title: "Content lives on many machines", body: "Hundreds of cars and tracks have to stay in sync across every rig PC without fragile network shares." },
    ],
  },
  architecture: {
    intro:
      "The guiding idea is hub and spoke with local autonomy. Each venue runs as a fully self-contained system with no internet dependency for any core function, while a central hub adds optional telemetry across every deployment. Select a node to trace the surfaces, the realtime bus, the rigs, and the integrations.",
    nodes: [
      { id: "customers", label: "Customers", group: "actor", x: 16, y: 8, detail: "Walk-up and booked drivers who tap through the kiosk and look up their times on any device." },
      { id: "staff", label: "Staff", group: "actor", x: 48, y: 8, detail: "Operators working the floor through a role-based portal: admin, manager, and staff with individual PINs." },
      { id: "hubnet", label: "Multi-venue Hub", group: "actor", x: 84, y: 8, detail: "A central hub each venue phones home to every 60 seconds, with an online and offline dashboard across all deployed installations." },
      { id: "kiosk", label: "Kiosk", group: "app", x: 30, y: 28, detail: "Idle to experience selection to payment to launch. The customer journey runs as a clean state machine." },
      { id: "portal", label: "Staff + Driver Portal", group: "app", x: 66, y: 28, detail: "Role-based staff tooling plus a public driver portal for lap times, leaderboards, and analytics." },
      { id: "server", label: "Venue Server", group: "service", x: 40, y: 48, detail: "Node and Express core with focused service modules for analytics, backups, licensing, content sync, and multiplayer." },
      { id: "ws", label: "WebSocket Bus", group: "service", x: 72, y: 48, detail: "Typed command messages flow from server to rigs, and live status flows back, in real time." },
      { id: "db", label: "SQLite", group: "data", x: 24, y: 70, detail: "Local better-sqlite3 persistence for sessions, leaderboard, drivers, staff, and config, with daily backups and 14-backup retention." },
      { id: "agent", label: "Rig Agents", group: "hardware", x: 58, y: 70, detail: "A lightweight agent on each rig PC holds a persistent socket, launches and kills Assetto Corsa, and pulls content." },
      { id: "ac", label: "Assetto Corsa", group: "hardware", x: 84, y: 70, detail: "The simulator process, launched into the right scenario and shut down on session end or booking expiry." },
      { id: "content", label: "Content Drive", group: "integration", x: 44, y: 91, detail: "An external drive of 600+ cars and tracks, zipped on demand and distributed to every rig over the network." },
      { id: "stripe", label: "Stripe", group: "integration", x: 18, y: 91, detail: "Payment gate in the kiosk flow over raw HTTPS, with no payment SDK in the dependency tree." },
      { id: "simbook", label: "Simbook", group: "integration", x: 70, y: 91, detail: "Bidirectional handoff: Simbook checks the customer in, hands the tablet to SimPull, and reclaims it when booked time expires." },
    ],
    edges: [
      { from: "customers", to: "kiosk" },
      { from: "staff", to: "portal" },
      { from: "hubnet", to: "server" },
      { from: "kiosk", to: "server" },
      { from: "portal", to: "server" },
      { from: "server", to: "ws" },
      { from: "server", to: "db" },
      { from: "ws", to: "agent" },
      { from: "agent", to: "ac" },
      { from: "server", to: "content" },
      { from: "content", to: "agent" },
      { from: "server", to: "stripe" },
      { from: "server", to: "simbook" },
    ],
    principles: [
      { title: "Hub and spoke with local autonomy", body: "Each venue runs standalone. Sessions launch, leaderboards persist, backups run, and licenses validate entirely offline. The central hub is additive telemetry, never a dependency." },
      { title: "The rig agent as a command bus", body: "Each rig PC runs a lightweight agent on a persistent socket. The server sends typed commands and the agent owns the machine, launching and killing Assetto Corsa and pulling content. Adding a rig is install the agent and point it at the server." },
      { title: "Offline-first licensing", body: "HMAC-SHA256 keys encode venue, expiry, tier, and rig limit, validated with a shared secret and no network call. A trial mode with a two-rig limit means zero friction to start." },
      { title: "Content distribution without network shares", body: "The server zips content on demand with mtime-based caching and serves it over HTTP. Each rig pulls and extracts into the right paths, so sync works on any network with no configuration." },
      { title: "Multi-tenant by federation", body: "Venues register and send heartbeats to a stateless hub. Each venue owns its data, and the product company gets visibility across hundreds of installs from a small server." },
      { title: "Dependency restraint", body: "Stripe over raw HTTPS, content zipping over PowerShell, license validation over the built-in crypto module. Every dependency not added is one fewer failure mode in production." },
    ],
  },
  product: {
    intro:
      "Every surface was designed around how a venue actually runs a floor, not how a game is configured. The decisions below come from the operator's reality.",
    decisions: [
      { title: "Experience first, not game first", decision: "The kiosk leads with the experience, an F1 race or a drift session, and configures the simulator underneath.", why: "It hides software complexity behind the language of the activity the customer came for." },
      { title: "Two kill conditions per session", decision: "A session ends by laps or by elapsed time, whichever comes first, and a booking expiry can end it mid-race.", why: "Real venue time is finite, so the system has to reclaim a rig predictably." },
      { title: "The idle screen as a boundary", decision: "A blanking screen signals a rig is ready, then walks the customer from selection to session and back to idle.", why: "Clear state transitions make a self-service floor legible to a walk-up customer." },
      { title: "Trial mode with an upgrade path", decision: "Two rigs run with no license key, with a clear tier comparison built into the product.", why: "A venue can prove the value on its own setup before paying." },
      { title: "Last-admin delete protection", decision: "Staff accounts are role-based, and the system refuses to delete the final admin.", why: "It designs against a real failure mode: locking the whole venue out of its own tools." },
      { title: "A shared-surface handoff with Simbook", decision: "The tablet moves from Simbook check-in to SimPull selection to an in-session dash and back, with defined callbacks.", why: "A real commercial partnership needs a protocol for who owns the screen, not a one-way webhook." },
    ],
  },
  highlights: [
    { tag: "Realtime", title: "Rig agent architecture", body: "Lightweight Node agents on each Windows PC hold persistent sockets, manage the Assetto Corsa process lifecycle, and respond to typed command messages. This is practical distributed systems work." },
    { tag: "Resilience", title: "Offline-first by design", body: "Local SQLite, offline license validation, and standalone operation when the hub is unreachable. The venue keeps running when the connection does not." },
    { tag: "Orchestration", title: "Content distribution system", body: "An mtime-cached, pull-based pipeline zips 600+ cars and tracks on demand and extracts them on every rig, with per-rig progress and no network shares required." },
    { tag: "Architecture", title: "Federated multi-tenant hub", body: "Each venue phones home every 60 seconds to a stateless hub with an online and offline dashboard across all deployments, preserving each venue's autonomy." },
    { tag: "Payments", title: "Zero-dependency Stripe", body: "A full kiosk payment gate built on the Node HTTPS module and URLSearchParams, with no payment SDK in the dependency tree." },
    { tag: "Hardware", title: "Process and multiplayer control", body: "Launching and killing AC and a dedicated acServer, joining rigs via race.ini injection, and a watchdog that handles reconnection." },
    { tag: "Operations", title: "Production data management", body: "Automatic daily SQLite backups with labeled manual snapshots and 14-backup retention, sized to a real two-week recovery window." },
    { tag: "Deployment", title: "Ten-minute install", body: "An install script and a single-click start with a git pull update path get a new venue running fast on a clean Windows machine." },
    { tag: "Security", title: "Offline license keys", body: "HMAC-SHA256 keys encode venue, tier, expiry, and rig limit, validated locally with a shared secret and no server round trip." },
  ],
  ai: {
    thesis:
      "AI multiplied throughput here without owning the decisions. The architecture, the product calls, the debugging, and the commercial thinking were human. The agent workflow turned a large feature surface into a single build window.",
    enabled: [
      { title: "Parallel agent orchestration", body: "Independent features like the hub server, the venue client, and the hub dashboard were specified as separate briefs and built in parallel, then synthesized into one coherent system." },
      { title: "Specification as the force multiplier", body: "Precise briefs with concrete function signatures and timeouts produced working services. The skill was translating product intent into exact technical specs." },
      { title: "Verification as a habit", body: "Cross-file TypeScript consistency was held with a no-emit type check, and bugs were diagnosed at root cause rather than worked around." },
    ],
    judgment: [
      { title: "Architecture calls", body: "Federated hub over a cloud rewrite, offline keys over server validation, raw HTTPS over an SDK. These reflect a coherent offline-first philosophy." },
      { title: "Knowing the failure modes", body: "Designing for dropped connections, partial downloads, and a venue with no internet came from understanding real deployments." },
      { title: "Product reasoning", body: "Experience-first UX, two kill conditions, and the Simbook handoff are product decisions, not generated requirements." },
      { title: "Diagnosis over patching", body: "Port conflicts, a void-expression type error, and a clean-machine install bug were each traced to the underlying mechanism." },
    ],
  },
  demonstrates: [
    "Thinks in systems, not features: every capability ships with inputs, outputs, and failure modes.",
    "Understands the full stack operationally, from Windows process control to network topology to UI.",
    "Builds for commercial reality with licensing, trials, backups, and zero-friction deployment.",
    "Translates product intent into precise technical contracts in real time.",
    "Defaults to offline-capable, dependency-minimal, operationally durable designs.",
    "Is AI-native without being AI-dependent: amplified throughput, human judgment.",
  ],
  roadmap: {
    status:
      "Actively developed. The full system is built and deployable, with hardening and a second venue deployment as the next proof points.",
    now: [
      "Wire the Simbook integration end to end against a live API.",
      "Deploy to a second venue to prove the federated model in practice.",
    ],
    next: [
      "Add end-to-end tests for the session lifecycle.",
      "Add structured logging and a frontend error boundary strategy.",
      "Harden multiplayer rig-join under Windows file locks.",
    ],
    horizon: [
      "Package the kiosk via Electron or a PWA.",
      "Deeper hub telemetry and cross-venue analytics.",
      "License secret rotation for already-deployed keys.",
    ],
  },
};

export const caseStudies: Record<string, CaseStudy> = {
  simbook,
  simpull,
};

export const groupColor: Record<NodeGroup, string> = {
  actor: "175 70% 52%",
  app: "215 90% 64%",
  service: "265 70% 66%",
  data: "150 60% 50%",
  hardware: "38 92% 58%",
  integration: "200 18% 62%",
};

export const groupLabel: Record<NodeGroup, string> = {
  actor: "Actor",
  app: "Surface",
  service: "Service",
  data: "Data",
  hardware: "Hardware",
  integration: "Integration",
};
