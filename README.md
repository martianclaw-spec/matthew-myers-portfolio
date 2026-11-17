# Matthew Myers Builds

An interactive, AI-native command-center portfolio for Matthew Myers. AI-Native Product Engineer, Full Stack Developer, Systems Builder.

**Live:** [matthew-myers.vercel.app](https://matthew-myers.vercel.app)

The site is not a static resume. It boots into an operating-system-style UI, and every section (projects, case studies, philosophy, recruiter assistant) is a module inside that OS. This repo is the production code that ships it.

---

## Why this repo is worth reading

If you came here from a job application, the three things you probably want to see are:

1. **A grounded LLM application in production.** The `Recruiter Console` module is a real retrieval-grounded chat assistant powered by the Anthropic API, with a curated knowledge base, server-side rate limiting and spend caps, same-origin checks, security headers, deterministic fallback, source citations, and inline project reference cards that link back into the OS. It is not a prompt wrapper. See [The Recruiter Console](#the-recruiter-console-grounded-llm-application) below.
2. **A real production SaaS this codebase complements.** [hacktivist.ai](https://hacktivist.ai) is the venue platform Matthew built for golf and sim-racing venues, live and revenue-generating since December 2025 across five locations. This portfolio is the public surface; the Hacktivist platform is the operational system.
3. **Pragmatic engineering decisions.** App-shell + SSR layer for crawlers, custom analytics events, immersive layers with hardened lifecycle, accessibility-friendly motion, and a clear separation of data and presentation across modules.

---

## The Recruiter Console (grounded LLM application)

The Recruiter Console is the centerpiece of this codebase for anyone evaluating my AI engineering. It is an LLM application designed so a hiring manager can ask questions about me and get answers that are **grounded, honest, and concise**, with no room for hallucination.

**Architecture**

```
User question
    │
    ▼
Client chat module (streaming reveal, project cards, contact CTA)
    │  POST /api/ask-matthew  { question }
    ▼
Server-side API route (Node runtime, force-dynamic)
    │
    ├── Input validation (length, type)
    ├── In-memory rate limit (25 req / 5 min / IP)
    ├── Keyword retrieval scorer  ──►  Curated knowledge snippets
    │
    ├── Try Anthropic (claude-haiku-4-5)  ──►  if OK return
    ├── Try OpenAI (gpt-4o-mini)          ──►  if OK return
    └── Deterministic grounded fallback   ──►  returns top KB snippet
    │
    ▼
{ answer, sources, grounded }
    │
    ▼
Client renders: streaming text + Source: chips + inline project cards
```

**What makes it grounded, not a wrapper**

- The system prompt is explicit about not inventing credentials, employment, degrees, metrics, or completed work, and is required to honestly say "I don't know" and recommend contacting Matthew directly.
- The model only sees the top-scored knowledge snippets, never the entire KB.
- Source citations are derived from retrieval, not from the model's text, so they are always faithful.
- If no model key is set, the route returns the relevant KB snippet verbatim, so the feature is useful and safe-by-default with zero LLM dependency.
- Project references in the response trigger inline cards that route back into the rest of the OS (`open case study`, `open project`), making the assistant part of the product instead of a sidebar.

**Files of interest**

```
src/lib/data/knowledge.ts          Curated, approved knowledge snippets + system prompt
src/lib/retrieval.ts               Keyword retrieval scorer
src/lib/projectRefs.ts             Project detection from answer text + source mapping
src/app/api/ask-matthew/route.ts   Secure server-side route (Anthropic / OpenAI / fallback)
src/components/os/AskMatthew.tsx   Chat UI: streaming reveal, telemetry, source chips, CTAs
```

**Environment variables (optional)**

| Var                  | Purpose                                                          |
|----------------------|------------------------------------------------------------------|
| `ANTHROPIC_API_KEY`  | Enables Anthropic. Preferred provider.                           |
| `OPENAI_API_KEY`     | Enables OpenAI as fallback.                                      |
| `ANTHROPIC_MODEL`    | Override the default model (`claude-haiku-4-5-20251001`).        |
| `OPENAI_MODEL`       | Override the default model (`gpt-4o-mini`).                      |

The route works with neither set; it returns approved knowledge text directly.

---

## Modules

The OS exposes nine modules, launched from a dock, a `Ctrl/Cmd+K` command palette, or the idle screen.

| Module               | What it is                                                                 |
|----------------------|----------------------------------------------------------------------------|
| System Overview      | Identity, roles, positioning.                                              |
| Operator Background  | Verified work history and "what the operator years built" strengths.       |
| Recruiter Console    | The grounded LLM assistant described above.                                |
| The Shift            | Immersive philosophy layer on AI as a force multiplier.                    |
| From Operations To Systems | Immersive personal-transmission layer.                               |
| Projects Explorer    | Hacktivist Platform, Hacktivist Racing, Venue Ops MCP, Martian Core, plus more on GitHub. |
| Case Study: Hacktivist Platform | Immersive case study with interactive architecture map.                    |
| Case Study: Hacktivist Racing | Immersive case study with interactive architecture map.                    |
| Architecture Map     | High-level systems map of how I think.                                     |
| AI-Native Workflow   | Thesis and application areas for AI as leverage.                           |
| What I Bring         | Team-value cards.                                                          |
| Skills and Stack     | Tools and capabilities.                                                    |
| Contact              | Email, LinkedIn, GitHub, mailto CTA.                                       |

The case studies use a shared `CaseStudyLayer` driven by typed data, so adding a new flagship case study is a data-only change.

---

## Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS 3 + a small design-token system in `globals.css`
- **State:** Zustand for OS window/layer state
- **Motion:** Framer Motion, with `prefers-reduced-motion` respected throughout
- **Icons:** lucide-react
- **LLM:** Anthropic API (default), OpenAI API (fallback), deterministic KB fallback
- **Analytics:** Vercel Web Analytics with custom event tracking
- **Deploy:** Vercel (production at [matthew-myers.vercel.app](https://matthew-myers.vercel.app))

---

## Architecture decisions worth flagging

- **App shell with a server-rendered SEO layer.** The UI is a client-side OS, which is invisible to crawlers. So the page also renders a server-side `SeoContent` component with the real portfolio text. Crawlers and tools like ChatGPT get a complete, readable page; visitors with JavaScript get the OS overlay. Same HTML served to everyone (not cloaking), and it doubles as a no-JS fallback.
- **Hardened immersive-layer lifecycle.** Each full-screen layer (Philosophy, Transmission, Case Study) is mounted on a timer rather than `AnimatePresence` alone, so a stalled frame callback can never leave the overlay stuck and blocking the OS.
- **No `mode="wait"` on the Projects detail.** Switching projects keys a new detail panel and skips the exit animation entirely, so the panel never freezes.
- **Grounded-by-default assistant.** The chat is useful with zero LLM keys, then upgrades smoothly when a key is added.

---

## Local development

```bash
git clone https://github.com/martianclaw-spec/matthew-myers-portfolio.git
cd matthew-myers-portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

For the live LLM responses in the Recruiter Console, set `ANTHROPIC_API_KEY` in a `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

Without it, the assistant still works and returns approved knowledge text.

---

## Project layout

```
src/
  app/
    layout.tsx                  Root layout, fonts, metadata, Vercel Analytics
    page.tsx                    Server-rendered SeoContent + client OS
    globals.css                 Design tokens, ambient effects
    api/ask-matthew/route.ts    Recruiter Console server route
  components/
    SeoContent.tsx              Server-rendered crawler/SEO content
    os/                         OS shell: dock, palette, window frame, layers
    modules/                    Individual module components
    ui/                         Small shared primitives
  lib/
    data/                       Typed data files (knowledge, projects, content, ...)
    store.ts                    Zustand OS state
    retrieval.ts                Knowledge-base retrieval
    projectRefs.ts              Project detection for assistant cards
    analytics.ts                Safe Vercel Analytics event wrapper
    modules.ts                  Module registry
    utils.ts                    cn() helper
```

---

## Build and verify

```bash
npm run build          # production build
npm run start          # serve the production build
```

The build is static for `/` and a single dynamic function for `/api/ask-matthew`.

---

## License

MIT. Use any of the patterns here in your own work.

---

## Contact

- **Email:** Matthew@martianindustries.io
- **Site:** [matthew-myers.vercel.app](https://matthew-myers.vercel.app)
- **GitHub:** [martianclaw-spec](https://github.com/martianclaw-spec)
- **LinkedIn:** [matthew-myers-91202011a](https://linkedin.com/in/matthew-myers-91202011a)
- **Live Hacktivist platform:** [hacktivist.ai](https://hacktivist.ai)
