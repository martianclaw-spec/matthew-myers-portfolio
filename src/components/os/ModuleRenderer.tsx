"use client";

import { type ModuleId } from "@/lib/modules";
import { SystemOverview } from "@/components/modules/SystemOverview";
import { Projects } from "@/components/modules/Projects";
import { ArchitectureMap } from "@/components/modules/ArchitectureMap";
import { AIWorkflow } from "@/components/modules/AIWorkflow";
import { TeamValue } from "@/components/modules/TeamValue";
import { Skills } from "@/components/modules/Skills";
import { Contact } from "@/components/modules/Contact";

// "philosophy" renders as a full-screen immersive layer, not a window.
const registry: Partial<Record<ModuleId, () => React.JSX.Element>> = {
  overview: SystemOverview,
  projects: Projects,
  architecture: ArchitectureMap,
  ai: AIWorkflow,
  value: TeamValue,
  skills: Skills,
  contact: Contact,
};

export function ModuleRenderer({ id }: { id: ModuleId }) {
  const Component = registry[id];
  if (!Component) return null;
  return <Component />;
}
