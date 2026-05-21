import {
  identity,
  philosophy,
  aiWorkflow,
  teamValue,
  operatorBackground,
} from "@/lib/data/content";
import { projects, statusLabel } from "@/lib/data/projects";
import { skillGroups } from "@/lib/data/skills";
import { caseStudies } from "@/lib/data/caseStudies";

/**
 * Server-rendered portfolio content. This lives in the initial HTML so search
 * engines, link unfurlers, and non-JavaScript clients can read the full
 * portfolio. The interactive OS in OS.tsx mounts as a full-screen overlay on
 * top of this for visitors with JavaScript. The same HTML is served to every
 * client, so this is progressive enhancement, not cloaking. It also acts as a
 * complete no-JavaScript fallback experience.
 */
export function SeoContent() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-ink">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {identity.handle}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {identity.name}
        </h1>
        <p className="mt-2 text-lg text-ink-muted">
          {identity.roles.join(" / ")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          {identity.positioning}
        </p>
      </header>

      <section className="mt-12" aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="text-2xl font-semibold tracking-tight">
          AI-native engineering
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          {aiWorkflow.thesis}
        </p>
      </section>

      <section className="mt-12" aria-labelledby="background-heading">
        <h2 id="background-heading" className="text-2xl font-semibold tracking-tight">
          {operatorBackground.kicker}
        </h2>
        <p className="mt-3 text-base font-medium leading-relaxed text-ink">
          {operatorBackground.headline}
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          {operatorBackground.narrative}
        </p>
        <ul className="mt-4 space-y-2">
          {operatorBackground.strengths.map((s) => (
            <li key={s.title}>
              <span className="font-semibold text-ink">{s.title}.</span>{" "}
              <span className="text-ink-muted">{s.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="text-2xl font-semibold tracking-tight">
          Selected projects
        </h2>
        <div className="mt-4 space-y-10">
          {projects.map((project) => {
            const study = caseStudies[project.id];
            return (
              <article key={project.id}>
                <h3 className="text-xl font-semibold">
                  {project.name}{" "}
                  <span className="text-ink-faint">({statusLabel[project.status]})</span>
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-muted">
                  {project.tagline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  {project.summary}
                </p>

                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-faint">
                  Capabilities
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                  {project.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <p className="mt-3 text-sm text-ink-muted">
                  <span className="font-semibold text-ink-faint">Stack: </span>
                  {project.stack.join(", ")}
                </p>

                {project.liveUrl && (
                  <p className="mt-2 text-sm text-ink-muted">
                    <span className="font-semibold text-ink-faint">Live site: </span>
                    <a
                      className="text-accent underline"
                      href={project.liveUrl}
                      rel="noopener noreferrer"
                    >
                      {project.liveUrl.replace("https://", "")}
                    </a>
                  </p>
                )}

                {study && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
                      Case study: {study.positioning}
                    </h4>
                    <h5 className="mt-2 text-sm font-semibold text-ink">
                      Systems and architecture
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                      {study.architecture.principles.map((p) => (
                        <li key={p.title}>
                          <span className="font-medium text-ink">{p.title}.</span>{" "}
                          {p.body}
                        </li>
                      ))}
                    </ul>
                    <h5 className="mt-3 text-sm font-semibold text-ink">
                      Technical highlights
                    </h5>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                      {study.highlights.map((h) => (
                        <li key={h.title}>
                          <span className="font-medium text-ink">{h.title}.</span>{" "}
                          {h.body}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="value-heading">
        <h2 id="value-heading" className="text-2xl font-semibold tracking-tight">
          What I bring to teams
        </h2>
        <ul className="mt-4 space-y-3">
          {teamValue.map((v) => (
            <li key={v.id}>
              <span className="font-semibold text-ink">{v.title}.</span>{" "}
              <span className="text-ink-muted">{v.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-semibold tracking-tight">
          Skills and stack
        </h2>
        <div className="mt-4 space-y-4">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
                {group.label}
              </h3>
              <p className="mt-1 text-base text-ink-muted">
                {group.items.map((i) => i.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="philosophy-heading">
        <h2 id="philosophy-heading" className="text-2xl font-semibold tracking-tight">
          {philosophy.title}: {philosophy.kicker}
        </h2>
        <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-muted">
          <p>{philosophy.paragraphs.p1}</p>
          <p className="font-medium text-ink">{philosophy.paragraphs.beat1}</p>
          <p>{philosophy.paragraphs.p2}</p>
          <p>{philosophy.paragraphs.p3}</p>
          <p className="font-medium text-ink">{philosophy.paragraphs.beat2}</p>
          <p>{philosophy.signature}</p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
          Contact
        </h2>
        <p className="mt-3 text-base text-ink-muted">
          Building something ambitious? Reach out.
        </p>
        <ul className="mt-3 space-y-1 text-base">
          <li>
            Email:{" "}
            <a className="text-accent underline" href={`mailto:${identity.email}`}>
              {identity.email}
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a
              className="text-accent underline"
              href={identity.linkedin}
              rel="noopener noreferrer"
            >
              {identity.linkedin}
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              className="text-accent underline"
              href={identity.github}
              rel="noopener noreferrer"
            >
              {identity.github}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
