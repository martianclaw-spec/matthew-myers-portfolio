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
  liveUrl?: string;
  // How the "Inspect project" action opens the project in the OS.
  action: { type: "case"; id: string } | { type: "project"; id: string };
}

const refs: ProjectRef[] = [
  {
    id: "hacktivist",
    name: "Hacktivist Platform",
    description: "The hacktivist.ai venue platform: booking, payments, kiosks, leagues, gift cards and TrackMan and rig control across 5 venues.",
    tags: ["Live", "Payments", "Security"],
    category: "Venue platform",
    liveUrl: "https://hacktivist.ai",
    action: { type: "case", id: "hacktivist" },
  },
  {
    id: "hacktivist-racing",
    name: "Hacktivist Racing",
    description: "Commercial launcher and rig control for Assetto Corsa and rFactor 2, with offline-first rig agents.",
    tags: ["Distributed", "Realtime", "Offline-first"],
    category: "Distributed systems",
    action: { type: "case", id: "hacktivist-racing" },
  },
  {
    id: "venue-ops-mcp",
    name: "Venue Ops MCP",
    description: "An MCP server that lets an AI agent help run the venues, with prepare-then-confirm on every change.",
    tags: ["MCP", "AI agents", "Human in the loop"],
    category: "AI tooling",
    liveUrl: "https://github.com/martianclaw-spec/venue-ops-mcp",
    action: { type: "project", id: "venue-ops-mcp" },
  },
  {
    id: "martian-core",
    name: "Martian Core",
    description: "Platform behind 20+ products: per-project Postgres, auth, storage, email, hosting, monitoring and an MCP interface.",
    tags: ["Platform", "MCP", "Multi-project"],
    category: "Internal platform",
    liveUrl: "https://martianindustries.io",
    action: { type: "project", id: "martian-core" },
  },
];

const byId = new Map(refs.map((r) => [r.id, r]));

// Map of detectable phrases to project ids. Longer phrases first so
// "Hacktivist Racing" is not shadowed by "Hacktivist".
const matchers: { phrase: string; id: string }[] = [
  { phrase: "hacktivist racing", id: "hacktivist-racing" },
  { phrase: "rfactor", id: "hacktivist-racing" },
  { phrase: "assetto corsa", id: "hacktivist-racing" },
  { phrase: "venue ops mcp", id: "venue-ops-mcp" },
  { phrase: "mcp server", id: "venue-ops-mcp" },
  { phrase: "martian core", id: "martian-core" },
  { phrase: "hacktivist", id: "hacktivist" },
];

const sourceToId: Record<string, string> = {
  "Hacktivist Platform Case Study": "hacktivist",
  "Hacktivist Racing Case Study": "hacktivist-racing",
  "Venue Ops MCP": "venue-ops-mcp",
  "Martian Core": "martian-core",
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
