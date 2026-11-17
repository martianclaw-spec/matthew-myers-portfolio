export interface SkillGroup {
  id: string;
  label: string;
  items: { name: string; level: number }[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend Runtime",
    items: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 94 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Zustand", level: 88 },
    ],
  },
  {
    id: "backend",
    label: "Backend and Data",
    items: [
      { name: "Supabase", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Node.js / Express", level: 88 },
      { name: "WebSockets / Realtime", level: 86 },
      { name: "Stripe Connect", level: 87 },
      { name: "API Integrations", level: 90 },
    ],
  },
  {
    id: "systems",
    label: "Systems and Product",
    items: [
      { name: "Product Architecture", level: 91 },
      { name: "Workflow Automation", level: 89 },
      { name: "AI-Assisted Development", level: 93 },
      { name: "MCP Server Design", level: 88 },
      { name: "Vercel Deployment", level: 90 },
    ],
  },
  {
    id: "gtm",
    label: "Go-to-Market",
    items: [
      { name: "B2B SaaS Sales", level: 94 },
      { name: "Outbound and SDR Leadership", level: 93 },
      { name: "Discovery and Demos", level: 91 },
      { name: "Salesforce / HubSpot / Outreach", level: 90 },
    ],
  },
];
