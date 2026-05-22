/**
 * Approved knowledge base for the recruiter assistant.
 *
 * This is the ONLY source of truth the assistant may use. Every snippet is
 * grounded in Matthew's real work. Do not add credentials, employment history,
 * degrees, metrics, or completed work that are not true. In-progress work is
 * described as actively developed.
 */

export interface KnowledgeSnippet {
  id: string;
  section:
    | "profile"
    | "skills"
    | "philosophy"
    | "value"
    | "projects"
    | "roles"
    | "gaps"
    | "contact";
  title: string;
  source: string;
  keywords: string[];
  text: string;
}

export const knowledgeBase: KnowledgeSnippet[] = [
  {
    id: "profile-overview",
    section: "profile",
    title: "Who Matthew is",
    source: "Profile",
    keywords: [
      "who", "what kind", "engineer", "about", "background", "matthew",
      "developer", "summary", "self-taught", "story",
    ],
    text: "Matthew Myers is an AI-native product engineer, full stack developer, and systems-oriented product thinker. He is self-taught and learned engineering by building real operational software rather than through a formal computer science degree. He came to engineering after more than ten years in sales and operations, including a Director of Sales role at a SaaS company, and he now runs Hacktivist Golf, an indoor golf and simulator venue. He builds for the kind of operation he runs day to day, so his work is unusually grounded in real operations. He works at the seam of product, operations, and infrastructure, and is most comfortable taking an idea from concept to a deployed, commercially viable system.",
  },
  {
    id: "different-from-junior",
    section: "profile",
    title: "What makes Matthew different",
    source: "Profile",
    keywords: [
      "different", "junior", "typical", "stand out", "why interview", "worth",
      "unique", "compared", "ordinary", "average",
    ],
    text: "What separates Matthew from a typical junior developer is that he thinks in systems, not just features, and he builds for commercial reality. Most juniors implement assigned tickets. Matthew architects multi-tenant SaaS, designs offline-first systems, reasons about security and blast radius, integrates payments and hardware, and ships under real production constraints. He instinctively protects production, kills scope to ship the right thing, and verifies that things actually work rather than trusting generated code.",
  },
  {
    id: "strongest-at",
    section: "value",
    title: "What Matthew is strongest at",
    source: "Profile",
    keywords: [
      "strongest", "best", "strength", "good at", "superpower", "core",
      "specialty", "great at", "excel",
    ],
    text: "Matthew is strongest at systems and operational thinking: designing how surfaces, services, data, integrations, and even physical hardware connect, and designing for failure modes and production safety. He pairs that with genuine product intuition, deciding what to build, what to defer, and why. His security and operational reasoning on real revenue-bearing systems is his standout signal, well beyond a typical self-taught background.",
  },
  {
    id: "background",
    section: "profile",
    title: "Operator background before engineering",
    source: "Operator Background",
    keywords: [
      "background", "before", "history", "career", "sales", "customer",
      "operator", "operations", "people", "communication", "nontraditional",
      "transition", "why technical", "experience before", "past",
    ],
    text: "Before writing software, Matthew spent more than ten years in sales, sales leadership, and operations. He managed retail teams at Verizon, was a top-five performer at the sales-tech startup Outreach.io, delivered financial solutions at OneMain, and rose to Director of Sales at the SaaS company Ingeniux, where he led the SDR team and helped close enterprise accounts. He also runs Hacktivist Golf, an indoor golf and simulator venue, where he launched a second location from demolition to opening. That is where his engineering started: he was living the operational friction daily, so he built the software to fix it. Simbook, SimPull, and Golf Kiosk are operator-built tools for the exact business he runs, which is why his work is operational, workflow-driven, customer-aware, and commercially grounded. The same background makes him strong at communication, leadership, and wearing many hats, which is what early-stage startups need.",
  },
  {
    id: "experience",
    section: "profile",
    title: "Work history and timeline",
    source: "Resume",
    keywords: [
      "work history", "timeline", "dates", "when", "how long", "tenure",
      "jobs", "roles", "experience", "resume", "career history", "years",
      "employment", "worked", "ingeniux", "verizon", "outreach", "onemain",
      "hacktivist", "director of sales", "leadership", "team",
    ],
    text: "Matthew's work history, most recent first: General Manager at Hacktivist Golf, an indoor golf and simulator venue, from 2023 to present, where he helped launch and operationalize a second location and runs leagues, venue operations, and customer engagement. Director of Sales at the SaaS company Ingeniux Corporation from 2021 to 2023, leading sales and marketing alignment and mentoring SDR teams. Sales Development Representative at Ingeniux from 2020 to 2021. Personal Loan Specialist at OneMain Financial from 2017 to 2020. Sales Development Representative at the SaaS startup Outreach.io from 2016 to 2017, where he ranked among the top performers. Assistant Manager at Verizon Wireless from 2013 to 2016, managing retail operations and customer experience. Education: a high school diploma from Tyrone Area School District. That is more than a decade operating in sales, SaaS, and venue operations before going deep on product engineering. His operations and business strengths include sales leadership, team leadership, cross-functional collaboration, workflow optimization, and customer operations.",
  },
  {
    id: "skills",
    section: "skills",
    title: "Technical stack",
    source: "Skills",
    keywords: [
      "stack", "technologies", "tech", "languages", "frameworks", "tools",
      "skills", "react", "node", "supabase", "postgres", "typescript",
      "next", "vite", "websocket", "stripe", "sql",
    ],
    text: "Matthew works primarily in TypeScript and React on the frontend with Next.js, Vite, Tailwind, and Zustand. On the backend he uses Node.js and Express, Supabase, and PostgreSQL, with raw SQL, Row Level Security, and SECURITY DEFINER functions. He builds realtime systems with WebSockets, integrates Stripe and Stripe Connect, works with Deno edge functions, and deploys on Vercel. He is comfortable with API integrations, OAuth concepts, workflow automation, CI with type checks, and AI-assisted development.",
  },
  {
    id: "ai-workflow",
    section: "philosophy",
    title: "How Matthew uses AI",
    source: "AI-Native Workflow",
    keywords: [
      "ai", "claude", "chatgpt", "workflow", "use ai", "force multiplier",
      "velocity", "prompt", "agent", "assisted", "leverage", "automation",
    ],
    text: "Matthew uses AI as a force multiplier, not a replacement for engineering judgment. He directs AI agents to accelerate implementation, architecture planning, prototyping, debugging, and workflow design, then applies his own judgment, domain knowledge, and verification. On SimPull he used parallel agent orchestration to build independent features simultaneously from precise specifications, and held cross-file consistency with type checks. The architecture, product decisions, risk management, and verification are his. AI multiplies throughput without owning the decisions, so he is AI-native without being AI-dependent.",
  },
  {
    id: "philosophy",
    section: "philosophy",
    title: "Why Matthew builds",
    source: "Philosophy",
    keywords: [
      "philosophy", "why build", "vision", "future", "democratizing", "ideas",
      "manifesto", "believe", "mission", "motivation",
    ],
    text: "Matthew's view is that technology used to belong mostly to the people who could build it from scratch, so only a small group could turn ideas into reality. AI changed that. Now people with vision, creativity, and systems thinking can actually build. He sees an entire generation of thinkers and operators who can finally bring their ideas to life, and he builds for that shift. He considers himself an idea-driven builder who finally has the tools to materialize what he imagines.",
  },
  {
    id: "value",
    section: "value",
    title: "What Matthew brings to a team",
    source: "What I Bring",
    keywords: [
      "bring", "team", "value", "strengths", "contribute", "why hire",
      "offer", "add", "help",
    ],
    text: "Matthew bridges product and engineering, thinks at the systems level, executes fast with a startup mentality, has strong operational UX taste, designs scalable architecture, moves with AI-native velocity, and takes end-to-end ownership of outcomes. He treats the whole system as his, from architecture and security to onboarding, deployment, and the operator experience.",
  },
  {
    id: "simbook",
    section: "projects",
    title: "Simbook",
    source: "Simbook Case Study",
    keywords: [
      "simbook", "venue", "saas", "payments", "stripe", "booking",
      "multi-tenant", "rls", "security", "golf", "kiosk", "leagues",
    ],
    text: "Simbook is a multi-tenant SaaS platform for golf and sim racing venues that collapses booking, payments, self-service kiosks, league management, and hardware orchestration into one operator surface. Matthew led a security and readiness pass to promote an audited staging build to production. He modeled authorization as three layers (Row Level Security, Postgres grants, and SECURITY DEFINER RPCs), caught six tables that had policies defined but Row Level Security disabled which left player data exposed, refactored wallet redemption into a single atomic RPC with rollback, reconciled migration drift, set up CI with a blocking type check, and moved email off a host-locked gateway to Resend. Stack: React, TypeScript, Vite, Supabase, PostgreSQL, Stripe Connect. Status: live and revenue-generating since December, now being migrated off its initial host onto a hardened, security-audited build, with email verification through Resend as the final step before the new build goes live. Simbook serves the kind of golf and simulator venue Matthew runs at Hacktivist Golf, so it is built from firsthand operational experience. The live product is at simbook.io.",
  },
  {
    id: "simpull",
    section: "projects",
    title: "SimPull",
    source: "SimPull Case Study",
    keywords: [
      "simpull", "sim racing", "distributed", "offline", "realtime", "rig",
      "assetto corsa", "hub", "agent", "websocket", "venue management",
    ],
    text: "SimPull is a venue management operating system for commercial sim racing. It runs the full session lifecycle from check-in through experience selection to launching Assetto Corsa on the right rig, then tracks, analyzes, and syncs content across a network of Windows machines. Its architecture is hub and spoke with local autonomy: each venue runs fully offline-capable with local SQLite, while a stateless central hub aggregates heartbeats from all deployments. Each rig PC runs a lightweight agent on a persistent WebSocket that launches and kills the simulator and pulls content. It uses offline HMAC license keys, a zero-dependency Stripe payment gate over raw HTTPS, and a pull-based content distribution system for 600 plus cars with no network shares. Stack: React, TypeScript, Node.js, Express, SQLite, WebSockets. Status: built and deployable, with end-to-end tests, observability, and a second venue deployment as next steps.",
  },
  {
    id: "golf-kiosk",
    section: "projects",
    title: "Golf Kiosk v1",
    source: "Golf Kiosk",
    keywords: [
      "golf kiosk", "kiosk", "trackman", "qr", "session", "white-label",
      "self-service", "bay", "extension",
    ],
    text: "Golf Kiosk v1 is a self-service kiosk for golf simulator bays. It integrates with Simbook and supports Trackman workflows, uses QR-based booking and in-session extension, enforces session limits so a bay frees up predictably, and is designed for white-label deployment across multiple locations. Stack: React, TypeScript, and API integrations. Status: scaling toward multi-location rollout. It is built for the kind of indoor golf venue Matthew operates, so it comes from real operational experience.",
  },
  {
    id: "project-status",
    section: "projects",
    title: "Current status of the projects",
    source: "Project Status",
    keywords: [
      "status", "finished", "done", "complete", "in progress", "launched",
      "current", "shipped", "live",
    ],
    text: "Matthew's projects are real systems, not demos. Simbook has been live and revenue-generating since December and is now being migrated onto a hardened, security-audited build, with email verification through Resend as the final step before the new build goes live. SimPull is fully built and deployable, with hardening and a second venue deployment as next steps. Golf Kiosk v1 is moving toward multi-location rollout. He frames in-progress work honestly.",
  },
  {
    id: "strongest-projects",
    section: "projects",
    title: "Strongest project examples",
    source: "Project Status",
    keywords: [
      "strongest project", "best project", "flagship", "examples", "portfolio",
      "show", "proof",
    ],
    text: "Matthew's strongest examples are Simbook and SimPull. Simbook shows multi-tenant SaaS, payments, and production security reasoning on a real revenue-bearing system. SimPull shows distributed systems, realtime coordination, offline-first design, and hardware orchestration. Golf Kiosk v1 adds real-world deployment and operational UX. Together they show someone who ships end to end and protects production.",
  },
  {
    id: "ideal-roles",
    section: "roles",
    title: "Roles Matthew fits",
    source: "Ideal Roles",
    keywords: [
      "role", "roles", "fit", "hire", "position", "job", "what roles",
      "title", "suited",
    ],
    text: "Matthew is a strong fit for founding engineer and early-stage product engineer roles, product engineer roles at vertical SaaS or AI-native startups, and frontend-leaning full stack roles. He thrives in fast-moving, founder-led teams where ownership, speed, and product judgment matter. He is less optimized for large rigid enterprises, heavy algorithm interview pipelines, or deep low-level infrastructure and SRE roles.",
  },
  {
    id: "startup-fit",
    section: "roles",
    title: "Fit for an early-stage startup",
    source: "Ideal Roles",
    keywords: [
      "startup", "early-stage", "founding", "seed", "series a", "good fit",
      "yc", "early stage", "small team",
    ],
    text: "For an early-stage startup, Matthew is close to an ideal first or second engineering hire. He can own a whole system, make architecture decisions, integrate payments and hardware, ship under real constraints, and use AI to move quickly without losing coherence. He thinks about commercial viability while building rather than gold-plating, and he is comfortable in ambiguity.",
  },
  {
    id: "gaps",
    section: "gaps",
    title: "Honest gaps and areas Matthew is improving",
    source: "Honest Gaps",
    keywords: [
      "gaps", "weakness", "weaknesses", "improving", "honest", "areas",
      "limitations", "downside", "lacking", "tests", "degree", "concerns",
    ],
    text: "Honest gaps: Matthew is self-taught and does not have a computer science degree or a traditional corporate engineering title. His projects currently lean light on automated test coverage and formal observability, which he is actively improving, for example by adding regression tests for security and payment paths. Some projects are still in progress rather than fully launched. Much of the deep implementation was AI-assisted under his direction, and he is upfront about what he built versus what an agent built and how he verified it.",
  },
  {
    id: "contact",
    section: "contact",
    title: "How to contact Matthew",
    source: "Contact",
    keywords: [
      "contact", "email", "reach", "hire", "linkedin", "github", "talk",
      "get in touch", "connect", "interview",
    ],
    text: "You can reach Matthew by email at Matthew@martianindustries.io. LinkedIn: linkedin.com/in/matthew-myers-91202011a. GitHub: github.com/martianclaw-spec. He is open to conversations about ambitious product and engineering roles.",
  },
];

export const systemPrompt =
  "You are the recruiter intelligence layer inside Matthew Myers' portfolio operating system. You speak to recruiters, founders, and technical leads who are evaluating Matthew. Answer using only the approved knowledge base provided in the context. Position Matthew consistently as an AI-native product engineer, a systems-oriented builder, an operational software engineer, a workflow-focused product thinker, and a startup-capable technical builder. Be intelligent, concise, grounded, confident, thoughtful, and human. Keep answers tight: usually three to five sentences, never a wall of text, and lead with the most useful point. Reference Matthew's real projects by name when relevant (Simbook, SimPull, Golf Kiosk) and ground claims in them. Do not invent credentials, employment history, degrees, metrics, or completed work. If a project is in progress, say it is actively developed. If the answer is not in the knowledge base, say you do not have that information and recommend contacting Matthew directly. Avoid hype, exaggeration, rockstar language, and default chatbot tone. Never use em dashes.";

export const openingMessage =
  "Ask me about Matthew's projects, technical strengths, AI-native workflow, or whether he would be a fit for your team.";

export interface RecruiterPrompt {
  label: string;
  question: string;
}

/**
 * Categorized prompts for evaluating Matthew through a hiring lens. Each maps
 * to a question the knowledge base can answer well.
 */
export const recruiterPrompts: RecruiterPrompt[] = [
  { label: "Startup Fit", question: "Why would Matthew fit an early-stage startup?" },
  { label: "Systems Thinking", question: "How does Matthew think about systems?" },
  { label: "Architecture", question: "What project best demonstrates architecture thinking?" },
  { label: "AI Workflow", question: "How does Matthew use AI in development?" },
  { label: "Product Engineering", question: "What makes Matthew a product engineer?" },
  { label: "Operational Systems", question: "What real-world operational systems has Matthew built?" },
  { label: "Strengths", question: "What are Matthew's strongest skills?" },
  { label: "Operator Background", question: "What is Matthew's background before engineering?" },
  { label: "Work History", question: "What is Matthew's full work history and timeline?" },
  { label: "Honest Gaps", question: "What are Matthew's honest gaps?" },
];

export const suggestedQuestions: string[] = [
  "What kind of engineer is Matthew?",
  "What has Matthew built?",
  "What is Matthew strongest at?",
  "Is Matthew a good fit for an early-stage startup?",
  "How does Matthew use AI in development?",
  "What is SimPull?",
  "What is Simbook?",
  "What technical stack does Matthew use?",
  "What makes Matthew different from a typical junior developer?",
  "What roles would Matthew be a good fit for?",
  "What are the honest gaps or areas he is improving?",
];
