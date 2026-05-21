"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight } from "lucide-react";
import { identity } from "@/lib/data/content";
import { ModuleShell, SectionLabel } from "@/components/ui/primitives";

const mailtoHref = `mailto:${identity.email}?subject=${encodeURIComponent(
  "Building something ambitious",
)}`;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [ctaCopied, setCtaCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const startConversation = () => {
    // Always give visible feedback, then best-effort copy and open mail so the
    // CTA does something even when no client is registered for mailto links.
    setCtaCopied(true);
    setTimeout(() => setCtaCopied(false), 2400);
    navigator.clipboard?.writeText(identity.email).catch(() => {});
    window.location.href = mailtoHref;
  };

  const links = [
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "Professional profile",
      href: identity.linkedin,
      icon: Linkedin,
    },
    {
      id: "github",
      label: "GitHub",
      value: "Code and systems",
      href: identity.github,
      icon: Github,
    },
  ];

  return (
    <ModuleShell>
      <SectionLabel>contact</SectionLabel>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-balance text-2xl font-semibold tracking-tight text-ink"
      >
        Building something ambitious? Let&apos;s talk.
      </motion.h3>
      <p className="mt-2 max-w-md text-sm text-ink-muted">
        Open a channel. I respond fastest to a direct, specific note about what
        you are building.
      </p>

      <div className="mt-6 space-y-2.5">
        <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Email
              </div>
              <div className="text-sm text-ink">{identity.email}</div>
            </div>
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 rounded-md border border-line bg-bg-base/60 px-3 py-1.5 font-mono text-[11px] text-ink-muted transition hover:border-accent/40 hover:text-ink"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-signal-ok" />
                copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                copy
              </>
            )}
          </button>
        </div>

        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.id}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-line/80 bg-bg-base/40 p-4 transition hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg-elevated text-ink-muted transition group-hover:text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {l.label}
                  </div>
                  <div className="text-sm text-ink">{l.value}</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </a>
          );
        })}
      </div>

      <button
        onClick={startConversation}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition hover:bg-accent/15"
      >
        {ctaCopied ? (
          <>
            <Check className="h-4 w-4" />
            Address copied, opening your mail app
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Start a conversation
          </>
        )}
      </button>
    </ModuleShell>
  );
}
