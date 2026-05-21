export interface ArchNode {
  id: string;
  label: string;
  detail: string;
  layer: number;
  x: number;
  y: number;
}

export interface ArchEdge {
  from: string;
  to: string;
}

// Coordinates are percentages of the canvas.
export const archNodes: ArchNode[] = [
  { id: "operator", label: "Operator UX", detail: "The single command surface operators live in daily.", layer: 0, x: 50, y: 8 },
  { id: "frontend", label: "Frontend", detail: "Next.js App Router, React, typed component system.", layer: 1, x: 22, y: 30 },
  { id: "workflows", label: "Workflows", detail: "Declarative operations that drive product behavior.", layer: 1, x: 50, y: 30 },
  { id: "ai", label: "AI Systems", detail: "AI as leverage across iteration, planning, and execution.", layer: 1, x: 78, y: 30 },
  { id: "backend", label: "Backend", detail: "Typed services, capability layer, provider registry.", layer: 2, x: 30, y: 56 },
  { id: "integrations", label: "Integrations", detail: "Normalized external services via one interface.", layer: 2, x: 70, y: 56 },
  { id: "persistence", label: "Persistence", detail: "Supabase and Postgres for durable, queryable state.", layer: 3, x: 35, y: 82 },
  { id: "scaling", label: "Product Scaling", detail: "Multi-workspace, multi-location rollout architecture.", layer: 3, x: 68, y: 82 },
];

export const archEdges: ArchEdge[] = [
  { from: "operator", to: "frontend" },
  { from: "operator", to: "workflows" },
  { from: "operator", to: "ai" },
  { from: "frontend", to: "backend" },
  { from: "workflows", to: "backend" },
  { from: "workflows", to: "integrations" },
  { from: "ai", to: "integrations" },
  { from: "backend", to: "persistence" },
  { from: "integrations", to: "persistence" },
  { from: "backend", to: "scaling" },
  { from: "integrations", to: "scaling" },
];
