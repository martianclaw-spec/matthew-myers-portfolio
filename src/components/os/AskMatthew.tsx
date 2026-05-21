"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Loader2, Mail, AlertCircle } from "lucide-react";
import { useOS } from "@/lib/store";
import {
  openingMessage,
  suggestedQuestions,
} from "@/lib/data/knowledge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  sources?: string[];
  error?: boolean;
}

let idCounter = 0;
const nextId = () => `m${idCounter++}`;

export function AskMatthew() {
  const openModule = useOS((s) => s.openModule);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "assistant", content: openingMessage },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

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
      if (!res.ok) {
        throw new Error(data?.error ?? "Request failed");
      }
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          role: "assistant",
          content: data.answer,
          sources: data.sources ?? [],
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
            err instanceof Error && err.message.includes("slow down")
              ? err.message
              : "Something went wrong reaching the assistant. Please try again, or contact Matthew directly.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const showChips = messages.length <= 1 && !loading;

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-line/70 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <div className="text-sm font-semibold text-ink">Recruiter Console</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Grounded in approved portfolio data
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-3",
              m.role === "user" ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                m.role === "user"
                  ? "border-line bg-bg-elevated text-ink-muted"
                  : m.error
                    ? "border-signal-warn/40 bg-signal-warn/10 text-signal-warn"
                    : "border-accent/40 bg-accent/10 text-accent",
              )}
            >
              {m.role === "user" ? (
                <User className="h-3.5 w-3.5" />
              ) : m.error ? (
                <AlertCircle className="h-3.5 w-3.5" />
              ) : (
                <Bot className="h-3.5 w-3.5" />
              )}
            </span>
            <div
              className={cn(
                "max-w-[80%] rounded-xl border px-3.5 py-2.5",
                m.role === "user"
                  ? "border-line bg-bg-elevated/70"
                  : "border-line/70 bg-bg-base/50",
              )}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {m.content}
              </p>

              {m.sources && m.sources.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.sources.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-bg-base/60 px-2 py-0.5 font-mono text-[9px] tracking-wide text-ink-faint"
                    >
                      Source: {s}
                    </span>
                  ))}
                </div>
              )}

              {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                <button
                  onClick={() => openModule("contact")}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent transition hover:bg-accent/15"
                >
                  <Mail className="h-3 w-3" />
                  Contact Matthew
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-accent/10 text-accent">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-line/70 bg-bg-base/50 px-3.5 py-2.5 text-ink-muted">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="text-sm">Reviewing the knowledge base</span>
            </div>
          </div>
        )}

        {showChips && (
          <div className="pt-1">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              Try asking
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedQuestions.slice(0, 7).map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-line bg-bg-base/40 px-3 py-1.5 text-left text-[11px] text-ink-muted transition hover:border-accent/40 hover:text-ink"
                >
                  {q}
                </button>
              ))}
            </div>
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
          placeholder="Ask about Matthew's work, skills, or fit"
          className="h-10 w-full rounded-lg border border-line bg-bg-base/60 px-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-accent/40"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
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

// Subtle entrance used when mounted inside a window.
export function AskMatthewModule() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <AskMatthew />
    </motion.div>
  );
}
