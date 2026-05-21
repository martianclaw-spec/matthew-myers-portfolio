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
