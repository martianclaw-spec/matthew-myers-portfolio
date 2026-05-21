"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Send,
  User,
  Loader2,
  Mail,
  AlertCircle,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { useOS } from "@/lib/store";
import { openingMessage, recruiterPrompts } from "@/lib/data/knowledge";
import { detectProjectRefs, type ProjectRef } from "@/lib/projectRefs";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: string[];
  refs?: ProjectRef[];
  error?: boolean;
}

let idCounter = 0;
const nextId = () => `m${idCounter++}`;

const PROCESSING_STAGES = [
  "Retrieving context",
  "Reviewing the knowledge base",
  "Synthesizing response",
];

export function AskMatthew() {
  const openModule = useOS((s) => s.openModule);
  const openCaseStudy = useOS((s) => s.openCaseStudy);
  const setActiveProject = useOS((s) => s.setActiveProject);
  const reduce = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "assistant", content: openingMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Power-on sequence so opening the console feels like activating a system.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), reduce ? 0 : 850);
    return () => clearTimeout(t);
  }, [reduce]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, loading, ready]);

  // Cycle the processing label while a request is in flight.
  useEffect(() => {
    if (!loading) return;
    setStage(0);
    const t = setInterval(
      () => setStage((s) => (s + 1) % PROCESSING_STAGES.length),
      1100,
    );
    return () => clearInterval(t);
  }, [loading]);

  const handleInspect = (ref: ProjectRef) => {
    if (ref.action.type === "case") {
      openCaseStudy(ref.action.id);
    } else {
      setActiveProject(ref.action.id);
      openModule("projects");
    }
  };

  const send = async (raw: string) => {
    const question = raw.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((m) => [...m, { id: nextId(), role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask-matthew", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Request failed");

      const sources: string[] = data.sources ?? [];
      const refs = data.grounded
        ? detectProjectRefs(data.answer ?? "", sources)
        : [];

      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "assistant",
          content: data.answer,
          sources,
          refs,
        },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "assistant",
          error: true,
          content:
            err instanceof Error && err.message.toLowerCase().includes("slow down")
              ? err.message
              : "Something went wrong reaching the assistant. Please try again, or contact Matthew directly.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const showPrompts = ready && messages.length <= 1 && !loading;

  return (
    <div className="flex h-full flex-col bg-bg-base/30">
      {/* Telemetry header */}
      <div className="relative shrink-0 border-b border-line/70 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
              <Bot className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-signal-ok" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-ok" />
              </span>
            </span>
            <div>
              <div className="text-sm font-semibold text-ink">Recruiter Console</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Grounded recruiter intelligence
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint sm:flex">
            <Activity className="h-3 w-3 text-signal-ok" />
            {loading ? "Processing" : "Online"}
          </div>
        </div>
        {loading && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div className="h-full w-full animate-pulse-soft bg-accent/60" />
          </div>
        )}
      </div>

      {/* Body */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {!ready ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
              <Bot className="h-5 w-5 animate-pulse-soft" />
            </span>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
              Initializing recruiter console
            </div>
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-bg-elevated">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0 : 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) =>
              m.role === "user" ? (
                <UserBubble key={m.id} content={m.content} />
              ) : (
                <AssistantBubble
                  key={m.id}
                  message={m}
                  animate={!reduce}
                  onTick={scrollToBottom}
                  onInspect={handleInspect}
                  onContact={() => openModule("contact")}
                />
              ),
            )}

            {loading && (
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent">
                  <Bot className="h-3.5 w-3.5" />
                </span>
                <div className="flex items-center gap-2 rounded-2xl border border-line/70 bg-bg-base/50 px-3.5 py-2.5 text-ink-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                  <span className="text-sm">{PROCESSING_STAGES[stage]}</span>
                </div>
              </div>
            )}

            {showPrompts && (
              <RecruiterPrompts onPick={send} />
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex shrink-0 items-center gap-2 border-t border-line/70 p-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          disabled={!ready}
          placeholder="Ask about Matthew's work, skills, or fit"
          className="h-10 w-full rounded-lg border border-line bg-bg-base/60 px-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !ready || input.trim().length === 0}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/50 bg-accent/10 text-accent transition hover:bg-accent/15 disabled:opacity-40"
          aria-label="Send"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-row-reverse gap-3"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-bg-elevated text-ink-muted">
        <User className="h-3.5 w-3.5" />
      </span>
      <div className="max-w-[82%] rounded-2xl border border-line bg-bg-elevated/70 px-3.5 py-2.5">
        <p className="text-sm leading-relaxed text-ink">{content}</p>
      </div>
    </motion.div>
  );
}

function AssistantBubble({
  message,
  animate,
  onTick,
  onInspect,
  onContact,
}: {
  message: ChatMessage;
  animate: boolean;
  onTick: () => void;
  onInspect: (ref: ProjectRef) => void;
  onContact: () => void;
}) {
  const { content, sources, refs, error } = message;
  const [shown, setShown] = useState(animate && !error ? "" : content);
  const [done, setDone] = useState(!(animate && !error));

  useEffect(() => {
    if (!animate || error) {
      setShown(content);
      setDone(true);
      return;
    }
    const tokens = content.split(/(\s+)/);
    let i = 0;
    const timer = setInterval(() => {
      i += 3;
      if (i >= tokens.length) {
        setShown(content);
        setDone(true);
        clearInterval(timer);
      } else {
        setShown(tokens.slice(0, i).join(""));
      }
      onTick();
    }, 28);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, animate, error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3"
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
          error
            ? "border-signal-warn/40 bg-signal-warn/10 text-signal-warn"
            : "border-accent/40 bg-accent/10 text-accent",
        )}
      >
        {error ? <AlertCircle className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </span>
      <div className="max-w-[88%] rounded-2xl border border-line/70 bg-bg-base/50 px-3.5 py-2.5">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
          {shown}
          {!done && (
            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse-soft bg-accent/70" />
          )}
        </p>

        <AnimatePresence>
          {done && refs && refs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 space-y-2"
            >
              {refs.map((ref) => (
                <ProjectRefCard key={ref.id} refData={ref} onInspect={onInspect} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {done && sources && sources.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {sources.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-bg-base/60 px-2 py-0.5 font-mono text-[9px] tracking-wide text-ink-faint"
              >
                Source: {s}
              </span>
            ))}
          </div>
        )}

        {done && !error && sources && sources.length > 0 && (
          <button
            onClick={onContact}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent transition hover:bg-accent/15"
          >
            <Mail className="h-3 w-3" />
            Contact Matthew
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ProjectRefCard({
  refData,
  onInspect,
}: {
  refData: ProjectRef;
  onInspect: (ref: ProjectRef) => void;
}) {
  return (
    <div className="rounded-xl border border-line/80 bg-bg-elevated/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink">{refData.name}</span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-accent">
          {refData.category}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        {refData.description}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {refData.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-line bg-bg-base/50 px-1.5 py-0.5 font-mono text-[9px] text-ink-faint"
            >
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={() => onInspect(refData)}
          className="group inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent transition hover:text-ink"
        >
          Inspect
          <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

function RecruiterPrompts({ onPick }: { onPick: (q: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="pt-1"
    >
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
        Evaluate Matthew
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {recruiterPrompts.map((p) => (
          <button
            key={p.label}
            onClick={() => onPick(p.question)}
            className="group rounded-lg border border-line bg-bg-base/40 px-3 py-2 text-left transition hover:border-accent/40 hover:bg-accent/5"
          >
            <span className="block text-[11px] font-medium text-ink group-hover:text-accent">
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Subtle entrance used when mounted inside a window.
export function AskMatthewModule() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <AskMatthew />
    </motion.div>
  );
}
