export const identity = {
  handle: "Matthew Myers Builds",
  name: "Matthew Myers",
  roles: ["AI-Native Product Engineer", "Full Stack Developer", "Systems Builder"],
  positioning:
    "I build operational software systems, workflow-driven SaaS products, and AI-native product experiences.",
  email: "Matthew@martianindustries.io",
  linkedin: "https://linkedin.com/in/matthew-myers-91202011a",
  github: "https://github.com/martianclaw-spec",
};

export interface WorkflowStep {
  id: string;
  label: string;
  detail: string;
}

export const aiWorkflow = {
  thesis:
    "AI is leverage, not a replacement for engineering judgment. I use it to compress the distance between an idea and a working system, then apply the same architectural rigor I always would.",
  steps: [
    { id: "iteration", label: "Product Iteration", detail: "Move from concept to working surface in hours, then refine against real use." },
    { id: "architecture", label: "Architecture Planning", detail: "Pressure-test system designs and trade-offs before committing to code." },
    { id: "prototyping", label: "Prototyping", detail: "Stand up credible prototypes fast to validate the product direction." },
    { id: "implementation", label: "Implementation Speed", detail: "Ship typed, maintainable code at startup velocity." },
    { id: "debugging", label: "Debugging", detail: "Isolate root causes quickly and reason through complex failure modes." },
    { id: "workflow", label: "Workflow Design", detail: "Model operations as declarative workflows that scale with the product." },
  ] as WorkflowStep[],
};

export const philosophy = {
  kicker: "Why I Build",
  title: "The Shift",
  intro: "A short manifesto on this moment, and why it matters.",
  paragraphs: {
    p1: "Technology used to belong mostly to the people who knew how to build it from scratch. The world we live in today was shaped by a small group of highly technical founders and engineers who had the ability to turn ideas into reality while most people could only imagine them.",
    beat1: "AI changed that.",
    p2: "Now people with vision, creativity, systems thinking, and real ideas finally have access to the tools needed to build. You no longer need to be a world-class engineer to create meaningful products, solve problems, or make an impact.",
    p3: "For the first time, there's an entire generation of thinkers, operators, and innovators who can actually bring their ideas to life.",
    beat2: "That shift is going to change everything.",
  },
  takeaways: [
    "AI is democratizing creation.",
    "People with ideas can finally build.",
  ],
  signature:
    "I build for that generation, and alongside the people who feel it too.",
};

export interface ValueCard {
  id: string;
  title: string;
  detail: string;
}

export const teamValue: ValueCard[] = [
  { id: "bridge", title: "Product and Engineering Bridge", detail: "I translate product intent into systems and systems back into product reality." },
  { id: "systems", title: "Systems-Level Thinking", detail: "I design for the whole graph: surfaces, services, data, and how they evolve." },
  { id: "execution", title: "Fast Execution", detail: "I close the gap between decision and shipped software without losing quality." },
  { id: "startup", title: "Startup Mentality", detail: "I operate with urgency, scope discipline, and a bias toward shipping." },
  { id: "ux", title: "Operational UX Taste", detail: "I build interfaces operators actually want to live in every day." },
  { id: "scalable", title: "Scalable Architecture", detail: "I make early decisions that hold up as the product and team grow." },
  { id: "velocity", title: "AI-Native Velocity", detail: "I use AI as a force multiplier across the entire build lifecycle." },
  { id: "ownership", title: "Ownership Mindset", detail: "I take a problem end to end and treat the outcome as mine." },
];

export interface BackgroundPhase {
  tag: string;
  period: string;
  title: string;
  body: string;
}

export const operatorBackground = {
  kicker: "Operator Background",
  headline:
    "My technical ability grew out of a desire to solve real operational and human problems.",
  narrative:
    "Before I wrote software, I spent more than ten years in sales, sales leadership, and operations. I managed retail teams at Verizon, ranked among the top performers at the sales-tech startup Outreach.io, delivered financial solutions at OneMain, and rose to Director of Sales at the SaaS company Ingeniux. Today I also run Hacktivist Golf, an indoor golf and simulator venue, where I launched a second location from demolition to opening day. That is where the engineering started. I was living the operational friction every day, so I built the software to fix it. Simbook, SimPull, and Golf Kiosk are operator-built tools for the exact business I run, which is why my software comes out operational, workflow-driven, and grounded in how a real venue actually works.",
  phases: [
    {
      tag: "Retail Leadership",
      period: "2013 to 2016",
      title: "Verizon Wireless",
      body: "Fast-tracked to assistant manager in under two months and helped launch and run new retail locations across Pennsylvania, managing staff, customer experience, and record product-launch sales.",
    },
    {
      tag: "SaaS Sales",
      period: "2016 to 2024",
      title: "Outreach.io to Ingeniux",
      body: "A decade in B2B sales and leadership: a top-five performer at the sales-tech startup Outreach.io, financial solutions at OneMain, and rising to Director of Sales at the SaaS company Ingeniux, where he led the SDR team, built outreach systems, and helped close enterprise accounts.",
    },
    {
      tag: "Venue Operator",
      period: "2023 to present",
      title: "General Manager, Hacktivist Golf",
      body: "Runs an indoor golf and simulator venue. Launched a second location from demolition to opening day and manages leagues, bookings, food and beverage, staff, and permit compliance. This is where he lived the operational friction firsthand.",
    },
    {
      tag: "Builder",
      period: "Now",
      title: "Operator-built software",
      body: "He turned that lived experience into software for the exact domain he operates: Simbook, SimPull, and Golf Kiosk. Because he is the operator, the systems are grounded in how a venue actually runs.",
    },
  ] as BackgroundPhase[],
  strengths: [
    { title: "Customer empathy", body: "Years carrying a sales quota taught me to hear what people actually need, not just what they ask for." },
    { title: "Workflow fluency", body: "I have lived operational friction on a real venue floor, so I design software to remove it." },
    { title: "Clear communication", body: "A decade in sales and leadership made me fluent at translating between customers, business goals, and systems." },
    { title: "Operational awareness", body: "I run a venue, so I understand how scheduling, bookings, staff, and a transaction actually work." },
    { title: "Problem identification", body: "I find the real problem worth solving, not just the obvious one." },
    { title: "Ownership", body: "From carrying a quota to launching a location, I own outcomes, not just tasks." },
    { title: "Versatility", body: "I have sold, led teams, run food and beverage, handled permits, and shipped software. Startups need that range." },
    { title: "Commercial grounding", body: "I build with revenue, adoption, and real use in mind, because I have carried the number." },
  ],
  engineeringAdds: [
    "I design interfaces operators actually want to live in.",
    "I model software around real workflows, not idealized ones.",
    "I prioritize the friction that actually costs time and money.",
    "I keep the customer and the business in view while making technical calls.",
  ],
};

export interface TelemetrySignal {
  id: string;
  label: string;
  value: string;
  tone: "ok" | "warn" | "info";
}

export const telemetry: TelemetrySignal[] = [
  { id: "uptime", label: "System", value: "Operational", tone: "ok" },
  { id: "mode", label: "Mode", value: "AI-Native", tone: "info" },
  { id: "build", label: "Build", value: "Production", tone: "ok" },
  { id: "latency", label: "Velocity", value: "High", tone: "info" },
];
