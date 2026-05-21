/**
 * Inline project reference cards for the recruiter assistant. When an answer
 * mentions a real project, the chat surfaces a small card that links back into
 * the portfolio so the assistant feels connected to the rest of the OS.
 */

export interface ProjectRef {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  // How the "Inspect project" action opens the project in the OS.
  action: { type: "case"; id: string } | { type: "project"; id: string };
}

const refs: ProjectRef[] = [
  {
    id: "simbook",
    name: "Simbook",
    description: "Multi-tenant SaaS for golf and sim racing venues: booking, payments, kiosks, and hardware orchestration.",
    tags: ["Multi-tenant", "Payments", "Security"],
    category: "Multi-tenant SaaS",
    action: { type: "case", id: "simbook" },
  },
  {
    id: "simpull",
    name: "SimPull",
    description: "Venue management OS for sim racing with realtime rig control, offline-first design, and a federated hub.",
    tags: ["Distributed", "Realtime", "Offline-first"],
    category: "Distributed systems",
    action: { type: "case", id: "simpull" },
  },
  {
    id: "golf-kiosk",
    name: "Golf Kiosk v1",
    description: "Self-service kiosk for golf bays with Simbook and Trackman workflows, QR booking, and session enforcement.",
    tags: ["Self-service", "Trackman", "White-label"],
    category: "Operational kiosk",
    action: { type: "project", id: "golf-kiosk" },
  },
];

const byId = new Map(refs.map((r) => [r.id, r]));

// Map of detectable phrases to project ids. Longer phrases first so "SimPull"
// is not shadowed by a shorter match.
const matchers: { phrase: string; id: string }[] = [
  { phrase: "golf kiosk", id: "golf-kiosk" },
  { phrase: "simpull", id: "simpull" },
  { phrase: "simbook", id: "simbook" },
];

const sourceToId: Record<string, string> = {
  "Simbook Case Study": "simbook",
  "SimPull Case Study": "simpull",
  "Golf Kiosk": "golf-kiosk",
};

export function getProjectRef(id: string): ProjectRef | undefined {
  return byId.get(id);
}

/**
 * Detect which projects an answer references, from the text and the cited
 * sources. Returns unique refs in a stable order.
 */
export function detectProjectRefs(text: string, sources: string[] = []): ProjectRef[] {
  const lower = text.toLowerCase();
  const ids = new Set<string>();

  for (const m of matchers) {
    if (lower.includes(m.phrase)) ids.add(m.id);
  }
  for (const s of sources) {
    const id = sourceToId[s];
    if (id) ids.add(id);
  }

  return refs.filter((r) => ids.has(r.id));
}
