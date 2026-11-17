export const identity = {
  handle: "Matthew Myers Builds",
  name: "Matthew Myers",
  roles: ["AI-Native Product Engineer", "Founder", "Technical Seller"],
  positioning:
    "Ten years selling B2B software, now building it. I built the Hacktivist platform (hacktivist.ai) that runs five golf and sim-racing venues, an Assetto Corsa and rFactor 2 launcher, and MCP servers that let AI agents help run real businesses.",
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
    "Before I wrote software, I spent more than ten years in sales, sales leadership, and operations. I managed retail teams at Verizon, was the #1 SDR in my office at the sales-tech startup Outreach.io, delivered financial solutions at OneMain, rose to Director of Sales at the SaaS company Ingeniux, and built an outbound function from scratch at Link Computer. Then I started running Hacktivist, a golf and sim-racing business that grew to five locations inside partner venues. That is where the engineering started. I was living the operational friction every day, so I built the whole platform to fix it: hacktivist.ai handles booking, payments, kiosks, leagues and gift cards, launches Assetto Corsa and rFactor 2 rigs, and has an AI agent that helps run it. Because I am the operator, my software comes out grounded in how a real venue actually works.",
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
      title: "Outreach.io, Ingeniux, Link Computer",
      body: "A decade in B2B sales and leadership: #1 SDR in his office at the sales-tech startup Outreach.io (quota in 11 of 14 months), financial solutions at OneMain, rising to Director of Sales at the SaaS company Ingeniux, where he led the SDR team and helped land Baker Hughes, then building Link Computer's outbound function from zero.",
    },
    {
      tag: "Venue Operator",
      period: "2023 to present",
      title: "Hacktivist: five golf and sim-racing venues",
      body: "Runs Hacktivist, which grew to five locations inside partner host venues across Central Pennsylvania. Launched a location from demolition to opening day and manages leagues, bookings, partnerships, staff, and permits. This is where he lived the operational friction firsthand.",
    },
    {
      tag: "Builder",
      period: "Now",
      title: "Operator-built software",
      body: "He turned that lived experience into the Hacktivist platform at hacktivist.ai: booking, payments, kiosks, TrackMan and Assetto Corsa / rFactor 2 rig control, and an MCP server so an AI agent can help run it. Through Martian Industries he also built Martian Core, the platform 20+ other products run on.",
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

export interface TransmissionBeat {
  tag: string;
  title: string;
  body: string;
}

export const transmission = {
  codename: "TX-01",
  kicker: "Personal Transmission",
  title: "From Operations To Systems",
  intro: "How a decade outside engineering became the reason I build the way I do.",
  evolution: ["Sales", "Sales Leadership", "Venue Operations", "Platform Builder", "AI-Native Founder"],
  beats: [
    {
      tag: "Nontraditional Path",
      title: "Not the usual way in",
      body: "My path into software was not traditional, and honestly that has become one of my biggest strengths. I did not learn to code to become a developer. I became technical because I wanted to bring ideas to life and build systems that improve how people actually work.",
    },
    {
      tag: "Foundation",
      title: "A decade in the real world",
      body: "Before I built software, I spent over a decade in sales, operations, customer-facing work, and startup-style roles. That taught me how businesses really operate, how people behave, where workflows break, and how much communication and usability matter.",
    },
    {
      tag: "Obsession",
      title: "Seeing the problems everywhere",
      body: "Over time I became obsessed with systems. I started seeing operational problems everywhere, and I reached a point where I did not just want to talk about better solutions. I wanted to build them myself.",
    },
    {
      tag: "Building",
      title: "From talking to building",
      body: "That led me into AI-native development and operational software. I built the Hacktivist platform that runs five venues, a commercial launcher for Assetto Corsa and rFactor 2, an MCP server that lets AI agents operate a real business with a human approving every change, and Martian Core, the platform more than 20 of my products run on.",
    },
    {
      tag: "AI-Native",
      title: "AI as leverage",
      body: "I fully embrace AI-native workflows. I believe AI is changing who gets to build technology, and I use tools like Claude and ChatGPT to prototype quickly and bring ambitious ideas to life. I also know that architecture, operational thinking, debugging, and real implementation matter far more than just generating code.",
    },
    {
      tag: "For Teams",
      title: "Why this matters on a team",
      body: "I work best in fast-moving environments where ownership, adaptability, creativity, and systems thinking matter. My background looks different from a traditional computer science path, and the combination of operational experience, product thinking, business understanding, and AI-native engineering is exactly what modern startups and product teams increasingly need.",
    },
  ] as TransmissionBeat[],
  closingLine: "Not a traditional path. That is the advantage.",
  signals: [
    { title: "Understands customers", body: "A decade close to customers taught me what people actually need." },
    { title: "Thinks operationally", body: "I see software as workflows and operations, not just features." },
    { title: "Communicates clearly", body: "I translate between business, customers, and systems." },
    { title: "Builds with business context", body: "I keep revenue, adoption, and real use in view." },
    { title: "Moves fast with AI", body: "I use AI-native workflows to go from idea to working system quickly." },
    { title: "Connects product and engineering", body: "I bridge what to build and how to build it." },
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
