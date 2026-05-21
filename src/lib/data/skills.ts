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
      { name: "API Integrations", level: 90 },
      { name: "OAuth Concepts", level: 82 },
    ],
  },
  {
    id: "systems",
    label: "Systems and Product",
    items: [
      { name: "Product Architecture", level: 91 },
      { name: "Workflow Automation", level: 89 },
      { name: "AI-Assisted Development", level: 93 },
      { name: "Vercel Deployment", level: 90 },
    ],
  },
];
